/**
 * Dev / app helper: pre-fills the full 6-step tech onboarding form.
 * Enable with ?autofill=1 (app adds this when opening from Leta Tech).
 * Optional ?autofill=submit to auto-submit after fill (production Netlify only).
 */
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get("autofill") !== "1") return;

  var form = document.getElementById("leta-tech-onboarding-form");
  if (!form) return;

  var email = (params.get("email") || "").trim();
  var name = (params.get("name") || "Jordan Mabele").trim();
  var uid = (params.get("uid") || "").trim();
  var nameParts = name.split(/\s+/);
  var firstName = nameParts[0] || "Jordan";
  var lastName = nameParts.slice(1).join(" ") || "Mabele";

  var ESSAY =
    "I have been doing break-fix and retail IT across Georgia for several years. I am reliable, document everything on-site, and communicate clearly with store managers and remote support. Leta is the kind of modern dispatch platform I have wanted as a 1099 tech.";

  var PITCH =
    "Metro Atlanta field tech focused on POS, networking, and Cradlepoint installs. I carry a full laptop kit, labeler, Wi-Fi tools, and basic hand tools. Comfortable with partner dispatch rules, POC-only contact, and digital close-out. Available weekdays and some weekends; I filter jobs by distance so I only accept work I can finish on time.";

  function setValue(name, value) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function checkBoxes(name, values) {
    var boxes = form.querySelectorAll('input[type="checkbox"][name="' + name + '"]');
    Array.prototype.forEach.call(boxes, function (box) {
      box.checked = values.indexOf(box.value) >= 0;
    });
  }

  function fillAll() {
    setValue("legal_first_name", firstName);
    setValue("legal_last_name", lastName);
    setValue("preferred_name", firstName);
    setValue("email", email || "field.tech@example.com");
    setValue("phone", "(470) 555-0198");
    setValue("birth_year", "1998");
    setValue("city", "Atlanta");
    setValue("state", "GA");
    setValue("zip", "30303");
    var workAuth = form.querySelector('[name="work_authorized"]');
    if (workAuth) workAuth.checked = true;

    setValue("vehicle_reliable", "Yes");
    setValue("drivers_license_valid", "Yes");
    setValue("smartphone", "Yes");
    setValue("home_metro", "Metro Atlanta");
    setValue("travel_radius", "Up to 45 miles");
    checkBoxes("availability", ["Weekday mornings", "Weekday afternoons", "Weekends"]);
    setValue("hours_per_week", "10–20");

    setValue("experience_years", "3–5 years");
    setValue("education", "Some college");
    checkBoxes("skills", [
      "PC / Mac repair",
      "Networking / Wi-Fi",
      "Printers / peripherals",
      "POS / retail systems",
      "Cable / rack / patch",
    ]);
    checkBoxes("certifications", ["CompTIA A+", "None yet"]);
    setValue("tools_summary", "Laptop, Wi-Fi analyzer, crimper, labeler, basic hand tools, hotspot");
    setValue("portfolio_url", "");

    setValue("profile_headline", "Atlanta POS, networking and Cradlepoint · 1099");
    setValue("profile_pitch", PITCH);
    setValue("skill_level_self", "Tier 2: Field Tech");
    setValue("min_payout_per_job", "$100+");
    checkBoxes("work_preferences", ["Quick break-fix", "Partner dispatch jobs", "Multi-hour projects"]);

    var ack = form.querySelector('[name="contractor_1099_ack"]');
    if (ack) ack.checked = true;
    setValue("insurance_status", "Will obtain before first job");
    setValue("prior_gig_work", "Yes");
    setValue("prior_gig_detail", "MSP subcontract and Field Nation-style retail rollouts");

    setValue("why_leta", ESSAY);
    setValue("enjoy_helping", ESSAY);
    setValue("proud_job", ESSAY);
    setValue("tough_customer", ESSAY);
    setValue("additional_notes", "Building Leta Tech app with the team. Georgia statewide.");
    var bg = form.querySelector('[name="background_check_consent"]');
    if (bg) bg.checked = true;
    var accurate = form.querySelector('[name="info_accurate"]');
    if (accurate) accurate.checked = true;

    if (uid) {
      var hidden = form.querySelector('[name="app_uid"]');
      if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "app_uid";
        form.appendChild(hidden);
      }
      hidden.value = uid;
    }
  }

  function advanceToLastStep(attempt) {
    var next = document.getElementById("onboard-next");
    if (!next || next.hidden || attempt > 8) return;
    next.click();
    window.setTimeout(function () {
      advanceToLastStep(attempt + 1);
    }, 350);
  }

  function tryAutoSubmit() {
    window.setTimeout(function () {
      var submitBtn = document.getElementById("onboard-submit");
      if (submitBtn && !submitBtn.hidden) submitBtn.click();
    }, 600);
  }

  window.setTimeout(function () {
    fillAll();
    var skillOther = document.getElementById("skill-other-cb");
    if (skillOther) skillOther.dispatchEvent(new Event("change", { bubbles: true }));
    var prior = form.querySelector('[name="prior_gig_work"]');
    if (prior) prior.dispatchEvent(new Event("change", { bubbles: true }));

    var status = document.getElementById("tech-form-status");
    if (status) {
      status.hidden = false;
      status.className = "form-status form-status--info";
      status.textContent =
        "Application pre-filled from the Leta Tech app. Review each step, then tap Submit application.";
    }

    advanceToLastStep(0);

    if (params.get("submit") === "1") {
      window.setTimeout(tryAutoSubmit, 3200);
    }
  }, 500);
})();
