/* ================= 文庫 #002 注文の多い料理店: close-up cuts on the key lines ================= */
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) return fn(c, t, S); return base.call(this, c, t, S); }; return sc; }
const forestBg = ['#2c1c14', '#a8642c'], hallBg = ['#2c241c', '#8c7c64'], darkBg = ['#05040a', '#1c1c2c'];
withCuts(SA, [['A1', (c, t) => closeUp(c, t, gentFace(0, { blink: blinkOf(t, 3) }), { bg: forestBg, glow: '#f8c060' })]]);
withCuts(SC, [['A3', (c, t) => closeUp(c, t, gentFace(0, { blink: blinkOf(t, 5) }), { bg: ['#1c1424', '#5c4c6c'], glow: '#c8a8c8' })]]);
withCuts(SH, [['A6', (c, t) => closeUp(c, t, gentFace(0, { cream: true, blink: blinkOf(t, 7) }), { bg: hallBg, glow: '#fff8e0' })]]);
withCuts(SJ, [['B7', (c, t) => closeUp(c, t, gentFace(1, { cream: true, scared: true }), { bg: ['#1c0408', '#7c1c1c'], glow: '#f84040', lines: '#f8c0c0', after: (c2, tt) => redVignette(c2, 0.35) })]]);
withCuts(SK, [['C3', (c, t) => closeUp(c, t, bossFace({ lick: (Math.floor(t * 2) & 1) === 1, blink: blinkOf(t, 9) }), { bg: darkBg, glow: '#f86c1c', after: (c2, tt) => {
  // napkin on the chest, knife and fork in the hands
  PF(c2, [128, 176, 192, 176, 200, 210, 120, 210], '#f8f8f4'); L(c2, 100, 210, 108, 150, '#d8dce4', 3); for (let k = 0; k < 3; k++) L(c2, 216 + k * 3, 150, 216 + k * 3, 162, '#d8dce4'); L(c2, 219, 162, 214, 210, '#d8dce4', 3);
} })]]);
withCuts(SN, [['H1', (c, t) => closeUp(c, t, hunterFace({ blink: blinkOf(t, 11) }), { bg: forestBg, glow: '#f8e0a0' })]]);
