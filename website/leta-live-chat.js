(function () {
  var cfg = window.LETA_CONTACT || {};
  var propertyId = (cfg.tawkPropertyId || "").trim();
  if (!propertyId) return;

  var widgetId = (cfg.tawkWidgetId || "default").trim() || "default";
  var label = (cfg.chatLabel || "Chat with Leta").trim();

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: "br", xOffset: 16, yOffset: 16 },
      mobile: { position: "br", xOffset: 12, yOffset: 12 },
    },
    zIndex: 2147483639,
  };

  var launcherBuilt = false;

  function openChat() {
    if (!window.Tawk_API) return;
    if (typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    } else if (typeof window.Tawk_API.toggle === "function") {
      window.Tawk_API.toggle();
    }
  }

  window.LetaOpenLiveChat = function () {
    openChat();
    return true;
  };

  function hideTawkBubble() {
    if (typeof window.Tawk_API.hideWidget === "function") {
      window.Tawk_API.hideWidget();
    }
  }

  function buildLauncher() {
    if (launcherBuilt) return;
    launcherBuilt = true;

    var wrap = document.createElement("div");
    wrap.className = "leta-chat-launch";
    wrap.setAttribute("aria-live", "polite");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary leta-chat-launch__btn";
    btn.setAttribute("aria-label", label + " — open live chat");
    btn.innerHTML =
      '<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>' +
      "<span>" +
      label +
      "</span>";

    btn.addEventListener("click", function () {
      hideTawkBubble();
      openChat();
    });

    wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

  function applyInteriorTheme() {
    if (typeof window.LetaApplyTawkTheme === "function") {
      window.LetaApplyTawkTheme(18000);
    }
  }

  window.Tawk_API.onLoad = function () {
    hideTawkBubble();
    buildLauncher();
    applyInteriorTheme();
  };

  window.Tawk_API.onRendered = function () {
    applyInteriorTheme();
  };

  window.Tawk_API.onChatMaximized = function () {
    applyInteriorTheme();
  };

  window.Tawk_API.onChatMinimized = function () {
    hideTawkBubble();
    applyInteriorTheme();
  };

  window.Tawk_API.onChatEnded = function () {
    hideTawkBubble();
  };

  var s1 = document.createElement("script");
  var s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/" + encodeURIComponent(propertyId) + "/" + encodeURIComponent(widgetId);
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
