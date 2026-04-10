"""Sidebar panel registration for Light Companion."""

from __future__ import annotations

from ha_customapps.panel import PanelRegistrar
from homeassistant.components import panel_custom
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_COMPONENT_NAME,
    PANEL_ICON,
    PANEL_MODULE_PATH,
    PANEL_TITLE,
    PANEL_URL_PATH,
)


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register custom sidebar panel."""
    registrar = PanelRegistrar(
        hass,
        DOMAIN,
        panel_component=PANEL_COMPONENT_NAME,
        panel_title=PANEL_TITLE,
        panel_icon=PANEL_ICON,
        panel_url_path=PANEL_URL_PATH,
        module_url=PANEL_MODULE_PATH,
        frontend_dir=hass.config.path("custom_components", DOMAIN, "frontend"),
    )
    await registrar.async_register()


async def async_unregister_panel(hass: HomeAssistant) -> None:
    """Unregister custom sidebar panel."""
    await panel_custom.async_unregister_panel(hass, PANEL_URL_PATH)
