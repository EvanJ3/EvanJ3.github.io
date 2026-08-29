/* ============================================================
   bookshelf.js — renders the full-collection cover wall from the
   book-list CSVs. Favorites are authored directly in the HTML;
   this only builds the wall of everything else. No dependencies.
   ============================================================ */
(function () {
  var wall = document.getElementById("book-wall");
  if (!wall) return;

  var SOURCES = [
    "./csv/Bookshelf_csv/Fiction_book_list.csv",
    "./csv/Bookshelf_csv/Non_Fiction_book_list.csv",
    "./csv/Bookshelf_csv/Textbook_list.csv"
  ];

  // minimal RFC-4180-ish CSV parser (handles quoted fields, commas, newlines)
  function parseCSV(text) {
    var rows = [], row = [], field = "", inQ = false, i = 0, c;
    while (i < text.length) {
      c = text[i];
      if (inQ) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
          inQ = false; i++; continue;
        }
        field += c; i++; continue;
      }
      if (c === '"') { inQ = true; i++; continue; }
      if (c === ",") { row.push(field); field = ""; i++; continue; }
      if (c === "\r") { i++; continue; }
      if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
      field += c; i++;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function toObjects(rows) {
    if (!rows.length) return [];
    var header = rows[0];
    return rows.slice(1).filter(function (r) { return r.length > 1; }).map(function (r) {
      var o = {};
      header.forEach(function (h, idx) { o[h.trim()] = (r[idx] || "").trim(); });
      return o;
    });
  }

  // full covers are ~3456px/~3MB each but render at ~84px, so point at
  // the pre-built 240px thumbnails; fall back to the original if missing.
  function thumbPath(p) {
    return p.replace("/Bookshelf_Images/", "/Bookshelf_Thumbs/")
            .replace(/\.(jpe?g|png)$/i, ".jpg");
  }

  // one <img> tile whose cover can be swapped in place during rotation
  function makeTile(book) {
    var img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    setCover(img, book);
    return img;
  }

  function setCover(img, book) {
    var full = book.Image_Path;
    img.alt = book.Title || "";
    img.onerror = function () { img.onerror = null; img.src = full; };
    img.src = thumbPath(full);
  }

  var ROTATE_MS = 2200;   // time between swap ticks
  var SWAP_MAX = 3;       // tiles swapped per tick
  var TARGET = 30;        // roughly how many tiles to show at once
  var SMALL_MAX_W = 620;  // treat viewports <= this (px) as small screens
  var SMALL_MAX_ROWS = 5; // cap the wall to this many rows on small screens

  function isSmallScreen() { return window.innerWidth <= SMALL_MAX_W; }

  // the wall is a responsive auto-fill grid, so the column count changes
  // with width; snap the tile count to a full multiple of it (>=1 row) so
  // the last row is never left partially filled.
  function colCount() {
    var t = getComputedStyle(wall).gridTemplateColumns;
    return t && t !== "none" ? t.split(" ").length : 1;
  }
  function fullTileCount() {
    var cols = colCount();
    var count = Math.max(cols, Math.round(TARGET / cols) * cols);
    // on small screens, cap total rows so the wall doesn't scroll forever
    if (isSmallScreen()) count = Math.min(count, cols * SMALL_MAX_ROWS);
    return count;
  }

  function pickIndex(len, avoid) {
    var n;
    do { n = Math.floor(Math.random() * len); } while (len > 1 && avoid(n));
    return n;
  }

  Promise.all(SOURCES.map(function (url) {
    return fetch(url).then(function (r) { return r.text(); }).then(function (t) {
      return toObjects(parseCSV(t));
    }).catch(function () { return []; });
  })).then(function (lists) {
    // interleave categories so the wall reads as one mixed shelf
    var max = Math.max.apply(null, lists.map(function (l) { return l.length; }));
    var pool = [];
    for (var i = 0; i < max; i++) {
      lists.forEach(function (list) {
        if (i < list.length && list[i].Image_Path) pool.push(list[i]);
      });
    }

    var note = document.getElementById("wall-count");
    if (note) note.textContent = pool.length;   // always the full collection

    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // when the pool fits (or motion is reduced), render statically without
    // rotation — but still cap the row count on small screens so the wall
    // doesn't scroll forever.
    if (reduce || pool.length <= TARGET) {
      var books = pool;
      if (isSmallScreen()) {
        var cap = colCount() * SMALL_MAX_ROWS;
        if (books.length > cap) books = books.slice(0, cap);
      }
      var all = document.createDocumentFragment();
      books.forEach(function (b) { all.appendChild(makeTile(b)); });
      wall.appendChild(all);
      return;
    }

    // render a reduced set; the rest wait off-screen in the pool
    var slotIdx = [];        // slotIdx[slot] = pool index shown in that slot
    var onWall = {};         // pool indices currently displayed (dedupe set)
    var tiles = [];

    function addTile() {
      var idx = pickIndex(pool.length, function (n) { return onWall[n]; });
      onWall[idx] = true;
      slotIdx.push(idx);
      var tile = makeTile(pool[idx]);
      tiles.push(tile);
      wall.appendChild(tile);
    }
    function removeTile() {
      var tile = tiles.pop();
      delete onWall[slotIdx.pop()];
      wall.removeChild(tile);
    }
    // grow/shrink to a full-rows count for the current column layout
    function reflow() {
      var want = Math.min(fullTileCount(), pool.length);
      while (tiles.length < want) addTile();
      while (tiles.length > want) removeTile();
    }
    reflow();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(reflow, 200);
    });

    // periodically fade out random slots and swap in unshown covers
    setInterval(function () {
      if (document.hidden || tiles.length >= pool.length) return;
      var swaps = 1 + Math.floor(Math.random() * SWAP_MAX);
      var touched = {};
      for (var s = 0; s < swaps && s < tiles.length; s++) {
        var slot = pickIndex(tiles.length, function (n) { return touched[n]; });
        touched[slot] = true;
        var next = pickIndex(pool.length, function (n) { return onWall[n]; });
        (function (tile, slot, next) {
          var prev = slotIdx[slot];
          onWall[next] = true;                 // claim it now so no other
          slotIdx[slot] = next;                // swap this tick reuses it
          tile.classList.add("swapping");
          setTimeout(function () {
            delete onWall[prev];               // free the outgoing cover
            setCover(tile, pool[next]);
            tile.classList.remove("swapping");
          }, 600);                             // matches the CSS fade
        })(tiles[slot], slot, next);
      }
    }, ROTATE_MS);
  });
})();
