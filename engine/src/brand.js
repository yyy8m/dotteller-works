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
  wideDY: 0, noWin: true,
  name: BRAND.name, bgm: null,
  init(S) { const L = S.lines[0]; S.dur = L.se + 1.3; },
  sfx(S, ev) { ev(0.35, 'end'); ev(1.0, 'shine', 0.6); },
  draw(c, t, S) {
    brandBg(c, 0, 0, W, H, t);
    logoLine(c, 160, 2, 32, t);
    TX(c, SERIES[WORK.series].name + '　#' + WORK.no, 160 - 40, 38, BR.orange);
    // scroll unrolling
    // scroll: wide enough for the title and the subtitle (split at the full-width space if it is long)
    const fit = cached('scrollFit', () => {
      const ts = [32, 24, 16].find(z => textSpr(WORK.title, z, BR.ink).width - 2 <= 196) || 16;
      let sub = [WORK.author]; if (textSpr(WORK.author, 16, BR.ink).width - 2 > 196 && WORK.author.includes('　')) sub = WORK.author.split('　');
      const need = Math.max(textSpr(WORK.title, ts, BR.ink).width, ...sub.map(x => textSpr(x, 16, BR.ink).width)) + 20;
      return { ts, sub, w: clamp(need, 170, 210) };
    });
    const cx = Math.min(210, 308 - fit.w / 2), k = eOut(sg(t, 0.6, 1.5)), sw = Math.round(fit.w * k), sx = cx - sw / 2;
    if (k > 0) {
      R(c, sx, 64, sw, 92, BR.paper); c.fillStyle = DP(BR.paper, BR.paper2, 3); c.fillRect(sx, 64, sw, 92);
      R(c, sx, 66, sw, 1, BR.paper2); R(c, sx, 153, sw, 1, BR.paper2);
      if (k > 0.85) {
        const ts = fit.ts, a = sg(t, 1.3, 1.9), tw = textSpr(WORK.title, ts, BR.ink).width, ty = fit.sub.length > 1 ? 74 : 82;
        if (a > 0) { const s = ditherFade(textSpr(WORK.title, ts, BR.ink), a, 'ttl'); c.drawImage(s, Math.round(cx - tw / 2), ty + (32 - ts) / 2); }
        if (t > 1.8) fit.sub.forEach((x, i) => TX(c, x, cx - textSpr(x, 16, BR.ink).width / 2, (fit.sub.length > 1 ? 112 : 126) + i * 18, BR.ink, 16, null));
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

/* ---- video frames: wide 640x360 (x3 = 1920x1080) / tall 360x640 (x3 = 1080x1920) ----
   wide: the scene fills the frame (top 320x180 of the game screen, x2), with large film-style subtitles.
   tall: a big hook line on top, the scene cropped around the camera focus filling the width, large subtitles below. */
const FRAME = {};
function wrapJa(str, n) { // wrap into lines of at most n characters, keeping punctuation off line starts
  const out = []; let cur = '';
  for (let i = 0; i < str.length; i++) { cur += str[i]; if (cur.length >= n && !(i + 1 < str.length && KINSOKU.includes(str[i + 1]))) { out.push(cur); cur = ''; } }
  if (cur) out.push(cur); return out;
}
function outlineText(f, s, x, y, col, size = 16, r = 2) { const o = textSpr(s, size, '#000000'); for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (dx || dy) f.drawImage(o, Math.round(x) + dx, Math.round(y) + dy); f.drawImage(textSpr(s, size, col), Math.round(x), Math.round(y)); }
function drawSubs(f, st, cx, yBottom, perLine, lh, face, size = 16, maxL = 3) {
  const full = wrapJa(st.full.join(''), perLine), vis = st.lines.join(''); let k = 0;
  let lines = full.map(l => { const v = vis.slice(k, k + l.length); k += l.length; return [l, v]; });
  if (lines.length > maxL) { const last = Math.max(maxL, lines.findLastIndex(x => x[1]) + 1); lines = lines.slice(last - maxL, last); }
  const y0 = yBottom - lines.length * lh;
  f.fillStyle = DA('#000000', 0.55); f.fillRect(0, y0 - 8, f.canvas.width, lines.length * lh + 12);
  lines.forEach(([l, v], i) => { const w = textSpr(l, size, '#fff').width - 2; if (v) outlineText(f, v, cx - w / 2, y0 + i * lh, C.white, size, size > 16 ? 3 : 2); });
  if (face) { const fx = 8, fy = y0 - 8 - 54; R(f, fx - 2, fy - 2, 52, 52, '#000000'); R(f, fx - 1, fy - 1, 50, 50, BR.cream); R(f, fx, fy, 48, 48, (SPK[st.spk] || { bg: ['#222', '#444'] }).bg[0]); f.drawImage(st.face, fx - 1, fy - 1); outlineText(f, st.name, fx + 56, fy + 30, C.uiY, 16, 1); }
}
/* wide video: the game's dialog window (chunky 2x frame, name plate, face, typewriter text, blinking ▼) */
function drawGameWin(f, st, t) {
  const perLine = 20, size = 24, lh = 30, maxL = 2;
  const full = wrapJa(st.full.join(''), perLine), vis = st.lines.join(''); let k = 0;
  let lines = full.map(l => { const v = vis.slice(k, k + l.length); k += l.length; return [l, v]; });
  if (lines.length > maxL) { const last = Math.max(maxL, lines.findLastIndex(x => x[1]) + 1); lines = lines.slice(last - maxL, last); }
  const sp = SPK[st.spk] || { bg: ['#222', '#444'] };
  const fb = cached('fbg' + st.spk, () => { const [cv, x] = mk(48, 48); VG(x, 0, 0, 48, 48, [sp.bg[1], sp.bg[0]]); return cv; });
  f.save(); f.scale(2, 2);
  frameBox(f, 4, 129, 312, 48, winBg);           // window
  f.drawImage(fb, 12, 135, 36, 36);              // face background only (no frame)
  if (st.name) { const nw = textSpr(st.name, 16, C.uiY).width; frameBox(f, 4, 115, Math.ceil(nw / 2) + 12, 15, winBg); }
  f.restore();
  f.drawImage(st.face, 0, 0, 48, 48, 24, 270, 72, 72); // the whole 48x48 portrait at 1.5x (never cropped)
  if (st.name) TX(f, st.name, 20, 237, C.uiY, 16, null);
  lines.forEach(([l, v], i) => { if (v) TX(f, v, 120, 282 + i * lh, C.uiB, size, null); });
  if (lines.length && lines[lines.length - 1][1].length === lines[lines.length - 1][0].length && (Math.floor(t * 3) & 1) === 0) { const by = 340 + (Math.floor(t * 6) & 1) * 2; PF(f, [606, by, 618, by, 612, by + 7], C.uiB); }
}
const WIDE_DY = 24;
function composeFrame(mode, T) {
  const wide = mode === 'wide';
  if (!FRAME[mode]) FRAME[mode] = mk(wide ? 640 : 360, wide ? 360 : 640);
  const [fc, f] = FRAME[mode], t = Math.max(0, T); f.imageSmoothingEnabled = false;
  window.__uiCollect = []; window.__wide = wide;
  if (T < 0) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); } else render(T, true);
  const ui = window.__uiCollect || []; window.__uiCollect = null; window.__wide = false;
  const st = T >= 0 ? subtitleState(T) : null;
  if (wide) {
    // the scene is shifted up a little so that what stands on the ground stays above the dialog window;
    // captions and year cards are drawn again at their usual place (top) so the shift never cuts them
    const S = T >= 0 && TL ? TL.scenes[sceneAt(T)] : null, dy = S && S.sc.wideDY != null ? S.sc.wideDY : WIDE_DY;
    f.drawImage(cv, 0, dy, W, 180, 0, 0, 640, 360);
    f.save(); f.scale(2, 2);
    for (const u of ui) { if (u[0] === 'cap') capPlate(f, u[1], u[2], u[3], u[4]); else if (u[0] === 'big') bigCap(f, u[1], u[2], u[3], u[4], u[5]); else yearCard(f, u[3], u[4], u[1], u[2]); }
    f.restore();
    if (st && !(S && S.sc.noWin)) drawGameWin(f, st, t);
    return fc;
  }
  R(f, 0, 0, 360, 640, '#05080a'); c0: {
    // hook (top)
    logoAt(f, 10, 8, 16, t); const ser = SERIES[WORK.series].name + ' #' + WORK.no; TX(f, ser, 350 - textSpr(ser, 16, BR.orange).width, 8, BR.orange, 16, null);
    const hook = (typeof HOOK !== 'undefined' && HOOK) || [WORK.title];
    hook.forEach((h, i) => { const size = textSpr(h, 32, '#fff').width - 2 <= 344 ? 32 : 24, w = textSpr(h, size, '#fff').width - 2; outlineText(f, h, 180 - w / 2, 34 + i * 44, i === hook.length - 1 && hook.length > 1 ? '#ff3c3c' : C.white, size, 3); });
  }
  // scene: 180x180 around the camera focus, x2
  const fx = (window.__focus || [160, 120])[0], sx = Math.round(clamp(fx - 90, 0, W - 180));
  const Sc = T >= 0 && TL ? TL.scenes[sceneAt(T)] : null;
  if (Sc && Sc.sc.tallFit) { R(f, 0, 132, 360, 360, '#000000'); f.drawImage(cv, 0, 0, W, 180, 0, 132 + 79, 360, 202); } // whole width (text that must not be cut)
  else f.drawImage(cv, sx, 0, 180, 180, 0, 132, 360, 360);
  R(f, 0, 130, 360, 2, BR.orange); R(f, 0, 492, 360, 2, BR.orange);
  // captions / year cards of the scene, redrawn inside the frame so the crop never cuts them
  for (const u of ui) { if (u[0] === 'cap') capPlate(f, u[1], u[2], u[3], 140); else yearCard(f, 258, 140, u[1], u[2]); }
  if (st) { drawSubs(f, st, 180, 604, 14, 28, false, 24, 3); outlineText(f, st.name, 12, 498, C.uiY, 16, 1); }
  const cta = '▶ 本編はチャンネルで ' + BRAND.youtube; TX(f, cta, 180 - textSpr(cta, 16, BR.cream).width / 2, 612, BR.cream, 16, null);
  return fc;
}
