# WhatsApp recruit intake — Leta Tech crew

Configure in [`contact-config.js`](../contact-config.js): `whatsappPhone`, `whatsappRecruitMessage`.

## Pre-filled message (applicant sees)

```
Hey Leta — I want to join the Tech crew 🛠️

My name:
My city + county (GA):
I have a smartphone + car (yes/no):
```

## Quick replies (WhatsApp Business → Tools)

| Shortcut | Message |
|----------|---------|
| `/welcome` | Hey — thanks for hitting up Leta Tech. Drop your **name**, **city + county in Georgia**, and **yes/no** for smartphone + car. |
| `/gotit` | Perfect. A human on our crew will reply within 1–2 business days. Want to move faster? Full application: https://leta.repair/tech-onboarding.html |
| `/fullapp` | Full application (~8 min, on your phone): https://leta.repair/tech-onboarding.html — use the same email you’ll use in the app. |
| `/refer` | Referral program (pilot): when your friend completes their first 5 jobs, you both get a bonus — we’ll email terms when it’s live. |

## Auto-reply (Away message)

> Leta Tech crew — we got your message. Reply with **name**, **GA city/county**, and **phone + car yes/no**. We’re usually back within a few hours (business days).

## After 3 answers — operator checklist

1. Log lead in spreadsheet / Airtable (name, city, phone, source=WhatsApp).
2. If strong fit → send `fullapp` link.
3. On approve → background check + training link (see [TECH-ONBOARDING-OPTIONS.md](../TECH-ONBOARDING-OPTIONS.md)).

## Upgrade path (later)

- [WhatsApp Business API](https://business.whatsapp.com/) + Twilio/MessageBird for true bot flow.
- ManyChat / Respond.io for visual flows without code.
