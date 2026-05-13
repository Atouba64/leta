(function () {
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
