# Social media strategy — Leta Tech recruitment (Georgia)

**Goal:** Build a statewide 1099 bench that can accept offers within their radius — affordably, phone-first, community-led.

**Budget posture:** Bootstrap / pilot — prioritize **organic + Google Voice + hyper-local paid** over broad brand campaigns.

---

## Strategic pillars

1. **Statewide, not Atlanta-only** — Run separate creative and targeting per cluster (see geo table below).
2. **Community, not job board** — “Join the crew” beats “Now hiring technicians.”
3. **Two-step intake** — Google Voice (30 sec) → full application (8 min) → human screen.
4. **Show real people** — Phone-shot video, local mentions, no stock-office footage.
5. **Referrals after proof** — Turn on bonuses only after ~20 active, reliable techs.

---

## Channel matrix (affordable → expensive)

| Channel | Cost | Best for | CTA |
|---------|------|----------|-----|
| **Google Voice** | Free | All personas; fastest trust | Pre-filled “join crew” message |
| **TikTok organic** | Time | Hustlers 18–26 | Link in bio → technicians.html#join |
| **Instagram Reels** | Time | Same as TikTok; cross-post | Bio link |
| **Facebook groups** | Free | Veterans, rural, switchers | Long post + text or call link |
| **Facebook/IG paid local** | $5–15/day/geo | Scale what organic proves | “Send Google Voice message” |
| **TikTok Spark / boost** | $20–50/post | Winning organic clips only | Profile visit |
| **Campus flyers / QR** | Print cost | Hustlers | leta.repair |
| **Telegram job channels** | Free | Veterans, switchers | Short blurb |
| **YouTube Shorts** | Time | SEO long-tail “IT gig Georgia” | Description link |
| **Indeed / FB job post** | Low | Switchers only | Link out (don’t rely on apply on Indeed) |
| **LinkedIn ads** | High | Skip for recruit phase | — |

**Do not spend on:** Billboards (yet), generic national IT keywords, polished TV.

---

## Geo clusters (run ads & content per bucket)

| Cluster | Cities / anchors | Persona emphasis | Paid radius idea |
|---------|------------------|------------------|------------------|
| **A** Metro Atlanta | ATL, Decatur, Marietta, Lawrenceville, South Fulton | Hustler + veteran | 25–40 mi around ATL |
| **B** College towns | Athens, Statesboro, Kennesaw, Carrollton, Savannah (SCAD) | Hustler | Campus + 15 mi |
| **C** Central GA | Macon, Warner Robins, Milledgeville | Veteran + rural | 30 mi |
| **D** East / CSRA | Augusta, Evans, Fort Eisenhower area | Veteran + switcher | 25 mi |
| **E** West / military | Columbus, Phenix City AL border | Veteran | 30 mi |
| **F** Coast | Savannah, Brunswick, Hinesville | Hustler + military family | 25 mi |
| **G** South GA | Valdosta, Albany, Tifton, Moultrie | Rural builder | 40–60 mi (wider radius copy) |
| **H** North GA | Dalton, Rome, Gainesville, Cleveland | Rural + switcher | 35 mi |

Rotate **one cluster per week** in organic posts so the whole state sees themselves in the feed.

---

## Content calendar (4-week pilot, repeat)

| Week | Mon | Wed | Fri | Sat |
|------|-----|-----|-----|-----|
| 1 | Reel: “POV fix Wi‑Fi on site” (A) | Story poll: “Got a car + phone?” | FB group post (gig) | Google Voice status: “3 slots screening” |
| 2 | Reel: rural drive day (G) | Carousel: 4 personas | TikTok stitch trend | User-generated repost (if any) |
| 3 | Reel: close-out in app (B) | Testimonial screenshot (redact) | College flyer photo | Live Q&A in Stories |
| 4 | Reel: referral tease | “Apply in 30 sec” Google Voice CTA | Recap: “Now live in [city]” | Boost best Reel $25 |

**Production rule:** Shoot on phone, vertical, captions burned in, 15–45 sec.

Scripts: [video-scripts.md](./video-scripts.md) · Captions: [social-captions.md](./social-captions.md)

---

## Paid ads (when ready — $300–500/mo test)

### Meta (Facebook + Instagram)
- **Objective:** Messages or Traffic to technicians.html#join
- **Audience:** 18–40, Georgia only, interest stacks: gig economy, IT troubleshooting, DoorDash, Field Nation, CompTIA (optional)
- **Exclude:** Desktop-only placements
- **Creative:** UGC vertical video, headline “Field IT · your schedule · GA”
- **Split budget:** 50% Atlanta cluster, 50% split across 3 other clusters/week

### TikTok
- **Spark Ads** only on organic winners (watch time > 50%)
- **Hashtags (organic):** #GeorgiaJobs #SideHustle #TechHustle #1099 #AtlantaGigs + city tags

---

## Profiles to create (free)

| Platform | Handle idea | Bio |
|----------|-------------|-----|
| TikTok | @leta.tech or @letatechga | Field IT crew · GA only · Join ↓ |
| Instagram | same | Same + link sticker |
| Facebook Page | Leta Tech Crew | Pin technicians.html post |
| YouTube | Leta Repair | Shorts tab only at first |

**Link in bio:** `https://leta.repair/technicians.html#join`

---

## Metrics (weekly)

| Metric | Target (pilot) |
|--------|----------------|
| text intros | 20+/week statewide |
| Full applications | 10+/week |
| Cost per application (paid) | < $40 |
| Approved → Active in app | Track manually |
| First job completed | North star |

Log source: `Google Voice` | `web` | `app` | `referral` in spreadsheet.

---

## Implementation checklist (already on site)

- [x] [technicians.html](../technicians.html) — crew positioning + Google Voice + follow section
- [x] [tech-onboarding.html](../tech-onboarding.html) — 5-step application
- [x] App — required onboarding + dispatch gate
- [x] `recruitLinkInBio` + social URL slots in `contact-config.js`
- [x] [social-profiles-setup.md](./social-profiles-setup.md) — bios, handles, wiring
- [x] [content-calendar-ready.md](./content-calendar-ready.md) — weeks 1–4 posts
- [x] [google-voice-templates.txt](./google-voice-templates.txt) — paste into Google Voice
- [x] [qr-flyer.html](./qr-flyer.html) — printable campus / barber QR
- [ ] Create TikTok/IG/FB accounts → paste URLs into `contact-config.js` (social links auto-appear)
- [ ] Paste Google Voice quick replies in Google Voice app
- [ ] Execute week 1 calendar · boost only after organic winner

---

## Related docs

- [tech-personas.md](./tech-personas.md) — Who we’re talking to
- [RECRUIT-PLAYBOOK.md](./RECRUIT-PLAYBOOK.md) — Operator funnel
- [google-voice-flow.md](./google-voice-flow.md) — Chat scripts
