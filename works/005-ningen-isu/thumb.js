function chairIcon() { return SPR('chairIcon', 48, 48, c => { VG(c, 0, 0, 48, 48, ['#1c1410', '#3c2c20']); armchair(c, 24, 47, { s: 1, xray: true }); }, null, null); }
function THUMB(c, t) { thumbBigFace(c, { face: chairIcon(), s: 3.6, rim: '#c84c6c', rimA: 0.45, title: ['人間椅子'], hook: '椅子の中に、男がいた', bg: ['#0c0608', '#3c1c24'] }, t); }
