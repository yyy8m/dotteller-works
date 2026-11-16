/* ================= 記録 #015 ゾディアック事件: story plan ================= */
const EXPR = {};
const SPEAKERS_EXTRA = { zodiac: { name: 'ゾディアック', bg: ['#06060a', '#2c0c10'] } };
const HOOK = ['ゾディアック事件', '暗号を送る殺人者――'];
const PLAN_FULL = [
  { sc: ZX, pre: 0.8, items: ['M1', 1.0, 'C0', 0.8, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: ZA, pre: 1.0, items: ['L1', 0.6, 'L2', 0.6, 'L3', 0.6, 'L4', 1.2, 'L5', 1.0, 'L6'], tr: 'dither', td: 1.2 },
  { sc: ZB, pre: 0.8, items: ['L7', 0.6, 'L8', 0.6, 'L9', 0.8, 'L10', 0.8, 'L11', 0.6, 'V1', 0.6, 'L12'], tr: 'dither', td: 1.0 },
  { sc: ZC, pre: 0.8, items: ['L13', 0.6, 'L14', 0.8, 'L15', 0.4, 'V2', 0.6, 'L16', 0.8, 'L17', 0.6, 'L18', 0.6, 'L19'], tr: 'dither', td: 1.0 },
  { sc: ZD, pre: 1.0, items: ['L20', 0.6, 'L21', 0.6, 'L22', 1.4, 'L23', 1.0, 'L24', 0.8, 'L25', 0.6, 'L26'], tr: 'blinds', td: 1.0 },
  { sc: ZE, pre: 1.0, items: ['L27', 0.6, 'L28', 0.6, 'L29', 0.6, 'L30', 0.6, 'L31', 0.6, 'L32', 1.0, 'L33', 0.6, 'L34', 1.0, 'L35', 0.8, 'L35a'], tr: 'dither', td: 1.2 },
  { sc: ZF, pre: 0.8, items: ['L36', 0.8, 'L36a', 0.6, 'L36b', 0.6, 'L36c', 0.6, 'L36d', 0.8, 'L36e', 0.6, 'L36f', 0.8, 'L36g'], tr: 'dither', td: 1.0 },
  { sc: ZG, pre: 0.8, items: ['L37', 0.6, 'V3', 0.6, 'L38', 0.8, 'L39'], tr: 'dither', td: 1.0 },
  { sc: ZH, pre: 1.0, items: ['L40', 0.6, 'L41', 0.6, 'L42', 0.6, 'L43', 1.2, 'L44', 1.0, 'L45'], tr: 'dither', td: 1.2 },
  { sc: ZI, pre: 1.0, items: ['L46', 0.6, 'L47', 1.2, 'L48', 1.0, 'L49'], tr: 'dither', td: 1.2 },
  { sc: ZJ, pre: 1.0, items: ['L50', 1.0, 'L51', 1.2, 'L52'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut since 2026-11-15): S1 hook → the letters → mid-hook T2 at ~30 s → the taxi → 340 → S2 loops back into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: ZC, pre: 0.3, items: ['L13', 0.3, 'L14'], tr: 'dither', td: 0.4 },
  { sc: ZE, pre: 0.3, items: ['T2', 0.3, 'L28', 0.3, 'L29'], tr: 'dither', td: 0.4 },
  { sc: ZF, pre: 0.3, items: ['L36'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
ZX.sfx = (S, ev) => { ev(0.2, 'wind', 4); for (let k = 0; k < 6; k++) ev(0.4 + k * 0.7, 'whoosh'); ev(S.tScore, 'stamp'); ev(S.tNow + 0.2, 'toll'); };
ZA.sfx = (S, ev) => { ev(0.3, 'wind', 5); ev(S.tCar2, 'step'); for (let k = 0; k < 6; k++) ev(S.tShot + k * 0.28, 'gun'); ev(S.tNone + 0.2, 'siren'); ev(S.tNone + 1.2, 'stamp'); };
ZB.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(0.6 + k * 1.3, 'flash'); for (let k = 0; k < 5; k++) ev(S.tShot + k * 0.25, 'gun'); for (let k = 0; k < 4; k++) ev(S.tAgain + k * 0.25, 'gun'); if (S.tCall < 1e8) ev(S.tCall + 0.3, 'tick'); };
ZC.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(0.4 + k * 0.6, 'whoosh'); ev(at(S, 'L14', 4) - 0.3, 'sting'); if (S.tName < 1e8) ev(S.tName + 0.2, 'type'); if (S.tCouple < 1e8) ev(S.tCouple + 0.4, 'tick'); if (S.tText < 1e8) ev(S.tText, 'sparkle'); };
ZD.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tHood, 'step'); ev(S.tKnife, 'sting'); ev(S.tKnife + 0.4, 'stab'); ev(S.tKnife + 0.9, 'stab'); if (S.tDoor < 1e8) ev(S.tDoor + 0.3, 'type'); if (S.tCall < 1e8) ev(S.tCall + 0.3, 'tick'); };
ZE.sfx = (S, ev) => { ev(0.3, 'step'); ev(S.tShot, 'gun'); if (S.tCops < 1e8) ev(S.tCops, 'siren'); if (S.tShirt < 1e8) ev(S.tShirt + 0.3, 'whoosh'); if (S.tBus < 1e8) ev(S.tBus + 0.4, 'stamp'); if (S.tLast < 1e8) ev(S.tLast + 0.6, 'toll'); if (S.tFiles < 1e8) for (let k = 0; k < 6; k++) ev(S.tFiles + 0.4 + k * 0.4, 'drop'); };
ZF.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tK < 1e8) { ev(S.tFix + 0.3, 'clang'); ev(S.tOff + 0.4, 'thud'); ev(S.tRun, 'sting'); ev(S.tRun + 0.3, 'step'); ev(S.tStation + 0.4, 'excl'); ev(S.tFire, 'burn', 5); } };
ZG.sfx = (S, ev) => { for (let k = 1; k <= 6; k += 2) ev(at(S, 'L37', k) - 0.3, 'stamp'); if (S.tCard < 1e8) ev(S.tCard + 0.2, 'sting'); if (S.tQuiet < 1e8) ev(S.tQuiet, 'toll'); };
ZH.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tProps < 1e8) for (let k = 0; k < 6; k++) ev(S.tProps + 0.3 + k * 0.3, 'type'); if (S.tPhoto < 1e8) ev(at(S, 'L43', 2), 'excl'); if (S.tDNA < 1e8) ev(at(S, 'L45', 3), 'stamp'); };
ZI.sfx = (S, ev) => { ev(0.3, 'type'); ev(at(S, 'L46', 4) + 0.6, 'stamp'); if (S.tText < 1e8) for (let k = 0; k < 6; k++) ev(S.tText + k * 0.4, 'type'); if (S.tNo < 1e8) ev(S.tNo + 0.3, 'stamp'); };
ZJ.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(S.tScore + 0.3, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'type'); ev(0.8, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.2, 'type'); };
ZJ.bgmTrack = (S, tr) => { tr.fin = 3; };
ZJ.ending = true;
ZX.wideDY = 0; ZA.wideDY = 30; ZB.wideDY = (t, S) => (t > S.tCall ? 26 : 30); ZC.wideDY = (t, S) => (t > S.tCouple ? 30 : 0); ZD.wideDY = (t, S) => (t > S.tCall ? 26 : t > S.tDoor ? 0 : 30);
ZE.wideDY = (t, S) => (t > S.tFiles ? 30 : t > S.tShirt ? 0 : 30); ZF.wideDY = (t, S) => (t < S.tK ? 0 : 30); ZG.wideDY = 0; ZH.wideDY = (t, S) => (t > S.tDNA || (t > S.tProps && t < S.tBut) ? 0 : t > S.tBut ? 10 : 30); ZI.wideDY = 0; ZJ.wideDY = 0; SS1.wideDY = 0; SS2.wideDY = 0;
function TITLE_DECO(c, t) { zsym(c, 290, 214, 14, '#c81818', 2); }
