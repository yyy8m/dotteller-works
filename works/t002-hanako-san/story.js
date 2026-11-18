/* ================= 都市伝説 #002 トイレの花子さん: story plan ================= */
const EXPR = {};
['L42', 'L26', 'L31'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { hanako: { name: '花子さん', bg: ['#0c1014', '#2c3c48'] } };
const HOOK = ['トイレの花子さん', '3番目の扉――'];
const PLAN_FULL = [
  { sc: HZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2', 0.6, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: HA, pre: 1.0, items: ['L1', 0.6, 'L1b', 0.8, 'L2', 0.6, 'L2b', 0.8, 'L3', 0.6, 'L3b', 0.8, 'L4', 0.6, 'L4b'], tr: 'dither', td: 1.0 },
  { sc: HB, pre: 0.8, items: ['L5', 0.6, 'L5b', 0.8, 'L6', 0.6, 'L7', 0.8, 'L8', 0.8, 'L9', 0.6, 'V1', 0.8, 'L9b', 0.8, 'L10', 0.6, 'L10b'], tr: 'blinds', td: 1.0 },
  { sc: HC, pre: 1.0, items: ['L11', 0.8, 'L12', 0.6, 'L12b', 0.8, 'L13', 0.6, 'L13b', 0.8, 'L14', 0.4, 'L14b', 0.8, 'L15', 0.4, 'L15b', 1.0, 'L16', 0.6, 'L16b', 1.2, 'L17', 1.0, 'V2', 1.0, 'L18', 0.8, 'L18b', 0.6, 'L18c'], tr: 'dither', td: 1.0 },
  { sc: HD, pre: 0.8, items: ['L19', 0.6, 'L19b', 0.8, 'L20', 0.6, 'L20b', 0.8, 'L21', 0.6, 'L21b', 0.8, 'L22', 0.6, 'L22b', 0.8, 'L23', 0.6, 'L23b'], tr: 'dither', td: 1.0 },
  { sc: HE, pre: 0.8, items: ['L24', 0.6, 'L24b', 0.8, 'L25', 0.6, 'L25b', 0.8, 'L26', 0.6, 'L26b'], tr: 'dither', td: 1.0 },
  { sc: HF, pre: 1.6, items: ['L27', 0.8, 'L28', 0.8, 'L29', 0.6, 'L29b', 0.8, 'L30', 0.8, 'L31', 0.6, 'L31b'], tr: 'blinds', td: 1.0 },
  { sc: HG, pre: 0.8, items: ['L32', 0.6, 'L32b', 0.8, 'L33', 0.6, 'L33b', 0.8, 'L34', 0.6, 'L34b', 0.8, 'L35', 0.6, 'L35b'], tr: 'dither', td: 1.0 },
  { sc: HH, pre: 0.8, items: ['L36', 0.8, 'L37', 0.6, 'L37b', 0.8, 'L38', 0.6, 'L38b', 0.8, 'L39', 0.6, 'L39b', 0.8, 'L40', 0.6, 'L40b'], tr: 'dither', td: 1.0 },
  { sc: HI, pre: 1.0, items: ['L41', 1.0, 'V3', 1.2, 'L42'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the dare after school → mid-hook T2 → silence, she turns… "なにして、あそぶ？" → S2 (her hand on the door) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: HC, pre: 0.3, items: ['L12', 0.4, 'L12b', 0.4, 'L13', 0.4, 'L14', 0.4, 'L15', 0.4, 'L16', 0.4, 'T2', 0.6, 'L17', 0.6, 'V2', 0.6, 'L18', 0.4, 'L18b'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
HZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tIn < 1e8) ev(S.tIn + 0.3, 'drip'); for (let k = 0; k < 3; k++) ev(at(S, 'C1', 1) - 0.3 + k * 0.45, 'thump'); if (S.tDoor < 1e8) ev(S.tDoor + 0.3, 'sting'); };
HA.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tBoom < 1e8) for (let k = 1; k < 4; k++) ev(at(S, 'L3', k), 'tick'); if (S.tDown < 1e8) for (let k = 0; k < 5; k++) ev(S.tDown + 0.4 + k * 0.6, 'step'); };
HB.sfx = (S, ev) => { ev(0.3, 'drip'); if (S.tRule < 1e8) for (let k = 0; k < 3; k++) ev(at(S, 'L7', 3) + k * 0.45, 'thump'); if (S.tReply < 1e8) ev(S.tReply + 0.4, 'sting'); if (S.tOpen < 1e8) ev(S.tOpen + 0.2, 'creak'); if (S.tMirror < 1e8) ev(S.tMirror + 0.4, 'sting'); };
HC.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.5, 'step'); if (S.tKnock < 1e8) for (let k = 0; k < 3; k++) ev(at(S, 'L14', 0) + k * 0.45, 'thump'); if (S.tQuiet < 1e8) for (let k = 0; k < 4; k++) ev(S.tQuiet + 0.4 + k * 1.1, 'drip'); if (S.tVoice < 1e8) ev(S.tVoice, 'sting'); if (S.tRun < 1e8) for (let k = 0; k < 12; k++) ev(S.tRun + 0.2 + k * 0.2, 'step'); };
HD.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tPull < 1e8) ev(S.tPull + 0.6, 'whoosh'); if (S.tKnockBack < 1e8) for (let k = 0; k < 6; k++) ev(S.tKnockBack + 0.4 + k * 0.45 + Math.floor(k / 3) * 0.25, 'thump'); if (S.tHand < 1e8) ev(S.tHand + 0.6, 'sting'); if (S.tTeach < 1e8) ev(S.tTeach + 0.3, 'step'); };
HE.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tWho < 1e8) ev(S.tWho + 0.3, 'toll'); if (S.tTrip < 1e8) ev(S.tTrip + 0.3, 'tick'); };
HF.sfx = (S, ev) => { ev(0.6, 'toll'); if (S.tCry < 1e8) ev(S.tCry + 1, 'sparkle'); if (S.tPlay < 1e8) ev(S.tPlay + 0.3, 'sparkle'); };
HG.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tAlone < 1e8) for (let k = 0; k < 4; k++) ev(S.tAlone + 0.4 + k * 1.2, 'drip'); };
HH.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tStill < 1e8) ev(S.tStill + 0.3, 'sting'); if (S.tYou < 1e8) for (let k = 0; k < 3; k++) ev(S.tYou + 0.6 + k * 0.45, 'thump'); };
HI.sfx = (S, ev) => { ev(0.3, 'creak'); ev(0.8, 'drip'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(0.4 + k * 0.45, 'thump'); };
SS2.sfx = (S, ev) => { ev(0.4, 'creak'); };
HI.bgmTrack = (S, tr) => { tr.fin = 3; };
HI.ending = true;
[HZ, HA, HB, HC, HD, HE, HF, HG, HH, HI, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { hanako(c, 282, 230, { s: 0.9 }); }
