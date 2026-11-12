/* ================= 記録 #009 アンドレイ・チカチーロ: helpers, cast, places & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function softBeam(c, x, y, ang, len, half, a = 0.3, col = '#fff4c8') { const p = (r, k) => [x + Math.cos(ang + k) * r, y + Math.sin(ang + k) * r]; c.save(); c.globalAlpha = a * 0.5; PF(c, [x, y, ...p(len, -half), ...p(len, half)], col); c.globalAlpha = a; PF(c, [x, y, ...p(len * 0.9, -half * 0.5), ...p(len * 0.9, half * 0.5)], col); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function plate(c, x, y, w, h, title, col = '#2c3c5c') { R(c, x, y, w, h, '#f4f0e4'); R(c, x, y, w, 18, col); TX(c, title, x + 6, y + 1, '#f4f0e8', 16, null); }

/* ---- people (modFig 36x58) ---- */
const CHIKA = { id: 'chk', top: 'jacket', coat: '#4c4c50', shirt: '#e0dcd0', tie: '#3c3c4c', pants: '#3c3c40', shoes: '#1c1c1c', skin: '#e0b898', hair: '#8c8884', hairStyle: 'side', glasses: true };
const CHIKA_COAT = { ...CHIKA, id: 'chkc', top: 'shirt', coat: '#5c5448' };
const CHIKA_YOUNG = { id: 'chky', kid: true, top: 'shirt', coat: '#8c7c5c', pants: '#5c5040', shoes: '#3c2c1c', skin: '#e8c4a4', hair: '#5c4434', hairStyle: 'side' };
const MILITIA = [0, 1, 2, 3].map(i => ({ id: 'mil' + i, top: 'uniform', coat: '#5c6c7c', pants: '#3c4c5c', skin: ['#e8c0a0', '#e0b090', '#f0c8a8', '#dcac88'][i], hair: '#3c2c1c', hat: 'police', hatCol: '#3c4c5c' }));
const PLAIN = [0, 1, 2, 3].map(i => ({ id: 'pl' + i, top: 'jacket', coat: ['#3c3c34', '#2c3440', '#4c3c34', '#343c34'][i], shirt: '#d8d4c8', pants: '#2c2c2c', skin: ['#e8c0a0', '#e0b090', '#f0c8a8', '#dcac88'][i], hair: ['#1c1814', '#5c4434', '#3c2c1c', '#8c6c44'][i], hairStyle: 'short', hat: i % 2 ? 'fedora' : null, hatCol: '#2c2c2c' }));
const FOLK = ['#7c4c3c', '#3c5c4c', '#5c5c7c', '#7c6c4c', '#4c4c5c', '#6c3c4c'].map((col, i) => ({ id: 'fo' + i, top: i % 3 === 0 ? 'dress' : 'sweater', coat: col, pants: '#3c3c40', skin: ['#e8c0a0', '#f0c8a8', '#dcac88', '#e8c4a4', '#d8a884', '#f0d0b0'][i], hair: ['#3c2818', '#c8a060', '#1c1814', '#6c4c2c', '#2c1c14', '#a87c4c'][i], hairStyle: i % 3 === 0 ? 'long' : 'short' }));
const BURAKOV = { id: 'bur', top: 'jacket', coat: '#3c3c44', shirt: '#e8e4dc', tie: '#5c2c2c', pants: '#2c2c34', skin: '#e0b898', hair: '#5c4434', hairStyle: 'side', moustache: true };

/* ---- places & props ---- */
function grayDusk(c, h = 120, o = {}) { VG(c, 0, 0, W, h, o.night ? ['#04060c', '#0c1424', '#1c2434'] : o.snow ? ['#8c949c', '#a8b0b8', '#c8ccd0'] : ['#3c3c54', '#7c6c74', '#c89c84']); }
// a strip of thin birch/poplar trees along the railway (the "forest strip")
function forestStrip(c, t, y = 128, o = {}) {
  R(c, 0, y - 46, W, 46, o.night ? '#0c140c' : '#2c3c2c');
  for (let i = 0; i < 40; i++) { const x = (i * 23 + (i % 3) * 7) % (W + 20) - 10, h = 50 + hash(i) * 36; L(c, x, y, x + Math.sin(t * 0.6 + i) * 1.5, y - h, o.night ? '#1c241c' : (i % 4 ? '#5c5448' : '#c8c4b8'), 2); E(c, x, y - h + 6, 7 + hash(i * 3) * 5, 10, o.night ? '#142014' : ['#3c5c34', '#4c6c3c', '#5c6c3c'][i % 3]); }
}
// a small country platform with a station sign and lamp
function platform(c, t, o = {}) {
  grayDusk(c, 120, o); forestStrip(c, t, 120, o);
  R(c, 0, 120, W, 12, '#5c5c5c'); for (let x = 0; x < W; x += 10) R(c, x, 128, 6, 3, '#3c3024'); R(c, 0, 126, W, 2, '#8c8c94'); R(c, 0, 131, W, 2, '#8c8c94'); // rails
  R(c, 0, 134, W, 106, '#7c7c78'); R(c, 0, 134, W, 3, '#a8a8a0'); for (let x = 0; x < W; x += 24) R(c, x, 137, 1, 60, '#6c6c68');
  if (o.sign !== false) { R(c, 220, 82, 2, 52, '#3c3c3c'); R(c, 252, 82, 2, 52, '#3c3c3c'); R(c, 196, 74, 84, 18, '#2c4c8c'); R(c, 198, 76, 80, 14, '#f4f0e8'); TX(c, o.sign || 'ドンレスホース', 200, 75, '#2c3c6c', 16, null); }
  R(c, 60, 70, 3, 66, '#2c2c2c'); R(c, 56, 68, 12, 4, '#2c2c2c'); if (o.night) glow(c, 62, 76, 30, 22, '#f8e0a0', 0.45);
}
// a green commuter train (elektrichka), side view
function trainCar(c, x, y, o = {}) { R(c, x, y - 40, 150, 34, '#3c6c4c'); R(c, x, y - 40, 150, 4, '#2c4c3c'); R(c, x, y - 18, 150, 3, '#c8a048'); for (let i = 0; i < 6; i++) { R(c, x + 10 + i * 22, y - 34, 14, 12, o.lit ? '#f8e0a0' : '#8ca4b8'); } R(c, x + 136, y - 36, 10, 26, '#2c3c34'); for (const wx of [24, 126]) { E(c, x + wx, y - 4, 6, 6, '#1c1c1c'); E(c, x + wx, y - 4, 2, 2, '#8c8c8c'); } }
function hut(c, x, y, o = {}) { R(c, x, y - 34, 70, 34, '#8c7c5c'); for (let k = y - 30; k < y; k += 4) R(c, x, k, 70, 1, '#7c6c4c'); PF(c, [x - 6, y - 34, x + 35, y - 60, x + 76, y - 34], '#a8946c'); for (let i = 0; i < 12; i++) L(c, x - 4 + i * 6.5, y - 36, x + 35, y - 58, '#8c7c54'); R(c, x + 10, y - 24, 14, 12, o.lit ? '#f8d880' : '#2c3444'); R(c, x + 42, y - 26, 16, 26, '#4c3c2c'); }
function classroom(c, t) { R(c, 0, 0, W, H, '#a8b4a0'); for (let x = 0; x < W; x += 30) R(c, x, 0, 1, 160, '#9ca894'); R(c, 40, 30, 200, 70, '#2c4c3c'); R(c, 36, 26, 208, 4, '#8c6c44'); R(c, 36, 100, 208, 4, '#8c6c44'); TX(c, 'Русский язык', 60, 48, '#e8ece0', 16, null); R(c, 0, 150, W, 90, '#7c6448'); for (let i = 0; i < 4; i++) { R(c, 30 + i * 70, 170, 50, 6, '#6c4c30'); } }
// card index drawers (25,000 names)
function cardIndex(c, t, n) { R(c, 0, 0, W, H, '#2c2820'); for (let r = 0; r < 4; r++) for (let i = 0; i < 8; i++) { const x = 20 + i * 36, y = 40 + r * 30; R(c, x, y, 32, 26, '#7c5c34'); R(c, x + 12, y + 12, 8, 3, '#c8a048'); R(c, x + 4, y + 4, 24, 5, '#f4f0e4'); } }
function bloodCard(c, x, y, label, type, col, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 96, 70, '#f4f0e4'); R(c, x, y, 96, 18, col); TX(c, label, x + 6, y + 1, '#ffffff', 16, null); const s = textSpr(type, 32, col); c.drawImage(s, Math.round(x + 48 - s.width / 2), y + 26); c.restore(); }
function cage(c, x, y, w, h) { for (let i = 0; i <= w; i += 8) R(c, x + i, y, 2, h, '#3c3c40'); R(c, x, y, w + 2, 3, '#3c3c40'); R(c, x, y + h / 2, w + 2, 2, '#3c3c40'); }
function sovietMap(c, t) { R(c, 0, 0, W, H, '#0c1828'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10203a'); PF(c, [10, 70, 60, 40, 140, 30, 230, 20, 310, 30, 316, 120, 260, 150, 180, 160, 120, 140, 70, 150, 30, 130], '#8c8470'); PL(c, [10, 70, 60, 40, 140, 30, 230, 20, 310, 30, 316, 120, 260, 150, 180, 160, 120, 140, 70, 150, 30, 130, 10, 70], '#5c5444'); }
const SPOTS = { rostov: [62, 120], moscow: [76, 66], tashkent: [176, 150], sverdlovsk: [150, 62], zaporozhye: [44, 116], leningrad: [72, 44] };

/* ---- portraits (48x48) ---- */
// Chikatilo: long face, big glasses, thinning grey hair combed to the side, a pale tired look; dark = from below
function chikaFace(o = {}) {
  return SPR('chF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.cry ? 'c' : '') + (o.cage ? 'g' : '') + (o.bald ? 'b' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7464' : '#e4c0a0', sk2 = o.dark ? '#4c3830' : '#b08c6c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#4c4c50'); PF(c, [17, 37, 24, 47, 31, 37], '#e0dcd0'); L(c, 24, 40, 24, 48, '#3c3c4c', 2);
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 21, 11, 15, sk2); E(c, 23.5, 20.5, 10.5, 14.5, sk); E(c, 13, 22, 2, 4, sk2); E(c, 35, 22, 2, 4, sk2);
    if (!o.bald) { PF(c, [13, 14, 14, 7, 22, 4, 30, 5, 35, 10, 35, 15, 30, 9, 20, 9, 15, 12], '#9c9894'); L(c, 16, 8, 30, 6, '#b8b4b0'); } else { E(c, 24, 8, 10, 4, sk); R(c, 12, 12, 3, 8, '#9c9894'); R(c, 33, 12, 3, 8, '#9c9894'); }
    for (const x0 of [15, 26]) { R(c, x0, 15, 9, 8, '#1c1c1c'); R(c, x0 + 1, 16, 7, 6, o.dark ? '#5c6c7c' : '#c8d8e0'); if (o.blink === 2) L(c, x0 + 2, 19, x0 + 6, 19, '#2c1c14'); else { R(c, x0 + 3, 18, 3, 2, C.k); } P(c, x0 + 2, 16, '#ffffff'); }
    R(c, 23, 18, 3, 1, '#1c1c1c'); L(c, 24, 22, 23, 28, sk2); P(c, 25, 28, sk2);
    if (o.cry) { R(c, 18, 23, 1, 4, '#88c8f8'); R(c, 29, 23, 1, 4, '#88c8f8'); R(c, 20, 31, 8, 1, '#7c4c3c'); P(c, 19, 32, '#7c4c3c'); P(c, 28, 32, '#7c4c3c'); }
    else R(c, 20, 31, 8, 1, '#7c4c3c');
    L(c, 16, 26, 17, 31, sk2); L(c, 32, 26, 31, 31, sk2); // hollow cheeks
    if (o.dark) { for (let y = 2; y < 16; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808'); }
    if (o.cage) for (let x = 2; x < 48; x += 9) R(c, x, 0, 2, 48, '#2c2c30');
  });
}
// Viktor Burakov: tired eyes, moustache, short dark hair
function burakovFace(o = {}) {
  return SPR('buF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b898', sk2 = '#ac8464';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#3c3c44'); PF(c, [18, 37, 24, 46, 30, 37], '#e8e4dc'); L(c, 24, 39, 24, 48, '#5c2c2c', 2);
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [12, 18, 13, 9, 22, 5, 32, 6, 36, 14, 34, 11, 24, 9, 16, 11], '#4c3828');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 17, '#3c2818'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 2, '#f4f0e8'); R(c, x0 + 1, 19, 2, 2, C.k); L(c, x0, 22, x0 + 4, 22, sk2); }
    L(c, 24, 22, 23, 26, sk2); PF(c, [18, 28, 24, 27, 30, 28, 28, 30, 20, 30], '#4c3828'); R(c, 21, 32, 6, 1, '#7c4c3c');
  });
}
// Alexander Bukhanovsky: full beard, glasses, kind eyes
function bukhaFace(o = {}) {
  return SPR('bkF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#b88c6c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c4c3c'); PF(c, [18, 37, 24, 44, 30, 37], '#f0ece4');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [12, 18, 13, 8, 22, 4, 32, 5, 36, 14, 34, 10, 24, 8, 16, 10], '#3c2c24'); PF(c, [12, 24, 14, 34, 20, 40, 28, 40, 34, 34, 36, 24, 32, 28, 24, 30, 16, 28], '#4c3c30'); E(c, 24, 30, 4, 1.4, '#7c4c3c');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 17, 7, 6, '#2c2c2c'); R(c, x0, 18, 5, 4, '#d8e4ec'); if (o.blink === 2) L(c, x0, 20, x0 + 4, 20, '#2c1c14'); else R(c, x0 + 1, 19, 2, 2, C.k); }
    R(c, 22, 19, 4, 1, '#2c2c2c'); L(c, 24, 23, 23, 26, sk2);
  });
}
// Judge Leonid Akubzhanov: dark hair, stern face, a dark suit
function judgeFace(o = {}) {
  return SPR('jgF' + (o.blink || 0), 48, 48, c => {
    const sk = '#dcac88', sk2 = '#a87c5c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c1c24'); PF(c, [18, 37, 24, 46, 30, 37], '#e8e4dc'); L(c, 24, 39, 24, 48, '#3c3c5c', 2);
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [12, 20, 12, 10, 20, 4, 30, 4, 36, 10, 36, 20, 33, 11, 24, 8, 15, 11], '#1c1814');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 17, '#1c1814'); L(c, x0 - 1, 15, x0 + 4, 16, '#1c1814'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 2, '#f4f0e8'); R(c, x0 + 1, 19, 2, 2, C.k); }
    L(c, 24, 22, 23, 26, sk2); R(c, 20, 31, 8, 2, '#5c2c2c'); L(c, 16, 27, 18, 31, sk2); L(c, 32, 27, 30, 31, sk2);
  });
}
const PORTRAITS = {
  burakov: p => withMouth('pmbu', burakovFace({ blink: p.blink }), p, 24, 31),
  bukha: p => withMouth('pmbk', bukhaFace({ blink: p.blink }), p, 24, 29),
  judge: p => withMouth('pmjg', judgeFace({ blink: p.blink }), p, 24, 31),
};
