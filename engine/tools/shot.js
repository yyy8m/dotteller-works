const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy, args: ['--ignore-certificate-errors'] });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message + '\n' + e.stack));
  await p.goto('file://' + require('path').resolve(process.env.HTML));
  await p.waitForTimeout(1500);
  const info = await p.evaluate(() => window.__prep());
  console.log(JSON.stringify(info));
  await p.evaluate(() => document.fonts.ready.then(() => _tc.clear()));
  const times = (process.argv[2] || '').split(',').filter(Boolean).map(Number);
  const out = [];
  for (const T of times) {
    const t0 = Date.now();
    await p.evaluate(T => window.__draw(T), T);
    const ms = Date.now() - t0;
    const data = await p.evaluate(() => document.getElementById('c').toDataURL());
    const f = (process.env.OUT || 'shots') + '/t' + T.toFixed(2) + '.png';
    fs.writeFileSync(f, Buffer.from(data.split(',')[1], 'base64')); out.push(f + ' ' + ms + 'ms');
  }
  console.log(out.join('\n'));
  console.log('ERRORS:', errs.slice(0, 10).join('\n'));
  await b.close();
})();
