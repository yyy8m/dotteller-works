/* ================= 記録 #024 八王子スーパー強盗殺人事件: story plan ================= */
const EXPR = {};
['L46', 'L47'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = {};
const HOOK = ['八王子スーパー強盗殺人事件', '犯人は、金に手をつけなかった'];
const PLAN_FULL = [
  { sc: MZ, pre: 0.8, items: ['C0', 1.2, 'C1', 1.3, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: MA, pre: 1.3, items: ['L1', 1.1, 'L2', 1.1, 'L3', 1.1, 'L4'], tr: 'dither', td: 1.0 },
  { sc: MB, pre: 1.3, items: ['L5', 1.1, 'L6', 1.1, 'L7', 1.1, 'L8', 1.1, 'L9', 1.1, 'L10', 0.9, 'L11', 1.2, 'L12'], tr: 'dither', td: 1.0 },
  { sc: MC, pre: 1.3, items: ['L13', 1.0, 'L14', 1.4, 'L15', 1.6, 'L15b', 1.2, 'L16', 1.2, 'L17', 1.1, 'L18', 1.2, 'L19'], tr: 'blinds', td: 0.6 },
  { sc: MD, pre: 1.3, items: ['L20', 1.1, 'L21', 1.1, 'L22', 1.6, 'L23', 1.2, 'L24', 1.1, 'L25', 1.1, 'L26', 1.2, 'L27'], tr: 'blinds', td: 1.2 },
  { sc: ME, pre: 1.3, items: ['L28', 1.1, 'L29', 1.1, 'L30', 1.1, 'L31', 1.2, 'L32', 1.1, 'L33', 1.1, 'L34', 1.1, 'L35'], tr: 'dither', td: 1.0 },
  { sc: MF, pre: 1.3, items: ['L36', 1.1, 'L37', 1.1, 'L38', 1.1, 'L39', 1.1, 'L40', 1.2, 'L41', 1.1, 'L42', 1.1, 'L43', 1.4, 'L44', 1.2, 'L45'], tr: 'dither', td: 1.2 },
  { sc: MM, pre: 1.2, items: ['L46', 1.2, 'L47'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the call, the lock, the sound → the turn: nothing taken → mid-hook T2 → why? → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: MC, pre: 0.1, items: ['L15', 0.3, 'L15b', 0.1, 'L16'], tr: 'dither', td: 0.3 },
  { sc: MD, pre: 0.1, items: ['L23', 0.1, 'L24', 0.1, 'T2', 0.1, 'L27'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
MZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tOffice < 1e8) { ev(S.tOffice - 2.2, 'gun'); ev(S.tOffice - 1.6, 'gun'); } if (S.tOffice < 1e8) ev(S.tOffice + 0.3, 'toll'); if (S.tSafe < 1e8) ev(S.tSafe + 0.3, 'clang'); };
MA.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tSale < 1e8) for (let k = 0; k < 6; k++) ev(S.tSale + 0.3 + k * 0.5, 'step'); if (S.tShift < 1e8) ev(S.tShift + 0.3, 'tick'); };
MB.sfx = (S, ev) => { ev(0.4, 'tick'); if (S.tOdori < 1e8) for (let k = 0; k < 10; k++) ev(S.tOdori + 0.3 + k * 0.45, 'thump'); if (S.tBike < 1e8) ev(S.tBike + 0.3, 'tick'); if (S.tCar < 1e8) ev(S.tCar + 0.3, 'whoosh'); if (S.tClose < 1e8) ev(S.tClose + 0.3, 'clang'); if (S.tStairs < 1e8) for (let k = 0; k < 6; k++) ev(S.tStairs + 0.3 + k * 0.6, 'step'); if (S.tQuiet < 1e8) ev(S.tQuiet + 0.3, 'wind', 4); };
MC.sfx = (S, ev) => { ev(0.4, 'type'); if (S.tOpen < 1e8) ev(S.tOpen + 0.5, 'clang'); if (S.tPushed < 1e8) { ev(S.tPushed + 0.2, 'door'); ev(S.tPushed + 0.8, 'heart'); } if (S.tSound < 1e8) for (let k = 0; k < 3; k++) ev(S.tSound + 0.4 + k * 0.5, 'gun'); if (S.tCar < 1e8) ev(S.tCar + 0.3, 'whoosh'); if (S.tFound < 1e8) ev(S.tFound + 0.4, 'sting'); };
MH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
MD.sfx = (S, ev) => { ev(0.4, 'toll'); if (S.tFive < 1e8) for (let k = 0; k < 6; k++) ev(S.tFive + 0.4 + k * 0.5, 'tick'); if (S.tShots < 1e8) for (let i = 0; i < 5; i++) ev(S.tShots + 0.4 + i * 0.4, 'drop'); if (S.tTurn < 1e8) ev(S.tTurn + 0.2, 'sting'); if (S.tMoney < 1e8) ev(S.tMoney + 0.4, 'shine'); if (S.tSteps < 1e8) for (let k = 0; k < 6; k++) ev(S.tSteps + 0.6 + k * 0.6, 'step'); if (S.tWhy < 1e8) ev(S.tWhy + 0.3, 'heart'); };
ME.sfx = (S, ev) => { ev(0.4, 'whoosh'); if (S.tLetter < 1e8) ev(S.tLetter + 0.4, 'sting'); if (S.tTama < 1e8) for (let k = 0; k < 6; k++) ev(S.tTama + 0.7 + k * 0.66, 'stamp'); if (S.tShoe < 1e8) ev(S.tShoe + 0.3, 'type'); if (S.tGun < 1e8) ev(S.tGun + 0.3, 'clang'); if (S.tTape < 1e8) ev(S.tTape + 0.4, 'shine'); };
MF.sfx = (S, ev) => { ev(at(S, 'L36', 3) - 0.1, 'stamp'); if (S.tChina < 1e8) ev(S.tChina + 0.3, 'clang'); if (S.tCanada < 1e8) ev(S.tCanada + 1, 'whoosh'); if (S.tPrint < 1e8) ev(S.tPrint + 0.4, 'type'); if (S.tStore < 1e8) ev(S.tStore + 0.4, 'wind', 3); if (S.tNight < 1e8) ev(S.tNight + 0.3, 'wind', 4); };
MM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.8, 'gun'); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.2 + k * 0.45, 'thump'); };
MM.bgmTrack = (S, tr) => { tr.fin = 3; };
MM.ending = true;
[MZ, MA, MB, MC, MD, ME, MF, MM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { flowers3(c, t, 262, 214); }
function THUMB(c, t) { thumbBigFace(c, { face: kinkoFace({}), s: 3.6, rim: '#c81818', rimA: 0.35, title: ['八王子スーパー', '強盗殺人事件'], hook: '金庫の金は残された', bg: ['#0c0c14', '#3c3c4c'] }, t); }
