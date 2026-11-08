// Write YouTube chapters (<work>/build/chapters.txt) from the scene timeline of a built work.
// usage: node engine/tools/chapters.js works/NNN-xxx
//   scenes with a `ch` label start a chapter; the video has a 0.5 s lead-in (export_video.js)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const work = path.resolve(process.argv[2]);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(work, 'index.html')); await p.waitForTimeout(1000);
  const sc = await p.evaluate(() => window.__prep());
  await b.close();
  let rows = sc.filter(s => s[3]).map(s => [s[1] + 0.5, s[3]]);
  if (!rows.length) rows = sc.map(s => [s[1] + 0.5, s[0]]);
  rows[0][0] = 0;
  // cold open before the title card: name the first chapter as the prologue
  if (sc.findIndex(s => s[0] === 'ドット語り') > 0) { if (sc[0][3]) rows[0][1] = 'プロローグ'; else { rows[0][0] = sc.find(s => s[3])[1] + 0.5; rows.unshift([0, 'プロローグ']); } }
  // YouTube needs every chapter to be at least 10 s long: fold short ones into the previous chapter
  const out = []; for (const r of rows) { if (out.length && r[0] - out[out.length - 1][0] < 10) continue; out.push(r); }
  rows = out;
  const fmt = t => { t = Math.floor(t); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };
  const txt = rows.map(([t, n]) => fmt(t) + ' ' + n).join('\n');
  fs.mkdirSync(path.join(work, 'build'), { recursive: true });
  fs.writeFileSync(path.join(work, 'build', 'chapters.txt'), txt + '\n');
  console.log(txt);
})();
