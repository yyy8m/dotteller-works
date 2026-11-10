/* ================= 文庫 #005 人間椅子: cast & places ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }

/* ---- people ---- */
const YOSHIKO = { id: 'yo', robe: '#8c3c5c', robe2: '#6c2c44', trim: '#f4e8d8', sash: '#d8b84c', skin: '#f0d0b8', hair: '#1c1418', hat: 'bun', hatCol: '#c8a040', female: true };
const MAID = { id: 'md', robe: '#4c5c6c', robe2: '#3c4858', trim: '#f4f0e8', sash: '#c84c3c', skin: '#e8c4a4', hair: '#1c1418', hat: 'bun', female: true };
const OTOKO = { id: 'ot', top: 'shirt', coat: '#c8c0b0', pants: '#4c443c', skin: '#b89c7c', hair: '#2c2420', hairStyle: 'curly', heavy: false };
const GUESTS = [
  { id: 'g0', top: 'jacket', coat: '#3c3c44', shirt: '#f4f0e8', tie: '#8c2c2c', pants: '#2c2c34', skin: '#f0d4c0', hair: '#c8a060', moustache: true, heavy: true },
  { id: 'g1', top: 'dress', coat: '#c86c8c', skin: '#f4dcc8', hair: '#e8c060', hairStyle: 'curly', shoes: '#5c2c3c' },
  { id: 'g2', top: 'jacket', coat: '#5c4c3c', shirt: '#e8e4dc', tie: '#2c3c5c', pants: '#3c3428', skin: '#e8c8b0', hair: '#5c3c24', glasses: true },
  { id: 'g3', top: 'dress', coat: '#3c6c8c', skin: '#f0d4c0', hair: '#7c4c2c', hairStyle: 'long', shoes: '#2c2c3c' },
];

/* ---- the leather armchair (44x50, anchor 22,49). o.xray: show the man folded inside ---- */
function armchair(c, x, y, o = {}) {
  const s = o.s || 1, sp = cached('chair' + (o.xray ? 'x' : '') + (o.open ? 'o' : '') + (o.broken ? 'b' : ''), () => SPR(null, 44, 50, k => {
    const lea = '#8c8478', lea2 = '#6c665c', lea3 = '#a8a094';
    if (o.broken) { R(k, 4, 30, 36, 6, '#7c5c3c'); for (let i = 0; i < 4; i++) { L(k, 8 + i * 9, 30, 6 + i * 9, 20, '#8c8c94'); for (let j = 0; j < 3; j++) E(k, 7 + i * 9, 22 + j * 3, 2, 1, '#a8a8b0'); } R(k, 2, 4, 6, 26, lea2); R(k, 36, 10, 6, 20, lea2); L(k, 10, 46, 12, 36, '#5c3c24', 3); L(k, 34, 46, 32, 36, '#5c3c24', 3); return; }
    R(k, 6, 2, 32, 30, lea2); R(k, 8, 4, 28, 26, lea); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) P(k, 13 + i * 9, 9 + j * 7, lea2); // tufted back
    E(k, 22, 3, 16, 3, lea3);
    R(k, 4, 28, 36, 12, lea2); R(k, 6, 28, 32, 6, lea3); // seat cushion
    E(k, 4, 26, 5, 14, lea); E(k, 40, 26, 5, 14, lea); E(k, 4, 20, 5, 4, lea3); E(k, 40, 20, 5, 4, lea3); // round arms
    R(k, 4, 40, 36, 6, lea2); for (const lx of [7, 37]) R(k, lx - 2, 45, 4, 5, '#3c2414');
    if (o.open) { R(k, 12, 44, 20, 3, '#141010'); }
    if (o.xray) { k.save(); k.globalAlpha = 0.85; R(k, 9, 6, 26, 36, '#1c1410'); k.restore();
      // the man folded inside: knees under the seat, head and back inside the backrest
      E(k, 22, 10, 4, 4.5, '#b89c7c'); R(k, 19, 14, 7, 14, '#c8c0b0'); L(k, 20, 28, 32, 30, '#4c443c', 4); L(k, 32, 30, 30, 40, '#4c443c', 4); L(k, 25, 18, 34, 26, '#c8c0b0', 2); E(k, 34, 26, 1.5, 1.5, '#b89c7c');
      P(k, 21, 9, '#000'); P(k, 24, 9, '#000'); R(k, 32, 12, 3, 4, '#5c7c5c'); R(k, 10, 34, 5, 4, '#c8b088'); } // canteen, biscuits
  }));
  blit(c, sp, x, y, 22, 49, { s, flip: o.flip });
}
/* ---- portraits ---- */
function yoshikoFace(o = {}) {
  return SPR('yoF' + (o.blink || 0) + (o.fear ? 'f' : ''), 48, 48, c => {
    const sk = o.fear ? '#e8dcd8' : '#f0d0b8', sk2 = '#c0a090';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#8c3c5c'); PF(c, [16, 37, 24, 45, 32, 37], '#f4e8d8'); L(c, 16, 37, 24, 45, '#d8b84c');
    R(c, 20, 30, 8, 8, sk2); E(c, 24, 21, 10.5, 12.5, sk2); E(c, 23.5, 20.5, 10, 12, sk);
    E(c, 24, 8, 14, 8, '#1c1418'); R(c, 10, 8, 4, 16, '#1c1418'); R(c, 34, 8, 4, 16, '#1c1418'); E(c, 24, 2, 9, 4, '#1c1418'); R(c, 30, 1, 6, 2, '#c8a040'); // western-style bun with a comb
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, C.k); continue; } R(c, x0, 19, 4, 4, '#f8f4ec'); R(c, x0 + 1, 19, 2, o.fear ? 2 : 3, C.k); L(c, x0, 18, x0 + 4, 17, '#1c1418'); }
    L(c, 24, 23, 23, 26, sk2); if (o.fear) E(c, 24, 30, 2, 1.6, '#7c2c2c'); else R(c, 22, 30, 5, 1, '#c84c5c');
    if (!o.fear) { E(c, 18, 25, 2, 1.2, '#f0a8a8'); E(c, 30, 25, 2, 1.2, '#f0a8a8'); }
  });
}
function otokoFace(o = {}) { // the chair-maker: ugly, pale from months in the dark; only shown half in shadow
  return SPR('otF' + (o.blink || 0), 48, 48, c => {
    const sk = '#b89c7c', sk2 = '#8c7458';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#c8c0b0');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12.5, 13, sk2); E(c, 23.5, 21.5, 12, 12.5, sk);
    for (let i = 0; i < 7; i++) E(c, 12 + i * 4, 9 + (i % 2) * 2, 3, 3, '#2c2420'); // unkempt hair
    R(c, 16, 19, 5, 3, '#e8dcc8'); R(c, 18, 19, 2, 3, C.k); R(c, 28, 20, 4, 2, '#e8dcc8'); R(c, 29, 20, 2, 2, C.k); // uneven eyes
    if (o.blink === 2) { R(c, 16, 19, 5, 3, sk); R(c, 28, 20, 4, 2, sk); L(c, 16, 20, 20, 20, C.k); L(c, 28, 21, 31, 21, C.k); }
    E(c, 25, 25, 3, 2.5, sk2); R(c, 19, 30, 11, 2, '#5c3c3c'); P(c, 21, 31, '#d8d0b8'); P(c, 26, 31, '#d8d0b8'); for (let i = 0; i < 8; i++) P(c, 14 + i * 3, 16 + (i % 3) * 9, sk2);
    for (let y = 0; y < 48; y += 2) for (let x = 26; x < 48; x += 2) if (((x + y) >> 1) & 1) P(c, x, y, '#0c0808'); // half in shadow
  });
}
function maidFace(o = {}) { return SPR('mdF' + (o.blink || 0), 48, 48, c => { PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#4c5c6c'); R(c, 18, 37, 12, 4, '#f4f0e8'); R(c, 20, 30, 8, 8, '#b89474'); E(c, 24, 21, 10, 12, '#b89474'); E(c, 23.5, 20.5, 9.5, 11.5, '#e8c4a4'); E(c, 24, 8, 12, 7, '#1c1418'); E(c, 24, 2, 7, 4, '#1c1418'); for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, C.k); continue; } R(c, x0, 20, 3, 2, C.k); } R(c, 22, 29, 4, 1, '#a85c5c'); }); }
const PORTRAITS = {
  otoko: p => withMouth('pmO', otokoFace({ blink: p.blink }), p, 24, 30),
  yoshiko: p => withMouth('pmY', yoshikoFace({ blink: p.blink, fear: true }), p, 23, 29),
  jochu: p => withMouth('pmJ', maidFace({ blink: p.blink }), p, 23, 28),
};

/* ---- places ---- */
// the western-style study: a window with a pink in a pot, a desk, bookshelves, the armchair
function study(c, t, o = {}) {
  const night = o.night;
  VG(c, 0, 0, W, 150, night ? ['#141018', '#1c1820'] : ['#5c4434', '#4c3828']); for (let x = 0; x < W; x += 30) R(c, x, 0, 2, 150, night ? '#1c1418' : '#5c4030');
  R(c, 0, 116, W, 4, '#3c2818'); // wainscot
  R(c, 0, 150, W, H - 150, night ? '#2c1c1c' : '#6c2c28'); for (let i = 0; i < 12; i++) R(c, 10 + i * 26, 156 + (i % 3) * 18, 14, 2, night ? '#3c2424' : '#8c3c34'); // carpet
  // window
  R(c, 220, 24, 70, 70, '#3c2c1c'); VG(c, 224, 28, 62, 62, night ? ['#0c1424', '#1c2c44'] : ['#a8c8e8', '#e8f0f4']); R(c, 254, 28, 2, 62, '#3c2c1c'); R(c, 224, 58, 62, 2, '#3c2c1c');
  if (!night) glow(c, 255, 60, 70, 50, '#fff4d0', 0.2);
  R(c, 228, 92, 54, 4, '#5c4030'); R(c, 246, 82, 16, 10, '#a8643c'); for (let i = 0; i < 5; i++) { E(c, 248 + i * 3, 78 - (i % 2) * 3, 2.5, 2, '#f088a8'); L(c, 248 + i * 3, 80, 254, 84, '#4c8c3c'); } // the pink (撫子) in a pot
  if (o.hanky) { PF(c, [252, 76, 266, 76, 268, 90, 256, 88], '#f4f4f0'); }
  // bookshelf
  R(c, 14, 30, 60, 86, '#3c2818'); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) R(c, 18 + i * 6, 36 + r * 20, 5, 16, ['#8c2c2c', '#2c4c6c', '#6c5c2c', '#3c5c3c', '#5c3c5c'][(i + r) % 5]);
  // desk with manuscript and lamp
  R(c, 110, 108, 90, 8, '#5c3820'); R(c, 114, 116, 6, 34, '#4c2c18'); R(c, 190, 116, 6, 34, '#4c2c18'); R(c, 130, 102, 26, 6, '#f4f0e4'); L(c, 132, 104, 152, 104, '#8c8c8c');
  R(c, 176, 88, 4, 20, '#c8a040'); PF(c, [168, 88, 188, 88, 184, 78, 172, 78], '#2c6c4c'); glow(c, 178, 96, 30, 16, '#f8d880', night ? 0.5 : 0.15);
}
// the chair-maker's workshop
function workshop(c, t) {
  VG(c, 0, 0, W, 150, ['#3c3024', '#2c241c']); for (let x = 0; x < W; x += 24) R(c, x, 0, 3, 150, '#4c3c2c');
  R(c, 0, 150, W, H - 150, '#5c4c3c'); for (let i = 0; i < 30; i++) R(c, hash(i * 3) * W, 152 + hash(i * 5) * 60, 4, 1, '#c8a878'); // shavings
  R(c, 20, 50, 80, 6, '#5c4030'); for (let i = 0; i < 6; i++) { L(c, 28 + i * 12, 56, 28 + i * 12, 74, '#8c8c94', 2); R(c, 26 + i * 12, 54, 4, 4, '#6c4c2c'); } // tools on the wall
  R(c, 230, 40, 40, 40, '#a8c8e0'); R(c, 249, 40, 2, 40, '#3c2c1c'); glow(c, 250, 120, 80, 40, '#f8e0b0', 0.2);
}
function hotelLounge(c, t) {
  VG(c, 0, 0, W, 150, ['#3c2c44', '#5c4454']); for (let x = 0; x < W; x += 40) { R(c, x, 0, 4, 150, '#6c5464'); R(c, x + 18, 20, 6, 60, '#c8a040'); }
  for (const cx of [80, 240]) { L(c, cx, 0, cx, 24, '#c8a040'); E(c, cx, 28, 18, 6, '#f8e8a0'); for (let i = 0; i < 6; i++) E(c, cx - 15 + i * 6, 34, 1.5, 3, '#fff8d8'); glow(c, cx, 30, 50, 30, '#f8e0a0', 0.3); } // chandeliers
  R(c, 120, 40, 80, 50, '#5c4030'); VG(c, 124, 44, 72, 42, ['#3c6c4c', '#8cac6c']); // an oil painting
  R(c, 0, 150, W, H - 150, '#7c1c24'); for (let i = 0; i < 16; i++) R(c, i * 20, 150, 10, H - 150, '#8c242c');
  R(c, 200, 120, 60, 30, '#4c2c1c'); E(c, 230, 120, 30, 4, '#5c3c24'); for (let i = 0; i < 4; i++) E(c, 216 + i * 9, 112, 3, 4, ['#f86c8c', '#f8d860', '#c86cf8', '#f8f8f8'][i]); // flowers on a table
}
