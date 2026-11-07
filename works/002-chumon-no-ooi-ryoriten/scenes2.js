/* ================= 文庫 #002 注文の多い料理店: scenes ================= */
/* ---- SA: deep in the mountains ---- */
const SA = {
  name: '山奥の二人', ch: '山奥の二人', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const ox = t * 22; autumnForest(c, t, ox);
    for (let k = 0; k < 2; k++) blit(c, dogSpr(t, 'walk', k), 214 + k * 34 + Math.sin(t * 2 + k) * 4, 148, 13, 17, { s: 1.4 });
    drawGents(c, 170, 148, 1.6, { per: g => ({ f: Math.floor(t * 7 + g * 2) & 3, weapon: 'rifle', k: 'w' + (Math.floor(t * 7 + g * 2) & 3) }) });
    return { z: 1.05, fx: 170, fy: 108 };
  }
};
/* ---- SB: the dogs go dizzy and die ---- */
const SB = {
  name: '犬', bgm: 'memory',
  init(S) { const L = ln(S, 'L2'); S.tDizzy = at(S, 'L2', 2) - 0.3; S.tDead = at(S, 'L2', 4) - 0.2; S.tTalk = ln(S, 'A2') ? at(S, 'A2', 0) - 0.4 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    autumnForest(c, t, 300, { dusk: t > S.tDead });
    for (let k = 0; k < 2; k++) {
      const x = 214 + k * 40, pose = t < S.tDizzy ? 'walk' : t < S.tDead ? 'dizzy' : 'dead';
      const wob = pose === 'dizzy' ? Math.sin(t * 9 + k) * 3 : 0;
      blit(c, dogSpr(pose === 'walk' ? 0 : t, pose, k), x + wob, 148, 13, 17, { s: 1.4 });
      if (pose === 'dizzy') for (let i = 0; i < 6; i++) { const a = t * 6 + i; P(c, x + 6 + Math.cos(a) * 8, 118 + Math.sin(a) * 3, i & 1 ? '#f8f8f8' : '#f8d860'); }
      if (pose === 'dead') for (let i = 0; i < 4; i++) { const u = fr(t * 0.6 + i / 4 + k * 0.3); E(c, x + 18 + i * 2, 140 - u * 6, 1.5 + u * 2, 1.5 + u * 2, DA('#ffffff', 0.9 * (1 - u))); }
    }
    drawGents(c, 160, 148, 1.6, { per: g => ({ weapon: 'rifle', shock: t > S.tDead && t < S.tTalk, flip: false, k: 's' }) });
    return { z: 1.05 + 0.12 * ss(sg(t, S.tDizzy, S.tDead + 1)), fx: 210, fy: 112 };
  }
};
/* ---- SC: lost; the wind ---- */
const SC = {
  name: '迷う', bgm: 'eerie',
  init(S) { S.tWind = at(S, 'L3', 2) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const wind = t > S.tWind; autumnForest(c, t, 520, { dusk: true, wind });
    if (wind) for (let i = 0; i < 18; i++) { const u = fr(t * 0.7 + i / 18), x = u * 360 - 20, y = 30 + (i * 23 % 110) + Math.sin(t * 5 + i) * 6; R(c, x, y, 3, 2, ['#c85c1c', '#e08c2c', '#a83c14'][i % 3]); }
    drawGents(c, 160, 148, 1.6, { per: g => ({ weapon: 'rifle', f: -1, dy: Math.round(Math.sin(t * 2 + g) * 1), k: 'h' }) });
    susuki(c, t, 160, wind, 20, 5);
    return { z: 1.06, fx: 160, fy: 108, sx: wind ? Math.round(Math.sin(t * 40) * 0.6) : 0 };
  }
};
/* ---- SD: the Western-style house — RESTAURANT / WILDCAT HOUSE ---- */
const SD = {
  name: '山猫軒', ch: '山猫軒', bgm: 'carnival',
  init(S) { S.tHouse = at(S, 'L4', 1) - 0.3; S.tSign = at(S, 'L4', 2) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    autumnForest(c, t, 520, { dusk: true });
    const k = ss(sg(t, S.tHouse, S.tHouse + 1.6));
    if (k > 0) {
      const hx = 150, hy = 148, a = k;
      c.save(); c.globalAlpha = a;
      R(c, hx, hy - 86, 140, 86, '#f0ece4'); for (let y = hy - 84; y < hy; y += 6) for (let x = hx + ((y / 6) & 1) * 6; x < hx + 140; x += 12) R(c, x, y, 11, 5, '#e4ddd0');
      PF(c, [hx - 8, hy - 84, hx + 70, hy - 112, hx + 148, hy - 84], '#5c3c4c'); R(c, hx + 60, hy - 110, 6, 14, '#5c3c4c');
      for (const wx of [hx + 12, hx + 104]) { R(c, wx, hy - 66, 24, 30, '#3c2c20'); R(c, wx + 2, hy - 64, 20, 26, K.win1); R(c, wx + 11, hy - 64, 2, 26, '#3c2c20'); }
      R(c, hx + 52, hy - 50, 36, 50, '#5c3c24'); R(c, hx + 56, hy - 46, 28, 40, '#a8c8d8');
      c.restore();
      if (t > S.tSign) { // the signboard
        const b = eOut(sg(t, S.tSign, S.tSign + 0.4)), bx = hx + 70, by = hy - 80 + (1 - b) * -20;
        R(c, bx - 50, by - 2, 100, 58, '#1c140c'); R(c, bx - 49, by - 1, 98, 56, '#f4ecd8');
        const ln4 = [['RESTAURANT', 8], ['西洋料理店', 16]]; TX(c, 'RESTAURANT', bx - textSpr('RESTAURANT', 16, '#3c2c20').width / 2, by + 1, '#3c2c20', 16, null);
        TX(c, '西洋料理店', bx - textSpr('西洋料理店', 16, '#a8301c').width / 2, by + 19, '#a8301c', 16, null);
        TX(c, '山猫軒', bx - textSpr('山猫軒', 16, '#1c1c1c').width / 2, by + 37, '#1c1c1c', 16, null);
      }
    }
    drawGents(c, 110, 148, 1.6, { per: g => ({ weapon: 'rifle', flip: t < S.tHouse + 0.4, arm: t > S.tSign + 1 && g === 0 ? 'up' : null, k: t < S.tHouse + 0.4 ? 'l' : 'r' }) });
    susuki(c, t, 162, false, 14, 9);
    return { z: lerp(1.1, 1.0, k), fx: lerp(110, 170, k), fy: 100 };
  }
};
/* ---- door scenes: the corridor, a door with a message, the two gentlemen on the left ---- */
function doorScene(def) {
  return Object.assign({
    init(S) { S.signs = def.signs(S); S.dur = lastSe(S) + (def.tail || 1.2); if (def.init2) def.init2(S); },
    draw(c, t, S) {
      const sg0 = signAt(S, t), o = (sg0 && sg0[3]) || {};
      hallway(c, Object.assign({}, def.room || {}, o.room || {}));
      if (def.props) def.props(c, t, S, o);
      if (sg0) doorSign(c, sg0[1], sg0[2] || '#f8d860', ss(sg(t, sg0[0], sg0[0] + 0.3)));
      const gs = def.gents ? def.gents(t, S, o) : {};
      drawGents(c, 110, 160, 1.7, gs);
      if (def.front) def.front(c, t, S, o);
      return Object.assign({ z: 1.0, fx: 160, fy: 110 }, def.cam ? def.cam(t, S) : {});
    }
  }, def.base);
}
const SE = doorScene({
  base: { name: '金文字の扉', ch: '扉の文字', bgm: 'carnival' },
  signs: S => [[at(S, 'L5', 1) - 0.2, ['どなたもどうか', 'お入りください', '決してご遠慮は', 'ありません'], '#f8d860', { room: { glass: true, door: '#c8c0a8' } }],
    [at(S, 'L6', 1) - 0.2, ['ことに太ったお方や', '若いお方は', '大歓迎いたします'], '#f8d860', { room: { glass: true, door: '#c8c0a8' } }],
    [at(S, 'L6', 3) - 0.2, ['当軒は注文の多い', '料理店ですから', 'どうかそこは', 'ご承知ください'], '#f8e070', { room: { door: '#5c9cc8', door2: '#7cb4d8' } }]],
  gents: (t, S) => ({ per: g => ({ weapon: 'rifle', arm: ln(S, 'B4') && t > at(S, 'B4', 0) && t < at(S, 'B4', 0) + 3 && g === 1 ? 'up' : null, k: 'e' + g }) }),
});
const SF = doorScene({
  base: { name: '次から次へ', bgm: 'carnival' },
  signs: S => [[0, ['', ''], '#f8d860', { room: { door: '#5c9cc8', door2: '#7cb4d8' } }],
    [at(S, 'L7', 1) - 0.2, ['髪をきちんとして', 'はきものの泥を', '落してください'], '#f04040', { room: { door: '#7c4c34' }, step: 1 }],
    [at(S, 'L7', 3) - 0.2, ['鉄砲と弾丸を', 'ここへ', '置いてください'], '#f8d860', { room: { door: '#2c2c34', door2: '#3c3c44' }, step: 2 }],
    [at(S, 'L7', 5) - 0.2, ['帽子と外套と靴を', 'おとりください'], '#f8d860', { room: { door: '#2c2c34', door2: '#3c3c44' }, step: 3 }]],
  props(c, t, S, o) {
    if (o.step === 1) { R(c, 40, 40, 34, 44, '#8c6c3c'); R(c, 43, 43, 28, 38, '#c8dce8'); L(c, 46, 46, 56, 70, '#ffffff'); R(c, 90, 120, 30, 3, '#5c3c24'); R(c, 116, 116, 10, 7, '#3c2c20'); }
    if (o.step >= 2) { R(c, 20, 112, 60, 6, '#1c1c1c'); R(c, 24, 118, 4, 30, '#1c1c1c'); R(c, 72, 118, 4, 30, '#1c1c1c'); for (let k = 0; k < 2; k++) L(c, 28 + k * 24, 110, 50 + k * 24, 104, '#5c3c24', 2); }
    if (o.step >= 3) { R(c, 92, 50, 60, 3, '#5c3c24'); for (let k = 0; k < 4; k++) R(c, 98 + k * 14, 53, 2, 4, '#8c8c94'); for (let k = 0; k < 2; k++) { R(c, 100 + k * 26, 58, 12, 6, GENT[k].hatCol); R(c, 98 + k * 26, 66, 16, 30, GENT[k].coat); } }
  },
  gents: (t, S, o) => ({ per: g => ({ weapon: o.step >= 2 ? null : 'rifle', noHat: o.step >= 3, noCoat: o.step >= 3, k: 'f' + (o.step || 0) + g }) }),
});
const SG = doorScene({
  base: { name: '金庫', bgm: 'carnival' },
  signs: S => [[0, ['金物類 ことに', '尖ったものは', 'みんなここに', '置いてください'], '#f8d860', { room: { door: '#2c2c34', door2: '#3c3c44' } }]],
  init2(S) { S.tLock = at(S, 'L8', 7, lastSe(S) - 1.5) - 0.1; },
  props(c, t, S) {
    const shut = t > S.tLock; R(c, 30, 76, 56, 72, '#1c1c24'); R(c, 34, 80, 48, 64, shut ? '#2c2c38' : '#0c0c10'); E(c, 76, 112, 3, 3, '#c8a840');
    if (!shut) { for (let i = 0; i < 6; i++) { const u = fr(t * 0.5 + i / 6); const x = lerp(120, 58, u), y = lerp(110, 112, u) - Math.sin(u * Math.PI) * 30; R(c, x, y, 4, 3, ['#f8d860', '#c8c8d0', '#8c5c3c'][i % 3]); } }
    else { R(c, 34, 80, 48, 64, '#3c3c48'); E(c, 58, 112, 6, 6, '#c8a840'); E(c, 58, 112, 3, 3, '#5c4c20'); if (t < S.tLock + 0.3) for (let i = 0; i < 6; i++) L(c, 58, 112, 58 + Math.cos(i) * 14, 112 + Math.sin(i) * 14, '#ffffff'); }
  },
  gents: () => ({ per: g => ({ noHat: true, noCoat: true, k: 'g' + g }) }),
});
const SH = doorScene({
  base: { name: 'クリーム', bgm: 'carnival' },
  signs: S => [[at(S, 'L9', 1) - 0.3, ['壺のなかの', 'クリームを', '顔や手足に', '塗ってください'], '#f8d860', { room: { door: '#3c3c44' } }]],
  init2(S) { S.tCream = at(S, 'L9', 3) - 0.2; S.tEat = at(S, 'L9', 4) - 0.2; },
  props(c, t, S) { E(c, 150, 142, 12, 10, '#d8e0e8'); E(c, 150, 134, 10, 3, '#fcfaf2'); R(c, 140, 132, 20, 3, '#b8c4d0'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: t > S.tCream, arm: t > S.tEat && t < S.tEat + 2.5 && (Math.floor(t * 3) + g) % 2 ? 'up' : null, k: 'h' + g + (t > S.tCream ? 'c' : '') }) }),
});
const SI = doorScene({
  base: { name: '香水', bgm: 'carnival' },
  signs: S => [[at(S, 'L10', 0) - 0.2, ['料理はもうすぐ', 'できます', '頭に香水を', 'ふりかけてください'], '#f8d860', { room: { door: '#3c3c44' } }]],
  init2(S) { S.tSpray = at(S, 'L10', 2) - 0.2; S.tSour = at(S, 'L10', 4) - 0.2; },
  props(c, t, S) { R(c, 146, 124, 10, 20, '#f8d860'); R(c, 148, 118, 6, 6, '#c8a840'); R(c, 147, 126, 2, 14, '#fff8c0'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: true, arm: t > S.tSpray && t < S.tSpray + 2 ? 'up' : null, k: 'i' + g }) }),
  front(c, t, S) {
    if (t > S.tSpray && t < S.tSpray + 2) for (let i = 0; i < 10; i++) { const u = fr(t * 2 + i / 10); P(c, 100 + i * 3, 90 - u * 12, '#c8e0f8'); }
    if (t > S.tSour) for (let i = 0; i < 6; i++) { const x = 70 + i * 12, u = fr(t * 0.7 + i / 6); PL(c, [x, 92 - u * 30, x + 3, 86 - u * 30, x - 2, 80 - u * 30, x + 2, 74 - u * 30], DA('#a8c84c', 0.8 * (1 - u))); }
  },
});
/* ---- SJ: the last door — salt ---- */
const SJ = doorScene({
  base: { name: '塩', ch: '最後の注文', bgm: 'dread' },
  signs: S => [[at(S, 'L11', 1) - 0.2, ['からだ中に', '壺の中の塩を', 'たくさんよく', 'もみ込んでください'], '#f8d860', { room: { door: '#1c1c24', door2: '#2c2c34' } }]],
  init2(S) { S.tStop = ln(S, 'A7') ? at(S, 'A7', 0) - 0.3 : 1e9; S.tShake = ln(S, 'B7') ? at(S, 'B7', 2) - 0.2 : 1e9; },
  props(c, t, S) { E(c, 150, 140, 13, 11, '#2c5ca8'); E(c, 150, 131, 11, 3, '#f8f8f8'); R(c, 139, 129, 22, 3, '#1c3c7c'); },
  gents: (t, S) => ({ per: g => ({ noHat: true, noCoat: true, cream: true, shock: t > S.tStop, dx: t > S.tShake ? Math.round(Math.sin(t * 50 + g) * 1.5) : 0, flip: t > S.tStop + 0.6 && g === 1, k: 'j' + g + (t > S.tStop ? 's' : '') }) }),
  front(c, t, S) { if (t > S.tShake) redVignette(c, 0.35 + 0.15 * Math.sin(t * 6)); },
  cam: (t, S) => ({ z: 1 + 0.1 * ss(sg(t, S.tStop, S.tStop + 3)), fx: 160, fy: 104 }),
});
/* ---- SK: the keyholes and the blue eyes; the henchmen's voices ---- */
const SK = {
  name: 'かぎ穴', ch: '山猫の子分', bgm: 'dread',
  init(S) { S.tSign = at(S, 'L12', 1) - 0.3; S.tEyes = at(S, 'L12', 2) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#0c0a0c'); R(c, 60, 10, 200, 160, '#1c1418'); R(c, 66, 16, 188, 148, '#2c2024');
    // silver fork and knife cut out of the door
    R(c, 92, 40, 4, 90, '#c8ccd4'); for (let k = 0; k < 4; k++) R(c, 86 + k * 4, 30, 2, 16, '#c8ccd4'); R(c, 86, 44, 14, 3, '#c8ccd4');
    R(c, 226, 30, 6, 100, '#c8ccd4'); PF(c, [226, 30, 234, 30, 236, 64, 226, 70], '#d8dce4');
    for (const kx of [140, 180]) { E(c, kx, 92, 9, 9, '#000000'); PF(c, [kx - 5, 96, kx + 5, 96, kx + 4, 116, kx - 4, 116], '#000000');
      if (t > S.tEyes) { const look = Math.sin(t * 1.6) * 3; E(c, kx + look, 92, 5, 5, '#3c8cf0'); R(c, kx + look - 1, 89, 2, 6, '#000000'); P(c, kx + look - 2, 90, '#ffffff'); } }
    if (t > S.tSign) { const lines = ['いや わざわざ', 'ご苦労です']; const w = 124, x = 98, y = 30; R(c, x, y, w, 42, '#0c0c0c'); R(c, x + 1, y + 1, w - 2, 40, '#1c1418'); lines.forEach((s, i) => TX(c, s, x + 6, y + 4 + i * 18, '#f8f8f8', 16, null)); }
    const voice = S.lines.find(l => l.spk !== 'narrator' && t > l.t0 - 0.2 && t < l.se + 0.2);
    if (voice) { const p = 0.5 + 0.5 * Math.sin(t * 8); E(c, 160, 104, 70, 20, DA('#3c8cf0', 0.08 * p)); }
    return { z: lerp(1.0, 1.25, ss(sg(t, S.tEyes, S.tEyes + 4))), fx: 160, fy: 90 };
  }
};
/* ---- SL: their faces crumple like waste paper; they cry ---- */
const SL = {
  name: '泣く', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#140c10'); redVignette(c, 0.4);
    for (let g = 0; g < 2; g++) {
      const k = ss(sg(t, 0.4 + g * 0.3, 3)), shake = Math.round(Math.sin(t * 40 + g * 3) * 1.5);
      const f = gentFace(g, { cream: true, crumple: k > 0.5, scared: true });
      blit(c, f, 100 + g * 120 + shake, 92, 24, 24, { s: 2 });
      if (k > 0.5) for (let i = 0; i < 4; i++) { const u = fr(t * 1.2 + i / 4 + g * 0.5); R(c, 82 + g * 120 + (i & 1) * 34, 92 + u * 50, 2, 4, DA('#88c8f8', 1 - u)); }
    }
    return { z: 1.05, fx: 160, fy: 96 };
  }
};
/* ---- SM: the white dogs burst in; "nyaao, kwaa, goro-goro"; the room vanishes ---- */
const SM = {
  name: '白熊のような犬', ch: '白熊のような犬', bgm: 'climb',
  init(S) { S.tBurst = at(S, 'L14', 3) - 0.2; S.tJump = at(S, 'L14', 5, lastSe(S)) + 0.6; S.tDark = ln(S, 'L15') ? at(S, 'L15', 0) - 0.3 : 1e9; S.tVanish = ln(S, 'L15') ? at(S, 'L15', 4) - 0.2 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tDark) {
      hallway(c, { door: '#1c1c24', door2: '#2c2c34' });
      if (t > S.tBurst) { const u = t - S.tBurst; for (let i = 0; i < 10; i++) R(c, 20 + i * 4 + u * 40 * Math.cos(i), 90 + u * 60 * Math.sin(i * 2), 5, 3, '#5c3c24');
        for (let k = 0; k < 2; k++) { const run = t < S.tJump, x = run ? 40 + (Math.sin(u * 3 + k * 3) + 1) * 80 + k * 20 : lerp(160, 210, sg(t, S.tJump, S.tJump + 0.6)); blit(c, dogSpr(t, 'run', k), x, 150 - (run ? Math.abs(Math.sin(u * 8 + k)) * 8 : 30 * sg(t, S.tJump, S.tJump + 0.6)), 13, 17, { s: 2, flip: run && Math.cos(u * 3 + k * 3) < 0 }); } }
      drawGents(c, 70, 160, 1.7, { per: g => ({ noHat: true, noCoat: true, cream: true, shock: true, k: 'm' + g }) });
      return { z: 1, fx: 160, fy: 110, sx: t > S.tBurst && t < S.tBurst + 0.4 ? Math.round(Math.sin(t * 60) * 3) : 0 };
    }
    // darkness; the cry; the room fades away into grass
    const v = ss(sg(t, S.tVanish, S.tVanish + 2));
    R(c, 0, 0, W, H, '#050405');
    if (v < 1) { const words = ['にゃあお', 'くゎあ', 'ごろごろ']; words.forEach((s, i) => { const tt = S.tDark + 1.2 + i * 1.1; if (t > tt) { c.globalAlpha = 1 - v; TX(c, s, 60 + i * 80 + Math.sin(t * 30 + i) * 2, 60 + i * 20, '#f8f8f8', 24, null); c.globalAlpha = 1; } }); }
    if (v > 0) { c.save(); c.globalAlpha = v; autumnForest(c, t, 700, { dusk: true }); c.restore(); }
    return { z: 1, fx: 160, fy: 100 };
  }
};
/* ---- SN: standing in the grass; clothes on the branches; the hunter ---- */
const SN = {
  name: '草の中', ch: '帰り道', bgm: 'memory',
  init(S) { S.tHunter = ln(S, 'H1') ? at(S, 'H1', 0) - 0.5 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    autumnForest(c, t, 700, { dusk: true, wind: t < 6 });
    // clothes on the branches and among the roots
    R(c, 52, 46, 14, 20, GENT[0].coat); R(c, 238, 52, 14, 20, GENT[1].coat); R(c, 120, 140, 10, 4, '#2c2c2c'); R(c, 270, 142, 8, 5, '#5c3c24'); P(c, 200, 146, '#f8d860');
    blit(c, dogSpr(t, 'walk', 0), 220, 150, 13, 17, { s: 1.4 }); blit(c, dogSpr(t, 'walk', 1), 250, 152, 13, 17, { s: 1.4 });
    drawGents(c, 160, 150, 1.6, { per: g => ({ noHat: true, noCoat: true, dx: t < S.tHunter ? Math.round(Math.sin(t * 30 + g)) : 0, arm: t > S.tHunter + 1 && g === 0 ? 'up' : null, k: 'n' + g }) });
    if (t > S.tHunter) { const x = lerp(-20, 90, ss(sg(t, S.tHunter, S.tHunter + 3))); blit(c, personSpr({ id: 'hunter', coat: '#8c7c4c', coat2: '#6c5c34', pants: '#4c4030', skin: '#c89060', hair: '#2c1c14', hat: 'fedora', hatCol: '#c8a860' }, { f: Math.floor(t * 7) & 3, weapon: 'rifle', id: 'hu' }), x, 150, PER_AX, PER_AY, { s: 1.6 }); }
    susuki(c, t, 166, t < 6, 16, 2);
    return { z: 1.04, fx: 150, fy: 106 };
  }
};
/* ---- SO: back in Tokyo; in the bath, the crumpled faces never went back ---- */
const SO = {
  name: '結び', ch: '結び', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#3c4c5c', '#5c6c7c', '#8c9cac']);
    for (let x = 0; x < W; x += 16) R(c, x, 0, 1, 120, '#4c5c6c'); R(c, 0, 118, W, 4, '#2c3c4c');
    R(c, 50, 104, 220, 56, '#7c5c3c'); R(c, 56, 100, 208, 10, '#a8845c'); R(c, 60, 104, 200, 18, '#5c9cc8');
    for (let i = 0; i < 12; i++) { const u = fr(t * 0.3 + i / 12); E(c, 70 + i * 16 + Math.sin(t + i) * 4, 100 - u * 60, 6 + u * 10, 4 + u * 6, DA('#f8f8f8', 0.35 * (1 - u))); }
    for (let g = 0; g < 2; g++) blit(c, gentFace(g, { crumple: true }), 120 + g * 80, 98, 24, 36, { s: 1.3 });
    R(c, 60, 116, 200, 6, '#5c9cc8');
    return { z: lerp(1.25, 1, ss(sg(t, 0, S.tEnd))), fx: 160, fy: 100 };
  }
};
/* ---- shorts: SS2 is the door with the eyes (reuses SK without the opening sign) ---- */
