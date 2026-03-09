"""Constants for Light Companion."""

from __future__ import annotations

DOMAIN = "lightcompanion"
PLATFORMS: list[str] = []

CONF_PROVIDER = "provider"
CONF_API_KEY = "api_key"
CONF_MODEL = "model"
CONF_BASE_URL = "base_url"

DEFAULT_PROVIDER = "openai"
DEFAULT_MODEL = "gpt-4o-mini"
DEFAULT_BASE_URL = "https://api.openai.com/v1"

PANEL_URL_PATH = "lightcompanion"
PANEL_TITLE = "Light Companion"
PANEL_ICON = "mdi:lightbulb-group"
PANEL_COMPONENT_NAME = "lightcompanion-panel"
PANEL_MODULE_PATH = "/api/lightcompanion/static/lightcompanion-panel.js"

API_PROCESS_PATH = "/api/lightcompanion/process"
API_ENTITIES_PATH = "/api/lightcompanion/entities"

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
