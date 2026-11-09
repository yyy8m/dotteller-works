"""Build one ドット語り. work into a single self-contained HTML.
usage: python3 engine/tools/build.py works/001-kumo-no-ito [--short | --tiktok]
       --short:  build <work>/build/index_short.html with PLAN_SHORT (YouTube Shorts, 25-35 s loop)
       --tiktok: build <work>/build/index_tiktok.html with PLAN_TIKTOK (TikTok teaser, 60-75 s, ends with 「続きは、本編で。」)
Inputs : <work>/lines.json, <work>/build/voices.js (from engine/voice/gen_voice.py),
         <work>/scenes*.js, <work>/story.js
Output : <work>/index.html
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ENGINE = os.path.join(ROOT, 'engine', 'src')
work = os.path.abspath(sys.argv[1])
TIKTOK = '--tiktok' in sys.argv[2:]
SHORT = '--short' in sys.argv[2:] or TIKTOK
cfg = json.load(open(os.path.join(work, 'lines.json'), encoding='utf-8'))
W = cfg['work']
rd = lambda p: open(p, encoding='utf-8').read()
# brand settings live in one place: engine/src/brand.js (const BRAND = {...})
BRAND = dict(re.findall(r"(\w+): '([^']*)'", re.search(r'const BRAND = \{(.*?)\};', rd(os.path.join(ENGINE, 'brand.js'))).group(1)))

parts = [rd(os.path.join(ENGINE, f)) for f in ['core.js', 'chars.js', 'env.js'] + (['kiroku.js'] if W['series'] == 'kiroku' or W.get('kit') == 'kiroku' else [])]
parts += [rd(p) for p in sorted(glob.glob(os.path.join(work, 'scenes*.js')))]
parts += [rd(os.path.join(ENGINE, 'brand.js')), rd(os.path.join(ENGINE, 'audio.js')), rd(os.path.join(work, 'story.js')), rd(os.path.join(ENGINE, 'main.js'))]
js = 'const WORK = ' + json.dumps(W, ensure_ascii=False) + ';\nconst SHORT = ' + ('true' if SHORT else 'false') + ';\nconst TIKTOK = ' + ('true' if TIKTOK else 'false') + ';\n' + '\n'.join(parts)
voices = rd(os.path.join(work, 'build', 'voices.js'))
series = {'bunko': '文庫', 'kiroku': '記録'}[W['series']]
title = f"{W['title']}｜{BRAND['name']} {series} #{W['no']}"

html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{BRAND['name']} {series} #{W['no']}「{W['title']}」（{'原作：' + W['author'] if W['series'] == 'bunko' else '参考：' + W['source']}）。ボタンを押すと始まる、ドット絵の物語。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
<style>
html,body{{margin:0;height:100%;background:#06140c;overflow:hidden}}
body{{display:flex;align-items:center;justify-content:center}}
#wrap{{position:relative}}
canvas{{display:block;image-rendering:pixelated;image-rendering:crisp-edges}}
#ui,#again{{position:absolute;left:0;right:0;bottom:30%;text-align:center}}
#again{{display:none;bottom:5%}}
button{{font-family:"DotGothic16",monospace;font-size:clamp(14px,3.2vw,22px);color:#f4ecd8;background:#0c2418;border:3px solid #f4ecd8;outline:3px solid #06140c;box-shadow:6px 6px 0 #f49a1c;padding:.4em 1.4em;cursor:pointer;letter-spacing:2px}}
button:hover{{background:#1c4430}}
button:active{{transform:translate(3px,3px);box-shadow:3px 3px 0 #f49a1c}}
</style>
</head>
<body>
<!--
  {BRAND['name']} {series} #{W['no']}「{W['title']}」 原作：{W['author']}（{W['source']}）
  映像・音楽・効果音：すべてコードで描画／合成
  音声：Open JTalk + HTS voice "mei" (c) Nagoya Institute of Technology, CC BY 3.0
        / "nitech_jp_atr503_m001" (c) Nagoya Institute of Technology, Modified BSD
  フォント：DotGothic16 (SIL Open Font License)
-->
<div id="wrap">
<canvas id="c" width="320" height="240"></canvas>
<div id="ui"><button id="go">▶ はじめる</button></div>
<div id="again"><button onclick="location.reload()">↺ もういちど</button></div>
</div>
<script>
{voices}</script>
<script>
{js}
</script>
</body>
</html>
'''
out = os.path.join(work, 'build', 'index_tiktok.html' if TIKTOK else 'index_short.html') if SHORT else os.path.join(work, 'index.html')
open(out, 'w', encoding='utf-8').write(html)
print(out, len(html))
