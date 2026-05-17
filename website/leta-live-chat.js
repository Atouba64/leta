(function () {
  var cfg = window.LETA_CONTACT || {};
  var propertyId = (cfg.tawkPropertyId || "").trim();
  if (!propertyId) return;

  var widgetId = (cfg.tawkWidgetId || "default").trim() || "default";
  var label = (cfg.chatLabel || "Chat with Leta").trim();
  var showTawkBubble = cfg.showTawkBubble === true;

  if (showTawkBubble) {
    document.documentElement.classList.add("leta-chat-dual");
  }

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
  var chatLauncherBtn = null;
  var chatLabelSpan = null;

  function isChatOpen() {
    if (window.Tawk_API && typeof window.Tawk_API.isChatMaximized === "function") {
      return window.Tawk_API.isChatMaximized();
    }
    return document.documentElement.classList.contains("leta-chat-open");
  }

  function setChatOpen(open) {
    document.documentElement.classList.toggle("leta-chat-open", open);
    if (!chatLauncherBtn) return;
    chatLauncherBtn.setAttribute("aria-expanded", open ? "true" : "false");
    chatLauncherBtn.setAttribute("aria-label", (open ? "Close chat: " : "Open chat: ") + label);
    chatLauncherBtn.classList.toggle("leta-chat-launch__btn--open", open);
    if (chatLabelSpan) {
      chatLabelSpan.textContent = open ? "Close chat" : label;
    }
  }

  function hideTawkBubble() {
    if (showTawkBubble) return;
    if (typeof window.Tawk_API.hideWidget === "function") {
      window.Tawk_API.hideWidget();
    }
  }

  function showTawkBubbleWidget() {
    if (!showTawkBubble) return;
    if (typeof window.Tawk_API.showWidget === "function") {
      window.Tawk_API.showWidget();
    }
  }

  function wireOpenChatTriggers() {
    document.querySelectorAll("[data-leta-open-chat]").forEach(function (node) {
      if (node.getAttribute("data-leta-chat-bound") === "1") return;
      node.setAttribute("data-leta-chat-bound", "1");
      node.addEventListener("click", function (e) {
        e.preventDefault();
        openChat();
      });
    });
    document.querySelectorAll("[data-leta-chat-label]").forEach(function (node) {
      node.textContent = label;
    });
  }

  function openChat() {
    hideTawkBubble();
    if (typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    } else if (typeof window.Tawk_API.toggle === "function") {
      window.Tawk_API.toggle();
    }
    applyInteriorTheme();
  }

  function closeChat() {
    if (typeof window.Tawk_API.minimize === "function") {
      window.Tawk_API.minimize();
    } else if (typeof window.Tawk_API.toggle === "function" && isChatOpen()) {
      window.Tawk_API.toggle();
    }
    hideTawkBubble();
    showTawkBubbleWidget();
    setChatOpen(false);
  }

  function toggleChat() {
    if (isChatOpen()) {
      closeChat();
      return;
    }
    openChat();
  }

  window.LetaOpenLiveChat = function () {
    if (isChatOpen()) {
      closeChat();
      return false;
    }
    openChat();
    return true;
  };

  function applyInteriorTheme() {
    if (typeof window.LetaApplyTawkTheme === "function") {
      window.LetaApplyTawkTheme(6000);
    }
  }

  function buildLauncher() {
    if (launcherBuilt) return;
    launcherBuilt = true;

    var wrap = document.createElement("div");
    wrap.className = "leta-chat-launch";
    wrap.setAttribute("aria-live", "polite");

    chatLauncherBtn = document.createElement("button");
    chatLauncherBtn.type = "button";
    chatLauncherBtn.className = "btn btn-primary leta-chat-launch__btn";
    chatLauncherBtn.setAttribute("aria-expanded", "false");
    chatLauncherBtn.setAttribute("aria-controls", "tawk-chat-panel");
    chatLauncherBtn.setAttribute("aria-label", "Open chat: " + label);

    chatLabelSpan = document.createElement("span");
    chatLabelSpan.textContent = label;

    var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "btn-icon");
    icon.setAttribute("width", "18");
    icon.setAttribute("height", "18");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute(
      "d",
      "M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
    );
    icon.appendChild(path);

    chatLauncherBtn.appendChild(icon);
    chatLauncherBtn.appendChild(chatLabelSpan);
    chatLauncherBtn.addEventListener("click", toggleChat);

    wrap.appendChild(chatLauncherBtn);
    document.body.appendChild(wrap);
  }

  window.Tawk_API.onLoad = function () {
    if (showTawkBubble) {
      showTawkBubbleWidget();
    } else {
      hideTawkBubble();
    }
    buildLauncher();
    wireOpenChatTriggers();
    setChatOpen(false);
    applyInteriorTheme();
  };

  window.Tawk_API.onRendered = function () {
    applyInteriorTheme();
  };

  window.Tawk_API.onChatMaximized = function () {
    hideTawkBubble();
    setChatOpen(true);
    applyInteriorTheme();
  };

  window.Tawk_API.onChatMinimized = function () {
    hideTawkBubble();
    showTawkBubbleWidget();
    setChatOpen(false);
    applyInteriorTheme();
  };

  window.Tawk_API.onChatEnded = function () {
    hideTawkBubble();
    showTawkBubbleWidget();
    setChatOpen(false);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireOpenChatTriggers);
  } else {
    wireOpenChatTriggers();
  }

  var s1 = document.createElement("script");
  var s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/" + encodeURIComponent(propertyId) + "/" + encodeURIComponent(widgetId);
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
