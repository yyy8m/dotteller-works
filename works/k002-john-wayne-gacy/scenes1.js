/* ================= 記録 #002 ジョン・ゲイシー: cast & props ================= */
const GACY = { id: 'gacy', top: 'jacket', coat: '#2c4c7c', shirt: '#e8e4dc', tie: '#8c2c2c', pants: '#3c3c40', skin: '#e8c0a0', hair: '#2c1c14', heavy: true };
const GACY_S = { id: 'gacys', top: 'shirt', coat: '#c8d8e8', pants: '#3c3c40', skin: '#e8c0a0', hair: '#2c1c14', heavy: true }; // shirt sleeves at home
const BOY = { id: 'boy', top: 'jacket', coat: '#8c3c2c', shirt: '#e8e0d0', pants: '#2c3c5c', skin: '#f0c8a8', hair: '#6c4c2c', hairStyle: 'side' };
/* Pogo the clown (portrait 48x48): white face, red nose, blue pointed eye marks, red mouth with pointed corners */
function pogoFace(p = {}) {
  const ex = p.expr || 'smile', bl = p.blink || 0;
  return SPR('pogo' + ex + bl, 48, 48, c => {
    // ruff collar & suit
    PF(c, [2, 48, 8, 40, 40, 40, 46, 48], '#c82828'); for (let i = 0; i < 7; i++) E(c, 8 + i * 5.5, 39, 4, 3, i & 1 ? '#f4f4f4' : '#d8d8e8');
    // hair tufts (orange-red)
    for (const [x, y] of [[8, 18], [6, 24], [9, 29], [40, 18], [42, 24], [39, 29]]) E(c, x, y, 4.5, 4, '#e8582c');
    // face
    E(c, 24, 23, 13, 15, '#d8d8dc'); E(c, 24, 22.5, 12.5, 14.5, '#fcfcfc');
    // little hat
    PF(c, [17, 9, 24, -1, 31, 9], '#2c4cb8'); R(c, 15, 8, 18, 3, '#1c348c'); E(c, 24, -1, 2.5, 2.5, '#f8e070');
    // blue pointed eye marks
    for (const x0 of [18, 30]) { PF(c, [x0 - 3, 17, x0, 11, x0 + 3, 17], '#2c6cd8'); PF(c, [x0 - 2, 24, x0, 29, x0 + 2, 24], '#2c6cd8'); }
    for (const x0 of [18, 30]) {
      if (bl === 2) { L(c, x0 - 2, 20, x0 + 2, 20, C.ol); continue; }
      R(c, x0 - 2, 18, 5, 5, '#fcfcfc'); if (ex === 'creepy') { P(c, x0, 20, C.k); L(c, x0 - 3, 16, x0 + 3, 18, C.ol); continue; } R(c, x0 - 1, 19, 3, 3, ex === 'cold' ? '#1c1c1c' : C.k); if (ex !== 'cold') P(c, x0 - 1, 19, C.white);
      L(c, x0 - 3, 17, x0 + 3, 17, C.ol);
    }
    // red nose
    E(c, 24, 26, 3.5, 3.2, '#d81818'); R(c, 22, 24, 2, 1, '#f8a0a0');
    // mouth: red outline with pointed corners up
    if (ex === 'cold') { PF(c, [15, 31, 33, 31, 31, 34, 17, 34], '#c81818'); R(c, 18, 32, 12, 1, '#5c0c0c'); }
    else if (ex === 'creepy') { PF(c, [10, 25, 16, 31, 24, 33, 32, 31, 38, 25, 33, 36, 24, 39, 15, 36], '#d81818'); PF(c, [16, 31, 24, 33, 32, 31, 30, 36, 24, 37, 18, 36], '#3c0408'); for (let x = 18; x < 31; x += 2) R(c, x, 32, 1, 2, '#f4f0e8'); }
    else { PF(c, [12, 27, 17, 32, 24, 34, 31, 32, 36, 27, 31, 35, 24, 37, 17, 35], '#d81818'); PF(c, [17, 32, 24, 34, 31, 32, 28, 34, 24, 35, 20, 34], '#5c0c0c'); }
  });
}
/* John Wayne Gacy (portrait 48x48): round face, dark hair, double chin */
function gacyFace(p = {}) {
  const bl = p.blink || 0;
  return SPR('gacyF' + bl, 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#c09070', sk3 = '#8c6448';
    PF(c, [2, 48, 8, 38, 40, 38, 46, 48], '#2c4c7c'); PF(c, [18, 38, 24, 46, 30, 38], '#e8e8f0'); L(c, 24, 40, 24, 48, '#8c2c2c', 2);
    E(c, 24, 34, 11, 6, sk2); E(c, 24, 22, 13, 15, sk3); E(c, 24, 21.5, 12.5, 14.5, sk2); E(c, 23.5, 21, 11.5, 13.5, sk);
    E(c, 24, 33, 9, 3.5, sk); L(c, 16, 34, 32, 34, sk2); // double chin
    PF(c, [11, 16, 13, 6, 22, 3, 32, 4, 37, 10, 37, 16, 33, 11, 24, 9, 15, 11], '#2c1c14'); E(c, 18, 6, 6, 3, '#3c2a1c');
    for (const x0 of [17, 27]) { if (bl === 2) { L(c, x0, 20, x0 + 4, 20, C.ol); continue; } R(c, x0, 19, 4, 2, '#f8f4ec'); R(c, x0 + 1, 19, 2, 2, C.k); L(c, x0 - 1, 17, x0 + 4, 17, '#3c2a1c'); }
    L(c, 24, 21, 23, 26, sk3); R(c, 22, 26, 4, 1, sk3);
    L(c, 19, 30, 29, 30, '#7c3c34'); P(c, 18, 29, '#7c3c34'); P(c, 30, 29, '#7c3c34');
  });
}
/* Pogo the clown, full body (36x60, anchor 18,59): red & white suit, ruff collar, pompoms, big shoes, juggling arms */
const CLOWN_AX = 18, CLOWN_AY = 59;
function clownSpr(t, o = {}) {
  const fr = o.still ? 0 : Math.floor(t * 6) & 3, ex = o.expr || 'smile';
  return SPR('clownF' + fr + ex, 36, 60, c => {
    const sw = [0, 1, 0, -1][fr], cx = 18;
    // legs & big shoes
    L(c, cx - 3, 42, cx - 4 - sw, 54, '#f4f4f4', 5); L(c, cx + 3, 42, cx + 4 + sw, 54, '#c82828', 5); L(c, cx + 4, 43, cx + 5 + sw, 53, '#a01c1c', 2);
    E(c, cx - 7 - sw, 56, 6, 3, '#c82828'); E(c, cx - 8 - sw, 55, 3, 1, '#f86060'); E(c, cx + 8 + sw, 56, 6, 3, '#2c4cb8'); E(c, cx + 9 + sw, 55, 3, 1, '#6c8cf8');
    // baggy suit split down the middle
    PF(c, [cx - 9, 23, cx, 23, cx, 44, cx - 11, 44], '#f4f4f4'); PF(c, [cx, 23, cx + 9, 23, cx + 11, 44, cx, 44], '#c82828');
    PF(c, [cx - 11, 44, cx - 9, 40, cx - 6, 44], '#d8d8e0'); PF(c, [cx + 11, 44, cx + 9, 40, cx + 6, 44], '#a01c1c'); L(c, cx + 6, 25, cx + 8, 43, '#a01c1c');
    for (const y of [28, 34, 40]) { E(c, cx, y, 2, 2, '#2c4cb8'); P(c, cx - 1, y - 1, '#8cacf8'); }
    // arms juggling
    const a1 = [[cx - 13, 14], [cx - 14, 18], [cx - 13, 22], [cx - 12, 17]][fr], a2 = [[cx + 13, 22], [cx + 12, 17], [cx + 13, 14], [cx + 14, 18]][fr];
    L(c, cx - 8, 25, a1[0], a1[1], '#f4f4f4', 4); E(c, a1[0], a1[1] - 1, 2.5, 2.5, '#fcfcfc');
    L(c, cx + 8, 25, a2[0], a2[1], '#c82828', 4); E(c, a2[0], a2[1] - 1, 2.5, 2.5, '#fcfcfc');
    // ruff collar
    for (let i = 0; i < 7; i++) E(c, cx - 9 + i * 3, 22 + (i & 1), 2.5, 2, i & 1 ? '#f4f4f4' : '#d8d8e8');
    // head: orange tufts, white face, blue cone hat
    E(c, cx - 8, 12, 3.5, 4, '#e8582c'); E(c, cx + 8, 12, 3.5, 4, '#e8582c'); E(c, cx - 9, 15, 2.5, 2.5, '#c8401c'); E(c, cx + 9, 15, 2.5, 2.5, '#c8401c');
    E(c, cx, 13, 7, 8, '#d8d8dc'); E(c, cx - 0.5, 12.5, 6.5, 7.5, '#fcfcfc');
    PF(c, [cx - 6, 6, cx + 1, -2, cx + 6, 6], '#2c4cb8'); R(c, cx - 7, 5, 14, 2, '#1c348c'); E(c, cx + 1, -2, 2, 2, '#f8e070');
    for (const x0 of [cx - 3, cx + 3]) { PF(c, [x0 - 2, 9, x0, 6, x0 + 2, 9], '#2c6cd8'); if (ex === 'creepy') { P(c, x0, 11, '#c81818'); } else R(c, x0 - 1, 10, 2, 2, C.k); }
    E(c, cx, 14, 2, 2, '#d81818'); P(c, cx - 1, 13, '#f8a0a0');
    if (ex === 'creepy') { PF(c, [cx - 6, 15, cx, 19, cx + 6, 15, cx + 4, 20, cx, 21, cx - 4, 20], '#d81818'); R(c, cx - 3, 18, 7, 1, '#3c0408'); }
    else { PF(c, [cx - 5, 15, cx, 18, cx + 5, 15, cx + 3, 19, cx, 20, cx - 3, 19], '#d81818'); R(c, cx - 2, 18, 5, 1, '#5c0c0c'); }
  });
}
function ranchHouse(c, x, y, t, o = {}) { // single-storey 1970s house
  R(c, x, y - 30, 96, 30, o.wall || '#b8a488'); for (let k = y - 28; k < y; k += 4) R(c, x, k, 96, 1, o.wall2 || '#a8947c');
  PF(c, [x - 6, y - 29, x + 20, y - 44, x + 76, y - 44, x + 102, y - 29], o.roof || '#5c4c44'); if (o.snow) { L(c, x - 6, y - 30, x + 20, y - 45, K.snow0, 2); R(c, x + 20, y - 46, 56, 2, K.snow0); }
  R(c, x + 40, y - 22, 12, 22, '#5c3c2c'); P(c, x + 49, y - 11, K.win2);
  for (const wx of [10, 62, 78]) { R(c, x + wx, y - 22, 12, 10, o.lit ? K.win0 : '#3c4c64'); R(c, x + wx + 5, y - 22, 1, 10, '#ffffff'); }
}

/* talking portraits */
function stanleyFace() {
  return cached('stanF', () => SPR(null, 48, 48, c => {
    const sk = '#e0b090', sk2 = '#b08060';
    PF(c, [2, 48, 8, 38, 40, 38, 46, 48], '#5c4c3c'); R(c, 20, 38, 8, 10, '#d8d0c0');
    E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); PF(c, [12, 14, 16, 6, 30, 5, 36, 12, 36, 16, 30, 10, 18, 10], '#4c3c34');
    L(c, 16, 16, 22, 19, '#3c2c24', 2); L(c, 26, 19, 32, 16, '#3c2c24', 2); for (const x0 of [17, 27]) { R(c, x0, 20, 4, 2, '#f4ecdc'); R(c, x0 + 1, 20, 2, 2, C.k); }
    L(c, 24, 21, 23, 27, sk2); R(c, 18, 28, 12, 2, '#3c2c24'); R(c, 19, 31, 10, 1, '#6c2c24'); E(c, 30, 26, 2.5, 1.5, '#d88070');
  }, null));
}
const PORTRAITS = {
  gacy: p => withMouth('pmg2', gacyFace({ blink: p.blink }), p, 24, 29),
  pogo: p => pogoFace({ blink: p.blink }),
  stanley: p => withMouth('pms2', stanleyFace(), p, 24, 30),
  kozen: p => withMouth('pmk2', lawFace('kozen', { coat: '#3c3c44', cap: '#2c2c3c' }), p, 24, 29),
};
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const DAD = { id: 'dad', top: 'tee', coat: '#e8e4d8', pants: '#3c3430', skin: '#e0b090', hair: '#2c1c14', hairStyle: 'side', moustache: true };
const KID = { id: 'kidg', top: 'shirt', coat: '#5c7cac', pants: '#3c3c44', skin: '#f0c8a8', hair: '#2c1c14', kid: true };
const YOUTH = [{ id: 'y1', top: 'shirt', plaid: true, coat: '#8c5c3c', pants: '#3c4c6c', skin: '#f0c8a8', hair: '#c89c5c', hairStyle: 'long' }, { id: 'y2', top: 'sweater', coat: '#4c6c4c', pants: '#2c2c3c', skin: '#e0b090', hair: '#3c2418', hairStyle: 'curly' }, { id: 'y3', top: 'tee', coat: '#7c2c2c', pants: '#3c3c44', skin: '#e8c0a0', hair: '#5c3c24', hairStyle: 'side' }];
const COP2 = { id: 'cop2', top: 'uniform', coat: '#2c3c5c', pants: '#1c2434', skin: '#e0b08c', hair: '#3c2818', hat: 'police', hatCol: '#1c2c4c' };
const DET2 = { id: 'det2', top: 'jacket', coat: '#5c5048', shirt: '#d8d0c0', tie: '#3c2c2c', pants: '#2c2826', skin: '#e0b08c', hair: '#3c2818', hat: 'fedora', hatCol: '#2c2620', moustache: true };
const KIDS = ['#d84c4c', '#4c8cd8', '#e8b83c', '#5cb05c'].map((col, i) => ({ id: 'kd' + i, top: i & 1 ? 'tee' : 'shirt', coat: col, pants: ['#3c3c5c', '#5c4c3c'][i & 1], skin: ['#f0c8a8', '#e0b090', '#f4d0b0', '#c89070'][i], hair: ['#6c4c2c', '#2c1c14', '#c89c5c', '#1c1410'][i], hairStyle: ['side', 'short', 'long', 'curly'][i], kid: true }));
/* old personSpr call sites → modFig (36x58) at a matching size */
const gFig = (st, p = {}) => modFig(st, { f: p.f, arm: p.arm === 'fwd' && p.weapon !== 'knife' && p.weapon !== 'bottle' ? 'hold' : p.arm, weapon: p.weapon, shock: p.shock, expr: p.expr, k: p.id });
function bigFace(c, spr, cx, cy, s, a, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(pc, a, id + 'd') : pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function copFace2() { return SPR('copF2', 32, 32, c => { R(c, 6, 26, 20, 6, K.cop1); E(c, 16, 15, 9, 10, '#e0b08c'); R(c, 6, 4, 20, 6, K.cop1); R(c, 4, 9, 24, 2, K.cop2); P(c, 16, 6, K.badge); for (const x0 of [11, 18]) { R(c, x0, 13, 4, 4, C.white); R(c, x0 + 1, 14, 2, 2, C.k); } L(c, 10, 11, 14, 10, '#7c5038'); L(c, 18, 10, 22, 11, '#7c5038'); E(c, 16, 22, 2.5, 3, '#401010'); }); }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function speech(c, s, cx, y, tailX) { const w = textSpr(s, 16, '#000').width + 12; R(c, cx - w / 2, y, w, 24, '#000000'); R(c, cx - w / 2 + 2, y + 2, w - 4, 20, C.white); if (tailX != null) PF(c, [tailX - 5, y + 23, tailX + 5, y + 23, tailX, y + 32], C.white); TX(c, s, cx - w / 2 + 6, y + 4, '#000000', 16, null); }
/* cross-section of the house: living room above, crawl space below (n bodies lying in the dirt) */
function crossSection(c, t, n, o = {}) {
  roomBg(c, { wall: '#8c7c64', wall2: '#847458', floor: '#6c5440', fy: 92, window: [250, 18] });
  R(c, 0, 92, W, 10, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 92, 1, 10, '#3c2818');
  R(c, 0, 102, W, 60, '#2c2016'); for (let i = 0; i < 40; i++) P(c, hash(i * 3) * W, 104 + hash(i * 7) * 56, '#3c2c1c');
  for (let x = 30; x < W; x += 60) R(c, x, 102, 6, 60, '#5c5c64'); // piers
  for (let i = 0; i < n; i++) { const x = 18 + (i % 9) * 34 + (Math.floor(i / 9) % 2) * 14, y = 116 + Math.floor(i / 9) * 13; E(c, x, y, 13, 3.5, o.lit ? '#8c7c68' : '#4c3c2c'); E(c, x - 9, y - 1, 3.5, 3, o.lit ? '#a8987c' : '#5c4834'); if (o.blood) R(c, x - 2, y + 2, 5, 1, BLOOD[0]); }
  R(c, 0, 158, W, 4, '#1c140c');
}
