/* ================= 記録 #018 グリコ・森永事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || ''), weapon: o.weapon || null }), o.col || '#0a0a10', 'gsh' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f) + (o.weapon || '')), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast (1984) ---- */
const KAI = { id: 'kai', spk: 'kaijin', top: 'jacket', coat: '#2c2c34', shirt: '#4c4c54', pants: '#24242c', shoes: '#141414', skin: '#c8a888', hair: '#141414', hairStyle: 'short', hat: 'fedora', hatCol: '#1c1c24' };
const FOX = { id: 'fx', top: 'jacket', coat: '#5c5c54', shirt: '#e8e4dc', pants: '#3c3c3c', shoes: '#2c2420', skin: '#e0b894', hair: '#2c2420', hairStyle: 'short' };
const PRES = { id: 'pr', top: 'shirt', coat: '#e8e4dc', pants: '#3c3c44', skin: '#e8c4a0', hair: '#2c2420', hairStyle: 'side', glasses: true };
const WIFE = { id: 'wf', top: 'dress', coat: '#8c6c8c', skin: '#ecc8a4', hair: '#2c2018', hairStyle: 'long' };
const MOM = { id: 'mo', top: 'sweater', coat: '#8c8ca8', skin: '#e8c4a0', hair: '#c8c8c8', hairStyle: 'curly' };
const DETS = [0, 1, 2].map(i => ({ id: 'dt' + i, top: 'jacket', coat: ['#3c4c5c', '#4c4434', '#2c3440'][i], shirt: '#e8e4dc', tie: ['#5c2c2c', '#2c3c6c', '#3c5c3c'][i], pants: '#2c2c34', shoes: '#141414', skin: ['#e8c4a0', '#e0b090', '#ecc8a4'][i], hair: '#141414', hairStyle: i === 1 ? 'side' : 'short' }));
const POL = [0, 1].map(i => ({ id: 'po' + i, top: 'uniform', coat: '#2c3c5c', pants: '#24304c', shoes: '#141414', skin: ['#e8c4a0', '#e0b090'][i], hair: '#141414', hairStyle: 'short', hat: 'police', hatCol: '#24304c' }));
const MAN = { id: 'mn', top: 'shirt', coat: '#8cacc8', pants: '#3c3c44', skin: '#e0b090', hair: '#141414', hairStyle: 'short' };
const WOMAN = { id: 'wo', top: 'dress', coat: '#c86c6c', skin: '#ecc8a4', hair: '#2c2018', hairStyle: 'long' };
const CROWD = ['#c84c3c', '#3c7cc8', '#e8b83c', '#5c9c4c', '#9c5cac', '#8c8c8c', '#5c5c7c'].map((col, i) => ({ id: 'cr' + i, top: ['shirt', 'tee', 'jacket', 'sweater', 'dress', 'shirt', 'jacket'][i], coat: col, shirt: '#e8e4dc', pants: '#2c2c34', shoes: '#2c2018', skin: ['#ecc4a4', '#e0b090', '#ecc8a4', '#e8c0a0', '#f0c8a8', '#e0b894', '#e8c4a0'][i], hair: '#141010', hairStyle: i === 4 ? 'long' : 'short' }));

/* ---- places & props ---- */
function citySky(c, o = {}) { VG(c, 0, 0, W, 140, o.night ? ['#080c20', '#141c3c', '#2c3458'] : o.dusk ? ['#2c2848', '#8c5c5c', '#e89c5c'] : ['#6c9cd0', '#a0c4e4', '#dce8ec']); if (o.night) for (let i = 0; i < 24; i++) P(c, hash(i) * W, hash(i * 3) * 60, '#8c94b0'); }
function skyline(c, y, o = {}) { const n = o.night; for (let i = 0; i < 12; i++) { const x = i * 28 - 6, h = 30 + (i * 37 % 40); R(c, x, y - h, 26, h, n ? ['#1c2030', '#242838', '#1c1c2c'][i % 3] : ['#8c94a0', '#a0a4ac', '#7c8490'][i % 3]); for (let r = 0; r < h / 8 - 1; r++) for (let k = 0; k < 3; k++) if (hash(i * 31 + r * 7 + k) > 0.45) R(c, x + 4 + k * 7, y - h + 4 + r * 8, 3, 3, n ? '#f8d880' : '#5c6c7c'); } }
function sweetBox(c, x, y, col, o = {}) { R(c, x, y - 18, 14, 18, col); R(c, x, y - 18, 14, 4, shadeCol(col, 1.3)); R(c, x + 3, y - 12, 8, 5, '#f8f0e0'); if (o.label) { R(c, x + 1, y - 10, 12, 8, '#f8f8f0'); for (let k = 0; k < 3; k++) R(c, x + 2, y - 9 + k * 2, 10, 1, '#c81818'); } }
const BOXC = ['#e83c3c', '#f8c83c', '#3c8ce8', '#e87cac', '#5cb85c', '#8c5c3c'];
function shelf(c, t, o = {}) { R(c, 0, 0, W, H, '#d8d4c8'); for (let x = 0; x < W; x += 40) R(c, x, 0, 1, 30, '#c8c4b8'); R(c, 0, 26, W, 6, '#f8f8f0'); glow(c, 160, 20, 160, 16, '#ffffff', 0.4); for (let r = 0; r < 3; r++) { const y = 66 + r * 38; R(c, 10, y, 300, 4, '#8c8c94'); R(c, 10, y + 4, 300, 2, '#5c5c64'); for (let i = 0; i < 19; i++) { const lab = o.labels && o.labels.includes(r * 19 + i); if (o.empty && (i + r) % 5 !== 0) continue; sweetBox(c, 14 + i * 16, y, BOXC[(i + r * 2) % 6], { label: lab }); } } R(c, 0, 168, W, 20, '#a8a49c'); }
function letterSpr(id, lines, o = {}) { const w = Math.max(...lines.map(s => textSpr(s, 16, '#000').width)) + 18; return SPR('ltr' + id, w, 22 + lines.length * 18, x => { R(x, 0, 0, w, 22 + lines.length * 18, o.bg || '#f4f0e4'); R(x, 0, 0, w, 1, '#c8c0b0'); lines.forEach((s, i) => TX(x, s, 8, 10 + i * 18, o.col || '#2c2c3c', 16, null)); }); }
function showLetter(c, t, t0, id, lines, x = 90, y = 40, o = {}) { const k = eOut(sg(t, t0, t0 + 0.4)); if (k <= 0) return; const sp = letterSpr(id, lines, o); c.save(); c.globalAlpha = k; blit(c, sp, x + sp.width / 2, y + sp.height / 2 + (1 - k) * 16, sp.width / 2, sp.height / 2, { rot: (o.rot || -0.03) }); c.restore(); }
function phone(c, x, y, ring = 0) { const sh = ring ? Math.round(Math.sin(ring * 60) * 1.5) : 0; R(c, x + sh, y - 14, 30, 14, '#2c2c2c'); R(c, x - 2 + sh, y - 22, 34, 8, '#3c3c3c'); E(c, x + 15 + sh, y - 7, 5, 5, '#e8e4dc'); if (ring) for (let k = 0; k < 3; k++) L(c, x + 34 + k * 4, y - 26 - k * 2, x + 38 + k * 4, y - 30 - k * 3, '#f8e070'); }
function car(c, x, y, col = '#e8e8e0', o = {}) { const d = o.flip ? -1 : 1; R(c, x - 30, y - 16, 60, 12, col); PF(c, [x - 18, y - 16, x - 12, y - 28, x + 14, y - 28, x + 22, y - 16], col); R(c, x - 10, y - 26, 10, 9, '#2c3c5c'); R(c, x + 2, y - 26, 10, 9, '#2c3c5c'); for (const wx of [-18, 18]) { E(c, x + wx, y - 4, 6, 6, '#141414'); E(c, x + wx, y - 4, 2, 2, '#8c8c8c'); } if (o.lights) { E(c, x + d * 29, y - 11, 2, 2, '#fff8c0'); beam(c, x + d * 30, y - 11, o.flip ? Math.PI : 0, 60, 0.18, 0.25); } if (o.police) { R(c, x - 30, y - 10, 60, 4, '#1c1c1c'); const b = Math.floor((o.t || 0) * 6) & 1; R(c, x - 6, y - 32, 12, 4, b ? '#e81c1c' : '#8c1c1c'); glow(c, x, y - 30, 20, 10, '#e81c1c', b ? 0.4 : 0.1); } }
function van(c, x, y, o = {}) { R(c, x - 36, y - 26, 72, 22, '#e8e8e4'); R(c, x + 20, y - 24, 14, 10, '#2c3c5c'); R(c, x - 36, y - 6, 72, 3, '#a8a8a4'); for (const wx of [-22, 22]) { E(c, x + wx, y - 4, 6, 6, '#141414'); E(c, x + wx, y - 4, 2, 2, '#8c8c8c'); } }
function trainIn(c, t, o = {}) { R(c, 0, 0, W, H, '#c8c4b4'); R(c, 0, 20, W, 8, '#8c8c84'); for (let i = 0; i < 4; i++) { const x = 10 + i * 80; R(c, x, 40, 64, 46, '#3c3c3c'); VG(c, x + 2, 42, 60, 42, o.night ? ['#141c3c', '#2c3c5c'] : ['#8cb4d8', '#c8dce8']); const ox = mod(-t * 160 + i * 50, 140) - 40; R(c, x + 2 + Math.max(0, ox), 70, 10, 14, o.night ? '#2c2c3c' : '#5c7c4c'); } R(c, 0, 100, W, 46, '#5c7c5c'); for (let x = 0; x < W; x += 12) R(c, x, 100, 1, 46, '#4c6c4c'); R(c, 0, 146, W, 34, '#7c7c74'); for (let i = 0; i < 8; i++) { R(c, 20 + i * 38, 30, 2, 10, '#5c5c5c'); ER(c, 21 + i * 38, 44, 4, 5, '#5c5c5c'); } }
function fence(c, y, o = {}) { L(c, 0, y, W, y, '#8c8c94', 2); for (let x = 0; x < W; x += 16) L(c, x, y, x, y + 14, '#7c7c84'); L(c, 0, y + 8, W, y + 8, '#7c7c84'); }
function cloth(c, t, x, y) { PF(c, [x, y, x + 14 + Math.sin(t * 5) * 2, y + 2, x + 13 + Math.sin(t * 5 + 1) * 3, y + 16, x, y + 14], '#f4f4f0'); }
function money(c, x, y, n) { for (let i = 0; i < n; i++) { R(c, x, y - (i + 1) * 4, 22, 4, i % 2 ? '#b8a87c' : '#c8b88c'); R(c, x + 8, y - (i + 1) * 4 + 1, 6, 2, '#8c7c5c'); } }
function goldBar(c, x, y) { PF(c, [x, y, x + 3, y - 6, x + 17, y - 6, x + 20, y], '#e8c040'); R(c, x + 4, y - 5, 12, 1, '#f8e898'); }
function tapeRec(c, x, y, t) { R(c, x, y, 70, 40, '#3c3c44'); R(c, x + 6, y + 6, 58, 20, '#1c1c24'); for (const wx of [22, 48]) { E(c, x + wx, y + 16, 7, 7, '#8c8c94'); const a = t * 5; L(c, x + wx, y + 16, x + wx + Math.cos(a) * 5, y + 16 + Math.sin(a) * 5, '#2c2c34'); } for (let k = 0; k < 4; k++) R(c, x + 8 + k * 14, y + 30, 10, 6, k === 1 ? '#c81818' : '#8c8c94'); }
function radioSet(c, x, y, t, dig) { R(c, x, y, 60, 34, '#2c2c34'); R(c, x + 6, y + 6, 30, 12, dig ? '#3cc85c' : '#8cc8a0'); if (dig) TX(c, '0101', x + 7, y + 4, '#0c2c14', 16, null); E(c, x + 48, y + 14, 6, 6, '#5c5c64'); L(c, x + 50, y, x + 56, y - 26, '#8c8c94', 2); const ph = fr(t); c.save(); c.globalAlpha = 1 - ph; ER(c, x + 56, y - 26, 4 + ph * 16, 3 + ph * 10, '#f8e8b0'); c.restore(); }
function houseExt(c, t, o = {}) { const n = o.night; citySky(c, o); R(c, 0, 150, W, 40, n ? '#2c2c34' : '#8c8c84'); R(c, 40, 80, 120, 70, n ? '#5c5850' : '#d8d0c0'); PF(c, [30, 82, 100, 54, 170, 82], n ? '#2c3040' : '#4c5060'); R(c, 180, 90, 110, 60, n ? '#545048' : '#d0c8b8'); PF(c, [172, 92, 235, 66, 298, 92], n ? '#2c3040' : '#4c5060'); for (const [x, y, lit] of [[60, 100, 1], [110, 100, 0], [200, 106, 1], [250, 106, 0]]) { R(c, x, y, 24, 18, lit && n ? '#f8d880' : n ? '#1c1c24' : '#8cacc8'); R(c, x + 11, y, 2, 18, '#3c3c3c'); if (lit && n) glow(c, x + 12, y + 9, 20, 14, '#f8d880', 0.25); } R(c, 0, 132, W, 18, n ? '#3c3c40' : '#a8a49c'); for (let x = 0; x < W; x += 20) R(c, x, 132, 1, 18, n ? '#2c2c30' : '#8c8880'); }

/* ---- portraits (48x48) ---- */
function kaiFace(o = {}) { // the faceless "21面相": fedora, upturned collar, a shadow for a face, two pale eyes
  return SPR('kaiF' + (o.blink || 0), 48, 48, c => {
    PF(c, [2, 48, 6, 34, 42, 34, 46, 48], '#2c2c34'); PF(c, [10, 34, 18, 26, 24, 40], '#3c3c44'); PF(c, [38, 34, 30, 26, 24, 40], '#24242c');
    E(c, 24, 22, 10, 12, '#1c1820'); E(c, 24, 26, 8, 8, '#242028');
    R(c, 6, 12, 36, 4, '#141418'); PF(c, [12, 12, 14, 2, 34, 2, 36, 12], '#1c1c24'); R(c, 13, 9, 22, 2, '#5c2c2c');
    if (o.blink !== 2) { R(c, 17, 20, 4, 2, '#e8e0c8'); R(c, 27, 20, 4, 2, '#e8e0c8'); P(c, 18, 20, '#141414'); P(c, 28, 20, '#141414'); } else { R(c, 17, 21, 4, 1, '#5c5c64'); R(c, 27, 21, 4, 1, '#5c5c64'); }
    L(c, 20, 30, 28, 29, '#5c3c3c');
  });
}
function foxFace(o = {}) { // a police-sketch style face: narrow slanting eyes (pencil on paper)
  return SPR('foxF' + (o.paper ? 'p' : ''), 48, 48, c => {
    const ink = o.paper ? '#3c3c44' : '#2c2420', sk = o.paper ? '#e8e4dc' : '#e0b894', sk2 = o.paper ? '#b8b4ac' : '#b88c6c';
    if (o.paper) R(c, 0, 0, 48, 48, '#f0ece4');
    PF(c, [4, 48, 10, 37, 38, 37, 44, 48], o.paper ? '#a8a49c' : '#5c5c54'); PF(c, [19, 37, 24, 44, 29, 37], o.paper ? '#f0ece4' : '#e8e4dc');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 21, 10, 13, sk2); E(c, 23.5, 20.5, 9.5, 12.5, sk);
    PF(c, [13, 16, 14, 7, 22, 4, 32, 5, 35, 11, 35, 16, 31, 10, 20, 9], o.paper ? '#5c5c64' : '#2c2420');
    L(c, 16, 21, 21, 19, ink, 2); L(c, 27, 19, 32, 21, ink, 2); L(c, 16, 18, 21, 16, ink); L(c, 27, 16, 32, 18, ink);
    L(c, 24, 21, 23, 26, sk2); R(c, 21, 26, 4, 1, sk2); R(c, 20, 30, 8, 1, ink);
    if (o.paper) for (let i = 0; i < 40; i++) P(c, 8 + hash(i) * 32, 6 + hash(i * 3) * 36, '#d8d4cc');
  });
}
const PORTRAITS = { kaijin: p => withMouth('pmkai', kaiFace({ blink: p.blink }), p, 24, 30) };
