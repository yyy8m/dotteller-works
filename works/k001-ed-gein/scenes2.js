/* ================= 記録 #001 エド・ゲイン: scenes 4-8 ================= */
/* 1950s police car (side view, facing left), beacon on the roof */
function copCar(c, x, y, t) {
  PF(c, [x, y - 6, x + 6, y - 14, x + 18, y - 22, x + 44, y - 22, x + 54, y - 14, x + 64, y - 12, x + 66, y - 4, x + 64, y, x, y], '#1c2028');
  PF(c, [x + 4, y - 10, x + 62, y - 10, x + 62, y - 6, x + 4, y - 6], '#e8e8e0');
  PF(c, [x + 20, y - 20, x + 30, y - 20, x + 30, y - 14, x + 14, y - 14], '#5c6c8c'); PF(c, [x + 33, y - 20, x + 43, y - 20, x + 50, y - 14, x + 33, y - 14], '#5c6c8c');
  for (const wx of [x + 12, x + 52]) { E(c, wx, y, 6, 6, '#0c0c10'); E(c, wx, y, 3, 3, '#8c8c94'); }
  TX(c, 'SHERIFF', x + 14, y - 11, '#1c2028', 16, null);
  const on = (Math.floor(t * 4) & 1) === 0; R(c, x + 28, y - 26, 6, 4, on ? K.red0 : K.red2);
  if (on) { E(c, x + 31, y - 24, 22, 12, DA(K.red0, 0.22)); E(c, x + 31, y - 24, 60, 30, DA(K.red0, 0.08)); }
}
/* junk-filled room seen by flashlight (no remains are shown) */
const junkCv = (() => {
  const [cv, x] = mk(W, H), r = rngf(17);
  VG(x, 0, 0, W, H, ['#3c3430', '#2c2622', '#1c1814']); for (let y = 0; y < 150; y += 5) R(x, 0, y, W, 1, '#342c28');
  R(x, 0, 150, W, 90, '#2c241e'); for (let i = 0; i < 30; i++) R(x, r() * W, 150 + r() * 90, 20 + r() * 30, 1, '#3c3028');
  for (let i = 0; i < 26; i++) { const bx = r() * W, bw = 14 + r() * 30, bh = 10 + r() * 26, by = 150 - r() * 30; R(x, bx, by - bh, bw, bh, ['#5c4c3c', '#4c4034', '#6c5c48', '#3c342c'][i % 4]); R(x, bx, by - bh, bw, 2, '#7c6c58'); }
  for (let i = 0; i < 18; i++) { const bx = r() * W, by = 120 + r() * 60; for (let k = 0; k < 6; k++) R(x, bx + k, by - k * 3, 22, 2, k & 1 ? '#c8bc9c' : '#a89c80'); } // stacks of old newspapers
  for (let i = 0; i < 20; i++) { const bx = r() * W, by = 100 + r() * 70; R(x, bx, by, 5, 7, '#7c7c84'); R(x, bx, by, 5, 1, '#a8a8b0'); } // cans
  R(x, 20, 40, 60, 50, '#4c3c30'); R(x, 24, 44, 52, 42, '#1c1814'); R(x, 230, 30, 70, 6, '#4c3c30'); // shelves / window
  return cv;
})();
function copFace(ex) { // shocked deputy close-up 32x32
  return SPR('copFace' + ex, 32, 32, c => {
    R(c, 6, 26, 20, 6, K.cop1); E(c, 16, 15, 9, 10, '#e0b08c'); R(c, 6, 4, 20, 6, K.cop1); R(c, 4, 9, 24, 2, K.cop2); P(c, 16, 6, K.badge);
    for (const x0 of [11, 18]) { R(c, x0, 13, 4, 4, C.white); R(c, x0 + 1, 14, 2, 2, C.k); }
    L(c, 10, 11, 14, 10, '#7c5038'); L(c, 18, 10, 22, 11, '#7c5038'); E(c, 16, 22, 2.5, 3, '#401010');
  });
}

/* ---- S4: the search, that night ---- */
const S4 = {
  name: '捜索の夜', bgm: 'pulse',
  init(S) { const L = S.lines[0]; S.tIn = L.t0 + L.segs[3].a - 0.3; S.tShock = L.t0 + L.segs[4].a + 0.4; S.dur = L.se + 1.6; },
  draw(c, t, S) {
    if (t < S.tIn) {
      const ox = 40 + 30 * ss(t / S.tIn);
      nightSky(c, t, 140, [K.night0, K.night0, K.night1, K.night2]);
      geinFarm(c, t, ox, { lit: false });
      copCar(c, 30 - ox * 0.3, 150, t);
      for (let i = 0; i < 3; i++) {
        const x = lerp(70 + i * 22, 150 + i * 24, sg(t, 0.3 + i * 0.25, S.tIn)) - ox * 0.3, f = Math.floor(t * 7 + i) & 3;
        blit(c, personSpr(COP, { f, arm: 'fwd', id: i }), x, 146 + i * 3, PER_AX, PER_AY);
        beam(c, x + 8, 146 + i * 3 - 22, -0.25 + Math.sin(t * 1.4 + i * 2) * 0.35, 90, 0.18, 0.4);
      }
      snowfall(c, t, 40, 9, 10, 14);
      capPlate(c, t, 0.5, ['1957年11月16日　夜', 'ゲインの農場']);
      return { z: 1.05, fx: 160, fy: 110 };
    }
    // inside: flashlight over the clutter
    const u = t - S.tIn;
    c.drawImage(junkCv, 0, 0);
    const lx = 160 + Math.sin(u * 0.9) * 110, ly = 100 + Math.sin(u * 1.7) * 30;
    darkness(c, lx, ly, 70, 0.97);
    E(c, lx, ly, 30, 22, DA('#fff4c8', 0.12));
    if (t > S.tShock) { const v = t - S.tShock; c.fillStyle = DA('#000000', 0.6); c.fillRect(0, 0, W, H);
      blit(c, copFace('shock'), 160, 86, 17, 17, { s: 3 }); blit(c, cached('bigEx', () => SPR(null, 8, 22, x => { R(x, 1, 0, 6, 14, K.red1); R(x, 1, 17, 6, 5, K.red1); R(x, 2, 1, 2, 12, K.red0); })), 214, 40 - Math.round(4 * Math.max(0, 1 - v * 4)), 5, 12, { s: 2 }); }
    return { z: 1.04, fx: 160, fy: 110, sx: t > S.tShock && t < S.tShock + 0.3 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- S5: the news ---- */
const S5 = {
  name: '発見', bgm: 'pulse',
  init(S) { const L = S.lines[0]; S.tP1 = 0.4; S.tP2 = L.t0 + L.segs[2].a - 0.2; S.dur = L.se + 1.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#1c0406', '#2c0a0c', '#140406']);
    for (let i = 0; i < 5; i++) { const ph = fr(t * 0.6 + i * 0.37); if (ph < 0.08) { const x = 30 + hash(i * 3 + Math.floor(t * 0.6 + i * 0.37)) * 260; E(c, x, 180, 40, 30, DA(C.white, 0.5 * (1 - ph / 0.08))); R(c, x - 3, 176, 6, 6, C.white); } }
    for (let i = 0; i < 9; i++) { const x = i * 38 + 4, y = 196 + (i & 1) * 6; E(c, x + 10, y - 16, 7, 7, '#0c0204'); R(c, x + 2, y - 10, 16, 60, '#0c0204'); R(c, x + 4, y - 26, 12, 3, '#0c0204'); } // reporters
    const p1 = paperSpr('g1', '農場で恐ろしい発見', 'プレインフィールド', '1957年11月');
    spinPaper(c, p1, 120, 80, sg(t, S.tP1, S.tP1 + 0.8));
    if (t > S.tP2) { const p2 = paperSpr('g2', '墓地からも遺体', '墓荒らしが判明', '1957年11月'); spinPaper(c, p2, 210, 96, sg(t, S.tP2, S.tP2 + 0.8)); }
    return { z: 1 + 0.05 * ss(t / S.dur), fx: 160, fy: 90 };
  }
};

/* ---- S6: court, the hospital, the years ---- */
const S6 = {
  name: '裁判と病院', bgm: 'requiem',
  init(S) {
    const L = S.lines[0];
    S.tGavel = L.t0 + L.segs[2].a + 0.9; S.tHosp = L.t0 + L.segs[3].a - 0.2; S.tY0 = L.t0 + L.segs[3].a + 0.3; S.tY1 = L.t0 + L.segs[4].a; S.dur = L.se + 1.6;
  },
  draw(c, t, S) {
    if (t < S.tHosp) { // courtroom
      VG(c, 0, 0, W, H, ['#3c2a20', '#2c1e18', '#1c1410']);
      for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 120, '#4c3628');
      R(c, 80, 60, 160, 60, '#5c3c28'); R(c, 80, 60, 160, 4, '#7c5438'); R(c, 150, 30, 20, 30, '#2c1e18'); // bench
      E(c, 160, 40, 9, 10, '#d8b090'); R(c, 148, 48, 24, 14, '#141010'); R(c, 152, 28, 16, 6, '#e8e8e8');
      const hit = t > S.tGavel && t < S.tGavel + 0.25, ga = hit ? 0.2 : -0.9;
      blit(c, cached('gavel', () => SPR(null, 22, 8, x => { R(x, 0, 0, 10, 8, '#6c4428'); R(x, 10, 3, 12, 2, '#8c5c38'); })), 200, 66, 20, 4, { rot: ga });
      R(c, 186, 70, 20, 4, '#4c2c1c');
      if (hit) for (let i = 0; i < 6; i++) L(c, 192, 70, 192 + Math.cos(i) * 14, 70 - Math.abs(Math.sin(i)) * 10, C.white);
      blit(c, personSpr(GEIN, { f: -1 }), 120, 162, PER_AX, PER_AY, { flip: true, s: 1.4 });
      for (let i = 0; i < 5; i++) { const x = 20 + i * 64; E(c, x, 190, 12, 12, '#0c0806'); R(c, x - 14, 196, 28, 44, '#0c0806'); }
      return { z: 1.05, fx: 160, fy: 80, sy: hit ? 2 : 0 };
    }
    // the state hospital on the hill, years passing
    nightSky(c, t, 150, [K.night1, K.night2, K.night3, '#3c4868']);
    snowGround(c, 140, 0, 100);
    R(c, 70, 76, 180, 64, '#5c5c64'); R(c, 70, 76, 180, 4, '#3c3c44'); PF(c, [140, 76, 160, 58, 180, 76], '#3c3c44');
    for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) { const x = 80 + k * 21, y = 88 + r * 24; R(c, x, y, 10, 14, (k + r) % 3 ? '#1c1c24' : K.win1); for (let b = 2; b < 10; b += 3) R(c, x + b, y, 1, 14, '#8c8c94'); }
    R(c, 150, 116, 20, 24, '#2c2c34');
    snowfall(c, t, 50, 11, 6, 12);
    const y = t < S.tY0 ? 1957 : t < S.tY1 ? Math.round(lerp(1957, 1984, eOut(sg(t, S.tY0, S.tY1 - 0.3)))) : 1984;
    yearCard(c, 216, 10, y, t >= S.tY1 ? '死去' : '');
    return { z: 1 + 0.05 * ss(sg(t, S.tHosp, S.dur)), fx: 160, fy: 100 };
  }
};

/* ---- S7: the films it inspired ---- */
const S7 = {
  name: '映画のモデル', bgm: 'eerie',
  init(S) { const L = S.lines[0]; S.f = [L.t0 + L.segs[1].a - 0.3, L.t0 + L.segs[1].a + 1.2, L.t0 + L.segs[2].a - 0.2]; S.dur = L.se + 1.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0c14', '#141420', '#08080c']);
    E(c, 160, 70, 150, 70, DA('#c8d0e0', 0.08 + 0.02 * Math.sin(t * 13)));
    const frames = [
      ['サイコ', (x, X, Y, w, h) => { VG(x, X, Y, w, h, ['#2c3448', '#4c5468']); PF(x, [X + 30, Y + 40, X + 42, Y + 18, X + 56, Y + 22, X + 66, Y + 40], '#0c0c10'); R(x, X + 36, Y + 26, 4, 5, K.win1); R(x, X + 6, Y + 44, 50, 10, '#0c0c10'); R(x, X + 10, Y + 47, 6, 4, K.win1); R(x, X + 22, Y + 47, 6, 4, K.win1); }],
      ['悪魔のいけにえ', (x, X, Y, w, h) => { VG(x, X, Y, w, h, ['#c86c28', '#f8b048', '#fce090']); R(x, X, Y + 44, w, 16, '#3c2410'); house(x, X + 20, Y + 46, 34, 20, { wall: '#5c3c20', wall2: '#4c3018', roof: '#2c1c10' }); E(x, X + 66, Y + 10, 6, 6, '#fff4c8'); }],
      ['羊たちの沈黙', (x, X, Y, w, h) => { R(x, X, Y, w, h, '#e8e0d0'); E(x, X + w / 2, Y + h / 2, 12, 10, '#3c2c20'); PF(x, [X + w / 2, Y + h / 2, X + w / 2 - 22, Y + 12, X + w / 2 - 18, Y + 46], '#6c5038'); PF(x, [X + w / 2, Y + h / 2, X + w / 2 + 22, Y + 12, X + w / 2 + 18, Y + 46], '#6c5038'); E(x, X + w / 2, Y + h / 2 - 2, 3, 2, '#e8e0d0'); }],
    ];
    frames.forEach(([ttl, fn], i) => {
      const k = eOut(sg(t, S.f[i], S.f[i] + 0.6)); if (k <= 0) return;
      const x = 18 + i * 100, y = lerp(-80, 50, k);
      filmFrame(c, x, y, 84, 60, (cc, X, Y, w, h) => fn(cc, X, Y, w, h));
      const w = textSpr(ttl, 16, C.white).width; TX(c, ttl, x + 42 - w / 2, i === 1 ? y - 32 : y + 72, C.white, 16, '#000000');
    });
    for (let i = 0; i < 10; i++) { const x = i * 34; E(c, x + 14, 200, 12, 13, '#000000'); R(c, x, 206, 30, 40, '#000000'); } // audience
    return { z: 1.0, fx: 160, fy: 100 };
  }
};

/* ---- S8: remembering the victims ---- */
const S8 = {
  name: '結び', bgm: 'requiem',
  init(S) { const L = S.lines[0]; S.tEnd = L.se + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    nightSky(c, t, 150); moon(c, 250, 36, 11, t);
    for (let i = 0; i < 14; i++) { const x = i * 26 - 10, h = 20 + (i * 7 % 14); PF(c, [x, 130, x + 10, 130 - h, x + 20, 130], K.night0); }
    snowGround(c, 128, 0, 112);
    // a small lantern and flowers on the snow
    const fl = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 4.3);
    E(c, 160, 132, 46, 18, DA(K.win1, 0.12 + 0.05 * fl)); E(c, 160, 128, 20, 12, DA(K.win0, 0.15 + 0.06 * fl));
    R(c, 154, 114, 12, 2, '#3c2c1c'); R(c, 153, 116, 14, 16, '#3c2c1c'); R(c, 155, 118, 10, 12, DP('#f8b040', '#fff0b0', Math.round(6 + fl * 8))); E(c, 160, 124, 1.5, 3 + fl, '#fffce8'); L(c, 160, 110, 160, 114, '#3c2c1c');
    for (const [x, col] of [[136, '#f4f0f8'], [142, '#e8c0d0'], [178, '#f4f0f8'], [184, '#d8d0f0']]) { L(c, x, 132, x + 2, 122, '#3c6c3c'); E(c, x + 2, 121, 3, 2.5, col); P(c, x + 2, 121, '#f8e070'); }
    snowfall(c, t, 55, 13, 5, 10);
    return { z: 1 + 0.7 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 118 };
  }
};
