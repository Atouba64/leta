# Partner portal — screen inventory

Web dashboard for `partner_dispatcher` and `partner_admin` roles. **v1:** mobile-responsive web; native app optional later.

## Navigation

| Tab | Purpose |
|-----|---------|
| Home | KPI strip + action items |
| Tickets | List + filters |
| Map | Live field view |
| Reports | Exports |
| Settings | Users, API keys (v2), notification prefs |

---

## Screens

### AUTH-01 Login
- Email/password (Firebase Auth)
- SSO (v2)

### HOME-01 Dashboard
- Open tickets by SLA risk (red/amber/green)
- Techs en route count
- Completed this week
- CTA: **Create ticket**

### TKT-01 Create ticket
Fields: site name, address, geocode, schedule window, priority, skills[], scope text, **partner WO #**, POC name/phone/email, contact policy (`any` | `poc_only`), access notes, rate type + amount, attachments, `requires_roof` / `requires_ladder` flags.

### TKT-02 Ticket list
Filters: status, county, SLA tier, assigned tech, date range. Search by partner WO #.

### TKT-03 Ticket detail
- Header: status badge, SLA clock, partner WO #, Leta id (copy)
- Timeline: dispatched → assigned → en route → on site → overwatch → completed
- Map snippet
- Tech card (name, rating — no personal phone until policy allows)
- Actions: Cancel, Change scope, Approve close-out, Open dispute
- **Join Leta Live** when overwatch active
- Documents: photos, signed PDF

### MAP-01 Live map
Pins: en route (blue), on site (green), overdue (red). Click → TKT-03.

### RPT-01 Reports
- Date range picker
- Export CSV (billing)
- Export PDF package per ticket

### SET-01 Settings
- Org profile, billing email
- Users & roles (admin only)
- Webhook URL (v2)
- Notification toggles

### ADM-01 Sandbox (onboarding)
- Pre-filled sample ticket for training

---

## Mobile app (field tech — existing)

Partners do **not** use field app for dispatch in v1. Tech screens unchanged; see [`../field-tech-app/user-stories.md`](../field-tech-app/user-stories.md).

## Partner lite in app (optional v2)

| Screen | Purpose |
|--------|---------|
| PTR-01 Ticket list read-only | Emergency dispatcher on phone |
| PTR-02 Ticket detail | Timeline only |

---

## Wireframe notes

Add Figma links in [`../ui-ux-wireframe-notes.md`](../ui-ux-wireframe-notes.md) Partner section when available.
