/* ================= 001 蜘蛛の糸 long version: extra scenes + extended versions of the original ones ================= */
const lnk = (S, id) => S.lines.find(l => l.id === id);
const atk = (S, id, k = 0, def = 0) => { const l = lnk(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastK = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);
/* a scene that keeps the original choreography but may carry more lines (and a chapter title) */
function ext(base, o = {}) {
  const sc = Object.create(base);
  sc.init = function (S) { (o.init || base.init).call(this, S); if (o.after) o.after(S); S.dur = Math.max(S.dur, lastK(S) + (o.tail != null ? o.tail : 1.6)); };
  if (o.ch) sc.ch = o.ch; if (o.name) sc.name = o.name; if (o.bgm !== undefined) sc.bgm = o.bgm;
  return sc;
}
S1.ch = '極楽の蓮池';
S6.ch = '糸が切れる';
/* S2 with the narration about the pond's depths, and the man who caught the Buddha's eye */
const S2x = ext(S2, { ch: '池の底の地獄', tail: 2.0 });
/* S2 again, now seen from below (no water ripple): the blood pond */
const S2b = ext(S2, { ch: '血の池', name: '血の池', after(S) { S.clear = 0.01; }, tail: 1.4 });
/* S3: the spider in the wood — foot raised on the last part of L3, Kandata's own thought, foot lowered on L3b */
const S3x = ext(S3, {
  ch: '小さな善いこと',
  init(S) {
    const L = lnk(S, 'L3'), B = lnk(S, 'L3b');
    S.tStop = L.t0 + L.segs[L.segs.length - 1].a - 0.5; S.tLift = S.tStop + 0.22; S.tUp = S.tLift + 0.28; S.tExcl = S.tUp + 0.05;
    S.tLower = B ? B.t0 + B.segs[Math.min(1, B.segs.length - 1)].a + 0.05 : L.se + 0.5; S.tDown = S.tLower + 0.4; S.tGo = S.tDown + 0.9;
    S.kx0 = 30; S.kStop = 260; S.walkV = (S.kStop - S.kx0) / (S.tStop - 0.3);
    S.spX = S.kStop + 20; S.tSpArr = S.tStop - 0.25; S.dur = lastK(S) + 1.6;
  }
});
/* S7: the ending carries two more lines about the lotus */
const S7x = ext(S7, {
  init(S) {
    const A = lnk(S, 'L7a'), B = lnk(S, 'L7b');
    S.tUp = A.se + 0.2; S.tWalk = B.t0 + B.segs[1].a; S.tFade0 = S.tWalk + 0.9; S.tFade1 = S.tFade0 + 3.2; S.tEnd = lastK(S) + 1.0; S.dur = 1e9; S.bx = 196;
  }
});

/* ---- SA: the white lotus, the golden stamens and the scent ---- */
const SA = {
  name: '蓮の花', bgm: 'paradise',
  init(S) { S.dur = lastK(S) + 1.4; },
  draw(c, t, S) {
    paradiseBack(c, t, 40); rays(c, t, 6, 1.3);
    VG(c, 0, 96, W, H - 96, [C.water0, C.water1, C.water2]);
    for (let i = 0; i < 18; i++) { const y = 100 + (i * 29 % 120), x = mod(i * 71 + Math.sin(t * 0.8 + i) * 10, W + 40) - 20; if (Math.sin(t * 2 + i * 1.7) > -0.2) R(c, x, y, 4 + (i % 4) * 3, 1, DA(C.white, 0.7)); }
    for (let i = 0; i < 6; i++) { const x = [30, 280, 70, 240, 10, 310][i], y = [112, 108, 150, 156, 170, 172][i]; lotusPad(c, x, y + Math.sin(t * 1.3 + i), 16 + (i % 3) * 4, 4 + (i % 2), i); }
    // the big lotus in the middle, opening
    const op = lerp(0.35, 1, ss(sg(t, 0.2, 5.5)));
    lotusPad(c, 160, 146, 52, 12, 0.3);
    E(c, 160, 104, 46 + Math.sin(t * 2) * 3, 34, DA(C.gold0, 0.18));
    lotus(c, 160, 136, 4.2, op, t, 7);
    // golden stamens glow + scent motes rising and swirling
    E(c, 160, 116, 10, 5, DA(C.gold0, 0.5 + 0.2 * Math.sin(t * 3)));
    for (let i = 0; i < 28; i++) { const u = fr(t * 0.18 + hash(i)), a = u * 7 + i, r = 6 + u * 60; const x = 160 + Math.cos(a) * r * 0.8, y = 114 - u * 100 + Math.sin(a * 1.3) * 6; if (u > 0.05) P(c, x, y, DA(i & 1 ? C.gold0 : C.white, 0.9 * (1 - u))); }
    dragonfly(c, 160 + Math.sin(t * 0.5) * 120, 60 + Math.sin(t * 1.1) * 12, t);
    return { z: lerp(1.0, 1.18, ss(t / S.dur)), fx: 160, fy: 104 };
  }
};

/* ---- SB: the great thief — killing, arson (in the dark, as a memory) ---- */
const SB = {
  name: '大泥棒', ch: '大泥棒 犍陀多', bgm: 'hell',
  init(S) { const L = S.lines[0]; S.tFire = L.t0 + L.segs[Math.min(3, L.segs.length - 1)].a - 0.2; S.tGood = L.t0 + L.segs[Math.min(5, L.segs.length - 1)].a - 0.2; S.dur = lastK(S) + 1.4; },
  draw(c, t, S) {
    const good = ss(sg(t, S.tGood, S.tGood + 1.2));
    VG(c, 0, 0, W, 130, ['#0c0814', '#1c1020', '#3c1414']); R(c, 0, 128, W, H - 128, '#1c140c');
    // old village: houses, one burning
    for (let i = 0; i < 5; i++) { const x = 20 + i * 64, y = 128; R(c, x, y - 26, 44, 26, '#3c2c20'); PF(c, [x - 6, y - 24, x + 22, y - 42, x + 50, y - 24], '#2c201c'); R(c, x + 18, y - 16, 8, 16, '#140c08'); }
    const fk = ss(sg(t, S.tFire, S.tFire + 1.5));
    if (fk > 0) { for (let i = 0; i < 7; i++) flame(c, 92 + i * 7, 104 - (i % 3) * 4, 6 + fk * 8 + (i % 2) * 3, t, i); embers(c, t, 20, 3, [60, 20, 120, 110], [C.hell6, C.hell7]); E(c, 112, 100, 60 * fk, 40 * fk, DA(C.hell5, 0.18)); }
    // the thief running with his loot
    const x = mod(30 + t * 26, 400) - 40;
    blit(c, kanSideSpr({ t, f: Math.floor(t * 8) & 3, id: 'kthief' }), x, 150, KS_AX, KS_AY);
    E(c, x - 8, 112, 6, 5, '#5c4c3c'); P(c, x - 8, 106, '#3c2c20');
    // red tint fades into a small warm light: "one good deed"
    c.fillStyle = DA('#3c0c0c', 0.25 * (1 - good)); c.fillRect(0, 0, W, H);
    if (good > 0) { c.fillStyle = DA('#000000', 0.7 * good); c.fillRect(0, 0, W, H); const r = 6 + good * 10 + Math.sin(t * 4) * 1.5; E(c, 160, 96, r * 2, r * 2, DA(C.gold0, 0.18 * good)); E(c, 160, 96, r, r, DA(C.gold0, 0.6 * good)); E(c, 160, 96, r * 0.4, r * 0.4, DA(C.white, good)); }
    return { z: 1 + 0.12 * ss(t / S.dur), fx: good > 0.5 ? 160 : 140, fy: 100 };
  }
};

/* ---- SC: the paradise spider spinning its silver thread on a jade leaf ---- */
const SC = {
  name: '極楽の蜘蛛', ch: '極楽の蜘蛛', bgm: 'thread',
  init(S) { const L = S.lines[0]; S.tLeaf = L.t0 + L.segs[Math.min(2, L.segs.length - 1)].a - 0.3; S.dur = lastK(S) + 1.2; },
  draw(c, t, S) {
    const k = ss(sg(t, S.tLeaf, S.tLeaf + 1.4));
    paradiseBack(c, t, 80); rays(c, t, 10, 1.2);
    VG(c, 0, 90, W, H - 90, [C.water0, C.water1]);
    // jade lotus leaf filling the frame
    E(c, 160, 132, 150, 46, '#2c8c64'); E(c, 160, 128, 146, 42, '#48b07c'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; L(c, 160, 128, 160 + Math.cos(a) * 140, 128 + Math.sin(a) * 40, '#3c9c6c'); }
    E(c, 160, 128, 6, 3, '#2c8c64');
    for (let i = 0; i < 5; i++) { const x = 60 + i * 48, y = 118 + (i % 2) * 14; E(c, x, y, 3, 2, DA(C.white, 0.8)); P(c, x - 1, y - 1, C.white); } // dew
    // the silver web
    const wx = 160, wy = 76, n = 10, sp = 0.4 + 0.6 * k;
    for (let i = 0; i < n; i++) { const a = i / n * TAU; L(c, wx, wy, wx + Math.cos(a) * 46 * sp, wy + Math.sin(a) * 34 * sp, DA('#e8f0ff', 0.75)); }
    for (let r = 1; r <= 5; r++) { const pts = []; for (let i = 0; i <= n; i++) { const a = i / n * TAU; pts.push(wx + Math.cos(a) * r * 9 * sp, wy + Math.sin(a) * r * 6.6 * sp); } PL(c, pts, DA('#dce8f8', 0.6)); }
    for (let i = 0; i < 6; i++) { const a = t * 0.9 + i; P(c, wx + Math.cos(a) * 30 * sp, wy + Math.sin(a * 1.3) * 22 * sp, C.white); }
    L(c, wx, -2, wx, wy, '#dce8f8'); threadPulses(c, wx, -20, wy, t, 2, 0.5);
    blit(c, spiderSpr({ t, f: Math.floor(t * 4) & 1, blink: blinkOf(t, 41), happy: true }), wx, wy + Math.sin(t * 1.4) * 2, SPI_AX, SPI_AY, { s: 2 });
    return { z: lerp(1.0, 1.25, k), fx: 160, fy: lerp(110, 90, k) };
  }
};

/* ---- SD: in the dark, a silver thread comes down; Kandata grabs it and climbs ---- */
const SD = {
  name: '銀の糸', ch: '銀の糸', bgm: 'thread',
  init(S) {
    const A = lnk(S, 'N7') || S.lines[0], B = lnk(S, 'N8');
    S.tLook = A.t0 + A.segs[Math.min(2, A.segs.length - 1)].a - 0.2; S.tThr = A.t0 + A.segs[Math.min(3, A.segs.length - 1)].a; S.tArr = A.se;
    S.tClap = B ? B.t0 + B.segs[1].a : 1e9; S.tGrab = B ? B.t0 + B.segs[2].a : 1e9; S.tClimb = B ? B.t0 + B.segs[3].a : 1e9;
    S.dur = lastK(S) + 1.2;
  },
  draw(c, t, S) {
    hellBack(c, t, 20);
    c.fillStyle = DA('#000000', 0.45); c.fillRect(0, 0, W, 120);
    waveBand(c, 120, 1.5, 0.08, 0.7, t, C.blood1, C.blood2);
    for (let i = 0; i < 8; i++) { const x = mod(i * 47 + 10, 360) - 20; if (Math.abs(x - 160) < 24) continue; miniSinner(c, x, waveY(x, 124, 1.5, 0.08, 0.7, t) + Math.sin(t * 1.4 + i) * 1.5, t, i, C.sin1, C.sin2); }
    waveBand(c, 128, 2, 0.06, -1.2, t, C.blood2, C.blood3);
    const kx = 160, climb = Math.max(0, t - S.tClimb) * 16, ky = 140 - climb;
    // the thread
    const tip = t < S.tThr ? -20 : lerp(-20, ky - 52, ss(sg(t, S.tThr, S.tArr)));
    if (tip > -20) { L(c, kx, -2, kx, tip, '#dce8f8'); threadPulses(c, kx, -20, tip, t, 3, 0.7); tipSpark(c, kx, tip, t); E(c, kx, tip, 10, 10, DA(C.white, 0.08)); }
    // Kandata: struggling → looking up → clapping → grabbing → climbing
    let pz, ex = 'scared';
    if (t < S.tLook) pz = kanPose('pond', 0, t);
    else if (t < S.tGrab) { const r = t < S.tClap ? 0.25 : 0.25 + 0.15 * Math.abs(Math.sin((t - S.tClap) * 9)); pz = kanPose('reach', r, t); ex = t < S.tArr ? 'surp' : 'grin'; }
    else if (t < S.tClimb) { pz = kanPose('reach', 1, t); ex = 'grin'; }
    else { pz = kanPose('climb', Math.floor(climb / 2.75) & 3, t); ex = 'grin'; }
    blit(c, kanFrontSpr({ t, pz, expr: ex, blink: blinkOf(t, 27) }), kx, ky, FIG_AX, FIG_AY);
    if (t > S.tLook && t < S.tLook + 0.5) exclaim(c, kx + 14, ky - 46, t - S.tLook);
    waveBand(c, 146, 2.6, 0.05, 2.0, t, C.blood2, C.blood4); VG(c, 0, 160, W, 80, [C.blood1, C.blood0]);
    embers(c, t, 24, 5, [0, 0, W, 160], [C.hell6, C.hell5]);
    return { z: lerp(1.1, 1.35, ss(sg(t, S.tLook, S.tArr))), fx: kx, fy: clamp(ky - 40, 70, 110) };
  }
};

/* ---- SE: "tens of thousands of ri" — tired, resting, looking down ---- */
const SE = {
  name: '何万里', ch: '登る', bgm: 'climb',
  init(S) {
    const A = S.lines[0], B = lnk(S, 'N10');
    S.tRest = A.t0 + A.segs[Math.min(3, A.segs.length - 1)].a; S.tLookD = A.t0 + A.segs[Math.min(6, A.segs.length - 1)].a - 0.2;
    S.tBelow = B ? B.t0 - 0.2 : 1e9; S.dur = lastK(S) + 1.2;
  },
  draw(c, t, S) {
    const h = Math.min(t, S.tRest) * 18, alt = 0.1 + h / 300 * 0.2;
    climbBack(c, t, alt, h);
    L(c, 160, -2, 160, H + 2, '#dce8f8'); threadPulses(c, 160, -40, H + 40, t, 5, 0.5);
    const below = ss(sg(t, S.tBelow, S.tBelow + 2));
    if (below > 0) { // far below: the pond hidden in the dark, the needle mountains under his feet
      c.fillStyle = DA('#000000', 0.5 * below); c.fillRect(0, 120, W, H - 120);
      needleMountains(c, 20, 176, 280, 22 * below, 11, C.rock1, C.hell3); E(c, 160, 176, 120, 10, DA(C.hell4, 0.25 * below));
    }
    let pz, ex = 'grin', by = 0;
    if (t < S.tRest) pz = kanPose('climb', Math.floor(h / 2.75) & 3, t);
    else if (t < S.tLookD) { pz = kanPose('rest', 0, t); by = Math.round(Math.sin(t * 8) * 1); ex = 'angry'; }
    else { pz = kanPose('look', 0, t); ex = t < S.tBelow ? 'normal' : 'grin'; }
    const ky = 100;
    blit(c, kanFrontSpr({ t, pz, by, expr: ex, blink: blinkOf(t, 29), mouth: t > S.tRest && t < S.tLookD ? (Math.floor(t * 4) & 1) : 0 }), 160, ky, FIG_AX, FIG_AY);
    for (let i = 0; i < 4; i++) sweat(c, 160 + (i & 1 ? 6 : -6), ky - 36, t, S.tRest + 0.2 + i * 0.4, i + 7);
    for (let i = 0; i < 3; i++) { const u = t - (S.tRest + 0.3 + i * 0.6); if (u > 0 && u < 0.5) E(c, 168 + u * 14, ky - 27 - u * 6, 2 + u * 6, 1.5 + u * 3, DA(C.white, 0.7 * (1 - u / 0.5))); }
    return { z: lerp(1.3, 1.0, below), fx: 160, fy: lerp(ky - 30, 110, below) };
  }
};

/* ---- SF: like a line of ants, the sinners climb after him ---- */
const SF = {
  name: '蟻の行列', ch: '蟻の行列', bgm: 'climb',
  init(S) { const B = lnk(S, 'N12'); S.tStrain = B ? B.t0 : 1e9; S.dur = lastK(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#1c1428', '#2c1c2c', '#4c1c18', '#7c2414']);
    for (let i = 0; i < 30; i++) P(c, (i * 71) % W, mod(i * 37 + t * 6, H), DA(C.hell5, 0.6));
    E(c, 160, 230, 200, 40, DA(C.hell4, 0.35));
    const strain = ss(sg(t, S.tStrain, S.tStrain + 3)), j = strain * 1.5;
    // the thread, trembling
    const pts = []; for (let y = -2; y <= H + 2; y += 6) pts.push(160 + Math.sin(y * 0.3 + t * 30) * j * hash(y + Math.floor(t * 20)), y); PL(c, pts, '#dce8f8');
    threadPulses(c, 160, -20, H, t, 4, 0.6);
    // the line of sinners — more of them keep coming
    const n = Math.min(14, 3 + Math.floor(t * 1.4));
    for (let k = 0; k < n; k++) {
      const s = Math.max(0.3, 0.55 - k * 0.025), y = 122 + k * 26 * s / 0.55 - fr(t * 0.25) * 12, f = Math.floor(t * 6 + k * 1.7) & 3;
      if (y > H + 20) continue;
      blit(c, sinnerSpr(k % 3, 'climb', f), 160 + (k & 1 ? 2 : -2), y, FIG_AX, FIG_AY, { s });
    }
    // Kandata above, looking down in fear
    const ky = 74;
    blit(c, kanFrontSpr({ t, pz: kanPose('look', 0, t), by: Math.round(Math.sin(t * 12) * strain), expr: 'surp', blink: blinkOf(t, 31) }), 160, ky, FIG_AX, FIG_AY);
    for (let i = 0; i < 6; i++) sweat(c, 160 + (i & 1 ? 7 : -7), ky - 34, t, S.tStrain + i * 0.5, i + 40);
    if (strain > 0.5 && (Math.floor(t * 5) & 1)) { for (let i = 0; i < 3; i++) P(c, 160 + (i - 1) * 2, ky - 46 - i, C.white); }
    return { z: lerp(1.0, 1.35, strain), fx: 160, fy: lerp(110, ky + 30, strain), sx: Math.round(Math.sin(t * 50) * strain) };
  }
};

/* ---- SG: falling like a top; then only the short thread, in a sky without moon or stars ---- */
const SG = {
  name: '残された糸', bgm: 'memory',
  init(S) { const A = S.lines[0], B = lnk(S, 'N14'); S.tF0 = A.t0; S.tF1 = A.se; S.tEmpty = B ? B.t0 - 0.4 : 1e9; S.dur = lastK(S) + 1.6; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#05050c', '#0c0c18', '#140c14']);
    if (t < S.tEmpty) {
      const u = sg(t, S.tF0, S.tF1), y = lerp(-30, 260, u);
      for (let i = 0; i < 16; i++) { const x = 40 + hash(i) * 240, yy = mod(hash(i * 3) * H - t * 260, H + 40) - 20; L(c, x, yy, x, yy + 18, DA('#3c3c5c', 0.7)); }
      blit(c, kanFrontSpr({ t, pz: kanPose('fall', 0, t), expr: 'scared', blink: 0, mouth: 1, id: 'kfall' }), 160 + Math.sin(t * 3) * 10, y, FIG_AX, FIG_AY, { rot: t * 9, s: 0.9 });
      return { z: 1, fx: 160, fy: 110 };
    }
    // the short thread still glittering
    const v = t - S.tEmpty, sw = Math.sin(t * 0.9) * 4, len = 70;
    L(c, 160, -2, 160 + sw, len, '#dce8f8'); threadPulses(c, 160, -10, len, t, 2, 0.4); tipSpark(c, 160 + sw, len, t);
    if ((Math.floor(t * 3) & 3) === 0) { P(c, 161 + sw * 0.5, len * 0.5, C.white); }
    return { z: lerp(1.0, 1.3, ss(sg(v, 0, 8))), fx: 160, fy: lerp(110, 60, ss(sg(v, 0, 8))) };
  }
};

/* ---- SH: the Buddha, standing at the edge of the pond, has watched it all ---- */
const SH = {
  name: '見ていたお釈迦様', ch: '結び', bgm: 'paradise',
  init(S) { S.dur = lastK(S) + 0.8; },
  draw(c, t, S) {
    const camX = 60;
    paradiseBack(c, t, camX); rays(c, t, camX * 0.15, 0.8);
    VG(c, 0, 80, W, 36, [C.water0, C.water1]);
    for (let i = 0; i < 14; i++) { const x = mod(i * 41 - camX * 0.5, 460) - 40, y = 86 + (i * 7 % 22); lotusPad(c, x, y + Math.sin(t * 1.4 + i) * 0.7, 7 + (i % 3) * 2, 2 + (i % 2), i); if (i % 3 === 0) lotus(c, x + 2, y - 1, 0.8, 0.8, t, i); }
    causeway(c, camX, 114);
    const bs = buddhaSpr({ t, f: -1, look: 1, sad: 1, blink: blinkOf(t, 17) }), br = Math.round(Math.sin(t * 2.2) * 0.6 + 0.4);
    halo(c, 160, 117 - BUD_AY + BUD_HEAD[1] + br + 1.5, 11, t);
    blit(c, bs, 160, 118 + br, BUD_AX, BUD_AY);
    nearWater(c, t, camX, 126);
    reflect(c, bs, 160 - BUD_AX - 1, 132, t, 0.5);
    // in the water below his gaze: a faint red glow sinking away
    const k = 1 - ss(sg(t, 0, S.dur)); E(c, 160, 150, 26, 6, DA(C.hell4, 0.25 * k)); ripple(c, 160, 148, fr(t / 2.4) * 2.4, 2.4, 18, C.water0);
    return { z: lerp(1.15, 1.35, ss(t / S.dur)), fx: 160, fy: 96 };
  }
};
