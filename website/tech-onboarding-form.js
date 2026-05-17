(function () {
  var cfg = window.LETA_CONTACT || {};
  var form = document.getElementById("leta-tech-onboarding-form");
  if (!form) return;

  var statusEl = document.getElementById("tech-form-status");
  var submitBtn = form.querySelector('[type="submit"]');
  var fallbackEmail = cfg.techniciansEmail || cfg.generalEmail || "techs@leta.repair";

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message;
    statusEl.className = "form-status form-status--" + (type || "info");
  }

  function togglePriorGigDetail() {
    var prior = form.querySelector('[name="prior_gig_work"]');
    var wrap = document.getElementById("prior-gig-detail-wrap");
    if (!prior || !wrap) return;
    var show = prior.value === "Yes";
    wrap.hidden = !show;
    var detail = form.querySelector('[name="prior_gig_detail"]');
    if (detail) detail.required = show;
  }

  function prefillFromQuery() {
    if (new URLSearchParams(window.location.search).get("success") === "1") {
      setStatus(
        "Application received. We review every submission and reply " +
          (cfg.responseTime || "within a few business days") +
          ". Watch your inbox (and spam) for next steps.",
        "success"
      );
      form.reset();
      togglePriorGigDetail();
    }
  }

  var priorSelect = form.querySelector('[name="prior_gig_work"]');
  if (priorSelect) {
    priorSelect.addEventListener("change", togglePriorGigDetail);
    togglePriorGigDetail();
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
      submitBtn.textContent = "Submitting…";
    }
    setStatus("Submitting your application…", "info");

    var body = new URLSearchParams(new FormData(form)).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Network error");
        window.location.href = "tech-onboarding.html?success=1";
      })
      .catch(function () {
        setStatus(
          "Something went wrong. Email your answers to " + fallbackEmail + " and we’ll pick it up manually.",
          "error"
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      });
  });
})();
