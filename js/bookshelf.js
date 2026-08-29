/* ============================================================
   bookshelf.js — renders the full-collection cover wall from the
   book-list CSVs. Favorites are authored directly in the HTML;
   this only builds the wall of everything else. No dependencies.
   ============================================================ */
(function () {
  var wall = document.getElementById("book-wall");
  if (!wall) return;

  var paused = false;   // cover rotation pauses while the detail view is open

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
    var author = ((book.Author_First || "").trim() + " " +
                  (book.Author_Last || "").trim()).trim();
    var note = (book.Description || book.Quote || "").trim();
    img.alt = book.Title || "";
    img.title = author ? (book.Title + " — " + author) : (book.Title || "");
    img.dataset.title = book.Title || "";
    img.dataset.author = author;
    img.dataset.note = note;
    img.dataset.kind = book.Description ? "note" : (book.Quote ? "quote" : "");
    img.dataset.score = book.Review_Score || "";
    img.onerror = function () { img.onerror = null; img.src = full; };
    img.src = thumbPath(full);
  }

  var ROTATE_MS = 2200;   // time between swap ticks
  var SWAP_MAX = 3;       // tiles swapped per tick
  var TARGET = 30;        // roughly how many tiles to show at once
  var SMALL_MAX_W = 620;  // treat viewports <= this (px) as small screens
  var SMALL_MAX_ROWS = 4; // cap the wall to this many rows on small screens

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
      if (paused || document.hidden || tiles.length >= pool.length) return;
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

  // ----------------------------------------------------------------
  // Detail view: click a cover to open it like a book and read the
  // title, author, rating, and note. Hover shows a quick caption.
  // ----------------------------------------------------------------
  setupInteractions();

  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function setupInteractions() {
    var modal = document.createElement("div");
    modal.className = "book-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Book details");
    modal.innerHTML =
      '<div class="bm-backdrop" data-close></div>' +
      '<button class="bm-close" data-close aria-label="Close">&times;</button>' +
      '<div class="bm-stage">' +
        '<div class="bm-spread">' +
          '<article class="bm-page">' +
            '<div class="bm-rating" aria-hidden="true"></div>' +
            '<h3 class="bm-title"></h3>' +
            '<p class="bm-author"></p>' +
            '<div class="bm-note"></div>' +
          '</article>' +
          '<div class="bm-cover"><img alt=""><span class="bm-cover-back" aria-hidden="true"></span></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var elCover = modal.querySelector(".bm-cover img");
    var elRating = modal.querySelector(".bm-rating");
    var elTitle = modal.querySelector(".bm-title");
    var elAuthor = modal.querySelector(".bm-author");
    var elNote = modal.querySelector(".bm-note");
    var openTimer, closeTimer, lastFocus = null;

    function stars(n) {
      n = parseInt(n, 10) || 0;
      var s = "";
      for (var i = 0; i < 5; i++) s += '<span class="' + (i < n ? "on" : "") + '">●</span>';
      return s;
    }

    function openFor(img) {
      var d = img.dataset;
      clearTimeout(closeTimer);
      elCover.src = img.currentSrc || img.src;
      elCover.alt = d.title || "";
      elTitle.textContent = d.title || "";
      elAuthor.textContent = d.author || "";
      elRating.innerHTML = d.score ? stars(d.score) : "";
      if (d.note) {
        elNote.textContent = d.note;
        elNote.classList.toggle("is-quote", d.kind === "quote");
        elNote.style.display = "";
      } else {
        elNote.textContent = "";
        elNote.style.display = "none";
      }
      paused = true;
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      // paint the closed book, fade it in, then swing the cover open
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { modal.classList.add("is-open"); });
      });
      openTimer = setTimeout(function () { modal.classList.add("opened"); }, 280);
      modal.querySelector(".bm-close").focus();
    }

    function close() {
      clearTimeout(openTimer);
      modal.classList.remove("opened");
      modal.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      paused = false;
      closeTimer = setTimeout(function () { modal.hidden = true; }, 650);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) close();
    });

    wall.addEventListener("click", function (e) {
      var img = e.target.closest && e.target.closest("img");
      if (img && wall.contains(img)) openFor(img);
    });

    // lightweight hover caption on pointer devices
    var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      var tip = document.createElement("div");
      tip.className = "wall-tip";
      tip.hidden = true;
      document.body.appendChild(tip);

      wall.addEventListener("mouseover", function (e) {
        var img = e.target.closest && e.target.closest("img");
        if (!img) return;
        tip.innerHTML = "<b>" + esc(img.dataset.title) + "</b>" +
          (img.dataset.author ? "<span>" + esc(img.dataset.author) + "</span>" : "");
        tip.hidden = false;
      });
      wall.addEventListener("mousemove", function (e) {
        if (tip.hidden) return;
        var pad = 16, r = tip.getBoundingClientRect();
        var x = e.clientX + pad, y = e.clientY + pad;
        if (x + r.width > window.innerWidth) x = e.clientX - r.width - pad;
        if (y + r.height > window.innerHeight) y = e.clientY - r.height - pad;
        tip.style.left = x + "px";
        tip.style.top = y + "px";
      });
      wall.addEventListener("mouseout", function (e) {
        var to = e.relatedTarget;
        if (to && wall.contains(to) && to.closest && to.closest("img")) return;
        tip.hidden = true;
      });
    }
  }
})();
