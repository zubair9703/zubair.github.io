/* Alternate layout — portfolio filtering + reveal */

(function () {
  "use strict";

  /* ---------- portfolio filters ---------- */

  var buttons = document.querySelectorAll(".filter");
  var grid = document.querySelector("[data-grid]");

  if (buttons.length && grid) {
    var tiles = grid.querySelectorAll(".tile");

    var apply = function (cat) {
      tiles.forEach(function (t) {
        var cats = (t.getAttribute("data-cats") || "").split(/\s+/);
        t.hidden = !(cat === "all" || cats.indexOf(cat) !== -1);
      });
    };

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        buttons.forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        apply(b.getAttribute("data-filter"));
      });
    });
  }

  /* ---------- reveal ---------- */

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".rv");

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- year ---------- */

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
