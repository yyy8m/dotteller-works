/* ================= 記録 #016 ジェフリー・ダーマー: story plan ================= */
const EXPR = {};
['L52', 'L27', 'L44'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { dahmer: { name: 'ジェフリー・ダーマー', bg: ['#0c0408', '#3c1018'] } };
const HOOK = ['ジェフリー・ダーマー', '213号室の秘密――'];
const PLAN_FULL = [
  { sc: DX, pre: 0.8, items: ['M1', 1.0, 'C0', 0.8, 'C1', 1.0, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: DA_, pre: 1.0, items: ['L1', 0.6, 'L2', 0.8, 'L3', 0.6, 'L4', 0.8, 'L5', 0.8, 'L6'], tr: 'dither', td: 1.2 },
  { sc: DB, pre: 0.8, items: ['L7', 0.6, 'L8', 0.6, 'L9', 1.4, 'L10'], tr: 'dither', td: 1.0 },
  { sc: DC, pre: 0.8, items: ['L11', 0.6, 'L12', 0.4, 'V1', 0.8, 'L13'], tr: 'dither', td: 1.0 },
  { sc: DD, pre: 1.0, items: ['L14', 0.6, 'L15', 0.8, 'L16', 0.6, 'L17', 0.8, 'L18', 0.8, 'L19'], tr: 'blinds', td: 1.0 },
  { sc: DE, pre: 0.8, items: ['L20', 0.8, 'L21', 1.0, 'L22'], tr: 'dither', td: 1.0 },
  { sc: DF, pre: 1.2, items: ['L23', 0.6, 'L24', 0.6, 'L25', 0.4, 'V2', 0.6, 'L26', 1.2, 'L27', 0.8, 'L28'], tr: 'dither', td: 1.2 },
  { sc: DG, pre: 0.8, items: ['L29', 0.6, 'L30', 0.8, 'L31'], tr: 'dither', td: 1.0 },
  { sc: DH, pre: 0.8, items: ['L32', 0.6, 'L33', 0.6, 'L34', 0.4, 'V3', 1.0, 'L35', 0.6, 'L36', 0.6, 'L37', 0.6, 'L38'], tr: 'dither', td: 1.0 },
  { sc: DI, pre: 0.8, items: ['L39', 0.6, 'L40', 0.6, 'L41', 1.2, 'L42', 0.8, 'L43', 1.0, 'L44'], tr: 'dither', td: 1.2 },
  { sc: DJ, pre: 0.8, items: ['L45', 0.8, 'L46', 0.4, 'V4', 1.0, 'L47', 0.6, 'L48', 1.0, 'L49'], tr: 'dither', td: 1.2 },
  { sc: DK, pre: 1.0, items: ['L50', 0.8, 'L51', 1.2, 'L52'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut since 2026-11-15): S1 → the 213 room → mid-hook T2 at ~30 s → the police failure → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: DE, pre: 0.3, items: ['L20', 0.3, 'L21'], tr: 'dither', td: 0.4 },
  { sc: DF, pre: 0.3, items: ['T2', 0.3, 'L24', 0.3, 'V2', 0.3, 'L26'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
DX.sfx = (S, ev) => { ev(0.2, 'siren'); for (let k = 0; k < 6; k++) ev(at(S, 'C0', 3) + k * 0.3, 'step'); if (S.tApt < 1e8) ev(S.tApt + 0.4, 'toll'); };
DA_.sfx = (S, ev) => { ev(0.4, 'tick'); if (S.tKit < 1e8) ev(S.tKit + 0.3, 'drip'); if (S.tBones < 1e8) ev(S.tBones + 0.3, 'dig'); if (S.tAlone < 1e8) ev(S.tAlone + 0.4, 'door'); };
DB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tHit < 1e8) { ev(S.tHit, 'thud'); ev(S.tHit + 0.1, 'sting'); } if (S.tFirst < 1e8) ev(S.tFirst + 0.3, 'toll'); };
DC.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(0.6 + k * 0.8, 'drop'); if (S.tGran < 1e8) { ev(S.tGran + 0.3, 'toll'); } };
DD.sfx = (S, ev) => { ev(0.3, 'breath'); if (S.tBar < 1e8) ev(S.tBar + 0.3, 'drip'); if (S.tSmell < 1e8) ev(S.tSmell + 0.3, 'wind', 4); if (S.tCourt < 1e8) ev(S.tCourt + 0.3, 'gavel'); };
DE.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tRoom < 1e8) ev(S.tRoom + 0.3, 'door'); if (S.tDrill < 1e8) ev(S.tDrill + 0.3, 'sting'); };
DF.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tWomen < 1e8) ev(S.tWomen + 0.2, 'excl'); ev(at(S, 'L25', 2), 'siren'); if (S.tGone < 1e8) ev(S.tGone + 0.3, 'toll'); if (S.tTape < 1e8) ev(S.tTape + 0.2, 'type'); };
DG.sfx = (S, ev) => { ev(0.3, 'breath'); if (S.tFired < 1e8) ev(S.tFired + 0.3, 'stamp'); ev(at(S, 'L30', 3), 'stamp'); if (S.tMall < 1e8) ev(S.tMall + 0.3, 'step'); };
DH.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tCuff < 1e8) ev(S.tCuff, 'clang'); if (S.tPhotos < 1e8) ev(S.tPhotos + 0.3, 'sting'); if (S.tHeart < 1e8) for (let k = 0; k < 6; k++) ev(S.tHeart + k * 0.56, 'heart'); if (S.tPunch < 1e8) { ev(S.tPunch, 'thump'); ev(S.tPunch + 0.3, 'slam'); for (let k = 0; k < 6; k++) ev(S.tPunch + 0.6 + k * 0.25, 'step'); } };
DI.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tRage < 1e8) ev(S.tRage, 'slam'); if (S.tFound < 1e8) ev(S.tFound + 0.2, 'sting'); if (S.tSuits < 1e8) ev(S.tSuits + 0.2, 'siren'); if (S.t17 < 1e8) ev(S.t17 + 0.3, 'toll'); };
DJ.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tTrial < 1e8) { ev(S.tTrial + 0.3, 'gavel'); ev(at(S, 'L47', 5), 'stamp'); } if (S.tDeath < 1e8) { ev(S.tDeath + 0.3, 'drip'); ev(at(S, 'L49', 4), 'thud'); } };
DK.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'siren'); for (let k = 0; k < 6; k++) ev(0.2 + k * 0.3, 'step'); };
SS2.sfx = (S, ev) => { ev(0.2, 'wind', 3); };
DK.bgmTrack = (S, tr) => { tr.fin = 3; };
DK.ending = true;
DX.wideDY = 30; DA_.wideDY = 30; DB.wideDY = (t, S) => (t > S.tFirst ? 0 : 30); DC.wideDY = 30; DD.wideDY = 30; DE.wideDY = (t, S) => (t > S.tRoom ? 30 : 26); DF.wideDY = (t, S) => (t > S.tTape ? 0 : 26); DG.wideDY = (t, S) => (t > S.tMall ? 30 : 10); DH.wideDY = (t, S) => (t > S.tPunch ? 26 : t > S.tPhotos ? 10 : 30);
DI.wideDY = (t, S) => (t > S.t17 ? 0 : t > S.tSuits ? 26 : 30); DJ.wideDY = 30; DK.wideDY = 26; SS1.wideDY = 26; SS2.wideDY = 26;
function TITLE_DECO(c, t) { handcuff(c, 280, 220, 1.4); }
