# OpenClaw config locations (Leta)

Files from the setup checklist — **do not duplicate** if they already exist on your machine.

| File | Scope | Status on this machine | Leta project helper |
|------|--------|------------------------|---------------------|
| `leta/openclaw/.env` | Leta secrets | **Exists** — do not overwrite | Source of truth for Leta |
| `~/.openclaw/.env` | Gateway daemon | **Exists** — do not overwrite | `gateway.env.example` + `install-to-home.sh` |
| `leta/.cursor/mcp.json` | Cursor MCP | **Exists** — do not overwrite | `mcp.json.example` for new clones |
| `~/.openclaw/openclaw.json` | Gateway config | **Exists** — do not overwrite | `openclaw.json.example`; optional `openclaw.json` (gitignored backup) |
| `leta/functions/.env` | Firebase | **Exists** — do not overwrite | `functions/.env.example` |

## New files (this pass)

| File | Purpose |
|------|---------|
| `openclaw/gateway.env.example` | Template for `~/.openclaw/.env` |
| `openclaw/scripts/install-to-home.sh` | Creates home files **only if missing** |
| `openclaw/CONFIG-LOCATIONS.md` | This index |

## Second laptop

```bash
cp openclaw/.env.example openclaw/.env   # fill keys
cp .cursor/mcp.json.example .cursor/mcp.json   # fill token
./openclaw/scripts/install-to-home.sh
systemctl --user restart openclaw-gateway.service
```
