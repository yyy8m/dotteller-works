/* 記録 #002 ジョン・ゲイシー: thumbnail — Pogo's face in the dark, red balloons */
function THUMB(c, t) {
  VG(c, 0, 0, TW, TH, ['#06040a', '#140812', '#2c0a14', '#140812', '#06040a']);
  thumbBurst(c, 246, 90, 28, 34, 260, DA(K.red0, 0.18), 11);
  [[194, 40, '#e83c3c', '#a01c1c'], [300, 30, '#e83c3c', '#a01c1c'], [306, 120, '#c81818', '#7c0c10']].forEach(([x, y, a, b], i) => balloon(c, x, y, a, b, 0.5, i));
  E(c, 246, 92, 70, 76, DA('#000000', 0.5)); E(c, 246, 86, 58, 58, DA(K.red1, 0.22));
  blit(c, pogoFace({ expr: 'creepy' }), 246, 96, 25, 25, { s: 3.0 });
  c.fillStyle = DA('#000000', 0.45); c.fillRect(170, 14, 150, 34); c.fillStyle = DA('#000000', 0.2); c.fillRect(170, 48, 150, 14); // shadow from above
  c.fillStyle = DA(K.red0, 0.16); c.fillRect(186, 96, 120, 40); // red light from below
  thumbText(c, '殺人', 10, 12, 44, C.white, '#000000', 3, K.red1);
  thumbText(c, 'ピエロ', 10, 58, 44, '#f8e070', '#000000', 3, K.red1);
  thumbBand(c, 'ジョン・ゲイシー', 6, 108, 16, K.red1, C.white);
  thumbBadge(c, 8, 134, t);
}
