/* ================= 記録 #006 ディアトロフ峠事件: scenes ================= */
const SLOPE_Y = 132;
function slope(c, t, mood = 'day', o = {}) { // the bare east slope of Kholat Syakhl, the forest far below on the left
  uralSky(c, t, mood, 130); uralRidges(c, t, mood, 96, o.ox || 0);
  const sn = mood === 'night' ? ['#2c3448', '#3c4458', '#4c5468'] : mood === 'storm' ? ['#a8b0bc', '#c4ccd4', '#d8dee4'] : ['#d8e0ec', '#e8eef4', '#f4f8fc'];
  c.fillStyle = sn[0]; c.beginPath(); c.moveTo(0, 150); c.lineTo(0, 120); c.lineTo(W, 70); c.lineTo(W, 150); c.fill(); VG(c, 0, 150, W, H - 150, sn);
  for (let i = 0; i < 30; i++) { const x = hash(i * 5) * W; R(c, x, 120 - x * 0.16 + hash(i) * 40, 6, 1, sn[2]); }
  taiga(c, t, 162, 6, mood === 'night' ? 'night' : 'day', 0, 0.5, 4); // the forest edge far down the slope (left)
}

/* ---- QX: cold open — the searchers find the tent (Feb 26, 1959) ---- */
const QX = {
  name: '死の山', ch: '1959年2月', bgm: 'eerie',
  init(S) { S.cold = !!ln(S, 'C0'); S.tCut = S.cold ? at(S, 'C1', 0) - 0.3 : 1e9; S.tPrints = S.cold ? at(S, 'C1', 2) - 0.3 : 1e9; if (ln(S, 'S1')) { S.tCut = -0.7; S.tPrints = at(S, 'S1', 2) - 0.3; } /* short: open straight on the slashed canvas */ S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    slope(c, t, 'storm'); blizzard(c, t, 0.6);
    if (t > S.tCut) { // close: the cut canvas, black slits, snow drifting in
      VG(c, 0, 0, W, H, ['#4c5444', '#6c7458', '#4c5444']); for (let y = 0; y < H; y += 6) R(c, 0, y, W, 1, '#5c644c');
      for (const [x, h] of [[90, 100], [170, 120], [240, 90]]) { const k = sg(t, S.tCut + (x - 90) / 200, S.tCut + 0.6 + (x - 90) / 200); PF(c, [x, 20, x + 8, 20 + h * 0.4 * k, x + 2, 20 + h * k, x - 6, 20 + h * 0.6 * k], '#0c0c08'); L(c, x - 1, 20, x + 3, 20 + h * k, '#d8d8c8'); }
      if (t > S.tPrints) { c.save(); c.globalAlpha = sg(t, S.tPrints, S.tPrints + 1); slope(c, t, 'storm'); tent(c, 236, 92, { cut: true, snow: true }); footprints(c, 220, 100, 10, 150, 22, sg(t, S.tPrints, S.tPrints + 3)); c.restore(); }
      snowfall(c, t, 40, 7, 30, 30, '#f4f8ff');
      return { z: 1.02, fx: 160, fy: 100 };
    }
    tent(c, 236, 92, { cut: true, snow: true });
    const walk = Math.min(1, t / 6); for (let i = 0; i < 3; i++) skier(c, SEARCH[i], lerp(20 + i * 22, 150 + i * 22, walk), 150 - lerp(20 + i * 22, 150 + i * 22, walk) * 0.16 + 6, t, { walk: walk < 1, ph: i, k: 'dx' + i, expr: walk >= 1 ? 'shock' : 'normal' });
    capPlate(c, t, 0.4, ['ソビエト連邦', 'ウラル山脈北部']);
    return { z: 1.06 + 0.1 * ss(sg(t, 2, S.tCut)), fx: lerp(160, 210, ss(sg(t, 2, S.tCut))), fy: 104 };
  }
};
withCuts(QX, [['M1', (c, t) => closeUp(c, t, withMouth('cdx', hikerFace(SEARCH[0], { blink: blinkOf(t, 3) }), {}, 24, 31), { bg: ['#3c4454', '#a8b0bc'], glow: '#ffffff' })]]);

/* ---- QA: the group — students and graduates of the Ural Polytechnic; the goal, Otorten ---- */
const QA = {
  name: '10人の若者', ch: '10人の若者', bgm: 'memory',
  init(S) { S.tMap = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tMap) { // a hand-drawn route map
      R(c, 0, 0, W, H, '#5c4c3c'); R(c, 30, 14, 260, 140, '#e8dcc0'); for (let i = 0; i < 6; i++) L(c, 40, 30 + i * 22, 280, 26 + i * 22, '#d8ccb0');
      for (let i = 0; i < 8; i++) { const x = 60 + i * 28, y = 50 + (i % 3) * 14; PF(c, [x - 10, y + 8, x, y - 6, x + 10, y + 8], '#a89878'); }
      const k = sg(t, S.tMap + 0.4, S.dur - 1.5); const pts = [[70, 112], [110, 100], [150, 94], [190, 76], [230, 60]]; for (let i = 0; i < 4; i++) { const u = clamp(k * 4 - i, 0, 1); if (u > 0) L(c, pts[i][0], pts[i][1], lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u), '#c81818', 2); }
      E(c, 230, 60, 5, 5, '#c81818'); TX(c, 'オトルテン山', 186, 28, '#3c2c1c', 16, null); E(c, 70, 112, 4, 4, '#3c2c1c'); TX(c, 'ヴィジャイ', 40, 88, '#3c2c1c', 16, null);
      return { z: 1.03, fx: 160, fy: 84 };
    }
    // a group photo in front of the institute: nine plus Yudin
    VG(c, 0, 0, W, 120, ['#c8ccd4', '#e0e4e8']); R(c, 30, 20, 260, 110, '#b8a890'); for (let x = 40; x < 290; x += 36) { R(c, x, 30, 20, 34, '#5c6c7c'); R(c, x, 74, 20, 34, '#5c6c7c'); } R(c, 0, 128, W, 112, '#e8eef4');
    const all = HIKERS.concat([YUDIN]); all.forEach((st, i) => { const row = i < 5 ? 0 : 1, x = 48 + (i % 5) * 56 + row * 28, y = row ? 164 : 154; blit(c, modFig(st, { f: -1, expr: 'smile', blink: blinkOf(t + i, i + 3), k: 'gp' }), x, y, FIG_AX2, FIG_AY2, { flip: i % 2 === 1 }); });
    c.save(); c.globalAlpha = 0.22; c.fillStyle = '#8c6c3c'; c.fillRect(0, 0, W, H); c.restore(); // old photo tint
    yearFlash(c, t, 0.4, 1959, 216, 10, '1月'); capPlate(c, t, 0.6, ['ウラル科学技術学校', 'スキー登山の一行']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};
{ const base = QA.draw; QA.draw = function (c, t, S) { const l = ln(S, 'L1'); if (l && t > at(S, 'L1', 3) - 0.2 && t < l.se + 0.3) return closeUp(c, t, hikerFace(HIKERS[0], { blink: blinkOf(t, 5) }), { bg: ['#1c2438', '#5c6c8c'], glow: '#e8f0ff' }); return base.call(this, c, t, S); }; } // the leader's face on 「リーダーは、23歳の…」

/* ---- QB: by train to Ivdel, on to the last village, then into the snow ---- */
const QB = {
  name: '雪の森へ', bgm: 'memory',
  init(S) { S.tSki = at(S, 'L3', 3) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tSki) { // a steam train at a small snowy station
      uralSky(c, t, 'day', 120); taiga(c, t, 112, 12, 'day', t * 10, 0.7, 2); snowGround(c, 112);
      R(c, 0, 146, W, 3, '#5c5c64'); R(c, 0, 150, W, 2, '#3c3c44'); const tx = lerp(-200, 40, eOut(sg(t, 0.3, 3)));
      for (let k = 0; k < 3; k++) { const x = tx + k * 90; R(c, x, 110, 84, 34, k ? '#3c5c4c' : '#2c2c2c'); R(c, x, 108, 84, 3, '#1c1c1c'); if (k) for (let w = 0; w < 4; w++) R(c, x + 8 + w * 19, 116, 12, 10, '#e8d8a0'); for (const wx of [14, 70]) E(c, x + wx, 146, 6, 6, '#141414'); }
      R(c, tx + 60, 92, 10, 18, '#2c2c2c'); for (let i = 0; i < 8; i++) { const u = fr(t * 0.5 + i / 8); E(c, tx + 65 - u * 50, 86 - u * 30, 4 + u * 10, 3 + u * 6, DA('#e8e8e8', 0.6 * (1 - u))); }
      R(c, 220, 104, 70, 42, '#8c6c4c'); PF(c, [214, 104, 255, 88, 296, 104], '#5c4c3c'); E(c, 255, 88, 40, 4, '#f4f8fc'); R(c, 228, 112, 50, 12, '#3c3c44'); TX(c, 'ИВДЕЛЬ', 230, 110, '#f4f0e8', 16, null);
      yearFlash(c, t, 0.4, 1959, 14, 10, '1月25日'); capPlate(c, t, 0.6, ['イヴデリ', 'ウラル北部の町'], 8);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    // nine skiers in a line through the taiga
    uralSky(c, t, 'day', 120); uralRidges(c, t, 'day', 100, t * 6); taiga(c, t, 128, 14, 'day', t * 14, 0.9, 7); snowGround(c, 128, t * 18);
    for (let i = 0; i < 10; i++) { const st = i < 9 ? HIKERS[i] : YUDIN; skier(c, st, 300 - i * 30, 160 - (i % 2) * 3, t, { walk: true, ph: i, k: 'db', flip: true }); }
    snowfall(c, t, 30, 3, 6, 12);
    return { z: 1.03, fx: 160, fy: 112 };
  }
};

/* ---- QC: Yudin turns back ---- */
const QC = {
  name: 'ユーディン', bgm: 'requiem',
  init(S) { S.tGo = at(S, 'L4', 2) - 0.2; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    uralSky(c, t, 'day', 120); uralRidges(c, t, 'day', 100); taiga(c, t, 126, 12, 'day', 0, 0.9, 9); snowGround(c, 126);
    const u = Math.max(0, t - S.tGo);
    HIKERS.forEach((st, i) => skier(c, st, 190 + i * 16 + u * 10, 158 - (i % 2) * 3, t, { walk: u > 0, ph: i, k: 'dc', arm: i === 0 && u > 0 && u < 4 ? 'wave' : 'hold', expr: 'normal' }));
    skier(c, YUDIN, 150 - u * 12, 162, t, { walk: u > 1.5, ph: 3, k: 'dcy', flip: u > 1.5, arm: u < 2.5 ? 'wave' : 'hold', expr: 'sad' });
    snowfall(c, t, 30, 4, 6, 12);
    return { z: 1.04 + 0.05 * ss(sg(t, S.tGo, S.dur)), fx: lerp(170, 230, ss(sg(t, S.tGo, S.dur))), fy: 112 };
  }
};
withCuts(QC, [['L4b', (c, t) => closeUp(c, t, hikerFace(YUDIN, { blink: blinkOf(t, 8) }), { bg: ['#1c2c28', '#5c7c6c'], glow: '#e8f0ff' })]]);

/* ---- QD: the diaries and photos; the tent pitched on the open slope ---- */
const QD = {
  name: '死の山の斜面', ch: '斜面のテント', bgm: 'eerie',
  init(S) { S.tSlope = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tSlope) { // a diary and a camera on the snow
      R(c, 0, 0, W, H, '#c8d0dc'); for (let i = 0; i < 30; i++) E(c, hash(i * 3) * W, hash(i * 5) * H, 8, 3, '#d8e0ec');
      R(c, 60, 40, 120, 90, '#e8dcc0'); R(c, 118, 40, 4, 90, '#a89878'); for (let i = 0; i < 7; i++) { L(c, 68, 54 + i * 10, 112, 54 + i * 10, '#5c5c7c'); L(c, 128, 54 + i * 10, 172, 54 + i * 10, '#5c5c7c'); }
      R(c, 200, 70, 60, 40, '#2c2c2c'); E(c, 222, 92, 13, 13, '#141414'); E(c, 222, 92, 9, 9, '#3c4c6c'); P(c, 219, 89, '#c8d8f8'); R(c, 246, 64, 10, 6, '#5c5c5c');
      return { z: 1.03, fx: 160, fy: 90 };
    }
    slope(c, t, 'dusk'); blizzard(c, t, 0.5);
    tent(c, 236, 92, { lit: true }); HIKERS.forEach((st, i) => { if (i < 4) blit(c, modFig(st, { f: -1, arm: i % 2 ? 'dig' : 'hold', k: 'dd' }), 196 + i * 22, 98 - (196 + i * 22 - 236) * 0.16 + 6, FIG_AX2, FIG_AY2, { s: 0.6, flip: i > 1 }); });
    capPlate(c, t, S.tSlope + 0.3, ['ホラート・シャフイル山', '（マンシ語で「死の山」）']);
    return { z: 1.06 + 0.08 * ss(sg(t, S.tSlope, S.dur)), fx: 200, fy: 98 };
  }
};
withCuts(QD, [['Y1', (c, t) => closeUp(c, t, withMouth('cyu', hikerFace(YUDIN, { blink: blinkOf(t, 9) }), {}, 24, 31), { bg: ['#1c2c28', '#5c7c6c'] })]]);

/* ---- QE: the night of February 2 — something happens (shown only as light and wind) ---- */
const QE = {
  name: '2月2日の夜', ch: '2月2日の夜', bgm: null,
  init(S) { S.tOut = at(S, 'L8', 1) + 0.6; S.dur = lastSe(S) + 3.2; },
  draw(c, t, S) {
    slope(c, t, 'night'); blizzard(c, t, 0.8);
    const out = t > S.tOut, fl = out ? 0 : 0.8 + 0.2 * Math.sin(t * 9);
    tent(c, 236, 92, { night: true, lit: !out });
    if (!out) for (let i = 0; i < 4; i++) { const x = 220 + i * 9; c.save(); c.globalAlpha = 0.6 * fl; blit(c, tintSpr(modFig(HIKERS[i], { f: -1, k: 'sh' }), '#2c1c0c', 'tsh' + i), x, 90, FIG_AX2, FIG_AY2, { s: 0.35 }); c.restore(); }
    if (out) { const k = sg(t, S.tOut, S.tOut + 2); c.save(); c.globalAlpha = 0.6 * k; c.fillStyle = '#000000'; c.fillRect(0, 0, W, H); c.restore(); }
    return { z: 1.1 + 0.25 * ss(sg(t, 0, S.tOut)), fx: 230, fy: 92, sx: out && t - S.tOut < 0.5 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- QF: the search: Feb 12 passes; Feb 20 the search begins ---- */
const QF = {
  name: '捜索', ch: '捜索', bgm: 'pulse',
  init(S) { S.tPlane = at(S, 'L9', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tPlane) { // a calendar: the 12th passes with no word
      R(c, 0, 0, W, H, '#2c2c34'); R(c, 90, 24, 140, 130, '#f4f0e8'); R(c, 90, 24, 140, 24, '#c81818'); TX(c, '2月', 146, 28, '#ffffff', 16, null);
      const d = 12 + Math.min(8, Math.floor(sg(t, 0.8, S.tPlane - 0.3) * 9)); const s = textSpr(String(d), 24, '#141414'); c.drawImage(s, 0, 0, s.width, s.height, 160 - s.width, 62, s.width * 2, s.height * 2);
      if (d > 12) { L(c, 104, 60, 216, 140, '#c81818', 3); } TX(c, '連絡なし', 128, 130, '#8c1c1c', 16, null);
      return { z: 1.02, fx: 160, fy: 90 };
    }
    uralSky(c, t, 'day', 140); uralRidges(c, t, 'day', 110, t * 20); taiga(c, t, 150, 16, 'day', t * 40, 1, 11); snowGround(c, 150, t * 50);
    const px = lerp(-40, 360, fr((t - S.tPlane) / 7)); R(c, px - 18, 52, 36, 7, '#c8ccd4'); R(c, px - 4, 44, 6, 22, '#a8acb4'); R(c, px - 22, 48, 6, 8, '#a8acb4'); E(c, px + 18, 55, 3, 3, '#5c5c64'); L(c, px + 21, 50, px + 21, 60, '#e8e8e8');
    yearFlash(c, t, S.tPlane, 1959, 216, 10, '2月20日');
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- QG: Feb 26 — the tent, cut from the inside; nine sets of footprints ---- */
const QG = {
  name: 'テント', ch: '2月26日', bgm: 'eerie',
  init(S) { S.tPrints = at(S, 'L11', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    slope(c, t, 'day');
    tent(c, 236, 92, { cut: true, snow: true });
    footprints(c, 220, 100, 10, 150, 22, sg(t, S.tPrints, S.tPrints + 4));
    for (let i = 0; i < 3; i++) skier(c, SEARCH[i], 196 + i * 18, 102 - (196 + i * 18 - 236) * 0.16 + 4, t, { k: 'dg', expr: 'shock', skis: false, pack: false, pole: false, flip: true });
    if (t > S.tPrints) bigCap(c, '800m', 120, 16, '#2c3c5c', sg(t, S.tPrints + 2, S.tPrints + 3));
    yearFlash(c, t, 0.4, 1959, 14, 10, '2月26日');
    return { z: 1.04 + 0.1 * ss(sg(t, S.tPrints, S.dur)), fx: lerp(200, 140, ss(sg(t, S.tPrints, S.dur))), fy: 110 };
  }
};

/* ---- QH: the cedar, the fire, the broken branches; three between the tree and the tent ---- */
const QH = {
  name: 'ヒマラヤスギ', ch: '大きな木の下', bgm: 'requiem',
  init(S) { S.tBranch = at(S, 'L13', 0) - 0.3; S.tThree = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tThree) { // the long slope: three figures fallen in a line, facing the tent
      slope(c, t, 'day'); tent(c, 290, 74, { cut: true, snow: true });
      [[90, 1], [160, 2], [220, 4]].forEach(([x, i], k) => { if (t > S.tThree + 0.6 + k * 0.7) frozen(c, HIKERS[[0, 1, 4][k]], x, 128 - x * 0.16 + 26, { dir: -1, cover: k === 2 }); });
      cedar(c, 24, 160, 70); bigCap(c, '300m 480m 630m', 150, 16, '#2c3c5c', sg(t, S.tThree + 2.5, S.tThree + 3.5));
      return { z: 1.03, fx: 160, fy: 110 };
    }
    uralSky(c, t, 'day', 120); taiga(c, t, 132, 14, 'day', 0, 1.1, 13); snowGround(c, 132);
    cedar(c, 160, 160, 120, { broken: t > S.tBranch });
    E(c, 186, 160, 12, 3, '#2c2420'); for (let i = 0; i < 5; i++) L(c, 178 + i * 4, 158, 182 + i * 3, 162, '#1c1410', 2); // the fire's remains
    frozen(c, HIKERS[5], 120, 162, { dir: 1, cover: true }); frozen(c, HIKERS[6], 214, 164, { dir: -1, cover: true });
    if (t > S.tBranch) { const k = sg(t, S.tBranch, S.tBranch + 1.5); L(c, 128, 160, 128, lerp(160, 100, k), '#f8d860'); L(c, 124, 100, 132, 100, '#f8d860'); if (k >= 1) TX(c, '5m', 104, 116, '#2c3c5c', 16, null); }
    return { z: 1.04 + 0.06 * ss(sg(t, S.tBranch, S.tThree)), fx: 160, fy: lerp(110, 90, ss(sg(t, S.tBranch, S.tThree))) };
  }
};

/* ---- QI: minus 30 degrees; thin clothes; no boots ---- */
const QI = {
  name: '薄着', bgm: 'requiem',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c1424', '#2c3c5c', '#0c1424']); blizzard(c, t, 0.6);
    R(c, 60, 30, 20, 120, '#e8eef4'); R(c, 66, 36, 8, 108, '#c8d4e4'); E(c, 70, 146, 12, 12, '#e8eef4'); E(c, 70, 146, 8, 8, '#2c6cd8'); const lvl = lerp(80, 128, ss(sg(t, 0.3, 2.5))); R(c, 67, lvl, 6, 146 - lvl, '#2c6cd8');
    for (let i = 0; i <= 4; i++) { L(c, 80, 40 + i * 24, 86, 40 + i * 24, '#5c6c8c'); } bigCap(c, '−30℃', 64, 24, '#8cb4f8');
    // one booted foot, one in a sock, one bare
    const ft = (x, col, sock) => { R(c, x, 120, 22, 24, col); E(c, x + 16, 144, 14, 6, col); if (sock) for (let k = 0; k < 4; k++) R(c, x + 2, 124 + k * 5, 18, 1, shadeCol(col, 0.8)); };
    ft(150, '#3c2c1c', false); ft(200, '#c8c0b0', true); ft(250, '#e0b494', false); for (let k = 0; k < 5; k++) E(c, 266 + k * 3, 148, 1.5, 1.5, '#c89474');
    return { z: 1.02, fx: 180, fy: 110 };
  }
};

/* ---- QJ: two months later — four in the ravine, under four metres of snow ---- */
const QJ = {
  name: '谷', ch: '谷の4人', bgm: 'requiem',
  init(S) { S.tClothes = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    uralSky(c, t, 'day', 60); taiga(c, t, 64, 14, 'day', 0, 0.9, 17);
    // cross-section of the ravine: snow layers down to the stream bed
    R(c, 0, 64, W, 176, '#e8eef4'); for (let y = 70; y < 160; y += 9) R(c, 0, y, W, 1, '#d4dce8'); PF(c, [0, 64, 110, 64, 140, 160, 180, 160, 210, 64, W, 64, W, 0, 0, 0], 'rgba(0,0,0,0)');
    PF(c, [0, 64, 100, 64, 130, 158, 0, 170], '#8c7c6c'); PF(c, [220, 64, W, 64, W, 170, 190, 158], '#8c7c6c'); R(c, 130, 158, 60, 6, '#5c7c9c');
    const k = sg(t, 0.4, 2.4); L(c, 300, 64, 300, lerp(64, 150, k), '#c81818', 2); if (k >= 1) TX(c, '4m', 270, 98, '#c81818', 16, null);
    for (let i = 0; i < 4; i++) { const st = HIKERS[[2, 3, 7, 8][i]]; frozen(c, st, 138 + i * 13, 156 - (i % 2) * 3, { dir: i % 2 ? 1 : -1 }); }
    if (t > S.tClothes) { glow(c, 160, 150, 50, 16, '#f8d860', 0.3 * sg(t, S.tClothes, S.tClothes + 1)); }
    return { z: 1.03 + 0.12 * ss(sg(t, S.tClothes, S.dur)), fx: 160, fy: lerp(110, 140, ss(sg(t, S.tClothes, S.dur))) };
  }
};

/* ---- QK: the autopsies — 6 by cold, 3 crushed with no outer wound; radiation on the clothes ---- */
const QK = {
  name: '検視', ch: '検視', bgm: 'pulse',
  init(S) { S.tBones = at(S, 'L18', 1) - 0.3; S.tGeiger = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tGeiger) { // a Geiger counter over a sweater
      R(c, 0, 0, W, H, '#2c2a28'); R(c, 60, 50, 140, 100, '#7c6c4c'); for (let y = 54; y < 150; y += 4) L(c, 60, y, 200, y, '#6c5c3c');
      R(c, 200, 70, 70, 50, '#5c6c4c'); R(c, 206, 76, 58, 22, '#e8e4c8'); const a = -1.2 + Math.min(2.2, (t - S.tGeiger) * 0.6) + Math.sin(t * 30) * 0.08; L(c, 235, 96, 235 + Math.cos(a - Math.PI / 2) * 20, 96 + Math.sin(a - Math.PI / 2) * 20, '#c81818', 2);
      L(c, 180, 110, 200, 100, '#2c2c2c', 3); R(c, 160, 104, 24, 10, '#3c3c34'); for (let i = 0; i < 3; i++) if ((Math.floor(t * 12) + i) % 4 === 0) TX(c, '•', 150 + i * 6, 88, '#f8d860', 16, null);
      bigCap(c, '放射性物質', 18, 24, '#f8d860');
      return { z: 1.03, fx: 160, fy: 100 };
    }
    R(c, 0, 0, W, H, '#0c1418'); for (let x = 0; x < W; x += 16) R(c, x, 0, 1, H, '#141c20');
    const n = t > S.tBones ? 9 : Math.min(9, Math.floor(t * 2)); for (let i = 0; i < n; i++) { const x = 40 + i * 30, bad = t > S.tBones && [7, 2, 8].includes(i); R(c, x - 10, 50, 20, 70, bad ? '#3c1c1c' : '#1c2c34'); E(c, x, 58, 6, 6, bad ? '#e8b8b8' : '#a8c8d8'); for (let r = 0; r < 5; r++) L(c, x - 7, 70 + r * 6, x + 7, 70 + r * 6, bad ? '#e8b8b8' : '#a8c8d8'); if (bad) { L(c, x - 6, 76, x + 2, 84, '#f86060', 2); L(c, x + 2, 84, x - 2, 90, '#f86060', 2); } }
    bigCap(c, t > S.tBones ? '低体温症 6人 ／ 強い力 3人' : '低体温症', 12, 16, '#e8f0f8');
    return { z: 1.02, fx: 160, fy: 96 };
  }
};

/* ---- QL: that night, another group 50 km south saw an orange sphere in the north sky ---- */
const QL = {
  name: '光の球', ch: 'オレンジ色の光', bgm: 'eerie',
  init(S) { S.tBall = at(S, 'L21', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    uralSky(c, t, 'night', 140); uralRidges(c, t, 'night', 110); taiga(c, t, 150, 16, 'night', 0, 1, 21); snowGround(c, 150); c.save(); c.globalAlpha = 0.6; c.fillStyle = '#04060c'; c.fillRect(0, 140, W, 100); c.restore();
    for (let i = 0; i < 4; i++) blit(c, tintSpr(modFig(SEARCH[i], { f: -1, arm: i === 1 ? 'point' : null, k: 'dl' }), '#06080c', 'dls' + i), 60 + i * 26, 168, FIG_AX2, FIG_AY2);
    if (t > S.tBall) { const k = sg(t, S.tBall, S.tBall + 4), x = lerp(250, 200, k), y = skyY(lerp(70, 40, k)); glow(c, x, y, 50 + k * 30, 50 + k * 30, '#f88c2c', 0.5); E(c, x, y, 6 + k * 4, 6 + k * 4, '#ffd08c'); E(c, x, y, 3, 3, '#ffffff'); for (let i = 0; i < 6; i++) L(c, x, y + 8, x + (i - 2.5) * 6, y + 30 + i * 2, DA('#f8a040', 0.4)); }
    capPlate(c, t, 0.4, ['南へ50km', '別の登山の一行']);
    return { z: 1.03, fx: 180, fy: 100 };
  }
};

/* ---- QM: "an irresistible force of nature" — the files go to the secret archive ---- */
const QM = {
  name: '機密', ch: '自然の力', bgm: 'requiem',
  init(S) { S.tStamp = at(S, 'L22', 1) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#2c2824'); glow(c, 160, 80, 140, 80, '#f8d080', 0.18);
    R(c, 90, 20, 140, 130, '#e8dcc0'); R(c, 90, 20, 140, 3, '#c8bca0'); TX(c, 'ДЕЛО', 136, 30, '#3c2c1c', 16, null); for (let i = 0; i < 6; i++) L(c, 104, 60 + i * 12, 216, 60 + i * 12, '#8c7c64');
    if (t > S.tStamp) { const k = eOut(sg(t, S.tStamp, S.tStamp + 0.25)); c.save(); c.translate(170, 110); c.rotate(-0.25); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -40, -14, 80, 28, '#c81818'); R(c, -37, -11, 74, 22, '#e8dcc0'); TX(c, '機密', -16, -9, '#c81818', 16, null); c.restore(); }
    const g = sg(t, S.tStamp + 1.5, S.dur - 0.5); if (g > 0) { R(c, 0, 150 - g * 150, W, g * 150, '#141210'); for (let x = 0; x < W; x += 40) R(c, x, 150 - g * 150, 2, g * 150, '#2c2824'); }
    return { z: 1.03, fx: 160, fy: 84 };
  }
};

/* ---- QN: theories — a missile's light; an avalanche; low sound ---- */
const QN = {
  name: '諸説', ch: 'さまざまな説', bgm: 'pulse',
  init(S) { S.tTheory = at(S, 'L24', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tTheory) { // a rocket climbing into the night
      uralSky(c, t, 'night', 160); R(c, 0, 160, W, 80, '#0c0c14'); const k = sg(t, 0.4, S.tTheory), y = lerp(150, 30, k);
      L(c, 160, 160, 160 + Math.sin(k * 2) * 20, y, DA('#f8a040', 0.5), 3); glow(c, 160 + Math.sin(k * 2) * 20, y, 40, 40, '#f88c2c', 0.6); E(c, 160 + Math.sin(k * 2) * 20, y, 4, 4, '#ffffff');
      return { z: 1.02, fx: 160, fy: 100 };
    }
    const n = Math.min(3, 1 + Math.floor((t - S.tTheory) / 1.4)); R(c, 0, 0, W, H, '#14141c');
    const panel = (i, x, draw, lab) => { if (i >= n) return; R(c, x, 30, 90, 90, '#2c2c3c'); R(c, x + 3, 33, 84, 84, '#1c1c28'); draw(x + 3, 33); TX(c, lab, x + 45 - textSpr(lab, 16, '#e8e8f0').width / 2, 10, '#e8e8f0', 16, null); };
    panel(0, 12, (x, y) => { PF(c, [x, y + 80, x + 84, y + 20, x + 84, y + 84, x, y + 84], '#e8eef4'); for (let k = 0; k < 6; k++) E(c, x + 30 + k * 8 + fr(t) * 10, y + 50 - k * 4, 6, 3, '#c8d4e4'); tent(c, x + 40, y + 70, {}); }, '雪崩');
    panel(1, 115, (x, y) => { for (let r = 0; r < 5; r++) { c.save(); c.globalAlpha = 1 - fr(t * 0.8 + r / 5); c.strokeStyle = '#8cb4f8'; c.beginPath(); c.arc(x + 42, y + 42, fr(t * 0.8 + r / 5) * 40, 0, TAU); c.stroke(); c.restore(); } }, '低い音');
    panel(2, 218, (x, y) => { E(c, x + 42, y + 42, 10, 10, '#f8a040'); glow(c, x + 42, y + 42, 30, 30, '#f88c2c', 0.5); }, '光の球');
    return { z: 1.02, fx: 160, fy: 84 };
  }
};

/* ---- QO: 2020 — the prosecutors say avalanche; the families do not accept it ---- */
const QO = {
  name: '2020年', bgm: 'requiem',
  init(S) { S.tFam = at(S, 'L25', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    roomBg(c, { wall: '#5c6070', wall2: '#545868', floor: '#3c3c44', fy: 150, lamp: [160, 18] });
    R(c, 90, 30, 140, 60, '#2c3448'); R(c, 94, 34, 132, 52, '#3c4c6c'); TX(c, '雪崩', 140, 50, '#f4f0e8', 16, null);
    if (t > S.tFam) for (let i = 0; i < 5; i++) blit(c, modFig({ id: 'fam' + i, top: i % 2 ? 'jacket' : 'sweater', coat: ['#3c3c44', '#5c4c3c', '#4c3c4c', '#3c4c4c', '#5c5c5c'][i], shirt: '#c8c0b0', pants: '#2c2c34', skin: '#e8c4a4', hair: ['#8c8884', '#c8c4c0', '#5c4c3c', '#a8a4a0', '#3c2c1c'][i], hairStyle: ['side', 'curly', 'long', 'short', 'side'][i] }, { f: -1, expr: 'sad', k: 'fm' }), 70 + i * 45, 156, FIG_AX2, FIG_AY2);
    yearFlash(c, t, 0.3, 2020, 216, 10, '7月13日');
    return { z: 1.03, fx: 160, fy: 104 };
  }
};

/* ---- QP: the pass named after Dyatlov; Yudin; nine lights in the snow ---- */
const QP = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tYu = at(S, 'L27', 0) - 0.3; S.tCand = at(S, 'L28', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tCand) { VG(c, 0, 0, W, H, ['#04060e', '#0c1424', '#141c30']); for (let i = 0; i < 40; i++) P(c, hash(i * 9) * W, hash(i * 3) * 120, '#8c9cbc'); R(c, 0, 150, W, 90, '#1c2434'); for (let i = 0; i < 9; i++) { const k = sg(t, S.tCand + i * 0.3, S.tCand + 0.4 + i * 0.3); if (k > 0) { candle(c, 48 + i * 28, 152, t, i, 1); glow(c, 48 + i * 28, 140, 16, 12, '#f8c060', 0.3 * k); } }
      return { z: 1 + 0.06 * ss(sg(t, S.tCand, S.tEnd + 2)), fx: 160, fy: 120 }; }
    slope(c, t, 'dusk'); R(c, 150, 92, 22, 40, '#5c5c64'); R(c, 146, 88, 30, 6, '#4c4c54'); for (let i = 0; i < 3; i++) R(c, 154, 100 + i * 8, 14, 1, '#8c8c94'); // a memorial stone
    capPlate(c, t, 0.3, ['ディアトロフ峠']);
    if (t > S.tYu) { c.save(); c.globalAlpha = sg(t, S.tYu, S.tYu + 1.5); bigFace(c, hikerFace(YUDIN, { blink: blinkOf(t, 8) }), 250, 60, 1.4, 1, 'yu2'); c.restore(); bigCap(c, '1937 - 2013', 112, 16, '#e8e0d0', sg(t, S.tYu + 1, S.tYu + 2)); }
    return { z: 1.04, fx: 170, fy: 100 };
  }
};

/* ---- shorts ---- */
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) {
    slope(c, t, 'night'); tent(c, 160, 110, { cut: true, night: true }); blizzard(c, t, 0.8); bigCap(c, '?', 40, 24, '#f8d860');
    return { z: 1.1, fx: 160, fy: 100 };
  }
};
