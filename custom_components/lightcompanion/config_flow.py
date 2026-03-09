"""Config flow for Light Companion."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries

from .const import (
    CONF_API_KEY,
    CONF_BASE_URL,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_BASE_URL,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    DOMAIN,
)


class LightCompanionConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Handle first step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            await self.async_set_unique_id(DOMAIN)
            self._abort_if_unique_id_configured()
            return self.async_create_entry(title="Light Companion", data=user_input)

        schema = vol.Schema(
            {
                vol.Required(CONF_PROVIDER, default=DEFAULT_PROVIDER): vol.In(
                    ["openai", "anthropic", "google"]
                ),
                vol.Required(CONF_API_KEY): str,
                vol.Required(CONF_MODEL, default=DEFAULT_MODEL): str,
                vol.Required(CONF_BASE_URL, default=DEFAULT_BASE_URL): str,
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    @staticmethod
    def async_get_options_flow(config_entry):
        return LightCompanionOptionsFlow(config_entry)


class LightCompanionOptionsFlow(config_entries.OptionsFlow):
    """Handle options."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        data = {**self.config_entry.data, **self.config_entry.options}
        schema = vol.Schema(
            {
                vol.Required(CONF_PROVIDER, default=data.get(CONF_PROVIDER, DEFAULT_PROVIDER)): vol.In(
                    ["openai", "anthropic", "google"]
                ),
                vol.Required(CONF_API_KEY, default=data.get(CONF_API_KEY, "")): str,
                vol.Required(CONF_MODEL, default=data.get(CONF_MODEL, DEFAULT_MODEL)): str,
                vol.Required(CONF_BASE_URL, default=data.get(CONF_BASE_URL, DEFAULT_BASE_URL)): str,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
