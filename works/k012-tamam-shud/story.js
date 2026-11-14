/* ================= 記録 #012 タマム・シュッド事件: story plan ================= */
const EXPR = {};
['M1', 'C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'D1', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'P1', 'L20', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L21', 'L22', 'L29'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { doctor: { name: '検視官 クレランド', bg: ['#141c24', '#3c4c5c'] }, officer: { name: 'リーン巡査部長', bg: ['#141418', '#3c3c4c'] } };
const HOOK = ['タマム・シュッド事件', '「終わった」と書かれた紙――'];
const PLAN_FULL = [
  { sc: YX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: YA, pre: 1.0, items: ['L1', 0.8, 'L2'], tr: 'dither', td: 1.2 },
  { sc: YB, pre: 0.8, items: ['L3', 0.8, 'L4'], tr: 'dither', td: 1.0 },
  { sc: YC, pre: 0.8, items: ['L5'], tr: 'dither', td: 1.0 },
  { sc: YD, pre: 0.8, items: ['L6', 0.8, 'L7', 0.4, 'D1', 0.8, 'L8'], tr: 'dither', td: 1.0 },
  { sc: YE, pre: 0.8, items: ['L9', 0.8, 'L10', 0.8, 'L11'], tr: 'dither', td: 1.0 },
  { sc: YF, pre: 1.0, items: ['L12', 0.8, 'L13'], tr: 'blinds', td: 1.0 },
  { sc: YG, pre: 0.8, items: ['L14', 0.8, 'L15'], tr: 'dither', td: 1.0 },
  { sc: YH, pre: 1.0, items: ['L16', 0.8, 'L17'], tr: 'dither', td: 1.2 },
  { sc: YI, pre: 0.8, items: ['L18', 0.8, 'L19', 0.4, 'P1', 0.8, 'L20'], tr: 'dither', td: 1.0 },
  { sc: YJ, pre: 1.0, items: ['L21', 1.0, 'L22'], tr: 'dither', td: 1.2 },
  { sc: YK, pre: 0.8, items: ['L23', 0.8, 'L24'], tr: 'dither', td: 1.0 },
  { sc: YL, pre: 0.8, items: ['L25', 0.8, 'L26', 1.0, 'L27'], tr: 'dither', td: 1.0 },
  { sc: YM, pre: 1.0, items: ['L28', 1.2, 'L29'], tr: 'iris', td: 1.4 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: YB, pre: 0.3, items: ['L4'], tr: 'dither', td: 0.5 },
  { sc: YF, pre: 0.3, items: ['L12', 0.4, 'L13'], tr: 'dither', td: 0.5 },
  { sc: YH, pre: 0.3, items: ['L16', 0.4, 'L17'], tr: 'dither', td: 0.5 },
  { sc: YI, pre: 0.3, items: ['L18'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
YX.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(0.6, 'toll'); if (S.tScrap < 1e8) ev(S.tScrap + 0.3, 'whoosh'); if (S.tWord < 1e8) ev(S.tWord + 0.2, 'sting'); };
YA.sfx = (S, ev) => { ev(0.2, 'wind', 4); for (let k = 0; k < 6; k++) ev(0.4 + k * 0.5, 'step'); ev(S.tLie + 0.1, 'excl'); };
YB.sfx = (S, ev) => { for (let k = 1; k <= 5; k++) { const a = at(S, 'L3', k) - 0.3; if (a < 1e8) ev(a + 0.2, 'drop'); } ev(S.tNo + 0.4, 'stamp'); if (S.tTag < 1e8) { ev(S.tTag + 0.5, 'snap'); ev(S.tTag + 1.8, 'stamp'); } };
YC.sfx = (S, ev) => { ev(0.3, 'wind', 5); ev(S.tMosq, 'breath'); };
YD.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tNone < 1e8) ev(S.tNone + 0.4, 'stamp'); if (S.tWorld < 1e8) { ev(S.tWorld + 0.3, 'whoosh'); ev(at(S, 'L8', 4), 'stamp'); } };
YE.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tFound, 'creak'); ev(S.tOpen + 0.2, 'door'); ev(S.tThread + 0.2, 'sparkle'); if (S.tNone < 1e8) ev(S.tNone + 1, 'stamp'); };
YF.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tOut < 1e8) ev(S.tOut + 0.2, 'whoosh'); if (S.tWord < 1e8) ev(S.tWord, 'sting'); };
YG.sfx = (S, ev) => { ev(0.4, 'step'); ev(at(S, 'L14', 4), 'stamp'); ev(S.tTorn, 'snap'); };
YH.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(S.tCode + k * 0.45, 'type'); if (S.tNo < 1e8) ev(at(S, 'L17', 2), 'stamp'); };
YI.sfx = (S, ev) => { ev(0.4, 'tick'); ev(S.tMap + 0.4, 'whoosh'); ev(S.tBust + 0.3, 'door'); ev(at(S, 'L19', 4), 'excl'); ev(S.tName + 0.3, 'slam'); ev(at(S, 'L20', 5), 'stamp'); };
YJ.sfx = (S, ev) => { ev(0.3, 'toll'); ev(2.4, 'toll'); ev(S.tFlower, 'sparkle'); };
YK.sfx = (S, ev) => { ev(0.3, 'siren'); ev(S.t94 + 0.2, 'sting'); ev(S.tWho + 0.6, 'stamp'); };
YL.sfx = (S, ev) => { ev(at(S, 'L25', 7) + 0.6, 'thud'); ev(at(S, 'L25', 7) + 1, 'stamp'); ev(S.tDNA + 0.2, 'sparkle'); ev(at(S, 'L27', 5), 'stamp'); };
YM.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(S.tNot + 1.6, 'stamp'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.6, 'toll'); };
SS2.sfx = (S, ev) => { ev(0.2, 'wind', 3); };
YM.bgmTrack = (S, tr) => { tr.fin = 3; };
YM.ending = true;
// the sand line is at y 150: keep the man above the dialog window
YX.wideDY = 40; YA.wideDY = 40; YC.wideDY = 40; YE.wideDY = (t, S) => (t > S.tOpen ? 0 : 20); YG.wideDY = (t, S) => (t > S.tTorn - 1.2 ? 0 : 30); YI.wideDY = (t, S) => (t > S.tName ? 0 : t > S.tBust ? 30 : 0);
YJ.wideDY = (t, S) => (t < S.tLater ? 34 : 0); YK.wideDY = (t, S) => (t > S.t94 ? 20 : 30); YM.wideDY = 26; SS1.wideDY = 40; SS2.wideDY = 40;
function TITLE_DECO(c, t) { R(c, 170, 214, 150, 26, '#8c8478'); somLying(c, 290, 226, { k: 'td', s: 1 }); }
