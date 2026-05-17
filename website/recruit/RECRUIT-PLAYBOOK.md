# Leta Tech recruitment playbook

Operator guide for building a high-energy 1099 field crew in Georgia. Public funnel lives on [technicians.html](../technicians.html) and [tech-onboarding.html](../tech-onboarding.html).

## Philosophy

You are recruiting a **community**, not posting a job listing. Sell lifestyle, flexibility, and brand — not “duties and requirements.”

| Do | Don’t |
|----|--------|
| “Join the crew” · “Your phone · your schedule” | “Job opening” · “Responsibilities include…” |
| WhatsApp + mobile form | PDF applications · desktop-only portals |
| Short video, local faces | Polished corporate ads |
| Referrals from happy techs | Cold LinkedIn |

## Who (digital hustler)

- **Age:** 18–26 (flex to 28 in ads if needed).
- **Trait:** Resourceful, phone-native, learns by tapping.
- **Motivation:** Independence, fast money, prestige of a “tech” brand.

## Where they are

| Channel | Use |
|---------|-----|
| TikTok / Reels | Primary paid + organic ([video-scripts.md](./video-scripts.md)) |
| WhatsApp groups | Intake + community ([whatsapp-flow.md](./whatsapp-flow.md)) |
| Facebook local / gig groups | Longer posts ([social-captions.md](./social-captions.md)) |
| Telegram job channels | Short blurb + link |
| Campuses, transit hubs, gaming lounges | QR to `technicians.html#join` |

## Funnel (implemented on site)

```
Ad / story / flyer
    → technicians.html#join
        → WhatsApp (30 sec)  OR  tech-onboarding.html (~8 min)
            → Human screen (1–2 business days)
                → Training + quiz (in-app — roadmap)
                    → Background + insurance (Checkr / Stripe Identity — see TECH-ONBOARDING-OPTIONS.md)
                        → Active in app
```

## Referral engine (pilot)

Configured in `contact-config.js`: `referralBonusDisplay`, `referralJobsRequired`.

Copy on site: when a referred friend completes N jobs, both earn bonus. Turn on in ops only after first ~20 solid techs.

## Config checklist

- [ ] `whatsappPhone` — dedicated line if possible (WhatsApp Business).
- [ ] Quick replies in WhatsApp ([whatsapp-flow.md](./whatsapp-flow.md)).
- [ ] Netlify `tech-onboarding` form → email `techs@leta.repair`.
- [ ] TikTok / Meta ads → `technicians.html#join`, CTA “Send WhatsApp message”.
- [ ] Track leads: Airtable or spreadsheet (source: WhatsApp | web | app).

## Roadmap (not on site yet)

1. **In-app gamified quiz** — 5 visual questions, unlock dispatch (Firebase flag).
2. **3-minute training video** — hosted on site or YouTube unlisted, linked after approval.
3. **Referral codes in app** — deep link `?ref=TECH123`.
4. **Leta Tech gear** — shirts/hats for aspirational content.

## Files in this folder

| File | Purpose |
|------|---------|
| [whatsapp-flow.md](./whatsapp-flow.md) | Chat scripts + quick replies |
| [video-scripts.md](./video-scripts.md) | TikTok/Reels storyboards |
| [social-captions.md](./social-captions.md) | Copy/paste posts |
| [RECRUIT-PLAYBOOK.md](./RECRUIT-PLAYBOOK.md) | This doc |
