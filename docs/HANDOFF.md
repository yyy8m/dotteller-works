# 引き継ぎメモ（ブランド名変更：DOT TELLER → ドット語り）

返事は日本語で。作業は main ブランチで行い、終わったら main にコミット・push する。

## 決定事項
| 項目 | 内容 |
|---|---|
| 新ブランド名 | **ドット語り.**（ロゴは「ドット語り」＋オレンジの「.」。読みは「どっとがたり」） |
| ローマ字表記 | DOTGATARI（URL・ハンドル・タグ用） |
| シリーズ名 | 青空文庫シリーズ＝「ドット語り 文庫」 / Wikipediaシリーズ＝「ドット語り 記録」 |
| キャッチコピー | ドットで描く、物語と記録。（変更なし） |
| 語り部 | 文庫＝記録の神、記録＝灯の神（変更なし） |
| 記録の神の声 | 「やさしいおじいさん」に変更：`SPEAKERS['narrator'] = ('nitech_jp_atr503_m001.htsvoice', 0.55, 2.0, 0.88)`（約142Hz）。灯の神は低く暗いままでよい |
| TikTok | https://www.tiktok.com/@dotgatari （投稿はオーナーが手動） |
| YouTube | **https://www.youtube.com/channel/UCP3MoaRk7izj1TXuMlbmUXw** （チャンネルIDのURL。名前・ハンドルを変えても切れない。今のハンドルは @dotteller で、11/17ごろ「ドット語り.」「@dotgatari」に変える予定。今の @dotgatari は使っていない別の空チャンネル） |
| リポジトリ名 | dotteller-works のまま（変えると GitHub Pages のURLが変わるため） |
| 対象 | 文庫＝全年齢。記録（Wikipedia）＝大人向け寄り。血はドットで表現してよいが、実在の被害者の損壊描写を長く見せない（年齢制限回避） |

## 作業内容
### 1. ブランド名を1か所で管理する
- `engine/src/brand.js` に `BRAND = { name: 'ドット語り', roman: 'DOTGATARI', tiktok: '@dotgatari', youtube: '@dotgatari' }` のような設定を作る。全テキストをここから参照する
- ロゴ（`logoLine` / `logoStack`）：DotGothic16 の 32px（縦積みは 16px×2行など）で「ドット語り」をクリーム色＋濃い影、末尾の「.」をオレンジで点滅
- 動画枠（`composeFrame`）とタイトル画面の「@dotteller」表記も BRAND から出す（TikTok と YouTube の両方）

### 2. 「DOT TELLER」の文字をすべて差し替える
`grep -rn "DOT TELLER\|DOTTELLER\|dotteller\|ドットテラー" --exclude-dir=.git .` で洗い出す。リポジトリ名・Pages URL（yyy8m.github.io/dotteller-works）だけは残す。YouTube の `@dotteller` は `@dotgatari` に変える。
- `works/001-kumo-no-ito/lines.json` の L0：表示 `ドット語り文庫。今日の物語は、芥川龍之介の、『蜘蛛の糸』です。` / 読み（say）`ドットがたり文庫。今日の物語は、芥川龍之介の、蜘蛛の糸です。`（g2p で「ドットガタリ」と読むか確認）
- `engine/tools/build.py`（title・meta・コメント）、`index.html`、`privacy.html`、`README.md`、`blog/SETTINGS.md`、`blog/theme.css` のコメント、`blog/posts/001-kumo-no-ito.html`、`works/001-kumo-no-ito/publish.json`

### 3. 相互リンク（YouTube本編・ショート・ブログ・TikTok）
- `publish.json` の説明文とブログ本文に、プレースホルダ `{BLOG_URL}` `{MAIN_URL}` `{SHORT_URL}` `{TIKTOK_URL}` を入れる
- `engine/tools/publish.py` に `link` 手順を追加：ブログ投稿 → YouTube本編・ショートをアップロード → 全URLがそろったら、プレースホルダを置き換えて、YouTube 2本の説明文（videos.update）とブログ記事（posts.update）を更新する。ブログ記事には本編を `https://www.youtube.com/embed/<id>` で埋め込む
- 順番：`blog` → `youtube` → `link`。URLは `works/NNN/published.json` に保存する
- TikTok 用に `works/NNN/tiktok.txt`（キャプション＋ハッシュタグ。ブログ・YouTube本編へのリンク入り）を出力する

### 4. 作り直し
```bash
pip install pyopenjtalk-plus numpy
python3 engine/voice/gen_voice.py works/001-kumo-no-ito
python3 engine/tools/build.py works/001-kumo-no-ito
node engine/tools/export_video.js works/001-kumo-no-ito/index.html wide works/001-kumo-no-ito/build/video/001_wide.mp4
node engine/tools/export_video.js works/001-kumo-no-ito/index.html tall works/001-kumo-no-ito/build/video/001_tall.mp4
```
- 書き出し前に `engine/tools/shot.js`・`spr.js`・`sheet.py` で、タイトル画面・冒頭（巻物）・動画枠（wide/tall）を描画して目視確認する。ロゴの文字がはみ出していないか

### 5. 画像素材（任意・できれば）
- YouTube用のアイコン 800×800、バナー 2560×1440（安全領域は中央 1546×423）を、ドット調で Canvas から PNG に書き出す（`brand/` フォルダ）。バナーは API（channelBanners.insert → channels.update）で設定してよい。アイコンは API で変えられないのでオーナーに渡す

### 6. 投稿
- `python3 engine/tools/publish.py - whoami` で接続確認 → `blog` → `youtube` → `link`
- もし以前に「DOT TELLER」名で投稿済みのもの（published.json にURLがある、またはチャンネル・ブログに残っている）があれば、オーナーに報告したうえで削除または非公開にして、新しい名前で上げ直す
- 最後に、ブログ記事・YouTube本編・ショートのURLと、`tiktok.txt` の中身をオーナーに伝える

### 7. オーナーの手作業として伝えること（APIで変更できない）
- YouTube Studio → カスタマイズ → 基本情報：名前「ドット語り」（ハンドル @dotgatari は変更済み）、アイコン画像
- Blogger：`blog/SETTINGS.md` の新しい文面（ブログ名・説明・プロフィール）
- TikTok：`tiktok.txt` を使って手動投稿。プロフィールのリンク欄にブログURL
