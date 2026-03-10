# Skill: homeassistant-modern

## Purpose
Use this skill when implementing or updating Home Assistant custom integrations in this repository.

## Rules
1. Use modern Home Assistant patterns only:
   - Config entries and config flows
   - Async I/O and non-blocking code
   - Service calls through `hass.services.async_call`
2. Avoid deprecated APIs, legacy setup methods, and old frontend patterns.
3. Treat `light` as the canonical domain for light entities.
4. Keep LLM interactions deterministic for automation:
   - strict JSON schema response
   - validate before applying actions
5. Ensure HACS-friendly repository structure.
6. Keep documentation and guidance text in English by default.
7. Keep localization files translatable, but ensure fallback/source strings are English.
8. Apply semantic versioning on every code change:
   - At minimum, bump the patch version (last number) for any change.
   - For functional extensions (new functionality, not bug fixes or improvements), bump the minor version (middle number).
   - Bump the major version (first number) only when explicitly requested by the repository owner/user.
   - Always include the version bump in the same commit as the code change.

## Checklist
- [ ] `manifest.json` contains integration metadata and dependencies.
- [ ] `config_flow.py` exists and stores provider config in entries/options.
- [ ] Sidebar panel is registered from integration setup.
- [ ] Frontend sends command text and shows action log/status.
- [ ] Backend exposes secure API endpoints under `/api/...` and uses HA auth.
- [ ] README explains install via custom repository and usage flow.
- [ ] Version was bumped according to semver policy (patch for any change, minor for new functionality, major only on explicit request).
- [ ] Version bump is committed together with the related code/docs changes.
