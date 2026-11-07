/* ================= 文庫 #003 杜子春: close-up cuts on the key lines ================= */
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) {
  const base = sc.draw;
  sc.draw = function (c, t, S) {
    for (const [id, fn] of cuts) if (inLine(S, t, id)) return fn(c, t, S);
    return base.call(this, c, t, S);
  };
  return sc;
}
const sunsetBg = ['#3c1c2c', '#c8784c'], nightBg = ['#05060f', '#1c2040'], hellBg = ['#0c0204', '#4c0c0c'];
withCuts(ZA, [['T1', (c, t) => closeUp(c, t, toshiFace({ blink: blinkOf(t, 3) }), { bg: sunsetBg, glow: '#f8c060' })]]);
withCuts(ZB, [['K1', (c, t) => closeUp(c, t, tekkanFace({ blink: blinkOf(t, 5) }), { bg: sunsetBg, glow: '#f8c060' })]]);
withCuts(ZG, [['T4', (c, t) => closeUp(c, t, toshiFace({ blink: blinkOf(t, 7) }), { bg: nightBg, glow: '#c8c8f8' })],
              ['K4', (c, t) => closeUp(c, t, tekkanFace({ blink: blinkOf(t, 9) }), { bg: ['#1c1408', '#8c6c2c'], glow: '#fff0b0', lines: '#f8e8a0' })]]);
withCuts(ZI, [['K5', (c, t) => closeUp(c, t, tekkanFace({ blink: blinkOf(t, 11), stern: true }), { bg: nightBg, glow: '#8c8cc8' })]]);
withCuts(ZL, [['J1', (c, t) => closeUp(c, t, shinshoFace(), { bg: ['#1c0c04', '#7c4c0c'], glow: '#f8c040', lines: '#f8c040' })]]);
withCuts(ZM, [['E1', (c, t) => closeUp(c, t, enmaFace(), { bg: hellBg, glow: '#f84c2c', after: (c2, tt) => { for (let i = 0; i < 8; i++) flame(c2, 10 + i * 44, 240, 10, tt, i); } })]]);
withCuts(ZP, [['M1', (c, t) => closeUp(c, t, hahaFace({ blink: blinkOf(t, 13) }), { bg: ['#140810', '#4c3c5c'], glow: '#f8f0d0' })],
              ['T6', (c, t) => closeUp(c, t, toshiFace({ cry: true }), { bg: ['#2c0c14', '#c8a0a0'], glow: '#ffffff', lines: '#ffffff' })]]);
withCuts(ZQ, [['T8', (c, t) => closeUp(c, t, toshiFace({ blink: blinkOf(t, 15) }), { bg: sunsetBg, glow: '#f8e0a0' })]]);
