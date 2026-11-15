/* ================= 記録 #013 ペドロ・ロペス: scenes ================= */
const GY = 150;
function fig(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }
function riverFlood(c, t, o = {}) { andes(c, t, { storm: true }); R(c, 0, 120, W, 120, '#4c5c3c'); const k = o.k == null ? 1 : o.k; PF(c, [0, 130 - 8 * k, W, 124 - 8 * k, W, 176 + 6 * k, 0, 180 + 6 * k], '#6c5c44'); for (let r = 0; r < 8; r++) for (let i = 0; i < 8; i++) R(c, mod(i * 47 + r * 19 + t * (30 + r * 8), W + 40) - 20, 132 + r * 6, 16 + r, 1, r & 1 ? '#8c7c5c' : '#a8987c'); for (let i = 0; i < 4; i++) { const x = mod(i * 90 + t * 40, W + 60) - 30; L(c, x, 140 + i * 8, x + 18, 142 + i * 8, '#3c2c1c', 3); } rain(c, t, 50); }
function market(c, t) { andes(c, t, {}); R(c, 0, 120, W, 120, '#b89c78'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, 124 + hash(i * 5) * 100, '#a88c68'); ['#c83c3c', '#3c7cc8', '#e8b83c', '#5c9c4c', '#9c5cac'].forEach((col, i) => stall(c, 10 + i * 64, 132, col, t)); }

/* ---- NX: cold open — the flooded river, four candles; the man held down in the supermarket (moves: rain, the river surges, candles flicker) ---- */
const NX = withCuts({
  name: 'アンバート', ch: 'アンデスの怪物', bgm: 'eerie',
  init(S) { S.tShop = at(S, 'C1', 1) - 0.3; S.tName = at(S, 'C1', 4) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tShop) { // the supermarket: a man held down by the crowd
      R(c, 0, 0, W, H, '#d8d4c8'); for (let i = 0; i < 4; i++) { R(c, 10 + i * 80, 30, 66, 90, '#a89c88'); for (let k = 0; k < 4; k++) for (let j = 0; j < 6; j++) R(c, 14 + i * 80 + j * 10, 36 + k * 22, 8, 14, ['#c83c3c', '#3c7cc8', '#e8b83c', '#5c9c4c'][(i + j + k) % 4]); } R(c, 0, 150, W, 90, '#b8b4a8');
      const sh = Math.round(Math.sin(t * 20) * 1); person(c, LOPEZ, 160 + sh, 160, { k: 'hd', expr: 'angry' }); for (let i = 0; i < 4; i++) person(c, CROWD[i], [120, 136, 186, 202][i], 162 + (i & 1) * 2, { k: 'hd', arm: 'fwd', flip: i > 1, f: Math.floor(t * 6 + i) & 1 });
      if (t > S.tName) { dim(c, 0.45); stamp(c, t, S.tName + 0.4, 160, 70, 'アンデスの怪物', 130); }
      return { z: 1.04, fx: 160, fy: 110, sx: Math.round(Math.sin(t * 30) * (t < S.tShop + 0.6 ? 2 : 0)) };
    }
    riverFlood(c, t); const n = Math.min(4, Math.floor(sg(t, at(S, 'C0', 1) - 0.3, at(S, 'C0', 3)) * 4.99)); candles(c, t, n, 130, 122, 18);
    capPlate(c, t, at(S, 'C0', 0), ['1980年', 'エクアドル']);
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tShop)), fx: 160, fy: 110 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, lopezFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- NA: who he was — the map of three countries, the count (moves: the countries light up one by one, the counter climbs) ---- */
const NA = {
  name: '三つの国', ch: '三つの国', bgm: 'dread',
  init(S) { S.tMap = at(S, 'L2', 1) - 0.3; S.tVow = at(S, 'L3', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tVow) { // alone in the rain, the vow
      andes(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); rain(c, t, 60); person(c, LOPEZ, 160, 156, { k: 'vw', expr: 'angry', blink: blinkOf(t, 4) }); glow(c, 160, 120, 40, 50, '#c81818', 0.12 + 0.06 * Math.sin(t * 2)); mist(c, t, 110, 0.18, '#5c6c8c');
      return { z: 1.04 + 0.05 * ss(sg(t, S.tVow, S.dur)), fx: 160, fy: 110 };
    }
    if (t > S.tMap) { const hl = { col: t > at(S, 'L2', 1) - 0.3, ecu: t > at(S, 'L2', 2) - 0.3, per: t > at(S, 'L2', 3) - 0.3 }; samMap(c, t, { hl }); const n = Math.floor(sg(t, at(S, 'L2', 4) - 0.3, at(S, 'L2', 5)) * 300); if (n > 0) { R(c, 214, 96, 96, 34, '#000000'); TX(c, n + (n >= 300 ? '人+' : '人'), 222, 100, '#f86040', 24, null); } return { z: 1.02, fx: 160, fy: 100 }; }
    samMap(c, t, { hl: { col: Math.floor(t * 2) & 1 } }); capPlate(c, t, 0.3, ['1948年', 'コロンビア生まれ']);
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- NB: the market; graves in the forest; "never at night" (moves: shoppers walk, something glints in his hand) ---- */
const NB = withCuts({
  name: '市場', ch: '市場で', bgm: 'pulse',
  init(S) { S.tMarket = at(S, 'L5', 0) - 0.3; S.tBury = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBury) { // the forest edge and a building site: fresh earth
      andes(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#3c4c2c'); for (let i = 0; i < 7; i++) { const x = 10 + i * 46; R(c, x, 70, 4, 56, '#2c2018'); E(c, x + 2, 66, 16, 22, '#1c3c1c'); }
      R(c, 200, 96, 100, 30, '#8c8478'); for (let k = 0; k < 4; k++) L(c, 204 + k * 26, 96, 204 + k * 26, 60, '#c8a860', 2); L(c, 200, 60, 300, 60, '#c8a860', 2); L(c, 200, 78, 300, 78, '#c8a860', 2); R(c, 286, 10, 4, 86, '#e8b83c'); R(c, 220, 10, 90, 4, '#e8b83c'); L(c, 240, 14, 240 + Math.sin(t) * 4, 40, '#3c3c3c'); R(c, 236 + Math.sin(t) * 4, 40, 10, 8, '#8c8478'); for (let k = 0; k < 3; k++) R(c, 208 + k * 12, 110, 10, 8, '#d8d0c0'); E(c, 270, 108, 10, 7, '#c86c3c'); R(c, 264, 114, 14, 6, '#5c5c5c');
      const n = Math.floor(sg(t, S.tBury + 0.4, at(S, 'L6', 6)) * 8); for (let i = 0; i < n; i++) E(c, 40 + (i % 4) * 40, 132 + Math.floor(i / 4) * 10, 14, 4, '#5c4c34');
      mist(c, t, 110, 0.18, '#c8b8a8'); if (t > at(S, 'L6', 4) - 0.3) { R(c, 16, 96, 120, 26, '#000000'); TX(c, '週に2人、3人', 22, 100, '#f86040', 16, null); }
      return { z: 1.03, fx: 160, fy: 110 };
    }
    market(c, t);
    for (let i = 0; i < 5; i++) { const x = mod(t * (14 + i * 3) + i * 70, W + 60) - 30; person(c, CROWD[i], x, 160 + (i % 2) * 4, { f: Math.floor(t * 5 + i) & 3, k: 'mk', flip: i % 2 === 1 }); }
    person(c, LOPEZ, 250, 158, { k: 'lk', flip: true, arm: t > S.tMarket ? 'hold' : null, blink: blinkOf(t, 3) }); if (t > at(S, 'L5', 4) - 0.3) { const g = 0.5 + 0.5 * Math.sin(t * 8); glow(c, 238, 128, 10, 8, '#f8f0a0', 0.5 * g); P(c, 238, 128, '#ffffff'); }
    if (t < S.tMarket + 1) capPlate(c, t, 0.4, ['刑期を終えて', 'ペルーへ']);
    return { z: 1.03, fx: 180, fy: 110 };
  }
}, [['P1', (c, t, S) => closeUp(c, t, lopezFace({ dark: true, blink: blinkOf(t, 5) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- NC: caught by a tribe; the missionary's jeep; released at the border (moves: insects swarm, the jeep drives away, posters multiply) ---- */
const NC = {
  name: 'ペルーの部族', ch: '宣教師', bgm: 'dread',
  init(S) { S.tJeep = at(S, 'L8', 0) - 0.3; S.tFree = at(S, 'L9', 0) - 0.3; S.tMore = at(S, 'L9', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMore) { R(c, 0, 0, W, H, '#2c241c'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#342a20'); const n = Math.floor(sg(t, S.tMore, S.dur) * 12); for (let i = 0; i < n; i++) poster(c, 14 + (i % 6) * 50, 14 + Math.floor(i / 6) * 60, 1, { red: i % 3 === 0 }); return { z: 1.03 + 0.05 * ss(sg(t, S.tMore, S.dur)), fx: 160, fy: 80 }; }
    andes(c, t, {}); R(c, 0, 120, W, 120, '#9c8c5c'); for (let i = 0; i < 3; i++) { const x = 30 + i * 60; PF(c, [x, 118, x + 20, 92, x + 40, 118], '#7c5c3c'); R(c, x + 4, 106, 32, 14, '#a88c5c'); }
    if (t > S.tFree) { // the jeep drives off toward the border
      const u = sg(t, S.tFree + 0.3, S.tMore); jeep(c, lerp(150, 330, u), 160, { col: '#d8d0b8' }); R(c, 280, 108, 4, 40, '#5c4c3c'); R(c, 266, 100, 34, 14, '#e8c83c'); TX(c, '国境', 268, 98, '#2c2c34', 16, null);
      return { z: 1.03, fx: 200, fy: 110 };
    }
    R(c, 150, 100, 6, 60, '#5c3c24'); person(c, LOPEZ, 153, 160, { k: 'td', expr: 'shock' }); L(c, 146, 130, 160, 126, '#c8a860', 2); L(c, 146, 142, 160, 138, '#c8a860', 2);
    if (t < S.tJeep) for (let i = 0; i < 16; i++) { const a = t * 3 + i * 1.3; P(c, 153 + Math.cos(a) * (8 + i % 5 * 3), 128 + Math.sin(a * 1.4) * 18, '#1c1c1c'); }
    TRIBE.forEach((st, i) => fig(c, st, 70 + i * 26, 162, { k: 'tb', arm: i === 0 ? 'point' : null }));
    if (t > S.tJeep) { const u = sg(t, S.tJeep, S.tJeep + 2); jeep(c, lerp(330, 200, u), 162, { col: '#d8d0b8' }); if (u >= 1) person(c, MISSION, 244, 162, { k: 'ms', flip: true, arm: 'point' }); }
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- ND: 1980, Ambato — the flood; the supermarket; held down (moves: the flood surges, the mother cries out, the crowd rushes in) ---- */
const ND = {
  name: 'アンバートの洪水', ch: '逮捕', bgm: 'pulse',
  init(S) { S.tShop = at(S, 'L11', 0) - 0.3; S.tCry = at(S, 'L11', 5) - 0.3; S.tHold = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShop) {
      R(c, 0, 0, W, H, '#d8d4c8'); for (let i = 0; i < 4; i++) { R(c, 10 + i * 80, 30, 66, 90, '#a89c88'); for (let k = 0; k < 4; k++) for (let j = 0; j < 6; j++) R(c, 14 + i * 80 + j * 10, 36 + k * 22, 8, 14, ['#c83c3c', '#3c7cc8', '#e8b83c', '#5c9c4c'][(i + j + k) % 4]); } R(c, 0, 150, W, 90, '#b8b4a8');
      if (t > S.tHold) { const u = sg(t, S.tHold, S.tHold + 1.2); for (let i = 0; i < 4; i++) person(c, CROWD[i + 1], lerp(i < 2 ? -20 : 340, [120, 136, 186, 202][i], u), 162, { k: 'rs', f: u < 1 ? Math.floor(t * 8 + i) & 3 : -1, arm: u >= 1 ? 'fwd' : null, flip: i > 1 }); if (u >= 1) { person(c, COPS[0], lerp(340, 250, sg(t, at(S, 'L12', 1) - 0.3, at(S, 'L12', 3))), 162, { k: 'cp', flip: true, f: Math.floor(t * 6) & 3 }); } }
      person(c, LOPEZ, 160, 160, { k: 'sm', expr: t > S.tCry ? 'shock' : 'normal', flip: true });
      person(c, MOM, 80, 162, { k: 'mm', expr: t > S.tCry ? 'shock' : 'normal', arm: t > S.tCry ? 'wave' : null }); if (t > S.tCry) exclaim(c, 80, 96, t - S.tCry);
      capPlate(c, t - S.tShop, 0.3, ['アンバートの', 'スーパーマーケット']);
      return { z: 1.04, fx: 150, fy: 110 };
    }
    riverFlood(c, t, { k: sg(t, at(S, 'L10', 3) - 0.3, at(S, 'L10', 4)) }); const n = Math.min(4, Math.floor(sg(t, at(S, 'L10', 1) - 0.3, at(S, 'L10', 5)) * 4.99)); candles(c, t, n, 130, 122, 18);
    yearFlash(c, t, 0.3, 1980, 216, 10, 'エクアドル');
    return { z: 1.03, fx: 160, fy: 110, sx: t > at(S, 'L10', 4) - 0.3 && t < at(S, 'L10', 4) ? Math.round(Math.sin(t * 50) * 2) : 0 };
  }
};

/* ---- NE: the priest in the cell; 300 confessions; 53 found; "a messenger of God" (moves: light through the bars, papers pile, map markers appear) ---- */
const NE = withCuts({
  name: '自供', ch: '司祭と自供', bgm: 'dread',
  init(S) { S.tPriest = at(S, 'L13', 3) - 0.3; S.t300 = at(S, 'L15', 0) - 0.3; S.t53 = at(S, 'L16', 0) - 0.3; S.tGod = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGod) { cell(c, t); person(c, LOPEZ_J, 160, 160, { k: 'gd', expr: 'smile', blink: blinkOf(t, 3) }); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * 0.22 + Math.sin(t) * 0.04; L(c, 160 + Math.cos(a) * 30, 100 + Math.sin(a) * 30, 160 + Math.cos(a) * 70, 100 + Math.sin(a) * 70, DA('#f8f0c0', 0.3)); } dim(c, 0.15, '#3c0000'); bigCap(c, '「神の使い」？', 26, 24, '#f8e0b0', sg(t, at(S, 'L17', 2) - 0.3, at(S, 'L17', 2))); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.t53) { samMap(c, t, { hl: { ecu: 1 } }); const n = Math.floor(sg(t, S.t53 + 0.3, at(S, 'L16', 2)) * 53); for (let i = 0; i < n; i++) { const x = 110 + hash(i) * 34, y = 80 + hash(i * 7) * 20; R(c, x - 1, y - 1, 3, 3, '#f8e070'); } R(c, 214, 96, 96, 34, '#000000'); TX(c, n + '体', 226, 100, '#f8e070', 24, null); if (t > at(S, 'L16', 4) - 0.3) stamp(c, t, at(S, 'L16', 4), 90, 40, 'アンデスの怪物', 130); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.t300) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 70, 140, 70, '#f8d8a0', 0.18 + 0.05 * Math.sin(t * 1.5)); R(c, 60, 120, 200, 8, '#5c4c3c'); const n = Math.floor(sg(t, S.t300 + 0.3, at(S, 'L15', 2)) * 30); for (let i = 0; i < n; i++) R(c, 80 + (i % 5) * 34, 114 - Math.floor(i / 5) * 4, 26, 4, i % 2 ? '#f0e8d4' : '#e4dcc4'); bigCap(c, '自供 300件以上', 26, 24, '#f4f0e8', sg(t, at(S, 'L15', 1) - 0.3, at(S, 'L15', 1))); if (t > at(S, 'L15', 2) - 0.3) stamp(c, t, at(S, 'L15', 4), 250, 96, '信じない', 80); return { z: 1.03, fx: 160, fy: 90 }; }
    cell(c, t); person(c, LOPEZ_J, 190, 160, { k: 'cl', flip: true, expr: t > S.tPriest ? 'normal' : 'angry', blink: blinkOf(t, 4) });
    if (t > S.tPriest) { const u = sg(t, S.tPriest, S.tPriest + 2); person(c, PRIEST, lerp(-20, 120, u), 160, { k: 'pr', f: u < 1 ? Math.floor(t * 5) & 3 : -1, blink: blinkOf(t, 5) }); R(c, lerp(-20, 120, u) + 2, 118, 2, 8, '#f4f0e8'); R(c, lerp(-20, 120, u) - 1, 120, 8, 2, '#f4f0e8'); }
    else bigCap(c, '黙秘', 30, 24, '#f4f0e8', sg(t, at(S, 'L13', 1) - 0.3, at(S, 'L13', 2)));
    return { z: 1.04, fx: 160, fy: 110 };
  }
}, [['R1', (c, t, S) => closeUp(c, t, priestFace({ blink: blinkOf(t, 5) }), { bg: ['#141418', '#3c3c4c'], glow: '#d8d8f0' })]]);

/* ---- NF: 1981, sixteen years; 1994, the gate opens, the convoy to the border (moves: the gavel, the gate slides, the cars drive) ---- */
const NF = {
  name: '釈放', ch: '16年', bgm: 'pulse',
  init(S) { S.tFree = at(S, 'L19', 0) - 0.3; S.tGo = at(S, 'L19', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGo) { andes(c, t, {}); R(c, 0, 120, W, 120, '#8c7c5c'); R(c, 0, 146, W, 14, '#5c5850'); for (let i = 0; i < 10; i++) R(c, mod(i * 40 - t * 60, W + 40) - 20, 152, 16, 2, '#e8e0c8'); const ox = Math.sin(t * 0.8) * 6; jeep(c, 60 + ox, 160, { col: '#3c5c3c' }); jeep(c, 160 + ox, 160, { col: '#d8d0c8' }); jeep(c, 250 + ox, 160, { col: '#3c5c3c' }); if (t > at(S, 'L19', 7) - 0.3) { R(c, 290, 100, 4, 46, '#5c4c3c'); R(c, 270, 92, 44, 14, '#e8c83c'); TX(c, '国境', 276, 90, '#2c2c34', 16, null); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFree) { // the prison gate in Quito slides open
      andes(c, t, {}); R(c, 0, 120, W, 120, '#7c7468'); R(c, 40, 50, 240, 100, '#9c9488'); for (let i = 0; i < 12; i++) R(c, 40 + i * 20, 46, 12, 6, '#9c9488'); const k = sg(t, S.tFree + 0.8, S.tFree + 3); R(c, 120, 80, 80, 70, '#1c1c1c'); R(c, 120 - 40 * k, 80, 40, 70, '#5c5c64'); R(c, 160 + 40 * k, 80, 40, 70, '#5c5c64');
      if (k > 0.5) person(c, LOPEZ, lerp(160, 200, sg(t, S.tFree + 2, S.tGo)), 154, { k: 'gt', f: Math.floor(t * 4) & 3 });
      yearFlash(c, t, S.tFree + 0.2, 1994, 216, 10, '8月31日'); capPlate(c, t - S.tFree, 0.4, ['首都キトの', '刑務所']);
      return { z: 1.03, fx: 160, fy: 100 };
    }
    // the courtroom
    R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 30) R(c, x, 0, 4, 150, '#5c4030'); R(c, 0, 150, W, 90, '#3c2c1c'); person(c, JUDGE, 160, 112, { k: 'jd', blink: blinkOf(t, 4) }); R(c, 96, 92, 128, 40, '#6c4c34'); R(c, 96, 92, 128, 4, '#8c6c4c'); for (let k = 0; k < 4; k++) R(c, 104 + k * 32, 100, 24, 26, '#5c3c28'); E(c, 160, 110, 8, 8, '#c8a040');
    const hit = at(S, 'L18', 3) - 0.3, hk = t > hit && t < hit + 0.3; L(c, 196, 96, 210, hk ? 100 : 88, '#5c3c24', 3); R(c, 206, hk ? 98 : 84, 10, 6, '#5c3c24'); person(c, LOPEZ_J, 160, 166, { k: 'ct', flip: true });
    yearFlash(c, t, 0.3, 1981, 216, 10, '7月31日'); if (t > hit) stamp(c, t, hit + 0.2, 70, 60, '禁固16年', 90);
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- NG: the asylum; the monthly promise never kept; his mother's bed and chair (moves: calendar pages flip, he carries the furniture away) ---- */
const NG = {
  name: '保釈', ch: '消えた男', bgm: 'dread',
  init(S) { S.tCal = at(S, 'L21', 0) - 0.3; S.tMom = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMom) { andes(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#7c6c5c'); R(c, 0, 146, W, 14, '#5c5850'); R(c, 20, 60, 90, 70, '#c8b89c'); R(c, 56, 94, 18, 36, '#5c3c24'); PF(c, [14, 60, 65, 40, 116, 60], '#8c4c3c');
      person(c, OLDMOM, 120, 156, { k: 'om', expr: 'cry', flip: true }); const u = sg(t, at(S, 'L22', 1), at(S, 'L22', 4)); const x = lerp(170, 300, u); R(c, x, 140, 34, 6, '#8c6c44'); R(c, x, 136, 8, 10, '#8c6c44'); R(c, x + 40, 130, 4, 20, '#6c4c34'); R(c, x + 40, 140, 14, 3, '#6c4c34'); person(c, LOPEZ, x + 20, 158, { k: 'fn', f: Math.floor(t * 4) & 3, arm: 'hold' });
      return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tCal) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 70, 130, 60, '#f8d8a0', 0.15); for (let i = 0; i < 12; i++) { const x = 30 + (i % 6) * 46, y = 20 + Math.floor(i / 6) * 56; R(c, x, y, 40, 48, '#f0e8d4'); R(c, x, y, 40, 10, '#c81818'); TX(c, (i + 1) + '月', x + 6, y + 14, '#2c2c34', 16, null); if (t > S.tCal + 0.4 + i * 0.35) cross(c, x + 20, y + 30, 10); } return { z: 1.02, fx: 160, fy: 76 }; }
    R(c, 0, 0, W, H, '#c8d0d0'); for (let x = 0; x < W; x += 40) R(c, x, 0, 2, 150, '#a8b0b0'); R(c, 0, 150, W, 90, '#8c9494'); R(c, 220, 40, 60, 60, '#8cacc8'); for (let k = 0; k < 4; k++) R(c, 220 + k * 20, 40, 2, 60, '#5c5c64');
    person(c, { ...LOPEZ, id: 'lpw', top: 'tee', coat: '#e8ece8', pants: '#e8ece8' }, 150 + Math.sin(t * 0.7) * 20, 160, { k: 'as', f: Math.floor(t * 3) & 3, flip: Math.cos(t * 0.7) < 0 });
    yearFlash(c, t, 0.3, 1995, 216, 10, 'ボゴタ'); if (t > at(S, 'L20', 2) - 0.3) { stamp(c, t, at(S, 'L20', 4), 80, 60, '保釈金 50ドル', 120); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
};
function cross(c, x, y, s = 10, col = '#e81c1c') { L(c, x - s, y - s, x + s, y + s, col, 3); L(c, x + s, y - s, x - s, y + s, col, 3); }

/* ---- NH: 1999, a borrowed ID; 2002, Interpol; the empty road (moves: the stamp, the wanted poster flutters, wind on the road) ---- */
const NH = {
  name: '行方', ch: '行方不明', bgm: 'requiem',
  init(S) { S.tInt = at(S, 'L24', 0) - 0.3; S.tMom = at(S, 'L25', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMom) { andes(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); PF(c, [140, 120, 180, 120, 300, 240, 20, 240], '#2c2c34'); for (let i = 0; i < 6; i++) R(c, 158, 130 + i * 18, 4, 8 + i * 2, '#8c8c7c'); mist(c, t, 108, 0.2, '#5c6c8c'); if (t > at(S, 'L25', 4) - 0.3) stamp(c, t, at(S, 'L25', 5), 160, 70, '行方不明', 90); return { z: 1.03 + 0.05 * ss(sg(t, S.tMom, S.dur)), fx: 160, fy: 110 }; }
    if (t > S.tInt) { R(c, 0, 0, W, H, '#2c2c34'); glow(c, 160, 80, 130, 70, '#d8d8f0', 0.15); const sw = Math.sin(t * 2) * 0.03; c.save(); c.translate(160, 30); c.rotate(sw); R(c, -50, 0, 100, 110, '#f0e8d4'); R(c, -46, 4, 92, 14, '#1c3c7c'); TX(c, 'INTERPOL', -32, 3, '#f4f0e8', 16, null); blit(c, lopezFace({}), 0, 56, 24, 24, { s: 1.2 }); R(c, -46, 92, 92, 12, '#c81818'); c.restore(); yearFlash(c, t, S.tInt + 0.2, 2002, 8, 10, '指名手配'); return { z: 1.03, fx: 160, fy: 80 }; }
    R(c, 0, 0, W, H, '#d8d4c8'); R(c, 0, 150, W, 90, '#8c8478'); R(c, 40, 60, 240, 60, '#a89c88'); for (let i = 0; i < 4; i++) { R(c, 52 + i * 58, 70, 46, 40, '#c8d8e0'); } R(c, 30, 116, 260, 8, '#7c6c58');
    person(c, LOPEZ, 110, 162, { k: 'of', blink: blinkOf(t, 3) }); for (let i = 0; i < 3; i++) person(c, CROWD[i + 2], mod(t * 18 + i * 110, W + 40) - 20, 168, { k: 'pq', f: Math.floor(t * 4 + i) & 3 });
    R(c, 60, 92, 92, 20, '#f4f0e8'); TX(c, 'ID 1616617', 64, 94, '#2c2c34', 16, null); if (t > at(S, 'L23', 3) - 0.3) stamp(c, t, at(S, 'L23', 3), 110, 60, '他人の番号', 100);
    yearFlash(c, t, 0.3, 1999, 216, 10, 'ボゴタ');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- NI: ending — candles for the girls under the Andes night (moves: candles light one after another, stars) ---- */
const NI = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { andes(c, t, { night: true }); R(c, 0, 120, W, 120, '#14141c'); const n = Math.floor(sg(t, 0.3, 6) * 60); candles(c, t, n, 46, 128, 12); return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 }; }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { andes(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#7c7468'); R(c, 40, 50, 240, 100, '#9c9488'); R(c, 120, 80, 80, 70, '#1c1c1c'); const k = sg(t, -1.5, 3); R(c, 120 - 40 * k, 80, 40, 70, '#5c5c64'); R(c, 160 + 40 * k, 80, 40, 70, '#5c5c64'); person(c, LOPEZ, lerp(160, 190, sg(t, 2, 9)), 154, { k: 's1', f: Math.floor(t * 4) & 3 }); return { z: 1.1, fx: 160, fy: 100 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { andes(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); PF(c, [140, 120, 180, 120, 300, 240, 20, 240], '#2c2c34'); mist(c, t, 108, 0.2, '#5c6c8c'); return { z: 1.12, fx: 160, fy: 110 }; }
};
