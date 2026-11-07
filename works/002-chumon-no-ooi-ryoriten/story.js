/* ================= 文庫 #002 注文の多い料理店: story plan ================= */
const EXPR = {};
['L0', 'L1', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L17', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'smile']]);
['L2', 'L2b', 'L3', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L18'].forEach(id => EXPR[id] = [[0, 'normal']]);
['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4', 'A5', 'B5', 'B6', 'H1', 'C1', 'C2'].forEach(id => EXPR[id] = [[0, 'normal']]);
EXPR.A6 = [[0, 'cream']]; EXPR.B6 = [[0, 'cream']]; EXPR.A7 = [[0, 'scared']]; EXPR.B7 = [[0, 'scared']]; EXPR.C3 = [[0, 'grin']];
const SPEAKERS_EXTRA = {
  hige: { name: 'ひげの紳士', bg: ['#5c1c1c', '#8c2c24'] }, megane: { name: 'めがねの紳士', bg: ['#5c2c1c', '#8c4c2c'] },
  neko1: { name: '山猫の子分', bg: ['#1c2c4c', '#2c4c7c'] }, neko2: { name: '山猫の子分', bg: ['#1c2c4c', '#2c4c7c'] }, ryoushi: { name: '猟師', bg: ['#4c4024', '#6c5c34'] },
};
const HOOK = ['扉を開けるたびに増える', '奇妙な注文――'];
const PLAN_FULL = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: SA, pre: 1.0, items: ['L1', 0.5, 'A1', 0.3, 'B1'], tr: 'dither', td: 1.2 },
  { sc: SB, pre: 0.6, items: ['L2', 0.5, 'L2b', 0.5, 'A2', 0.3, 'B2'], tr: 'dither', td: 1.0 },
  { sc: SC, pre: 0.6, items: ['L3', 0.5, 'A3', 0.3, 'B3'], tr: 'dither', td: 1.0 },
  { sc: SD, pre: 0.6, items: ['L4', 0.5, 'A4'], tr: 'dither', td: 1.2 },
  { sc: SE, pre: 0.8, items: ['L5', 0.4, 'B4', 0.5, 'L6', 0.4, 'A5'], tr: 'iris', td: 1.0 },
  { sc: SF, pre: 0.6, items: ['L7', 0.4, 'B5'], tr: 'blinds', td: 0.8 },
  { sc: SG, pre: 0.6, items: ['L8'], tr: 'blinds', td: 0.8 },
  { sc: SH, pre: 0.6, items: ['L9', 0.4, 'A6'], tr: 'blinds', td: 0.8 },
  { sc: SI, pre: 0.6, items: ['L10', 0.4, 'B6'], tr: 'blinds', td: 0.8 },
  { sc: SJ, pre: 0.8, items: ['L11', 0.6, 'A7', 0.3, 'B7'], tr: 'dither', td: 1.0 },
  { sc: SK, pre: 0.8, items: ['L12', 0.6, 'C1', 0.4, 'C2', 0.4, 'C3'], tr: 'dither', td: 1.0 },
  { sc: SL, pre: 0.6, items: ['L13'], tr: 'dither', td: 0.8 },
  { sc: SM, pre: 0.4, items: ['L14', 0.5, 'L15'], tr: 'white', td: 0.6 },
  { sc: SN, pre: 0.8, items: ['L16', 0.5, 'H1', 0.4, 'L17'], tr: 'dither', td: 1.2 },
  { sc: SO, pre: 1.2, items: ['L18'], tr: 'dither', td: 1.2 },
];
const PLAN_SHORT = [
  { sc: SE, pre: 0.4, items: ['S1'], tr: 'fromBlack', td: 0.4 },
  { sc: SJ, pre: 0.3, items: ['L11', 0.3, 'B7'], tr: 'blinds', td: 0.6 },
  { sc: SK, pre: 0.3, items: ['C3', 0.4, 'S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
SA.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.5 + k * 0.45, 'step'); };
SB.sfx = (S, ev) => { ev(S.tLost, 'excl'); for (let k = 0; k < 5; k++) ev(S.tLost + 1.3 + k * 0.4, 'step'); ev(S.tDizzy, 'sting'); ev(S.tDead, 'thump'); ev(S.tDead + 0.3, 'drop'); };
SC.sfx = (S, ev) => { ev(S.tWind, 'wind', 5); };
SD.sfx = (S, ev) => { ev(S.tHouse, 'shine', 1.4); ev(S.tSign, 'excl'); };
const doorSfx = (S, ev) => { S.signs.forEach(s => { if (s[0] > 0.1) { ev(s[0] - 0.3, 'door'); ev(s[0] + 0.1, 'type'); } }); };
[SE, SF, SG, SH, SI].forEach(sc => sc.sfx = doorSfx);
SG.sfx = (S, ev) => { doorSfx(S, ev); ev(S.tLock, 'stamp'); };
SJ.sfx = (S, ev) => { doorSfx(S, ev); if (S.tStop < 1e8) ev(S.tStop, 'sting'); if (S.tShake < 1e8) for (let k = 0; k < 6; k++) ev(S.tShake + k * 0.6, 'heart'); };
SK.sfx = (S, ev) => { ev(S.tSign, 'type'); ev(S.tEyes, 'sting'); for (let k = 0; k < 8; k++) ev(S.tEyes + 0.8 + k * 0.9, 'heart'); };
SL.sfx = (S, ev) => { ev(0.5, 'drop'); };
SM.sfx = (S, ev) => { ev(S.tBurst, 'slam'); ev(S.tBurst + 0.1, 'hit'); ev(S.tJump, 'jump'); if (S.tDark < 1e8) { ev(S.tDark + 1.2, 'sting'); ev(S.tVanish, 'whoosh'); } };
SN.sfx = (S, ev) => { ev(0.4, 'wind', 4); if (S.tHunter < 1e8) for (let k = 0; k < 6; k++) ev(S.tHunter + k * 0.45, 'step'); };
SO.sfx = (S, ev) => { ev(S.tEnd, 'end'); };
SO.bgmTrack = (S, tr) => { tr.fin = 3; };
SO.ending = true;
SK.wideDY = 0; SL.wideDY = 8; SO.wideDY = 8;
function TITLE_DECO(c, t) { // a door with a gold sign on the right
  R(c, 262, 150, 50, 70, '#5c3c24'); R(c, 266, 154, 42, 66, '#7c5434'); R(c, 270, 166, 34, 14, '#1c140c'); TX(c, '山猫軒', 271, 165, '#f8d860', 8, null);
}
[SE, SF, SG, SH, SI, SJ].forEach(sc => sc.tallFit = true);
