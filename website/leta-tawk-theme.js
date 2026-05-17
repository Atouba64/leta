/**
 * Forces Tawk chat UI to Leta blue/white only (matches styles.css tokens).
 * Also set colors in Tawk dashboard — see TAWK-APPEARANCE.md.
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";

  var L = {
    bg: "#eef3f9",
    surface: "#ffffff",
    text: "#0f172a",
    textSoft: "#475569",
    accent: "#2563eb",
    accentDeep: "#1d4ed8",
    accentLight: "#3b82f6",
    accentSurface: "#eff6ff",
    border: "#bfdbfe",
    borderSoft: "#e2e8f0",
  };

  var D = {
    bg: "#0b1020",
    surface: "#121a2e",
    text: "#f1f5f9",
    textSoft: "#cbd5e1",
    accent: "#60a5fa",
    accentDeep: "#2563eb",
    accentLight: "#3b82f6",
    accentSurface: "rgba(37, 99, 235, 0.22)",
    border: "rgba(96, 165, 250, 0.35)",
    borderSoft: "rgba(148, 163, 184, 0.22)",
  };

  var TAWK_LEGACY = /#?(?:03a84e|00b41d|1bb76e|00ce7d|4caf50|2db742|128c7e|f57c00|ff9800|e91e63)/i;

  function buildCss() {
    return (
      ":root{" +
      "--leta-bg:" +
      L.bg +
      ";--leta-surface:" +
      L.surface +
      ";--leta-text:" +
      L.text +
      ";--leta-accent:" +
      L.accent +
      ";--leta-accent-deep:" +
      L.accentDeep +
      ";--leta-accent-surface:" +
      L.accentSurface +
      ";--leta-border:" +
      L.border +
      "}" +
      'html,body,#root,[id*="app"],[class*="App"]{background:var(--leta-bg)!important;color:var(--leta-text)!important;' +
      'font-family:"Plus Jakarta Sans",ui-sans-serif,system-ui,sans-serif!important}' +
      "*,*::before,*::after{box-sizing:border-box}" +
      "header,[class*=Header],[class*=header],[class*=toolbar],[class*=Toolbar],[class*=top-bar],[class*=TopBar]," +
      "[class*=card-header],[class*=CardHeader],[class*=welcome-header]{background:linear-gradient(135deg," +
      L.accentLight +
      " 0%," +
      L.accent +
      " 48%," +
      L.accentDeep +
      ")!important;background-color:" +
      L.accent +
      "!important;color:#fff!important;border-color:" +
      L.border +
      "!important}" +
      "header *,[class*=Header] *,[class*=header]:not(input):not(textarea) *{color:#fff!important}" +
      "header svg,header path,[class*=Header] svg,[class*=Header] path{fill:#fff!important;stroke:#fff!important}" +
      "main,[class*=chat],[class*=Chat],[class*=conversation],[class*=Conversation],[class*=message-list]," +
      "[class*=MessageList],[role=log],[class*=body],[class*=Body]{background:var(--leta-bg)!important;color:var(--leta-text)!important}" +
      "[class*=card],[class*=Card],[class*=panel],[class*=Panel],[class*=content],[class*=Content]{" +
      "background:var(--leta-bg)!important;color:var(--leta-text)!important;border-color:var(--leta-border)!important}" +
      "[class*=agent] [class*=bubble],[class*=agent] [class*=message],[class*=Agent] [class*=bubble]," +
      "[class*=operator] [class*=bubble],[class*=incoming]:not([class*=visitor]) [class*=message]{" +
      "background:var(--leta-accent-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border)!important;box-shadow:none!important}" +
      "[class*=visitor] [class*=bubble],[class*=visitor] [class*=message],[class*=Visitor] [class*=bubble]," +
      "[class*=outgoing] [class*=message]{background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid " +
      L.borderSoft +
      "!important;box-shadow:none!important}" +
      "footer,[class*=composer],[class*=Composer],[class*=input],[class*=Input],[class*=footer],[class*=Footer]{" +
      "background:var(--leta-surface)!important;border-color:var(--leta-border)!important;color:var(--leta-text)!important}" +
      "textarea,input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select{" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;border:1px solid var(--leta-border)!important;" +
      "border-radius:10px!important;box-shadow:none!important}" +
      "textarea:focus,input:focus,select:focus{outline:2px solid var(--leta-accent)!important;outline-offset:1px!important}" +
      "button,[role=button],[class*=send],[class*=Send],[class*=submit],[type=submit],[class*=button]:not([class*=close]){" +
      "background:var(--leta-accent)!important;background-image:none!important;color:#fff!important;" +
      "border:1px solid var(--leta-accent-deep)!important;box-shadow:none!important}" +
      "button:hover,[role=button]:hover,[class*=send]:hover{background:var(--leta-accent-deep)!important}" +
      "a,[class*=link]{color:var(--leta-accent)!important}" +
      "[class*=badge],[class*=status],[class*=indicator],[class*=dot],[class*=online]{" +
      "background:var(--leta-accent)!important;color:#fff!important;border-color:var(--leta-border)!important}" +
      "[class*=offline],[class*=away]{background:var(--leta-accent-surface)!important;color:" +
      L.textSoft +
      "!important}" +
      "img,[class*=avatar]{border-color:var(--leta-border)!important}" +
      "[style*='03a84e'],[style*='00b41d'],[style*='1bb76e'],[style*='00ce7d'],[style*='4caf50']{" +
      "background:var(--leta-accent)!important;background-color:var(--leta-accent)!important;color:#fff!important}" +
      "@media (prefers-color-scheme:dark){:root{--leta-bg:" +
      D.bg +
      ";--leta-surface:" +
      D.surface +
      ";--leta-text:" +
      D.text +
      ";--leta-accent:" +
      D.accent +
      ";--leta-accent-deep:" +
      D.accentDeep +
      ";--leta-accent-surface:" +
      D.accentSurface +
      ";--leta-border:" +
      D.border +
      "}}}"
    );
  }

  var cssText = buildCss();

  function stripForeignInlineStyles(doc) {
    try {
      var styled = doc.querySelectorAll("[style]");
      for (var i = 0; i < styled.length; i++) {
        var el = styled[i];
        var raw = el.getAttribute("style") || "";
        if (!raw || !TAWK_LEGACY.test(raw)) continue;
        var cleaned = raw
          .replace(/background-color\s*:\s*[^;]+;?/gi, "")
          .replace(/background\s*:\s*[^;]+;?/gi, "")
          .replace(/\bcolor\s*:\s*[^;]+;?/gi, "")
          .replace(/border-color\s*:\s*[^;]+;?/gi, "")
          .trim();
        if (cleaned) el.setAttribute("style", cleaned);
        else el.removeAttribute("style");
      }
    } catch (err) {
      /* ignore */
    }
  }

  function injectDoc(doc) {
    if (!doc) return false;
    var parent = doc.head || doc.documentElement;
    if (!parent) return false;
    var existing = doc.getElementById(STYLE_ID);
    if (existing) {
      existing.textContent = cssText;
    } else {
      var style = doc.createElement("style");
      style.id = STYLE_ID;
      style.type = "text/css";
      style.textContent = cssText;
      parent.appendChild(style);
    }
    stripForeignInlineStyles(doc);
    return true;
  }

  function walkFrame(frame) {
    var injected = false;
    try {
      if (frame.contentDocument && injectDoc(frame.contentDocument)) injected = true;
      var nested = frame.contentDocument.querySelectorAll("iframe");
      for (var n = 0; n < nested.length; n++) {
        if (walkFrame(nested[n])) injected = true;
      }
    } catch (err) {
      /* cross-origin */
    }
    return injected;
  }

  function applyTheme() {
    var ok = false;
    document.querySelectorAll("iframe").forEach(function (frame) {
      if (walkFrame(frame)) ok = true;
    });
    return ok;
  }

  var watchTimer = null;

  window.LetaApplyTawkTheme = function (durationMs) {
    applyTheme();
    if (watchTimer) clearInterval(watchTimer);
    var elapsed = 0;
    var step = 150;
    var max = durationMs || 15000;
    watchTimer = setInterval(function () {
      applyTheme();
      elapsed += step;
      if (elapsed >= max) clearInterval(watchTimer);
    }, step);
  };

  function startObserver() {
    if (!document.body) return;
    new MutationObserver(function () {
      applyTheme();
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
