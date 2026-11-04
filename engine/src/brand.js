/* ================= DOT TELLER branding: logo, intro scene, title, video frames ================= */
const BR = { bg: '#0c2418', bg2: '#123222', bg3: '#1c4430', cream: '#f4ecd8', orange: '#f49a1c', dark: '#06140c', paper: '#ecdcb4', paper2: '#d4bc8c', ink: '#2c2018' };
const SERIES = { bunko: { name: '文庫', narrator: 'narrator' }, kiroku: { name: '記録', narrator: 'lamp' } };
const GLYPH = {
  D: ['####.', '#...#', '#...#', '#...#', '####.'], O: ['.###.', '#...#', '#...#', '#...#', '.###.'], T: ['#####', '..#..', '..#..', '..#..', '..#..'],
  E: ['#####', '#....', '####.', '#....', '#####'], L: ['#....', '#....', '#....', '#....', '#####'], R: ['####.', '#...#', '####.', '#..#.', '#...#'], ' ': ['..', '..', '..', '..', '..'], '.': ['.', '.', '.', '.', '#']
};
function blockText(c, str, x, y, s, col, sh) {
  let cx = x;
  for (const ch of str) {
    const g = GLYPH[ch]; if (!g) { cx += 4 * s; continue; }
    for (let r = 0; r < 5; r++) for (let k = 0; k < g[r].length; k++) if (g[r][k] === '#') { if (sh) R(c, cx + k * s + Math.max(1, s / 3), y + r * s + Math.max(1, s / 3), s, s, sh); R(c, cx + k * s, y + r * s, s, s, col); }
    cx += (g[0].length + 1) * s;
  }
  return cx - x - s;
}
const blockW = (str, s) => { let w = 0; for (const ch of str) w += ((GLYPH[ch] ? GLYPH[ch][0].length : 3) + 1) * s; return w - s; };
function logoLine(c, cx, y, s, t) { // "DOT TELLER." centered
  const w = blockW('DOT TELLER', s) + s * 2, x = Math.round(cx - w / 2);
  const x2 = x + blockText(c, 'DOT ', x, y, s, BR.cream, BR.dark) + s;
  const x3 = x2 + blockText(c, 'TELLER', x2, y, s, BR.cream, BR.dark);
  const on = (Math.floor(t * 2) & 1) === 0;
  R(c, x3 + s, y + 4 * s, s, s, on ? BR.orange : '#b06c10');
  return w;
}
function logoStack(c, cx, y, s, t) { // DOT over TELLER (icon style)
  const w1 = blockW('DOT', s), w2 = blockW('TELLER', s);
  blockText(c, 'DOT', Math.round(cx - w1 / 2), y, s, BR.cream, BR.dark);
  blockText(c, 'TELLER', Math.round(cx - w2 / 2), y + 6 * s, s, BR.orange, BR.dark);
  const sx = Math.round(cx + w1 / 2 + s), sy = y - s, k = (Math.floor(t * 3) % 3);
  if (k) { P(c, sx + 1, sy, BR.cream); P(c, sx, sy + 1, BR.cream); P(c, sx + 2, sy + 1, BR.cream); P(c, sx + 1, sy + 2, BR.cream); }
}
function brandBg(c, x, y, w, h, t) {
  R(c, x, y, w, h, BR.bg);
  c.fillStyle = DP(BR.bg, BR.bg2, 4); c.fillRect(x, y, w, h);
  for (let i = 0; i < 40; i++) { // drifting dust / ink motes
    const px = x + mod(hash(i * 7) * w + t * (2 + hash(i) * 5), w), py = y + mod(hash(i * 3) * h - t * (3 + hash(i * 5) * 6), h);
    if ((Math.floor(t * 4) + i) % 5) P(c, px, py, i % 7 === 0 ? BR.orange : BR.bg3);
  }
}
function pxFrame(c, x, y, w, h) { R(c, x - 3, y - 3, w + 6, h + 6, BR.dark); R(c, x - 2, y - 2, w + 4, h + 4, BR.cream); R(c, x - 1, y - 1, w + 2, h + 2, BR.dark); for (const [a, b] of [[x - 3, y - 3], [x + w + 1, y - 3], [x - 3, y + h + 1], [x + w + 1, y + h + 1]]) R(c, a, b, 2, 2, BR.orange); }
function vText(c, str, x, y, col, size = 16) { let yy = y; for (const ch of str) { TX(c, ch, x, yy, col, size, BR.dark); yy += size + 1; } return yy; }
function narratorSpr(t, expr, mouth) { return facePortrait(SERIES[WORK.series].narrator, { t, mouth: mouth || 0, blink: blinkOf(t, 99), expr: expr || 'normal' }); }

/* ---- S0: brand intro (narrator unrolls a scroll) ---- */
const S0 = {
  name: 'DOT TELLER', bgm: null,
  init(S) { const L = S.lines[0]; S.dur = L.se + 1.3; },
  sfx(S, ev) { ev(0.35, 'end'); ev(1.0, 'shine', 0.6); },
  draw(c, t, S) {
    brandBg(c, 0, 0, W, H, t);
    logoLine(c, 160, 12, 3, t);
    TX(c, SERIES[WORK.series].name + '　#' + WORK.no, 160 - 40, 34, BR.orange);
    // scroll unrolling
    const k = eOut(sg(t, 0.6, 1.5)), sw = Math.round(170 * k), sx = 210 - sw / 2;
    if (k > 0) {
      R(c, sx, 64, sw, 92, BR.paper); c.fillStyle = DP(BR.paper, BR.paper2, 3); c.fillRect(sx, 64, sw, 92);
      R(c, sx, 66, sw, 1, BR.paper2); R(c, sx, 153, sw, 1, BR.paper2);
      if (k > 0.85) {
        const a = sg(t, 1.3, 1.9), tw = textSpr(WORK.title, 32, BR.ink).width;
        if (a > 0) { const s = ditherFade(textSpr(WORK.title, 32, BR.ink), a, 'ttl'); c.drawImage(s, Math.round(210 - tw / 2), 82); }
        if (t > 1.8) TX(c, WORK.author, 210 - textSpr(WORK.author, 16, BR.ink).width / 2, 126, BR.ink, 16, null);
      }
      for (const ex of [sx - 5, sx + sw]) { R(c, ex, 58, 5, 104, '#5c3c24'); R(c, ex + 1, 58, 1, 104, '#8c6440'); R(c, ex - 1, 56, 7, 3, BR.orange); R(c, ex - 1, 161, 7, 3, BR.orange); }
    }
    // narrator, 2x, breathing, with soft glow
    const br = Math.round(Math.sin(t * 2.2) * 1);
    E(c, 64, 110, 52, 52, DA(BR.bg3, 0.6)); E(c, 64, 110, 40, 40, DA(C.gold0, 0.08 + 0.04 * Math.sin(t * 3)));
    const L = S.lines[0], lt = t - L.t0; let mo = 0; if (lt > 0 && lt < L.se - L.t0) { const v = L.env[Math.floor(lt * 60)] || 0; mo = v > 0.5 ? 2 : v > 0.16 ? 1 : 0; }
    blit(c, narratorSpr(t, t > 1.5 ? 'smile' : 'normal', mo), 64, 110 + br, 25, 25, { s: 2 });
    for (let i = 0; i < 8; i++) { const u = fr(t * 0.4 + i / 8), x = 40 + hash(i) * 50, y = 150 - u * 90; if (u < 0.9) P(c, x + Math.sin(t * 2 + i) * 3, y, i & 1 ? C.gold0 : BR.cream); }
    return { z: 1 + 0.05 * ss(t / S.dur), fx: 160, fy: 100 };
  }
};

/* ---- title screen (before start) ---- */
function drawTitle(t, fade) {
  const c = ctx; brandBg(c, 0, 0, W, H, t);
  logoLine(c, 160, 14, 3, t);
  TX(c, SERIES[WORK.series].name + '　#' + WORK.no, 120, 36, BR.orange);
  if (typeof TITLE_DECO === 'function') TITLE_DECO(c, t);
  const tt = textSpr(WORK.title, 32, C.uiY), w = tt.width;
  c.drawImage(textSpr(WORK.title, 32, BR.dark), Math.round(160 - w / 2) + 2, 64 + 2); c.drawImage(tt, Math.round(160 - w / 2), 64);
  TX(c, '原作　' + WORK.author, 160 - textSpr('原作　' + WORK.author, 16, BR.cream).width / 2, 102, BR.cream);
  blit(c, narratorSpr(t, 'smile', 0), 56, 186 + Math.round(Math.sin(t * 2.2)), 25, 25, { s: 2 });
  if (fade) { c.fillStyle = DA('#000000', fade); c.fillRect(0, 0, W, H); }
}

/* ---- video frames: wide 480x270 (x4 = 1920x1080) / tall 360x640 (x3 = 1080x1920) ---- */
const FRAME = {};
function composeFrame(mode, T) {
  if (!FRAME[mode]) FRAME[mode] = mk(mode === 'wide' ? 480 : 360, mode === 'wide' ? 270 : 640);
  const [fc, f] = FRAME[mode], fw = fc.width, fh = fc.height, t = Math.max(0, T);
  if (T < 0) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); } else render(T);
  brandBg(f, 0, 0, fw, fh, t);
  if (mode === 'wide') {
    pxFrame(f, 80, 15, W, H); f.drawImage(cv, 80, 15);
    logoStack(f, 40, 22, 2, t);
    TX(f, SERIES[WORK.series].name, 24, 56, BR.orange); TX(f, '#' + WORK.no, 24, 74, BR.cream);
    blit(f, narratorSpr(t, 'normal', 0), 40, 232 + Math.round(Math.sin(t * 2.2)), 25, 25, { s: 1 });
    const y2 = vText(f, WORK.title, 433, 26, BR.cream); vText(f, WORK.author, 433, y2 + 10, BR.orange);
  } else {
    logoLine(f, 180, 22, 3, t);
    TX(f, SERIES[WORK.series].name + '　#' + WORK.no, 180 - 40, 46, BR.orange);
    const tt = textSpr(WORK.title, 32, C.uiY); f.drawImage(textSpr(WORK.title, 32, BR.dark), Math.round(180 - tt.width / 2) + 2, 74); f.drawImage(tt, Math.round(180 - tt.width / 2), 72);
    TX(f, '原作　' + WORK.author, 180 - textSpr('原作　' + WORK.author, 16, BR.cream).width / 2, 112, BR.cream);
    pxFrame(f, 20, 150, W, H); f.drawImage(cv, 20, 150);
    blit(f, narratorSpr(t, 'smile', 0), 180, 450 + Math.round(Math.sin(t * 2.2)), 25, 25, { s: 2 });
    TX(f, '▶ ドットで描く、物語と記録。', 180 - 108, 520, BR.cream);
    TX(f, '@dotteller', 180 - 40, 546, BR.orange);
  }
  return fc;
}
