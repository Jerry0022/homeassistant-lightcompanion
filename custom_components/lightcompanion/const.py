"""Constants for Light Companion."""

from __future__ import annotations

from ha_customapps.const import (  # noqa: F401
    CONF_API_KEY,
    CONF_BASE_URL,
    CONF_LLM_SOURCE,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    OPENAI_AGENT_DOMAINS,
    PROVIDER_MODELS,
)

DOMAIN = "lightcompanion"
PLATFORMS: list[str] = []

# Backward-compatible value stored in existing config entries
LLM_SOURCE_HA_OPENAI = "ha_openai"

# Panel constants
PANEL_URL_PATH = "lightcompanion"
PANEL_TITLE = "Light Companion"
PANEL_ICON = "mdi:message-processing-outline"
PANEL_COMPONENT_NAME = "lightcompanion-panel"
PANEL_MODULE_PATH = "/api/lightcompanion/static/lightcompanion-panel.js"

# API paths
API_PROCESS_PATH = "/api/lightcompanion/process"
API_ENTITIES_PATH = "/api/lightcompanion/entities"
API_OPTIONS_PATH = "/api/lightcompanion/options"
API_STATUS_PATH = "/api/lightcompanion/status"

JSON_SCHEMA_HINT = {
    "type": "object",
    "required": ["summary", "actions"],
    "properties": {
        "summary": {"type": "string"},
        "actions": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["entity_id", "service_data"],
                "properties": {
                    "entity_id": {"type": "string"},
                    "service": {
                        "type": "string",
                        "enum": ["turn_on", "turn_off", "toggle"],
                    },
                    "service_data": {"type": "object"},
                },
            },
        },
    },
}
