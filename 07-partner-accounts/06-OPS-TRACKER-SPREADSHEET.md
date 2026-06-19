# Ops tracker spreadsheet editor

Web-based spreadsheet connected to [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html).

## Location

| What | URL / path |
|------|------------|
| **Spreadsheet (live)** | [leta.repair/ops-tracker-sheet.html](https://leta.repair/ops-tracker-sheet.html) |
| **Table view (live)** | [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html) |
| **Local spreadsheet** | `website/ops-tracker-sheet.html` |
| **Canonical data file** | `data/partner-platform-tracker.json` |
| **Deploy copy** | `website/ops-tracker-data.json` |

PIN: same as ops tracker (`config.pin` in JSON, default `1998`).

## Tabs

| Tab | Edits |
|-----|--------|
| **Settings** | `meta`, `config.pin`, page copy, gate copy |
| **All entries** | Full partner/platform rows |
| **Platforms** | `kind === platform` only |
| **Partners** | `kind === partner` only |
| **Definitions** | Status and category labels |

## Undo / redo

- **Ctrl+Z** (Cmd+Z on Mac) — undo
- **Ctrl+Shift+Z** or **Ctrl+Y** — redo
- Toolbar **Undo** / **Redo** buttons

Each edit snapshots the full tracker (up to 80 steps).

## Save & push to GitHub

1. Click **Save & push to GitHub**
2. Cloud Function commits both:
   - `data/partner-platform-tracker.json`
   - `website/ops-tracker-data.json`
3. Netlify redeploys → [ops-tracker.html](https://leta.repair/ops-tracker.html) updates in ~1 minute

### One-time setup (required for push)

1. Create a GitHub **fine-grained PAT** with **Contents: Read and write** on `Atouba64/leta`
2. Add to `functions/.env`:
   ```
   GITHUB_TOKEN=ghp_...
   GITHUB_REPO_OWNER=Atouba64
   GITHUB_REPO_NAME=leta
   ```
3. Deploy functions:
   ```bash
   cd functions && npm run deploy
   ```
   (Requires Firebase Blaze billing — same as prior deploy blocker.)

Without `GITHUB_TOKEN`, the spreadsheet still edits locally and supports undo; push shows an error.

## Local preview

```bash
node scripts/sync-partner-tracker.js
cd website && python3 -m http.server 8080
```

Open http://localhost:8080/ops-tracker-sheet.html

Push from localhost still calls the live Cloud Function (if configured).

## Files

| File | Role |
|------|------|
| `website/ops-tracker-sheet.html` | Spreadsheet page |
| `website/ops-tracker-sheet.js` | Editor, undo, save |
| `website/ops-tracker-sheet.css` | Layout |
| `functions/lib/partnerTrackerDeploy.js` | JSON sync logic |
| `functions/lib/partnerTrackerGitHub.js` | GitHub commit API |
| `functions/index.js` | `POST /ops-tracker/save` |
