/* ================= 文庫 #009 藪の中: scenes ================= */
const TJ = (c, t) => closeUp(c, t, tajouFace({ blink: blinkOf(t, 4) }), { bg: ['#0c0c18', '#242c4c'], spk: 'tajou' });
const TJG = (c, t) => closeUp(c, t, tajouFace({ blink: blinkOf(t, 4), grin: true }), { bg: ['#1c0808', '#4c1c1c'], lines: '#c83c3c', spk: 'tajou', talk: false });
const MS = (c, t) => closeUp(c, t, masagoFace({ blink: blinkOf(t, 6) }), { bg: ['#1c0c14', '#4c2c3c'], spk: 'masago' });
const MST = (c, t) => closeUp(c, t, masagoFace({ blink: blinkOf(t, 6), tear: true }), { bg: ['#0c0c14', '#2c2c3c'], spk: 'masago' });
const MSB = (c, t) => closeUp(c, t, masagoFace({ blink: blinkOf(t, 9), burn: true }), { bg: ['#2c0808', '#8c2c1c'], glow: '#f8a040', talk: false });
const MSV = (c, t) => closeUp(c, t, masagoFace({ blink: blinkOf(t, 6) }), { bg: ['#4c6c3c', '#a8bc7c'], glow: '#f8f0c0', talk: false });
const GH = (c, t) => closeUp(c, t, takehiroFace({ blink: blinkOf(t, 8), ghost: true }), { bg: ['#02020a', '#141c3c'], glow: '#5c8cf8', spk: 'takehiro' });
const THG = (c, t) => closeUp(c, t, takehiroFace({ blink: blinkOf(t, 8), glare: true }), { bg: ['#06080c', '#1c2430'], glow: '#a8c8e8', talk: false });
const KK = (c, t) => closeUp(c, t, kikoriFace({ blink: blinkOf(t, 3) }), { bg: ['#1c2414', '#4c5c34'], spk: 'kikori' });
const HS = (c, t) => closeUp(c, t, houshiFace({ blink: blinkOf(t, 5) }), { bg: ['#14141c', '#3c3c4c'], spk: 'houshi' });
const HM = (c, t) => closeUp(c, t, houmenFace({ blink: blinkOf(t, 3) }), { bg: ['#1c0c08', '#4c2c1c'], spk: 'houmen' });
const ON = (c, t) => closeUp(c, t, ounaFace({ blink: blinkOf(t, 4) }), { bg: ['#14100c', '#3c3028'], spk: 'ouna' });

/* ---- YZ: cold open — the grove, light through bamboo, a dead samurai; three who confess (moves: leaves drift, a fly circles; three silhouettes rise one by one) ---- */
const YZ = withCuts({
  name: '藪の中の死骸', ch: '藪の中', bgm: 'eerie',
  init(S) { S.tAsk = at(S, 'C1', 0) - 0.3; S.tWho = at(S, 'C2', 0) - 0.6; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tWho) {
      R(c, 0, 0, W, H, '#06060a'); const ks = [S.tWho, at(S, 'C2', 0) + 0.4, at(S, 'C2', 2), at(S, 'C2', 3)];
      const who = [[TAJOU, 90, '盗人'], [MASAGO, 160, '妻'], [GHOST, 230, '死んだ男']];
      for (let i = 0; i < 3; i++) { const tt = i === 2 ? ks[3] : ks[i + 1] - 0.4; if (t > tt) { const a = sg(t, tt, tt + 0.6); c.save(); c.globalAlpha = a * (i === 2 ? 0.75 : 1); if (i === 2) glow(c, who[i][1], 118, 30, 40, '#5c8cf8', 0.3); robe(c, who[i][0], who[i][1], 150, { k: 'w' + i, blink: blinkOf(t, 3 + i), expr: i === 2 ? 'sad' : 'normal' }); c.restore(); plate(c, who[i][1] - 24, 160 - 106, who[i][2], i === 2 ? '#a8c8f8' : '#f8e8b0'); } }
      return { z: 1.04, fx: 160, fy: 104 };
    }
    grove(c, t, { dark: t > S.tAsk }); corpse(c, 160, 142, t, { fly: true }); if (t > S.tAsk) { dim(c, 0.25); plate(c, 110, 60, '殺したのは、誰か', '#f8e8b0'); }
    return { z: 1.1 + 0.15 * ss(sg(t, 0, S.tWho)), fx: 160, fy: 118 };
  }
}, [['V0', TJG]]);

/* ---- YA: the court — the kebiishi behind the blind; witnesses called one by one; the woodcutter (moves: the blind sways, he kneels, the gavel-like clack) ---- */
const YA = withCuts({
  name: '検非違使', ch: '検非違使', bgm: 'pulse',
  init(S) { S.tKikori = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    court(c, t);
    if (t > S.tKikori) { robe(c, KIKORI, lerp(30, 160, sg(t, S.tKikori, S.tKikori + 2)), 156, { k: 'kw', f: t < S.tKikori + 2 ? Math.floor(t * 5) % 4 : -1, pose: t > S.tKikori + 2 ? 'kneel' : null, arm: t > S.tKikori + 2 ? 'clasp' : null }); plate(c, 20, 96, '木こりの物語', '#f8e8b0'); return { z: 1.18, fx: 160, fy: 116 }; }
    plate(c, 20, 96, '検非違使（けびいし）', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 100 };
  }
}, [['K1', KK]]);

/* ---- YB: what the woodcutter saw — the body face up, the leaves stained; a rope and a comb by the cedar root; the trampled ground (moves: drifting leaves, the comb and rope glint, scattered leaves stir) ---- */
const YB = withCuts({
  name: '死骸', ch: '死骸', bgm: 'eerie',
  init(S) { S.tTrample = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    grove(c, t);
    if (t > S.tTrample) { corpse(c, 170, 142, t, { fly: true }); for (let i = 0; i < 14; i++) { const a = hash(i) * TAU; L(c, 100 + Math.cos(a) * 60 + i * 3, 140 + Math.sin(a) * 6, 104 + Math.cos(a) * 60 + i * 3, 142 + Math.sin(a) * 6, '#5c4428'); } for (let i = 0; i < 8; i++) { const u = fr(t * 0.6 + i / 8); P(c, 80 + i * 20, 140 - u * 10, '#c8a860'); } plate(c, 20, 50, '踏み荒らされた落ち葉', '#f8e8b0'); return { z: 1.1, fx: 150, fy: 118 }; }
    corpse(c, 170, 142, t, { fly: true });
    return { z: 1.18, fx: 166, fy: 122 };
  }
}, [['K2', (c, t) => { grove(c, t); R(c, 120, 0, 14, 150, '#5c4030'); L(c, 110, 146, 140, 140, '#c8a870', 2); ER(c, 118, 144, 8, 4, '#c8a870'); ER(c, 122, 146, 6, 3, '#c8a870'); R(c, 180, 140, 18, 4, '#a8783c'); for (let i = 0; i < 9; i++) R(c, 181 + i * 2, 136, 1, 4, '#a8783c'); if (fr(t) < 0.3) P(c, 196, 138, '#ffffff'); plate(c, 90, 100, '縄', '#f8e8b0'); plate(c, 180, 100, '櫛', '#f8e8b0'); return { z: 1.3, fx: 160, fy: 128 }; }]]);

/* ---- YC: the travelling monk — yesterday at noon, the couple on the road: a woman on a pale horse, veiled; the samurai with bow and quiver; dew and lightning (moves: the horse walks, grass sways, the quiver close, a lightning flash) ---- */
const YC = withCuts({
  name: '旅法師', ch: '旅法師の物語', bgm: 'memory',
  init(S) { S.tRoad = at(S, 'H1', 0) - 0.3; S.tQuiver = at(S, 'L6', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQuiver) { R(c, 0, 0, W, H, '#c8b890'); VG(c, 0, 0, W, 190, ['#a89c7c', '#c8b890', '#a89c7c']); PF(c, [120, 40, 170, 40, 176, 150, 114, 150], '#1c1c1c'); R(c, 118, 40, 54, 6, '#3c3c3c'); for (let i = 0; i < 20; i++) { const x = 126 + (i % 10) * 4, y = 20 + (i > 9 ? 6 : 0); L(c, x, y, x, y + 50, '#8c6c44'); PF(c, [x - 2, y, x, y - 8, x + 2, y], '#f4f0e8'); } plate(c, 190, 70, '黒塗りの箙', '#f8e8b0'); plate(c, 190, 96, '矢は二十あまり', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 100 }; }
    if (t > S.tRoad) { road(c, t); const x = lerp(-40, 200, sg(t, S.tRoad, S.tQuiver)); horse(c, x, 150, t, { walk: true, saddle: true }); robe(c, MASAGO_KASA, x - 2, 126, { k: 'rd', pose: 'sit' }); robe(c, TAKEHIRO, x + 44, 156, { k: 'rt', f: Math.floor(t * 5) % 4 }); L(c, x + 34, 112, x + 36, 150, '#8c5c2c', 2); return { z: 1.08, fx: Math.max(130, Math.min(190, x + 20)), fy: 116 }; }
    court(c, t); robe(c, HOUSHI, lerp(30, 160, sg(t, 0, 2)), 156, { k: 'hw', f: t < 2 ? Math.floor(t * 4) % 4 : -1, pose: t > 2 ? 'kneel' : null, arm: t > 2 ? 'clasp' : null }); plate(c, 20, 96, '旅法師の物語', '#f8e8b0');
    return { z: 1.08, fx: 160, fy: 112 };
  }
}, [['H1', HS], ['H2', (c, t) => { const r = HS(c, t); if (fr(t * 0.4) < 0.08) { dim(c, 0.5, '#f8f8ff'); L(c, 280, 30, 270, 60, '#ffffff', 2); L(c, 270, 60, 284, 70, '#ffffff', 2); } for (let i = 0; i < 4; i++) { const u = fr(t * 0.5 + i / 4); E(c, 40 + i * 16, 50 + u * 60, 2, 3, '#c8e8f8'); } return r; }]]);

/* ---- YD: the constable — Tajomaru caught moaning on the Awataguchi bridge; the pale horse grazing; "女好きのやつ" (moves: he writhes, the horse grazes, water flows) ---- */
const YD = withCuts({
  name: '放免', ch: '放免の物語', bgm: 'pulse',
  init(S) { S.tBridge = at(S, 'L8', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBridge) { bridgeNight(c, t); const wr = Math.sin(t * 3) * 0.12; robe(c, TAJOU, 140, 122, { k: 'bt', pose: 'sit', rot: -1.3 + wr, blink: 2 }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.7 + i / 3); c.save(); c.globalAlpha = 1 - u; TX(c, 'う', 150 + i * 12, 86 - u * 16, '#c8c8e8', 16, null); c.restore(); } L(c, 100, 120, 120, 104, '#8c5c2c', 2); horse(c, 262, 124, t, { graze: true }); return { z: 1.06, fx: 180, fy: 104 }; }
    court(c, t); robe(c, HOUMEN, 120, 156, { k: 'hk', pose: 'kneel', arm: 'clasp' }); robe(c, TAJOU, 200, 156, { k: 'tk', pose: 'kneel', arm: 'clasp', expr: 'smile' }); ropes(c, 200, 126, 3); plate(c, 20, 96, '放免の物語', '#f8e8b0');
    return { z: 1.08, fx: 160, fy: 112 };
  }
}, [['B1', HM], ['B2', HM]]);

/* ---- YE: the old woman — her son-in-law Takehiro; her daughter Masago, nineteen, a mole by the eye; "娘の行方を" (moves: tears, the portrait of the daughter, she sobs) ---- */
const YE = withCuts({
  name: '媼', ch: '媼の物語', bgm: 'requiem',
  init(S) { S.tCry = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    court(c, t); const sob = t > S.tCry ? Math.round(Math.sin(t * 6)) : 0; robe(c, OUNA, lerp(30, 160, sg(t, 0, 2)), 156 + sob, { k: 'ow', f: t < 2 ? Math.floor(t * 3) % 4 : -1, pose: t > 2 ? (t > S.tCry ? 'bow' : 'kneel') : null, arm: t > 2 ? 'clasp' : null, expr: t > S.tCry ? 'cry' : 'sad' }); plate(c, 20, 96, '媼の物語', '#f8e8b0');
    if (t > S.tCry + 1.5) plate(c, 150, 50, '娘は、どこへ', '#c8c8d8');
    return { z: 1.1, fx: 160, fy: 112 };
  }
}, [['O1', ON], ['L10', (c, t) => { const r = MSV(c, t); plate(c, 228, 60, '真砂', '#f8e8b0'); plate(c, 228, 86, '十九歳', '#f8e8b0'); return r; }], ['O2', ON]]);

/* ---- YF: Tajomaru's confession — "殺したのは、わたしです"; the wind lifts the veil; a face like a bodhisattva; the lure of the old tomb's treasure (moves: the veil lifts, petals of light, he points to the hills) ---- */
const YF = withCuts({
  name: '多襄丸の白状', ch: '多襄丸の白状', bgm: 'dread',
  init(S) { S.tVeil = at(S, 'L13', 0) - 0.3; S.tFace = at(S, 'L13', 2) - 0.3; S.tLure = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLure) { road(c, t); horse(c, 210, 150, t, { saddle: true }); robe(c, MASAGO_KASA, 208, 126, { k: 'lm', pose: 'sit' }); robe(c, TAKEHIRO, 160, 156, { k: 'lt', flip: true }); robe(c, TAJOU, 100, 156, { k: 'lj', arm: 'point', expr: 'smile' }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.5 + i / 3); P(c, 60 + u * 10, 70 - u * 6, '#f8e8a0'); } plate(c, 40, 50, '古塚の宝', '#f8e8a0'); return { z: 1.1, fx: 150, fy: 116 }; }
    if (t > S.tFace) return MSV(c, t);
    if (t > S.tVeil) { road(c, t); for (let i = 0; i < 8; i++) { const u = fr(t * 1.2 + i / 8); L(c, u * 340 - 20, 60 + i * 10, u * 340 + 6, 60 + i * 10, '#f8f8f0'); } horse(c, 170, 150, t, { saddle: true }); robe(c, MASAGO_KASA, 168, 126, { k: 'vm', pose: 'sit', lift: sg(t, S.tVeil, S.tVeil + 1) > 0.5 }); robe(c, TAJOU, 70, 156, { k: 'vj', expr: 'shock' }); return { z: 1.16, fx: 150, fy: 110 }; }
    court(c, t); robe(c, TAJOU, 160, 156, { k: 'ck', pose: 'kneel', arm: 'clasp', expr: 'smile' }); ropes(c, 160, 126, 3); plate(c, 20, 96, '多襄丸の白状', '#f8c8c8');
    return { z: 1.12, fx: 160, fy: 112 };
  }
}, [['T1', TJ], ['T2', TJG]]);

/* ---- YG: Tajomaru's account in the grove — the husband bound to a cedar; the woman's knife; overpowered; "どちらか一人死んでくれ"; the duel, the 23rd pass; she is gone (moves: the knife flashes, the duel's clashes counted, an empty grove) ---- */
const YG = withCuts({
  name: '盗人の話', ch: '盗人の話', bgm: 'dread',
  init(S) { S.tKnife = at(S, 'L16', 1) - 0.3; S.tDrop = at(S, 'L17', 0) - 0.3; S.tCling = at(S, 'L18', 0) - 0.3; S.tDuel = at(S, 'T4', 1) - 0.3; S.tGone = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGone) { grove(c, t); robe(c, TAJOU, 170, 150, { k: 'gl', expr: 'shock', flip: Math.floor(t * 0.8) % 2 === 1 }); L(c, 184, 122, 196, 140, '#e0e4ec', 2); corpse(c, 90, 142, t, { blood: true }); return { z: 1.1, fx: 160, fy: 112 }; }
    if (t > S.tDuel) { grove(c, t); const n = Math.min(23, 1 + Math.floor((t - S.tDuel) * 6)), ph = Math.floor(t * 6) % 2; robe(c, TAKEHIRO, 130 - ph * 4, 150, { k: 'dk', arm: ph ? 'up' : 'reach', expr: 'angry' }); robe(c, TAJOU, 190 + ph * 4, 150, { k: 'dj', arm: ph ? 'reach' : 'up', expr: 'angry', flip: true }); L(c, 144, 108 + ph * 10, 166, 96 + ph * 14, '#e0e4ec', 2); L(c, 176, 100 - ph * 6, 156, 112 - ph * 4, '#e0e4ec', 2); if (ph) for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; P(c, 160 + Math.cos(a) * 6, 104 + Math.sin(a) * 6, '#f8f0a0'); } plate(c, 120, 50, n + '合', n === 23 ? '#f8a0a0' : '#f8e8b0'); return { z: 1.12, fx: 160, fy: 108 }; }
    grove(c, t); R(c, 70, 0, 12, 150, '#5c4030'); robe(c, TAKEHIRO, 76, 150, { k: 'bd', expr: 'angry' }); ropes(c, 76, 112, 4);
    if (t > S.tCling) { robe(c, MASAGO, 180, 150, { k: 'cm', arm: 'reach', expr: 'cry' }); robe(c, TAJOU, 200, 150, { k: 'cj', expr: 'shock' }); return { z: 1.12, fx: 160, fy: 110 }; }
    if (t > S.tDrop) { robe(c, MASAGO, 170, 154, { k: 'dm', pose: 'kneel', expr: 'cry' }); robe(c, TAJOU, 210, 150, { k: 'dt', expr: 'smile', flip: true }); const a = (t - S.tDrop) * 12; if (t < S.tDrop + 0.8) knife(c, 190 + (t - S.tDrop) * 60, 110 + (t - S.tDrop) * 40, a); else knife(c, 240, 146, 0.2); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tKnife) { robe(c, MASAGO, 160, 150, { k: 'km', arm: 'up', expr: 'angry' }); knife(c, 166, 98, -1.2, 0.5 + 0.5 * Math.sin(t * 8)); robe(c, TAJOU, 216, 150, { k: 'kj', expr: 'shock', flip: true }); return { z: 1.14, fx: 170, fy: 108 }; }
    if (t > at(S, 'L16', 0) - 0.3) { robe(c, MASAGO_KASA, lerp(300, 170, sg(t, at(S, 'L16', 0), S.tKnife)), 150, { k: 'wm', f: Math.floor(t * 4) % 4, flip: true }); robe(c, TAJOU, lerp(320, 230, sg(t, at(S, 'L16', 0), S.tKnife)), 150, { k: 'wj', f: Math.floor(t * 4) % 4, flip: true }); return { z: 1.06, fx: 160, fy: 108 }; }
    const k = sg(t, 0.5, 3); robe(c, TAJOU, lerp(140, 100, k), 150, { k: 'gj', arm: 'reach', expr: 'angry' }); return { z: 1.12, fx: 110, fy: 108 };
  }
}, [['T3', TJ], ['L19', (c, t) => { const r = MSB(c, t); return r; }], ['T4', (c, t, S) => t < S.tDuel ? TJ(c, t) : null], ['T5', TJG]]);

/* ---- YH: Kiyomizu — "all settled"; then a woman confessing before the Kannon; her story differs; the husband's cold eyes (moves: incense smoke, lanterns flicker, the eyes glint) ---- */
const YH = withCuts({
  name: '清水寺', ch: '女の懺悔', bgm: 'requiem',
  init(S) { S.tKiyo = at(S, 'L22', 1) - 0.3; S.tKick = at(S, 'L24', 0) - 0.3; S.tEyes = at(S, 'L24', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEyes) { R(c, 0, 0, W, H, '#06080c'); blit(c, takehiroFace({ glare: true }), 160, 100, 24, 24, { s: 2.6 }); c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3); P(c, 160 - 22, 90, '#ffffff'); P(c, 160 + 6, 90, '#ffffff'); c.restore(); dim(c, 0.2, '#0c1830'); plate(c, 20, 46, '夫の目', '#a8c8e8'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tKick) { grove(c, t, { red: 0.35 }); R(c, 70, 0, 12, 150, '#5c4030'); robe(c, TAKEHIRO, 76, 150, { k: 'kt', expr: 'sad' }); ropes(c, 76, 112, 4); const kk = sg(t, S.tKick + 0.6, S.tKick + 1); robe(c, MASAGO, lerp(150, 130, kk), kk > 0.5 ? 154 : 150, { k: 'kkm', pose: kk > 0.5 ? 'kneel' : null, arm: kk > 0.5 ? null : 'reach', expr: 'cry', flip: true }); robe(c, TAJOU, 200, 150, { k: 'kkj', arm: kk > 0 && kk < 1 ? 'reach' : null, flip: true, expr: 'smile' }); return { z: 1.1, fx: 140, fy: 110 }; }
    if (t > S.tKiyo) { kiyomizu(c, t); robe(c, MASAGO, 160, 150, { k: 'pr', pose: 'kneel', arm: 'clasp', blink: blinkOf(t, 6), expr: 'sad' }); plate(c, 20, 46, '清水寺', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 112 }; }
    court(c, t, { mat: true }); R(c, 140, 120, 40, 26, '#f4f0e0'); for (let i = 0; i < 5; i++) R(c, 146, 124 + i * 4, 28, 1, '#5c5c5c'); plate(c, 120, 96, '一件落着？', '#f8e8b0');
    return { z: 1.08, fx: 160, fy: 110 };
  }
}, [['M1', MS], ['M2', MST]]);

/* ---- YI: Masago's account — he glares, bound; "お残し申す訳には"; the knife; "殺せ"; she stabs (no wound shown — a red flash, darkness); she could not die (moves: the glare, the knife rises, the flash; ripples on the pond) ---- */
const YI = withCuts({
  name: '殺せ', ch: '殺せ', bgm: 'requiem',
  init(S) { S.tStab = at(S, 'L27', 1) - 0.1; S.tPond = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPond) { pond(c, t); robe(c, MASAGO, 90, 148, { k: 'pm', pose: 'kneel', expr: 'cry' }); return { z: 1.1, fx: 150, fy: 110 }; }
    if (t > at(S, 'L27', 0) - 0.3) { grove(c, t, { dark: true }); R(c, 70, 0, 12, 150, '#3c2c20'); robe(c, TAKEHIRO, 76, 150, { k: 'st', expr: 'angry' }); ropes(c, 76, 112, 4); robe(c, MASAGO, 120, 150, { k: 'sm', arm: 'up', expr: 'cry', flip: true }); knife(c, 112, 98, -2.0, 0.5 + 0.5 * Math.sin(t * 8)); if (t > S.tStab) { dim(c, 0.85, '#000000'); blackFlash(c, t, S.tStab, '#8c1010', 0.6); } return { z: 1.12, fx: 110, fy: 108 }; }
    grove(c, t, { dark: true }); R(c, 70, 0, 12, 150, '#3c2c20'); robe(c, TAKEHIRO, 76, 150, { k: 'gt', expr: 'angry', blink: blinkOf(t, 8) }); ropes(c, 76, 112, 4); robe(c, MASAGO, lerp(200, 130, sg(t, 0.5, 5)), 150, { k: 'gm', f: t < 5 ? Math.floor(t * 2) % 4 : -1, expr: 'sad', flip: true });
    return { z: 1.1, fx: 120, fy: 110 };
  }
}, [['M3', MST], ['M4', MS], ['L26', (c, t) => { const r = THG(c, t); plate(c, 230, 70, '殺せ', '#f8a0a0'); return r; }]]);

/* ---- YJ: the medium — two who say "I killed him"; a miko in white and scarlet; the dead man speaks; the thief comforts the wife; she lifts her face (moves: candles, blue glow, the medium sways) ---- */
const YJ = withCuts({
  name: '巫女', ch: '死霊の物語', bgm: 'eerie',
  init(S) { S.tMiko = at(S, 'L30', 0) - 0.3; S.tTalk = at(S, 'L31', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTalk) { grove(c, t, { dark: true }); dim(c, 0.2, '#0c1838'); R(c, 70, 0, 12, 150, '#3c2c20'); robe(c, GHOST, 76, 150, { k: 'jt', expr: 'sad' }); ropes(c, 76, 112, 4); robe(c, TAJOU, 200, 154, { k: 'jj', pose: 'kneel', arm: 'reach', expr: 'smile', flip: true }); robe(c, MASAGO, 160, 154, { k: 'jm', pose: 'kneel', expr: t > at(S, 'L31', 1) ? 'normal' : 'sad' }); return { z: 1.12, fx: 150, fy: 112 }; }
    if (t > S.tMiko) { mikoRoom(c, t, { ghost: t > at(S, 'L30', 2) - 0.3 }); const sw = Math.sin(t * 1.5) * 0.08; robe(c, MIKO, 160, 152, { k: 'mk', pose: 'kneel', arm: 'clasp', blink: 2, rot: sw }); if (t > at(S, 'L30', 2) - 0.3) { c.save(); c.globalAlpha = 0.35 + 0.15 * Math.sin(t * 2); robe(c, GHOST, 160, 128, { k: 'mg', expr: 'sad', blink: 2 }); c.restore(); } return { z: 1.12, fx: 160, fy: 112 }; }
    R(c, 0, 0, W, H, '#06060a'); robe(c, TAJOU, 110, 150, { k: 'w1' }); robe(c, MASAGO, 210, 150, { k: 'w2' }); plate(c, 70, 60, 'わたしが殺した', '#f8c8c8'); plate(c, 170, 80, 'わたしが殺した', '#f8c8c8');
    return { z: 1.04, fx: 160, fy: 104 };
  }
}, [['D1', GH], ['D2', GH]]);

/* ---- YK: the wife's word — she points at him: "あの人を殺して下さい"; even the thief pales; "殺すか、助けるか"; she flees; the thief cuts one rope and goes; alone, the sound of weeping is his own (moves: the pointing hand, the flight, a cut rope, tears) ---- */
const YK = withCuts({
  name: '妻の言葉', ch: '妻の言葉', bgm: 'dread',
  init(S) { S.tPoint = at(S, 'L32', 1) - 0.3; S.tPale = at(S, 'L33', 1) - 0.3; S.tFlee = at(S, 'L34', 0) - 0.3; S.tCut = at(S, 'L34', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    grove(c, t, { dark: true }); dim(c, 0.2, '#0c1838'); R(c, 70, 0, 12, 150, '#3c2c20');
    if (t > S.tCut) { robe(c, GHOST, 76, 150, { k: 'kc', expr: 'cry' }); ropes(c, 76, 112, 3); L(c, 64, 130, 72, 140, '#c8a870'); const out = sg(t, S.tCut, S.tCut + 2); robe(c, TAJOU, lerp(200, 340, out), 150, { k: 'kx', f: Math.floor(t * 4) % 4 }); return { z: 1.12, fx: 120, fy: 110 }; }
    robe(c, GHOST, 76, 150, { k: 'kg', expr: t > S.tPale ? 'shock' : 'sad' }); ropes(c, 76, 112, 4);
    if (t > S.tFlee) { const k = sg(t, S.tFlee, S.tFlee + 1.5); robe(c, MASAGO, lerp(170, 360, k), 150, { k: 'kf', f: Math.floor(t * 8) % 4, expr: 'shock' }); robe(c, TAJOU, 210, 150, { k: 'kf2', arm: 'reach' }); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tPale) { robe(c, MASAGO, 150, 154, { k: 'kp', pose: 'kneel', expr: 'cry' }); robe(c, TAJOU, 200, 150, { k: 'kpj', arm: 'clasp', expr: 'normal', flip: true }); return { z: 1.12, fx: 150, fy: 112 }; }
    robe(c, MASAGO, 150, 150, { k: 'kpt', arm: t > S.tPoint ? 'point' : null, expr: t > S.tPoint ? 'angry' : 'normal', flip: true }); robe(c, TAJOU, 196, 150, { k: 'kpj2', arm: 'reach', expr: t > S.tPoint ? 'shock' : 'smile', flip: true });
    return { z: 1.1, fx: 130, fy: 110 };
  }
}, [['D3', MSB], ['D4', (c, t) => { const r = TJ(c, t); return r; }], ['D5', GH]]);

/* ---- YL: into the dark — he takes up the knife (no wound shown: the glint, then dark); "何と云う静かさ"; footsteps; an unseen hand draws the knife; the dark between lives (moves: the light fading over the canopy, a shadow approaching, the glint vanishing) ---- */
const YL = withCuts({
  name: '中有の闇', ch: '中有の闇', bgm: 'requiem',
  init(S) { S.tStab = at(S, 'L35', 1) - 0.1; S.tShadow = at(S, 'L36', 0) - 0.3; S.tHand = at(S, 'D7', 0) - 0.3; S.tVoid = at(S, 'L37', 0) - 0.3; S.dur = lastSe(S) + 2.4; },
  draw(c, t, S) {
    if (t > S.tVoid) { chuu(c, t, 1 - 0.5 * sg(t, S.tVoid, S.dur)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tHand) { grove(c, t, { dark: true }); dim(c, 0.55); robe(c, GHOST, 160, 140, { k: 'lh', pose: 'sit', blink: 2, rot: -1.5 }); const k = sg(t, S.tHand + 0.4, S.tHand + 2.4); c.save(); c.globalAlpha = 0.6; L(c, 220, 60, lerp(220, 168, Math.min(1, k * 2)), lerp(60, 118, Math.min(1, k * 2)), '#2c2c3c', 3); c.restore(); if (k < 0.5) knife(c, 164, 120, -1.57, 0.8); else knife(c, lerp(164, 220, (k - 0.5) * 2), lerp(120, 60, (k - 0.5) * 2), -1.57, 0); return { z: 1.18, fx: 170, fy: 108 }; }
    if (t > S.tShadow) { grove(c, t, { dark: true }); dim(c, 0.45); robe(c, GHOST, 160, 140, { k: 'ls', pose: 'sit', blink: 2, rot: -1.5 }); const k = sg(t, S.tShadow, S.tHand); c.save(); c.globalAlpha = 0.25 + 0.1 * Math.sin(t * 2); blit(c, robeFig(TAJOU, { k: 'shd', f: Math.floor(t * 2) % 4 }), lerp(300, 220, k), 150, FIG_AX2, FIG_AY2, { flip: true }); c.restore(); dim(c, 0.2, '#000000'); TX(c, '？', 230, 70, '#5c5c7c', 16, null); return { z: 1.1, fx: 190, fy: 108 }; }
    if (t > at(S, 'D6', 0) - 0.3) { grove(c, t); dim(c, 0.3 + 0.5 * sg(t, at(S, 'D6', 0), S.tShadow)); robe(c, GHOST, 160, 140, { k: 'lq', pose: 'sit', blink: 2, rot: -1.5 }); return { z: 1.06, fx: 160, fy: 80 }; }
    grove(c, t, { dark: true }); R(c, 70, 0, 12, 150, '#3c2c20'); robe(c, GHOST, 130, 150, { k: 'lk', arm: 'up', expr: 'cry' }); knife(c, 136, 96, -2.0, 0.5 + 0.5 * Math.sin(t * 8)); if (t > S.tStab) { dim(c, 0.9, '#000000'); blackFlash(c, t, S.tStab, '#8c1010', 0.6); }
    return { z: 1.12, fx: 130, fy: 108 };
  }
}, [['D6', GH], ['D7', (c, t, S) => null]]);

/* ---- YM: the truth is in the grove — three faces, three stories; who drew the knife? the grove fades (moves: three faces light in turn, leaves fall, the grove dims) ---- */
const YM = {
  name: '真実', ch: '真実は', bgm: 'eerie',
  init(S) { S.tAsk = at(S, 'L39', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAsk) { grove(c, t, { dark: t > at(S, 'L40', 0) - 0.3 }); corpse(c, 160, 142, t, { blood: true }); if (t > at(S, 'L39', 2) - 0.3) { knife(c, 200, 120, -0.8, 0.5 + 0.5 * Math.sin(t * 4)); TX(c, '？', 210, 90, '#f8e8b0', 16, null); } return { z: 1.1 + 0.08 * sg(t, S.tAsk, S.dur), fx: 170, fy: 118 }; }
    R(c, 0, 0, W, H, '#06060a'); const fs = [[tajouFace({}), 70, '私が殺した', '#242c4c'], [masagoFace({}), 160, '私が殺した', '#4c2c3c'], [takehiroFace({ ghost: true }), 250, '自分で死んだ', '#141c3c']];
    for (let i = 0; i < 3; i++) { const tt = at(S, 'L38', i) - 0.3; if (t > tt) { R(c, fs[i][1] - 44, 46, 88, 88, fs[i][3]); blit(c, fs[i][0], fs[i][1], 92, 24, 24, { s: 1.7 }); plate(c, fs[i][1] - (i === 2 ? 48 : 40), 136, fs[i][2], i === 2 ? '#a8c8f8' : '#f8c8c8'); } }
    return { z: 1.02, fx: 160, fy: 100 };
  }
};
const YN = {
  name: '藪', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { grove(c, t, { dark: true }); dim(c, 0.3 * sg(t, 2, 12)); return { z: 1.04, fx: 160, fy: 100 }; }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '三人の白状', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { grove(c, t); corpse(c, 160, 142, t, { fly: true }); const n = Math.min(2, Math.floor(t / 2.2)); if (n > 0) { robe(c, TAJOU, 90, 150, { k: 's1a', expr: 'smile' }); plate(c, 50, 50, 'わたしが殺した', '#f8c8c8'); } if (n > 1) { robe(c, MASAGO, 240, 150, { k: 's1b', flip: true }); plate(c, 170, 76, 'わたしが殺した', '#f8c8c8'); } return { z: 1.08, fx: 160, fy: 116 }; } };
const SS2 = { name: '藪の中', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { grove(c, t); corpse(c, 160, 142, t, { fly: true }); return { z: 1.06 + 0.1 * ss(sg(t, 0, S.dur)), fx: 160, fy: 120 }; } };
