/* ================= 記録 #002 ジョン・ゲイシー: scenes (2) — the smell, the boy, the crawl space, the end ================= */
/* ---- GH: the smell ---- */
const GH = {
  name: '床下の臭い', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    crossSection(c, t, 26);
    c.fillStyle = DA('#000000', 0.6); c.fillRect(0, 102, W, 60);
    for (let i = 0; i < 10; i++) { const u = fr(t * 0.4 + i / 10), x = 30 + i * 28 + Math.sin(t + i) * 4; PL(c, [x, 100 - u * 60, x + 3, 94 - u * 60, x - 2, 88 - u * 60], DA('#a8b46c', 0.6 * (1 - u))); }
    for (let k = 0; k < 160; k++) P(c, hash(k * 3) * W, 108 + hash(k * 7) * 50, DA('#f4f4ec', 0.8)); // lime
    for (let k = 0; k < 6; k++) { const u = fr(t * 0.5 + k / 6); E(c, 60 + k * 40, 104 - u * 20, 6 + u * 8, 2 + u * 3, DA('#e8e8e0', 0.5 * (1 - u))); }
    capPlate(c, t, 0.4, ['床下に、石灰']);
    return { z: 1.03, fx: 160, fy: 100 };
  }
};
/* ---- GI: December 11, 1978 — the pharmacy ---- */
const GI = {
  name: '消えた少年', ch: '1978年12月', bgm: 'eerie',
  init(S) { S.tOut = at(S, 'L16', 3) - 0.3; S.tGone = at(S, 'L16', 4); S.tGacy = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    nightSky(c, t, 130, [K.night0, K.night1, K.night2]);
    R(c, 0, 40, 60, 100, '#2c2c34'); R(c, 260, 50, 60, 90, '#2c2c34'); R(c, 60, 50, 200, 90, '#5c5458'); R(c, 60, 50, 200, 4, '#3c3438');
    R(c, 76, 56, 168, 20, '#1c1c24'); const on = Math.sin(t * 20) > -0.9; TX(c, 'DES PLAINES', 160 - textSpr('DES PLAINES', 16, '#58e8a8').width / 2, 58, on ? '#58e8a8' : '#2c7c5c', 16, null);
    for (const wx of [72, 186]) { R(c, wx, 84, 62, 44, K.win0); for (let s = 0; s < 3; s++) R(c, wx + 4, 92 + s * 12, 54, 2, '#c8a860'); }
    R(c, 146, 86, 28, 54, '#3c2c24'); R(c, 149, 89, 22, 30, K.win1);
    snowGround(c, 140, 0, 100);
    if (t > S.tGacy) { nightSky(c, t, 130, [K.night0, K.night1, K.night2]); snowGround(c, 136, 0, 104); ranchHouse(c, 110, 140, t, { snow: true, lit: true, wall: '#8c8070', wall2: '#7c7064', roof: '#3c3430' }); blit(c, personSpr(COP, { f: -1, id: 'cv', shock: t > S.tGacy + 1.5 }), 160, 146, PER_AX, PER_AY, { s: 1.3 }); for (let k = 0; k < 8; k++) { const u = fr(t * 0.4 + k / 8), x = 120 + k * 12 + Math.sin(t + k) * 4; PL(c, [x, 120 - u * 50, x + 3, 114 - u * 50, x - 2, 108 - u * 50], DA('#a8b46c', 0.6 * (1 - u))); } capPlate(c, t, S.tGacy + 0.3, ['ゲイシーの家']); snowfall(c, t, 50, 33, 8, 12); return { z: 1.05, fx: 160, fy: 110 }; }
    if (t > S.tOut) { const u = t - S.tOut, x = 160 + u * 18, a = 1 - sg(t, S.tGone + 1.5, S.tGone + 3); for (let i = 0; i < u * 3 && i < 30; i++) R(c, 162 + i * 6, 150 + (i & 1) * 2, 3, 1, K.snow3); if (a > 0) c.drawImage(ditherFade(personSpr(BOY, { f: Math.floor(t * 7) & 3 }), a, 'boyf'), Math.round(x - PER_AX - 1), Math.round(152 - PER_AY - 1)); }
    snowfall(c, t, 60, 31, 10, 14);
    capPlate(c, t, 0.5, ['1978年12月', 'イリノイ州 デス・プレーンズ']);
    return { z: 1 + 0.06 * ss(t / S.dur), fx: 190, fy: 110 };
  }
};
/* ---- GJ: surveillance and confession ---- */
const GJ = {
  name: '追いつめられた男', ch: '追いつめられた男', bgm: 'pulse',
  init(S) { S.tConf = at(S, 'L18', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tConf) { // tailed by unmarked cars
      nightSky(c, t, 120, [K.night0, K.night1, K.night2]); R(c, 0, 120, W, 120, '#3c3c40'); for (let x = 0; x < W; x += 30) R(c, x - mod(t * 60, 30), 150, 14, 2, '#e8d070');
      const car = (x, col) => { PF(c, [x, 146, x + 8, 134, x + 24, 126, x + 64, 126, x + 78, 134, x + 92, 136, x + 94, 146], col); R(c, x + 28, 128, 32, 6, '#5c6c8c'); E(c, x + 18, 146, 6, 6, '#0c0c10'); E(c, x + 76, 146, 6, 6, '#0c0c10'); };
      car(200 + Math.sin(t * 2) * 4, '#2c2c3c'); car(60 + Math.sin(t * 2 + 1) * 6, '#3c3c34'); E(c, 156, 136, 30, 10, DA(K.win0, 0.2)); beam(c, 152, 136, 0, 60, 0.15, 0.3);
      return { z: 1.04, fx: 160, fy: 120, sy: Math.round(Math.sin(t * 25)) };
    }
    R(c, 0, 0, W, H, '#1c1814'); roomBg(c, { wall: '#4c4038', wall2: '#443830', floor: '#2c241c', fy: 150, lamp: [160, 20] });
    R(c, 100, 120, 120, 8, '#5c3c28'); blit(c, personSpr(GACY, { f: -1, id: 'gcf' }), 136, 150, PER_AX, PER_AY, { s: 1.4 }); blit(c, personSpr(DET, { f: -1, id: 'lw' }), 190, 150, PER_AX, PER_AY, { s: 1.4, flip: true });
    for (let i = 0; i < 3; i++) { const u = fr(t * 0.3 + i / 3); E(c, 150 + u * 10, 90 - u * 40, 3 + u * 6, 2 + u * 3, DA('#c8c8c8', 0.5 * (1 - u))); } // cigarette smoke
    return { z: 1.06, fx: 160, fy: 110 };
  }
};
/* ---- GK: December 21 — digging the crawl space; 26 + 3 + 4 = 33 ---- */
const GK = {
  name: '床下の捜索', ch: '床下', bgm: 'pulse',
  init(S) { S.tCount = at(S, 'L20', 0) - 0.2; S.t33 = at(S, 'L20', 3) - 0.2; S.tYoung = ln(S, 'L21') ? at(S, 'L21', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tCount) {
      const n = Math.round(lerp(0, 29, sg(t, 1, S.tCount)));
      crossSection(c, t, n, { lit: true, blood: true });
      for (let i = 0; i < 3; i++) { const x = 60 + i * 90 + Math.sin(t + i) * 8; blit(c, personSpr(COP, { f: -1, weapon: 'shovel', arm: (Math.floor(t * 2 + i) & 1) ? 'dig' : 'fwd', id: 'cd' + i + ((Math.floor(t * 2 + i) & 1)) }), x, 152, PER_AX, PER_AY, { s: 0.9 }); beam(c, x + 6, 132, 0.6 + Math.sin(t + i) * 0.3, 40, 0.2, 0.4); }
      darkness(c, 160, 130, 170, 0.5);
      yearFlash(c, t, 0.2, 1978, 216, 4, '12月');
      return { z: 1.08, fx: 160, fy: 120 };
    }
    // the count, then 33 candles
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']);
    const rows = [['床下', 29, 0], ['川', 4, 1]];
    if (t < S.t33) rows.forEach(([lab, n, i]) => { const tt = at(S, 'L20', i) - 0.2; if (t < tt) return; TX(c, lab, 40, 30 + i * 34, C.white, 24, '#000000'); TX(c, n + '人', 240, 30 + i * 34, K.red0, 24, '#000000'); for (let k = 0; k < n; k++) R(c, 118 + (k % 13) * 8, 34 + i * 34 + Math.floor(k / 13) * 9, 5, 7, K.win1); });
    else { candleRows(c, t, 33, 33 * sg(t, S.t33, S.t33 + 2.2), 50, 110, 11, 22, 18); bigCap(c, '33人', 50, 24, C.white, sg(t, S.t33 + 0.4, S.t33 + 1)); }
    if (t > S.tYoung) { c.fillStyle = DA('#000000', 0.3); c.fillRect(0, 0, W, 40); bigCap(c, '10代〜20歳ほど', 14, 16, K.snow1); }
    return { z: 1, fx: 160, fy: 110 };
  }
};
/* ---- GL: 1980 trial; the paintings ---- */
const GL = {
  name: '裁判', ch: '裁判', bgm: 'requiem',
  init(S) { S.tGavel = at(S, 'L22', 1) + 0.8; S.tPaint = at(S, 'L23', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tPaint) { VG(c, 0, 0, W, H, ['#3c2a20', '#2c1e18', '#1c1410']); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 120, '#4c3628');
      R(c, 80, 60, 160, 60, '#5c3c28'); R(c, 80, 60, 160, 4, '#7c5438'); E(c, 160, 40, 9, 10, '#d8b090'); R(c, 148, 48, 24, 14, '#141010'); R(c, 152, 28, 16, 6, '#c8c8c8');
      const hit = t > S.tGavel && t < S.tGavel + 0.25; blit(c, cached('gavel', () => SPR(null, 22, 8, x => { R(x, 0, 0, 10, 8, '#6c4428'); R(x, 10, 3, 12, 2, '#8c5c38'); })), 200, 66, 20, 4, { rot: hit ? 0.2 : -0.9 }); R(c, 186, 70, 20, 4, '#4c2c1c');
      if (hit) for (let i = 0; i < 6; i++) L(c, 192, 70, 192 + Math.cos(i) * 14, 70 - Math.abs(Math.sin(i)) * 10, C.white);
      blit(c, personSpr(GACY, { f: -1, id: 'gt' }), 120, 156, PER_AX, PER_AY, { flip: true, s: 1.4 });
      for (let i = 0; i < 5; i++) { const x = 20 + i * 64; E(c, x, 190, 12, 12, '#0c0806'); R(c, x - 14, 196, 28, 44, '#0c0806'); }
      yearFlash(c, t, 0.2, 1980, 14, 10, t > S.tGavel ? '死刑判決' : ''); return { z: 1.05, fx: 160, fy: 80, sy: hit ? 2 : 0 }; }
    // the cell, clown paintings on the wall
    R(c, 0, 0, W, H, '#4c4c54'); for (let y = 0; y < H; y += 10) R(c, 0, y, W, 1, '#44444c'); R(c, 0, 150, W, 90, '#3c3c44');
    [[30, 30], [130, 24], [230, 34]].forEach(([x, y], i) => { R(c, x - 4, y - 4, 68, 76, '#5c3c24'); R(c, x, y, 60, 68, ['#3c6cb8', '#c83c3c', '#48a048'][i]); bigFace(c, pogoFace({ expr: i === 1 ? 'creepy' : 'smile' }), x + 30, y + 34, 1, 1, 'pp' + i); });
    blit(c, personSpr(GACY, { f: -1, arm: 'fwd', id: 'gpt' }), 150, 156, PER_AX, PER_AY, { s: 1.4 }); R(c, 166, 120, 2, 14, '#8c5c30');
    for (let i = 0; i < 9; i++) R(c, 10 + i * 36, 0, 5, 150, '#2c2c34');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};
/* ---- GM: May 10, 1994 ---- */
const GM = {
  name: '死刑執行', bgm: 'requiem',
  init(S) { S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    nightSky(c, t, 150, [K.night0, K.night1, K.night2]);
    R(c, 0, 90, W, 60, '#4c4c54'); for (let x = 0; x < W; x += 16) R(c, x, 90, 1, 60, '#3c3c44'); R(c, 0, 84, W, 6, '#5c5c64');
    for (let x = 4; x < W; x += 12) { L(c, x, 84, x + 6, 74, '#8c8c94'); L(c, x + 6, 74, x + 12, 84, '#8c8c94'); }
    R(c, 140, 40, 24, 50, '#3c3c44'); R(c, 136, 36, 32, 6, '#2c2c34'); R(c, 146, 46, 12, 6, K.win1); beam(c, 152, 50, 1.2 + Math.sin(t * 0.8) * 0.5, 140, 0.12, 0.25);
    R(c, 0, 150, W, 90, '#2c2c30');
    yearFlash(c, t, 0.3, 1994, 212, 12, '執行'); capPlate(c, t, 0.6, ['1994年5月10日', 'イリノイ州の刑務所']);
    return { z: 1 + 0.05 * ss(t / S.dur), fx: 160, fy: 100 };
  }
};
/* ---- GN: the other face; 33 lives ---- */
const GN = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tSplit = at(S, 'L25', 1) - 0.2; S.tCand = at(S, 'L26', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t < S.tCand) {
      VG(c, 0, 0, W, H, ['#0c0c14', '#141420', '#0c0c14']);
      const k = eOut(sg(t, S.tSplit, S.tSplit + 0.8));
      if (k <= 0) bigFace(c, pogoFace({ blink: blinkOf(t, 12) }), 160, 86, 2, 1, 'p7');
      else { c.save(); c.beginPath(); c.rect(0, 0, 160, H); c.clip(); bigFace(c, pogoFace({ expr: 'cold', blink: blinkOf(t, 12) }), 160, 86, 2, 1, 'p7'); c.restore();
        c.save(); c.beginPath(); c.rect(160, 0, W - 160, H); c.clip(); bigFace(c, pogoFace({ expr: 'cold' }), 160, 86, 2, 1, 'p7b'); bigFace(c, gacyFace({ blink: blinkOf(t, 31) }), 160, 86, 2, k, 'g7'); c.restore();
        for (let y = 30; y < 140; y += 2) P(c, 160 + Math.round(Math.sin(y * 0.5) * 2), y, K.red0); }
      return { z: 1, fx: 160, fy: 100 };
    }
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']);
    candleRows(c, t, 33, 33, 50, 60, 11, 22, 22);
    const fl = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 4.3); E(c, 160, 150, 40, 16, DA(K.win1, 0.1 + 0.05 * fl));
    return { z: 1 + 0.1 * ss(sg(t, S.tCand, S.tEnd + 2)), fx: 160, fy: 100 };
  }
};
/* ---- Shorts only ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'pulse',
  init(S) { S.tDown = at(S, 'S1', 2) - 0.3; S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) {
    if (t < S.tDown) { VG(c, 0, 0, W, H, ['#06040a', '#140812', '#06040a']); bigFace(c, pogoFace({ blink: blinkOf(t, 12) }), 160, 90, 2, Math.min(1, t / 0.5), 'sp1');
      [[60, '#e83c3c', '#a01c1c'], [270, '#3c8cd8', '#1c5c9c']].forEach(([x, a, b], i) => balloon(c, x, 60 + Math.sin(t * 1.4 + i) * 3, a, b, t, i)); return { z: 1, fx: 160, fy: 100 }; }
    const k = ss(sg(t, S.tDown, S.tDown + 1.4)); crossSection(c, t, 24, { blood: true }); blit(c, clownSpr(t), 150, 90, 12, 43, { s: 1.2 });
    if (k < 1) { c.fillStyle = '#000000'; c.fillRect(0, 102 + 60 * k, W, 140); }
    return { z: 1 + 0.3 * (1 - k), fx: 150, fy: lerp(70, 120, k) };
  }
};
const SS2 = {
  name: 'ショート締め', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 2.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#2c0a14', '#06040a']);
    for (let i = 0; i < 22; i++) { const a = i / 22 * TAU + t * 0.1, w = 0.05; PF(c, [160, 72, 160 + Math.cos(a - w) * 260, 72 + Math.sin(a - w) * 260, 160 + Math.cos(a + w) * 260, 72 + Math.sin(a + w) * 260], DA(K.red0, 0.16)); }
    bigFace(c, pogoFace({ expr: 'creepy', blink: blinkOf(t, 12) }), 160, 72, 2, 1, 'ss2'); redVignette(c, 0.6);
    const t1 = lastSe(S) - 1.4; if (t > t1) { const k = eOut(sg(t, t1, t1 + 0.4)), s = '▶ 続きは本編で'; R(c, 60, 126, 200, Math.round(30 * k), '#000000'); R(c, 62, 128, 196, Math.round(26 * k), K.red1); if (k >= 1) TX(c, s, 160 - textSpr(s, 16, C.white).width / 2, 133, C.white, 16, null); }
    return { z: 1, fx: 160, fy: 100 };
  }
};

/* ---- GX: horror close-up (no narration) ---- */
const GX = { name: 'ピエロの素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, pogoFace({ expr: 'creepy', blink: 0 }), [[19, 21], [31, 21]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };
