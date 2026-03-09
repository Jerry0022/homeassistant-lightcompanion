"""Config flow for Light Companion."""

from __future__ import annotations

from typing import Any

from homeassistant import config_entries

from .const import (
    CONF_LLM_SOURCE,
    DOMAIN,
    LLM_SOURCE_HA_OPENAI,
    OPENAI_INTEGRATION_DOMAIN,
)


class LightCompanionConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Handle first step."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if not self.hass.config_entries.async_entries(OPENAI_INTEGRATION_DOMAIN):
            return self.async_abort(reason="missing_openai")

        return self.async_create_entry(
            title="Light Companion",
            data={CONF_LLM_SOURCE: LLM_SOURCE_HA_OPENAI},
        )

    @staticmethod
    def async_get_options_flow(config_entry):
        return LightCompanionOptionsFlow(config_entry)


class LightCompanionOptionsFlow(config_entries.OptionsFlow):
    """Handle options."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        """No options currently exposed."""
        return self.async_create_entry(title="", data={})
