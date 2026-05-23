# Ubuntu setup (OpenClaw for Leta liaison)

Run these steps **only on Ubuntu** (22.04+ recommended). Your Mac stays free of OpenClaw — use this repo folder from git.

## Prerequisites

```bash
sudo apt update && sudo apt install -y curl git build-essential
```

## Install OpenClaw (official)

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw onboard --install-daemon
openclaw doctor
```

Docs: https://docs.openclaw.ai/install

## Install Leta workspace from this repo

After cloning `leta`:

```bash
cd /path/to/leta/integrations/openclaw/ubuntu
chmod +x install-workspace.sh
./install-workspace.sh
```

Default target: `~/.openclaw/workspace/leta-liaison`

Override:

```bash
OPENCLAW_WORKSPACE=$HOME/openclaw-leta ./install-workspace.sh
```

## Configure API key (on Ubuntu only)

```bash
cp ../env.example ~/.openclaw/leta-liaison.env
# Edit and add your provider key — never commit this file
```

Load in shell profile if needed:

```bash
set -a && source ~/.openclaw/leta-liaison.env && set +a
```

## Verify skills are visible

```bash
openclaw doctor
# In the OpenClaw UI (default http://127.0.0.1:18789), select workspace leta-liaison
```

## Test Barrister email triage

1. Redact a real Barrister email (remove customer PII if policy requires).  
2. Ask the agent to run skill `barrister-email-triage`.  
3. Compare JSON fields to your Leta ticket form.

## Remote access (optional)

SSH tunnel from laptop to Ubuntu gateway:

```bash
ssh -L 18789:127.0.0.1:18789 user@your-ubuntu-host
```

Then open http://localhost:18789 locally.

## Updates

```bash
openclaw update   # or reinstall via install.sh
cd /path/to/leta && git pull
./integrations/openclaw/ubuntu/install-workspace.sh
```
