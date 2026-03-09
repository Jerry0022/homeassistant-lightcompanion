# Home Assistant Light Companion (Add-on/App Repository)

Dieses Repository ist ein **Home Assistant Add-on-Repository** für den App-Store (Supervisor).
Das Add-on stellt eine kleine Light-Companion-App bereit und ist für Lichtsteuerungs-Workflows im `light`-Domain-Kontext gedacht.

## Installation (App-Store/Add-ons)
1. Home Assistant → **Einstellungen** → **Add-ons** → **Add-on-Store**.
2. Menü (⋮) → **Repositories**.
3. Repository-URL einfügen:
   - `https://github.com/Jerry0022/homeassistant-lightcompanion`
4. Add-on **Light Companion App** installieren.
5. In den Add-on-Optionen konfigurieren und starten.

## Konfiguration
Unterstützte Provider (genau ein aktiver Provider):
- `openai`
- `anthropic`
- `google`

Erforderliche Optionen:
- `api_key`
- `model`
- `base_url`

## API / UI
- Ingress-Panel im Home Assistant Add-on verfügbar.
- Healthcheck: `GET /health`
- Laufzeitinfo: `GET /info`

## Repository-Struktur
- `repository.yaml` – Add-on-Repository Index
- `addons/lightcompanion-app/config.yaml` – Add-on-Metadaten und Optionen
- `addons/lightcompanion-app/` – Container-App
