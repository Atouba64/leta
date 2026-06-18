#!/usr/bin/env node
/**
 * Sync data/partner-platform-tracker.json → website/ops-tracker-data.json
 *
 * Edit ONLY data/partner-platform-tracker.json (PIN, page copy, partners, platforms).
 * Run after every edit: node scripts/sync-partner-tracker.js
 *
 * Netlify runs this automatically on deploy (see netlify.toml).
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'data/partner-platform-tracker.json');
const dest = path.join(root, 'website/ops-tracker-data.json');

const raw = fs.readFileSync(src, 'utf8');
const data = JSON.parse(raw);

if (!data.config) {
  data.config = {};
}

// Hash PIN for the public deploy file; plain pin stays only in data/ source
if (data.config.pin) {
  data.config.pinHash = crypto.createHash('sha256').update(String(data.config.pin)).digest('hex');
}

const deploy = JSON.parse(JSON.stringify(data));
if (deploy.config) {
  delete deploy.config.pin;
}

deploy.meta = deploy.meta || {};
deploy.meta.entryCount = (deploy.entries || []).length;
deploy.meta.syncedAt = new Date().toISOString().slice(0, 10);

fs.writeFileSync(dest, JSON.stringify(deploy, null, 2) + '\n');
console.log('Synced → website/ops-tracker-data.json (' + deploy.meta.entryCount + ' entries)');
