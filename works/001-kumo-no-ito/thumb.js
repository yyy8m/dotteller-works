/* 001 蜘蛛の糸: thumbnail — Kandata's angry face, the thread snapping, sinners climbing */
function THUMB(c, t) {
  VG(c, 0, 0, TW, TH, ['#fff8d8', C.gold1, C.hell5, C.hell3, C.hell1, C.hell0]);
  thumbBurst(c, 248, 100, 24, 40, 260, DA(C.white, 0.22), 3);
  needleMountains(c, 0, 180, TW, 40, 4, C.hell1, C.hell2);
  for (let i = 0; i < 30; i++) { const x = hash(i * 5) * TW, y = 110 + hash(i * 9) * 70; P(c, x, y, i & 1 ? C.hell6 : C.hell7); }
  // the thread with sinners crowding up, snapping near the top
  const tx = 196;
  L(c, tx, 0, tx, 18, '#f4f8ff'); L(c, tx, 27, tx, 180, '#dce8f8');
  for (const [dx, dy] of [[-6, -3], [6, -2], [-4, 5], [5, 6], [0, -7], [-7, 2]]) L(c, tx, 22, tx + dx, 22 + dy, C.white);
  [[0, 128], [1, 158], [2, 186]].forEach(([v, y], i) => blit(c, sinnerSpr(v, 'climb', i), tx, y, FIG_AX, FIG_AY, { s: 0.9 }));
  // Kandata, big portrait
  E(c, 262, 104, 60, 60, DA('#000000', 0.35));
  blit(c, facePortrait('kandata', { t: 0.3, mouth: 2, blink: 0, expr: 'angry' }), 262, 104, 25, 25, { s: 2.9 });
  // shout bubble
  R(c, 232, 6, 84, 30, '#000000'); R(c, 234, 8, 80, 26, C.white); PF(c, [244, 34, 256, 34, 240, 44], '#000000'); PF(c, [246, 33, 254, 33, 243, 40], C.white);
  thumbText(c, '降りろ！', 240, 12, 16, '#c81818', C.white, 0);
  // title
  thumbText(c, '蜘蛛の糸', 10, 50, 44, C.uiY, '#000000', 3, C.hell3);
  thumbBand(c, '芥川龍之介 × ドット絵', 10, 102, 16, C.hell3, C.white);
  thumbBadge(c, 8, 130, t);
}
