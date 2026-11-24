// usage: node engine/tools/tiktok_len.js works/<id>/build/index_tiktok.html
// prints the total length, the end of the last line, and the sum of all spoken lines (Muse 連絡13: voice >= 63 s, total <= 75 s)
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.error('PAGEERR', e.message));
  await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(1000);
  const [total, last, voice] = await p.evaluate(async () => { await window.__prep(); let v = 0; TL.scenes.forEach(s => s.lines.forEach(l => v += l.se - l.t0)); const ls = TL.scenes.flatMap(s => s.lines.map(l => s.start + l.se)); return [TL.total, Math.max(...ls), v]; });
  const ok = voice >= 63 && total <= 75.05 && total > 60;
  console.log(`total ${total.toFixed(1)}  lastLine ${last.toFixed(1)}  voice ${voice.toFixed(1)}  ${ok ? 'OK' : 'NG（音声63秒以上・全体75秒以内）'}`);
  await b.close();
})();
