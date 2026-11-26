/* ================= 記録 #023 大久保清: story plan ================= */
const EXPR = {};
['L48', 'L49'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { okubo: { name: '大久保清', bg: ['#14100c', '#3c3024'] }, judge: { name: '前橋地裁の裁判長', bg: ['#1c140c', '#4c3824'] } };
const HOOK = ['大久保清', '8人の命を奪った、白いクーペの男'];
const PLAN_FULL = [
  { sc: NZ, pre: 0.8, items: ['C0', 1.1, 'C1', 1.3, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: NA, pre: 1.3, items: ['L1', 1.1, 'L2', 1.1, 'L3', 1.1, 'L4'], tr: 'dither', td: 1.0 },
  { sc: NB, pre: 1.3, items: ['L5', 1.1, 'L6', 1.1, 'L7', 1.1, 'L8', 1.1, 'L9'], tr: 'dither', td: 1.0 },
  { sc: NC, pre: 1.3, items: ['L10', 0.8, 'L10b', 1.2, 'L11', 1.2, 'L12', 1.1, 'L13', 1.1, 'L14', 1.2, 'L15'], tr: 'blinds', td: 0.6 },
  { sc: NH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: ND, pre: 1.6, items: ['L16', 1.1, 'L17', 1.1, 'L18', 1.1, 'L19', 1.6, 'L19b', 1.1, 'L20', 1.0, 'L21', 1.8, 'L21b'], tr: 'blinds', td: 1.2 },
  { sc: NE, pre: 1.3, items: ['L22', 1.1, 'L23', 1.1, 'L24', 1.1, 'L25', 1.1, 'L26', 1.1, 'L27', 1.1, 'L28', 0.8, 'O1'], tr: 'dither', td: 1.0 },
  { sc: NF, pre: 1.3, items: ['L29', 1.1, 'L30', 1.1, 'L31', 1.1, 'L32', 1.1, 'L33', 1.1, 'L34', 1.1, 'L35', 1.1, 'L36', 1.1, 'L37'], tr: 'dither', td: 1.0 },
  { sc: NG, pre: 1.3, items: ['L38', 0.8, 'O2', 1.1, 'L39', 1.1, 'L40', 1.1, 'L41', 1.1, 'L42', 0.8, 'J1', 1.1, 'L43'], tr: 'blinds', td: 1.2 },
  { sc: NI, pre: 1.3, items: ['L44', 1.1, 'L45', 1.4, 'L46', 1.2, 'L47'], tr: 'dither', td: 1.2 },
  { sc: NM, pre: 1.2, items: ['L48', 1.2, 'L49'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the brother's search party, the bicycle → mid-hook T2 → the plate, the dealer, the name → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: ND, pre: 0.1, items: ['L16', 0.1, 'L17', 0.1, 'L18', 0.1, 'T2', 0.2, 'L20', 0.1, 'L21', 0.3, 'L21b'], tr: 'dither', td: 0.3 },
  { sc: NE, pre: 0.1, items: ['L22'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
NZ.sfx = (S, ev) => { ev(0.3, 'whoosh'); for (let k = 0; k < 6; k++) ev(0.8 + k * 0.9, 'tick'); if (S.tBro < 1e8) ev(S.tBro + 0.2, 'excl'); if (S.tMan < 1e8) ev(S.tMan + 0.3, 'sting'); };
NA.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tWar < 1e8) ev(S.tWar + 0.4, 'thud'); if (S.tShop < 1e8) ev(S.tShop + 0.3, 'door'); if (S.tFail < 1e8) for (let k = 0; k < 4; k++) ev(S.tFail + 0.5 + k * 0.4, 'step'); };
NB.sfx = (S, ev) => { ev(1.2, 'stamp'); if (S.tPrison < 1e8) ev(S.tPrison + 2.5, 'clang'); if (S.tWed < 1e8) ev(S.tWed + 0.3, 'sparkle'); if (S.tFuchu < 1e8) ev(S.tFuchu + 0.3, 'clang'); if (S.tAward < 1e8) for (let i = 0; i < 4; i++) ev(S.tAward + 0.8 + i * 0.6, 'stamp'); if (S.tOut < 1e8) ev(S.tOut + 0.3, 'door'); };
NC.sfx = (S, ev) => { ev(0.4, 'door'); if (S.tCar < 1e8) ev(S.tCar + 0.4, 'shine'); if (S.tFirst < 1e8) ev(S.tFirst + 0.3, 'whoosh'); if (S.tDrive < 1e8) for (let k = 0; k < 6; k++) ev(S.tDrive + 0.5 + k * 0.8, 'tick'); if (S.tEight < 1e8) ev(at(S, 'L14', 1), 'toll'); if (S.tWho < 1e8) ev(S.tWho + 0.3, 'toll'); };
NH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
ND.sfx = (S, ev) => { ev(0.4, 'sting'); if (S.tBike < 1e8) ev(S.tBike + 0.3, 'excl'); if (S.tMan < 1e8) for (let k = 0; k < 5; k++) ev(S.tMan + 0.4 + k * 0.45, 'step'); if (S.tGlove < 1e8) { ev(S.tGlove + 0.2, 'heart'); ev(S.tGlove + 1.0, 'heart'); } if (S.tWipe < 1e8) ev(S.tWipe + 0.2, 'sting'); if (S.tPlate < 1e8) ev(S.tPlate + 0.6, 'whoosh'); if (S.tDealer < 1e8) ev(S.tDealer + 0.3, 'type'); if (S.tName < 1e8) ev(S.tName + 0.3, 'stamp'); };
NE.sfx = (S, ev) => { ev(0.3, 'siren'); for (let k = 0; k < 4; k++) ev(0.8 + k * 0.7, 'whoosh'); if (S.tStation < 1e8) ev(S.tStation + 0.3, 'door'); if (S.tHaruna < 1e8) ev(S.tHaruna + 0.3, 'wind', 3); if (S.tFound < 1e8) ev(S.tFound + 0.4, 'dig'); if (S.tSilent < 1e8) ev(S.tSilent + 0.3, 'heart'); };
NF.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tRefuse < 1e8) for (let i = 0; i < 7; i++) ev(S.tRefuse + 0.5 + i * 0.3, 'tick'); if (S.tDawn < 1e8) ev(S.tDawn + 0.4, 'dig'); if (S.tNPA < 1e8) for (let k = 0; k < 4; k++) ev(S.tNPA + 0.3 + k * 0.4, 'step'); if (S.tAlone < 1e8) ev(S.tAlone + 0.2, 'clang'); if (S.tFive < 1e8) for (let i = 0; i < 4; i++) ev(at(S, 'L36', i) - 0.1, 'stamp'); };
NG.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tVerdict < 1e8) { ev(at(S, 'L42', 1) - 0.1, 'stamp'); ev(at(S, 'L42', 1) + 0.3, 'toll'); } if (S.tFinal < 1e8) ev(S.tFinal + 1.5, 'stamp'); };
NI.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tExec < 1e8) ev(S.tExec + 0.4, 'toll'); if (S.tBro < 1e8) ev(S.tBro + 0.3, 'wind', 3); };
NM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.6, 'whoosh'); };
SS2.sfx = (S, ev) => { ev(0.2, 'whoosh'); };
NM.bgmTrack = (S, tr) => { tr.fin = 3; };
NM.ending = true;
[NZ, NA, NB, NC, NH0, ND, NE, NF, NG, NI, NM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { person(c, OKUBO, 282, 230, { k: 'td' }); }
function THUMB(c, t) { thumbBigFace(c, { face: okuboFace({}), s: 3.6, rim: '#c81818', rimA: 0.35, title: ['大久保清'], hook: '8人の命を奪ったクーペ', bg: ['#14100c', '#3c3024'] }, t); }
