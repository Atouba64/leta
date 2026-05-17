(function () {
  var cfg = window.LETA_CONTACT || {};
  var form = document.getElementById("leta-contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = form.querySelector('[type="submit"]');

  var intentMap = {
    partner: "Partner / fulfillment",
    customer: "Customer",
    technician: "Field technician",
    general: "General inquiry",
  };

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message;
    statusEl.className = "form-status form-status--" + (type || "info");
  }

  function prefillFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var intent = params.get("intent");
    var typeSelect = form.querySelector('[name="inquiry_type"]');
    if (intent && typeSelect && intentMap[intent]) {
      typeSelect.value = intentMap[intent];
    }
    if (params.get("success") === "1") {
      setStatus(
        "Thank you — your message was received. We'll reply " + (cfg.responseTime || "soon") + ".",
        "success"
      );
      form.reset();
      if (typeSelect && intent && intentMap[intent]) typeSelect.value = intentMap[intent];
    }
  }

  prefillFromQuery();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    setStatus("Sending your message…", "info");

    var body = new URLSearchParams(new FormData(form)).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Network error");
        window.location.href = "contact.html?success=1";
      })
      .catch(function () {
        setStatus(
          "Something went wrong. Please email us at " + (cfg.generalEmail || "hello@leta.repair") + " directly.",
          "error"
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      });
  });
})();
