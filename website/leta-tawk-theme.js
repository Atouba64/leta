/**
 * Injects Leta blue/white theme into Tawk chat iframes when accessible.
 * Fallback: set the same colors in Tawk dashboard (see TAWK-APPEARANCE.md).
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";

  var theme = {
    light: {
      bg: "#eef3f9",
      surface: "#ffffff",
      text: "#0f172a",
      accent: "#2563eb",
      accentDeep: "#1d4ed8",
      accentLight: "#3b82f6",
      accentSurface: "#eff6ff",
      border: "#bfdbfe",
      borderSoft: "#e2e8f0",
    },
    dark: {
      bg: "#0b1020",
      surface: "#121a2e",
      text: "#f1f5f9",
      accent: "#60a5fa",
      accentDeep: "#2563eb",
      accentLight: "#3b82f6",
      accentSurface: "rgba(37, 99, 235, 0.22)",
      border: "rgba(96, 165, 250, 0.35)",
      borderSoft: "rgba(148, 163, 184, 0.22)",
    },
  };

  function buildCss() {
    var l = theme.light;
    var d = theme.dark;
    return (
      "html,body{background:" +
      l.bg +
      "!important;color:" +
      l.text +
      '!important;font-family:"Plus Jakarta Sans",ui-sans-serif,system-ui,sans-serif!important}' +
      "header,[class*=Header],[class*=header],[class*=top-bar],[class*=TopBar]{background:linear-gradient(135deg," +
      l.accentLight +
      " 0%," +
      l.accent +
      " 50%," +
      l.accentDeep +
      ")!important;color:#fff!important;border-color:" +
      l.border +
      "!important}" +
      "[class*=title],[class*=Title],header h1,header h2,header h3,header p,header span{color:#fff!important}" +
      "main,[class*=chat-view],[class*=ChatView],[class*=chat-body],[class*=conversation],[role=log]{background:" +
      l.bg +
      "!important}" +
      "[class*=agent] [class*=message],[class*=Agent] [class*=bubble],[class*=operator] [class*=bubble]{background:" +
      l.accentSurface +
      "!important;color:" +
      l.text +
      "!important;border:1px solid " +
      l.border +
      "!important}" +
      "[class*=visitor] [class*=message],[class*=Visitor] [class*=bubble]{background:" +
      l.surface +
      "!important;color:" +
      l.text +
      "!important;border:1px solid " +
      l.borderSoft +
      "!important}" +
      "footer,[class*=composer],[class*=Composer],[class*=input-area],[class*=footer]{background:" +
      l.surface +
      "!important;border-color:" +
      l.border +
      "!important}" +
      "textarea,input,select{background:" +
      l.surface +
      "!important;color:" +
      l.text +
      "!important;border-color:" +
      l.border +
      "!important}" +
      "button,[class*=send],[class*=Send],[type=submit]{background:" +
      l.accent +
      "!important;color:#fff!important;border-color:" +
      l.accentDeep +
      "!important}" +
      "a,button.link{color:" +
      l.accent +
      "!important}" +
      "@media (prefers-color-scheme:dark){html,body{background:" +
      d.bg +
      "!important;color:" +
      d.text +
      "!important}" +
      "main,[class*=chat-view],[class*=ChatView],[class*=chat-body],[role=log]{background:" +
      d.bg +
      "!important}" +
      "[class*=agent] [class*=message],[class*=Agent] [class*=bubble]{background:" +
      d.accentSurface +
      "!important;color:" +
      d.text +
      "!important;border-color:" +
      d.border +
      "!important}" +
      "[class*=visitor] [class*=message],[class*=Visitor] [class*=bubble]{background:" +
      d.surface +
      "!important;color:" +
      d.text +
      "!important;border-color:" +
      d.borderSoft +
      "!important}" +
      "footer,[class*=composer],[class*=input-area]{background:" +
      d.surface +
      "!important}" +
      "textarea,input,select{background:" +
      d.surface +
      "!important;color:" +
      d.text +
      "!important;border-color:" +
      d.border +
      "!important}" +
      "button,[class*=send],[type=submit]{background:" +
      d.accentDeep +
      "!important;color:#fff!important}}" +
      "#" +
      STYLE_ID +
      "{display:none}"
    );
  }

  var cssText = buildCss();

  function injectDoc(doc) {
    if (!doc || doc.getElementById(STYLE_ID)) return true;
    var parent = doc.head || doc.body || doc.documentElement;
    if (!parent) return false;
    var style = doc.createElement("style");
    style.id = STYLE_ID;
    style.type = "text/css";
    style.textContent = cssText;
    parent.appendChild(style);
    return true;
  }

  function walkFrame(frame) {
    var injected = false;
    try {
      if (injectDoc(frame.contentDocument)) injected = true;
      var nested = frame.contentDocument.querySelectorAll("iframe");
      for (var i = 0; i < nested.length; i++) {
        if (walkFrame(nested[i])) injected = true;
      }
    } catch (err) {
      /* cross-origin */
    }
    return injected;
  }

  function applyTheme() {
    var ok = false;
    var iframes = document.querySelectorAll(
      'iframe[title*="chat"], iframe[title*="Chat"], iframe[src*="tawk"], iframe[id*="tawk"]'
    );
    for (var i = 0; i < iframes.length; i++) {
      if (walkFrame(iframes[i])) ok = true;
    }
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
    var step = 200;
    var max = durationMs || 8000;
    watchTimer = setInterval(function () {
      applyTheme();
      elapsed += step;
      if (elapsed >= max) clearInterval(watchTimer);
    }, step);
  };

  if (document.body) {
    new MutationObserver(function () {
      applyTheme();
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
