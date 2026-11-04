const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy });
  const p = await b.newPage();
  p.on('pageerror', e => console.log('PAGEERR ' + e.message + '\n' + e.stack));
  await p.goto('file://' + require('path').resolve(process.env.HTML));
  await p.waitForTimeout(1200);
  await p.evaluate(() => window.__prep());
  const code = fs.readFileSync(process.argv[2], 'utf8');
  const data = await p.evaluate(code);
  fs.writeFileSync(process.argv[3], Buffer.from(data.split(',')[1], 'base64'));
  await b.close();
})();
