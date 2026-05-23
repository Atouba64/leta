(function () {
  var data = window.LETA_GEORGIA_COVERAGE;
  if (!data) return;

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function regionById(id) {
    return (data.regions || []).find(function (r) {
      return r.id === id;
    });
  }

  function anchorCard(anchor, extraClass) {
    var corridors = (anchor.corridors || [])
      .map(function (cid) {
        var c = (data.corridors || []).find(function (x) {
          return x.id === cid;
        });
        return c ? c.name : cid;
      })
      .join(" · ");
    var cities = (anchor.cities || []).join(", ");
    var phase = anchor.rolloutPhase != null ? "Phase " + anchor.rolloutPhase : "";
    var cls = "tile tile--feature coverage-anchor" + (extraClass ? " " + extraClass : "");
    if (anchor.marketingHighlight) cls += " coverage-anchor--highlight";

    return (
      '<article class="' +
      cls +
      '" data-anchor-id="' +
      esc(anchor.id) +
      '">' +
      (anchor.marketingHighlight ? '<p class="coverage-anchor__badge">Central hub</p>' : "") +
      "<h3 class=\"tile-title\">" +
      esc(anchor.name) +
      "</h3>" +
      (anchor.subregion ? '<p class="coverage-anchor__sub">' + esc(anchor.subregion) + "</p>" : "") +
      '<p class="coverage-anchor__cities">' +
      esc(cities) +
      "</p>" +
      "<p>" +
      esc(anchor.role) +
      "</p>" +
      (corridors ? '<p class="coverage-anchor__corridor">' + esc(corridors) + "</p>" : "") +
      (phase ? '<p class="coverage-anchor__phase">' + esc(phase) + "</p>" : "") +
      "</article>"
    );
  }

  var grid = document.getElementById("coverage-anchor-grid");
  if (grid) {
    var html = "";
    if (data.metroAtlanta) {
      html +=
        '<section class="coverage-region" aria-labelledby="cov-core">' +
        '<h2 id="cov-core" class="coverage-region__title">Core density</h2>' +
        '<p class="coverage-region__deck">' +
        esc(data.metroAtlanta.role) +
        "</p>" +
        '<div class="bento bento--trio">' +
        anchorCard(data.metroAtlanta, "tile--clarity") +
        "</div></section>";
    }

    (data.regions || []).forEach(function (region) {
      var anchors = (data.anchors || []).filter(function (a) {
        return a.region === region.id;
      });
      if (!anchors.length) return;
      html +=
        '<section class="coverage-region" aria-labelledby="cov-' +
        region.id +
        '">' +
        '<h2 id="cov-' +
        region.id +
        '" class="coverage-region__title">' +
        esc(region.name) +
        "</h2>" +
        '<p class="coverage-region__deck">' +
        esc(region.description) +
        "</p>" +
        '<div class="bento bento--trio">';
      anchors.forEach(function (a) {
        html += anchorCard(a);
      });
      html += "</div></section>";
    });
    grid.innerHTML = html;
  }

  var corridorList = document.getElementById("coverage-corridors");
  if (corridorList && data.corridors) {
    corridorList.innerHTML = data.corridors
      .map(function (c) {
        return "<li><strong>" + esc(c.name) + "</strong> — " + esc(c.role) + "</li>";
      })
      .join("");
  }

  var tagline = document.querySelector("[data-leta-coverage-tagline]");
  if (tagline && data.tagline) tagline.textContent = data.tagline;

  var metroSelect = document.getElementById("home_metro");
  if (metroSelect && metroSelect.dataset.lettaGeorgiaPopulated !== "1") {
    var first = metroSelect.querySelector('option[value=""]');
    metroSelect.innerHTML = "";
    if (first) metroSelect.appendChild(first);
    else {
      var blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "Select…";
      metroSelect.appendChild(blank);
    }
    if (data.metroAtlanta) {
      var g0 = document.createElement("optgroup");
      g0.label = "Core density";
      var o0 = document.createElement("option");
      o0.value = data.metroAtlanta.name;
      o0.textContent = data.metroAtlanta.name;
      g0.appendChild(o0);
      metroSelect.appendChild(g0);
    }
    (data.regions || []).forEach(function (region) {
      var g = document.createElement("optgroup");
      g.label = region.name;
      (data.anchors || [])
        .filter(function (a) {
          return a.region === region.id;
        })
        .forEach(function (a) {
          var o = document.createElement("option");
          o.value = a.name + " area";
          o.textContent = a.name + (a.cities && a.cities.length > 1 ? " (" + a.cities.join(" / ") + ")" : "");
          g.appendChild(o);
        });
      if (g.children.length) metroSelect.appendChild(g);
    });
    var other = document.createElement("option");
    other.value = "Other Georgia";
    other.textContent = "Other Georgia (rural / between anchors)";
    metroSelect.appendChild(other);
    metroSelect.dataset.lettaGeorgiaPopulated = "1";
  }
})();
