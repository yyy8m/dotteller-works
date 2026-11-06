/* ================= thumbnails: 320x180 (x4 = 1280x720) ================= */
/* each work may define THUMB(c, t) in <work>/thumb.js; helpers below keep the look consistent */
const TW = 320, TH = 180;
/* big text with a thick square outline (readable at phone size) */
function thumbText(c, str, x, y, size, col, ol = '#000000', r = 2, mid) {
  const so = textSpr(str, size, ol);
  for (let dy = -r; dy <= r + 1; dy++) for (let dx = -r; dx <= r + 1; dx++) c.drawImage(so, Math.round(x) + dx, Math.round(y) + dy);
  if (mid) c.drawImage(textSpr(str, size, mid), Math.round(x) + 1, Math.round(y) + 1);
  c.drawImage(textSpr(str, size, col), Math.round(x), Math.round(y));
  return textSpr(str, size, col).width - 2;
}
const thumbW = (str, size) => textSpr(str, size, '#ffffff').width - 2;
/* text fitted into a max width by shrinking the size */
function thumbFit(str, maxW, size) { while (size > 16 && thumbW(str, size) > maxW) size -= 2; return size; }
/* small brand badge: "ドット語り." + series #no */
function thumbBadge(c, x, y, t = 0) {
  const lbl = SERIES[WORK.series].name + ' #' + WORK.no, w = Math.max(logoMetrics(16).w, thumbW(lbl, 16)) + 12;
  R(c, x, y, w, 42, BR.dark); R(c, x + 1, y + 1, w - 2, 40, BR.cream); R(c, x + 2, y + 2, w - 4, 38, BR.dark);
  logoAt(c, x + 6, y + 3, 16, t); TX(c, lbl, x + 6, y + 21, BR.orange, 16, null);
}
/* a slanted caption band */
function thumbBand(c, str, x, y, size, bg, col) {
  const w = thumbW(str, size) + 16, h = size + 8;
  PF(c, [x + 6, y, x + w + 6, y, x + w, y + h, x, y + h], '#000000'); PF(c, [x + 8, y + 2, x + w + 3, y + 2, x + w - 2, y + h - 2, x + 3, y + h - 2], bg);
  TX(c, str, x + 8, y + 4, col, size, null);
}
/* radial "impact" lines behind a subject */
function thumbBurst(c, cx, cy, n, r0, r1, col, seed = 1) {
  for (let i = 0; i < n; i++) { const a = i / n * TAU + hash(seed + i) * 0.1, w = 0.03 + hash(seed * 7 + i) * 0.05;
    PF(c, [cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a - w) * r1, cy + Math.sin(a - w) * r1, cx + Math.cos(a + w) * r1, cy + Math.sin(a + w) * r1], col); }
}
function drawThumb(t = 0) {
  const [tc, x] = mk(TW, TH);
  if (typeof THUMB === 'function') THUMB(x, t);
  else { brandBg(x, 0, 0, TW, TH, t); const s = thumbFit(WORK.title, 280, 40); thumbText(x, WORK.title, 160 - thumbW(WORK.title, s) / 2, 60, s, C.uiY); thumbBadge(x, 8, 130, t); }
  return tc;
}

/* ---- big-face thumbnail template ----
   o = { face: 48x48 portrait sprite, s: face scale, eyes: [[x,y]...] in sprite px, title: ['line1','line2'], hook: 'one line',
         bg: [top, bottom], rim: color, light: true (lit from below), tcol: title color, hcol: hook color } */
function thumbBigFace(c, o, t = 0) {
  const bg = o.bg || ['#050203', '#2c0408'];
  VG(c, 0, 0, TW, TH, [bg[0], bg[0], bg[1]]);
  const s = o.s || 3.6, f = o.face, fw = f.width * s, fh = f.height * s, fx = TW - fw / 2 - 6, fy = TH - fh / 2 + 10;
  E(c, fx, fy - 6, fw * 0.55, fh * 0.5, DA(o.rim || '#c81818', 0.22)); E(c, fx, fy - 6, fw * 0.45, fh * 0.42, DA(o.rim || '#c81818', 0.18));
  blit(c, f, fx, fy, f.width / 2, f.height / 2, { s });
  if (o.light !== false) { for (let r = 0; r < 9; r++) { c.fillStyle = DA('#000000', 0.62 - r * 0.07); c.fillRect(fx - fw / 2, fy - fh / 2 + r * fh / 18, fw, fh / 18 + 1); } }
  for (const [ex, ey] of (o.eyes || [])) { const gx = fx - fw / 2 + ex * s, gy = fy - fh / 2 + ey * s; R(c, gx, gy, Math.max(2, s * 0.7), Math.max(2, s * 0.7), '#ffffff'); E(c, gx + 1, gy + 1, 6, 4, DA('#ff4040', 0.35)); }
  const tl = o.title || [WORK.title]; let y = 14;
  tl.forEach(line => { const sz = thumbFit(line, 168, 48); thumbText(c, line, 10, y, sz, o.tcol || C.white, '#000000', 3, '#5c0c10'); y += sz + 8; });
  if (o.hook) { const sz = thumbFit(o.hook, 176, 24); thumbText(c, o.hook, 10, y + 4, sz, o.hcol || '#ff4848', '#000000', 2); }
  const lbl = SERIES[WORK.series].name + '#' + WORK.no, lw = thumbW(lbl, 16);
  R(c, TW - lw - 12, TH - 22, lw + 10, 20, DA('#000000', 0.6)); TX(c, lbl, TW - lw - 7, TH - 20, BR.cream, 16, null);
}
