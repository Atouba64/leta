(function () {
  var root = document.querySelector("[data-hero-slideshow]");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll("[data-hero-slide]"));
  var dots = Array.prototype.slice.call(root.querySelectorAll("[data-hero-goto]"));
  var pauseBtn = root.querySelector("[data-hero-pause]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var index = 0;
  var timer = null;
  var paused = false;

  function durationFor(i) {
    var slide = slides[i];
    var ms = slide && slide.getAttribute("data-duration");
    var n = parseInt(ms, 10);
    return Number.isFinite(n) && n > 0 ? n : 5500;
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
    if (paused || reducedMotion || slides.length < 2) return;
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

  if (pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      paused = !paused;
      pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
      pauseBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
      pauseBtn.textContent = paused ? "Play" : "Pause";
      if (paused) clearTimer();
      else scheduleNext();
    });
  }

  root.addEventListener("mouseenter", function () {
    if (!reducedMotion) clearTimer();
  });

  root.addEventListener("mouseleave", function () {
    if (!paused && !reducedMotion) scheduleNext();
  });

  root.addEventListener("focusin", function () {
    if (!reducedMotion) clearTimer();
  });

  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget) && !paused && !reducedMotion) {
      scheduleNext();
    }
  });

  setActive(0);
  if (!reducedMotion && slides.length > 1) scheduleNext();
})();
