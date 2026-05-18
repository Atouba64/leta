# Partner onboarding checklist

Use this before the **first production ticket**. Checkbox = required for pilot.

## Commercial

- [ ] Signed partner channel agreement (or pilot LOI + MSA path dated)
- [ ] Rate card agreed: flat / hourly / minimums / after-hours
- [ ] Mobilization & cancel-on-arrival rules documented
- [ ] SLA tier mapping (P1–P4) with clock start/stop definitions
- [ ] Billing contact + AP email; invoice cadence (weekly/monthly)
- [ ] Pilot scope: geography, ticket types, max concurrent WOs

## Legal & insurance

- [ ] GL certificate received (limits per outline)
- [ ] Workers comp or waiver where applicable
- [ ] DPA signed if end-customer PII in tickets
- [ ] Anti-poaching / on-platform performance clause acknowledged
- [ ] Counsel reviewed [`../04-legal-and-compliance/partner-channel-agreement-outline.md`](../04-legal-and-compliance/partner-channel-agreement-outline.md)

## Technical

- [ ] `tenantId` + `partnerId` created in Firestore
- [ ] Dispatcher accounts: Firebase Auth + `partner_dispatcher` role
- [ ] Partner portal login tested (or admin-created tickets until portal live)
- [ ] Notification emails for: new ticket, completed, SLA risk
- [ ] `partnerWorkOrderId` field required on create — enforced
- [ ] Sandbox ticket: full timeline + test Leta Live
- [ ] Escalation phone for ops: `(470) 252-6681` (exceptions only)

## Operations training (30–45 min)

- [ ] Walk through GUS diagram — who is Tier 2
- [ ] Show partner dashboard map/timeline (mock or prod)
- [ ] Explain POC-only and roof/ladder flags
- [ ] Close-out package sample (PDF export)
- [ ] Dispute / change-order process

## Tech bench readiness

- [ ] Skills needed for pilot tagged in roster (`cradlepoint`, `pos`, etc.)
- [ ] Minimum 5 active techs in pilot counties
- [ ] Remote overwatch bench available for pilot window

## Go-live

- [ ] Run [`pilot-playbook.md`](./pilot-playbook.md)
- [ ] Retrospective scheduled at ticket 5 and 10
- [ ] QBR date on calendar
