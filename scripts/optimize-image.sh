#!/usr/bin/env bash
#
# optimize-image.sh — convert PNG/JPG images to WebP at quality 85, native resolution.
# This is how the site's photos are optimized: a smaller .webp sits in public/images/
# and the code references it instead of the original.
#
# Usage:
#   scripts/optimize-image.sh                       # convert every PNG/JPG in public/images
#   scripts/optimize-image.sh public/images/pic.png # convert a single file
#   scripts/optimize-image.sh some/folder           # convert all images in a folder
#
# A sibling .webp is written next to each source (pic.png -> pic.webp). The original
# is left in place — once you've checked the .webp looks right, delete the source, since
# this repo keeps only the .webp versions. Re-run after building to refresh docs/.
#
set -euo pipefail

QUALITY=85
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

command -v cwebp >/dev/null 2>&1 || {
  echo "cwebp not found — install it with:  brew install webp" >&2
  exit 1
}

convert_one() {
  local src="$1"
  local out="${src%.*}.webp"
  cwebp -quiet -q "$QUALITY" "$src" -o "$out"
  printf '  %-50s %6s -> %6s\n' "$out" "$(du -h "$src" | cut -f1)" "$(du -h "$out" | cut -f1)"
}

targets=("$@")
[ ${#targets[@]} -eq 0 ] && targets=("$ROOT/public/images")

for t in "${targets[@]}"; do
  if [ -d "$t" ]; then
    echo "Converting images in $t/ (quality $QUALITY) ..."
    find "$t" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 |
      while IFS= read -r -d '' f; do convert_one "$f"; done
  elif [ -f "$t" ]; then
    convert_one "$t"
  else
    echo "skip (not found): $t" >&2
  fi
done

echo "Done."
