/* ================= 記録 #004 切り裂きジャック: scenes ================= */
/* ---- RA: Whitechapel, 1888 — crowded, poor ---- */
const RA = {
  name: 'ホワイトチャペル', ch: '1888年 ロンドン', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const ox = t * 10; eastEnd(c, t, { ox });
    for (let i = 0; i < 9; i++) { const x = mod(i * 41 - ox * 1.1 + Math.sin(i) * 10, 380) - 30, y = 150 + (i % 3) * 3; if (i % 3 === 0) woman(c, i, x, y, 1.1, { f: Math.floor(t * 5 + i) & 3, flip: i & 1 }); else blit(c, suitFig(GENTS[i % 2], { f: Math.floor(t * 5 + i) & 3, k: 'c' }), x, y, FIG_AX2, FIG_AY2, { s: 0.8, flip: i & 1 }); }
    yearFlash(c, t, 0.3, 1888); capPlate(c, t, 0.6, ['ロンドン', 'ホワイトチャペル']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};
/* ---- RB: the lodging house: 4d a bed, 2d to sleep leaning on a rope ---- */
const RB = {
  name: '簡易宿泊所', bgm: 'eerie',
  init(S) { S.tRope = ln(S, 'L3') ? at(S, 'L3', 1) - 0.2 : 1e9; S.tStreet = ln(S, 'L2') ? at(S, 'L2', 3) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tRope) {
      eastEnd(c, t, { lamps: true });
      for (let i = 0; i < 5; i++) woman(c, i, 40 + i * 58, 150, 1.25, { flip: i & 1, k: 's' });
      for (let i = 0; i < 3; i++) blit(c, suitFig({ id: 'ch' + i, coat: '#5c4c3c', coat2: '#3c3428', pants: '#3c3c3c', boots: '#2c2020', hair: '#4c3424' }, { k: 'k' }), 68 + i * 90, 152, FIG_AX2, FIG_AY2, { s: 0.6 });
      return { z: 1.06, fx: 160, fy: 112 };
    }
    // inside: rows of narrow beds; a rope with people asleep leaning on it
    R(c, 0, 0, W, H, '#2c2420'); brickWall(c, 0, 0, W, 150, '#3c3028', '#2c2420'); R(c, 0, 150, W, H - 150, '#2c2018');
    glow(c, 160, 30, 120, 60, '#f8c870', 0.25); R(c, 158, 0, 3, 20, '#1c1c1c'); R(c, 154, 20, 11, 8, '#f8e0a0');
    for (let i = 0; i < 4; i++) { const x = 16 + i * 40; R(c, x, 128, 34, 8, '#6c5c4c'); R(c, x, 124, 34, 4, '#c8bca8'); R(c, x + 2, 136, 3, 12, '#3c2c20'); R(c, x + 29, 136, 3, 12, '#3c2c20'); TX(c, '4d', x + 9, 108, '#f8e0a0', 16, '#000000'); }
    L(c, 186, 92, 316, 92, '#a88c5c', 2); for (let i = 0; i < 5; i++) { const x = 196 + i * 26; blit(c, vWoman(WOMEN[i], { k: 'r', expr: 'normal' }), x, 140, FIG_AX2, FIG_AY2, { s: 0.85, rot: 0.25 }); } TX(c, '2d', 240, 64, '#f8e0a0', 16, '#000000');
    return { z: 1.04, fx: 200, fy: 100 };
  }
};
/* ---- RC: Aug 31, 3:40 a.m., Buck's Row ---- */
const RC = {
  name: 'バックズ・ロウ', ch: '最初の殺人', bgm: 'dread',
  init(S) { S.tLamp = at(S, 'L5', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    eastEnd(c, t, { lamps: false }); c.fillStyle = DA('#04040a', 0.55); c.fillRect(0, 0, W, H);
    if (t < S.tLamp) { jack(c, 260 - t * 12, 150, 1.4, { f: Math.floor(t * 4) & 3, flip: true, eyes: true }); }
    else { const k = ss(sg(t, S.tLamp, S.tLamp + 1.5)); beam(c, 60, 116, 0.1, 160 * k, 0.18, 0.35); police(c, 46, 150, 1.4, { lantern: true, expr: 'shock', k: 'c' }); sheetBody(c, 200, 150, 52); bloodPool(c, 214, 152, 10 * k, t); }
    yearFlash(c, t, 0.3, 1888, 214, 10, '8月31日'); capPlate(c, t, 0.6, ['午前3時40分', 'バックズ・ロウ']);
    return { z: 1.08, fx: 170, fy: 112 };
  }
};
/* ---- RD: Sep 8 — Hanbury Street; the witness; the man in the deerstalker ---- */
const RD = {
  name: 'ハンバリー・ストリート', bgm: 'dread',
  init(S) { S.cold = ln(S, 'C0'); S.tGone = ln(S, 'C1') ? at(S, 'C1', 2) - 0.2 : 1e9; S.tWit = S.cold ? at(S, 'C0', 3) - 0.3 : at(S, 'L7', 0) - 0.3; S.tTalk = ln(S, 'J1') ? at(S, 'J1', 0) - 0.4 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const dawn = t < S.tWit ? 0.2 : 0.35;
    eastEnd(c, t, { lamps: true }); c.fillStyle = DA('#2c3448', dawn); c.fillRect(0, 0, W, 60);
    R(c, 134, 98, 30, 50, '#1c1414'); TX(c, '29', 140, 80, '#c8b894', 16, '#000000'); // No. 29
    if (t > S.tWit) { woman(c, 1, 50, 150, 1.25, { flip: false, expr: t > S.tTalk ? 'shock' : 'normal', k: 'wit' }); }
    // Annie and the man by the door, seen from across the street
    // cold open: after "her last moment" the couple fades into the dark, leaving the empty doorway
    const fade = 1 - ss(sg(t, S.tGone, S.tGone + 2.4));
    c.save(); c.globalAlpha = fade;
    woman(c, 0, 190, 150, 1.35, { flip: true, k: 'an' });
    jack(c, 216, 150, 1.45, { flip: true, eyes: t > S.tTalk });
    c.restore();
    if (t > S.tTalk) glow(c, 204, 100, 40, 30, '#f8c870', 0.15 * fade);
    if (S.cold) { c.save(); c.globalAlpha = 0.55 * ss(sg(t, S.tGone, S.tGone + 3)); c.fillStyle = '#04040a'; c.fillRect(0, 0, W, H); c.restore(); capPlate(c, t, 0.6, ['1888年9月8日', 'ハンバリー通り']);
      return { z: lerp(1.0, 1.32, ss(sg(t, 0.5, S.tGone))), fx: lerp(160, 204, ss(sg(t, 0.5, S.tTalk))), fy: 110 }; }
    yearFlash(c, t, 0.3, 1888, 214, 10, '9月8日'); capPlate(c, t, 0.6, ['ハンバリー通り', '29番地']);
    return { z: t > S.tTalk ? 1.25 : 1.06, fx: t > S.tTalk ? 200 : 160, fy: 108 };
  }
};
/* ---- RE: "Dear Boss" — the letter in red ink, signed Jack the Ripper ---- */
const RE = {
  name: '親愛なるボスへ', ch: '手紙', bgm: 'pulse',
  init(S) { S.tHead = ln(S, 'D1') ? at(S, 'D1', 0) - 0.2 : 0.5; S.tSign = ln(S, 'L9') ? at(S, 'L9', 0) + 0.6 : 1e9; S.tPress = ln(S, 'L9') ? at(S, 'L9', 2) - 0.2 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c140c'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#2c2014');
    if (t < S.tPress) {
      glow(c, 160, 90, 130, 80, '#f8d080', 0.25);
      const k = sg(t, S.tHead, S.tHead + 6);
      letterSheet(c, 84, 14, 152, 136, t, { k: t < S.tHead ? 0 : k + (t > S.tSign ? 1 : 0), head: t > S.tHead ? 'Dear Boss,' : null, sign: t > S.tSign ? 'Jack the Ripper' : null });
      L(c, 236, 40, 270, 120, '#2c2420', 2); R(c, 262, 112, 10, 4, '#8c1c1c');
      return { z: t > S.tSign ? 1.25 : 1.08, fx: t > S.tSign ? 190 : 160, fy: t > S.tSign ? 120 : 80 };
    }
    // the press: newspapers spinning out
    const u = t - S.tPress;
    for (let i = 0; i < 6; i++) { const a = u * 2 + i, s = Math.min(1, u * 0.8 + i * 0.1); const x = 160 + Math.cos(i * 1.1) * 90 * s, y = 90 + Math.sin(i * 1.7) * 50 * s;
      R(c, x - 46, y - 28, 92, 56, '#e8e4d8'); R(c, x - 42, y - 24, 84, 6, '#1c1c1c'); TX(c, 'RIPPER', x - 40, y - 16, '#8c1c1c', 16, null); for (let k = 0; k < 3; k++) R(c, x - 40, y + 4 + k * 6, 80, 2, '#8c8c8c'); }
    return { z: 1.04, fx: 160, fy: 96 };
  }
};
/* ---- RF: Sep 30 — the "double event": Dutfield's Yard, then Mitre Square 45 minutes later ---- */
const RF = {
  name: '二つの事件', ch: '9月30日', bgm: 'dread',
  init(S) { S.tSecond = at(S, 'L10', 3) - 0.2; S.tApron = ln(S, 'L11') ? at(S, 'L11', 0) - 0.3 : 1e9; S.tWall = ln(S, 'L11') ? at(S, 'L11', 2) - 0.2 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tApron) { // the doorway in Goulston Street: a torn piece of apron, chalk on the wall above
      brickWall(c, 0, 0, W, 150, '#3c2c2c', '#2c2020'); R(c, 120, 30, 80, 120, '#140c0c'); R(c, 116, 26, 88, 4, '#5c4c44'); R(c, 0, 150, W, H - 150, '#2c2c34');
      glow(c, 160, 140, 60, 18, '#f8d080', 0.3); PF(c, [150, 146, 172, 144, 176, 150, 154, 152], '#c8bca8'); E(c, 166, 148, 4, 2, '#7c1414');
      if (t > S.tWall) { const k = sg(t, S.tWall, S.tWall + 2); for (let i = 0; i < 4; i++) { const n = Math.floor(70 * k); for (let x = 0; x < n; x += 2) P(c, 210 + x, 40 + i * 12 + Math.round(Math.sin(x * 0.9 + i) * 2), '#e8e8e0'); } }
      police(c, 60, 150, 1.4, { lantern: true, k: 'g' });
      return { z: lerp(1.05, 1.2, sg(t, S.tWall, S.tWall + 4)), fx: 220, fy: 70 };
    }
    eastEnd(c, t, { lamps: true }); c.fillStyle = DA('#04040a', 0.45); c.fillRect(0, 0, W, H);
    const second = t > S.tSecond;
    const clock = second ? '1:45' : '1:00'; R(c, 260, 10, 50, 22, '#1c1c24'); TX(c, clock, 266, 13, '#f8e0a0', 16, null);
    police(c, second ? 70 : 230, 150, 1.4, { lantern: true, flip: !second, k: 'f' }); sheetBody(c, second ? 180 : 110, 150, 50);
    capPlate(c, t, 0.4, second ? ['マイター・スクエア', '45分後'] : ['ダットフィールズ・ヤード']);
    return { z: 1.06, fx: 160, fy: 112 };
  }
};
/* ---- RG: "From Hell" — a small box and a letter for George Lusk ---- */
const RG = {
  name: '地獄より', ch: '地獄より', bgm: 'dread',
  init(S) { S.tBox = at(S, 'L12', 2) - 0.2; S.tFrom = at(S, 'L12', 4) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#140c08'); for (let y = 0; y < 150; y += 8) R(c, 0, y, W, 1, '#1c1410'); R(c, 0, 130, W, H - 130, '#3c2818'); glow(c, 160, 90, 140, 80, '#f8c870', 0.2);
    blit(c, suitFig({ id: 'lu', coat: '#3c3028', coat2: '#2c2420', pants: '#2c2c2c', boots: '#141414', hair: '#5c4434', moustache: true }, { arm: 'reach', expr: t > S.tFrom + 2 ? 'shock' : 'normal', k: 'l' }), 70, 150, FIG_AX2, FIG_AY2, { s: 1.4 });
    if (t > S.tBox) { R(c, 160, 112, 34, 20, '#8c6c48'); R(c, 160, 112, 34, 4, '#a8845c'); L(c, 177, 112, 177, 132, '#5c4430'); }
    if (t > S.tFrom) letterSheet(c, 206, 40, 96, 84, t, { k: sg(t, S.tFrom, S.tFrom + 3), head: 'From hell' });
    if (t < S.tFrom) yearFlash(c, t, 0.3, 1888, 214, 10, '10月16日'); capPlate(c, t, 0.6, ['自警団のリーダー', 'ジョージ・ラスク']);
    return { z: 1.05 + 0.1 * sg(t, S.tFrom, S.dur), fx: 200, fy: 100 };
  }
};
/* ---- RH: Nov 9 — Miller's Court, room 13; only the door and the window ---- */
const RH = {
  name: 'ミラーズ・コート', ch: '11月9日', bgm: 'requiem',
  init(S) { S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#5c6474', '#7c8494', '#8c94a0']); brickWall(c, 0, 20, W, 130, '#4c3c38', '#3c2c2c');
    R(c, 120, 60, 44, 88, '#2c2018'); TX(c, '13', 134, 64, '#c8b894', 16, null); R(c, 180, 72, 40, 30, '#141418'); for (let i = 0; i < 5; i++) L(c, 184 + i * 7, 74, 186 + i * 7, 100, '#3c3c48'); // the broken window
    R(c, 0, 148, W, H - 148, '#3c3c44');
    police(c, 240, 150, 1.4, { flip: true, expr: 'shock', k: 'h' }); police(c, 270, 150, 1.3, { flip: true, k: 'h2' });
    redVignette(c, 0.25 * sg(t, 2, 5));
    yearFlash(c, t, 0.3, 1888, 214, 10, '11月9日'); capPlate(c, t, 0.6, ['午前10時45分', 'ミラーズ・コート']);
    return { z: lerp(1.0, 1.2, ss(t / S.dur)), fx: 160, fy: 96 };
  }
};
/* ---- RI: the investigation — 2000 questioned, 300 investigated, 80 detained; vigilance committee ---- */
const RI = {
  name: '捜査', ch: '捜査', bgm: 'pulse',
  init(S) { S.tVig = ln(S, 'L15') ? at(S, 'L15', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tVig) { // night patrol with lanterns
      eastEnd(c, t, { ox: t * 14 }); c.fillStyle = DA('#04040a', 0.4); c.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) { const x = 60 + i * 44; blit(c, suitFig(GENTS[i % 2], { f: Math.floor(t * 5 + i) & 3, k: 'v' }), x, 150, FIG_AX2, FIG_AY2, { s: 1.1 }); if (i % 2 === 0) { R(c, x + 6, 114, 4, 6, '#c8a040'); glow(c, x + 8, 117, 22, 18, '#f8d080', 0.45); } }
      return { z: 1.05, fx: 160, fy: 110 };
    }
    R(c, 0, 0, W, H, '#1c1c24'); brickWall(c, 0, 0, W, 150, '#3c3434', '#2c2828'); R(c, 0, 150, W, H - 150, '#2c2c34');
    const nums = [['2000人以上', '事情聴取', at(S, 'L14', 0)], ['300人以上', '捜査', at(S, 'L14', 1)], ['80人', '拘束', at(S, 'L14', 2)]];
    nums.forEach(([n, lab, t0], i) => { if (t < t0) return; const x = 20 + i * 100, k = eOut(sg(t, t0, t0 + 0.4)); R(c, x, 30 - (1 - k) * 20, 90, 54, '#e8dcbc'); R(c, x, 30 - (1 - k) * 20, 90, 4, '#8c1c1c'); TX(c, n, x + 45 - textSpr(n, 16, '#1c1814').width / 2, 42 - (1 - k) * 20, '#1c1814', 16, null); TX(c, lab, x + 45 - textSpr(lab, 16, '#5c4c3c').width / 2, 62 - (1 - k) * 20, '#5c4c3c', 16, null); });
    for (let i = 0; i < 12; i++) blit(c, suitFig(i % 3 ? GENTS[i % 2] : PC, { k: 'q' }), 20 + i * 26, 150, FIG_AX2, FIG_AY2, { s: 0.9, flip: i & 1 });
    return { z: 1.04, fx: 160, fy: 96 };
  }
};
/* ---- RJ: Charles Warren reading the letters ---- */
const RJ = {
  name: 'いたずらの手紙', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#2c2018'); for (let x = 0; x < W; x += 16) R(c, x, 0, 15, 150, '#3c2c20'); R(c, 0, 150, W, H - 150, '#1c140c'); glow(c, 120, 60, 120, 80, '#f8d080', 0.25);
    R(c, 70, 120, 180, 10, '#5c3c24'); for (let i = 0; i < 14; i++) { const x = 90 + (i * 37 % 140), y = 112 - (i % 4) * 3; R(c, x, y, 20, 14, '#e8dcbc'); for (let k = 0; k < 3; k++) R(c, x + 2, y + 3 + k * 3, 14, 1, '#8c1c1c'); }
    blit(c, suitFig({ id: 'wa', coat: '#141c34', coat2: '#0c1428', pants: '#141c34', boots: '#0c0c0c', hair: '#8c8c8c', moustache: true }, { arm: 'reach', k: 'w' }), 100, 150, FIG_AX2, FIG_AY2, { s: 1.5 });
    return { z: 1.06, fx: 150, fy: 100 };
  }
};
/* ---- RK: newspapers — a million copies a day ---- */
const RK = {
  name: '新聞', bgm: 'carnival',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    eastEnd(c, t, { lamps: false }); c.fillStyle = DA('#c8b894', 0.15); c.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) { const u = fr(t * 0.3 + i / 9), x = 20 + (i * 37 % 280), y = 160 - u * 160; R(c, x, y, 34, 24, '#e8e4d8'); R(c, x + 2, y + 2, 30, 5, '#1c1c1c'); R(c, x + 2, y + 9, 18, 2, '#8c1c1c'); }
    blit(c, suitFig({ id: 'nb', coat: '#5c4c3c', coat2: '#3c3428', pants: '#3c3c3c', boots: '#2c2020', hair: '#6c4c2c', hat: 'hunt', hatCol: '#3c3c3c' }, { arm: 'up', k: 'n' }), 150, 150, FIG_AX2, FIG_AY2, { s: 1.1 });
    R(c, 70, 8, 180, 26, DA('#000000', 0.6)); TX(c, '1日 100万部以上', 96, 13, '#f8e0a0', 16, '#000000');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};
/* ---- RL: the last one; Macnaghten's report: "5 victims & 5 victims only" ---- */
const RL = {
  name: '5人だけ', ch: '終わり', bgm: 'requiem',
  init(S) { S.tRep = ln(S, 'L19') ? at(S, 'L19', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tRep) { eastEnd(c, t, {}); c.fillStyle = DA('#04040a', 0.5); c.fillRect(0, 0, W, H); const x = lerp(160, 360, sg(t, 1, S.tRep)); jack(c, x, 150, 1.3, { f: Math.floor(t * 4) & 3, eyes: true }); glow(c, 160, 150, 120, 30, '#8c94a8', 0.25); return { z: 1.06, fx: 180, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c140c'); glow(c, 160, 80, 130, 80, '#f8d080', 0.25);
    letterSheet(c, 70, 16, 180, 130, t, { k: sg(t, S.tRep, S.tRep + 5) * 0.75, head: 'REPORT  1894' });
    if (t > S.tRep + 3) for (let i = 0; i < 5; i++) { R(c, 92 + i * 30, 104, 20, 20, '#8c1c1c'); TX(c, String(i + 1), 98 + i * 30, 105, '#f8e8d8', 16, null); }
    return { z: 1.06, fx: 160, fy: 100 }; // the five boxes stay above the dialog window
  }
};
/* ---- RM: 100+ suspects, none confirmed; records lost in the Blitz; DNA inconclusive ---- */
const RM = {
  name: '容疑者', ch: '正体', bgm: 'eerie',
  init(S) { S.tBlitz = ln(S, 'L21') ? at(S, 'L21', 0) - 0.3 : 1e9; S.tUnk = ln(S, 'L22') ? at(S, 'L22', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tUnk) { R(c, 0, 0, W, H, '#05040a'); const k = ss(sg(t, S.tUnk, S.tUnk + 2)); c.save(); c.globalAlpha = k; blit(c, jackFace({}), 160, 100, 24, 24, { s: 3.2 }); c.restore(); TX(c, '?', 230, 30, '#f8e0a0', 32, '#000000'); return { z: 1, fx: 160, fy: 100 }; }
    if (t > S.tBlitz) { // papers burning in the Blitz
      VG(c, 0, 0, W, H, ['#1c0804', '#5c1c0c', '#8c3c14']); for (let i = 0; i < 14; i++) flame(c, 10 + i * 23, 150, 10 + (i % 3) * 5, t, i); embers(c, t, 40, 7, [0, 0, W, 150], [C.hell6, C.hell7]);
      for (let i = 0; i < 6; i++) { const u = fr(t * 0.4 + i / 6), x = 40 + i * 48; R(c, x, 140 - u * 120, 22, 16, DA('#e8dcbc', 1 - u)); }
      yearFlash(c, t, S.tBlitz + 0.2, 1940, 214, 10, '大空襲');
      return { z: 1.04, fx: 160, fy: 96 };
    }
    R(c, 0, 0, W, H, '#140c0c'); brickWall(c, 0, 0, W, 150, '#2c2424', '#1c1818'); R(c, 0, 150, W, H - 150, '#1c1414');
    const n = Math.min(100, Math.floor(sg(t, 0.3, 4) * 100));
    for (let i = 0; i < n; i++) { const x = 8 + (i % 20) * 16, y = 6 + Math.floor(i / 20) * 18; R(c, x, y, 12, 18, '#2c2c34'); E(c, x + 6, y + 5, 3, 3, '#5c5c64'); R(c, x + 2, y + 9, 8, 8, '#4c4c54'); TX(c, '?', x + 2, y + 1, '#c8a040', 8, null); }
    R(c, 70, 98, 180, 26, DA('#000000', 0.7)); TX(c, '容疑者 100人以上', 96, 103, '#f8e0a0', 16, '#000000');
    return { z: 1.04, fx: 160, fy: 80 };
  }
};
/* ---- RX: horror close-up — the faceless man in the deerstalker ---- */
const RX = { name: '男の影', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, jackFace({}), [[19, 22], [28, 22]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };
/* ---- RN: the slums cleared; Jack in fiction ---- */
const RN = {
  name: 'その後', bgm: 'memory',
  init(S) { S.tFic = ln(S, 'L24') ? at(S, 'L24', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tFic) { R(c, 0, 0, W, H, '#1c1418'); for (let i = 0; i < 10; i++) { const x = 16 + i * 30, h = 70 + (i * 13 % 40); R(c, x, 140 - h, 24, h, ['#8c2c2c', '#2c4c7c', '#4c6c3c', '#7c5c2c', '#5c3c6c'][i % 5]); R(c, x + 2, 140 - h + 6, 20, 2, '#e8dcbc'); } R(c, 0, 140, W, 10, '#5c3c24'); jack(c, 160, 132, 0.9, {}); glow(c, 160, 100, 60, 50, '#f8d080', 0.2); return { z: 1.04, fx: 160, fy: 100 }; }
    VG(c, 0, 0, W, 120, ['#8ca0bc', '#b8c8d8', '#d8dce4']); const k = sg(t, 0.5, S.tFic);
    for (let i = 0; i < 4; i++) { const x = i * 80; if (hash(i) > k) brickWall(c, x, 50, 70, 98, '#4c2c24', '#3c2018'); else { R(c, x + 10, 128, 50, 20, '#6c5c4c'); for (let j = 0; j < 8; j++) R(c, x + 10 + j * 6, 120 + (j % 3) * 4, 5, 4, '#8c5c4c'); } }
    R(c, 0, 148, W, H - 148, '#5c5c64'); yearFlash(c, t, 0.3, 1908, 214, 10, '20年の間に');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};
/* ---- RO: five candles, five names ---- */
const RO = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']); glow(c, 160, 96, 150, 50, '#8c94a8', 0.12);
    const names = ['メアリー・アン・ニコルズ', 'アニー・チャップマン', 'エリザベス・ストライド', 'キャサリン・エドウッズ', 'メアリー・ジェーン・ケリー'];
    let cur = -1;
    names.forEach((nm, i) => { const t0 = ln(S, 'L25') ? at(S, 'L25', 6 + i) - 0.2 : 1e9; const lit = t > t0; if (lit) cur = i; candle(c, 56 + i * 52, 100, t, i, lit ? 1 : 0); });
    if (cur >= 0 && t < (ln(S, 'L26') ? at(S, 'L26', 0) : 1e9)) { const nm = names[cur], w = textSpr(nm, 16, '#e8dcbc').width; TX(c, nm, 160 - w / 2, 24, '#e8dcbc', 16, '#000000'); }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 90 };
  }
};
/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { eastEnd(c, t, {}); c.fillStyle = DA('#04040a', 0.5); c.fillRect(0, 0, W, H); jack(c, lerp(300, 170, ss(sg(t, 0.3, 5))), 150, 1.6, { f: Math.floor(t * 4) & 3, flip: true, eyes: true }); return { z: lerp(1, 1.3, ss(t / S.dur)), fx: 170, fy: 108 }; }
};
