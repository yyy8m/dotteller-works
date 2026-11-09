/* ================= 記録 #004 切り裂きジャック: story plan ================= */
const EXPR = {};
['C0', 'L0', 'L1', 'L3', 'L4', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L27', 'S1', 'S2', 'J1', 'A1', 'D1', 'W1', 'M1'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L13b', 'L2', 'L5', 'L13', 'L25', 'L26'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { man: { name: '鹿撃ち帽の男', bg: ['#0c0a0e', '#1c1820'] }, annie: { name: 'アニー', bg: ['#3c2c34', '#5c4450'] }, writer: { name: '手紙の主', bg: ['#2c0c0c', '#4c1414'] },
  warren: { name: 'チャールズ・ウォーレン', bg: ['#141c34', '#24304c'] }, macnaghten: { name: 'マクノートン', bg: ['#1c1c24', '#34343c'] } };
const HOOK = ['5人を殺した男の名を', '今も、誰も知らない'];
const PLAN_FULL = [
  { sc: RD, pre: 0.8, items: ['C0', 0.8, 'J1', 0.5, 'A1', 1.4, 'C1'], tr: 'fromBlack', td: 0.8 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: RA, pre: 1.0, items: ['L1'], tr: 'dither', td: 1.2 },
  { sc: RB, pre: 0.6, items: ['L2', 0.5, 'L3'], tr: 'dither', td: 1.0 },
  { sc: RC, pre: 0.8, items: ['L4', 0.6, 'L5'], tr: 'dither', td: 1.0 },
  { sc: RD, pre: 0.6, items: ['L6', 0.6, 'L7'], tr: 'dither', td: 1.0 },
  { sc: RE, pre: 0.8, items: ['L8', 0.5, 'D1', 0.8, 'L9'], tr: 'blinds', td: 1.0 },
  { sc: RF, pre: 0.8, items: ['L10', 0.6, 'L11'], tr: 'dither', td: 1.0 },
  { sc: RG, pre: 0.8, items: ['L12'], tr: 'dither', td: 1.0 },
  { sc: RH, pre: 0.8, items: ['L13', 1.2, 'L13b'], tr: 'dither', td: 1.2 },
  { sc: RX, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: RI, pre: 0.8, items: ['L14', 0.5, 'L15'], tr: 'dither', td: 1.0 },
  { sc: RJ, pre: 0.6, items: ['L16', 0.3, 'W1'], tr: 'dither', td: 1.0 },
  { sc: RK, pre: 0.6, items: ['L17'], tr: 'blinds', td: 0.8 },
  { sc: RL, pre: 0.8, items: ['L18', 0.6, 'L19', 0.3, 'M1'], tr: 'dither', td: 1.0 },
  { sc: RM, pre: 0.8, items: ['L20', 0.6, 'L21', 1.0, 'L22'], tr: 'dither', td: 1.0 },
  { sc: RN, pre: 0.8, items: ['L23', 0.5, 'L24'], tr: 'dither', td: 1.0 },
  { sc: RO, pre: 1.0, items: ['L25', 1.0, 'L26', 1.2, 'L27'], tr: 'dither', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.4, items: ['S1'], tr: 'fromBlack', td: 0.4 },
  { sc: RD, pre: 0.3, items: ['J1', 0.4, 'A1'], tr: 'dither', td: 0.6 },
  { sc: RE, pre: 0.3, items: ['D1', 0.4, 'L9'], tr: 'blinds', td: 0.6 },
  { sc: RM, pre: 0.3, items: ['L22', 0.4, 'S2'], tr: 'dither', td: 0.6 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: RD, pre: 0.4, items: ['C0', 0.5, 'J1', 0.4, 'A1', 0.8, 'C1'], tr: 'dither', td: 0.6 },
  { sc: RE, pre: 0.4, items: ['L8', 0.3, 'D1', 0.5, 'L9'], tr: 'blinds', td: 0.6 },
  { sc: RM, pre: 0.4, items: ['T1'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_SHORT) : PLAN_FULL;
RA.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(0.4, 'wind', 4); };
RC.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.6 + k * 0.6, 'step'); ev(S.tLamp, 'sting'); ev(0.3, 'stamp'); };
RD.sfx = (S, ev) => { ev(0.3, 'stamp'); if (S.tTalk < 1e8) ev(S.tTalk, 'heart'); };
RE.sfx = (S, ev) => { ev(S.tHead, 'type'); if (S.tSign < 1e8) ev(S.tSign, 'sting'); if (S.tPress < 1e8) ev(S.tPress, 'whoosh'); };
RF.sfx = (S, ev) => { ev(0.4, 'toll'); ev(S.tSecond, 'toll'); if (S.tWall < 1e8) ev(S.tWall, 'type'); };
RG.sfx = (S, ev) => { ev(S.tBox, 'thump'); ev(S.tFrom, 'sting'); };
RH.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(1.5, 'toll'); };
RX.sfx = (S, ev) => { ev(0.25, 'sting'); for (let k = 0; k < 4; k++) ev(0.9 + k * 0.75, 'heart'); };
RI.sfx = (S, ev) => { ['L14'].forEach(id => { for (let k = 0; k < 3; k++) ev(at(S, id, k), 'stamp'); }); };
RK.sfx = (S, ev) => { ev(0.3, 'excl'); };
RL.sfx = (S, ev) => { if (S.tRep < 1e8) ev(S.tRep + 3, 'stamp'); };
RM.sfx = (S, ev) => { if (S.tBlitz < 1e8) { ev(S.tBlitz, 'thunder'); ev(S.tBlitz + 0.3, 'burn', 3); } if (S.tUnk < 1e8) ev(S.tUnk, 'sting'); };
RO.sfx = (S, ev) => { for (let i = 0; i < 5; i++) ev(at(S, 'L25', 6 + i) - 0.2, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.6, 'step'); };
RO.bgmTrack = (S, tr) => { tr.fin = 3; };
RO.ending = true;
RB.wideDY = 16; RE.wideDY = 0; RG.wideDY = 16; RJ.wideDY = 16; RL.wideDY = 0; RM.wideDY = 0; RO.wideDY = 0; RI.wideDY = 16; RK.wideDY = 0; RD.wideDY = 16;
[RE, RL, RM].forEach(sc => sc.tallFit = true);
function TITLE_DECO(c, t) { gasLamp(c, 270, 220, t); for (let i = 0; i < 3; i++) glow(c, 230 + i * 30, 205, 50, 10, '#8c94a8', 0.2); }
