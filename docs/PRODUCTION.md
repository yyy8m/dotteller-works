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
- 文庫シリーズ: フォルダは `works/NNN-<英字名>`、`series: "bunko"`、語り部は `narrator`（記録の神）。原作の長さに合わせる。
- 事実は Wikipedia（日本語版）で確かめられる範囲だけ（記録）。記事は次のように取得して全文を読み、台本の一文ずつと照らし合わせる
  （API は回数制限が厳しいので index.php の raw を使う。User-Agent を必ずつける）:
  ```bash
  curl -sS -A "dotgatari-factcheck/1.0 (personal script)" -G https://ja.wikipedia.org/w/index.php --data-urlencode "title=記事名" -d action=raw -o article.wiki
  ```
  記事にない話（日付・地名・人数・セリフ）は入れない。英語版にしかない話も入れない。確証のない話は「〜と言われています」。表現の決まりは `docs/SCHEDULE.md` の「作り方の決まり」。
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
