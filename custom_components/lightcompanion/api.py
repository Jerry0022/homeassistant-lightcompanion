"""HTTP API views for Light Companion."""

from __future__ import annotations

import json
from typing import Any

import voluptuous as vol
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import area_registry as ar, entity_registry as er

from .const import (
    API_ENTITIES_PATH,
    API_PROCESS_PATH,
    CONF_LLM_SOURCE,
    DOMAIN,
    JSON_SCHEMA_HINT,
    LLM_SOURCE_HA_OPENAI,
    OPENAI_INTEGRATION_DOMAIN,
    API_OPTIONS_PATH,
    CONF_API_KEY,
    CONF_BASE_URL,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_BASE_URL,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    DOMAIN,
    JSON_SCHEMA_HINT,
    PROVIDER_MODELS,
)

PROCESS_SCHEMA = vol.Schema({vol.Required("text"): str})
OPTIONS_SCHEMA = vol.Schema({vol.Required(CONF_MODEL): str})


def _active_config(hass: HomeAssistant) -> dict[str, Any]:
    entry = _primary_entry(hass)
    config = {**entry.data, **entry.options}
    return {
        CONF_LLM_SOURCE: config.get(CONF_LLM_SOURCE, LLM_SOURCE_HA_OPENAI),
    }


def _primary_entry(hass: HomeAssistant):
    entries = list(hass.config_entries.async_entries(DOMAIN))
    if not entries:
        raise ValueError("No Light Companion configuration found")
    return entries[0]


def _serialize_light_entity(
    state: State, entity_reg: er.EntityRegistry, area_reg: ar.AreaRegistry
) -> dict[str, Any]:
    attrs = state.attributes
    entry = entity_reg.async_get(state.entity_id)
    area_name = "unknown"
    if entry and entry.area_id:
        area_entry = area_reg.async_get_area(entry.area_id)
        if area_entry:
            area_name = area_entry.name

    return {
        "entity_id": state.entity_id,
        "name": attrs.get("friendly_name", state.name),
        "area": area_name,
        "state": state.state,
        "supported_color_modes": attrs.get("supported_color_modes", []),
        "brightness": attrs.get("brightness"),
        "color_mode": attrs.get("color_mode"),
        "min_color_temp_kelvin": attrs.get("min_color_temp_kelvin"),
        "max_color_temp_kelvin": attrs.get("max_color_temp_kelvin"),
        "effect_list": attrs.get("effect_list", []),
    }


def _build_prompt(user_text: str, entities: list[dict[str, Any]]) -> str:
    return (
        "You are a Home Assistant light control planner. "
        "Interpret user intent and produce only JSON. "
        "JSON schema hint: "
        f"{json.dumps(JSON_SCHEMA_HINT)}\n"
        "Use only entity_ids from this list and valid light service fields. "
        "Do not return markdown.\n"
        f"Available light entities: {json.dumps(entities)}\n"
        f"User request: {user_text}"
    )


async def _call_ha_openai(hass: HomeAssistant, prompt: str) -> str:
    openai_entries = hass.config_entries.async_entries(OPENAI_INTEGRATION_DOMAIN)
    if not openai_entries:
        raise ValueError("Home Assistant OpenAI integration is not configured")

    response = await hass.services.async_call(
        "conversation",
        "process",
        {
            "agent_id": openai_entries[0].entry_id,
            "text": prompt,
        },
        blocking=True,
        return_response=True,
    )

    speech = response.get("response", {}).get("speech", {}).get("plain", {}).get("speech")
    if not speech:
        raise ValueError("No response returned by Home Assistant OpenAI conversation agent")
    return speech


async def _call_provider(hass: HomeAssistant, config: dict[str, Any], prompt: str) -> str:
    if config[CONF_LLM_SOURCE] == LLM_SOURCE_HA_OPENAI:
        return await _call_ha_openai(hass, prompt)

    raise ValueError("Unsupported LLM source")


def _parse_actions(raw: str) -> dict[str, Any]:
    parsed = json.loads(raw)
    actions = parsed.get("actions", [])
    if not isinstance(actions, list):
        raise ValueError("actions must be a list")
    return parsed


async def _execute_actions(hass: HomeAssistant, actions: list[dict[str, Any]]) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for action in actions:
        entity_id = action.get("entity_id")
        if not entity_id:
            continue

        service = action.get("service", "turn_on")
        service_data = dict(action.get("service_data", {}))
        service_data["entity_id"] = entity_id

        await hass.services.async_call("light", service, service_data, blocking=True)
        results.append(
            {
                "entity_id": entity_id,
                "service": service,
                "service_data": service_data,
                "status": "done",
            }
        )

    return results


class LightCompanionEntitiesView(HomeAssistantView):
    """Return available light entities."""

    url = API_ENTITIES_PATH
    name = "api:lightcompanion:entities"
    requires_auth = True

    async def get(self, request):
        hass: HomeAssistant = request.app["hass"]
        entity_reg = er.async_get(hass)
        area_reg = ar.async_get(hass)
        entities = [
            _serialize_light_entity(state, entity_reg, area_reg)
            for state in hass.states.async_all("light")
        ]
        return self.json({"entities": entities})


class LightCompanionOptionsView(HomeAssistantView):
    """Read and update runtime options."""

    url = API_OPTIONS_PATH
    name = "api:lightcompanion:options"
class LightCompanionStatusView(HomeAssistantView):
    """Return frontend readiness information."""

    url = API_STATUS_PATH
    name = "api:lightcompanion:status"
    requires_auth = True

    async def get(self, request):
        hass: HomeAssistant = request.app["hass"]
        config = _active_config(hass)
        provider = config[CONF_PROVIDER]
        return self.json(
            {
                CONF_PROVIDER: provider,
                CONF_MODEL: config[CONF_MODEL],
                "available_models": PROVIDER_MODELS.get(provider, []),
            }
        )

    async def post(self, request):
        hass: HomeAssistant = request.app["hass"]
        body = OPTIONS_SCHEMA(await request.json())
        entry = _primary_entry(hass)

        options = {**entry.options, CONF_MODEL: body[CONF_MODEL]}
        hass.config_entries.async_update_entry(entry, options=options)

        config = _active_config(hass)
        provider = config[CONF_PROVIDER]
        return self.json(
            {
                CONF_PROVIDER: provider,
                CONF_MODEL: config[CONF_MODEL],
                "available_models": PROVIDER_MODELS.get(provider, []),
            }
        )
        available_domains = {entry.domain for entry in hass.config_entries.async_entries()}
        has_openai_integration = bool(
            {"openai_conversation", "openai"}.intersection(available_domains)
        )
        return self.json({"openai_integration_available": has_openai_integration})


class LightCompanionProcessView(HomeAssistantView):
    """Process natural language instruction for lights."""

    url = API_PROCESS_PATH
    name = "api:lightcompanion:process"
    requires_auth = True

    async def post(self, request):
        hass: HomeAssistant = request.app["hass"]
        body = await request.json()
        body = PROCESS_SCHEMA(body)

        entity_reg = er.async_get(hass)
        area_reg = ar.async_get(hass)
        entities = [
            _serialize_light_entity(state, entity_reg, area_reg)
            for state in hass.states.async_all("light")
        ]
        config = _active_config(hass)

        prompt = _build_prompt(body["text"], entities)
        raw = await _call_provider(hass, config, prompt)
        parsed = _parse_actions(raw)
        results = await _execute_actions(hass, parsed.get("actions", []))

        return self.json(
            {
                "summary": parsed.get("summary", "Applied light changes"),
                "llm_raw": raw,
                "results": results,
            }
        )
