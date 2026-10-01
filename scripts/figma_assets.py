#!/usr/bin/env python3
"""
Export every image asset from the Figma file into public/assets/.

Two export paths:
  * IMAGE fills  -> /v1/images/{imageRef}  returns the raw photo, no frame chrome.
  * VECTOR nodes -> node render as SVG      (icons, logos, decorative shapes)

Assets are named from their ancestor context so filenames are readable
(e.g. "card-learn-frontend.png", "avatar-sarah.png").
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from figma_extract import load, find, walk  # noqa: E402

TOKEN = os.environ["FIGMA_TOKEN"]
FILE_KEY = os.environ.get("FIGMA_FILE_KEY", "OfiTDVmxnfjhcKcdLVtk0A")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "assets")
ROOT = find(load()["document"], "0:1")  # the "Design" canvas

# Ancestor name fragments that describe what an asset *is*, longest match wins.
CONTEXT_HINTS = [
    ("cone", "shape-cone"), ("blob", "shape-blob"), ("squiggle", "shape-squiggle"),
    ("triangle", "shape-triangle"), ("star", "shape-star"),
    ("avatar", "avatar"), ("ellipse", "avatar"),
    ("testimonial", "testimonial"), ("instructor", "instructor"),
    ("card", "card"), ("frame", "card"),
    ("hero", "hero"), ("image", "photo"),
]


def slug(text):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text or "").strip("-").lower()
    return re.sub(r"-{2,}", "-", s)[:48] or "asset"


def context_name(node, parents):
    """Build a descriptive filename stem from the node and its ancestors."""
    chain = parents + [node.get("name", "")]
    for hint, label in CONTEXT_HINTS:
        for part in chain:
            if hint in part.lower():
                return label
    return "img"


def collect():
    """Walk the Design canvas, grouping nodes by imageRef and collecting vectors."""
    images, vectors = {}, []

    def visit(node, parents):
        name = node.get("name", "")
        nxt = parents + [name]
        for f in node.get("fills", []) or []:
            if f.get("type") == "IMAGE" and f.get("imageRef"):
                ref = f["imageRef"]
                if ref not in images:
                    images[ref] = {
                        "stem": "%s-%s" % (context_name(node, parents), slug(name)),
                        "id": node["id"],
                        "w": round((node.get("absoluteBoundingBox") or {}).get("width", 0)),
                        "h": round((node.get("absoluteBoundingBox") or {}).get("height", 0)),
                    }
        # Vectors: icons and decorative shapes, not huge illustrations
        if node.get("type") == "VECTOR":
            b = node.get("absoluteBoundingBox") or {}
            w, h = b.get("width", 0), b.get("height", 0)
            if 0 < w <= 260 and 0 < h <= 260:
                vectors.append({
                    "id": node["id"],
                    "stem": "%s-%s" % (context_name(node, parents), slug(name)),
                    "w": round(w), "h": round(h),
                })
        for c in node.get("children", []) or []:
            visit(c, nxt)

    for page in ROOT.get("children", []):
        visit(page, [page.get("name", "")])
    return images, vectors


def get(url):
    req = urllib.request.Request(url, headers={"X-Figma-Token": TOKEN})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "figma-export"})
    with urllib.request.urlopen(req) as r, open(path, "wb") as fh:
        fh.write(r.read())


def batched(items, size=40):
    for i in range(0, len(items), size):
        yield items[i:i + size]


def main():
    os.makedirs(OUT, exist_ok=True)
    images, vectors = collect()
    print("found %d unique images, %d vectors" % (len(images), len(vectors)))

    # 1. raw image fills. GET /v1/files/{key}/images returns EVERY imageRef in the
    #    file at once, which is exactly what we need - no per-ref request.
    used = set()
    data = get("https://api.figma.com/v1/files/%s/images" % FILE_KEY)
    pool = data.get("meta", {}).get("images", {})
    for ref, meta in images.items():
        url = pool.get(ref)
        if not url:
            print("  MISS %s (%s)" % (ref[:10], meta["stem"]))
            continue
        stem, i = meta["stem"], 2
        while stem in used:
            stem, i = "%s-%d" % (meta["stem"], i), i + 1
        used.add(stem)
        path = os.path.join(OUT, stem + ".png")
        download(url, path)
        print("  img  %-46s %s" % (stem + ".png", "%sx%s" % (meta["w"], meta["h"])))

    # 2. vectors as SVG, via the node render endpoint
    seen_ids = set()
    vlist = [v for v in vectors if not (v["id"] in seen_ids or seen_ids.add(v["id"]))]
    for chunk in batched(vlist, 30):
        ids = ",".join(v["id"] for v in chunk)
        url = ("https://api.figma.com/v1/images/%s?ids=%s&format=svg&svg_include_id=false"
               % (FILE_KEY, urllib.parse.quote(ids, safe=",")))
        data = get(url)
        for v in chunk:
            link = (data.get("images") or {}).get(v["id"])
            if not link:
                continue
            stem, i = v["stem"], 2
            while stem in used:
                stem, i = "%s-%d" % (v["stem"], i), i + 1
            used.add(stem)
            path = os.path.join(OUT, stem + ".svg")
            download(link, path)
            print("  vec  %-46s %s" % (stem + ".svg", "%sx%s" % (v["w"], v["h"])))
        time.sleep(0.3)

    print("done -> %s" % OUT)


if __name__ == "__main__":
    main()
