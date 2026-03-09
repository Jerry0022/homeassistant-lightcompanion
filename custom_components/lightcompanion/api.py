"""HTTP API views for Light Companion."""

from __future__ import annotations

import json
from typing import Any

import httpx
import voluptuous as vol
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import area_registry as ar, entity_registry as er

from .const import (
    API_ENTITIES_PATH,
    API_PROCESS_PATH,
    API_STATUS_PATH,
    CONF_API_KEY,
    CONF_BASE_URL,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_BASE_URL,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    DOMAIN,
    JSON_SCHEMA_HINT,
)

PROCESS_SCHEMA = vol.Schema({vol.Required("text"): str})


def _active_config(hass: HomeAssistant) -> dict[str, Any]:
    entries = list(hass.config_entries.async_entries(DOMAIN))
    if not entries:
        raise ValueError("No Light Companion configuration found")

    entry = entries[0]
    config = {**entry.data, **entry.options}
    return {
        CONF_PROVIDER: config.get(CONF_PROVIDER, DEFAULT_PROVIDER),
        CONF_API_KEY: config.get(CONF_API_KEY, ""),
        CONF_MODEL: config.get(CONF_MODEL, DEFAULT_MODEL),
        CONF_BASE_URL: config.get(CONF_BASE_URL, DEFAULT_BASE_URL),
    }


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


async def _call_provider(config: dict[str, Any], prompt: str) -> str:
    provider = config[CONF_PROVIDER]
    api_key = config[CONF_API_KEY]
    model = config[CONF_MODEL]
    base_url = config[CONF_BASE_URL]

    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

    if provider == "openai":
        url = f"{base_url.rstrip('/')}/chat/completions"
        payload = {
            "model": model,
            "temperature": 0,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": "Return strict JSON only."},
                {"role": "user", "content": prompt},
            ],
        }
    elif provider == "anthropic":
        url = f"{base_url.rstrip('/')}/messages"
        headers = {
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }
        payload = {
            "model": model,
            "max_tokens": 1000,
            "messages": [{"role": "user", "content": prompt}],
        }
    else:  # google (OpenAI-compatible gateway expected)
        url = f"{base_url.rstrip('/')}/chat/completions"
        payload = {
            "model": model,
            "temperature": 0,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": "Return strict JSON only."},
                {"role": "user", "content": prompt},
            ],
        }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(url, headers=headers, json=payload)
        resp.raise_for_status()
        data = resp.json()

    if provider == "anthropic":
        return data["content"][0]["text"]

    return data["choices"][0]["message"]["content"]


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


class LightCompanionStatusView(HomeAssistantView):
    """Return frontend readiness information."""

    url = API_STATUS_PATH
    name = "api:lightcompanion:status"
    requires_auth = True

    async def get(self, request):
        hass: HomeAssistant = request.app["hass"]
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
        raw = await _call_provider(config, prompt)
        parsed = _parse_actions(raw)
        results = await _execute_actions(hass, parsed.get("actions", []))

        return self.json(
            {
                "summary": parsed.get("summary", "Applied light changes"),
                "llm_raw": raw,
                "results": results,
            }
        )
