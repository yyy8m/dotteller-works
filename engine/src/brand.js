/* ================= ドット語り. branding: logo, intro scene, title, video frames ================= */
const BR = { bg: '#0c2418', bg2: '#123222', bg3: '#1c4430', cream: '#f4ecd8', orange: '#f49a1c', dark: '#06140c', paper: '#ecdcb4', paper2: '#d4bc8c', ink: '#2c2018' };
const SERIES = { bunko: { name: '文庫', narrator: 'narrator' }, kiroku: { name: '記録', narrator: 'lamp' } };
/* subtitle under the title: 文庫 = 原作 author, 記録 = author field holds the year / place */
const workSub = () => WORK.series === 'bunko' ? '原作　' + WORK.author : WORK.author;
const workCredit = () => WORK.series === 'bunko' ? '原作　' + WORK.author + '「' + WORK.title + '」' : '参考　' + WORK.source;
const BRAND = { name: 'ドット語り', roman: 'DOTGATARI', reading: 'どっとがたり', copy: 'ドットで描く、物語と記録。', tiktok: '@dotgatari', youtube: '@dotgatari' };
const brandHandles = () => BRAND.tiktok === BRAND.youtube ? ['YouTube・TikTok ' + BRAND.youtube] : ['YouTube ' + BRAND.youtube, 'TikTok ' + BRAND.tiktok];
/* logo: "ドット語り" in DotGothic16 (cream + dark drop shadow) + a blinking orange "." */
function logoMetrics(size) { const tw = textSpr(BRAND.name, size, BR.cream).width - 2, d = Math.max(2, Math.round(size / 8)); return { tw, d, w: tw + Math.round(d / 2) + d }; }
function logoAt(c, x, y, size, t, col) {
  const { tw, d } = logoMetrics(size), sh = Math.max(1, Math.round(size / 16));
  c.drawImage(textSpr(BRAND.name, size, BR.dark), Math.round(x) + sh * 2, Math.round(y) + sh * 2);
  c.drawImage(textSpr(BRAND.name, size, col || BR.cream), Math.round(x), Math.round(y));
  const on = (Math.floor(t * 2) & 1) === 0, dx = Math.round(x + tw + Math.round(d / 2)), dy = Math.round(y + size - d);
  R(c, dx + sh * 2, dy + sh * 2, d, d, BR.dark); R(c, dx, dy, d, d, on ? BR.orange : '#b06c10');
}
function logoLine(c, cx, y, size, t) { // "ドット語り." centered, one line
  const { w } = logoMetrics(size); logoAt(c, Math.round(cx - w / 2), y, size, t); return w;
}
function logoStack(c, cx, y, size, t) { // "ドット" over "語り." (narrow columns)
  const a = 'ドット', b = BRAND.name.slice(a.length), w1 = textSpr(a, size, BR.cream).width - 2, w2 = textSpr(b, size, BR.cream).width - 2;
  const d = Math.max(2, Math.round(size / 8)), sh = Math.max(1, Math.round(size / 16)), x1 = Math.round(cx - w1 / 2), x2 = Math.round(cx - (w2 + d + 1) / 2), y2 = y + size + 2;
  for (const [s, x, yy, col] of [[a, x1, y, BR.cream], [b, x2, y2, BR.orange]]) { c.drawImage(textSpr(s, size, BR.dark), x + sh, yy + sh); c.drawImage(textSpr(s, size, col), x, yy); }
  const on = (Math.floor(t * 2) & 1) === 0, dx = x2 + w2 + 1, dy = y2 + size - d;
  R(c, dx + sh, dy + sh, d, d, BR.dark); R(c, dx, dy, d, d, on ? BR.cream : '#9c9480');
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
  name: BRAND.name, bgm: null,
  init(S) { const L = S.lines[0]; S.dur = L.se + 1.3; },
  sfx(S, ev) { ev(0.35, 'end'); ev(1.0, 'shine', 0.6); },
  draw(c, t, S) {
    brandBg(c, 0, 0, W, H, t);
    logoLine(c, 160, 2, 32, t);
    TX(c, SERIES[WORK.series].name + '　#' + WORK.no, 160 - 40, 38, BR.orange);
    // scroll unrolling
    const k = eOut(sg(t, 0.6, 1.5)), sw = Math.round(170 * k), sx = 210 - sw / 2;
    if (k > 0) {
      R(c, sx, 64, sw, 92, BR.paper); c.fillStyle = DP(BR.paper, BR.paper2, 3); c.fillRect(sx, 64, sw, 92);
      R(c, sx, 66, sw, 1, BR.paper2); R(c, sx, 153, sw, 1, BR.paper2);
      if (k > 0.85) {
        const ts = textSpr(WORK.title, 32, BR.ink).width > 160 ? 24 : 32, a = sg(t, 1.3, 1.9), tw = textSpr(WORK.title, ts, BR.ink).width;
        if (a > 0) { const s = ditherFade(textSpr(WORK.title, ts, BR.ink), a, 'ttl'); c.drawImage(s, Math.round(210 - tw / 2), 82 + (32 - ts) / 2); }
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
  logoLine(c, 160, 6, 32, t);
  TX(c, SERIES[WORK.series].name + '　#' + WORK.no, 120, 42, BR.orange);
  if (typeof TITLE_DECO === 'function') TITLE_DECO(c, t);
  const tt = textSpr(WORK.title, 32, C.uiY), w = tt.width;
  c.drawImage(textSpr(WORK.title, 32, BR.dark), Math.round(160 - w / 2) + 2, 70 + 2); c.drawImage(tt, Math.round(160 - w / 2), 70);
  TX(c, workSub(), 160 - textSpr(workSub(), 16, BR.cream).width / 2, 108, BR.cream);
  TX(c, BRAND.youtube, W - 6 - textSpr(BRAND.youtube, 16, BR.orange).width, H - 22, BR.orange);
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
    logoStack(f, 39, 16, 16, t);
    TX(f, SERIES[WORK.series].name, 24, 60, BR.orange); TX(f, '#' + WORK.no, 24, 78, BR.cream);
    blit(f, narratorSpr(t, 'normal', 0), 40, 232 + Math.round(Math.sin(t * 2.2)), 25, 25, { s: 1 });
    const y2 = vText(f, WORK.title, 433, 26, BR.cream), sub = WORK.series === 'bunko' ? WORK.author : (WORK.place || ''); if (sub && y2 + 10 + [...sub].length * 17 < 262) vText(f, sub, 433, y2 + 10, BR.orange);
  } else {
    logoLine(f, 180, 14, 32, t);
    TX(f, SERIES[WORK.series].name + '　#' + WORK.no, 180 - 40, 52, BR.orange);
    const tt = textSpr(WORK.title, 32, C.uiY); f.drawImage(textSpr(WORK.title, 32, BR.dark), Math.round(180 - tt.width / 2) + 2, 80); f.drawImage(tt, Math.round(180 - tt.width / 2), 78);
    TX(f, workSub(), 180 - textSpr(workSub(), 16, BR.cream).width / 2, 116, BR.cream);
    pxFrame(f, 20, 150, W, H); f.drawImage(cv, 20, 150);
    blit(f, narratorSpr(t, 'smile', 0), 180, 450 + Math.round(Math.sin(t * 2.2)), 25, 25, { s: 2 });
    const cp = '▶ ' + BRAND.copy; TX(f, cp, 180 - textSpr(cp, 16, BR.cream).width / 2, 516, BR.cream);
    brandHandles().forEach((h, i) => TX(f, h, 180 - textSpr(h, 16, BR.orange).width / 2, 544 + i * 22, BR.orange));
  }
  return fc;
}
