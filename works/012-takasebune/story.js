/* ================= 文庫 #012 高瀬舟: story plan ================= */
const EXPR = {};
['L30', 'L31', 'L33b'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { shobe: { name: '羽田庄兵衛', bg: ['#0c0c1c', '#2c2c44'] }, kisuke: { name: '喜助', bg: ['#0c0c1c', '#3c3c5c'] }, otouto: { name: '弟', bg: ['#0c0808', '#2c1c1c'] } };
const HOOK = ['高瀬舟', '弟殺しの男は、笑っていた'];
const PLAN_FULL = [
  { sc: GZ, pre: 0.8, items: ['C0', 0.8, 'C1', 1.0, 'C2', 1.0, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: GA, pre: 1.0, items: ['L1', 0.6, 'L1b', 0.8, 'L2', 0.8, 'L3', 0.6, 'L3c', 0.8, 'L3b'], tr: 'dither', td: 1.0 },
  { sc: GB, pre: 1.0, items: ['L4', 0.8, 'L5', 0.8, 'L6', 0.6, 'L6b'], tr: 'dither', td: 1.0 },
  { sc: GC, pre: 1.2, items: ['L7', 0.8, 'L8', 0.8, 'L9', 0.6, 'L9b', 0.8, 'L9c'], tr: 'blinds', td: 1.2 },
  { sc: GD, pre: 0.8, items: ['L10', 0.6, 'V1', 0.8, 'V2', 0.8, 'L11', 0.6, 'K1', 0.6, 'K2', 0.8, 'L12', 0.6, 'K3', 0.6, 'L12b', 0.8, 'K4', 1.0, 'L13'], tr: 'dither', td: 1.0 },
  { sc: GE, pre: 1.0, items: ['L14', 0.8, 'L15', 0.8, 'L16', 0.8, 'L16b', 0.8, 'L17', 0.6, 'L17b', 1.0, 'L18'], tr: 'dither', td: 1.0 },
  { sc: GF, pre: 1.6, items: ['L19', 0.6, 'V3', 0.8, 'L20', 0.8, 'L21', 0.6, 'L22', 0.6, 'L22b'], tr: 'blinds', td: 1.0 },
  { sc: GG, pre: 1.2, items: ['L23', 0.8, 'L24', 0.6, 'O1', 0.6, 'O2', 0.8, 'L25', 0.8, 'L26', 0.6, 'K5', 0.8, 'L26b', 1.4, 'L27', 0.8, 'L27b', 1.6, 'L28', 1.0, 'L28b'], tr: 'dither', td: 1.2 },
  { sc: GH, pre: 1.2, items: ['L29', 0.8, 'L30', 0.8, 'L30b', 1.2, 'L31', 0.8, 'L32', 0.8, 'L33', 0.6, 'L33b'], tr: 'dither', td: 1.2 },
  { sc: GI, pre: 1.2, items: ['L34', 1.4, 'L35'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the hazy night, he gazes at the moon → "喜助。お前何を思っているのか" → mid-hook T2 → a place to stay; 200 mon → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: GC, pre: 0.3, items: ['L7', 0.4, 'L8', 0.4, 'L9'], tr: 'dither', td: 0.4 },
  { sc: GD, pre: 0.3, items: ['V1', 0.5, 'T2', 0.5, 'L11', 0.3, 'K1', 0.4, 'K2'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
GZ.sfx = (S, ev) => { ev(0.3, 'toll'); ev(2.5, 'toll'); if (S.tBoat < 1e8) ev(S.tBoat + 0.5, 'splash'); if (S.tFace < 1e8) ev(S.tFace + 0.4, 'sparkle'); };
GA.sfx = (S, ev) => { ev(0.3, 'splash'); if (S.tExile < 1e8) ev(S.tExile + 0.3, 'stamp'); if (S.tWeep < 1e8) ev(S.tWeep + 0.4, 'wind', 3); };
GB.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tShobe < 1e8) for (let k = 0; k < 4; k++) ev(S.tShobe + 0.3 + k * 0.5, 'step'); };
GC.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(1.5, 'splash'); if (S.tGaze < 1e8) ev(S.tGaze + 0.4, 'sparkle'); };
GD.sfx = (S, ev) => { ev(0.4, 'splash'); if (S.tCoins < 1e8) { ev(S.tCoins + 0.3, 'shine'); ev(S.tCoins + 0.8, 'clang'); } };
GE.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tAbacus < 1e8) for (let k = 0; k < 6; k++) ev(S.tAbacus + 0.3 + k * 0.3, 'tick'); if (S.tHalo < 1e8) ev(S.tHalo + 0.3, 'shine'); };
GF.sfx = (S, ev) => { ev(0.4, 'toll'); if (S.tLoom < 1e8) for (let k = 0; k < 8; k++) ev(S.tLoom + 0.3 + k * 0.5, 'tick'); };
GG.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tBlood < 1e8) ev(S.tBlood + 0.2, 'sting'); if (S.tEyes < 1e8) for (let k = 0; k < 4; k++) ev(S.tEyes + 0.4 + k * 0.8, 'heart'); if (S.tPull < 1e8) ev(S.tPull + 0.8, 'stab'); if (S.tBaba < 1e8) { ev(S.tBaba, 'slam'); ev(S.tBaba + 0.3, 'excl'); for (let k = 0; k < 5; k++) ev(S.tBaba + 0.6 + k * 0.25, 'step'); } if (S.tGone < 1e8) ev(S.tGone + 0.5, 'toll'); };
GH.sfx = (S, ev) => { ev(0.3, 'splash'); if (S.tUp < 1e8) ev(S.tUp + 0.3, 'gavel'); };
GI.sfx = (S, ev) => { ev(0.3, 'splash'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'toll'); ev(0.8, 'splash'); };
SS2.sfx = (S, ev) => { ev(0.3, 'splash'); };
GI.bgmTrack = (S, tr) => { tr.fin = 3; };
GI.ending = true;
[GZ, GA, GB, GC, GD, GE, GF, GG, GH, GI, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { robe(c, KISUKE, 282, 230, { k: 'td', pose: 'sit' }); }
[GZ, GA, GB, GC, GD, GE, GF, GG, GH, GI, SS1, SS2].forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 18; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 6; for (let i = 0; i < 26; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (6 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.3 + 0.2 * Math.sin(t * 2 + i); R(c, x, y, i % 4 ? 1 : 2, i % 4 ? 1 : 2, '#e8e4f0'); c.restore(); } } return r; }; });
