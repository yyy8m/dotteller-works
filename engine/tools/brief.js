#!/usr/bin/env node
/* BRIEF (2026-11-27 Muse 連絡18): one row per scene of the main video —
   台本 (line ids + opening words) / テロップ (text drawn in the scene) / 画面構成 (the scene's design note in scenes2.js) /
   図解 (year cards and other captions) / 効果音・BGM (the scene's BGM style and its sound cues).
   usage: node engine/tools/brief.js works/<id>   → writes works/<id>/BRIEF.md */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2]); const html = path.join(dir, 'index.html');
  const src = fs.existsSync(path.join(dir, 'scenes2.js')) ? fs.readFileSync(path.join(dir, 'scenes2.js'), 'utf8') : '';
  const notes = {}; // scene name -> the design comment above it
  const re = /\/\* ---- ([^:*]+): ([\s\S]*?) ---- \*\/\s*const (\w+) = (?:withCuts\()?\{\s*name: '([^']+)'/g; let m;
  while ((m = re.exec(src))) notes[m[4]] = m[2].replace(/\s+/g, ' ').trim();
  const b = await chromium.launch(); const p = await b.newPage(); await p.goto('file://' + html); await p.waitForTimeout(1200);
  await p.evaluate(() => document.fonts.load('16px "DotGothic16"'));
  const rows = await p.evaluate(async () => {
    await window.__prep();
    let txt = null, cards = null; const oTX = TX; TX = (c, s, ...a) => { if (txt && s && String(s).trim()) txt.add(String(s).trim()); return oTX(c, s, ...a); };
    if (typeof yearCard === 'function') { const oY = yearCard; yearCard = (c, x, y, yr, sub) => { if (cards) cards.add((yr + ' ' + (sub || '')).trim()); return oY(c, x, y, yr, sub); }; }
    const out = [];
    TL.scenes.forEach((S, i) => {
      txt = new Set(); cards = new Set();
      const ts = S.lines.length ? S.lines.map(l => S.start + (l.t0 + l.se) / 2) : [S.start + Math.min(2, S.dur / 2)];
      for (const T of ts) composeFrame('wide', T);
      const cues = []; if (S.sc.sfx) try { S.sc.sfx(S, (t, f) => cues.push(f)); } catch (e) {}
      const lines = S.lines.map(l => l.id + '「' + (l.text || '').replace(/\s+/g, '').slice(0, 14) + '…」');
      const said = S.lines.map(l => (l.text || '').replace(/\s+/g, '')).join('|'), names = new Set(Object.values(typeof SPK !== 'undefined' ? SPK : {}).map(v => v.name).concat(Object.values(typeof SPEAKERS_EXTRA !== 'undefined' ? SPEAKERS_EXTRA : {}).map(v => v.name)));
      const cardBits = new Set([...cards].flatMap(c => c.split(' ')));
      const tel = [...txt].filter(s => s.length > 1 && !/^[ 　]+$/.test(s) && !names.has(s) && !cardBits.has(s) && !said.includes(s.replace(/\s+/g, '')));
      out.push({ n: i + 1, name: S.sc.name || '', ch: S.sc.ch || '', start: S.start, lines, txt: tel, cards: [...cards], bgm: S.sc.bgm || '（なし）', cues: [...new Set(cues)] });
      txt = null; cards = null;
    });
    return out;
  });
  await b.close();
  const mmss = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  const esc = s => String(s).replace(/\|/g, '／').replace(/\n/g, ' ');
  const work = JSON.parse(fs.readFileSync(path.join(dir, 'lines.json'), 'utf8')).work;
  let md = `# BRIEF：${work.title}（${path.basename(dir)}）\n\n場面番号ごとの制作記録（Muse 連絡18）。台本は行IDと書き出し、テロップは場面の中に描いた文字、図解は年号カードなど、効果音・BGMは場面のBGMスタイルと効果音。自動生成：\`node engine/tools/brief.js ${path.relative(process.cwd(), dir)}\`\n\n`;
  md += '| 場面 | 開始 | 台本 | テロップ | 画面構成 | 図解 | 効果音・BGM |\n|---|---|---|---|---|---|---|\n';
  for (const r of rows) md += `| ${r.n} ${esc(r.name)} | ${mmss(r.start)} | ${esc(r.lines.join('、') || '（せりふなし）')} | ${esc(r.txt.join('、') || '—')} | ${esc(notes[r.name] || r.ch || '—')} | ${esc(r.cards.join('、') || '—')} | BGM ${esc(r.bgm)}／${esc(r.cues.join('・') || '—')} |\n`;
  fs.writeFileSync(path.join(dir, 'BRIEF.md'), md); console.log(path.join(dir, 'BRIEF.md'), rows.length, 'scenes');
})();
