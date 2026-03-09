# Home Assistant Light Companion

Eine moderne Home-Assistant-Custom-Integration (HACS), die natürlichsprachige Licht-Kommandos per externem LLM interpretiert und direkt auf `light`-Entitäten ausführt.

## Features
- Eigener Sidebar-Menüpunkt in Home Assistant: **Light Companion**
- Direkt fokussiertes Eingabefeld (ideal für Android-Mikrofon/Voice-Input)
- Unterstützt genau **einen aktiven LLM-Provider** zur Zeit (konfigurierbar)
- Übergibt verfügbare `light`-Entitäten inkl. Fähigkeiten an das LLM
- Erwartet strikt maschinenlesbares JSON und setzt daraus Licht-Aktionen um
- UI-Log zeigt transparent, was interpretiert und ausgeführt wurde

## Wichtig: Kein Home-Assistant-Add-on
Dieses Repository ist **kein Supervisor-Add-on-Repository** für den Bereich „App-Store/Add-ons“.
Es ist eine **Custom Integration** und muss über **HACS → Integrationen** installiert werden.

Wenn du die URL im Add-on-Store einfügst, erscheint korrekt die Meldung
„not a valid add-on repository“, weil dafür die typische Add-on-Struktur (`repository.yaml` + Add-on-Ordner mit `config.json`) fehlt.

## Installation (HACS)
1. HACS → **Integrations** → Menü → **Custom repositories**.
2. Dieses GitHub-Repo als Integration hinzufügen (Typ: **Integration**).
3. **Light Companion** installieren.
4. Home Assistant neu starten.
5. Einstellungen → Geräte & Dienste → Integration hinzufügen → **Light Companion**.

## Konfiguration
Bei der Einrichtung werden konfiguriert:
- Provider (`openai`, `anthropic`, `google`)
- API-Key
- Modellname
- Base-URL

> Hinweis: Für `google` wird aktuell ein OpenAI-kompatibler Gateway-Endpunkt erwartet.

## Nutzung
1. Sidebar: **Light Companion** öffnen.
2. Befehl eingeben oder per Handy-Mikrofon diktieren (z. B. „Ich will Disco im Wohnzimmer“).
3. Antwort wird als Aktionen auf `light`-Entitäten ausgeführt.
4. Ergebnis im integrierten Log nachvollziehen.

## Projektstruktur
- `custom_components/lightcompanion/` – Integration
- `custom_components/lightcompanion/frontend/` – Panel UI
- `custom_components/lightcompanion/config_flow.py` – UI-Setup
- `AGENTS.md` + `skills/` – Codex-Richtlinien für moderne HA-Entwicklung
