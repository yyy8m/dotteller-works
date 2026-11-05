/* ================= 記録 #001 エド・ゲイン: scenes (1) — origins to the first murder ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const endOf = (S, id, def = 0) => { const l = ln(S, id); return l ? l.se : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;

/* ---- cast ---- */
const GEIN = { id: 'gein', coat: '#7c4c34', coat2: '#4c2c20', plaid: true, pants: '#3c3c44', skin: '#dcb08c', hat: 'hunt', hatCol: '#b82020', hatCol2: '#2c1010' };
const EDBOY = { id: 'edboy', coat: '#6c6c7c', coat2: '#4c4c5c', pants: '#3c3c44', skin: '#e8c0a0', hair: '#7c5c3c' };
const HENRY = { id: 'henry', coat: '#5c6c4c', coat2: '#3c4c34', pants: '#3c3c44', skin: '#dcb08c', hair: '#5c3c2c' };
const AUGUSTA = { id: 'aug', coat: '#1c1c24', coat2: '#0c0c14', pants: '#1c1c24', dress: '#1c1c24', skin: '#e0c0a8', hair: '#8c8890' };
const GEORGE = { id: 'geo', coat: '#5c4c3c', coat2: '#3c3028', pants: '#3c3430', skin: '#d8a888', hair: '#3c2c1c' };
const MARY = { id: 'mary', coat: '#7c3c4c', coat2: '#5c2434', pants: '#2c2c2c', dress: '#7c3c4c', skin: '#ecc4a4', hair: '#3c2418' };
const BERNICE = { id: 'bern', coat: '#4c5c8c', coat2: '#344068', pants: '#2c2c2c', dress: '#4c5c8c', skin: '#ecc8b0', hair: '#a8a4a8' };
const HUNTER = { id: 'hunt', coat: '#e86c1c', coat2: '#a84810', pants: '#3c3c44', skin: '#e0b08c', hat: 'hunt', hatCol: '#f87c1c', hatCol2: '#c85810' };
const TOWN = [{ id: 't1', coat: '#5c5c6c', coat2: '#3c3c4c', pants: '#2c2c34', skin: '#e0b08c', hat: 'fedora', hatCol: '#2c2620' }, { id: 't2', coat: '#6c4c3c', coat2: '#4c3428', pants: '#2c2c34', skin: '#e8c0a0', hair: '#5c3c2c' }];

/* portrait 48x48: gaunt face, plaid cap with flaps, lopsided half-smile */
function geinFace(p = {}) {
  const ex = p.expr || 'smile', bl = p.blink || 0;
  return SPR('geinFace' + ex + bl, 48, 48, c => {
    const sk = '#dcb08c', sk2 = '#b48464', sk3 = '#84583c', red = '#b82020', blk = '#2c1010';
    PF(c, [2, 48, 8, 38, 18, 36, 30, 36, 40, 38, 46, 48], '#7c4c34');
    for (let x = 4; x < 46; x += 5) L(c, x, 38, x - 2, 48, '#4c2c20'); for (let y = 40; y < 48; y += 4) R(c, 4, y, 40, 1, '#5c3424');
    PF(c, [18, 36, 24, 44, 30, 36, 27, 35, 24, 39, 21, 35], '#d8d0c0');
    R(c, 19, 31, 10, 6, sk2);
    E(c, 24, 22, 10, 13, sk3); E(c, 24, 21.5, 9.5, 12.5, sk2); E(c, 23.5, 20.5, 8.5, 11.5, sk);
    L(c, 16, 25, 18, 30, sk2); L(c, 32, 25, 30, 30, sk2);
    E(c, 14, 21, 2, 3, sk2); E(c, 34, 21, 2, 3, sk2);
    PF(c, [13, 13, 15, 5, 24, 2, 33, 5, 35, 13], red); for (let x = 15; x < 35; x += 4) R(c, x, 4, 2, 9, blk); R(c, 13, 9, 22, 1, blk);
    R(c, 12, 12, 24, 2, '#8c1818'); PF(c, [22, 13, 38, 13, 36, 16, 24, 16], '#8c1818');
    for (const fx of [10, 33]) { R(c, fx, 13, 5, 10, red); R(c, fx + 1, 15, 3, 1, blk); R(c, fx + 1, 19, 3, 1, blk); }
    L(c, 18, 16, 22, 16, sk3); L(c, 26, 16, 30, 15, sk3);
    for (const x0 of [18, 26]) { if (bl === 2) { L(c, x0, 19, x0 + 3, 19, C.ol); continue; } R(c, x0, 18, 4, 2, '#f4ecdc'); R(c, x0 + 1, 18, 2, 2, C.k); L(c, x0, 17, x0 + 3, 17, C.ol); }
    L(c, 24, 19, 23, 24, sk3); P(c, 22, 25, sk3); P(c, 25, 25, sk3);
    for (let i = 0; i < 18; i++) P(c, 17 + hash(i * 5) * 14, 26 + hash(i * 3) * 6, sk3);
    if (ex === 'smile') { L(c, 20, 29, 25, 29, '#5c2c24'); L(c, 25, 29, 28, 27, '#5c2c24'); } else R(c, 21, 29, 6, 1, '#5c2c24');
  });
}
/* Augusta portrait 48x48: stern, hair in a bun, black dress, high collar */
function augustaFace() {
  return cached('augF', () => SPR(null, 48, 48, c => {
    const sk = '#e4c4ac', sk2 = '#bc9a84';
    PF(c, [4, 48, 10, 36, 38, 36, 44, 48], '#1c1c24'); R(c, 18, 32, 12, 6, '#1c1c24'); R(c, 22, 36, 4, 3, '#e8e0d0');
    E(c, 24, 10, 7, 5, '#8c8890'); E(c, 24, 21, 10, 12, '#8c8890'); E(c, 24, 23, 9, 11, sk2); E(c, 23.5, 22.5, 8.5, 10.5, sk);
    PF(c, [14, 18, 24, 13, 34, 18, 34, 15, 24, 11, 14, 15], '#8c8890');
    L(c, 18, 20, 22, 21, '#4c3c3c'); L(c, 26, 21, 30, 20, '#4c3c3c'); for (const x0 of [18, 26]) { R(c, x0, 23, 4, 1, C.ol); P(c, x0 + 2, 23, '#6c5c5c'); }
    L(c, 24, 23, 24, 27, sk2); R(c, 21, 30, 7, 1, '#7c4c4c'); L(c, 20, 31, 21, 30, '#7c4c4c'); L(c, 28, 30, 29, 31, '#7c4c4c');
  }, null));
}
function framePortrait(c, spr, x, y, s = 1, sepia = false) {
  const w = spr.width * s, h = spr.height * s;
  R(c, x - 6, y - 6, w + 12, h + 12, '#5c3c20'); R(c, x - 4, y - 4, w + 8, h + 8, '#c8a048'); R(c, x - 2, y - 2, w + 4, h + 4, sepia ? '#c8b088' : '#3c3428');
  blit(c, sepia ? tintSpr(spr, '#5c4430', 'sep' + x) : spr, x + w / 2, y + h / 2, spr.width / 2, spr.height / 2, { s });
}
function yearFlash(c, t, t0, year, x = 224, y = 12) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, ''); } }

/* ---- the Gein farm (night) ---- */
function geinFarm(c, t, ox, o = {}) {
  for (let i = 0; i < 16; i++) { const x = i * 46 - ox * 0.4 - 20, h = 34 + (i * 13 % 18); PF(c, [x, 132, x + 12, 132 - h, x + 24, 132], o.day ? '#3c5c3c' : K.night0); }
  if (o.day) { R(c, 0, 128, W, H - 128, '#8c7c4c'); for (let i = 0; i < 40; i++) R(c, mod(i * 37 - ox, W), 132 + (i * 13 % 90), 6, 1, '#a89458'); }
  else snowGround(c, 128, ox * 0.6, H - 128);
  for (let i = 0; i < 18; i++) { const x = i * 30 - ox; if (x < -10 || x > W + 10) continue; R(c, x, 134, 2, 12, K.wood2); }
  L(c, -ox, 138, 540 - ox, 138, K.wood2);
  const bx = 300 - ox; R(c, bx, 92, 60, 44, '#4c2424'); PF(c, [bx - 4, 94, bx + 30, 74, bx + 64, 94], K.wood3);
  if (!o.day) { L(c, bx - 4, 93, bx + 30, 73, K.snow0, 2); L(c, bx + 30, 73, bx + 64, 93, K.snow1, 2); }
  R(c, bx + 20, 112, 20, 24, '#2c1414'); L(c, bx + 20, 112, bx + 40, 136, '#5c2c2c'); L(c, bx + 40, 112, bx + 20, 136, '#5c2c2c');
  house(c, 170 - ox, 136, 76, 58, { t, wall: '#4c4038', wall2: '#383028', roof: K.wood3, rh: 26, snow: !o.day, chimney: true, door: 30,
    windows: [[8, 34, o.lit !== false], [56, 34, false], [10, 8, false], [56, 8, false]] });
  if (o.boarded !== false) { const wx = 170 - ox + 10, wy = 136 - 58 + 8; L(c, wx - 2, wy + 1, wx + 9, wy + 6, K.wood0, 2); L(c, wx - 2, wy + 6, wx + 9, wy + 1, K.wood0, 2); }
  for (const [x, h, sd] of [[120, 70, 3], [262, 60, 8], [420, 80, 5], [40, 54, 9]]) bareTree(c, x - ox, 136, h, sd, o.day ? '#4c3c2c' : K.wood3);
  if (!o.day) smoke(c, 170 - ox + 55, 136 - 58 - 20, t, 2);
}

/* ---- SA: the hook — horror's killers had a real model ---- */
function filmFrames(c, t, t0s, titles, y0 = 44) {
  const fns = [
    (x, X, Y, w, h) => { VG(x, X, Y, w, h, ['#2c3448', '#4c5468']); PF(x, [X + 30, Y + 40, X + 42, Y + 18, X + 56, Y + 22, X + 66, Y + 40], '#0c0c10'); R(x, X + 36, Y + 26, 4, 5, K.win1); R(x, X + 6, Y + 44, 50, 10, '#0c0c10'); R(x, X + 10, Y + 47, 6, 4, K.win1); R(x, X + 22, Y + 47, 6, 4, K.win1); },
    (x, X, Y, w, h) => { VG(x, X, Y, w, h, ['#c86c28', '#f8b048', '#fce090']); R(x, X, Y + 44, w, 16, '#3c2410'); E(x, X + 66, Y + 10, 6, 6, '#fff4c8'); const sx = X + 30, sy = Y + 44; R(x, sx - 4, sy - 22, 9, 14, '#1c1008'); E(x, sx, sy - 26, 4, 4, '#1c1008'); L(x, sx, sy - 8, sx - 4, sy, '#1c1008', 2); L(x, sx + 2, sy - 8, sx + 5, sy, '#1c1008', 2); R(x, sx + 4, sy - 18, 14, 4, '#1c1008'); for (let k = 0; k < 7; k++) P(x, sx + 6 + k * 2, sy - 19 + (k & 1), '#1c1008'); },
    (x, X, Y, w, h) => { R(x, X, Y, w, h, '#e8e0d0'); E(x, X + w / 2, Y + h / 2, 12, 10, '#3c2c20'); PF(x, [X + w / 2, Y + h / 2, X + w / 2 - 22, Y + 12, X + w / 2 - 18, Y + 46], '#6c5038'); PF(x, [X + w / 2, Y + h / 2, X + w / 2 + 22, Y + 12, X + w / 2 + 18, Y + 46], '#6c5038'); E(x, X + w / 2, Y + h / 2 - 2, 3, 2, '#e8e0d0'); }];
  fns.forEach((fn, i) => {
    const k = eOut(sg(t, t0s[i], t0s[i] + 0.6)); if (k <= 0) return;
    const x = 18 + i * 100, y = lerp(-80, y0, k);
    filmFrame(c, x, y, 84, 60, (cc, X, Y, w, h) => fn(cc, X, Y, w, h));
    const ttl = titles[i], w = textSpr(ttl, 16, C.white).width; TX(c, ttl, x + 42 - w / 2, i === 1 ? y - 32 : y + 72, C.white, 16, '#000000');
  });
}
const SA = {
  name: '実在のモデル', ch: 'オープニング', bgm: 'eerie',
  init(S) { S.f = [at(S, 'L1', 0) - 0.2, at(S, 'L1', 1) - 0.2, at(S, 'L1', 2) - 0.2]; S.tReal = at(S, 'L1', 4, 6); S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0c14', '#141420', '#08080c']);
    E(c, 160, 70, 150, 70, DA('#c8d0e0', 0.08 + 0.02 * Math.sin(t * 13)));
    filmFrames(c, t, S.f, ['サイコ', '悪魔のいけにえ', '羊たちの沈黙']);
    for (let i = 0; i < 10; i++) { const x = i * 34; E(c, x + 14, 200, 12, 13, '#000000'); R(c, x, 206, 30, 40, '#000000'); }
    if (t > S.tReal) { const a = sg(t, S.tReal, S.tReal + 0.8); c.fillStyle = DA('#000000', 0.75 * a); c.fillRect(0, 0, W, H);
      const g = tintSpr(personSpr(GEIN, { f: -1, id: 'hk' }), '#000000', 'hksil'); blit(c, g, 160, 160, PER_AX, PER_AY, { s: 3.2 * a + 0.01 });
      E(c, 160, 70, 60, 50, DA(K.red1, 0.25 * a)); if (a > 0.7) bigCap(c, '？', 30, 32, K.red0); }
    return { z: 1 + 0.06 * ss(t / S.dur), fx: 160, fy: 100 };
  }
};

/* ---- SB: born 1906; father drinks, mother rules ---- */
const SB = {
  name: '生い立ち', ch: '生い立ち', bgm: 'eerie',
  init(S) { S.tY = at(S, 'L2', 0) - 0.2; S.tFam = at(S, 'L2', 3) - 0.3; S.tMom = at(S, 'L2', 4) - 0.3; S.tSin = at(S, 'L3', 0) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tSin) {
      roomBg(c, { wall: '#5c4c3c', wall2: '#54443a', window: [236, 40], lamp: [120, 30] });
      R(c, 30, 120, 60, 30, '#4c3424'); R(c, 34, 116, 52, 6, '#6c4c34'); // table
      if (t > S.tFam) { // father slumped with a bottle
        blit(c, personSpr(GEORGE, { f: -1, weapon: 'bottle', arm: 'fwd', id: 'gs' }), 60, 150, PER_AX, PER_AY, { s: 1.3, rot: 0.25 });
        for (let i = 0; i < 3; i++) { const u = fr(t * 0.5 + i / 3); TX(c, 'z', 78 + u * 10, 90 - u * 20, '#c8c0a8', 16, null); }
        R(c, 40, 112, 4, 6, '#3c6c3c'); R(c, 50, 113, 4, 5, '#3c6c3c'); }
      if (t > S.tMom) { const k = eOut(sg(t, S.tMom, S.tMom + 0.6)); blit(c, personSpr(AUGUSTA, { f: -1, weapon: 'book', arm: 'fwd', id: 'am' }), lerp(330, 200, k), 150, PER_AX, PER_AY, { s: 1.6, flip: true });
        blit(c, personSpr(EDBOY, { f: -1, id: 'eb' }), 150, 150, PER_AX, PER_AY, { s: 1.0 }); blit(c, personSpr(HENRY, { f: -1, id: 'hb' }), 128, 150, PER_AX, PER_AY, { s: 1.15 }); }
      yearFlash(c, t, S.tY, 1906);
      capPlate(c, t, S.tY + 0.3, ['1906年', 'ウィスコンシン州 ラクロス']);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // the mother's teaching: sin, women
    const u = t - S.tSin;
    VG(c, 0, 0, W, H, ['#140c0c', '#2c1414', '#140c0c']);
    E(c, 160, 70, 90, 70, DA('#c8a048', 0.08));
    framePortrait(c, augustaFace(), 112, 18, 2);
    const words = [['罪', 40, 50], ['誘惑', 236, 40], ['罰', 60, 120], ['堕落', 240, 110]];
    words.forEach(([w, x, y], i) => { const a = sg(u, 0.6 + i * 0.9, 1.1 + i * 0.9); if (a > 0) c.drawImage(ditherFade(textSpr(w, 32, K.red0), a, 'sw' + i), x + Math.sin(t * 2 + i) * 2, y); });
    blit(c, tintSpr(personSpr(EDBOY, { f: -1, id: 'eb2' }), '#000000', 'ebs'), 160, 160, PER_AX, PER_AY, { s: 1.2 });
    return { z: 1 + 0.08 * ss(u / 8), fx: 160, fy: 80 };
  }
};

/* ---- SC: the farm (1914) and school ---- */
const SC = {
  name: '農場と学校', bgm: 'eerie',
  init(S) { S.tY = at(S, 'L4', 0) - 0.2; S.tSchool = at(S, 'L5', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tSchool) {
      VG(c, 0, 0, W, 130, ['#8ca4bc', '#b8c4cc', '#d8d0c0']);
      geinFarm(c, t, 20, { day: true, boarded: false, lit: false });
      const k = sg(t, 0.4, S.tSchool - 1); const wx = lerp(-60, 120, k); // wagon arriving
      R(c, wx, 128, 40, 12, '#6c4c2c'); E(c, wx + 6, 142, 5, 5, '#3c2c1c'); E(c, wx + 34, 142, 5, 5, '#3c2c1c'); R(c, wx + 42, 124, 18, 10, '#5c3c2c'); R(c, wx + 56, 118, 6, 8, '#5c3c2c');
      for (const [st, dx] of [[AUGUSTA, 8], [EDBOY, 20], [HENRY, 30]]) blit(c, personSpr(st, { f: -1, id: 'w' + dx }), wx + dx, 128, PER_AX, PER_AY, { s: 0.8 });
      yearFlash(c, t, S.tY, 1914); capPlate(c, t, S.tY + 0.3, ['1914年ごろ', 'プレインフィールドの農場']);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    // school yard: the others laugh, Ed stands alone
    VG(c, 0, 0, W, 120, ['#8ca4bc', '#b8c4cc']); R(c, 0, 120, W, 120, '#8c8058');
    R(c, 20, 40, 120, 80, '#a85c48'); PF(c, [14, 42, 80, 14, 146, 42], '#5c3c30'); R(c, 70, 16, 18, 14, '#5c3c30'); R(c, 76, 8, 6, 8, '#c8a048');
    for (let i = 0; i < 4; i++) { R(c, 30 + i * 28, 56, 14, 16, K.win0); } R(c, 74, 92, 14, 28, '#3c2c24');
    const kids = [[200, '#c85c48'], [222, '#4c7cb8'], [244, '#5c9c4c'], [266, '#c8a048']];
    kids.forEach(([x, col], i) => { const lg = Math.floor(t * 4 + i) & 1; blit(c, personSpr({ id: 'kd' + i, coat: col, coat2: col, pants: '#3c3c44', skin: '#f0c8a8', hair: '#6c4c2c' }, { f: -1, arm: lg ? 'fwd' : null, id: lg ? 'p' : '' }), x, 152, PER_AX, PER_AY, { flip: true });
      if (lg && i % 2 === 0) TX(c, 'ハハ', x - 8, 100 - i * 3, '#fcfcfc', 16, '#000000'); });
    blit(c, personSpr(EDBOY, { f: -1, id: 'ebal' }), 120, 152, PER_AX, PER_AY);
    E(c, 120, 156, 14, 3, DA('#000000', 0.3));
    return { z: 1 + 0.15 * ss(sg(t, S.tSchool, S.dur)), fx: 130, fy: 140 };
  }
};

/* ---- SD: deaths — father 1940, Henry 1944 (fire), mother 1945 ---- */
const SD = {
  name: '家族の死', ch: '家族の死', bgm: 'requiem',
  init(S) { S.tFire = at(S, 'L6', 2) - 0.3; S.tQ = at(S, 'L7', 0); S.tMom = at(S, 'L8', 0) - 0.3; S.tAlone = at(S, 'L8', 2) - 0.2; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tFire) { // father's grave, 1940
      VG(c, 0, 0, W, 140, ['#7c8494', '#9ca4b0']); R(c, 0, 136, W, 104, '#5c6448');
      for (const x of [60, 120, 230, 280]) { R(c, x, 110, 16, 26, '#8c8c94'); E(c, x + 8, 110, 8, 6, '#8c8c94'); }
      R(c, 160, 104, 20, 32, '#a8a8b0'); E(c, 170, 104, 10, 7, '#a8a8b0'); TX(c, '1940', 154, 112, '#3c3c44', 16, null);
      for (const [st, x] of [[AUGUSTA, 130], [HENRY, 108], [GEIN, 196]]) blit(c, personSpr(st, { f: -1, id: 'fu' + x }), x, 150, PER_AX, PER_AY, { flip: x > 170 });
      yearFlash(c, t, 0.3, 1940);
      return { z: 1.03, fx: 160, fy: 120 };
    }
    if (t < S.tMom) { // 1944: brush fire, Henry found dead
      const u = t - S.tFire;
      VG(c, 0, 0, W, 130, ['#1c0c08', '#4c1c0c', '#8c3c14']); R(c, 0, 130, W, 110, '#2c1c10');
      for (let i = 0; i < 18; i++) flame(c, 4 + i * 18 + Math.sin(i) * 4, 128 + (i % 3) * 4, 14 + (i % 4) * 6, t, i);
      for (let i = 0; i < 10; i++) flame(c, 20 + i * 32, 142, 8 + (i % 3) * 3, t, i + 30);
      embers(c, t, 30, 7, [0, 0, W, 140], [C.hell6, C.hell7]);
      for (let i = 0; i < 12; i++) { const v = fr(t * 0.2 + i / 12); E(c, 40 + i * 24 + v * 20, 120 - v * 110, 8 + v * 16, 5 + v * 10, DA('#1c1410', 0.6 * (1 - v))); }
      R(c, 0, 138, W, 40, '#1c1008'); lyingBody(c, HENRY, 170, 146, 1, { id: 'hen' }); E(c, 170, 150, 30, 4, DA('#000000', 0.4));
      if (t > S.tQ) { const a = sg(t, S.tQ, S.tQ + 0.5); for (let i = 0; i < 3; i++) if (a > 0) TX(c, '？', 146 + i * 18, 100 - Math.abs(Math.sin(t * 3 + i)) * 4, K.win1, 32, '#000000'); }
      yearFlash(c, t, S.tFire + 0.2, 1944);
      return { z: 1 + 0.25 * ss(sg(u, 0, 6)), fx: 170, fy: 120 };
    }
    // 1945: the mother dies; Ed alone
    const u = t - S.tMom;
    if (t < S.tAlone) {
      roomBg(c, { wall: '#3c3448', wall2: '#342c40', floor: '#2c2420', window: [240, 34] });
      R(c, 60, 120, 110, 30, '#e8e0d0'); R(c, 56, 104, 8, 46, '#5c3c28'); R(c, 166, 112, 8, 38, '#5c3c28'); E(c, 76, 118, 12, 6, '#f4f0e8');
      E(c, 78, 116, 6, 5, '#e4c4ac'); E(c, 78, 113, 6, 3, '#8c8890');
      const fl = Math.max(0, 1 - sg(u, 2.5, 3.2)); candle(c, 200, 130, t, 1, fl); R(c, 194, 130, 14, 20, '#4c3424');
      blit(c, personSpr(GEIN, { f: -1, id: 'gm' }), 140, 156, PER_AX, PER_AY, { s: 1.2 });
      c.fillStyle = DA('#000000', 0.4 * sg(u, 2.5, 3.5)); c.fillRect(0, 0, W, H);
      yearFlash(c, t, S.tMom + 0.2, 1945);
      return { z: 1.05, fx: 120, fy: 130 };
    }
    nightSky(c, t, 150); moon(c, 250, 34, 10, t); snowGround(c, 140, 0, 100);
    for (const [x, y] of [[120, 120], [150, 122], [180, 120]]) { R(c, x, y, 14, 20, '#8c8c94'); E(c, x + 7, y, 7, 5, '#8c8c94'); }
    blit(c, personSpr(GEIN, { f: -1, id: 'ga' }), 160, 156, PER_AX, PER_AY, { s: 1.4 });
    snowfall(c, t, 60, 51, 8, 12);
    return { z: 1 + 0.2 * ss(sg(t, S.tAlone, S.dur)), fx: 160, fy: 150 };
  }
};

/* ---- SE: the closed rooms; the books ---- */
const SE = {
  name: '閉ざされた家', ch: '閉ざされた家', bgm: 'eerie',
  init(S) { S.tBoard = at(S, 'L9', 0); S.tRoom = at(S, 'L9', 3) - 0.2; S.tBooks = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tRoom) { // the mother's room kept as it was, then boarded
      roomBg(c, { wall: '#7c6c84', wall2: '#74647c', floor: '#5c4434', window: [230, 30] });
      R(c, 40, 110, 100, 40, '#f4ecf0'); R(c, 36, 92, 8, 58, '#6c4c34'); R(c, 136, 102, 8, 48, '#6c4c34'); E(c, 58, 106, 12, 6, '#fcf8fc');
      R(c, 170, 96, 40, 54, '#6c4c34'); R(c, 176, 102, 28, 10, '#5c3c28'); R(c, 176, 116, 28, 10, '#5c3c28'); framePortrait(c, augustaFace(), 178, 46, 0.6);
      const nb = Math.floor(sg(t, S.tBoard, S.tRoom - 0.4) * 6);
      for (let i = 0; i < nb; i++) { const y = 20 + i * 34; R(c, -4, y, W + 8, 14, '#8c6c4c'); R(c, -4, y, W + 8, 2, '#a8845c'); R(c, -4, y + 12, W + 8, 2, '#5c4430'); for (const x of [30, 160, 290]) R(c, x, y + 5, 3, 3, '#3c3c44'); }
      return { z: 1.04, fx: 160, fy: 110, sy: nb && fr(t * 2) < 0.08 ? 1 : 0 };
    }
    if (t < S.tBooks) { // Ed's own small room: filth
      c.drawImage(junkCv, 0, 0);
      blit(c, personSpr(GEIN, { f: -1, id: 'gr' }), 170, 154, PER_AX, PER_AY, { s: 1.3 });
      for (let i = 0; i < 8; i++) { const fx = 120 + Math.sin(t * 3 + i) * 60, fy = 80 + Math.cos(t * 4 + i * 2) * 30; P(c, fx, fy, '#141414'); }
      darkness(c, 170, 120, 130, 0.7);
      return { z: 1.05, fx: 170, fy: 120 };
    }
    // the books & magazines
    const u = t - S.tBooks;
    R(c, 0, 0, W, H, '#2c2018'); for (let y = 0; y < H; y += 8) R(c, 0, y, W, 1, '#241a14');
    const books = [['人体解剖図', '#7c1c1c', '#e8d8b8'], ['首狩り族の秘密', '#2c4c2c', '#f8e070'], ['戦慄の人体実験', '#1c1c2c', '#c81818'], ['怪奇実話', '#5c3c7c', '#f8f8f8']];
    books.forEach(([ttl, bg, fg], i) => { const k = eOut(sg(u, i * 0.9, i * 0.9 + 0.5)); if (k <= 0) return; const x = 18 + i * 76, y = lerp(-90, 30 + (i & 1) * 16, k);
      R(c, x, y, 66, 90, '#000000'); R(c, x + 1, y + 1, 64, 88, bg); R(c, x + 4, y + 30, 58, 40, '#00000040');
      if (i === 0) { E(c, x + 33, y + 50, 12, 14, '#e8d8c0'); R(c, x + 28, y + 46, 3, 3, '#000'); R(c, x + 36, y + 46, 3, 3, '#000'); R(c, x + 30, y + 56, 7, 2, '#000'); }
      if (i === 1) { for (let k2 = 0; k2 < 3; k2++) { E(c, x + 16 + k2 * 17, y + 52, 6, 7, '#5c3c24'); R(c, x + 14 + k2 * 17, y + 58, 4, 10, '#3c2414'); } }
      if (i === 2) { R(c, x + 18, y + 40, 30, 20, '#e8e8f0'); L(c, x + 22, y + 44, x + 44, y + 56, '#c81818', 2); }
      if (i === 3) { E(c, x + 33, y + 50, 16, 14, '#fcf8e8'); R(c, x + 26, y + 46, 4, 6, '#000'); R(c, x + 36, y + 46, 4, 6, '#000'); }
      [...ttl].forEach((ch, j) => TX(c, ch, x + 4 + (j % 4) * 15, y + 4 + Math.floor(j / 4) * 16 + (j >= 4 ? 56 : 0), fg, 16, '#000000')); });
    return { z: 1 + 0.06 * ss(u / 6), fx: 160, fy: 90 };
  }
};

/* ---- SF: the cemetery at night ---- */
function obitPage() { return cached('obit', () => { const [cv, x] = mk(150, 104); R(x, 0, 0, 150, 104, K.paper0); x.fillStyle = DP(K.paper0, K.paper1, 3); x.fillRect(0, 0, 150, 104); TX(x, 'お悔やみ', 6, 3, K.ink, 16, null); R(x, 4, 21, 142, 1, K.ink);
  for (let r = 0; r < 4; r++) { R(x, 6, 26 + r * 19, 14, 16, '#9c9488'); for (let k = 0; k < 3; k++) R(x, 26, 28 + r * 19 + k * 5, 60 + (r * 13 + k * 7) % 50, 2, DP(K.paper1, K.ink, 6)); } return cv; }); }
function cemetery(c, t, ox = 0) {
  nightSky(c, t, 150); moon(c, 60, 30, 12, t);
  for (let i = 0; i < 9; i++) { const x = 20 + i * 38 - ox * 0.5; R(c, x, 110, 3, 26, '#1c1c24'); } L(c, 0 - ox, 112, 400 - ox, 112, '#1c1c24');
  R(c, 0, 132, W, 108, '#1c2418'); for (let i = 0; i < 30; i++) P(c, i * 41 % W, 140 + (i * 17 % 90), '#2c3c28');
  for (const [x, y, h, cross] of [[30, 160, 26, 0], [80, 150, 22, 1], [230, 152, 24, 0], [280, 166, 28, 1], [130, 140, 18, 0]]) {
    if (cross) { R(c, x - ox, y - h, 4, h, '#8c8c94'); R(c, x - 6 - ox, y - h + 6, 16, 4, '#8c8c94'); } else { R(c, x - 7 - ox, y - h, 14, h, '#7c7c84'); E(c, x - ox, y - h, 7, 5, '#7c7c84'); R(c, x - 6 - ox, y - h + 3, 2, h - 4, '#9c9ca4'); } }
  for (let i = 0; i < 6; i++) { const x = mod(i * 70 + t * 6, 400) - 40; E(c, x, 190 + (i % 3) * 12, 50, 6, DA('#c8d0e0', 0.12)); }
}
const SF = {
  name: '夜の墓地', ch: '夜の墓地', bgm: 'eerie',
  init(S) { S.tObit = at(S, 'L12', 0) - 0.3; S.tDig = at(S, 'L12', 2) - 0.3; S.tCarry = at(S, 'L12', 3) - 0.2; S.tCount = at(S, 'L13', 0) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tObit) { // Ed walks into the cemetery
      cemetery(c, t, 0);
      const x = lerp(-10, 150, sg(t, 0.3, S.tObit - 0.3));
      blit(c, personSpr(GEIN, { f: Math.floor(t * 7) & 3, weapon: 'shovel', arm: 'fwd', id: 'gw' }), x, 154, PER_AX, PER_AY, { s: 1.3 });
      return { z: 1.03, fx: 160, fy: 130 };
    }
    if (t < S.tDig) { // the obituaries
      R(c, 0, 0, W, H, '#2c2018'); blit(c, obitPage(), 160, 92, 75, 52, { s: 1.6, rot: -0.04 });
      const k = sg(t, S.tObit + 1.2, S.tObit + 2.0); if (k > 0) { ER(c, 104, 88, 70 * k, 14, '#c81818'); ER(c, 104, 88, 70 * k + 1, 15, '#c81818'); }
      return { z: 1 + 0.08 * ss(sg(t, S.tObit, S.tDig)), fx: 140, fy: 90 };
    }
    // digging, then carrying a wrapped body
    cemetery(c, t, 20);
    const u = t - S.tDig, sw = Math.floor(u * 2.2) & 1, dirt = Math.min(1, u / 4);
    E(c, 120, 156, 26 * dirt + 4, 10 * dirt + 2, '#3c2c1c'); E(c, 118, 154, 20 * dirt + 3, 7 * dirt + 1, '#4c3824');
    R(c, 150, 150, 44, 12, '#140c08');
    if (t < S.tCarry) { blit(c, personSpr(GEIN, { f: -1, weapon: 'shovel', arm: sw ? 'dig' : 'fwd', id: sw ? 'gd1' : 'gd2' }), 168, 152, PER_AX, PER_AY, { s: 1.3, flip: true });
      if (sw) for (let i = 0; i < 5; i++) P(c, 150 - i * 4 + hash(i + Math.floor(u * 2.2)) * 6, 138 - Math.sin(i) * 6, '#4c3824'); }
    else { const v = t - S.tCarry, x = 172 + v * 30; R(c, 150, 152, 44, 8, '#6c4c34'); // open coffin
      blit(c, personSpr(GEIN, { f: Math.floor(t * 6) & 3, arm: 'fwd', id: 'gc' }), x, 154, PER_AX, PER_AY, { s: 1.3 }); E(c, x + 10, 128, 12, 5, '#d8d0c4'); E(c, x + 10, 127, 11, 4, '#ece4d8'); }
    if (t > S.tCount) { const n = Math.min(40, Math.round(lerp(1, 40, eOut(sg(t, S.tCount, S.tCount + 2.5))))); const s = 'およそ ' + n + ' 回'; bigCap(c, s, 18, 24, C.white); }
    return { z: 1.06, fx: 160, fy: 120 };
  }
};

/* ---- SG: 1954, the tavern — Mary Hogan ---- */
function barFront(c) { R(c, 0, 92, 234, 6, '#7c4c2c'); R(c, 0, 96, 230, 36, '#5c341c'); for (let x = 10; x < 230; x += 30) R(c, x, 100, 2, 32, '#4c2a14'); }
function tavernBg(c, t, lit = true) {
  roomBg(c, { wall: '#4c2c20', wall2: '#44261c', floor: '#2c1c14', fy: 128, lamp: [160, 20] });
  R(c, 20, 20, 120, 46, '#2c1a12'); for (let s = 0; s < 3; s++) { R(c, 22, 34 + s * 14, 116, 2, '#5c3c24'); for (let i = 0; i < 12; i++) R(c, 26 + i * 9, 24 + s * 14, 4, 10, ['#3c7c3c', '#7c3c1c', '#c8a048', '#3c3c7c'][(i + s) % 4]); }
  TX(c, 'TAVERN', 210, 30, '#f8c860', 16, '#000000');
  barFront(c);
  for (const x of [250, 286]) { R(c, x - 6, 112, 14, 4, '#7c4c2c'); R(c, x, 116, 2, 16, '#3c2414'); }
}
const SG = {
  name: '酒場の女主人', ch: '最初の殺人', bgm: 'dread',
  init(S) { S.tEnter = 0.6; S.tAim = at(S, 'L14', 1) + 0.6; S.tShot = at(S, 'L14', 2) + 0.2; S.tAfter = at(S, 'L15', 0) - 0.4; S.tJoke = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tAfter) {
      tavernBg(c, t);
      const shot = t > S.tShot, fall = eOut(sg(t, S.tShot, S.tShot + 0.5));
      if (!shot) blit(c, personSpr(MARY, { f: -1, id: 'm1' }), 110, 86, PER_AX, PER_AY, { s: 1.3 });
      else { blit(c, personSpr(MARY, { f: -1, id: 'm2', shock: true }), 110 - fall * 6, 86 + fall * 30, PER_AX, PER_AY, { s: 1.3, rot: -fall * 1.4 }); }
      barFront(c);
      const ex = lerp(330, 252, sg(t, S.tEnter, S.tAim - 0.6)), aim = t > S.tAim;
      blit(c, personSpr(GEIN, { f: aim ? -1 : Math.floor(t * 6) & 3, arm: aim ? 'aim' : null, weapon: aim ? 'pistol' : null, id: aim ? 'ga' : 'gw' }), ex, 150, PER_AX, PER_AY, { s: 1.4, flip: true });
      if (shot) { const v = t - S.tShot; muzzleFlash(c, ex - 26, 120, -1, 1 - v * 6); flashScreen(c, 0.7 - v * 4); bloodSplat(c, 110, 66, 26, 3, Math.min(1, v * 4)); if (v > 0.3) { R(c, 108, 84, 10, 3, BLOOD[1]); for (let i = 0; i < 3; i++) bloodDrip(c, 104 + i * 6, 88, 8 + i * 4 + Math.min(16, v * 6), t, i + 2); } }
      if (aim && !shot) { c.fillStyle = DA('#000000', 0.3); c.fillRect(0, 0, W, H); }
      yearFlash(c, t, 0.2, 1954); capPlate(c, t, 0.5, ['1954年12月', 'パイングローブの酒場']);
      return { z: aim && !shot ? 1.2 : 1.05, fx: shot ? 120 : 200, fy: 96, sx: shot && t < S.tShot + 0.25 ? Math.round(Math.sin(t * 80) * 3) : 0 };
    }
    if (t < S.tJoke) { // empty tavern: blood pool and a spent cartridge
      tavernBg(c, t);
      for (let i = 0; i < 4; i++) bloodDrip(c, 100 + i * 9, 96, 12 + i * 5, t, i + 4);
      bloodPool(c, 140, 146, 34, 5); bloodTrail(c, [110, 132, 140, 144], 4);
      const g = 0.5 + 0.5 * Math.sin(t * 6); R(c, 200, 150, 4, 2, '#c8a048'); if (g > 0.8) P(c, 201, 150, C.white);
      const u = t - S.tAfter; if (u > 1.0) { ER(c, 202, 151, 9, 6, K.red0); }
      return { z: 1 + 0.35 * ss(sg(u, 0, 4)), fx: 170, fy: 140 };
    }
    // the joke at the general store
    roomBg(c, { wall: '#7c6c54', wall2: '#74644c', floor: '#5c4c3c', window: [24, 30] });
    R(c, 120, 100, 200, 50, '#6c5034'); R(c, 120, 96, 200, 6, '#8c6c48'); for (let i = 0; i < 6; i++) R(c, 130 + i * 30, 76, 20, 20, ['#c8a048', '#8c3c2c', '#5c7c4c'][i % 3]);
    TOWN.forEach((st, i) => blit(c, personSpr(st, { f: -1, id: 'tj' + i, arm: (Math.floor(t * 3) + i) & 1 ? 'fwd' : null }), 80 + i * 26, 156, PER_AX, PER_AY, { s: 1.2 }));
    blit(c, personSpr(GEIN, { f: -1, id: 'gj' }), 200, 156, PER_AX, PER_AY, { s: 1.2, flip: true });
    const u = t - S.tJoke; if (u > 1.4) { const s = 'メアリーなら うちにいるよ', w = textSpr(s, 16, '#000').width + 12; R(c, 150 - w / 2, 66, w, 24, '#000000'); R(c, 152 - w / 2, 68, w - 4, 20, C.white); PF(c, [190, 89, 200, 89, 200, 98], C.white); TX(c, s, 156 - w / 2, 70, '#000000', 16, null); }
    return { z: 1.05, fx: 160, fy: 120 };
  }
};
