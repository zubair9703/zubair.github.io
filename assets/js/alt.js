/* Alternate layout — portfolio filtering + reveal */

(function () {
  "use strict";

  /* ---------- portfolio filters ---------- */

  var buttons = document.querySelectorAll(".filter");
  var grid = document.querySelector("[data-grid]");

  if (buttons.length && grid) {
    var tiles = grid.querySelectorAll(".tile");
    var status = document.querySelector("[data-filter-status]");

    var apply = function (cat) {
      var shown = 0;
      tiles.forEach(function (t) {
        var cats = (t.getAttribute("data-cats") || "").split(/\s+/);
        var match = cat === "all" || cats.indexOf(cat) !== -1;
        t.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === cat));
      });
      /* the grid changes silently otherwise — nothing tells a screen reader
         that the result set moved */
      if (status) status.textContent = shown + (shown === 1 ? " project" : " projects") + " shown";
    };

    var known = function (cat) {
      var ok = false;
      buttons.forEach(function (b) { if (b.getAttribute("data-filter") === cat) ok = true; });
      return ok;
    };

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var cat = b.getAttribute("data-filter");
        apply(cat);
        /* keep the filter in the URL so a filtered view can be shared, and use
           replaceState so it never fights the #portfolio anchor or the scroll position */
        if (window.history && history.replaceState) {
          var url = new URL(window.location.href);
          if (cat === "all") url.searchParams.delete("filter");
          else url.searchParams.set("filter", cat);
          history.replaceState(null, "", url.toString());
        }
      });
    });

    var initial = null;
    try { initial = new URL(window.location.href).searchParams.get("filter"); } catch (e) {}
    if (initial && known(initial)) apply(initial);
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
