const crypto = require('crypto');

/**
 * Build repo source + website deploy JSON from editor payload.
 * @param {object} sourceInput full tracker object (may include config.pin)
 */
function preparePartnerTrackerFiles(sourceInput) {
  const source = JSON.parse(JSON.stringify(sourceInput));
  if (!source.config) source.config = {};

  const deploy = JSON.parse(JSON.stringify(source));
  if (source.config.pin) {
    deploy.config.pinHash = crypto.createHash('sha256').update(String(source.config.pin)).digest('hex');
    delete deploy.config.pin;
  }

  const today = new Date().toISOString().slice(0, 10);
  source.meta = source.meta || {};
  source.meta.entryCount = (source.entries || []).length;
  source.meta.lastUpdated = today;

  deploy.meta = deploy.meta || {};
  deploy.meta.entryCount = source.meta.entryCount;
  deploy.meta.lastUpdated = today;
  deploy.meta.syncedAt = today;

  return {
    sourceContent: JSON.stringify(source, null, 2) + '\n',
    deployContent: JSON.stringify(deploy, null, 2) + '\n',
  };
}

function verifyOpsTrackerPin(pin) {
  const expected =
    process.env.OPS_TRACKER_PIN_HASH ||
    'd54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5';
  const hash = crypto.createHash('sha256').update(String(pin || '')).digest('hex');
  return hash === expected;
}

module.exports = { preparePartnerTrackerFiles, verifyOpsTrackerPin };
