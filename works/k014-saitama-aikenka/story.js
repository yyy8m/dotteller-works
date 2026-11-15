/* ================= 記録 #014 埼玉愛犬家連続殺人事件: story plan ================= */
const EXPR = {};
['M1', 'C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L27'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { smale: { name: '男S', bg: ['#1c0c0c', '#4c1c1c'] } };
const HOOK = ['埼玉愛犬家連続殺人事件', '遺体なき殺人――'];
const PLAN_FULL = [
  { sc: KX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: KA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3', 0.8, 'L4'], tr: 'dither', td: 1.2 },
  { sc: KB, pre: 0.8, items: ['L5', 0.8, 'L6', 0.8, 'L7', 0.8, 'L8'], tr: 'dither', td: 1.0 },
  { sc: KC, pre: 0.8, items: ['L9', 0.6, 'M1', 0.8, 'L10', 0.8, 'L11'], tr: 'dither', td: 1.0 },
  { sc: KD, pre: 0.8, items: ['L12', 0.8, 'L13', 0.8, 'L14'], tr: 'dither', td: 1.0 },
  { sc: KE, pre: 1.0, items: ['L15', 0.8, 'L16'], tr: 'blinds', td: 1.0 },
  { sc: KF, pre: 0.8, items: ['L17', 0.8, 'L18'], tr: 'dither', td: 1.0 },
  { sc: KG, pre: 0.8, items: ['L19', 0.8, 'L20', 0.8, 'L21', 0.8, 'L22'], tr: 'dither', td: 1.0 },
  { sc: KH, pre: 0.8, items: ['L23', 0.8, 'L24', 0.8, 'L25'], tr: 'dither', td: 1.0 },
  { sc: KI, pre: 1.0, items: ['L26', 1.0, 'L27'], tr: 'iris', td: 1.4 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: KE, pre: 0.3, items: ['L15', 0.4, 'L16'], tr: 'dither', td: 0.5 },
  { sc: KG, pre: 0.3, items: ['L19', 0.4, 'L21'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
KX.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(0.6, 'toll'); for (let k = 0; k < 4; k++) if (S.tGone < 1e8) ev(S.tGone + k * 1.2, 'breath'); if (S.tClear < 1e8) ev(S.tClear + 0.4, 'stamp'); };
KA.sfx = (S, ev) => { ev(0.4, 'sparkle'); ev(1.2, 'step'); if (S.tDebt < 1e8) for (let k = 0; k < 5; k++) ev(S.tDebt + 0.5 + k * 0.4, 'drop'); if (S.tScam < 1e8) ev(at(S, 'L4', 5) + 0.3, 'stamp'); };
KB.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tAngry < 1e8) ev(at(S, 'L6', 1), 'stamp'); if (S.tCall < 1e8) ev(S.tCall + 0.3, 'door'); if (S.tPoison < 1e8) ev(S.tPoison + 0.2, 'sting'); };
KC.sfx = (S, ev) => { ev(0.3, 'thump'); if (S.tHouse < 1e8) { ev(S.tHouse + 0.2, 'wind', 5); ev(S.tHouse + 1, 'crackle'); } if (S.tCar < 1e8) { ev(S.tCar + 0.3, 'door'); ev(at(S, 'L11', 4), 'stamp'); } };
KD.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tBC < 1e8) ev(at(S, 'L13', 6), 'stamp'); if (S.tD < 1e8) { ev(S.tD + 0.2, 'door'); ev(S.tDgone + 0.4, 'toll'); } };
KE.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(1.2, 'breath'); if (S.tPol < 1e8) ev(at(S, 'L16', 5), 'stamp'); };
KF.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.4 + k * 0.5, 'flash'); if (S.tTV < 1e8) ev(S.tTV + 0.2, 'type'); };
KG.sfx = (S, ev) => { ev(at(S, 'L19', 3), 'stamp'); if (S.tFind < 1e8) ev(S.tFind + 0.3, 'dig'); if (S.tArrest < 1e8) { ev(S.tArrest + 0.2, 'siren'); ev(at(S, 'L20', 2), 'stamp'); } if (S.tRiver < 1e8) ev(S.tRiver + 0.2, 'splash'); if (S.tItems < 1e8) for (let k = 1; k <= 4; k++) ev(at(S, 'L22', k) - 0.3, 'sparkle'); };
KH.sfx = (S, ev) => { ev(0.4, 'gavel'); if (S.tSent < 1e8) { ev(at(S, 'L24', 3) - 0.1, 'gavel'); ev(at(S, 'L24', 3), 'stamp'); } if (S.tEnd < 1e8) ev(S.tEnd + 0.2, 'toll'); };
KI.sfx = (S, ev) => { ev(0.3, 'splash'); ev(S.tLast + 0.3, 'wind', 6); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.8, 'breath'); };
SS2.sfx = (S, ev) => { ev(0.2, 'splash'); };
KI.bgmTrack = (S, tr) => { tr.fin = 3; };
KI.ending = true;
// people stand at y 156-170: keep them above the dialog window
KX.wideDY = 26; KA.wideDY = (t, S) => (t > S.tScam ? 10 : 34); KB.wideDY = (t, S) => (t > S.tPoison ? 0 : t > S.tCall ? 20 : 34); KC.wideDY = (t, S) => (t > S.tCar ? 30 : t > S.tHouse ? 10 : 30); KD.wideDY = 30; KE.wideDY = (t, S) => (t > S.tPol ? 30 : 26);
KF.wideDY = (t, S) => (t > S.tTV ? 0 : 34); KG.wideDY = (t, S) => (t > S.tItems ? 0 : t > S.tRiver ? 30 : 34); KH.wideDY = (t, S) => (t > S.tEnd ? 10 : 34); KI.wideDY = (t, S) => (t < S.tLast ? 0 : 26); SS1.wideDY = 26; SS2.wideDY = 30;
function TITLE_DECO(c, t) { dog(c, 270, 232, t, { col: '#d8d0c8', dk: '#4c4c54' }); }
