/* ================= 記録 #016 ジェフリー・ダーマー: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || ''), weapon: o.weapon || null }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f) + (o.weapon || '')), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function fumes(c, t, x, y, n = 8, col = '#8c9c5c') { for (let i = 0; i < n; i++) { const u = fr(t * 0.3 + i / n); E(c, x + Math.sin(t + i * 1.7) * 12 + u * 10, y - u * 60, 4 + u * 10, 2 + u * 5, DA(col, 0.35 * (1 - u))); } }

/* ---- cast ---- */
const JEFF = { id: 'jf', spk: 'dahmer', top: 'shirt', coat: '#8c8c7c', pants: '#3c3c44', shoes: '#2c2018', skin: '#ecc8a4', hair: '#c8a060', hairStyle: 'side', glasses: true, moustache: true };
const JEFF_KID = { id: 'jk', kid: true, top: 'tee', coat: '#5c7c9c', pants: '#3c3c5c', shoes: '#2c2018', skin: '#f0c8a8', hair: '#d8b070', hairStyle: 'side' };
const JEFF_JAIL = { ...JEFF, id: 'jj', coat: '#e8845c', pants: '#e8845c' };
const JEFF_ARMY = { ...JEFF, id: 'ja', top: 'uniform', coat: '#5c6c3c', pants: '#4c5c34', hat: 'cap', hatCol: '#4c5c34', moustache: false, glasses: false };
const DAD = { id: 'dd', top: 'jacket', coat: '#3c4c5c', shirt: '#f0ece4', tie: '#5c2c2c', pants: '#2c3440', shoes: '#141414', skin: '#ecc8a4', hair: '#5c4c3c', hairStyle: 'side', glasses: true };
const MOM = { id: 'mm', top: 'dress', coat: '#8c5c6c', skin: '#ecc8a4', hair: '#5c3c24', hairStyle: 'curly' };
const GRAN = { id: 'gr', top: 'sweater', coat: '#8c8ca8', skin: '#ecc8a4', hair: '#d8d8d8', hairStyle: 'curly' };
const HIKER = { id: 'hk', top: 'tee', coat: '#c84c3c', pants: '#3c4c6c', shoes: '#2c2018', skin: '#ecc8a4', hair: '#8c5c3c', hairStyle: 'long' };
const EDW = { id: 'ed', top: 'tee', coat: '#e8e4dc', pants: '#2c3c5c', shoes: '#141414', skin: '#7c5034', hair: '#141010', hairStyle: 'short' };
const COPS = [0, 1, 2].map(i => ({ id: 'cp' + i, top: 'uniform', coat: '#1c2c4c', pants: '#142040', shoes: '#141414', skin: ['#ecc4a4', '#e0b090', '#8c5c3c'][i], hair: '#3c2818', hairStyle: 'short', hat: 'police', hatCol: '#1c2c4c' }));
const HAZ = [0, 1].map(i => ({ id: 'hz' + i, top: 'uniform', coat: '#e8d040', pants: '#e8d040', shoes: '#3c3c3c', skin: '#ecc4a4', hair: '#e8d040', hairStyle: 'short', glasses: true, hat: 'cap', hatCol: '#e8d040' }));
const WOMEN = ['#c84c7c', '#5c9c5c', '#e8a83c'].map((col, i) => ({ id: 'wm' + i, top: 'dress', coat: col, skin: ['#7c5034', '#8c5c3c', '#a8744c'][i], hair: '#141010', hairStyle: i === 1 ? 'curly' : 'long' }));
const CROWD = ['#c84c3c', '#3c7cc8', '#e8b83c', '#5c9c4c', '#9c5cac'].map((col, i) => ({ id: 'cr' + i, top: i % 2 ? 'tee' : 'shirt', coat: col, pants: '#2c2c34', shoes: '#2c2018', skin: ['#7c5034', '#ecc4a4', '#8c5c3c', '#e0b090', '#a8744c'][i], hair: '#141010', hairStyle: 'short' }));
const RESSLER = { id: 'rs', top: 'jacket', coat: '#2c2c34', shirt: '#f0ece4', tie: '#2c3c6c', pants: '#24242c', shoes: '#141414', skin: '#ecc4a4', hair: '#c8c8c8', hairStyle: 'side', glasses: true };

/* ---- places & props ---- */
function nightSky(c, t, o = {}) { VG(c, 0, 0, W, 120, o.dusk ? ['#2c2448', '#7c4c5c', '#d8885c'] : ['#05060f', '#0e1430', '#1c2444']); if (!o.dusk) for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 70, '#c8d0e8'); }
function apartment(c, t, x, y, o = {}) { R(c, x, y - 96, 150, 96, '#8c7464'); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) { const wx = x + 12 + k * 34, wy = y - 86 + r * 28; R(c, wx, wy, 22, 16, '#1c1c24'); const lit = o.lit213 && r === 1 && k === 1 ? 1 : hash(r * 9 + k + Math.floor(t * 0.2)) > 0.6; if (lit) { R(c, wx + 2, wy + 2, 18, 12, o.lit213 && r === 1 && k === 1 ? '#c8d878' : '#f8d880'); } } R(c, x + 60, y - 30, 30, 30, '#3c2c24'); R(c, x + 52, y - 36, 46, 6, '#5c4c3c'); TX(c, 'OXFORD', x + 48, y - 56, '#f0e8d4', 16, '#000000'); if (o.fence) { for (let k = 0; k < 20; k++) L(c, x - 20 + k * 10, y, x - 20 + k * 10, y - 60, '#8c8c94'); L(c, x - 20, y - 60, x + 170, y - 60, '#8c8c94'); } }
function street(c, t, y = 150) { R(c, 0, y, W, H - y, '#2c2c30'); R(c, 0, y, W, 4, '#5c5c64'); for (let i = 0; i < 3; i++) { const x = 30 + i * 130; R(c, x, y - 64, 3, 64, '#1c1c1c'); glow(c, x + 1, y - 62, 16, 10, '#f8e8b0', 0.35 + 0.05 * Math.sin(t * 5 + i)); } }
function room213(c, t, o = {}) { R(c, 0, 0, W, H, '#4c4434'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#544a38'); R(c, 0, 150, W, 90, '#2c2418'); glow(c, 160, 30, 120, 50, '#f8e0a0', 0.12 + 0.04 * Math.sin(t * 2)); if (o.tank !== false) tank(c, t, o.tx || 30, 96); if (o.fridge !== false) fridge(c, o.fx || 250, 150, t); if (o.photos) for (let i = 0; i < o.photos; i++) { const px = 110 + (i % 6) * 18, py = 30 + Math.floor(i / 6) * 22; R(c, px, py, 14, 18, '#e8e4dc'); R(c, px + 2, py + 2, 10, 10, ['#5c3c3c', '#3c3c4c', '#4c2c2c'][i % 3]); } fumes(c, t, 270, 90, 6, '#7c8c4c'); }
function tank(c, t, x, y) { R(c, x, y, 70, 44, '#2c3c44'); R(c, x + 2, y + 2, 66, 40, '#1c5c7c'); for (let i = 0; i < 3; i++) { const fx = x + 10 + mod(t * (10 + i * 4) + i * 20, 50), fy = y + 12 + i * 9; E(c, fx, fy, 4, 2, ['#e84c3c', '#3c8cf8', '#e8c83c'][i]); PF(c, [fx - 4, fy, fx - 8, fy - 3, fx - 8, fy + 3], ['#e84c3c', '#3c8cf8', '#e8c83c'][i]); } for (let i = 0; i < 5; i++) { const u = fr(t * 0.5 + i / 5); P(c, x + 56, y + 40 - u * 36, '#a8d8f8'); } R(c, x, y + 44, 70, 6, '#3c2c1c'); }
function fridge(c, x, y, t, open = 0) { R(c, x, y - 70, 40, 70, '#d8d8d0'); R(c, x + 2, y - 68, 36, 24, '#e8e8e0'); R(c, x + 2, y - 42, 36, 40, '#e8e8e0'); R(c, x + 32, y - 60, 3, 10, '#8c8c8c'); R(c, x + 32, y - 34, 3, 14, '#8c8c8c'); if (open > 0) { R(c, x + 2, y - 42, 36 * (1 - open), 40, '#e8e8e0'); glow(c, x + 20, y - 22, 20, 16, '#e8f8ff', 0.4 * open); } }
function drum(c, x, y) { R(c, x - 14, y - 34, 28, 34, '#2c5cc8'); R(c, x - 15, y - 36, 30, 4, '#141414'); for (let k = 0; k < 2; k++) R(c, x - 14, y - 24 + k * 12, 28, 2, '#1c4ca8'); }
function bottlesJar(c, x, y, t) { R(c, x, y - 18, 12, 18, DA('#c8e8c8', 0.7)); R(c, x + 1, y - 20, 10, 3, '#5c5c5c'); E(c, x + 6, y - 8, 3, 2, '#e8e4dc'); P(c, x + 5, y - 12, '#e8e4dc'); }
function boneMound(c, x, y) { for (let i = 0; i < 16; i++) { const bx = x + (hash(i) - 0.5) * 40, by = y - hash(i * 3) * 10; L(c, bx - 4, by, bx + 4, by - 2, '#e8e4d8', 2); E(c, bx - 4, by, 1.5, 1.5, '#e8e4d8'); } }
function handcuff(c, x, y, s = 1) { ER(c, x, y, 5 * s, 5 * s, '#c8c8d0'); ER(c, x + 12 * s, y, 5 * s, 5 * s, '#c8c8d0'); L(c, x + 4 * s, y, x + 8 * s, y, '#c8c8d0', 2); }
function polaroid(c, x, y, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 22, 26, '#f0ece4'); R(c, x + 2, y + 2, 18, 17, '#3c2c2c'); R(c, x + 6, y + 8, 8, 6, '#5c3c3c'); c.restore(); }
function tape(c, t, x, y) { R(c, x, y, 60, 34, '#2c2c34'); E(c, x + 18, y + 16, 8, 8, '#8c8c94'); E(c, x + 42, y + 16, 8, 8, '#8c8c94'); const a = t * 4; L(c, x + 18, y + 16, x + 18 + Math.cos(a) * 6, y + 16 + Math.sin(a) * 6, '#2c2c34', 2); L(c, x + 42, y + 16, x + 42 + Math.cos(a) * 6, y + 16 + Math.sin(a) * 6, '#2c2c34', 2); R(c, x + 50, y + 4, 4, 4, '#e81c1c'); }

/* ---- portraits (48x48) ---- */
function jeffFace(o = {}) {
  return SPR('jfF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.jail ? 'j' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7464' : '#ecc8a4', sk2 = o.dark ? '#4c3c34' : '#b8906c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.jail ? '#e8845c' : '#8c8c7c'); PF(c, [18, 37, 24, 43, 30, 37], o.jail ? '#c86c44' : '#6c6c5c');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    PF(c, [12, 18, 13, 8, 20, 4, 30, 4, 36, 9, 36, 16, 32, 10, 18, 9, 14, 14], o.dark ? '#7c6440' : '#c8a060'); R(c, 13, 8, 10, 3, o.dark ? '#7c6440' : '#d8b070');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 16, 8, 6, '#5c4c3c'); R(c, x0, 17, 6, 4, o.dark ? '#5c5c64' : '#c8ccd0'); if (o.blink === 2) { L(c, x0 + 1, 19, x0 + 5, 19, '#2c1c14'); continue; } R(c, x0 + 2, 18, 2, 2, o.dark ? '#c81818' : '#3c4c5c'); } L(c, 23, 19, 26, 19, '#5c4c3c');
    L(c, 24, 22, 23, 26, sk2); PF(c, [18, 28, 24, 27, 30, 28, 28, 29, 20, 29], o.dark ? '#5c4428' : '#a8844c'); R(c, 21, 31, 6, 1, '#8c4c3c');
    if (o.dark) for (let y = 2; y < 14; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808');
  });
}
const PORTRAITS = { dahmer: p => withMouth('pmjf', jeffFace({ blink: p.blink, dark: true }), p, 24, 31) };
