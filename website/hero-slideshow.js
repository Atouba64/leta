(function () {
  var root = document.querySelector("[data-hero-slideshow]");
  if (!root) return;

  var viewport = root.querySelector(".hero-slideshow__viewport");
  var slides = Array.prototype.slice.call(root.querySelectorAll("[data-hero-slide]"));
  var dots = Array.prototype.slice.call(root.querySelectorAll("[data-hero-goto]"));
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var index = 0;
  var timer = null;
  var hoverPaused = false;
  var dragActive = false;
  var pointerStartX = 0;
  var pointerStartY = 0;
  var SWIPE_MIN = 48;

  function durationFor(i) {
    var slide = slides[i];
    var ms = slide && slide.getAttribute("data-duration");
    var n = parseInt(ms, 10);
    return Number.isFinite(n) && n > 0 ? n : 5500;
  }

  function autoplayBlocked() {
    return reducedMotion || hoverPaused || dragActive || slides.length < 2;
  }

  function setActive(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (slide, idx) {
      var active = idx === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    dots.forEach(function (dot, idx) {
      var active = idx === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function clearTimer() {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function scheduleNext() {
    clearTimer();
    if (autoplayBlocked()) return;
    timer = window.setTimeout(function () {
      setActive(index + 1);
      scheduleNext();
    }, durationFor(index));
  }

  function goTo(i) {
    setActive(i);
    scheduleNext();
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var target = parseInt(dot.getAttribute("data-hero-goto"), 10);
      if (!Number.isFinite(target)) return;
      goTo(target);
    });
  });

  function pauseForHover() {
    hoverPaused = true;
    clearTimer();
  }

  function resumeFromHover() {
    hoverPaused = false;
    if (!dragActive) scheduleNext();
  }

  root.addEventListener("mouseenter", function () {
    if (!reducedMotion) pauseForHover();
  });

  root.addEventListener("mouseleave", function () {
    if (!reducedMotion) resumeFromHover();
  });

  root.addEventListener("focusin", function () {
    if (!reducedMotion) pauseForHover();
  });

  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget) && !reducedMotion) resumeFromHover();
  });

  if (viewport) {
    viewport.style.touchAction = "pan-y";

    viewport.addEventListener(
      "pointerdown",
      function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragActive = true;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        viewport.classList.add("is-dragging");
        clearTimer();
        if (viewport.setPointerCapture && e.pointerId != null) {
          try {
            viewport.setPointerCapture(e.pointerId);
          } catch (_err) {
            /* ignore */
          }
        }
      },
      { passive: true }
    );

    viewport.addEventListener(
      "pointerup",
      function (e) {
        if (!dragActive) return;
        dragActive = false;
        viewport.classList.remove("is-dragging");

        var dx = e.clientX - pointerStartX;
        var dy = e.clientY - pointerStartY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_MIN) {
          if (dx < 0) goTo(index + 1);
          else goTo(index - 1);
        } else if (!hoverPaused) {
          scheduleNext();
        }

        if (viewport.releasePointerCapture && e.pointerId != null) {
          try {
            viewport.releasePointerCapture(e.pointerId);
          } catch (_err) {
            /* ignore */
          }
        }
      },
      { passive: true }
    );

    viewport.addEventListener(
      "pointercancel",
      function () {
        dragActive = false;
        viewport.classList.remove("is-dragging");
        if (!hoverPaused) scheduleNext();
      },
      { passive: true }
    );
  }

  setActive(0);
  if (!reducedMotion && slides.length > 1) scheduleNext();
})();
