(function () {
  var STORAGE_KEY = 'leta_ops_tracker_auth';
  /** SHA-256 of ops PIN — not stored in plain text */
  var PIN_HASH = 'd54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5';

  var gate = document.getElementById('ops-gate');
  var app = document.getElementById('ops-app');
  var form = document.getElementById('ops-gate-form');
  var pinInput = document.getElementById('ops-gate-pin');
  var errorEl = document.getElementById('ops-gate-error');

  function isAuthed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === PIN_HASH;
    } catch (e) {
      return false;
    }
  }

  function setAuthed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, PIN_HASH);
    } catch (e) {
      /* private browsing — session only via memory flag */
      window.__letaOpsAuthed = true;
    }
  }

  function showApp() {
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    loadTrackerScripts();
  }

  function showGate() {
    if (gate) gate.hidden = false;
    if (app) app.hidden = true;
    if (pinInput) pinInput.focus();
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  var scriptsLoaded = false;
  function loadTrackerScripts() {
    if (scriptsLoaded) return;
    scriptsLoaded = true;
    loadScript('partner-platform-tracker-data.js')
      .then(function () {
        return loadScript('ops-tracker.js');
      })
      .catch(function () {
        var banner = document.getElementById('ops-banner');
        if (banner) {
          banner.textContent = 'Could not load tracker data. Refresh and try again.';
        }
      });
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

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;
      var pin = (pinInput && pinInput.value) || '';
      sha256(pin)
        .then(function (hash) {
          if (hash === PIN_HASH) {
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

  if (isAuthed() || window.__letaOpsAuthed) {
    showApp();
  } else {
    showGate();
  }
})();
