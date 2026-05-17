/**
 * Leta chat theme for Tawk (CSS injected into widget iframes).
 * Flat message area: white bubbles, dark text, no colored highlights behind words/icons.
 * Brand blue kept on header bar and Send button only.
 * Dashboard: TAWK-APPEARANCE.md
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";

  function buildCss() {
    var msg =
      "[role=log],[class*=messages],[class*=Messages],[class*=conversation],[class*=Conversation]," +
      "[class*=chat-body],[class*=ChatBody],[class*=chatview],[class*=ChatView]";

    var bubble =
      "[class*=bubble],[class*=Bubble],[class*=message-content],[class*=MessageContent],[class*=message-body]";

    var prechatCard =
      "[class*=prechat] [class*=card],[class*=Prechat] [class*=card],[class*=card-container] [class*=card]";

    var flat =
      bubble +
      " *," +
      prechatCard +
      " *," +
      msg +
      " [class*=bubble] *," +
      msg +
      " [class*=message-content] *";

    var flatNoBtn = flat + ":not(button):not(input):not(textarea):not(select)";

    var parts = [
      ":root{color-scheme:light;--leta-bg:#eef3f9;--leta-surface:#fff;--leta-text:#0f172a;--leta-muted:#475569;--leta-accent:#2563eb;--leta-border:#e2e8f0}",
      "html,body{background:var(--leta-bg)!important;color:var(--leta-text)!important;font-family:\"Plus Jakarta Sans\",ui-sans-serif,system-ui,sans-serif!important}",
      msg + ",[class*=prechat],[class*=Prechat]{background:var(--leta-bg)!important;color:var(--leta-text)!important}",
      bubble +
        ",[class*=agent] " +
        bubble +
        ",[class*=visitor] " +
        bubble +
        ",[data-message-type=agent],[data-message-type=visitor]{background:var(--leta-surface)!important;color:var(--leta-text)!important;border:1px solid var(--leta-border)!important;box-shadow:none!important}",
      prechatCard +
        "{background:var(--leta-surface)!important;border:1px solid var(--leta-border)!important;color:var(--leta-text)!important;box-shadow:none!important}",
      flatNoBtn +
        "{background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important}",
      bubble +
        " *::before," +
        bubble +
        " *::after," +
        prechatCard +
        " *::before," +
        prechatCard +
        " *::after{background:transparent!important;background-image:none!important;box-shadow:none!important}",
      flatNoBtn +
        " i," +
        flatNoBtn +
        " svg," +
        flatNoBtn +
        " img," +
        flatNoBtn +
        " [class*=icon]," +
        flatNoBtn +
        " [class*=Icon]," +
        flatNoBtn +
        " [class*=avatar]," +
        flatNoBtn +
        " [class*=Avatar]," +
        flatNoBtn +
        " [class*=emoji]," +
        flatNoBtn +
        " [class*=badge]," +
        flatNoBtn +
        " [class*=tag]," +
        flatNoBtn +
        " [class*=chip]," +
        flatNoBtn +
        " [class*=pill]," +
        flatNoBtn +
        " [class*=highlight]," +
        flatNoBtn +
        " mark," +
        flatNoBtn +
        " code{background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important}",
      flatNoBtn +
        " span," +
        flatNoBtn +
        " p," +
        flatNoBtn +
        " div," +
        flatNoBtn +
        " em," +
        flatNoBtn +
        " strong," +
        flatNoBtn +
        " a{color:var(--leta-text)!important;-webkit-text-fill-color:var(--leta-text)!important;background:transparent!important}",
      flatNoBtn + " a{text-decoration:underline!important}",
      flatNoBtn + " [style*=background]{background:transparent!important;background-color:transparent!important;background-image:none!important}",
      "[class*=system],[class*=System]{background:transparent!important;color:var(--leta-muted)!important}",
      "[class*=tawk-header],[class*=widget-header]{background:linear-gradient(135deg,#3b82f6,#2563eb,#1d4ed8)!important;color:#fff!important}",
      "[class*=tawk-header] *:not(input):not(textarea):not(button){background:transparent!important;color:#fff!important;-webkit-text-fill-color:#fff!important}",
      "[class*=composer],[class*=Composer]{background:var(--leta-surface)!important}",
      "textarea,input:not([type=hidden]){background:var(--leta-surface)!important;color:var(--leta-text)!important;border:1px solid var(--leta-border)!important}",
      "[class*=send],[class*=Send],button[type=submit]{background:var(--leta-accent)!important;color:#fff!important}",
      "[class*=send] *{background:transparent!important;color:#fff!important}",
      ".tawk-branding,a[href*='tawk.to/branding']{display:none!important;height:0!important;visibility:hidden!important}",
    ];

    return parts.join("");
  }

  var cssText = buildCss();

  function injectDoc(doc) {
    if (!doc || !doc.documentElement) return false;
    var existing = doc.getElementById(STYLE_ID);
    if (existing) {
      existing.textContent = cssText;
      doc.documentElement.setAttribute("data-leta-tawk-styled", "1");
      return true;
    }
    var parent = doc.head || doc.documentElement;
    if (!parent) return false;
    var style = doc.createElement("style");
    style.id = STYLE_ID;
    style.type = "text/css";
    style.textContent = cssText;
    parent.appendChild(style);
    doc.documentElement.setAttribute("data-leta-tawk-styled", "1");
    return true;
  }

  function walkFrame(frame) {
    var injected = false;
    try {
      if (frame.contentDocument && injectDoc(frame.contentDocument)) injected = true;
      frame.contentDocument.querySelectorAll("iframe").forEach(function (nested) {
        if (walkFrame(nested)) injected = true;
      });
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
    var step = 350;
    var max = durationMs || 10000;
    watchTimer = setInterval(function () {
      applyTheme();
      elapsed += step;
      if (elapsed >= max) clearInterval(watchTimer);
    }, step);
  };
})();
