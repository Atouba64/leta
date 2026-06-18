# How to update the partner & platform tracker

The **canonical** tracker is one file. Everything else mirrors it.

| What | Where |
|------|--------|
| **Source of truth** | [`data/partner-platform-tracker.json`](../../data/partner-platform-tracker.json) |
| **Live viewer** | [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html) (PIN required — ops team only) |
| **Website bundle** | `website/partner-platform-tracker-data.js` (auto-generated) |
| **Markdown mirror** | [`02-REGISTRATION-URLS.md`](./02-REGISTRATION-URLS.md) (platform URLs; sync status manually or via chat) |

---

## Option A — Update in Cursor chat

Tell the agent what changed. Example:

> Update the tracker: Field Nation status — profile complete, waiting on Tier 1 COI.

The agent edits `data/partner-platform-tracker.json`, runs `node scripts/sync-partner-tracker.js`, and commits.

---

## Option B — Edit on GitHub (free, any device)

1. Open [Edit tracker on GitHub](https://github.com/Atouba64/leta/edit/main/data/partner-platform-tracker.json).
2. Find the entry by `id` (e.g. `field-nation-service-company`).
3. Update fields (see below).
4. Commit to `main`.
5. Netlify redeploys in ~1 minute → [ops-tracker.html](https://leta.repair/ops-tracker.html) updates.

After editing locally, run:

```bash
node scripts/sync-partner-tracker.js
```

---

## Option C — Edit locally in the repo

```bash
# 1. Edit JSON
code data/partner-platform-tracker.json

# 2. Sync to website
node scripts/sync-partner-tracker.js

# 3. Push to main (when ready)
git add data/partner-platform-tracker.json website/partner-platform-tracker-data.js
git commit -m "Update partner platform tracker"
git push
```

---

## Fields to update

| Field | Example |
|-------|---------|
| `status` | `not_started` · `in_progress` · `applied` · `invite_pending` · `approved` · `active` · `rejected` |
| `statusDetail` | Human-readable sub-status |
| `dateStarted` | `2026-06-16` |
| `dateApplied` | Application submit date |
| `dateUpdated` | Always set when you change anything |
| `coiUploaded` | `true` / `false` |
| `owner` | Who owns this row |
| `notes` | Blockers, next steps |
| `outreachStage` | Partners only: `research` → `production` |

---

## Add a new platform or partner

Add an object to the `entries` array:

```json
{
  "id": "unique-slug",
  "kind": "platform",
  "name": "Display Name",
  "category": "marketplace",
  "registrationUrl": "https://...",
  "registrationType": "self_serve",
  "georgiaRelevant": true,
  "letaServices": ["break_fix", "networking"],
  "status": "not_started",
  "statusDetail": "",
  "dateStarted": null,
  "dateApplied": null,
  "dateUpdated": "2026-06-16",
  "coiUploaded": false,
  "owner": "",
  "priority": null,
  "notes": ""
}
```

For named partners, set `"kind": "partner"` and optional `"repoFolder": "barrister-global-services"`.

---

## Google Sheets (optional)

If you prefer a spreadsheet UI, import [`04-PARTNER-REACH-MASTER-LIST.md`](./04-PARTNER-REACH-MASTER-LIST.md) into Google Sheets for **contacts and call notes**. Keep **status** in the JSON tracker so the website stays in sync — or paste status back into JSON weekly.

---

## Current highlight: Field Nation

| Field | Value |
|-------|--------|
| `id` | `field-nation-service-company` |
| `status` | `in_progress` |
| `statusDetail` | Company profile created; pending account information completion |
| `dateStarted` | `2026-06-16` |

Tier 1 still blocked until Workers’ Comp COI + 3 W2 operational employees.
