/* ================= 都市伝説 #007 テケテケ: story plan ================= */
const EXPR = {};
['L28', 'L28x'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { teke: { name: 'テケテケ', bg: ['#0c0814', '#2c2440'] }, shonen: { name: '男子生徒', bg: ['#1c0c0c', '#5c2c2c'] } };
const HOOK = ['テケテケ', '上半身だけの女が、追ってくる'];
const PLAN_FULL = [
  { sc: TKZ, pre: 0.8, items: ['M1', 1.2, 'C0', 1.0, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: TKA, pre: 1.2, items: ['L1', 1.0, 'L1x'], tr: 'dither', td: 1.0 },
  { sc: TKB, pre: 1.2, items: ['L2', 1.0, 'L3', 0.8, 'L3x', 1.4, 'L4', 1.2, 'L5', 1.0, 'L5x', 1.2, 'L6', 1.0, 'L6x'], tr: 'blinds', td: 1.0 },
  { sc: TKC, pre: 1.2, items: ['L7', 1.0, 'L7x', 1.0, 'L8', 1.0, 'L9', 1.0, 'L9x', 1.2, 'L10'], tr: 'dither', td: 1.0 },
  { sc: TKD, pre: 1.4, items: ['L11', 0.8, 'L11x', 1.0, 'L12', 1.0, 'L12x', 1.0, 'L12y', 1.2, 'L13', 0.8, 'M2', 1.0, 'L14', 0.8, 'L14x', 1.2, 'M3', 1.0, 'L15', 1.0, 'L15x', 1.8, 'L16', 1.0, 'L16x', 0.4, 'B1', 0.6, 'L17', 0.8, 'L17x'], tr: 'dither', td: 1.0 },
  { sc: TKE, pre: 1.4, items: ['L18', 1.0, 'L18x', 1.6, 'L19', 1.4, 'L19x', 1.2, 'L19y'], tr: 'blinds', td: 0.4 },
  { sc: TKH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: TKF, pre: 1.2, items: ['L20', 1.0, 'L20x', 1.4, 'L21'], tr: 'dither', td: 1.0 },
  { sc: TKG, pre: 1.2, items: ['L22', 1.0, 'L23', 1.0, 'L23x', 1.0, 'L24', 1.0, 'L24x', 1.0, 'L25'], tr: 'dither', td: 1.0 },
  { sc: TKI, pre: 1.2, items: ['L26', 1.0, 'L26x', 1.0, 'L27', 1.0, 'L27y', 1.0, 'L27x', 1.2, 'L28', 1.0, 'L28x'], tr: 'dither', td: 1.2 },
  { sc: TKM, pre: 1.2, items: ['L29', 1.0, 'M4', 1.2, 'L30', 1.2, 'L31'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the walk, the sound, nothing behind, nearer → mid-hook T2 → she runs, the chase, the stairs → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: TKD, pre: 0.1, items: ['L12x', 0.2, 'L13', 0.2, 'M2', 0.3, 'L14x', 0.2, 'M3', 0.2, 'L15x', 0.6, 'T2', 0.2, 'B1', 0.2, 'L17'], tr: 'dither', td: 0.3 },
  { sc: TKE, pre: 0.1, items: ['L18', 0.2, 'L18x', 0.6, 'L19'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
const TEKE_SFX = (ev, t0, n = 6, gap = 0.18) => { for (let k = 0; k < n; k++) ev(t0 + k * gap, 'tick'); };
TKZ.sfx = (S, ev) => { TEKE_SFX(ev, 0.3, 8, 0.3); if (S.tRoad < 1e8) TEKE_SFX(ev, S.tRoad + 1, 8, 0.25); if (S.tSee < 1e8) { ev(S.tSee + 0.2, 'sting'); TEKE_SFX(ev, S.tSee + 1, 16, 0.12); } if (S.tName < 1e8) ev(S.tName + 1.5, 'toll'); };
TKA.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tForm < 1e8) for (let i = 0; i < 3; i++) ev(S.tForm + 0.6 + i * 0.8, 'stamp'); };
TKB.sfx = (S, ev) => { ev(0.3, 'wind', 5); if (S.tFall < 1e8) ev(S.tFall + 0.3, 'thud'); if (S.tTrain < 1e8) for (let k = 0; k < 6; k++) ev(S.tTrain + 0.3 + k * 0.5, 'tick'); if (S.tHorn < 1e8) { ev(S.tHorn + 0.1, 'siren'); ev(S.tHorn + 0.4, 'whoosh'); } if (S.tCold < 1e8) ev(S.tCold + 0.3, 'wind', 5); if (S.tCrawl < 1e8) for (let k = 0; k < 8; k++) ev(S.tCrawl + 0.5 + k * 0.7, 'step'); if (S.tSince < 1e8) ev(S.tSince + 0.4, 'sting'); };
TKC.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tLook < 1e8) ev(S.tLook + 0.3, 'heart'); if (S.tSound < 1e8) TEKE_SFX(ev, S.tSound + 0.4, 16, 0.12); if (S.tSpeed < 1e8) ev(S.tSpeed + 0.3, 'whoosh'); if (S.tCaught < 1e8) ev(at(S, 'L10', 1) - 0.1, 'sting'); };
TKD.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tCross < 1e8) for (let k = 0; k < 8; k++) ev(S.tCross + 0.3 + k * 0.5, 'tick'); if (S.tHear < 1e8) TEKE_SFX(ev, S.tHear + 0.6, 4, 0.3); if (S.tNear < 1e8) ev(S.tNear + 0.3, 'heart'); if (S.tNo < 1e8) ev(S.tNo + 0.1, 'sting'); if (S.tRun < 1e8) TEKE_SFX(ev, S.tRun + 0.3, 16, 0.12); if (S.tFlee < 1e8) TEKE_SFX(ev, S.tFlee + 0.2, 30, 0.1); };
TKE.sfx = (S, ev) => { TEKE_SFX(ev, 0.3, 12, 0.12); if (S.tStairs < 1e8) for (let k = 0; k < 8; k++) ev(S.tStairs + 0.3 + k * 0.25, 'step'); if (S.tStop < 1e8) ev(S.tStop + 0.2, 'heart'); if (S.tLook < 1e8) ev(S.tLook + 0.4, 'breath'); };
TKH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
TKF.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tEnd < 1e8) ev(S.tEnd + 0.3, 'wind', 4); };
TKG.sfx = (S, ev) => { ev(0.3, 'whoosh'); if (S.tForms < 1e8) for (const i of [0, 2, 4]) ev(at(S, 'L23', i) - 0.2, 'stamp'); if (S.tDays < 1e8) for (let i = 0; i < 3; i++) ev(S.tDays + 0.6 + i * 0.7, 'stamp'); };
TKI.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tHome < 1e8) for (let k = 0; k < 6; k++) ev(S.tHome + 0.4 + k * 0.5, 'step'); if (S.tCross < 1e8) { for (let k = 0; k < 8; k++) ev(S.tCross + 0.3 + k * 0.5, 'tick'); ev(S.tCross + 3.2, 'whoosh'); } };
TKM.sfx = (S, ev) => { TEKE_SFX(ev, 1.0, 6, 0.3); ev(S.tEnd - 2, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); TEKE_SFX(ev, 0.5, 14, 0.12); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.2 + k * 0.5, 'step'); };
TKM.bgmTrack = (S, tr) => { tr.fin = 3; };
TKM.ending = true;
[TKZ, TKA, TKB, TKC, TKD, TKE, TKH0, TKF, TKG, TKI, TKM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { teke(c, t, 282, 226, { s: 1.5 }); }
function THUMB(c, t) { thumbBigFace(c, { face: tekeFace({ dark: true }), s: 3.6, rim: '#c81818', rimA: 0.35, title: ['テケテケ'], hook: '上半身だけの女が追ってくる', bg: ['#0c0814', '#2c2440'] }, t); }
