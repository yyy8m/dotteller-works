# 1作品の制作手順（定期作業用）

返事は日本語。作業は main ブランチ。終わったら main にコミット・push。

## 0. 何を作るか
`docs/SCHEDULE.md` の「予定」で、状態が「制作前」のものを公開日の早い順に作る（1回の作業で最大2本）。当日公開の分は、19:00 に間に合う見込みがあるときだけ作り、無理なら公開日を後ろへずらして表を直す。
作り終えたら状態を「予約済み」にし、長さを書き足す。予定が残り2週間を切ったら、同じ方針で候補を足しておく。

## 1. 準備
```bash
git pull origin main
pip install pyopenjtalk-plus numpy
python3 engine/tools/publish.py - whoami
```
whoami が失敗したら、その時点で止めてエラーを日本語でまとめて報告する。

## 2. 台本（works/<id>/lines.json）
- 記録シリーズ: フォルダは `works/kNNN-<英字名>`、`series: "kiroku"`、語り部は `lamp`（灯の神）。本編は5〜7分、台本30行前後・12章前後。
  ショート用のセリフ `S1`（つかみ）と `S2`（「くわしくは、本編で。」）を入れる。
- 文庫シリーズ: フォルダは `works/NNN-<英字名>`、`series: "bunko"`、語り部は `narrator`（記録の神）。本編は5〜8分・10〜12章前後・台本30行前後。
  原作の流れ（登場人物のセリフ、山場、結末）を省きすぎずに語る。短い作品は場面と間をていねいに描いて尺をとる。
  ショート用の `S1`（つかみ）と `S2`（「続きは、本編で。」）も入れる。登場人物のセリフは原作のことば（青空文庫）を活かし、別の声（`gen_voice.py` の SPEAKERS に追加）で読ませる。
- 事実は Wikipedia（日本語版）で確かめられる範囲だけ（記録）。記事は次のように取得して全文を読み、台本の一文ずつと照らし合わせる
  （API は回数制限が厳しいので index.php の raw を使う。User-Agent を必ずつける）:
  ```bash
  curl -sS -A "dotgatari-factcheck/1.0 (personal script)" -G https://ja.wikipedia.org/w/index.php --data-urlencode "title=記事名" -d action=raw -o article.wiki
  ```
  記事にない話（日付・地名・人数・セリフ）は入れない。英語版にしかない話も入れない。確証のない話は「〜と言われています」。表現の決まりは `docs/SCHEDULE.md` の「作り方の決まり」。
- 文庫の原作は青空文庫から取得して全文を読み、`works/<id>/source_aozora.txt` に保存する（Shift_JIS の XHTML。`main_text` の部分からルビを除いて取り出す）。
  ```bash
  curl -sS -o src.html https://www.aozora.gr.jp/cards/<作家番号>/files/<ファイル名>.html
  ```
- 記録シリーズも人物の声を入れる（犯人本人・家族・警察など。`lines.json` の `speakers` に声を、`story.js` の `SPEAKERS_EXTRA` に名前と色を、`scenes*.js` の `PORTRAITS` に顔を）。
  セリフは記事にある発言（「」で引かれたもの）を優先し、ない場合は短い反応（「なんだ、これは……！」など）だけにする。説明欄とブログに「※ 人物のセリフの一部は、記録をもとにした再現です。」を入れる。
- ショートは30〜50秒（`HOOK` に画面上部のつかみ2行。2行目は赤字）。
- 読み上げ用の `say` は、表示用 `text` と句読点の区切りをそろえる（「・」は使わない。年号は漢数字）。

## 3. 読みのチェック（必須）
```bash
python3 engine/voice/reading.py works/<id>
```
食い違いが出たら一つずつ判断し、誤読なら `engine/voice/reading_fix.json` の `fix` に正しいカタカナを、
問題ない読みなら `ok` に追加する。0 か所になるまで繰り返す。

## 4. 場面・進行・サムネ
- `scenes*.js`（場面）、`story.js`（`PLAN_FULL` / `PLAN_SHORT` / `EXPR` / 効果音 / `TITLE_DECO`）、`thumb.js`（`THUMB`）。
  既存の `works/k001-ed-gein`、`works/k002-john-wayne-gacy` を手本にし、共通部品は `engine/src/kiroku.js` を使う。
- 大事な人物・血だまり・遺体などは y < 165 に置く（下は字幕の枠で隠れる）。章の始まりの場面には `ch: '章の名前'`。
- 画像で確認しながら直す（場面ごとに数枚を書き出して目で見る）。

## 4.5 品質の決まり（必ず守る。文庫 #001「蜘蛛の糸」が下限）
- 主な人物は細かく描いた部品で描く: 和装・中国風は `robeFig`、洋装は `suitFig`（engine/src/kiroku.js。文庫は lines.json の work に `"kit": "kiroku"`）。
  小さな棒人形（`personSpr`）は、通行人や遠景の群衆だけに使う。
- 人物ごとに 48x48 の顔（`PORTRAITS`）を作り、大事なセリフ（決めゼリフ・山場・結末）では顔の寄り（`closeUp` / `withCuts`）を入れる。1作品に4〜8か所。
- 同じ背景を3場面以上続けない。場面ごとに光・時間帯・天気・寄り引きを変える。背景には奥行き（遠景・中景・近景）と動くもの（人の流れ・風・光）を入れる。
- 山場の怪物・神・王などは大きく、細部（よろい・冠・ひげ・目の光）まで描く。四角い塊のままにしない。
- 原作に書かれた具体的なもの（例: 白孔雀・刀を呑む魔法使い・白馬・蝙蝠）を、できるだけ画面に入れる。
- ユーザーから参考画像の指定があれば、雰囲気（色・目つき・質感）を取り入れて、オリジナルのドット絵で描く（構図や絵柄をそのまま写さない）。
- 全編を6〜7秒おきに書き出した一覧画像を必ず目で見て、切れ・重なり・はみ出し・単調な場面がないか確かめてから書き出す。

## 5. 音声・ビルド・書き出し
```bash
python3 engine/voice/gen_voice.py works/<id>          # WARN が出たら手順3に戻る
python3 engine/tools/build.py works/<id>
python3 engine/tools/build.py works/<id> --short
node engine/tools/chapters.js works/<id>
node engine/tools/thumb.js works/<id>
node engine/tools/export_video.js works/<id>/index.html wide works/<id>/build/video/<n>_wide.mp4
node engine/tools/export_video.js works/<id>/build/index_short.html tall works/<id>/build/video/<n>_short.mp4 30 1
```

## 6. 投稿（予約）
- `works/<id>/publish.json`: `publish_at`（例 `2026-11-13T19:00:00+09:00`）、ブログの `slug`（英字）、説明欄は既存作品と同じ構成（`{CHAPTERS}` を入れる）。
- `blog/posts/<id>.html`: 既存の記事と同じ構成（遊べる画面・動画・あらすじ／どんな事件・年表・参考・クレジット）。
- トップの作品一覧 `index.html` にカードを追加。
```bash
python3 engine/tools/publish.py works/<id> all
```
- YouTube 2本が `private` + `publishAt`、ブログが `SCHEDULED` になっていることを読み戻して確認する。

## 7. 報告
作った作品、公開日時、本編・ショート・ブログの URL、TikTok 用の `works/<id>/tiktok.txt` の中身を短く報告する。
