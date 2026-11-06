// Export a built ドット語り work to mp4.
// usage: node engine/tools/export_video.js works/001-kumo-no-ito/index.html wide out.mp4 [fps] [tail]
//   wide = 1920x1080 (YouTube), tall = 1080x1920 (Shorts / TikTok)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
(async () => {
  const [html, mode, out, fpsArg, tailArg] = process.argv.slice(2);
  const fps = +(fpsArg || 30), tail = +(tailArg || 8), lead = 0.5;
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy });
  const p = await b.newPage();
  p.on('pageerror', e => console.error('PAGEERR', e.message));
  await p.goto('file://' + path.resolve(html));
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.fonts.load('16px "DotGothic16"').then(() => _tc.clear()));
  await p.evaluate(() => window.__prep());
  const end = await p.evaluate(() => { const S = TL.scenes[TL.scenes.length - 1]; return S.start + (S.tEnd != null ? S.tEnd : S.dur); });
  const len = end + tail;
  console.log('length', len.toFixed(2), 's');
  const wavPath = out.replace(/\.mp4$/, '.wav');
  const a = await p.evaluate(([len, lead]) => window.__audio(len + lead, lead), [len, lead]);
  fs.writeFileSync(wavPath, Buffer.from(a.wav, 'base64'));
  console.log('audio peak', a.peak.toFixed(3));
  await p.evaluate(() => document.fonts.load('16px "DotGothic16"').then(() => _tc.clear()));
  const scale = 3; // 640x360 / 360x640 frames -> 1920x1080 / 1080x1920
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-', '-i', wavPath,
    '-vf', `scale=iw*${scale}:ih*${scale}:flags=neighbor`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = Math.ceil((len + lead) * fps), B = 30;
  const t0 = Date.now();
  for (let i = 0; i < total; i += B) {
    const Ts = []; for (let k = i; k < Math.min(total, i + B); k++) Ts.push(k / fps - lead);
    const urls = await p.evaluate(([m, Ts]) => window.__frame(m, Ts), [mode, Ts]);
    for (const u of urls) { const buf = Buffer.from(u.split(',')[1], 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
    if (i % (B * 20) === 0) console.log(`frame ${i}/${total} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
  fs.unlinkSync(wavPath);
  console.log('done', out);
})();
