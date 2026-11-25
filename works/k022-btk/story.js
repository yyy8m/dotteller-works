/* ================= 記録 #022 BTK（デニス・レイダー）: story plan ================= */
const EXPR = {};
['L37', 'L38'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { rader: { name: 'デニス・レイダー', bg: ['#14141c', '#3c3c4c'] }, keikan: { name: '捜査員', bg: ['#0c1424', '#2c3c5c'] }, shocho: { name: 'ウィチタ警察署長', bg: ['#0c1424', '#2c3c5c'] } };
const HOOK = ['BTK', '30年間、街を恐怖させた男'];
const PLAN_FULL = [
  { sc: QZ, pre: 0.8, items: ['C0', 1.0, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: QA, pre: 1.3, items: ['L1', 1.1, 'L2', 1.1, 'L3', 1.1, 'L4'], tr: 'dither', td: 1.0 },
  { sc: QB, pre: 1.3, items: ['L5', 1.1, 'L6', 1.0, 'L7', 1.1, 'L8', 1.2, 'L9'], tr: 'dither', td: 0.6 },
  { sc: QH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: QC, pre: 1.3, items: ['L10', 1.1, 'L11', 1.0, 'L12', 0.8, 'L12b', 1.0, 'L13', 1.1, 'L13b', 1.0, 'L14'], tr: 'dither', td: 1.0 },
  { sc: QD, pre: 1.3, items: ['L15', 1.1, 'L16'], tr: 'dither', td: 1.0 },
  { sc: QE, pre: 1.4, items: ['L17', 1.1, 'L18', 1.1, 'L19', 1.1, 'L20', 1.1, 'L20b', 1.1, 'L21'], tr: 'blinds', td: 1.2 },
  { sc: QF, pre: 1.3, items: ['L22', 1.1, 'L23', 1.2, 'L24', 1.6, 'L25', 1.0, 'L26', 1.1, 'L27'], tr: 'dither', td: 1.0 },
  { sc: QG, pre: 1.2, items: ['L28', 0.8, 'P1', 0.8, 'R1', 1.0, 'L29', 0.8, 'W1'], tr: 'dither', td: 1.0 },
  { sc: QI, pre: 1.3, items: ['L30', 1.1, 'L31', 1.1, 'L32', 1.0, 'L33', 1.1, 'L33b'], tr: 'blinds', td: 1.2 },
  { sc: QJ, pre: 1.3, items: ['L34', 0.8, 'R2', 1.0, 'L35', 1.0, 'L36', 1.1, 'L36b'], tr: 'dither', td: 1.2 },
  { sc: QM, pre: 1.2, items: ['L37', 1.2, 'L38'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → BTK letters → the 13-year silence breaks → mid-hook T2 → the ad, the disk, "Dennis" → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QB, pre: 0.2, items: ['L8', 0.1, 'L9'], tr: 'dither', td: 0.4 },
  { sc: QE, pre: 0.2, items: ['L17'], tr: 'dither', td: 0.4 },
  { sc: QF, pre: 0.2, items: ['T2', 0.2, 'L23', 0.2, 'L25', 0.2, 'L26'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.2, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
QZ.sfx = (S, ev) => { ev(0.3, 'tick'); ev(1.2, 'creak'); if (S.tNight < 1e8) { ev(S.tNight + 0.2, 'wind', 3); for (let k = 0; k < 6; k++) ev(S.tNight + 0.6 + k * 0.45, 'step'); } if (S.tName < 1e8) ev(S.tName + 1.0, 'sting'); };
QA.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tADT < 1e8) for (let k = 0; k < 3; k++) ev(S.tADT + 0.5 + k * 0.5, 'tick'); if (S.tChurch < 1e8) ev(S.tChurch + 0.3, 'toll'); };
QB.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(2.0, 'heart'); if (S.tKids < 1e8) for (let k = 0; k < 6; k++) ev(S.tKids + 0.3 + k * 0.35, 'step'); if (S.tLib < 1e8) ev(S.tLib + 1.0, 'whoosh'); if (S.tBTK < 1e8) for (let i = 0; i < 3; i++) ev(at(S, 'L9', i) - 0.2, 'stamp'); };
QH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
QC.sfx = (S, ev) => { ev(0.4, 'whoosh'); if (S.tTown < 1e8) ev(S.tTown + 0.2, 'excl'); if (S.tWait < 1e8) for (let k = 0; k < 8; k++) ev(S.tWait + 0.4 + k * 0.8, 'tick'); if (S.tYears < 1e8) for (let i = 0; i < 3; i++) ev(at(S, 'L13', i) - 0.1, 'stamp'); if (S.tCold < 1e8) { ev(S.tCold + 0.3, 'wind', 3); ev(at(S, 'L14', 1), 'stamp'); } };
QD.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tStrict < 1e8) ev(S.tStrict + 0.3, 'excl'); };
QE.sfx = (S, ev) => { ev(0.4, 'sting'); ev(0.9, 'whoosh'); if (S.tPhoto < 1e8) ev(S.tPhoto + 0.3, 'flash'); if (S.tDNA < 1e8) for (let k = 0; k < 6; k++) ev(S.tDNA + 0.5 + k * 0.5, 'tick'); if (S.tParcels < 1e8) for (let k = 0; k < 3; k++) ev(S.tParcels + k * 3 + 0.2, 'thud'); if (S.tCCTV < 1e8) ev(S.tCCTV + 0.3, 'type'); };
QF.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tAd < 1e8) ev(S.tAd + 0.3, 'stamp'); if (S.tDisk < 1e8) ev(S.tDisk + 0.3, 'door'); if (S.tMeta < 1e8) { for (let k = 0; k < 4; k++) ev(S.tMeta + 0.5 + k * 0.6, 'type'); ev(S.tMeta + 2.4, 'sting'); } if (S.tChurch < 1e8) ev(S.tChurch + 0.3, 'heart'); if (S.tDNA < 1e8) ev(S.tDNA + 2.2, 'shine'); };
QG.sfx = (S, ev) => { ev(0.3, 'siren'); ev(2.6, 'door'); if (S.tPress < 1e8) for (let k = 0; k < 5; k++) ev(S.tPress + 0.3 + k * 0.4, 'flash'); };
QI.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tVerdict < 1e8) { ev(S.tVerdict + 0.4, 'stamp'); ev(S.tVerdict + 0.6, 'toll'); } if (S.tVan < 1e8) ev(S.tVan + 0.2, 'wind', 3); };
QJ.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tWork < 1e8) for (let k = 0; k < 4; k++) ev(S.tWork + 0.4 + k * 0.5, 'dig'); if (S.tCell < 1e8) ev(S.tCell + 0.2, 'clang'); };
QM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.0, 'step'); };
SS2.sfx = (S, ev) => { ev(0.2, 'door'); ev(1.0, 'heart'); };
QM.bgmTrack = (S, tr) => { tr.fin = 3; };
QM.ending = true;
[QZ, QA, QB, QH0, QC, QD, QE, QF, QG, QI, QJ, QM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { shadow(c, RADER, 282, 230, { k: 'td', col: '#06060a' }); }
function THUMB(c, t) { thumbBigFace(c, { face: raderFace({}), s: 3.6, rim: '#c81818', rimA: 0.35, title: ['BTK'], hook: '30年間、正体不明の殺人鬼', bg: ['#0c0c14', '#3c3c4c'] }, t); }
