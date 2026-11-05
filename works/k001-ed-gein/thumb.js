/* 記録 #001 エド・ゲイン: thumbnail — his face, red glow, the farmhouse in the snow */
function THUMB(c, t) {
  VG(c, 0, 0, TW, TH, ['#0c0206', '#2c060a', '#5c0c10', '#2c060a', '#0c0206']);
  thumbBurst(c, 252, 88, 26, 36, 260, DA(K.red0, 0.22), 7);
  moon(c, 300, 18, 8, 0);
  R(c, 0, 170, TW, 10, K.snow2); R(c, 0, 168, TW, 3, K.snow1);
  snowfall(c, 2.0, 40, 21, 8, 12);
  // the face (right half)
  E(c, 252, 92, 70, 76, DA('#000000', 0.45)); E(c, 252, 86, 58, 58, DA(K.red1, 0.28));
  blit(c, geinFace({ expr: 'smile' }), 252, 92, 25, 25, { s: 3.0 });
  // left: title, hook, badge
  thumbText(c, 'エド・', 10, 14, 40, C.white, '#000000', 3, K.red1);
  thumbText(c, 'ゲイン', 10, 56, 40, C.white, '#000000', 3, K.red1);
  thumbBand(c, '『サイコ』のモデル', 6, 102, 16, K.red1, C.white);
  thumbBadge(c, 8, 130, t);
}
