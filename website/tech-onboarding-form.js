(function () {
  var cfg = window.LETA_CONTACT || {};
  var form = document.getElementById("leta-tech-onboarding-form");
  if (!form) return;

  var statusEl = document.getElementById("tech-form-status");
  var submitBtn = document.getElementById("onboard-submit");
  var nextBtn = document.getElementById("onboard-next");
  var backBtn = document.getElementById("onboard-back");
  var fineEl = document.getElementById("onboard-fine");
  var progressText = document.getElementById("onboard-progress-text");
  var progressList = document.getElementById("onboard-steps");
  var wizardNav = document.getElementById("onboard-wizard-nav");
  var fallbackEmail = cfg.techniciansEmail || cfg.generalEmail || "techs@leta.repair";

  var steps = Array.prototype.slice.call(form.querySelectorAll(".onboard-step"));
  var totalSteps = steps.length;
  var currentStep = 0;

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

  function validateCheckboxGroup(stepEl, name, message) {
    var boxes = stepEl.querySelectorAll('input[type="checkbox"][name="' + name + '"]');
    if (!boxes.length) return true;
    var checked = Array.prototype.some.call(boxes, function (b) {
      return b.checked;
    });
    if (checked) {
      Array.prototype.forEach.call(boxes, function (b) {
        b.setCustomValidity("");
      });
      return true;
    }
    boxes[0].setCustomValidity(message || "Select at least one option.");
    boxes[0].reportValidity();
    return false;
  }

  function validateStep(stepEl) {
    var ok = true;
    var fields = stepEl.querySelectorAll("input, select, textarea");

    Array.prototype.forEach.call(fields, function (field) {
      if (field.type === "checkbox" && field.name === "availability") return;
      if (field.type === "checkbox" && field.name === "skills") return;
      if (field.type === "checkbox" && field.name === "certifications") return;
      if (!field.checkValidity()) {
        field.reportValidity();
        ok = false;
      }
    });

    if (stepEl.querySelector('input[name="availability"]')) {
      if (!validateCheckboxGroup(stepEl, "availability", "Select when you are usually available.")) {
        ok = false;
      }
    }
    if (stepEl.querySelector('input[name="skills"]')) {
      if (!validateCheckboxGroup(stepEl, "skills", "Select at least one skill you are comfortable with.")) {
        ok = false;
      }
    }

    return ok;
  }

  function updateProgressUi() {
    var title = steps[currentStep].getAttribute("data-step-title") || "";
    if (progressText) {
      progressText.textContent = "Step " + (currentStep + 1) + " of " + totalSteps + " · " + title.replace(/&amp;/g, "&");
    }
    if (progressList) {
      var items = progressList.querySelectorAll("li");
      Array.prototype.forEach.call(items, function (li, i) {
        li.classList.remove("is-active", "is-done");
        if (i < currentStep) li.classList.add("is-done");
        if (i === currentStep) li.classList.add("is-active");
      });
    }
    if (backBtn) backBtn.hidden = currentStep === 0;
    if (nextBtn) nextBtn.hidden = currentStep === totalSteps - 1;
    if (submitBtn) submitBtn.hidden = currentStep !== totalSteps - 1;
    if (fineEl) fineEl.hidden = currentStep !== totalSteps - 1;
  }

  function showStep(index) {
    if (index < 0 || index >= totalSteps) return;
    currentStep = index;
    steps.forEach(function (step, i) {
      var active = i === currentStep;
      step.hidden = !active;
      step.classList.toggle("is-active", active);
    });
    updateProgressUi();
    setStatus("", "info");
    var first = steps[currentStep].querySelector("input, select, textarea");
    if (first && typeof first.focus === "function") {
      try {
        first.focus();
      } catch (e) {}
    }
    if (wizardNav && wizardNav.scrollIntoView) {
      wizardNav.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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
      if (wizardNav) wizardNav.hidden = true;
      if (fineEl) fineEl.hidden = true;
      if (progressText) progressText.hidden = true;
      if (progressList) progressList.hidden = true;
      steps.forEach(function (s) {
        s.hidden = true;
      });
    }
  }

  var priorSelect = form.querySelector('[name="prior_gig_work"]');
  if (priorSelect) {
    priorSelect.addEventListener("change", togglePriorGigDetail);
    togglePriorGigDetail();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (!validateStep(steps[currentStep])) return;
      showStep(currentStep + 1);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      showStep(currentStep - 1);
    });
  }

  prefillFromQuery();
  if (!new URLSearchParams(window.location.search).get("success")) {
    showStep(0);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    for (var i = 0; i < steps.length; i++) {
      if (!validateStep(steps[i])) {
        showStep(i);
        return;
      }
    }

    var originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";
    }
    if (nextBtn) nextBtn.disabled = true;
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
        if (nextBtn) nextBtn.disabled = false;
      });
  });
})();
