/* thumbnail: the tent at night, slashed from the inside, nine sets of footprints running off, an orange light above */
function tentIcon() {
  return SPR('tentIcon', 48, 48, c => {
    VG(c, 0, 0, 48, 48, ['#02040c', '#0c1830', '#1c2c48']); for (let i = 0; i < 14; i++) P(c, hash(i * 7) * 48, hash(i * 3) * 20, '#8c9cbc');
    E(c, 36, 9, 4, 4, '#f8a040'); E(c, 36, 9, 2, 2, '#fff0c0');
    PF(c, [0, 34, 48, 26, 48, 48, 0, 48], '#2c3448');
    PF(c, [8, 34, 13, 22, 33, 20, 38, 30], '#5c6454'); PF(c, [13, 22, 33, 20, 32, 23, 14, 25], '#7c8468');
    for (const x of [17, 24, 31]) { PF(c, [x, 23, x + 2, 26, x + 1, 32, x - 1, 28], '#000000'); L(c, x, 23, x + 1, 31, '#d8d8c8'); }
    for (let i = 0; i < 9; i++) { const u = i / 9; E(c, 8 - u * 6 + (i % 3), 38 + u * 9, 1, 0.6, '#8c9cbc'); }
  }, null, null);
}
function THUMB(c, t) { thumbBigFace(c, { face: tentIcon(), s: 3.6, rim: '#f88c2c', rimA: 0.4, title: ['死の山', '9人の謎'], hook: '内側から裂かれた', bg: ['#02040c', '#0c1830'] }, t); }
