/**
 * Leta Ops Tracker — Google Apps Script
 *
 * Install:
 * 1. Create a new Google Sheet (name: "Leta Ops Tracker")
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Run import script locally: node scripts/google-sheets/import-from-json.js
 *    Import each CSV into the matching tab (see 07-GOOGLE-SHEETS-TRACKER.md)
 * 100% free path: Google Sheet → GitHub → Netlify. No Firebase or database required.
 *
 * Script properties (Project settings → Script properties, or use menu):
 *   GITHUB_TOKEN        — required for Save & push (fine-grained PAT, Contents write)
 *   OPS_TRACKER_PIN     — same PIN as ops-tracker.html (default 1998)
 *   GITHUB_REPO_OWNER   — optional (default Atouba64)
 *   GITHUB_REPO_NAME    — optional (default leta)
 *   GITHUB_REPO_BRANCH  — optional (default main)
 */


const GITHUB_JSON_URL =
  'https://raw.githubusercontent.com/Atouba64/leta/main/data/partner-platform-tracker.json';

const SHEET_SETTINGS = 'Settings';
const SHEET_ENTRIES = 'Entries';
const SHEET_STATUS = 'Status_Defs';
const SHEET_CATEGORY = 'Category_Defs';
const SHEET_PLATFORMS = 'Platforms';
const SHEET_PARTNERS = 'Partners';

const SHEET_OUTREACH = 'Outreach_Stages';
const SHEET_GOALS = 'Goal_Defs';
const SHEET_PIPELINE = 'Pipeline';
const SHEET_ACTIVE = 'Active_Queue';
const ENTRIES_COL_END = 'AG';

/** Columns shown on read-only view tabs (edit source rows on Entries). */
const PLATFORM_VIEW_HEADERS = [
  'name',
  'category',
  'status',
  'statusDetail',
  'registrationUrl',
  'owner',
  'pathPriority',
  'nextStep',
  'dateUpdated',
];

const PARTNER_VIEW_HEADERS = [
  'name',
  'category',
  'outreachStage',
  'status',
  'owner',
  'pathPriority',
  'primaryContact',
  'nextStep',
  'blockers',
  'enterpriseChain',
  'futurePlan',
];

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

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Leta Tracker')
    .addItem('Save & push to GitHub (updates live site)', 'saveAndPush')
    .addItem('Reload from GitHub', 'loadFromGitHub')
    .addItem('Refresh linked tabs', 'refreshLinkedTabs')
    .addSeparator()
    .addItem('Set up GitHub token (one time)', 'configureGitHubToken')
    .addItem('Test GitHub connection', 'testGitHubConnection')
    .addItem('Open live tracker', 'openLiveTracker')
    .addToUi();
  try {
    ensureViewTabsPopulated_();
  } catch (e) {
    // Menu still works if auto-refresh fails
  }
}

function openLiveTracker() {
  const html =
    '<script>window.open("https://leta.repair/ops-tracker.html");google.script.host.close();</script>';
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setWidth(10).setHeight(10),
    'Opening…'
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

function getGitHubConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    token: props.getProperty('GITHUB_TOKEN') || '',
    owner: props.getProperty('GITHUB_REPO_OWNER') || 'Atouba64',
    repo: props.getProperty('GITHUB_REPO_NAME') || 'leta',
    branch: props.getProperty('GITHUB_REPO_BRANCH') || 'main',
  };
}

function configureGitHubToken() {
  const ui = SpreadsheetApp.getUi();
  const existing = getGitHubConfig_().token;
  const msg = existing
    ? 'GitHub token is already saved. Enter a new token to replace it, or Cancel.'
    : 'Create a fine-grained GitHub PAT with Contents read+write on Atouba64/leta.\n\nPaste the token (github_pat_... or ghp_...):';
  const prompt = ui.prompt('GitHub token setup', msg, ui.ButtonSet.OK_CANCEL);
  if (prompt.getSelectedButton() !== ui.Button.OK) return;
  const token = String(prompt.getResponseText() || '').trim();
  if (!token) {
    ui.alert('No token entered.');
    return;
  }
  PropertiesService.getScriptProperties().setProperty('GITHUB_TOKEN', token);
  testGitHubConnection(true);
}

function testGitHubConnection(silent) {
  const ui = SpreadsheetApp.getUi();
  const gh = getGitHubConfig_();
  if (!gh.token) {
    ui.alert('No GitHub token saved.\n\nUse: Leta Tracker → Set up GitHub token (one time)');
    return;
  }
  try {
    const base = 'https://api.github.com/repos/' + gh.owner + '/' + gh.repo;
    const repoRes = githubFetch_(base, gh.token);
    if (repoRes.getResponseCode() !== 200) {
      throw new Error(githubApiError_(repoRes, 'read repo'));
    }
    const repo = JSON.parse(repoRes.getContentText());
    const refRes = githubFetch_(base + '/git/ref/heads/' + gh.branch, gh.token);
    if (refRes.getResponseCode() !== 200) {
      throw new Error(githubApiError_(refRes, 'read branch ' + gh.branch));
    }
    if (!silent) {
      ui.alert(
        'GitHub connection OK!\n\n' +
          'Repo: ' +
          repo.full_name +
          '\nBranch: ' +
          gh.branch +
          '\n\nYou can use Save & push to GitHub.'
      );
    } else {
      ui.alert(
        'GitHub token saved and verified!\n\n' +
          'Repo: ' +
          repo.full_name +
          '\n\nUse: Leta Tracker → Save & push to GitHub'
      );
    }
  } catch (err) {
    ui.alert(
      'GitHub token test failed:\n\n' +
        err.message +
        '\n\nCheck:\n' +
        '• Fine-grained PAT on account Atouba64\n' +
        '• Repository access: only leta\n' +
        '• Contents: Read and write\n' +
        '• Token not expired'
    );
  }
}

function githubApiError_(res, step) {
  const code = res.getResponseCode();
  const text = res.getContentText();
  try {
    const json = JSON.parse(text);
    return step + ' failed (HTTP ' + code + '): ' + (json.message || text).slice(0, 200);
  } catch (e) {
    return step + ' failed (HTTP ' + code + '): ' + String(text).replace(/<[^>]+>/g, ' ').slice(0, 200);
  }
}

function verifyPin_(pin) {
  return String(pin) === String(getPin());
}

function sha256Hex_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text);
  return bytes
    .map(function (b) {
      const v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? '0' + v : v;
    })
    .join('');
}

function preparePartnerTrackerFiles_(sourceInput) {
  const source = JSON.parse(JSON.stringify(sourceInput));
  if (!source.config) source.config = {};

  const deploy = JSON.parse(JSON.stringify(source));
  if (source.config.pin) {
    deploy.config.pinHash = sha256Hex_(String(source.config.pin));
    delete deploy.config.pin;
  }
  if (deploy.config.pinHash && deploy.config.pin) delete deploy.config.pin;

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
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

function githubFetch_(url, token, options) {
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const opts = options || {};
  opts.headers = Object.assign(headers, opts.headers || {});
  opts.muteHttpExceptions = true;
  return UrlFetchApp.fetch(url, opts);
}

function commitFilesToGitHub_(cfg, message, files) {
  try {
    return commitFilesViaGitApi_(cfg, message, files);
  } catch (gitErr) {
    // Contents API works more reliably with fine-grained PATs
    return commitFilesViaContentsApi_(cfg, message, files, gitErr.message);
  }
}

function commitFilesViaGitApi_(cfg, message, files) {
  const base = 'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo;
  const refUrl = base + '/git/ref/heads/' + cfg.branch;

  const refRes = githubFetch_(refUrl, cfg.token);
  if (refRes.getResponseCode() !== 200) {
    throw new Error(githubApiError_(refRes, 'read branch'));
  }
  const parentSha = JSON.parse(refRes.getContentText()).object.sha;

  const commitRes = githubFetch_(base + '/git/commits/' + parentSha, cfg.token);
  if (commitRes.getResponseCode() !== 200) {
    throw new Error(githubApiError_(commitRes, 'read commit'));
  }
  const parentCommit = JSON.parse(commitRes.getContentText());

  const treeItems = [];
  files.forEach(function (file) {
    const blobRes = githubFetch_(base + '/git/blobs', cfg.token, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ content: file.content, encoding: 'utf-8' }),
    });
    if (blobRes.getResponseCode() !== 201) {
      throw new Error(githubApiError_(blobRes, 'upload ' + file.path));
    }
    const blob = JSON.parse(blobRes.getContentText());
    treeItems.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  });

  const treeRes = githubFetch_(base + '/git/trees', cfg.token, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ base_tree: parentCommit.tree.sha, tree: treeItems }),
  });
  if (treeRes.getResponseCode() !== 201) {
    throw new Error(githubApiError_(treeRes, 'create tree'));
  }
  const tree = JSON.parse(treeRes.getContentText());

  const newCommitRes = githubFetch_(base + '/git/commits', cfg.token, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ message: message, tree: tree.sha, parents: [parentSha] }),
  });
  if (newCommitRes.getResponseCode() !== 201) {
    throw new Error(githubApiError_(newCommitRes, 'create commit'));
  }
  const newCommit = JSON.parse(newCommitRes.getContentText());

  const updateRes = githubFetch_(refUrl, cfg.token, {
    method: 'patch',
    contentType: 'application/json',
    payload: JSON.stringify({ sha: newCommit.sha }),
  });
  if (updateRes.getResponseCode() !== 200) {
    throw new Error(githubApiError_(updateRes, 'update branch'));
  }

  return {
    sha: newCommit.sha,
    url: 'https://github.com/' + cfg.owner + '/' + cfg.repo + '/commit/' + newCommit.sha,
  };
}

function getFileSha_(cfg, path) {
  const url =
    'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + '/contents/' + path + '?ref=' + cfg.branch;
  const res = githubFetch_(url, cfg.token);
  if (res.getResponseCode() === 404) return null;
  if (res.getResponseCode() !== 200) {
    throw new Error(githubApiError_(res, 'read ' + path));
  }
  return JSON.parse(res.getContentText()).sha;
}

function putFileViaContents_(cfg, path, content, message, sha) {
  const url =
    'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + '/contents/' + path;
  const body = {
    message: message,
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    branch: cfg.branch,
  };
  if (sha) body.sha = sha;
  const res = githubFetch_(url, cfg.token, {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(body),
  });
  if (res.getResponseCode() !== 200 && res.getResponseCode() !== 201) {
    throw new Error(githubApiError_(res, 'write ' + path));
  }
  const json = JSON.parse(res.getContentText());
  return json.commit && json.commit.html_url;
}

function commitFilesViaContentsApi_(cfg, message, files, priorError) {
  let lastUrl = '';
  files.forEach(function (file, i) {
    const sha = getFileSha_(cfg, file.path);
    const fileMessage = files.length > 1 ? message + ' (' + (i + 1) + '/' + files.length + ')' : message;
    lastUrl =
      putFileViaContents_(cfg, file.path, file.content, fileMessage, sha) || lastUrl;
  });
  if (!lastUrl) {
    throw new Error(priorError || 'Contents API commit failed');
  }
  return { sha: '', url: lastUrl };
}

function saveAndPush() {
  const ui = SpreadsheetApp.getUi();
  const pinPrompt = ui.prompt('Ops tracker PIN', 'Enter PIN to publish:', ui.ButtonSet.OK_CANCEL);
  if (pinPrompt.getSelectedButton() !== ui.Button.OK) return;

  const pin = pinPrompt.getResponseText();
  if (!verifyPin_(pin)) {
    ui.alert('Incorrect PIN.');
    return;
  }

  let data;
  try {
    data = buildJsonFromSheets_();
    // Always store this sheet URL on publish
    data.config.googleSheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  } catch (err) {
    ui.alert('Build JSON failed: ' + err.message);
    return;
  }

  const commitMessage =
    'chore(ops-tracker): Google Sheets update (' + (data.meta?.lastUpdated || 'sheet') + ')';

  const files = preparePartnerTrackerFiles_(data);
  const gh = getGitHubConfig_();

  if (!gh.token) {
    ui.alert(
      'No GitHub token saved.\n\n' +
        '1. Leta Tracker → Set up GitHub token (one time)\n' +
        '2. Leta Tracker → Test GitHub connection\n' +
        '3. Try Save & push again'
    );
    return;
  }

  try {
    const result = commitFilesToGitHub_(gh, commitMessage, [
      { path: 'data/partner-platform-tracker.json', content: files.sourceContent },
      { path: 'website/ops-tracker-data.json', content: files.deployContent },
    ]);
    ui.alert(
      'Published to GitHub!\n\n' +
        result.url +
        '\n\nhttps://leta.repair/ops-tracker.html will update in ~1 minute (Netlify deploy).'
    );
  } catch (err) {
    ui.alert(
      'Push failed:\n\n' +
        err.message +
        '\n\nTry: Leta Tracker → Test GitHub connection\n' +
        'Re-save token if expired or permissions changed.'
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

  const outreachRows = Object.keys(data.outreachStageDefinitions || {}).map(function (k) {
    return [k, data.outreachStageDefinitions[k]];
  });
  writeSheet_(ss, SHEET_OUTREACH, ['key', 'label'], outreachRows);

  const goalRows = Object.keys(data.relationshipGoalDefinitions || {}).map(function (k) {
    return [k, data.relationshipGoalDefinitions[k]];
  });
  writeSheet_(ss, SHEET_GOALS, ['key', 'label'], goalRows);

  setupLinkedTabs_(ss);
}

function refreshLinkedTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupLinkedTabs_(ss);
  const counts = countViewTabs_(ss);
  SpreadsheetApp.getUi().alert(
    'Linked tabs refreshed from Entries.\n\n' +
      '• Platforms: ' +
      counts.platforms +
      ' rows\n' +
      '• Partners: ' +
      counts.partners +
      ' rows\n' +
      '• Pipeline: ' +
      counts.partners +
      ' rows\n' +
      '• Active_Queue: ' +
      counts.active +
      ' rows\n\n' +
      'Edit data on the Entries tab — then Refresh linked tabs again.'
  );
}

function ensureViewTabsPopulated_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const entries = ss.getSheetByName(SHEET_ENTRIES);
  const platforms = ss.getSheetByName(SHEET_PLATFORMS);
  if (!entries || entries.getLastRow() < 2) return;
  if (!platforms || platforms.getLastRow() > 1) return;
  setupLinkedTabs_(ss);
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
    outreachStageDefinitions: readDefsSheet_(ss, SHEET_OUTREACH),
    relationshipGoalDefinitions: readDefsSheet_(ss, SHEET_GOALS),
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
      } else if (h === 'priority' || h === 'pathPriority') {
        obj[h] = v === '' || v == null ? null : Number(v);
      } else if (
        h === 'dateStarted' ||
        h === 'dateApplied' ||
        h === 'lastTouchDate' ||
        h === 'nextStepDate' ||
        h === 'dateUpdated'
      ) {
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
    const numRows = rows.length;
    const numCols = headers.length;
    sh.getRange(2, 1, numRows, numCols).setValues(rows);
  }
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
}

function ensureSheets_(ss) {
  [
    SHEET_SETTINGS,
    SHEET_ENTRIES,
    SHEET_STATUS,
    SHEET_CATEGORY,
    SHEET_OUTREACH,
    SHEET_GOALS,
    SHEET_PLATFORMS,
    SHEET_PARTNERS,
    SHEET_PIPELINE,
    SHEET_ACTIVE,
  ].forEach(function (name) {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });
}

function setupLinkedTabs_(ss) {
  refreshFilterTabs_(ss);
  applyEntriesValidations_(ss);
}

function applyEntriesValidations_(ss) {
  const entries = ss.getSheetByName(SHEET_ENTRIES);
  if (!entries) return;
  const lastRow = Math.max(entries.getLastRow(), 200);
  const numRows = lastRow - 1;
  if (numRows < 1) return;

  const kindRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['platform', 'partner'], true)
    .setAllowInvalid(false)
    .build();
  entries.getRange(2, 2, numRows, 1).setDataValidation(kindRule);

  const statusSh = ss.getSheetByName(SHEET_STATUS);
  if (statusSh && statusSh.getLastRow() > 1) {
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(statusSh.getRange(2, 1, statusSh.getLastRow() - 1, 1), true)
      .setAllowInvalid(false)
      .build();
    entries.getRange(2, 9, numRows, 1).setDataValidation(statusRule);
  }

  const catSh = ss.getSheetByName(SHEET_CATEGORY);
  if (catSh && catSh.getLastRow() > 1) {
    const catRule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(catSh.getRange(2, 1, catSh.getLastRow() - 1, 1), true)
      .setAllowInvalid(false)
      .build();
    entries.getRange(2, 4, numRows, 1).setDataValidation(catRule);
  }

  const outreachSh = ss.getSheetByName(SHEET_OUTREACH);
  if (outreachSh && outreachSh.getLastRow() > 1) {
    const outreachRule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(outreachSh.getRange(2, 1, outreachSh.getLastRow() - 1, 1), true)
      .setAllowInvalid(true)
      .build();
    entries.getRange(2, 11, numRows, 1).setDataValidation(outreachRule);
  }

  const goalSh = ss.getSheetByName(SHEET_GOALS);
  if (goalSh && goalSh.getLastRow() > 1) {
    const goalRule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(goalSh.getRange(2, 1, goalSh.getLastRow() - 1, 1), true)
      .setAllowInvalid(true)
      .build();
    entries.getRange(2, 18, numRows, 1).setDataValidation(goalRule);
  }
}

function refreshFilterTabs_(ss) {
  populateViewTabsFromEntries_(ss);
}

function countViewTabs_(ss) {
  function countDataRows(name) {
    const sh = ss.getSheetByName(name);
    if (!sh) return 0;
    return Math.max(0, sh.getLastRow() - 1);
  }
  return {
    platforms: countDataRows(SHEET_PLATFORMS),
    partners: countDataRows(SHEET_PARTNERS),
    active: countDataRows(SHEET_ACTIVE),
  };
}

function populateViewTabsFromEntries_(ss) {
  const entries = readEntriesSheet_(ss);
  const platforms = entries.filter(function (e) {
    return String(e.kind).toLowerCase() === 'platform';
  });
  const partners = entries.filter(function (e) {
    return String(e.kind).toLowerCase() === 'partner';
  });
  const active = partners.filter(function (e) {
    return (
      String(e.status) === 'in_progress' ||
      (e.nextStep != null && String(e.nextStep).trim() !== '')
    );
  });

  sortByPathThenName_(platforms);
  sortByPathThenName_(partners);
  sortByPathThenName_(active);

  writeViewSheet_(ss, SHEET_PLATFORMS, PLATFORM_VIEW_HEADERS, platforms);
  writeViewSheet_(ss, SHEET_PARTNERS, PARTNER_VIEW_HEADERS, partners);
  writeViewSheet_(ss, SHEET_PIPELINE, PARTNER_VIEW_HEADERS, partners);
  writeViewSheet_(ss, SHEET_ACTIVE, PARTNER_VIEW_HEADERS, active);
}

function sortByPathThenName_(list) {
  list.sort(function (a, b) {
    const pa = a.pathPriority == null ? 9999 : Number(a.pathPriority);
    const pb = b.pathPriority == null ? 9999 : Number(b.pathPriority);
    if (pa !== pb) return pa - pb;
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
}

function writeViewSheet_(ss, sheetName, headers, entries) {
  const rows = entries.map(function (e) {
    return headers.map(function (h) {
      return e[h] == null ? '' : e[h];
    });
  });
  writeSheet_(ss, sheetName, headers, rows);
  const sh = ss.getSheetByName(sheetName);
  if (sh) {
    sh.getRange(1, 1, 1, headers.length).setNote(
      'Read-only view from Entries. Edit on Entries tab, then Leta Tracker → Refresh linked tabs.'
    );
  }
}
