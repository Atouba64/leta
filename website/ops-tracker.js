window.initOpsTracker = function (data) {
  if (!data || !data.entries) return;

  var meta = data.meta || {};
  var cfg = data.config || {};
  var statusDefs = data.statusDefinitions || {};
  var categoryDefs = data.categoryDefinitions || {};
  var outreachDefs = data.outreachStageDefinitions || {};

  var banner = document.getElementById('ops-banner');
  var tbody = document.getElementById('ops-tbody');
  var stats = document.getElementById('ops-stats');
  var searchEl = document.getElementById('ops-search');
  var kindEl = document.getElementById('ops-kind');
  var statusEl = document.getElementById('ops-status');
  var categoryEl = document.getElementById('ops-category');

  if (!banner || !tbody) return;

  var editUrl = cfg.bannerEditLink || meta.githubEditUrl || '#';
  var howToUrl = cfg.bannerHowToLink || meta.updateGuide || '#';

  banner.innerHTML =
    '<strong>Last updated:</strong> ' +
    (meta.lastUpdated || '—') +
    ' · <strong>Entries:</strong> ' +
    data.entries.length +
    ' · <strong>Source:</strong> <code>data/partner-platform-tracker.json</code>' +
    ' · <a href="' +
    editUrl +
    '" target="_blank" rel="noopener noreferrer">Edit on GitHub</a>' +
    ' · <a href="https://github.com/Atouba64/leta/blob/main/07-partner-accounts/07-GOOGLE-SHEETS-TRACKER.md" target="_blank" rel="noopener noreferrer">Google Sheets editor</a>' +
    ' · <a href="' +
    howToUrl +
    '" target="_blank" rel="noopener noreferrer">How to update</a>';

  Object.keys(statusDefs).forEach(function (key) {
    var opt = document.createElement('option');
    opt.value = key;
    opt.textContent = statusDefs[key];
    statusEl.appendChild(opt);
  });

  Object.keys(categoryDefs).forEach(function (key) {
    var opt = document.createElement('option');
    opt.value = key;
    opt.textContent = categoryDefs[key];
    categoryEl.appendChild(opt);
  });

  function labelStatus(key) {
    return statusDefs[key] || key.replace(/_/g, ' ');
  }

  function labelCategory(key) {
    return categoryDefs[key] || key;
  }

  function labelOutreach(key) {
    if (!key) return '—';
    return outreachDefs[key] || key.replace(/_/g, ' ');
  }

  function render() {
    var q = (searchEl.value || '').toLowerCase().trim();
    var kind = kindEl.value;
    var status = statusEl.value;
    var category = categoryEl.value;

    var rows = data.entries.filter(function (e) {
      if (kind && e.kind !== kind) return false;
      if (status && e.status !== status) return false;
      if (category && e.category !== category) return false;
      if (!q) return true;
      var hay =
        (e.name || '') +
        ' ' +
        (e.statusDetail || '') +
        ' ' +
        (e.notes || '') +
        ' ' +
        (e.nextStep || '') +
        ' ' +
        (e.blockers || '') +
        ' ' +
        (e.owner || '') +
        ' ' +
        (e.primaryContact || '') +
        ' ' +
        (e.enterpriseChain || '') +
        ' ' +
        (e.status || '');
      return hay.toLowerCase().indexOf(q) !== -1;
    });

    rows.sort(function (a, b) {
      var hpA = a.pathPriority == null ? 9999 : a.pathPriority;
      var hpB = b.pathPriority == null ? 9999 : b.pathPriority;
      if (hpA !== hpB) return hpA - hpB;
      var pa = a.priority == null ? 999 : a.priority;
      var pb = b.priority == null ? 999 : b.priority;
      if (pa !== pb) return pa - pb;
      return (a.name || '').localeCompare(b.name || '');
    });

    tbody.innerHTML = '';
    rows.forEach(function (e) {
      var tr = document.createElement('tr');
      var detail = e.statusDetail ? '<div class="ops-detail">' + escapeHtml(e.statusDetail) + '</div>' : '';
      var kindLine = '<div class="ops-kind">' + escapeHtml(e.kind || '') + '</div>';
      var notes = escapeHtml(e.notes || '');
      if (e.repoFolder) {
        notes += (notes ? ' · ' : '') + 'Repo: ' + escapeHtml(e.repoFolder);
      }
      var nextLine = e.nextStep
        ? '<div class="ops-detail">' + escapeHtml(e.nextStep) + '</div>'
        : '';
      if (e.blockers) {
        nextLine +=
          '<div class="ops-detail" style="opacity:0.85">Blocker: ' + escapeHtml(e.blockers) + '</div>';
      }
      tr.innerHTML =
        '<td><strong>' +
        escapeHtml(e.name) +
        '</strong>' +
        kindLine +
        (e.priority != null ? '<div class="ops-kind">P' + e.priority + '</div>' : '') +
        '</td>' +
        '<td><span class="ops-badge ops-badge--' +
        escapeHtml(e.status) +
        '">' +
        escapeHtml(labelStatus(e.status)) +
        '</span>' +
        detail +
        '</td>' +
        '<td>' +
        escapeHtml(labelCategory(e.category)) +
        '</td>' +
        '<td class="ops-priority">' +
        (e.pathPriority != null ? e.pathPriority : '—') +
        '</td>' +
        '<td class="ops-detail">' +
        escapeHtml(e.enterpriseChain || '—') +
        '</td>' +
        '<td>' +
        escapeHtml(e.owner || '—') +
        '</td>' +
        '<td class="ops-detail">' +
        escapeHtml(labelOutreach(e.outreachStage)) +
        '</td>' +
        '<td class="ops-detail">' +
        nextLine +
        '</td>' +
        '<td>' +
        escapeHtml(e.dateUpdated || '—') +
        '</td>' +
        '<td>' +
        (e.registrationUrl
          ? '<a href="' + escapeHtml(e.registrationUrl) + '" target="_blank" rel="noopener noreferrer">Open</a>'
          : '—') +
        '</td>' +
        '<td class="ops-detail">' +
        notes +
        '</td>';
      tbody.appendChild(tr);
    });

    stats.textContent = 'Showing ' + rows.length + ' of ' + data.entries.length + ' entries';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  searchEl.addEventListener('input', render);
  kindEl.addEventListener('change', render);
  statusEl.addEventListener('change', render);
  categoryEl.addEventListener('change', render);
  render();
};
