/* ================= 文庫 #010 鏡地獄: story plan ================= */
const EXPR = {};
['L44', 'L45', 'L37'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { kare: { name: '彼', bg: ['#0c1018', '#2c3c4c'] }, maid: { name: '小間使い', bg: ['#1c1014', '#4c2c3c'] } };
const HOOK = ['鏡地獄', '鏡に取りつかれた男――'];
const PLAN_FULL = [
  { sc: MZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: MA, pre: 1.0, items: ['L1', 0.6, 'L2', 0.8, 'L3', 0.4, 'V1', 0.8, 'L4', 0.6, 'L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: MB, pre: 0.8, items: ['L7', 0.8, 'L8', 0.8, 'L9', 0.4, 'V2', 0.8, 'L10', 0.8, 'L11', 0.6, 'L11b', 0.8, 'L12', 0.6, 'L13'], tr: 'dither', td: 1.0 },
  { sc: MC, pre: 0.8, items: ['L14', 0.4, 'V3', 0.8, 'L15', 0.6, 'L15b', 0.8, 'L16', 1.2, 'L17', 0.6, 'V4', 0.8, 'L18', 0.6, 'L18b'], tr: 'dither', td: 1.0 },
  { sc: MD, pre: 1.6, items: ['L19', 1.0, 'L20', 0.8, 'L21', 0.8, 'L22', 0.8, 'L23', 0.6, 'L23b'], tr: 'blinds', td: 1.0 },
  { sc: ME, pre: 0.8, items: ['L24', 0.6, 'L25', 0.8, 'L26', 0.8, 'L27', 0.6, 'L27b'], tr: 'dither', td: 1.0 },
  { sc: MF, pre: 1.2, items: ['L28', 0.4, 'V5', 0.8, 'L29', 0.8, 'L30', 0.8, 'L31', 0.8, 'L32', 0.8, 'L33'], tr: 'dither', td: 1.0 },
  { sc: MG, pre: 0.8, items: ['L34', 1.6, 'L35', 0.8, 'L36', 0.6, 'L36b', 1.0, 'L37'], tr: 'dither', td: 1.0 },
  { sc: MH, pre: 1.0, items: ['L38', 1.4, 'L39', 0.8, 'L39b', 1.4, 'L40', 1.0, 'L41', 0.8, 'L42', 0.8, 'L43', 1.2, 'L44', 0.8, 'L45', 1.2, 'L46'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → that morning, the rolling ball and the laughter → mid-hook T2 → the air hole, the broken handle → S2 (K lifts the hammer) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: MF, pre: 0.3, items: ['L28', 0.4, 'V5', 0.4, 'L29', 0.4, 'L30', 0.4, 'L31', 0.6, 'T2', 0.6, 'L32', 0.4, 'L33'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
MZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tFriend < 1e8) ev(S.tFriend + 0.3, 'shine'); if (S.tBall < 1e8) ev(S.tBall + 0.3, 'sting'); };
MA.sfx = (S, ev) => { ev(0.4, 'creak'); if (S.tKotobuki < 1e8) ev(S.tKotobuki + 0.3, 'shine'); if (S.tCreep < 1e8) ev(S.tCreep + 0.4, 'sting'); };
MB.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tLook < 1e8) ev(S.tLook + 0.3, 'sting'); if (S.tHo < 1e8) ev(S.tHo + 0.2, 'excl'); if (S.tBill < 1e8) ev(at(S, 'L11', 2), 'sparkle'); if (S.tDead < 1e8) ev(S.tDead + 0.3, 'toll'); };
MC.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tFlea < 1e8) ev(S.tFlea + 0.4, 'drip'); if (S.tDoor < 1e8) ev(S.tDoor + 0.2, 'creak'); if (S.tFace < 1e8) ev(S.tFace + 0.2, 'sting'); if (S.tEye < 1e8) ev(S.tEye + 0.3, 'sting'); };
MD.sfx = (S, ev) => { ev(0.6, 'toll'); if (S.tRoom < 1e8) for (let k = 0; k < 6; k++) ev(at(S, 'L20', 0) + k * 0.5, 'shine'); if (S.tIn < 1e8) ev(S.tIn + 0.3, 'heart'); if (S.tDoor < 1e8) { ev(S.tDoor + 0.4, 'thump'); ev(at(S, 'L23b', 1), 'door'); } };
ME.sfx = (S, ev) => { ev(0.3, 'breath'); if (S.tPile < 1e8) for (let k = 0; k < 5; k++) ev(S.tPile + 0.4 + k * 0.7, 'clang'); if (S.tFactory < 1e8) ev(S.tFactory + 0.3, 'burn'); if (S.tShow < 1e8) ev(S.tShow + 0.3, 'sparkle'); };
MF.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tRun < 1e8) for (let k = 0; k < 6; k++) ev(S.tRun + 0.2 + k * 0.25, 'step'); if (S.tLaugh < 1e8) ev(S.tLaugh + 0.2, 'breath'); if (S.tPale < 1e8) ev(S.tPale + 0.3, 'sting'); };
MG.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tHit < 1e8) { ev(S.tHit, 'thud'); ev(S.tHit + 0.05, 'clang'); } if (S.tOut < 1e8) ev(S.tOut + 0.4, 'breath'); if (S.tMad < 1e8) ev(S.tMad + 0.3, 'toll'); };
MH.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tSphere < 1e8) ev(S.tSphere + 0.3, 'shine'); if (S.tIn < 1e8) ev(S.tIn + 0.4, 'sting'); if (S.tDie < 1e8) ev(S.tDie + 0.3, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.4, 'heart'); };
MH.bgmTrack = (S, tr) => { tr.fin = 3; };
MH.ending = true;
[MZ, MA, MB, MC, MD, ME, MF, MG, MH, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { E(c, 282, 214, 14, 14, '#8c7c5c'); E(c, 282, 214, 11, 11, '#c8dce8'); }
// slow camera drift on every scene (the lab scenes are otherwise very still)
[MZ, MA, MB, MC, MD, ME, MF, MG, MH, SS1, SS2].forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 18; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 6; for (let i = 0; i < 26; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (6 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.35 + 0.25 * Math.sin(t * 2 + i); R(c, x, y, i % 4 ? 1 : 2, i % 4 ? 1 : 2, '#e8f0f8'); c.restore(); } } return r; }; });
