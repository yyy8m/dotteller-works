#!/usr/bin/env python3
"""投稿前チェック: ショート／TikTok版の1フレーム目に冒頭カード（上部の白い大きな文字）が出ているか、誘導文が BRAND.youtube か。
usage: python3 engine/tools/check_short.py works/<id>/build/video/<n>_short.mp4 [...]"""
import re, subprocess, sys
ok = True
brand = re.search(r"youtube:\s*'([^']+)'", open('engine/src/brand.js', encoding='utf-8').read()).group(1)
if brand != '@dotteller': print('NG BRAND.youtube =', brand); ok = False
for f in sys.argv[1:]:
    w, h = 270, 480
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-frames:v', '1', '-vf', f'scale={w}:{h}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True).stdout
    top = raw[:w * h // 5]
    white = sum(1 for b in top if b > 200) / max(1, len(top))
    good = len(raw) == w * h and white > 0.01
    ok &= good
    print('OK' if good else 'NG', f, f'上部の白文字 {white * 100:.1f}%')
sys.exit(0 if ok else 1)
