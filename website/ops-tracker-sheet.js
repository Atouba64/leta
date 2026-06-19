(function () {
  var DATA_URL = 'ops-tracker-data.json';
  var PIN_STORAGE = 'leta_ops_sheet_pin';
  var AUTH_STORAGE = 'leta_ops_tracker_auth';
  var PIN_HASH = 'd54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5';

  var state = {
    data: null,
    pin: '',
    history: [],
    historyIndex: -1,
    tables: {},
    saving: false,
  };

  var gate = document.getElementById('sheet-gate');
  var app = document.getElementById('sheet-app');
  var gateForm = document.getElementById('sheet-gate-form');
  var gatePin = document.getElementById('sheet-gate-pin');
  var gateError = document.getElementById('sheet-gate-error');
  var statusEl = document.getElementById('sheet-status');

  function apiBase() {
    var cfg = window.LETA_CONTACT || {};
    if (cfg.aiChatApiUrl) {
      return cfg.aiChatApiUrl.replace(/\/agent\/chat\/?$/, '');
    }
    if (cfg.firebaseProjectId) {
      return 'https://us-east1-' + cfg.firebaseProjectId + '.cloudfunctions.net/api';
    }
    return '';
  }

  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.className = 'sheet-status' + (type ? ' sheet-status--' + type : '');
  }

  function cloneData() {
    return JSON.parse(JSON.stringify(state.data));
  }

  function pushHistory() {
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(cloneData());
    if (state.history.length > 80) {
      state.history.shift();
    } else {
      state.historyIndex++;
    }
    updateUndoButtons();
  }

  function restoreHistory(index) {
    if (index < 0 || index >= state.history.length) return;
    state.historyIndex = index;
    state.data = cloneDataFrom(state.history[index]);
    rebuildAllTables();
    updateUndoButtons();
    setStatus('Restored snapshot ' + (index + 1) + ' of ' + state.history.length);
  }

  function cloneDataFrom(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function undo() {
    if (state.historyIndex > 0) restoreHistory(state.historyIndex - 1);
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) restoreHistory(state.historyIndex + 1);
  }

  function updateUndoButtons() {
    var u = document.getElementById('sheet-btn-undo');
    var r = document.getElementById('sheet-btn-redo');
    if (u) u.disabled = state.historyIndex <= 0;
    if (r) r.disabled = state.historyIndex >= state.history.length - 1;
  }

  function scheduleHistoryPush() {
    clearTimeout(scheduleHistoryPush._t);
    scheduleHistoryPush._t = setTimeout(pushHistory, 400);
  }

  var ENTRY_COLS = [
    { title: 'ID', field: 'id', width: 180, editor: 'input' },
    { title: 'Kind', field: 'kind', width: 90, editor: 'list', editorParams: { values: ['platform', 'partner'] } },
    { title: 'Name', field: 'name', width: 200, editor: 'input' },
    { title: 'Category', field: 'category', width: 120, editor: 'input' },
    { title: 'Status', field: 'status', width: 110, editor: 'input' },
    { title: 'Status detail', field: 'statusDetail', width: 220, editor: 'textarea' },
    { title: 'Priority', field: 'priority', width: 80, editor: 'number' },
    { title: 'Owner', field: 'owner', width: 100, editor: 'input' },
    { title: 'Updated', field: 'dateUpdated', width: 110, editor: 'input' },
    { title: 'COI', field: 'coiUploaded', width: 70, formatter: 'tickCross', editor: true },
    { title: 'URL', field: 'registrationUrl', width: 200, editor: 'input' },
    { title: 'Notes', field: 'notes', width: 240, editor: 'textarea' },
    { title: 'Repo folder', field: 'repoFolder', width: 140, editor: 'input' },
  ];

  function entryTableOptions(filterFn) {
    return {
      height: '520px',
      layout: 'fitDataFill',
      movableColumns: true,
      pagination: true,
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      columns: ENTRY_COLS,
      data: (state.data.entries || []).filter(filterFn || function () {
        return true;
      }),
      cellEdited: onEntryEdited,
    };
  }

  function onEntryEdited(cell) {
    var row = cell.getRow().getData();
    var idx = state.data.entries.findIndex(function (e) {
      return e.id === row.id;
    });
    if (idx === -1) {
      state.data.entries.push(row);
    } else {
      state.data.entries[idx] = row;
    }
    scheduleHistoryPush();
    syncEntryTables(cell.getTable());
  }

  function syncEntryTables(sourceTable) {
    ['all', 'platforms', 'partners'].forEach(function (key) {
      var t = state.tables[key];
      if (!t || t === sourceTable) return;
      if (key === 'all') t.setData(state.data.entries);
      if (key === 'platforms') t.setData(state.data.entries.filter(function (e) { return e.kind === 'platform'; }));
      if (key === 'partners') t.setData(state.data.entries.filter(function (e) { return e.kind === 'partner'; }));
    });
  }

  function settingsToRows() {
    var d = state.data;
    var rows = [];
    rows.push({ key: 'meta.lastUpdated', value: d.meta?.lastUpdated || '' });
    rows.push({ key: 'meta.version', value: d.meta?.version || '' });
    rows.push({ key: 'config.pin', value: d.config?.pin || state.pin || '' });
    rows.push({ key: 'config.page.eyebrow', value: d.config?.page?.eyebrow || '' });
    rows.push({ key: 'config.page.title', value: d.config?.page?.title || '' });
    rows.push({ key: 'config.page.deck', value: d.config?.page?.deck || '' });
    rows.push({ key: 'config.gate.title', value: d.config?.gate?.title || '' });
    rows.push({ key: 'config.gate.subtitle', value: d.config?.gate?.subtitle || '' });
    return rows;
  }

  function applySettingsRow(row) {
    var key = row.key;
    var val = row.value;
    if (!state.data.config) state.data.config = {};
    if (!state.data.meta) state.data.meta = {};
    if (key === 'meta.lastUpdated') state.data.meta.lastUpdated = val;
    else if (key === 'meta.version') state.data.meta.version = val;
    else if (key === 'config.pin') state.data.config.pin = val;
    else if (key === 'config.page.eyebrow') {
      state.data.config.page = state.data.config.page || {};
      state.data.config.page.eyebrow = val;
    } else if (key === 'config.page.title') {
      state.data.config.page = state.data.config.page || {};
      state.data.config.page.title = val;
    } else if (key === 'config.page.deck') {
      state.data.config.page = state.data.config.page || {};
      state.data.config.page.deck = val;
    } else if (key === 'config.gate.title') {
      state.data.config.gate = state.data.config.gate || {};
      state.data.config.gate.title = val;
    } else if (key === 'config.gate.subtitle') {
      state.data.config.gate = state.data.config.gate || {};
      state.data.config.gate.subtitle = val;
    }
  }

  function defsToRows(obj) {
    return Object.keys(obj || {}).map(function (k) {
      return { key: k, label: obj[k] };
    });
  }

  function applyDefRow(target, row) {
    if (!state.data[target]) state.data[target] = {};
    state.data[target][row.key] = row.label;
  }

  function destroyTables() {
    Object.keys(state.tables).forEach(function (k) {
      if (state.tables[k]) state.tables[k].destroy();
    });
    state.tables = {};
  }

  function rebuildAllTables() {
    destroyTables();
    state.tables.settings = new Tabulator('#table-settings', {
      height: '280px',
      layout: 'fitColumns',
      columns: [
        { title: 'Setting', field: 'key', width: 220 },
        { title: 'Value', field: 'value', editor: 'textarea' },
      ],
      data: settingsToRows(),
      cellEdited: function (cell) {
        applySettingsRow(cell.getRow().getData());
        scheduleHistoryPush();
      },
    });

    state.tables.all = new Tabulator('#table-all', entryTableOptions());
    state.tables.platforms = new Tabulator(
      '#table-platforms',
      entryTableOptions(function (e) {
        return e.kind === 'platform';
      })
    );
    state.tables.partners = new Tabulator(
      '#table-partners',
      entryTableOptions(function (e) {
        return e.kind === 'partner';
      })
    );

    state.tables.statusDefs = new Tabulator('#table-status-defs', {
      height: '220px',
      layout: 'fitColumns',
      columns: [
        { title: 'Key', field: 'key', editor: 'input' },
        { title: 'Label', field: 'label', editor: 'input' },
      ],
      data: defsToRows(state.data.statusDefinitions),
      cellEdited: function (cell) {
        applyDefRow('statusDefinitions', cell.getRow().getData());
        scheduleHistoryPush();
      },
    });

    state.tables.categoryDefs = new Tabulator('#table-category-defs', {
      height: '280px',
      layout: 'fitColumns',
      columns: [
        { title: 'Key', field: 'key', editor: 'input' },
        { title: 'Label', field: 'label', editor: 'textarea' },
      ],
      data: defsToRows(state.data.categoryDefinitions),
      cellEdited: function (cell) {
        applyDefRow('categoryDefinitions', cell.getRow().getData());
        scheduleHistoryPush();
      },
    });
  }

  function loadData() {
    setStatus('Loading tracker…');
    return fetch(DATA_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        state.data = json;
        if (!state.data.config) state.data.config = {};
        if (state.data.config.pinHash) delete state.data.config.pinHash;
        if (!state.data.config.pin && state.pin) state.data.config.pin = state.pin;
        pushHistory();
        rebuildAllTables();
        setStatus('Loaded ' + (state.data.entries || []).length + ' entries. Edits auto-track for undo.');
      });
  }

  function saveToGitHub() {
    if (state.saving || !state.data) return;
    var base = apiBase();
    if (!base) {
      setStatus('Firebase API URL not configured in contact-config.js — cannot push.', 'err');
      return;
    }
    if (!state.pin) {
      setStatus('PIN missing — reload and unlock again.', 'err');
      return;
    }

    state.saving = true;
    setStatus('Pushing to GitHub…');
    var btn = document.getElementById('sheet-btn-save');
    if (btn) btn.disabled = true;

    var payload = cloneData();
    if (!payload.config) payload.config = {};
    payload.config.pin = payload.config.pin || state.pin;

    fetch(base + '/ops-tracker/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pin: state.pin,
        data: payload,
        commitMessage:
          'chore(ops-tracker): spreadsheet update (' + (payload.meta?.lastUpdated || 'sheet') + ')',
      }),
    })
      .then(function (res) {
        return res.json().then(function (body) {
          return { ok: res.ok, body: body };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.body.ok) {
          throw new Error(result.body.message || 'Save failed');
        }
        setStatus(
          'Published! ' + (result.body.commitUrl || '') + ' — ops-tracker updates in ~1 min.',
          'ok'
        );
      })
      .catch(function (err) {
        setStatus(err.message || 'Save failed', 'err');
      })
      .finally(function () {
        state.saving = false;
        if (btn) btn.disabled = false;
      });
  }

  function initTabs() {
    document.querySelectorAll('.sheet-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.sheet-tab').forEach(function (b) {
          b.classList.toggle('sheet-tab--active', b === btn);
        });
        document.querySelectorAll('.sheet-panel').forEach(function (p) {
          p.classList.toggle('sheet-panel--active', p.getAttribute('data-panel') === tab);
        });
      });
    });
  }

  function showApp() {
    gate.hidden = true;
    app.hidden = false;
    loadData();
  }

  function tryRestorePin() {
    try {
      return sessionStorage.getItem(PIN_STORAGE) || '';
    } catch (e) {
      return '';
    }
  }

  function storePin(pin) {
    state.pin = pin;
    try {
      sessionStorage.setItem(PIN_STORAGE, pin);
      sessionStorage.setItem(AUTH_STORAGE, PIN_HASH);
    } catch (e) {
      /* ignore */
    }
  }

  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    gateError.hidden = true;
    var pin = gatePin.value || '';
    sha256(pin).then(function (hash) {
      if (hash === PIN_HASH) {
        storePin(pin);
        showApp();
      } else {
        gateError.hidden = false;
        gateError.textContent = 'Incorrect PIN.';
        gatePin.value = '';
      }
    });
  });

  document.getElementById('sheet-btn-undo')?.addEventListener('click', undo);
  document.getElementById('sheet-btn-redo')?.addEventListener('click', redo);
  document.getElementById('sheet-btn-reload')?.addEventListener('click', function () {
    loadData();
  });
  document.getElementById('sheet-btn-save')?.addEventListener('click', saveToGitHub);

  document.addEventListener('keydown', function (e) {
    if (!app || app.hidden) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Z' || e.key === 'y')) {
      e.preventDefault();
      redo();
    }
  });

  initTabs();

  var savedPin = tryRestorePin();
  try {
    if (sessionStorage.getItem(AUTH_STORAGE) === PIN_HASH && savedPin) {
      state.pin = savedPin;
      showApp();
    }
  } catch (e) {
    /* show gate */
  }
})();
