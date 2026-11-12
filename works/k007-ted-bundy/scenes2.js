/* ================= 記録 #007 テッド・バンディ: scenes ================= */
const LOT_Y = 168; // the parking-lot ground line for figures

/* ---- UX: cold open — the "policeman" at the mall ---- */
const UX = withCuts({
  name: 'ショッピングモール', ch: '偽の警察官', bgm: 'pulse',
  init(S) { S.cold = !!ln(S, 'C1'); S.tDark = S.cold ? at(S, 'C1', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    mallFront(c, t, {});
    blit(c, vwSpr('#e8dcc8'), 70, LOT_Y - 4, 40, 35); blit(c, vwSpr('#7c2c2c'), 262, LOT_Y - 2, 40, 35, { flip: true });
    const walk = sg(t, 0.2, 3.2), tx = lerp(250, 196, ss(walk));
    person(c, WOMAN, 150, LOT_Y, { expr: t > 2.5 ? 'normal' : 'normal', blink: blinkOf(t, 3), k: 'ux' });
    person(c, TED, tx, LOT_Y, { f: walk < 1 ? Math.floor(t * 8) & 3 : -1, flip: true, arm: walk >= 1 ? 'point' : null, expr: 'smile', k: 'ux' });
    if (t > S.tDark) { dim(c, 0.45 * sg(t, S.tDark, S.tDark + 1.5), '#14060a'); cuffs(c, tx + 10, LOT_Y - 26, t, sg(t, S.tDark + 0.8, S.tDark + 1.4)); }
    capPlate(c, t, 0.5, ['1974年11月4日', 'ユタ州のショッピングモール']);
    return { z: 1.06 + 0.1 * ss(sg(t, S.tDark, S.dur)), fx: lerp(170, 180, sg(t, S.tDark, S.dur)), fy: 120 };
  }
}, [['F1', (c, t, S) => closeUp(c, t, tedFace({ smile: true, blink: blinkOf(t, 5) }), { bg: ['#1c1018', '#5c3c4c'], glow: '#f8a060' })]]);

/* ---- UA: 1946, Burlington, Vermont; raised as his mother's little brother ---- */
function photoFrame(c, x, y, w, h) { R(c, x - 4, y - 4, w + 8, h + 8, '#5c3c20'); R(c, x - 2, y - 2, w + 4, h + 4, '#8c6c3c'); R(c, x, y, w, h, '#d8ccb0'); }
const UA = {
  name: 'バーモント州', ch: '生い立ち', bgm: 'memory',
  init(S) { S.tPhoto = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tPhoto) {
      nightSky(c, t, 130); moon(c, 250, skyY(34), 12, t); snowGround(c, 140); for (let i = 0; i < 4; i++) bareTree(c, 20 + i * 90, 140, 60 + (i % 2) * 14, i + 2);
      house(c, 110, 150, 100, 46, { wall: '#7c6c5c', wall2: '#6c5c4c', roof: '#3c2c24', windows: [[16, 14, true], [70, 14, true]], t }); smoke(c, 186, 92, t, 2);
      snowfall(c, t, 50, 3, 6, 14); yearFlash(c, t, 0.4, 1946, 216, 10, '11月24日'); capPlate(c, t, 0.7, ['アメリカ', 'バーモント州']);
      return { z: 1.03 + 0.03 * ss(t / S.tPhoto), fx: 160, fy: 112 };
    }
    // the family photo: grandparents, the "sister" (his mother) and the boy
    R(c, 0, 0, W, H, '#3c2c20'); for (let y = 0; y < H; y += 10) R(c, 0, y, W, 1, '#342418');
    photoFrame(c, 70, 24, 180, 124); VG(c, 70, 24, 180, 124, ['#d8ccb0', '#c8b894', '#b8a47c']);
    const gp = { id: 'gpa', top: 'jacket', coat: '#4c4034', shirt: '#e8e0d0', tie: '#3c2c2c', pants: '#3c3428', skin: '#e0b898', hair: '#a8a8a8', hairStyle: 'side', glasses: true };
    const gm = { id: 'gma', top: 'dress', coat: '#5c4c5c', skin: '#e8c4a4', hair: '#c8c8c8' };
    const mo = { id: 'mom', top: 'dress', coat: '#7c5c4c', skin: '#f0c8a8', hair: '#4c3020', hairStyle: 'long' };
    [[gp, 104], [gm, 134], [mo, 196]].forEach(([st, x]) => blit(c, modFig(st, { f: -1, expr: 'normal', k: 'ph' }), x, 140, FIG_AX2, FIG_AY2, { s: 1.3 }));
    blit(c, modFig(TED_KID, { f: -1, expr: 'smile', k: 'ph' }), 166, 140, FIG_AX2, FIG_AY2, { s: 1.3 });
    c.save(); c.globalAlpha = 0.45; c.fillStyle = '#a8844c'; c.fillRect(70, 24, 180, 124); c.restore();
    const k = sg(t, S.tPhoto + 1.4, S.tPhoto + 2.0); if (k > 0) { R(c, 186, 52, 40, 20, '#f4f0e4'); R(c, 186, 52, 40, 2, '#c81818'); TX(c, '姉？', 192, 54, '#c81818', 16, null); L(c, 200, 72, 204, 84, '#f4f0e4'); }
    return { z: 1.04 + 0.04 * ss(sg(t, S.tPhoto, S.dur)), fx: 180, fy: 90 };
  }
};

/* ---- UB: church, Boy Scouts, a shy boy — and shoplifting ---- */
const UB = {
  name: 'タコマ', ch: '内気な少年', bgm: 'memory',
  init(S) { S.tSteal = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tSteal) {
      VG(c, 0, 0, W, 120, ['#5c8cc8', '#8cb4e0', '#c8dcec']); for (let i = 0; i < 3; i++) E(c, mod(i * 120 + t * 4, W + 80) - 40, 24 + i * 8, 30, 7, DA('#ffffff', 0.7));
      R(c, 0, 120, W, 120, '#5c8c4c'); R(c, 0, 150, W, 90, '#7c7064');
      // white wooden church with a steeple
      R(c, 196, 66, 90, 66, '#ece8e0'); for (let y = 70; y < 132; y += 4) R(c, 196, y, 90, 1, '#d8d4cc'); PF(c, [190, 68, 241, 34, 292, 68], '#5c4c4c'); R(c, 230, 4, 22, 40, '#ece8e0'); PF(c, [228, 6, 241, -18, 254, 6], '#5c4c4c'); R(c, 240, -12, 2, 8, '#d8b040'); R(c, 236, -9, 10, 2, '#d8b040');
      R(c, 230, 98, 22, 34, '#7c4c2c'); for (const x of [204, 264]) { R(c, x, 82, 14, 20, '#5c8cc8'); PF(c, [x, 82, x + 7, 76, x + 14, 82], '#5c8cc8'); }
      // scouts in a row; the shy one is a little apart, looking down
      for (let i = 0; i < 4; i++) { const st = { id: 'sc' + i, kid: true, top: 'shirt', coat: '#8c7c4c', pants: '#5c5034', skin: ['#f0c8a8', '#e8c0a0', '#f4d0b0', '#e0b898'][i], hair: ['#c8a060', '#3c2818', '#6c4c2c', '#1c1814'][i], hairStyle: 'short' }; person(c, st, 40 + i * 24, 162, { expr: 'smile', k: 'sc' }); R(c, 37 + i * 24, 138, 6, 3, '#c83c2c'); }
      person(c, TED_KID, 150, 164, { expr: 'sad', k: 'shy' }); R(c, 147, 140, 6, 3, '#c83c2c');
      capPlate(c, t, 0.5, ['ワシントン州', 'タコマ']);
      return { z: 1.03, fx: 140, fy: 118 };
    }
    // a store shelf; a hand slips something into a pocket
    R(c, 0, 0, W, H, '#c8c0a8'); for (let s = 0; s < 4; s++) { const y = 30 + s * 44; R(c, 20, y + 34, 280, 5, '#8c7c5c'); for (let i = 0; i < 14; i++) { const x = 26 + i * 20, col = ['#c83c2c', '#3c6cc8', '#e8c84c', '#4c9c5c', '#e8e0d0'][(i + s * 2) % 5]; R(c, x, y + 14, 14, 20, col); R(c, x + 2, y + 18, 10, 4, '#f4f0e8'); } }
    const k = sg(t, S.tSteal + 0.6, S.tSteal + 2.0), hx = lerp(196, 230, ss(k)), hy = lerp(118, 176, ss(k));
    if (k < 0.5) R(c, 186, 88 + 14, 14, 20, '#3c6cc8');
    L(c, 320, 200, hx + 6, hy + 4, '#5c4c3c', 10); E(c, hx, hy, 7, 6, '#ecc4a4'); if (k > 0 && k < 1) R(c, hx - 6, hy - 10, 12, 14, '#3c6cc8');
    R(c, 220, 170, 70, 70, '#3c3428'); R(c, 230, 176, 40, 4, '#2c241c'); // a jacket pocket
    dim(c, 0.25 * sg(t, S.tSteal, S.tSteal + 1));
    return { z: 1.05 + 0.04 * ss(sg(t, S.tSteal, S.dur)), fx: 210, fy: 120 };
  }
};

/* ---- UC: college — the makeover; "governor or senator"; crisis line; the rescue ---- */
const UC = withCuts({
  name: '大学', ch: '模範青年', bgm: 'memory',
  init(S) { S.tChange = at(S, 'L5', 3) - 0.3; S.tPhone = at(S, 'L6', 0) - 0.3; S.tMedal = at(S, 'L6', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMedal) { // the commendation
      VG(c, 0, 0, W, H, ['#1c2c4c', '#3c5c8c', '#1c2c4c']); glow(c, 160, 100, 120, 80, '#f8e0a0', 0.25);
      R(c, 100, 34, 120, 100, '#f4f0e4'); R(c, 104, 38, 112, 92, '#e8e0cc'); R(c, 104, 38, 112, 16, '#2c3c6c'); TX(c, '表彰状', 136, 37, '#f4f0e8', 16, null);
      for (let i = 0; i < 4; i++) R(c, 116, 64 + i * 10, 88, 2, '#8c8474'); E(c, 186, 114, 10, 10, '#d8b040'); E(c, 186, 114, 7, 7, '#f0d060'); star4(c, 186, 114, 3, '#ffffff', '#f8e8a0');
      return { z: 1.03, fx: 160, fy: 90 };
    }
    if (t > S.tPhone) { // a desk lamp, the crisis line phone at night
      R(c, 0, 0, W, H, '#14141c'); glow(c, 140, 96, 110, 70, '#f8d880', 0.35);
      R(c, 40, 120, 240, 10, '#5c3c24'); R(c, 40, 130, 240, 110, '#3c2818'); R(c, 200, 64, 4, 56, '#2c2c2c'); PF(c, [186, 56, 200, 44, 220, 56, 214, 64, 192, 64], '#3c5c3c'); E(c, 204, 66, 14, 4, DA('#fff4c8', 0.6));
      R(c, 110, 104, 40, 16, '#1c1c1c'); E(c, 130, 110, 8, 4, '#2c2c2c'); R(c, 106, 98, 48, 6, '#1c1c1c'); // telephone
      blit(c, modFig(TED, { f: -1, arm: 'hold', expr: 'normal', blink: blinkOf(t, 7), k: 'ph' }), 90, 150, FIG_AX2, FIG_AY2, { s: 1.4 });
      R(c, 60, 96, 30, 22, '#e8e0cc'); for (let i = 0; i < 4; i++) R(c, 64, 100 + i * 4, 22, 1, '#8c8474');
      capPlate(c, t - S.tPhone, 0.3, ['シアトル', '自殺防止の電話相談']);
      return { z: 1.04, fx: 120, fy: 100 };
    }
    // the brick campus; the shy student turns into a confident young man
    VG(c, 0, 0, W, 90, ['#6c9cd8', '#a8c8e8', '#e8ecf0']); R(c, 0, 96, W, 144, '#6c9c5c'); R(c, 0, 150, W, 90, '#a89c84');
    R(c, 40, 30, 240, 80, '#9c4c34'); for (let y = 34; y < 110; y += 6) for (let x = 40 + ((y / 6) & 1) * 6; x < 280; x += 12) R(c, x, y, 11, 5, '#a8543c'); PF(c, [30, 32, 160, 6, 290, 32], '#5c3c34');
    for (let i = 0; i < 7; i++) { R(c, 54 + i * 32, 46, 16, 22, '#f0e8d8'); R(c, 56 + i * 32, 48, 12, 18, '#5c7c9c'); } R(c, 146, 76, 28, 34, '#5c3c24');
    for (let i = 0; i < 5; i++) person(c, FOLKS[i], 30 + i * 62 + (i > 2 ? 30 : 0), 160, { f: Math.floor(t * 6 + i) & 3, flip: i % 2, k: 'cp' });
    const on = t > S.tChange, k = sg(t, S.tChange, S.tChange + 0.6);
    person(c, on ? TED_SUIT : { ...TED_KID, kid: false, id: 'tedshy', top: 'sweater', coat: '#7c7c6c' }, 170, 164, { expr: on ? 'smile' : 'sad', s: 1.25, k: 'uc' });
    if (k > 0 && k < 1) for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * 3; star4(c, 170 + Math.cos(a) * 26 * k, 130 + Math.sin(a) * 30 * k, 2, '#ffffff', '#f8e8a0'); }
    capPlate(c, t, 0.5, ['ピュージェットサウンド大学', '心理学']);
    return { z: 1.03 + 0.05 * ss(sg(t, S.tChange, S.tPhone)), fx: 165, fy: 112 };
  }
}, [['P1', (c, t, S) => closeUp(c, t, memberFace({ blink: blinkOf(t, 9) }), { bg: ['#1c2440', '#3c4c7c'], glow: '#c8d8f8', lines: '#f8e8a0' })]]);

/* ---- UD: San Francisco — dumped; two years later, engaged — and he walks away ---- */
const UD = {
  name: 'サンフランシスコ', ch: '失恋', bgm: 'eerie',
  init(S) { S.tRing = at(S, 'L8', 0) - 0.3; S.tPhone = at(S, 'L8', 3) - 0.3; S.tStart = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (t > S.tStart) { // the face in the dark: the start
      R(c, 0, 0, W, H, '#060408'); glow(c, 160, 120, 110, 90, '#c81818', 0.4 * sg(t, S.tStart, S.tStart + 2)); glow(c, 160, 90, 40, 30, '#f8a080', 0.12);
      blit(c, tintSpr(modFig(TED_DARK, { f: -1, k: 'ud' }), '#0c0a10', 'tdsil'), 160, 190, FIG_AX2, FIG_AY2, { s: 2.4 });
      E(c, 154, 88, 1.5, 1, DA('#f8f4ec', 0.8)); E(c, 166, 88, 1.5, 1, DA('#f8f4ec', 0.8));
      redVignette(c, 0.5 * sg(t, S.tStart, S.tStart + 2));
      return { z: 1 + 0.1 * ss(sg(t, S.tStart, S.dur)), fx: 160, fy: 100 };
    }
    if (t > S.tPhone) { // a phone ringing in an empty room; no one picks up
      R(c, 0, 0, W, H, '#2c2430'); R(c, 0, 150, W, 90, '#1c1820'); R(c, 120, 110, 90, 8, '#5c3c24'); R(c, 126, 118, 6, 32, '#4c2c1c'); R(c, 198, 118, 6, 32, '#4c2c1c');
      const ring = Math.floor((t - S.tPhone) * 3) % 3 !== 2, sh = ring ? Math.round(Math.sin(t * 60)) : 0;
      R(c, 150 + sh, 96, 30, 14, '#c83c3c'); R(c, 146 + sh, 92, 38, 6, '#a82c2c'); E(c, 165 + sh, 103, 6, 3, '#2c2c2c');
      if (ring) for (let i = 0; i < 3; i++) { ER(c, 165, 100, 24 + i * 10, 14 + i * 6, DA('#f8e8a0', 0.5 - i * 0.14), -2.4, -0.7); }
      TX(c, '2週間後', 16, 34, '#f4f0e8', 16, '#000000');
      return { z: 1.04, fx: 165, fy: 100 };
    }
    // a steep San Francisco street at dusk, a couple
    VG(c, 0, 0, W, 120, ['#2c2448', '#8c4c5c', '#f8a060']); glow(c, 260, 110, 80, 20, '#f8c080', 0.5);
    for (let i = 0; i < 8; i++) { const x = i * 42, y = 70 + i * 9; R(c, x, y, 38, 140, ['#c8a8a0', '#e8d8b8', '#a8b8c8', '#d8c0a0'][i % 4]); PF(c, [x - 2, y, x + 19, y - 10, x + 40, y], '#5c4c5c'); R(c, x + 6, y + 14, 10, 14, '#f8e0a0'); R(c, x + 22, y + 14, 10, 14, '#3c3c4c'); }
    PF(c, [0, 150, W, 214, W, H, 0, H], '#4c4448');
    const ring = t > S.tRing, apart = sg(t, 0.4, 3.4) * (ring ? 0 : 1);
    const her = { id: 'gf', top: 'dress', coat: '#c8a85c', skin: '#f4d0b0', hair: '#1c1410', hairStyle: 'long' };
    if (!ring) { person(c, her, 140 + apart * 60, 170, { f: apart > 0 && apart < 1 ? Math.floor(t * 8) & 3 : -1, k: 'sf' }); person(c, TED_SUIT, 120, 166, { expr: 'sad', flip: false, k: 'sf' }); }
    else { person(c, her, 150, 170, { expr: 'smile', flip: true, k: 'sf2' }); person(c, TED_SUIT, 126, 166, { expr: 'smile', k: 'sf2' }); const k = sg(t, S.tRing + 0.6, S.tRing + 1.2); if (k > 0) { ER(c, 138, 118, 6, 6, '#f0d060'); star4(c, 140, 112, 3 * k, '#ffffff', '#f8e8a0'); } }
    if (!ring) capPlate(c, t, 0.5, ['サンフランシスコ']);
    return { z: 1.04, fx: 140, fy: 118 };
  }
};

/* ---- UH: the horror close-up (no narration) ---- */
const UH = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, tedFace({ smile: true, blink: 0, dark: true }), [[19, 19], [29, 19]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- UE: January 1974, Seattle — the basement bedroom; the second girl; found a year later ---- */
const UE = {
  name: 'シアトル', ch: '1974年 シアトル', bgm: 'dread',
  init(S) { S.tScar = at(S, 'L11', 0) - 0.3; S.tNext = at(S, 'L12', 0) - 0.3; S.tFound = at(S, 'L12', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFound) { // a year later: a flashlight in the mountain woods
      mountainWoods(c, t, {}); const sx = 60 + Math.sin(t * 0.8) * 40;
      softBeam(c, 46, 118, 0.3 + Math.sin(t * 0.8) * 0.15, 160, 0.16, 0.35); person(c, COPS[0], 40, 160, { arm: 'fwd', k: 'fl' }); person(c, COPS[1], 14, 162, { k: 'fl2' });
      sheetBody(c, 190, 150, 44); glow(c, 190, 146, 40, 14, '#fff4c8', 0.25 * sg(t, S.tFound + 0.6, S.tFound + 1.6));
      yearFlash(c, t, S.tFound + 0.4, 1975, 216, 10, '1年後');
      return { z: 1.04, fx: 150 + sx * 0.1, fy: 120 };
    }
    if (t > S.tNext) { // an empty bed in a basement, the window open
      R(c, 0, 0, W, H, '#14141c'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, 160, '#1c1c24'); R(c, 0, 160, W, 80, '#1c1814');
      R(c, 210, 20, 50, 24, '#0c0c10'); R(c, 212, 22, 46, 20, '#2c3c5c'); PF(c, [212, 22, 236, 22, 232, 40, 212, 40], '#3c4c6c'); rain(c, t, 10, 0.3); glow(c, 236, 32, 40, 30, '#8ca8d8', 0.2);
      R(c, 60, 120, 120, 30, '#c8c4bc'); R(c, 56, 104, 8, 50, '#4c3c2c'); R(c, 176, 112, 8, 42, '#4c3c2c'); E(c, 76, 118, 14, 6, '#e8e4dc'); PF(c, [90, 120, 176, 116, 180, 130, 92, 132], '#8c7c9c');
      return { z: 1.04 + 0.04 * ss(sg(t, S.tNext, S.tFound)), fx: 140, fy: 110 };
    }
    if (t > S.tScar) { // the hospital: a monitor line
      R(c, 0, 0, W, H, '#0c1418'); R(c, 80, 40, 160, 100, '#1c2c2c'); R(c, 86, 46, 148, 88, '#04100c');
      const n = 60, pts = []; for (let i = 0; i <= n; i++) { const x = 86 + i / n * 148, ph = fr((t * 0.8) - i / n); pts.push(x, 100 - (ph > 0.95 ? (ph - 0.95) * 600 : 0) + (ph > 0.9 && ph < 0.95 ? (ph - 0.9) * 200 : 0)); } PL(c, pts, '#4cf88c');
      R(c, 60, 160, 200, 20, '#e8e4dc'); E(c, 80, 156, 14, 8, '#f4f0e8');
      return { z: 1.03, fx: 160, fy: 96 };
    }
    basementHouse(c, t, { base: true }); rain(c, t, 70, 0.35);
    const sh = sg(t, 1.2, 3.2); if (sh > 0) { c.save(); c.globalAlpha = 0.85; blit(c, tintSpr(modFig(TED_DARK, { f: Math.floor(t * 4) & 3, k: 'sh' }), '#06060a', 'shs'), lerp(40, 110, sh), 150, FIG_AX2, FIG_AY2); c.restore(); }
    yearFlash(c, t, 0.4, 1974, 216, 10, '1月4日 深夜'); capPlate(c, t, 0.7, ['ワシントン州', 'シアトル']);
    return { z: 1.03 + 0.06 * ss(sg(t, 2, S.tScar)), fx: lerp(160, 132, sg(t, 2, S.tScar)), fy: 120 };
  }
};

/* ---- UF: July, the lake park in daylight; the same kind of girl; the chameleon ---- */
const UF = {
  name: '湖の公園', bgm: 'eerie',
  init(S) { S.tGone = at(S, 'L13', 2) - 0.3; S.tGirls = at(S, 'L14', 0) - 0.3; S.tCham = at(S, 'L15', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCham) { // four faces of one man
      R(c, 0, 0, W, H, '#1c1c24'); const looks = [{ smile: true }, { beard: true }, { look: 'long' }, { look: 'blond', smile: true }];
      looks.forEach((o, i) => { const k = sg(t, S.tCham + 0.3 + i * 0.6, S.tCham + 0.8 + i * 0.6); if (k <= 0) return; const x = 46 + i * 76; R(c, x - 34, 40, 68, 92, '#c8c0b0'); R(c, x - 30, 44, 60, 70, '#8c9cac'); bigFace(c, tedFace({ ...o, blink: blinkOf(t, 20 + i) }), x, 80, 1.2, k, 'cham' + i); R(c, x - 30, 116, 60, 12, '#2c2c34'); TX(c, String(i + 1), x - 4, 114, '#f4f0e8', 16, null); });
      bigCap(c, 'カメレオン', 6, 24, '#8cf87c', sg(t, S.tCham + 2.8, S.tCham + 3.4));
      return { z: 1.02, fx: 160, fy: 90 };
    }
    if (t > S.tGirls) { // long hair parted in the middle
      R(c, 0, 0, W, H, '#140c10'); for (let i = 0; i < 6; i++) { const k = sg(t, S.tGirls + 0.2 + i * 0.25, S.tGirls + 0.6 + i * 0.25); if (k > 0) { c.save(); c.globalAlpha = k; blit(c, tintSpr(modFig(GIRLS[i], { f: -1, k: 'gl' }), '#3c1c24', 'glt' + i), 40 + i * 48, 156, FIG_AX2, FIG_AY2, { s: 1.4 }); c.restore(); } }
      glow(c, 160, 100, 160, 60, '#c83c4c', 0.15);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    VG(c, 0, 0, W, 70, ['#4c8ce8', '#8cc0f0', '#d8ecf8']); E(c, 280, skyY(26), 14, 14, '#fff8d0'); glow(c, 280, skyY(26), 40, 40, '#fff4c0', 0.3);
    PF(c, [0, 70, 80, 50, 160, 66, 240, 46, 320, 64, 320, 80, 0, 80], '#3c6c4c'); R(c, 0, 76, W, 50, '#3c7cb8'); for (let i = 0; i < 18; i++) R(c, mod(i * 41 + t * 6, W), 84 + (i * 7 % 36), 10, 1, '#8cc0e8');
    R(c, 0, 124, W, 116, '#e8d8a8'); R(c, 0, 124, W, 3, '#c8b888');
    const gone = t > S.tGone;
    for (let i = 0; i < 6; i++) { const x = 20 + i * 52, col = ['#c83c3c', '#3c8cc8', '#e8c84c', '#4cac5c', '#c85ca8', '#f0f0e8'][i]; R(c, x - 14, 150, 28, 10, col); R(c, x - 14, 154, 28, 2, shadeCol(col, 0.8)); if (!gone || (i !== 2 && i !== 4)) person(c, FOLKS[i % 5], x + 6, 152, { expr: 'smile', flip: i % 2, k: 'lk' }); }
    if (gone) { glow(c, 124, 150, 20, 8, '#c81818', 0.2); glow(c, 228, 150, 20, 8, '#c81818', 0.2); dim(c, 0.25 * sg(t, S.tGone, S.tGone + 1.4), '#1c0c18'); }
    yearFlash(c, t, 0.4, 1974, 216, 10, '7月'); capPlate(c, t, 0.7, ['サマミッシュ湖', '州立公園']);
    return { z: 1.03 + 0.04 * ss(sg(t, S.tGone, S.tGirls)), fx: 170, fy: 116 };
  }
};

/* ---- UG: autumn — remains in the mountains; he is already in Utah with a governor's letter ---- */
const UG = {
  name: 'ユタ州', ch: 'ユタへ', bgm: 'dread',
  init(S) { S.tUtah = at(S, 'L16', 2) - 0.3; S.tLetter = at(S, 'L17', 0) - 0.3; S.tAgain = at(S, 'L17', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tLetter) {
      R(c, 0, 0, W, H, '#2c2418'); R(c, 0, 0, W, H, DP('#2c2418', '#342a1c', 2));
      const k = eOut(sg(t, S.tLetter, S.tLetter + 0.5)); R(c, 84, lerp(-120, 26, k), 152, 116, '#f4f0e4'); const y = lerp(-120, 26, k);
      R(c, 84, y, 152, 18, '#2c3c6c'); TX(c, '推薦状', 136, y + 1, '#f4f0e8', 16, null); for (let i = 0; i < 6; i++) R(c, 96, y + 28 + i * 10, 128 - (i === 5 ? 60 : 0), 2, '#8c8474');
      TX(c, 'ワシントン州知事', 96, y + 92, '#2c2c34', 16, null);
      if (t > S.tAgain) { dim(c, 0.6 * sg(t, S.tAgain, S.tAgain + 1.2), '#1c0408'); bigCap(c, '10月', 58, 24, '#f84040', sg(t, S.tAgain + 0.3, S.tAgain + 0.9)); }
      return { z: 1.03 + 0.05 * ss(sg(t, S.tAgain, S.dur)), fx: 160, fy: 90 };
    }
    if (t > S.tUtah) { // the Volkswagen on the desert road to Salt Lake City
      VG(c, 0, 0, W, 110, ['#4c7cc8', '#a8c8e8', '#f0dcb8']); PF(c, [0, 110, 40, 60, 90, 90, 150, 40, 220, 84, 270, 56, 320, 90, 320, 116, 0, 116], '#a8784c'); PF(c, [150, 40, 160, 48, 140, 48], '#f4f0e8');
      R(c, 0, 114, W, 126, '#d8b888'); R(c, 0, 140, W, 30, '#5c5c60'); for (let x = -mod(t * 120, 40); x < W; x += 40) R(c, x, 154, 20, 2, '#f4e8a0');
      blit(c, vwSpr(), 160, 164, 40, 35); for (let i = 0; i < 4; i++) E(c, 112 - i * 10, 160, 4 + i * 2, 2 + i, DA('#e8d8b8', 0.5 - i * 0.1));
      R(c, 250, 92, 50, 26, '#2c6c3c'); R(c, 252, 94, 46, 22, '#3c8c4c'); TX(c, 'UTAH', 258, 96, '#ffffff', 16, null); R(c, 272, 118, 3, 24, '#8c8c8c');
      return { z: 1.03, fx: 160, fy: 120 };
    }
    mountainWoods(c, t, { autumn: true }); for (let i = 0; i < 3; i++) { const x = 60 + i * 80; person(c, COPS[i], x, 160, { f: Math.floor(t * 4 + i) & 3, k: 'au' }); }
    for (let i = 0; i < 12; i++) { const u = fr(t * 0.2 + i / 12); P(c, mod(i * 37 + t * 20, W), u * 160, ['#c8641c', '#a83c1c', '#e8a83c'][i % 3]); } // falling leaves
    capPlate(c, t, 0.5, ['秋', 'サマミッシュ湖の近くの山']);
    return { z: 1.03, fx: 160, fy: 116 };
  }
};

/* ---- UI: November 4 again — the car check, "come to the station", the cuffs, the escape ---- */
const UI = withCuts({
  name: 'あの日', ch: '手錠', bgm: 'pulse',
  init(S) { S.tCar = at(S, 'L19', 1) - 0.3; S.tDrive = at(S, 'L20', 0) - 0.3; S.tCuff = at(S, 'L21', 0) - 0.3; S.tRun = at(S, 'L21', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCuff) { // the car stops; the cuffs; she bursts out and runs
      VG(c, 0, 0, W, 120, ['#06081c', '#141c3c', '#2c3458']); for (let i = 0; i < 20; i++) P(c, hash(i) * W, hash(i * 3) * 80, '#c8d0e8');
      R(c, 0, 118, W, 122, '#2c2c34'); R(c, 0, 150, W, 2, '#5c5c64');
      const run = t > S.tRun, k = sg(t, S.tRun, S.tRun + 2.4);
      blit(c, vwSpr('#c8a46c', { open: run }), 120, 168, 40, 35);
      if (!run) { cuffs(c, 132, 136, t, 1); glow(c, 132, 136, 20, 10, '#ffffff', 0.25); }
      else { person(c, WOMAN, lerp(150, 300, k), 172, { f: Math.floor(t * 12) & 3, expr: 'shock', k: 'run' }); blit(c, modFig(TED, { f: -1, arm: 'fwd', expr: 'angry', k: 'ui' }), 100, 170, FIG_AX2, FIG_AY2); cuffs(c, 114, 144, t, 1); }
      glow(c, 196, 158, 60, 14, '#fff4c0', 0.3); // headlights
      return { z: 1.06, fx: lerp(150, 200, k), fy: 130, sx: t > S.tRun && t < S.tRun + 0.3 ? Math.round(Math.sin(t * 90) * 2) : 0 };
    }
    if (t > S.tDrive) { // the beetle drives into the dark
      VG(c, 0, 0, W, 120, ['#0c1028', '#1c2448', '#3c3c5c']); for (let i = 0; i < 6; i++) { const x = mod(i * 70 - t * 60, W + 60) - 30; R(c, x, 70, 2, 50, '#2c2c34'); glow(c, x, 72, 12, 8, '#f8f0c0', 0.4); }
      R(c, 0, 118, W, 122, '#2c2c34'); for (let x = -mod(t * 160, 40); x < W; x += 40) R(c, x, 150, 20, 2, '#d8d4c0');
      blit(c, vwSpr('#c8a46c', { lit: true }), 160, 168, 40, 35); glow(c, 214, 160, 50, 12, '#fff4c0', 0.35);
      E(c, 152, 140, 4, 4, '#4c3020'); E(c, 166, 140, 4, 5, '#2c1c14'); // two heads in the window
      return { z: 1.06, fx: 160, fy: 130 };
    }
    mallFront(c, t, {}); blit(c, vwSpr('#e8dcc8'), 120, LOT_Y - 4, 40, 35); blit(c, vwSpr('#c8a46c'), 250, LOT_Y - 2, 40, 35, { flip: true });
    const checked = t > S.tCar;
    person(c, WOMAN, checked ? 92 : 150, LOT_Y, { expr: checked ? 'normal' : 'shock', blink: blinkOf(t, 3), flip: checked, k: 'ui' + (checked ? 'c' : '') });
    person(c, TED, checked ? 70 : 184, LOT_Y, { arm: checked ? 'point' : 'fwd', flip: !checked, expr: 'smile', k: 'ui' });
    if (checked) { bigCap(c, '異常なし', 42, 16, '#8cf87c', sg(t, S.tCar + 0.4, S.tCar + 1)); }
    return { z: 1.06, fx: checked ? 110 : 160, fy: 120 };
  }
}, [['F2', (c, t, S) => closeUp(c, t, tedFace({ smile: true, blink: blinkOf(t, 5) }), { bg: ['#1c1018', '#5c3c4c'], glow: '#f8a060' })],
    ['W1', (c, t, S) => closeUp(c, t, womanFace({ shock: true, blink: blinkOf(t, 8) }), { bg: ['#1c0c14', '#5c1c2c'], lines: '#f8c8c8' })]]);

/* ---- UJ: August 1975 — arrested in the same car; 1 to 15 years; Colorado ---- */
const UJ = {
  name: '逮捕', ch: '逮捕', bgm: 'dread',
  init(S) { S.tSent = at(S, 'L23', 0) - 0.3; S.tCol = at(S, 'L23', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCol) { // Colorado: a WANTED file with his face
      usaMap(c, t); E(c, CITY.colorado[0], CITY.colorado[1], 22, 14, DA('#c81818', 0.35)); mapDot(c, 'colorado', 'コロラド', '#f84040', -24, 8);
      const k = eOut(sg(t, S.tCol + 0.4, S.tCol + 0.9)); R(c, 196, lerp(-120, 40, k), 100, 120, '#f4f0e4'); const y = lerp(-120, 40, k); R(c, 196, y, 100, 18, '#c81818'); TX(c, '殺人事件', 214, y + 1, '#ffffff', 16, null);
      bigFace(c, tedFace({ blink: blinkOf(t, 4) }), 246, y + 66, 1.4, 1, 'wnt');
      return { z: 1.03, fx: 160, fy: 100 };
    }
    if (t > S.tSent) { // the sentence
      R(c, 0, 0, W, H, '#1c1c24'); for (let i = 0; i < 12; i++) R(c, 20 + i * 26, 0, 6, H, '#3c3c44');
      blit(c, modFig(TED_JAIL, { f: -1, expr: 'normal', k: 'uj' }), 160, 180, FIG_AX2, FIG_AY2, { s: 1.6 });
      for (let i = 0; i < 12; i++) R(c, 22 + i * 26, 0, 4, H, '#5c5c64');
      const k = eOut(sg(t, S.tSent + 0.6, S.tSent + 0.9)); if (k > 0) { c.save(); c.translate(160, 50); c.rotate(-0.12); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -70, -14, 140, 28, '#c81818'); R(c, -67, -11, 134, 22, '#f4f0e8'); TX(c, '1年〜15年', -40, -9, '#c81818', 16, null); c.restore(); }
      return { z: 1.03, fx: 160, fy: 110 };
    }
    // the night road: lights flashing behind the beetle
    VG(c, 0, 0, W, 120, ['#06081c', '#0c1430', '#1c2448']); R(c, 0, 118, W, 122, '#24242c'); R(c, 0, 150, W, 2, '#4c4c54');
    blit(c, vwSpr('#c8a46c'), 210, 168, 40, 35); blit(c, cruiserSpr(t), 90, 170, 48, 37); lightBar(c, 100, 136, t, 80);
    if (t > 1.6) { person(c, COPS[0], 160, 170, { arm: 'point', k: 'uj' }); person(c, TED, 250, 170, { expr: 'normal', flip: true, arm: 'up', k: 'ujh' }); }
    yearFlash(c, t, 0.4, 1975, 216, 10, '8月16日');
    return { z: 1.05, fx: 170, fy: 124 };
  }
};

/* ---- UK: June 1976 — out of the second-floor window of the law library; a sprained ankle ---- */
const UK = {
  name: 'コロラドの裁判所', ch: '二度の脱走', bgm: 'pulse',
  init(S) { S.tJump = at(S, 'L24', 3) - 0.2; S.tCaught = at(S, 'L25', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 110, ['#5c9ce0', '#a8d0f0', '#e8f0f0']); PF(c, [0, 100, 70, 50, 130, 86, 200, 36, 260, 80, 320, 56, 320, 110, 0, 110], '#7c8c9c'); PF(c, [200, 36, 212, 46, 188, 46], '#f4f4f0');
    R(c, 0, 110, W, 130, '#6c9c5c'); R(c, 0, 168, W, 72, '#9c9484');
    R(c, 60, 30, 200, 112, '#b4846c'); for (let y = 34; y < 142; y += 6) for (let x = 60 + ((y / 6) & 1) * 6; x < 260; x += 12) R(c, x, y, 11, 5, '#bc8c74'); R(c, 54, 24, 212, 8, '#8c5c44'); R(c, 140, 8, 40, 18, '#8c5c44'); PF(c, [136, 10, 160, -6, 184, 10], '#5c3c2c');
    for (let i = 0; i < 6; i++) { const x = 74 + i * 30; for (const y of [44, 92]) { R(c, x, y, 16, 26, '#3c3c44'); R(c, x + 2, y + 2, 12, 22, '#8ca8c8'); } }
    R(c, 146, 114, 28, 28, '#4c2c1c');
    const jx = 214 + 8, jk = sg(t, S.tJump, S.tJump + 0.7);
    if (t < S.tJump) { R(c, 196, 44, 16, 26, '#1c1c24'); blit(c, modFig(TED, { f: -1, k: 'win', expr: 'normal' }), 204, 72, FIG_AX2, FIG_AY2, { s: 0.8 }); }
    else if (jk < 1) { R(c, 196, 44, 16, 26, '#1c1c24'); blit(c, modFig(TED, { f: 1, arm: 'up', k: 'jmp', expr: 'shock' }), lerp(206, jx + 16, jk), lerp(70, 166, jk * jk), FIG_AX2, FIG_AY2, { s: 0.9 }); }
    else if (t < S.tCaught) { R(c, 196, 44, 16, 26, '#1c1c24'); const k = sg(t, S.tJump + 0.7, S.tCaught); blit(c, modFig(TED, { f: Math.floor(t * 4) & 3, k: 'limp', expr: 'sad' }), lerp(jx + 16, 330, k), 168 + (Math.floor(t * 4) & 1) * 2, FIG_AX2, FIG_AY2); }
    else { yearFlash(c, t, S.tCaught + 0.2, 1976, 20, 10, '1週間後'); blit(c, modFig(TED_JAIL, { f: -1, expr: 'sad', k: 'cgt' }), 160, 170, FIG_AX2, FIG_AY2); person(c, COPS[0], 136, 170, { k: 'cg1' }); person(c, COPS[1], 186, 170, { flip: true, k: 'cg2' }); }
    if (t < S.tCaught) { yearFlash(c, t, 0.4, 1976, 216, 10, '6月7日'); capPlate(c, t, 0.7, ['コロラド州', '裁判所']); }
    return { z: 1.04 + (t > S.tJump && t < S.tJump + 1 ? 0.04 : 0), fx: t < S.tJump + 1 ? 210 : 160, fy: 104, sy: jk >= 1 && t < S.tJump + 0.85 ? 2 : 0 };
  }
};

/* ---- UL: December 30, 1977 — the hole in the cell ceiling; out the front gate; gone ---- */
const UL = {
  name: '独房', bgm: 'dread',
  init(S) { S.tSaw = at(S, 'L26', 2) - 0.3; S.tOut = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tOut) { // a snowy night: the front gate, a figure walks away, tail lights
      nightSky(c, t, 120); snowGround(c, 140); R(c, 0, 80, W, 60, '#3c3c44'); for (let x = 0; x < W; x += 30) R(c, x, 80, 2, 60, '#34343c'); R(c, 0, 76, W, 4, '#5c5c64');
      R(c, 120, 60, 80, 80, '#2c2c34'); R(c, 132, 80, 56, 60, '#141418'); glow(c, 160, 70, 40, 14, '#f8f0c0', 0.35); R(c, 156, 62, 8, 6, '#f8f0c0');
      const k = sg(t, S.tOut + 0.3, S.tOut + 3.6); blit(c, tintSpr(modFig(TED_DARK, { f: Math.floor(t * 6) & 3, k: 'gate' }), '#0c0c14', 'gsil'), lerp(160, 290, k), 166, FIG_AX2, FIG_AY2);
      if (t > S.tOut + 3.4) { const u = sg(t, S.tOut + 3.4, S.dur); R(c, 300 - u * 40, 160, 3, 2, '#f82020'); R(c, 310 - u * 40, 160, 3, 2, '#f82020'); }
      snowfall(c, t, 60, 4, 10, 18);
      return { z: 1.04, fx: 180, fy: 120 };
    }
    cellBg(c, t, { hole: t > S.tSaw - 1.5 });
    const climbing = t > S.tSaw + 1.2;
    if (!climbing) { blit(c, modFig(TED_JAIL, { f: -1, arm: 'stab', k: 'saw' }), 156, 168, FIG_AX2, FIG_AY2, { s: 1.3 }); if (t > S.tSaw - 1.5) { const sx = Math.sin(t * 20) * 4; L(c, 150 + sx, 18, 166 + sx, 22, '#c8ccd4', 2); R(c, 152 + sx, 22, 10, 3, '#5c3c24'); for (let i = 0; i < 4; i++) P(c, 150 + hash(i + Math.floor(t * 10)) * 20, 30 + hash(i * 3 + Math.floor(t * 10)) * 20, '#c8c8c0'); } }
    else { const k = sg(t, S.tSaw + 1.2, S.tOut - 0.2); c.save(); c.beginPath(); c.rect(0, 28, W, H); c.clip(); blit(c, modFig(TED_JAIL, { f: -1, arm: 'up', k: 'climb' }), 156, lerp(120, 40, k), FIG_AX2, FIG_AY2, { s: 1.3 }); c.restore(); }
    darkness(c, 158, 20, 220, 0.5);
    yearFlash(c, t, 0.4, 1977, 216, 40, '12月30日 夜'); capPlate(c, t, 0.7, ['コロラド州', 'グレンウッドスプリングス']);
    return { z: 1.04 + 0.04 * ss(sg(t, S.tSaw, S.tOut)), fx: 160, fy: lerp(110, 70, sg(t, S.tSaw, S.tOut)) };
  }
};

/* ---- UM: the run to Florida on the map ---- */
const UM = {
  name: 'フロリダへ', ch: 'フロリダ', bgm: 'pulse',
  init(S) { S.tRoom = at(S, 'L28', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    usaMap(c, t); const route = ['colorado', 'denver', 'chicago', 'annarbor', 'atlanta', 'tallahassee'], labs = [null, 'デンバー', 'シカゴ', 'アナーバー', 'アトランタ', 'タラハシー'], icons = ['', '✈', '✈', '列車', '車', 'バス'];
    const u = sg(t, 0.4, Math.min(S.tRoom, 0.4 + 9)) * (route.length - 1);
    for (let i = 0; i < route.length - 1; i++) { const [x0, y0] = CITY[route[i]], [x1, y1] = CITY[route[i + 1]], k = clamp(u - i, 0, 1); if (k <= 0) break; L(c, x0, y0, lerp(x0, x1, k), lerp(y0, y1, k), '#f84040', 2); }
    const off = [[0, 0], [-56, 4], [-44, -22], [8, -20], [-84, -10], [10, -20]]; route.forEach((k, i) => { if (u >= i - 0.05) mapDot(c, k, labs[i], i === route.length - 1 ? '#f84040' : '#f8d860', off[i][0], off[i][1]); });
    const i = Math.min(route.length - 2, Math.floor(u)), [x0, y0] = CITY[route[i]], [x1, y1] = CITY[route[i + 1]], kk = clamp(u - i, 0, 1); E(c, lerp(x0, x1, kk), lerp(y0, y1, kk), 3, 3, '#ffffff');
    if (t > S.tRoom) { const k = eOut(sg(t, S.tRoom, S.tRoom + 0.4)), py = lerp(-70, 10, k); R(c, 10, py, 112, 56, '#f4f0e4'); R(c, 10, py, 112, 16, '#5c3c24'); TX(c, '偽名で入居', 24, py, '#f4f0e8', 16, null); TX(c, 'クリス・ヘイゲン', 14, py + 22, '#2c2c34', 16, null); }
    return { z: 1.02 + 0.03 * ss(sg(t, 0.4, S.dur)), fx: lerp(160, 180, sg(t, 0.4, S.dur)), fy: 100 };
  }
};

/* ---- UN: January 15, 1978 — the sorority house; February 9 — the last victim; February 15 — Pensacola ---- */
const UN = {
  name: 'タラハシー', bgm: 'dread',
  init(S) { S.tSiren = at(S, 'L29', 3) - 0.3; S.tGirl = at(S, 'L30', 0) - 0.3; S.tStop = at(S, 'L31', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tStop) { // Pensacola, 1 a.m.: the stolen plate
      VG(c, 0, 0, W, 120, ['#04060c', '#0c1020', '#1c2030']); R(c, 0, 118, W, 122, '#1c1c24'); R(c, 0, 150, W, 2, '#3c3c44');
      for (let i = 0; i < 3; i++) { const x = 30 + i * 110; R(c, x, 60, 3, 60, '#2c2c34'); glow(c, x, 62, 14, 10, '#f8e0a0', 0.4); }
      blit(c, vwSpr('#e8a83c'), 200, 168, 40, 35); blit(c, cruiserSpr(t), 70, 170, 48, 37); lightBar(c, 80, 136, t, 80);
      R(c, 158, 156, 12, 6, '#f4f0e8'); R(c, 158, 156, 12, 2, '#c81818'); glow(c, 164, 159, 16, 8, '#ffffff', 0.3 * (0.5 + 0.5 * Math.sin(t * 6)));
      yearFlash(c, t, S.tStop + 0.2, 1978, 216, 10, '2月15日'); capPlate(c, t - S.tStop, 0.5, ['フロリダ州', 'ペンサコーラ']);
      return { z: 1.06, fx: 170, fy: 130 };
    }
    if (t > S.tGirl) { // a candle and a small pair of shoes
      R(c, 0, 0, W, H, '#0c0a10'); glow(c, 160, 120, 90, 60, '#f8c060', 0.3); candle(c, 160, 130, t, 0, 1);
      R(c, 120, 136, 16, 8, '#c83c5c'); R(c, 120, 142, 18, 2, '#5c1c2c'); R(c, 184, 136, 16, 8, '#c83c5c'); R(c, 182, 142, 18, 2, '#5c1c2c');
      yearFlash(c, t, 0.3 + S.tGirl, 1978, 216, 10, '2月9日');
      return { z: 1.03, fx: 160, fy: 120 };
    }
    // the dormitory at night; then the sirens
    VG(c, 0, 0, W, 130, ['#04060e', '#0c1424', '#141c30']); moon(c, 40, skyY(30), 10, t);
    R(c, 50, 40, 220, 104, '#c8bca8'); for (let y = 44; y < 144; y += 5) R(c, 50, y, 220, 1, '#bcb09c'); PF(c, [40, 42, 160, 10, 280, 42], '#3c3c4c');
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const x = 64 + i * 34, y = 54 + r * 40, lit = t > S.tSiren && (i + r) % 2 === 0; R(c, x, y, 18, 26, '#2c2c34'); R(c, x + 2, y + 2, 14, 22, lit ? '#f8e0a0' : '#1c2434'); }
    for (let i = 0; i < 4; i++) R(c, 120 + i * 22, 106, 6, 38, '#e8e4dc'); R(c, 114, 102, 92, 6, '#e8e4dc'); TX(c, 'ΧΩ', 148, 84, '#2c2c34', 16, null);
    R(c, 0, 144, W, 96, '#1c2418');
    if (t > S.tSiren) { for (let i = 0; i < 2; i++) { blit(c, cruiserSpr(t + i * 0.3), 60 + i * 200, 190, 48, 37); lightBar(c, 70 + i * 200, 156, t + i * 0.3, 70); } }
    yearFlash(c, t, 0.4, 1978, 216, 10, '1月15日 深夜'); capPlate(c, t, 0.7, ['タラハシー', '女子寮']);
    return { z: 1.04, fx: 160, fy: 108 };
  }
};

/* ---- UO: the 1979 trial — defending himself; fan letters; death; the judge's words ---- */
const UO = withCuts({
  name: '法廷', ch: '裁判', bgm: 'requiem',
  init(S) { S.tLetters = at(S, 'L33', 0) - 0.3; S.tDeath = at(S, 'L33', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLetters && t < S.tDeath) { // letters piling up in a cell
      cellBg(c, t, {}); const n = Math.floor(sg(t, S.tLetters + 0.2, S.tDeath - 0.3) * 60);
      for (let i = 0; i < n; i++) { const x = 40 + hash(i) * 150, y = 160 - Math.floor(i / 8) * 4 - hash(i * 3) * 6; R(c, x, y, 18, 12, ['#f4f0e4', '#f8e0e8', '#e8f0f8'][i % 3]); L(c, x, y, x + 9, y + 6, '#c8c0b0'); L(c, x + 9, y + 6, x + 18, y, '#c8c0b0'); if (i % 5 === 0) R(c, x + 7, y + 4, 4, 3, '#c83c4c'); }
      bigCap(c, '数百通', 40, 24, '#f8c8d8', sg(t, S.tLetters + 1, S.tLetters + 1.6));
      return { z: 1.03, fx: 120, fy: 130 };
    }
    courtroom(c, t);
    blit(c, modFig({ id: 'jdg', top: 'shirt', coat: '#141418', pants: '#141418', skin: '#e4bc9c', hair: '#c8c8cc', hairStyle: 'side', glasses: true }, { f: -1, k: 'bench' }), 160, 100, FIG_AX2, FIG_AY2, { s: 1.2 });
    R(c, 90, 64, 140, 50, '#3c2414'); R(c, 90, 64, 140, 4, '#6c4c2c'); R(c, 120, 70, 80, 2, '#2c1c10');
    person(c, TED_SUIT, 170, 166, { arm: t < S.tDeath ? 'point' : null, expr: t > S.tDeath ? 'normal' : 'smile', flip: true, blink: blinkOf(t, 6), k: 'crt' }); R(c, 180, 122, 22, 32, '#5c3c24'); R(c, 176, 118, 30, 6, '#6c4c2c'); // lectern
    for (let i = 0; i < 5; i++) person(c, { id: 'pd' + i, top: 'jacket', coat: ['#3c3c44', '#4c4034', '#2c3448', '#3c3c3c', '#4c4c54'][i], shirt: '#ece8e0', tie: '#3c2c2c', pants: '#2c2c34', skin: ['#e8c0a0', '#dcac88', '#f0c8a8', '#e0b090', '#e8c4a4'][i], hair: ['#3c2818', '#8c8c8c', '#1c1814', '#6c4c2c', '#a88c5c'][i], hairStyle: 'side', glasses: i % 2 }, 20 + i * 22, 166, { k: 'pd', flip: false });
    for (let i = 0; i < 5; i++) R(c, 10 + i * 22, 140, 22, 30, '#4c3420'); TX(c, '弁護人 5人', 12, 92, '#f4f0e8', 16, '#000000');
    if (t > S.tDeath) { const k = eOut(sg(t, S.tDeath + 0.3, S.tDeath + 0.6)); c.save(); c.translate(250, 60); c.rotate(-0.15); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -34, -16, 68, 32, '#c81818'); R(c, -31, -13, 62, 26, '#f4f0e8'); TX(c, '死刑', -16, -9, '#c81818', 16, null); c.restore(); }
    yearFlash(c, t, 0.4, 1979, 216, 10, 'マイアミ');
    return { z: 1.03, fx: 150, fy: 110, sy: t > S.tDeath + 0.3 && t < S.tDeath + 0.5 ? 2 : 0 };
  }
}, [['J1', (c, t, S) => closeUp(c, t, judgeFace({ blink: blinkOf(t, 11) }), { bg: ['#1c140c', '#4c3424'], glow: '#f8d8a0' })]]);

/* ---- UP: the interview; "I'll win"; days before, he talks; January 24, 1989 ---- */
const UP = withCuts({
  name: '刑務所', ch: '電気椅子', bgm: 'requiem',
  init(S) { S.tTalk = at(S, 'L35', 0) - 0.3; S.tChair = at(S, 'L36', 0) - 0.3; S.tMeal = at(S, 'L36', 4) - 0.3; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (t > S.tChair) {
      if (t > S.tMeal) { // the untouched tray
        R(c, 0, 0, W, H, '#1c1c20'); glow(c, 160, 110, 120, 70, '#f8e8c0', 0.2); R(c, 80, 80, 160, 90, '#8c8c94'); R(c, 84, 84, 152, 82, '#a8a8b0');
        E(c, 130, 118, 30, 18, '#f4f0e8'); E(c, 128, 116, 18, 10, '#7c3c24'); E(c, 146, 124, 6, 4, '#f8f4ec'); E(c, 146, 124, 2.5, 2, '#f8c830');
        R(c, 180, 100, 30, 22, '#e8c88c'); R(c, 182, 102, 26, 4, '#c89c5c'); R(c, 214, 96, 12, 26, '#f4f4f0'); R(c, 214, 132, 12, 22, '#f8a83c'); R(c, 160, 144, 20, 10, '#d8b878');
        bigCap(c, 'ひと口も、手をつけなかった', 36, 16, '#f4f0e8', sg(t, S.tMeal + 0.8, S.tMeal + 1.4));
        return { z: 1.03, fx: 160, fy: 110 };
      }
      R(c, 0, 0, W, H, '#060608'); glow(c, 160, 90, 90, 90, '#d8e0f8', 0.18); L(c, 160, 0, 160, 30, '#2c2c2c', 2); E(c, 160, 34, 30, 6, DA('#f8f8ff', 0.15));
      blit(c, chairSpr(), 160, 160, 30, 79); R(c, 100, 160, 120, 4, '#1c1c20');
      // the clock 7:06
      E(c, 266, 50, 22, 22, '#2c2c34'); E(c, 266, 50, 19, 19, '#f4f0e8'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; P(c, 266 + Math.cos(a) * 16, 50 + Math.sin(a) * 16, '#2c2c34'); }
      L(c, 266, 50, 266 + Math.cos(-Math.PI / 2 + (7 + 6 / 60) / 12 * TAU) * 9, 50 + Math.sin(-Math.PI / 2 + (7 + 6 / 60) / 12 * TAU) * 9, '#141414', 2); L(c, 266, 50, 266 + Math.cos(-Math.PI / 2 + 6 / 60 * TAU) * 14, 50 + Math.sin(-Math.PI / 2 + 6 / 60 * TAU) * 14, '#141414');
      yearFlash(c, t, S.tChair + 0.2, 1989, 20, 10, '1月24日');
      return { z: 1.02 + 0.08 * ss(sg(t, S.tChair, S.tMeal)), fx: 170, fy: 100 };
    }
    // the interview room; a tape recorder for the confession
    R(c, 0, 0, W, H, '#4c4c48'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450'); R(c, 0, 150, W, 90, '#3c3c38');
    glow(c, 160, 40, 80, 30, '#f8f4d8', 0.35); L(c, 160, 0, 160, 20, '#1c1c1c'); R(c, 150, 20, 20, 6, '#2c2c2c');
    R(c, 80, 120, 160, 8, '#6c5c4c'); R(c, 86, 128, 6, 40, '#4c3c2c'); R(c, 228, 128, 6, 40, '#4c3c2c');
    person(c, TED_JAIL, 196, 150, { expr: t > S.tTalk ? 'sad' : 'smile', flip: true, blink: blinkOf(t, 2), k: 'int' });
    person(c, { id: 'fbi', top: 'jacket', coat: '#2c2c34', shirt: '#f0ece4', tie: '#3c3c6c', pants: '#24242c', skin: '#e0b898', hair: '#5c4c3c', hairStyle: 'side' }, 120, 150, { k: 'fbi' });
    if (t > S.tTalk) { R(c, 140, 108, 40, 14, '#2c2c34'); for (const x of [150, 170]) { E(c, x, 114, 4, 4, '#8c8c94'); L(c, x, 114, x + Math.cos(t * 6) * 3, 114 + Math.sin(t * 6) * 3, '#2c2c34'); } R(c, 144, 108, 4, 3, t % 1 < 0.5 ? '#f82020' : '#5c1c1c'); }
    return { z: 1.04, fx: 160, fy: 110 };
  }
}, [['B1', (c, t, S) => closeUp(c, t, tedFace({ smile: true, jail: true, blink: blinkOf(t, 5) }), { bg: ['#141418', '#3c3c44'], glow: '#c8c8d8' })]]);

/* ---- UQ: the end — remains still not found; the mask; candles ---- */
const UQ = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tMask = at(S, 'L38', 0) - 0.3; S.tCand = at(S, 'L38', 2) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06060a', '#141420', '#06060a']);
    if (t < S.tMask) { mountainWoods(c, t, {}); dim(c, 0.2); softBeam(c, 20, 110, 0.25 + Math.sin(t * 0.6) * 0.2, 200, 0.14, 0.25); bigCap(c, '?', 60, 24, '#f4f0e8', sg(t, 1.2, 2)); return { z: 1.03, fx: 160, fy: 110 }; }
    const k = sg(t, S.tMask, S.tMask + 3); c.save(); c.globalAlpha = 1 - k * 0.8; bigFace(c, tedFace({ smile: true, blink: blinkOf(t, 3) }), 160, 82, 2.2, 1, 'mask'); c.restore();
    if (t > S.tCand) candleRows(c, t, 30, (t - S.tCand) * 6, 50, 150, 10, 24, 16);
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { mallFront(c, t, {}); blit(c, vwSpr('#c8a46c'), 92, LOT_Y - 4, 40, 35); person(c, WOMAN, 140, LOT_Y, { blink: blinkOf(t, 3), k: 'ss' }); const x = lerp(240, 186, ss(sg(t, 0, 2.4))); person(c, TED, x, LOT_Y, { f: t < 2.4 ? Math.floor(t * 8) & 3 : -1, flip: true, expr: 'smile', k: 'ss' }); cuffs(c, x + 10, LOT_Y - 26, t, sg(t, 2.6, 3.2)); return { z: 1.12, fx: 170, fy: 124 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#2c0c14', '#06040a']); for (let i = 0; i < 22; i++) { const a = i / 22 * TAU + t * 0.1, w = 0.05; PF(c, [160, 76, 160 + Math.cos(a - w) * 260, 76 + Math.sin(a - w) * 260, 160 + Math.cos(a + w) * 260, 76 + Math.sin(a + w) * 260], DA('#c83c4c', 0.14)); }
    bigFace(c, tedFace({ blink: blinkOf(t, 12), smile: true }), 160, 76, 2, 1, 'ss2'); cuffs(c, 150, 140, t, 1);
    return { z: 1, fx: 160, fy: 100 };
  }
};
