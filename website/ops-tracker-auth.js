(function () {
  var STORAGE_KEY = 'leta_ops_tracker_auth';
  var DATA_URL = 'ops-tracker-data.json';

  var gate = document.getElementById('ops-gate');
  var app = document.getElementById('ops-app');
  var form = document.getElementById('ops-gate-form');
  var pinInput = document.getElementById('ops-gate-pin');
  var errorEl = document.getElementById('ops-gate-error');
  var gateTitle = document.getElementById('ops-gate-title');
  var gateSubtitle = document.getElementById('ops-gate-subtitle');

  var trackerData = null;
  var pinHash = '';

  function applyGateCopy(cfg) {
    if (!cfg || !cfg.gate) return;
    if (gateTitle && cfg.gate.title) gateTitle.textContent = cfg.gate.title;
    if (gateSubtitle && cfg.gate.subtitle) gateSubtitle.textContent = cfg.gate.subtitle;
  }

  function applyPageCopy(cfg) {
    if (!cfg || !cfg.page) return;
    var eyebrow = document.getElementById('ops-page-eyebrow');
    var title = document.getElementById('ops-page-title');
    var deck = document.getElementById('ops-page-deck');
    if (eyebrow && cfg.page.eyebrow) eyebrow.textContent = cfg.page.eyebrow;
    if (title && cfg.page.title) title.textContent = cfg.page.title;
    if (deck && cfg.page.deck) deck.textContent = cfg.page.deck;
  }

  function isAuthed() {
    if (!pinHash) return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === pinHash;
    } catch (e) {
      return false;
    }
  }

  function setAuthed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, pinHash);
    } catch (e) {
      window.__letaOpsAuthed = true;
    }
  }

  function showApp() {
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    applyPageCopy(trackerData && trackerData.config);
    if (typeof window.initOpsTracker === 'function' && trackerData) {
      window.initOpsTracker(trackerData);
    }
  }

  function showGate() {
    if (gate) gate.hidden = false;
    if (app) app.hidden = true;
    if (pinInput) pinInput.focus();
  }

  function sha256(text) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(new Error('Secure context required'));
    }
    var enc = new TextEncoder().encode(text);
    return window.crypto.subtle.digest('SHA-256', enc).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  function showLoadError(msg) {
    if (gateTitle) gateTitle.textContent = 'Could not load tracker';
    if (gateSubtitle) gateSubtitle.textContent = msg;
    if (form) form.hidden = true;
  }

  function boot() {
    fetch(DATA_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        trackerData = data;
        pinHash = (data.config && data.config.pinHash) || '';
        applyGateCopy(data.config);

        if (!pinHash) {
          showLoadError('Missing config.pinHash — run node scripts/sync-partner-tracker.js');
          return;
        }

        if (form) {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (errorEl) errorEl.hidden = true;
            var pin = (pinInput && pinInput.value) || '';
            sha256(pin)
              .then(function (hash) {
                if (hash === pinHash) {
                  setAuthed();
                  showApp();
                } else {
                  if (errorEl) {
                    errorEl.hidden = false;
                    errorEl.textContent = 'Incorrect PIN. Try again.';
                  }
                  if (pinInput) {
                    pinInput.value = '';
                    pinInput.focus();
                  }
                }
              })
              .catch(function () {
                if (errorEl) {
                  errorEl.hidden = false;
                  errorEl.textContent = 'PIN check unavailable. Use HTTPS and a modern browser.';
                }
              });
          });
        }

        if (isAuthed() || (window.__letaOpsAuthed && pinHash)) {
          showApp();
        } else {
          showGate();
        }
      })
      .catch(function () {
        showLoadError(
          'Run node scripts/sync-partner-tracker.js from the repo root, then refresh. (Missing website/ops-tracker-data.json)'
        );
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
