/* ================= 記録 #022 BTK（デニス・レイダー）: scenes ================= */
const RC = (c, t) => closeUp(c, t, raderFace({ blink: blinkOf(t, 6) }), { bg: ['#14141c', '#3c3c4c'], spk: 'rader' });
const RCO = (c, t) => closeUp(c, t, raderFace({ blink: blinkOf(t, 6), old: true }), { bg: ['#1c140c', '#4c3424'], spk: 'rader' });
const KC = (c, t) => closeUp(c, t, keikanFace({ blink: blinkOf(t, 3) }), { bg: ['#0c1424', '#2c3c5c'], spk: 'keikan' });
const SC = (c, t) => closeUp(c, t, shochoFace({ blink: blinkOf(t, 4) }), { bg: ['#0c1424', '#2c3c5c'], spk: 'shocho' });
function screenText(c, t, lines, o = {}) { R(c, 60, 30, 200, 110, '#2c2c34'); R(c, 66, 36, 188, 92, '#0c1c2c'); for (let i = 0; i < lines.length; i++) { if (t < (o.t0 || 0) + i * 0.6) break; TX(c, lines[i], 74, 40 + i * 20, i === lines.length - 1 && o.hl ? '#f8e060' : '#a8d8f8', 16, null); } R(c, 150, 140, 20, 8, '#2c2c34'); R(c, 130, 148, 60, 4, '#3c3c44'); }

/* ---- QZ: cold open — Feb 2005, a floppy disk arrives at the TV station; a killer who terrorised the city for 30 years; his own name inside (moves: the envelope opens, the night street, the name glows) ---- */
const QZ = {
  name: 'フロッピーディスク', ch: '一枚のディスク', bgm: 'dread',
  init(S) { S.tNight = at(S, 'C1', 0) - 0.3; S.tName = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#06060c'); floppy(c, 110, 50, 3); if (t > S.tName + 1) { c.save(); c.globalAlpha = sg(t, S.tName + 1, S.tName + 2); glow(c, 160, 106, 50, 20, '#f8e060', 0.4); TX(c, '？？？', 136, 98, '#f8e060', 16, null); c.restore(); } return { z: 1.04 + 0.04 * sg(t, S.tName, S.dur), fx: 160, fy: 100 }; }
    if (t > S.tNight) { suburb(c, t, { night: true }); shadow(c, RADER, lerp(-20, 160, sg(t, S.tNight, S.tName)), 150, { k: 'zn', f: Math.floor(t * 3) % 4, col: '#06060a' }); plate(c, 40, 46, 'BTK', '#f8a0a0'); return { z: 1.06, fx: 160, fy: 112 }; }
    tvStation(c, t); const k = sg(t, 1, 3); R(c, 120, lerp(60, 88, k), 80, 24, '#c8a870'); floppy(c, 146, lerp(66, 74, k)); yearFlash(c, t, 0.4, '2005', 216, 10, 'ウィチタ');
    return { z: 1.06, fx: 160, fy: 104 };
  }
};

/* ---- QA: the ordinary man — Kansas, Air Force, a meat counter, married with two children; security alarms; church council president, Cub Scout leader (moves: years flash, the drill turns, the scouts salute) ---- */
const QA = {
  name: '表の顔', ch: '表の顔', bgm: 'memory',
  init(S) { S.tFam = at(S, 'L2', 0) - 0.3; S.tADT = at(S, 'L3', 0) - 0.3; S.tChurch = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tChurch) { church(c, t); person(c, RADER, 120, 156, { k: 'ch', blink: blinkOf(t, 5), arm: 'wave' }); for (let i = 0; i < 4; i++) person(c, Object.assign({}, KIDS[0], { id: 'cs' + i, coat: '#3c5c9c' }), 170 + i * 22, 158, { k: 'sc' + i, s: 0.9, arm: (Math.floor(t * 2) + i) % 3 ? null : 'up' }); plate(c, 40, 46, '教会の評議会の議長', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tADT) { suburb(c, t); person(c, RADER, 150, 150, { k: 'ad', arm: 'up' }); R(c, 166, 98, 14, 12, '#5c5c64'); R(c, 168, 100, 10, 4, '#2c3c2c'); E(c, 175, 107, 1.5, 1.5, Math.floor(t * 3) % 2 ? '#c81818' : '#5c1c1c'); plate(c, 40, 46, '防犯警報の取り付け', '#f8e8b0'); yearFlash(c, t, S.tADT + 0.3, '1974', 216, 10, '警備会社'); return { z: 1.1, fx: 160, fy: 108 }; }
    if (t > S.tFam) { suburb(c, t); person(c, RADER, 120, 150, { k: 'fm', blink: blinkOf(t, 5) }); person(c, WIFE, 146, 150, { k: 'wf', expr: 'smile' }); if (t > S.tFam + 3.5) { person(c, KIDS[0], 172, 152, { k: 'k1', s: 0.9 }); person(c, KIDS[1], 192, 152, { k: 'k2', s: 0.9 }); } yearFlash(c, t, S.tFam + 0.6, '1971', 216, 10, '結婚'); return { z: 1.08, fx: 160, fy: 110 }; }
    suburb(c, t); person(c, Object.assign({}, KIDS[0], { id: 'yr' }), 160, 152, { k: 'yr', blink: blinkOf(t, 5) }); yearFlash(c, t, 0.4, '1945', 216, 10, 'カンザス州'); return { z: 1.06, fx: 160, fy: 108 };
  }
};

/* ---- QB: 1974 — a family of four; the children home from school; a letter hidden in a library book; "BTK" — bind, torture, kill (no victim shown: a dark house, then letters) (moves: the house light goes out, the book opens, three letters stamp in) ---- */
const QB = {
  name: '1974年', ch: '最初の事件', bgm: 'dread',
  init(S) { S.tKids = at(S, 'L6', 0) - 0.3; S.tLib = at(S, 'L7', 0) - 0.3; S.tDetail = at(S, 'L8', 0) - 0.3; S.tBTK = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBTK) { R(c, 0, 0, W, H, '#0c0608'); const ws = [['B', '縛る'], ['T', '拷問する'], ['K', '殺す']]; for (let i = 0; i < 3; i++) { const tt = at(S, 'L9', i) - 0.2; if (t > tt) { const k = eOut(sg(t, tt, tt + 0.3)); c.save(); c.globalAlpha = k; R(c, 50 + i * 80, 50, 60, 60, '#5c0c0c'); TX(c, ws[i][0], 74 + i * 80, 70, '#f8f0e0', 16, null); c.restore(); plate(c, 54 + i * 80, 118, ws[i][1], '#f8c8c8'); } } return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tDetail) { R(c, 0, 0, W, H, '#1c1814'); letter(c, 100, 36, 120, 100, { lines: 11, head: 'BTK?' }); plate(c, 40, 46, '公表していない詳細', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tLib) { library(c, t); R(c, 120, 90, 80, 22, '#3c4c6c'); R(c, 158, 90, 4, 22, '#2c3c5c'); const k = sg(t, S.tLib + 1, S.tLib + 2.5); letter(c, 140, lerp(92, 60, k), 40, 30, { lines: 3 }); yearFlash(c, t, S.tLib + 0.3, '1974', 216, 10, '10月'); if (t > at(S, 'L7', 2) - 0.3) { R(c, 260, 70, 20, 30, '#2c2c2c'); R(c, 262, 66, 16, 6, '#1c1c1c'); plate(c, 40, 46, '新聞社に電話', '#f8e8b0'); } return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tKids) { suburb(c, t); for (let i = 0; i < 2; i++) person(c, KIDS[i], lerp(-20, 100 + i * 20, sg(t, S.tKids, S.tKids + 2.5)), 152, { k: 'sk' + i, f: Math.floor(t * 4) % 4, s: 0.9 }); R(c, 96, 96, 14, 12, '#0c0c14'); return { z: 1.06, fx: 120, fy: 108 }; }
    suburb(c, t, { night: true }); yearFlash(c, t, 0.4, '1974', 216, 10, '1月15日'); if (t > 2) { R(c, 94, 96, 14, 12, '#0c0c14'); } plate(c, 40, 46, 'ある一家の4人', '#f8c8c8');
    return { z: 1.08 + 0.06 * sg(t, 0, S.tKids), fx: 110, fy: 104 };
  }
};

/* ---- QC: the terror — the 1978 letter to KAKE; the town learns; the woman who came home late; 1985, 86, 91; Project Cookie; silence, the cold case (moves: headlines, the clock on the wall, year stamps, dust on the box) ---- */
const QC = withCuts({
  name: '野放しの殺人犯', ch: '野放しの殺人犯', bgm: 'pulse',
  init(S) { S.tTown = at(S, 'L11', 1) - 0.3; S.tWait = at(S, 'L12', 0) - 0.3; S.tYears = at(S, 'L13', 0) - 0.3; S.tCookie = at(S, 'L13b', 0) - 0.3; S.tCold = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCold) { R(c, 0, 0, W, H, '#2c2824'); R(c, 100, 60, 120, 70, '#8c7454'); R(c, 100, 60, 120, 8, '#6c5434'); TX(c, 'BTK', 140, 84, '#2c2c2c', 16, null); for (let i = 0; i < 20; i++) { const u = fr(t * 0.1 + i / 20); P(c, 90 + (i * 13) % 140, 40 + u * 100, '#a8a090'); } stamp(c, t, at(S, 'L14', 1), 220, 60, '迷宮入り', 90); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tCookie) { R(c, 0, 0, W, H, '#14100c'); letter(c, 80, 40, 160, 90, { lines: 9 }); TX(c, 'PROJECT COOKIE', 96, 108, '#c81818', 16, null); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tYears) { R(c, 0, 0, W, H, '#0c0c10'); const ys = ['1985', '1986', '1991']; for (let i = 0; i < 3; i++) stamp(c, t, at(S, 'L13', i) - 0.1, 70 + i * 90, 80, ys[i], 70); if (t > at(S, 'L13', 3) - 0.3) plate(c, 110, 120, '犠牲者　10人', '#f8a0a0'); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tWait) { R(c, 0, 0, W, H, '#1c1820'); R(c, 0, 120, W, 70, '#2c2428'); E(c, 240, 50, 14, 14, '#e8e4d8'); const a = t * 0.8 - Math.PI / 2; L(c, 240, 50, 240 + Math.cos(a) * 10, 50 + Math.sin(a) * 10, '#141414'); L(c, 240, 50, 240 + Math.cos(a / 12) * 6, 50 + Math.sin(a / 12) * 6, '#141414', 2); shadow(c, RADER, 140, 150, { k: 'wt', col: '#0c0c10' }); R(c, 40, 60, 40, 60, '#3c3040'); plate(c, 40, 46, '何時間も待ち続けた', '#c8d0f0'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tTown) { suburb(c, t); for (let i = 0; i < 6; i++) { person(c, TOWN[i], 30 + i * 52, 154, { k: 'tn' + i, expr: 'shock', flip: i % 2 === 0 }); R(c, 36 + i * 52, 112, 14, 10, '#f0ece0'); } plate(c, 40, 46, '連続殺人犯が野放し', '#f8a0a0'); return { z: 1.04, fx: 160, fy: 110 }; }
    tvStation(c, t); letter(c, 120, lerp(-60, 50, eOut(sg(t, 0.5, 1.5))), 80, 60, { lines: 7 }); yearFlash(c, t, 0.4, '1978', 216, 10, 'テレビ局へ');
    return { z: 1.04, fx: 160, fy: 100 };
  }
}, [['L12b', (c, t) => closeUp(c, t, raderFace({ blink: blinkOf(t, 6) }), { bg: ['#2c0808', '#5c1c1c'], lines: '#c83c3c', talk: false })]]);

/* ---- QD: the quiet years — census taker; compliance officer in Park City; "too strict"; a neighbour's dog; stalking (moves: the tape measure, the dog, the neighbour shaking a fist) ---- */
const QD = {
  name: '条例執行官', ch: '空白の13年', bgm: 'eerie',
  init(S) { S.tStrict = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    suburb(c, t); person(c, RADER_UNI, 150, 152, { k: 'cu', blink: blinkOf(t, 5), arm: t > S.tStrict ? 'wave' : null });
    if (t > S.tStrict) { person(c, TOWN[0], 220, 152, { k: 'nb', arm: 'up', expr: 'shock', flip: true }); plate(c, 40, 46, '厳格すぎる職員', '#f8e8b0'); }
    else { L(c, 162, 136, 200, 140, '#e8d870'); R(c, 196, 136, 8, 6, '#c8a030'); plate(c, 40, 46, '動物管理・条例執行の担当', '#f8e8b0'); }
    return { z: 1.08, fx: 160, fy: 108 };
  }
};

/* ---- QE: the turn — 2004, a letter to the Eagle with a crime-scene photo and a licence copy; 1,300 DNA swabs; parcels on a stop sign, a library drop box; the doll; "BTK Story"; the cereal box and the black Jeep on CCTV (moves: envelope, counter, parcels, CCTV scanlines) ---- */
const QE = {
  name: '再び届いた手紙', ch: '13年後の手紙', bgm: 'dread',
  init(S) { S.tPhoto = at(S, 'L18', 0) - 0.3; S.tDNA = at(S, 'L19', 0) - 0.3; S.tParcels = at(S, 'L20', 0) - 0.3; S.tStory = at(S, 'L20b', 0) - 0.3; S.tCCTV = at(S, 'L21', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCCTV) { parkingLot(c, t); R(c, 40, 120, 110, 18, '#5c6c7c'); R(c, 120, 100, 30, 22, '#4c5c6c'); R(c, 126, 104, 18, 8, '#8cacc8'); for (const wx of [56, 130]) E(c, wx, 140, 7, 7, '#141414'); R(c, 60, 104, 26, 16, '#e8c870'); R(c, 62, 106, 22, 4, '#c83c3c'); plate(c, 176, 80, 'シリアルの箱', '#f8e8b0'); jeep(c, lerp(150, 360, sg(t, at(S, 'L21', 2), at(S, 'L21', 2) + 3)), 160, {}); c.save(); c.globalAlpha = 0.18; for (let y = 0; y < H; y += 3) R(c, 0, y, W, 1, '#000000'); c.restore(); TX(c, 'REC', 20, 50, Math.floor(t * 2) % 2 ? '#f83c3c' : '#5c1c1c', 16, null); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tStory) { R(c, 0, 0, W, H, '#14100c'); letter(c, 80, 30, 160, 110, { lines: 10 }); TX(c, 'THE BTK STORY', 98, 36, '#2c2c2c', 16, null); plate(c, 60, 140 - 20, '第1章　シリアルキラーが生まれる', '#f8a0a0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tParcels) { const ph = Math.min(2, Math.floor(3 * (t - S.tParcels) / Math.max(1, S.tStory - S.tParcels))); if (ph === 0) { suburb(c, t); stopSign(c, 160, 90); R(c, 150, 116, 20, 14, '#c8a870'); } else if (ph === 1) { library(c, t); R(c, 120, 60, 80, 50, '#5c5c64'); R(c, 130, 74, 60, 8, '#0c0c0c'); R(c, 150, lerp(40, 74, fr(t)), 20, 12, '#c8a870'); } else { R(c, 0, 0, W, H, '#0c0c10'); doll(c, 160, 100); L(c, 148, 96, 172, 96, '#8c5c2c', 2); L(c, 152, 105, 168, 105, '#8c5c2c', 2); return { z: 1.8, fx: 160, fy: 96 }; } return { z: 1.06, fx: 160, fy: 100 }; }
    if (t > S.tDNA) { R(c, 0, 0, W, H, '#1c2028'); for (let i = 0; i < 36; i++) { const x = 40 + (i % 12) * 20, y = 40 + Math.floor(i / 12) * 30; R(c, x, y, 6, 22, '#c8d8e8'); R(c, x, y, 6, 5, '#5c8cc8'); } const k = sg(t, S.tDNA + 0.5, S.tDNA + 3); plate(c, 90, 128, k < 1 ? 'DNA　' + Math.floor(1300 * k) + '人' : 'DNA　1300人超', '#a8f8f0'); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tPhoto) { R(c, 0, 0, W, H, '#14100c'); R(c, 70, 40, 90, 70, '#e8e4d8'); R(c, 74, 44, 82, 56, '#3c3c44'); R(c, 180, 50, 80, 50, '#d8d8c8'); R(c, 186, 56, 24, 30, '#8c8c84'); for (let i = 0; i < 4; i++) R(c, 214, 58 + i * 8, 40, 2, '#5c5c5c'); plate(c, 40, 120, '写真と、運転免許証のコピー', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#2c2824'); R(c, 0, 120, W, 70, '#3c3430'); letter(c, 110, lerp(-80, 40, eOut(sg(t, 0.6, 1.6))), 100, 70, { lines: 8 }); yearFlash(c, t, 0.4, '2004', 216, 10, '3月');
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- QF: the trap — "can a floppy be traced?"; "safe", says the ad; Feb 16, the disk; (pause) inside: a church name, "Dennis"; the church president; the Jeep by his house; the daughter's DNA (moves: the screen types, the name lights, the family-tree lines join) ---- */
const QF = {
  name: '罠', ch: 'フロッピーディスク', bgm: 'pulse',
  init(S) { S.tAd = at(S, 'L23', 0) - 0.3; S.tDisk = at(S, 'L24', 0) - 0.3; S.tMeta = at(S, 'L25', 0) - 0.3; S.tChurch = at(S, 'L26', 0) - 0.3; S.tDNA = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDNA) { R(c, 0, 0, W, H, '#101820'); const k = sg(t, S.tDNA + 2, S.dur - 2); R(c, 50, 62, 70, 44, '#1c2c3c'); TX(c, '爪', 76, 42, '#a8f8f0', 16, null); R(c, 200, 62, 70, 44, '#1c2c3c'); TX(c, '娘', 226, 42, '#a8f8f0', 16, null); for (let i = 0; i < 8; i++) { const y = 66 + i * 5; R(c, 60, y, 50, 2, i % 3 ? '#5c8cc8' : '#c8c85c'); R(c, 210, y, 50, 2, i % 2 ? '#5c8cc8' : '#c8c85c'); } if (k > 0) { L(c, 120, 84, lerp(120, 200, k), 84, '#f8e060', 2); } if (k >= 1) plate(c, 116, 112, '家族の一致', '#f8e060'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tChurch) { suburb(c, t); jeep(c, 200, 156, {}); person(c, RADER, 120, 152, { k: 'hm', blink: blinkOf(t, 5) }); plate(c, 40, 46, '黒いジープ・チェロキー', '#f8e8b0'); return { z: 1.08, fx: 160, fy: 110 }; }
    if (t > S.tMeta) { R(c, 0, 0, W, H, '#14141c'); screenText(c, t, ['ファイルの情報', 'Christ Lutheran Church', '最終更新者：', 'Dennis'], { t0: S.tMeta + 0.5, hl: true }); return { z: 1.06 + 0.04 * sg(t, S.tMeta, S.dur), fx: 160, fy: 96 }; }
    if (t > S.tDisk) { tvStation(c, t); R(c, 120, 80, 80, 34, '#c8a870'); floppy(c, 140, lerp(84, 60, sg(t, S.tDisk + 1, S.tDisk + 2.5)), 1.2); yearFlash(c, t, S.tDisk + 0.3, '2.16', 216, 10, '2005年'); return { z: 1.08, fx: 160, fy: 96 }; }
    if (t > S.tAd) { R(c, 0, 0, W, H, '#2c2824'); R(c, 70, 30, 180, 110, '#f0ece0'); for (let i = 0; i < 8; i++) R(c, 78, 40 + i * 12, 70, 2, '#8c8c8c'); R(c, 160, 40, 82, 60, '#e8e4d8'); ER(c, 201, 70, 40, 30, '#c81818'); TX(c, 'フロッピー', 164, 56, '#2c2c2c', 16, null); TX(c, '安全', 186, 76, '#c81818', 16, null); return { z: 1.04, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#14100c'); letter(c, 70, 40, 180, 90, { lines: 4 }); TX(c, '追跡できるか？', 96, 100, '#c81818', 16, null); floppy(c, 200, 54);
    return { z: 1.04, fx: 160, fy: 96 };
  }
};
const QH0 = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, raderFace({ dark: true, blink: 0 }), [[18, 20], [30, 20]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- QG: the arrest — Feb 25, noon, pulled over near home; "I've got an idea"; next morning: "BTK is arrested" (moves: the police lights, the stop, flashbulbs) ---- */
const QG = withCuts({
  name: '逮捕', ch: '逮捕', bgm: 'dread',
  init(S) { S.tPress = at(S, 'L29', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPress) { pressRoom(c, t); person(c, SHOCHO, 160, 150, { k: 'pc', blink: blinkOf(t, 4) }); for (let i = 0; i < 4; i++) person(c, TOWN[i], 40 + i * 30 + (i > 1 ? 160 : 0), 172, { k: 'pr' + i, arm: 'up', flip: i > 1 }); if (fr(t * 2.5) < 0.18) dim(c, 0.5, '#ffffff'); return { z: 1.06, fx: 160, fy: 108 }; }
    suburb(c, t); const k = sg(t, 0.5, 2.5); jeep(c, lerp(-80, 110, k), 156, {}); const ph = Math.floor(t * 6) & 1; R(c, 236, 134, 80, 18, '#f0f0ec'); R(c, 236, 142, 80, 4, '#141418'); PF(c, [248, 134, 256, 122, 296, 122, 304, 134], '#f0f0ec'); R(c, 258, 124, 16, 8, '#4c5c6c'); R(c, 278, 124, 16, 8, '#4c5c6c'); for (const wx of [252, 300]) { E(c, wx, 153, 7, 7, '#0c0c10'); E(c, wx, 153, 3, 3, '#8c8c94'); } R(c, 264, 118, 10, 4, ph ? '#ff3030' : '#8c1c1c'); R(c, 276, 118, 10, 4, ph ? '#2c3c8c' : '#4c8cff'); glow(c, 275, 118, 30, 16, ph ? '#ff3030' : '#4c8cff', 0.3); plate(c, 40, 46, '自宅の近くで', '#f8e8b0'); if (t > 2.5) person(c, KEIKAN, 214, 152, { k: 'ks', flip: true }); yearFlash(c, t, 0.4, '2.25', 216, 10, '正午過ぎ');
    return { z: 1.06, fx: 160, fy: 110 };
  }
}, [['P1', KC], ['R1', RC], ['W1', SC]]);

/* ---- QI: the court — 10 counts; guilty plea, no apology; the 30-minute "acceptance speech"; ten life sentences; tears only when the families' words came on the radio; the diagnosis (moves: the gavel, the stamp, the van on the road, the radio) ---- */
const QI = {
  name: '判決', ch: '判決', bgm: 'requiem',
  init(S) { S.tSpeech = at(S, 'L31', 1) - 0.3; S.tVerdict = at(S, 'L32', 0) - 0.3; S.tVan = at(S, 'L33', 0) - 0.3; S.tDx = at(S, 'L33b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDx) { R(c, 0, 0, W, H, '#1c1c24'); letter(c, 90, 30, 140, 100, { lines: 6 }); const ws = ['自己愛性', '強迫性', '反社会性']; for (let i = 0; i < 3; i++) if (t > S.tDx + 0.8 + i * 0.8) plate(c, 110, 76 + i * 20 - 30, ws[i] + 'の人格障害', '#2c2c5c', '#e8e4d8'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tVan) { VG(c, 0, 0, W, 110, ['#7c9cc8', '#a8c0d8', '#d8dcd8']); R(c, 0, 110, W, 80, '#6c6c64'); for (let i = 0; i < 6; i++) { const x = ((i * 70 - t * 50) % 420 + 420) % 420 - 50; R(c, x, 120, 30, 2, '#e8e8e0'); } R(c, 110, 104, 100, 36, '#e8e8e0'); R(c, 120, 110, 24, 14, '#4c5c6c'); for (const wx of [128, 192]) E(c, wx, 142, 7, 7, '#141414'); if (t > at(S, 'L33', 2) - 0.3) { for (let i = 0; i < 3; i++) { const u = fr(t + i / 3); c.save(); c.globalAlpha = 1 - u; ER(c, 160, 90, 20 + u * 30, 10 + u * 14, '#f8e8b0'); c.restore(); } plate(c, 40, 46, '遺族の声明', '#f8e8b0'); } return { z: 1.04, fx: 160, fy: 104 }; }
    courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'jd', blink: blinkOf(t, 5) });
    if (t > S.tVerdict) { person(c, RADER, 160, 172, { k: 'vd', expr: 'sad' }); stamp(c, t, S.tVerdict + 0.4, 80, 60, '終身刑×10', 110); return { z: 1.08, fx: 160, fy: 108 }; }
    person(c, RADER, 160, 172, { k: 'cr', blink: blinkOf(t, 5) }); if (t > S.tSpeech) plate(c, 40, 46, '30分の「謝罪」', '#f8c8c8');
    for (let i = 0; i < 3; i++) person(c, TOWN[i + 1], 40 + i * 24, 166, { k: 'fm' + i, expr: 'sad' });
    return { z: 1.08, fx: 160, fy: 108 };
  }
};

/* ---- QJ: afterwards — "many were lucky"; the workers who saved a life; still in a cell; his daughter's book; ten flowers (moves: the workers' drill, the cell light, the pages) ---- */
const QJ = withCuts({
  name: '幸運な人たち', ch: 'その後', bgm: 'requiem',
  init(S) { S.tWork = at(S, 'L35', 0) - 0.3; S.tCell = at(S, 'L36', 0) - 0.3; S.tBook = at(S, 'L36b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBook) { R(c, 0, 0, W, H, '#1c1814'); R(c, 110, 40, 100, 100, '#e8e4d8'); R(c, 110, 40, 6, 100, '#a8a49c'); for (let i = 0; i < 6; i++) R(c, 126, 68 + i * 10, 70, 2, '#5c5c5c'); TX(c, 'DAUGHTER', 124, 46, '#2c2c5c', 16, null); yearFlash(c, t, S.tBook + 0.3, '2019', 216, 10, ''); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tCell) { cellBg(c, t); person(c, RADER_JAIL, 100, 160, { k: 'cl', blink: blinkOf(t, 6) }); plate(c, 40, 46, '今も、独房に', '#f8e8b0'); return { z: 1.06, fx: 140, fy: 108 }; }
    if (t > S.tWork) { suburb(c, t); for (let i = 0; i < 2; i++) { person(c, Object.assign({}, DETS[i], { id: 'wk' + i, top: 'shirt', coat: '#e8a838', hat: 'helmet', hatCol: '#f8d838' }), 140 + i * 40, 152, { k: 'wk' + i, arm: Math.floor(t * 4 + i) % 2 ? 'up' : null }); } shadow(c, RADER, 290, 152, { k: 'lk', col: '#0c0c10', flip: true }); plate(c, 40, 46, '近くに作業員がいた', '#f8e8b0'); return { z: 1.06, fx: 180, fy: 108 }; }
    R(c, 0, 0, W, H, '#3c3834'); R(c, 0, 120, W, 70, '#2c2824'); R(c, 120, 112, 80, 8, '#5c4c3c'); R(c, 124, 120, 4, 30, '#4c3c2c'); R(c, 192, 120, 4, 30, '#4c3c2c'); person(c, RADER, 120, 150, { k: 'iv', blink: blinkOf(t, 6) }); person(c, DETS[2], 200, 150, { k: 'id', flip: true });
    return { z: 1.08, fx: 160, fy: 108 };
  }
}, [['R2', RC]]);
const QM = {
  name: '鎮魂', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    suburb(c, t, { night: true }); for (let i = 0; i < 10; i++) { const x = 104 + (i % 5) * 26, y = 118 + Math.floor(i / 5) * 12; L(c, x, y + 4, x, y + 14, '#3c6c3c'); for (let k = 0; k < 6; k++) E(c, x + Math.cos(k) * 3, y + Math.sin(k) * 3, 2, 2, '#f4f0e8'); E(c, x, y, 1.5, 1.5, '#e8d870'); }
    dim(c, 0.25 * sg(t, 2, 14)); return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: 'ディスク', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { suburb(c, t, { night: true }); shadow(c, RADER, 160, 150, { k: 's1', col: '#06060a' }); floppy(c, 210, 60, 1.6); return { z: 1.12, fx: 170, fy: 104 }; } };
const SS2 = { name: 'テレビ局', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { tvStation(c, t); R(c, 120, 80, 80, 34, '#c8a870'); floppy(c, 140, 70, 1.2); return { z: 1.06 + 0.06 * sg(t, 0, S.dur), fx: 160, fy: 96 }; } };
