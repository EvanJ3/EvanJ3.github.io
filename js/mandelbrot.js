/* ============================================================
   mandelbrot.js — the homepage hero.
   The deep-navy field paints first, then the cyan boundary glow
   blooms inward toward the set over successive iterations; the
   name card follows. Pure canvas, no dependencies.
   ============================================================ */
(function () {
  var canvas = document.getElementById("mandel");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var card = document.querySelector(".hero-card");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MAX = 90, raf = null;

  // exterior colour by iteration-to-escape: far field (early) dark, boundary (late) bright
  function paint(d, p, it) {
    var b = Math.pow(it / MAX, 1.55);
    d[p]     = (4  + 55 * b) | 0;    // deepened steel-cyan
    d[p + 1] = (6  + 150 * b) | 0;
    d[p + 2] = (16 + 185 * b) | 0;
    d[p + 3] = 255;
  }

  function build() {
    if (raf) cancelAnimationFrame(raf);
    if (card) card.classList.remove("show");

    var W = canvas.width  = Math.min(1200, Math.floor(canvas.clientWidth  || window.innerWidth));
    var H = canvas.height = Math.min(820,  Math.floor(canvas.clientHeight || window.innerHeight));
    if (!W || !H) { if (card) card.classList.add("show"); return; }  // no viewport yet — show the name anyway
    var N = W * H;

    var cx = -0.55, spanR = 3.3, spanI = spanR * H / W;
    var minR = cx - spanR / 2, minI = -spanI / 2;
    var sr = spanR / W, si = spanI / H;

    var zx = new Float64Array(N), zy = new Float64Array(N);
    var cr = new Float64Array(N), ci = new Float64Array(N);
    var doneA = new Uint8Array(N);
    var img = ctx.createImageData(W, H), d = img.data;

    for (var py = 0, k = 0; py < H; py++) {
      var y0 = minI + si * py;
      for (var px = 0; px < W; px++, k++) {
        cr[k] = minR + sr * px; ci[k] = y0;
        d[k * 4] = 3; d[k * 4 + 1] = 6; d[k * 4 + 2] = 18; d[k * 4 + 3] = 255;
      }
    }

    var g = 0;
    function step() {
      for (var k = 0; k < N; k++) {
        if (doneA[k]) continue;
        var x = zx[k], y = zy[k];
        if (x * x + y * y > 4) { doneA[k] = 1; paint(d, k * 4, g); continue; }
        var xt = x * x - y * y + cr[k];
        zy[k] = 2 * x * y + ci[k];
        zx[k] = xt;
      }
      ctx.putImageData(img, 0, 0);
      g++;
      if (g < MAX) { raf = requestAnimationFrame(step); }
      else if (card) { card.classList.add("show"); }
    }
    step();
  }

  function buildFinal() {
    // reduced-motion: draw the final frame at once, then show the card
    var W = canvas.width  = Math.min(1200, Math.floor(canvas.clientWidth  || window.innerWidth));
    var H = canvas.height = Math.min(820,  Math.floor(canvas.clientHeight || window.innerHeight));
    if (!W || !H) { if (card) card.classList.add("show"); return; }
    var spanR = 3.3, spanI = spanR * H / W, minR = -0.55 - spanR / 2, minI = -spanI / 2;
    var img = ctx.createImageData(W, H), d = img.data;
    for (var py = 0, k = 0; py < H; py++) {
      var y0 = minI + spanI * py / H;
      for (var px = 0; px < W; px++, k++) {
        var x0 = minR + spanR * px / W, x = 0, y = 0, it = 0, x2 = 0, y2 = 0;
        while (x2 + y2 <= 4 && it < MAX) { y = 2 * x * y + y0; x = x2 - y2 + x0; x2 = x * x; y2 = y * y; it++; }
        if (it === MAX) { d[k * 4] = 3; d[k * 4 + 1] = 6; d[k * 4 + 2] = 18; d[k * 4 + 3] = 255; }
        else paint(d, k * 4, it);
      }
    }
    ctx.putImageData(img, 0, 0);
    if (card) card.classList.add("show");
  }

  if (reduce) {
    buildFinal();
  } else {
    build();
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(build, 250); });
  }
})();
