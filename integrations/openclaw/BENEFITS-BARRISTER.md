# OpenClaw benefits for Barrister × Leta liaison

Barrister operates with **phones and email**. Leta’s product goal is **one ticket timeline** for techs and partners. OpenClaw closes the gap on the **liaison desk** without hiring another coordinator or buying enterprise automation seats.

## High-impact uses (implement first)

### 1. Email work-order triage

**Problem:** Dispatch emails arrive with inconsistent subjects, signatures, and missing POC lines.  
**OpenClaw:** Skill `barrister-email-triage` extracts:

- Partner WO / BAM-style ID  
- Site name and address (Georgia)  
- POC name and direct phone  
- SLA window  
- Scope one-liner  
- Flags: `poc_only`, `urgent`

**Output:** JSON or markdown block liaison pastes into Leta (or future API).  
**Budget:** Use a small/fast model; one email ≈ one short completion.

### 2. “Confirm WO still open” reminders

**Problem:** Techs drive to sites after WO cancel — classic phone-dispatch pain.  
**OpenClaw:** Scheduled check (cron via OpenClaw daemon) on a list of active ticket IDs you export from Leta (CSV/manual at first).  
**Output:** “Ticket X — no WO confirmation in 2h — ping dispatch?” to liaison Slack/email.

### 3. Thread message drafts after phone calls

**Problem:** Barrister expects email/paper trail; techs call POC and dispatch but notes stay in heads.  
**OpenClaw:** Liaison dictates or pastes rough notes → formatted ticket thread entry (“Called dispatch 10:04 — WO confirmed open”).  
**Budget:** No telephony integration required.

### 4. Morning open-ticket digest

**Problem:** Liaison opens inbox blind.  
**OpenClaw:** Nightly job summarizes open partner tickets (from pasted list or spreadsheet).  
**Output:** 5-bullet brief: urgent, stale, missing POC, ready to invoice.

## Medium-term uses (after pilot trust)

### 5. WhatsApp / SMS recruit lane (Leta tech hiring)

Draft replies for `website/recruit/whatsapp-flow.md` — **human sends**. Same gateway, different skill file.

### 6. Meeting note → stakeholder update

After Enver/Barrister calls, turn notes into follow-up email draft matching `07-partner-accounts/barrister-global-services/` tone.

### 7. Duplicate WO detection

Compare new email WO # against last N entries in a local JSON file (liaison-maintained) to catch double dispatch.

## Low priority / skip until revenue

- Full auto-create Firestore tickets (needs secured webhook + budget for mistakes).  
- Real-time call transcription (costly APIs).  
- Mac or Windows gateway (you standardize on Ubuntu).

## What OpenClaw is *not*

- Not a replacement for **Leta Tech** dispatch UI or **platform voice**.  
- Not visible to Barrister as a product — it is **your** ops tool.  
- Not required for Phase 1 pilot — email + phone + app works without it.

## Cost control checklist

1. One Ubuntu host (old laptop or ~$6/mo VPS).  
2. Cheapest model that correctly extracts WO fields in your tests.  
3. Human approves every outbound to Barrister.  
4. Batch digests (1×/day) instead of per-ticket agents.  
5. Keep skills in git (`workspace/leta-liaison/`) — no paid marketplace.

## Alignment with migration phases

| Phase | Barrister | Leta | OpenClaw |
|-------|-----------|------|----------|
| 1 Accommodate | Email/phone | Phone-first app | Email triage + drafts |
| 2 Mirror | Same channels | Thread is source of truth | Note → thread drafts |
| 3 Platform | Portal WOs | Automated status | Digests + QA only |
