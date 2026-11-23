/* ================= 文庫 #009 藪の中: story plan ================= */
const EXPR = {};
['O2', 'M2', 'M3', 'D5', 'D6'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { tajou: { name: '多襄丸', bg: ['#0c0c18', '#242c4c'] }, masago: { name: '真砂', bg: ['#1c0c14', '#4c2c3c'] }, takehiro: { name: '武弘の死霊', bg: ['#02020a', '#141c3c'] }, kikori: { name: '木こり', bg: ['#1c2414', '#4c5c34'] }, houshi: { name: '旅法師', bg: ['#14141c', '#3c3c4c'] }, houmen: { name: '放免', bg: ['#1c0c08', '#4c2c1c'] }, ouna: { name: '媼', bg: ['#14100c', '#3c3028'] } };
const HOOK = ['藪の中', '犯人は、三人いる'];
const PLAN_FULL = [
  { sc: YZ, pre: 0.8, items: ['C0', 1.0, 'C1', 1.0, 'C2', 1.0, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: YA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.6, 'K1'], tr: 'dither', td: 1.0 },
  { sc: YB, pre: 0.8, items: ['L3', 0.8, 'K2', 0.8, 'L4'], tr: 'dither', td: 1.0 },
  { sc: YC, pre: 1.0, items: ['L5', 0.6, 'H1', 0.8, 'L6', 0.6, 'H2'], tr: 'blinds', td: 1.0 },
  { sc: YD, pre: 1.0, items: ['L7', 0.6, 'B1', 0.8, 'L8', 0.6, 'B2'], tr: 'dither', td: 1.0 },
  { sc: YE, pre: 1.0, items: ['L9', 0.6, 'O1', 0.8, 'L10', 0.6, 'O2', 0.8, 'L11'], tr: 'dither', td: 1.0 },
  { sc: YF, pre: 1.0, items: ['L12', 0.6, 'T1', 0.8, 'L13', 0.6, 'T2', 0.8, 'L14'], tr: 'blinds', td: 1.0 },
  { sc: YG, pre: 0.8, items: ['L15', 0.8, 'L16', 0.6, 'L17', 0.8, 'L18', 0.6, 'T3', 0.6, 'L19', 0.8, 'T4', 0.8, 'L20', 0.6, 'T5'], tr: 'dither', td: 1.0 },
  { sc: YH, pre: 1.4, items: ['L21', 1.4, 'L22', 0.8, 'L23', 0.6, 'M1', 0.8, 'L24', 1.0, 'M2'], tr: 'iris', td: 1.4 },
  { sc: YI, pre: 1.0, items: ['L25', 0.6, 'M3', 0.8, 'M4', 1.2, 'L26', 1.2, 'L27', 1.0, 'L28'], tr: 'dither', td: 1.2 },
  { sc: YJ, pre: 1.2, items: ['L29', 1.0, 'L30', 0.8, 'D1', 0.8, 'L31', 1.2, 'D2'], tr: 'blinds', td: 1.2 },
  { sc: YK, pre: 1.2, items: ['L32', 0.8, 'D3', 0.8, 'L33', 0.6, 'D4', 1.0, 'L34', 1.0, 'D5'], tr: 'dither', td: 1.0 },
  { sc: YL, pre: 1.6, items: ['L35', 1.4, 'D6', 1.4, 'L36', 1.0, 'D7', 1.6, 'L37'], tr: 'dither', td: 1.4 },
  { sc: YM, pre: 1.4, items: ['L38', 1.0, 'L39', 1.4, 'L40'], tr: 'iris', td: 1.4 },
  { sc: YN, pre: 1.2, items: ['L41'], tr: 'dither', td: 1.2 },
];
// Short / TikTok (same cut): S1 → Tajomaru: "殺したのは、わたしです", the veil → Masago: "お命を頂かせて", "殺せ" → mid-hook TM, the ghost: "どこへでも", "あの人を殺して" → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: YF, pre: 0.3, items: ['T1', 0.5, 'T2'], tr: 'dither', td: 0.4 },
  { sc: YI, pre: 0.3, items: ['M4', 0.5, 'L26'], tr: 'dither', td: 0.4 },
  { sc: YJ, pre: 0.3, items: ['TM', 0.5, 'D2'], tr: 'dither', td: 0.4 },
  { sc: YK, pre: 0.3, items: ['D3', 0.4, 'L33'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
YZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(1.5, 'creak'); if (S.tWho < 1e8) { ev(S.tWho + 0.3, 'sting'); for (let k = 0; k < 3; k++) ev(S.tWho + 2 + k * 2.5, 'stamp'); } };
YA.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tKikori < 1e8) for (let k = 0; k < 4; k++) ev(S.tKikori + 0.3 + k * 0.5, 'step'); };
YB.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(1.2, 'drip'); if (S.tTrample < 1e8) ev(S.tTrample + 0.3, 'crackle'); };
YC.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tRoad < 1e8) for (let k = 0; k < 6; k++) ev(S.tRoad + 0.4 + k * 0.5, 'step'); if (S.tQuiver < 1e8) ev(S.tQuiver + 0.3, 'shine'); };
YD.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tBridge < 1e8) { ev(S.tBridge + 0.3, 'wind', 3); ev(S.tBridge + 1.0, 'splash'); } };
YE.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tCry < 1e8) ev(S.tCry + 0.3, 'toll'); };
YF.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tVeil < 1e8) { ev(S.tVeil + 0.2, 'whoosh'); ev(S.tFace + 0.2, 'sparkle'); } if (S.tLure < 1e8) ev(S.tLure + 0.3, 'shine'); };
YG.sfx = (S, ev) => { ev(0.3, 'thud'); if (S.tKnife < 1e8) ev(S.tKnife + 0.2, 'flash'); if (S.tDrop < 1e8) ev(S.tDrop + 0.2, 'clang'); if (S.tCling < 1e8) ev(S.tCling + 0.2, 'excl'); if (S.tDuel < 1e8) for (let k = 0; k < 8; k++) ev(S.tDuel + 0.2 + k * 0.33, 'clang'); if (S.tGone < 1e8) ev(S.tGone + 0.3, 'wind', 3); };
YH.sfx = (S, ev) => { ev(0.4, 'gavel'); if (S.tKiyo < 1e8) ev(S.tKiyo + 0.3, 'toll'); if (S.tKick < 1e8) ev(S.tKick + 0.8, 'thud'); if (S.tEyes < 1e8) ev(S.tEyes + 0.2, 'sting'); };
YI.sfx = (S, ev) => { ev(0.4, 'wind', 3); if (S.tStab < 1e8) ev(S.tStab, 'stab'); if (S.tPond < 1e8) ev(S.tPond + 0.4, 'drop'); };
YJ.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tMiko < 1e8) { ev(S.tMiko + 0.3, 'sparkle'); ev(S.tMiko + 2.5, 'wind', 3); } };
YK.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tPoint < 1e8) ev(S.tPoint + 0.2, 'sting'); if (S.tFlee < 1e8) for (let k = 0; k < 5; k++) ev(S.tFlee + 0.2 + k * 0.25, 'step'); if (S.tCut < 1e8) ev(S.tCut + 0.3, 'snap'); };
YL.sfx = (S, ev) => { if (S.tStab < 1e8) ev(S.tStab, 'stab'); if (S.tShadow < 1e8) for (let k = 0; k < 4; k++) ev(S.tShadow + 0.4 + k * 0.9, 'step'); if (S.tHand < 1e8) ev(S.tHand + 1.4, 'sting'); if (S.tVoid < 1e8) ev(S.tVoid + 0.3, 'heart'); };
YM.sfx = (S, ev) => { ev(0.4, 'stamp'); if (S.tAsk < 1e8) ev(S.tAsk + 0.3, 'wind', 3); };
YN.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(2.4, 'stamp'); ev(4.6, 'stamp'); };
SS2.sfx = (S, ev) => { ev(0.3, 'wind'); };
YN.bgmTrack = (S, tr) => { tr.fin = 3; };
YN.ending = true;
const ALL = [YZ, YA, YB, YC, YD, YE, YF, YG, YH, YI, YJ, YK, YL, YM, YN, SS1, SS2];
ALL.forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { robe(c, TAJOU, 282, 230, { k: 'td', expr: 'smile' }); }
ALL.forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 16; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 5; for (let i = 0; i < 18; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (5 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.2 + 0.15 * Math.sin(t * 2 + i); R(c, x, y, 1, 1, '#e8e4d0'); c.restore(); } } return r; }; });
