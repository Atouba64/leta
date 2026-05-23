#!/bin/bash
# Install OpenClaw home config from Leta project — skips files that already exist.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LETA_ENV="$ROOT/.env"
HOME_OPENCLAW="$HOME/.openclaw"
HOME_ENV="$HOME_OPENCLAW/.env"
HOME_JSON="$HOME_OPENCLAW/openclaw.json"
PROJECT_JSON="$ROOT/openclaw.json"
EXAMPLE_JSON="$ROOT/openclaw.json.example"

mkdir -p "$HOME_OPENCLAW"

install_env() {
  if [[ -f "$HOME_ENV" ]]; then
    echo "SKIP (exists): $HOME_ENV"
    return
  fi
  if [[ ! -f "$LETA_ENV" ]]; then
    echo "ERROR: Missing $LETA_ENV — cp .env.example .env and fill keys first."
    exit 1
  fi
  GEMINI=$(grep -E '^GEMINI_API_KEY=' "$LETA_ENV" | cut -d= -f2- || true)
  if [[ -z "$GEMINI" || "$GEMINI" == YOUR_* ]]; then
    echo "ERROR: Set GEMINI_API_KEY in $LETA_ENV"
    exit 1
  fi
  printf '%s\n' "# OpenClaw gateway (installed from Leta)" "GEMINI_API_KEY=$GEMINI" > "$HOME_ENV"
  echo "CREATED: $HOME_ENV"
}

install_json() {
  if [[ -f "$HOME_JSON" ]]; then
    echo "SKIP (exists): $HOME_JSON"
    return
  fi
  SRC="$PROJECT_JSON"
  [[ -f "$SRC" ]] || SRC="$EXAMPLE_JSON"
  cp "$SRC" "$HOME_JSON"
  echo "CREATED: $HOME_JSON (from $(basename "$SRC"))"
  echo "      Review gateway.auth.token matches leta/openclaw/.env"
}

install_env
install_json

echo ""
echo "Restart gateway: systemctl --user restart openclaw-gateway.service"
