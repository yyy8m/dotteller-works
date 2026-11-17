/* ================= 記録 #017 津山三十人殺し: scenes ================= */
const GY = 156;
const VX = [20, 95, 170, 245]; // village house slots
function village(c, t, o = {}) { vSky(c, o); if (o.night) moon(c, 268, 34, 9, t); hills(c, 118, o); paddy(c, 150, o); for (let i = 0; i < 4; i++) kaya(c, t, VX[i] + (o.ox || 0), 150 - (i % 2) * 6, 60, { night: o.night, lit: o.lit ? (o.lit[i] != null ? o.lit[i] : 1) : 0, flash: o.flash === i }); }

/* ---- TX: cold open — the dark hamlet, a figure with two lights on his head (moves: the beams sweep, he walks, the count) ---- */
const TZ = withCuts({
  name: '闇の集落', ch: '1938年5月21日', bgm: 'eerie',
  init(S) { S.tGear = at(S, 'C1', 0) - 0.3; S.t30 = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.t30) { R(c, 0, 0, W, H, '#040408'); village(c, t, { night: true }); dim(c, 0.55); const u = sg(t, S.t30, S.t30 + 6); mutsuoNight(c, t, lerp(40, 280, u), GY + 4, { k: 'c2', f: Math.floor(t * 4) & 3, s: 0.8, blen: 70 }); bigCap(c, '1時間半', 64, 32, '#f8e8b0', sg(t, S.t30 + 0.2, S.t30 + 0.8)); bigCap(c, '30人', 100, 48, '#e81c1c', sg(t, at(S, 'C2', 1) - 0.2, at(S, 'C2', 1) + 0.4)); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tGear) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 130, W, 110, '#1c2a2c'); const s = 2; mutsuoNight(c, t, 150, 168, { k: 'c1', s, blen: 120, ba: 0.22 }); const k = Math.min(5, Math.floor(sg(t, S.tGear, at(S, 'C1', 5)) * 5.99)); const spots = [[150, 62], [150, 62], [155, 106], [124, 150], [176, 96]]; if (k > 0) { const [x, y] = spots[Math.min(k, 4)]; glow(c, x, y, 26, 26, '#fff4c8', 0.25 + 0.1 * Math.sin(t * 6)); } return { z: 1.02 + 0.03 * ss(sg(t, S.tGear, S.t30)), fx: 160, fy: 130 }; }
    village(c, t, { night: true }); pole(c, 300, 150, { t });
    const u = sg(t, at(S, 'C0', 3) - 0.5, at(S, 'C0', 5) + 1); mutsuoNight(c, t, lerp(-20, 200, u), GY + 3, { k: 'c0', f: u < 1 ? Math.floor(t * 4) & 3 : -1, s: 0.8, blen: 80 });
    yearFlash(c, t, at(S, 'C0', 0), 1938, 216, 10, '5月21日'); capPlate(c, t, at(S, 'C0', 2), ['岡山県 西加茂村', '貝尾集落'], 44);
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tGear)), fx: 150, fy: 130 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, toiFace({ night: true, dark: true, blink: blinkOf(t, 4) }), { bg: ['#06060c', '#1c1c34'], glow: '#fff4c8' })]]);

/* ---- TA: birth and the three deaths — the farmhouse in Kuromi, three memorial tablets, the clan meeting, the move (moves: tablets appear one by one, people whisper, the walk) ---- */
const TA = {
  name: '生い立ち', ch: '生い立ち', bgm: 'memory',
  init(S) { S.tLand = at(S, 'L1b', 0) - 0.3; S.tDead = at(S, 'L2', 0) - 0.3; S.tClan = at(S, 'L3', 0) - 0.3; S.tMove = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMove) { vSky(c, {}); hills(c, 120); paddy(c, 150); road(c, 150); kaya(c, t, 230, 150, 60, {}); kaya(c, t, 270, 140, 44, {}); const u = sg(t, S.tMove + 0.4, S.dur - 1); robe(c, GRAN, lerp(40, 200, u), GY + 6, { k: 'mv', f: u < 1 ? Math.floor(t * 3) & 3 : -1 }); person(c, MUTSUO_KID, lerp(22, 182, u), GY + 6, { k: 'mv', f: u < 1 ? Math.floor(t * 3 + 1) & 3 : -1 }); capPlate(c, t, at(S, 'L4', 3), ['祖母のふるさと', '貝尾集落'], 44); return { z: 1.03, fx: 160, fy: 130 }; }
    if (t > S.tClan) { room(c, {}); shoji(c, 20, 40, 120, 100, {}); shoji(c, 180, 40, 120, 100, {}); for (let i = 0; i < 4; i++) robe(c, VW[i], 60 + i * 64, 158, { k: 'cl', pose: 'sit', flip: i >= 2, expr: i === 1 ? 'sad' : 'normal' }); robe(c, GRAN, 26, 166, { k: 'cl2', pose: 'sit' }); person(c, MUTSUO_KID, 48, 166, { k: 'cl', expr: 'sad', blink: blinkOf(t, 3) }); if (t > at(S, 'L3', 3) - 0.3) plate(c, 104, 74, '家督は継がせない', '#f8e8b0'); else plate(c, 124, 74, '労咳筋', '#e8a0a0'); return { z: 1.03, fx: 160, fy: 150 }; }
    if (t > S.tDead) { room(c, { night: true }); R(c, 90, 40, 140, 110, '#140e08'); R(c, 96, 46, 128, 98, '#2c1c10'); R(c, 96, 120, 128, 4, '#c8a040'); for (let i = 0; i < 3; i++) ihai(c, 130 + i * 30, 118, sg(t, at(S, 'L2', i + 1) - 0.2, at(S, 'L2', i + 1) + 0.4)); candle(c, 112, 132, t, 1); candle(c, 208, 132, t, 2); const nm = ['祖父', '父', '母']; for (let i = 0; i < 3; i++) if (t > at(S, 'L2', i + 1)) TX(c, nm[i], 122 + i * 30 + (i ? 4 : 0), 124, '#f8e8b0', 16, '#000000'); if (t > at(S, 'L2', 5) - 0.2) plate(c, 30, 60, '肺結核', '#e8a0a0'); yearFlash(c, t, S.tDead + 0.2, 1919, 8, 10, '4月'); return { z: 1.03 + 0.03 * ss(sg(t, S.tDead, S.tClan)), fx: 160, fy: 100 }; }
    if (t > S.tLand) { vSky(c, {}); hills(c, 116); paddy(c, 140); for (let i = 0; i < 18; i++) { const x = 10 + (i * 37) % 300, y = 150 + (i * 23) % 70; L(c, x, y, x, y - 6, '#7c9c4c'); L(c, x + 3, y, x + 4, y - 7, '#8cac5c'); } kaya(c, t, 30, 140, 70, {}); person(c, MUTSUO_KID, 200, GY + 6, { k: 'ld', blink: blinkOf(t, 4) }); capPlate(c, t, at(S, 'L1b', 0), ['田畑と山林'], 44); return { z: 1.03, fx: 160, fy: 130 }; }
    vSky(c, {}); hills(c, 120); paddy(c, 150); kaya(c, t, 110, 150, 100, { lit: 0.6 }); smoke(c, 190, 80, t, 3); robe(c, VW[1], 70, GY + 5, { k: 'b0' }); robe(c, VW[0], 250, GY + 5, { k: 'b0', flip: true });
    yearFlash(c, t, 0.3, 1917, 216, 10, '3月5日'); capPlate(c, t, at(S, 'L1', 2), ['岡山県 加茂村', '倉見'], 44);
    return { z: 1.03 + 0.03 * ss(sg(t, 0, S.tLand)), fx: 160, fy: 120 };
  }
};

/* ---- TB: school, illness, withdrawal (moves: the grades fill in, the doctor shakes his head, the sister leaves) ---- */
const TB = {
  name: '少年時代', ch: '少年時代', bgm: 'memory',
  init(S) { S.tSick = at(S, 'L6', 0) - 0.3; S.tAlone = at(S, 'L6', 3) - 0.3; S.tSis = at(S, 'L6b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSis) { room(c, { night: true }); shoji(c, 200, 40, 100, 100, { lit: false, night: true }); const u = sg(t, S.tSis + 0.3, at(S, 'L6b', 2)); robe(c, SISTER, lerp(170, 340, u), 159, { k: 'sis', f: u < 1 ? Math.floor(t * 3) & 3 : -1 }); person(c, MUTSUO, 90, 159, { k: 'sis', expr: 'sad', blink: blinkOf(t, 5) }); if (t > at(S, 'L6b', 3) - 0.3) { dim(c, 0.35 * sg(t, at(S, 'L6b', 3), S.dur)); glow(c, 90, 120, 40, 50, '#f8d880', 0.15); } return { z: 1.03 + 0.04 * ss(sg(t, S.tSis, S.dur)), fx: 110, fy: 140 }; }
    if (t > S.tSick) { room(c, {}); shoji(c, 20, 40, 120, 100, {}); if (t < S.tAlone) { R(c, 110, 146, 100, 14, '#e8e4dc'); R(c, 110, 142, 30, 8, '#f4f0e8'); E(c, 128, 140, 8, 7, '#e8c4a0'); R(c, 120, 134, 16, 4, '#141418'); person(c, DOCTOR, 250, 159, { k: 'dc', flip: true, arm: t > at(S, 'L6', 1) ? 'point' : null }); plate(c, 210, 70, '農作業は禁止', '#f8e8b0'); return { z: 1.03, fx: 170, fy: 160 }; }
      dim(c, 0.4 * sg(t, S.tAlone, S.tAlone + 2)); person(c, MUTSUO, 170, 159, { k: 'al', expr: 'sad', blink: blinkOf(t, 4) }); R(c, 140, 160, 60, 4, '#5c4430'); return { z: 1.03 + 0.05 * ss(sg(t, S.tAlone, S.tSis)), fx: 170, fy: 160 }; }
    R(c, 0, 0, W, H, '#5c4c34'); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, H, '#4c3c28'); R(c, 30, 34, 260, 130, '#e8e0cc'); R(c, 30, 34, 260, 22, '#8c2c2c'); TX(c, '学業成績（8年間）', 90, 36, '#f8f0e0', 16, null); R(c, 196, 60, 1, 100, '#8c7c5c');
    const subj = ['修身', '国語', '算術', '国史', '地理', '理科', '図画', '体操']; const n = Math.floor(sg(t, at(S, 'L5', 0), at(S, 'L5', 2)) * 8.99);
    for (let i = 0; i < 8; i++) { const x = 40 + (i >> 2) * 78, y = 62 + (i & 3) * 24; TX(c, subj[i], x, y, '#2c2c2c', 16, null); if (i < n) TX(c, String(8 + (i * 7) % 3), x + 42, y, '#c81818', 16, null); }
    if (t > at(S, 'L5', 3) - 0.3) { plate(c, 206, 66, '正直', '#2c2c2c', '#f4f0e8'); plate(c, 206, 94, '約束を守る', '#2c2c2c', '#f4f0e8'); plate(c, 206, 122, '礼儀正しい', '#2c2c2c', '#f4f0e8'); }
    return { z: 1.03 + 0.03 * Math.sin(t * 0.4), fx: 160, fy: 120 };
  }
};

/* ---- TC: the conscription exam and the rejections (moves: the stamp falls, women turn away, whispers) ---- */
const TC = {
  name: '丙種合格', ch: '丙種合格', bgm: 'dread',
  init(S) { S.tRej = at(S, 'L8', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRej) { vSky(c, { dusk: true }); hills(c, 120); paddy(c, 150); kaya(c, t, 10, 150, 60, {}); kaya(c, t, 250, 150, 60, {}); const u = sg(t, S.tRej + 0.4, at(S, 'L8', 2)); for (let i = 0; i < 3; i++) robe(c, [WOMAN, VW[1], VW[3]][i], 180 + i * 34 + u * 40, GY + 5, { k: 'rj' + i, flip: false, f: u > 0 && u < 1 ? Math.floor(t * 3 + i) & 3 : -1 }); person(c, MUTSUO, 110, GY + 5, { k: 'rj', expr: 'sad', blink: blinkOf(t, 4) });
      if (t > at(S, 'L8', 3) - 0.3) { for (let i = 0; i < 4; i++) { const ph = fr(t * 0.6 + i / 4); c.save(); c.globalAlpha = 1 - ph; TX(c, '…', 40 + i * 70, 100 - ph * 20, '#c8c8d8', 16, null); c.restore(); } robe(c, VW[4], 30, GY + 4, { k: 'wh', flip: false }); robe(c, VW[5], 52, GY + 4, { k: 'wh', flip: true }); dim(c, 0.3 * sg(t, at(S, 'L8', 4), S.dur), '#200408'); }
      return { z: 1.03, fx: 140, fy: 140 }; }
    R(c, 0, 0, W, H, '#6c5c44'); for (let x = 0; x < W; x += 30) R(c, x, 0, 2, 150, '#4c3c2c'); R(c, 0, 150, W, 90, '#8c7c5c'); R(c, 170, 130, 110, 10, '#5c3c24'); R(c, 176, 140, 6, 40, '#4c2c1c'); R(c, 268, 140, 6, 40, '#4c2c1c'); person(c, OFFICER, 240, 150, { k: 'ex', flip: true }); person(c, MUTSUO, 110, 159, { k: 'ex', blink: blinkOf(t, 5) }); R(c, 200, 120, 30, 10, '#f0ead8');
    plate(c, 30, 70, '徴兵検査', '#f8e8b0'); yearFlash(c, t, 0.3, 1937, 216, 10, '5月22日');
    stamp(c, t, at(S, 'L7', 3) - 0.1, 160, 110, '丙種合格', 110);
    return { z: 1.03, fx: 170, fy: 130, sx: t > at(S, 'L7', 3) - 0.1 && t < at(S, 'L7', 3) + 0.2 ? Math.round(Math.sin(t * 80) * 2) : 0 };
  }
};

/* ---- TD: the shotgun, practice, the night walks, the miso soup, the seizure (moves: shots in the hills, peeking faces, the stamp) ---- */
const TD = {
  name: '猟銃', ch: '猟銃', bgm: 'dread',
  init(S) { S.tPrac = at(S, 'L10', 0) - 0.3; S.tNight = at(S, 'L10', 2) - 0.3; S.tSoup = at(S, 'L11', 0) - 0.3; S.tCop = at(S, 'L11', 4) - 0.3; S.tSeize = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSeize) { room(c, {}); shoji(c, 20, 40, 120, 100, {}); person(c, POLICE, 120, 159, { k: 'sz' }); person(c, POLICE, 170, 160, { k: 'sz2', flip: true }); blit(c, gunSpr(), 230, 120, 32, 7, { s: 1.5 }); L(c, 220, 140, 280, 130, '#c8ccd4', 2); R(c, 214, 138, 10, 4, '#2c2420'); stamp(c, t, at(S, 'L12', 2) - 0.1, 250, 100, '押収', 70); if (t > at(S, 'L12', 3) - 0.3) stamp(c, t, at(S, 'L12', 3) - 0.1, 100, 80, '許可取消', 100); return { z: 1.03, fx: 180, fy: 140 }; }
    if (t > S.tCop) { R(c, 0, 0, W, H, '#5c5c4c'); R(c, 0, 150, W, 90, '#8c8468'); R(c, 120, 40, 140, 110, '#c8bca0'); R(c, 160, 90, 40, 60, '#4c3c2c'); plate(c, 150, 60, '駐在所', '#f8f0e0', '#3c2c1c'); robe(c, GRAN, 120, 159, { k: 'cp', arm: 'point', expr: 'shock' }); person(c, POLICE, 200, 159, { k: 'cp', flip: true }); return { z: 1.03, fx: 160, fy: 140 }; }
    if (t > S.tSoup) { room(c, {}); shoji(c, 200, 40, 100, 100, {}); robe(c, GRAN, 80, 160, { k: 'sp', pose: 'sit', expr: t > at(S, 'L11', 1) - 0.3 ? 'shock' : 'normal' }); R(c, 116, 150, 40, 6, '#5c3c24'); E(c, 136, 146, 7, 4, '#8c5c2c'); E(c, 136, 145, 5, 2, '#c89c5c'); person(c, MUTSUO, 170, 160, { k: 'sp', arm: 'fwd' }); if (t > at(S, 'L11', 2) - 0.3) plate(c, 60, 70, '孫に毒殺される', '#e8a0a0'); return { z: 1.04, fx: 130, fy: 160 }; }
    if (t > S.tNight) { village(c, t, { night: true, lit: [1, 0.7, 1, 0.8] }); const u = sg(t, S.tNight, S.tSoup); person(c, MUTSUO, lerp(-10, 330, u), GY + 3, { k: 'nw', f: Math.floor(t * 3) & 3, s: 0.8 }); L(c, lerp(-10, 330, u) - 4, GY - 14, lerp(-10, 330, u) + 10, GY - 36, '#3c2c1c', 2); for (let i = 0; i < 4; i++) if (Math.sin(t * 1.3 + i * 2) > 0.2) { const x = VX[i] + 30; E(c, x - 4, 128 - (i % 2) * 6, 2, 2, '#141414'); E(c, x + 4, 128 - (i % 2) * 6, 2, 2, '#141414'); } return { z: 1.03, fx: 160, fy: 130 }; }
    if (t > S.tPrac) { vSky(c, {}); hills(c, 150); R(c, 0, 150, W, 90, '#4c6c3c'); for (let i = 0; i < 4; i++) { const x = 240 + i * 16; R(c, x, 120, 4, 30, '#5c4430'); E(c, x + 2, 118, 6, 6, '#e8e0d0'); E(c, x + 2, 118, 3, 3, '#c81818'); } person(c, MUTSUO, 90, GY + 6, { k: 'pr', arm: 'fwd' }); L(c, 96, 130, 140, 126, '#3c2c1c', 2); const ph = fr(t * 0.8); muzzleFlash(c, 142, 126, 1, ph < 0.12 ? 1 : 0); return { z: 1.03, fx: 160, fy: 130 }; }
    R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 110, 140, 60, '#f8e0a0', 0.15); const u = sg(t, at(S, 'L9', 3) - 0.3, at(S, 'L9', 3) + 1); spinPaper(c, gunSpr(), 160, 110, Math.max(0.01, u)); if (u >= 1) blit(c, gunSpr(), 160, 110, 32, 7, { s: 3 }); if (t > at(S, 'L9', 4) - 0.3) plate(c, 100, 140, '12番口径 5連発', '#f8e8b0');
    yearFlash(c, t, at(S, 'L9', 2) - 0.2, 1938, 216, 10, '');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- TE: the turning point — darkness; rearming; the bicycle timed to the police box; the wills; she comes home (moves: the watch ticks, wheels spin, pen writes) ---- */
const TE = {
  name: '周到な準備', ch: '周到な準備', bgm: 'pulse',
  init(S) { S.tDark = at(S, 'L13', 0) - 0.6; S.tArm = at(S, 'L14', 0) - 0.3; S.tBike = Math.min(at(S, 'L15', 0), at(S, 'T2', 0)) - 0.3; S.tWill = at(S, 'L16', 0) - 0.3; S.tHome = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tHome) { vSky(c, {}); hills(c, 120); paddy(c, 150); road(c, 150); kaya(c, t, 200, 150, 70, {}); const u = sg(t, S.tHome + 0.5, at(S, 'L17', 4)); robe(c, WOMAN, lerp(90, 200, u), GY + 7, { k: 'hm', f: u < 1 ? Math.floor(t * 3) & 3 : -1 }); R(c, lerp(90, 200, u) - 14, GY - 24, 10, 8, '#c8a040'); shade(c, modFig(MUTSUO, { k: 'hm' }), 40, GY + 4, { id: 'hm', s: 0.9 }); yearFlash(c, t, S.tHome + 0.2, 1938, 216, 10, '5月'); capPlate(c, t, at(S, 'L17', 3), ['里帰り'], 44); return { z: 1.03 + 0.04 * ss(sg(t, at(S, 'L17', 4), S.dur)), fx: 120, fy: 140 }; }
    if (t > S.tWill) { R(c, 0, 0, W, H, '#140e08'); glow(c, 170, 120, 120, 80, '#f8d880', 0.3); lantern(c, 250, 150, t); R(c, 60, 156, 220, 8, '#3c2818'); letter(c, 120, 96, 1, { title: '遺書' }); const k = Math.floor(t * 3) % 7; R(c, 158 - Math.floor(k / 2) * 8, 104 + (k % 7) * 6, 1, 4, '#3c3c4c'); person(c, MUTSUO, 210, 164, { k: 'wl', flip: true, arm: 'fwd', expr: 'sad', blink: blinkOf(t, 4) }); return { z: 1.04, fx: 160, fy: 120 }; }
    if (t > S.tBike) { vSky(c, {}); hills(c, 120); R(c, 0, 150, W, 90, '#5c7c44'); R(c, 0, 148, W, 20, '#a8946c'); for (let i = 0; i < 6; i++) R(c, mod(i * 64 - t * 80, W + 40) - 20, 140, 6, 6, '#4c6c3c'); const f = t * 10; bike(c, 160, 166, f); person(c, MUTSUO, 158, 150, { k: 'bk', f: Math.floor(t * 6) & 3, arm: 'fwd' }); if (t > at(S, 'L15', 1) - 0.3) { R(c, 270, 100, 40, 50, '#c8bca0'); R(c, 266, 96, 48, 6, '#3c3c44'); R(c, 284, 120, 12, 30, '#4c3c2c'); plate(c, 250, 70, '駐在所', '#f8f0e0', '#3c2c1c'); } watch(c, 104, 70, t * 4, 22); if (t > at(S, 'L15', 3) - 0.3) plate(c, 20, 130, '何分かかるか', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 140 }; }
    if (t > S.tArm) { R(c, 0, 0, W, H, '#1c1610'); glow(c, 160, 110, 140, 70, '#f8e0a0', 0.2); R(c, 30, 140, 260, 8, '#3c2818'); blit(c, gunSpr(), 110, 118, 32, 7, { s: 2 * eOut(sg(t, S.tArm + 0.2, S.tArm + 0.8)) + 0.01 }); if (t > at(S, 'L14', 1) - 0.3) { L(c, 190, 126, 290, 100, '#c8ccd4', 2); R(c, 182, 124, 14, 5, '#2c2420'); } if (t > at(S, 'L14', 3) - 0.3) { letter(c, 40, 60, sg(t, at(S, 'L14', 3) - 0.3, at(S, 'L14', 3) + 0.2), { w: 70, h: 50, title: '借金' }); stamp(c, t, at(S, 'L14', 4), 80, 124, '家と土地', 90); } return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tDark) { R(c, 0, 0, W, H, '#020204'); const k = sg(t, S.tDark + 0.3, S.tDark + 1.6); c.save(); c.globalAlpha = 0.9 * k; blit(c, tintSpr(modFig(MUTSUO, { k: 'dk' }), '#2c2c3c', 'dkm'), 160, 168, FIG_AX2, FIG_AY2, { s: 2 }); c.restore(); if (k > 0.3) { R(c, 154, 76, 2, 2, '#e8e0d0'); R(c, 164, 76, 2, 2, '#e8e0d0'); } return { z: 1.02 + 0.03 * k, fx: 160, fy: 110 }; }
    return { z: 1, fx: 160, fy: 120 };
  }
};

/* ---- TF: the power line — he climbs, cuts, the hamlet goes dark; nobody worries; the old man's testimony (moves: sparks, lights dying one by one, sepia memory) ---- */
const TF = {
  name: '停電', ch: '停電', bgm: 'dread',
  init(S) { S.tCut = at(S, 'L18', 2) - 0.2; S.tOut = at(S, 'L18', 3) - 0.3; S.tNo = at(S, 'L19', 0) - 0.3; S.tMem = at(S, 'L19b', 0) - 0.3; S.tRep = at(S, 'L19c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRep) { R(c, 0, 0, W, H, '#2c2418'); glow(c, 160, 110, 140, 70, '#f8e0a0', 0.18); letter(c, 60, 40, 1, { w: 80, h: 96, title: '報告書' }); letter(c, 180, 40, 1, { w: 80, h: 96, title: '証言' }); const a = 0.6 + 0.4 * Math.sin(t * 4); c.save(); c.globalAlpha = a; TX(c, '？', 152, 80, '#e8c040', 16, '#000000'); c.restore(); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tMem) { const pre = sg(t, S.tMem, S.tMem + 1.2); if (t < at(S, 'L19b', 3) - 0.3) { room(c, { night: true }); lantern(c, 230, 160, t); robe(c, ELDER, 140, 162, { k: 'mem', pose: 'sit', blink: blinkOf(t, 4) }); capPlate(c, t, at(S, 'L19b', 0), ['70年後の証言', '2008年'], 44); dim(c, 0.6 * (1 - pre)); return { z: 1.03, fx: 150, fy: 160 }; }
      vSky(c, {}); hills(c, 120); paddy(c, 150); kaya(c, t, 30, 150, 60, {}); pole(c, 200, 160, { t }); person(c, MUTSUO, 200, 104, { k: 'fx', arm: 'up', blink: blinkOf(t, 3) }); for (let i = 0; i < 3; i++) robe(c, VW[i], 250 + i * 22, GY + 4, { k: 'fx' + i, flip: true, arm: i === 0 ? 'point' : null }); c.save(); c.globalAlpha = 0.45; c.fillStyle = '#704c1c'; c.fillRect(0, 0, W, H); c.restore(); if (t > at(S, 'L19b', 5) - 0.3) plate(c, 30, 70, '修理を頼まれていたのは', '#f8e8b0'); return { z: 1.03 + 0.04 * ss(sg(t, at(S, 'L19b', 3), S.tRep)), fx: 200, fy: 120 }; }
    if (t > S.tNo) { village(c, t, { night: true, lit: [0, 0, 0, 0] }); for (let i = 0; i < 4; i++) { const x = VX[i] + 30, y = 140 - (i % 2) * 6; candle(c, x, y, t, i, sg(t, S.tNo + 0.4 + i * 0.4, S.tNo + 0.8 + i * 0.4)); } robe(c, VW[2], 120, GY + 5, { k: 'no', blink: blinkOf(t, 4) }); robe(c, VW[3], 144, GY + 5, { k: 'no', flip: true }); return { z: 1.03, fx: 160, fy: 130 }; }
    const dusk = t < S.tOut; vSky(c, { dusk: true }); hills(c, 118); paddy(c, 150); for (let i = 0; i < 3; i++) { const off = t > S.tOut + i * 0.5; kaya(c, t, VX[i], 150 - (i % 2) * 6, 60, { lit: off ? 0 : 0.9 }); }
    pole(c, 270, 160, { t, cut: t > S.tCut }); const climb = sg(t, at(S, 'L18', 1) - 0.4, S.tCut); person(c, MUTSUO, 262, lerp(GY, 100, climb), { k: 'cl', arm: climb >= 1 ? 'up' : null, f: climb > 0 && climb < 1 ? Math.floor(t * 4) & 3 : -1 });
    if (t > S.tCut && t < S.tCut + 0.6) { for (let i = 0; i < 10; i++) { const a = hash(i + Math.floor(t * 20)) * TAU; P(c, 260 + Math.cos(a) * 10 * hash(i * 3), 68 + Math.sin(a) * 10, '#fff8a0'); } flashScreen(c, 0.3 * (1 - sg(t, S.tCut, S.tCut + 0.4))); }
    if (t > S.tOut) dim(c, 0.55 * sg(t, S.tOut, S.tOut + 2.4), '#04060c');
    yearFlash(c, t, 0.3, 1938, 8, 10, '5月20日'); capPlate(c, t, at(S, 'L18', 0), ['夕方5時'], 84);
    return { z: 1.03 + 0.03 * ss(sg(t, 0, S.tNo)), fx: 220, fy: 110 };
  }
};

/* ---- TG: 1:40 a.m. — dressing by the lamp, the weapons, unlocked doors, the first house (moves: lamp flicker, beams switch on, the door slides) ---- */
const TG = withCuts({
  name: '午前1時40分', ch: '決行', bgm: 'pulse',
  init(S) { S.tGear = at(S, 'L20b', 0) - 0.3; S.tLock = at(S, 'L21', 0) - 0.3; S.tFirst = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tFirst) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); kaya(c, t, 90, 160, 140, { night: true, flash: t > at(S, 'L22', 2) - 0.2 && t < at(S, 'L22', 2) + 0.15 }); dim(c, 0.4 * sg(t, at(S, 'L22', 2), S.dur)); return { z: 1.03 + 0.05 * ss(sg(t, S.tFirst, S.dur)), fx: 160, fy: 120 }; }
    if (t > S.tLock) { vSky(c, { night: true }); R(c, 0, 0, W, H, '#100c08'); R(c, 60, 30, 200, 170, '#2c2418'); for (let k = 0; k < 2; k++) { R(c, 70 + k * 92, 40, 88, 150, '#3c3020'); for (let r = 0; r < 5; r++) R(c, 70 + k * 92, 50 + r * 28, 88, 2, '#241c10'); } const u = sg(t, at(S, 'L21', 1), at(S, 'L21', 2)); R(c, 162, 40, 88 * u * 0.6, 150, '#06060a'); glow(c, 180, 110, 50, 70, '#fff4c8', 0.18 * u); plate(c, 110, 120, '鍵のない家', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tGear) { R(c, 0, 0, W, H, '#0a0806'); lantern(c, 60, 150, t, 0.6); mutsuoNight(c, t, 170, 168, { k: 'g2', s: 2, blen: 110, ba: 0.2, expr: 'angry' }); const k = Math.min(3, Math.floor(sg(t, S.tGear, at(S, 'L20b', 3)) * 3.99)); const sp = [[144, 150], [144, 150], [175, 106], [196, 88]]; if (k > 0) glow(c, sp[k][0], sp[k][1], 30, 30, '#fff4c8', 0.2 + 0.1 * Math.sin(t * 6)); if (k >= 3) plate(c, 220, 70, '9連発に改造', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 130 }; }
    R(c, 0, 0, W, H, '#0a0806'); lantern(c, 60, 150, t, 0.8); const s = 2; person(c, MUTSUO, 170, 168, { k: 'g1', s, blink: blinkOf(t, 4) }); if (t > at(S, 'L20', 3) - 0.3) { R(c, 160, 144, 10, 20, '#5c5c44'); R(c, 172, 144, 10, 20, '#5c5c44'); }
    plate(c, 200, 60, '午前1時40分', '#f8e8b0'); if (t > at(S, 'L20', 1) - 0.3) plate(c, 214, 90, '詰襟の学生服', '#c8c8d8');
    return { z: 1.02 + 0.03 * ss(sg(t, 0, S.tGear)), fx: 160, fy: 130 };
  }
}, []);

/* ---- TQ: the attack — flashes from house to house, people hiding; the kneeling mother behind the shoji; the woman escapes and is hidden (moves: flashes travel, shadow play, the tatami lifts) ---- */
const TQ = withCuts({
  name: '襲撃', ch: '襲撃', bgm: 'dread',
  init(S) { S.tHide = at(S, 'L23b', 0) - 0.3; S.tKneel = at(S, 'L24', 0) - 0.3; S.tShot = at(S, 'L25', 0) - 0.2; S.tRun = at(S, 'L26', 0) - 0.3; S.tTatami = at(S, 'L26', 2) - 0.3; S.tShed = at(S, 'L26', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShed) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); kaya(c, t, 30, 150, 120, { night: true }); R(c, 220, 100, 70, 50, '#3c3428'); PF(c, [212, 102, 255, 76, 298, 102], '#4c4430'); const fl = t > at(S, 'L26', 5) - 0.2 && t < at(S, 'L26', 5) + 0.12; if (fl) { R(c, 240, 114, 30, 24, '#fff8e0'); glow(c, 255, 126, 60, 40, '#fff4c8', 0.6); } dim(c, 0.4 * sg(t, at(S, 'L26', 5), S.dur), '#200408'); plate(c, 236, 60, '離れ', '#c8c8d8'); return { z: 1.03 + 0.04 * ss(sg(t, S.tShed, S.dur)), fx: 255, fy: 140 }; }
    if (t > S.tTatami) { room(c, { night: true }); shoji(c, 0, 40, 320, 100, { night: true }); dim(c, 0.3); const lift = eOut(sg(t, S.tTatami + 0.2, S.tTatami + 1)); R(c, 60, 136, 200, 32, '#1c1810'); R(c, 80, 144, 160, 20, '#5c5c3c'); for (let k = 0; k < 8; k++) R(c, 84 + k * 20, 146, 2, 16, '#4c4c2c'); robe(c, WOMAN, 160, 170, { k: 'tt', pose: 'kneel', expr: 'shock' }); c.save(); c.translate(60, 136); c.rotate(-0.5 * lift); R(c, 0, -10, 200, 10, '#a89c68'); R(c, 0, -10, 200, 2, '#3c3c2c'); c.restore(); for (let i = 0; i < 3; i++) robe(c, VW[i + 2], 30 + i * 130 + (i === 2 ? -10 : 0), 134, { k: 'tt' + i, expr: 'shock' }); plate(c, 30, 60, '畳の下にむしろを敷いて', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 170 }; }
    if (t > S.tRun) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); kaya(c, t, 10, 160, 110, { night: true }); kaya(c, t, 200, 160, 110, { night: true, lit: 0.4 }); const u = sg(t, S.tRun + 0.3, at(S, 'L26', 1) + 0.6); robe(c, WOMAN, lerp(90, 250, u), GY + 7, { k: 'run', f: u < 1 ? Math.floor(t * 6) & 3 : -1, expr: 'shock' }); plate(c, 40, 70, '裏口から隣の家へ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 140 }; }
    if (t > S.tKneel) { R(c, 0, 0, W, H, '#0a0806'); shoji(c, 20, 34, 280, 130, { lit: true }); c.save(); c.beginPath(); c.rect(20, 34, 280, 130); c.clip(); const shot = t > S.tShot && t < S.tShot + 0.15; if (shot) { R(c, 20, 34, 280, 130, '#fff8e0'); } blit(c, tintSpr(robeFig(VW[1], { pose: t > S.tShot + 0.2 ? 'sit' : 'bow', k: 'kn' }), '#1c140c', 'knsh'), 110, 168, FIG_AX2, FIG_AY2, { s: 2 }); blit(c, tintSpr(modFig(MUTSUO, { k: 'kn', arm: 'fwd' }), '#1c140c', 'kmsh'), 220, 168, FIG_AX2, FIG_AY2, { s: 2, flip: true }); L(c, 204, 96, 150, 100, '#1c140c', 4); for (const v of [-12, 12]) R(c, 217 + v, 58, 5, 7, '#1c140c'); if (t > S.tShot) bloodSplat(c, 118, 104, 40, 7, sg(t, S.tShot, S.tShot + 0.3)); c.restore(); for (let k = 0; k < 4; k++) R(c, 20 + k * 70, 30, 2, 170, '#3c2c1c'); if (t > at(S, 'L25', 2) - 0.3) plate(c, 70, 60, '奇跡的に命を取り留めた', '#2c1c10', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110, sx: shot ? 3 : 0 }; }
    if (t > S.tHide) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); R(c, 30, 90, 140, 60, '#3c3428'); PF(c, [22, 92, 100, 64, 178, 92], '#4c4430'); for (let i = 0; i < 2; i++) robe(c, VW[i], 72 + i * 30, 159, { k: 'hd' + i, pose: 'kneel', expr: 'shock' }); const ph = fr(t * 0.9); if (ph < 0.08) flashScreen(c, 0.25); if (t > at(S, 'L23b', 3) - 0.3) plate(c, 30, 60, '村を離れていた2人', '#c8c8d8'); return { z: 1.03, fx: 120, fy: 160, sx: ph < 0.08 ? 2 : 0 }; }
    village(c, t, { night: true, flash: Math.floor(sg(t, 0, S.tHide) * 8) % 4 }); dim(c, 0.2); const u = sg(t, 0.5, S.tHide); const x = lerp(30, 290, u); mutsuoNight(c, t, x, GY + 4, { k: 'at', f: Math.floor(t * 4) & 3, s: 0.8, blen: 60 });
    if (t > at(S, 'L23', 3) - 0.3) plate(c, 30, 60, '極めて計画的に、冷静に', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 130 };
  }
}, [['V1', (c, t, S) => closeUp(c, t, toiFace({ night: true, dark: true, blink: blinkOf(t, 3) }), { bg: ['#06060c', '#2c0c10'], glow: '#c81818' })]]);

/* ---- TI: those he let go — the dazed old man, the pleading master; two men run for help (moves: beams in the doorway, the run, bamboo sways) ---- */
const TI = withCuts({
  name: '見逃された人', ch: '見逃された人', bgm: 'eerie',
  init(S) { S.tBeg = at(S, 'L27b', 0) - 0.3; S.tGo = at(S, 'L27c', 0) - 0.3; S.tRun = at(S, 'L28', 0) - 0.3; S.tBamboo = at(S, 'L28', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBamboo) { vSky(c, { night: true }); R(c, 0, 120, W, 120, '#0c140c'); for (let i = 0; i < 26; i++) { const x = (i * 13) % W, sw = Math.sin(t * 1.5 + i) * 3; L(c, x, 180, x + sw, 30, i % 2 ? '#1c3c1c' : '#2c4c24', 3); for (let k = 0; k < 4; k++) L(c, x + sw, 44 + k * 32, x + sw + 10, 38 + k * 32, '#3c6c2c'); } const u = sg(t, S.tBamboo + 0.2, S.dur - 1); robe(c, VW[0], lerp(40, 260, u), 162, { k: 'bb', f: Math.floor(t * 6) & 3, expr: 'shock' }); return { z: 1.03, fx: 160, fy: 140 }; }
    if (t > S.tRun) { vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); R(c, 0, 150, W, 18, '#3c3a2c'); const u = sg(t, S.tRun + 0.2, at(S, 'L28', 2) + 0.4); robe(c, VW[2], lerp(20, 250, u), 158, { k: 'rn', f: u < 1 ? Math.floor(t * 6) & 3 : -1 }); R(c, 270, 106, 40, 46, '#5c5040'); glow(c, 290, 120, 30, 20, '#f8d880', 0.3); plate(c, 250, 76, '駐在所', '#f8f0e0', '#3c2c1c'); capPlate(c, t, at(S, 'L28', 1), ['事件の第一報'], 44); return { z: 1.03, fx: 160, fy: 150 }; }
    room(c, { night: true }); dim(c, 0.4); R(c, 230, 30, 70, 120, '#06060a');
    if (t > S.tBeg) { robe(c, VW[5], 140, 162, { k: 'bg', pose: t < S.tGo ? 'bow' : 'kneel', expr: 'shock' }); if (t > S.tGo) { const u = sg(t, S.tGo + 0.3, S.tRun); c.save(); c.globalAlpha = 1 - u; mutsuoNight(c, t, 260 + u * 40, 158, { k: 'go', flip: true, s: 1.2, blen: 60, f: u > 0 ? Math.floor(t * 4) & 3 : -1 }); c.restore(); } else mutsuoNight(c, t, 260, 158, { k: 'bg', flip: true, s: 1.2, blen: 60 }); if (t > S.tGo) plate(c, 30, 60, '立ち去った', '#f8e8b0'); return { z: 1.03, fx: 190, fy: 150 }; }
    robe(c, ELDER, 120, 162, { k: 'eld', pose: 'sit', expr: 'shock', blink: 0 }); mutsuoNight(c, t, 260, 158, { k: 'eld', flip: true, s: 1.2, blen: 70, aim: true }); if (t > at(S, 'L27', 1) - 0.3) plate(c, 30, 60, '茫然と座っていた老人', '#f8e8b0');
    return { z: 1.03 + 0.03 * ss(sg(t, 0, S.tBeg)), fx: 180, fy: 150 };
  }
}, [['V2', (c, t, S) => closeUp(c, t, toiFace({ night: true, dark: true, blink: blinkOf(t, 3) }), { bg: ['#06060c', '#1c1c34'], glow: '#fff4c8' })], ['V4', (c, t, S) => closeUp(c, t, toiFace({ night: true, dark: true, blink: blinkOf(t, 5) }), { bg: ['#06060c', '#1c1c34'], glow: '#fff4c8' })]]);

/* ---- TJ: the toll — a map of the eleven houses; thirty lights; the counting of ages (moves: houses mark one by one, candles light) ---- */
const TJ = {
  name: '被害', ch: '被害', bgm: 'requiem',
  init(S) { S.t30 = at(S, 'L30', 0) - 0.3; S.tAge = at(S, 'L30b', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tAge) { R(c, 0, 0, W, H, '#140e0a'); glow(c, 160, 110, 120, 70, '#f8e0a0', 0.15); plate(c, 60, 70, '満年齢　21歳', '#f8e8b0'); plate(c, 60, 110, '数え年　22歳', '#f8e8b0'); blit(c, toiFace({ blink: blinkOf(t, 4) }), 240, 110, 24, 24, { s: 2 }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.t30) { R(c, 0, 0, W, H, '#06060a'); vSky(c, { night: true }); candleRows(c, t, 30, sg(t, S.t30 + 0.2, at(S, 'L30', 1)) * 30, 52, 96, 10, 24, 20); if (t > at(S, 'L30', 1) - 0.3) plate(c, 124, 60, '死者 30人', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 130 }; }
    R(c, 0, 0, W, H, '#1c2418'); for (let x = 0; x < W; x += 16) R(c, x, 0, 1, H, '#202c1c'); for (let y = 0; y < H; y += 16) R(c, 0, y, W, 1, '#202c1c'); L(c, 0, 120, 320, 70, '#5c5034', 4); L(c, 120, 0, 160, 240, '#3c6c9c', 3);
    const pos = [[60, 64], [90, 88], [130, 56], [190, 72], [220, 104], [250, 56], [80, 128], [140, 120], [200, 140], [260, 136], [290, 88]];
    const n = Math.floor(sg(t, at(S, 'L29', 0), at(S, 'L29', 2)) * 11.99);
    pos.forEach(([x, y], i) => { R(c, x - 7, y - 5, 14, 10, '#8c7c5c'); PF(c, [x - 9, y - 4, x, y - 11, x + 9, y - 4], '#5c4c34'); if (i < n) { E(c, x, y - 1, 10, 9, DA('#c81818', 0.35)); ER(c, x, y - 1, 10, 9, '#e81c1c'); } if (t > at(S, 'L29', 3) - 0.3 && i % 4 === 1) { L(c, x - 8, y - 8, x + 8, y + 6, '#f8e8b0', 2); L(c, x + 8, y - 8, x - 8, y + 6, '#f8e8b0', 2); } });
    plate(c, 14, 40, '襲われた家 ' + Math.min(n, 11) + '軒', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- TK: pencil and paper — the lone house in the next hamlet, the boy who knew him (moves: the family freezes, the paper is handed over) ---- */
const TK = withCuts({
  name: '鉛筆と紙', ch: '鉛筆と紙', bgm: 'memory',
  init(S) { S.tBoy = at(S, 'L32', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBoy) { room(c, { night: true }); lantern(c, 60, 150, t); robe(c, VW[1], 40, 162, { k: 'kb', expr: 'shock' }); blit(c, robeFig({ id: 'boy', robe: '#4c5c7c', robe2: '#3c4c6c', trim: '#e8e0d0', sash: '#2c2018', hair: '#141418' }, { k: 'kb', arm: t < at(S, 'L32', 2) ? 'reach' : null }), 140, 162, FIG_AX2, FIG_AY2, { s: 0.78, flip: false }); person(c, MUTSUO, 220, 162, { k: 'kb', flip: true, s: 1.1, expr: 'sad' }); if (t < at(S, 'L32', 2)) { R(c, 152, 128, 10, 12, '#f0ead8'); L(c, 156, 126, 162, 138, '#8c5c2c'); } return { z: 1.03 + 0.04 * ss(sg(t, S.tBoy, S.dur)), fx: 170, fy: 160 }; }
    vSky(c, { night: true }); hills(c, 130, { night: true }); R(c, 0, 150, W, 90, '#1c2a2c'); kaya(c, t, 110, 150, 110, { night: true, lit: 0.8 }); mutsuoNight(c, t, 70, 159, { k: 'kh', s: 0.9, blen: 50, f: t < at(S, 'L31', 1) ? Math.floor(t * 3) & 3 : -1 }); capPlate(c, t, at(S, 'L31', 1), ['隣の集落の一軒家'], 44); if (t > at(S, 'L31', 2) - 0.3) plate(c, 120, 60, '遺書のための鉛筆と紙', '#f8e8b0');
    return { z: 1.03, fx: 140, fy: 140 };
  }
}, [['V3', (c, t, S) => closeUp(c, t, toiFace({ night: true, blink: blinkOf(t, 3) }), { bg: ['#140e08', '#3c2c18'], glow: '#f8d880' })]]);

/* ---- TP: Arasaka pass — the summit before dawn; the search party; three letters; the news (moves: wind, the black cut, birds, the paper spins) ---- */
const TP = {
  name: '荒坂峠', ch: '荒坂峠', bgm: 'requiem',
  init(S) { S.tEnd = at(S, 'L33', 4) - 0.2; S.tSearch = at(S, 'L34', 0) - 0.3; S.tLet = at(S, 'L34b', 0) - 0.3; S.tNews = at(S, 'L34c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tNews) { R(c, 0, 0, W, H, '#1c1610'); glow(c, 160, 110, 140, 70, '#f8e0a0', 0.15); spinPaper(c, paperSpr('ts1', '号外', '岡山県 西加茂村', '昭和13年5月21日'), 240, 112, sg(t, at(S, 'L34c', 2) - 0.3, at(S, 'L34c', 2) + 0.6)); R(c, 30, 100, 70, 50, '#5c3c24'); E(c, 50, 125, 12, 12, '#2c2018'); for (let k = 0; k < 3; k++) R(c, 72, 112 + k * 8, 20, 2, '#2c2018'); const ph = fr(t * 1.2); c.save(); c.globalAlpha = 1 - ph; ER(c, 65, 100 - ph * 20, 10 + ph * 20, 6 + ph * 10, '#f8e8b0'); c.restore(); capPlate(c, t, S.tNews + 0.3, ['朝8時', '岡山県知事 → 内務省'], 8); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tLet) { R(c, 0, 0, W, H, '#140e08'); glow(c, 160, 110, 140, 70, '#f8e0a0', 0.18); const ts = ['姉へ', '18枚', '峠で']; for (let i = 0; i < 3; i++) letter(c, 40 + i * 90, 70, sg(t, at(S, 'L34b', i + 1) - 0.3, at(S, 'L34b', i + 1) + 0.2), { w: 60, h: 80, title: ts[i] }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSearch) { vSky(c, {}); hills(c, 150); R(c, 0, 150, W, 90, '#4c6c3c'); PF(c, [0, 240, 120, 110, 200, 100, 320, 170, 320, 240], '#3c5c34'); for (let i = 0; i < 5; i++) { const x = 40 + i * 50 + Math.sin(t + i) * 2; if (i === 2) person(c, POLICE, x, 160 - i * 6, { k: 'sr', f: Math.floor(t * 3 + i) & 3 }); else robe(c, VW[i], x, 160 - i * 6, { k: 'sr' + i, f: Math.floor(t * 3 + i) & 3, arm: 'staff' }); } if (t > at(S, 'L34', 2) - 0.3) stamp(c, t, at(S, 'L34', 3) - 0.1, 240, 80, '不起訴', 80); return { z: 1.03, fx: 160, fy: 140 }; }
    vSky(c, { dawn: t > S.tEnd }); hills(c, 140, { night: t < S.tEnd }); PF(c, [0, 240, 90, 160, 170, 156, 240, 170, 320, 240], t < S.tEnd ? '#0c1410' : '#2c3c2c'); capPlate(c, t, at(S, 'L33', 0), ['荒坂峠', '仙の城'], 44);
    if (t < S.tEnd) { mutsuoNight(c, t, 170, 158, { k: 'pk', beams: false, gun: false, expr: 'sad', s: 0.9 }); letter(c, 184, 132, 1, { w: 14, h: 18 }); for (let i = 0; i < 12; i++) { const u = fr(t * 0.4 + i / 12); P(c, mod(i * 41 + u * 120, W), 120 + i * 6, '#5c6c7c'); } return { z: 1.04 + 0.04 * ss(sg(t, 0, S.tEnd)), fx: 170, fy: 130 }; }
    const k = sg(t, S.tEnd, S.tEnd + 0.15); if (t < S.tEnd + 1.2) dim(c, 1); else { for (let i = 0; i < 6; i++) { const u = sg(t, S.tEnd + 1.2 + i * 0.1, S.tEnd + 4); const x = 160 + i * 14 + u * 120, y = 90 - u * 70 + Math.sin(t * 8 + i) * 2; L(c, x - 4, y, x, y + 2, '#1c1c1c'); L(c, x, y + 2, x + 4, y, '#1c1c1c'); } dim(c, 0.4 * (1 - sg(t, S.tEnd + 1.2, S.tSearch))); }
    return { z: 1.03 + 0 * k, fx: 160, fy: 120 };
  }
};

/* ---- TM: what remained — 81 years, the hard years, suspicion, testimony, one line in a book, the empty hamlet (moves: the counter, houses fade, the old house falls) ---- */
const TM = {
  name: '残された村', ch: 'その後', bgm: 'requiem',
  init(S) { S.tPoor = at(S, 'L36', 0) - 0.3; S.tSus = at(S, 'L37', 0) - 0.3; S.tTest = at(S, 'L38', 0) - 0.3; S.tBook = at(S, 'L38b', 0) - 0.3; S.tPop = at(S, 'L39', 0) - 0.3; S.tDemo = at(S, 'L39b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDemo) { vSky(c, { dusk: true }); hills(c, 120); paddy(c, 150); const u = sg(t, at(S, 'L39b', 2) - 0.2, at(S, 'L39b', 3) + 0.4); c.save(); c.globalAlpha = 1 - u; kaya(c, t, 110, 160, 100, {}); c.restore(); for (let i = 0; i < 10 * u; i++) E(c, 120 + hash(i) * 80, 150 - hash(i * 3) * 30 * (1 - u), 10, 6, DA('#a8987c', 0.4 * (1 - u))); yearFlash(c, t, S.tDemo + 0.2, 2015, 216, 10, '春'); capPlate(c, t, at(S, 'L39b', 1), ['倉見の生家'], 44); return { z: 1.03, fx: 160, fy: 130 }; }
    if (t > S.tPop) { vSky(c, {}); hills(c, 120); paddy(c, 150); const later = t > at(S, 'L39', 2) - 0.3; for (let i = 0; i < 8; i++) { const x = 10 + i * 38, gone = later && i % 5 !== 0 && i % 3 === 1; if (gone) { R(c, x + 4, 146, 28, 4, '#6c5c44'); continue; } kaya(c, t, x, 150 - (i % 2) * 8, 34, {}); } plate(c, 20, 60, later ? '2010年　13世帯 37人' : '事件当時　23世帯 111人', '#f8e8b0'); if (t > at(S, 'L39', 4) - 0.3) plate(c, 20, 86, '当時から住む人　0人', '#e8a0a0'); return { z: 1.03, fx: 160, fy: 130 }; }
    if (t > S.tBook) { R(c, 0, 0, W, H, '#2c2418'); R(c, 70, 34, 180, 126, '#f0ead8'); R(c, 158, 34, 4, 126, '#c8bca0'); for (let r = 0; r < 9; r++) R(c, 84 + (r % 2) * 90, 50 + Math.floor(r / 2) * 14, 60, 2, '#c8c0b0'); if (t > at(S, 'L38b', 2) - 0.3) { R(c, 166, 118, 80, 18, '#f8e898'); TX(c, '……発生した', 170, 118, '#3c2c1c', 16, null); } plate(c, 84, 128, '加茂町史', '#2c1c10', '#f4f0e8'); return { z: 1.03 + 0.05 * ss(sg(t, at(S, 'L38b', 2), S.tPop)), fx: 206, fy: 126 }; }
    if (t > S.tTest) { R(c, 0, 0, W, H, '#140e0a'); for (let i = 0; i < 5; i++) letter(c, 20 + i * 60, 60 + (i % 2) * 16, sg(t, S.tTest + 0.4 + i * 0.3, S.tTest + 0.8 + i * 0.3), { w: 48, h: 60, title: '証言' }); const k = 1 - sg(t, at(S, 'L38', 3) - 0.3, at(S, 'L38', 5)); c.save(); c.globalAlpha = 0.6 * k; blit(c, tintSpr(modFig(MUTSUO, { k: 'ts' }), '#3c3444', 'tsm'), 160, 166, FIG_AX2, FIG_AY2, { s: 1.4 }); c.restore(); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tSus) { vSky(c, { dusk: true }); hills(c, 120); paddy(c, 150); kaya(c, t, 230, 150, 70, { lit: 0.5 }); for (let i = 0; i < 5; i++) robe(c, VW[i], 30 + i * 30, GY + 5, { k: 'sus' + i, flip: true }); plate(c, 20, 70, '村八分に近い扱い', '#e8a0a0'); return { z: 1.03, fx: 160, fy: 130 }; }
    if (t > S.tPoor) { vSky(c, { dusk: true }); hills(c, 120); R(c, 0, 150, W, 90, '#6c6c44'); for (let i = 0; i < 40; i++) { const x = hash(i) * W, y = 160 + hash(i * 3) * 70; L(c, x, y, x + Math.sin(t + i) * 2, y - 10, '#8c8c4c'); } robe(c, GRAN, 160, 162, { k: 'pr', pose: 'bow' }); plate(c, 40, 70, '働き手を失った家', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 150 }; }
    R(c, 0, 0, W, H, '#0c0c14'); const y = Math.round(lerp(1938, 2019, sg(t, at(S, 'L35', 1), at(S, 'L35', 3)))); bigCap(c, String(y), 64, 48, '#f8e8b0'); if (t > at(S, 'L35', 3) - 0.3) bigCap(c, '81年', 118, 32, '#e81c1c'); plate(c, 50, 36, '戦争を除く犯罪で最多の犠牲者', '#c8c8d8');
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- TN: ending — a book, the village under the moon, thirty lights (moves: lights sway, the moon) ---- */
const TN = {
  name: 'おわりに', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tCand = at(S, 'L41', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tCand) { village(c, t, { night: true }); dim(c, 0.3); candleRows(c, t, 30, sg(t, S.tCand + 0.3, S.tCand + 3) * 30, 52, 140, 10, 24, 12); return { z: 1.02 + 0.03 * ss(sg(t, S.tCand, S.tCand + 8)), fx: 160, fy: 140 }; }
    R(c, 0, 0, W, H, '#1c1610'); glow(c, 160, 110, 140, 70, '#f8e0a0', 0.18); R(c, 110, 34, 100, 124, '#2c1c14'); R(c, 114, 38, 92, 116, '#4c2c1c'); TX(c, '八つ墓村', 130, 70, '#f8e8b0', 16, null); TX(c, '横溝正史', 132, 110, '#c8b898', 16, null); plate(c, 214, 110, 'モチーフに', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends (the loop) ---- */
const SS1 = { name: '30人', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { village(c, t, { night: true }); const u = sg(t, 0, S.dur); mutsuoNight(c, t, lerp(40, 260, u), GY + 4, { k: 's1', f: Math.floor(t * 4) & 3, s: 0.9, blen: 80 }); bigCap(c, '1時間半で30人', 40, 32, '#f8e8b0', sg(t, 0.2, 0.8)); return { z: 1.04, fx: 160, fy: 130 }; } };
const SS2 = { name: '家を出た', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { R(c, 0, 0, W, H, '#0a0806'); lantern(c, 60, 150, t, 0.6); const u = sg(t, at(S, 'S2', 2), S.dur); mutsuoNight(c, t, lerp(160, 200, u), 168, { k: 's2', s: 2, blen: 110, ba: 0.22, f: u > 0 ? Math.floor(t * 4) & 3 : -1 }); return { z: 1.02, fx: 170, fy: 130 }; } };
