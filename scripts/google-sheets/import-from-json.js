#!/usr/bin/env node
/**
 * Export data/partner-platform-tracker.json → CSV files for Google Sheets import.
 *
 * Usage (from leta repo root — not from website/):
 *   npm run sheets:export
 *   node scripts/google-sheets/import-from-json.js
 *
 * Then in Google Sheets: File → Import → Upload each CSV into the matching tab.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');
const src = path.join(root, 'data/partner-platform-tracker.json');
const outDir = path.join(__dirname, 'export');

if (!fs.existsSync(src)) {
  console.error(
    'Could not find data/partner-platform-tracker.json.\n\n' +
      'Run this from the leta repo root (not website/):\n\n' +
      '  cd /path/to/leta\n' +
      '  npm run sheets:export\n\n' +
      'If you are in website/, use:\n\n' +
      '  node ../scripts/google-sheets/import-from-json.js\n'
  );
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(src, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });

function esc(v) {
  const s = v == null ? '' : String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function writeCsv(filename, headers, rows) {
  const lines = [headers.map(esc).join(',')];
  rows.forEach(function (row) {
    lines.push(row.map(esc).join(','));
  });
  const p = path.join(outDir, filename);
  fs.writeFileSync(p, lines.join('\n') + '\n');
  console.log('Wrote', p);
}

const settingsRows = [
  ['meta.lastUpdated', data.meta?.lastUpdated || ''],
  ['meta.version', data.meta?.version || ''],
  ['config.pin', data.config?.pin || ''],
  ['config.page.eyebrow', data.config?.page?.eyebrow || ''],
  ['config.page.title', data.config?.page?.title || ''],
  ['config.page.deck', data.config?.page?.deck || ''],
  ['config.gate.title', data.config?.gate?.title || ''],
  ['config.gate.subtitle', data.config?.gate?.subtitle || ''],
  ['config.googleSheetUrl', data.config?.googleSheetUrl || ''],
];

const entryHeaders = [
  'id',
  'kind',
  'name',
  'category',
  'registrationUrl',
  'registrationType',
  'georgiaRelevant',
  'letaServices',
  'status',
  'statusDetail',
  'outreachStage',
  'owner',
  'priority',
  'pathPriority',
  'enterpriseChain',
  'primaryContact',
  'contactTitle',
  'contactEmail',
  'contactPhone',
  'relationshipGoal',
  'painHypothesis',
  'geographies',
  'dateStarted',
  'dateApplied',
  'lastTouchDate',
  'nextStepDate',
  'nextStep',
  'blockers',
  'futurePlan',
  'coiUploaded',
  'dateUpdated',
  'notes',
  'repoFolder',
];

const entryRows = (data.entries || []).map(function (e) {
  return entryHeaders.map(function (h) {
    if (h === 'letaServices') return (e.letaServices || []).join(', ');
    if (h === 'georgiaRelevant' || h === 'coiUploaded') return e[h] ? 'TRUE' : 'FALSE';
    if (h === 'priority' || h === 'pathPriority') return e[h] == null ? '' : e[h];
    return e[h] == null ? '' : e[h];
  });
});

writeCsv('Settings.csv', ['key', 'value'], settingsRows);
writeCsv('Entries.csv', entryHeaders, entryRows);
writeCsv('Status_Defs.csv', ['key', 'label'], Object.entries(data.statusDefinitions || {}));
writeCsv('Category_Defs.csv', ['key', 'label'], Object.entries(data.categoryDefinitions || {}));
writeCsv('Outreach_Stages.csv', ['key', 'label'], Object.entries(data.outreachStageDefinitions || {}));
writeCsv('Goal_Defs.csv', ['key', 'label'], Object.entries(data.relationshipGoalDefinitions || {}));

console.log('\nImport into Google Sheets (see 07-partner-accounts/07-GOOGLE-SHEETS-TRACKER.md)');
