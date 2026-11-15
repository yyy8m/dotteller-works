/* ================= 記録 #014 埼玉愛犬家連続殺人事件: scenes ================= */
const GY = 150;
const VICTIMS = () => [VA, VB, VC, VD];

/* ---- KX: cold open — four figures fade away one by one on a dusk road; the word "透明" (moves: figures fade, dust drifts) ---- */
const KX = withCuts({
  name: '消えた4人', ch: '遺体なき殺人', bgm: 'eerie',
  init(S) { S.tGone = at(S, 'C0', 3) - 0.3; S.tNone = at(S, 'C1', 0) - 0.3; S.tClear = at(S, 'C1', 4) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    sky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#6c6450'); PF(c, [130, 120, 190, 120, 300, 240, 20, 240], '#5c5850'); for (let i = 0; i < 6; i++) R(c, 158, 128 + i * 18, 4, 8 + i * 2, '#c8c0a8');
    VICTIMS().forEach((st, i) => { const t0 = S.tGone + i * 1.2; ghost(c, st, 80 + i * 50, 156, 1 - sg(t, t0, t0 + 1.4), { k: 'kx' }); });
    mist(c, t, 110, 0.18, '#c8b8a8');
    if (t > S.tNone && t < S.tClear) { bigCap(c, '遺体なし', 30, 24, '#f4f0e8', sg(t, S.tNone, S.tNone + 0.5)); }
    if (t > S.tClear) stamp(c, t, S.tClear + 0.4, 160, 70, '「透明」', 90);
    capPlate(c, t, at(S, 'C0', 0), ['1993年', '埼玉県']);
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.dur)), fx: 160, fy: 110 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, smanFace({ blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- KA: the kennel, the malamutes, the debts and the swindle (moves: dogs wag and walk, the debt counter climbs) ---- */
const KA = {
  name: 'アフリカケンネル', ch: 'ペットショップ', bgm: 'memory',
  init(S) { S.tDebt = at(S, 'L3', 0) - 0.3; S.tScam = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tScam) { // the price tag trick: a pair of puppies, a huge price
      R(c, 0, 0, W, H, '#2c241c'); glow(c, 160, 80, 140, 70, '#f8d8a0', 0.2); R(c, 40, 120, 240, 8, '#5c3c24');
      dog(c, 120, 120, t, { col: '#c8c0b8', dk: '#5c5c64' }); dog(c, 180, 120, t + 1, { col: '#c8c0b8', dk: '#5c5c64' });
      const k = sg(t, at(S, 'L4', 4) - 0.3, at(S, 'L4', 5)); R(c, 166, 40, 140, 30, '#f4f0e8'); TX(c, '高く引き取ります', 172, 46, '#2c5c3c', 16, null); if (k > 0) stamp(c, t, at(S, 'L4', 5), 90, 50, '法外な値段', 100);
      return { z: 1.03, fx: 160, fy: 90 };
    }
    sky(c, t, {}); R(c, 0, 120, W, 120, '#8c9c6c'); R(c, 0, 150, W, 90, '#7c7468'); kennel(c, t, 20, 150);
    for (let i = 0; i < 3; i++) { const x = 190 + i * 22 + Math.sin(t * 0.8 + i) * 6; dog(c, x, 150, t + i, { col: '#d8d0c8', dk: '#4c4c54', walk: true }); }
    person(c, SMAN, 120, 166, { k: 'ka' }); person(c, KAZAMA, 150, 168, { k: 'ka' });
    if (t > S.tDebt) { const n = Math.floor(sg(t, S.tDebt + 0.4, S.tScam) * 15); cashStack(c, 200, 172, n); R(c, 200, 56, 110, 24, '#000000'); TX(c, '借金', 208, 60, '#f86040', 16, null); dim(c, 0.2 * sg(t, S.tDebt, S.tDebt + 2)); }
    else capPlate(c, t, 0.4, ['埼玉県熊谷市', 'アフリカケンネル']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- KB: A buys the dogs for 11 million; the dispute; April 20 — a capsule (moves: the price falls, the capsule glints) ---- */
const KB = {
  name: '第一の事件', ch: '第一の事件', bgm: 'dread',
  init(S) { S.tAngry = at(S, 'L6', 0) - 0.3; S.tCall = at(S, 'L7', 0) - 0.3; S.tPoison = at(S, 'L8', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPoison) { R(c, 0, 0, W, H, '#14100c'); glow(c, 160, 80, 120, 60, '#f8f0e0', 0.15 + 0.05 * Math.sin(t * 2)); R(c, 110, 100, 100, 6, '#5c4c3c'); capsule(c, 160, 80 + Math.sin(t * 1.5) * 3, 3); R(c, 60, 20, 200, 26, '#000000'); TX(c, '硝酸ストリキニーネ', 86, 24, '#e8e070', 16, null); return { z: 1.04, fx: 160, fy: 80 }; }
    if (t > S.tCall) { // a garage at dusk, a big wagon
      sky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#5c5850'); R(c, 40, 50, 200, 100, '#7c7468'); R(c, 50, 64, 180, 86, '#1c1c20'); R(c, 70, 110, 110, 34, '#d8d4c8'); R(c, 140, 94, 40, 18, '#d8d4c8'); R(c, 146, 98, 28, 10, '#5c7c9c');
      for (const wx of [86, 166]) { E(c, wx, 144, 7, 7, '#141414'); } glow(c, 120, 100, 50, 30, '#f8d880', 0.15 + 0.05 * Math.sin(t * 3));
      yearFlash(c, t, S.tCall + 0.2, 1993, 216, 10, '4月20日'); capPlate(c, t - S.tCall, 0.4, ['熊谷市内の', 'ガレージ']);
      return { z: 1.03, fx: 140, fy: 100 };
    }
    sky(c, t, {}); R(c, 0, 120, W, 120, '#8c9c6c'); R(c, 0, 150, W, 90, '#7c7468'); kennel(c, t, 20, 150);
    person(c, SMAN, 120, 166, { k: 'kb', arm: t < S.tAngry ? 'point' : null }); person(c, VA, 220, 166, { k: 'kb', flip: true, expr: t > S.tAngry ? 'angry' : 'normal', arm: t > S.tAngry ? 'fwd' : null });
    dog(c, 170, 160, t, { col: '#b8845c', dk: '#7c5434' });
    const k = sg(t, at(S, 'L5', 6) - 0.3, at(S, 'L5', 7)); R(c, 200, 52, 104, 40, '#f4f0e8'); TX(c, '¥1100万', 210, 56, '#c81818', 16, null); if (k > 0) { L(c, 206, 64, 296, 64, '#2c2c34', 2); TX(c, '相場 数十万', 206, 74, '#2c2c34', 16, null); }
    if (t > S.tAngry) stamp(c, t, at(S, 'L6', 1), 250, 110, '返金を', 70);
    capPlate(c, t, 0.3, ['会社役員', 'Aさん']);
    return { z: 1.03, fx: 170, fy: 110 };
  }
};

/* ---- KC: the threat to Yamazaki; the mountain house at night; the car in Tokyo (moves: the drum-can smoke drifts, the car lights pass) ---- */
const KC = {
  name: '片品村', ch: '脅しと偽装', bgm: 'dread',
  init(S) { S.tHouse = at(S, 'L10', 0) - 0.3; S.tCar = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCar) { // Yaesu underground car park
      R(c, 0, 0, W, H, '#3c3c40'); for (let i = 0; i < 6; i++) { R(c, i * 56, 0, 12, 150, '#5c5c64'); glow(c, i * 56 + 30, 10, 20, 8, '#f8f8e0', 0.3); } R(c, 0, 150, W, 90, '#4c4c50'); for (let i = 0; i < 6; i++) R(c, 20 + i * 50, 156, 2, 30, '#e8e0a0');
      pickup(c, 120, 150, { col: '#3c4c6c' }); const u = sg(t, S.tCar + 0.6, S.dur); person(c, YAMA, lerp(220, 290, u), 166, { k: 'ty', f: Math.floor(t * 5) & 3 });
      capPlate(c, t - S.tCar, 0.3, ['東京駅', '八重洲地下駐車場']); if (t > at(S, 'L11', 3) - 0.3) stamp(c, t, at(S, 'L11', 4), 240, 60, '偽装', 70);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    if (t > S.tHouse) { mountainHouse(c, t, { night: true }); for (let i = 0; i < 10; i++) { const u = fr(t * 0.25 + i / 10); E(c, 250 + Math.sin(t + i) * 6 + u * 20, 96 - u * 90, 4 + u * 14, 3 + u * 8, DA('#5c5c64', 0.5 * (1 - u))); } R(c, 244, 106, 12, 16, '#5c5c5c'); glow(c, 250, 104, 12, 8, '#f86020', 0.3 + 0.1 * Math.sin(t * 7)); capPlate(c, t - S.tHouse, 0.3, ['群馬県', '片品村']); return { z: 1.03 + 0.04 * ss(sg(t, S.tHouse, S.tCar)), fx: 220, fy: 100 }; }
    // the garage: S looms over Yamazaki
    R(c, 0, 0, W, H, '#1c1c20'); glow(c, 160, 60, 100, 50, '#f8d880', 0.2 + 0.06 * Math.sin(t * 4)); L(c, 160, 0, 160, 30, '#2c2c2c'); E(c, 160, 34, 8, 4, '#f8e8b0');
    blit(c, tintSpr(modFig(SMAN, { k: 'shd' }), '#0a0606', 'smshd'), 130, 160, FIG_AX2, FIG_AY2, { s: 1.6 }); person(c, YAMA, 210, 162, { k: 'kc', flip: true, expr: 'shock' });
    return { z: 1.04, fx: 160, fy: 110 };
  }
};

/* ---- KD: July — B and C; August — D and the 2.7 million yen (moves: figures fade, money changes hands) ---- */
const KD = {
  name: '第二・第三の事件', ch: '巻き添え', bgm: 'dread',
  init(S) { S.tBC = at(S, 'L13', 0) - 0.3; S.tD = at(S, 'L14', 0) - 0.3; S.tDgone = at(S, 'L14', 4) - 0.3; S.tTrust = at(S, 'L14', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tD) { // D hands over the family's savings
      R(c, 0, 0, W, H, '#2c2418'); glow(c, 160, 80, 140, 70, '#f8d8a0', 0.18); R(c, 0, 150, W, 90, '#3c3024');
      ghost(c, VD, 210, 162, 1 - sg(t, S.tDgone, S.tDgone + 1.6), { k: 'kd', flip: true, expr: 'smile', arm: t < S.tDgone ? 'fwd' : null }); person(c, SMAN, 120, 162, { k: 'kd2', arm: 'hold' });
      const n = Math.floor(sg(t, at(S, 'L14', 3) - 0.3, S.tDgone) * 10); cashStack(c, 120, 172, n);
      if (t > S.tTrust) bigCap(c, '最後まで信じていた', 30, 16, '#f4f0e8', sg(t, S.tTrust, S.tTrust + 0.5)); else if (t > at(S, 'L14', 3) - 0.3) bigCap(c, '270万円', 30, 24, '#f8e070', 1);
      if (t < at(S, 'L14', 3) - 0.3) yearFlash(c, t, S.tD + 0.2, 1993, 216, 10, '8月26日');
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // B's house at night
    sky(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); R(c, 60, 70, 180, 80, '#3c3c48'); PF(c, [50, 72, 150, 40, 250, 72], '#2c2c34'); for (const wx of [80, 190]) { R(c, wx, 92, 30, 22, '#f8d880'); glow(c, wx + 15, 103, 18, 12, '#f8d880', 0.3); }
    const fb = sg(t, S.tBC + 0.4, at(S, 'L13', 5)), fc = sg(t, at(S, 'L13', 5) - 0.3, S.dur); ghost(c, VB, 130, 164, 1 - fb, { k: 'kb2' }); ghost(c, VC, 170, 164, 1 - fc, { k: 'kc2' });
    if (t > at(S, 'L13', 5) - 0.3) stamp(c, t, at(S, 'L13', 6), 230, 50, '巻き添え', 80);
    yearFlash(c, t, 0.3, 1993, 8, 10, '7月21日');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- KE: the bodiless murders; the police watch but can't arrest (moves: empty outlines, a watcher's binoculars glint) ---- */
const KE = {
  name: '遺体なき殺人', ch: '遺体なき殺人', bgm: 'eerie',
  init(S) { S.tPol = at(S, 'L16', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPol) { sky(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); kennel(c, t, 110, 150, { lit: true }); R(c, 20, 120, 70, 40, '#2c2c34'); R(c, 30, 124, 22, 12, '#5c7c9c'); person(c, COPS[0], 60, 162, { k: 'wc', flip: false }); const g = (Math.floor(t * 0.8) % 3 === 0) ? 1 : 0; if (g) glow(c, 72, 116, 6, 4, '#f8f8e0', 0.6); if (t > at(S, 'L16', 4) - 0.3) stamp(c, t, at(S, 'L16', 5), 160, 50, '証拠なし', 80); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#0c0a10'); for (let i = 0; i < 4; i++) { const x = 70 + i * 60, k = 0.4 + 0.3 * Math.sin(t * 1.6 + i); c.save(); c.globalAlpha = k; blit(c, tintSpr(modFig(VICTIMS()[i], { k: 'ol' }), '#3c4c6c', 'olt' + i), x, 160, FIG_AX2, FIG_AY2); c.restore(); }
    bigCap(c, 'ボディを透明にする', 26, 16, '#c8d8f8', sg(t, at(S, 'L15', 6) - 0.3, at(S, 'L15', 6)));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- KF: 1994 — the media crowd at the kennel; on TV every day (moves: camera flashes, TV scanlines) ---- */
const KF = {
  name: '報道', ch: 'ワイドショー', bgm: 'pulse',
  init(S) { S.tTV = at(S, 'L18', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTV) { R(c, 0, 0, W, H, '#2c241c'); R(c, 0, 150, W, 90, '#3c2c1c'); tv(c, 70, 24, 180, 110, (cc, x, y, w, h) => { sky(cc, t, {}); R(cc, x, y + 70, w, 40, '#7c7468'); kennel(cc, t, x + 4, y + 104); person(cc, SMAN, x + 150 + Math.sin(t * 2) * 4, y + 112, { k: 'tv', arm: 'wave' }); R(cc, x, y + h - 18, w, 18, '#c81818'); TX(cc, '失踪事件', x + 6, y + h - 19, '#f4f0e8', 16, null); }); if (t > at(S, 'L18', 4) - 0.3) bigCap(c, '「潔白だ」', 2, 16, '#f8e8b0', 1); return { z: 1.03, fx: 160, fy: 90 }; }
    sky(c, t, { winter: true }); R(c, 0, 120, W, 120, '#8c8c7c'); R(c, 0, 150, W, 90, '#7c7468'); kennel(c, t, 20, 150);
    PRESS.forEach((st, i) => { person(c, st, 180 + i * 30, 168, { k: 'ps', flip: true, arm: 'fwd' }); if (hash(i * 9 + Math.floor(t * 4)) > 0.75) { flashScreen(c, 0.12); glow(c, 170 + i * 30, 130, 12, 10, '#ffffff', 0.7); } });
    yearFlash(c, t, 0.3, 1994, 216, 10, '2月'); if (t > at(S, 'L17', 1) - 0.3 && t < at(S, 'L17', 3)) capPlate(c, t - at(S, 'L17', 1), 0, ['大阪愛犬家連続殺人事件', '（別の事件）']);
    return { z: 1.03, fx: 180, fy: 110 };
  }
};

/* ---- KG: Yamazaki confesses; the bones in the forest; the arrest; the river search with sieves (moves: sieves shake, cold water flows) ---- */
const KG = {
  name: '自供と逮捕', ch: '川底の証拠', bgm: 'pulse',
  init(S) { S.tFind = at(S, 'L19', 4) - 0.3; S.tArrest = at(S, 'L20', 0) - 0.3; S.tRiver = at(S, 'L21', 0) - 0.3; S.tItems = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tItems) { R(c, 0, 0, W, H, '#1c2028'); glow(c, 160, 70, 140, 60, '#d8e0f0', 0.18); R(c, 40, 110, 240, 8, '#5c5c64');
      const it = [[1, (x, y) => { for (let k = 0; k < 4; k++) R(c, x - 8 + k * 5, y - 2 + (k & 1), 4, 3, '#e8e4d8'); }, '骨のかけら'], [2, (x, y) => { E(c, x, y, 7, 7, '#c8c8d0'); E(c, x, y, 5, 5, '#f4f4f0'); L(c, x, y, x, y - 4, '#2c2c34'); L(c, x, y, x + 3, y, '#2c2c34'); R(c, x - 2, y - 12, 4, 5, '#5c4c3c'); R(c, x - 2, y + 7, 4, 5, '#5c4c3c'); }, '腕時計'], [3, (x, y) => { R(c, x - 5, y - 7, 10, 14, '#c83c3c'); R(c, x - 3, y - 4, 6, 6, '#f8e070'); L(c, x, y - 7, x, y - 12, '#f4f0e8'); }, 'お守り'], [4, (x, y) => { E(c, x - 4, y, 4, 4, '#c8a040'); R(c, x, y - 1, 10, 3, '#c8a040'); R(c, x + 6, y + 1, 2, 3, '#c8a040'); }, '家の鍵']];
      it.forEach(([seg, fn, name], i) => { const t0 = at(S, 'L22', seg) - 0.3; if (t < t0) return; const x = 55 + i * 70, y = 96; fn(x, y); glow(c, x, y, 14, 10, '#f8f0c0', 0.2); const w = textSpr(name, 16, '#f4f0e8').width; TX(c, name, Math.round(x - w / 2), 50, '#f4f0e8', 16, '#000000'); });
      return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tRiver) { sky(c, t, { winter: true }); for (let i = 0; i < 6; i++) PF(c, [i * 70 - 40, 120, i * 70 + 10, 70, i * 70 + 60, 120], '#5c6c5c'); R(c, 0, 110, W, 30, '#8c8474'); river(c, t, 128, { winter: true });
      SEARCH.forEach((st, i) => { const x = 50 + i * 70, sh = Math.sin(t * 9 + i * 2) * 2; person(c, st, x, 170, { k: 'rv', arm: 'fwd', flip: i % 2 === 1 }); E(c, x + (i % 2 ? -14 : 14) + sh, 146, 9, 3, '#8c8c8c'); ER(c, x + (i % 2 ? -14 : 14) + sh, 146, 9, 3, '#5c5c5c'); });
      for (let i = 0; i < 8; i++) { const u = fr(t * 0.5 + i / 8); P(c, 40 + i * 34, 120 - u * 20, DA('#f4f4f8', 1 - u)); }
      return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tArrest) { sky(c, t, { winter: true }); R(c, 0, 120, W, 120, '#8c8c7c'); R(c, 0, 150, W, 90, '#7c7468'); kennel(c, t, 20, 150); person(c, SMAN, 140, 166, { k: 'ar', expr: 'angry' }); person(c, KAZAMA, 210, 168, { k: 'ar', expr: 'shock' }); for (let i = 0; i < 3; i++) person(c, COPS[i], [110, 176, 244][i], 168, { k: 'ar2', arm: 'fwd', flip: i === 2 }); yearFlash(c, t, S.tArrest + 0.2, 1995, 216, 10, '1月5日'); stamp(c, t, at(S, 'L20', 2), 260, 100, '逮捕', 60); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tFind) { mountainHouse(c, t, { winter: true }); SEARCH.slice(0, 3).forEach((st, i) => person(c, st, 60 + i * 50, 170, { k: 'fd', arm: 'dig', f: Math.floor(t * 3 + i) & 1 })); person(c, YAMA, 250, 170, { k: 'fd2', flip: true, arm: 'point' }); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#3c3c44'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#444450'); R(c, 0, 150, W, 90, '#2c2c34'); R(c, 120, 120, 80, 8, '#5c4c3c'); person(c, YAMA, 110, 160, { k: 'cf', expr: 'sad', blink: blinkOf(t, 4) }); person(c, COPS[1], 220, 160, { k: 'cf', flip: true });
    yearFlash(c, t, 0.3, 1994, 216, 10, '12月'); if (t > at(S, 'L19', 3) - 0.3) stamp(c, t, at(S, 'L19', 3), 160, 60, '自供', 60);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};

/* ---- KH: the trials — blaming each other; 2001 death sentences; 2009 final; 2017 (moves: the two point at each other, the gavel) ---- */
const KH = {
  name: '裁判', ch: '死刑判決', bgm: 'requiem',
  init(S) { S.tSent = at(S, 'L24', 0) - 0.3; S.tEnd = at(S, 'L25', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEnd) { sky(c, t, { winter: true }); R(c, 0, 120, W, 120, '#7c7c74'); R(c, 60, 50, 200, 100, '#a8a49c'); for (let i = 0; i < 10; i++) R(c, 70 + i * 19, 60, 10, 80, '#8c8880'); if (t > at(S, 'L25', 5) - 0.3) bigCap(c, '戦後12人目の女性死刑囚', 30, 16, '#f4f0e8', 1); else { yearFlash(c, t, S.tEnd + 0.2, 2017, 216, 10, '獄死'); capPlate(c, t - S.tEnd, 0.3, ['東京拘置所']); } return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 30) R(c, x, 0, 4, 150, '#5c4030'); R(c, 0, 150, W, 90, '#3c2c1c'); R(c, 96, 92, 128, 40, '#6c4c34'); R(c, 96, 92, 128, 4, '#8c6c4c'); E(c, 160, 110, 8, 8, '#c8a040');
    const sw = t < S.tSent ? Math.sin(t * 3) : 0; person(c, SMAN, 100, 170, { k: 'ct', arm: t < S.tSent ? 'point' : null, expr: t < S.tSent ? 'angry' : 'sad' }); person(c, KAZAMA, 220, 170, { k: 'ct', flip: true, arm: t < S.tSent ? 'point' : null, expr: t < S.tSent ? 'angry' : 'sad' });
    if (t < S.tSent) { bigCap(c, '「主犯は相手」', 30, 16, '#f8e8b0', sg(t, at(S, 'L23', 3) - 0.3, at(S, 'L23', 3))); }
    else { yearFlash(c, t, S.tSent + 0.2, 2001, 216, 10, '3月21日'); stamp(c, t, at(S, 'L24', 3), 80, 50, '死刑', 60); if (t > at(S, 'L24', 4) - 0.3) yearFlash(c, t, at(S, 'L24', 4), 2009, 216, 10, '確定'); }
    return { z: 1.03, fx: 160, fy: 100, sx: Math.round(sw * 0) };
  }
};

/* ---- KI: the film; ending — an empty kennel at night, a single dog's eyes (moves: wind, the dog's tail, stars) ---- */
const KI = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.tLast = at(S, 'L27', 0) - 0.3; S.dur = 1e9; },
  draw(c, t, S) {
    if (t < S.tLast) { R(c, 0, 0, W, H, '#0c1c24'); for (let i = 0; i < 14; i++) { const x = mod(i * 40 + t * (10 + i % 4 * 4), W + 40) - 20, y = 30 + (i * 17 % 90); E(c, x, y, 7, 4, ['#f8a040', '#40c8f8', '#f8e040'][i % 3]); PF(c, [x - 7, y, x - 12, y - 4, x - 12, y + 4], ['#f8a040', '#40c8f8', '#f8e040'][i % 3]); } for (let i = 0; i < 12; i++) { const u = fr(t * 0.4 + i / 12); E(c, 20 + i * 26, 140 - u * 130, 2, 2, DA('#c8f0f8', 1 - u)); } bigCap(c, '映画『冷たい熱帯魚』の題材', 24, 16, '#f4f0e8', 1); return { z: 1.03, fx: 160, fy: 90 }; }
    sky(c, t, { night: true }); R(c, 0, 120, W, 120, '#1c1c24'); kennel(c, t, 60, 150); dim(c, 0.3); dog(c, 250, 156, t, { col: '#8c8c94', dk: '#3c3c44', wag: 3 }); R(c, 265, 139, 2, 1, '#f8e070');
    return { z: 1 + 0.06 * ss(sg(t, S.tLast, S.tEnd + 2)), fx: 180, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { sky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#6c6450'); PF(c, [130, 120, 190, 120, 300, 240, 20, 240], '#5c5850'); VICTIMS().forEach((st, i) => ghost(c, st, 100 + i * 40, 156, 1 - sg(t, 0.8 + i * 0.9, 2 + i * 0.9), { k: 'kx' })); mist(c, t, 110, 0.18, '#c8b8a8'); return { z: 1.1, fx: 160, fy: 110 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { sky(c, t, { winter: true }); river(c, t, 110, { winter: true }); SEARCH.forEach((st, i) => person(c, st, 60 + i * 66, 170, { k: 'rv', arm: 'fwd' })); dim(c, 0.3); return { z: 1.12, fx: 160, fy: 120 }; }
};
