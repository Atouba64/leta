/**
 * Leta chat readability theme for Tawk (light, high contrast).
 * Set matching colors in Tawk dashboard — see TAWK-APPEARANCE.md.
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";

  function buildCss() {
    return (
      ":root{color-scheme:light;" +
      "--leta-bg:#eef3f9;--leta-surface:#ffffff;--leta-text:#0f172a;--leta-muted:#475569;" +
      "--leta-accent:#2563eb;--leta-agent:#eff6ff;--leta-border:#bfdbfe;--leta-border-soft:#e2e8f0}" +
      "html,body{background:var(--leta-bg)!important;color:var(--leta-text)!important;" +
      'font-family:"Plus Jakarta Sans",ui-sans-serif,system-ui,sans-serif!important;-webkit-font-smoothing:antialiased}' +
      "p,span,li,label,time,pre,em,strong,blockquote{color:var(--leta-text)!important}" +
      "[role=log],[class*=messages],[class*=Messages],[class*=conversation],[class*=Conversation]," +
      "[class*=chat-body],[class*=ChatBody],[class*=chatview],[class*=ChatView]{background:var(--leta-bg)!important;color:var(--leta-text)!important}" +
      "[class*=bubble],[class*=Bubble],[class*=message-content],[class*=MessageContent]{" +
      "color:var(--leta-text)!important;-webkit-text-fill-color:var(--leta-text)!important}" +
      "[class*=agent] [class*=bubble],[class*=Agent] [class*=bubble],[class*=operator] [class*=bubble]," +
      "[data-message-type=agent],[class*=message--agent]{background:var(--leta-agent)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border)!important}" +
      "[class*=visitor] [class*=bubble],[class*=Visitor] [class*=bubble],[class*=message--visitor]," +
      "[data-message-type=visitor]{background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border-soft)!important}" +
      "[class*=tawk-header],[class*=widget-header],[class*=chat-header]:not([class*=message]){" +
      "background:linear-gradient(135deg,#3b82f6 0%,#2563eb 50%,#1d4ed8 100%)!important;color:#fff!important}" +
      "[class*=tawk-header] :not(input):not(textarea),[class*=widget-header] :not(input):not(textarea){" +
      "color:#fff!important;-webkit-text-fill-color:#fff!important}" +
      "[class*=composer],[class*=Composer],[class*=input-container],[class*=InputContainer],footer:not([class*=message]){" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;border-color:var(--leta-border-soft)!important}" +
      "textarea,input[type=text],input[type=email],input:not([type=hidden]):not([type=checkbox]):not([type=radio]){" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "-webkit-text-fill-color:var(--leta-text)!important;border:1px solid var(--leta-border)!important}" +
      "textarea::placeholder,input::placeholder{color:var(--leta-muted)!important;opacity:1!important}" +
      "[class*=send],[class*=Send],button[type=submit]{background:var(--leta-accent)!important;color:#fff!important;" +
      "-webkit-text-fill-color:#fff!important}" +
      "button[aria-label*=close],button[class*=close],[class*=Close]{background:transparent!important;color:inherit!important}" +
      "a:not([href*=tawk]){color:var(--leta-accent)!important}" +
      "[class*=branding],[class*=Branding],.tawk-branding,a[href*=tawk.to]{display:none!important;height:0!important;" +
      "overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}" +
      "svg{opacity:1!important}}"
    );
  }

  var cssText = buildCss();
  var BRANDING_TEXT = /powered\s+by\s+tawk/i;

  function stripBranding(doc) {
    try {
      doc.querySelectorAll(".tawk-branding, .tawk-branding-link, a[href*='tawk.to']").forEach(function (el) {
        el.remove();
      });
      doc.querySelectorAll("a, span, p, div, small").forEach(function (el) {
        if (BRANDING_TEXT.test((el.textContent || "").trim()) && el.children.length <= 2) {
          el.remove();
        }
      });
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
    stripBranding(doc);
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
    var step = 200;
    var max = durationMs || 12000;
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
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
