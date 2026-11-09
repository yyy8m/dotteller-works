/* ================= 記録 #005 三億円事件: story plan ================= */
const EXPR = {};
['F1', 'F2', 'D1', 'B1', 'C0', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5b', 'L6', 'L7', 'L8', 'L9', 'L11', 'L12', 'L13', 'L14', 'L15', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L26', 'L28', 'L29', 'L30', 'L31', 'L33', 'L34', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]);
['C1', 'L5', 'L10', 'L16', 'L25', 'L27', 'L32'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { fake: { name: '白バイの男', bg: ['#141c2c', '#34405c'] }, driver: { name: '輸送車の運転手', bg: ['#1c1c24', '#3c4048'] }, banker: { name: '銀行員', bg: ['#141c30', '#2c3448'] } };
const HOOK = ['3分で、3億円が消えた', '犯人は、白バイ警官――'];
const PLAN_FULL = [
  { sc: SX, pre: 0.4, items: ['F1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.4 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: SA, pre: 1.0, items: ['L1', 0.6, 'L2'], tr: 'dither', td: 1.2 },
  { sc: SB, pre: 0.8, items: ['L3', 0.8, 'L4', 1.0, 'L5', 0.8, 'L5b'], tr: 'dither', td: 1.0 },
  { sc: SC, pre: 0.8, items: ['L6'], tr: 'blinds', td: 1.0 },
  { sc: SD, pre: 0.6, items: ['L7', 0.6, 'L8', 0.6, 'L9'], tr: 'dither', td: 0.8 },
  { sc: SE, pre: 0.4, items: ['D1', 0.4, 'F2', 0.8, 'L10', 0.6, 'L11'], tr: 'dither', td: 0.8 },
  { sc: SF, pre: 0.6, items: ['L12', 0.4, 'F1', 0.6, 'L13'], tr: 'dither', td: 0.6 },
  { sc: SG, pre: 0.6, items: ['L14', 0.8, 'L15', 1.4, 'L16', 1.2, 'L17', 0.8, 'L18', 0.4, 'B1', 0.6, 'L19'], tr: 'dither', td: 1.0 },
  { sc: SH, pre: 0.8, items: ['L20'], tr: 'blinds', td: 1.0 },
  { sc: SI, pre: 0.6, items: ['L21'], tr: 'dither', td: 1.0 },
  { sc: SJ, pre: 0.8, items: ['L22', 0.6, 'L23'], tr: 'dither', td: 1.0 },
  { sc: SK, pre: 0.8, items: ['L24', 1.0, 'L25'], tr: 'dither', td: 1.0 },
  { sc: SL, pre: 0.8, items: ['L26', 1.0, 'L27'], tr: 'dither', td: 1.2 },
  { sc: SM, pre: 1.0, items: ['L28'], tr: 'dither', td: 1.2 },
  { sc: SN, pre: 0.8, items: ['L29', 0.6, 'L30', 0.8, 'L31'], tr: 'dither', td: 1.0 },
  { sc: SO, pre: 1.2, items: ['L32', 1.2, 'L33', 1.2, 'L34'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SF, pre: 0.2, items: ['F1'], tr: 'dither', td: 0.4 },
  { sc: SG, pre: 0.2, items: ['L14'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
SX.sfx = (S, ev) => { ev(0.1, 'burn', 4); ev(0.2, 'sting'); for (let k = 0; k < 6; k++) ev(0.5 + k * 0.3, 'step'); if (S.tGo < 1e8) { ev(S.tGo, 'door'); ev(S.tGo + 0.3, 'whoosh'); } };
SA.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(S.tSum + 2.4, 'sparkle'); };
SB.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(S.tOpen, 'creak'); ev(S.tLetter, 'sting'); for (let k = 0; k < 6; k++) ev(S.tWatch + 0.6 + k * 1.0, 'heart'); ev(S.tNote, 'stamp'); };
SC.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(1.4 + k * 1.4, 'thump'); ev(S.tLeave - 0.4, 'door'); ev(S.tLeave, 'whoosh'); };
SD.sfx = (S, ev) => { ev(S.tBike, 'whoosh'); ev(S.tBike + 0.6, 'whoosh'); ev(S.tStop, 'sting'); };
SE.sfx = (S, ev) => { ev(0.2, 'heart'); ev(S.tOut, 'door'); ev(S.tKey, 'sting'); };
SF.sfx = (S, ev) => { ev(S.tFire, 'burn', 5); ev(S.tFire, 'sting'); if (S.tRun < 1e8) for (let k = 0; k < 8; k++) ev(S.tRun + k * 0.28, 'step'); };
SG.sfx = (S, ev) => { ev(S.tGo - 0.3, 'door'); ev(S.tGo, 'whoosh'); ev(S.tGo + 0.5, 'whoosh'); if (S.tWait < 1e8) for (let k = 0; k < 5; k++) ev(S.tWait + 0.4 + k * 0.9, 'heart'); if (S.tFlare < 1e8) ev(S.tFlare, 'burn', 3); if (S.tFake < 1e8) ev(S.tFake, 'stamp'); if (S.tClock < 1e8) for (let k = 0; k < 8; k++) ev(S.tClock + 0.4 + k * 0.5, 'tick'); };
SG.bgmTrack = (S, tr) => { if (S.tWait < 1e8) { tr.mute = [S.tWait, S.tFlare]; } };
SH.sfx = (S, ev) => { ev(0.3, 'stamp'); for (let k = 0; k < 6; k++) ev(0.8 + k * 1.2, 'tick'); };
SI.sfx = (S, ev) => { ev(0.4, 'wind', 4); ev(S.tSwap + 3.4, 'whoosh'); };
SJ.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(0.6 + k * 1.3, 'stamp'); ev(S.tMass, 'whoosh'); };
SK.sfx = (S, ev) => { ev(0.4, 'thump'); ev(S.tOther, 'sting'); };
SL.sfx = (S, ev) => { ev(S.tCops, 'stamp'); if (S.tMan < 1e8) ev(S.tMan, 'toll'); };
SM.sfx = (S, ev) => { for (let k = 0; k < 7; k++) ev(k * 0.5, 'tick'); ev(S.tStamp, 'gavel'); };
SN.sfx = (S, ev) => { ev(0.3, 'sparkle'); ev(S.tBank, 'stamp'); ev(S.tGoro, 'excl'); };
SO.sfx = (S, ev) => { ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.3, 'whoosh'); ev(1.2, 'whoosh'); };
SS2.sfx = (S, ev) => { ev(lastSe(S) - 1.4, 'stamp'); };
SO.bgmTrack = (S, tr) => { tr.fin = 3; };
SO.ending = true;
// the cars and people stand on the road (y 116-160): keep them above the dialog window
SX.wideDY = 36; SD.wideDY = 36; SE.wideDY = (t, S) => (t > S.tKey ? 24 : 36); SF.wideDY = 36; SG.wideDY = (t, S) => (t > S.tClock ? 16 : t > S.tCall ? 30 : t > S.tFlare ? 36 : 36); SC.wideDY = 20; SI.wideDY = 36; SO.wideDY = 18; SA.wideDY = 30; SN.wideDY = (t, S) => (t > S.tBank ? 16 : 36);
SJ.wideDY = 20; SK.wideDY = 10; SL.wideDY = (t, S) => (t > S.tMan ? 30 : 8); SM.wideDY = 10; SH.wideDY = 12; SB.wideDY = (t, S) => (t < S.tLetter ? 30 : t < S.tWatch ? 18 : 30);
function TITLE_DECO(c, t) { blit(c, bikeSpr({ rider: true }), 270, 222, 30, 39); trailingSheet(c, 244, 210, t, -1, 22); }
