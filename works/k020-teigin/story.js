/* ================= 記録 #020 帝銀事件: story plan ================= */
const EXPR = {};
['L38', 'L39'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { hannin: { name: '犯人の男', bg: ['#140c08', '#4c3424'] }, hirasawa: { name: '平沢貞通', bg: ['#141418', '#3c3c4c'] }, dairi: { name: '支店長代理', bg: ['#14141c', '#3c3c4c'] }, koin: { name: '生き残った行員', bg: ['#14141c', '#3c4c5c'] }, eriguchi: { name: '一審の裁判長', bg: ['#1c140c', '#4c3824'] }, musume: { name: '平沢の次女', bg: ['#14101c', '#3c2c3c'] } };
const HOOK = ['帝銀事件', '16人が、一斉に毒を飲んだ'];
const PLAN_FULL = [
  { sc: TZ, pre: 0.8, items: ['C0', 1.0, 'C1', 1.0, 'C2', 0.8, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: TA, pre: 1.0, items: ['L1', 0.8, 'L2'], tr: 'dither', td: 1.0 },
  { sc: TB, pre: 0.8, items: ['L3', 0.8, 'L4', 0.6, 'H2'], tr: 'dither', td: 1.0 },
  { sc: TC, pre: 0.8, items: ['L5', 0.8, 'L6', 0.6, 'H3'], tr: 'dither', td: 0.6 },
  { sc: TH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: TD, pre: 0.8, items: ['L7', 0.8, 'L8', 0.8, 'L9'], tr: 'dither', td: 1.0 },
  { sc: TE, pre: 1.2, items: ['L10', 0.8, 'L11', 1.0, 'L12'], tr: 'blinds', td: 1.2 },
  { sc: TF, pre: 1.0, items: ['L13', 0.8, 'L14'], tr: 'dither', td: 1.0 },
  { sc: TG, pre: 1.0, items: ['L15', 0.6, 'L16', 0.8, 'L17'], tr: 'dither', td: 1.0 },
  { sc: TMEI, pre: 1.0, items: ['L18', 0.8, 'L19', 0.8, 'L20'], tr: 'dither', td: 1.0 },
  { sc: TI, pre: 1.0, items: ['L21', 0.8, 'L22', 0.8, 'L23', 0.6, 'L23b'], tr: 'blinds', td: 1.0 },
  { sc: TJ, pre: 0.8, items: ['L24', 0.8, 'L24b', 0.4, 'P2'], tr: 'dither', td: 1.0 },
  { sc: TK, pre: 1.2, items: ['L25', 0.6, 'P1', 0.8, 'L26', 0.8, 'L27'], tr: 'dither', td: 1.0 },
  { sc: TT, pre: 1.0, items: ['L28', 0.6, 'Y1', 0.6, 'M1', 0.8, 'L29', 0.8, 'E1', 0.4, 'L29b'], tr: 'dither', td: 1.0 },
  { sc: TM, pre: 1.0, items: ['L30', 0.8, 'L31', 0.8, 'L32'], tr: 'blinds', td: 1.2 },
  { sc: TN, pre: 1.2, items: ['L33', 1.0, 'L34', 0.8, 'L35', 0.8, 'L36', 1.6, 'L37', 1.2, 'L37b', 0.4, 'D1'], tr: 'dither', td: 1.2 },
  { sc: TO, pre: 1.2, items: ['L38', 0.8, 'L39', 1.2, 'L40'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the visitor's card → he drinks first, "舌を出して" → the two doses → mid-hook T2 → the false-name deposit, the silence → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: TB, pre: 0.2, items: ['L4', 0.1, 'H2'], tr: 'dither', td: 0.4 },
  { sc: TC, pre: 0.2, items: ['L6', 0.2, 'H3'], tr: 'dither', td: 0.4 },
  { sc: TJ, pre: 0.2, items: ['T2', 0.2, 'L24'], tr: 'dither', td: 0.4 },
  { sc: TN, pre: 0.2, items: ['L36', 0.2, 'L37'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.2, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
TZ.sfx = (S, ev) => { ev(0.3, 'tick'); ev(1.8, 'clang'); if (S.tFall < 1e8) { ev(S.tFall + 0.2, 'sting'); for (let k = 0; k < 6; k++) ev(S.tFall + 0.4 + k * 0.45, 'thud'); } if (S.tGone < 1e8) ev(S.tGone + 0.3, 'wind', 3); };
TA.sfx = (S, ev) => { ev(0.3, 'wind', 3); for (let k = 0; k < 4; k++) ev(0.8 + k * 0.6, 'step'); };
TB.sfx = (S, ev) => { ev(0.3, 'tick'); for (let k = 0; k < 6; k++) ev(0.6 + k * 0.4, 'step'); if (S.tIn < 1e8) ev(S.tIn + 0.2, 'door'); if (S.tCard < 1e8) ev(S.tCard + 1.4, 'shine'); };
TC.sfx = (S, ev) => { ev(0.3, 'tick'); for (let k = 0; k < 8; k++) ev(0.6 + k * 0.3, 'step'); if (S.tFirst < 1e8) { ev(S.tFirst + 0.4, 'drip'); ev(S.tFirst + 1.2, 'heart'); } };
TH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
TD.sfx = (S, ev) => { ev(0.3, 'drip'); ev(0.8, 'heart'); if (S.tSecond < 1e8) { ev(S.tSecond + 0.3, 'drip'); for (let k = 0; k < 4; k++) ev(S.tSecond + 0.8 + k * 0.6, 'heart'); } if (S.tSink < 1e8) ev(S.tSink + 0.2, 'splash'); if (S.tFall < 1e8) for (let k = 0; k < 6; k++) ev(S.tFall + 0.3 + k * 0.5, 'thud'); };
TE.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tCop < 1e8) { ev(S.tCop + 0.2, 'door'); ev(S.tCop + 0.6, 'excl'); } if (S.tDead < 1e8) ev(S.tDead + 0.3, 'toll'); };
TF.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.4 + k * 0.25, 'tick'); if (S.tChaos < 1e8) ev(S.tChaos + 0.2, 'siren'); if (S.tCash < 1e8) ev(S.tCash + 0.3, 'stamp'); };
TG.sfx = (S, ev) => { ev(0.5, 'whoosh'); ev(3.0, 'whoosh'); if (S.tCard < 1e8) ev(S.tCard + 0.3, 'shine'); };
TMEI.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tSquad < 1e8) for (let k = 0; k < 4; k++) ev(S.tSquad + 0.4 + k * 0.5, 'step'); if (S.tCards < 1e8) for (let k = 0; k < 4; k++) ev(S.tCards + 0.5 + k * 2.2, 'stamp'); };
TI.sfx = (S, ev) => { ev(0.4, 'tick'); if (S.tMatch < 1e8) ev(S.tMatch + 1.6, 'sting'); if (S.tArrest < 1e8) ev(S.tArrest + 0.4, 'stamp'); if (S.tPress < 1e8) for (let k = 0; k < 5; k++) ev(S.tPress + 0.3 + k * 0.4, 'flash'); };
TJ.sfx = (S, ev) => { ev(0.4, 'type'); ev(1.5, 'tick'); if (S.tHome < 1e8) ev(S.tHome + 0.3, 'crackle'); };
TK.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tConf < 1e8) ev(at(S, 'L26', 1), 'stamp'); if (S.tRecant < 1e8) { ev(S.tRecant + 0.2, 'gavel'); ev(at(S, 'L27', 2), 'stamp'); } };
TT.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tVerdict < 1e8) { ev(S.tVerdict + 0.4, 'stamp'); ev(S.tVerdict + 0.6, 'toll'); } if (S.tFinal < 1e8) ev(S.tFinal + 0.2, 'gavel'); };
TM.sfx = (S, ev) => { ev(0.3, 'clang'); ev(1.0, 'door'); if (S.tDie < 1e8) ev(S.tDie + 0.4, 'toll'); };
TN.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tTwo < 1e8) ev(S.tTwo + 0.3, 'sting'); if (S.tMoney < 1e8) ev(S.tMoney + 0.3, 'shine'); if (S.tSilent < 1e8) ev(S.tSilent + 0.2, 'heart'); };
TO.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.0, 'drip'); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.2 + k * 0.35, 'step'); };
TO.bgmTrack = (S, tr) => { tr.fin = 3; };
TO.ending = true;
[TZ, TA, TB, TC, TH0, TD, TE, TF, TG, TMEI, TI, TJ, TK, TT, TM, TN, TO, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { person(c, HANNIN, 282, 230, { k: 'td' }); }
