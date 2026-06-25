(function () {
  var freshchatHost = "https://letatechnologiesllc-dbd67cf77f0d94417823659.freshchat.com";
  // TODO: Replace this with the Web Widget Token from your Freshdesk Admin panel
  var freshchatToken = "YOUR_FRESHCHAT_WEB_TOKEN";

  function initFreshChat() {
    if (freshchatToken === "YOUR_FRESHCHAT_WEB_TOKEN") {
      console.warn("Freshchat: Web Widget Token is missing. Please set it in leta-freshchat.js.");
    }

    window.fcWidget.init({
      token: freshchatToken,
      host: freshchatHost,
      config: {
        headerProperty: {
          // Hide the default chat button so it doesn't overlap with our Hub
          hideChatButton: true,
        },
      },
    });
  }

  function initialize(i, t) {
    var e;
    if (i.getElementById(t)) {
      initFreshChat();
    } else {
      e = i.createElement("script");
      e.id = t;
      e.async = true;
      e.src = freshchatHost + "/js/widget.js";
      e.onload = initFreshChat;
      i.head.appendChild(e);
    }
  }

  function initiateCall() {
    initialize(document, "freshchat-js-sdk");
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initiateCall();
  } else {
    window.addEventListener("DOMContentLoaded", initiateCall, false);
  }

  // Expose global function to be called by our Hub
  window.LetaOpenLiveChat = function () {
    if (window.fcWidget) {
      window.fcWidget.open();
    } else {
      console.error("Freshchat widget is not loaded yet.");
    }
  };
})();
