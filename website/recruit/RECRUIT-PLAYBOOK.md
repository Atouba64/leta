# Leta Tech recruitment playbook

Operator guide for building a statewide 1099 field crew in Georgia. Public funnel: [technicians.html](../technicians.html) · [tech-onboarding.html](../tech-onboarding.html).

## Philosophy

You are recruiting a **community**, not posting a job listing. Sell lifestyle, flexibility, and brand — not “duties and requirements.”

| Do | Don’t |
|----|--------|
| “Join the crew” · “Your phone · your schedule” | “Job opening” · “Responsibilities include…” |
| phone + mobile form | PDF applications · desktop-only portals |
| Short video, local faces (any GA county) | “Atlanta only” · polished corporate ads |
| Referrals from happy techs | Cold LinkedIn |

## Who (four personas — statewide)

Not one demographic. Design creative and screening for all of:

1. **Campus & side-hustle** (18–26, college towns + ATL)
2. **Gig & field veteran** (Field Nation, cable/ISP, break-fix)
3. **Rural & small-town builder** (county-level networks)
4. **Career switcher** (help desk, retail, trades)

Full profiles: [tech-personas.md](./tech-personas.md)

## Where they are

| Channel | Use |
|---------|-----|
| TikTok / Reels | Organic + Spark boost on winners ([video-scripts.md](./video-scripts.md)) |
| Text / call | Intake + community ([google-voice-flow.md](./google-voice-flow.md)) |
| Facebook local / gig groups | Veterans, rural, switchers ([social-captions.md](./social-captions.md)) |
| County Facebook groups | Rural persona — Valdosta, Albany, Rome, Dalton |
| Telegram job channels | Short blurb + link |
| Campuses, barber shops, gaming lounges | QR to `technicians.html#join` |

**Strategy doc:** [social-media-strategy.md](./social-media-strategy.md) — geo clusters, 4-week calendar, $300–500/mo paid test.

## Funnel (implemented on site + app)

```
Ad / story / flyer / app profile
    → technicians.html#join
        → text or call (30 sec)  +  tech-onboarding.html (~8 min) — app requires form confirm
            → Human screen (1–2 business days)
                → Training + quiz (in-app — roadmap)
                    → Background + insurance (Checkr / Stripe Identity)
                        → Active in app · offers by radius
```

## Referral engine (pilot)

Configured in `contact-config.js`: `referralBonusDisplay`, `referralJobsRequired`.

Turn on in ops only after first ~20 solid techs statewide.

## Config checklist

- [ ] `phone` — phone line
- [ ] Quick replies ([google-voice-flow.md](./google-voice-flow.md))
- [ ] `recruitRegions` + `recruitMetros` in `contact-config.js`
- [ ] Netlify `tech-onboarding` form → `techs@leta.repair`
- [ ] TikTok / IG bios → `technicians.html#join`
- [ ] Meta ads → CTA “Text or call”, rotate GA clusters weekly
- [ ] Track leads: source = text | web | app | referral

## Roadmap (not on site yet)

1. **In-app gamified quiz** — unlock dispatch (Firebase flag)
2. **3-minute training video** — after approval
3. **Referral codes in app** — `?ref=TECH123`
4. **Leta Tech gear** — shirts/hats for UGC

## Files in this folder

| File | Purpose |
|------|---------|
| [tech-personas.md](./tech-personas.md) | Who we’re talking to |
| [social-media-strategy.md](./social-media-strategy.md) | Channels, calendar, paid test |
| [social-profiles-setup.md](./social-profiles-setup.md) | Create TikTok/IG/FB + bios |
| [content-calendar-ready.md](./content-calendar-ready.md) | Weeks 1–4 ready posts |
| [google-voice-templates.txt](./google-voice-templates.txt) | Paste into Google Voice |
| [qr-flyer.html](./qr-flyer.html) | Printable QR for campus / barber |
| [google-voice-flow.md](./google-voice-flow.md) | Chat scripts + quick replies |
| [video-scripts.md](./video-scripts.md) | TikTok/Reels storyboards |
| [social-captions.md](./social-captions.md) | Copy/paste posts |
| [RECRUIT-PLAYBOOK.md](./RECRUIT-PLAYBOOK.md) | This doc |
