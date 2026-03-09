"""Light Companion integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .api import LightCompanionEntitiesView, LightCompanionProcessView
from .const import (
    CONF_LLM_SOURCE,
    DOMAIN,
    LLM_SOURCE_HA_OPENAI,
    OPENAI_INTEGRATION_DOMAIN,
)
from .panel import async_register_panel, async_unregister_panel


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up integration via YAML (unused)."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Light Companion from config entry."""
    merged_config = {**entry.data, **entry.options}
    llm_source = merged_config.get(CONF_LLM_SOURCE, LLM_SOURCE_HA_OPENAI)

    if llm_source == LLM_SOURCE_HA_OPENAI and not hass.config_entries.async_entries(
        OPENAI_INTEGRATION_DOMAIN
    ):
        return False

    domain_data = hass.data.setdefault(DOMAIN, {})
    domain_data[entry.entry_id] = entry

    if not domain_data.get("views_registered"):
        hass.http.register_view(LightCompanionProcessView)
        hass.http.register_view(LightCompanionEntitiesView)
        hass.http.register_view(LightCompanionOptionsView)
        domain_data["views_registered"] = True

    await async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload Light Companion config entry."""
    domain_data = hass.data[DOMAIN]
    domain_data.pop(entry.entry_id, None)

    await async_unregister_panel(hass)
    return True
