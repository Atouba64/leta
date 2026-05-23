#!/bin/bash
# Quick OpenClaw health check for Leta (local gateway, budget setup)
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

URL="${OPENCLAW_URL:-http://127.0.0.1:18789}"
TOKEN="${OPENCLAW_GATEWAY_TOKEN:-}"

echo "OpenClaw URL: $URL"
if [[ -z "$TOKEN" || "$TOKEN" == YOUR_OPENCLAW_GATEWAY_TOKEN* ]]; then
  echo "WARN: Set OPENCLAW_GATEWAY_TOKEN in openclaw/.env"
  exit 1
fi

code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" \
  "$URL/health" 2>/dev/null || echo "000")

if [[ "$code" != "200" && "$code" != "204" ]]; then
  echo "Gateway not healthy (HTTP $code). Run: systemctl --user start openclaw-gateway.service"
  exit 1
fi

echo "Gateway OK."

# Minimal chat test (uses Gemini via gateway — small token cost)
resp=$(curl -s -X POST "$URL/v1/chat/completions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"openclaw:leta\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with exactly: Leta OpenClaw OK\"}],\"max_tokens\":20}")

echo "$resp" | head -c 200
echo ""
echo "Done. If you see an error, check GEMINI_API_KEY in ~/.openclaw/.env"
