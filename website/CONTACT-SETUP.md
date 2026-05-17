# Contact, chat, email, phone & booking

Everything visitors use on [leta.repair](https://leta.repair) is configured in [`contact-config.js`](./contact-config.js). This doc explains how **you** finish setup (we cannot create mailboxes or passwords for you).

---

## 1. Live chat (Tawk)

The site uses **[Tawk.to](https://www.tawk.to)** for chat ([`leta-live-chat.js`](./leta-live-chat.js)). Visitors see one **“Chat with Leta”** button styled like `btn btn-primary`; Tawk’s default bubble is hidden.

1. Reply in the [Tawk dashboard](https://dashboard.tawk.to) or mobile app.
2. **Chat panel colors**: Set in Tawk **Appearance** using the hex table in [`TAWK-APPEARANCE.md`](./TAWK-APPEARANCE.md) (required for full blue/white inside the chat). The site also injects matching CSS via `leta-tawk-theme.js` when Tawk allows it.
3. Config: `tawkPropertyId`, `tawkWidgetId`, `chatLabel` in [`contact-config.js`](./contact-config.js).
4. Optional: enable **Hide widget on load** in Tawk → Widget Behavior so only our button shows.

### Netlify form (contact page)

1. [Netlify → leta-tech → Forms](https://app.netlify.com/projects/leta-tech/forms)
2. **Form notifications → Email** for the **`contact`** form.

---

## 2. `@leta.repair` email addresses (you create them)

**We do not generate passwords** — only you (or your registrar) can create accounts. Use these addresses consistently:

| Address | Purpose |
|---------|---------|
| `hello@leta.repair` | General inbox |
| `support@leta.repair` | Customer support · tickets & visits |
| `partners@leta.repair` | MSP / partner threads |
| `techs@leta.repair` | Technician onboarding |

### Option A — Free forwarding (fastest): Cloudflare Email Routing

Best if DNS for `leta.repair` is on Cloudflare.

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → your domain → **Email** → **Email Routing**
2. Enable routing; add destination (your personal Gmail).
3. Create routes: `hello`, `support`, `partners`, `techs` → forward to that Gmail.
4. **Send mail as** in Gmail (optional): Settings → Accounts → “Send mail as” using Cloudflare’s SMTP docs.

You read and reply from Gmail; the public address stays `@leta.repair`.

### Option B — Real mailboxes: Zoho Mail (free tier)

1. [https://www.zoho.com/mail/zohomail-pricing.html](https://www.zoho.com/mail/zohomail-pricing.html) — free for up to 5 users on one domain.
2. Verify domain with DNS (MX records Zoho provides).
3. Create users `hello`, `support`, `partners`, `techs` — **you choose passwords** (use a password manager).
4. Use [Zoho webmail](https://mail.zoho.com) or any mail app (IMAP).

### Option C — Google Workspace

Paid (~$7/user/mo) but familiar Gmail UI for teams.

---

## 3. Phone

Configured in `contact-config.js`:

- `phone: "4702526681"`
- `phoneDisplay: "(470) 252-6681"`

Site links use `tel:+14702526681`. Update config if the number changes.

---

## 4. Booking calls (free: Cal.com recommended)

**Cal.com** free plan: unlimited event types, calendar sync, public booking page.  
**Calendly** free plan: 1 event type — fine for a single “15 min intro.”

### Set up Cal.com (recommended)

1. Sign up: [https://cal.com/signup](https://cal.com/signup)
2. Connect Google/Outlook calendar.
3. Create event type (e.g. **15 min intro**).
4. Copy your public link (e.g. `https://cal.com/yourname/intro`).
5. In `contact-config.js` set:

```js
bookingUrl: "https://cal.com/yourname/intro",
```

6. Redeploy. **Book a call** appears on Contact and in the assistant.

### Calendly alternative

1. [https://calendly.com/signup](https://calendly.com/signup)
2. Paste your event link into `bookingUrl` (or legacy `calendlyUrl`).

---

## 5. Quick checklist

- [ ] Netlify form email notification on
- [ ] Cloudflare or Zoho: `hello@`, `partners@`, `techs@` working
- [ ] Tawk `tawkPropertyId` set (optional but best for live chat)
- [ ] Cal.com `bookingUrl` set
- [ ] Test: contact form, bot handoff, book link, `tel:` on mobile
