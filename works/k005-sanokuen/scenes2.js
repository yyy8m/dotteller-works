/* ================= 記録 #005 三億円事件: scenes (1) — the cold open, the bonus, the letter, the road ================= */
const ROAD_Y = 116, CAR_Y = 146; // road top, the ground line of the cars (far lane)
function roadScene(c, t, ox = 0, o = {}) { wintrySky(c, t, 80); prisonWall(c, ox, ROAD_Y, { tower: o.tower != null ? o.tower : 260 }); if (o.hedge) hedge(c, ox); roadSide(c, ox, ROAD_Y); }
function hedge(c, ox) { R(c, 0, ROAD_Y - 22, 104, 22, '#34502c'); for (let i = 0; i < 14; i++) { const x = mod(i * 8 - ox, W + 40) - 20; if (x < 108) { E(c, x, ROAD_Y - 22, 7, 6, i % 2 ? '#3c5c34' : '#4c6c3c'); E(c, x + 2, ROAD_Y - 24, 3, 2, '#5c7c4c'); } } for (let i = 0; i < 20; i++) P(c, hash(i * 3) * 100, ROAD_Y - 20 + hash(i * 5) * 18, '#5c7c4c'); } // a hedge in front of the houses: the bankers hide behind it
function crouch(c, st, x, y, k, o = {}) { c.save(); c.beginPath(); c.rect(0, 0, W, ROAD_Y - 10); c.clip(); blit(c, modFig(st, { f: -1, expr: o.expr || 'shock', k: 'cr' + (o.k || '') }), x, ROAD_Y + 12, FIG_AX2, FIG_AY2, { flip: o.flip }); c.restore(); } // behind the hedge: only the heads show (call hedge() after)

/* ---- SX: cold open — the "dynamite", the bankers run, the car is gone ---- */
const SX = {
  name: '学園通り', ch: '午前9時21分', bgm: 'pulse',
  init(S) { S.cold = !!ln(S, 'C0'); S.tGo = S.cold ? at(S, 'C0', 3) - 0.4 : (ln(S, 'F1') ? ln(S, 'F1').se + 0.6 : 1e9); S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    roadScene(c, t, 0, {});
    const go = t > S.tGo ? t - S.tGo : 0, cx = 170 + go * go * 22;
    blit(c, bikeSpr({}), 238, CAR_Y + 4, 30, 49, { flip: true }); trailingSheet(c, 262, CAR_Y - 10, 0.3, 1, 18); // the bike left behind, the sheet hanging
    if (cx < W + 60) { blit(c, cedricSpr(), cx, CAR_Y, 50, 35); if (go > 0) for (let i = 0; i < 4; i++) E(c, cx - 56 - i * 8, CAR_Y - 2, 4 + i * 2, 2 + i, DA('#c8c8c4', 0.4 - i * 0.08)); }
    flareSmoke(c, 168, CAR_Y + 2, t, Math.min(1, t / 0.6 + 0.4));
    // the bankers: run, then hide behind the hedge; the "officer" by the car shouting
    const run = sg(t, 0.4, 2.4);
    BANKERS.concat([DRIVER]).forEach((st, i) => { const x = lerp(150 + i * 12, 22 + i * 20, eOut(run)); if (run < 1) blit(c, modFig(st, { f: Math.floor(t * 10 + i) & 3, expr: 'shock', k: 'run' }), x, CAR_Y + 2 - i * 2, FIG_AX2, FIG_AY2, { flip: true }); else crouch(c, st, x, ROAD_Y - 4, 0, { k: i }); });
    hedge(c, 0);
    if (go <= 0) blit(c, modFig(FAKE, { f: -1, arm: 'wave', expr: 'shock', k: 'sx' }), 206, CAR_Y + 2, FIG_AX2, FIG_AY2, { flip: true });
    if (S.cold && t > at(S, 'C1', 0) - 0.3) { c.save(); c.globalAlpha = 0.35 * sg(t, at(S, 'C1', 0), at(S, 'C1', 0) + 2); c.fillStyle = '#0c0c14'; c.fillRect(0, 0, W, H); c.restore(); }
    if (t < S.tGo - 0.5) capPlate(c, t, 0.4, ['1968年12月10日', '府中市 学園通り']); // off before the bankers peek over the hedge (top left)
    return { z: 1.08 + 0.08 * ss(sg(t, S.tGo, S.dur)), fx: lerp(170, 160, sg(t, S.tGo, S.dur)), fy: 112, sx: t < 0.6 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- SA: the factory waiting for the year-end bonus ---- */
const SA = {
  name: '東芝府中工場', ch: '12月のボーナス', bgm: 'memory',
  init(S) { S.tSum = at(S, 'L2', 0) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    wintrySky(c, t, 100); factory(c, t); R(c, 0, 136, W, 104, '#7c7c78'); R(c, 0, 136, W, 2, '#9c9c94');
    for (let i = 0; i < 9; i++) { const st = WORKERS[i % 5], x = 30 + i * 32 + (i % 2) * 6; blit(c, modFig(st, { f: -1, expr: t > S.tSum ? 'smile' : 'normal', arm: t > S.tSum && i % 3 === 0 ? 'wave' : null, k: 'fa' + (t > S.tSum ? 's' : '') }), x, 160 - (i % 2) * 4, FIG_AX2, FIG_AY2, { flip: i > 4 }); }
    for (let i = 0; i < 9; i++) { const u = fr(t * 0.6 + i / 9); E(c, 36 + i * 32, 112 - u * 10, 2 + u * 3, 1.5 + u * 2, DA('#f4f4f0', 0.4 * (1 - u))); } // breath in the cold
    if (t > S.tSum) { const k = sg(t, S.tSum, S.tSum + 2.4), v = Math.round(294307500 * ss(k)); const s = v >= 1e8 ? Math.floor(v / 1e8) + '億' + String(Math.floor(v / 1e4) % 10000).padStart(4, '0') + '万' + String(v % 1e4).padStart(4, '0') + '円' : Math.floor(v / 1e4) + '万円';
      c.save(); c.globalAlpha = 0.6; c.fillStyle = '#000000'; c.fillRect(0, 66, W, 34); c.restore(); bigCap(c, s, 70, 24, '#f8d860'); }
    if (t < S.tSum) { yearFlash(c, t, 0.3, 1968, 216, 10, '昭和43年'); capPlate(c, t, 0.6, ['1968年 東京都 府中市']); }
    return { z: 1.03 + 0.03 * ss(t / S.dur), fx: 160, fy: 110 };
  }
};

/* ---- SB: the threatening letter (4 days before) ---- */
function ransomLetter(c, t, x, y, k) { // words cut out of magazines and pasted on, line by line
  R(c, x, y, 200, 120, '#f4f0e4'); R(c, x, y, 200, 3, '#d8d0c0'); R(c, x + 2, y + 118, 198, 4, '#a89c84');
  const lines = [['指定ノ', '場所ニ'], ['300万円ヲ', 'モッテコイ'], ['サモナクバ'], ['支店長ノ', '家ヲ', '爆破スル']];
  const cols = ['#f8e8a0', '#c8e0f0', '#f8c8c8', '#d8f0c8', '#ffffff', '#e8d0f0'];
  let n = 0; lines.forEach((ws, li) => { let cx = x + 12; ws.forEach((w, wi) => { [...w].forEach((ch, ci) => { n++; if (n > k) return; const bg = cols[(li * 3 + wi * 2 + ci) % cols.length], dy = (hash(n * 7) - 0.5) * 3, sz = 16;
    R(c, cx - 1, y + 10 + li * 26 + dy, 15, 19, bg); TX(c, ch, cx, y + 11 + li * 26 + dy, (n % 5 === 0) ? '#c81818' : '#141414', sz, null); cx += 16; }); cx += 8; }); });
}
const SB = {
  name: '脅迫状', ch: '4日前の脅迫状', bgm: 'eerie',
  init(S) { S.tOpen = at(S, 'L3', 2) - 0.2; S.tLetter = at(S, 'L4', 0) - 0.4; S.tWatch = at(S, 'L5', 0) - 0.3; S.tNote = at(S, 'L5b', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tLetter) { // the manager's office
      roomBg(c, { wall: '#8c8070', wall2: '#847868', floor: '#5c4c3c', fy: 150, window: [230, 30], lamp: [110, 20] });
      R(c, 70, 112, 120, 8, '#6c4c30'); R(c, 76, 120, 6, 30, '#5c3c24'); R(c, 178, 120, 6, 30, '#5c3c24'); R(c, 90, 106, 30, 6, '#e8e0d0');
      blit(c, modFig({ id: 'mgr', top: 'jacket', coat: '#2c2c34', shirt: '#f0ece4', tie: '#5c2c3c', pants: '#24242c', skin: '#dcac88', hair: '#8c8884', hairStyle: 'side', glasses: true, heavy: true }, { f: -1, arm: t > S.tOpen ? 'hold' : null, expr: t > S.tOpen + 1 ? 'shock' : 'normal', k: 'mg' }), 140, 150, FIG_AX2, FIG_AY2);
      if (t > S.tOpen) { R(c, 152, 106, 14, 10, '#f4f0e4'); R(c, 152, 106, 14, 2, '#c81818'); } else R(c, 120, 108, 16, 9, '#e8dcc0');
      yearFlash(c, t, 0.3, 1968, 216, 10, '12月6日'); capPlate(c, t, 0.6, ['日本信託銀行', '国分寺支店']);
      return { z: 1.06 + 0.06 * ss(sg(t, S.tOpen, S.tLetter)), fx: 150, fy: 110 };
    }
    if (t < S.tWatch) { // the letter, cut-out letters appear one by one
      R(c, 0, 0, W, H, '#2c241c'); for (let y = 0; y < H; y += 6) R(c, 0, y, W, 1, '#342a20'); glow(c, 160, 90, 150, 80, '#f8d080', 0.2);
      ransomLetter(c, t, 60, 28, Math.floor((t - S.tLetter) * 7)); return { z: 1.04, fx: 160, fy: 90 };
    }
    if (t < S.tNote) { // the stakeout at night: about 50 officers wait, no one comes
      VG(c, 0, 0, W, 150, ['#0c1020', '#1c2438', '#2c3448']); for (let i = 0; i < 30; i++) P(c, hash(i * 5) * W, hash(i * 9) * 70, '#8c9cbc');
      R(c, 0, 120, W, 120, '#2c2c34'); for (let i = 0; i < 5; i++) { const x = 30 + i * 66; R(c, x, 40, 4, 100, '#3c3434'); R(c, x - 8, 44, 20, 2, '#3c3434'); glow(c, x + 2, 52, 30, 30, '#f8e0a0', 0.25); E(c, x + 2, 50, 3, 2, '#f8f0c0'); }
      blit(c, modFig({ id: 'pw', top: 'dress', coat: '#5c5c6c', skin: '#e8c0a0', hair: '#1c1814', hairStyle: 'long' }, { f: -1, arm: 'hold', k: 'pw' }), 160, 148, FIG_AX2, FIG_AY2); R(c, 170, 124, 8, 10, '#5c3c24');
      for (let i = 0; i < 6; i++) { const x = [26, 92, 230, 294, 60, 262][i], peek = Math.sin(t * 1.3 + i) > 0.3 ? 6 : 0; c.save(); c.beginPath(); c.rect(x - 10, 60, 20, 80); c.clip(); blit(c, modFig(COPS[i % 4], { f: -1, k: 'pk' }), x + (i % 2 ? 8 : -8) - (i % 2 ? peek : -peek), 150, FIG_AX2, FIG_AY2, { flip: i % 2 === 0 }); c.restore(); }
      capPlate(c, t, S.tWatch + 0.2, ['12月7日 夜', '張り込み']);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // a notice goes round the bank
    roomBg(c, { wall: '#9c9484', wall2: '#948c7c', floor: '#6c5c4c', fy: 150, lamp: [160, 18] });
    R(c, 110, 40, 100, 70, '#c8a878'); R(c, 114, 44, 92, 62, '#d8b888'); const k = eOut(sg(t, S.tNote, S.tNote + 0.6)); R(c, 126, 52 - (1 - k) * 60, 68, 46, '#f8f4ec'); TX(c, '不審物に', 134, 56 - (1 - k) * 60, '#c81818', 16, null); TX(c, '注意', 144, 76 - (1 - k) * 60, '#c81818', 16, null); P(c, 160, 50 - (1 - k) * 60, '#c81818');
    BANKERS.forEach((st, i) => blit(c, modFig(st, { f: -1, expr: 'sad', k: 'nt' }), 70 + i * 90, 152, FIG_AX2, FIG_AY2, { flip: i === 2 }));
    return { z: 1.04, fx: 160, fy: 90 };
  }
};

/* ---- SC: 9:15, the cash car leaves the branch ---- */
function duraCase(c, x, y, s = 1) { R(c, x, y, 18 * s, 12 * s, '#c8ccd4'); R(c, x, y, 18 * s, 2 * s, '#e8ecf4'); for (let k = 1; k < 4; k++) R(c, x + k * 4.5 * s, y + 2 * s, 1, 10 * s, '#a8acb4'); R(c, x + 7 * s, y - 2 * s, 4 * s, 2 * s, '#5c5c64'); }
const SC = {
  name: '現金輸送車', ch: '午前9時15分', bgm: 'pulse',
  init(S) { S.tLeave = at(S, 'L6', 3) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    wintrySky(c, t, 30); bankFront(c, t);
    const go = Math.max(0, t - S.tLeave), cx = 150 + go * go * 16;
    blit(c, cedricSpr('#16181e', { open: go <= 0 }), cx, 152, 50, 35);
    if (go <= 0) { for (let i = 0; i < 3; i++) { const k = sg(t, 0.6 + i * 1.4, 1.6 + i * 1.4); duraCase(c, lerp(110, 196 - i * 6, eOut(k)), lerp(126, 134 - i * 2, eOut(k))); }
      blit(c, modFig(BANKERS[0], { f: -1, arm: 'hold', k: 'ld' }), 104, 152, FIG_AX2, FIG_AY2); blit(c, modFig(DRIVER, { f: -1, k: 'ld' }), 224, 152, FIG_AX2, FIG_AY2, { flip: true }); }
    // the clock above the door
    E(c, 160, 62, 9, 9, '#f4f0e8'); E(c, 160, 62, 8, 8, '#ffffff'); L(c, 160, 62, 160, 56, '#141414'); L(c, 160, 62, 162, 64, '#141414');
    capPlate(c, t, 0.4, ['12月10日 午前9時15分', '国分寺支店']);
    return { z: 1.04, fx: lerp(160, 190, sg(t, S.tLeave, S.dur)), fy: 110 };
  }
};

/* ---- SD: Gakuen-dori behind Fuchu Prison — a police bike catches up ---- */
const SD = {
  name: '白バイ', ch: '白バイ', bgm: 'pulse',
  init(S) { S.tBike = at(S, 'L8', 1) - 0.4; S.tStop = at(S, 'L9', 0) - 0.2; S.tSheet = at(S, 'L9', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const stopK = ss(sg(t, S.tStop, S.tStop + 1.6)), sp = 70 * (1 - stopK), ox = t * 70 - (t > S.tStop ? (t - S.tStop - (1.6 - 1.6 * (1 - stopK) * (1 - stopK)) * 0) * 70 : 0);
    const off = S.tStop + 0.8 - (1 - stopK) * 0.8; const scroll = t < S.tStop ? t * 70 : S.tStop * 70 + 70 * (1.6 * (1 - (1 - stopK) ** 2) / 2);
    roadScene(c, t, scroll, { tower: 420 });
    const moving = sp > 1, wob = moving ? (Math.floor(t * 8) & 1) : 0;
    const cx = 150; blit(c, cedricSpr(), cx, CAR_Y + wob * 0.5, 50, 35);
    if (moving) for (let i = 0; i < 3; i++) E(c, cx - 56 - i * 6, CAR_Y - 2, 3 + i, 1.5 + i * 0.5, DA('#c8c8c4', 0.3 - i * 0.08));
    if (t > S.tBike) { // from far behind, in the opposite lane, overtaking, cutting in front
      const u = t - S.tBike, bx = Math.min(250, -40 + u * 120), by = lerp(162, CAR_Y + 4, ss(sg(bx, 170, 240)));
      trailingSheet(c, bx - 26, by - 12, t, -1, 26 + (moving ? 6 : 0)); blit(c, bikeSpr({ rider: true, lean: moving }), bx, by, 30, 49);
      if (u < 2) for (let i = 0; i < 5; i++) L(c, bx - 40 - i * 10, by - 20 + i * 3, bx - 30 - i * 10, by - 20 + i * 3, DA('#ffffff', 0.5));
      if (t > S.tStop) { const fl = Math.floor(t * 4) & 1; if (fl) glow(c, bx + 16, by - 32, 10, 8, '#ff2020', 0.6); }
    }
    capPlate(c, t, 0.4, ['府中刑務所の裏', '学園通り']);
    const zk = ss(sg(t, S.tSheet, S.tSheet + 1.2));
    return { z: 1.04 + 0.5 * zk, fx: lerp(160, 228, zk), fy: lerp(110, 132, zk) };
  }
};
