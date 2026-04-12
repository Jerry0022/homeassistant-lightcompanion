"""HTTP API views for Light Companion."""

from __future__ import annotations

import json
from typing import Any

import voluptuous as vol
from ha_customapps.config_helpers import get_merged_config, get_primary_entry
from ha_customapps.entity_utils import serialize_entity_base
from ha_customapps.llm import call_ha_conversation_agent, parse_llm_json
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar, entity_registry as er

from .const import (
    ALL_AGENT_DOMAINS,
    API_ENTITIES_PATH,
    API_OPTIONS_PATH,
    API_PROCESS_PATH,
    API_STATUS_PATH,
    CONF_LLM_SOURCE,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    DOMAIN,
    JSON_SCHEMA_HINT,
    LLM_SOURCE_HA_CONVERSATION,
    PROVIDER_AGENT_DOMAINS,
    PROVIDER_MODELS,
)

PROCESS_SCHEMA = vol.Schema({vol.Required("text"): str})
OPTIONS_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_MODEL): str,
        vol.Optional(CONF_PROVIDER): str,
    }
)


def _active_config(hass: HomeAssistant) -> dict[str, Any]:
    entry = get_primary_entry(hass, DOMAIN)
    config = get_merged_config(
        entry,
        defaults={
            CONF_LLM_SOURCE: LLM_SOURCE_HA_CONVERSATION,
            CONF_PROVIDER: DEFAULT_PROVIDER,
            CONF_MODEL: DEFAULT_MODEL,
        },
    )
    return config


def _serialize_light_entity(
    state, entity_reg: er.EntityRegistry, area_reg: ar.AreaRegistry
) -> dict[str, Any]:
    """Serialize a light entity with domain-specific attributes."""
    base = serialize_entity_base(state, entity_reg, area_reg)
    attrs = state.attributes
    base.update(
        {
            "supported_color_modes": attrs.get("supported_color_modes", []),
            "brightness": attrs.get("brightness"),
            "color_mode": attrs.get("color_mode"),
            "min_color_temp_kelvin": attrs.get("min_color_temp_kelvin"),
            "max_color_temp_kelvin": attrs.get("max_color_temp_kelvin"),
            "effect_list": attrs.get("effect_list", []),
        }
    )
    return base


def _build_prompt(user_text: str, entities: list[dict[str, Any]]) -> str:
    return (
        "You are a Home Assistant light control planner. "
        "Interpret user intent and produce only JSON. "
        "Return ONLY a JSON object. Do NOT wrap it in markdown code blocks. "
        "Do NOT add any text before or after the JSON. "
        "JSON schema hint: "
        f"{json.dumps(JSON_SCHEMA_HINT)}\n"
        "Use only entity_ids from this list and valid light service fields. "
        "Do not return markdown.\n"
        f"Available light entities: {json.dumps(entities)}\n"
        f"User request: {user_text}"
    )


async def _call_provider(hass: HomeAssistant, config: dict[str, Any], prompt: str) -> str:
    provider = config[CONF_PROVIDER]
    domains = PROVIDER_AGENT_DOMAINS.get(provider)
    if not domains:
        raise ValueError(f"Unsupported provider: {provider}")
    return await call_ha_conversation_agent(hass, prompt, domains)


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
    requires_auth = True

    async def get(self, request):
        hass: HomeAssistant = request.app["hass"]
        config = _active_config(hass)
        provider = config[CONF_PROVIDER]
        available = {e.domain for e in hass.config_entries.async_entries()}
        available_providers = [
            p for p, domains in PROVIDER_AGENT_DOMAINS.items()
            if set(domains).intersection(available)
        ]
        return self.json(
            {
                CONF_PROVIDER: provider,
                CONF_MODEL: config[CONF_MODEL],
                "available_models": PROVIDER_MODELS.get(provider, []),
                "available_providers": available_providers,
            }
        )

    async def post(self, request):
        hass: HomeAssistant = request.app["hass"]
        body = OPTIONS_SCHEMA(await request.json())
        entry = get_primary_entry(hass, DOMAIN)

        options = {**entry.options}
        if CONF_PROVIDER in body:
            options[CONF_PROVIDER] = body[CONF_PROVIDER]
            # Reset model to the first available for the new provider
            models = PROVIDER_MODELS.get(body[CONF_PROVIDER], [])
            options[CONF_MODEL] = models[0] if models else ""
        if CONF_MODEL in body:
            options[CONF_MODEL] = body[CONF_MODEL]

        hass.config_entries.async_update_entry(entry, options=options)

        config = _active_config(hass)
        provider = config[CONF_PROVIDER]
        available = {e.domain for e in hass.config_entries.async_entries()}
        available_providers = [
            p for p, domains in PROVIDER_AGENT_DOMAINS.items()
            if set(domains).intersection(available)
        ]
        return self.json(
            {
                CONF_PROVIDER: provider,
                CONF_MODEL: config[CONF_MODEL],
                "available_models": PROVIDER_MODELS.get(provider, []),
                "available_providers": available_providers,
            }
        )


class LightCompanionStatusView(HomeAssistantView):
    """Return frontend readiness information."""

    url = API_STATUS_PATH
    name = "api:lightcompanion:status"
    requires_auth = True

    async def get(self, request):
        hass: HomeAssistant = request.app["hass"]
        available = {e.domain for e in hass.config_entries.async_entries()}
        has_any = bool(set(ALL_AGENT_DOMAINS).intersection(available))
        available_providers = [
            p for p, domains in PROVIDER_AGENT_DOMAINS.items()
            if set(domains).intersection(available)
        ]
        return self.json(
            {
                # kept for backward compatibility with existing frontend code
                "openai_integration_available": has_any,
                "llm_available": has_any,
                "available_providers": available_providers,
            }
        )


class LightCompanionProcessView(HomeAssistantView):
    """Process natural language instruction for lights."""

    url = API_PROCESS_PATH
    name = "api:lightcompanion:process"
    requires_auth = True

    async def post(self, request):
        hass: HomeAssistant = request.app["hass"]
        body = PROCESS_SCHEMA(await request.json())

        entity_reg = er.async_get(hass)
        area_reg = ar.async_get(hass)
        entities = [
            _serialize_light_entity(state, entity_reg, area_reg)
            for state in hass.states.async_all("light")
        ]
        config = _active_config(hass)

        prompt = _build_prompt(body["text"], entities)
        raw = await _call_provider(hass, config, prompt)

        try:
            parsed = parse_llm_json(raw)
        except (json.JSONDecodeError, ValueError) as err:
            return self.json(
                {
                    "summary": "LLM response was invalid JSON. No actions executed.",
                    "llm_raw": raw,
                    "results": [],
                    "error": str(err),
                },
                status_code=400,
            )

        results = await _execute_actions(hass, parsed.get("actions", []))

        return self.json(
            {
                "summary": parsed.get("summary", "Applied light changes"),
                "llm_raw": raw,
                "results": results,
            }
        )
