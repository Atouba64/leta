# Reconciliation & billing — partner ↔ Leta ↔ tech

## Money flow

```
End customer → (often) Tier 2 partner → Leta invoice → Leta pays tech (Stripe Connect)
```

Leta is **merchant of record to techs** for platform-originated work. Partner contracts define whether partner or Leta invoices end customer (usually partner).

---

## Per work order data

| Field | Source |
|-------|--------|
| `partnerWorkOrderId` | Partner |
| `letaTicketId` | Leta |
| Agreed rate | Locked at tech accept |
| Actual hours | Tech close-out (if hourly) |
| Mobilization | Auto from distance rules |
| Change orders | Partner-approved amendments |
| Close-out package | Photos + signature PDF |

---

## Partner billing (Leta → partner)

| Cadence | Deliverable |
|---------|-------------|
| Weekly | CSV: completed WOs, rates, fees |
| Monthly | Invoice PDF (Wave/QuickBooks) |

**Dispute window:** 5 business days from CSV send; evidence = ticket timeline.

---

## Tech payout (Leta → tech)

| Step | Tool |
|------|------|
| Close-out approved | Partner or auto after 24h |
| Transfer initiated | Stripe Connect |
| Target arrival | 24–48h |

**Hold reasons:** dispute, missing photos, failed background recheck.

---

## Fee structure (pilot default — tune with counsel)

| Line | Suggested |
|------|-----------|
| Platform fee | % of WO or flat dispatch fee |
| Overwatch minute | Pass-through or bundled |
| Cancel fee | Per MSA |

Document in signed rate card — not hidden post-deploy.

---

## Three-way alignment (GUS)

When Tier 2 bills Tier 1, they attach:

- Leta close-out PDF
- `partnerWorkOrderId` + `letaTicketId`
- Timestamp proof for SLA

---

## Related

- [`partner-lifecycle-workflow.md`](./partner-lifecycle-workflow.md) § Commercial
