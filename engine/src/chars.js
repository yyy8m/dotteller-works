/* ================= characters (procedural pixel sprites) ================= */
function ik(sx, sy, tx, ty, l1, l2, bend) { // 2-bone IK -> elbow
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy);
  const dm = Math.min(d, l1 + l2 - 0.01); if (d < 1e-3) { d = 1e-3; dx = 0; dy = 1; }
  const a = Math.acos(clamp((l1 * l1 + dm * dm - l2 * l2) / (2 * l1 * dm), -1, 1));
  const base = Math.atan2(dy, dx) + a * bend;
  return [sx + Math.cos(base) * l1, sy + Math.sin(base) * l1, sx + dx / d * dm, sy + dy / d * dm];
}
function limb(c, sx, sy, tx, ty, l1, l2, bend, w1, w2, c1, c2) {
  const [ex, ey, hx, hy] = ik(sx, sy, tx, ty, l1, l2, bend);
  L(c, sx, sy, ex, ey, c1, w1); L(c, ex, ey, hx, hy, c2 || c1, w2); return [ex, ey, hx, hy];
}
/* curls (螺髪) inside an ellipse */
function curls(c, cx, cy, rx, ry, ymax) {
  for (let y = Math.round(cy - ry) + 1; y < Math.min(ymax, cy + ry); y += 2) for (let x = Math.round(cx - rx) + ((y >> 1) & 1); x < cx + rx; x += 2) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy < 0.8) { P(c, x, y, C.hairB0); }
  }
}

/* ---------- お釈迦様 ---------- */
function buddhaHead(c, hx, hy, p) {
  const look = p.look || 0, sad = p.sad || 0;
  // long earlobe (back side)
  E(c, hx - 7, hy + 3, 2.2, 6, C.skinG2); E(c, hx - 7, hy + 2.5, 1.5, 5.2, C.skinG1); P(c, hx - 7, hy + 2, C.skinG2); P(c, hx - 7, hy + 6, C.skinG2);
  // face
  E(c, hx, hy + 1, 8.6, 9.2, C.skinG2); E(c, hx + 0.5, hy + 0.5, 8, 8.7, C.skinG1);
  E(c, hx - 1.5, hy - 1, 4.5, 4.5, DP(C.skinG1, C.skinG0, 8));
  // hair: dome of curls + ushnisha, hairline across forehead
  c.save(); c.beginPath(); c.rect(hx - 12, hy - 20, 24, 16.5); c.clip();
  E(c, hx, hy - 2, 9.4, 8.4, C.hairB1); c.restore();
  E(c, hx + 0.5, hy - 10.5, 5, 3.8, C.hairB1);
  curls(c, hx, hy - 2, 9.4, 8.4, hy - 3.5); curls(c, hx + 0.5, hy - 10.5, 5, 3.8, hy - 8);
  R(c, hx - 9, hy - 4, 18, 1, C.hairB2);
  P(c, hx + 2, hy - 5, '#e83838'); P(c, hx + 2, hy - 6, '#f8a0a0'); // 肉髻珠
  P(c, hx + 2, hy - 1, C.gold0); // 白毫
  const ey = hy + 2 + look;
  if (sad) { L(c, hx - 3, ey - 2, hx, ey - 3, C.skinG3); L(c, hx + 3, ey - 3, hx + 6, ey - 2, C.skinG3); }
  else { R(c, hx - 3, ey - 3, 4, 1, C.skinG2); R(c, hx + 3, ey - 3, 4, 1, C.skinG2); }
  if (p.blink === 2) { R(c, hx - 3, ey + 1, 4, 1, C.ol); R(c, hx + 3, ey + 1, 4, 1, C.ol); }
  else { R(c, hx - 3, ey, 4, 1, C.ol); R(c, hx + 3, ey, 4, 1, C.ol); if (p.blink !== 1) { R(c, hx - 2, ey + 1, 2, 1, C.k); R(c, hx + 4, ey + 1, 2, 1, C.k); } }
  P(c, hx + 7, hy + 3, C.skinG2); P(c, hx + 7, hy + 4, C.skinG2); P(c, hx + 6, hy + 5, C.skinG2);
  const my = hy + 7 + look;
  if (sad) { R(c, hx + 2, my, 4, 1, C.robe2); P(c, hx + 1, my + 1, C.robe2); P(c, hx + 6, my + 1, C.robe2); }
  else { R(c, hx + 2, my, 4, 1, C.robe2); P(c, hx + 6, my - 1, C.robe2); P(c, hx + 1, my - 1, C.robe2); }
}
function buddhaSpr(p) {
  const t = p.t, f = p.f;
  return SPR(p.id || 'bud', 60, 74, c => {
    const bob = f >= 0 ? [0, -1, 0, -1][f] : 0, tt = stepT(t, 10);
    const sw = k => Math.round(Math.sin(tt * 3 + k) * 1.2 + (f >= 0 ? [0, 1, 0, -1][f] * 0.8 : 0));
    // flowing scarf (天衣) behind
    for (let r = 0; r < 2; r++) {
      const pts = []; for (let i = 0; i <= 9; i++) pts.push(22 - i * 2.3 - r * 2.2, 30 + bob + i * 4 + Math.sin(tt * 2.6 - i * 0.7 + r) * (0.5 + i * 0.45));
      PL(c, pts, r ? C.scarf1 : C.scarf0, 2);
    }
    const ft = f >= 0 ? [[-5, 5], [-1, 2], [5, -5], [2, -1]][f] : [-3, 3];
    E(c, 32 + ft[1], 70, 3, 1.7, C.skinG2); E(c, 32 + ft[0], 70, 3.5, 1.8, C.skinG1);
    // back sleeve + hand
    PF(c, [20, 30 + bob, 25, 30 + bob, 24, 53 + bob, 17 + sw(1), 54 + bob], C.robe2);
    E(c, 20 + sw(1) * 0.5, 55 + bob, 2.4, 2.4, C.skinG1);
    // robe body: sloping shoulders, flared hem
    const hy = 66 + bob;
    PF(c, [25, 27 + bob, 39, 27 + bob, 44, 31 + bob, 46, 46 + bob, 49 + sw(0), hy, 15 + sw(2), hy, 18, 46 + bob, 20, 31 + bob], C.robe1);
    PF(c, [37, 28 + bob, 39, 27 + bob, 44, 31 + bob, 46, 46 + bob, 49 + sw(0), hy, 41, hy, 40, 46 + bob], DP(C.robe1, C.robe2, 7));
    PF(c, [25, 27 + bob, 31, 27 + bob, 30, 34 + bob, 22, 31 + bob], C.robe0);
    L(c, 23, 30 + bob, 44, 52 + bob, C.robe3); L(c, 23, 31 + bob, 44, 53 + bob, C.robe0);
    for (let k = 0; k < 3; k++) ER(c, 33, 30 + bob + k * 9, 9 - k, 5 + k, C.robe2, 0.3 * Math.PI, 0.7 * Math.PI);
    PF(c, [17 + sw(2), 59 + bob, 47 + sw(0), 59 + bob, 49 + sw(0), hy + 2, 15 + sw(2), hy + 2], C.under0);
    L(c, 17 + sw(2), 59 + bob, 47 + sw(0), 59 + bob, C.under1); for (let k = 0; k < 4; k++) L(c, 21 + k * 7 + sw(k), 61 + bob, 20 + k * 7 + sw(k), hy + 1, C.under1);
    // front arm: abhaya mudra, sleeve hanging from forearm
    PF(c, [41, 29 + bob, 46, 31 + bob, 48, 42 + bob, 43, 43 + bob], C.robe1);
    PF(c, [43, 40 + bob, 49, 40 + bob, 51 + sw(3), 55 + bob, 45 + sw(3), 53 + bob], C.robe2);
    L(c, 46, 40 + bob, 48, 33 + bob, C.skinG1, 3);
    E(c, 48.5, 31 + bob, 2.6, 3.6, C.skinG1); P(c, 49, 28 + bob, C.skinG0); P(c, 47, 32 + bob, C.skinG2);
    // neck & head
    R(c, 29, 22 + bob, 7, 6, C.skinG1); R(c, 30, 25 + bob, 5, 1, C.skinG2);
    buddhaHead(c, 32 + Math.round(p.look || 0), 12 + bob + Math.round((p.look || 0) * 1.5), p);
    // front scarf loop
    ER(c, 33, 43 + bob, 15, 5, C.scarf0, 0.05 * Math.PI, 0.95 * Math.PI); ER(c, 33, 44 + bob, 15, 5, C.scarf1, 0.1 * Math.PI, 0.9 * Math.PI);
  });
}
const BUD_AX = 32, BUD_AY = 71, BUD_HEAD = [32, 11];
function buddhaKneel(p) { // leaning over the pond, reaching down with the thread
  const t = p.t, b = p.bend || 0, rc = p.reach || 0;
  let hand = [0, 0];
  const spr = SPR(p.id || 'budk', 64, 64, c => {
    const a = b * 0.75, hip = [24, 50];
    const sh = [hip[0] + Math.sin(a) * 24, hip[1] - Math.cos(a) * 24];
    const sw = Math.round(Math.sin(stepT(t, 10) * 2.7) * 1.2);
    for (let r = 0; r < 2; r++) { const pts = []; for (let i = 0; i <= 7; i++) pts.push(sh[0] - 6 - i * 2.6 - r * 2, sh[1] + 2 + i * 3 + Math.sin(stepT(t, 10) * 2.4 - i * 0.7 + r) * (0.4 + i * 0.35)); PL(c, pts, r ? C.scarf1 : C.scarf0, 2); }
    E(c, 23, 55, 18 + sw * 0.3, 8, C.robe1); E(c, 26, 58, 16, 5, C.under0); R(c, 8, 60, 34, 3, C.under0);
    PF(c, [hip[0] - 10, hip[1] + 2, hip[0] + 10, hip[1] + 4, sh[0] + 9, sh[1] + 2, sh[0] - 8, sh[1] - 2], C.robe1);
    PF(c, [hip[0] + 2, hip[1] + 4, hip[0] + 10, hip[1] + 4, sh[0] + 9, sh[1] + 2, sh[0] + 3, sh[1] + 1], DP(C.robe1, C.robe2, 7));
    for (let k = 1; k < 4; k++) { const q = k / 4; ER(c, lerp(hip[0], sh[0], q), lerp(hip[1], sh[1], q), 7, 3, C.robe2, 0.2 * Math.PI, 0.8 * Math.PI); }
    E(c, 40, 59, 3, 2, C.skinG1); // knee-tucked foot
    const ht = [sh[0] + 8 + rc * 12, sh[1] + 10 + rc * 14 + Math.sin(t * 2) * 0.6];
    const [ex, ey] = limb(c, sh[0] + 4, sh[1] + 2, ht[0], ht[1], 11, 12, -1, 5, 4, C.robe1, C.robe2);
    PF(c, [ex - 2, ey, ex + 3, ey + 1, ex + 2 + sw, ey + 9, ex - 2 + sw, ey + 8], C.robe2);
    E(c, ht[0], ht[1], 2.5, 2.5, C.skinG1); hand = [ht[0] + 1, ht[1] + 2];
    const hd = [sh[0] + 4 + b * 4, sh[1] - 9 + b * 2];
    R(c, sh[0] + 1, sh[1] - 4, 6, 5, C.skinG1);
    buddhaHead(c, hd[0], hd[1], { look: 1 + b, blink: p.blink, sad: p.sad });
  });
  return { spr, hand, ax: 24, ay: 63 };
}
function halo(c, x, y, r, t, k = 1) {
  const fl = clamp((0.72 + 0.18 * Math.sin(t * 5.3) + 0.1 * Math.sin(t * 13.7 + 1)) * k, 0, 1.4);
  E(c, x, y, r + 8, r + 8, DA(C.gold0, 0.2 * fl)); E(c, x, y, r + 3, r + 3, DA(C.gold0, 0.35 * fl));
  E(c, x, y, r, r, DA(C.gold1, 0.45 * fl));
  for (let i = 0; i < 16; i++) { const a = i / 16 * TAU + t * 0.25, l = r + 3 + (i & 1) * 4 + Math.sin(t * 4 + i) * 1.5; L(c, x + Math.cos(a) * (r + 1), y + Math.sin(a) * (r + 1), x + Math.cos(a) * l, y + Math.sin(a) * l, fl > 0.8 ? C.gold0 : C.gold1); }
  ER(c, x, y, r + 1, r + 1, C.gold3); ER(c, x, y, r, r, fl > 0.78 ? C.gold0 : C.gold1); ER(c, x, y, r - 1, r - 1, C.gold2);
}

/* ---------- 犍陀多 ---------- */
function kanHair(c, hx, hy, t, big) {
  const tt = stepT(t, 10);
  E(c, hx - 1, hy - 4, 7.5 * big, 6 * big, C.hairK0);
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * (1.0 + i / 8 * 1.15) - 0.25, bx = hx - 1 + Math.cos(a) * 6 * big, by = hy - 4 + Math.sin(a) * 5 * big;
    const l = (5 + (i * 37 % 4)) * big, sw = Math.sin(tt * 6 + i * 1.7) * 1.3;
    const tx = bx + Math.cos(a) * l + sw, ty = by + Math.sin(a) * l + sw * 0.4;
    const nx = -Math.sin(a) * 2.2 * big, ny = Math.cos(a) * 2.2 * big;
    PF(c, [bx - nx, by - ny, tx, ty, bx + nx, by + ny], i & 1 ? C.hairK0 : C.hairK1);
  }
}
function kanSideSpr(p) { // side view facing right, walking / raising foot
  const t = p.t;
  return SPR(p.id || 'kans', 44, 76, c => {
    let fl, bl, bob = 0;
    if (p.f != null && p.f >= 0) {
      const F = [[0.45, 0.45, -0.38, -0.95, 0], [0.08, -0.05, -0.1, -0.95, -1], [-0.38, -0.95, 0.45, 0.45, 0], [-0.1, -0.95, 0.08, -0.05, -1]][p.f];
      fl = [F[0], F[1]]; bl = [F[2], F[3]]; bob = F[4];
    } else { const r = p.raise || 0; fl = [lerp(0.25, 1.25, r), lerp(0.25, 0.15, r)]; bl = [lerp(-0.2, -0.05, r), lerp(-0.2, -0.05, r)]; }
    const lean = p.lean || 0, hip = [20 - lean, 46 + bob];
    const leg = (an, col, col2) => { const kx = hip[0] + Math.sin(an[0]) * 13, ky = hip[1] + Math.cos(an[0]) * 13, ax = kx + Math.sin(an[1]) * 14, ay = ky + Math.cos(an[1]) * 14; L(c, hip[0], hip[1], kx, ky, col, 4); L(c, kx, ky, ax, ay, col2, 3); R(c, ax - 1, ay, 6, 2, C.rope); };
    leg(bl, C.skinK2, C.skinK2);
    // back arm
    const sa = p.f != null && p.f >= 0 ? -fl[0] * 0.8 : -0.25 - (p.raise || 0) * 0.5;
    const sh = [20 - lean * 1.5, 25 + bob];
    L(c, sh[0], sh[1], sh[0] + Math.sin(-sa) * 10, sh[1] + Math.cos(sa) * 10, C.skinK2, 3);
    // torso kimono
    PF(c, [13 - lean, 22 + bob, 27 - lean, 22 + bob, 29, 50 + bob, 26, 53 + bob, 22, 50 + bob, 18, 54 + bob, 14, 50 + bob, 11, 52 + bob], C.clothK1);
    PF(c, [22 - lean, 23 + bob, 27 - lean, 22 + bob, 29, 50 + bob, 26, 53 + bob, 23, 50 + bob], DP(C.clothK1, C.clothK2, 8));
    R(c, 15, 31 + bob, 4, 5, C.clothK2); P(c, 16, 32 + bob, C.clothK0); P(c, 18, 35 + bob, C.clothK0);
    PF(c, [22 - lean, 22 + bob, 27 - lean, 22 + bob, 24 - lean, 30 + bob], C.skinK1);
    R(c, 12, 40 + bob, 17, 2, C.rope); P(c, 13, 42 + bob, C.rope); P(c, 13, 43 + bob, C.rope);
    leg(fl, C.skinK1, C.skinK1);
    // front arm
    const fa = p.f != null && p.f >= 0 ? fl[0] * 0.8 : 0.2 + (p.raise || 0) * 0.6;
    const ex = sh[0] + 1 + Math.sin(fa) * 9, ey = sh[1] + Math.cos(fa) * 9;
    PF(c, [sh[0] - 2, sh[1] - 1, sh[0] + 4, sh[1], ex + 2, ey, ex - 2, ey], C.clothK1);
    L(c, ex, ey, ex + Math.sin(fa + 0.5) * 9, ey + Math.cos(fa + 0.5) * 9, C.skinK1, 3);
    E(c, ex + Math.sin(fa + 0.5) * 10, ey + Math.cos(fa + 0.5) * 10, 2, 2, C.skinK1);
    // head
    const look = p.look || 0, hx = 22 - lean * 2 + look, hy = 13 + bob + look * 1.5;
    R(c, hx - 3, hy + 6, 5, 5, C.skinK1);
    kanHair(c, hx - 1, hy, t, 1);
    E(c, hx + 0.5, hy + 0.5, 6.5, 7.5, C.skinK1); E(c, hx + 2, hy + 3, 6, 5, C.skinK1);
    E(c, hx + 3, hy + 6, 4.5, 2.5, DP(C.skinK1, C.skinK3, 6));
    R(c, hx + 7, hy, 2, 3, C.skinK1); P(c, hx + 8, hy + 2, C.skinK2);
    E(c, hx - 3, hy + 1, 1.5, 2, C.skinK2);
    PF(c, [hx - 6, hy - 5, hx + 7, hy - 5, hx + 4, hy - 2, hx + 1, hy - 3, hx - 2, hy - 1], C.hairK0);
    R(c, hx + 2, hy - 2, 5, 2, C.hairK1);
    if (p.blink === 2) R(c, hx + 3, hy + 1, 3, 1, C.ol); else { R(c, hx + 3, hy, 3, 2, C.white); R(c, hx + 4 + (p.ex || 0), hy + look * 0.6, 2, 2, C.k); if (p.blink === 1) R(c, hx + 3, hy, 3, 1, C.skinK2); }
    if (p.surp) { R(c, hx + 5, hy + 5, 2, 2, C.k); } else R(c, hx + 4, hy + 5, 3, 1, C.skinK3);
  });
}
const KS_AX = 20, KS_AY = 73;

/* front view figure used by 犍陀多 and 罪人. targets in sprite coords */
function figFront(c, p, st) {
  const t = p.t, by = p.by || 0;
  const hipL = [19, 44 + by], hipR = [25, 44 + by], shL = [14, 25 + by], shR = [30, 25 + by];
  const skin = st.skin, skin2 = st.skin2, skin3 = st.skin3;
  const pz = p.pz;
  // legs
  limb(c, hipL[0], hipL[1], pz.fl[0], pz.fl[1], 12, 13, 1, 4, 3, skin2);
  limb(c, hipR[0], hipR[1], pz.fr[0], pz.fr[1], 12, 13, -1, 4, 3, skin2);
  R(c, pz.fl[0] - 2, pz.fl[1] - 1, 4, 2, st.feet); R(c, pz.fr[0] - 2, pz.fr[1] - 1, 4, 2, st.feet);
  // torso
  if (st.kimono) {
    PF(c, [13, 22 + by, 31, 22 + by, 30, 45 + by, 28, 51 + by, 25, 47 + by, 22, 52 + by, 19, 47 + by, 15, 51 + by, 14, 45 + by], C.clothK1);
    PF(c, [24, 22 + by, 31, 22 + by, 30, 45 + by, 28, 51 + by, 25, 47 + by], DP(C.clothK1, C.clothK2, 8));
    PF(c, [18, 22 + by, 26, 22 + by, 22, 34 + by], skin);
    L(c, 19, 27 + by, 21, 28 + by, skin2); L(c, 23, 28 + by, 25, 27 + by, skin2);
    R(c, 15, 38 + by, 15, 2, C.rope); R(c, 26, 30 + by, 3, 4, C.clothK2); P(c, 27, 31 + by, C.clothK0);
  } else {
    PF(c, [14, 22 + by, 30, 22 + by, 28, 44 + by, 16, 44 + by], skin);
    PF(c, [23, 22 + by, 30, 22 + by, 28, 44 + by, 23, 44 + by], DP(skin, skin2, 7));
    L(c, 18, 30 + by, 21, 31 + by, skin2); L(c, 23, 31 + by, 26, 30 + by, skin2); L(c, 18, 34 + by, 26, 34 + by, skin2);
    PF(c, [15, 42 + by, 29, 42 + by, 27, 49 + by, 22, 47 + by, 17, 49 + by], st.cloth);
  }
  // arms
  const sl = limb(c, shL[0], shL[1], pz.hl[0], pz.hl[1], 10, 11, -1, 4, 3, skin, skin);
  const sr = limb(c, shR[0], shR[1], pz.hr[0], pz.hr[1], 10, 11, 1, 4, 3, skin, skin);
  if (st.kimono) { L(c, shL[0], shL[1], lerp(shL[0], sl[0], 0.6), lerp(shL[1], sl[1], 0.6), C.clothK1, 5); L(c, shR[0], shR[1], lerp(shR[0], sr[0], 0.6), lerp(shR[1], sr[1], 0.6), C.clothK2, 5); }
  E(c, pz.hl[0], pz.hl[1], 2.5, 2.5, skin); E(c, pz.hr[0], pz.hr[1], 2.5, 2.5, skin);
  // head
  const hx = 22 + (pz.hdx || 0), hy = 13 + by + (pz.hdy || 0);
  R(c, hx - 3, hy + 6, 6, 5, skin2);
  if (st.hair === 'messy') {
    E(c, hx, hy - 5, 9, 6.5, C.hairK0);
    const tt = stepT(t, 10);
    for (let i = 0; i < 11; i++) {
      const a = Math.PI * (0.85 + i / 10 * 1.3), bx = hx + Math.cos(a) * 7.5, byy = hy - 4 + Math.sin(a) * 5.5, l = 4 + (i * 53 % 4), sw = Math.sin(tt * 6 + i * 1.9) * 1.2;
      const nx = -Math.sin(a) * 2.2, ny = Math.cos(a) * 2.2;
      PF(c, [bx - nx, byy - ny, bx + Math.cos(a) * l + sw, byy + Math.sin(a) * l, bx + nx, byy + ny], i & 1 ? C.hairK0 : C.hairK1);
    }
  } else if (st.hair === 'long') { E(c, hx, hy - 2, 8, 9, st.hc); R(c, hx - 8, hy, 3, 10, st.hc); R(c, hx + 5, hy, 3, 10, st.hc); }
  PF(c, [hx - 7, hy - 3, hx + 7, hy - 3, hx + 7, hy + 4, hx + 4, hy + 9, hx, hy + 10, hx - 4, hy + 9, hx - 7, hy + 4], skin);
  PF(c, [hx + 2, hy - 3, hx + 7, hy - 3, hx + 7, hy + 4, hx + 4, hy + 9, hx + 2, hy + 9], DP(skin, skin2, 6));
  if (st.stubble) PF(c, [hx - 6, hy + 4, hx + 6, hy + 4, hx + 4, hy + 9, hx, hy + 10, hx - 4, hy + 9], DP(skin, skin3, 6));
  if (st.hair === 'messy') { PF(c, [hx - 8, hy - 5, hx + 8, hy - 5, hx + 6, hy - 1, hx + 3, hy - 2, hx + 1, hy, hx - 2, hy - 2, hx - 5, hy - 1], C.hairK0); }
  else if (st.hair === 'bald') { E(c, hx, hy - 3, 7, 4, skin); E(c, hx - 2, hy - 4, 2, 1, st.skin0 || skin); }
  else if (st.hair === 'long') { R(c, hx - 7, hy - 4, 14, 2, st.hc); }
  // face
  const ex = st.expr || 'normal', ey = hy + 1, lk = pz.eye || 0; // lk: -1 up, 1 down
  const brow = (dy, inner) => { L(c, hx - 6, ey - 2 + dy, hx - 2, ey - 2 + dy + inner, C.hairK1, 1); L(c, hx + 2, ey - 2 + dy + inner, hx + 6, ey - 2 + dy, C.hairK1, 1); };
  if (ex === 'angry') brow(-1, 2); else if (ex === 'surp' || ex === 'scared') brow(-2, ex === 'scared' ? -1 : 0); else brow(0, 0);
  if (p.blink === 2 && ex !== 'surp') { R(c, hx - 5, ey + 1, 3, 1, C.ol); R(c, hx + 2, ey + 1, 3, 1, C.ol); }
  else {
    const eh = (ex === 'surp' || ex === 'scared') ? 3 : (ex === 'grin' || ex === 'angry') ? 1 : 2;
    R(c, hx - 5, ey, 3, eh, C.white); R(c, hx + 2, ey, 3, eh, C.white);
    const py = ey + (lk > 0 ? eh - 1 : 0);
    P(c, hx - 4, py, C.k); P(c, hx + 3, py, C.k);
    if (eh >= 2) { P(c, hx - 4, py + (lk < 0 ? 0 : 1) * (eh > 2 ? 1 : 0), C.k); P(c, hx + 3, py + (lk < 0 ? 0 : 1) * (eh > 2 ? 1 : 0), C.k); }
  }
  P(c, hx, hy + 4, skin3); P(c, hx, hy + 5, skin3);
  const my = hy + 7, mo = p.mouth || 0;
  if (ex === 'angry' || ex === 'scared') { R(c, hx - 2, my - 1, 5, 2 + mo, '#401010'); R(c, hx - 2, my - 1, 5, 1, C.white); }
  else if (ex === 'surp') { R(c, hx - 1, my - 1, 3, 2 + mo, '#401010'); }
  else if (ex === 'grin') { R(c, hx - 3, my - 1, 7, 2, '#401010'); R(c, hx - 3, my - 1, 7, 1, C.white); }
  else R(c, hx - 2, my, 5, 1, skin3);
}
const FIG_W = 44, FIG_H = 74, FIG_AX = 22, FIG_AY = 44;
const KAN_ST = { skin: C.skinK1, skin2: C.skinK2, skin3: C.skinK3, kimono: true, hair: 'messy', stubble: true, feet: C.rope };
/* poses: returns limb targets */
function kanPose(name, f, t) {
  const s = Math.sin, tt = stepT(t, 10);
  switch (name) {
    case 'pond': return { hl: [8 + s(tt * 5) * 3, 16 + s(tt * 5 + 1) * 6], hr: [36 + s(tt * 4.3 + 2) * 3, 14 + s(tt * 4.3) * 6], fl: [18, 64], fr: [26, 64], hdx: Math.round(s(tt * 2) * 1) };
    case 'reach': { const r = f; return { hl: [lerp(10, 12, r), lerp(34, 26, r)], hr: [lerp(34, 29, r), lerp(30, -14, r)], fl: [18, 66], fr: [26, 66], hdy: -1, eye: -1 }; }
    case 'climb': {
      const k = f & 3, up = [[25, -3, 20, 8], [24, 0, 20, 4], [20, -3, 25, 8], [20, 0, 24, 4]][k];
      const lg = [[[25, 50], [20, 62]], [[24, 54], [21, 60]], [[20, 62], [24, 50]], [[21, 60], [24, 54]]][k];
      return { hr: [up[0], up[1]], hl: [up[2], up[3]], fr: lg[0], fl: lg[1] };
    }
    case 'rest': return { hr: [24, 1], hl: [20, 5], fr: [24, 55], fl: [21, 60] };
    case 'look': return { hr: [23, -1], hl: [21, 4], fr: [24, 56], fl: [20, 61], hdy: 2, hdx: 1, eye: 1 };
    case 'kick': { const k = f; // 0: neutral 1: wind-up 2: kick
      const fr = k === 2 ? [27, 72] : k === 1 ? [29, 44] : [24, 56];
      return { hr: [23, -2], hl: [21, 3], fr, fl: [20, 60], hdy: 2, eye: 1 }; }
    case 'fall': return { hl: [4 + s(tt * 9) * 3, 6 + s(tt * 7) * 4], hr: [40 + s(tt * 8 + 1) * 3, 6 + s(tt * 9 + 2) * 4], fl: [10 + s(tt * 8) * 3, 64], fr: [34 + s(tt * 7 + 1) * 3, 62], eye: -1 };
  }
}
function kanFrontSpr(p) { return SPR(p.id || 'kanf', FIG_W, FIG_H, c => figFront(c, p, Object.assign({}, KAN_ST, { expr: p.expr }))); }
const SIN_ST = [
  { skin: C.sin0, skin2: C.sin1, skin3: C.sin2, hair: 'bald', cloth: '#d8d0c0', feet: C.sin2 },
  { skin: '#b89c94', skin2: '#8c7068', skin3: '#5c4440', hair: 'long', hc: '#2c2c3c', cloth: '#a8a094', feet: '#5c4440' },
  { skin: '#c8b4a0', skin2: '#9c8470', skin3: '#6c5444', hair: 'messy', cloth: '#bcb0a0', feet: '#6c5444' },
];
function sinnerSpr(v, pose, f) {
  return cached('sin' + v + pose + f, () => SPR(null, FIG_W, FIG_H, c => {
    const pz = kanPose(pose, pose === 'climb' ? f : 0, f * 0.11 + v);
    figFront(c, { t: f * 0.13 + v * 3, pz, mouth: 1 }, Object.assign({}, SIN_ST[v], { expr: pose === 'climb' ? 'angry' : 'scared' }));
  }));
}

/* ---------- 蜘蛛 ---------- */
function spiderSpr(p) {
  const f = p.f || 0, t = p.t;
  const legs = c => {
    for (let s = -1; s <= 1; s += 2) for (let j = 0; j < 4; j++) {
      const lift = ((j + (s > 0 ? 1 : 0) + f) & 1) && p.walk ? 1 : 0;
      const bx = 15 + s * 6, by = 9 + j * 1.3, kx = 15 + s * (11 + (j === 0 || j === 3 ? 0 : 1)), ky = 4 + j * 1.5 - lift * 1.5;
      const tx = 15 + s * (13 + j * 0.6) + (p.walk ? (lift ? s : -s) * 1 : 0), ty = 16 - lift * 2;
      L(c, bx, by, kx, ky, C.ol); L(c, kx, ky, tx, ty, C.ol); P(c, kx, ky, C.spi1);
    }
  };
  return SPR(p.id || 'spi', 30, 18, c => {
    E(c, 15, 9.5, 7, 6, C.spi1); E(c, 13.5, 7.5, 3, 2, C.spi0); P(c, 12, 6, C.white);
    if (p.blink === 2) { R(c, 11, 10, 3, 1, C.ol); R(c, 17, 10, 3, 1, C.ol); }
    else { E(c, 12.5, 10, 2, 2.5, C.white); E(c, 17.5, 10, 2, 2.5, C.white); const py = p.up ? 9 : 10; R(c, 12, py, 1, 2, C.k); R(c, 18, py, 1, 2, C.k); P(c, 12, py, C.white); P(c, 18, py, C.white); }
    P(c, 10, 13, C.cheek); P(c, 20, 13, C.cheek);
    if (p.happy) { P(c, 14, 13, C.ol); P(c, 15, 14, C.ol); P(c, 16, 13, C.ol); } else { R(c, 14, 13, 3, 1, C.ol); }
  }, legs);
}
const SPI_AX = 15, SPI_AY = 17;

/* ---------- 鬼 ---------- */
function oniSpr(p) {
  const f = p.f, t = p.t;
  return SPR('oni', 64, 70, c => {
    const ang = [-0.5, -1.25, -1.45, 0.95, 0.75][f]; // club angle (0 = pointing left horizontally rotated)
    const by = f === 1 ? 1 : f === 3 ? 2 : 0;
    // legs
    L(c, 30, 52 + by, 26, 68, C.oni2, 6); L(c, 40, 52 + by, 44, 68, C.oni2, 6);
    R(c, 22, 66, 8, 3, C.oni2); R(c, 42, 66, 8, 3, C.oni2);
    // body
    E(c, 35, 38 + by, 14, 15, C.oni1); E(c, 32, 34 + by, 9, 9, C.oni0);
    L(c, 28, 36 + by, 34, 38 + by, C.oni2); L(c, 36, 38 + by, 42, 36 + by, C.oni2); L(c, 35, 41 + by, 35, 48 + by, C.oni2);
    // tiger loincloth
    PF(c, [22, 46 + by, 48, 46 + by, 47, 56 + by, 23, 56 + by], C.tiger0);
    for (let i = 0; i < 6; i++) L(c, 24 + i * 4, 47 + by, 26 + i * 4, 55 + by, C.tiger1);
    // head
    const hx = 32, hy = 18 + by;
    PF(c, [hx - 8, hy - 6, hx - 11, hy - 15, hx - 5, hy - 8], C.tiger0); PF(c, [hx + 6, hy - 7, hx + 10, hy - 16, hx + 9, hy - 6], C.tiger0);
    E(c, hx, hy - 3, 11, 7, C.hairK1);
    for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i / 6 * 0.9), sw = Math.sin(stepT(t, 10) * 5 + i) * 1; PF(c, [hx + Math.cos(a) * 9 - 2, hy - 3 + Math.sin(a) * 6, hx + Math.cos(a) * 15 + sw, hy - 3 + Math.sin(a) * 11, hx + Math.cos(a) * 9 + 2, hy - 3 + Math.sin(a) * 6], C.hairK1); }
    E(c, hx, hy + 1, 9, 9, C.oni1); E(c, hx - 1, hy, 7, 7, C.oni0);
    L(c, hx - 7, hy - 3, hx - 2, hy - 1, C.k, 2); L(c, hx + 1, hy - 1, hx + 6, hy - 3, C.k, 2);
    R(c, hx - 6, hy, 4, 3, C.tiger0); R(c, hx + 1, hy, 4, 3, C.tiger0);
    if (p.blink === 2) { R(c, hx - 6, hy + 1, 4, 1, C.k); R(c, hx + 1, hy + 1, 4, 1, C.k); } else { P(c, hx - 5, hy + 1, C.k); P(c, hx + 2, hy + 1, C.k); }
    R(c, hx - 5, hy + 5, 10, 3, '#501010'); P(c, hx - 4, hy + 4, C.white); P(c, hx + 3, hy + 4, C.white); P(c, hx - 4, hy + 5, C.white); P(c, hx + 3, hy + 5, C.white);
    // club (pivot at hands)
    const px = 20, py = 32 + by, ca = ang;
    const cx2 = px - Math.cos(ca) * 30, cy2 = py - Math.sin(ca) * 30;
    L(c, px + Math.cos(ca) * 4, py + Math.sin(ca) * 4, cx2, cy2, C.iron1, 5);
    for (let i = 2; i <= 6; i++) { const q = i / 6, x = lerp(px, cx2, q), y = lerp(py, cy2, q); P(c, x - Math.sin(ca) * 3, y + Math.cos(ca) * 3, C.iron0); P(c, x + Math.sin(ca) * 3, y - Math.cos(ca) * 3, C.iron0); }
    L(c, px, py, lerp(px, cx2, 0.9), lerp(py, cy2, 0.9), C.iron0, 1);
    // arms to club
    limb(c, 26, 28 + by, px, py, 10, 10, 1, 5, 5, C.oni1); limb(c, 44, 28 + by, px + 2, py + 1, 14, 14, -1, 5, 5, C.oni1);
    E(c, px + 1, py, 3.5, 3.5, C.oni0);
  });
}
function oniClubTip(f, by) { const ang = [-0.5, -1.25, -1.45, 0.95, 0.75][f]; return [20 - Math.cos(ang) * 30, 32 + (by || 0) - Math.sin(ang) * 30]; }

/* ================= portraits (48x48) ================= */
function facePortrait(who, p) {
  if (typeof PORTRAITS !== 'undefined' && PORTRAITS[who]) return PORTRAITS[who](p); // per-work cast
  const t = p.t, m = p.mouth || 0, bl = p.blink || 0, ex = p.expr || 'normal';
  return SPR('face_' + who, 48, 48, c => {
    if (who === 'spider') {
      const tt = stepT(t, 10);
      for (let s = -1; s <= 1; s += 2) for (let j = 0; j < 4; j++) {
        const w = Math.sin(tt * 3 + j * 1.3 + s) * 1.5;
        const bx = 24 + s * 13, by = 20 + j * 6, kx = 24 + s * 21, ky = 12 + j * 7 + w, tx = 24 + s * 23, ty = 26 + j * 6 + w;
        L(c, bx, by, kx, ky, C.spi2, 2); L(c, kx, ky, tx, ty, C.spi2, 2);
      }
      E(c, 24, 28, 16, 15, C.spi2); E(c, 23, 26.5, 14.5, 13.5, C.spi1); E(c, 17, 18, 4.5, 3, C.spi0); R(c, 15, 16, 2, 1, C.white);
      const eyeY = 26;
      for (const ex0 of [17, 31]) {
        if (ex === 'happy') { PL(c, [ex0 - 4, eyeY + 1, ex0, eyeY - 3, ex0 + 4, eyeY + 1], C.ol, 2); continue; }
        if (bl === 2) { PL(c, [ex0 - 4, eyeY, ex0, eyeY + 2, ex0 + 4, eyeY], C.ol, 2); continue; }
        const big = ex === 'surp' ? 1 : 0;
        E(c, ex0, eyeY, 4.5 + big, 5.5 + big, C.white);
        const pr = ex === 'surp' ? 1.5 : 2.5, pyo = ex === 'worry' ? -1 : ex === 'sad' ? 1.5 : 0.5;
        E(c, ex0 + (ex0 < 24 ? 0.5 : -0.5), eyeY + pyo, pr, pr + 1, C.k);
        R(c, ex0 - 1, eyeY - 3 + (ex === 'sad' ? 1 : 0), 2, 2, C.white); P(c, ex0 + 1, eyeY + 2, C.white);
        if (bl === 1 || ex === 'sad') R(c, ex0 - 5, eyeY - 6, 11, bl === 1 ? 5 : 3, C.spi1);
      }
      if (ex === 'worry' || ex === 'sad') { L(c, 12, 18, 19, 16, C.ol, 1); L(c, 29, 16, 36, 18, C.ol, 1); }
      E(c, 11.5, 33, 3, 1.6, C.cheek); E(c, 36.5, 33, 3, 1.6, C.cheek);
      if (ex === 'sad' && fr(t * 0.4) < 0.6) E(c, 12, 33 + fr(t * 0.4) * 10, 1, 1.5, '#a8d8f8');
      if (m === 0) { if (ex === 'happy') ER(c, 24, 33, 3, 2, C.ol, 0.15 * Math.PI, 0.85 * Math.PI); else if (ex === 'sad' || ex === 'worry') ER(c, 24, 38, 3.5, 2, C.ol, 1.15 * Math.PI, 1.85 * Math.PI); else { P(c, 22, 35, C.ol); P(c, 23, 36, C.ol); P(c, 24, 35, C.ol); P(c, 25, 36, C.ol); P(c, 26, 35, C.ol); } }
      else { E(c, 24, 36, m === 1 ? 2 : 3, m === 1 ? 1.5 : 2.5, '#701830'); if (m === 2) R(c, 23, 37, 3, 1, C.cheek); }
      P(c, 21, 34, C.white); P(c, 27, 34, C.white);
    } else if (who === 'buddha') {
      E(c, 11, 31, 2.5, 7, C.skinG2); E(c, 37, 31, 2.5, 7, C.skinG2); E(c, 11, 30, 1.5, 6, C.skinG1); E(c, 37, 30, 1.5, 6, C.skinG1);
      R(c, 18, 40, 12, 6, C.skinG1); R(c, 19, 42, 10, 1, C.skinG2);
      PF(c, [4, 48, 12, 43, 22, 45, 30, 44, 38, 43, 44, 48], C.robe1); L(c, 12, 44, 22, 48, C.robe2); L(c, 28, 46, 38, 44, C.robe2);
      E(c, 24, 29, 12.5, 14, C.skinG2); E(c, 23.5, 28.5, 12, 13.5, C.skinG1); E(c, 21, 25, 7, 6, DP(C.skinG1, C.skinG0, 7));
      c.save(); c.beginPath(); c.rect(0, 0, 48, 20); c.clip(); E(c, 24, 19, 14, 13, C.hairB1); c.restore(); E(c, 24, 6.5, 7, 5, C.hairB1); curls(c, 24, 19, 14, 13, 19); curls(c, 24, 6.5, 7, 5, 10); R(c, 11, 19, 26, 1, C.hairB2); R(c, 23, 16, 3, 2, '#e83838'); P(c, 23, 16, '#f8a0a0');
      R(c, 23, 23, 2, 2, C.gold0); P(c, 23, 23, C.white);
      const sad = ex === 'sad', sur = ex === 'surp';
      if (sad) { L(c, 14, 26, 20, 24, C.skinG3); L(c, 28, 24, 34, 26, C.skinG3); }
      else ER(c, 17.5, 27 + (sur ? -1 : 0), 4.5, 2, C.skinG3, Math.PI * 1.1, Math.PI * 1.9), ER(c, 30.5, 27 + (sur ? -1 : 0), 4.5, 2, C.skinG3, Math.PI * 1.1, Math.PI * 1.9);
      for (const x0 of [14, 27]) {
        if (bl === 2) { L(c, x0, 30, x0 + 6, 30, C.ol); continue; }
        if (sur) { E(c, x0 + 3, 30, 3, 2, C.white); R(c, x0 + 2, 29, 2, 3, C.k); L(c, x0, 28, x0 + 6, 28, C.ol); continue; }
        L(c, x0, 29 + (sad ? 1 : 0), x0 + 6, 29 + (sad ? 1 : 0), C.ol);
        if (bl !== 1) R(c, x0 + 2, 30 + (sad ? 1 : 0), 3, 1, C.k);
      }
      L(c, 24, 30, 24, 34, C.skinG2); P(c, 22, 35, C.skinG2); P(c, 26, 35, C.skinG2);
      if (m === 0) { R(c, 22, 39, 5, 1, C.robe2); if (sad) { P(c, 21, 40, C.robe2); P(c, 27, 40, C.robe2); } else { P(c, 21, 38, C.robe2); P(c, 27, 38, C.robe2); } }
      else if (m === 1) R(c, 22, 38, 5, 2, '#7c2828'); else E(c, 24, 39.5, 3, 2.5, '#7c2828');
    } else if (who === 'narrator') { // 記録の神
      const tt = stepT(t, 10), sway = Math.sin(tt * 1.6) * 1;
      const hairW = '#f4f4f8', hairS = '#c4c4d4', skin = '#f0c8a0', skin2 = '#d89c74', robe = '#34507c', robe2 = '#243858';
      // robe & collar
      PF(c, [2, 48, 10, 38, 24, 42, 38, 38, 46, 48], robe); PF(c, [16, 40, 24, 48, 32, 40, 30, 39, 24, 45, 18, 39], C.gold1); L(c, 10, 40, 4, 48, robe2);
      // side hair
      E(c, 10, 22, 5, 10, hairS); E(c, 38, 22, 5, 10, hairS); E(c, 10, 21, 4, 9, hairW); E(c, 38, 21, 4, 9, hairW);
      // face
      E(c, 24, 21, 11.5, 12, skin2); E(c, 23.5, 20.5, 11, 11.5, skin); E(c, 20, 16, 5, 4, DP(skin, '#f8dcc0', 7));
      // cap (冠) with gold band and a little jewel
      PF(c, [13, 13, 35, 13, 33, 2, 15, 2], '#2c3048'); PF(c, [15, 2, 33, 2, 31, 0, 17, 0], '#3c4464'); R(c, 13, 11, 22, 2, C.gold1); P(c, 24, 11, '#e83838'); L(c, 17, 4, 18, 10, '#4c5478');
      // long drooping eyebrows
      const sad = ex === 'sad', sur = ex === 'surp';
      const by = sur ? -1 : 0;
      PL(c, [21, 17 + by + (sad ? -1 : 0), 16, 17 + by, 11, 20 + by + Math.round(sway * 0.5)], hairW, 2);
      PL(c, [27, 17 + by + (sad ? -1 : 0), 32, 17 + by, 37, 20 + by + Math.round(-sway * 0.5)], hairW, 2);
      // eyes
      for (const x0 of [17, 27]) {
        if (bl === 2) { L(c, x0, 21, x0 + 4, 21, C.ol); continue; }
        if (ex === 'smile') { ER(c, x0 + 2, 22, 2.5, 1.6, C.ol, Math.PI * 1.1, Math.PI * 1.9); continue; }
        if (sur) { R(c, x0 + 1, 20, 3, 3, C.white); R(c, x0 + 2, 21, 1, 2, C.k); continue; }
        if (sad) { L(c, x0, x0 < 24 ? 20 : 22, x0 + 4, x0 < 24 ? 22 : 20, C.ol); P(c, x0 + 2, 22, C.k); continue; }
        ER(c, x0 + 2, 20, 2.5, 1.6, C.ol, Math.PI * 0.1, Math.PI * 0.9); if (bl !== 1) P(c, x0 + 2, 22, C.k);
      }
      E(c, 24, 25, 2.6, 2.2, skin2); P(c, 23, 24, '#f8dcc0');
      E(c, 16, 26, 2.5, 1.3, '#f4a0a0'); E(c, 32, 26, 2.5, 1.3, '#f4a0a0');
      // beard (sways), mouth opening under the moustache
      const bw = Math.round(sway);
      PF(c, [13, 27, 35, 27, 34, 34, 30 + bw, 44, 25 + bw, 48, 21 + bw, 46, 17 + bw, 40, 14, 33], hairS);
      PF(c, [14, 27, 34, 27, 33, 33, 29 + bw, 42, 25 + bw, 46, 21 + bw, 44, 18 + bw, 39, 15, 33], hairW);
      for (let k = 0; k < 4; k++) L(c, 19 + k * 3, 33, 20 + k * 3 + bw, 41 - Math.abs(k - 1.5), hairS);
      if (m > 0) { E(c, 24, 30.5, 2 + m, 0.8 + m * 0.7, '#5c2c2c'); }
      PF(c, [14, 28, 24, 26, 34, 28, 31, 31, 24, 29, 17, 31], hairW); L(c, 17, 30, 23, 28, hairS); L(c, 25, 28, 31, 30, hairS);
      // brush in hand
      L(c, 40, 47, 44, 30, '#8c5c30', 2); PF(c, [43, 30, 46, 30, 45, 25, 44, 24], '#202028'); P(c, 44, 31, C.gold1);
      E(c, 41, 42, 3.5, 3, skin); R(c, 38, 44, 6, 4, robe);
    } else if (who === 'lamp') { // 灯の神: hooded elder lit from below by a small lantern
      const tt = stepT(t, 10), fl = 0.5 + 0.5 * Math.sin(tt * 9) * Math.sin(tt * 5.3 + 1);
      const hood = '#241a1e', hood2 = '#3c2c2c', hoodHi = '#5c4438', skin = '#e4b48c', skin2 = '#b07c58', skin3 = '#7c5038';
      // cloak & hood
      PF(c, [0, 48, 4, 34, 12, 26, 24, 24, 36, 26, 44, 34, 48, 48], hood);
      PF(c, [8, 30, 10, 12, 16, 4, 24, 1, 32, 4, 38, 12, 40, 30, 34, 36, 14, 36], hood);
      L(c, 16, 5, 11, 14, hoodHi); L(c, 32, 5, 37, 14, hood2); L(c, 4, 36, 10, 44, hood2); L(c, 44, 36, 38, 44, hood2);
      // face in the hood opening (lit from below: darker at the top)
      E(c, 24, 22, 10, 12, skin3); E(c, 24, 23, 9.5, 11, skin2); E(c, 24, 25, 8.5, 9, skin);
      c.fillStyle = DA(hood, 0.55); c.fillRect(13, 10, 22, 6); R(c, 14, 10, 20, 2, hood);
      // brows (long, white) and eyes
      const sad = ex === 'sad', sur = ex === 'surp', smile = ex === 'smile';
      L(c, 17, 17 + (sad ? 1 : 0), 22, 17 - (sad ? 1 : 0), '#e8e0d4'); L(c, 26, 17 - (sad ? 1 : 0), 31, 17 + (sad ? 1 : 0), '#e8e0d4');
      for (const x0 of [18, 27]) {
        if (bl === 2) { L(c, x0, 20, x0 + 3, 20, C.ol); continue; }
        if (smile) { ER(c, x0 + 1.5, 21, 2, 1.4, C.ol, Math.PI * 1.1, Math.PI * 1.9); continue; }
        if (sur) { R(c, x0, 19, 4, 3, '#fff4dc'); R(c, x0 + 1, 20, 2, 2, C.k); continue; }
        R(c, x0, 20, 4, 1, C.ol); if (bl !== 1) { R(c, x0 + 1, 21, 2, 1, '#f8d070'); P(c, x0 + 1, 21, C.k); }
      }
      E(c, 24, 25, 2, 2.4, skin2); P(c, 24, 27, skin3);
      // short white beard, mouth
      PF(c, [17, 29, 31, 29, 30, 35, 26, 39, 22, 39, 18, 35], '#d8d0c4'); PF(c, [18, 29, 30, 29, 29, 33, 24, 37, 19, 33], '#f0ece4');
      if (m === 0) { if (smile) ER(c, 24, 30, 3, 1.5, C.ol, 0.15 * Math.PI, 0.85 * Math.PI); else R(c, 22, 31, 5, 1, sad ? '#7c5038' : C.ol); }
      else E(c, 24, 31.5, 1.5 + m, 0.7 + m * 0.6, '#3c1c1c');
      // lantern held below the chin
      L(c, 24, 36, 24, 39, '#5c4430'); R(c, 19, 39, 11, 2, '#4c3424'); R(c, 18, 41, 13, 7, '#3c2c1c');
      R(c, 20, 41, 9, 7, DP('#f8b040', '#fff0b0', Math.round(6 + fl * 8))); R(c, 24, 42, 1, 5, '#3c2c1c');
      E(c, 24, 45, 1.5, 2.5 + fl, '#fffce8');
      // warm glow on the chin / beard
      c.fillStyle = DA('#f8c060', 0.25 + 0.15 * fl); c.fillRect(17, 30, 15, 6);
    } else { // kandata
      const tt = stepT(t, 10);
      E(c, 24, 15, 18, 12, C.hairK0);
      for (let i = 0; i < 13; i++) {
        const a = Math.PI * (0.8 + i / 12 * 1.4), bx = 24 + Math.cos(a) * 15, by = 15 + Math.sin(a) * 9, l = 6 + (i * 29 % 5), sw = Math.sin(tt * 5 + i * 1.3) * 1.2;
        const nx = -Math.sin(a) * 3.5, ny = Math.cos(a) * 3.5;
        PF(c, [bx - nx, by - ny, bx + Math.cos(a) * l + sw, by + Math.sin(a) * l + sw * 0.5, bx + nx, by + ny], i & 1 ? C.hairK1 : C.hairK0);
      }
      R(c, 18, 41, 12, 5, C.skinK2); PF(c, [6, 48, 14, 42, 22, 47, 24, 46, 26, 47, 34, 42, 42, 48], C.clothK1); PF(c, [22, 47, 24, 44, 26, 47, 24, 48], C.skinK1);
      E(c, 11, 27, 2.5, 3.5, C.skinK2); E(c, 37, 27, 2.5, 3.5, C.skinK2);
      PF(c, [12, 16, 36, 16, 36, 30, 32, 38, 27, 42, 21, 42, 16, 38, 12, 30], C.skinK1);
      PF(c, [27, 16, 36, 16, 36, 30, 32, 38, 27, 42], DP(C.skinK1, C.skinK2, 7)); E(c, 18, 29, 3, 2, C.skinK0);
      PF(c, [14, 32, 34, 32, 31, 38, 27, 41, 21, 41, 17, 38], DP(C.skinK1, C.skinK3, 6));
      for (let i = 0; i < 6; i++) { const sw = Math.sin(tt * 4 + i) * 0.8; PF(c, [12 + i * 4, 14, 17 + i * 4, 14, 14 + i * 4 + sw, 20 + (i * 7 % 3)], C.hairK0); }
      L(c, 31, 22, 34, 28, C.skinK3);
      if (ex === 'angry') { L(c, 14, 19, 21, 23, C.hairK1, 2); L(c, 34, 19, 27, 23, C.hairK1, 2); R(c, 36, 8, 1, 5, '#e02020'); R(c, 34, 10, 5, 1, '#e02020'); R(c, 38, 4, 1, 4, '#e02020'); R(c, 36, 6, 5, 1, '#e02020'); }
      else if (ex === 'surp' || ex === 'scared') { L(c, 14, 19, 21, 18, C.hairK1, 2); L(c, 27, 18, 34, 19, C.hairK1, 2); }
      else if (ex === 'grin') { L(c, 14, 21, 21, 22, C.hairK1, 2); L(c, 27, 22, 34, 21, C.hairK1, 2); }
      else { R(c, 15, 21, 7, 2, C.hairK1); R(c, 26, 21, 7, 2, C.hairK1); }
      for (const x0 of [16, 27]) {
        if (bl === 2 && ex !== 'surp') { R(c, x0, 26, 5, 1, C.ol); continue; }
        if (ex === 'surp' || ex === 'scared') { E(c, x0 + 2.5, 26, 3, 3.5, C.white); R(c, x0 + 2, 25, 2, 2, C.k); }
        else if (ex === 'grin') { ER(c, x0 + 2.5, 27, 3, 2, C.ol, Math.PI * 1.1, Math.PI * 1.9); R(c, x0 + 2, 25, 2, 1, C.k); }
        else { R(c, x0, 25, 5, ex === 'angry' ? 2 : 3, C.white); R(c, x0 + (x0 < 24 ? 2 : 1), 25, 2, ex === 'angry' ? 2 : 3, C.k); if (bl === 1) R(c, x0, 25, 5, 1, C.skinK2); }
      }
      L(c, 24, 26, 23, 31, C.skinK2); R(c, 21, 31, 5, 2, C.skinK2); P(c, 22, 32, C.skinK3); P(c, 25, 32, C.skinK3);
      const mo = m;
      if (ex === 'angry') { E(c, 24, 36, 4 + mo, 2 + mo, '#401010'); R(c, 21, 34 - (mo ? 0 : 0), 7, 1, C.white); }
      else if (ex === 'surp' || ex === 'scared') { E(c, 24, 36, 2 + mo * 0.6, 1.5 + mo, '#401010'); }
      else if (ex === 'grin') { R(c, 18, 34, 12, 2 + mo, '#401010'); R(c, 18, 34, 12, 1, C.white); P(c, 18, 33, C.skinK3); P(c, 29, 33, C.skinK3); }
      else { if (mo) E(c, 24, 36, 3 + mo, 1 + mo * 0.7, '#401010'); else { R(c, 20, 35, 8, 1, C.skinK3); P(c, 19, 36, C.skinK3); P(c, 28, 36, C.skinK3); } }
    }
  });
}
