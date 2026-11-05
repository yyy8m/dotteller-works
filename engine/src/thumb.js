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
