/* ================= 記録 #009 アンドレイ・チカチーロ: scenes ================= */
const PL_Y = 150; // feet on the platform

/* ---- QX: cold open — the small station, the man from the forest ---- */
const QX = withCuts({
  name: '小さな駅', ch: '森から来た男', bgm: 'eerie',
  init(S) { S.tFace = at(S, 'C1', 0) - 0.3; S.tStain = at(S, 'C1', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tStain) { // close on the face: the red stain on the cheek
      VG(c, 0, 0, W, H, ['#14100c', '#3c2c24', '#14100c']); bigFace(c, chikaFace({ blink: blinkOf(t, 4) }), 160, 100, 3.4, 'qxf');
      const k = sg(t, S.tStain + 0.4, S.tStain + 1.4); E(c, 196, 120, 6 * k, 4 * k, '#a8181c'); E(c, 194, 118, 2 * k, 1.5 * k, '#d82c2c'); if (k >= 1) ER(c, 196, 120, 14, 11, '#f8d860');
      return { z: 1.02 + 0.1 * ss(sg(t, S.tStain, S.dur)), fx: 180, fy: 112 };
    }
    platform(c, t, {}); const k = sg(t, 0.6, 5);
    person(c, CHIKA_COAT, lerp(-10, 150, ss(k)), PL_Y, { f: k > 0 && k < 1 ? Math.floor(t * 6) & 3 : -1, k: 'qx' });
    person(c, PLAIN[0], 262, PL_Y + 2, { flip: true, k: 'qx', expr: t > S.tFace ? 'shock' : 'normal' });
    if (t > S.tFace) { c.save(); c.globalAlpha = 0.9; R(c, 141, PL_Y - 28, 4, 3, '#5c6c3c'); R(c, 160, PL_Y - 28, 4, 3, '#5c6c3c'); c.restore(); }
    capPlate(c, t, 0.5, ['1990年11月6日', 'ソ連 ロストフ州']);
    return { z: 1.04 + 0.06 * ss(sg(t, S.tFace, S.dur)), fx: lerp(160, 150, sg(t, S.tFace, S.dur)), fy: 112 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, burakovFace({ blink: blinkOf(t, 6) }), { bg: ['#141418', '#3c3c48'], glow: '#c8c8d8' })]]);

/* ---- QA: 1936, a one-room hut; famine; war; a bullied boy ---- */
const QA = {
  name: 'ウクライナの村', ch: '飢えの記憶', bgm: 'memory',
  init(S) { S.tBread = at(S, 'L2', 1) - 0.3; S.tWar = at(S, 'L3', 0) - 0.3; S.tBully = at(S, 'L3', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBully) { // the schoolyard: the boy with glasses alone, the others laughing
      VG(c, 0, 0, W, 110, ['#8c9cac', '#a8b4bc', '#c8ccd0']); R(c, 0, 110, W, 130, '#8c7c64'); R(c, 40, 50, 240, 60, '#a89c84'); for (let i = 0; i < 6; i++) R(c, 56 + i * 38, 64, 20, 24, '#4c5c6c');
      for (let i = 0; i < 4; i++) person(c, { ...CHIKA_YOUNG, id: 'bk' + i, coat: ['#7c5c4c', '#5c6c4c', '#6c5c7c', '#7c6c4c'][i], hair: ['#3c2818', '#c8a060', '#1c1814', '#6c4c2c'][i], glasses: false }, 180 + i * 26, 168, { expr: 'smile', flip: true, k: 'bly', arm: i % 2 ? 'point' : null });
      person(c, { ...CHIKA_YOUNG, glasses: true }, 100, 170, { expr: 'sad', k: 'shy' });
      return { z: 1.04, fx: 150, fy: 120 };
    }
    if (t > S.tWar) { // the hut burning
      grayDusk(c, 140, { night: true }); R(c, 0, 140, W, 100, '#1c1814'); fireHouse(c, 110, 150, 90, 40, t, 1);
      person(c, { ...CHIKA_YOUNG }, 60, 172, { expr: 'shock', k: 'war' }); person(c, { id: 'mom', top: 'dress', coat: '#5c4c3c', skin: '#e0b898', hair: '#3c2818', hairStyle: 'long' }, 40, 170, { expr: 'sad', k: 'war' });
      return { z: 1.04, fx: 140, fy: 120 };
    }
    grayDusk(c, 130, { snow: true }); snowGround(c, 140); for (let i = 0; i < 4; i++) bareTree(c, 20 + i * 96, 140, 60, i + 3); hut(c, 120, 150, { lit: true }); smoke(c, 166, 92, t, 3); snowfall(c, t, 40, 5, 6, 14);
    if (t > S.tBread) { R(c, 196, 60, 110, 70, '#2c2018'); R(c, 200, 64, 102, 62, '#4c3828'); E(c, 251, 104, 30, 8, '#8c7c64'); E(c, 251, 103, 26, 6, '#a8946c'); for (let i = 0; i < 3; i++) E(c, 236 + i * 14, 98, 4, 2, '#5c7c3c'); bigCap(c, '草と、葉っぱ', 120, 16, '#f4f0e8', sg(t, S.tBread + 0.4, S.tBread + 1)); }
    yearFlash(c, t, 0.4, 1936, 216, 10, 'ウクライナ'); capPlate(c, t, 0.7, ['ソ連 ウクライナ', '小さな村']);
    return { z: 1.03, fx: 160, fy: 112 };
  }
};

/* ---- QB: the teacher; a family; dismissed ---- */
const QB = {
  name: '教室', ch: '物静かな男', bgm: 'memory',
  init(S) { S.tFam = at(S, 'L5', 0) - 0.3; S.tBad = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFam && t < S.tBad) { // a family photo
      R(c, 0, 0, W, H, '#3c2c20'); R(c, 76, 20, 168, 120, '#8c6c3c'); R(c, 80, 24, 160, 112, '#c8b894');
      const wife = { id: 'wf', top: 'dress', coat: '#6c4c5c', skin: '#e8c4a4', hair: '#5c3c24', hairStyle: 'long' };
      person(c, CHIKA, 130, 128, { expr: 'smile', k: 'fam', s: 1.2 }); person(c, wife, 172, 128, { expr: 'smile', k: 'fam', s: 1.2 }); person(c, { id: 'k1', kid: true, top: 'dress', coat: '#c86c6c', skin: '#f0c8a8', hair: '#5c3c24', hairStyle: 'long' }, 108, 128, { expr: 'smile', k: 'fam', s: 1.2 }); person(c, { id: 'k2', kid: true, top: 'shirt', coat: '#5c7cac', pants: '#3c3c44', skin: '#f0c8a8', hair: '#5c3c24' }, 196, 128, { expr: 'smile', k: 'fam', s: 1.2 });
      c.save(); c.globalAlpha = 0.35; c.fillStyle = '#a8844c'; c.fillRect(80, 24, 160, 112); c.restore();
      return { z: 1.04, fx: 160, fy: 80 };
    }
    classroom(c, t); for (let i = 0; i < 4; i++) person(c, { ...FOLK[i], id: 'st' + i, kid: true }, 50 + i * 70, 178, { k: 'st', flip: true });
    person(c, CHIKA, 250, 150, { arm: t < S.tBad ? 'point' : null, expr: t > S.tBad ? 'sad' : 'normal', k: 'tch' });
    if (t > S.tBad) { dim(c, 0.45 * sg(t, S.tBad, S.tBad + 1.2), '#140c0c'); stamp(c, t, S.tBad + 2.6, 140, 60, '辞職', 70); }
    capPlate(c, t, 0.4, ['ロシア語と文学の教師']);
    return { z: 1.03, fx: 180, fy: 110 };
  }
};

/* ---- QC: December 1978, Shakhty — the girl who did not come home; another man executed; overturned ---- */
const QC = {
  name: 'シャフティ', ch: '最初の事件', bgm: 'dread',
  init(S) { S.tRiver = at(S, 'L7', 2) - 0.3; S.tOther = at(S, 'L8', 0) - 0.3; S.tDeath = at(S, 'L9', 2) - 0.3; S.tOver = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOver) { // the verdict paper: overturned; unsolved
      R(c, 0, 0, W, H, '#1c1c24'); plate(c, 90, 30, 140, 110, '判決', '#5c2c2c'); for (let i = 0; i < 5; i++) R(c, 100, 60 + i * 12, 120, 2, '#8c8474');
      L(c, 94, 40, 226, 136, '#c81818', 3); stamp(c, t, S.tOver + 0.4, 200, 120, '取り消し', 96); bigCap(c, '未解決', 160, 24, '#f4f0e8', sg(t, S.tOver + 3, S.tOver + 3.6));
      return { z: 1.03, fx: 160, fy: 90 };
    }
    if (t > S.tOther) { // a different man between two militiamen; later, the death sentence stamp
      R(c, 0, 0, W, H, '#2c2c34'); for (let i = 0; i < 12; i++) R(c, 20 + i * 26, 0, 6, H, '#3c3c44');
      const kr = { id: 'krv', top: 'shirt', coat: '#6c5c4c', pants: '#3c3c40', skin: '#e0b898', hair: '#1c1814', hairStyle: 'short' };
      person(c, MILITIA[0], 130, 170, { k: 'kr' }); person(c, kr, 160, 172, { expr: t > S.tDeath ? 'sad' : 'shock', k: 'kr', s: 1.1 }); person(c, MILITIA[1], 190, 170, { flip: true, k: 'kr' });
      TX(c, 'クラーフチェンコ', 106, 50, '#f8d860', 16, '#000000');
      if (t > S.tDeath) stamp(c, t, S.tDeath + 0.3, 160, 90, '死刑', 70);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // the river under the bridge in the winter dusk; militia lights
    grayDusk(c, 110, { night: true }); R(c, 0, 108, W, 132, '#14181c'); R(c, 0, 128, W, 30, '#1c2c3c'); for (let i = 0; i < 12; i++) R(c, mod(i * 31 + t * 10, W), 134 + (i % 3) * 7, 14, 1, '#3c5c7c');
    R(c, 40, 92, 240, 10, '#4c4c54'); for (let i = 0; i < 5; i++) R(c, 60 + i * 50, 102, 8, 28, '#3c3c44'); for (let x = 40; x < 280; x += 8) R(c, x, 84, 2, 8, '#5c5c64'); // the bridge
    snowfall(c, t, 30, 7, 4, 12);
    if (t > S.tRiver) { for (let i = 0; i < 3; i++) person(c, MILITIA[i], 90 + i * 60, 172, { arm: i === 1 ? 'fwd' : null, k: 'rv', flip: i === 2 }); softBeam(c, 156, 150, 0.7, 80, 0.2, 0.3); }
    yearFlash(c, t, 0.4, 1978, 216, 10, '12月'); capPlate(c, t, 0.7, ['ロストフ州', 'シャフティ']);
    return { z: 1.03, fx: 160, fy: 112 };
  }
};

/* ---- QH: the horror close-up ---- */
const QH = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, chikaFace({ dark: true, blink: 0 }), [[19, 19], [30, 19]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- QD: from 1982 — the forest strips; the business trips; "Forest Strip"; the false confessions ---- */
const QD = {
  name: '森の細道', ch: '森の細道', bgm: 'dread',
  init(S) { S.tTrip = at(S, 'L12', 0) - 0.3; S.tLure = at(S, 'L12', 2) - 0.3; S.tOp = at(S, 'L13', 0) - 0.3; S.tFalse = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFalse) { // a lamp over an interrogation table; one man after another
      R(c, 0, 0, W, H, '#0c0c10'); glow(c, 160, 70, 80, 60, '#f8e8b0', 0.35); L(c, 160, 0, 160, 30, '#2c2c2c'); PF(c, [146, 30, 174, 30, 180, 40, 140, 40], '#3c3c44');
      R(c, 90, 120, 140, 8, '#4c3c2c'); const i = Math.floor((t - S.tFalse) / 1.6) % 4; person(c, FOLK[i + 1], 130, 150, { expr: 'sad', k: 'cf' }); person(c, PLAIN[1], 200, 150, { flip: true, arm: 'point', k: 'int' });
      return { z: 1.04, fx: 160, fy: 100 };
    }
    if (t > S.tOp) { // the case file
      R(c, 0, 0, W, H, '#2c2418'); plate(c, 70, 30, 180, 120, '作戦「森の細道」', '#3c5c3c'); for (let i = 0; i < 6; i++) R(c, 82, 64 + i * 12, 150 - (i % 2) * 40, 2, '#8c8474'); R(c, 200, 96, 40, 44, '#c8c0b0'); bigFace(c, burakovFace({}), 220, 118, 0.8, 'opb');
      return { z: 1.03, fx: 160, fy: 90 };
    }
    if (t > S.tTrip) { // the map of trips; then a bus stop: a man talking to someone, the forest behind
      if (t > S.tLure) { grayDusk(c, 120, {}); forestStrip(c, t, 130); R(c, 0, 130, W, 110, '#6c6c64'); R(c, 200, 80, 4, 60, '#3c3c3c'); R(c, 192, 74, 20, 10, '#e8c84c'); TX(c, 'A', 197, 72, '#2c2c2c', 16, null); person(c, CHIKA, 150, 160, { arm: 'point', expr: 'smile', k: 'lure', flip: true }); person(c, FOLK[0], 120, 160, { k: 'lure' }); return { z: 1.06, fx: 140, fy: 120 }; }
      sovietMap(c, t); const ks = Object.keys(SPOTS), u = sg(t, S.tTrip + 0.2, S.tLure - 0.2) * ks.length;
      ks.forEach((k, i) => { if (u < i) return; const [x, y] = SPOTS[k]; L(c, SPOTS.rostov[0], SPOTS.rostov[1], lerp(SPOTS.rostov[0], x, clamp(u - i, 0, 1)), lerp(SPOTS.rostov[1], y, clamp(u - i, 0, 1)), '#f84040', 2); E(c, x, y, 3, 3, '#f8d860'); });
      TX(c, 'ロストフ', SPOTS.rostov[0] - 20, SPOTS.rostov[1] + 6, '#f4f0e8', 16, '#000000');
      return { z: 1.02, fx: 160, fy: 100 };
    }
    // the forest strip along the railway; markers where the remains were found
    grayDusk(c, 120, {}); forestStrip(c, t, 128); R(c, 0, 128, W, 112, '#5c5c50'); R(c, 0, 132, W, 2, '#8c8c94'); R(c, 0, 138, W, 2, '#8c8c94');
    const n = Math.floor(sg(t, 1.2, 6) * 7); for (let i = 0; i < n; i++) { const x = 30 + i * 40, y = 160 + (i % 2) * 6; R(c, x, y - 10, 2, 12, '#c8c8c0'); PF(c, [x + 2, y - 10, x + 10, y - 7, x + 2, y - 4], '#c81818'); }
    yearFlash(c, t, 0.4, 1982, 216, 10, 'ロストフ');
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- QE: September 1984 — the bus stop; the bag; the wrong blood type; released ---- */
const QE = withCuts({
  name: 'バス停', ch: 'すり抜けた男', bgm: 'pulse',
  init(S) { S.tBag = at(S, 'L15', 2) - 0.3; S.tBlood = at(S, 'L17', 0) - 0.3; S.tFree = at(S, 'L17', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBlood) { R(c, 0, 0, W, H, '#1c1c24'); bloodCard(c, 40, 40, '現場の体液', 'AB型', '#8c1c3c', sg(t, S.tBlood, S.tBlood + 0.4)); bloodCard(c, 184, 40, '男の血液', 'A型', '#2c4c8c', sg(t, S.tBlood + 1.2, S.tBlood + 1.6)); if (t > S.tBlood + 2.2) bigCap(c, '≠', 52, 32, '#f84040'); stamp(c, t, S.tFree + 0.4, 160, 124, '釈放', 70, '#2c6c3c'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tBag) { // the open bag: a knife and a rope
      R(c, 0, 0, W, H, '#241c14'); R(c, 60, 60, 200, 100, '#3c3c40'); R(c, 66, 66, 188, 88, '#1c1c20'); glow(c, 160, 110, 100, 50, '#f8e8b0', 0.25);
      L(c, 90, 100, 170, 96, '#c8ccd4', 3); R(c, 170, 92, 26, 8, '#3c2418'); for (let i = 0; i < 6; i++) ER(c, 210 + (i % 3) * 8, 120 + Math.floor(i / 3) * 8, 10, 6, '#a8946c');
      return { z: 1.05, fx: 160, fy: 110 };
    }
    grayDusk(c, 120, { night: true }); for (let i = 0; i < 5; i++) { const x = i * 70; R(c, x, 50, 50, 70, '#2c2c3c'); for (let k = 0; k < 6; k++) R(c, x + 6 + (k % 3) * 14, 56 + Math.floor(k / 3) * 22, 8, 10, hash(i * 7 + k) > 0.4 ? '#f8d880' : '#1c1c24'); }
    R(c, 0, 120, W, 120, '#3c3c40'); R(c, 120, 80, 4, 50, '#5c5c5c'); R(c, 112, 72, 20, 12, '#e8c84c'); glow(c, 160, 90, 60, 30, '#f8e0a0', 0.25);
    person(c, FOLK[0], 150, 160, { k: 'bs' }); person(c, FOLK[3], 172, 160, { k: 'bs' }); person(c, CHIKA, 204, 160, { flip: true, expr: 'smile', k: 'bs' });
    person(c, PLAIN[2], 40, 162, { k: 'bsp' }); person(c, PLAIN[3], 64, 162, { k: 'bsp', expr: 'shock' });
    yearFlash(c, t, 0.4, 1984, 216, 10, '9月13日');
    return { z: 1.05, fx: 150, fy: 116 };
  }
}, [['L16', (c, t, S) => closeUp(c, t, chikaFace({ blink: blinkOf(t, 3) }), { bg: ['#14141c', '#3c3c4c'], glow: '#c8c8d8' })]]);

/* ---- QF: the psychiatrist and the profile ---- */
const QF = {
  name: '犯人像', ch: '犯人像', bgm: 'eerie',
  init(S) { S.tProf = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#3c2c20'); for (let s = 0; s < 3; s++) { R(c, 10, 30 + s * 40, 90, 4, '#5c3c24'); for (let i = 0; i < 12; i++) R(c, 12 + i * 7, 10 + s * 40, 6, 20, ['#7c2c2c', '#2c4c6c', '#4c6c3c', '#8c7c4c'][(i + s) % 4]); }
    glow(c, 210, 100, 100, 70, '#f8d080', 0.3);
    if (t < S.tProf) { person(c, { id: 'bkh', top: 'jacket', coat: '#5c4c3c', shirt: '#f0ece4', pants: '#3c3428', skin: '#e8c0a0', hair: '#3c2c24', hairStyle: 'side', glasses: true, moustache: true }, 200, 160, { k: 'bkh', blink: blinkOf(t, 2) }); capPlate(c, t, 0.4, ['精神科医', 'ブハノフスキー']); return { z: 1.04, fx: 180, fy: 110 }; }
    plate(c, 120, 20, 180, 150, '犯人像（67ページ）', '#2c3c5c');
    const items = ['45〜50歳', '結婚・子どもあり', '見た目は、ごく普通', '仕事で移動している'];
    items.forEach((s, i) => { const k = sg(t, S.tProf + 0.6 + i * 1.6, S.tProf + 1.0 + i * 1.6); if (k > 0) { c.save(); c.globalAlpha = k; TX(c, '・' + s, 128, 46 + i * 26, '#2c2c34', 16, null); c.restore(); } });
    return { z: 1.03, fx: 210, fy: 90 };
  }
};

/* ---- QG: 1990 — 360 uniformed officers at every station; three small stations left open ---- */
const QG = {
  name: '駅の罠', ch: '駅の罠', bgm: 'pulse',
  init(S) { S.tTrap = at(S, 'L22', 0) - 0.3; S.tSmall = at(S, 'L22', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSmall) { // the line diagram: big stations red with police, three small ones dark
      R(c, 0, 0, W, H, '#0c1420'); L(c, 10, 100, 310, 100, '#8c8c94', 3); const st = [[30, 1], [70, 1], [110, 0], [150, 1], [190, 0], [230, 1], [270, 0], [300, 1]];
      st.forEach(([x, big], i) => { E(c, x, 100, big ? 8 : 5, big ? 8 : 5, big ? '#3c5cc8' : '#2c2c2c'); ER(c, x, 100, big ? 8 : 5, big ? 8 : 5, '#c8c8d0'); if (big) for (let k = 0; k < 4; k++) R(c, x - 6 + k * 4, 76, 2, 6, '#5c6c7c'); else { const g = 0.4 + 0.3 * Math.sin(t * 3 + i); glow(c, x, 100, 16, 12, '#f84040', g * sg(t, S.tSmall + 1, S.tSmall + 2)); } });
      ['コンドリュウチャ', 'ドンレスホース', 'レソスチェップ'].forEach((s, i) => { const x = [110, 190, 270][i]; TX(c, String(i + 1), x - 3, 108, '#f8d860', 16, '#000000'); TX(c, (i + 1) + '　' + s, 70, 30 + i * 18, '#f8d860', 16, '#000000'); });
      return { z: 1.02, fx: 160, fy: 100 };
    }
    // a big station full of uniformed officers
    grayDusk(c, 90, {}); R(c, 20, 20, 280, 90, '#a89c88'); for (let i = 0; i < 9; i++) R(c, 34 + i * 30, 40, 16, 40, '#4c5c6c'); R(c, 120, 6, 80, 20, '#8c7c68'); TX(c, 'РОСТОВ', 128, 6, '#f4f0e8', 16, null);
    R(c, 0, 110, W, 130, '#7c7c78'); const n = Math.min(12, Math.floor(sg(t, 0.4, 4) * 12 + 1)); for (let i = 0; i < n; i++) person(c, MILITIA[i % 4], 20 + i * 25, 150 + (i % 2) * 6, { k: 'mm', flip: i % 2 });
    bigCap(c, '360人', 116, 24, '#f8d860', sg(t, 2.6, 3.2)); yearFlash(c, t, 0.4, 1990, 216, 10, 'ロストフ州');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QI: November 6 at Donleskhoz — grass on the elbows; the name in the notebook; the body found; the arrest ---- */
const QI = {
  name: 'ドンレスホース駅', ch: '逮捕', bgm: 'pulse',
  init(S) { S.tNote = at(S, 'L24', 0) - 0.3; S.tFound = at(S, 'L25', 0) - 0.3; S.tName = at(S, 'L25', 2) - 0.3; S.tArrest = at(S, 'L26', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tArrest) { // outside a cafe: four plainclothes officers
      grayDusk(c, 110, { snow: true }); R(c, 60, 30, 200, 90, '#a8988c'); R(c, 80, 60, 50, 60, '#5c4c3c'); R(c, 150, 50, 90, 40, '#f8e0a0'); R(c, 150, 30, 90, 16, '#5c2c2c'); TX(c, 'КАФЕ', 170, 30, '#f4f0e8', 16, null);
      R(c, 0, 120, W, 120, '#9c9c98'); person(c, CHIKA_COAT, 160, 160, { expr: 'shock', k: 'arr' }); for (let i = 0; i < 4; i++) person(c, PLAIN[i], [120, 136, 186, 202][i], 162, { flip: i > 1, arm: i === 1 || i === 2 ? 'fwd' : null, k: 'arr' });
      yearFlash(c, t, S.tArrest + 0.2, 1990, 216, 10, '11月20日');
      return { z: 1.05, fx: 160, fy: 120 };
    }
    if (t > S.tName) { R(c, 0, 0, W, H, '#241c14'); plate(c, 70, 30, 180, 120, '報告書', '#3c3c44'); for (let i = 0; i < 5; i++) R(c, 82, 60 + i * 14, 150, 2, '#8c8474'); const k = sg(t, S.tName + 0.3, S.tName + 0.9); c.save(); c.globalAlpha = k; R(c, 100, 112, 120, 22, '#f8e870'); TX(c, 'ЧИКАТИЛО', 114, 114, '#141414', 16, null); c.restore(); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tFound) { platform(c, t, {}); for (let i = 0; i < 3; i++) person(c, MILITIA[i], 120 + i * 30, PL_Y, { k: 'fnd' }); softBeam(c, 150, 110, -2.6, 120, 0.2, 0.25); yearFlash(c, t, S.tFound + 0.2, 1990, 216, 10, '11月13日'); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tNote) { // the notebook: the name written down
      R(c, 0, 0, W, H, '#2c2418'); R(c, 80, 30, 160, 130, '#f0e8d0'); for (let i = 0; i < 8; i++) R(c, 88, 48 + i * 14, 144, 1, '#a8c0d8'); const n = Math.floor(sg(t, S.tNote + 0.4, S.tNote + 3) * 8); TX(c, 'ЧИКАТИЛО'.slice(0, n), 96, 62, '#1c2c5c', 16, null); L(c, 200, 140, 230, 100, '#2c2c34', 3);
      return { z: 1.04, fx: 160, fy: 100 };
    }
    platform(c, t, {}); person(c, CHIKA_COAT, 150, PL_Y, { k: 'qi', blink: blinkOf(t, 4) }); person(c, PLAIN[0], 196, PL_Y + 2, { flip: true, arm: 'point', k: 'qi' });
    c.save(); c.globalAlpha = 0.9; R(c, 141, PL_Y - 28, 4, 3, '#5c6c3c'); R(c, 160, PL_Y - 28, 4, 3, '#5c6c3c'); c.restore(); ER(c, 152, PL_Y - 28, 18, 8, '#f8d860');
    yearFlash(c, t, 0.4, 1990, 216, 10, '11月6日');
    return { z: 1.1, fx: 160, fy: 118 };
  }
};

/* ---- QJ: the interrogation; the psychiatrist; tears; the blood type explained ---- */
const QJ = withCuts({
  name: '取り調べ', ch: '自白', bgm: 'eerie',
  init(S) { S.tCry = at(S, 'L28', 0) - 0.3; S.tBlood = at(S, 'L29', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBlood) { R(c, 0, 0, W, H, '#1c1c24'); bloodCard(c, 40, 40, '血液', 'A型', '#2c4c8c', 1); bloodCard(c, 184, 40, '体液', 'AB型', '#8c1c3c', sg(t, S.tBlood + 1, S.tBlood + 1.4)); if (t > S.tBlood + 2) bigCap(c, 'ごく、まれな例', 120, 16, '#f8d860'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCry) { closeUp(c, t, chikaFace({ cry: true, blink: blinkOf(t, 3) }), { bg: ['#141418', '#3c3c48'] }); bigCap(c, '自白 56件', 10, 16, '#f4f0e8', sg(t, S.tCry + 2.4, S.tCry + 3)); return { z: 1.02, fx: 160, fy: 104 }; }
    R(c, 0, 0, W, H, '#4c4c48'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450'); R(c, 0, 150, W, 90, '#3c3c38'); glow(c, 160, 40, 80, 30, '#f8f4d8', 0.35);
    R(c, 80, 120, 160, 8, '#6c5c4c'); person(c, CHIKA, 200, 150, { flip: true, k: 'qj', blink: blinkOf(t, 2) }); person(c, PLAIN[1], 120, 150, { k: 'qj', arm: 'point' });
    capPlate(c, t, 0.4, ['ロストフ', '取り調べ']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
}, [['B1', (c, t, S) => closeUp(c, t, bukhaFace({ blink: blinkOf(t, 7) }), { bg: ['#1c140c', '#4c3424'], glow: '#f8d080' })]]);

/* ---- QK: 1992 — the iron cage in the courtroom; "the defendant is sane"; death ---- */
const QK = withCuts({
  name: '法廷', ch: '檻の中の裁判', bgm: 'requiem',
  init(S) { S.tCry = at(S, 'L30', 2) - 0.3; S.tDeath = at(S, 'L31', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 150, W, 90, '#3c2c20');
    R(c, 20, 40, 120, 40, '#3c2414'); person(c, { id: 'akb', top: 'jacket', coat: '#1c1c24', shirt: '#e8e4dc', tie: '#3c3c5c', pants: '#1c1c24', skin: '#dcac88', hair: '#1c1814' }, 80, 76, { k: 'akb' }); R(c, 20, 56, 120, 24, '#3c2414');
    R(c, 190, 70, 110, 90, '#2c2420'); person(c, { ...CHIKA, id: 'chkb', hairStyle: 'bald', hair: '#8c8884' }, 244, 156, { k: 'cg', expr: t > S.tDeath ? 'angry' : 'normal' }); cage(c, 190, 66, 110, 94);
    if (t > S.tCry) for (let i = 0; i < 5; i++) person(c, FOLK[i], 20 + i * 30, 180, { expr: 'sad', k: 'fam' });
    if (t > S.tDeath) stamp(c, t, S.tDeath + 0.4, 100, 120, '死刑', 70);
    yearFlash(c, t, 0.4, 1992, 216, 0, 'ロストフ');
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['J1', (c, t, S) => closeUp(c, t, judgeFace({ blink: blinkOf(t, 5) }), { bg: ['#1c140c', '#4c3424'], glow: '#f8d8a0', lines: '#f8d8a0' })]]);

/* ---- QL: 1994; 43; the wrongly executed man; the people who never came home ---- */
const QL = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tShadow = at(S, 'L33', 0) - 0.3; S.tCand = at(S, 'L34', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t < S.tShadow) { R(c, 0, 0, W, H, '#0c0c10'); yearFlash(c, t, 0.3, 1994, 112, 30, '2月14日'); bigCap(c, '有罪 43件', 120, 24, '#f4f0e8', sg(t, 3.2, 3.8)); return { z: 1.02, fx: 160, fy: 100 }; }
    platform(c, t, { night: true, sign: false }); dim(c, 0.35, '#06060c');
    if (t < S.tCand) { c.save(); c.globalAlpha = 0.55; for (let i = 0; i < 4; i++) blit(c, tintSpr(modFig(FOLK[i], { f: -1, k: 'sh' }), '#3c3c48', 'sh' + i), 60 + i * 60, PL_Y, FIG_AX2, FIG_AY2); c.restore(); }
    else { const n = (t - S.tCand) * 6; for (let i = 0; i < 24; i++) { const x = 20 + (i % 12) * 25, y = PL_Y + Math.floor(i / 12) * 14 - 8, k = clamp(n - i, 0, 1); if (k > 0) { candle(c, x, y, t, i, k); glow(c, x, y - 6, 10, 8, '#f8c060', 0.25 * k); } } }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 120 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { platform(c, t, {}); person(c, CHIKA_COAT, 160, PL_Y, { k: 'ss1', blink: blinkOf(t, 4) }); c.save(); c.globalAlpha = 0.9; R(c, 151, PL_Y - 28, 4, 3, '#5c6c3c'); R(c, 170, PL_Y - 28, 4, 3, '#5c6c3c'); c.restore(); const k = sg(t, 1.5, 2.5); if (k > 0) { E(c, 166, PL_Y - 47, 1.5 * k, 1 * k, '#c81818'); } return { z: 1.1 + 0.4 * ss(sg(t, 0.5, 3)), fx: 162, fy: PL_Y - 40 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { platform(c, t, { night: true }); blit(c, tintSpr(modFig(CHIKA_COAT, { f: -1, k: 'ss2' }), '#0c0c14', 'ss2s'), 160, PL_Y, FIG_AX2, FIG_AY2, { s: 1.2 }); E(c, 158, PL_Y - 56, 1.5, 1, '#f8f4ec'); E(c, 166, PL_Y - 56, 1.5, 1, '#f8f4ec'); return { z: 1.06, fx: 160, fy: 112 }; }
};
