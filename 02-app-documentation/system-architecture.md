# System architecture — Leta (conceptual)

High-level blueprint for a **centralized** platform with **mobile** (field), **web** (customers + remote techs + partners), and **cloud** backend. Implementation choices are intentionally flexible; this document is the **north star** for services and data boundaries.

## Architectural principles

1. **Single source of truth** for tickets, users, payouts, and media metadata.  
2. **Real-time** where it matters (offers, tracking, escalation sessions)—**async** where it does not (reporting, invoicing).  
3. **Least privilege** for partner integrations and remote sessions.  
4. **Auditability** for disputes: append-only event log for ticket state transitions.

## Major components

```
                    ┌─────────────────────┐
                    │   Customer web/app   │
                    └──────────┬──────────┘
                               │
  ┌──────────────┐    ┌─────────▼─────────┐    ┌────────────────────┐
  │ Field mobile │───►│   API gateway     │◄───│ Remote tech portal │
  └──────┬───────┘    │  (auth, rate lim) │    └─────────┬──────────┘
         │            └─────────┬─────────┘              │
         │                      │                        │
         │            ┌─────────▼─────────┐              │
         └───────────►│  Core services      │◄─────────────┘
                      │  tickets, match,   │
                      │  payments, notify  │
                      └─────────┬─────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
        ┌──────────┐    ┌────────────┐   ┌──────────────┐
        │ Primary  │    │ Real-time  │   │ Object store│
        │ database │    │ (sessions, │   │ (photos,   │
        │          │    │  presence) │   │  artifacts)│
        └──────────┘    └────────────┘   └──────────────┘
```

## Core domains (service-oriented sketch)

| Domain | Responsibilities |
|--------|------------------|
| **Identity** | Customers, techs, remote techs, partner orgs, RBAC. |
| **Ticketing** | Lifecycle, SLA timers, scope changes, signatures. |
| **Dispatch / matching** | Geo queries, ranking, offer/accept windows. |
| **Realtime** | Presence, chat, escalation signaling, ephemeral session tokens. |
| **Media** | Upload, virus scan hook, retention policy, signed URLs. |
| **Payments** | Customer charge, platform fee, tech payout, partner settlement. |
| **Notifications** | Push, SMS, email providers with templating. |
| **Partner integrations** | Webhooks/API for MSP tools, optional white-label config; **partner portal** for fulfillment partners (dispatch visibility, SLA, reconciliation—see [`partner-portal/user-stories.md`](./partner-portal/user-stories.md)). |

## Geo and privacy (design constraints)

- Store and display **location** with **purpose limitation** (dispatch + customer ETA), not perpetual tracking.  
- Obfuscate **precise** coordinates in customer UI until an appropriate phase of the job (policy TBD with legal).

## Suggested stack notes (non-binding)

- Partner **transparency dashboard** prototype discussed as **React + Firebase**-class stack; production may split into managed auth, Postgres, and a realtime channel (WebRTC vendor or managed service) for video.

## Cross-cutting concerns

- Observability (tracing/metrics/logs) per service.  
- Feature flags for market rollout (Georgia-only toggles).  
- Backoffice admin (not yet user-storied—add when ops team defined).

## Related

- [`ui-ux-wireframe-notes.md`](./ui-ux-wireframe-notes.md)  
- [`../01-business-plan/operational-model.md`](../01-business-plan/operational-model.md)
