"""Light Companion integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .api import (
    LightCompanionEntitiesView,
    LightCompanionOptionsView,
    LightCompanionProcessView,
    LightCompanionStatusView,
)
from .const import (
    ALL_AGENT_DOMAINS,
    DOMAIN,
)
from .panel import async_register_panel, async_unregister_panel


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up integration via YAML (unused)."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Light Companion from config entry."""
    available = {e.domain for e in hass.config_entries.async_entries()}
    if not set(ALL_AGENT_DOMAINS).intersection(available):
        return False

    domain_data = hass.data.setdefault(DOMAIN, {})
    domain_data[entry.entry_id] = entry

    if not domain_data.get("views_registered"):
        hass.http.register_view(LightCompanionProcessView)
        hass.http.register_view(LightCompanionEntitiesView)
        hass.http.register_view(LightCompanionOptionsView)
        hass.http.register_view(LightCompanionStatusView)
        domain_data["views_registered"] = True

    await async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload Light Companion config entry."""
    domain_data = hass.data[DOMAIN]
    domain_data.pop(entry.entry_id, None)

    await async_unregister_panel(hass)
    return True
