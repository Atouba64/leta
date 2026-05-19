(function () {
  var MESSAGES = {
    ios: {
      title: "Coming to the App Store",
      body:
        "Leta Tech for iPhone will be on the Apple App Store soon. Until then, text or call us to join the crew or get early access.",
    },
    android: {
      title: "Coming to Google Play",
      body:
        "Leta Tech for Android will be on Google Play soon. Until then, text or call us to join the crew or get early access.",
    },
    "partner-web": {
      title: "Web sign-in launching soon",
      body:
        "The full partner portal in your browser is rolling out shortly. Partners on pilot can use the Leta Tech mobile app today — choose Partner dispatch at sign-up — or contact us for access.",
    },
  };

  var modal = document.getElementById("leta-modal");
  if (!modal) return;

  var titleEl = document.getElementById("leta-modal-title");
  var bodyEl = document.getElementById("leta-modal-body");
  var lastFocus = null;

  function openModal(key) {
    var msg = MESSAGES[key];
    if (!msg || !titleEl || !bodyEl) return;
    lastFocus = document.activeElement;
    titleEl.textContent = msg.title;
    bodyEl.textContent = msg.body;
    modal.hidden = false;
    document.body.classList.add("leta-modal-open");
    var closeBtn = modal.querySelector("[data-leta-modal-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("leta-modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll("[data-leta-store-soon]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(btn.getAttribute("data-leta-store-soon"));
    });
  });

  document.querySelectorAll("[data-leta-modal-soon]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(btn.getAttribute("data-leta-modal-soon"));
    });
  });

  modal.querySelectorAll("[data-leta-modal-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  var partnerForm = document.getElementById("partner-portal-signin");
  if (partnerForm) {
    partnerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      openModal("partner-web");
    });
  }
})();
