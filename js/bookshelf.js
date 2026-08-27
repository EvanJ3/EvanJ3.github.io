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

  function coverImg(book) {
    if (!book.Image_Path) return null;
    var img = document.createElement("img");
    img.src = book.Image_Path;
    img.loading = "lazy";
    img.alt = book.Title || "";
    return img;
  }

  Promise.all(SOURCES.map(function (url) {
    return fetch(url).then(function (r) { return r.text(); }).then(function (t) {
      return toObjects(parseCSV(t));
    }).catch(function () { return []; });
  })).then(function (lists) {
    // interleave categories so the wall reads as one mixed shelf
    var max = Math.max.apply(null, lists.map(function (l) { return l.length; }));
    var total = 0;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < max; i++) {
      lists.forEach(function (list) {
        if (i < list.length) {
          var img = coverImg(list[i]);
          if (img) { frag.appendChild(img); total++; }
        }
      });
    }
    wall.appendChild(frag);

    var note = document.getElementById("wall-count");
    if (note) note.textContent = total;
  });
})();
