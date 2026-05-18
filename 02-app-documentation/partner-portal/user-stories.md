# Partner portal — user stories

Web dashboard for Tier 2 MSPs, OEMs, and national field networks. Replaces phone trees with **ticket truth**.

Ops handbook: [`../../06-partner-operations/README.md`](../../06-partner-operations/README.md).

---

## Epic P1 — Ticket creation & dispatch

**As a** partner dispatcher  
**I want to** create a work order with our internal ticket number and POC rules  
**So that** Leta fulfills onsite without miscommunication.

**Acceptance criteria**
- Required: address, window, skills, partner WO #, rate type
- Optional: `poc_only`, roof/ladder flags, file attachments
- On submit → ticket `dispatched` and offers sent to matched techs
- Email confirmation with Leta ticket id + partner WO #

---

## Epic P2 — Live visibility (no-call guarantee)

**As a** partner dispatcher  
**I want to** see tech ETA and status on a map/timeline  
**So that** I do not call Leta or the tech for routine updates.

**Acceptance criteria**
- Status updates within 60s of tech action
- SLA clock visible with risk color
- No tech personal phone shown pre–on-site (configurable)

---

## Epic P3 — Leta Live overwatch

**As a** partner remote engineer (e.g. Qmatic)  
**I want to** join a video session when the field tech escalates  
**So that** we fix proprietary gear without a 50-person bridge.

**Acceptance criteria**
- Alert when tech taps Request Remote Expert
- One-click join; session tied to ticket id
- Recording policy per partner contract (v2)

---

## Epic P4 — Close-out & billing

**As a** partner AP clerk  
**I want to** download CSV and PDF packages for completed WOs  
**So that** I can invoice my customer (GUS upstream).

**Acceptance criteria**
- CSV columns: partner WO #, Leta id, dates, rate, total, tech id hash
- PDF includes photos + signature
- Dispute button within 5-day window

---

## Epic P5 — Multi-tenant security

**As a** platform admin  
**I want** partner A to never see partner B tickets  
**So that** we meet enterprise trust.

**Acceptance criteria**
- All queries scoped by `tenantId`
- RBAC: dispatcher vs admin vs read-only
- See [`rbac-and-tenancy.md`](./rbac-and-tenancy.md)

---

## Epic P6 — PSA integration (v2)

**As a** partner ops lead  
**I want** ConnectWise/ServiceNow tickets to create Leta WOs automatically  
**So that** we do not double-enter data.

**Acceptance criteria**
- Webhook or poll with idempotent `partnerWorkOrderId`
- Status sync back on `completed`  
- See [`api-and-psa-sync.md`](./api-and-psa-sync.md)

---

## Screens

[`screen-inventory.md`](./screen-inventory.md)

## Integrations

[`third-party-integrations.md`](./third-party-integrations.md)
