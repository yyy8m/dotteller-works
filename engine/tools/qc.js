// 書き出し前の自動チェック（2026-11-12）
// usage: node engine/tools/qc.js works/<id>/index.html [out_dir]
//  - 動きの少ない区間：1秒ごとのコマを比べ、場面の絵（字幕ウィンドウより上）がほとんど変わらない時間が 6 秒以上続く所
//  - 色の偏り：場面の絵の大半（55%以上）が同じ1色の所（のっぺり・暗すぎ）
//  - 黒い画面：ほぼ真っ黒なコマが 2 秒以上続く所（タイトル前の暗転・意図した黒は目で確かめて OK にする）
// 引っかかった時刻の横長コマを out_dir/qc_*.png に書き出す。0 件なら「OK」。
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const [html, outDir] = process.argv.slice(2); if (outDir) fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.error('PAGEERR', e.message));
  await p.goto('file://' + path.resolve(html)); await p.waitForTimeout(1200);
  const res = await p.evaluate(async () => {
    await window.__prep(); const ls = TL.scenes.flatMap(s => s.lines.map(l => s.start + l.se)); const end = Math.min(TL.total, Math.max(...ls) + 2);
    const [sc, sx] = mk(160, 90); sx.imageSmoothingEnabled = true; const out = [];
    for (let T = 0.5; T < end; T += 1) {
      const f = composeFrame('wide', T); sx.clearRect(0, 0, 160, 90); sx.drawImage(f, 0, 0, 160, 90);
      const d = sx.getImageData(0, 0, 160, 62).data; // the picture above the dialog window
      const hist = new Map(); let lum = 0;
      for (let i = 0; i < d.length; i += 4) { const k = (d[i] >> 5) * 64 + (d[i + 1] >> 5) * 8 + (d[i + 2] >> 5); hist.set(k, (hist.get(k) || 0) + 1); lum += d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11; }
      const n = d.length / 4, top = Math.max(...hist.values()) / n;
      out.push({ T: +T.toFixed(1), sc: TL.scenes[sceneAt(T)].sc.name, px: Array.from(d.filter((_, i) => i % 16 === 0)), top, lum: lum / n });
    }
    return out;
  });
  const issues = [];
  // motion: consecutive near-identical samples
  let run = [];
  for (let i = 1; i < res.length; i++) {
    const a = res[i - 1].px, c = res[i].px; let diff = 0; for (let k = 0; k < a.length; k++) diff += Math.abs(a[k] - c[k]); diff /= a.length;
    if (diff < 1.2 && res[i].sc === res[i - 1].sc) { if (!run.length) run.push(res[i - 1]); run.push(res[i]); } else { if (run.length >= 7) issues.push(['動きが少ない', run[0].T, run[run.length - 1].T, run[0].sc]); run = []; }
  }
  if (run.length >= 7) issues.push(['動きが少ない', run[0].T, run[run.length - 1].T, run[0].sc]);
  // colour dominance & black
  const flag = (cond, label, minLen) => { let r = []; for (const x of res) { if (cond(x)) r.push(x); else { if (r.length >= minLen) issues.push([label, r[0].T, r[r.length - 1].T, r[0].sc]); r = []; } } if (r.length >= minLen) issues.push([label, r[0].T, r[r.length - 1].T, r[0].sc]); };
  flag(x => x.top > 0.55 && x.lum >= 12, '同じ色が大半', 3);
  flag(x => x.lum < 12, 'ほぼ真っ黒', 2);
  for (const [k, a, z, s] of issues) console.log(`${k}\t${a}〜${z}秒\t${s}`);
  if (outDir) for (const [k, a, , s] of issues) { const u = await p.evaluate(T => composeFrame('wide', T).toDataURL(), a); fs.writeFileSync(path.join(outDir, `qc_${a}.png`), Buffer.from(u.split(',')[1], 'base64')); }
  console.log(issues.length ? `QC: ${issues.length} 件（画像で確かめ、意図どおりなら OK、そうでなければ直す）` : 'QC: OK');
  await b.close();
})();
