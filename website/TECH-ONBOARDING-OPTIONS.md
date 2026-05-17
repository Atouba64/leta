# Technician onboarding — Leta form vs third-party tools

This doc complements the live apply form at [`tech-onboarding.html`](./tech-onboarding.html) (Netlify → email today). Use it when you want compliance, background checks, or data in your own database without retyping.

## What the Leta form is for (keep it)

**Screening + fit**, not full compliance:

- Contact, location, availability, skills
- 1099 acknowledgment and insurance intent
- Short motivation answers (passion, reliability signals)

**Not collected on the public form** (on purpose — collect after you approve):

- SSN / tax ID (W-9)
- Government ID scans
- Insurance certificate (COI) PDF
- Criminal / MVR background check results

That split keeps the first step short (important for younger 1099 applicants) while staying FCRA-safe (don’t run background checks before consent and a defined role).

---

## Recommended stack as you scale

| Stage | Tool type | Examples | Feeds your DB? |
|-------|-----------|----------|----------------|
| 1. Apply / screen | Your form or form builder | **Netlify form** (now), **Tally**, **Typeform** | Webhook → Zapier/Make → Airtable / Firebase |
| 2. ID verify | Identity API | **Stripe Identity**, **Persona**, **Veriff** | Webhook with verified status |
| 3. Background | FCRA-compliant check | **Checkr**, **Yardstik**, **Sterling** | API + webhook; store pass/fail + report ID |
| 4. 1099 / tax | Contractor onboarding | **Stripe Connect** (Express), **Wrapbook**, manual W-9 | Tax ID + payout rails |
| 5. Insurance | COI collection | **Evident**, **Certificate Hero**, or **Jotform** upload | PDF + expiry date in DB |
| 6. Field marketplace (optional) | Full tech network | **Field Nation**, **WorkMarket**, **ServiceFusion** | You become a buyer on their network — not “your” exclusive pool |

### Practical path for Leta (Georgia, early stage)

1. **Now:** Netlify `tech-onboarding` → email / spreadsheet; manual approve.
2. **When you have a backend:** Same form POST → Firebase or Supabase via Netlify Function or Zapier.
3. **On “yes” from screening:** Email a single link bundle:
   - **Checkr** (or Yardstik) — criminal + MVR
   - **Stripe Identity** — photo ID
   - **Tally/Jotform** — W-9 + GL insurance PDF upload
4. **Before first paid dispatch:** Block “Active” in app until `background_pass`, `id_verified`, `coi_on_file` flags are true in your DB.

---

## Platform notes (field / gig IT)

### Field Nation / WorkMarket

- Pros: Huge tech bench, dispatch, some compliance built in.
- Cons: Techs are not exclusive to Leta; marketplace fees; less control of brand and young-tech culture fit.
- Best when: You need volume fast and will subcontract, not build a Leta-only network.

### Checkr / Yardstik

- Pros: Standard for US gig + field ops; API + packages (criminal, MVR); webhook to your app.
- Cons: Per-check cost; FCRA adverse-action process if you decline.
- Best when: You activate techs on customer sites and need defensible vetting.

### Stripe Identity + Stripe Connect Express

- Pros: ID verify + 1099 payouts in one ecosystem if you already use Stripe for customers.
- Cons: Connect onboarding is its own UX; not a skills questionnaire.
- Best when: Payments and contractor payouts are on Stripe.

### Tally / Typeform + Zapier

- Pros: Replace Netlify when you need logic, file uploads, or CRM sync without coding.
- Cons: Another subscription; still not background-check-native.
- Best when: You want webhooks to Airtable/Firebase before you build an admin panel.

### Fountain / WorkBright / Rippling (contractor HR)

- Pros: End-to-end hire/onboard flows, document signing.
- Cons: Pricier; oriented to W-2 + contractor mix; may be heavy for a small GA pilot.
- Best when: You’re hiring dozens of techs per month with HR staff.

### Paradox (Olivia) / Workable

- Pros: SMS-first apply, scheduling screens — good for younger applicants.
- Cons: Enterprise sales motion; overkill for pilot.
- Best when: High-volume recruiting is the bottleneck.

---

## Suggested Leta-only flow (hybrid)

```
Apply (tech-onboarding.html)
    → auto-reply email
    → human review (motivation + skills)
        → Reject | Invite to compliance bundle
            → Checkr + Stripe Identity + COI upload form
                → Flags in Firebase → activate in Technician app
```

Keep **one** public URL for marketing (`leta.repair/tech-onboarding.html`). Send **private** magic links for steps 2–3 so PII never sits in Netlify form submissions longer than needed.

---

## If you switch the public apply URL

Update:

- [`technicians.html`](./technicians.html) CTA
- [`contact.html`](./contact.html) technician channel
- App deep link in `TechProfile` / signup (if you pass `?source=app`)

Point webhooks at the same `techs@leta.repair` inbox until CRM is live.
