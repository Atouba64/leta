(function () {
  var cfg = window.LETA_CONTACT || {};
  if (cfg.aiChatEnabled === false) return;

  var label = (cfg.aiChatLabel || "Ask Leta").trim();
  var projectId = (cfg.firebaseProjectId || "").trim();
  
  var baseApiUrl = cfg.aiChatApiUrl ? cfg.aiChatApiUrl.replace("/agent/chat", "") : "";
  if (!baseApiUrl && projectId) {
    baseApiUrl = "https://us-east1-" + projectId + ".cloudfunctions.net/api";
  }

  var panelOpen = false;
  var busy = false;
  var chatMode = "ai"; // 'ai' or 'human'
  var history = [];
  var sessionId = "web-" + Math.random().toString(36).slice(2, 10);
  var pollInterval = null;

  var panel = null;
  var head = null;
  var messagesEl = null;
  var inputEl = null;
  var sendBtn = null;
  var humanBtn = null;

  function updatePanelMode() {
    if (!head) return;
    if (chatMode === "ai") {
      head.innerHTML = '<div><strong>' + label + '</strong><span>Georgia onsite IT · AI assistant</span></div>';
      if (humanBtn) humanBtn.hidden = false;
      inputEl.placeholder = "Ask anything about Leta…";
      stopPolling();
    } else {
      head.innerHTML = '<div><strong>Live Support</strong><span>Chatting with a Leta team member</span></div>';
      if (humanBtn) humanBtn.hidden = true;
      inputEl.placeholder = "Type your message...";
      startPolling();
    }
  }

  function setOpen(open) {
    panelOpen = open;
    document.documentElement.classList.toggle("leta-ai-open", open);
    if (panel) {
      panel.hidden = !open;
    }
    if (open && inputEl) {
      setTimeout(function () {
        inputEl.focus();
      }, 80);
    }
    if (!open) {
      stopPolling();
    } else if (chatMode === "human") {
      startPolling();
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

  function openHumanChatFallback() {
    window.open("contact.html", "_blank", "noopener");
  }

  async function sendMessage() {
    if (!inputEl || busy) return;
    var text = (inputEl.value || "").trim();
    if (!text) return;

    if (!baseApiUrl) {
      appendMessage("assistant", "Chat is not configured yet. Set firebaseProjectId in contact-config.js.");
      return;
    }

    appendMessage("user", text);
    inputEl.value = "";
    setBusy(true);

    var endpoint = chatMode === "ai" ? "/agent/chat" : "/agent/human-chat/send";

    try {
      var res = await fetch(baseApiUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Leta-Session": sessionId },
        body: JSON.stringify({ message: text, history: history }),
      });
      
      var data = await res.json().catch(function () {
        return {};
      });

      if (!res.ok || !data.ok) {
        var errMsg = data.message || "The chat service is temporarily unavailable.";
        appendMessage("assistant", errMsg);
        return;
      }

      if (chatMode === "ai") {
        history.push({ role: "user", content: text });
        history.push({ role: "assistant", content: data.reply });
        if (history.length > 24) history = history.slice(-24);
        appendMessage("assistant", data.reply);
      }
    } catch (_e) {
      appendMessage("assistant", "Could not reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  function startPolling() {
    if (pollInterval || !baseApiUrl) return;
    pollInterval = setInterval(async function() {
      if (!panelOpen || chatMode !== "human") {
        stopPolling();
        return;
      }
      try {
        var res = await fetch(baseApiUrl + "/agent/human-chat/sync?sessionId=" + encodeURIComponent(sessionId), {
          method: "GET",
        });
        if (!res.ok) return;
        var data = await res.json();
        if (data.messages && data.messages.length > 0) {
          data.messages.forEach(function(msg) {
            appendMessage("assistant", msg.text);
          });
        }
      } catch (e) {
        // Silently fail polling
      }
    }, 5000);
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  function buildPanel() {
    panel = document.createElement("section");
    panel.className = "leta-ai-panel";
    panel.id = "leta-ai-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", label);

    head = document.createElement("header");
    head.className = "leta-ai-panel__head";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "leta-ai-panel__close";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
    head.appendChild(closeBtn);

    messagesEl = document.createElement("div");
    messagesEl.className = "leta-ai-panel__messages";
    messagesEl.setAttribute("role", "log");
    messagesEl.setAttribute("aria-live", "polite");

    var starter = cfg.aiChatWelcome || "Hi — I'm Leta's AI assistant. Ask about coverage, becoming a tech, partners, or how Leta works.";
    appendMessage("assistant", starter);

    var foot = document.createElement("footer");
    foot.className = "leta-ai-panel__foot";

    inputEl = document.createElement("textarea");
    inputEl.className = "leta-ai-panel__input";
    inputEl.rows = 2;
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

    humanBtn = document.createElement("button");
    humanBtn.type = "button";
    humanBtn.className = "leta-ai-panel__human";
    humanBtn.textContent = "Talk to a human";
    humanBtn.addEventListener("click", function() {
      if (typeof window.LetaOpenHumanChat === "function") {
        window.LetaOpenHumanChat();
      } else {
        openHumanChatFallback();
      }
    });

    foot.appendChild(inputEl);
    foot.appendChild(sendBtn);
    foot.appendChild(humanBtn);

    panel.appendChild(head);
    panel.appendChild(messagesEl);
    panel.appendChild(foot);
    document.body.appendChild(panel);

    updatePanelMode();
  }

  function init() {
    buildPanel();
    document.documentElement.classList.add("leta-ai-enabled");
  }

  window.LetaOpenAiChat = function () {
    chatMode = "ai";
    updatePanelMode();
    setOpen(true);
  };

  window.LetaOpenHumanChat = function () {
    chatMode = "human";
    updatePanelMode();
    setOpen(true);
    if (history.length === 0 || messagesEl.children.length === 1) {
       appendMessage("assistant", "You are now connected to live support. An agent will be with you shortly. How can we help?");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
