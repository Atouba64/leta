# Google Voice recruit intake — Leta Tech crew

Configure in [`contact-config.js`](../contact-config.js): `phone`, `recruitSmsMessage`, `googleVoiceUrl`.

Public hub: [voice.html](../voice.html) · Join: [technicians.html#join](../technicians.html#join)

## Applicant flow

| Device | Action |
|--------|--------|
| **Phone** | Tap **Text to join** → `sms:+14702526681?body=…` with starter message |
| **Phone** | Tap **Call** → `tel:+14702526681` |
| **Desktop** | **Copy intro text** → sign in at [voice.google.com](https://voice.google.com/) → Messages → paste to Leta line |

## Pre-filled SMS (site + app)

```
Hey Leta — I want to join the Tech crew. My name:  My city + county (GA):  I have a smartphone + car (yes/no):
```

## Leta team — browser inbox (WebRTC)

1. Open [googleVoiceUrl](https://voice.google.com/) (sign in with the Google account that owns **470-252-6681**).
2. **Calls** — answer/make calls in the browser (mic permission).
3. **Messages** — SMS threads with applicants.
4. **Voicemail** — listen and transcribe in the same UI.

No extra software; audio routes via WebRTC in Chrome/Edge/Firefox.

## Canned replies (save in Google Voice)

Use templates from [google-voice-templates.txt](./google-voice-templates.txt) — paste into saved replies or keep open for copy/paste.

| Situation | Action |
|-----------|--------|
| New text, incomplete | Ask for name, GA city/county, phone + car yes/no |
| Strong fit | Send full app link: https://leta.repair/tech-onboarding.html |
| After apply | Confirm 1–2 business day screen · same email as app |

## Operator checklist

1. Log lead (name, city, phone, source=text | call | web | app).
2. Reply within business hours from Google Voice web or mobile.
3. On approve → background check + training link.

## Metrics

Track **text intros** and **calls** weekly (not Google Voice). Log source in spreadsheet.
