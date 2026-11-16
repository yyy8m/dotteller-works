/* ================= 記録 #015 ゾディアック事件: scenes ================= */
const GY = 150;

/* ---- ZX: cold open — letters fly into a dark newsroom; the symbol; the score (moves: letters spin in, cipher glyphs flicker, the symbol pulses) ---- */
const ZX = withCuts({
  name: '名乗る殺人者', ch: '私はゾディアックだ', bgm: 'eerie',
  init(S) { S.tScore = at(S, 'C1', 2) - 0.3; S.tNow = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tNow) { streetSF(c, t, {}); dim(c, 0.35); crosshair(c, 160, 70, 34, t); TX(c, '1968〜', 120, 112, '#f4f0e8', 16, '#000000'); return { z: 1.03 + 0.05 * ss(sg(t, S.tNow, S.dur)), fx: 160, fy: 90 }; }
    newsroom(c, t);
    for (let i = 0; i < 6; i++) { const t0 = 0.4 + i * 0.7; if (t < t0) continue; const u = eOut(sg(t, t0, t0 + 0.6)); c.save(); c.translate(lerp(160, 30 + i * 46, u), lerp(-40, 30 + (i % 2) * 20, u)); c.rotate((1 - u) * 3 + (i - 3) * 0.06); letter(c, -20, -26, 40, 52, { sym: true }); c.restore(); }
    if (t > S.tScore) scoreBoard(c, 85, 92, 37, 0, sg(t, S.tScore, S.tScore + 0.4));
    else { cipherGrid(c, 110, 92, 8, 2, t, { hl: true, seed: 3 }); }
    return { z: 1.03, fx: 160, fy: 90 };
  }
}, [['M1', (c, t, S) => { R(c, 0, 0, W, H, '#06060a'); crosshair(c, 160, 72, 46 + Math.sin(t * 3) * 3, t); return { z: 1.05, fx: 160, fy: 100 }; }]]);

/* ---- ZA: Dec 20, 1968 — Lake Herman Road (moves: headlights arrive, muzzle flashes, then police lights) ---- */
const ZA = {
  name: 'レイク・ハーマン道路', ch: '最初の事件', bgm: 'dread',
  init(S) { S.tCar2 = at(S, 'L4', 1) - 0.3; S.tGun = at(S, 'L4', 3) - 0.3; S.tShot = at(S, 'L5', 2) - 0.3; S.tAfter = at(S, 'L5', 5) - 0.3; S.tNone = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    nightSkyCA(c, t); hills(c, 112); R(c, 0, 120, W, 120, '#2c2a24'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, 124 + hash(i * 5) * 100, '#4c4838');
    if (t > S.tNone) { // morning after: police lights, an empty car, a dark stain
      oldCar(c, 120, GY, { col: '#5c6c7c', door: true }); E(c, 220, GY + 2, 16, 4, '#4c0c0c'); const b = Math.floor(t * 4) & 1; glow(c, 40, 120, 30, 16, b ? '#e81c1c' : '#2c5cf8', 0.4); oldCar(c, 10, GY + 10, { col: '#e8e8e0' }); R(c, 36, GY - 32, 12, 4, b ? '#e81c1c' : '#2c5cf8');
      person(c, COPS[0], 270, GY + 8, { k: 'za', flip: true }); stamp(c, t, S.tNone + 1.2, 220, 60, '手がかりなし', 110);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    oldCar(c, 120, GY, { col: '#5c6c7c', lit: t < S.tShot });
    if (t < S.tShot) { inCar(c, TEENS[0], 120, GY, 0); inCar(c, TEENS[1], 120, GY, 1, { flip: true }); }
    if (t > S.tCar2) { const u = eOut(sg(t, S.tCar2, S.tCar2 + 1.4)); oldCar(c, lerp(-90, 10, u), GY + 6, { col: '#2c2c34', head: u < 1 }); }
    if (t > S.tGun) { shadow(c, ZOD, 100, GY + 8, { k: 'za', arm: 'fwd', weapon: 'flash' }); muzzle(c, 118, GY - 22, t, S.tShot, 1, 6, 0.28); }
    if (t > S.tAfter) { dim(c, 0.4 * sg(t, S.tAfter, S.tAfter + 1)); E(c, 230, GY + 4, 14 * sg(t, S.tAfter, S.tAfter + 2), 4, '#5c0c0c'); }
    if (t < S.tCar2) { yearFlash(c, t, 0.3, 1968, 216, 10, '12月20日'); capPlate(c, t, 0.6, ['カリフォルニア州', 'レイク・ハーマン道路']); }
    return { z: 1.04 + 0.04 * ss(sg(t, S.tGun, S.tAfter)), fx: 150, fy: 110, sx: t > S.tShot && t < S.tShot + 1.6 ? Math.round(Math.sin(t * 60)) : 0 };
  }
};

/* ---- ZB: July 4, 1969 — fireworks, the park, the flashlight; the call from a phone booth (moves: fireworks, the beam, the receiver) ---- */
const ZB = withCuts({
  name: 'ブルー・ロック・スプリングス', ch: '犯人からの電話', bgm: 'dread',
  init(S) { S.tBack = at(S, 'L8', 5) - 0.3; S.tShot = at(S, 'L9', 2) - 0.3; S.tAgain = at(S, 'L9', 6) - 0.3; S.tCall = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCall) { R(c, 0, 0, W, H, '#0c0c14'); nightSkyCA(c, t); R(c, 0, 120, W, 120, '#2c2c30'); R(c, 180, 70, 120, 50, '#4c4c54'); R(c, 180, 64, 120, 8, '#c83c3c'); TX(c, 'GAS', 220, 70, '#f4f0e8', 16, null); glow(c, 240, 90, 50, 20, '#f8f0c0', 0.25); phoneBooth(c, 100, GY, t); shadow(c, ZOD, 115, GY - 2, { k: 'ph', arm: 'up' }); TX(c, '0:40', 20, 56, '#f8e070', 16, '#000000'); if (t > at(S, 'L12', 2) - 0.3) { R(c, 150, 30, 140, 24, '#000000'); TX(c, '警察署のすぐ近く', 156, 34, '#f8e070', 16, null); } return { z: 1.04, fx: 130, fy: 100 }; }
    nightSkyCA(c, t); for (let i = 0; i < 4; i++) fireworks(c, t, 60 + i * 70, 40 + (i % 2) * 14, i); hills(c, 112, '#1c241c'); R(c, 0, 120, W, 120, '#24301c'); for (let i = 0; i < 5; i++) { const x = 20 + i * 70; R(c, x, 84, 3, 36, '#2c2018'); E(c, x + 1, 80, 14, 12, '#1c3c1c'); }
    oldCar(c, 130, GY, { col: '#8c6c9c' }); inCar(c, PAIR2[0], 130, GY, 0); inCar(c, PAIR2[1], 130, GY, 1, { flip: true });
    const away = t < S.tBack ? sg(t, 0.4, 2) - sg(t, 3, 5) : 1; oldCar(c, lerp(-90, 30, away), GY + 6, { col: '#2c2c34', head: true });
    if (t > S.tShot - 1.6) { shadow(c, ZOD, 120, GY + 10, { k: 'zb', arm: 'fwd', weapon: 'flash' }); c.save(); c.globalAlpha = 0.25; PF(c, [132, GY - 24, 220, GY - 50, 220, GY - 4], '#f8f8d0'); c.restore(); muzzle(c, 136, GY - 22, t, S.tShot, 1, 5, 0.25); muzzle(c, 136, GY - 22, t, S.tAgain, 1, 4, 0.25); }
    yearFlash(c, t, 0.3, 1969, 216, 10, '7月4日');
    return { z: 1.04, fx: 150, fy: 110, sx: (t > S.tShot && t < S.tShot + 1.3) || (t > S.tAgain && t < S.tAgain + 1) ? Math.round(Math.sin(t * 60)) : 0 };
  }
}, [['V1', (c, t, S) => closeUp(c, t, sketchFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#06060a', '#2c0c10'], glow: '#c81818', spk: 'zodiac' })]]);

/* ---- ZC: the letters and the 408 cipher; "This is the Zodiac speaking"; the Hardens solve it (moves: presses roll, glyphs flip into words) ---- */
const ZC = withCuts({
  name: '暗号の手紙', ch: '408の暗号', bgm: 'pulse',
  init(S) { S.tThreat = at(S, 'L14', 0) - 0.3; S.tName = at(S, 'L15', 0) - 0.3; S.tCouple = at(S, 'L17', 0) - 0.3; S.tText = at(S, 'L18', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCouple) { // a kitchen table in Salinas
      R(c, 0, 0, W, H, '#4c3c2c'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#54442e'); R(c, 0, 150, W, 90, '#3c2c1c'); glow(c, 160, 40, 90, 40, '#f8e0a0', 0.25 + 0.04 * Math.sin(t * 3));
      R(c, 60, 118, 200, 8, '#7c5c3c'); person(c, HARDEN[0], 90, 162, { k: 'hd', arm: 'point', blink: blinkOf(t, 3) }); person(c, HARDEN[1], 240, 162, { k: 'hb', flip: true, blink: blinkOf(t + 1, 4) });
      if (t < S.tText) cipherGrid(c, 112, 60, 8, 3, t, { hl: true, seed: 7 });
      else { R(c, 60, 30, 200, 80, '#f0e8d4'); TX(c, 'I LIKE KILLING', 72, 36, '#2c2c34', 16, null); TX(c, 'PEOPLE...', 72, 54, '#2c2c34', 16, null); TX(c, 'SLAVES', 72, 72, '#c81818', 16, null); if (t > at(S, 'L19', 4) - 0.3) stamp(c, t, at(S, 'L19', 5), 210, 90, '名前なし', 80); }
      return { z: 1.03, fx: 160, fy: 90 };
    }
    newsroom(c, t);
    if (t < S.tName) { for (let i = 0; i < 3; i++) { const u = eOut(sg(t, 0.4 + i * 0.6, 1 + i * 0.6)); if (u <= 0) continue; const x = 26 + i * 100; c.save(); c.globalAlpha = u; letter(c, x, lerp(40, 60, u), 70, 70); if (u >= 1) cipherGrid(c, x + 10, 80, 4, 2, t, { seed: i * 5, bg: '#f0e8d4' }); c.restore(); } if (t > S.tThreat) { dim(c, 0.4); bigCap(c, '12人を殺す', 28, 24, '#e81c1c', sg(t, at(S, 'L14', 4) - 0.3, at(S, 'L14', 4))); } if (t < S.tThreat) yearFlash(c, t, 0.3, 1969, 216, 2, '8月1日'); return { z: 1.03, fx: 160, fy: 90 }; }
    letter(c, 90, 20, 140, 100, { sym: true }); TX(c, 'Dear Editor', 100, 26, '#2c4c8c', 16, null); TX(c, 'This is the', 100, 46, '#2c4c8c', 16, null); TX(c, 'Zodiac speaking', 100, 64, '#c81818', 16, null);
    return { z: 1.04, fx: 160, fy: 70 };
  }
}, [['V2', (c, t, S) => closeUp(c, t, sketchFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#06060a', '#2c0c10'], glow: '#c81818', spk: 'zodiac' })]]);

/* ---- ZD: Sept 27, 1969 — Lake Berryessa, the hooded man, the knife, the car door (moves: water ripples, the knife glints, the pen writes) ---- */
const ZD = {
  name: 'ベリエッサ湖', ch: '黒いフードの男', bgm: 'dread',
  init(S) { S.tHood = at(S, 'L21', 0) - 0.3; S.tTie = at(S, 'L22', 2) - 0.3; S.tKnife = at(S, 'L23', 0) - 0.3; S.tDoor = at(S, 'L25', 0) - 0.3; S.tCall = at(S, 'L26', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCall) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 0, 150, W, 90, '#2c2c34'); R(c, 100, 50, 180, 100, '#5c5c64'); TX(c, 'CAR WASH', 140, 56, '#f4f0e8', 16, null); phoneBooth(c, 150, GY, t, { hang: true }); capPlate(c, t - S.tCall, 0.3, ['ナパ', '受話器は外れたまま']); return { z: 1.05, fx: 165, fy: 110 }; }
    if (t > S.tDoor) { R(c, 0, 0, W, H, '#c8c0b0'); R(c, 20, 20, 280, 120, '#e8e4dc'); R(c, 20, 20, 280, 6, '#a8a49c'); const k = sg(t, S.tDoor + 0.3, S.tDoor + 2.5); c.save(); c.beginPath(); c.rect(20, 20, 280 * k, 120); c.clip(); zsym(c, 90, 70, 26, '#141414', 3); TX(c, 'Vallejo', 140, 34, '#141414', 16, null); TX(c, '12-20-68', 140, 52, '#141414', 16, null); TX(c, '7-4-69', 140, 70, '#141414', 16, null); TX(c, 'Sept 27-69-6:30', 140, 88, '#141414', 16, null); TX(c, 'by knife', 140, 106, '#c81818', 16, null); c.restore(); return { z: 1.04, fx: 160, fy: 80 }; }
    VG(c, 0, 0, W, 100, ['#5c9cd8', '#9cc8ec', '#d8ecf4']); hills(c, 96, '#7c8c5c'); R(c, 0, 100, W, 40, '#3c7cb0'); for (let i = 0; i < 10; i++) R(c, mod(i * 41 + t * 12, W), 106 + (i % 4) * 8, 14, 1, '#9cc8ec'); R(c, 0, 136, W, 104, '#a89c6c'); R(c, 100, 146, 70, 4, '#c83c3c');
    const kneel = t > S.tTie; person(c, PAIR3[0], 120, GY + 6, { k: 'p3', expr: t > S.tHood ? 'shock' : 'smile' }); person(c, PAIR3[1], 150, GY + 6, { k: 'p3', flip: true, expr: t > S.tHood ? 'shock' : 'smile' });
    if (kneel) { L(c, 112, GY - 18, 126, GY - 14, '#f4f0e8', 2); L(c, 142, GY - 18, 156, GY - 14, '#f4f0e8', 2); }
    if (t > S.tHood) { const u = eOut(sg(t, S.tHood, S.tHood + 2)); const x = lerp(330, 230, u); blit(c, modFig(ZODHOOD, { k: 'hood', arm: t > S.tKnife ? 'stab' : 'fwd', weapon: t > S.tKnife ? 'knife' : null }), x, GY + 8, FIG_AX2, FIG_AY2, { flip: true, s: 1.3 }); R(c, x - 10, GY - 64, 6, 3, '#3c3c3c'); R(c, x - 2, GY - 64, 6, 3, '#3c3c3c'); zsym(c, x - 4, GY - 38, 5, '#f4f0e8', 1); if (t > S.tKnife) { glow(c, x - 24, GY - 56, 8, 6, '#ffffff', 0.5 + 0.5 * Math.sin(t * 9)); dim(c, 0.35 * sg(t, S.tKnife + 0.5, S.tKnife + 1.5), '#3c0000'); } }
    if (t > at(S, 'L24', 0) - 0.3) { for (let i = 0; i < 6; i++) E(c, 110 + i * 9, GY + 6 + (i & 1) * 2, 4 * sg(t, at(S, 'L24', 0), at(S, 'L24', 2)), 2, '#7c0c0c'); }
    if (t < S.tHood) { yearFlash(c, t, 0.3, 1969, 216, 10, '9月27日'); capPlate(c, t, 0.6, ['ナパ郡', 'ベリエッサ湖']); }
    return { z: 1.03 + 0.05 * ss(sg(t, S.tHood, S.tKnife)), fx: 180, fy: 110, sx: t > S.tKnife && t < S.tKnife + 0.6 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- ZE: Oct 11 — the taxi in Presidio Heights; three boys; the cops pass the man; the bloody shirt; the school-bus threat; 2,500 suspects (moves: taxi rolls, siren lights, files pile) ---- */
const ZE = {
  name: 'プレシディオ・ハイツ', ch: 'タクシー運転手', bgm: 'pulse',
  init(S) { S.tShot = at(S, 'L28', 4) - 0.3; S.tBoys = at(S, 'L30', 0) - 0.3; S.tCops = at(S, 'L31', 0) - 0.3; S.tShirt = at(S, 'L33', 0) - 0.3; S.tBus = at(S, 'L34', 2) - 0.3; S.tLast = at(S, 'L35', 0) - 0.3; S.tFiles = at(S, 'L35a', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFiles) { R(c, 0, 0, W, H, '#2c2c34'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#34343c'); R(c, 0, 150, W, 90, '#24242c'); R(c, 40, 110, 240, 8, '#5c4c3c'); const n = Math.floor(sg(t, S.tFiles + 0.3, at(S, 'L35a', 3)) * 40); for (let i = 0; i < n; i++) R(c, 50 + (i % 8) * 28, 104 - Math.floor(i / 8) * 6, 24, 5, ['#e8dcc0', '#c8a868', '#a8c8d8'][i % 3]); person(c, TOSCHI, 280, 162, { k: 'ts', flip: true, blink: blinkOf(t, 4) }); R(c, 150, 56, 124, 26, '#000000'); TX(c, '容疑者 2,500人', 156, 60, '#f8e070', 16, null); return { z: 1.03, fx: 170, fy: 100 }; }
    if (t > S.tShirt) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 70, 140, 60, '#f8d8a0', 0.18); letter(c, 40, 20, 110, 110, { sym: true }); R(c, 180, 50, 60, 40, '#e8e4dc'); for (let i = 0; i < 9; i++) E(c, 190 + hash(i) * 40, 60 + hash(i * 3) * 24, 3 + hash(i * 7) * 5, 2 + hash(i * 5) * 4, '#8c1c1c'); if (t > S.tLast) { dim(c, 0.85); bigCap(c, '確認された最後の事件', 70, 24, '#f4f0e8', sg(t, S.tLast + 0.4, S.tLast + 0.8)); } else if (t > S.tBus) { dim(c, 0.4); schoolBus(c, 100, 140); stamp(c, t, S.tBus + 0.4, 230, 60, '子どもを狙う', 110); } return { z: 1.03, fx: 160, fy: 80 }; }
    streetSF(c, t);
    if (t < S.tCops) { taxi(c, 120, GY); inCar(c, STINE, 120, GY, 1, { k: 'st' }); if (t > S.tShot - 1) { c.save(); c.beginPath(); c.rect(144, GY - 28, 14, 9); c.clip(); blit(c, tintSpr(modFig(ZOD, { k: 'tx' }), '#06060a', 'zdtx'), 151, GY + 10, FIG_AX2, FIG_AY2, { s: 0.7 }); c.restore(); } muzzle(c, 150, GY - 28, t, S.tShot, 1, 1); if (t > S.tShot + 0.3) { E(c, 168, GY - 26, 6 * sg(t, S.tShot, S.tShot + 2), 3, '#8c0c0c'); } if (t > S.tBoys) { R(c, 230, 64, 60, 30, '#f8d880'); for (let i = 0; i < 3; i++) person(c, BOYS[i], 242 + i * 16, 96, { k: 'by', flip: true, s: 0.5, expr: 'shock' }); } }
    else { const u = sg(t, S.tCops, S.dur); const b = Math.floor(t * 4) & 1; oldCar(c, lerp(-80, 140, u), GY + 8, { col: '#e8e8e0', head: true }); R(c, lerp(-80, 140, u) + 34, GY - 34, 12, 4, b ? '#e81c1c' : '#2c5cf8'); shadow(c, ZOD, 250, GY + 2, { k: 'wk', f: Math.floor(t * 4) & 3, flip: true }); if (t > at(S, 'L32', 0) - 0.3) { R(c, 20, 56, 150, 24, '#000000'); TX(c, '無線「犯人は黒人」', 24, 60, '#f8e070', 16, null); } }
    yearFlash(c, t, 0.3, 1969, 216, 10, '10月11日');
    return { z: 1.04, fx: 160, fy: 110, sx: t > S.tShot && t < S.tShot + 0.4 ? Math.round(Math.sin(t * 60) * 2) : 0 };
  }
};

/* ---- ZF: the 340 cipher; March 1970 — Kathleen Johns on the highway (moves: headlights, the wheel rolls off, a flashlight sweeps the field, fire) ---- */
const ZF = {
  name: '340の暗号と誘拐未遂', ch: '誘拐未遂', bgm: 'dread',
  init(S) { S.tK = at(S, 'L36a', 0) - 0.3; S.tFix = at(S, 'L36b', 0) - 0.3; S.tOff = at(S, 'L36c', 0) - 0.3; S.tRide = at(S, 'L36d', 0) - 0.3; S.tRun = at(S, 'L36e', 0) - 0.3; S.tStation = at(S, 'L36f', 0) - 0.3; S.tFire = at(S, 'L36g', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tK) { R(c, 0, 0, W, H, '#14100c'); glow(c, 160, 80, 140, 70, '#f8e8b0', 0.15); cipherGrid(c, 56, 44, 17, 5, t, { hl: true, seed: 11 }); R(c, 200, 6, 104, 24, '#000000'); TX(c, '340の記号', 208, 10, '#f8e070', 16, null); return { z: 1.03, fx: 160, fy: 70 }; }
    if (t > S.tFire) { nightSkyCA(c, t); R(c, 0, 120, W, 120, '#24201c'); oldCar(c, 120, GY, { col: '#3c3c34' }); for (let i = 0; i < 10; i++) flame(c, 130 + i * 7, GY - 22 - hash(i) * 6, 1.1, t, i); glow(c, 160, 120, 60, 30, '#f86820', 0.35); if (t > at(S, 'L36g', 3) - 0.3) { letter(c, 230, 30, 70, 80, { sym: true }); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tStation) { R(c, 0, 0, W, H, '#c8c4b8'); for (let x = 0; x < W; x += 40) R(c, x, 0, 2, 150, '#b0aca0'); R(c, 0, 150, W, 90, '#8c8478'); R(c, 200, 46, 70, 84, '#f0e8d4'); blit(c, sketchFace({}), 235, 94, 24, 24, { s: 1.2 }); TX(c, 'WANTED', 206, 46, '#c81818', 16, null); person(c, KATH, 120, 162, { k: 'kst', expr: 'shock', arm: 'point' }); person(c, COPS[1], 60, 162, { k: 'kst' }); return { z: 1.04, fx: 170, fy: 100 }; }
    if (t > S.tRun) { R(c, 0, 0, W, H, '#05060c'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * 70, '#8c94b8'); R(c, 0, 110, W, 130, '#141c10'); for (let i = 0; i < 30; i++) L(c, hash(i) * W, 110 + hash(i * 3) * 40, hash(i) * W + 2, 100 + hash(i * 3) * 40, '#24301c', 2); const a = Math.PI + 0.3 + Math.sin(t * 0.9) * 0.5; c.save(); c.globalAlpha = 0.22; PF(c, [270, 120, 270 + Math.cos(a - 0.15) * 260, 120 + Math.sin(a - 0.15) * 260, 270 + Math.cos(a + 0.15) * 260, 120 + Math.sin(a + 0.15) * 260], '#f8f8d0'); c.restore(); shadow(c, ZOD, 280, 140, { k: 'fl', arm: 'fwd', flip: true }); person(c, KATH, 70, 152, { k: 'hide', expr: 'shock', s: 0.8 }); return { z: 1.04, fx: 160, fy: 110 }; }
    // the highway at night
    nightSkyCA(c, t); hills(c, 112, '#141c1c'); R(c, 0, 120, W, 120, '#24242a'); for (let i = 0; i < 8; i++) R(c, mod(i * 50 - t * (t > S.tRide ? 70 : 30), W + 40) - 20, 168, 22, 2, '#e8e0a0');
    if (t < S.tRide) { oldCar(c, 140, GY + 10, { col: '#7c5c3c', lit: true }); inCar(c, KATH, 140, GY + 10, 0); oldCar(c, 30, GY + 10, { col: '#2c2c34', head: true }); if (t > S.tFix) { shadow(c, ZOD, 120, GY + 12, { k: 'fx', arm: 'dig' }); } if (t > S.tOff) { const u = sg(t, S.tOff + 0.4, S.tOff + 2); E(c, 156 + u * 80, GY + 6 + Math.abs(Math.sin(u * 12)) * -6, 7, 7, '#141414'); } }
    else { oldCar(c, 140, GY + 10, { col: '#2c2c34', head: true }); inCar(c, KATH, 140, GY + 10, 0, { k: 'kr', expr: 'shock' }); c.save(); c.beginPath(); c.rect(181, GY - 18, 14, 9); c.clip(); blit(c, tintSpr(modFig(ZOD, { k: 'dr' }), '#06060a', 'zddr'), 188, GY + 20, FIG_AX2, FIG_AY2, { s: 0.7 }); c.restore(); R(c, 20, 56, 90, 24, '#000000'); TX(c, '約90分', 30, 60, '#f8e070', 16, null); }
    if (t < S.tFix) { yearFlash(c, t, S.tK + 0.2, 1970, 216, 10, '3月22日'); capPlate(c, t - S.tK, 0.6, ['州道132号線', 'キャスリーン・ジョーンズ']); }
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- ZG: the letters keep coming — bomb, map, score; the Halloween card; 1974, silence (moves: cards pin onto a board, the score ticks up) ---- */
const ZG = withCuts({
  name: '届き続ける手紙', ch: '得点', bgm: 'eerie',
  init(S) { S.tCard = at(S, 'L38', 0) - 0.3; S.t74 = at(S, 'L39', 0) - 0.3; S.tQuiet = at(S, 'L39', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.t74) { R(c, 0, 0, W, H, '#0c0c10'); const n = Math.min(37, Math.floor(sg(t, S.t74 + 0.3, S.tQuiet) * 37)); scoreBoard(c, 50, 60, n, 0, 1); yearFlash(c, t, S.t74 + 0.2, 1974, 216, 10, '1月'); if (t > S.tQuiet) dim(c, 0.6 * sg(t, S.tQuiet, S.tQuiet + 2)); return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tCard) { R(c, 0, 0, W, H, '#1c140c'); glow(c, 160, 80, 120, 60, '#f88020', 0.2); R(c, 90, 20, 140, 110, '#e88020'); R(c, 96, 26, 128, 98, '#1c140c'); E(c, 160, 64, 26, 22, '#e88020'); PF(c, [148, 56, 154, 50, 158, 58], '#1c140c'); PF(c, [162, 58, 166, 50, 172, 56], '#1c140c'); R(c, 148, 70, 24, 4, '#1c140c'); TX(c, 'Peek-a-boo', 112, 96, '#f4f0e8', 16, null); zsym(c, 210, 110, 6, '#f4f0e8', 1); return { z: 1.04, fx: 160, fy: 76 }; }
    R(c, 0, 0, W, H, '#5c4430'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * H, '#4c3824');
    const items = [[1, (x, y) => { letter(c, x, y, 70, 70); E(c, x + 35, y + 38, 14, 10, '#2c2c2c'); L(c, x + 35, y + 28, x + 44, y + 16, '#2c2c2c', 2); glow(c, x + 46, y + 14, 6, 6, '#f8a020', 0.6 + 0.4 * Math.sin(t * 9)); }], [3, (x, y) => { R(c, x, y, 80, 70, '#c8d8b0'); for (let k = 0; k < 4; k++) L(c, x + 4, y + 10 + k * 16, x + 76, y + 6 + k * 16, '#c86c3c'); zsym(c, x + 40, y + 34, 12, '#141414', 2); }], [6, (x, y) => { scoreBoard(c, x - 30, y + 14, Math.floor(sg(t, at(S, 'L37', 6), at(S, 'L37', 7) + 1) * 13), 0, 1); }]];
    items.forEach(([seg, fn], i) => { const t0 = at(S, 'L37', seg) - 0.3; if (t < t0) return; const u = eOut(sg(t, t0, t0 + 0.4)); c.save(); c.globalAlpha = u; fn(20 + i * 100, 30); c.restore(); });
    return { z: 1.03, fx: 160, fy: 80 };
  }
}, [['V3', (c, t, S) => closeUp(c, t, sketchFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#1c0c04', '#5c2c0c'], glow: '#f88020', spk: 'zodiac' })]]);

/* ---- ZH: Arthur Leigh Allen — the typewriter, the watch, the photo line-up; handwriting, the officer, DNA (moves: keys strike, the watch ticks, the DNA bars compare) ---- */
const ZH = {
  name: 'アーサー・リー・アレン', ch: '最有力の容疑者', bgm: 'pulse',
  init(S) { S.tHome = at(S, 'L41', 0) - 0.3; S.tProps = at(S, 'L42', 0) - 0.3; S.tPhoto = at(S, 'L43', 0) - 0.3; S.tBut = at(S, 'L44', 0) - 0.3; S.tDNA = at(S, 'L45', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDNA) { R(c, 0, 0, W, H, '#0c1424'); R(c, 30, 30, 260, 90, '#1c2c44'); TX(c, 'ZODIAC', 40, 34, '#8cc8f8', 16, null); TX(c, 'ALLEN', 40, 74, '#f8e070', 16, null); for (let i = 0; i < 16; i++) { const h1 = 6 + hash(i) * 14, h2 = 6 + hash(i * 9) * 14, k = sg(t, S.tDNA + 0.3 + i * 0.1, S.tDNA + 0.6 + i * 0.1); R(c, 110 + i * 10, 58 - h1 * k, 6, h1 * k, '#8cc8f8'); R(c, 110 + i * 10, 100 - h2 * k, 6, h2 * k, '#f8e070'); } if (t > at(S, 'L45', 3) - 0.3) stamp(c, t, at(S, 'L45', 3), 160, 100, '不一致', 80); yearFlash(c, t, S.tDNA + 0.2, 2002, 216, 6, 'DNA鑑定'); return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tBut) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 70, 140, 60, '#f8d8a0', 0.15); letter(c, 30, 20, 110, 100, { sym: true }); R(c, 180, 20, 110, 100, '#f0e8d4'); for (let i = 0; i < 12; i++) L(c, 186, 28 + i * 7, 280 - (i * 9 % 30), 28 + i * 7 + Math.sin(i + t) * 1, '#3c3c44'); TX(c, '≠', 150, 60, '#e81c1c', 24, '#000000'); if (t > at(S, 'L44', 4) - 0.3) { dim(c, 0.5); person(c, COPS[0], 100, 132, { k: 'fk', arm: 'point' }); shadow(c, ZOD, 170, 132, { k: 'cmp' }); person(c, ALLEN, 240, 132, { k: 'cmp', flip: true }); } return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tPhoto) { R(c, 0, 0, W, H, '#2c2c34'); for (let i = 0; i < 5; i++) { const x = 20 + i * 58; R(c, x, 60, 50, 64, '#e8e4dc'); blit(c, modFig(i === 2 ? ALLEN : { ...ALLEN, id: 'lu' + i, hairStyle: ['short', 'side', 'short', 'curly', 'short'][i], glasses: i % 2 === 0, heavy: false }, { k: 'lu' }), x + 25, 122, FIG_AX2, FIG_AY2, { s: 0.9 }); } if (t > at(S, 'L43', 2) - 0.3) { ER(c, 161, 92, 30, 38, '#e81c1c'); } bigCap(c, '1992年 写真の面通し', 30, 16, '#f8e070', 1); return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tProps) { R(c, 0, 0, W, H, '#3c3428'); R(c, 0, 120, W, 120, '#2c2418'); R(c, 40, 80, 120, 40, '#3c3c40'); for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) { const down = Math.floor(t * 8 + k * 3 + r) % 11 === 0; E(c, 52 + k * 12, 92 + r * 8 + (down ? 1 : 0), 4, 3, '#c8c8c0'); } R(c, 60, 60, 80, 22, '#f0e8d4'); TX(c, 'ROYAL', 76, 38, '#c8a040', 16, '#000000'); E(c, 240, 90, 30, 30, '#c8c8d0'); E(c, 240, 90, 26, 26, '#f4f4f0'); const a = t * 1.5; L(c, 240, 90, 240 + Math.cos(a) * 20, 90 + Math.sin(a) * 20, '#1c1c1c', 2); L(c, 240, 90, 240 + Math.cos(a / 12) * 14, 90 + Math.sin(a / 12) * 14, '#1c1c1c', 2); TX(c, 'ZODIAC', 214, 36, '#e81c1c', 16, '#000000'); return { z: 1.03, fx: 160, fy: 80 }; }
    // Vallejo: his house near the scenes
    nightSkyCA(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#4c4c3c'); R(c, 80, 76, 110, 50, '#a89c88'); PF(c, [72, 78, 135, 52, 198, 78], '#5c3c2c'); R(c, 124, 100, 18, 26, '#3c2c1c'); R(c, 92, 90, 20, 14, '#f8d880');
    person(c, ALLEN, 220, 160, { k: 'al', blink: blinkOf(t, 3), flip: true }); if (t > S.tHome) TX(c, '現場まで数分', 40, 56, '#f8e070', 16, '#000000');
    capPlate(c, t, 0.4, ['容疑者', 'アーサー・リー・アレン']);
    return { z: 1.04, fx: 170, fy: 100 };
  }
};

/* ---- ZI: Dec 2020 — three solvers in three countries crack Z-340 (moves: monitors flicker, the grid turns into words) ---- */
const ZI = {
  name: '解かれた暗号', ch: '51年後の解読', bgm: 'memory',
  init(S) { S.tWho = at(S, 'L47', 0) - 0.3; S.tText = at(S, 'L48', 0) - 0.3; S.tNo = at(S, 'L49', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#0c1424');
    if (t > S.tText) { R(c, 30, 24, 260, 100, '#f0e8d4'); const k = sg(t, S.tText, S.tText + 3); const lines = ['I AM NOT AFRAID OF', 'THE GAS CHAMBER', 'PARADICE']; lines.forEach((s, i) => { const n = Math.floor(k * 3 * s.length - i * s.length); if (n > 0) TX(c, s.slice(0, n), 44, 32 + i * 26, i === 2 ? '#c81818' : '#2c2c34', 16, null); }); if (t > S.tNo) stamp(c, t, S.tNo + 0.3, 220, 110, '名前なし', 80); return { z: 1.03, fx: 160, fy: 76 }; }
    if (t > S.tWho) { ['アメリカ', 'オーストラリア', 'ベルギー'].forEach((s, i) => { const x = 14 + i * 104; R(c, x, 44, 90, 60, '#2c2c34'); R(c, x + 4, 48, 82, 44, '#0c2c1c'); for (let k = 0; k < 5; k++) R(c, x + 8, 52 + k * 8, 20 + hash(k + i * 7 + Math.floor(t * 3)) * 50, 2, '#4cf87c'); person(c, SOLVERS[i], x + 45, 134, { k: 'sv', blink: blinkOf(t + i, 3) }); const w = textSpr(s, 16, '#f4f0e8').width; TX(c, s, Math.round(x + 45 - w / 2), 22, '#f4f0e8', 16, '#000000'); }); return { z: 1.02, fx: 160, fy: 90 }; }
    glow(c, 160, 80, 140, 70, '#8cc8f8', 0.12); cipherGrid(c, 56, 50, 17, 5, t, { hl: true, seed: 11 }); const k = sg(t, at(S, 'L46', 4) - 0.3, at(S, 'L46', 4) + 1); if (k > 0) { c.save(); c.globalAlpha = k; R(c, 58, 44, 216, 80, DA('#f8e070', 0.25)); c.restore(); stamp(c, t, at(S, 'L46', 4) + 0.6, 160, 120, '解読', 60); }
    bigCap(c, '2020年12月', 14, 16, '#f8e070', 1);
    return { z: 1.03, fx: 160, fy: 76 };
  }
};

/* ---- ZJ: ending — the 13-letter cipher, the score, fog over the city (moves: fog, the score blinks) ---- */
const ZJ = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tScore = at(S, 'L51', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    streetSF(c, t, {}); mist(c, t, 90, 0.3, '#8c94a8'); dim(c, 0.3);
    if (t < S.tScore) { R(c, 40, 30, 240, 40, '#f0e8d4'); const g = 'AEN+8K8M8|NAM'; TX(c, g, 60, 36, '#2c2c34', 16, null); R(c, 40, 74, 240, 22, '#000000'); TX(c, '名前を記したとされる13文字', 56, 76, '#f8e070', 16, null); }
    else scoreBoard(c, 85, 40, 37, 0, (Math.floor(t * 1.5) & 1) ? 1 : 0.6);
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 80 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { newsroom(c, t); cipherGrid(c, 64, 40, 17, 4, t, { hl: true, seed: 3 }); crosshair(c, 160, 132, 14, t); return { z: 1.1, fx: 160, fy: 80 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.5; },
  draw(c, t, S) { R(c, 0, 0, W, H, '#0c1424'); cipherGrid(c, 64, 40, 17, 5, t, { hl: true, seed: 11 }); dim(c, 0.2); return { z: 1.12, fx: 160, fy: 80 }; }
};
