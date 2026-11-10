/* ================= timeline, dialog UI, transitions, main loop ================= */
const SPK = { narrator: { name: '記録の神', bg: ['#6c5430', '#b89c64'] }, lamp: { name: '灯の神', bg: ['#2c1c10', '#5c3c1c'] }, spider: { name: '蜘蛛', bg: ['#584c88', '#6c60a4'] }, buddha: { name: 'お釈迦様', bg: ['#8c6420', '#b88c30'] }, kandata: { name: '犍陀多', bg: ['#5c1c1c', '#7c2c24'] } };
if (typeof SPEAKERS_EXTRA !== 'undefined') Object.assign(SPK, SPEAKERS_EXTRA); // per-work cast: { gein: { name: 'エド・ゲイン', bg: ['#3c1c1c', '#5c2c2c'] } }
let TL = null;

/* blink schedule: irregular 2-5 s */
const _bl = {};
function blinkOf(t, seed) {
  let a = _bl[seed]; if (!a) { a = []; const r = rngf(seed * 977 + 3); let x = 0.5 + r() * 2; while (x < 900) { a.push(x); x += 2 + r() * 3; } _bl[seed] = a; }
  let lo = 0, hi = a.length - 1; if (t < a[0]) return 0;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (a[m] <= t) lo = m; else hi = m - 1; }
  const d = t - a[lo]; return d < 0.05 ? 1 : d < 0.12 ? 2 : d < 0.17 ? 1 : 0;
}

/* text layout: wrap sentences into 15-char lines, pack into 3-line pages */
const KINSOKU = '、。！？…ー」）';
function layoutText(text) {
  const sents = []; let cur = '';
  for (let i = 0; i < text.length; i++) { cur += text[i]; if ('。！？…'.includes(text[i]) && !(i + 1 < text.length && KINSOKU.includes(text[i + 1]))) { sents.push(cur); cur = ''; } }
  if (cur) sents.push(cur);
  const pages = []; let page = [], idx = 0;
  for (const s of sents) {
    const lines = []; let l = '';
    for (let i = 0; i < s.length; i++) { l += s[i]; if (l.length >= 14 && !(i + 1 < s.length && KINSOKU.includes(s[i + 1]))) { lines.push(l); l = ''; } }
    if (l) lines.push(l);
    if (page.length && page.length + lines.length > 3) { pages.push(page); page = []; }
    for (const ln of lines) { if (page.length === 3) { pages.push(page); page = []; } page.push({ s: ln, i0: idx }); idx += ln.length; }
  }
  if (page.length) pages.push(page);
  return pages;
}
function revealCount(Ln, tl) { // chars visible at line-local time tl
  let n = 0;
  for (const sgm of Ln.segs) {
    const body = sgm.text.replace(/[、。！？…]+$/, ''), punct = sgm.text.length - body.length;
    if (tl >= sgm.b) { n += sgm.text.length; continue; }
    if (tl > sgm.a) n += Math.floor(body.length * (tl - sgm.a) / Math.max(0.05, sgm.b - sgm.a) + 0.999);
    void punct; break;
  }
  return Math.min(n, Ln.text.length);
}
function segIndex(Ln, tl) { let k = 0; for (let i = 0; i < Ln.segs.length; i++) if (tl >= Ln.segs[i].a - 0.05) k = i; return k; }

function makeEnv(buf) {
  const d = buf.getChannelData(0), sr = buf.sampleRate, hop = Math.floor(sr / 60), n = Math.floor(d.length / hop), e = new Float32Array(n);
  for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < hop; j++) { const v = d[i * hop + j]; s += v * v; } e[i] = Math.sqrt(s / hop); }
  const sorted = Array.from(e).sort((a, b) => a - b), ref = sorted[Math.floor(n * 0.92)] || 1;
  for (let i = 0; i < n; i++) e[i] = e[i] / ref; return e;
}
function b64ToBuf(b64) { const s = atob(b64), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u.buffer; }
async function decodeVoices(ac) {
  const out = {};
  for (const [id, m] of Object.entries(VOICE_DATA)) {
    const buf = await new Promise((res, rej) => { const p = ac.decodeAudioData(b64ToBuf(m.b64), res, rej); if (p && p.catch) p.catch(rej); });
    out[id] = buf;
  }
  return out;
}
function buildTimeline(bufs) {
  const scenes = []; let T = 0;
  for (let si = 0; si < PLAN.length; si++) {
    const pl = PLAN[si], S = { sc: pl.sc, start: T, tr: pl.tr, td: pl.td, lines: [] };
    let t = pl.pre;
    for (const it of pl.items) {
      if (typeof it === 'number') { t += it; continue; }
      const m = VOICE_DATA[it], buf = bufs[it], r = buf.duration / m.dur;
      const segs = m.segs.map((tx, k) => ({ text: tx, a: (k === 0 ? m.start : m.bounds[k - 1][1]) * r, b: (k === m.segs.length - 1 ? m.end : m.bounds[k][0]) * r }));
      const Ln = { id: it, spk: m.speaker, text: m.text, t0: t, ss: m.start * r, segs, dur: buf.duration, buf, env: makeEnv(buf), pages: layoutText(m.text) };
      Ln.se = t + m.end * r; // speech end (scene-local)
      for (const sgm of segs) { sgm.a += 0; sgm.b += 0; }
      S.lines.push(Ln); t = Ln.se;
    }
    // scene functions expect segs in line-local time; give helpers
    pl.sc.init(S); S.end = S.start + S.dur; scenes.push(S); T = S.end;
  }
  return { scenes, total: T };
}

/* ---- schedule audio for the whole show ---- */
function scheduleAll(T0) {
  const ac = AU.ctx, sfx = [];
  const ev = (t, f, ...a) => { if (isFinite(t)) sfx.push([Math.max(0, t), f, a]); }; // a cue before the start (e.g. a scene that opens mid-action) plays at 0
  TL.scenes.forEach((S, i) => {
    const s0 = S.start, L0 = S.lines[0], Ll = S.lines[S.lines.length - 1];
    if (L0) { ev(s0 + L0.t0 - 0.25, 'open'); ev(s0 + Ll.se + 0.7, 'close'); }
    for (const Ln of S.lines) {
      const src = ac.createBufferSource(); src.buffer = Ln.buf; src.connect(AU.voice); src.start(T0 + s0 + Ln.t0);
      AU.duck.gain.setTargetAtTime(0.32, T0 + s0 + Ln.t0 - 0.15, 0.08); AU.duck.gain.setTargetAtTime(1, T0 + s0 + Ln.se + 0.25, 0.35);
    }
    if (S.sc.sfx) S.sc.sfx(S, (t, f, ...a) => ev(s0 + t, f, ...a));
  });
  for (const [t, f, a] of sfx) SFX[f](T0 + t, ...a);
  const tracks = TL.scenes.map((S, i) => {
    const nx = TL.scenes[i + 1];
    const tr = { style: S.sc.bgm, a: Math.max(0, S.start - 0.2), b: nx ? nx.start + nx.td * 0.7 : Infinity, fin: i ? 1 : 2, fout: 1.2 };
    if (S.sc.bgmTrack) S.sc.bgmTrack(S, tr);
    if (tr.mute) { tr.muteA = S.start + tr.mute[0]; tr.muteB = S.start + tr.mute[1]; } // silence the music inside the scene (seconds from the scene start)
    return tr;
  }).filter(tr => tr.style);
  bgmStart(tracks, T0);
}

/* ---- dialog window ---- */
const winBg = (() => { const [cv, x] = mk(308, 64); VG(x, 0, 0, 308, 64, [C.ui2, C.ui1, C.ui0]); return cv; })();
function frameBox(c, x, y, w, h, bg) {
  R(c, x + 1, y, w - 2, h, C.uiD); R(c, x, y + 1, w, h - 2, C.uiD);
  R(c, x + 2, y + 1, w - 4, h - 2, C.uiB); R(c, x + 1, y + 2, w - 2, h - 4, C.uiB);
  R(c, x + 3, y + 3, w - 6, h - 6, C.uiD);
  if (bg) c.drawImage(bg, 0, 0, bg.width, bg.height, x + 4, y + 4, w - 8, h - 8);
}
function drawDialog(c, T) {
  const S = TL.scenes[sceneAt(T)], tl = T - S.start; if (!S.lines.length) return;
  const L0 = S.lines[0], Ll = S.lines[S.lines.length - 1], o0 = L0.t0 - 0.25, o1 = Ll.se + 0.7;
  if (tl < o0 || tl > o1 + 0.15) return;
  const k = tl < o0 + 0.2 ? eOut((tl - o0) / 0.2) : tl > o1 ? 1 - (tl - o1) / 0.15 : 1;
  const hh = Math.max(2, Math.round(68 * k)), y = 202 - (hh >> 1);
  frameBox(c, 4, y, 312, hh, winBg);
  if (k < 1) return;
  let Ln = L0; for (const l of S.lines) if (tl >= l.t0 - 0.25) Ln = l;
  const lt = tl - Ln.t0, sp = SPK[Ln.spk];
  // name plate
  const nw = textSpr(sp.name, 16, C.uiY).width + 14;
  frameBox(c, 8, 152, nw, 22, winBg); TX(c, sp.name, 15, 155, C.uiY);
  // face
  const fb = cached('fbg' + Ln.spk, () => { const [cv, x] = mk(48, 48); VG(x, 0, 0, 48, 48, [sp.bg[1], sp.bg[0]]); return cv; });
  frameBox(c, 9, 175, 58, 58, null); c.drawImage(fb, 14, 180, 48, 48);
  c.save(); c.beginPath(); c.rect(14, 180, 48, 48); c.clip();
  if (Ln.spk === 'buddha') halo(c, 38, 200, 17, T); else if (Ln.spk === 'narrator') { for (let i = 0; i < 7; i++) { const yy = 228 - fr(T * 0.3 + i / 7) * 50; P(c, 16 + i * 7 + Math.sin(T * 2 + i) * 2, yy, i & 1 ? C.gold0 : '#fcf4dc'); } } else if (Ln.spk === 'lamp') { for (let i = 0; i < 6; i++) { const u = fr(T * 0.35 + i / 6), yy = 228 - u * 48; if (u < 0.9) P(c, 20 + i * 7 + Math.sin(T * 2.5 + i) * 2, yy, i & 1 ? '#f8c860' : '#f49a1c'); } } else if (Ln.spk === 'kandata') { for (let i = 0; i < 6; i++) { const yy = 228 - fr(T * 0.5 + i / 6) * 50; P(c, 18 + i * 8, yy, C.hell5); } } else { for (let i = 0; i < 5; i++) { if ((Math.floor(T * 3) + i) % 4) P(c, 18 + i * 9, 184 + (i * 13 % 36), C.white); } }
  let mouth = 0;
  if (lt > Ln.ss - 0.02 && lt < Ln.se - Ln.t0 + 0.08 && lt >= 0) { const v = Ln.env[Math.floor(lt * 60)] || 0; mouth = v > 0.5 ? 2 : v > 0.16 ? 1 : 0; }
  let ex = 'normal'; const si = segIndex(Ln, lt); for (const [sx, e] of EXPR[Ln.id]) if (si >= sx && lt >= 0) ex = e;
  const breath = Math.round(Math.sin(T * 2.4) * 0.7);
  const fs = facePortrait(Ln.spk, { t: T, mouth, blink: blinkOf(T, Ln.spk.length * 7), expr: ex });
  c.drawImage(fs, 13, 180 + breath);
  c.restore();
  // text
  const n = revealCount(Ln, lt);
  let pi = 0; for (let p = 0; p < Ln.pages.length; p++) if (n > Ln.pages[p][0].i0) pi = p;
  const pg = Ln.pages[pi];
  pg.forEach((ln, li) => { const vis = clamp(n - ln.i0, 0, ln.s.length); if (vis > 0) TX(c, ln.s.slice(0, vis), 72, 179 + li * 18, C.uiB); });
  const pageEnd = pg[pg.length - 1].i0 + pg[pg.length - 1].s.length;
  if (n >= pageEnd && (Math.floor(T * 3) & 1) === 0) { const by = 224 + (Math.floor(T * 6) & 1); PF(c, [300, by, 308, by, 304, by + 5], C.uiB); }
}
/* current subtitle for video frames: { spk, name, lines (revealed), face } or null */
function subtitleState(T) {
  if (!TL || T < 0) return null;
  const S = TL.scenes[sceneAt(T)], tl = T - S.start; if (!S.lines.length) return null;
  const L0 = S.lines[0], Ll = S.lines[S.lines.length - 1]; if (tl < L0.t0 - 0.1 || tl > Ll.se + 0.6) return null;
  let Ln = L0; for (const l of S.lines) if (tl >= l.t0 - 0.25) Ln = l;
  const lt = tl - Ln.t0; if (lt > Ln.se - Ln.t0 + 0.6 && Ln === Ll) return null;
  const n = revealCount(Ln, lt); let pi = 0; for (let p = 0; p < Ln.pages.length; p++) if (n > Ln.pages[p][0].i0) pi = p;
  const pg = Ln.pages[pi], full = pg.map(x => x.s), vis = pg.map(x => x.s.slice(0, clamp(n - x.i0, 0, x.s.length)));
  let mouth = 0; if (lt > Ln.ss - 0.02 && lt < Ln.se - Ln.t0 + 0.08 && lt >= 0) { const v = Ln.env[Math.floor(lt * 60)] || 0; mouth = v > 0.5 ? 2 : v > 0.16 ? 1 : 0; }
  let ex = 'normal'; const si = segIndex(Ln, lt); for (const [sx, e] of (EXPR[Ln.id] || [])) if (si >= sx && lt >= 0) ex = e;
  return { spk: Ln.spk, name: (SPK[Ln.spk] || {}).name || '', lines: vis, full, face: facePortrait(Ln.spk, { t: T, mouth, blink: blinkOf(T, Ln.spk.length * 7), expr: ex }) };
}
function sceneAt(T) { let i = 0; for (let k = 0; k < TL.scenes.length; k++) if (T >= TL.scenes[k].start) i = k; return i; }

/* ---- scene rendering with camera ---- */
const [WB, WX] = mk(W, H);
const OUT = [mk(W, H), mk(W, H)];
function renderScene(i, tl, k) {
  const S = TL.scenes[i]; WX.setTransform(1, 0, 0, 1, 0, 0); WX.fillStyle = '#000'; WX.fillRect(0, 0, W, H);
  window.__uiq = []; const cam = S.sc.draw(WX, tl, S) || {}; WX.setTransform(1, 0, 0, 1, 0, 0); const uiq = window.__uiq; window.__uiq = null;
  let z = cam.z || 1; const sx = cam.sx || 0, sy = cam.sy || 0; if ((sx || sy) && z < 1.04) z = 1.04;
  const [oc, ox] = OUT[k]; ox.fillStyle = '#000'; ox.fillRect(0, 0, W, H);
  const fx = cam.fx == null ? 160 : cam.fx, fy = cam.fy == null ? 120 : cam.fy, w = W / z, h = H / z;
  const x0 = clamp(fx - fx / z + sx / z, 0, W - w), y0 = clamp(fy - fy / z + sy / z, 0, H - h);
  if (k === 0) window.__focus = [(fx - x0) * z, (fy - y0) * z]; // where the camera's focus lands on screen (video crops follow it)
  if (z === 1) ox.drawImage(WB, 0, 0); else ox.drawImage(WB, x0, y0, w, h, 0, 0, W, H);
  if (S.sc.post) { const im = ox.getImageData(0, 0, W, H); S.sc.post(im, tl, S); ox.putImageData(im, 0, 0); }
  if (WORK.series === 'kiroku' && typeof horrorGrade === 'function') horrorGrade(ox, tl, S);
  for (const f of uiq) f(ox); // captions / year cards: drawn after the camera so they never get cropped
  return oc;
}
function transition(type, p, A, B, out) { // A,B,out ImageData; p 0..1
  const a = A ? A.data : null, b = B.data, o = out.data;
  for (let y = 0; y < H; y++) {
    const offA = type === 'ripple' ? Math.round(Math.sin(y * 0.18 + p * 12) * p * 9) : 0, offB = type === 'ripple' ? Math.round(Math.sin(y * 0.18 + p * 12) * (1 - p) * 9) : 0;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4, th = BAYER8[(y & 7) * 8 + (x & 7)];
      let src = null, col = null;
      switch (type) {
        case 'fromBlack': src = th < p ? 1 : 0; if (!src) col = 0; break;
        case 'dither': src = th < p ? 1 : 0; break;
        case 'ripple': src = th < p ? 1 : 0; break;
        case 'white': { if (p < 0.5) { if (th < p * 2) col = 255; else src = 0; } else { if (th < (p - 0.5) * 2) src = 1; else col = 255; } break; }
        case 'iris': { const d = Math.hypot(x - 160, y - 120), r = p * 205; src = d < r + (th - 0.5) * 14 ? 1 : 0; break; }
        case 'blinds': { const v = ((x + y * 2) % 32) / 32; src = v < p * 1.25 - 0.12 + (th - 0.5) * 0.12 ? 1 : 0; break; }
        case 'irisWhite': {
          if (p < 0.4) { const d = Math.hypot(x - 160, y - 130), r = (1 - p / 0.4) * 210; if (d < r + (th - 0.5) * 12) src = 0; else col = 0; }
          else if (p < 0.5) col = 0;
          else { const q = (p - 0.5) / 0.5; if (q < 0.5) col = th < q * 2 ? 255 : 0; else { if (th < (q - 0.5) * 2) src = 1; else col = 255; } }
          break;
        }
      }
      if (col != null) { o[i] = o[i + 1] = o[i + 2] = col; o[i + 3] = 255; }
      else if (src === 1) { const j = (y * W + clamp(x + offB, 0, W - 1)) * 4; o[i] = b[j]; o[i + 1] = b[j + 1]; o[i + 2] = b[j + 2]; o[i + 3] = 255; }
      else { if (!a) { o[i] = o[i + 1] = o[i + 2] = 0; o[i + 3] = 255; continue; } const j = (y * W + clamp(x + offA, 0, W - 1)) * 4; o[i] = a[j]; o[i + 1] = a[j + 1]; o[i + 2] = a[j + 2]; o[i + 3] = 255; }
    }
  }
}
const cv = document.getElementById('c'), ctx = cv.getContext('2d', { willReadFrequently: true }); ctx.imageSmoothingEnabled = false;
let outIm = null;
function render(T, noDialog) {
  if (T < 0) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); return; }
  const i = sceneAt(T), S = TL.scenes[i], tl = T - S.start;
  const B = renderScene(i, tl, 0);
  if (tl < S.td) {
    const p = clamp(tl / S.td, 0, 1);
    const Bim = B.getContext('2d').getImageData(0, 0, W, H);
    let Aim = null; if (i > 0) { const P = TL.scenes[i - 1]; Aim = renderScene(i - 1, T - P.start, 1).getContext('2d').getImageData(0, 0, W, H); }
    if (!outIm) outIm = ctx.createImageData(W, H);
    transition(S.tr, p, Aim, Bim, outIm); ctx.putImageData(outIm, 0, 0);
  } else ctx.drawImage(B, 0, 0);
  if (TIKTOK) tiktokCard(ctx, T - (TL.total - 2.4)); // TikTok teaser: 「▶ 続きは本編で」 at the end (the YouTube Short loops instead)
  if (!noDialog) drawDialog(ctx, T);
  if (S.sc.ending && tl > S.tEnd) { // おわり
    const u = tl - S.tEnd, s = u < 0.25 ? u / 0.25 * 1.2 : u < 0.45 ? lerp(1.2, 1, (u - 0.25) / 0.2) : 1, bob = Math.round(Math.sin(u * 2) * 1);
    const tx = textSpr('おわり', 32, C.uiB), w = tx.width + 30, h = 50;
    const [bc, bx] = slot('owari', w, h); frameBox(bx, 0, 0, w, h, winBg); bx.drawImage(textSpr('おわり', 32, C.uiD), 16, 10); bx.drawImage(tx, 15, 9);
    blit(ctx, bc, 160, 112 + bob, w / 2 + 1, h / 2 + 1, { s: Math.max(0.05, s) });
    if (u > 1.5) { const k2 = eOut((u - 1.5) / 0.3), hh = Math.max(2, Math.round(26 * k2)), cr = workCredit(), bw = Math.max(248, textSpr(cr, 16, C.uiB).width + 24); frameBox(ctx, 160 - bw / 2, 158 - hh / 2, bw, hh, winBg); if (k2 >= 1) TX(ctx, cr, 160 - textSpr(cr, 16, C.uiB).width / 2, 150, C.uiB); }
    if (u > 3 && !window.__ended) { window.__ended = true; const r = document.getElementById('again'); if (r) r.style.display = 'block'; }
  }
}

/* ---- boot ---- */
let mode = 'title', T0 = 0, tStartTitle = performance.now(), fadeT = 0;
function fit() { // contain: fit both width and height; snap to whole *device* pixels per dot so the pixels stay crisp
  const dpr = window.devicePixelRatio || 1, k = Math.min(innerWidth / W, innerHeight / H) * dpr, ss = (k >= 1 ? Math.floor(k) : k) / dpr;
  cv.style.width = W * ss + 'px'; cv.style.height = H * ss + 'px'; }
addEventListener('resize', fit); fit();
function loop() {
  const now = performance.now() / 1000;
  if (mode === 'title') drawTitle(now - tStartTitle / 1000, 0);
  else if (mode === 'loading') { drawTitle(now, 0.6); TX(ctx, 'よみこみちゅう…', 104, 150, C.uiB); }
  else if (mode === 'play') { const T = AU.ctx.currentTime - T0; if (T < 0) drawTitle(now, clamp(1 + T / 0.6, 0, 1)); else render(T); }
  else if (mode === 'error') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); TX(ctx, '音声の読み込みに失敗しました', 48, 110, C.uiB); }
  if (!window.__test) requestAnimationFrame(loop);
}
async function start() {
  document.getElementById('ui').style.display = 'none';
  mode = 'loading';
  try {
    const ac = AU.ctx || audioInit(); await ac.resume();
    const bufs = await decodeVoices(ac);
    TL = buildTimeline(bufs);
    T0 = ac.currentTime + 0.7; scheduleAll(T0); mode = 'play';
  } catch (e) { console.error(e); mode = 'error'; }
}
document.getElementById('go').addEventListener('click', start);

if (document.fonts) { let tries = 0; const fl = () => document.fonts.load('16px "DotGothic16"').then(r => { if (r && r.length) _tc.clear(); else if (++tries < 40) setTimeout(fl, 250); }).catch(() => {}); fl(); }
/* test hooks (headless rendering of arbitrary times) */
window.__prep = async () => { window.__test = true; const ac = audioInit(); TL = buildTimeline(await decodeVoices(ac)); return TL.scenes.map(s => [s.sc.name, +s.start.toFixed(2), +s.dur.toFixed(2), s.sc.ch || null]); };
window.__draw = T => render(T);
window.__title = t => drawTitle(t, 0);
window.__frame = (mode, Ts) => Ts.map(T => composeFrame(mode, T).toDataURL('image/png'));
window.__audio = async (len, offset) => { // offline render of the whole soundtrack -> base64 16bit stereo wav
  const SR = 48000, off = new OfflineAudioContext(2, Math.ceil(SR * len), SR);
  audioInit(off); TL = buildTimeline(await decodeVoices(off)); BGM.all = len; scheduleAll(offset);
  const buf = await off.startRendering(), L = buf.getChannelData(0), Rr = buf.getChannelData(1), n = L.length;
  const wav = new DataView(new ArrayBuffer(44 + n * 4)), ws = (o, s) => { for (let i = 0; i < s.length; i++) wav.setUint8(o + i, s.charCodeAt(i)); };
  ws(0, 'RIFF'); wav.setUint32(4, 36 + n * 4, true); ws(8, 'WAVEfmt '); wav.setUint32(16, 16, true); wav.setUint16(20, 1, true); wav.setUint16(22, 2, true); wav.setUint32(24, SR, true); wav.setUint32(28, SR * 4, true); wav.setUint16(32, 4, true); wav.setUint16(34, 16, true); ws(36, 'data'); wav.setUint32(40, n * 4, true);
  let pk = 0; for (let i = 0; i < n; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(Rr[i])); wav.setInt16(44 + i * 4, clamp(L[i], -1, 1) * 32767, true); wav.setInt16(46 + i * 4, clamp(Rr[i], -1, 1) * 32767, true); }
  let bin = ''; const u8 = new Uint8Array(wav.buffer); for (let i = 0; i < u8.length; i += 8192) bin += String.fromCharCode.apply(null, u8.subarray(i, i + 8192));
  return { wav: btoa(bin), peak: pk };
};
requestAnimationFrame(loop);

/* TikTok teaser end card (the YouTube Short loops instead and never shows it) */
function tiktokCard(c, u) {
  if (u <= 0) return; const k = eOut(clamp(u / 0.4, 0, 1)), s = '▶ 続きは本編で';
  R(c, 60, 96, 200, Math.round(34 * k), '#000000'); R(c, 62, 98, 196, Math.round(30 * k), '#b01010');
  if (k >= 1) { TX(c, s, 160 - textSpr(s, 16, C.white).width / 2, 100, C.white, 16, null); const t2 = TIKTOK ? 'YouTube「ドット語り」' : '▲ 上のリンクから本編へ'; TX(c, t2, 160 - textSpr(t2, 16, C.white).width / 2, 134, '#f8e8c8', 16, '#000000'); }
}
