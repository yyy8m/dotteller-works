/* ================= 記録 #020 帝銀事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); if (st.band && !o.rot) R(c, x + (o.flip ? 3 : -9), y - 37, 6, 4, '#f4f0e8'); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || '') }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f)), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { x = Math.max(x, 40); const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
// a tray of small tea cups; o.n cups; o.drink: the cups lift
function teacups(c, x, y, n = 6, o = {}) { R(c, x - 4, y + 4, n * 12 + 4, 3, '#8c6c44'); for (let i = 0; i < n; i++) { const cx = x + i * 12; R(c, cx, y - 4, 8, 8, '#f0ece0'); R(c, cx, y - 4, 8, 2, '#c8c4b8'); if (o.fill) R(c, cx + 1, y - 2, 6, 1, '#c8b890'); } }
function pipette(c, x, y) { L(c, x, y, x, y + 14, '#d8e0e8', 2); E(c, x, y - 2, 2.5, 3, '#a8483c'); }
function nameCard(c, x, y, txt, o = {}) { R(c, x, y, 34, 20, o.lost ? '#5c5c58' : '#f4f0e8'); R(c, x, y, 34, 1, '#c8c4b8'); if (txt) { for (let i = 0; i < 3; i++) R(c, x + 4, y + 5 + i * 4, i ? 18 : 26, 1, '#3c3c3c'); } if (o.mark) { L(c, x + 4, y + 4, x + 30, y + 16, '#c81818', 2); L(c, x + 30, y + 4, x + 4, y + 16, '#c81818', 2); } }

/* ---- places ---- */
// the Shiina-machi branch: a small two-storey Western-style bank, winter afternoon light (o.dusk; o.night with police lanterns)
function bankFront(c, t, o = {}) {
  VG(c, 0, 0, W, 120, o.night ? ['#06060e', '#0c0c1c', '#1c1c2c'] : o.dusk ? ['#2c2c4c', '#8c6c7c', '#e8b090'] : ['#8ca8c8', '#b8c8d8', '#e0e0d8']);
  for (let i = 0; i < 5; i++) { const x = i * 70 - 20; R(c, x, 70, 60, 50, o.night ? '#14141c' : '#5c5448'); PF(c, [x - 4, 72, x + 30, 58, x + 64, 72], o.night ? '#0c0c14' : '#3c3830'); }
  R(c, 90, 36, 140, 84, o.night ? '#2c2c34' : '#d8d0c0'); R(c, 86, 32, 148, 6, o.night ? '#3c3c44' : '#a89c88'); R(c, 90, 64, 140, 3, o.night ? '#3c3c44' : '#a89c88');
  for (let i = 0; i < 4; i++) R(c, 100 + i * 34, 42, 18, 16, o.night ? (i === 1 ? '#c8a050' : '#0c0c14') : '#3c4c5c');
  R(c, 140, 86, 40, 34, o.night ? '#c8a050' : '#3c2c20'); R(c, 159, 86, 2, 34, '#2c1c10'); R(c, 120, 64, 80, 20, '#2c2c2c'); TX(c, '帝国銀行', 128, 66, '#e8e0c0', 16, null);
  R(c, 0, 120, W, 70, o.night ? '#1c1c1c' : '#7c7468'); for (let i = 0; i < 30; i++) P(c, (i * 37) % W, 124 + (i * 17) % 60, o.night ? '#2c2c2c' : '#6c645c');
  if (o.night) for (let i = 0; i < 3; i++) { const ph = Math.floor(t * 3 + i) & 1; E(c, 60 + i * 100, 112, 4, 6, ph ? '#f86040' : '#a83020'); glow(c, 60 + i * 100, 112, 20, 16, '#f86040', 0.25); }
}
// inside: the counter, desks, an abacus, the wall clock (o.clock hour in 24h, o.min), stove; o.dark for after
function bankInside(c, t, o = {}) {
  R(c, 0, 0, W, H, '#5c4c3c'); VG(c, 0, 0, W, 120, ['#4c3c2c', '#6c5844', '#7c6450']); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 120, '#4c3c2c');
  R(c, 20, 20, 60, 40, '#a8b8c8'); R(c, 20, 20, 60, 2, '#3c2c20'); R(c, 49, 20, 2, 40, '#3c2c20'); R(c, 240, 20, 60, 40, '#a8b8c8'); R(c, 269, 20, 2, 40, '#3c2c20');
  E(c, 160, 30, 12, 12, '#e8e0c8'); ER(c, 160, 30, 12, 12, '#3c2c20'); const hh = o.clock == null ? 15 : o.clock, mm = o.min == null ? 10 : o.min; const ah = ((hh % 12) + mm / 60) / 12 * TAU - Math.PI / 2, am = mm / 60 * TAU - Math.PI / 2; L(c, 160, 30, 160 + Math.cos(ah) * 6, 30 + Math.sin(ah) * 6, '#141414', 2); L(c, 160, 30, 160 + Math.cos(am) * 9, 30 + Math.sin(am) * 9, '#141414');
  R(c, 0, 120, W, 70, '#6c5c48'); for (let x = 0; x < W; x += 30) R(c, x, 120, 1, 70, '#5c4c3c');
  R(c, 0, 96, W, 26, '#4c3424'); R(c, 0, 94, W, 4, '#8c6c44'); for (let x = 10; x < W; x += 50) { R(c, x, 70, 2, 26, '#c8b890'); } R(c, 0, 70, W, 2, '#c8b890'); // counter with a grille
  R(c, 120, 86, 30, 8, '#3c2c1c'); for (let i = 0; i < 6; i++) { R(c, 122 + i * 4, 84, 1, 10, '#8c6c44'); E(c, 123 + i * 4, 87 + (i % 2) * 3, 1.5, 1.5, '#141414'); }
  R(c, 270, 100, 22, 22, '#2c2c2c'); R(c, 278, 60, 6, 40, '#2c2c2c'); if (!o.dark) { E(c, 281, 112, 5, 4, '#f86c2c'); glow(c, 281, 112, 20, 14, '#f8a040', 0.2); }
  if (o.dark) dim(c, o.dark, '#0c0c14');
}
// postwar Tokyo: burnt lots, shacks, a stall, a GHQ jeep passing (moves: smoke from a chimney, people, the jeep)
function postwar(c, t, o = {}) {
  VG(c, 0, 0, W, 110, ['#7c8ca0', '#a8b0b8', '#d8d0c0']);
  for (let i = 0; i < 6; i++) { const x = i * 56 - 10; R(c, x, 76 - (i % 3) * 8, 44, 40 + (i % 3) * 8, i % 2 ? '#5c5448' : '#4c4840'); R(c, x + 6, 84, 10, 8, '#2c2c2c'); PF(c, [x - 2, 78 - (i % 3) * 8, x + 22, 70 - (i % 3) * 8, x + 46, 78 - (i % 3) * 8], '#3c3830'); }
  R(c, 230, 50, 6, 30, '#3c3830'); for (let i = 0; i < 4; i++) { const u = fr(t * 0.3 + i / 4); c.save(); c.globalAlpha = 0.5 * (1 - u); E(c, 233 + u * 20, 46 - u * 30, 4 + u * 8, 3 + u * 5, '#c8c8c8'); c.restore(); }
  R(c, 0, 116, W, 74, '#8c8478'); for (let i = 0; i < 40; i++) P(c, (i * 31) % W, 120 + (i * 13) % 60, '#7c7468');
  if (o.jeep !== false) { const x = ((t * 40) % 420) - 60; R(c, x, 128, 44, 12, '#5c6c4c'); R(c, x + 6, 120, 20, 8, '#5c6c4c'); E(c, x + 8, 141, 5, 5, '#1c1c1c'); E(c, x + 36, 141, 5, 5, '#1c1c1c'); P(c, x + 20, 132, '#f8f8f0'); }
}
// the investigation HQ at Mejiro: a blackboard with the montage, desks, detectives
function hq(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c4840'); R(c, 0, 0, W, 120, '#6c665c'); R(c, 40, 22, 240, 74, '#2c3c2c'); R(c, 38, 20, 244, 3, '#8c6c44'); R(c, 38, 95, 244, 3, '#8c6c44');
  R(c, 60, 30, 40, 50, '#d8d4c8'); blit(c, hanninFace({}), 80, 56, 24, 24, { s: 0.8 }); TX(c, '帝銀毒殺犯人', 112, 36, '#e8e8e0', 16, null); for (let i = 0; i < 3; i++) R(c, 112, 60 + i * 8, 120, 1, '#a8b8a8');
  R(c, 0, 120, W, 70, '#5c5448'); R(c, 20, 126, 120, 10, '#6c4c2c'); R(c, 180, 126, 120, 10, '#6c4c2c');
}
function otaru(c, t) { VG(c, 0, 0, W, 110, ['#5c8cc8', '#a8c8e0', '#e8ecf0']); R(c, 0, 90, W, 30, '#3c5c7c'); for (let i = 0; i < 10; i++) { const x = ((i * 37 + t * 8) % 340) - 10; R(c, x, 96 + (i % 3) * 7, 12, 1, '#8cacc8'); } for (let i = 0; i < 4; i++) { const x = 20 + i * 76; R(c, x, 58, 60, 40, '#8c6c54'); PF(c, [x - 4, 60, x + 30, 44, x + 64, 60], '#5c4c44'); R(c, x + 22, 72, 16, 26, '#3c2c24'); } R(c, 0, 118, W, 72, '#a89c88'); for (let i = 0; i < 3; i++) { const u = fr(t * 0.1 + i / 3); E(c, u * 360 - 20, 30 + i * 12, 6, 2, '#f8f8f0'); } }
function platform(c, t) { VG(c, 0, 0, W, 100, ['#7c8c9c', '#a8b4c0', '#c8ccd0']); R(c, 0, 60, W, 50, '#5c5c64'); for (let i = 0; i < 6; i++) R(c, i * 56, 64, 44, 26, '#3c4c5c'); R(c, 0, 108, W, 82, '#8c8478'); R(c, 0, 106, W, 4, '#e8d870'); }
function courtroom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 0, W, 6, '#2c1c10');
  R(c, 120, 10, 80, 50, '#3c2c1c'); E(c, 160, 34, 20, 20, '#c8a048'); E(c, 160, 34, 16, 16, '#5c4428'); R(c, 158, 20, 4, 28, '#c8a048');
  R(c, 90, 64, 140, 50, '#3c2414'); R(c, 90, 64, 140, 4, '#6c4c2c'); R(c, 86, 60, 148, 6, '#5c3c24');
  R(c, 0, 150, W, 90, '#3c2c20'); for (let y = 156; y < H; y += 8) R(c, 0, y, W, 1, '#342418');
  R(c, 0, 126, W, 26, '#4c3420'); for (let x = 6; x < W; x += 12) R(c, x, 126, 4, 26, '#3c2818'); R(c, 0, 124, W, 3, '#6c4c2c');
}
function cellBg(c, t, o = {}) {
  R(c, 0, 0, W, H, '#5c5c58'); for (let y = 0; y < H; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450');
  R(c, 0, 0, W, 28, '#7c7c74'); R(c, 0, 26, W, 3, '#4c4c48'); R(c, 0, 168, W, 72, '#3c3c3c');
  for (let i = 0; i < 9; i++) R(c, 210 + i * 12, 30, 3, 140, '#2c2c30'); R(c, 206, 30, 112, 4, '#2c2c30'); R(c, 206, 96, 112, 4, '#2c2c30');
  R(c, 150, 20, 26, 18, '#c8d8e8'); for (let i = 0; i < 3; i++) R(c, 156 + i * 7, 20, 2, 18, '#3c3c3c');
}
function easel(c, x, y, t, o = {}) { L(c, x - 14, y, x - 4, y - 60, '#8c6c44', 2); L(c, x + 14, y, x + 4, y - 60, '#8c6c44', 2); R(c, x - 20, y - 58, 40, 32, '#f0ece0'); R(c, x - 18, y - 56, 36, 28, o.col || '#8cac9c'); PF(c, [x - 18, y - 32, x - 4, y - 46, x + 8, y - 36, x + 18, y - 44, x + 18, y - 28, x - 18, y - 28], '#5c7c6c'); E(c, x + 8, y - 50, 4, 4, '#f8d890'); }

/* ---- cast (1948 Japan) ---- */
const HANNIN = { id: 'hn', spk: 'hannin', top: 'jacket', coat: '#6c5444', shirt: '#e8e4d8', tie: '#3c2c24', pants: '#4c4034', shoes: '#2c2420', skin: '#d8b08c', hair: '#3c3834', hairStyle: 'side', band: true };
const HIRASAWA = { id: 'hr', spk: 'hirasawa', top: 'jacket', coat: '#5c4c3c', shirt: '#e8e4d8', tie: '#2c2c3c', pants: '#3c342c', shoes: '#2c2420', skin: '#d8b08c', hair: '#a8a8a0', hairStyle: 'side' };
const HIRA_PRISON = { id: 'hp', spk: 'hirasawa', top: 'shirt', coat: '#8c8c7c', pants: '#6c6c5c', shoes: '#3c3c3c', skin: '#d8b8a0', hair: '#e8e8e0', hairStyle: 'side' };
const DAIRI = { id: 'dr', spk: 'dairi', top: 'jacket', coat: '#2c2c34', shirt: '#f0ece4', tie: '#3c3c5c', pants: '#24242c', shoes: '#141414', skin: '#dcb090', hair: '#1c1814', hairStyle: 'side', glasses: true };
const KOIN = { id: 'ko', spk: 'koin', top: 'dress', coat: '#3c4c6c', skin: '#ecd0b4', hair: '#1c1814', hairStyle: 'long' };
const CLERKS = [['shirt', '#e8e4d8', '#2c2c34'], ['dress', '#6c4c5c', null], ['shirt', '#d8d8d0', '#3c3c44'], ['dress', '#4c5c4c', null], ['jacket', '#3c3c44', '#2c2c34'], ['dress', '#7c6c5c', null]].map(([top, coat, pants], i) => ({ id: 'cl' + i, top, coat, shirt: '#f0ece4', tie: top === 'shirt' ? '#3c2c2c' : null, pants: pants || coat, shoes: '#1c1c1c', skin: ['#dcb090', '#ecd0b4', '#d0a888'][i % 3], hair: '#1c1814', hairStyle: top === 'dress' ? 'long' : 'side' }));
const FATHER = { id: 'fa', top: 'shirt', coat: '#8c7c64', pants: '#5c5044', shoes: '#2c2420', skin: '#c8946c', hair: '#3c3830', hairStyle: 'short' };
const MOTHER = { id: 'mo', top: 'dress', coat: '#7c6c5c', skin: '#e0b898', hair: '#2c2420', hairStyle: 'long' };
const BOY = { id: 'by', kid: true, top: 'sweater', coat: '#5c6c8c', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#e8c4a0', hair: '#1c1814', hairStyle: 'short' };
const POLICE = { id: 'po', top: 'uniform', coat: '#2c3444', pants: '#2c3444', shoes: '#141414', skin: '#d8ac88', hair: '#1c1814', hat: 'police', hatCol: '#1c2434' };
const IKII = { id: 'ik', top: 'jacket', coat: '#4c4438', shirt: '#e8e4d8', tie: '#5c2c2c', pants: '#3c342c', shoes: '#1c1c1c', skin: '#c8946c', hair: '#1c1814', hairStyle: 'short', hat: 'fedora', hatCol: '#3c3428' };
const DETS = ['#3c3c44', '#4c4438', '#2c3440', '#443c34'].map((col, i) => ({ id: 'dt' + i, top: 'jacket', coat: col, shirt: '#e8e4d8', tie: '#2c2c2c', pants: col, shoes: '#141414', skin: '#d0a07c', hair: '#1c1814', hairStyle: 'short', hat: i % 2 ? 'fedora' : null, hatCol: '#2c2c2c' }));
const JUDGE = { id: 'jg', spk: 'eriguchi', top: 'jacket', coat: '#141418', shirt: '#f0f0ec', tie: '#141418', pants: '#141418', shoes: '#141414', skin: '#d8b08c', hair: '#5c5c58', hairStyle: 'side', glasses: true };
const SOLDIER = { id: 'sd', top: 'uniform', coat: '#5c5c3c', pants: '#5c5c3c', shoes: '#2c2420', skin: '#c8946c', hair: '#1c1814', hat: 'cap', hatCol: '#4c4c2c' };
const PRESS = [0, 1, 2, 3, 4].map(i => ({ id: 'pr' + i, top: 'jacket', coat: ['#4c4c54', '#5c5448', '#3c4448', '#544c40', '#484450'][i], shirt: '#e8e4d8', pants: '#2c2c2c', shoes: '#1c1c1c', skin: '#d0a07c', hair: '#1c1814', hairStyle: 'short', hat: i % 2 ? 'fedora' : null, hatCol: '#2c2c2c' }));

/* ---- portraits (48x48) ---- */
function hanninFace(o = {}) { // the man as in the wanted sketch: middle-aged, neat parted hair, calm narrow eyes, two spots on the cheek, a scar on the chin
  return SPR('hnF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7c6c' : '#d8b08c', sk2 = o.dark ? '#5c4c40' : '#b08c6c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#6c5444'); PF(c, [18, 37, 24, 44, 30, 37], '#e8e4d8'); L(c, 24, 40, 24, 48, '#3c2c24', 2);
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk);
    PF(c, [13, 16, 13, 8, 20, 5, 34, 6, 36, 12, 35, 16, 30, 10, 18, 11], '#3c3834'); L(c, 20, 6, 22, 11, '#5c5850');
    L(c, 15, 16, 21, 16, '#2c2824', 2); L(c, 27, 16, 33, 16, '#2c2824', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 20, 5, 2, '#f0e8dc'); R(c, x0 + 2, 20, 2, 2, '#141010'); L(c, x0, 19, x0 + 5, 19, '#2c2824'); }
    L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); P(c, 16, 25, '#8c6c54'); P(c, 18, 27, '#8c6c54'); L(c, 26, 34, 29, 35, '#a07c64');
    if (o.dark) { c.save(); c.globalAlpha = 0.5; R(c, 0, 0, 48, 14, '#000000'); c.restore(); }
  });
}
function hirasawaFace(o = {}) { // Hirasawa Sadamichi: an elderly painter, swept-back grey hair, round face, deep lines; o.old: prison years, white hair
  return SPR('hrF' + (o.blink || 0) + (o.old ? 'o' : '') + (o.sad ? 's' : ''), 48, 48, c => {
    const sk = '#d8b08c', sk2 = '#b08c6c', hr = o.old ? '#f0f0e8' : '#a8a8a0';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.old ? '#8c8c7c' : '#5c4c3c'); if (!o.old) { PF(c, [18, 37, 24, 44, 30, 37], '#e8e4d8'); L(c, 24, 40, 24, 48, '#2c2c3c', 2); }
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); PF(c, [12, 16, 12, 7, 24, 3, 36, 7, 36, 16, 33, 9, 15, 9], hr); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    L(c, 15, 16, 21, o.sad ? 15 : 16, hr, 2); L(c, 27, o.sad ? 15 : 16, 33, 16, hr, 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f0e8dc'); R(c, x0 + 1, 19, 3, 3, '#2c241c'); P(c, x0 + 1, 19, '#f8f8f0'); }
    L(c, 15, 24, 18, 26, sk2); L(c, 33, 24, 30, 26, sk2); L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); L(c, 17, 29, 19, 32, sk2); L(c, 31, 29, 29, 32, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); P(c, 17, 25, '#8c6c54'); P(c, 19, 26, '#8c6c54');
  });
}
function dairiFace(o = {}) { return SPR('drF' + (o.blink || 0), 48, 48, c => { const sk = '#dcb090', sk2 = '#b48c6c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c2c34'); PF(c, [18, 37, 24, 44, 30, 37], '#f0ece4'); L(c, 24, 40, 24, 48, '#3c3c5c', 2); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); PF(c, [13, 16, 13, 8, 22, 4, 35, 7, 35, 15, 30, 10, 18, 10], '#1c1814'); for (const x0 of [16, 27]) { ER(c, x0 + 2.5, 20.5, 4, 3, '#2c2c2c'); if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0 + 1, 19, 3, 3, '#141010'); } L(c, 21, 20, 23, 20, '#2c2c2c'); L(c, 24, 21, 23, 27, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); L(c, 15, 15, 21, 14, '#1c1814', 2); L(c, 27, 14, 33, 15, '#1c1814', 2); }); }
function koinFace(o = {}) { return SPR('koF' + (o.blink || 0), 48, 48, c => { const sk = '#ecd0b4', sk2 = '#c8a890'; PF(c, [6, 48, 10, 38, 38, 38, 42, 48], '#3c4c6c'); PF(c, [18, 38, 24, 43, 30, 38], '#f0ece4'); PF(c, [10, 40, 8, 18, 14, 6, 24, 3, 34, 6, 40, 18, 38, 40, 34, 40, 34, 18, 14, 18, 14, 40], '#1c1814'); R(c, 20, 31, 8, 7, sk2); E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); PF(c, [14, 14, 18, 7, 30, 7, 34, 14, 28, 10, 20, 10], '#1c1814'); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f8f0e8'); R(c, x0 + 1, 19, 3, 3, '#2c1c14'); P(c, x0 + 1, 19, '#ffffff'); } L(c, 16, 16, 21, 16, '#1c1814'); L(c, 27, 16, 32, 16, '#1c1814'); L(c, 24, 22, 23, 26, sk2); R(c, 22, 30, 5, 1, '#a8584c'); }); }
function eriguchiFace(o = {}) { return SPR('egF' + (o.blink || 0), 48, 48, c => { const sk = '#d8b08c', sk2 = '#b08c6c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#141418'); PF(c, [18, 37, 24, 44, 30, 37], '#f0f0ec'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); PF(c, [13, 14, 14, 7, 24, 4, 34, 7, 35, 14, 31, 9, 17, 9], '#5c5c58'); for (const x0 of [16, 27]) { R(c, x0 - 1, 18, 7, 5, '#c8c8c8'); R(c, x0, 19, 5, 3, '#e8ecf0'); if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0 + 2, 19, 2, 3, '#141010'); } L(c, 22, 20, 26, 20, '#c8c8c8'); L(c, 24, 21, 23, 27, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); L(c, 15, 15, 21, 15, '#3c3c38', 2); L(c, 27, 15, 33, 15, '#3c3c38', 2); L(c, 16, 28, 18, 31, sk2); L(c, 32, 28, 30, 31, sk2); }); }
function musumeFace(o = {}) { return SPR('muF' + (o.blink || 0), 48, 48, c => { const sk = '#e8c8ac', sk2 = '#c4a48c'; PF(c, [6, 48, 10, 38, 38, 38, 42, 48], '#5c4c5c'); PF(c, [12, 30, 10, 14, 16, 5, 24, 3, 32, 5, 38, 14, 36, 30, 33, 16, 15, 16], '#2c2420'); R(c, 20, 31, 8, 7, sk2); E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); PF(c, [14, 15, 18, 8, 30, 8, 34, 15, 28, 11, 20, 11], '#2c2420'); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } L(c, x0, 19, x0 + 5, 20, '#2c1c14'); R(c, x0 + 1, 20, 3, 2, '#2c1c14'); } L(c, 15, 16, 21, 17, '#2c2420'); L(c, 27, 17, 33, 16, '#2c2420'); L(c, 24, 22, 23, 26, sk2); R(c, 22, 30, 5, 1, '#8c4c44'); R(c, 18, 23, 1, 3, '#88c8f8'); }); }
const PORTRAITS = {
  hannin: p => withMouth('pmhn', hanninFace({ blink: p.blink }), p, 24, 31),
  hirasawa: p => withMouth('pmhr', hirasawaFace({ blink: p.blink }), p, 24, 31),
  dairi: p => withMouth('pmdr', dairiFace({ blink: p.blink }), p, 24, 31),
  koin: p => withMouth('pmko', koinFace({ blink: p.blink }), p, 24, 30),
  eriguchi: p => withMouth('pmeg', eriguchiFace({ blink: p.blink }), p, 24, 31),
  musume: p => withMouth('pmmu', musumeFace({ blink: p.blink }), p, 24, 30),
};
