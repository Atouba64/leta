#!/usr/bin/env bash
# Copy Leta liaison OpenClaw workspace from repo to ~/.openclaw (Ubuntu).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_WORKSPACE="${SCRIPT_DIR}/../workspace/leta-liaison"
TARGET="${OPENCLAW_WORKSPACE:-${HOME}/.openclaw/workspace/leta-liaison}"

if [[ ! -d "$REPO_WORKSPACE" ]]; then
  echo "Missing workspace at $REPO_WORKSPACE"
  exit 1
fi

mkdir -p "$(dirname "$TARGET")"
rsync -a --delete \
  --exclude '.DS_Store' \
  "$REPO_WORKSPACE/" "$TARGET/"

echo "Installed Leta OpenClaw workspace → $TARGET"
echo "Next: openclaw onboard (if new) and select workspace leta-liaison"
echo "See integrations/openclaw/ubuntu/SETUP.md"
