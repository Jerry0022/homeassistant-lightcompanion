"""Config flow for Light Companion."""

from __future__ import annotations

from typing import Any

from homeassistant.helpers import selector

import voluptuous as vol

from homeassistant import config_entries

from .const import (
    CONF_LLM_SOURCE,
    DOMAIN,
    LLM_SOURCE_HA_OPENAI,
    OPENAI_INTEGRATION_DOMAIN,
    PROVIDER_MODELS,
)


def _model_selector(provider: str) -> selector.SelectSelector:
    """Build a model selector for selected provider."""
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=PROVIDER_MODELS.get(provider, []),
            custom_value=True,
            mode=selector.SelectSelectorMode.DROPDOWN,
        )
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
        provider = (user_input or {}).get(CONF_PROVIDER, DEFAULT_PROVIDER)
        schema = vol.Schema(
            {
                vol.Required(CONF_PROVIDER, default=provider): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=["openai", "anthropic", "google"],
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Required(CONF_API_KEY): str,
                vol.Required(CONF_MODEL, default=DEFAULT_MODEL): _model_selector(provider),
                vol.Required(CONF_BASE_URL, default=DEFAULT_BASE_URL): str,
            }
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
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        data = {**self.config_entry.data, **self.config_entry.options}
        provider = data.get(CONF_PROVIDER, DEFAULT_PROVIDER)
        schema = vol.Schema(
            {
                vol.Required(CONF_PROVIDER, default=provider): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=["openai", "anthropic", "google"],
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Required(CONF_API_KEY, default=data.get(CONF_API_KEY, "")): str,
                vol.Required(CONF_MODEL, default=data.get(CONF_MODEL, DEFAULT_MODEL)): _model_selector(provider),
                vol.Required(CONF_BASE_URL, default=data.get(CONF_BASE_URL, DEFAULT_BASE_URL)): str,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
