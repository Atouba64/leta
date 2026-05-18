# Third-party stack — outsource risk & cost

**Rule:** Leta does not store SSNs, run payroll, or host video SFU at scale in v1. Two-person team maintains **integrations**, not compliance infrastructure.

---

## By function

| Function | Provider | Tier / cost | What Leta stores |
|----------|----------|-------------|------------------|
| **Auth** | Firebase Auth | Free tier → Blaze | `uid`, role claims |
| **Database** | Firestore | Blaze pay-as-go | Tickets, tenants — no PAN/SSN |
| **Files** | Firebase Storage | Blaze | Photos, PDFs |
| **Tech payout** | Stripe Connect | Per-transfer fees | `stripeAccountId` only |
| **Customer pay** | Stripe PaymentSheet | Same | Payment intent ids |
| **Background check** | Checkr | Per-check | `checkrCandidateId`, status |
| **Identity (optional)** | Stripe Identity | Per verification | Session id |
| **Live video** | WebRTC P2P (v1) → Twilio/Chime later | P2P free; SFU when needed | Session metadata |
| **Maps** | Google Maps Platform | $200/mo credit | Lat/lng |
| **Email inbound** | `partners@` / Cloudflare routing | Free–low | Threads in Gmail |
| **Forms** | Netlify Forms | Free tier | Submissions email |
| **Chat widget** | Tawk.to | Free | — |
| **Scheduling** | Cal.com | Free | Booking link |
| **E-sign (partners)** | DocuSign / Dropbox Sign | Free trials → paid | Signed PDF in Drive |
| **PSA sync (v2)** | ConnectWise Manage API / ServiceNow | Partner-licensed | OAuth tokens encrypted |
| **Accounting export** | CSV → Wave / QuickBooks | Free CSV | — |

---

## Partner-specific flows

| Flow | Stack |
|------|-------|
| Partner pays Leta | Invoice (Wave) or Stripe Invoice (v2) |
| Leta pays tech | Stripe Connect transfer after `approved` |
| Partner wants ADP | They use WorkMarket separately — Leta exports CSV |

---

## Sensitive data policy (site-wide)

| Data | Never on Leta | Use |
|------|---------------|-----|
| SSN / full tax ID | ✓ | Checkr |
| Bank account / routing | ✓ | Stripe Connect onboarding |
| Credit card PAN | ✓ | Stripe |
| Rack passwords long-term | Store encrypted, short TTL | Access UI reveal |

---

## v1 vs v2

| v1 (now) | v2 (revenue-triggered) |
|----------|------------------------|
| Manual partner ticket create | PSA webhook |
| P2P Leta Live | Twilio Programmable Video |
| Email PDF close-out | Partner portal API |
| Spreadsheet reconciliation | Automated Stripe + QB |

---

## Related

- App Firebase: [`../app/README.md`](../app/README.md)
- Legal outlines: [`../04-legal-and-compliance/`](../04-legal-and-compliance/)
