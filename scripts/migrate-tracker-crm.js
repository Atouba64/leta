#!/usr/bin/env node
/**
 * Add CRM fields to all tracker entries and merge data/partner-crm-seed.json
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const trackerPath = path.join(root, 'data/partner-platform-tracker.json');
const seedPath = path.join(root, 'data/partner-crm-seed.json');
const hpPathSeedPath = path.join(root, 'data/hp-adjacent-path-seed.json');

const CRM_DEFAULTS = {
  outreachStage: '',
  primaryContact: '',
  contactTitle: '',
  contactEmail: '',
  contactPhone: '',
  relationshipGoal: '',
  painHypothesis: '',
  geographies: '',
  lastTouchDate: null,
  nextStep: '',
  nextStepDate: null,
  blockers: '',
  futurePlan: '',
  pathPriority: null,
  enterpriseChain: '',
};

const tracker = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));
const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const hpSeed = fs.existsSync(hpPathSeedPath)
  ? JSON.parse(fs.readFileSync(hpPathSeedPath, 'utf8'))
  : { entries: {} };

if (seed.outreachStageDefinitions) {
  tracker.outreachStageDefinitions = seed.outreachStageDefinitions;
}
if (seed.relationshipGoalDefinitions) {
  tracker.relationshipGoalDefinitions = seed.relationshipGoalDefinitions;
}

tracker.config.page.deck =
  'Edit the Leta Ops Tracker Google Sheet → Save & push to GitHub. Live site updates in ~1 minute. No Firebase required.';

const ENTRY_ORDER = [
  'id', 'kind', 'name', 'category', 'registrationUrl', 'registrationType', 'georgiaRelevant', 'letaServices',
  'status', 'statusDetail', 'outreachStage', 'owner', 'priority', 'pathPriority', 'enterpriseChain',
  'primaryContact', 'contactTitle', 'contactEmail', 'contactPhone',
  'relationshipGoal', 'painHypothesis', 'geographies',
  'dateStarted', 'dateApplied', 'lastTouchDate', 'nextStepDate',
  'nextStep', 'blockers', 'futurePlan',
  'coiUploaded', 'dateUpdated', 'notes', 'repoFolder',
];

function normalizeEntry(entry, extra) {
  const merged = Object.assign({}, CRM_DEFAULTS, entry, extra || {});
  if (merged.kind === 'platform' && !(extra && extra.outreachStage)) {
    merged.outreachStage = merged.outreachStage || '';
  }
  const out = {};
  ENTRY_ORDER.forEach(function (k) {
    if (merged[k] !== undefined) out[k] = merged[k];
  });
  Object.keys(merged).forEach(function (k) {
    if (out[k] === undefined) out[k] = merged[k];
  });
  return out;
}

tracker.entries = (tracker.entries || []).map(function (entry) {
  const crm = (seed.entries && seed.entries[entry.id]) || {};
  const hp = (hpSeed.entries && hpSeed.entries[entry.id]) || {};
  return normalizeEntry(entry, Object.assign({}, crm, hp));
});

tracker.meta.lastUpdated = new Date().toISOString().slice(0, 10);
tracker.meta.entryCount = tracker.entries.length;
tracker.meta.version = '1.1.0';

fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2) + '\n');
console.log('Updated', trackerPath, '—', tracker.entries.length, 'entries');
