/* ================= 文庫 #005 人間椅子: scenes ================= */
const darkBg = ['#08060a', '#2c2028'], leatherBg = ['#1c1814', '#5c564c'], pinkBg = ['#2c1420', '#8c4c6c'];
function letterPage(c, t, x, y, w, h, k, head) { // a manuscript page; lines appear with k (0..1)
  R(c, x, y, w, h, '#f4f0e4'); R(c, x, y, w, 3, '#d8d0c0'); for (let i = 0; i < 8; i++) R(c, x + w - 14 - i * (w - 20) / 8, y + 8, 1, h - 16, '#e0b8b0'); // vertical genko-yoshi lines
  if (head) TX(c, head, x + w - 26, y + 10, '#2c2420', 16, null);
  const n = Math.floor(k * 7); for (let i = 0; i < n; i++) { const lx = x + w - 30 - i * (w - 20) / 8; for (let j = 0; j < 8; j++) R(c, lx, y + 30 + j * 8, 4, 5, '#3c3430'); }
}
function yoshiko(c, x, y, o = {}) { blit(c, robeFig(YOSHIKO, { f: o.f == null ? -1 : o.f, pose: o.pose, arm: o.arm, expr: o.expr, k: 'y' + (o.k || '') }), x, y, FIG_AX2, FIG_AY2, { s: o.s || 1, flip: o.flip }); }

/* ---- NA: cold open — the study at morning; the chair; a voice from the dark ---- */
const NA = {
  name: '書斎の椅子', ch: 'プロローグ', bgm: 'eerie',
  init(S) { S.tX = ln(S, 'C1') ? at(S, 'C1', 1) - 0.2 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const xr = ln(S, 'M0') && inLine(S, t, 'M0');
    study(c, t, {}); armchair(c, 150, 160, { s: 1.6, xray: xr && t > at(S, 'M0', 1) - 0.2 });
    if (t > S.tX) { R(c, 0, 0, W, H, '#1c1410'); glow(c, 160, 80, 140, 80, '#f8d080', 0.2); letterPage(c, t, 90, 30, 140, 120, 0.05, '奥様'); return { z: 1.1, fx: 160, fy: 90 }; }
    if (ln(S, 'C0') && t > at(S, 'C0', 0)) yoshiko(c, 220, 160, { k: 'na' });
    return { z: xr ? 1.35 + 0.3 * sg(t, at(S, 'M0', 1), at(S, 'M0', 1) + 3) : 1.05, fx: xr ? 150 : 160, fy: xr ? 128 : 110 };
  }
};

/* ---- NB: Yoshiko, the writer; the morning letters ---- */
const NB = {
  name: '佳子', ch: '女流作家と手紙', bgm: 'memory',
  init(S) { S.tPile = at(S, 'L2', 0) - 0.3; S.tRead = at(S, 'L3', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    study(c, t, {});
    if (t < S.tPile) { yoshiko(c, lerp(300, 200, ss(sg(t, 0.3, 3))), 158, { f: Math.floor(t * 5) & 3, k: 'nb' }); armchair(c, 150, 160, { s: 1.4 }); return { z: 1.03, fx: 160, fy: 110 }; }
    armchair(c, 150, 160, { s: 1.4 }); yoshiko(c, 150, 146, { pose: 'sit', arm: 'reach', k: 'nbs' });
    const n = Math.min(6, Math.floor((t - S.tPile) * 2)); for (let i = 0; i < n; i++) { R(c, 124 + i * 4, 100 - i * 3, 18, 12, '#f4f0e4'); R(c, 124 + i * 4, 100 - i * 3, 18, 2, '#c8a878'); }
    if (t > S.tRead) { R(c, 170, 92, 22, 16, '#e8dcc0'); R(c, 170, 92, 22, 3, '#a89878'); }
    return { z: 1.2, fx: 150, fy: 112 };
  }
};
withCuts(NB, [['L3', (c, t, S) => (t > at(S, 'L3', 2) - 0.2 ? closeUp(c, t, yoshikoFace({ blink: blinkOf(t, 3) }), { bg: pinkBg, glow: '#f8c8d8' }) : null)]]);

/* ---- NC: the letter — "Madam" — the confession begins ---- */
const NC = {
  name: '告白', ch: '奥様、', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c1410'); glow(c, 160, 80, 140, 80, '#f8d080', 0.2);
    letterPage(c, t, 80, 14, 160, 136, sg(t, 0.3, S.dur), '奥様');
    return { z: 1.03 + 0.06 * ss(t / S.dur), fx: 160, fy: 80 };
  }
};
withCuts(NC, [['M2', (c, t) => closeUp(c, t, withMouth('cot2', otokoFace({ blink: blinkOf(t, 5) }), { mouth: (Math.floor(t * 8) & 1) + 0.4 }, 24, 30), { bg: darkBg })]]);

/* ---- ND: the workshop; dreams in a finished chair ---- */
const ND = {
  name: '椅子職人', ch: '醜い椅子職人', bgm: 'memory',
  init(S) { S.tDream = at(S, 'L5', 2) - 0.3; S.tWake = ln(S, 'L6') ? at(S, 'L6', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    workshop(c, t);
    if (t > S.tDream && t < S.tWake) { // the dream: a grand room appears around him
      const k = sg(t, S.tDream, S.tDream + 1.5); c.save(); c.globalAlpha = k; hotelLounge(c, t); c.restore();
      for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); E(c, 40 + i * 28, 140 - u * 100, 2, 2, DA('#f8e8a0', 1 - u)); }
    }
    armchair(c, 160, 158, { s: 1.5 }); blit(c, modFig(OTOKO, { f: -1, expr: t > S.tDream && t < S.tWake ? 'smile' : 'sad', k: 'nd' }), 160, 146, FIG_AX2, FIG_AY2);
    if (t < S.tDream) for (let i = 0; i < 3; i++) { const u = fr(t * 2 + i / 3); L(c, 100 + i * 8, 150 - u * 6, 104 + i * 8, 146 - u * 6, '#c8a878'); } // chisel shavings
    return { z: 1.06, fx: 160, fy: 112 };
  }
};

/* ---- NE: the great leather armchair for the hotel; the devil's whisper; he rebuilds it ---- */
const NE = {
  name: '悪魔のささやき', ch: '悪魔のささやき', bgm: 'dread',
  init(S) { S.tSit = at(S, 'L8', 1) - 0.3; S.tWhisper = at(S, 'L8', 2) - 0.3; S.tBreak = ln(S, 'L9') ? at(S, 'L9', 0) - 0.3 : 1e9; S.tRebuild = ln(S, 'L9') ? at(S, 'L9', 1) - 0.3 : 1e9; S.tParts = ln(S, 'L10') ? at(S, 'L10', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    workshop(c, t);
    if (t > S.tParts) { // cross-section: the hollow inside, a breathing slit, a shelf with canteen and biscuits, a lid underneath
      R(c, 0, 0, W, H, '#1c1814'); for (let x = 0; x < W; x += 16) R(c, x, 0, 1, H, '#241e18'); armchair(c, 160, 170, { s: 3, xray: true });
      const k = Math.floor(sg(t, S.tParts, S.tParts + 4) * 3); const tags = [[118, 52, '隙間'], [210, 60, '水筒と堅パン'], [130, 170, '出入り口']];
      for (let i = 0; i < k; i++) { const [x, y, s] = tags[i]; TX(c, s, x, y, '#f8e8a0', 16, '#000000'); }
      return { z: 1.0, fx: 160, fy: 110 };
    }
    if (t > S.tBreak) { armchair(c, 160, 158, { s: 1.6, broken: t < S.tRebuild + 1.6 }); for (let i = 0; i < 3; i++) { const u = fr(t * 3 + i / 3); L(c, 130 + i * 20, 110 - u * 10, 136 + i * 20, 104 - u * 10, '#c8a878'); } blit(c, modFig(OTOKO, { f: -1, arm: 'dig', k: 'ne' }), 110, 158, FIG_AX2, FIG_AY2); return { z: 1.1, fx: 150, fy: 120, sx: Math.round(Math.sin(t * 30)) }; }
    armchair(c, 160, 158, { s: 1.6 });
    if (t > S.tSit) blit(c, modFig(OTOKO, { f: -1, expr: t > S.tWhisper ? 'smile' : 'normal', k: 'ne2' }), 160, 140, FIG_AX2, FIG_AY2); else blit(c, modFig(OTOKO, { f: -1, arm: 'hold', k: 'ne3' }), 110, 158, FIG_AX2, FIG_AY2);
    if (t > S.tWhisper) { c.save(); c.globalAlpha = 0.4 * sg(t, S.tWhisper, S.tWhisper + 2); c.fillStyle = '#3c0410'; c.fillRect(0, 0, W, H); c.restore(); glow(c, 176, 100, 30, 20, '#c81830', 0.3); }
    return { z: 1.1 + 0.25 * ss(sg(t, S.tWhisper, S.tWhisper + 3)), fx: 160, fy: 112 };
  }
};
withCuts(NE, [['M3', (c, t) => { R(c, 0, 0, W, H, '#000'); for (let i = 0; i < 3; i++) { const x = 140 + i * 20, y = 110 + Math.sin(t + i) * 2; P(c, x, y, '#5c5c5c'); } glow(c, 160, 110, 30, 10, '#3c3c3c', 0.3); return { z: 1, fx: 160, fy: 110 }; }]]);

/* ---- NF: the cart ("damn heavy"); the hotel lounge ---- */
const NF = {
  name: 'ホテルへ', ch: 'ホテルのラウンジ', bgm: 'pulse',
  init(S) { S.tHotel = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tHotel) {
      VG(c, 0, 0, W, 120, ['#8ca8c8', '#c8d8e8']); R(c, 0, 120, W, 120, '#8c7c64'); for (let i = 0; i < 8; i++) R(c, i * 44, 100, 30, 20, '#7c6c5c');
      const x = lerp(40, 200, sg(t, 0.4, S.tHotel)), sh = Math.round(Math.sin(t * 20)); R(c, x - 50, 136 + sh, 100, 8, '#6c4c2c'); for (const wx of [-36, 36]) { E(c, x + wx, 146, 10, 10, '#3c2c1c'); E(c, x + wx, 146, 3, 3, '#8c6c4c'); }
      armchair(c, x - 20, 136 + sh, { s: 1 }); armchair(c, x + 20, 136 + sh, { s: 1 });
      blit(c, modFig({ id: 'nin', top: 'tee', coat: '#7c6c5c', pants: '#4c443c', skin: '#c89c74', hair: '#1c1814', hat: 'cap', hatCol: '#3c3c34' }, { f: Math.floor(t * 6) & 3, arm: 'fwd', expr: t > 2 ? 'shock' : 'normal', k: 'nin' }), x + 64, 150, FIG_AX2, FIG_AY2, { flip: true });
      if (t > 1.6 && t < 4) { R(c, x + 30, 70, 104, 22, '#000'); R(c, x + 32, 72, 100, 18, '#fff'); TX(c, 'ばかに重いぞ', x + 36, 73, '#000', 16, null); }
      return { z: 1.03, fx: lerp(120, 200, sg(t, 0.4, S.tHotel)), fy: 110 };
    }
    hotelLounge(c, t); armchair(c, 150, 162, { s: 1.6 }); capPlate(c, t, S.tHotel + 0.3, ['Y市', '外国人の経営するホテル']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- NG: hermit crab — thefts by night ---- */
const NG = {
  name: 'やどかり', bgm: 'pulse',
  init(S) { S.tCrab = at(S, 'L13', 3) - 0.3; S.tMore = ln(S, 'L14') ? at(S, 'L14', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    hotelLounge(c, t); c.save(); c.globalAlpha = 0.6; c.fillStyle = '#04040c'; c.fillRect(0, 0, W, H); c.restore();
    armchair(c, 150, 162, { s: 1.6, open: true });
    const u = fr(t / 6), x = u < 0.5 ? lerp(150, 290, u * 2) : lerp(290, 150, (u - 0.5) * 2);
    if (t < S.tMore) { c.save(); c.globalAlpha = 0.85; blit(c, tintSpr(modFig(OTOKO, { f: Math.floor(t * 6) & 3, k: 'ng' }), '#0c0a10', 'ngs'), x, 162, FIG_AX2, FIG_AY2, { flip: u > 0.5 }); c.restore(); }
    if (t > S.tCrab && t < S.tMore) { R(c, 30, 40, 70, 50, '#d8c8a0'); E(c, 64, 70, 16, 12, '#c87c4c'); for (let i = 0; i < 4; i++) L(c, 50 + i * 8, 76, 44 + i * 8, 86, '#a85c3c', 2); E(c, 58, 64, 2, 2, '#000'); } // a hermit crab peeking out of its shell
    if (t > S.tMore) { glow(c, 150, 120, 60, 40, '#c81830', 0.3 * sg(t, S.tMore, S.tMore + 2)); }
    return { z: 1.06, fx: 170, fy: 114 };
  }
};

/* ---- NH: someone sits on his knees — the world of touch, sound and smell ---- */
const NH = {
  name: '膝の上', ch: '革一枚の向こう', bgm: 'eerie',
  init(S) { S.tSit = at(S, 'L15', 1) - 0.3; S.tFeel = ln(S, 'L16') ? at(S, 'L16', 0) - 0.3 : 1e9; S.tDark = ln(S, 'L17') ? at(S, 'L17', 2) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    hotelLounge(c, t); const cut = t > S.tFeel; armchair(c, 150, 162, { s: 1.6, xray: cut });
    if (t > S.tSit && !cut) blit(c, modFig(GUESTS[0], { f: -1, k: 'nh' }), 150, 142, FIG_AX2, FIG_AY2, { s: 1.1 });
    if (cut) { const g = GUESTS[Math.floor((t - S.tFeel) / 2) % 4]; c.save(); c.globalAlpha = 0.55; blit(c, modFig(g, { f: -1, k: 'nhg' }), 150, 142, FIG_AX2, FIG_AY2, { s: 1.1 }); c.restore(); }
    if (t > S.tDark) { c.save(); c.globalAlpha = 0.6 * sg(t, S.tDark, S.tDark + 2); c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); for (let i = 0; i < 6; i++) { const u = fr(t * 0.4 + i / 6); c.save(); c.globalAlpha = 1 - u; c.strokeStyle = '#c8a8b8'; c.beginPath(); c.arc(150, 110, 10 + u * 50, 0, TAU); c.stroke(); c.restore(); } }
    return { z: 1.12 + (cut ? 0.25 : 0), fx: 150, fy: 118 };
  }
};
withCuts(NH, [['M4', (c, t) => closeUp(c, t, withMouth('cot4', otokoFace({ blink: blinkOf(t, 7) }), { mouth: (Math.floor(t * 8) & 1) + 0.4 }, 24, 30), { bg: leatherBg })]]);

/* ---- NI: months in the chair; the auction; carried to an official's mansion ---- */
const NI = {
  name: '競売', ch: '競売', bgm: 'pulse',
  init(S) { S.tAuction = at(S, 'L19', 1) - 0.3; S.tHouse = at(S, 'L19', 3) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tAuction) { // a calendar flipping through months
      R(c, 0, 0, W, H, '#14100c'); armchair(c, 160, 170, { s: 2.2, xray: true }); const m = 1 + Math.floor(sg(t, 0.3, S.tAuction - 0.3) * 6); c.save(); c.globalAlpha = 0.8; R(c, 230, 20, 70, 60, '#f4f0e8'); R(c, 230, 20, 70, 14, '#c81818'); c.restore(); TX(c, m + 'か月', 240, 44, '#141414', 16, null);
      return { z: 1, fx: 160, fy: 110 };
    }
    if (t < S.tHouse) { R(c, 0, 0, W, H, '#3c3024'); R(c, 0, 150, W, H - 150, '#5c4c3c'); for (let i = 0; i < 4; i++) armchair(c, 60 + i * 66, 156, { s: 1 }); R(c, 140, 70, 40, 30, '#f4f0e4'); TX(c, '競売', 144, 76, '#c81818', 16, null);
      for (let i = 0; i < 5; i++) blit(c, modFig({ id: 'by' + i, top: 'jacket', coat: ['#2c2c34', '#4c3c2c', '#3c4c3c', '#2c3c4c', '#3c3c3c'][i], shirt: '#e8e4dc', pants: '#2c2c2c', skin: '#e0b494', hair: '#1c1814', hat: i % 2 ? 'fedora' : null }, { f: -1, arm: i === 2 && (Math.floor(t * 2) & 1) ? 'up' : null, k: 'by' }), 40 + i * 60, 196, FIG_AX2, FIG_AY2, { flip: true });
      return { z: 1.03, fx: 160, fy: 110 }; }
    study(c, t, {}); armchair(c, 150, 160, { s: 1.6 }); capPlate(c, t, S.tHouse + 0.3, ['ある官吏の邸', '洋館の書斎']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- NJ: the young wife; the cradle; "it is you" ---- */
const NJ = {
  name: '夫人', ch: '本当の恋', bgm: 'memory',
  init(S) { S.tSit = at(S, 'L20', 0); S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    study(c, t, {}); const rock = ln(S, 'L21') && t > at(S, 'L21', 2) - 0.3 ? Math.sin(t * 2) * 1.5 : 0;
    armchair(c, 150, 160, { s: 1.6, xray: ln(S, 'L21') && t > at(S, 'L21', 0) - 0.3 }); yoshiko(c, 150, 144 + rock, { pose: 'sit', arm: 'reach', expr: 'smile', k: 'njs', blink: rock ? 2 : 0 });
    return { z: 1.18, fx: 150, fy: 118 };
  }
};
withCuts(NJ, [['M5', (c, t) => closeUp(c, t, withMouth('cot5', otokoFace({ blink: blinkOf(t, 9) }), { mouth: (Math.floor(t * 8) & 1) + 0.4 }, 24, 30), { bg: pinkBg, glow: '#f8a8c8' })],
  ['M6', (c, t) => closeUp(c, t, withMouth('cot6', otokoFace({ blink: 0 }), { mouth: (Math.floor(t * 8) & 1) + 0.4 }, 24, 30), { bg: ['#1c0410', '#6c1c3c'], lines: '#f86c9c' })]]);

/* ---- NK: she flees the study; 「おお、気味の悪い」; the handkerchief signal ---- */
const NK = {
  name: '逃げ出す', ch: '気味の悪い椅子', bgm: 'dread',
  init(S) { S.tRun = at(S, 'L22', 1) - 0.3; S.tHanky = ln(S, 'M7') ? at(S, 'M7', 1) - 0.3 : 1e9; S.tChair = ln(S, 'L23') ? at(S, 'L23', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tHanky && t < S.tChair) { study(c, t, {}); armchair(c, 150, 160, { s: 1.6 }); return { z: 2.4, fx: 256, fy: 84 }; } // the pot of pinks on the windowsill
    if (t > S.tChair) { // the empty study, the chair; slow push in
      study(c, t, { night: false }); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#0c0410'; c.fillRect(0, 0, W, H); c.restore(); armchair(c, 150, 160, { s: 1.6 });
      return { z: 1.1 + 0.4 * ss(sg(t, S.tChair, S.dur)), fx: 150, fy: 124 };
    }
    // the Japanese sitting room she ran to
    VG(c, 0, 0, W, 150, ['#c8b898', '#a89878']); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 150, '#6c5c44'); R(c, 0, 150, W, H - 150, '#b8a878'); for (let i = 0; i < 6; i++) R(c, i * 56, 150, 2, H - 150, '#8c7c5c'); // tatami
    R(c, 120, 130, 80, 20, '#5c3c24');
    const k = sg(t, S.tRun, S.tRun + 1.6); yoshiko(c, lerp(300, 160, k), 160, { f: k < 1 ? Math.floor(t * 8) & 3 : -1, expr: 'shock', arm: k >= 1 ? 'reach' : null, k: 'nk' });
    return { z: 1.06, fx: 160, fy: 112, sx: k > 0 && k < 1 ? Math.round(Math.sin(t * 40)) : 0 };
  }
};
withCuts(NK, [['Y1', (c, t) => closeUp(c, t, withMouth('cyo', yoshikoFace({ blink: 0, fear: true }), { mouth: 1 }, 23, 29), { bg: ['#0c1420', '#3c5c8c'], lines: '#8cb4f8' })]]);

/* ---- NL: "Madam, a letter" — the same handwriting; "the title shall be: The Human Chair" ---- */
const NL = {
  name: 'もう一通', ch: 'もう一通の手紙', bgm: 'eerie',
  init(S) { S.tSame = at(S, 'L24', 0) - 0.3; S.tTitle = ln(S, 'M9') ? at(S, 'M9', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tTitle) { R(c, 0, 0, W, H, '#1c1410'); letterPage(c, t, 90, 14, 140, 136, 0.6, ''); const k = eOut(sg(t, S.tTitle + 0.6, S.tTitle + 1.2)); if (k > 0) { c.save(); c.globalAlpha = k; R(c, 120, 50, 80, 46, '#000'); bigCap(c, '人間椅子', 60, 24, '#f4e8d8'); c.restore(); } return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tSame) { R(c, 0, 0, W, H, '#2c241c'); for (let i = 0; i < 2; i++) { R(c, 60 + i * 110, 50, 90, 60, '#f4f0e4'); for (let j = 0; j < 3; j++) R(c, 74 + i * 110, 66 + j * 12, 56, 4, '#3c3430'); } glow(c, 160, 80, 140, 60, '#f8d080', 0.15); return { z: 1.03, fx: 160, fy: 80 }; }
    VG(c, 0, 0, W, 150, ['#c8b898', '#a89878']); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 150, '#6c5c44'); R(c, 0, 150, W, H - 150, '#b8a878');
    yoshiko(c, 150, 160, { expr: 'shock', k: 'nl' }); blit(c, robeFig(MAID, { f: -1, arm: 'reach', k: 'nlm' }), 220, 160, FIG_AX2, FIG_AY2, { flip: true }); R(c, 196, 116, 12, 8, '#f4f0e4');
    return { z: 1.1, fx: 180, fy: 116 };
  }
};
withCuts(NL, [['M8', (c, t) => closeUp(c, t, withMouth('cot8', otokoFace({ blink: blinkOf(t, 11) }), { mouth: (Math.floor(t * 8) & 1) + 0.4 }, 24, 30), { bg: darkBg })]]);

/* ---- NM: ending — the chair in the study, today too ---- */
const NM = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { study(c, t, { night: true }); armchair(c, 150, 160, { s: 1.6 }); const k = sg(t, 2, 6); if (k > 0) { c.save(); c.globalAlpha = 0.25 * k; armchair(c, 150, 160, { s: 1.6, xray: true }); c.restore(); }
    return { z: 1.05 + 0.3 * ss(sg(t, 0, S.tEnd + 2)), fx: 150, fy: 128 }; }
};
NM.ending = true;

/* ---- shorts ---- */
const SS1 = { name: 'ショート冒頭', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.4; },
  draw(c, t, S) { study(c, t, {}); armchair(c, 150, 160, { s: 1.6, xray: true }); yoshiko(c, 150, 144, { pose: 'sit', k: 'ss1' }); return { z: 1.35, fx: 150, fy: 124 }; } };
const SS2 = { name: 'ショート結び', bgm: 'eerie', init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.6); },
  draw(c, t, S) { study(c, t, {}); armchair(c, 150, 160, { s: 1.6, xray: true }); yoshiko(c, 150, 144, { pose: 'sit', k: 'ss2', expr: 'smile' }); return { z: 1.5, fx: 150, fy: 124 }; } };
