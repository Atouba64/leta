#!/bin/bash
# Repair common ~/.openclaw/openclaw.json syntax errors and align Leta workspace path.
set -euo pipefail

CONFIG="${OPENCLAW_CONFIG:-$HOME/.openclaw/openclaw.json}"
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WORKSPACE="${LETA_OPENCLAW_WORKSPACE:-$REPO_ROOT/openclaw/workspace}"

if [[ ! -d "$WORKSPACE" ]]; then
  echo "Workspace not found: $WORKSPACE"
  exit 1
fi

TOKEN=""
if [[ -f "$CONFIG" ]]; then
  TOKEN="$(python3 - <<'PY' "$CONFIG" 2>/dev/null || true
import json, sys
path = sys.argv[1]
try:
    with open(path) as f:
        raw = f.read()
    # Best-effort: extract gateway token substring
    import re
    m = re.search(r'"token"\s*:\s*"([^"]+)"', raw)
    if m and not m.group(1).startswith("YOUR_"):
        print(m.group(1))
except Exception:
    pass
PY
)"
fi

if [[ -z "$TOKEN" ]]; then
  TOKEN="YOUR_OPENCLAW_GATEWAY_TOKEN"
  echo "WARN: No existing gateway token found — set gateway.auth.token after repair."
fi

mkdir -p "$(dirname "$CONFIG")"
cp "$CONFIG" "$CONFIG.bak.$(date +%Y%m%d%H%M%S)" 2>/dev/null || true

WORKSPACE="$WORKSPACE" CONFIG="$CONFIG" TOKEN="$TOKEN" python3 - <<'PY'
import json, os
config = {
  "agents": {
    "list": [{
      "id": "leta",
      "default": True,
      "name": "Leta",
      "workspace": os.environ.get("WORKSPACE", ""),
      "model": "google/gemini-2.5-flash",
    }],
    "defaults": {
      "workspace": os.environ.get("WORKSPACE", ""),
      "model": {"primary": "google/gemini-2.5-flash"},
      "compaction": {"mode": "safeguard"},
    },
  },
  "session": {"dmScope": "per-channel-peer"},
  "channels": {
    "whatsapp": {
      "dmPolicy": "pairing",
      "allowFrom": ["+14702526681"],
      "groupPolicy": "allowlist",
      "mediaMaxMb": 50,
    },
    "telegram": {"enabled": False, "botToken": "YOUR_TELEGRAM_BOT_TOKEN", "dmPolicy": "pairing"},
    "discord": {"enabled": False, "token": "YOUR_DISCORD_BOT_TOKEN", "dm": {"enabled": True, "policy": "pairing"}},
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "http": {"endpoints": {"chatCompletions": {"enabled": True}}},
    "auth": {"mode": "token", "token": os.environ["TOKEN"]},
  },
  "plugins": {
    "entries": {
      "whatsapp": {"enabled": True},
      "telegram": {"enabled": False},
      "discord": {"enabled": False},
    },
  },
}
with open(os.environ["CONFIG"], "w") as f:
    json.dump(config, f, indent=2)
    f.write("\n")
print("Wrote", os.environ["CONFIG"])
PY

echo "Workspace: $WORKSPACE"
echo "Next: openclaw doctor --fix && systemctl --user restart openclaw-gateway.service"
