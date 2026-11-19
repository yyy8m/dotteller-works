/* ================= 文庫 #010 鏡地獄: scenes ================= */
const GY = 156;
const KCLOSE = (c, t) => closeUp(c, t, kareFace({ blink: blinkOf(t, 4) }), { bg: ['#0c1018', '#2c3c4c'], glow: '#a8c8e8', spk: 'kare' });

/* ---- MZ: cold open — a cloudy late-spring room, people telling tales; K begins; a man among mirrors; a glass ball (moves: lamplight, mirrors flicker, the ball turns) ---- */
const MZ = withCuts({
  name: '曇った日', ch: '不幸な友だち', bgm: 'eerie',
  init(S) { S.tFriend = at(S, 'C1', 0) - 0.3; S.tBall = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tBall) { R(c, 0, 0, W, H, '#06080c'); glow(c, 160, 96, 100, 70, '#a8c8e8', 0.25); sphere(c, t, 160, 96, 46, {}); for (let i = 0; i < 6; i++) { const a = t * 0.6 + i; P(c, 160 + Math.cos(a) * 30, 96 + Math.sin(a) * 30, '#f8fcff'); } return { z: 1.03 + 0.05 * ss(sg(t, S.tBall, S.dur)), fx: 160, fy: 96 }; }
    if (t > S.tFriend) { R(c, 0, 0, W, H, '#141820'); for (let i = 0; i < 5; i++) mirrorPane(c, 20 + i * 60, 40, 44, 100, { dark: true }); for (let i = 0; i < 5; i++) { c.save(); c.globalAlpha = 0.6; blit(c, modFig(KARE, { k: 'cz' }), 42 + i * 60, 136, FIG_AX2, FIG_AY2, { s: 0.9, flip: i % 2 === 1 }); c.restore(); } person(c, KARE, 160, 160, { k: 'cz', blink: blinkOf(t, 4) }); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#2c2420'); VG(c, 0, 0, W, 50, ['#5c5c64', '#7c7c84']); R(c, 20, 30, 80, 60, '#8c949c'); R(c, 58, 30, 3, 60, '#3c2c1c'); R(c, 20, 58, 80, 3, '#3c2c1c'); R(c, 0, 140, W, 50, '#5c4430'); R(c, 120, 128, 120, 10, '#6c4c2c'); glow(c, 180, 110, 50, 30, '#f8d880', 0.25);
    for (let i = 0; i < 5; i++) person(c, i === 4 ? KAY : { id: 'gs' + i, top: 'jacket', coat: ['#3c3c4c', '#4c3c34', '#2c3c3c', '#4c4c3c'][i], shirt: '#e8e4dc', pants: '#2c2c34', skin: '#e8c4a0', hair: '#141414', hairStyle: 'short' }, 110 + i * 34, 156, { k: 'cs' + i, flip: i >= 2, blink: blinkOf(t, i + 2) });
    capPlate(c, t, at(S, 'C0', 0), ['春の終わり', '曇った日'], 44);
    return { z: 1.03, fx: 180, fy: 110 };
  }
}, [['M1', KCLOSE]]);

/* ---- MA: childhood — the old trunk of Christian relics; lens toys; the bronze mirror that writes 寿 on the wall (moves: the trunk opens, the beam, the character glows) ---- */
const MA = withCuts({
  name: '寿の文字', ch: '少年時代', bgm: 'memory',
  init(S) { S.tToys = at(S, 'L2', 0) - 0.3; S.tRoom = at(S, 'L3', 0) - 0.3; S.tKotobuki = at(S, 'L4', 0) - 0.3; S.tWhy = at(S, 'L5', 0) - 0.3; S.tCreep = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCreep) { R(c, 0, 0, W, H, '#0c0c14'); for (let x = 0; x < W; x += 6) { const h = 4 + Math.sin(x * 0.3 + t) * 3 + hash(x) * 4; R(c, x, 120 - h, 6, h, '#6c7c8c'); } R(c, 0, 120, W, 4, '#8c9cac'); bigCap(c, 'ぞっとした', 50, 32, '#c8d8e8', sg(t, S.tCreep + 0.4, S.tCreep + 1)); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#2c241c'); E(c, 110, 96, 44, 44, '#8c7c4c'); E(c, 110, 96, 40, 40, '#a8945c'); c.save(); c.globalAlpha = 0.5; TX(c, '寿', 102, 86, '#5c4c2c', 16, null); c.restore(); L(c, 170, 96, 240, 96, '#f8f0c0', 2); for (let i = 0; i < 6; i++) E(c, 250 + (i % 3) * 12, 80 + Math.floor(i / 3) * 30, 4 + (i % 2), 4, i % 2 ? '#c8b070' : '#a8945c'); plate(c, 150, 130, '目に見えない凹凸', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tKotobuki) { R(c, 0, 0, W, H, '#140e0a'); E(c, 220, 80, 40, 40, '#f8f4e0'); E(c, 220, 80, 34, 34, '#fffcf0'); c.save(); c.translate(204, 62); c.scale(2, 2); TX(c, '寿', 0, 0, '#c8c4b0', 16, null); c.restore(); glow(c, 220, 80, 60, 50, '#fff8d0', 0.3); beam(c, 70, 120, -0.3, 150, 0.08, 0.2); person(c, KARE_KID, 70, 156, { k: 'kt', arm: 'fwd' }); person(c, KAY_KID, 30, 156, { k: 'kt', expr: 'shock' }); return { z: 1.04, fx: 180, fy: 100 }; }
    if (t > S.tRoom) { R(c, 0, 0, W, H, '#3c2c1c'); R(c, 0, 0, W, 140, '#4c3828'); R(c, 220, 30, 80, 60, '#f8f0c0'); R(c, 0, 140, W, 50, '#6c5438'); R(c, 60, 118, 80, 8, '#5c3c24'); E(c, 100, 112, 14, 14, '#a8945c'); person(c, KARE_KID, 140, 156, { k: 'rm', arm: 'fwd' }); person(c, KAY_KID, 200, 156, { k: 'rm', flip: true }); return { z: 1.03, fx: 150, fy: 110 }; }
    if (t > S.tToys) { R(c, 0, 0, W, H, '#2c2418'); const toys = [() => { R(c, 30, 90, 30, 24, '#5c4c3c'); E(c, 64, 100, 6, 6, '#a8c8e8'); }, () => { L(c, 90, 110, 130, 80, '#8c7c5c', 5); }, () => { E(c, 160, 96, 12, 12, '#c8c8c8'); L(c, 160, 108, 160, 124, '#5c4c3c', 3); E(c, 160, 96, 9, 9, '#a8c8e8'); }, () => { R(c, 196, 80, 12, 40, '#c84c7c'); for (let i = 0; i < 6; i++) P(c, 200 + (i % 2) * 4, 84 + i * 5, ['#f8e070', '#8cf8a8', '#a8c8f8'][i % 3]); }, () => { PF(c, [240, 120, 260, 80, 280, 120], '#c8e8f8'); }]; const n = Math.floor(sg(t, S.tToys, at(S, 'L2', 5)) * 5.99); for (let i = 0; i < n; i++) toys[i](); person(c, KARE_KID, 160, 160, { k: 'ty', blink: blinkOf(t, 3) }); plate(c, 20, 40, '物の姿を映すもの', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#2c2418'); trunk(c, 110, 140, 1); const k = sg(t, at(S, 'L1', 2), at(S, 'L1', 5)); if (k > 0.2) { R(c, 116, 100, 14, 10, '#3c2c1c'); } if (k > 0.4) { R(c, 140, 92, 6, 16, '#e8e0c8'); E(c, 143, 90, 3, 3, '#e8e0c8'); } if (k > 0.6) L(c, 156, 106, 186, 90, '#8c7c5c', 3); if (k > 0.8) E(c, 196, 104, 6, 8, DA('#a8e8c8', 0.7)); const wu = sg(t, 0.3, 9); person(c, KARE_KID, lerp(290, 200, wu), 156, { k: 'tr', f: wu < 1 ? Math.floor(t * 3) & 3 : -1, blink: blinkOf(t, 4) }); glow(c, 146, 96, 70, 40, '#f8d880', 0.15 + 0.1 * Math.sin(t * 4));
    capPlate(c, t, 0.4, ['切支丹の葛籠'], 44);
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V1', KCLOSE]]);

/* ---- MB: the concave mirror in class; "ほう"; the magic banknote; the lab in the garden; parents die (moves: the mirror passes, the face swells, a hand through the bill) ---- */
const MB = withCuts({
  name: '凹面鏡', ch: '凹面鏡', bgm: 'memory',
  init(S) { S.tLook = at(S, 'L8', 0) - 0.3; S.tHo = at(S, 'L9', 0) - 0.3; S.tFasc = at(S, 'L10', 0) - 0.3; S.tBill = at(S, 'L11', 0) - 0.3; S.tLab = at(S, 'L12', 0) - 0.3; S.tDead = at(S, 'L13', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDead) { R(c, 0, 0, W, H, '#1c1820'); for (let i = 0; i < 2; i++) { R(c, 110 + i * 70, 60, 30, 70, '#3c3440'); R(c, 106 + i * 70, 56, 38, 6, '#2c2430'); } candleRows(c, t, 2, 2, 125, 140, 2, 70, 0); person(c, KARE, 260, 156, { k: 'dd', expr: 'sad', blink: blinkOf(t, 4) }); if (t > at(S, 'L13', 2) - 0.3) plate(c, 30, 40, '莫大な財産', '#f8e070'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLab) { VG(c, 0, 0, W, 120, ['#8cacc8', '#c8dce8']); R(c, 0, 120, W, 70, '#5c7c4c'); R(c, 30, 70, 120, 70, '#e8e0d0'); PF(c, [24, 72, 90, 44, 156, 72], '#5c5c64'); for (let i = 0; i < 3; i++) R(c, 40 + i * 34, 86, 22, 28, '#3c4c5c'); R(c, 190, 80, 90, 60, '#8c7c6c'); PF(c, [184, 82, 235, 52, 286, 82], '#4c3c3c'); R(c, 226, 110, 18, 30, '#3c2c1c'); person(c, KARE, 260, 156, { k: 'lb', blink: blinkOf(t, 3) }); capPlate(c, t, S.tLab + 0.3, ['庭の実験室'], 44); return { z: 1.03, fx: 200, fy: 110 }; }
    if (t > S.tBill) { R(c, 0, 0, W, H, '#2c2418'); R(c, 100, 60, 120, 90, '#c8b088'); R(c, 140, 90, 40, 40, '#1c1410'); for (let i = 0; i < 4; i++) R(c, 146 + i * 6, 96, 18, 26, i % 2 ? '#c8d8b8' : '#b8c8a8'); const u = sg(t, at(S, 'L11', 1), at(S, 'L11', 2)); L(c, 240, 110, lerp(240, 170, u), 108, '#e8c4a0', 4); if (t > at(S, 'L11', 2) - 0.2) { c.save(); c.globalAlpha = 0.5 + 0.3 * Math.sin(t * 6); for (let i = 0; i < 4; i++) R(c, 146 + i * 6, 96, 18, 26, '#2c2418'); c.restore(); plate(c, 120, 40, '煙のように、つかめない', '#f8e8b0'); } return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tFasc) { R(c, 0, 0, W, H, '#2c2418'); for (let i = 0; i < 5; i++) E(c, 40 + i * 60, 80 + (i % 2) * 16, 18, 18, '#a8c0d0'); person(c, KARE, 160, 156, { k: 'fs', arm: 'fwd', expr: 'smile' }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tHo) { R(c, 0, 0, W, H, '#c8b494'); R(c, 40, 34, 160, 56, '#2c4c3c'); R(c, 0, 128, W, 60, '#a8845c'); for (let i = 0; i < 4; i++) person(c, i === 2 ? KARE_KID : { ...KAY_KID, id: 'cl' + i }, 60 + i * 60, 152, { k: 'ho' + i, expr: i === 2 ? 'shock' : 'smile', arm: i === 2 ? 'up' : null }); E(c, 186, 104, 6, 6, '#a8c0d0'); plate(c, 170, 50, 'ほう！', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLook) { R(c, 0, 0, W, H, '#0c0c14'); E(c, 160, 96, 70, 70, '#6c7c8c'); c.save(); c.beginPath(); c.arc(160, 96, 66, 0, TAU); c.clip(); blit(c, kidFace({ big: true }), 160, 96, 24, 24, { s: 2.8 + 0.4 * ss(sg(t, S.tLook, S.tLook + 2)) }); c.restore(); ER(c, 160, 96, 66, 66, '#c8d8e8'); return { z: 1.03, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#c8b494'); R(c, 40, 34, 160, 56, '#2c4c3c'); TX(c, '凹面鏡', 60, 50, '#f4f4e8', 16, null); E(c, 120, 74, 12, 12, '#f4f4e8'); ER(c, 120, 74, 12, 12, '#f4f4e8'); R(c, 0, 128, W, 60, '#a8845c'); const u = fr(t * 0.2); for (let i = 0; i < 5; i++) person(c, i === 1 ? KAY_KID : { ...KAY_KID, id: 'cr' + i }, 40 + i * 56, 152, { k: 'cr' + i, flip: i % 2 === 1 }); E(c, 40 + u * 224, 106, 5, 5, '#a8c0d0');
    yearFlash(c, t, 0.3, '中学', 216, 10, '物理の時間');
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V2', KCLOSE]]);

/* ---- MC: the lab years — the rooftop telescope turned on the town; the flea under the microscope; the giant face on the wall; a floating eye (moves: the tube pans, the flea kicks, the lips move) ---- */
const MC = withCuts({
  name: '実物幻灯', ch: '実験室', bgm: 'dread',
  init(S) { S.tFlea = at(S, 'L15', 0) - 0.3; S.tDoor = at(S, 'L16', 0) - 0.3; S.tFace = at(S, 'L17', 0) - 0.3; S.tReveal = at(S, 'L18', 0) - 0.3; S.tEye = at(S, 'L18b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEye) { lab(c, t, {}); person(c, KAY, 90, 156, { k: 'ey', expr: 'shock' }); const k = sg(t, S.tEye + 0.3, S.tEye + 1.2); c.save(); c.globalAlpha = k; E(c, 200, 90, 40, 24, '#f8f4ec'); E(c, 200, 90, 18, 18, '#6c4c2c'); E(c, 200, 90, 9, 9, '#141418'); E(c, 194, 84, 4, 3, '#ffffff'); for (let i = 0; i < 4; i++) L(c, 166 + i * 4, 90 + i * 3, 178 + i * 4, 92 + i * 2, '#c83c3c'); c.restore(); return { z: 1.04, fx: 170, fy: 100 }; }
    if (t > S.tReveal) { lab(c, t, {}); person(c, KARE, 220, 156, { k: 'rv', expr: 'smile', arm: 'wave' }); person(c, KAY, 120, 156, { k: 'rv', expr: 'shock', flip: true }); R(c, 20, 40, 60, 70, '#2c2c34'); E(c, 50, 60, 10, 10, '#c8d8e8'); beam(c, 50, 60, 0.1, 40, 0.2, 0.25); return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tFace) { R(c, 0, 0, W, H, '#0c0a08'); c.save(); c.globalAlpha = 0.85 + 0.1 * Math.sin(t * 2); blit(c, kareFace({ blink: blinkOf(t, 6), lips: true }), 160, 88, 24, 24, { s: 3.4 }); c.restore(); for (let y = 0; y < H; y += 3) R(c, 0, y, W, 1, DA('#000000', 0.25)); person(c, KAY, 30, 166, { k: 'fc', expr: 'shock', s: 0.8 }); return { z: 1.02 + 0.04 * ss(sg(t, S.tFace, S.tReveal)), fx: 160, fy: 90 }; }
    if (t > S.tDoor) { lab(c, t, { dark: true }); const k = sg(t, S.tDoor + 0.5, S.tFace); c.save(); c.globalAlpha = 0.3 * k; E(c, 180, 80, 80, 50, '#8c6c5c'); c.restore(); person(c, KAY, 50, 156, { k: 'dr', expr: 'shock' }); return { z: 1.03, fx: 140, fy: 100 }; }
    if (t > S.tFlea) { R(c, 0, 0, W, H, '#0c0808'); E(c, 160, 96, 76, 76, '#3c1010'); c.save(); c.beginPath(); c.arc(160, 96, 72, 0, TAU); c.clip(); E(c, 160, 110, 70, 30, '#5c1010'); const kick = Math.sin(t * 9) * 4; E(c, 160, 96, 34, 24, '#3c2c1c'); E(c, 150, 90, 14, 10, '#5c4430'); for (let i = 0; i < 3; i++) { L(c, 140 + i * 16, 112, 124 + i * 16 + kick, 134, '#3c2c1c', 3); L(c, 150 + i * 14, 110, 176 + i * 12 - kick, 136, '#3c2c1c', 3); } L(c, 128, 96, 104, 104, '#3c2c1c', 2); c.restore(); ER(c, 160, 96, 72, 72, '#8c8c8c'); plate(c, 20, 40, '五十倍の顕微鏡', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 96 }; }
    VG(c, 0, 0, W, 120, ['#1c2448', '#3c4c7c']); for (let i = 0; i < 20; i++) P(c, hash(i) * W, hash(i * 3) * 60, '#e8ecf8'); for (let i = 0; i < 8; i++) { R(c, i * 40, 120 - (i % 3) * 8, 36, 40, '#2c2c34'); PF(c, [i * 40 - 4, 122 - (i % 3) * 8, i * 40 + 18, 108 - (i % 3) * 8, i * 40 + 40, 122 - (i % 3) * 8], '#1c1c24'); if (i % 2) R(c, i * 40 + 12, 128 - (i % 3) * 8, 10, 8, '#f8d880'); } R(c, 0, 150, W, 40, '#3c3428'); telescope(c, 230, 120, 0.3 + Math.sin(t * 0.5) * 0.1); person(c, KARE, 260, 156, { k: 'ts', arm: 'fwd' });
    capPlate(c, t, at(S, 'L14', 0), ['山の手の高台'], 44);
    return { z: 1.03, fx: 200, fy: 110 };
  }
}, [['V3', KCLOSE], ['V4', KCLOSE]]);

/* ---- MD: the turning point — the mirror room (endless reflections, a candle), K refuses, the girl, the servant at the door (moves: reflections sway, the candle flickers) ---- */
const MD = {
  name: '鏡の部屋', ch: '鏡の部屋', bgm: 'dread',
  init(S) { S.tRoom = at(S, 'L20', 0) - 0.3; S.tIn = at(S, 'L21', 0) - 0.3; S.tNo = at(S, 'L22', 0) - 0.3; S.tGirl = at(S, 'L23', 0) - 0.3; S.tDoor = at(S, 'L23b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDoor) { lab(c, t, { dark: true, shelves: false }); R(c, 160, 40, 90, 110, '#a8c0d0'); mirrorPane(c, 166, 46, 78, 100, {}); robe(c, SERV[1], 120, 156, { k: 'dr', arm: 'reach' }); if (t > at(S, 'L23b', 1) - 0.3) { c.save(); c.globalAlpha = 0.85; shadowFig(c, KARE, 240, 156, 'drk'); c.restore(); } return { z: 1.03, fx: 180, fy: 100 }; }
    if (t > S.tGirl) { mirrorRoom(c, t, { st: MAID, candle: true }); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tNo) { lab(c, t, { shelves: false }); R(c, 160, 40, 90, 110, '#a8c0d0'); mirrorPane(c, 166, 46, 78, 100, {}); person(c, KAY, 100, 156, { k: 'no', expr: 'shock', arm: 'up', flip: true }); person(c, KARE, 260, 156, { k: 'no', arm: 'point', flip: true }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tIn) { mirrorRoom(c, t, { candle: true }); const sw = Math.sin(t * 0.7) * 3; c.save(); c.translate(sw, 0); c.restore(); return { z: 1.02 + 0.06 * ss(sg(t, S.tIn, S.tNo)), fx: 160, fy: 96 }; }
    if (t > S.tRoom) { R(c, 0, 0, W, H, '#1c2028'); const k = Math.floor(sg(t, S.tRoom, at(S, 'L20', 3)) * 6.99); for (let i = 0; i < Math.min(6, k); i++) { const r = [[20, 30, 80, 60], [220, 30, 80, 60], [20, 100, 80, 60], [220, 100, 80, 60], [110, 30, 100, 30], [110, 130, 100, 30]][i]; mirrorPane(c, r[0], r[1], r[2], r[3], {}); } return { z: 1.03, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#0c0e14'); bigCap(c, 'もっと恐ろしいもの', 70, 32, '#c8d8e8', sg(t, 0.4, 1.1)); for (let i = 0; i < 6; i++) { const a = t * 0.3 + i; P(c, 160 + Math.cos(a) * 120, 90 + Math.sin(a) * 50, '#a8c8e8'); }
    return { z: 1.02, fx: 160, fy: 96 };
  }
};
function shadowFig(c, st, x, y, k) { blit(c, tintSpr(modFig(st, { k }), '#3c3430', 'sf' + k), x, y, FIG_AX2, FIG_AY2, {}); }

/* ---- ME: decline — he wastes away; mirrors of every shape pile up; the glass works in the garden; no one can stop him; the kaleidoscope show (moves: mirrors arrive, the furnace glows, flowers whirl) ---- */
const ME = {
  name: '魔界の美', ch: '狂気の加速', bgm: 'pulse',
  init(S) { S.tPile = at(S, 'L25', 0) - 0.3; S.tFactory = at(S, 'L25', 5) - 0.3; S.tNoOne = at(S, 'L26', 0) - 0.3; S.tShow = at(S, 'L27', 0) - 0.3; S.tKalei = at(S, 'L27b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tKalei) { R(c, 0, 0, W, H, '#140c1c'); c.save(); c.translate(160, 96); for (let s = 0; s < 6; s++) { c.save(); c.rotate(s * TAU / 6 + t * 0.3); for (let i = 0; i < 6; i++) { const r = 14 + i * 14; E(c, r, 0, 8 + (i % 2) * 4, 5, ['#e84c7c', '#f8c83c', '#4cc8f8', '#8cf86c', '#c86cf8', '#f87c3c'][(i + s) % 6]); } c.restore(); } c.restore(); return { z: 1.02 + 0.03 * Math.sin(t), fx: 160, fy: 96 }; }
    if (t > S.tShow) { R(c, 0, 0, W, H, '#0c0c14'); const k = Math.floor(sg(t, S.tShow, at(S, 'L27', 3)) * 3.99); if (k >= 1) { blit(c, kareFace({}), 90, 70, 24, 24, { s: 1.2 }); R(c, 60, 98, 60, 4, '#a8c0d0'); } if (k >= 2) for (let i = 0; i < 24; i++) { const a = i / 24 * TAU + t * 0.4; E(c, 160 + Math.cos(a) * 110, 96 + Math.sin(a) * 60, 5, 3, ['#e84c7c', '#f8c83c', '#4cc8f8', '#8cf86c'][i % 4]); } if (k >= 3) person(c, KARE, 200 + Math.sin(t * 4) * 20, 150, { k: 'dn', arm: Math.floor(t * 3) % 2 ? 'up' : 'wave', f: Math.floor(t * 6) & 3 }); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tNoOne) { lab(c, t, {}); person(c, KARE, 200, 156, { k: 'nn', flip: true, arm: 'point' }); robe(c, SERV[0], 270, 156, { k: 'nn', flip: true }); person(c, KAY, 110, 156, { k: 'nn', expr: 'sad', arm: 'fwd' }); if (t > at(S, 'L26', 1) - 0.3) { const u = sg(t, at(S, 'L26', 1), at(S, 'L26', 2) + 0.5); robe(c, SERV[2], lerp(240, 360, u), 156, { k: 'out', f: Math.floor(t * 4) & 3 }); } return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tFactory) { VG(c, 0, 0, W, 120, ['#3c3c4c', '#6c6c7c']); R(c, 0, 120, W, 70, '#4c5c3c'); R(c, 80, 60, 160, 80, '#6c5c4c'); R(c, 200, 20, 20, 50, '#4c4c54'); for (let i = 0; i < 5; i++) { const u = fr(t * 0.4 + i / 5); E(c, 210 + Math.sin(t + i) * 6, 20 - u * 30, 6 + u * 8, 4 + u * 6, DA('#8c8c94', 0.5 * (1 - u))); } R(c, 140, 96, 40, 44, '#141010'); glow(c, 160, 118, 30, 20, '#f8803c', 0.6 + 0.2 * Math.sin(t * 5)); capPlate(c, t, S.tFactory + 0.2, ['庭のガラス工場'], 44); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tPile) { lab(c, t, { shelves: false }); const n = Math.floor(sg(t, S.tPile, S.tFactory) * 10); for (let i = 0; i < n; i++) { const x = 20 + (i % 5) * 58, y = 60 + Math.floor(i / 5) * 46; if (i % 3 === 0) mirrorPane(c, x, y, 40, 36, {}); else if (i % 3 === 1) { E(c, x + 20, y + 18, 20, 18, '#8c7c5c'); E(c, x + 20, y + 18, 17, 15, '#c8dce8'); } else { for (let k = 0; k < 4; k++) L(c, x, y + 10 + k * 6, x + 40, y + 6 + k * 6 + Math.sin(k + t) * 3, '#c8dce8', 3); } } return { z: 1.03, fx: 160, fy: 100 }; }
    lab(c, t, {}); person(c, KARE, 160, 156, { k: 'ws', expr: 'sad', blink: blinkOf(t, 3) }); c.save(); c.globalAlpha = 0.3; c.fillStyle = '#1c2028'; c.fillRect(0, 0, W, H); c.restore();
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tPile)), fx: 160, fy: 110 };
  }
};

/* ---- MF: that morning — K woken; servants frozen around a cloth-covered ball rolling by itself; laughter inside; the air hole; the broken handle (moves: the ball rolls left and right, the laugh lines) ---- */
const MF = withCuts({
  name: '転がる玉', ch: 'ある朝', bgm: 'dread',
  init(S) { S.tRun = at(S, 'L29', 0) - 0.3; S.tBall = at(S, 'L30', 0, at(S, 'T2', 0)) - 0.3; S.tLaugh = at(S, 'L31', 0) - 0.3; S.tHole = at(S, 'L32', 0) - 0.3; S.tPale = at(S, 'L33', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const bx = 170 + Math.sin(t * 0.9) * 60;
    if (t > S.tHole) { R(c, 0, 0, W, H, '#0c0c10'); E(c, 160, 96, 70, 70, '#a89c84'); E(c, 160, 96, 8, 8, '#141010'); c.save(); c.beginPath(); c.arc(160, 96, 7, 0, TAU); c.clip(); R(c, 150, 86, 20, 20, (Math.floor(t * 8) & 1) ? '#fff8e0' : '#c8e8f8'); c.restore(); if (t > at(S, 'L32', 2) - 0.3) { R(c, 220, 110, 30, 24, '#8c806c'); E(c, 235, 122, 4, 4, '#3c3c3c'); E(c, 270, 150, 6, 6, '#a8a8a8'); L(c, 270, 150, 280, 146, '#a8a8a8', 2); } if (t > S.tPale) { person(c, KAY, 60, 166, { k: 'pl', expr: 'shock' }); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tBall) { lab(c, t, { shelves: false }); for (let i = 0; i < 3; i++) robe(c, SERV[i], 40 + i * 26, 156, { k: 'sb' + i, expr: 'shock' }); robe(c, MAID, 280, 156, { k: 'sb', expr: 'shock', flip: true }); sphere(c, t, bx, 120, 34, { cloth: true }); if (t > S.tLaugh) { for (let i = 0; i < 4; i++) { const ph = fr(t * 1.1 + i / 4); c.save(); c.globalAlpha = 1 - ph; TX(c, i % 2 ? 'ハハ' : 'ヒヒ', bx + 40 + i * 6, 110 - ph * 20, '#c8c8d8', 16, '#000000'); c.restore(); } } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tRun) { lab(c, t, { shelves: false }); for (let i = 0; i < 3; i++) robe(c, SERV[i], 60 + i * 30, 156, { k: 'sr' + i, expr: 'shock', flip: true }); const u = sg(t, S.tRun, S.tRun + 1.5); person(c, KAY, lerp(-20, 200, u), 156, { k: 'rn', f: u < 1 ? Math.floor(t * 6) & 3 : -1, flip: true }); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#5c6c7c'); R(c, 0, 120, W, 70, '#7c6c54'); R(c, 60, 130, 180, 20, '#e8e4dc'); R(c, 60, 124, 40, 10, '#f4f0e8'); E(c, 80, 124, 8, 7, '#e8c4a0'); robe(c, SERV[0], 260, 156, { k: 'wk', arm: 'reach', flip: true });
    yearFlash(c, t, 0.3, 'ある朝', 216, 10, '');
    return { z: 1.03, fx: 160, fy: 120 };
  }
}, [['V5', (c, t) => closeUp(c, t, maidFace({ blink: blinkOf(t, 3) }), { bg: ['#1c1014', '#4c2c3c'], spk: 'maid' })]]);

/* ---- MG: the hammer — glass explodes; he crawls out laughing; the girl recoils; he has lost his mind (moves: the swing, shards fly, his face) ---- */
const MG = withCuts({
  name: '砕けた玉', ch: '砕けた玉', bgm: 'dread',
  init(S) { S.tHit = at(S, 'L34', 2) - 0.2; S.tOut = at(S, 'L35', 0) - 0.3; S.tFace = at(S, 'L36', 0) - 0.3; S.tGirl = at(S, 'L36b', 0) - 0.3; S.tMad = at(S, 'L37', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMad) { R(c, 0, 0, W, H, '#0c0a08'); blit(c, kareFace({ mad: true, blink: blinkOf(t, 7) }), 160, 92, 24, 24, { s: 2.8 + 0.1 * Math.sin(t * 6) }); return { z: 1.02, fx: 160, fy: 92, sx: Math.round(Math.sin(t * 13)) }; }
    if (t > S.tGirl) { lab(c, t, { shelves: false }); shards(c, 160, 140, 30, 1, 3); person(c, { ...KARE, id: 'kam' }, 150, 156, { k: 'gl', expr: 'shock', f: Math.floor(t * 3) & 3 }); const u = sg(t, S.tGirl + 0.2, S.tGirl + 0.8); robe(c, MAID, lerp(200, 270, u), 156, { k: 'gl', expr: 'shock', arm: 'up' }); return { z: 1.03, fx: 180, fy: 110 }; }
    if (t > S.tFace) { return closeUp(c, t, kareFace({ mad: true, blink: blinkOf(t, 7) }), { bg: ['#0c0a08', '#3c2c1c'], glow: '#a8c8e8', talk: false }); }
    if (t > S.tOut) { lab(c, t, { shelves: false }); shards(c, 160, 140, 34, 1, 3); const u = sg(t, S.tOut + 0.3, S.tFace); blit(c, modFig({ ...KARE, id: 'kam' }, { k: 'ot', expr: 'shock' }), lerp(140, 170, u), 160, FIG_AX2, FIG_AY2, { rot: -1.1 + 0.3 * u }); return { z: 1.05, fx: 160, fy: 110 }; }
    lab(c, t, { shelves: false }); const hit = t > S.tHit; if (!hit) sphere(c, t, 180, 120, 34, { cloth: true }); else { shards(c, 180, 130, 40, sg(t, S.tHit, S.tHit + 0.5), 3); flashScreen(c, 0.5 * (1 - sg(t, S.tHit, S.tHit + 0.3))); }
    const sw = hit ? 1 : sg(t, at(S, 'L34', 1), S.tHit); person(c, KAY, 110, 156, { k: 'hm', arm: sw > 0.5 ? 'fwd' : 'up' }); L(c, 120, sw > 0.5 ? 120 : 96, sw > 0.5 ? 150 : 128, sw > 0.5 ? 126 : 76, '#5c4430', 3); R(c, sw > 0.5 ? 146 : 124, sw > 0.5 ? 120 : 70, 12, 10, '#5c5c64');
    return { z: 1.03, fx: 160, fy: 110, sx: hit && t < S.tHit + 0.4 ? Math.round(Math.sin(t * 70) * 3) : 0 };
  }
}, []);

/* ---- MH: the secret — the engineer's order; a mirrored sphere; he went inside; what it would show; he died mad; K's belief (moves: the cut-away sphere, endless warped reflections, a candle) ---- */
const MH = {
  name: '鏡の玉', ch: '鏡の玉の中', bgm: 'requiem',
  init(S) { S.tSphere = at(S, 'L39', 0) - 0.3; S.tAll = at(S, 'L39b', 0) - 0.3; S.tIn = at(S, 'L40', 0) - 0.3; S.tNobody = at(S, 'L41', 0) - 0.3; S.tConc = at(S, 'L42', 0) - 0.3; S.tElse = at(S, 'L43', 0) - 0.3; S.tDie = at(S, 'L44', 0) - 0.3; S.tK = at(S, 'L45', 0) - 0.3; S.tLast = at(S, 'L46', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tLast) { R(c, 0, 0, W, H, '#0c1018'); for (let i = 0; i < 4; i++) mirrorPane(c, 20 + i * 76 + Math.sin(t * 0.5 + i) * 4, 40, 60, 110, { dark: true }); c.save(); c.globalAlpha = 0.4 + 0.2 * Math.sin(t * 1.3); blit(c, modFig(KARE, { k: 'end' }), 160, 146, FIG_AX2, FIG_AY2, { s: 1.2 }); c.restore(); return { z: 1.03 + 0.03 * ss(sg(t, S.tLast, S.tLast + 8)), fx: 160, fy: 96 }; }
    if (t > S.tK) { R(c, 0, 0, W, H, '#2c2420'); R(c, 0, 140, W, 50, '#5c4430'); glow(c, 60, 100, 50, 40, '#f8d880', 0.2 + 0.08 * Math.sin(t * 5)); const ku = sg(t, S.tK, S.tK + 10); person(c, KAY, lerp(110, 190, ku), 156, { k: 'kk', expr: 'sad', f: ku < 1 ? Math.floor(t * 2) & 3 : -1, blink: blinkOf(t, 5) }); c.save(); c.globalAlpha = 0.3 + 0.15 * Math.sin(t); sphere(c, t, 250 + Math.sin(t * 0.6) * 10, 90, 30, {}); c.restore(); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tDie) { R(c, 0, 0, W, H, '#1c1820'); glow(c, 160, 100, 120 + 20 * Math.sin(t * 1.5), 80, '#5c4c6c', 0.3 + 0.15 * Math.sin(t * 1.5)); for (let i = 0; i < 5; i++) { const u = fr(t * 0.25 + i / 5); c.save(); c.globalAlpha = 0.4 * (1 - u); E(c, 150 + Math.sin(t + i) * 8, 130 - u * 80, 3 + u * 8, 2 + u * 4, '#a8a8b8'); c.restore(); } R(c, 130, 60, 60, 80, '#3c3440'); R(c, 126, 56, 68, 6, '#2c2430'); candleRows(c, t, 2, 2, 140, 146, 2, 40, 0); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tElse) { R(c, 0, 0, W, H, '#06040a'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * 0.2, r = 60 + Math.sin(t + i) * 10; c.save(); c.globalAlpha = 0.5; blit(c, kareFace({ mad: i % 3 === 0 }), 160 + Math.cos(a) * r * 1.6, 96 + Math.sin(a) * r * 0.8, 24, 24, { s: 0.4 + (i % 3) * 0.2 }); c.restore(); } glow(c, 160, 96, 40, 40, '#c8e8f8', 0.3); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tConc) { R(c, 0, 0, W, H, '#0c1018'); for (let i = 0; i < 5; i++) { const r = 20 + i * 18; ER(c, 160, 96, r * 1.3, r, ['#4c6c8c', '#6c8cac', '#8cacc8'][i % 3]); } blit(c, kareFace({ lips: true }), 160, 96, 24, 24, { s: 1.6 + 0.3 * Math.sin(t) }); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tNobody) { R(c, 0, 0, W, H, '#06080c'); sphere(c, t, 160, 96, 56, {}); bigCap(c, '？', 80, 48, '#e8f4fc', sg(t, S.tNobody + 0.5, S.tNobody + 1.2)); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tIn) { R(c, 0, 0, W, H, '#06080c'); E(c, 160, 96, 64, 64, '#2c3c4c'); E(c, 160, 96, 60, 60, '#a8c8dc'); for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + t * 0.4; blit(c, tintSpr(modFig(KARE, { k: 'sp' }), '#5c7c9c', 'spt'), 160 + Math.cos(a) * 36, 112 + Math.sin(a) * 30, FIG_AX2, FIG_AY2, { s: 0.5 + 0.3 * Math.abs(Math.sin(a)) }); } person(c, KARE, 160, 136, { k: 'in', s: 0.8 }); for (let i = 0; i < 4; i++) glow(c, 160 + Math.cos(i * 1.6) * 44, 96 + Math.sin(i * 1.6) * 44, 8, 8, '#fffce0', 0.6); return { z: 1.04 + 0.06 * ss(sg(t, S.tIn, S.tNobody)), fx: 160, fy: 96 }; }
    if (t > S.tAll) { R(c, 0, 0, W, H, '#0c1018'); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; mirrorPane(c, 160 + Math.cos(a) * 100 - 15, 96 + Math.sin(a) * 50 - 15, 30, 30, {}); } return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tSphere) { R(c, 0, 0, W, H, '#06080c'); E(c, 160, 96, 60, 60, '#5c6c7c'); c.save(); c.beginPath(); c.rect(160, 30, 70, 140); c.clip(); E(c, 160, 96, 60, 60, '#c8dce8'); E(c, 160, 96, 54, 54, '#e8f4fc'); c.restore(); L(c, 160, 36, 160, 156, '#8c9cac', 2); plate(c, 30, 40, '内側が、すべて鏡', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 96 }; }
    lab(c, t, {}); person(c, TECH, 200, 156, { k: 'tc', flip: true, arm: 'point' }); person(c, KAY, 120, 156, { k: 'tc' }); const k = Math.floor(sg(t, 0.3, at(S, 'L38', 4)) * 3.99); const ps = ['直径四尺のガラスの玉', '外側に水銀、内側は鏡', '強い光の電灯と、扉'];
    for (let i = 0; i < Math.min(3, k); i++) plate(c, 20, 46 + i * 26, ps[i], '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '転がる玉', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { lab(c, t, { shelves: false }); sphere(c, t, 170 + Math.sin(t * 0.9) * 60, 120, 34, { cloth: true }); c.save(); c.globalAlpha = 0.85; R(c, 0, 34, W, 44, '#000000'); c.restore(); bigCap(c, 'ひとりでに転がる玉', 40, 32, '#f8e8b0', sg(t, 0.1, 0.6)); return { z: 1.03, fx: 170, fy: 110 }; } };
const SS2 = { name: 'ハンマー', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { lab(c, t, { shelves: false }); sphere(c, t, 190, 120, 34, { cloth: true }); const u = sg(t, at(S, 'S2', 0), at(S, 'S2', 1)); person(c, KAY, 120, 156, { k: 's2', arm: u > 0.5 ? 'up' : 'fwd' }); L(c, 130, 96, 138, 76, '#5c4430', 3); R(c, 132, 70, 12, 10, '#5c5c64'); return { z: 1.04, fx: 160, fy: 110 }; } };
