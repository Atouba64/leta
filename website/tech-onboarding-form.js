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

  var MIN_ESSAY = 60;
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

  function toggleSkillsOther() {
    var otherCb = document.getElementById("skill-other-cb");
    var wrap = document.getElementById("skills-other-wrap");
    var input = form.querySelector('[name="skills_other"]');
    if (!otherCb || !wrap || !input) return;
    var show = otherCb.checked;
    wrap.hidden = !show;
    input.required = show;
    if (!show) {
      input.value = "";
      input.setCustomValidity("");
    }
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

  function validateSelectYes(stepEl, name, label) {
    var el = stepEl.querySelector('[name="' + name + '"]');
    if (!el) return true;
    if (el.value === "Yes") {
      el.setCustomValidity("");
      return true;
    }
    el.setCustomValidity(label + " must be Yes for Leta field work.");
    el.reportValidity();
    return false;
  }

  function validateTextareaEssay(stepEl, name) {
    var el = stepEl.querySelector('[name="' + name + '"]');
    if (!el || !el.required) return true;
    var text = (el.value || "").trim();
    if (text.length >= MIN_ESSAY) {
      el.setCustomValidity("");
      return true;
    }
    el.setCustomValidity("Please write at least " + MIN_ESSAY + " characters (a few real sentences).");
    el.reportValidity();
    return false;
  }

  function validateStep(stepEl) {
    var ok = true;
    var fields = stepEl.querySelectorAll("input, select, textarea");

    Array.prototype.forEach.call(fields, function (field) {
      if (field.type === "checkbox" && field.name === "availability") return;
      if (field.type === "checkbox" && field.name === "skills") return;
      if (field.type === "checkbox" && field.name === "certifications") return;
      if (field.hidden || field.closest("[hidden]")) return;
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
      toggleSkillsOther();
      var otherInput = stepEl.querySelector('[name="skills_other"]');
      if (otherInput && otherInput.required && !(otherInput.value || "").trim()) {
        otherInput.setCustomValidity("Describe the other skills you selected.");
        otherInput.reportValidity();
        ok = false;
      }
    }
    if (stepEl.querySelector('input[name="certifications"]')) {
      if (!validateCheckboxGroup(stepEl, "certifications", "Select at least one certification option (including “None yet”).")) {
        ok = false;
      }
    }
    if (stepEl.querySelector('input[name="work_preferences"]')) {
      if (!validateCheckboxGroup(stepEl, "work_preferences", "Select at least one type of work you want.")) {
        ok = false;
      }
    }
    if (stepEl.querySelector('[name="profile_pitch"]') && !validateTextareaEssay(stepEl, "profile_pitch")) {
      ok = false;
    }

    if (stepEl.querySelector('[name="vehicle_reliable"]')) {
      if (!validateSelectYes(stepEl, "vehicle_reliable", "Reliable vehicle")) ok = false;
      if (!validateSelectYes(stepEl, "drivers_license_valid", "Valid driver’s license")) ok = false;
      if (!validateSelectYes(stepEl, "smartphone", "Smartphone with mobile data")) ok = false;
    }

    ["why_leta", "enjoy_helping", "proud_job", "tough_customer"].forEach(function (name) {
      if (stepEl.querySelector('[name="' + name + '"]') && !validateTextareaEssay(stepEl, name)) {
        ok = false;
      }
    });

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

  function ensureHidden(name, value) {
    if (!value) return;
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) {
      el = document.createElement("input");
      el.type = "hidden";
      el.name = name;
      form.appendChild(el);
    }
    el.value = value;
  }

  function prefillFromApp() {
    var params = new URLSearchParams(window.location.search);
    var email = (params.get("email") || "").trim();
    var uid = (params.get("uid") || "").trim();
    var name = (params.get("name") || "").trim();

    if (email) {
      var emailEl = form.querySelector('[name="email"]');
      if (emailEl) emailEl.value = email;
    }
    if (name) {
      var parts = name.split(/\s+/);
      var first = form.querySelector('[name="legal_first_name"]');
      var last = form.querySelector('[name="legal_last_name"]');
      if (first && parts[0]) first.value = parts[0];
      if (last && parts.length > 1) last.value = parts.slice(1).join(" ");
      var preferred = form.querySelector('[name="preferred_name"]');
      if (preferred) preferred.value = name;
    }
    ensureHidden("app_uid", uid);
    ensureHidden("app_source", params.get("source") || "web");
  }

  function prefillFromQuery() {
    prefillFromApp();
    if (new URLSearchParams(window.location.search).get("success") === "1") {
      setStatus(
        "Application received. We review every submission and reply " +
          (cfg.responseTime || "within a few business days") +
          ". Watch your inbox (and spam) for next steps.",
        "success"
      );
      form.reset();
      togglePriorGigDetail();
      toggleSkillsOther();
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

  var skillOtherCb = document.getElementById("skill-other-cb");
  if (skillOtherCb) {
    skillOtherCb.addEventListener("change", toggleSkillsOther);
    toggleSkillsOther();
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

    var params = new URLSearchParams(window.location.search);
    ensureHidden("app_uid", (params.get("uid") || "").trim());
    ensureHidden("app_source", params.get("source") || "web");

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
