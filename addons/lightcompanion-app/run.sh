#!/usr/bin/env bash
set -euo pipefail

mkdir -p /data

exec /opt/venv/bin/python -m app.main
