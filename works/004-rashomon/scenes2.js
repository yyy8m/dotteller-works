/* ================= 文庫 #004 羅生門: scenes ================= */
const rainBg = ['#0c0c18', '#3c3c54'], fireBg = ['#140604', '#8c3c14'], nightBg = ['#020206', '#141424'];

/* ---- XA: cold open — the old woman pulling hair, seen from the ladder, then 「おのれ、どこへ行く。」 ---- */
const XA = {
  name: '楼の上', ch: 'プロローグ', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    loft(c, t, { fx: 170 });
    baba(c, 170, 150, { arm: 'reach', k: 'xa' }); for (let i = 0; i < 4; i++) { const u = fr(t * 0.7 + i / 4); L(c, 184, 132, 184 + u * 16, 132 - u * 8, DA('#1c1814', 1 - u)); } // a strand of hair
    if (ln(S, 'H1') && t > ln(S, 'H1').t0 - 0.3 && t < ln(S, 'H1').se + 0.6) { genin(c, 110, 150, { arm: 'reach', expr: 'angry', k: 'xa', blade: false }); }
    return { z: 1.25 + 0.15 * ss(t / S.dur), fx: 160, fy: 120, sx: ln(S, 'H1') && Math.abs(t - ln(S, 'H1').t0) < 0.3 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};
withCuts(XA, [['C1', (c, t) => closeUp(c, t, geninFace({ blink: blinkOf(t, 3) }), { bg: fireBg, glow: '#f8a040' })]]);

/* ---- XB: dusk, the empty gate in the rain; a cricket on a pillar ---- */
const XB = {
  name: '羅生門', ch: '雨やみを待つ下人', bgm: 'memory',
  init(S) { S.tCricket = at(S, 'L2', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    rainSky(c, t); rashomon(c, t, { grass: true });
    genin(c, 160, 134, { pose: 'sit', k: 'xb' });
    rainFall(c, t, 0.9);
    if (t > S.tCricket) { const k = ss(sg(t, S.tCricket, S.tCricket + 2)); E(c, 114, 96, 4, 2, '#4c3418'); E(c, 117, 95, 2, 1.5, '#4c3418'); L(c, 111, 96, 105, 92, '#4c3418'); L(c, 112, 97, 106, 99, '#4c3418'); L(c, 116, 97, 119, 100, '#4c3418'); return { z: 1 + 1.8 * k, fx: lerp(160, 114, k), fy: lerp(110, 96, k) }; }
    return { z: 1.02, fx: 160, fy: 104 };
  }
};

/* ---- XC: the ruined capital; the gate of corpses; crows at sunset ---- */
const XC = {
  name: '荒れた都', bgm: 'eerie',
  init(S) { S.tCrow = at(S, 'L5', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tCrow) { // fallen houses, broken Buddhist statues stacked for firewood, a fox in the gate
      rainSky(c, t, 120); R(c, 0, 120, W, 120, '#3c3430');
      for (let i = 0; i < 6; i++) { const x = 20 + i * 54; PF(c, [x, 120, x + 10, 96 - (i % 3) * 6, x + 40, 104, x + 46, 120], '#2c2420'); L(c, x + 4, 108, x + 30, 96, '#5c4430', 2); }
      for (let i = 0; i < 8; i++) { R(c, 110 + (i % 4) * 14, 136 - Math.floor(i / 4) * 8, 12, 7, i % 2 ? '#a8742c' : '#c8a040'); P(c, 114 + (i % 4) * 14, 138 - Math.floor(i / 4) * 8, '#f8e080'); } // gilded wood pieces
      if (t > at(S, 'L4', 0)) { E(c, 250, 150, 8, 4, '#c87c3c'); E(c, 258, 146, 4, 3, '#c87c3c'); PF(c, [256, 143, 258, 139, 260, 143], '#c87c3c'); L(c, 242, 150, 236, 146, '#e8c88c', 2); } // a fox
      if (t > at(S, 'L4', 3) - 0.2) { c.save(); c.globalAlpha = 0.5; c.fillStyle = '#06040a'; c.fillRect(0, 0, W, H); c.restore(); for (let i = 0; i < 3; i++) { const x = 70 + i * 90; R(c, x - 14, 160, 28, 6, '#5c5444'); E(c, x - 16, 160, 4, 3, '#a89880'); } }
      return { z: 1.03, fx: 160, fy: 120 };
    }
    VG(c, 0, 0, W, 130, ['#3c1c2c', '#c85c3c', '#f8a050']); rashomon(c, t, {});
    for (let i = 0; i < 14; i++) { const a = t * 0.6 + i / 14 * TAU, r = 40 + (i % 3) * 14; crow(c, 160 + Math.cos(a) * r * 1.6, 12 + Math.sin(a) * r * 0.4, t, i, 1); }
    return { z: 1.02, fx: 160, fy: 80 };
  }
};

/* ---- XD: on the top step — the pimple, no master, nowhere to go ---- */
const XD = {
  name: '石段', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    rainSky(c, t, 100); rashomon(c, t, {}); rainFall(c, t, 1);
    genin(c, 160, 134, { pose: 'sit', arm: 'up', k: 'xd' });
    return { z: 1.5, fx: 160, fy: 112 };
  }
};
withCuts(XD, [['L6', (c, t, S) => (t > at(S, 'L6', 1) ? closeUp(c, t, geninFace({ blink: blinkOf(t, 5) }), { bg: rainBg, after: (c2, t2) => rainFall(c2, t2, 0.6) }) : null)]]);

/* ---- XE: "if he doesn't choose... a thief" — the road splits: starve or steal ---- */
const XE = {
  name: '飢え死にか、盗人か', ch: '飢え死にか、盗人か', bgm: 'dread',
  init(S) { S.tFork = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tFork) { // under the earthen wall, a body left like a dog's
      rainSky(c, t, 100, 'night'); R(c, 0, 100, W, 140, '#2c2420'); R(c, 0, 70, W, 34, '#5c4c3c'); R(c, 0, 66, W, 6, '#3c3430'); rainFall(c, t, 1);
      genin(c, 110, 150, { expr: 'sad', k: 'xe' }); c.save(); c.globalAlpha = 0.6 * sg(t, 1, 3); blit(c, robeFig({ id: 'dg', robe: '#5c5444', robe2: '#3c3428', trim: '#5c5444', sash: '#3c3428', skin: '#8c8070', hair: '#1c1814' }, { f: -1, blink: 2, k: 'dg' }), 220, 158, FIG_AX2, FIG_AY2 - 12, { rot: Math.PI / 2 }); c.restore();
      return { z: 1.04, fx: 160, fy: 120 };
    }
    // a crossroad in the dark: one path into the dark, one under a lantern
    R(c, 0, 0, W, H, '#06060c'); rainFall(c, t, 0.6);
    PF(c, [150, 180, 170, 180, 120, 60, 112, 60], '#2c2828'); PF(c, [150, 180, 170, 180, 220, 60, 212, 60], '#3c3028');
    glow(c, 216, 50, 30, 20, '#f8b040', 0.4); E(c, 216, 50, 4, 5, '#f86030');
    TX(c, '飢え死に', 64, 34, '#8c8ca8', 16, '#000000'); TX(c, '盗人', 240, 34, '#f8b040', 16, '#000000');
    genin(c, 160, 196, { s: 0.9, k: 'xe2', expr: 'sad' });
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- XF: a sneeze; the cricket gone; the wide ladder up to the loft ---- */
const XF = {
  name: 'はしご', ch: '楼の上へ', bgm: 'eerie',
  init(S) { S.tLadder = at(S, 'L11', 2) - 0.3; S.tUp = ln(S, 'L12') ? at(S, 'L12', 1) - 0.3 : 1e9; S.tLight = ln(S, 'L12') ? at(S, 'L12', 3) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    rainSky(c, t, 100, 'night'); rashomon(c, t, { night: true, loftLight: t > S.tLight }); rainFall(c, t, 0.9);
    // the ladder inside the gate, painted red
    if (t > S.tLadder) { const k = sg(t, S.tLadder, S.tLadder + 0.8); c.save(); c.globalAlpha = k; L(c, 128, 130, 116, 42, '#8c2c20', 3); L(c, 148, 130, 136, 42, '#8c2c20', 3); for (let y = 48; y < 130; y += 9) L(c, 116 + (130 - y) * 0.14, y, 136 + (130 - y) * 0.14, y, '#a83c2c', 2); c.restore(); }
    const up = sg(t, S.tUp, S.tUp + 4);
    if (t < S.tUp) genin(c, 170, 134, { arm: t < S.tLadder ? 'up' : null, k: 'xf' }); else genin(c, lerp(138, 128, up), lerp(134, 70, up), { f: Math.floor(t * 4) & 3, k: 'xf2', s: 0.9 });
    return { z: 1.04 + 0.2 * up, fx: lerp(160, 130, up), fy: lerp(104, 60, up) };
  }
};

/* ---- XG: at the top of the ladder: a weak yellow light swaying on the cobwebbed ceiling ---- */
const XG = {
  name: 'のぞく', bgm: 'dread',
  init(S) { S.tLook = at(S, 'L14', 1) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#040204'); const fl = 0.7 + 0.3 * Math.sin(t * 9) * Math.sin(t * 5.3);
    R(c, 0, 0, W, 60, '#0c0808'); for (let x = 0; x < W; x += 40) R(c, x, 0, 6, 60, '#140c08'); for (let k = 0; k < 7; k++) L(c, 200, 10, 200 + Math.cos(k) * 40, 30 + Math.sin(k) * 14, '#3c3c3c');
    glow(c, 200 + Math.sin(t * 2) * 30, 30, 80, 30, '#f8c060', 0.35 * fl);
    R(c, 0, 120, W, 6, '#3c2c1c'); // the edge of the loft floor
    const k = sg(t, S.tLook, S.tLook + 1.5); c.save(); c.beginPath(); c.rect(0, 0, W, 122); c.clip(); blit(c, robeFig(GENIN, { f: -1, k: 'peek', expr: 'shock' }), 150, lerp(190, 160, k), FIG_AX2, FIG_AY2, { s: 1.4 }); c.restore(); // just his head rises over the edge
    L(c, 130, 126, 126, 200, '#8c2c20', 3); L(c, 170, 126, 174, 200, '#8c2c20', 3);
    return { z: 1.08, fx: 160, fy: 100 };
  }
};

/* ---- XH: the bodies; the old woman pulling hair ---- */
const XH = {
  name: '老婆', ch: '死人の髪を抜く老婆', bgm: 'dread',
  init(S) { S.tBaba = at(S, 'L16', 0) - 0.3; S.tPull = at(S, 'L17', 2) - 0.3; S.tHate = ln(S, 'L18') ? at(S, 'L18', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    loft(c, t, { fx: 180 });
    if (t > S.tBaba) { baba(c, 182, 150, { arm: t > S.tPull ? 'reach' : null, k: 'xh' }); E(c, 200, 154, 14, 3, '#1c1814'); }
    if (t > S.tPull) for (let i = 0; i < 5; i++) { const u = fr(t * 0.6 + i / 5); L(c, 196, 138, 196 + u * 20, 138 - u * 14, DA('#1c1814', 1 - u)); }
    if (t > S.tHate) { const k = sg(t, S.tHate, S.tHate + 4); c.save(); c.globalAlpha = 0.3 * k; c.fillStyle = '#c81818'; c.fillRect(0, 0, W, H); c.restore(); blit(c, robeFig(GENIN, { f: -1, k: 'xhpeek', expr: 'angry' }), 40, 150, FIG_AX2, FIG_AY2, { s: 1.3 }); }
    return { z: 1.06 + 0.2 * ss(sg(t, S.tPull, S.tPull + 4)), fx: 186, fy: 132 };
  }
};
withCuts(XH, [['L19', (c, t) => closeUp(c, t, geninFace({ blink: blinkOf(t, 7) }), { bg: ['#1c0404', '#8c1c14'], lines: '#f86030' })]]);

/* ---- XI: he leaps up, grabs her — 「何をしていた。」 ---- */
const XI = {
  name: 'つかみ合い', ch: 'つかみ合い', bgm: 'dread',
  init(S) { S.tGrab = at(S, 'L21', 0) - 0.3; S.tDown = at(S, 'L21', 1) - 0.2; S.tBlade = ln(S, 'H2') ? at(S, 'H2', 2) - 0.2 : 1e9; S.tCold = ln(S, 'L22') ? at(S, 'L22', 2) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    loft(c, t, { fx: 160 });
    const down = t > S.tDown;
    if (!down) { const k = sg(t, 0.2, S.tGrab); genin(c, lerp(60, 140, k), 150, { f: k < 1 ? Math.floor(t * 8) & 3 : -1, arm: 'reach', expr: 'angry', k: 'xi' }); baba(c, lerp(200, 180, sg(t, S.tGrab, S.tDown)), 150, { pose: 'stand', expr: 'shock', arm: 'up', k: 'xi' }); }
    else { baba(c, 190, 162, { pose: 'kneel', expr: 'shock', k: 'xid' }); genin(c, 150, 150, { arm: t > S.tBlade ? 'point' : 'reach', expr: t > S.tCold ? 'normal' : 'angry', blade: t > S.tBlade, k: 'xid' }); }
    return { z: 1.35, fx: 168, fy: 128, sx: Math.abs(t - S.tDown) < 0.3 ? Math.round(Math.sin(t * 70) * 3) : 0 };
  }
};
withCuts(XI, [['H3', (c, t) => closeUp(c, t, withMouth('cgn', geninFace({ blink: blinkOf(t, 9) }), {}, 23, 29), { bg: fireBg, glow: '#f8a040' })]]);

/* ---- XJ: the old woman's answer ---- */
const XJ = {
  name: '老婆の答え', ch: '老婆の答え', bgm: 'eerie',
  init(S) { S.tSnake = ln(S, 'B2') ? at(S, 'B2', 1) - 0.3 : 1e9; S.tSnakeEnd = ln(S, 'B2') ? at(S, 'B2', 3) : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tSnake && t < S.tSnakeEnd) { // her memory: dried snake sold as dried fish at the guards' post
      R(c, 0, 0, W, H, '#2c241c'); VG(c, 0, 0, W, 100, ['#5c4c3c', '#8c7c5c']); R(c, 40, 110, 240, 10, '#5c4430');
      for (let i = 0; i < 8; i++) { const x = 60 + i * 26; PF(c, [x, 100, x + 6, 98, x + 18, 102, x + 22, 106, x + 10, 108], '#8c7c5c'); P(c, x + 18, 102, '#2c241c'); }
      blit(c, robeFig({ id: 'sw', robe: '#8c6c8c', robe2: '#6c4c6c', trim: '#d8c8b0', sash: '#3c2c3c', skin: '#e0b494', hair: '#1c1814', female: true }, { f: -1, arm: 'reach', k: 'sw' }), 160, 160, FIG_AX2, FIG_AY2);
      c.save(); c.globalAlpha = 0.35; c.fillStyle = '#5c3c1c'; c.fillRect(0, 0, W, H); c.restore();
      return { z: 1.03, fx: 160, fy: 110 };
    }
    loft(c, t, { fx: 170 }); baba(c, 178, 162, { pose: 'kneel', k: 'xj' }); genin(c, 120, 150, { arm: 'reach', k: 'xj' });
    return { z: 1.35, fx: 160, fy: 128 };
  }
};
withCuts(XJ, [['B1', (c, t) => closeUp(c, t, withMouth('cbb1', babaFace({ blink: blinkOf(t, 4) }), { mouth: (Math.floor(t * 9) & 1) + 0.5 }, 23, 31), { bg: fireBg, glow: '#f8a040' })],
  ['B3', (c, t) => closeUp(c, t, withMouth('cbb3', babaFace({ blink: blinkOf(t, 6) }), { mouth: (Math.floor(t * 8) & 1) + 0.5 }, 23, 31), { bg: ['#140404', '#5c1c0c'], lines: '#c84c2c' })]]);

/* ---- XK: a courage pointing the other way; 「きっと、そうか。」; he strips her ---- */
const XK = {
  name: '引はぎ', ch: '下人の答え', bgm: 'dread',
  init(S) { S.tGrab = at(S, 'L25', 1) - 0.3; S.tStrip = ln(S, 'L26') ? at(S, 'L26', 0) - 0.3 : 1e9; S.tKick = ln(S, 'L26') ? at(S, 'L26', 1) - 0.2 : 1e9; S.tRun = ln(S, 'L26') ? at(S, 'L26', 3) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    loft(c, t, { fx: 160 });
    const bare = t > S.tStrip, kicked = t > S.tKick, run = sg(t, S.tRun, S.tRun + 2);
    baba(c, kicked ? 200 : 182, kicked ? 166 : 160, { pose: 'kneel', bare, expr: 'shock', k: 'xk' + (bare ? 'b' : '') });
    if (run < 1) genin(c, lerp(150, 40, run), 150, { f: run > 0 ? Math.floor(t * 10) & 3 : -1, arm: t > S.tGrab && !kicked ? 'reach' : null, expr: 'normal', k: 'xk', flip: run > 0 });
    if (bare && run < 1) { R(c, lerp(150, 40, run) - 4, 116, 12, 14, '#7c5c3c'); } // the stolen bark-coloured robe under his arm
    return { z: 1.3, fx: lerp(170, 120, run), fy: 128, sx: Math.abs(t - S.tKick) < 0.3 ? Math.round(Math.sin(t * 70) * 3) : 0 };
  }
};
withCuts(XK, [['L24', (c, t, S) => (t > at(S, 'L24', 2) ? closeUp(c, t, geninFace({ blink: blinkOf(t, 11), ex: 'cold' }), { bg: nightBg, glow: '#5c6c9c' }) : null) ],
  ['H4', (c, t) => closeUp(c, t, withMouth('cgn4', geninFace({ blink: 0, ex: 'cold' }), {}, 23, 29), { bg: nightBg })],
  ['H5', (c, t) => closeUp(c, t, withMouth('cgn5', geninFace({ blink: blinkOf(t, 13), ex: 'cold' }), { mouth: (Math.floor(t * 9) & 1) + 0.5 }, 23, 29), { bg: ['#0c0204', '#4c0c0c'], lines: '#a81c1c' })]]);

/* ---- XL: the naked old woman crawls to the ladder; black night; no one knows ---- */
const XL = {
  name: '黒洞々たる夜', ch: '黒洞々たる夜', bgm: 'requiem',
  init(S) { S.tLook = at(S, 'L28', 0) - 0.3; S.tGone = ln(S, 'L29') ? at(S, 'L29', 0) - 0.3 : 1e9; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tGone) { R(c, 0, 0, W, H, '#000000'); rainFall(c, t, 0.3, '#2c2c3c'); return { z: 1, fx: 160, fy: 120 }; }
    if (t < S.tLook) { loft(c, t, { fx: 120 }); const k = sg(t, 0.3, S.tLook - 0.3); baba(c, lerp(200, 70, k), 162, { pose: 'kneel', bare: true, k: 'xl' }); R(c, 20, 140, 40, 24, '#000000'); return { z: 1.06, fx: lerp(190, 90, k), fy: 130 }; }
    // looking down through the hatch: nothing but black night and rain
    R(c, 0, 0, W, H, '#020204'); R(c, 60, 40, 200, 120, '#000000'); R(c, 56, 36, 208, 4, '#3c2c1c'); R(c, 56, 160, 208, 4, '#3c2c1c');
    rainFall(c, t, 0.4, '#3c3c4c'); for (let y = 60; y < 160; y += 9) L(c, 140, y, 180, y, DA('#5c1c14', 0.4 * (1 - (y - 60) / 100)), 2);
    blit(c, robeFig(BABA_BARE, { f: -1, pose: 'kneel', k: 'xll', expr: 'shock' }), 160, 40, FIG_AX2, FIG_AY2, { rot: Math.PI, s: 1.2 });
    return { z: 1 + 0.1 * ss(sg(t, S.tLook, S.tGone)), fx: 160, fy: 110 };
  }
};
XL.ending = true;

/* ---- shorts ---- */
const SS2 = {
  name: 'ショート結び', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { loft(c, t, { fx: 170 }); baba(c, 176, 150, { arm: 'reach', k: 'ss2' }); for (let i = 0; i < 4; i++) { const u = fr(t * 0.7 + i / 4); L(c, 190, 132, 190 + u * 16, 132 - u * 8, DA('#1c1814', 1 - u)); } return { z: 1.35, fx: 170, fy: 124 }; }
};
