#!/usr/bin/env node
/**
 * Export data/partner-platform-tracker.json → CSV files for Google Sheets import.
 *
 * Usage:
 *   node scripts/google-sheets/import-from-json.js
 *
 * Then in Google Sheets: File → Import → Upload each CSV into the matching tab.
 * Or: create blank tabs and paste data from CSVs.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');
const src = path.join(root, 'data/partner-platform-tracker.json');
const outDir = path.join(__dirname, 'export');

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
  'dateStarted',
  'dateApplied',
  'dateUpdated',
  'coiUploaded',
  'owner',
  'priority',
  'notes',
  'repoFolder',
  'outreachStage',
];

const entryRows = (data.entries || []).map(function (e) {
  return entryHeaders.map(function (h) {
    if (h === 'letaServices') return (e.letaServices || []).join(', ');
    if (h === 'georgiaRelevant' || h === 'coiUploaded') return e[h] ? 'TRUE' : 'FALSE';
    return e[h] == null ? '' : e[h];
  });
});

const statusRows = Object.entries(data.statusDefinitions || {});
const categoryRows = Object.entries(data.categoryDefinitions || {});

writeCsv('Settings.csv', ['key', 'value'], settingsRows);
writeCsv('Entries.csv', entryHeaders, entryRows);
writeCsv('Status_Defs.csv', ['key', 'label'], statusRows);
writeCsv('Category_Defs.csv', ['key', 'label'], categoryRows);

console.log('\nImport into Google Sheets (see 07-partner-accounts/07-GOOGLE-SHEETS-TRACKER.md)');
