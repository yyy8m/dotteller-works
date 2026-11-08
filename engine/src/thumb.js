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
  window.__thumbOpt = o;
  const bg = o.bg || ['#050203', '#3c060a'];
  // smooth background (real gradients, no dither mesh)
  let g = c.createLinearGradient(0, 0, 0, TH); g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]); c.fillStyle = g; c.fillRect(0, 0, TW, TH);
  const s = o.s || 3.5, f = o.face, fw = f.width * s, fh = f.height * s, fx = o.fx || (TW - fw / 2 - 4), fy = o.fy || (TH - fh / 2 + 2);
  // soft rim light behind the head
  g = c.createRadialGradient(fx, fy - fh * 0.1, fw * 0.15, fx, fy - fh * 0.1, fw * 0.62); g.addColorStop(0, o.rim || '#e02020'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.save(); c.globalAlpha = o.rimA || 0.55; c.fillStyle = g; c.fillRect(0, 0, TW, TH); c.restore();
  blit(c, f, fx, fy, f.width / 2, f.height / 2, { s });
  // optional glowing eyes (portrait coordinates)
  for (const [ex, ey] of (o.eyes || [])) { const gx = fx - fw / 2 + ex * s, gy = fy - fh / 2 + ey * s; g = c.createRadialGradient(gx, gy, 0, gx, gy, s * 3); g.addColorStop(0, 'rgba(255,60,60,0.8)'); g.addColorStop(1, 'rgba(255,0,0,0)'); c.fillStyle = g; c.fillRect(gx - s * 3, gy - s * 3, s * 6, s * 6); }
  // left side darkened smoothly so the words stand out
  g = c.createLinearGradient(0, 0, 200, 0); g.addColorStop(0, 'rgba(0,0,0,0.7)'); g.addColorStop(0.75, 'rgba(0,0,0,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, 200, TH);
  const tl = o.title || [WORK.title]; let y = 12;
  tl.forEach(line => { const sz = thumbFit(line, 164, 48); thumbText(c, line, 10, y, sz, o.tcol || C.white, '#000000', 3, '#5c0c10'); y += sz + 8; });
  if (o.hook) { const sz = thumbFit(o.hook, 164, 24), hw = thumbW(o.hook, sz); R(c, 6, y + 1, hw + 10, sz + 8, o.hbg || '#b01010'); thumbText(c, o.hook, 11, y + 5, sz, o.hcol || '#ffffff', '#000000', 2); }
  const lbl = SERIES[WORK.series].name + '#' + WORK.no, lw = thumbW(lbl, 16);
  R(c, TW - lw - 12, TH - 22, lw + 10, 20, 'rgba(0,0,0,0.6)'); TX(c, lbl, TW - lw - 7, TH - 20, BR.cream, 16, null);
}

/* ---- vertical thumbnail for Shorts: 180x320 (x6 = 1080x1920) built from the same options as the big-face thumbnail ---- */
const TTW = 180, TTH = 320, TT_SAFE = 34;
function drawThumbTall(t = 0) {
  window.__thumbOpt = null; drawThumb(t); const o = window.__thumbOpt;
  const [tc, c] = mk(TTW, TTH);
  if (!o) { c.drawImage(drawThumb(t), 70, 0, 180, 180, 0, 70, 180, 180); return tc; }
  const bg = o.bg || ['#050203', '#3c060a'];
  let g = c.createLinearGradient(0, 0, 0, TTH); g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]); c.fillStyle = g; c.fillRect(0, 0, TTW, TTH);
  // the face, big, in the lower half
    // TV / some apps crop a vertical thumbnail to about 2:3: keep everything inside the band TT_SAFE..TTH-TT_SAFE
  const f = o.face, s = 3.0, fw = f.width * s, fh = f.height * s, fx = TTW / 2, fy = TTH - TT_SAFE - fh / 2 + 6;
  g = c.createRadialGradient(fx, fy - fh * 0.1, fw * 0.12, fx, fy - fh * 0.1, fw * 0.62); g.addColorStop(0, o.rim || '#e02020'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.save(); c.globalAlpha = o.rimA || 0.55; c.fillStyle = g; c.fillRect(0, 0, TTW, TTH); c.restore();
  blit(c, f, fx, fy, f.width / 2, f.height / 2, { s });
  for (const [ex, ey] of (o.eyes || [])) { const gx = fx - fw / 2 + ex * s, gy = fy - fh / 2 + ey * s; g = c.createRadialGradient(gx, gy, 0, gx, gy, s * 3); g.addColorStop(0, 'rgba(255,60,60,0.8)'); g.addColorStop(1, 'rgba(255,0,0,0)'); c.fillStyle = g; c.fillRect(gx - s * 3, gy - s * 3, s * 6, s * 6); }
  // darken the top so the words stand out
  g = c.createLinearGradient(0, 0, 0, 190); g.addColorStop(0, 'rgba(0,0,0,0.75)'); g.addColorStop(0.7, 'rgba(0,0,0,0.4)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, TTW, 190);
  // title, centred, each line as big as fits
  const tl = o.title || [WORK.title]; let y = TT_SAFE + 4;
  tl.forEach(line => { const sz = thumbFit(line, 164, 42); thumbText(c, line, TTW / 2 - thumbW(line, sz) / 2, y, sz, o.tcol || C.white, '#000000', 3, '#5c0c10'); y += sz + 6; });
  if (o.hook) { const sz = thumbFit(o.hook, 160, 24), hw = thumbW(o.hook, sz), hx = TTW / 2 - hw / 2 - 5; R(c, hx, y + 2, hw + 10, sz + 8, o.hbg || '#b01010'); thumbText(c, o.hook, hx + 5, y + 6, sz, o.hcol || '#ffffff', '#000000', 2); }
  const lbl = SERIES[WORK.series].name + '#' + WORK.no, lw = thumbW(lbl, 16);
  R(c, TTW - lw - 12, TTH - TT_SAFE - 22, lw + 10, 20, 'rgba(0,0,0,0.6)'); TX(c, lbl, TTW - lw - 7, TTH - TT_SAFE - 20, BR.cream, 16, null);
  return tc;
}
