#!/usr/bin/env python3
"""
Figma REST API -> compact, human-readable design spec.

The raw Figma file JSON is ~3.3MB and unreadable. This tool walks the node tree
and emits a condensed spec (layout boxes, fills, radii, text styles) that can be
translated directly into Tailwind/Tsx.

Usage:
    python scripts/figma_extract.py styles              # published design tokens
    python scripts/figma_extract.py tree 1:1067          # spec for one node
    python scripts/figma_extract.py tree 1:1067 --depth 3
    python scripts/figma_extract.py pages                # list frames
    python scripts/figma_extract.py images 1:1067        # list image fills in node
"""

import argparse
import json
import os
import sys

FILE_KEY = os.environ.get("FIGMA_FILE_KEY", "OfiTDVmxnfjhcKcdLVtk0A")
DATA = os.path.join(os.path.dirname(__file__), "..", ".figma", "file_full.json")


def load():
    with open(DATA, encoding="utf-8") as fh:
        return json.load(fh)


def rgb(c, opacity=None):
    """Figma RGBA (0-1 floats) -> CSS hex / rgba()."""
    if not c:
        return None
    r, g, b = c.get("r", 0), c.get("g", 0), c.get("b", 0)
    a = c.get("a", 1)
    if opacity is not None:
        a = a * opacity
    if a >= 0.999:
        return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))
    return "rgba(%d, %d, %d, %s)" % (
        round(r * 255), round(g * 255), round(b * 255), round(a, 3),
    )


def find(node, node_id):
    """Depth-first search for a node id."""
    if node.get("id") == node_id:
        return node
    for child in node.get("children", []) or []:
        hit = find(child, node_id)
        if hit:
            return hit
    return None


def solid_fills(node):
    """Visible solid fill colors, most specific first."""
    out = []
    for fill in node.get("fills", []) or []:
        if fill.get("visible") is False:
            continue
        if fill.get("type") == "SOLID":
            out.append(rgb(fill.get("color"), fill.get("opacity")))
        elif fill.get("type", "").startswith("GRADIENT"):
            stops = [
                "%s %d%%" % (rgb(s.get("color")), round(s.get("position", 0) * 100))
                for s in fill.get("gradientStops", [])
            ]
            out.append("%s(%s)" % (fill["type"], " ".join(stops)))
        elif fill.get("type") == "IMAGE":
            out.append("IMAGE:%s" % fill.get("imageRef", "?")[:8])
    return out


def radius(node):
    r = node.get("cornerRadius")
    if r is None and node.get("rectangleCornerRadii"):
        r = node["rectangleCornerRadii"][0]
    return r


def effects(node):
    out = []
    for e in node.get("effects", []) or []:
        if e.get("visible") is False:
            continue
        if e["type"] == "DROP_SHADOW":
            c = e.get("color", {})
            out.append("shadow %s %sY%sB%sS rgba(%d,%d,%d,%.3f)" % (
                e.get("offset", {}).get("x", 0), e.get("offset", {}).get("y", 0),
                e.get("spread", ""), e.get("radius", ""),
                round(c.get("r", 0) * 255), round(c.get("g", 0) * 255),
                round(c.get("b", 0) * 255), c.get("a", 0),
            ))
        elif e["type"] == "LAYER_BLUR":
            out.append("blur %s" % e.get("radius"))
    return out


def text_spec(node):
    """Typographic properties of a TEXT node."""
    s = node.get("style", {})
    bits = [
        "font=%s" % s.get("fontFamily", "?"),
        "size=%s" % s.get("fontSize"),
        "weight=%s" % s.get("fontWeight"),
        "lh=%s" % s.get("lineHeightPx"),
        "ls=%s" % s.get("letterSpacing"),
    ]
    if s.get("lineHeightPercentFontSize"):
        bits.append("lh%%=%s" % round(s["lineHeightPercentFontSize"]))
    if s.get("lineHeightUnit") in ("PIXELS", None) and s.get("lineHeightPx"):
        bits.append("lhUnit=px")
    else:
        bits.append("lhUnit=%s" % s.get("lineHeightUnit"))
    if s.get("italic"):
        bits.append("italic")
    fills = solid_fills(node)
    if fills:
        bits.append("color=%s" % fills[0])
    if s.get("textAlignHorizontal") and s["textAlignHorizontal"] != "LEFT":
        bits.append("align=%s" % s["textAlignHorizontal"])
    if s.get("textCase") == "UPPER":
        bits.append("UPPER")
    if s.get("textDecoration") == "UNDERLINE":
        bits.append("underline")
    return " ".join(str(b) for b in bits)


def tree(node, depth=0, max_depth=6, out=None):
    if out is None:
        out = []
    pad = "  " * depth
    kind = node.get("type", "?")
    bbox = node.get("absoluteBoundingBox") or {}
    geo = ""
    if bbox:
        geo = " @(%s,%s) %sx%s" % (
            round(bbox.get("x", 0)), round(bbox.get("y", 0)),
            round(bbox.get("width", 0)), round(bbox.get("height", 0)),
        )
    layout = node.get("layoutMode")
    if layout:
        gap = node.get("itemSpacing", 0)
        padd = "p=%s/%s" % (node.get("paddingTop"), node.get("paddingLeft"))
        geo += " %s gap=%s %s" % (layout.lower(), gap, padd)

    meta = []
    fills = solid_fills(node)
    if fills:
        meta.append("fill=%s" % ",".join(fills[:3]))
    r = radius(node)
    if r is not None:
        meta.append("r=%s" % r)
    if node.get("strokeWeight"):
        meta.append("stroke=%s %s" % (node.get("strokeWeight"), solid_fills({"fills": node.get("strokes", [])})))
    meta += effects(node)
    if node.get("opacity") not in (None, 1):
        meta.append("op=%s" % round(node["opacity"], 2))
    if node.get("clipsContent"):
        meta.append("clip")

    if kind == "TEXT":
        chars = node.get("characters", "")
        label = repr(chars[:70] + ("..." if len(chars) > 70 else ""))
        out.append("%sTEXT %r%s | %s" % (pad, label, geo, text_spec(node)))
    else:
        out.append("%s%s %s%s%s" % (
            pad, kind, repr(node.get("name", ""))[:46], geo,
            " | " + " ".join(meta) if meta else "",
        ))

    if depth < max_depth:
        for child in node.get("children", []) or []:
            tree(child, depth + 1, max_depth, out)
    return out


def cmd_styles(data):
    styles = data.get("styles", {})
    fills, texts = {}, {}
    for sid, st in styles.items():
        (fills if st["styleType"] == "FILL" else texts)[st["name"]] = st["key"]
    print("=== FILL STYLES (%d) ===" % len(fills))
    for name in sorted(fills):
        print("  %s" % name)
    print("\n=== TEXT STYLES (%d) ===" % len(texts))
    for name in sorted(texts):
        print("  %s" % name)


def walk(node):
    stack = [node]
    while stack:
        n = stack.pop()
        yield n
        stack.extend(n.get("children", []) or [])


def cmd_tokens(data):
    """Resolve real token VALUES by aggregating usage across the whole file."""
    text, colors, radii, shadows = {}, {}, {}, {}

    for n in walk(data["document"]):
        for f in n.get("fills", []) or []:
            if f.get("visible") is False or f.get("type") != "SOLID":
                continue
            hexv = rgb(f.get("color"), f.get("opacity"))
            colors[hexv] = colors.get(hexv, 0) + 1
        r = radius(n)
        if r is not None and n.get("type") in ("FRAME", "RECTANGLE", "COMPONENT", "VECTOR", "INSTANCE"):
            radii[r] = radii.get(r, 0) + 1
        for e in n.get("effects", []) or []:
            if e.get("type") == "DROP_SHADOW" and e.get("visible") is not False:
                c = e.get("color", {})
                key = "0 %s %s %s rgba(%d,%d,%d,%.2f)" % (
                    round(e.get("offset", {}).get("y", 0)), e.get("spread", ""),
                    e.get("radius", ""), round(c.get("r", 0) * 255),
                    round(c.get("g", 0) * 255), round(c.get("b", 0) * 255), c.get("a", 0),
                )
                shadows[key] = shadows.get(key, 0) + 1
        if n.get("type") == "TEXT":
            s = n.get("style", {})
            key = "%s | %s | %s | %s | %s | %s" % (
                s.get("fontFamily"), s.get("fontSize"), s.get("fontWeight"),
                s.get("lineHeightPx"), s.get("letterSpacing"),
                (solid_fills(n) or [None])[0],
            )
            entry = text.setdefault(key, [0, n.get("characters", "")[:44]])
            entry[0] += 1

    print("=== COLORS by usage (%d unique) ===" % len(colors))
    for c, count in sorted(colors.items(), key=lambda kv: -kv[1]):
        print("  %-22s x%-4d" % (c, count))

    print("\n=== RADII ===")
    for r, count in sorted(radii.items(), key=lambda kv: -kv[1]):
        print("  %-8s x%d" % (r, count))

    print("\n=== SHADOWS ===")
    for s, count in sorted(shadows.items(), key=lambda kv: -kv[1]):
        print("  %-52s x%d" % (s, count))

    print("\n=== TEXT STYLES by usage (%d unique) ===" % len(text))
    for key, (count, sample) in sorted(text.items(), key=lambda kv: -kv[1][0]):
        print("  x%-4d %s" % (count, key))
        if sample:
            print("          e.g. %r" % sample)


def cmd_pages(data):
    for page in data["document"]["children"]:
        print("PAGE %s (%s)" % (page["name"], page["id"]))
        for c in page.get("children", []):
            b = c.get("absoluteBoundingBox") or {}
            print("   %-9s %-40s %sx%s  id=%s" % (
                c["type"], c["name"][:40],
                round(b.get("width", 0)), round(b.get("height", 0)), c["id"],
            ))


def cmd_tree(data, node_id, depth):
    node = find(data["document"], node_id)
    if not node:
        sys.exit("node %s not found" % node_id)
    print("\n".join(tree(node, 0, depth)))
    print("\n--- RENDERS ---")
    for c in node.get("children", []):
        b = c.get("absoluteBoundingBox") or {}
        if b:
            print("  %sx%s  %s  (%s)" % (
                round(b["width"]), round(b["height"]), c["name"], c["id"]))


def cmd_images(data, node_id):
    """List every image fill beneath a node, with its name and export size."""
    node = find(data["document"], node_id)
    if not node:
        sys.exit("node %s not found" % node_id)
    seen = []
    stack = [node]
    while stack:
        n = stack.pop()
        for fill in n.get("fills", []) or []:
            if fill.get("type") == "IMAGE":
                b = n.get("absoluteBoundingBox") or {}
                seen.append((fill.get("imageRef", ""), n.get("name", ""),
                             round(b.get("width", 0)), round(b.get("height", 0)), n["id"]))
        stack.extend(n.get("children", []) or [])
    for ref, name, w, h, nid in seen:
        print("%s  %-38s %4sx%-4s  %s" % (ref[:12], name[:38], w, h, nid))
    print("total: %d" % len(seen))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["styles", "pages", "tree", "images", "tokens"])
    ap.add_argument("node", nargs="?")
    ap.add_argument("--depth", type=int, default=6)
    a = ap.parse_args()
    data = load()
    if a.cmd == "tokens":
        cmd_tokens(data)
    elif a.cmd == "styles":
        cmd_styles(data)
    elif a.cmd == "pages":
        cmd_pages(data)
    elif a.cmd == "tree":
        cmd_tree(data, a.node, a.depth)
    elif a.cmd == "images":
        cmd_images(data, a.node)


if __name__ == "__main__":
    main()
