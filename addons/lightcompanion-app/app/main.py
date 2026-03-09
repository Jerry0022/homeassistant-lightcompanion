"""Light Companion add-on app server."""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any

from aiohttp import web

OPTIONS_PATH = "/data/options.json"


@dataclass(slots=True)
class AddonOptions:
    provider: str
    api_key: str
    model: str
    base_url: str

    @classmethod
    def load(cls) -> "AddonOptions":
        raw: dict[str, Any] = {}
        if os.path.exists(OPTIONS_PATH):
            with open(OPTIONS_PATH, "r", encoding="utf-8") as handle:
                raw = json.load(handle)

        return cls(
            provider=str(raw.get("provider", "openai")),
            api_key=str(raw.get("api_key", "")),
            model=str(raw.get("model", "gpt-4o-mini")),
            base_url=str(raw.get("base_url", "https://api.openai.com/v1")),
        )


async def health(_: web.Request) -> web.Response:
    return web.json_response({"status": "ok"})


async def info(_: web.Request) -> web.Response:
    options = AddonOptions.load()
    return web.json_response(
        {
            "name": "Light Companion App",
            "mode": "home-assistant-addon",
            "provider": options.provider,
            "model": options.model,
            "base_url": options.base_url,
            "controls_domain": "light",
            "notes": [
                "Only one provider is active at a time.",
                "Configure API key in add-on options.",
            ],
        }
    )


async def index(_: web.Request) -> web.Response:
    html = """
    <html>
      <head><meta charset=\"utf-8\"><title>Light Companion App</title></head>
      <body style=\"font-family: sans-serif; margin: 2rem;\">
        <h1>Light Companion App</h1>
        <p>This repository is now structured as a Home Assistant add-on repository.</p>
        <p>Use <code>/health</code> for health checks and <code>/info</code> for runtime details.</p>
      </body>
    </html>
    """
    return web.Response(text=html, content_type="text/html")


app = web.Application()
app.router.add_get("/", index)
app.router.add_get("/health", health)
app.router.add_get("/info", info)


if __name__ == "__main__":
    web.run_app(app, host="0.0.0.0", port=8099)
