# Home Assistant Light Companion

Light Companion is a Home Assistant custom integration that lets you control entities in the `light` domain with natural-language commands interpreted by an LLM.

## Installation (HACS)
1. Open HACS in Home Assistant.
2. Go to **HACS → 3-dot menu → Custom repositories**.
3. Add repository URL `https://github.com/jamct/lightcompanion` with category **Integration**.
4. Search for **Light Companion** in HACS and install it.
5. Restart Home Assistant.
6. Go to **Settings → Devices & Services → Add Integration** and add **Light Companion**.

### Can't find Light Companion in HACS search?
- Light Companion is currently intended to be installed as a **custom repository**.
- It may not appear in HACS global/default search until accepted into the default catalog.
- Add the repository URL manually via **Custom repositories** and then search/install in HACS.

### Do I need HACS?
- HACS is only an **installation channel** for this custom integration.
- The runtime setup is always done via Home Assistant: **Settings → Devices & Services → Add Integration → Light Companion**.

### Installation without HACS (manual)
1. Copy `custom_components/lightcompanion` to your HA config directory at `config/custom_components/lightcompanion`.
2. Restart Home Assistant.
3. Open **Settings → Devices & Services → Add Integration** and add **Light Companion**.

### Why it is not listed directly in Home Assistant integrations
- Home Assistant's built-in integration catalog lists integrations shipped with HA Core.
- Light Companion is a **custom integration**, so HA can only list it after you install its files (via HACS or manual copy).
- This repository can be added as a custom repository in HACS, but appearing in the global default HACS catalog requires separate HACS review/acceptance.

## Configuration
Supported providers (one active provider at a time):
- `openai`
- `anthropic`
- `google`

Required provider settings:
- `api_key`
- `model` (switchable in the panel)
- `base_url`

For OpenAI, this integration is intended to work with your existing Home Assistant OpenAI integration setup (no separate external app server).


## Updating
### Custom integration (HACS)
1. Open HACS → **Integrations** → **Light Companion**.
2. Click **Update** when a newer version is available.
3. Restart Home Assistant after update.

### Add-on repository
1. Open **Settings → Add-ons → Add-on Store**.
2. Refresh repositories (3-dot menu → **Check for updates**).
3. Open **Light Companion App** and install/update to the newest version.

## Usage
- Open the **Light Companion** sidebar panel.
- Enter a command such as “Set living room lights to warm white at 40%”.
- The integration validates strict JSON action output before running light service calls.

## Notes
- The integration only targets entities in the `light` domain.
- Keep API keys in config entry options; never hardcode secrets.
