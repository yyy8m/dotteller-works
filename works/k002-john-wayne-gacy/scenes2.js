/* ================= 記録 #002 ジョン・ゲイシー: scenes 4-8 ================= */
function bigFace(c, spr, cx, cy, s, a, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(pc, a, id + 'd') : pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function copFace2() { return SPR('copF2', 32, 32, c => { R(c, 6, 26, 20, 6, K.cop1); E(c, 16, 15, 9, 10, '#e0b08c'); R(c, 6, 4, 20, 6, K.cop1); R(c, 4, 9, 24, 2, K.cop2); P(c, 16, 6, K.badge); for (const x0 of [11, 18]) { R(c, x0, 13, 4, 4, C.white); R(c, x0 + 1, 14, 2, 2, C.k); } L(c, 10, 11, 14, 10, '#7c5038'); L(c, 18, 10, 22, 11, '#7c5038'); E(c, 16, 22, 2.5, 3, '#401010'); }); }

/* ---- S4: "it was Gacy" / the search, the crawl space ---- */
const S4 = {
  name: '床下', bgm: 'pulse',
  init(S) { const L = S.lines[0]; S.tName = L.t0 + L.segs[1].a - 0.2; S.tSearch = L.t0 + L.segs[2].a - 0.3; S.tHatch = L.t0 + L.segs[3].a - 0.2; S.tShock = L.t0 + L.segs[4].a + 0.6; S.dur = L.se + 1.6; },
  draw(c, t, S) {
    if (t < S.tSearch) { // the name
      VG(c, 0, 0, W, H, ['#0c0204', '#1c0608', '#0c0204']);
      const a = sg(t, S.tName, S.tName + 0.5);
      E(c, 160, 84, 80, 70, DA(K.red2, 0.6 * Math.max(0.2, a)));
      if (a > 0) bigFace(c, gacyFace({ blink: blinkOf(t, 31) }), 160, 84, 2, a, 'gcz');
      if (t > S.tName + 0.5) { const s = 'JOHN WAYNE GACY', w = textSpr(s, 16, C.white).width; R(c, 160 - w / 2 - 8, 136, w + 16, 22, '#000000'); R(c, 160 - w / 2 - 8, 136, w + 16, 2, K.red1); TX(c, s, 160 - w / 2, 139, C.white, 16, null); }
      return { z: 1 + 0.04 * ss(t / S.tSearch), fx: 160, fy: 90 };
    }
    if (t < S.tHatch) { // police at the house, winter night
      nightSky(c, t, 130, [K.night0, K.night1, K.night2]);
      snowGround(c, 136, 0, 104);
      ranchHouse(c, 110, 140, t, { snow: true, lit: true, wall: '#8c8070', wall2: '#7c7064', roof: '#3c3430' });
      for (let i = 0; i < 2; i++) { const x = 30 + i * 74, on = (Math.floor(t * 5 + i) & 1) === 0; PF(c, [x, 170, x + 6, 162, x + 18, 156, x + 46, 156, x + 54, 162, x + 62, 164, x + 64, 170], '#1c2028'); R(c, x + 6, 163, 54, 3, '#e8e8e0'); E(c, x + 12, 170, 5, 5, '#0c0c10'); E(c, x + 52, 170, 5, 5, '#0c0c10'); R(c, x + 26, 152, 8, 4, on ? K.red0 : '#2c48c8'); E(c, x + 30, 154, 30, 14, DA(on ? K.red0 : '#4c68f8', 0.15)); }
      for (let i = 0; i < 3; i++) { const x = 140 + i * 22 + Math.sin(t + i) * 3; blit(c, personSpr(COP, { f: Math.floor(t * 6 + i) & 3, arm: 'fwd', id: 'c' + i }), x, 150 + i * 2, PER_AX, PER_AY, { flip: i === 2 }); beam(c, x + (i === 2 ? -8 : 8), 128 + i * 2, (i === 2 ? Math.PI : 0) + Math.sin(t * 1.3 + i) * 0.3 - 0.2, 70, 0.18, 0.35); }
      snowfall(c, t, 50, 41, 8, 14);
      capPlate(c, t, S.tSearch + 0.3, ['1978年12月', 'ゲイシーの家']);
      return { z: 1.05, fx: 160, fy: 120 };
    }
    // the closet floor: a hatch opens into darkness
    const u = t - S.tHatch;
    VG(c, 0, 0, W, H, ['#3c3430', '#2c2622', '#1c1814']);
    for (let x = 0; x < W; x += 20) { R(c, x, 0, 19, H, '#4c3c30'); R(c, x + 19, 0, 1, H, '#2c221c'); } // floorboards from above
    const op = eOut(sg(u, 0.3, 1.2));
    R(c, 110, 70, 100, 70, '#000000');
    PF(c, [110, 70, 210, 70, 210, lerp(140, 70 - 50, op), 110, lerp(140, 70 - 50, op)], '#5c4838'); L(c, 110, lerp(140, 20, op), 210, lerp(140, 20, op), '#3c2c24', 2);
    if (op > 0.6) { beam(c, 160, 40, Math.PI / 2, 110, 0.22, 0.4); for (let i = 0; i < 12; i++) P(c, 120 + hash(i * 3) * 80, 80 + hash(i * 7) * 55 + Math.sin(t + i) * 2, '#c8b89c'); }
    darkness(c, 160, 100, 120, 0.9);
    if (t > S.tShock) { c.fillStyle = DA('#000000', 0.55); c.fillRect(0, 0, W, H); blit(c, copFace2(), 160, 86, 17, 17, { s: 3 }); }
    return { z: 1.04, fx: 160, fy: 100, sx: t > S.tShock && t < S.tShock + 0.3 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- S5: 1972-1978, at least 33 ---- */
const S5 = {
  name: '33人', bgm: 'requiem',
  init(S) { const L = S.lines[0]; S.tY0 = L.t0 + 0.2; S.tY1 = L.t0 + L.segs[1].a; S.t33 = L.t0 + L.segs[2].a; S.dur = L.se + 1.8; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']);
    const y = Math.round(lerp(1972, 1978, eOut(sg(t, S.tY0, S.tY1))));
    yearCard(c, 112, 10, y, '');
    const shown = 33 * sg(t, S.t33 - 0.2, S.t33 + 2.4);
    candleRows(c, t, 33, shown, 50, 126, 11, 22, 18);
    if (t > S.t33) { const a = sg(t, S.t33 + 0.3, S.t33 + 1.0); bigCap(c, '少なくとも 33人', 70, 24, C.white, a); }
    return { z: 1, fx: 160, fy: 110 };
  }
};

/* ---- S6: sentenced 1980, executed 1994 ---- */
const S6 = {
  name: '判決', bgm: 'requiem',
  init(S) { const L = S.lines[0]; S.tGavel = L.t0 + L.segs[1].a + 0.6; S.tPrison = L.t0 + L.segs[2].a - 0.2; S.dur = L.se + 1.6; },
  draw(c, t, S) {
    if (t < S.tPrison) {
      VG(c, 0, 0, W, H, ['#3c2a20', '#2c1e18', '#1c1410']); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 120, '#4c3628');
      R(c, 80, 60, 160, 60, '#5c3c28'); R(c, 80, 60, 160, 4, '#7c5438'); E(c, 160, 40, 9, 10, '#d8b090'); R(c, 148, 48, 24, 14, '#141010'); R(c, 152, 28, 16, 6, '#c8c8c8');
      const hit = t > S.tGavel && t < S.tGavel + 0.25;
      blit(c, cached('gavel2', () => SPR(null, 22, 8, x => { R(x, 0, 0, 10, 8, '#6c4428'); R(x, 10, 3, 12, 2, '#8c5c38'); })), 200, 66, 20, 4, { rot: hit ? 0.2 : -0.9 });
      R(c, 186, 70, 20, 4, '#4c2c1c'); if (hit) for (let i = 0; i < 6; i++) L(c, 192, 70, 192 + Math.cos(i) * 14, 70 - Math.abs(Math.sin(i)) * 10, C.white);
      blit(c, personSpr(GACY, { f: -1 }), 120, 162, PER_AX, PER_AY, { flip: true, s: 1.4 });
      for (let i = 0; i < 5; i++) { const x = 20 + i * 64; E(c, x, 190, 12, 12, '#0c0806'); R(c, x - 14, 196, 28, 44, '#0c0806'); }
      yearCard(c, 14, 14, 1980, t > S.tGavel ? '死刑判決' : '');
      return { z: 1.05, fx: 160, fy: 80, sy: hit ? 2 : 0 };
    }
    nightSky(c, t, 150, [K.night0, K.night1, K.night2]);
    R(c, 0, 90, W, 60, '#4c4c54'); for (let x = 0; x < W; x += 16) R(c, x, 90, 1, 60, '#3c3c44'); for (let y = 96; y < 150; y += 8) R(c, 0, y, W, 1, '#44444c');
    R(c, 0, 84, W, 6, '#5c5c64'); for (let x = 4; x < W; x += 12) { L(c, x, 84, x + 6, 74, '#8c8c94'); L(c, x + 6, 74, x + 12, 84, '#8c8c94'); } // razor wire
    R(c, 140, 40, 24, 50, '#3c3c44'); R(c, 136, 36, 32, 6, '#2c2c34'); R(c, 146, 46, 12, 6, K.win1); beam(c, 152, 50, 1.2 + Math.sin(t * 0.8) * 0.5, 140, 0.12, 0.25);
    R(c, 0, 150, W, 90, '#2c2c30');
    yearCard(c, 212, 12, 1994, '執行');
    return { z: 1 + 0.05 * ss(sg(t, S.tPrison, S.dur)), fx: 160, fy: 100 };
  }
};

/* ---- S7: the other face ---- */
const S7 = {
  name: 'もうひとつの顔', bgm: 'eerie',
  init(S) { const L = S.lines[0]; S.tSplit = L.t0 + L.segs[1].a - 0.2; S.tBal = L.t0 + L.segs[2].a; S.dur = L.se + 1.6; },
  draw(c, t, S) {
    if (t < S.tBal) {
      VG(c, 0, 0, W, H, ['#0c0c14', '#141420', '#0c0c14']);
      const k = eOut(sg(t, S.tSplit, S.tSplit + 0.8));
      if (k <= 0) bigFace(c, pogoFace({ blink: blinkOf(t, 12) }), 160, 86, 2, 1, 'p7');
      else {
        c.save(); c.beginPath(); c.rect(0, 0, 160, H); c.clip(); bigFace(c, pogoFace({ expr: 'cold', blink: blinkOf(t, 12) }), 160, 86, 2, 1, 'p7'); c.restore();
        c.save(); c.beginPath(); c.rect(160, 0, W - 160, H); c.clip(); bigFace(c, pogoFace({ expr: 'cold', blink: blinkOf(t, 12) }), 160, 86, 2, 1, 'p7b'); bigFace(c, gacyFace({ blink: blinkOf(t, 31) }), 160, 86, 2, k, 'g7'); c.restore();
        for (let y = 30; y < 140; y += 2) P(c, 160 + Math.round(Math.sin(y * 0.5) * 2), y, K.red0);
      }
      return { z: 1, fx: 160, fy: 100 };
    }
    // balloons drifting away into the night
    nightSky(c, t, H, [K.night0, K.night1, K.night2, K.night3]);
    const u = t - S.tBal;
    [[100, '#e83c3c', '#a01c1c'], [140, '#f8d040', '#b89020'], [180, '#3c8cd8', '#1c5c9c'], [220, '#48b048', '#2c7c2c']].forEach(([x, a, b], i) => balloon(c, x + Math.sin(u * 0.7 + i) * 10 + u * 3, 150 - u * (9 + i * 2) - i * 10, a, b, t, i));
    R(c, 0, 180, W, 60, '#1c2418'); PF(c, [150, 180, 158, 168, 166, 180], '#2c4cb8'); E(c, 158, 167, 2, 2, '#f8e070'); // a clown hat left on the grass
    return { z: 1, fx: 160, fy: 110 };
  }
};

/* ---- S8: 33 lives ---- */
const S8 = {
  name: '結び', bgm: 'requiem',
  init(S) { const L = S.lines[0]; S.tEnd = L.se + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']);
    candleRows(c, t, 33, 33, 50, 60, 11, 22, 22);
    const fl = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 4.3);
    E(c, 160, 150, 40, 16, DA(K.win1, 0.1 + 0.05 * fl));
    return { z: 1 + 0.1 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 100 };
  }
};
