(function () {
  var cfg = window.LETA_CONTACT || {};
  var botName = cfg.assistantName || "Leta Guide";

  var knowledge = {
    greeting:
      "Hi — I'm " +
      botName +
      ", Leta's automated guide. I can answer common questions about partners, customers, and field technicians in Georgia. Choose a topic below or ask for a person.",
    partner:
      "Leta helps fulfillment partners (MSPs, dispatch networks, OEMs) staff onsite IT in Georgia with transparent dispatch, partner-visible status, and native video escalation (Leta Live). We often start with a small pilot—typically a few tickets in your radius—before scaling.",
    customer:
      "Customers order professional onsite IT with clear status and close-out—similar clarity to modern logistics, not phone-tag dispatch. The mobile app is the product; this site explains how we work while we roll out.",
    technician:
      "Field techs use the Leta app to go Active, receive geo-matched offers, complete digital close-out, and get paid quickly. Partner and direct demand share one pool so work is more consistent across Georgia.",
    pilot:
      "A pilot is a limited trial: we handle a small batch of real tickets so you can compare speed, visibility, and communication against your current vendor—without a big contract on day one.",
    coverage:
      "We're Georgia-first: building depth in Atlanta, Gainesville, Savannah, and secondary markets before expanding geography. See the Coverage page for how we think about radius and SLA.",
    pricing:
      "Pricing depends on ticket type, SLA, and partner structure. Share scope on the contact form and we'll respond with next steps—no public rate card yet while we're in pilot phase.",
    human:
      "A real person on our team reads every message. Use the contact form on this site (fastest) or email " +
      (cfg.generalEmail || "hello@leta.repair") +
      ". We reply " +
      (cfg.responseTime || "soon") +
      ".",
    default:
      "I might not have that answer yet. Try Partners, Customers, or Technicians from the menu—or send a message on the Contact page and we'll follow up " +
      (cfg.responseTime || "soon") +
      ".",
  };

  var quickTopics = [
    { id: "partner", label: "Partners" },
    { id: "customer", label: "Customers" },
    { id: "technician", label: "Technicians" },
    { id: "pilot", label: "Pilot programs" },
    { id: "coverage", label: "Georgia coverage" },
    { id: "human", label: "Talk to a person" },
  ];

  function matchIntent(text) {
    var t = text.toLowerCase();
    if (/\b(partner|msp|dispatch|barrister|fulfillment|oem|qmatic)\b/.test(t)) return "partner";
    if (/\b(customer|site|store|enterprise|need a tech|break.?fix)\b/.test(t)) return "customer";
    if (/\b(tech|technician|1099|contractor|apply|job|offer)\b/.test(t)) return "technician";
    if (/\b(pilot|trial|poc)\b/.test(t)) return "pilot";
    if (/\b(georgia|atlanta|gainesville|savannah|coverage|radius)\b/.test(t)) return "coverage";
    if (/\b(price|pricing|cost|rate|pay)\b/.test(t)) return "pricing";
    if (/\b(human|person|email|call|contact|reach|talk)\b/.test(t)) return "human";
    return "default";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildWidget() {
    var root = el("div", "leta-assistant");
    root.setAttribute("aria-live", "polite");

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "leta-assistant__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "leta-assistant-panel");
    toggle.innerHTML =
      '<span class="leta-assistant__toggle-label">Ask ' +
      botName +
      '</span><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>';

    var panel = el("div", "leta-assistant__panel");
    panel.id = "leta-assistant-panel";
    panel.hidden = true;

    var header = el("div", "leta-assistant__header");
    header.appendChild(el("strong", null, botName));
    header.appendChild(el("span", "leta-assistant__sub", "Automated guide · not a live agent"));

    var close = document.createElement("button");
    close.type = "button";
    close.className = "leta-assistant__close";
    close.setAttribute("aria-label", "Close assistant");
    close.textContent = "×";
    header.appendChild(close);

    var log = el("div", "leta-assistant__log");
    log.setAttribute("role", "log");

    var chips = el("div", "leta-assistant__chips");
    quickTopics.forEach(function (topic) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "leta-assistant__chip";
      chip.textContent = topic.label;
      chip.dataset.topic = topic.id;
      chips.appendChild(chip);
    });

    var form = document.createElement("form");
    form.className = "leta-assistant__form";
    form.setAttribute("novalidate", "");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "leta-assistant__input";
    input.name = "assistant-query";
    input.placeholder = "Ask a question…";
    input.autocomplete = "off";
    var send = document.createElement("button");
    send.type = "submit";
    send.className = "leta-assistant__send";
    send.textContent = "Send";
    form.appendChild(input);
    form.appendChild(send);

    var foot = el("p", "leta-assistant__foot");
    var contactPath = "contact.html";
    if (window.location.pathname.indexOf("contact") !== -1) contactPath = "#contact-form";
    foot.innerHTML =
      'Need a person? <a href="' +
      contactPath +
      '">Contact form</a> · <a href="mailto:' +
      encodeURIComponent(cfg.generalEmail || "hello@leta.repair") +
      '">' +
      (cfg.generalEmail || "hello@leta.repair") +
      "</a>";

    panel.appendChild(header);
    panel.appendChild(log);
    panel.appendChild(chips);
    panel.appendChild(form);
    panel.appendChild(foot);
    root.appendChild(panel);
    root.appendChild(toggle);
    document.body.appendChild(root);

    function appendMessage(role, text) {
      var msg = el("p", "leta-assistant__msg leta-assistant__msg--" + role);
      msg.textContent = text;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }

    function reply(topicId) {
      appendMessage("bot", knowledge[topicId] || knowledge.default);
    }

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && !log.dataset.ready) {
        log.dataset.ready = "1";
        appendMessage("bot", knowledge.greeting);
        input.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(panel.hidden);
    });
    close.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });

    chips.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-topic]");
      if (!chip) return;
      appendMessage("user", chip.textContent);
      reply(chip.dataset.topic);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      appendMessage("user", q);
      input.value = "";
      reply(matchIntent(q));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
