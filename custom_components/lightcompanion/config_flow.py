"""Config flow for Light Companion."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from ha_customapps.config_helpers import model_selector
from homeassistant import config_entries

from .const import (
    CONF_LLM_SOURCE,
    CONF_MODEL,
    CONF_PROVIDER,
    DEFAULT_MODEL,
    DEFAULT_PROVIDER,
    DOMAIN,
    LLM_SOURCE_HA_OPENAI,
    OPENAI_INTEGRATION_DOMAINS,
    PROVIDER_MODELS,
)


class LightCompanionConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Handle first step."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if not any(
            self.hass.config_entries.async_entries(domain)
            for domain in OPENAI_INTEGRATION_DOMAINS
        ):
            return self.async_abort(reason="missing_openai")

        return self.async_create_entry(
            title="Light Companion",
            data={
                CONF_LLM_SOURCE: LLM_SOURCE_HA_OPENAI,
                CONF_PROVIDER: DEFAULT_PROVIDER,
                CONF_MODEL: DEFAULT_MODEL,
            },
        )

    @staticmethod
    def async_get_options_flow(config_entry):
        """Get options flow."""
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
        provider = data.get(CONF_PROVIDER, DEFAULT_PROVIDER)
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_MODEL, default=data.get(CONF_MODEL, DEFAULT_MODEL)
                ): model_selector(PROVIDER_MODELS.get(provider, [])),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema)
