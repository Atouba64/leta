# Platform comms & incentives — partner ↔ tech on Leta

**Goal:** Let partners and techs talk **directly** without Leta ops relaying every message — while keeping **audit trail**, **dispute evidence**, and **economic reasons** to stay on-platform.

## What we built (product)

| Feature | Where | Ops load |
|---------|-------|----------|
| **Ticket thread** (text) | Partner ticket detail + field **Active job** | Zero — async |
| **Voice via Leta Live** | Same screens → WebRTC session | Zero — peer-to-peer signaling |
| **System lines** | Auto on WO create / approve | Zero |
| **Event log** | `tickets/{id}/events` | Zero |

Personal cell numbers are **not** shown by default. Partners and techs coordinate through the **ticket id** and **Leta thread**.

## Incentives to stay on Leta (not off-platform)

| Stakeholder | On-platform benefit | Off-platform risk |
|-------------|---------------------|-------------------|
| **Field tech** | Faster **Stripe payout** when thread + close-out on Leta; rating boost for responsive messages | Disputes harder to win; may lose partner preferred pool |
| **Partner** | **Billing CSV** only includes logged comms + artifacts; SLA timeline for upstream customer | Chargebacks if no audit trail |
| **Leta** | Platform fee on completed WOs; data for dispatch quality | Leakage — mitigated by contract + economics |

### Planned mechanics (turn on as you scale)

1. **Preferred tech pool** — partners can favorite techs who reply in-thread within 15 min.
2. **Payout bonus** — +5% when ≥3 messages and sign-off in app (configurable).
3. **Partner SLA credit** — faster visibility discount if 100% comms on-platform for pilot quarter.
4. **No off-platform solicitation** — in partner MSA + tech 1099 exhibit.

## When ops still gets involved

- Safety / harassment in thread (report button — v2)
- P1 SLA breach
- Billing dispute (thread is evidence)
- Portal outage

## Technical notes

- Messages: `tickets/{ticketId}/messages`
- Voice: `createTicketChannelCall` / `joinTicketChannelCall` Cloud Functions → `live_sessions` with `purpose: partner_voice`
- App roles: **Partner dispatch** in role picker → `PartnerNavigator`

## Related

- [`communication-rails.md`](./communication-rails.md)
- [`../02-app-documentation/partner-portal/screen-inventory.md`](../02-app-documentation/partner-portal/screen-inventory.md)
