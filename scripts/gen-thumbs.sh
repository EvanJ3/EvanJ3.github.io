#!/usr/bin/env bash
# ============================================================
# gen-thumbs.sh — batch-generate small cover thumbnails for the
# bookshelf wall. Full-res covers are ~3456px / ~3MB each; the wall
# renders them at ~84px, so we ship 240px JPEGs (~18KB) instead.
#
# Reads:  images/Bookshelf_Images/**/*.{jpg,jpeg,png}
# Writes: images/Bookshelf_Thumbs/**  (mirrored tree, always .jpg)
#
# Idempotent: skips a thumb that is newer than its source. Pass
# --force to regenerate everything. Requires macOS `sips`.
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."

SRC_ROOT="images/Bookshelf_Images"
OUT_ROOT="images/Bookshelf_Thumbs"
MAX_EDGE=240      # longest edge, in px
FORCE=0

[ "${1:-}" = "--force" ] && FORCE=1

if ! command -v sips >/dev/null 2>&1; then
  echo "error: sips not found (this script targets macOS)." >&2
  exit 1
fi

made=0 skipped=0
while IFS= read -r -d '' src; do
  rel="${src#"$SRC_ROOT"/}"                 # path below the source root
  out="$OUT_ROOT/${rel%.*}.jpg"             # mirror tree, force .jpg
  if [ "$FORCE" -eq 0 ] && [ -f "$out" ] && [ "$out" -nt "$src" ]; then
    skipped=$((skipped + 1)); continue
  fi
  mkdir -p "$(dirname "$out")"
  sips -Z "$MAX_EDGE" -s format jpeg -s formatOptions 72 "$src" --out "$out" >/dev/null
  made=$((made + 1))
done < <(find "$SRC_ROOT" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

echo "thumbnails: $made generated, $skipped up-to-date -> $OUT_ROOT"
