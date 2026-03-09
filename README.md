# Home Assistant Light Companion

Light Companion is a Home Assistant custom integration that lets you control entities in the `light` domain with natural-language commands interpreted by an LLM.

## Installation (HACS)
1. Open HACS in Home Assistant.
2. Add this repository as a custom repository.
3. Install **Light Companion**.
4. Restart Home Assistant.
5. Go to **Settings → Devices & Services → Add Integration** and add **Light Companion**.

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
