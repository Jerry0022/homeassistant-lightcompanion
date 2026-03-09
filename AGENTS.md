# AGENTS instructions for this repository

## Scope
These instructions apply to the whole repository.

## Product and platform rules
- This repository hosts a **Home Assistant custom integration** (HACS-compatible), not a standalone app.
- Always prefer the **current Home Assistant architecture**:
  - Config Entries + UI config flows
  - Async-first Python code
  - No YAML-only setup for core behavior
  - No deprecated HA APIs
- The integration must expose UI through Home Assistant (sidebar/menu panel), not an external server process.

## Code standards
- Python: type hints, dataclasses where useful, constants in `const.py`, small focused modules.
- Frontend: modern Web Components for panel UI, no legacy Polymer patterns.
- Keep provider integrations isolated and easy to extend.
- Never hardcode secrets; API keys belong in config entry options.

## LLM safety and behavior
- Only one LLM provider may be active at a time.
- Prompting must include available `light` entities and capabilities.
- LLM output must be strict machine-readable JSON and validated before execution.
- On parse/validation errors, do not execute light service calls.

## Documentation rules
- Keep README short and practical with installation and usage.
- Document supported providers and required API keys.
- Mention that the integration controls entities in the `light` domain.
- Write repository and skill documentation in English by default.
- Localizations may provide non-English text, but fallback/source strings must remain English.

## Skills in this repository
- Keep reusable Codex guidance in `skills/`.
- A repository skill should emphasize modern HA syntax and avoiding deprecated APIs.
