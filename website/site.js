(function () {
  var cfg = window.LETA_CONTACT || {};

  function applyContactConfig() {
    document.querySelectorAll("[data-leta-email-general]").forEach(function (node) {
      if (cfg.generalEmail) node.textContent = cfg.generalEmail;
    });
    document.querySelectorAll("[data-leta-email-partners]").forEach(function (node) {
      if (cfg.partnersEmail) node.textContent = cfg.partnersEmail;
    });
    document.querySelectorAll("[data-leta-email-support]").forEach(function (node) {
      if (cfg.supportEmail) node.textContent = cfg.supportEmail;
    });
    document.querySelectorAll("[data-leta-email-techs]").forEach(function (node) {
      if (cfg.techniciansEmail) node.textContent = cfg.techniciansEmail;
    });
    document.querySelectorAll("[data-leta-mailto-general]").forEach(function (node) {
      if (cfg.generalEmail) node.setAttribute("href", "mailto:" + cfg.generalEmail);
    });
    document.querySelectorAll("[data-leta-mailto-partners]").forEach(function (node) {
      if (cfg.partnersEmail) node.setAttribute("href", "mailto:" + cfg.partnersEmail);
    });
    document.querySelectorAll("[data-leta-mailto-support]").forEach(function (node) {
      if (cfg.supportEmail) node.setAttribute("href", "mailto:" + cfg.supportEmail);
    });
    document.querySelectorAll("[data-leta-mailto-techs]").forEach(function (node) {
      if (cfg.techniciansEmail) node.setAttribute("href", "mailto:" + cfg.techniciansEmail);
    });
    document.querySelectorAll("[data-leta-response-time]").forEach(function (node) {
      if (cfg.responseTime) node.textContent = cfg.responseTime;
    });
    var bookingUrl = (cfg.bookingUrl || cfg.calendlyUrl || "").trim();
    document.querySelectorAll("[data-leta-booking]").forEach(function (node) {
      if (bookingUrl) {
        node.hidden = false;
        node.href = bookingUrl;
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      } else {
        node.hidden = true;
        node.removeAttribute("href");
      }
    });
    document.querySelectorAll("[data-leta-calendly]").forEach(function (node) {
      if (bookingUrl) {
        node.hidden = false;
        node.href = bookingUrl;
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      } else {
        node.hidden = true;
        node.removeAttribute("href");
      }
    });

    var phone = (cfg.phone || "").replace(/\D/g, "");
    var phoneDisplay = cfg.phoneDisplay || cfg.phone || "";
    if (phone) {
      var telHref = "tel:+1" + (phone.length === 10 ? phone : phone);
      document.querySelectorAll("[data-leta-tel]").forEach(function (node) {
        node.setAttribute("href", telHref);
      });
      document.querySelectorAll("[data-leta-phone-display]").forEach(function (node) {
        node.textContent = phoneDisplay;
      });
    }

    var waPhone = (cfg.whatsappPhone || cfg.phone || "").replace(/\D/g, "");
    var waText = (cfg.whatsappRecruitMessage || "").trim();
    document.querySelectorAll("[data-leta-whatsapp]").forEach(function (node) {
      if (!waPhone) {
        node.hidden = true;
        return;
      }
      var href = "https://wa.me/1" + waPhone;
      if (waText) href += "?text=" + encodeURIComponent(waText);
      node.href = href;
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
      node.hidden = false;
    });
    document.querySelectorAll("[data-leta-referral-bonus]").forEach(function (node) {
      if (cfg.referralBonusDisplay) node.textContent = cfg.referralBonusDisplay;
    });
    document.querySelectorAll("[data-leta-referral-jobs]").forEach(function (node) {
      if (cfg.referralJobsRequired) node.textContent = cfg.referralJobsRequired;
    });
    document.querySelectorAll("[data-leta-recruit-metros]").forEach(function (node) {
      if (cfg.recruitMetros) node.textContent = cfg.recruitMetros;
    });
    document.querySelectorAll("[data-leta-recruit-regions]").forEach(function (node) {
      if (cfg.recruitRegions) node.textContent = cfg.recruitRegions;
    });

    var linkInBio = (cfg.recruitLinkInBio || "").trim();
    document.querySelectorAll("[data-leta-link-in-bio]").forEach(function (node) {
      if (linkInBio) {
        node.href = linkInBio;
        node.textContent = linkInBio.replace(/^https?:\/\//, "");
      }
    });

    var socialMap = [
      { key: "socialTikTok", attr: "data-leta-social-tiktok", label: "TikTok" },
      { key: "socialInstagram", attr: "data-leta-social-instagram", label: "Instagram" },
      { key: "socialFacebook", attr: "data-leta-social-facebook", label: "Facebook" },
      { key: "socialYouTube", attr: "data-leta-social-youtube", label: "YouTube" },
    ];
    socialMap.forEach(function (item) {
      var url = (cfg[item.key] || "").trim();
      document.querySelectorAll("[" + item.attr + "]").forEach(function (node) {
        if (!url) {
          node.hidden = true;
          return;
        }
        node.hidden = false;
        node.href = url;
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
        if (!node.textContent.trim()) node.textContent = item.label;
      });
    });
    document.querySelectorAll("[data-leta-social-follow]").forEach(function (wrap) {
      var anyVisible = socialMap.some(function (item) {
        return (cfg[item.key] || "").trim();
      });
      wrap.hidden = !anyVisible;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyContactConfig);
  } else {
    applyContactConfig();
  }

  var toggle = document.getElementById("nav-toggle");
  var panel = document.getElementById("nav-panel");
  var backdrop = document.getElementById("nav-backdrop");
  var closeBtn = document.getElementById("nav-close");
  if (!toggle || !panel || !backdrop) return;

  function setOpen(open) {
    document.body.classList.toggle("nav-drawer-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    backdrop.hidden = !open;
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    if (!open && closeBtn && document.activeElement === closeBtn) {
      toggle.focus();
    }
  }

  function close() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    var willOpen = !document.body.classList.contains("nav-drawer-open");
    setOpen(willOpen);
    if (willOpen && closeBtn && window.matchMedia("(max-width: 767px)").matches) {
      window.requestAnimationFrame(function () {
        closeBtn.focus();
      });
    }
  });
  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }
  backdrop.addEventListener("click", close);
  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
