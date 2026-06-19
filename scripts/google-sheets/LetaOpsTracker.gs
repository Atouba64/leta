/**
 * Leta Ops Tracker — Google Apps Script
 *
 * Install:
 * 1. Create a new Google Sheet (name: "Leta Ops Tracker")
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Run import script locally: node scripts/google-sheets/import-from-json.js
 *    Import each CSV into the matching tab (see 07-GOOGLE-SHEETS-TRACKER.md)
 * 4. Reload the sheet → menu "Leta Tracker" appears
 *
 * Script properties (Project settings → Script properties):
 *   OPS_TRACKER_PIN     — same PIN as ops-tracker.html (default 1998)
 *   OPS_TRACKER_API_URL — optional; defaults to Firebase function below
 */

const DEFAULT_API_URL =
  'https://us-east1-leta-e7d8d.cloudfunctions.net/api/ops-tracker/save';
const GITHUB_JSON_URL =
  'https://raw.githubusercontent.com/Atouba64/leta/main/data/partner-platform-tracker.json';

const SHEET_SETTINGS = 'Settings';
const SHEET_ENTRIES = 'Entries';
const SHEET_STATUS = 'Status_Defs';
const SHEET_CATEGORY = 'Category_Defs';
const SHEET_PLATFORMS = 'Platforms';
const SHEET_PARTNERS = 'Partners';

const ENTRY_HEADERS = [
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

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Leta Tracker')
    .addItem('Reload from GitHub', 'loadFromGitHub')
    .addItem('Save & push to GitHub', 'saveAndPush')
    .addSeparator()
    .addItem('Open live tracker', 'openLiveTracker')
    .addToUi();
}

function openLiveTracker() {
  const html =
    '<script>window.open("https://leta.repair/ops-tracker.html");google.script.host.close();</script>';
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setWidth(10).setHeight(10),
    'Opening…'
  );
}

function getApiUrl() {
  return (
    PropertiesService.getScriptProperties().getProperty('OPS_TRACKER_API_URL') ||
    DEFAULT_API_URL
  );
}

function getPin() {
  return (
    PropertiesService.getScriptProperties().getProperty('OPS_TRACKER_PIN') ||
    '1998'
  );
}

function loadFromGitHub() {
  const ui = SpreadsheetApp.getUi();
  try {
    const res = UrlFetchApp.fetch(GITHUB_JSON_URL, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) {
      throw new Error('GitHub fetch failed: HTTP ' + res.getResponseCode());
    }
    const data = JSON.parse(res.getContentText());
    populateSheetsFromJson_(data);
    ui.alert(
      'Loaded ' +
        (data.entries || []).length +
        ' entries from GitHub.\n\nPlatforms/Partners tabs refresh automatically.'
    );
  } catch (err) {
    ui.alert('Reload failed: ' + err.message);
  }
}

function saveAndPush() {
  const ui = SpreadsheetApp.getUi();
  const pinPrompt = ui.prompt('Ops tracker PIN', 'Enter PIN to publish:', ui.ButtonSet.OK_CANCEL);
  if (pinPrompt.getSelectedButton() !== ui.Button.OK) return;

  const pin = pinPrompt.getResponseText();
  let data;
  try {
    data = buildJsonFromSheets_();
  } catch (err) {
    ui.alert('Build JSON failed: ' + err.message);
    return;
  }

  const payload = {
    pin: pin,
    data: data,
    commitMessage:
      'chore(ops-tracker): Google Sheets update (' + (data.meta?.lastUpdated || 'sheet') + ')',
  };

  try {
    const res = UrlFetchApp.fetch(getApiUrl(), {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
    const body = JSON.parse(res.getContentText());
    if (res.getResponseCode() !== 200 || !body.ok) {
      throw new Error(body.message || 'HTTP ' + res.getResponseCode());
    }
    ui.alert(
      'Published to GitHub!\n\n' +
        (body.commitUrl || '') +
        '\n\nops-tracker.html updates in ~1 minute after Netlify deploy.'
    );
  } catch (err) {
    ui.alert(
      'Push failed: ' +
        err.message +
        '\n\nEnsure GITHUB_TOKEN is set on Cloud Functions (see 07-GOOGLE-SHEETS-TRACKER.md).'
    );
  }
}

function populateSheetsFromJson_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheets_(ss);

  const settingsRows = [
    ['meta.lastUpdated', data.meta?.lastUpdated || ''],
    ['meta.version', data.meta?.version || ''],
    ['config.pin', data.config?.pin || ''],
    ['config.page.eyebrow', data.config?.page?.eyebrow || ''],
    ['config.page.title', data.config?.page?.title || ''],
    ['config.page.deck', data.config?.page?.deck || ''],
    ['config.gate.title', data.config?.gate?.title || ''],
    ['config.gate.subtitle', data.config?.gate?.subtitle || ''],
    ['config.googleSheetUrl', data.config?.googleSheetUrl || ss.getUrl()],
  ];
  writeSheet_(ss, SHEET_SETTINGS, ['key', 'value'], settingsRows);

  const entryRows = (data.entries || []).map(function (e) {
    return ENTRY_HEADERS.map(function (h) {
      if (h === 'letaServices') {
        return Array.isArray(e.letaServices) ? e.letaServices.join(', ') : '';
      }
      if (h === 'georgiaRelevant' || h === 'coiUploaded') {
        return e[h] === true ? 'TRUE' : e[h] === false ? 'FALSE' : '';
      }
      return e[h] == null ? '' : e[h];
    });
  });
  writeSheet_(ss, SHEET_ENTRIES, ENTRY_HEADERS, entryRows);

  const statusRows = Object.keys(data.statusDefinitions || {}).map(function (k) {
    return [k, data.statusDefinitions[k]];
  });
  writeSheet_(ss, SHEET_STATUS, ['key', 'label'], statusRows);

  const catRows = Object.keys(data.categoryDefinitions || {}).map(function (k) {
    return [k, data.categoryDefinitions[k]];
  });
  writeSheet_(ss, SHEET_CATEGORY, ['key', 'label'], catRows);

  refreshFilterTabs_(ss);
}

function buildJsonFromSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settings = readKeyValueSheet_(ss, SHEET_SETTINGS);
  const today = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');

  const data = {
    meta: {
      version: settings['meta.version'] || '1.0.0',
      lastUpdated: settings['meta.lastUpdated'] || today,
      canonicalFile: 'data/partner-platform-tracker.json',
      deployFile: 'website/ops-tracker-data.json',
      liveViewer: 'https://leta.repair/ops-tracker.html',
      updateGuide: '07-partner-accounts/07-GOOGLE-SHEETS-TRACKER.md',
      githubEditUrl:
        'https://github.com/Atouba64/leta/edit/main/data/partner-platform-tracker.json',
    },
    config: {
      pin: settings['config.pin'] || getPin(),
      page: {
        eyebrow: settings['config.page.eyebrow'] || '',
        title: settings['config.page.title'] || '',
        deck: settings['config.page.deck'] || '',
      },
      gate: {
        title: settings['config.gate.title'] || '',
        subtitle: settings['config.gate.subtitle'] || '',
      },
      bannerEditLink:
        'https://github.com/Atouba64/leta/edit/main/data/partner-platform-tracker.json',
      bannerHowToLink:
        'https://github.com/Atouba64/leta/blob/main/07-partner-accounts/07-GOOGLE-SHEETS-TRACKER.md',
      googleSheetUrl: settings['config.googleSheetUrl'] || ss.getUrl(),
    },
    statusDefinitions: readDefsSheet_(ss, SHEET_STATUS),
    kindDefinitions: {
      platform: 'Portal, marketplace, or procurement system (work-order bid / vendor registration)',
      partner: 'Named company to reach out to for fulfillment or subcontract overflow',
    },
    categoryDefinitions: readDefsSheet_(ss, SHEET_CATEGORY),
    letaServices: [
      'break_fix',
      'pos_rollout',
      'networking',
      'cabling',
      'smart_hands',
      'digital_signage',
      'cctv_access',
      'sd_wan',
      'smart_lockers',
      'telematics_install',
      'ev_charger',
      'k12_higher_ed',
      'government_onsite',
    ],
    entries: readEntriesSheet_(ss),
  };

  data.meta.lastUpdated = today;
  data.meta.entryCount = data.entries.length;
  return data;
}

function readEntriesSheet_(ss) {
  const sh = ss.getSheetByName(SHEET_ENTRIES);
  if (!sh) throw new Error('Missing sheet: ' + SHEET_ENTRIES);
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(function (h) {
    return String(h).trim();
  });
  const entries = [];

  for (var r = 1; r < values.length; r++) {
    const row = values[r];
    if (!row[0] && !row[2]) continue;
    const obj = {};
    headers.forEach(function (h, i) {
      if (!h) return;
      var v = row[i];
      if (h === 'letaServices') {
        obj[h] = String(v || '')
          .split(',')
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean);
      } else if (h === 'georgiaRelevant' || h === 'coiUploaded') {
        obj[h] = String(v).toUpperCase() === 'TRUE';
      } else if (h === 'priority') {
        obj[h] = v === '' || v == null ? null : Number(v);
      } else if (h === 'dateStarted' || h === 'dateApplied') {
        obj[h] = v === '' || v == null ? null : String(v);
      } else {
        obj[h] = v == null ? '' : v;
      }
    });
    entries.push(obj);
  }
  return entries;
}

function readKeyValueSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  const out = {};
  if (!sh) return out;
  const values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0]) out[String(values[i][0])] = values[i][1];
  }
  return out;
}

function readDefsSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  const out = {};
  if (!sh) return out;
  const values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0]) out[String(values[i][0])] = String(values[i][1] || '');
  }
  return out;
}

function writeSheet_(ss, name, headers, rows) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clear();
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  if (rows.length) {
    sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
}

function ensureSheets_(ss) {
  [SHEET_SETTINGS, SHEET_ENTRIES, SHEET_STATUS, SHEET_CATEGORY, SHEET_PLATFORMS, SHEET_PARTNERS].forEach(
    function (name) {
      if (!ss.getSheetByName(name)) ss.insertSheet(name);
    }
  );
}

function refreshFilterTabs_(ss) {
  const platforms = ss.getSheetByName(SHEET_PLATFORMS);
  const partners = ss.getSheetByName(SHEET_PARTNERS);
  const entriesName = SHEET_ENTRIES;

  platforms.clear();
  platforms
    .getRange(1, 1)
    .setFormula(
      '=IFERROR(FILTER(' +
        entriesName +
        '!A:S,' +
        entriesName +
        '!B:B="platform"),"No platforms")'
    );
  platforms.setFrozenRows(1);

  partners.clear();
  partners
    .getRange(1, 1)
    .setFormula(
      '=IFERROR(FILTER(' + entriesName + '!A:S,' + entriesName + '!B:B="partner"),"No partners")'
    );
  partners.setFrozenRows(1);
}
