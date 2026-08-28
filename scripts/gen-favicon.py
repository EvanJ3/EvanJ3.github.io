#!/usr/bin/env python3
"""Render the homepage Mandelbrot into favicon PNG/ICO, matching js/mandelbrot.js palette."""
import struct, zlib, math

MAX = 90
# palette from mandelbrot.js paint(): far-field graphite -> boundary cyan-blue
# base #0d1117 (13,17,23), delta to #58a6ff over b=(it/MAX)^1.55
def color(it):
    if it >= MAX:
        return (13, 17, 23)            # interior = graphite
    # favicon ramp: brighter than the hero so the shape reads at 16px.
    # gamma<1 lifts the mid iterations; top of range blooms toward white-cyan.
    t = it / MAX
    b = t ** 0.6
    r = 13 + (88 - 13) * b
    g = 17 + (166 - 17) * b
    bl = 23 + (255 - 23) * b
    if b > 0.75:                        # white-hot glow on the boundary itself
        h = (b - 0.75) / 0.25
        r += (200 - r) * h; g += (225 - g) * h; bl += (255 - bl) * h
    return (int(r), int(g), int(bl))

def escape(cr, ci):
    x = y = x2 = y2 = 0.0
    it = 0
    while x2 + y2 <= 4.0 and it < MAX:
        y = 2 * x * y + ci
        x = x2 - y2 + cr
        x2 = x * x; y2 = y * y
        it += 1
    return it

def render(size, cx, cy, span, ss=4):
    """Render size x size RGB, supersampled ss x then box-downsampled."""
    W = size * ss
    half = span / 2
    minR = cx - half
    minI = cy - half
    step = span / W
    # accumulate into downsampled buffer
    out = [[0, 0, 0] for _ in range(size * size)]
    for py in range(W):
        ci = minI + step * py
        oy = py // ss
        for px in range(W):
            cr = minR + step * px
            r, g, b = color(escape(cr, ci))
            o = (oy * size) + (px // ss)
            out[o][0] += r; out[o][1] += g; out[o][2] += b
    n = ss * ss
    data = bytearray()
    for o in range(size * size):
        px = out[o]
        data.append(px[0] // n); data.append(px[1] // n); data.append(px[2] // n)
    return bytes(data), size

def png_bytes(rgb, size):
    # add filter byte 0 per row
    raw = bytearray()
    stride = size * 3
    for y in range(size):
        raw.append(0)
        raw.extend(rgb[y * stride:(y + 1) * stride])
    def chunk(typ, d):
        c = struct.pack(">I", len(d)) + typ + d
        return c + struct.pack(">I", zlib.crc32(typ + d) & 0xffffffff)
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)  # 8-bit RGB
    idat = zlib.compress(bytes(raw), 9)
    return sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")

def write_png(path, cx, cy, span, size):
    rgb, s = render(size, cx, cy, span)
    with open(path, "wb") as f:
        f.write(png_bytes(rgb, s))

def write_ico(path, cx, cy, span, sizes=(16, 32, 48, 64)):
    imgs = []
    for s in sizes:
        rgb, _ = render(s, cx, cy, span)
        imgs.append((s, png_bytes(rgb, s)))
    # ICO header
    out = bytearray()
    out += struct.pack("<HHH", 0, 1, len(imgs))
    offset = 6 + 16 * len(imgs)
    for s, png in imgs:
        w = 0 if s >= 256 else s
        out += struct.pack("<BBBBHHII", w, w, 0, 0, 1, 32, len(png), offset)
        offset += len(png)
    for _, png in imgs:
        out += png
    with open(path, "wb") as f:
        f.write(out)

if __name__ == "__main__":
    import sys
    D = sys.argv[1]
    # Option A: full set (homepage view, squared) — cx=-0.55
    write_png(f"{D}/opt_a_full.png", -0.55, 0.0, 3.0, 256)
    # Option B: left cusp / seahorse valley detail — boundary filigree
    write_png(f"{D}/opt_b_valley.png", -0.75, 0.10, 0.16, 256)
    # Option C: mini-mandelbrot on the antenna (self-similar), high boundary contrast
    write_png(f"{D}/opt_c_mini.png", -1.7495, 0.0, 0.08, 256)
    print("done")
