/**
 * Leta chat theme for Tawk — matches site tiles (blue header, soft gray body).
 * Dashboard colors: TAWK-APPEARANCE.md · Header copy: contact-config.js
 */
(function () {
  var STYLE_ID = "leta-tawk-theme";
  var cfg = window.LETA_CONTACT || {};
  var headerTitle = (cfg.chatHeaderTitle || "Leta support").trim();
  var headerSubtitle = (cfg.chatHeaderSubtitle || "Onsite IT help · Georgia-first").trim();
  var HEADER_FIX = /customer\s+suppor\w*|we\s+are\s+here|chat\s+with\s+us/i;
  var BRANDING_TEXT = /powered\s+by\s+tawk/i;

  function buildCss() {
    return (
      ":root{color-scheme:light;" +
      "--leta-bg:#eef3f9;--leta-bg-deep:#e4ecf6;--leta-surface:#ffffff;--leta-text:#0f172a;" +
      "--leta-muted:#475569;--leta-accent:#2563eb;--leta-accent-deep:#1d4ed8;" +
      "--leta-agent:#eff6ff;--leta-border:#bfdbfe;--leta-border-soft:#e2e8f0;" +
      "--leta-radius:16px;--leta-shadow:0 1px 2px rgba(15,23,42,0.06),0 4px 14px -4px rgba(37,99,235,0.12)}" +
      "html,body{background:linear-gradient(180deg,var(--leta-bg) 0%,var(--leta-bg-deep) 100%)!important;" +
      "color:var(--leta-text)!important;" +
      'font-family:"Plus Jakarta Sans",ui-sans-serif,system-ui,sans-serif!important;-webkit-font-smoothing:antialiased}' +
      "p,span,li,label,pre,em,strong,blockquote:not([class*=bubble]){color:var(--leta-text)!important}" +
      "time,[class*=timestamp],[class*=Timestamp],[class*=time]{color:var(--leta-muted)!important;font-size:0.72rem!important}" +
      "[role=log],[class*=messages],[class*=Messages],[class*=conversation],[class*=Conversation]," +
      "[class*=chat-body],[class*=ChatBody],[class*=chatview],[class*=ChatView]{" +
      "background:linear-gradient(180deg,var(--leta-bg) 0%,var(--leta-bg-deep) 100%)!important;" +
      "color:var(--leta-text)!important;padding:0.5rem 0.35rem!important}" +
      "[class*=message-row],[class*=MessageRow],[class*=message-wrapper]{margin:0.35rem 0.65rem!important}" +
      "[class*=bubble],[class*=Bubble],[class*=message-content],[class*=MessageContent]{" +
      "color:var(--leta-text)!important;-webkit-text-fill-color:var(--leta-text)!important;" +
      "border-radius:var(--leta-radius)!important;padding:0.65rem 0.9rem!important;line-height:1.5!important;" +
      "font-size:0.92rem!important;box-shadow:var(--leta-shadow)!important;max-width:min(18rem,88%)!important}" +
      "[class*=agent] [class*=bubble],[class*=Agent] [class*=bubble],[class*=operator] [class*=bubble]," +
      "[data-message-type=agent],[class*=message--agent]{" +
      "background:var(--leta-agent)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border)!important;border-bottom-left-radius:4px!important}" +
      "[class*=visitor] [class*=bubble],[class*=Visitor] [class*=bubble],[class*=message--visitor]," +
      "[data-message-type=visitor]{" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border:1px solid var(--leta-border-soft)!important;border-bottom-right-radius:4px!important}" +
      "[class*=tawk-header],[class*=widget-header],[class*=chat-header]:not([class*=message]){" +
      "background:linear-gradient(145deg,#3b82f6 0%,#2563eb 42%,#1d4ed8 100%)!important;" +
      "color:#fff!important;text-align:center!important;display:flex!important;flex-direction:column!important;" +
      "align-items:center!important;justify-content:center!important;padding:1.1rem 1.25rem 1rem!important;" +
      "min-height:4.75rem!important;box-shadow:0 4px 18px -6px rgba(29,78,216,0.45)!important;" +
      "border-bottom:1px solid rgba(255,255,255,0.12)!important}" +
      "[class*=tawk-header]>*,[class*=widget-header]>*,[class*=chat-header]:not([class*=message])>*{" +
      "text-align:center!important;width:100%!important;justify-content:center!important}" +
      "[class*=tawk-header] h1,[class*=tawk-header] h2,[class*=widget-header] h1,[class*=widget-header] h2," +
      "[class*=header-title],[class*=HeaderTitle],[class*=tawk-title]{" +
      "font-size:1.05rem!important;font-weight:700!important;letter-spacing:-0.02em!important;" +
      "line-height:1.25!important;margin:0!important;color:#fff!important;-webkit-text-fill-color:#fff!important}" +
      "[class*=tawk-header] p,[class*=widget-header] p,[class*=header-subtitle],[class*=HeaderSubtitle]," +
      "[class*=tawk-subtitle],[class*=status-text],[class*=StatusText]{" +
      "font-size:0.78rem!important;font-weight:500!important;opacity:0.92!important;margin:0.35rem 0 0!important;" +
      "color:rgba(255,255,255,0.92)!important;-webkit-text-fill-color:rgba(255,255,255,0.92)!important}" +
      "[class*=tawk-header] :not(input):not(textarea):not(button),[class*=widget-header] :not(input):not(textarea):not(button){" +
      "color:#fff!important;-webkit-text-fill-color:#fff!important}" +
      "[class*=card],[class*=Card],[class*=welcome],[class*=Welcome],[class*=offline],[class*=Offline]{" +
      "background:var(--leta-surface)!important;border:1px solid var(--leta-border-soft)!important;" +
      "border-radius:var(--radius-lg,18px)!important;box-shadow:var(--leta-shadow)!important;" +
      "text-align:center!important;padding:1.25rem 1rem!important;margin:0.75rem!important}" +
      "[class*=card] h1,[class*=card] h2,[class*=card] h3,[class*=welcome] h1,[class*=welcome] h2{" +
      "text-align:center!important;font-weight:700!important;color:var(--leta-text)!important}" +
      "[class*=card] p,[class*=welcome] p{text-align:center!important;color:var(--leta-muted)!important}" +
      "[class*=composer],[class*=Composer],[class*=input-container],[class*=InputContainer],footer:not([class*=message]){" +
      "background:var(--leta-surface)!important;color:var(--leta-text)!important;" +
      "border-top:1px solid var(--leta-border-soft)!important;padding:0.65rem!important}" +
      "textarea,input[type=text],input[type=email],input:not([type=hidden]):not([type=checkbox]):not([type=radio]){" +
      "background:var(--leta-bg)!important;color:var(--leta-text)!important;" +
      "-webkit-text-fill-color:var(--leta-text)!important;border:1px solid var(--leta-border-soft)!important;" +
      "border-radius:12px!important;padding:0.55rem 0.75rem!important;font-size:0.9rem!important}" +
      "textarea::placeholder,input::placeholder{color:var(--leta-muted)!important;opacity:1!important}" +
      "[class*=send],[class*=Send],button[type=submit]{" +
      "background:linear-gradient(135deg,#3b82f6,#2563eb)!important;color:#fff!important;" +
      "-webkit-text-fill-color:#fff!important;border-radius:12px!important;box-shadow:0 2px 8px rgba(37,99,235,0.35)!important}" +
      "button[aria-label*=close],button[class*=close],[class*=Close]{background:transparent!important;color:inherit!important}" +
      "a:not([href*=tawk]){color:var(--leta-accent)!important;font-weight:600!important}" +
      "[class*=branding],[class*=Branding],.tawk-branding,a[href*=tawk.to]{display:none!important;height:0!important;" +
      "overflow:hidden!important;visibility:hidden!important;pointer-events:none!important}" +
      ".leta-chat-header-title{display:block!important;font-size:1.05rem!important;font-weight:700!important;" +
      "letter-spacing:-0.02em!important;line-height:1.25!important;color:#fff!important}" +
      ".leta-chat-header-sub{display:block!important;font-size:0.78rem!important;font-weight:500!important;" +
      "margin-top:0.35rem!important;color:rgba(255,255,255,0.92)!important}" +
      "@media (prefers-color-scheme:dark){:root{--leta-bg:#0b1020;--leta-bg-deep:#121a2e;--leta-surface:#121a2e;" +
      "--leta-text:#f1f5f9;--leta-muted:#94a3b8;--leta-agent:rgba(37,99,235,0.22);--leta-border:rgba(96,165,250,0.35);" +
      "--leta-border-soft:rgba(148,163,184,0.22)}}" +
      "svg{opacity:1!important}}"
    );
  }

  var cssText = buildCss();

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

  function isLeafText(el) {
    return el && el.children.length === 0 && (el.textContent || "").trim().length > 0;
  }

  function polishHeaderCopy(doc) {
    try {
      var headers = doc.querySelectorAll(
        "[class*=tawk-header], [class*=widget-header], [class*=chat-header]:not([class*=message])"
      );
      headers.forEach(function (header) {
        if (header.querySelector(".leta-chat-header-title")) return;

        var titleEl = header.querySelector("h1, h2, [class*=title], [class*=Title]");
        if (!titleEl) {
          var candidates = header.querySelectorAll("div, span, p");
          for (var i = 0; i < candidates.length; i++) {
            var t = (candidates[i].textContent || "").trim();
            if (t && HEADER_FIX.test(t) && candidates[i].children.length <= 1) {
              titleEl = candidates[i];
              break;
            }
          }
        }

        if (titleEl) {
          titleEl.textContent = headerTitle;
          titleEl.classList.add("leta-chat-header-title");
        } else {
          var title = doc.createElement("div");
          title.className = "leta-chat-header-title";
          title.textContent = headerTitle;
          header.insertBefore(title, header.firstChild);
          titleEl = title;
        }

        var subEl = header.querySelector(
          ".leta-chat-header-sub, [class*=subtitle], [class*=Subtitle], [class*=status]"
        );
        if (subEl && !subEl.classList.contains("leta-chat-header-sub")) {
          subEl.textContent = headerSubtitle;
          subEl.classList.add("leta-chat-header-sub");
        } else if (!header.querySelector(".leta-chat-header-sub")) {
          var sub = doc.createElement("div");
          sub.className = "leta-chat-header-sub";
          sub.textContent = headerSubtitle;
          if (titleEl && titleEl.nextSibling) {
            header.insertBefore(sub, titleEl.nextSibling);
          } else {
            header.appendChild(sub);
          }
        }
      });

      doc.querySelectorAll("h1, h2, h3, p, span, div, label, button").forEach(function (el) {
        if (!isLeafText(el)) return;
        var text = (el.textContent || "").trim();
        if (!text || text.length > 80) return;
        if (HEADER_FIX.test(text)) {
          el.textContent = headerTitle;
          el.style.textAlign = "center";
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
    polishHeaderCopy(doc);
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
    cfg = window.LETA_CONTACT || cfg;
    headerTitle = (cfg.chatHeaderTitle || headerTitle).trim();
    headerSubtitle = (cfg.chatHeaderSubtitle || headerSubtitle).trim();
    cssText = buildCss();
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
