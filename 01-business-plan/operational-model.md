# Operational model — Leta

Dispatch logic, partner models, QA, and dispute resolution at a conceptual level. Refine with legal and ops leadership before production use.

## Partner models

### Option A — Subcontractor / white-label

- Leta’s agents may appear under **partner branding** (or neutral gear) and represent the partner end-to-end.  
- **Pros:** partner keeps the **customer relationship**; seamless to the client.  
- **Cons:** Leta’s **consumer brand** does not compound in public view.

### Option B — Strategic partner / co-branded

- Partner tells the client: “We’re dispatching a **Leta**-verified technician as our official service partner.”  
- **Pros:** builds **Leta reputation** and trust artifacts (reviews, badges).  
- **Cons:** partners may fear **client poaching**—address with contract (non-solicitation, data firewalls).

### Hybrid “tier” (recommended differentiator)

Beyond bodies in trucks, offer partners a **live dashboard** (implementation sketch: React + Firebase or equivalent modern stack) showing:

- **Real-time** approximate location of active agents (privacy-safe UX).  
- **Photos** of completed work and asset evidence.  
- **Digital signatures** and structured close-out checklist.

This makes Leta **infrastructure**, not a temp agency.

## Dispatch logic (conceptual)

1. **Intake:** ticket classified (skills, tools, urgency, SLA tier).  
2. **Matching:** geo-radius search over **Active** field techs with required certs + rating + completion rate.  
3. **Offer cascade:** push notification → accept window → next candidate if declined/expired.  
4. **In progress:** customer tracking, partner visibility (if subscribed), chat channel policy.  
5. **Escalation:** field tech triggers **Overwatch**; remote tech joins with scoped permissions.  
6. **Close-out:** checklist, signatures, photos, parts/labor codes → **payout** + **partner invoice**.

## SLA categories (per-ticket agreement)

Use explicit SLAs with partners and clear customer-facing windows where applicable.

| Category | What to define |
|----------|----------------|
| **Response time** | e.g. 4-hour vs NBD vs scheduled window—clock starts when? |
| **Rate card** | Flat SKUs + allowed variances vs time-and-materials. |
| **Non-solicitation** | Field agents must not solicit partner’s clients for competing services. |
| **Reporting** | Digital work order, signatures, media—delivery timeline to partner CRM/email/API. |
| **Cancellation** | Fees, tech compensation if en route. |

## QA program

- **Job audits:** random review of photos/checklists.  
- **Customer CSAT** and **partner scorecards**.  
- **Tech quality tiers** (unlock better jobs / faster payout).  
- **Rework policy:** who pays when first-time fix fails within X days.

## Dispute resolution

- **Evidence-first:** timestamped GPS (where legally permissible), chat logs, media, signatures.  
- **Triage queue:** billing disputes vs quality vs scope creep.  
- **Chargeback / refund rules** published to customers.  
- **Partner arbitration** path for high-dollar enterprise contracts.

## Payments

- **Field techs:** 1099 contractors—automated payouts on verified close-out (see [`../04-legal-and-compliance/field-tech-1099-agreements.md`](../04-legal-and-compliance/field-tech-1099-agreements.md)).  
- **Hidden cost clarity:** travel/gas/truck roll fees—either in payout, partner billable, or hybrid.

## Metrics to run the marketplace

- Time to **first offer** / time to **accept** / time to **arrival**.  
- **First-time fix rate** (especially with overwatch).  
- **Gross margin per ticket** after insurance and processing.  
- **Tech utilization** and **churn**.
