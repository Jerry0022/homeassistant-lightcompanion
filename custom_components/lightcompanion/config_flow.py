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
    LLM_SOURCE_HA_CONVERSATION,
    PROVIDER_AGENT_DOMAINS,
    PROVIDER_MODELS,
)


class LightCompanionConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Handle first step."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        available = {e.domain for e in self.hass.config_entries.async_entries()}
        available_providers = [
            p for p, domains in PROVIDER_AGENT_DOMAINS.items()
            if set(domains).intersection(available)
        ]

        if not available_providers:
            return self.async_abort(reason="missing_llm")

        # Prefer openai if available (most common), otherwise take first found
        default_provider = "openai" if "openai" in available_providers else available_providers[0]
        default_model = PROVIDER_MODELS.get(default_provider, [DEFAULT_MODEL])[0]

        return self.async_create_entry(
            title="Light Companion",
            data={
                CONF_LLM_SOURCE: LLM_SOURCE_HA_CONVERSATION,
                CONF_PROVIDER: default_provider,
                CONF_MODEL: default_model,
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

        available = {e.domain for e in self.hass.config_entries.async_entries()}
        available_providers = [
            p for p, domains in PROVIDER_AGENT_DOMAINS.items()
            if set(domains).intersection(available)
        ]
        # Ensure the current provider is always in the list even if its integration
        # was removed after initial setup
        if provider not in available_providers:
            available_providers.insert(0, provider)

        schema = vol.Schema(
            {
                vol.Required(CONF_PROVIDER, default=provider): vol.In(available_providers),
                vol.Required(
                    CONF_MODEL, default=data.get(CONF_MODEL, DEFAULT_MODEL)
                ): model_selector(PROVIDER_MODELS.get(provider, [])),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema)
