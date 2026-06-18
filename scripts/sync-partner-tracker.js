#!/usr/bin/env node
/**
 * Sync data/partner-platform-tracker.json → website/partner-platform-tracker-data.js
 * Run after editing the canonical JSON: node scripts/sync-partner-tracker.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'data/partner-platform-tracker.json');
const dest = path.join(root, 'website/partner-platform-tracker-data.js');

const data = JSON.parse(fs.readFileSync(src, 'utf8'));
const out =
  '/** Keep in sync with data/partner-platform-tracker.json — run: node scripts/sync-partner-tracker.js */\n' +
  'window.LETA_PARTNER_PLATFORM_TRACKER = ' +
  JSON.stringify(data, null, 2) +
  ';\n';

fs.writeFileSync(dest, out);
console.log('Synced partner-platform-tracker → website/partner-platform-tracker-data.js');
