---
name: dispatch-stale-reminder
description: Review a pasted list of open partner tickets and flag stale / missing WO confirmation.
---

# Dispatch stale reminder

## When to use

User pastes a **table or bullet list** of open Barrister/Leta tickets with: ticket id, WO #, status, last update time, tech name (optional).

## Output

Markdown brief with sections:

1. **Urgent** — SLA at risk (< 2h or overdue)
2. **Stale** — no update in > 4h while assigned/en_route
3. **Missing WO confirm** — tech accepted but no "WO open" note
4. **Ready to close** — on_site/completed but no signature

Max 15 lines total. Action each line: who to ping (liaison / dispatch / tech).

## Rules

- Do not fabricate ticket IDs.
- If times are missing, say "cannot assess SLA" for that row.
