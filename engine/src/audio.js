/* ================= audio: synthesized BGM / SFX, embedded voices ================= */
const AU = { ctx: null };
const NOTE = n => 440 * Math.pow(2, (n - 69) / 12); // midi -> Hz
function audioInit(given) {
  const ac = given || new (window.AudioContext || window.webkitAudioContext)();
  AU.ctx = ac;
  const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3; comp.connect(ac.destination);
  AU.master = ac.createGain(); AU.master.gain.value = 0.9; AU.master.connect(comp);
  AU.duck = ac.createGain(); AU.duck.connect(AU.master);
  AU.bgm = ac.createGain(); AU.bgm.gain.value = 0.75; AU.bgm.connect(AU.duck);
  AU.sfx = ac.createGain(); AU.sfx.gain.value = 0.6; AU.sfx.connect(AU.master);
  AU.voice = ac.createGain(); AU.voice.gain.value = 1.0; AU.voice.connect(AU.master);
  // reverb for music
  const len = ac.sampleRate * 2.4, ir = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
  AU.rev = ac.createConvolver(); AU.rev.buffer = ir; AU.revIn = ac.createGain(); AU.revIn.gain.value = 0.35; AU.revIn.connect(AU.rev); AU.rev.connect(AU.duck);
  const nl = ac.sampleRate * 2; AU.noise = ac.createBuffer(1, nl, ac.sampleRate); const nd = AU.noise.getChannelData(0); for (let i = 0; i < nl; i++) nd[i] = Math.random() * 2 - 1;
  return ac;
}
function env(g, when, a, d, peak, sus = 0, rel = 0.05, hold = 0) {
  g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(peak, when + a);
  if (sus > 0) { g.gain.setTargetAtTime(peak * sus, when + a, d / 3); g.gain.setTargetAtTime(0.0001, when + a + hold, rel / 3); }
  else g.gain.exponentialRampToValueAtTime(0.0001, when + a + d);
}
function tone(dest, when, f, dur, o = {}) {
  const ac = AU.ctx, os = ac.createOscillator(), g = ac.createGain();
  os.type = o.type || 'sine'; os.frequency.setValueAtTime(f, when); if (o.f2) os.frequency.exponentialRampToValueAtTime(o.f2, when + (o.glide || dur));
  if (o.detune) os.detune.value = o.detune;
  let node = os;
  if (o.lp) { const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(o.lp, when); if (o.lp2) fl.frequency.exponentialRampToValueAtTime(o.lp2, when + dur); fl.Q.value = o.q || 0.7; os.connect(fl); node = fl; }
  node.connect(g); g.connect(dest); if (o.rev) g.connect(AU.revIn);
  if (o.sus) env(g, when, o.a || 0.01, o.d || 0.1, o.v || 0.2, o.sus, o.r || 0.2, dur); else env(g, when, o.a || 0.005, dur, o.v || 0.2);
  if (o.trem) { const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = o.trem; lg.gain.value = (o.v || 0.2) * 0.5; l.connect(lg); lg.connect(g.gain); l.start(when); l.stop(when + dur + (o.r || 0.2) + 0.5); }
  os.start(when); os.stop(when + dur + (o.r || 0.2) + 0.6);
}
function noise(dest, when, dur, o = {}) {
  const ac = AU.ctx, s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = AU.noise; s.loop = true; f.type = o.type || 'bandpass'; f.frequency.setValueAtTime(o.f || 1000, when); if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, when + dur); f.Q.value = o.q || 1;
  s.connect(f); f.connect(g); g.connect(dest); if (o.rev) g.connect(AU.revIn);
  if (o.sus) env(g, when, o.a || 0.01, o.d || 0.1, o.v || 0.2, o.sus, o.r || 0.1, dur); else env(g, when, o.a || 0.003, dur, o.v || 0.2);
  s.start(when, Math.random()); s.stop(when + dur + (o.r || 0.1) + 0.3);
}
const pluck = (d, w, f, v = 0.12) => { tone(d, w, f, 1.3, { type: 'sawtooth', lp: 3200, lp2: 300, v, rev: 1 }); tone(d, w, f * 2, 0.4, { type: 'triangle', v: v * 0.3 }); };
const bell = (d, w, f, v = 0.06) => { tone(d, w, f, 2.4, { v, rev: 1 }); tone(d, w, f * 2.76, 1.2, { v: v * 0.4, rev: 1 }); tone(d, w, f * 5.4, 0.5, { v: v * 0.15 }); };
const mbox = (d, w, f, v = 0.08) => { tone(d, w, f, 1.1, { v, rev: 1 }); tone(d, w, f * 4, 0.25, { v: v * 0.25 }); tone(d, w, f * 3.01, 0.4, { v: v * 0.12 }); };
const pad = (d, w, fs, dur, v = 0.035, type = 'triangle') => { for (const f of fs) { tone(d, w, f, dur, { type, a: Math.min(1, dur * 0.3), sus: 1, d: 0.3, r: 1.2, v, rev: 1, detune: (Math.random() - 0.5) * 8 }); } };
const taiko = (d, w, v = 0.5, f = 72) => { tone(d, w, f, 0.6, { f2: f * 0.55, glide: 0.3, v }); noise(d, w, 0.08, { f: 300, q: 0.6, v: v * 0.4 }); };

/* ---- BGM styles: step(i, when, dest) called on a 16th grid ---- */
const STYLES = {
  paradise: { bpm: 66, step(i, w, d) {
    const bar = Math.floor(i / 16), s = i % 16, ch = [[50, 57, 64, 66], [55, 62, 66, 69], [59, 62, 66, 69], [57, 61, 64, 69]][bar % 4];
    if (s === 0) pad(d, w, ch.map(NOTE), 16 * 60 / 66 / 4, 0.028);
    const pent = [62, 64, 66, 69, 71, 74, 76, 78, 81];
    if (s % 2 === 0 && hash(i * 7 + 3) < 0.42) pluck(d, w, NOTE(pent[Math.floor(hash(i * 13) * pent.length)]), 0.07);
    if ((s === 0 || s === 10) && bar % 2 === 0) bell(d, w, NOTE(pent[(bar * 3 + s) % 9] + 12), 0.035);
    if (s === 6 && hash(i) < 0.5) tone(d, w, 1200 + hash(i * 3) * 800, 0.12, { f2: 2400, v: 0.025 }); // water drop
  } },
  hell: { bpm: 54, step(i, w, d) {
    const s = i % 16, bar = Math.floor(i / 16), sd = 60 / 54 / 4;
    if (s === 0) { tone(d, w, NOTE(38), sd * 16 + 0.3, { type: 'sawtooth', lp: 260, a: 0.4, sus: 1, d: 0.2, r: 0.6, v: 0.07 }); tone(d, w, NOTE(44), sd * 16 + 0.3, { type: 'sawtooth', lp: 220, a: 0.4, sus: 1, d: 0.2, r: 0.6, v: 0.05, detune: 7 }); noise(d, w, sd * 16, { type: 'lowpass', f: 180, q: 0.5, a: 0.5, sus: 1, d: 0.3, r: 0.5, v: 0.12 }); }
    if (s === 0 || s === 6 || s === 10) taiko(d, w, s === 0 ? 0.55 : 0.35, 70);
    if (s === 8 && bar % 2 === 1) for (const n of [50, 51, 56]) tone(d, w, NOTE(n), 0.9, { type: 'sawtooth', lp: 1400, lp2: 200, v: 0.045 });
    if (s === 13 && hash(i) < 0.4) { for (const f of [523, 1390, 2270]) tone(d, w, f * (0.9 + hash(i * 3) * 0.2), 0.5, { v: 0.018, rev: 1 }); }
  } },
  memory: { bpm: 96, step(i, w, d) { // 3/4 music box, 8th grid (use every other 16th)
    if (i % 2) return; const e = i / 2, bar = Math.floor(e / 6), s = e % 6;
    const mel = [76, 81, 84, 83, 81, 76, 77, 81, 84, 83, 79, 76, 74, 77, 81, 79, 77, 74, 76, 80, 83, 81, 0, 0];
    const n = mel[(bar % 4) * 6 + s]; if (n) mbox(d, w, NOTE(n), 0.07);
    const bass = [45, 41, 38, 40][bar % 4];
    if (s === 0) mbox(d, w, NOTE(bass + 12), 0.05); if (s === 2 || s === 4) mbox(d, w, NOTE(bass + 19), 0.03);
  } },
  thread: { bpm: 72, step(i, w, d) {
    const bar = Math.floor(i / 16), s = i % 16, ch = [[52, 59, 66, 67, 71], [48, 55, 64, 67, 71], [45, 52, 60, 64, 71], [47, 54, 63, 66, 69]][bar % 4];
    if (s === 0) pad(d, w, ch.slice(0, 3).map(NOTE), 16 * 60 / 72 / 4, 0.03);
    if (s < 10) pluck(d, w, NOTE(ch[s % 5] + 12 * Math.floor(s / 5) + 12), 0.05);
    if (s === 12) bell(d, w, NOTE(ch[4] + 12), 0.03);
  } },
  climb: { bpm: 152, step(i, w, d) {
    const s = i % 16, bar = Math.floor(i / 16);
    const bs = [40, 40, 52, 40, 43, 40, 45, 40, 40, 40, 52, 40, 47, 46, 45, 43];
    tone(d, w, NOTE(bs[s] + (bar % 4 === 3 ? 2 : 0)), 0.09, { type: 'square', lp: 900, v: 0.06 });
    if (s % 4 === 0) taiko(d, w, s === 0 ? 0.5 : 0.32, 80);
    if (s === 4 || s === 12) noise(d, w, 0.12, { f: 1800, q: 0.7, v: 0.12 });
    if (s % 2 === 0) noise(d, w, 0.03, { type: 'highpass', f: 7000, v: 0.05 });
    if (s === 0 && bar % 2 === 0) for (const n of [64, 67, 71]) tone(d, w, NOTE(n), 0.35, { type: 'sawtooth', lp: 2400, lp2: 600, v: 0.03 });
    if (bar % 2 === 1 && s >= 8) tone(d, w, NOTE(76 + (s - 8)), 0.08, { type: 'square', lp: 3000, v: 0.022 });
  } },
  snap: { bpm: 100, step(i, w, d) {
    const s = i % 16, bar = Math.floor(i / 16), sd = 60 / 100 / 4;
    if (s === 0) for (const n of [52, 53, 59]) tone(d, w, NOTE(n + bar), sd * 16, { type: 'sawtooth', lp: 1600, a: 0.3, sus: 1, d: 0.2, r: 0.1, v: 0.03, trem: 13 });
    const hb = bar >= 2 ? [0, 2, 8, 10] : [0, 2];
    if (hb.includes(s)) taiko(d, w, s % 8 === 0 ? 0.45 : 0.3, 60);
    if (s % 4 === 2) tone(d, w, NOTE(88 + bar), 0.05, { v: 0.015 });
  } },
  ending: { bpm: 54, step(i, w, d) {
    const bar = Math.floor(i / 16), s = i % 16, ch = [[50, 57, 61, 66], [47, 54, 62, 66], [43, 50, 59, 66], [45, 52, 61, 64]][bar % 4];
    if (s === 0) pad(d, w, ch.map(NOTE), 16 * 60 / 54 / 4, 0.026);
    const pent = [74, 76, 78, 81, 83, 86];
    if ((s === 4 || s === 12) && hash(i * 5) < 0.6) bell(d, w, NOTE(pent[Math.floor(hash(i * 11) * 6)]), 0.03);
    if (s === 8 && hash(i * 3) < 0.5) pluck(d, w, NOTE(pent[Math.floor(hash(i * 17) * 6)] - 12), 0.04);
  } },
};

/* ---- sound effects ---- */
const SFX = {
  open(w) { tone(AU.sfx, w, 660, 0.06, { type: 'square', v: 0.05, lp: 3000 }); tone(AU.sfx, w + 0.05, 990, 0.09, { type: 'square', v: 0.05, lp: 3000 }); },
  close(w) { tone(AU.sfx, w, 880, 0.05, { type: 'square', v: 0.035, lp: 2500 }); tone(AU.sfx, w + 0.04, 587, 0.07, { type: 'square', v: 0.035, lp: 2500 }); },
  excl(w) { tone(AU.sfx, w, 1320, 0.06, { type: 'square', v: 0.07, lp: 4000 }); tone(AU.sfx, w + 0.07, 1980, 0.18, { type: 'square', v: 0.07, lp: 5000 }); },
  shine(w, dur = 1) { for (let k = 0; k < dur * 14; k++) { const t = w + k / 14 + Math.random() * 0.03; tone(AU.sfx, t, 2400 + Math.random() * 2600, 0.25, { v: 0.03, rev: 1 }); } tone(AU.sfx, w, 1760, dur + 0.4, { a: 0.1, sus: 1, d: 0.1, r: 0.4, v: 0.02, trem: 7, rev: 1 }); },
  drip(w) { tone(AU.sfx, w, 900, 0.15, { f2: 1900, glide: 0.08, v: 0.12 }); tone(AU.sfx, w + 0.12, 1400, 0.12, { f2: 2400, v: 0.05 }); },
  clang(w) { for (const [f, v] of [[380, 0.1], [1010, 0.06], [1730, 0.05], [2460, 0.03]]) tone(AU.sfx, w, f, 0.6, { v, rev: 1 }); noise(AU.sfx, w, 0.05, { f: 3000, v: 0.15 }); },
  breath(w) { noise(AU.sfx, w, 0.32, { f: 1100, q: 0.7, a: 0.06, v: 0.12 }); noise(AU.sfx, w + 0.4, 0.3, { f: 900, q: 0.7, a: 0.06, v: 0.1 }); },
  whoosh(w) { noise(AU.sfx, w, 0.22, { f: 400, f2: 2200, q: 1.2, a: 0.03, v: 0.2 }); },
  thud(w) { tone(AU.sfx, w, 140, 0.18, { f2: 60, v: 0.25 }); noise(AU.sfx, w, 0.06, { f: 500, v: 0.1 }); },
  crackle(w) { for (let k = 0; k < 5; k++) noise(AU.sfx, w + Math.random() * 0.25, 0.015, { type: 'highpass', f: 3000 + Math.random() * 3000, v: 0.12 }); },
  snap(w) { noise(AU.sfx, w, 0.09, { type: 'highpass', f: 2500, v: 0.4 }); tone(AU.sfx, w, 2200, 0.25, { f2: 260, glide: 0.2, type: 'triangle', v: 0.2 }); tone(AU.sfx, w, 90, 0.4, { f2: 40, v: 0.3 }); },
  fall(w, dur) { tone(AU.sfx, w, 1100, dur, { f2: 160, glide: dur, v: 0.07, type: 'triangle' }); noise(AU.sfx, w, dur, { f: 600, f2: 2500, q: 0.8, a: dur * 0.6, v: 0.22 }); },
  splash(w, big = 1) { noise(AU.sfx, w, 1.2 * big + 0.3, { type: 'lowpass', f: 2200, f2: 200, q: 0.5, v: 0.5 * big }); noise(AU.sfx, w, 0.25, { type: 'highpass', f: 2000, v: 0.25 * big }); tone(AU.sfx, w, 80, 0.5, { f2: 35, v: 0.35 * big }); for (let k = 0; k < 8 * big; k++) tone(AU.sfx, w + 0.2 + Math.random() * 0.9, 300 + Math.random() * 500, 0.06, { f2: 900, v: 0.04 }); },
  sparkle(w) { tone(AU.sfx, w, 2637, 0.25, { v: 0.04, rev: 1 }); tone(AU.sfx, w + 0.08, 3520, 0.3, { v: 0.03, rev: 1 }); },
  end(w) { for (const [k, n] of [[0, 74], [0.18, 78], [0.36, 81], [0.54, 86]]) bell(AU.sfx, w + k, NOTE(n), 0.05); },
};

/* ---- BGM scheduler ---- */
const BGM = { tracks: [], timer: null };
function bgmStart(tracks, T0) {
  const ac = AU.ctx;
  BGM.tracks = tracks.map(tr => {
    const g = ac.createGain(); g.connect(AU.bgm); const a = T0 + tr.a, b = T0 + tr.b;
    g.gain.setValueAtTime(0.0001, ac.currentTime); g.gain.setValueAtTime(0.0001, a); g.gain.linearRampToValueAtTime(1, a + (tr.fin || 1));
    if (isFinite(b)) { if (tr.cut) { g.gain.setValueAtTime(1, b - 0.02); g.gain.linearRampToValueAtTime(0.0001, b); } else { g.gain.setValueAtTime(1, b - (tr.fout || 1.2)); g.gain.linearRampToValueAtTime(0.0001, b); } }
    return Object.assign({ g, A: a, B: b, next: 0 }, tr);
  });
  const tick = () => {
    const now = ac.currentTime, ahead = now + 0.3;
    for (const tr of BGM.tracks) {
      const st = STYLES[tr.style], sd = 60 / st.bpm / 4;
      while (true) { const w = tr.A + tr.next * sd; if (w > ahead || w > tr.B) break; if (w >= now - 0.05) st.step(tr.next, Math.max(w, now), tr.g); tr.next++; }
    }
  };
  if (BGM.all) { // offline test: schedule everything now
    for (const tr of BGM.tracks) { const st = STYLES[tr.style], sd = 60 / st.bpm / 4; for (let k = 0; ; k++) { const w = tr.A + k * sd; if (w > tr.B || w > BGM.all) break; st.step(k, w, tr.g); } }
    return;
  }
  tick(); BGM.timer = setInterval(tick, 50);
}
