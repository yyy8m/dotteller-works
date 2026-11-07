/* ================= 文庫 #002 注文の多い料理店: scenes ================= */
const GS = 1.25;
const HUNTER = { id: 'hu', coat: '#8c7c4c', coat2: '#6c5c34', pants: '#5c4c34', boots: '#2c2014', hair: '#2c1c14', hat: 'straw', mino: true, moustache: true }; // scale of the two gentlemen in wide shots
/* ---- SA: deep in the mountains (walking, parallax) ---- */
const SA = {
  name: '山奥の二人', ch: '山奥の二人', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const ox = t * 26; forestDeep(c, t, ox);
    for (let k = 0; k < 2; k++) blit(c, dogSpr(t, 'walk', k), 206 + k * 42 + Math.sin(t * 2 + k) * 4, 152, 18, 23, { s: 1.3 });
    blit(c, suitFig(HUNTER, { f: Math.floor(t * 7 + 1) & 3, arm: 'rifle', k: 'a' }), 294, 154, FIG_AX2, FIG_AY2, { s: GS });
    drawGents(c, 168, 154, GS / 0.7, { per: g => ({ f: Math.floor(t * 7 + g * 2) & 3, weapon: 'rifle', k: 'w' }) });
    return { z: 1.04, fx: 170, fy: 104 };
  }
};
/* ---- SB: the dogs go dizzy and die ---- */
const SB = {
  name: '犬', bgm: 'memory',
  init(S) { S.tLost = at(S, 'L2', 1) - 0.2; S.tGone = at(S, 'L2', 3) + 0.4; S.tDizzy = at(S, 'L2b', 2) - 0.3; S.tDead = at(S, 'L2b', 3) - 0.2; S.tTalk = ln(S, 'A2') ? at(S, 'A2', 0) - 0.4 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const dark = ss(sg(t, S.tDizzy, S.tDead + 2));
    forestDeep(c, t, 300, { rays: false });
    if (dark > 0) { c.fillStyle = DA('#1c0c24', 0.45 * dark); c.fillRect(0, 0, W, H); }
    for (let k = 0; k < 2; k++) {
      const x = 206 + k * 52, pose = t < S.tDizzy ? 'walk' : t < S.tDead ? 'dizzy' : 'dead', wob = pose === 'dizzy' ? Math.sin(t * 9 + k) * 3 : 0;
      blit(c, dogSpr(pose === 'walk' ? 0 : t, pose, k), x + wob, 152, 18, 23, { s: 1.3 });
      if (pose === 'dizzy') for (let i = 0; i < 6; i++) { const a = t * 6 + i; P(c, x + 6 + Math.cos(a) * 9, 116 + Math.sin(a) * 3, i & 1 ? '#f8f8f8' : '#f8d860'); }
      if (pose === 'dead') for (let i = 0; i < 4; i++) { const u = fr(t * 0.6 + i / 4 + k * 0.3); glow(c, x + 22 + i * 2, 142 - u * 6, 1.5 + u * 2, 1.5 + u * 2, '#ffffff', 2 * (0.9 * (1 - u))); }
    }
    if (t < S.tGone + 3) { const u = sg(t, S.tLost + 1.2, S.tGone + 2.5), hx = lerp(294, 360, ss(u)), fl = false, look = t > S.tLost && t < S.tLost + 1.2 && (Math.floor(t * 2) & 1);
      blit(c, suitFig(HUNTER, { f: fl ? Math.floor(t * 7) & 3 : -1, arm: 'rifle', expr: 'sad', k: 'b' }), hx, 154, FIG_AX2, FIG_AY2, { s: GS, flip: fl || look });
      if (t > S.tLost && t < S.tLost + 1.2) TX(c, '？', 300, 92, '#f8f8f8', 16, '#000000'); }
    drawGents(c, 160, 154, GS / 0.7, { per: g => ({ weapon: 'rifle', shock: t > S.tDead && t < S.tTalk, k: 's' }) });
    return { z: 1.04 + 0.12 * ss(sg(t, S.tDizzy, S.tDead + 1)), fx: 210, fy: 112 };
  }
};
/* ---- SC: lost at dusk; the wind; pampas grass ---- */
const SC = {
  name: '迷う', bgm: 'eerie',
  init(S) { S.tWind = at(S, 'L3', 2) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const wind = t > S.tWind; forestDeep(c, t, 520, { dusk: true, wind });
    drawGents(c, 166, 152, GS / 0.7, { per: g => ({ weapon: 'rifle', expr: 'sad', dy: Math.round(Math.sin(t * 2 + g) * 1), k: 'h' }) });
    susuki2(c, t, 168, wind, 26, 5);
    return { z: 1.06, fx: 160, fy: 106, sx: wind ? Math.round(Math.sin(t * 40) * 0.6) : 0 };
  }
};
/* ---- SD: the Western-style house appears — RESTAURANT / WILDCAT HOUSE ---- */
const SD = {
  name: '山猫軒', ch: '山猫軒', bgm: 'carnival',
  init(S) { S.tHouse = at(S, 'L4', 1) - 0.3; S.tSign = at(S, 'L4', 2) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    forestDeep(c, t, 520, { dusk: true });
    const k = ss(sg(t, S.tHouse, S.tHouse + 1.8));
    if (k > 0) { c.fillStyle = DA('#e8e0f0', 0.25 * (1 - k)); c.fillRect(0, 0, W, 150); wildcatHouse(c, t, 150, 150, k, t > S.tSign ? eOut(sg(t, S.tSign, S.tSign + 0.5)) : 0); glow(c, 225, 150, 90, 10, '#f8c060', 2 * (0.12 * k)); }
    drawGents(c, 104, 154, GS / 0.7, { per: g => ({ weapon: 'rifle', flip: t < S.tHouse + 0.4, arm: t > S.tSign + 1 && g === 0 ? 'point' : null, expr: t > S.tSign ? 'smile' : 'sad', k: 'd' }) });
    susuki2(c, t, 170, false, 16, 9);
    return { z: lerp(1.12, 1.0, k), fx: lerp(104, 180, k), fy: 100 };
  }
};
/* ---- door scenes in the corridor ---- */
function doorScene(def) {
  return Object.assign({
    init(S) { S.signs = def.signs(S); S.dur = lastSe(S) + (def.tail || 1.2); if (def.init2) def.init2(S); },
    draw(c, t, S) {
      const sg0 = signAt(S, t), o = (sg0 && sg0[3]) || {};
      const push = def.push == null ? 0.06 : def.push, z = 1 + push * ss(sg(t, 0, S.dur));
      corridor(c, t, Object.assign({}, def.room || {}, o.room || {}));
      if (def.props) def.props(c, t, S, o);
      if (sg0 && sg0[1][0]) plaque(c, sg0[1], sg0[2] || '#f8d860', ss(sg(t, sg0[0], sg0[0] + 0.35)), def.plaqueY || 32, 186);
      const gs = def.gents ? def.gents(t, S, o) : {};
      drawGents(c, 70, 160, 1.45 / 0.7, gs);
      if (def.front) def.front(c, t, S, o);
      return Object.assign({ z, fx: 160, fy: 100 }, def.cam ? def.cam(t, S) : {});
    }
  }, def.base);
}
const SE = doorScene({
  base: { name: '金文字の扉', ch: '扉の文字', bgm: 'carnival' },
  signs: S => [[at(S, 'L5', 1) - 0.2, ['どなたもどうか', 'お入りください', '決してご遠慮は', 'ありません'], '#f8d860', { room: { glass: true, door: ['#8c6c4c', '#6c4c34', '#4c3424'] } }],
    [at(S, 'L6', 1) - 0.2, ['ことに太ったお方や', '若いお方は', '大歓迎いたします'], '#f8d860', { room: { glass: true, door: ['#8c6c4c', '#6c4c34', '#4c3424'] } }],
    [at(S, 'L6', 3) - 0.2, ['当軒は注文の多い', '料理店ですから', 'どうかそこは', 'ご承知ください'], '#f8e070', { room: { door: ['#4c8cc0', '#3c6c9c', '#2c4c7c'], wall: ['#3c5c6c', '#2c4c5c', '#1c3c4c'] } }]],
  gents: (t, S) => ({ per: g => ({ weapon: 'rifle', expr: 'smile', arm: ln(S, 'B4') && t > at(S, 'B4', 0) && t < at(S, 'B4', 0) + 3 && g === 1 ? 'up' : null, k: 'e' }) }),
});
const SF = doorScene({
  base: { name: '次から次へ', bgm: 'carnival' },
  signs: S => [[0, [''], '#f8d860', { room: { door: ['#4c8cc0', '#3c6c9c', '#2c4c7c'], wall: ['#3c5c6c', '#2c4c5c', '#1c3c4c'] } }],
    [at(S, 'L7', 1) - 0.2, ['髪をきちんとして', 'はきものの泥を', '落してください'], '#f85040', { room: { door: ['#7c4c34', '#5c3424', '#3c2018'] }, step: 1 }],
    [at(S, 'L7', 3) - 0.2, ['鉄砲と弾丸を', 'ここへ', '置いてください'], '#f8d860', { room: { door: ['#2c2c34', '#1c1c24', '#0c0c14'] }, step: 2 }],
    [at(S, 'L7', 5) - 0.2, ['帽子と外套と靴を', 'おとりください'], '#f8d860', { room: { door: ['#2c2c34', '#1c1c24', '#0c0c14'] }, step: 3 }]],
  props(c, t, S, o) {
    if (o.step === 1) { // the mirror and the long brush
      R(c, 230, 60, 40, 58, '#c8a040'); R(c, 233, 63, 34, 52, '#a8c4d4'); L(c, 237, 68, 250, 100, '#e8f4f8'); L(c, 244, 66, 258, 90, '#e8f4f8');
      L(c, 236, 160, 266, 128, '#7c4c2c', 2); R(c, 262, 124, 10, 8, '#3c2c20'); for (let k = 0; k < 5; k++) P(c, 263 + k * 2, 132, '#2c2014');
    }
    if (o.step >= 2) { // the black rack with the rifles
      R(c, 222, 120, 72, 6, '#141418'); R(c, 226, 126, 4, 34, '#141418'); R(c, 286, 126, 4, 34, '#141418');
      for (let k = 0; k < 2; k++) { L(c, 232 + k * 26, 118, 262 + k * 26, 108, '#5c3c24', 2); L(c, 250 + k * 26, 112, 264 + k * 26, 107, '#3c3c44', 2); }
    }
    if (o.step >= 3) { // hats and coats on the nails, boots on the floor
      R(c, 18, 60, 70, 3, '#5c3c24'); for (let k = 0; k < 4; k++) R(c, 24 + k * 18, 63, 2, 4, '#c8c8d0');
      for (let k = 0; k < 2; k++) { R(c, 22 + k * 36, 66, 14, 6, GENT2[k].hatCol); PF(c, [20 + k * 36, 76, 38 + k * 36, 76, 42 + k * 36, 116, 16 + k * 36, 116], GENT2[k].coat); R(c, 28 + k * 36, 78, 2, 30, GENT2[k].coat2); }
      for (let k = 0; k < 2; k++) { R(c, 230 + k * 16, 196, 8, 6, '#2c2014'); R(c, 240 + k * 16, 198, 8, 4, '#2c2014'); }
    }
  },
  gents: (t, S, o) => ({ per: g => ({ weapon: o.step >= 2 ? null : 'rifle', noHat: o.step >= 3, noCoat: o.step >= 3, k: 'f' + (o.step || 0) }) }),
});
const SG = doorScene({
  base: { name: '金庫', bgm: 'carnival' },
  signs: S => [[0, ['金物類 ことに', '尖ったものは', 'みんなここに', '置いてください'], '#f8d860', { room: { door: ['#2c2c34', '#1c1c24', '#0c0c14'] } }]],
  init2(S) { S.tLock = at(S, 'L8', 7, lastSe(S) - 1.5) - 0.1; },
  props(c, t, S) { // the black lacquered safe
    const shut = t > S.tLock, sx = 228, sy = 92;
    R(c, sx, sy, 64, 74, '#0c0c10'); R(c, sx + 2, sy + 2, 60, 70, '#1c1c24'); R(c, sx + 2, sy + 2, 60, 2, '#3c3c48'); R(c, sx + 4, sy + 64, 56, 6, '#0c0c10');
    if (!shut) { R(c, sx + 6, sy + 6, 52, 54, '#050508'); R(c, sx - 26, sy + 4, 30, 58, '#1c1c24'); R(c, sx - 26, sy + 4, 2, 58, '#3c3c48');
      for (let i = 0; i < 6; i++) { const u = fr(t * 0.5 + i / 6), x = lerp(150, sx + 30, u), y = lerp(140, sy + 40, u) - Math.sin(u * Math.PI) * 24; R(c, x, y, 4, 3, ['#f8d860', '#c8c8d0', '#8c5c3c'][i % 3]); } }
    else { E(c, sx + 32, sy + 32, 12, 12, '#c8a040'); E(c, sx + 32, sy + 32, 9, 9, '#8c6c20'); for (let k = 0; k < 8; k++) L(c, sx + 32, sy + 32, sx + 32 + Math.cos(k * 0.8 + t) * 8, sy + 32 + Math.sin(k * 0.8 + t) * 8, '#f8d860'); R(c, sx + 50, sy + 26, 6, 12, '#c8a040');
      if (t < S.tLock + 0.3) for (let i = 0; i < 8; i++) L(c, sx + 32, sy + 32, sx + 32 + Math.cos(i) * 24, sy + 32 + Math.sin(i) * 24, '#ffffff'); }
  },
  gents: () => ({ per: g => ({ noHat: true, noCoat: true, k: 'g' }) }),
});
const SH = doorScene({
  base: { name: 'クリーム', bgm: 'carnival' },
  signs: S => [[at(S, 'L9', 1) - 0.3, ['壺のなかの', 'クリームを', '顔や手足に', '塗ってください'], '#f8d860', { room: { door: ['#3c3c44', '#2c2c34', '#1c1c24'] } }]],
  init2(S) { S.tCream = at(S, 'L9', 3) - 0.2; S.tEat = at(S, 'L9', 4) - 0.2; },
  props(c, t, S) { const px = 252, py = 150; E(c, px, py, 18, 16, '#c8d4e0'); E(c, px - 5, py - 4, 6, 6, '#eef4f8'); E(c, px, py - 13, 15, 4, '#fcfaf2'); R(c, px - 15, py - 16, 30, 3, '#a8b4c4'); R(c, px - 22, py + 14, 44, 4, '#5c3c24'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: t > S.tCream, arm: t > S.tEat && t < S.tEat + 2.5 && (Math.floor(t * 3) + g) % 2 ? 'cover' : null, k: 'h' + (t > S.tCream ? 'c' : '') }) }),
});
const SI = doorScene({
  base: { name: '香水', bgm: 'carnival' },
  signs: S => [[at(S, 'L10', 0) - 0.2, ['料理はもうすぐ', 'できます', '頭に香水を', 'ふりかけてください'], '#f8d860', { room: { door: ['#3c3c44', '#2c2c34', '#1c1c24'] } }]],
  init2(S) { S.tSpray = at(S, 'L10', 2) - 0.2; S.tSour = at(S, 'L10', 4) - 0.2; },
  props(c, t, S) { const px = 252, py = 150; R(c, px - 7, py - 26, 14, 26, '#f8d050'); R(c, px - 5, py - 24, 3, 22, '#fff8c0'); R(c, px - 3, py - 32, 6, 6, '#c8a040'); E(c, px, py - 34, 4, 2, '#e8b838'); glow(c, px, py - 14, 16, 16, '#f8e080', 2 * (0.15)); R(c, px - 18, py, 36, 4, '#5c3c24'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: true, arm: t > S.tSpray && t < S.tSpray + 2 ? 'up' : null, expr: t > S.tSour ? 'sad' : 'normal', k: 'i' }) }),
  front(c, t, S) {
    if (t > S.tSpray && t < S.tSpray + 2) for (let i = 0; i < 14; i++) { const u = fr(t * 2 + i / 14); P(c, 60 + i * 3, 104 - u * 14, '#c8e0f8'); }
    if (t > S.tSour) for (let i = 0; i < 6; i++) { const x = 40 + i * 12, u = fr(t * 0.7 + i / 6); PL(c, [x, 100 - u * 30, x + 3, 94 - u * 30, x - 2, 88 - u * 30, x + 2, 82 - u * 30], DA('#a8c84c', 0.8 * (1 - u))); }
  },
});
/* ---- SJ: the last door — salt ---- */
const SJ = doorScene({
  base: { name: '塩', ch: '最後の注文', bgm: 'dread' },
  push: 0.15,
  signs: S => [[at(S, 'L11', 1) - 0.2, ['からだ中に', '壺の中の塩を', 'たくさんよく', 'もみ込んでください'], '#f8d860', { room: { door: ['#1c1c24', '#141418', '#0c0c10'], wall: ['#4c1c1c', '#3c1414', '#2c0c0c'], lightUnder: '#f84040' } }]],
  init2(S) { S.tStop = ln(S, 'A7') ? at(S, 'A7', 0) - 0.3 : 1e9; S.tShake = ln(S, 'B7') ? at(S, 'B7', 2) - 0.2 : 1e9; },
  props(c, t, S) { const px = 252, py = 152; E(c, px, py, 18, 15, '#2c5ca8'); E(c, px - 6, py - 4, 6, 5, '#5c8cd8'); E(c, px, py - 12, 15, 4, '#f8f8f8'); R(c, px - 15, py - 15, 30, 3, '#1c3c7c'); for (let i = 0; i < 6; i++) P(c, px - 8 + i * 3, py - 14, '#ffffff'); R(c, px - 22, py + 13, 44, 4, '#5c3c24'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: true, shock: t > S.tStop, dx: t > S.tShake ? Math.round(Math.sin(t * 50 + g) * 1.5) : 0, flip: t > S.tStop + 0.6 && g === 1, k: 'j' + (t > S.tStop ? 's' : '') }) }),
  front(c, t, S) { if (t > S.tStop) redVignette(c, 0.3 + 0.15 * Math.sin(t * 6)); },
});
/* ---- SK: the last door, close: silver fork and knife, two keyholes, blue eyes ---- */
const SK = {
  name: 'かぎ穴', ch: '山猫の子分', bgm: 'dread',
  init(S) { S.tSign = at(S, 'L12', 1) - 0.3; S.tEyes = at(S, 'L12', 2) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#0c0608');
    R(c, 30, 0, 260, 200, '#c8a040'); R(c, 34, 0, 252, 200, '#2c1410'); R(c, 40, 6, 240, 194, '#4c2418');
    for (let y = 10; y < 200; y += 6) R(c, 42, y, 236, 1, '#3c1c14'); R(c, 40, 6, 6, 194, '#5c2c1c'); R(c, 274, 6, 6, 194, '#2c1008');
    R(c, 74, 40, 6, 120, '#d8dce4'); R(c, 76, 40, 1, 120, '#ffffff'); for (let k = 0; k < 4; k++) R(c, 66 + k * 6, 22, 3, 22, '#d8dce4'); R(c, 66, 42, 21, 4, '#d8dce4');
    R(c, 240, 50, 8, 112, '#d8dce4'); PF(c, [240, 20, 252, 24, 254, 70, 240, 74], '#e8ecf4'); L(c, 242, 26, 242, 70, '#ffffff');
    for (const kx of [134, 186]) { E(c, kx, 98, 12, 12, '#000000'); PF(c, [kx - 7, 104, kx + 7, 104, kx + 5, 132, kx - 5, 132], '#000000'); glow(c, kx, 98, 14, 14, '#c8a040', 0.2);
      if (t > S.tEyes) { const look = Math.sin(t * 1.6) * 3, bl = blinkOf(t, kx) === 2; if (!bl) { E(c, kx + look, 98, 7, 7, '#e8f0f8'); E(c, kx + look, 98, 5.5, 5.5, '#2c7cf0'); R(c, kx + look - 1, 93, 2, 10, '#000000'); P(c, kx + look - 3, 95, '#ffffff'); P(c, kx + look - 2, 95, '#ffffff'); } else L(c, kx - 6, 98, kx + 6, 98, '#2c7cf0'); glow(c, kx, 98, 18, 14, '#2c7cf0', 2 * (0.12)); } }
    if (t > S.tSign) plaque(c, ['いや わざわざ', 'ご苦労です'], '#f8f8f8', ss(sg(t, S.tSign, S.tSign + 0.4)), 26);
    const voice = S.lines.find(l => l.spk !== 'narrator' && t > l.t0 - 0.2 && t < l.se + 0.2);
    if (voice) { const p = 0.5 + 0.5 * Math.sin(t * 8); glow(c, 160, 110, 80, 26, '#2c7cf0', 2 * (0.06 * p)); }
    return { z: lerp(1.0, 1.25, ss(sg(t, S.tEyes, S.tEyes + 4))), fx: 160, fy: 94 };
  }
};
/* ---- SL: their faces crumple like waste paper; they cry ---- */
const SL = {
  name: '泣く', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#1c0c10', '#2c1418', '#140808']);
    for (let i = 0; i < 40; i++) { const x = (i * 53) % W, y = (i * 29) % 200; L(c, x, y, x + 18, y + 6 - (i % 3) * 4, '#3c2024'); }
    redVignette(c, 0.35);
    for (let g = 0; g < 2; g++) {
      const k = ss(sg(t, 0.4 + g * 0.3, 3)), shake = Math.round(Math.sin(t * 40 + g * 3) * 1.5);
      blit(c, gentFace(g, { cream: true, crumple: k > 0.5, scared: true }), 100 + g * 120 + shake, 94, 24, 24, { s: 2.2 });
      if (k > 0.5) for (let i = 0; i < 4; i++) { const u = fr(t * 1.2 + i / 4 + g * 0.5); R(c, 80 + g * 120 + (i & 1) * 38, 96 + u * 50, 2, 4, DA('#88c8f8', 1 - u)); }
    }
    return { z: 1.05, fx: 160, fy: 96 };
  }
};
/* ---- SM: the white dogs burst in; darkness — the boss's eyes — the room vanishes ---- */
const SM = {
  name: '白熊のような犬', ch: '白熊のような犬', bgm: 'climb',
  init(S) { S.tBurst = at(S, 'L14', 3) - 0.2; S.tJump = at(S, 'L14', 5, lastSe(S)) + 0.6; S.tDark = ln(S, 'L15') ? at(S, 'L15', 0) - 0.3 : 1e9; S.tVanish = ln(S, 'L15') ? at(S, 'L15', 4) - 0.2 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tDark) {
      corridor(c, t, { door: ['#1c1c24', '#141418', '#0c0c10'], wall: ['#4c1c1c', '#3c1414', '#2c0c0c'] });
      if (t > S.tBurst) { const u = t - S.tBurst; for (let i = 0; i < 14; i++) R(c, 30 + i * 6 + u * 60 * Math.cos(i), 110 + u * 70 * Math.sin(i * 2) + u * u * 60, 6, 3, '#6c4c2c');
        for (let k = 0; k < 2; k++) { const run = t < S.tJump, jk = sg(t, S.tJump, S.tJump + 0.6), x = run ? 50 + (Math.sin(u * 3 + k * 3) + 1) * 90 + k * 20 : lerp(170, 160, jk), y = run ? 176 - Math.abs(Math.sin(u * 8 + k)) * 10 : lerp(176, 100, jk); if (jk < 1) blit(c, dogSpr(t, 'run', k), x, y, 18, 23, { s: run ? 1.6 : lerp(1.6, 0.8, jk), flip: run && Math.cos(u * 3 + k * 3) < 0 }); } }
      drawGents(c, 92, 160, 1.45 / 0.7, { per: g => ({ noHat: true, noCoat: true, cream: true, shock: true, k: 'm' }) });
      return { z: 1, fx: 160, fy: 110, sx: t > S.tBurst && t < S.tBurst + 0.4 ? Math.round(Math.sin(t * 60) * 3) : 0 };
    }
    const v = ss(sg(t, S.tVanish, S.tVanish + 2));
    R(c, 0, 0, W, H, '#040305');
    const ca = 1 - ss(sg(v, 0, 0.5)), fa = ss(sg(v, 0.5, 1));
    if (ca > 0) { c.save(); c.globalAlpha = ca; glow(c, 160, 96, 80, 70, '#f86c1c', 2 * (0.08)); blit(c, bossFace({ lick: (Math.floor(t * 3) & 1) === 1 }), 160, 102, 24, 24, { s: 3.2 }); ['にゃあお', 'くゎあ', 'ごろごろ'].forEach((s, i) => { if (t > S.tDark + 1.2 + i * 1.1) TX(c, s, [16, 224, 120][i] + Math.sin(t * 30 + i) * 2, [24, 56, 150][i], '#f8f8f8', 24, '#000000'); }); c.restore(); }
    if (fa > 0) { c.save(); c.globalAlpha = fa; forestDeep(c, t, 700, { dusk: true }); c.restore(); }
    return { z: 1, fx: 160, fy: 100 };
  }
};
/* ---- SN: standing in the grass in the cold; clothes on the branches; the hunter ---- */
const SN = {
  name: '草の中', ch: '帰り道', bgm: 'memory',
  init(S) { S.tHunter = ln(S, 'H1') ? at(S, 'H1', 0) - 0.5 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    forestDeep(c, t, 700, { dusk: true, wind: t < 6 });
    PF(c, [40, 50, 58, 50, 62, 84, 36, 84], GENT2[0].coat); R(c, 46, 52, 2, 28, GENT2[0].coat2); PF(c, [246, 58, 264, 58, 268, 92, 242, 92], GENT2[1].coat);
    R(c, 120, 146, 10, 6, '#2c2014'); R(c, 132, 148, 10, 4, '#2c2014'); R(c, 280, 150, 10, 6, '#5c3c24'); P(c, 210, 152, '#f8d860'); P(c, 214, 154, '#c8c8d0');
    blit(c, dogSpr(t, 'walk', 0), 214, 156, 18, 23, { s: 1.2 }); blit(c, dogSpr(t, 'walk', 1), 262, 158, 18, 23, { s: 1.2 });
    drawGents(c, 166, 156, GS / 0.7, { per: g => ({ noHat: true, noCoat: true, dx: t < S.tHunter ? Math.round(Math.sin(t * 30 + g)) : 0, arm: t > S.tHunter + 1 && g === 0 ? 'up' : null, expr: t > S.tHunter + 1 ? 'smile' : 'cry', k: 'n' }) });
    if (t > S.tHunter) { const x = lerp(-20, 84, ss(sg(t, S.tHunter, S.tHunter + 3))); blit(c, suitFig(HUNTER, { f: Math.floor(t * 7) & 3, arm: 'rifle', k: 'h' }), x, 156, FIG_AX2, FIG_AY2, { s: 1.25 }); }
    susuki2(c, t, 172, t < 6, 18, 2);
    return { z: 1.04, fx: 150, fy: 106 };
  }
};
/* ---- SO: back in Tokyo; the bathhouse; the crumpled faces never went back ---- */
const SO = {
  name: '結び', ch: '結び', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#5c7c8c', '#7c9cac', '#a8c0cc']);
    for (let y = 0; y < 118; y += 10) for (let x = ((y / 10) & 1) * 10; x < W; x += 20) { R(c, x, y, 19, 9, '#8cacbc'); R(c, x, y, 19, 1, '#a8c4d0'); }
    R(c, 0, 116, W, 4, '#3c5c6c');
    R(c, 40, 104, 240, 60, '#8c6c4c'); R(c, 46, 100, 228, 10, '#b8946c'); for (let x = 46; x < 274; x += 12) R(c, x, 100, 1, 10, '#8c6c4c'); R(c, 50, 106, 220, 20, '#4c9cc8');
    for (let i = 0; i < 16; i++) { const u = fr(t * 0.25 + i / 16); glow(c, 60 + i * 14 + Math.sin(t + i) * 4, 100 - u * 70, 6 + u * 12, 4 + u * 6, '#f8f8f8', 2 * (0.3 * (1 - u))); }
    for (let g = 0; g < 2; g++) blit(c, gentFace(g, { crumple: true, bath: true }), 124 + g * 76, 96, 24, 36, { s: 1.4 });
    R(c, 50, 118, 220, 8, '#4c9cc8'); for (let i = 0; i < 6; i++) L(c, 60 + i * 36 + Math.sin(t * 2 + i) * 3, 120, 76 + i * 36 + Math.sin(t * 2 + i) * 3, 120, '#a8d8f0');
    return { z: lerp(1.25, 1, ss(sg(t, 0, S.tEnd))), fx: 160, fy: 100 };
  }
};

[SE, SF, SG, SH, SI, SJ, SM].forEach(sc => sc.wideDY = 8);
