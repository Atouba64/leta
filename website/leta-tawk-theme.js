/**
 * Leta chat readability theme for Tawk (CSS only — does not mutate widget DOM).
 * Plain messages: no colored text/icon backgrounds. Header + send button keep brand blue.
 * Dashboard colors: TAWK-APPEARANCE.md
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";

  function buildCss() {
    var msg =
      "[role=log],[class*=messages],[class*=Messages],[class*=conversation],[class*=Conversation]," +
      "[class*=chat-body],[class*=ChatBody],[class*=chatview],[class*=ChatView]";

    var bubble =
      "[class*=bubble],[class*=Bubble],[class*=message-content],[class*=MessageContent]";

    var noDecorBg =
      msg +
      " span," +
      msg +
      " p," +
      msg +
      " em," +
      msg +
      " strong," +
      msg +
      " mark," +
      msg +
      " code," +
      msg +
      " pre," +
      bubble +
      " span," +
      bubble +
      " p," +
      bubble +
      " em," +
      bubble +
      " strong," +
      bubble +
      " mark," +
      bubble +
      " code," +
      msg +
      " [class*=tag]," +
      msg +
      " [class*=Tag]," +
      msg +
      " [class*=badge]," +
      msg +
      " [class*=Badge]," +
      msg +
      " [class*=label]," +
      msg +
      " [class*=Label]," +
      msg +
      " [class*=chip]," +
      msg +
      " [class*=Chip]," +
      msg +
      " [class*=pill]," +
      msg +
      " [class*=Pill]," +
      msg +
      " [class*=highlight]," +
      msg +
      " [class*=Highlight]," +
      msg +
      " [class*=emoji]," +
      msg +
      " [class*=Emoji]," +
      bubble +
      " [class*=tag]," +
      bubble +
      " [class*=badge]," +
      bubble +
      " [class*=label]," +
      bubble +
      " [class*=chip]," +
      bubble +
      " [class*=pill]," +
      bubble +
      " [class*=highlight]," +
      bubble +
      " [class*=emoji]";

    var noIconDecorBg =
      msg +
      " [class*=avatar]:not(button)," +
      msg +
      " [class*=Avatar]:not(button)," +
      msg +
      " [class*=icon]:not(button):not([class*=send]):not([class*=Send])," +
      msg +
      " [class*=Icon]:not(button)," +
      msg +
      " [class*=emoji]:not(button)," +
      bubble +
      " [class*=avatar]:not(button)," +
      bubble +
      " [class*=icon]:not(button)," +
      msg +
      " svg:not(button svg)," +
      bubble +
      " svg";

    return (
      ":root{color-scheme:light;" +
      "--leta-bg:#eef3f9;--leta-surface:#ffffff;--leta-text:#0f172a;--leta-muted:#475569;" +
      "--leta-accent:#2563eb;--leta-border:#e2e8f0}" +
      "html,body{background:var(--leta-bg)!important;color:var(--leta-text)!important;" +
      'font-family:"Plus Jakarta Sans",ui-sans-serif,system-ui,sans-serif!important;-webkit-font-smoothing:antialiased}' +
      "p,li,label,time,blockquote{color:var(--leta-text)!important}" +
      msg +
      "{background:var(--leta-bg)!important;color:var(--leta-text)!important}" +
      bubble +
      "{background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border)!important;box-shadow:none!important}" +
      "[class*=agent] " +
      bubble +
      ",[class*=Agent] " +
      bubble +
      ",[class*=operator] " +
      bubble +
      ",[class*=visitor] " +
      bubble +
      ",[class*=Visitor] " +
      bubble +
      ",[data-message-type=agent],[data-message-type=visitor],[class*=message--agent],[class*=message--visitor]{" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border)!important}" +
      bubble +
      " :not(button):not(svg)," +
      "[class*=message-content] :not(button):not(svg){" +
      "color:var(--leta-text)!important;-webkit-text-fill-color:var(--leta-text)!important}" +
      bubble +
      " a,[class*=message-content] a{" +
      "color:var(--leta-text)!important;background:transparent!important;" +
      "text-decoration:underline!important;text-decoration-color:var(--leta-muted)!important}" +
      noDecorBg +
      "{background:transparent!important;background-color:transparent!important;" +
      "box-shadow:none!important;-webkit-box-decoration-break:clone}" +
      noIconDecorBg +
      "{background:transparent!important;background-color:transparent!important;" +
      "box-shadow:none!important}" +
      msg +
      " [style*=background-color], " +
      bubble +
      " [style*=background-color]{" +
      "background:transparent!important;background-color:transparent!important}" +
      "[class*=system],[class*=System],[class*=event],[class*=Event],[class*=notification][class*=message]{" +
      "background:transparent!important;color:var(--leta-muted)!important;border:none!important}" +
      "[class*=tawk-header],[class*=widget-header],[class*=chat-header]:not([class*=message]){" +
      "background:linear-gradient(135deg,#3b82f6 0%,#2563eb 50%,#1d4ed8 100%)!important;color:#fff!important;" +
      "text-align:center!important}" +
      "[class*=tawk-header] h1,[class*=tawk-header] h2,[class*=widget-header] h1,[class*=widget-header] h2{" +
      "text-align:center!important;margin:0!important;color:#fff!important;background:transparent!important}" +
      "[class*=tawk-header] :not(input):not(textarea):not(button),[class*=widget-header] :not(input):not(textarea):not(button){" +
      "color:#fff!important;-webkit-text-fill-color:#fff!important;background:transparent!important}" +
      "[class*=prechat],[class*=Prechat],[class*=card-container],[class*=Card]{" +
      "background:var(--leta-bg)!important}" +
      "[class*=prechat] [class*=card],[class*=Prechat] [class*=card]{" +
      "background:var(--leta-surface)!important;border:1px solid var(--leta-border)!important;" +
      "box-shadow:none!important}" +
      "[class*=prechat] span,[class*=prechat] p,[class*=prechat] em,[class*=prechat] strong,[class*=prechat] mark," +
      "[class*=Prechat] span,[class*=Prechat] p,[class*=prechat] [class*=icon]:not(button){" +
      "background:transparent!important;background-color:transparent!important;color:var(--leta-text)!important}" +
      "[class*=prechat] a,[class*=Prechat] a,[class*=card] a:not([href*=tawk]){" +
      "color:var(--leta-text)!important;background:transparent!important;text-decoration:underline!important}" +
      "[class*=composer],[class*=Composer],[class*=input-container],[class*=InputContainer]{" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;border-color:var(--leta-border)!important}" +
      "textarea,input[type=text],input[type=email],input:not([type=hidden]):not([type=checkbox]):not([type=radio]){" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "-webkit-text-fill-color:var(--leta-text)!important;border:1px solid var(--leta-border)!important}" +
      "textarea::placeholder,input::placeholder{color:var(--leta-muted)!important;opacity:1!important}" +
      "[class*=send],[class*=Send],button[type=submit]{background:var(--leta-accent)!important;color:#fff!important;" +
      "-webkit-text-fill-color:#fff!important}" +
      "button[aria-label*=close],button[class*=close],[class*=Close]{background:transparent!important;color:inherit!important}" +
      ".tawk-branding,.tawk-branding-link,a[href*='tawk.to/branding']{display:none!important;height:0!important;" +
      "overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}" +
      "svg{opacity:1!important}"
    );
  }

  var cssText = buildCss();

  function injectDoc(doc) {
    if (!doc || !doc.documentElement) return false;
    if (doc.documentElement.getAttribute("data-leta-tawk-styled") === "1") {
      var existing = doc.getElementById(STYLE_ID);
      if (existing) existing.textContent = cssText;
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
    var step = 400;
    var max = durationMs || 8000;
    watchTimer = setInterval(function () {
      applyTheme();
      elapsed += step;
      if (elapsed >= max) clearInterval(watchTimer);
    }, step);
  };
})();
