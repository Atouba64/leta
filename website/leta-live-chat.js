(function () {
  var cfg = window.LETA_CONTACT || {};
  var propertyId = (cfg.tawkPropertyId || "").trim();
  if (!propertyId) return;

  var widgetId = (cfg.tawkWidgetId || "default").trim() || "default";
  var label = (cfg.chatLabel || cfg.assistantName || "Chat with Leta").trim();

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  var launcherBuilt = false;

  function escapeHtml(text) {
    var el = document.createElement("span");
    el.textContent = text;
    return el.innerHTML;
  }

  function getToggle() {
    return document.querySelector(".leta-chat__toggle");
  }

  function setChatOpen(open) {
    var toggle = getToggle();
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.classList.toggle("leta-chat-open", open);
  }

  function buildLauncher() {
    if (launcherBuilt) return;
    launcherBuilt = true;

    var root = document.createElement("div");
    root.className = "leta-chat";
    root.setAttribute("aria-live", "polite");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "leta-chat__toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", label + " — open live chat");
    btn.innerHTML =
      '<span class="leta-chat__label">' +
      escapeHtml(label) +
      '</span><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>';

    btn.addEventListener("click", function () {
      if (!window.Tawk_API) return;
      if (typeof window.Tawk_API.toggle === "function") {
        window.Tawk_API.toggle();
      } else if (typeof window.Tawk_API.maximize === "function") {
        window.Tawk_API.maximize();
      }
    });

    root.appendChild(btn);
    document.body.appendChild(root);
  }

  window.LetaOpenLiveChat = function () {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      return true;
    }
    return false;
  };

  window.Tawk_API.onLoad = function () {
    if (typeof window.Tawk_API.hideWidget === "function") {
      window.Tawk_API.hideWidget();
    }
    buildLauncher();
  };

  window.Tawk_API.onChatMaximized = function () {
    setChatOpen(true);
  };

  window.Tawk_API.onChatMinimized = function () {
    setChatOpen(false);
  };

  window.Tawk_API.onChatEnded = function () {
    setChatOpen(false);
  };

  var s1 = document.createElement("script");
  var s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/" + encodeURIComponent(propertyId) + "/" + encodeURIComponent(widgetId);
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
