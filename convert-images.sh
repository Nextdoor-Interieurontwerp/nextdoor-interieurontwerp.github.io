#!/bin/bash

find /Volumes/dev/nl.nextdoorinterieurontwerp/website/public/images \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) \
  | grep -v pwa | grep -v apple-touch | grep -v favicon | grep -v "logo\." \
  | while read f; do
      dst="${f%.*}.webp"
      w=$(sips -g pixelWidth "$f" 2>/dev/null | awk '/pixelWidth/{print $2}')
      w=${w:-0}
      if [[ "$f" == *"/projects/"* ]] || [[ "$f" == *"/impressie/"* ]]; then
        if [ "$w" -gt 1600 ]; then
          cwebp -q 82 -resize 1600 0 "$f" -o "$dst" 2>/dev/null
        else
          cwebp -q 82 "$f" -o "$dst" 2>/dev/null
        fi
      else
        cwebp -q 85 "$f" -o "$dst" 2>/dev/null
      fi
      orig=$(stat -f%z "$f")
      new=$(stat -f%z "$dst" 2>/dev/null || echo 0)
      echo "$(basename $f) -> $(basename $dst): ${orig} -> ${new} bytes"
    done
