/* Zubair Ahmed — portfolio interactions */

(function () {
  "use strict";

  /* ---------- spectral signature readout ---------- */

  var NOTES = {
    B02: ["490 nm", "Blue", "Baseline water clarity. Turbidity and suspended sediment start here."],
    B03: ["560 nm", "Green", "Pond colour. Algal pigment scatters green light back to the sensor."],
    B04: ["665 nm", "Red", "Chlorophyll absorption — the dip. Deeper dip, denser bloom."],
    B05: ["705 nm", "Red edge 1", "Bloom onset. The curve turns upward as the pond greens."],
    B06: ["740 nm", "Red edge 2", "Phytoplankton density climbs steeply through the culture cycle."],
    B07: ["783 nm", "Red edge 3", "Numerator of the Shrimp Index. Peak of the pond's bloom signal."],
    B08: ["842 nm", "NIR", "Suspended matter — in a shrimp pond that reads as feed and biomass."],
    B8A: ["865 nm", "NIR narrow", "Cleanest separation between shrimp ponds and every other water body."],
    B11: ["1610 nm", "SWIR", "Denominator of the Shrimp Index. Water absorbs; reflectance collapses."],
    B12: ["2190 nm", "SWIR", "Near-total absorption by water. The floor the index is measured against."]
  };

  var chart = document.querySelector("[data-spectral]");
  if (chart) {
    var readout = chart.querySelector("[data-readout]");
    var defaultHTML = readout ? readout.innerHTML : "";
    var groups = chart.querySelectorAll("[data-band]");

    var clear = function () {
      groups.forEach(function (g) {
        g.querySelectorAll(".on").forEach(function (n) { n.classList.remove("on"); });
      });
    };

    var show = function (g) {
      clear();
      g.querySelectorAll(".guide, .dot, .band-lab").forEach(function (n) { n.classList.add("on"); });
      var b = g.getAttribute("data-band");
      var n = NOTES[b];
      if (readout && n) {
        readout.innerHTML =
          "<b>" + b + "</b> · <span class='nm'>" + n[0] + "</span> · " + n[1] + "<br>" + n[2];
      }
    };

    var reset = function () {
      clear();
      if (readout) readout.innerHTML = defaultHTML;
    };

    groups.forEach(function (g) {
      g.addEventListener("mouseenter", function () { show(g); });
      g.addEventListener("focus", function () { show(g); });
      g.addEventListener("blur", reset);
      g.addEventListener("click", function () { show(g); });
    });
    chart.addEventListener("mouseleave", reset);
  }

  /* ---------- scroll reveal ---------- */

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".rv");

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- current year ---------- */

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
