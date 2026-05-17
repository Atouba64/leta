# Customer and partner integration

Enterprise customers demand predictability, rapid restoration, and unvarnished visibility. Legacy models trap clients in **multi-hour arrival windows**.

## Customer experience

- **Dynamic ETAs** from live routing → Teams, SMS, or IT portals
- **Predictive logistics** → tech arrives with validated hardware
- Target: **first-time fix rates** legacy competitors cannot match mathematically

## Partner force multiplier (MSPs, integrators, OEMs)

Historically, MSPs struggled with disconnected WorkMarket "Labor Clouds" or unvetted Field Nation masses.

Leta provides a **bidirectional API gateway** for ConnectWise, ServiceNow, Jira, Autotask, etc.

### Field ownership mapping

| Data field category | Authoritative system | Rationale | Conflict resolution |
|---------------------|---------------------|-----------|---------------------|
| Ticket status & billing phase | Partner PSA | Partners own financial lifecycle | Leta read-only |
| Technician geolocation & ETA | Leta dispatch engine | Live routing truth | Webhook push to PSA |
| On-site deliverables & hardware consumption | Leta mobile app | Physical truth at asset | Edge wins on sync → PSA update |

## Flow

Partner creates ticket in Autotask → Leta AI dispatches vetted tech (no bidding war) → offline-first execution → signatures/metrics sync back instantly.

See [`../../02-app-documentation/partner-portal/user-stories.md`](../../02-app-documentation/partner-portal/user-stories.md).
