// Render a work's YouTube thumbnail (1280x720 PNG) with the engine itself.
// usage: node engine/tools/thumb.js works/NNN-xxx [out.png]
//   uses engine/src/thumb.js + <work>/thumb.js (THUMB function) on top of <work>/index.html
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const work = path.resolve(process.argv[2]), out = process.argv[3] || path.join(work, 'build', 'thumb.png');
  const root = path.resolve(__dirname, '..', '..');
  const b = await chromium.launch(); const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERR', e.message));
  await p.goto('file://' + path.join(work, 'index.html')); await p.waitForTimeout(1200);
  await p.addScriptTag({ content: fs.readFileSync(path.join(root, 'engine', 'src', 'thumb.js'), 'utf8') });
  const wt = path.join(work, 'thumb.js'); if (fs.existsSync(wt)) await p.addScriptTag({ content: fs.readFileSync(wt, 'utf8') });
  await p.evaluate(() => Promise.all([16, 24, 32, 40, 44, 48, 56].map(s => document.fonts.load(s + 'px "DotGothic16"'))).then(() => _tc.clear()));
  const url = await p.evaluate(() => { const tc = drawThumb(0), [o, x] = mk(1280, 720); x.imageSmoothingEnabled = false; x.drawImage(tc, 0, 0, 1280, 720); return o.toDataURL('image/png'); });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
  console.log(out, fs.statSync(out).size);
  await b.close();
})();
