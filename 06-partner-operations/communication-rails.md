# Communication rails — partners, techs, Leta ops

Replace Barrister-style **phone + email trees** with **status in product** + narrow exception channels.

## Principles

1. **If it happened on a ticket, it belongs on the ticket timeline.**
2. **Partners get visibility, not interruption** — no “where’s my tech?” calls.
3. **Techs escalate in-app** — Leta Live before leaving site unresolved.
4. **Two-person ops:** automate notifications; phone for true exceptions only.

---

## Channel matrix

| Audience | Event | Primary channel | Fallback |
|----------|-------|-----------------|----------|
| **Tech** | New offer | Push notification | SMS (optional) |
| **Tech** | Scope question | In-app chat on ticket | Call ops |
| **Tech** | Need remote help | Leta Live button | — |
| **Tech** | WO canceled | Push + in-app | — |
| **Partner** | Status change | Portal timeline + email digest | Tawk chat |
| **Partner** | Escalation needed | Portal alert + email | Call ops |
| **Partner** | Billing question | `partners@leta.repair` | — |
| **Leta ops** | Partner creates WO | Email + admin Slack (future) | — |
| **End customer** | ETA | Only if partner enables white-label SMS | Partner’s policy |

---

## What we do NOT do (v1)

- Mass Teams bridges for every ticket
- Partner calling tech cell for routine status
- Tech calling store main line when `poc_only` set

---

## Partner ↔ tech isolation

| Rule | Why |
|------|-----|
| Tech phone hidden until `on_site` optional | Reduces off-platform deals |
| All rate changes via app change-order | Audit trail |
| Partner notes visible to tech; tech chat logged | Dispute evidence |

---

## Notification cadence (email — free via Firebase/Netlify)

| Digest | Recipient | Content |
|--------|-----------|---------|
| Instant | Partner dispatcher | Assigned, completed, SLA risk |
| Daily | Partner AP | Open WOs summary (pilot: manual) |
| Instant | Leta ops | New partner WO, dispute filed |

---

## Exception phone line

`(470) 252-6681` — **text or call** for:

- Safety issue onsite
- Partner portal down
- P1 SLA breach escalation

Not for: “Has the tech left yet?” → portal.

---

## Related

- [`ticket-lifecycle-gus.md`](./ticket-lifecycle-gus.md)
- [`third-party-stack.md`](./third-party-stack.md)
