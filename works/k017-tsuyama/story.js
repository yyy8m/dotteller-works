/* ================= 記録 #017 津山三十人殺し: story plan ================= */
const EXPR = {};
['L41', 'L30', 'L36'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { toi: { name: '都井睦雄', bg: ['#06060c', '#1c1c34'] } };
const HOOK = ['津山三十人殺し', '明かりの消えた村――'];
const PLAN_FULL = [
  { sc: TZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: TA, pre: 1.0, items: ['L1', 0.6, 'L1b', 0.8, 'L2', 0.8, 'L3', 0.8, 'L4'], tr: 'dither', td: 1.2 },
  { sc: TB, pre: 0.8, items: ['L5', 0.8, 'L6', 0.6, 'L6b'], tr: 'dither', td: 1.0 },
  { sc: TC, pre: 0.8, items: ['L7', 0.8, 'L8'], tr: 'dither', td: 1.0 },
  { sc: TD, pre: 0.8, items: ['L9', 0.6, 'L10', 0.8, 'L11', 0.6, 'L12'], tr: 'dither', td: 1.0 },
  { sc: TE, pre: 1.6, items: ['L13', 1.2, 'L14', 0.6, 'L15', 0.8, 'L16', 1.0, 'L17'], tr: 'blinds', td: 1.0 },
  { sc: TF, pre: 0.8, items: ['L18', 0.8, 'L19', 1.6, 'L19b', 0.6, 'L19c'], tr: 'dither', td: 1.0 },
  { sc: TG, pre: 1.0, items: ['L20', 0.6, 'L20b', 0.8, 'L21', 1.2, 'L22'], tr: 'dither', td: 1.0 },
  { sc: TQ, pre: 0.8, items: ['L23', 0.6, 'L23b', 0.8, 'L24', 0.4, 'V1', 0.8, 'L25', 0.8, 'L26'], tr: 'dither', td: 1.2 },
  { sc: TI, pre: 0.8, items: ['L27', 0.4, 'V2', 0.8, 'L27b', 0.4, 'V4', 0.6, 'L27c', 0.8, 'L28'], tr: 'dither', td: 1.0 },
  { sc: TJ, pre: 1.0, items: ['L29', 1.0, 'L30', 1.0, 'L30b'], tr: 'dither', td: 1.2 },
  { sc: TK, pre: 0.8, items: ['L31', 0.6, 'L32', 0.6, 'V3'], tr: 'dither', td: 1.0 },
  { sc: TP, pre: 1.0, items: ['L33', 1.4, 'L34', 0.8, 'L34b', 0.8, 'L34c'], tr: 'dither', td: 1.2 },
  { sc: TM, pre: 0.8, items: ['L35', 0.8, 'L36', 0.6, 'L37', 0.8, 'L38', 0.8, 'L38b', 0.8, 'L39', 0.8, 'L39b'], tr: 'dither', td: 1.2 },
  { sc: TN, pre: 0.8, items: ['L40', 1.2, 'L41'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the power line and the testimony → mid-hook T2 at ~30 s → the timed ride, the wills → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: TF, pre: 0.3, items: ['L18', 0.3, 'L19', 0.5, 'L19b'], tr: 'dither', td: 0.4 },
  { sc: TE, pre: 0.3, items: ['T2', 0.3, 'L15', 0.3, 'L16', 0.4, 'L17'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
TZ.sfx = (S, ev) => { ev(0.3, 'wind', 4); for (let k = 0; k < 8; k++) ev(at(S, 'C0', 3) + k * 0.5, 'step'); if (S.tGear < 1e8) ev(S.tGear + 0.2, 'sting'); if (S.t30 < 1e8) ev(at(S, 'C2', 1), 'toll'); };
TA.sfx = (S, ev) => { ev(0.4, 'wind', 3); for (let i = 1; i <= 3; i++) if (at(S, 'L2', i) < 1e8) ev(at(S, 'L2', i), 'toll'); if (S.tClan < 1e8) ev(S.tClan + 0.3, 'tick'); if (S.tMove < 1e8) for (let k = 0; k < 6; k++) ev(S.tMove + 0.6 + k * 0.5, 'step'); };
TB.sfx = (S, ev) => { ev(0.4, 'type'); if (S.tSick < 1e8) ev(S.tSick + 0.3, 'breath'); if (S.tSis < 1e8) ev(S.tSis + 0.4, 'door'); };
TC.sfx = (S, ev) => { ev(0.3, 'tick'); ev(at(S, 'L7', 3) - 0.1, 'stamp'); if (S.tRej < 1e8) ev(S.tRej + 0.3, 'wind', 3); };
TD.sfx = (S, ev) => { ev(at(S, 'L9', 3) - 0.3, 'whoosh'); if (S.tPrac < 1e8) for (let k = 0; k < 4; k++) ev(S.tPrac + 0.4 + k * 1.25, 'gun'); if (S.tNight < 1e8) for (let k = 0; k < 6; k++) ev(S.tNight + 0.3 + k * 0.6, 'step'); if (S.tSoup < 1e8) ev(at(S, 'L11', 1), 'sting'); if (S.tSeize < 1e8) { ev(at(S, 'L12', 2) - 0.1, 'stamp'); ev(at(S, 'L12', 3) - 0.1, 'stamp'); } };
TE.sfx = (S, ev) => { if (at(S, 'L13', 0) < 1e8) ev(at(S, 'L13', 0) - 0.4, 'heart'); if (S.tArm < 1e8) { ev(S.tArm + 0.2, 'clang'); ev(at(S, 'L14', 4), 'stamp'); } if (S.tBike < 1e8) for (let k = 0; k < 10; k++) ev(S.tBike + k * 0.9, 'tick'); if (S.tWill < 1e8) ev(S.tWill + 0.3, 'type'); if (S.tHome < 1e8) ev(S.tHome + 0.3, 'wind', 3); };
TF.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tCut < 1e8) { ev(S.tCut, 'snap'); ev(S.tCut + 0.05, 'flash'); } if (S.tOut < 1e8) ev(S.tOut + 0.4, 'sting'); if (S.tMem < 1e8) ev(S.tMem + 0.2, 'toll'); };
TG.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tGear < 1e8) ev(S.tGear + 0.2, 'clang'); if (S.tLock < 1e8) ev(at(S, 'L21', 1), 'creak'); if (S.tFirst < 1e8) { ev(at(S, 'L22', 2) - 0.1, 'thud'); ev(at(S, 'L22', 2) + 0.2, 'toll'); } };
TQ.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.6 + k * 1.3, 'gun'); if (S.tHide < 1e8) for (let k = 0; k < 4; k++) ev(S.tHide + 0.5 + k * 1.1, 'gun'); if (S.tShot < 1e8) { ev(S.tShot, 'gun'); ev(S.tShot + 0.3, 'sting'); } if (S.tRun < 1e8) for (let k = 0; k < 6; k++) ev(S.tRun + 0.4 + k * 0.25, 'step'); if (S.tTatami < 1e8) ev(S.tTatami + 0.3, 'creak'); if (S.tShed < 1e8) ev(at(S, 'L26', 5) - 0.1, 'gun'); };
TI.sfx = (S, ev) => { ev(0.3, 'breath'); if (S.tGo < 1e8) for (let k = 0; k < 5; k++) ev(S.tGo + 0.4 + k * 0.4, 'step'); if (S.tRun < 1e8) for (let k = 0; k < 8; k++) ev(S.tRun + 0.3 + k * 0.22, 'step'); if (S.tBamboo < 1e8) ev(S.tBamboo + 0.2, 'wind', 3); };
TJ.sfx = (S, ev) => { for (let k = 0; k < 11; k++) ev(at(S, 'L29', 0) + k * ((at(S, 'L29', 2) - at(S, 'L29', 0)) / 11), 'tick'); if (S.t30 < 1e8) ev(S.t30 + 0.3, 'toll'); };
TK.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tBoy < 1e8) ev(S.tBoy + 0.3, 'creak'); };
TP.sfx = (S, ev) => { ev(0.3, 'wind', 5); if (S.tEnd < 1e8) { ev(S.tEnd, 'gun'); ev(S.tEnd + 1.3, 'whoosh'); } if (S.tSearch < 1e8) { for (let k = 0; k < 6; k++) ev(S.tSearch + 0.3 + k * 0.6, 'step'); ev(at(S, 'L34', 3) - 0.1, 'stamp'); } if (S.tNews < 1e8) ev(at(S, 'L34c', 2) - 0.2, 'whoosh'); };
TM.sfx = (S, ev) => { ev(0.4, 'tick'); if (S.tPoor < 1e8) ev(S.tPoor + 0.3, 'wind', 3); if (S.tBook < 1e8) ev(at(S, 'L38b', 2), 'sting'); if (S.tDemo < 1e8) ev(at(S, 'L39b', 2), 'thud'); };
TN.sfx = (S, ev) => { ev(0.3, 'wind', 6); if (S.tCand < 1e8) ev(S.tCand + 0.3, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 2); for (let k = 0; k < 8; k++) ev(0.2 + k * 0.5, 'step'); };
SS2.sfx = (S, ev) => { ev(0.2, 'tick'); };
TN.bgmTrack = (S, tr) => { tr.fin = 3; };
TN.ending = true;
[TZ, TA, TB, TC, TD, TE, TF, TG, TQ, TI, TJ, TK, TP, TM, TN, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { lantern(c, 280, 226, t); }
