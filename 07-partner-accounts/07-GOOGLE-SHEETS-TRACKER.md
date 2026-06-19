# Google Sheets — Leta ops tracker

**This is the spreadsheet editor** for [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html). Edit in Google Sheets; **Save & push** updates GitHub and the live tracker.

## Your spreadsheet (create once)

1. Go to [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**
2. Name it: **Leta Ops Tracker**
3. **Bookmark the URL** — this is your master spreadsheet location

After setup, paste the sheet URL into `Settings` tab → `config.googleSheetUrl` (or it auto-fills on first push).

---

## One-time setup (~10 minutes)

### Step 1 — Import current data

From the leta repo root:

```bash
node scripts/google-sheets/import-from-json.js
```

This creates CSVs in `scripts/google-sheets/export/`:

| CSV | Google tab name |
|-----|-----------------|
| `Settings.csv` | **Settings** |
| `Entries.csv` | **Entries** |
| `Status_Defs.csv` | **Status_Defs** |
| `Category_Defs.csv` | **Category_Defs** |

In Google Sheets, for each CSV:

1. **+** at bottom → rename tab to match table above  
2. **File → Import → Upload** → select CSV → **Import location: Replace current sheet**

Create two extra tabs (empty for now):

- **Platforms** — auto-filled by script (read-only view)  
- **Partners** — auto-filled by script (read-only view)

### Step 2 — Install Apps Script

1. In the spreadsheet: **Extensions → Apps Script**
2. Delete any default code in `Code.gs`
3. Copy all of [`scripts/google-sheets/LetaOpsTracker.gs`](../../scripts/google-sheets/LetaOpsTracker.gs) → paste → **Save**
4. **Run** `onOpen` once (authorize when prompted) or reload the spreadsheet

You should see menu **Leta Tracker** in the menu bar.

### Step 3 — Enable push to GitHub

The menu **Leta Tracker → Save & push to GitHub** calls the Leta Cloud Function, which commits to `main`.

1. Create a GitHub **fine-grained PAT** (Contents: read/write on `Atouba64/leta`)
2. Add to `functions/.env`:
   ```
   GITHUB_TOKEN=ghp_...
   ```
3. Deploy functions (requires Firebase Blaze):
   ```bash
   cd functions && npm run deploy
   ```

Optional Apps Script properties (**Project settings → Script properties**):

| Property | Value |
|----------|--------|
| `OPS_TRACKER_PIN` | `1998` (or your PIN) |
| `OPS_TRACKER_API_URL` | Override API URL if needed |

---

## Daily use

| Action | How |
|--------|-----|
| **Edit data** | Edit **Settings** or **Entries** tabs (normal Google Sheets editing) |
| **Undo** | **Ctrl+Z** / **Cmd+Z** (native Google Sheets) |
| **Browse platforms** | Open **Platforms** tab (FILTER view — edit on **Entries**) |
| **Browse partners** | Open **Partners** tab |
| **Reload from GitHub** | Menu **Leta Tracker → Reload from GitHub** |
| **Publish changes** | Menu **Leta Tracker → Save & push to GitHub** → enter PIN |
| **View live site** | Menu **Leta Tracker → Open live tracker** or [ops-tracker.html](https://leta.repair/ops-tracker.html) |

After push, Netlify redeploys in ~1 minute → live tracker updates.

---

## Tabs

| Tab | Edit? | Purpose |
|-----|-------|---------|
| **Settings** | Yes | PIN, page copy, meta dates |
| **Entries** | Yes | All platforms & partners (source of truth) |
| **Status_Defs** | Yes | Status dropdown labels |
| **Category_Defs** | Yes | Category labels |
| **Platforms** | No (formula) | Filtered view of `kind=platform` |
| **Partners** | No (formula) | Filtered view of `kind=partner` |

**Entries columns:** `id`, `kind`, `name`, `category`, `registrationUrl`, `registrationType`, `georgiaRelevant`, `letaServices` (comma-separated), `status`, `statusDetail`, `dateStarted`, `dateApplied`, `dateUpdated`, `coiUploaded`, `owner`, `priority`, `notes`, `repoFolder`, `outreachStage`

---

## What gets committed

On **Save & push**, Apps Script builds JSON and the API commits:

- `data/partner-platform-tracker.json`
- `website/ops-tracker-data.json`

Same files as editing locally + `node scripts/sync-partner-tracker.js`.

---

## Repo files

| Path | Purpose |
|------|---------|
| [`scripts/google-sheets/LetaOpsTracker.gs`](../../scripts/google-sheets/LetaOpsTracker.gs) | Apps Script source (paste into Google) |
| [`scripts/google-sheets/import-from-json.js`](../../scripts/google-sheets/import-from-json.js) | Generate import CSVs |
| [`scripts/google-sheets/export/`](../../scripts/google-sheets/export/) | Generated CSVs (gitignored) |
| [`data/partner-platform-tracker.json`](../../data/partner-platform-tracker.json) | Canonical JSON in repo |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No **Leta Tracker** menu | Reload sheet; run `onOpen` in Apps Script |
| Push fails: GITHUB_TOKEN | Set token in `functions/.env` and deploy functions |
| Push fails: Invalid PIN | Use PIN from Settings tab `config.pin` |
| Platforms tab empty | Run **Reload from GitHub** once to install FILTER formulas |
| Live site stale | Wait ~1 min after push; hard-refresh ops-tracker |

---

## Note on the web spreadsheet page

The earlier `ops-tracker-sheet.html` page was removed in favor of **Google Sheets** as the editing UI.
