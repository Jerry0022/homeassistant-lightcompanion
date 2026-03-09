# Changelog

## 0.2.4
- Remove binary icon assets (`icon.png`/`logo.png`) because binary files are not supported in this delivery workflow.
- Keep `panel_icon` (`mdi:head-lightbulb`) for Home Assistant sidebar visibility without binary assets.
- Keep the PEP 668-compatible virtualenv Docker build strategy and bump runtime version metadata.

## 0.2.3
- Fix Docker build on Home Assistant base images by installing Python packages in a dedicated virtual environment (PEP 668 compatible).
- Add `icon.png` and `logo.png` assets so the add-on icon appears in Home Assistant UI.
- Bump app server version metadata to match the add-on release.

## 0.2.2
- Add explicit add-on changelog to avoid Home Assistant "No changelog found" messages.
- Bump add-on version metadata to trigger update availability.
- Align app server version string with add-on version.

## 0.2.1
- Initial published version of the Home Assistant add-on app.
