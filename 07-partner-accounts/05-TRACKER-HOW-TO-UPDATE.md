# How to update the partner & platform tracker

## Recommended: Google Sheets

**Primary editor:** [Google Sheets setup guide](./07-GOOGLE-SHEETS-TRACKER.md)

1. Create **Leta Ops Tracker** in [Google Sheets](https://sheets.google.com)
2. Import CSVs: `npm run sheets:export` (from repo root), then upload into the sheet
3. Paste Apps Script from `scripts/google-sheets/LetaOpsTracker.gs`
4. **Leta Tracker → Set up GitHub token** (one time)
5. Menu **Leta Tracker → Save & push to GitHub** → updates [ops-tracker.html](https://leta.repair/ops-tracker.html) in ~1 minute

Native **Ctrl+Z** undo in Google Sheets. Tabs: Settings, Entries, Platforms, Partners, definitions.

---

## Alternative: edit JSON in repo

**File:** [`data/partner-platform-tracker.json`](../../data/partner-platform-tracker.json)

| Section | What you can change |
|---------|---------------------|
| `config.pin` | Ops page PIN |
| `config.googleSheetUrl` | Link to your Google Sheet |
| `config.page` / `config.gate` | Page copy |
| `entries[]` | Every platform and partner row |

```bash
node scripts/sync-partner-tracker.js
git add data/partner-platform-tracker.json website/ops-tracker-data.json
git push
```

---

## Live viewer

[leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html) (PIN required)

---

## Entry fields

| Field | Example |
|-------|---------|
| `status` | `not_started` · `in_progress` · `applied` · `active` |
| `statusDetail` | Human-readable sub-status |
| `dateUpdated` | Set on each change |
| `owner` / `notes` | Owner and blockers |

---

## Current highlight: Field Nation

| Field | Value |
|-------|--------|
| `id` | `field-nation-service-company` |
| `status` | `in_progress` |
| `statusDetail` | Company profile created; pending account information completion |

Still having issues with Tax information.