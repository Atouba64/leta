# Leta data files

| File | Purpose |
|------|---------|
| [`georgia-coverage.json`](./georgia-coverage.json) | **Canonical** Georgia anchor markets, corridors, rollout phases |
| [`partner-platform-tracker.json`](./partner-platform-tracker.json) | **Canonical** partner & platform outreach/registration status |

## Sync to website

After editing `georgia-coverage.json`:

```bash
node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('data/georgia-coverage.json','utf8'));
fs.writeFileSync(
  'website/georgia-coverage-data.js',
  '/** Keep in sync with data/georgia-coverage.json */\\nwindow.LETA_GEORGIA_COVERAGE = ' + JSON.stringify(d, null, 2) + ';\\n'
);
"
```

Also review `website/contact-config.js` (`recruitMetros`, `recruitRegions`) and `app/src/constants/georgiaAnchors.js`.

## Sync partner tracker to website

After editing `partner-platform-tracker.json`:

```bash
node scripts/sync-partner-tracker.js
```

Live page: [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html). Guide: [`07-partner-accounts/05-TRACKER-HOW-TO-UPDATE.md`](../07-partner-accounts/05-TRACKER-HOW-TO-UPDATE.md).
