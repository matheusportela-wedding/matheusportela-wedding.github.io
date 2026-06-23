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
#   MAXPX=1000 scripts/optimize-image.sh pic.jpg    # also cap the longest edge to 1000px
#
# A sibling .webp is written next to each source (pic.png -> pic.webp). The original
# is left in place — once you've checked the .webp looks right, delete the source, since
# this repo keeps only the .webp versions. Re-run after building to refresh docs/.
#
# By default the .webp keeps the source's native resolution. Set MAXPX to downscale
# anything larger than that on its longest edge (handy for thumbnails/galleries that
# never display at full size) — images already smaller are left untouched.
#
set -euo pipefail

QUALITY=85
MAXPX="${MAXPX:-0}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

command -v cwebp >/dev/null 2>&1 || {
  echo "cwebp not found — install it with:  brew install webp" >&2
  exit 1
}

convert_one() {
  local src="$1"
  local out="${src%.*}.webp"
  local resize=()
  # optionally cap the longest edge (only downscales; never upscales)
  if [ "$MAXPX" -gt 0 ] && command -v sips >/dev/null 2>&1; then
    local w h
    w=$(sips -g pixelWidth "$src" 2>/dev/null | awk '/pixelWidth/{print $2}')
    h=$(sips -g pixelHeight "$src" 2>/dev/null | awk '/pixelHeight/{print $2}')
    if [ -n "${w:-}" ] && [ -n "${h:-}" ]; then
      if [ "$w" -ge "$h" ] && [ "$w" -gt "$MAXPX" ]; then resize=(-resize "$MAXPX" 0)
      elif [ "$h" -gt "$w" ] && [ "$h" -gt "$MAXPX" ]; then resize=(-resize 0 "$MAXPX")
      fi
    fi
  fi
  cwebp -quiet -q "$QUALITY" ${resize[@]+"${resize[@]}"} "$src" -o "$out"
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
