# DOT TELLER works

■ ドットで描く、物語と記録。

- 作品一覧（GitHub Pages）: https://yyy8m.github.io/dotteller-works/
- YouTube: https://www.youtube.com/@dotteller

## 構成
```
engine/src/      共通エンジン（描画・キャラ・ブランド・音・会話UI）
engine/voice/    音声合成（Open JTalk + HTS voice）
engine/tools/    ビルド・確認・動画書き出し
works/NNN-xxx/   作品ごとの台本(lines.json)・場面(scenes*.js)・進行(story.js)・完成HTML(index.html)
blog/            Blogger用CSS・記事本文
```

## 1作品を作る流れ
```bash
python3 engine/voice/gen_voice.py works/001-kumo-no-ito     # 台詞音声を生成
python3 engine/tools/build.py works/001-kumo-no-ito         # 1ファイルHTMLを生成
node engine/tools/export_video.js works/001-kumo-no-ito/index.html wide out_wide.mp4   # YouTube 16:9
node engine/tools/export_video.js works/001-kumo-no-ito/index.html tall out_tall.mp4   # Shorts/TikTok 9:16
```
必要なもの: Python 3 + `pip install pyopenjtalk-plus numpy`、Node.js + Playwright(Chromium)、ffmpeg

## クレジット
- 音声: HTS voice "mei" (c) Nagoya Institute of Technology, CC BY 3.0 / "nitech_jp_atr503_m001" (c) Nagoya Institute of Technology, Modified BSD（`engine/voice/htsvoice/` 内のライセンス参照）
- フォント: DotGothic16 (SIL Open Font License, Google Fonts から読み込み)
