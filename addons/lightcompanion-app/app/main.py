"""Light Companion add-on app server."""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

OPTIONS_PATH = "/data/options.json"
HOST = "0.0.0.0"
PORT = 8099


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


class LightCompanionHandler(BaseHTTPRequestHandler):
    server_version = "LightCompanionApp/0.2.5"

    def _write_json(self, payload: dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _write_html(self, html: str) -> None:
        body = html.encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        return

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            self._write_json({"status": "ok"})
            return

        if self.path == "/info":
            options = AddonOptions.load()
            self._write_json(
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
            return

        if self.path == "/":
            self._write_html(
                """
                <html>
                  <head><meta charset=\"utf-8\"><title>Light Companion App</title></head>
                  <body style=\"font-family: sans-serif; margin: 2rem;\">
                    <h1>Light Companion App</h1>
                    <p>This repository is now structured as a Home Assistant add-on repository.</p>
                    <p>Use <code>/health</code> for health checks and <code>/info</code> for runtime details.</p>
                  </body>
                </html>
                """.strip()
            )
            return

        self._write_json({"error": "not_found"}, status=HTTPStatus.NOT_FOUND)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), LightCompanionHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
