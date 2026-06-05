(function () {
  var cfg = window.LETA_CONTACT || {};
  if (cfg.aiChatEnabled === false) return;

  var label = (cfg.aiChatLabel || "Ask Leta").trim();
  var apiUrl = (cfg.aiChatApiUrl || "").trim();
  var projectId = (cfg.firebaseProjectId || "").trim();
  if (!apiUrl && projectId) {
    apiUrl = "https://us-east1-" + projectId + ".cloudfunctions.net/api/agent/chat";
  }

  var panelOpen = false;
  var busy = false;
  var history = [];
  var sessionId = "web-" + Math.random().toString(36).slice(2, 10);

  var launcherBtn = null;
  var panel = null;
  var messagesEl = null;
  var inputEl = null;
  var sendBtn = null;

  function setOpen(open) {
    panelOpen = open;
    document.documentElement.classList.toggle("leta-ai-open", open);
    if (launcherBtn) {
      launcherBtn.setAttribute("aria-expanded", open ? "true" : "false");
      launcherBtn.classList.toggle("leta-ai-launch__btn--open", open);
    }
    if (panel) {
      panel.hidden = !open;
    }
    if (open && inputEl) {
      setTimeout(function () {
        inputEl.focus();
      }, 80);
    }
  }

  function appendMessage(role, text) {
    if (!messagesEl) return;
    var row = document.createElement("div");
    row.className = "leta-ai-msg leta-ai-msg--" + role;
    var bubble = document.createElement("div");
    bubble.className = "leta-ai-msg__bubble";
    bubble.textContent = text;
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setBusy(on) {
    busy = on;
    if (sendBtn) sendBtn.disabled = on;
    if (inputEl) inputEl.disabled = on;
    document.documentElement.classList.toggle("leta-ai-busy", on);
  }

  function openHumanChat() {
    if (typeof window.LetaOpenLiveChat === "function") {
      window.LetaOpenLiveChat();
      return;
    }
    window.open("contact.html", "_blank", "noopener");
  }

  async function sendMessage() {
    if (!inputEl || busy) return;
    var text = (inputEl.value || "").trim();
    if (!text) return;

    if (!apiUrl) {
      appendMessage(
        "assistant",
        "AI chat is not configured yet. Set aiChatApiUrl or firebaseProjectId in contact-config.js, or email hello@leta.repair."
      );
      return;
    }

    appendMessage("user", text);
    inputEl.value = "";
    setBusy(true);

    try {
      var res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Leta-Session": sessionId },
        body: JSON.stringify({ message: text, history: history }),
      });
      var data = await res.json().catch(function () {
        return {};
      });

      if (!res.ok || !data.ok) {
        var errMsg =
          data.message ||
          "The assistant is temporarily unavailable. Try live chat or call (470) 252-6681.";
        appendMessage("assistant", errMsg);
        return;
      }

      history.push({ role: "user", content: text });
      history.push({ role: "assistant", content: data.reply });
      if (history.length > 24) history = history.slice(-24);
      appendMessage("assistant", data.reply);
    } catch (_e) {
      appendMessage(
        "assistant",
        "Could not reach the assistant. Check your connection or use live chat on the Contact page."
      );
    } finally {
      setBusy(false);
    }
  }

  function buildPanel() {
    panel = document.createElement("section");
    panel.className = "leta-ai-panel";
    panel.id = "leta-ai-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", label);

    var head = document.createElement("header");
    head.className = "leta-ai-panel__head";
    head.innerHTML =
      '<div><strong>' +
      label +
      '</strong><span>Georgia onsite IT · AI assistant</span></div>';

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "leta-ai-panel__close";
    closeBtn.setAttribute("aria-label", "Close assistant");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
    head.appendChild(closeBtn);

    messagesEl = document.createElement("div");
    messagesEl.className = "leta-ai-panel__messages";
    messagesEl.setAttribute("role", "log");
    messagesEl.setAttribute("aria-live", "polite");

    var starter =
      cfg.aiChatWelcome ||
      "Hi — I'm Leta's AI assistant. Ask about coverage, becoming a tech, partners, or how Leta works.";
    appendMessage("assistant", starter);

    var foot = document.createElement("footer");
    foot.className = "leta-ai-panel__foot";

    inputEl = document.createElement("textarea");
    inputEl.className = "leta-ai-panel__input";
    inputEl.rows = 2;
    inputEl.placeholder = "Ask anything about Leta…";
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn = document.createElement("button");
    sendBtn.type = "button";
    sendBtn.className = "btn btn-primary leta-ai-panel__send";
    sendBtn.textContent = "Send";
    sendBtn.addEventListener("click", sendMessage);

    var humanBtn = document.createElement("button");
    humanBtn.type = "button";
    humanBtn.className = "leta-ai-panel__human";
    humanBtn.textContent = "Talk to a human";
    humanBtn.addEventListener("click", openHumanChat);

    foot.appendChild(inputEl);
    foot.appendChild(sendBtn);
    foot.appendChild(humanBtn);

    panel.appendChild(head);
    panel.appendChild(messagesEl);
    panel.appendChild(foot);
    document.body.appendChild(panel);
  }

  function buildLauncher() {
    var wrap = document.createElement("div");
    wrap.className = "leta-ai-launch";

    launcherBtn = document.createElement("button");
    launcherBtn.type = "button";
    launcherBtn.className = "btn btn-primary leta-ai-launch__btn";
    launcherBtn.setAttribute("aria-controls", "leta-ai-panel");
    launcherBtn.setAttribute("aria-expanded", "false");

    var icon = document.createElement("span");
    icon.className = "leta-ai-launch__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✦";

    var text = document.createElement("span");
    text.textContent = label;

    launcherBtn.appendChild(icon);
    launcherBtn.appendChild(text);
    launcherBtn.addEventListener("click", function () {
      setOpen(!panelOpen);
    });

    wrap.appendChild(launcherBtn);
    document.body.appendChild(wrap);
  }

  function wireTriggers() {
    document.querySelectorAll("[data-leta-open-ai]").forEach(function (node) {
      if (node.getAttribute("data-leta-ai-bound") === "1") return;
      node.setAttribute("data-leta-ai-bound", "1");
      node.addEventListener("click", function () {
        setOpen(true);
      });
    });
    document.querySelectorAll("[data-leta-ai-label]").forEach(function (node) {
      node.textContent = label;
    });
  }

  function init() {
    buildPanel();
    buildLauncher();
    wireTriggers();
    document.documentElement.classList.add("leta-ai-enabled");
  }

  window.LetaOpenAiChat = function () {
    setOpen(true);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  document.addEventListener("DOMContentLoaded", wireTriggers);
})();
