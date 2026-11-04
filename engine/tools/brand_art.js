// Draw the channel art (dot style) with the engine's own brand code and save PNGs to brand/.
// usage: node engine/tools/brand_art.js works/001-kumo-no-ito/index.html brand
//   icon.png   800x800   (200x200 x4)  YouTube / TikTok / Blogger profile icon
//   profile.png 768x768 (192x192 x4)  Blogger profile picture (also copied to blog/profile.png)
//   banner.png 2560x1440 (640x360 x4)  YouTube banner; text stays inside the safe area (center 1546x423)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [html, outDir] = process.argv.slice(2);
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy });
  const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERR', e.message));
  await p.goto('file://' + path.resolve(html));
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.fonts.load('16px "DotGothic16"').then(() => _tc.clear()));
  const art = await p.evaluate(() => {
    const up = (src, k) => { const [o, x] = mk(src.width * k, src.height * k); x.imageSmoothingEnabled = false; x.drawImage(src, 0, 0, o.width, o.height); return o.toDataURL('image/png'); };
    const t = 0; // dot "on"
    // icon 200x200: stacked logo inside the round crop
    const [ic, i] = mk(200, 200);
    brandBg(i, 0, 0, 200, 200, 3);
    E(i, 100, 100, 92, 92, DA(BR.bg3, 0.55));
    logoStack(i, 100, 49, 48, t);
    // banner 640x360: safe area x 127..513, y 127..233
    const [bc, g] = mk(640, 360);
    brandBg(g, 0, 0, 640, 360, 5);
    for (let k = 0; k < 640; k += 8) { R(g, k, 120, 4, 1, BR.bg3); R(g, k + 4, 240, 4, 1, BR.bg3); }
    E(g, 212, 180, 44, 44, DA(BR.bg3, 0.7));
    blit(g, facePortrait('narrator', { t: 0, mouth: 0, blink: 0, expr: 'smile' }), 212, 180, 25, 25, { s: 2 });
    logoAt(g, 262, 140, 32, t);
    const cp = BRAND.copy; TX(g, cp, 262, 182, BR.cream, 16, BR.dark);
    const hd = '文庫・記録　' + BRAND.youtube; TX(g, hd, 262, 206, BR.orange, 16, BR.dark);
    // profile 192x192: framed, logo on top, narrator below (same layout as the old profile picture)
    const [pc, q] = mk(192, 192);
    R(q, 0, 0, 192, 192, BR.cream); R(q, 6, 6, 180, 180, BR.dark); brandBg(q, 7, 7, 178, 178, 2);
    for (const [a, c2] of [[0, 0], [186, 0], [0, 186], [186, 186]]) R(q, a, c2, 6, 6, BR.orange);
    logoLine(q, 96, 22, 32, t);
    blit(q, facePortrait('narrator', { t: 0, mouth: 0, blink: 0, expr: 'smile' }), 96, 124, 25, 25, { s: 2 });
    return { icon: up(ic, 4), banner: up(bc, 4), profile: up(pc, 4) };
  });
  fs.mkdirSync(outDir, { recursive: true });
  for (const [k, u] of Object.entries(art)) { const f = path.join(outDir, k + '.png'); fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); console.log(f); }
  fs.copyFileSync(path.join(outDir, 'profile.png'), path.join(path.dirname(path.resolve(outDir)), 'blog', 'profile.png'));
  await b.close();
})();
