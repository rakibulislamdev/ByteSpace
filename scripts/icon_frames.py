#!/usr/bin/env python3
"""
Recover the designed icon frame for every exported glyph.

public/assets/icons/*.svg are node renders cropped to the vector, so the
frame box is lost. In the Figma file each glyph is an INSTANCE frame
(usually 24x24) with the vector optically inset inside it, and that frame
is what sets the glyph's designed optical size. Rendering the cropped
vector in a square box inflates every glyph to fill its box, so glyphs of
differing aspect ratios sit at visibly different weights beside each
other - a 16x16 funnel and an 18x12 sort icon both fill their box, and the
sort bars end up 12px tall against the funnel's 20px.

The cached file carries every vector's bounding box and its parent frame's
but no path data, so vectors are matched to their exported SVG by size.
Figma's render rounds dimensions to whole pixels, so an exact key is
wrong - the filter funnel is 15.91x16 in Figma and exports as 16x16, which
collides with an unrelated 16x16 vector. Matching takes the NEAREST vector
size instead, and reports anything it is not confident about rather than
guessing.

Ground truth for the four courses/creator filter controls, read straight
off the Search Page frame, is asserted below; if the match disagrees the
script fails loudly instead of emitting a wrong frame.

Writes .figma/icon_frames.json: { stem: [frame_w, frame_h] }.

Run:  python scripts/icon_frames.py
"""

import json
import math
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "public", "assets", "icons")
FIGMA = os.path.join(ROOT, ".figma", "file_full.json")
OUT = os.path.join(ROOT, ".figma", "icon_frames.json")

SIZE_RE = re.compile(r'\bwidth="([\d.]+)"\s+height="([\d.]+)"')

# Figma's SVG render rounds to whole pixels, so a vector can export up to
# 0.5px off in each axis. Anything further apart is a different vector.
TOLERANCE = 0.75

# A vector is only an icon if its container is icon-sized and close to
# square. Without this, a 29x32 vector sitting in a 167x41 partner-logo row
# matches that row and the glyph gets padded to a 171x37 box.
MAX_FRAME = 96.0
MIN_SQUARENESS = 0.75

# Verified against the Search Page frame (55:170 and siblings): these four
# are all 24x24 instances wrapping a smaller vector.
GROUND_TRUTH = {
    "filter": (24.0, 24.0),
    "chevron-down": (24.0, 24.0),
    "align-left": (24.0, 24.0),
    "star-muted": (24.0, 24.0),
}


def is_icon_frame(frame):
    w, h = frame
    if max(w, h) > MAX_FRAME:
        return False
    return min(w, h) / max(w, h) >= MIN_SQUARENESS


def natural_size(raw):
    m = SIZE_RE.search(raw)
    if not m:
        return None
    return (float(m.group(1)), float(m.group(2)))


def index_vectors(doc):
    """[(vector w, h)] -> {frame size: count}, for icon-framed vectors."""
    table = {}

    def visit(node):
        fb = node.get("absoluteBoundingBox") or {}
        frame = (round(fb.get("width", 0), 2), round(fb.get("height", 0), 2))
        usable = frame[0] and frame[1] and is_icon_frame(frame)
        for child in node.get("children") or []:
            if child.get("type") == "VECTOR":
                vb = child.get("absoluteBoundingBox") or {}
                key = (round(vb.get("width", 0), 2), round(vb.get("height", 0), 2))
                if key[0] and key[1] and usable:
                    table.setdefault(key, {})
                    table[key][frame] = table[key].get(frame, 0) + 1
            visit(child)

    visit(doc)
    return table


def nearest(size, table):
    """Closest vector size, then the most common frame for that vector."""
    best, best_d = None, None
    for key in table:
        d = math.hypot(key[0] - size[0], key[1] - size[1])
        if best_d is None or d < best_d:
            best, best_d = key, d
    if best is None or best_d > TOLERANCE:
        return None, None, best_d
    frames = table[best]
    frame = max(frames.items(), key=lambda kv: kv[1])[0]
    return frame, len(frames), best_d


def main():
    with open(FIGMA, encoding="utf-8") as fh:
        data = json.load(fh)
    table = index_vectors(data.get("document", data))

    frames, notes = {}, []
    for name in sorted(f for f in os.listdir(SRC) if f.endswith(".svg")):
        stem = name[:-4]
        with open(os.path.join(SRC, name), encoding="utf-8") as fh:
            size = natural_size(fh.read())
        if not size:
            notes.append("%s: no width/header" % stem)
            continue
        frame, n_frames, dist = nearest(size, table)
        if frame is None:
            # No instance wraps this vector; its own box is all we know.
            frames[stem] = [round(size[0], 2), round(size[1], 2)]
            notes.append("%s: no frame, kept vector box %s" % (stem, size))
            continue
        frames[stem] = list(frame)
        if n_frames > 1:
            notes.append(
                "%s: %s matched %s -> %s (%d candidate frames)"
                % (stem, size, (round(size[0], 2), round(size[1], 2)), frame, n_frames)
            )

    for stem, expected in GROUND_TRUTH.items():
        got = tuple(frames.get(stem, ()))
        if got != expected:
            raise SystemExit(
                "ground truth check failed: %s resolved to %s, Figma says %s"
                % (stem, got, expected)
            )

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(frames, fh, indent=2, sort_keys=True)
    print("resolved %d icons -> %s" % (len(frames), OUT))
    for n in notes:
        print("  note:", n)


if __name__ == "__main__":
    main()
