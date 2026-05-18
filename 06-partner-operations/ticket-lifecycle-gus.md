# Ticket lifecycle — GUS chains & field stories

How a single work order moves through **Leta**, using real patterns from Barrister-class operations (Food Lion / Cradlepoint) and **Qmatic → subcontractor → field tech** (Spectrum install).

---

## GUS tiers (reference)

| Tier | Example | Creates WO in Leta? |
|------|---------|---------------------|
| T1 | Food Lion store | Rarely direct — via IT chain |
| T2 | Bamboo IT, Qmatic, MSP | **Yes — primary partner** |
| T3 | Leta | Platform operator |
| T4 | Leta field tech | Executes onsite |

**Rule:** Every Leta ticket carries `partnerId`, `partnerWorkOrderId`, optional `upstreamTicketIds[]` in notes.

---

## Story A — Food Lion / Cradlepoint (retail, POC-only, remote-heavy)

### A1. Creation (Tier 2 → Leta)

Partner (e.g. Bamboo) opens Leta portal:

- **Partner WO #:** `BAM-CRDL-88421`
- **Site:** Food Lion, address, hours
- **Scope:** Cradlepoint connectivity; **may require roof access**
- **Contact policy:** `poc_only` — do not call store main line
- **POC:** Brad — name, mobile
- **Skills:** `cradlepoint`, `cabling`, `ladder_ok`
- **Rate:** Flat $X + mobilization if >50 mi

### A2. Dispatch (Leta → tech)

1. Push offer to 3 nearest qualified techs.
2. Tech sees: payout, duration estimate, roof flag, POC-only.
3. Tech **accepts** — rate locked.
4. App shows pre-read links (Cradlepoint quick-start) — *research before roll*.

### A3. En route

1. Tech taps **En route** → partner timeline updates (no dispatch call).
2. App prompts: **Confirm WO still open** (Barrister “call before you leave” — automated).
3. Optional: SMS to ops only, not customer.

### A4. On site

1. Ask floor staff for **Brad by name**.
2. Brad leads to network area / equipment room.
3. Tech stuck → **Request Leta Live** (not 50-person Teams).
4. Remote expert (may be partner’s India team or Leta remote bench) joins **one** session:
   - Video from phone
   - Expert has ticket notes, port diagrams
   - Expert provides rack lock PIN workflow — tech enters in Access UI
5. Roof path: Brad shows roof access; expert guides via video.
6. Fix: coax adapter — photo proof.

### A5. Close-out

1. Brad signs on screen (or photo of sign-off sheet).
2. Completion photos uploaded.
3. Status `completed` → partner notified.
4. Tech payout via Stripe (24h target).

**Partner never needed a phone call for status.**

---

## Story B — Qmatic / Spectrum (OEM install, proprietary gear)

### B1. Creation

Qmatic dispatcher:

- **Partner WO #:** `QMAT-SPEC-11902`
- **Scope:** Install network TV display + Qmatic system pack
- **Remote support contact:** Qmatic engineer calendar
- **Rate:** Hourly cap 4h

### B2. Dispatch

Leta tech near site accepts; Qmatic engineer notified on partner dashboard.

### B3. On site

1. Leta tech onsite; Qmatic engineer joins **Leta Live** (knows proprietary steps).
2. No public Barrister-only tooling — session recorded to ticket.
3. Install validated; Spectrum SLA clock stopped from partner view.

### B4. Economics

- Qmatic pays Leta less than sending own employee cross-state.
- Tech paid fairly for local job + learns Qmatic once.
- Spectrum sees on-time delivery.

---

## Status machine (all tickets)

| Status | Partner sees | Tech action |
|--------|--------------|-------------|
| `draft` | — | — |
| `dispatched` | Matching | Offers sent |
| `assigned` | Tech name + ETA | Accepted |
| `en_route` | Map pin moving | Driving |
| `on_site` | On site timestamp | Working |
| `overwatch_active` | Live badge | Leta Live |
| `completed` | Awaiting sign-off | Photos + signature |
| `approved` | Billable | — |
| `canceled` | Reason code | — |

---

## Cancel / change rules

| Scenario | Policy |
|----------|--------|
| Partner cancels before en route | No tech pay; notify immediately |
| Partner cancels after en route | Mobilization fee per MSA |
| Tech no-show | Escalate + backup dispatch |
| Scope change onsite | Tech requests change order in app → partner approves |

---

## Passive vs active assignment (Leta default)

| Mode | When |
|------|------|
| **Active (default)** | Push to matched techs; 5-min exclusivity for top rated |
| **Passive (optional)** | Partner names preferred tech if on Leta roster |
| **Phone (discouraged)** | Ops logs verbal accept in admin — pilot only |

**Goal:** Replace “lots of phone calls” with **one** optional ops line for exceptions.

---

## Related

- [`partner-lifecycle-workflow.md`](./partner-lifecycle-workflow.md)
- [`communication-rails.md`](./communication-rails.md)
- [`../01-business-plan/operational-model.md`](../01-business-plan/operational-model.md)
