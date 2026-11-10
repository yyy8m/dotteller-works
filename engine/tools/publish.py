"""Publish a ドット語り. work to Blogger and YouTube (standard library only).

usage:
  python3 engine/tools/publish.py works/001-kumo-no-ito blog       # Blogger に記事を投稿
  python3 engine/tools/publish.py works/001-kumo-no-ito youtube    # YouTube に本編/ショートをアップロード
  python3 engine/tools/publish.py works/001-kumo-no-ito link       # 相互リンク: URLを埋めて YouTube 2本の説明文とブログ記事を更新、tiktok.txt を出力
  python3 engine/tools/publish.py works/001-kumo-no-ito retire     # published.json の既存投稿を非公開(YouTube)/下書き(Blogger)にして退避
    順番: blog → youtube → link。URL は works/NNN/published.json に保存される。
    publish.json / ブログ本文のプレースホルダ: {BLOG_URL} {MAIN_URL} {SHORT_URL} {TIKTOK_URL} {MAIN_EMBED_URL}
    （未確定のものは、その行、または <!-- links --> 〜 <!-- /links --> の範囲ごと省いて投稿する）
  python3 engine/tools/publish.py - whoami                         # 認証確認（チャンネル名とブログ名を表示）
  python3 engine/tools/publish.py - pages                          # blog/pages/*.html で固定ページを上書き更新
  python3 engine/tools/publish.py works/NNN-xxx thumb              # build/thumb.png をYouTube本編・ショートのサムネに設定
  python3 engine/tools/publish.py works/NNN-xxx playlist           # シリーズの再生リスト（ドット語り 文庫／記録）に本編・ショートを追加
  python3 engine/tools/publish.py works/NNN-xxx all                # youtube → thumb → blog → link をまとめて実行
    publish.json に "publish_at": "2026-11-09T19:00:00+09:00" があれば予約投稿（YouTubeは非公開アップ＋公開予約、
    Bloggerは予約記事）。"blog": {"slug": "dotgatari-kiroku-001-ed-gein"} で記事URLを英字にできる。

required environment variables (set them as environment secrets, never in the repo):
  GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
  GOOGLE_REFRESH_TOKEN_BLOGGER  (token of the Google account that owns the blog)
  GOOGLE_REFRESH_TOKEN_YOUTUBE  (token of the Google account that owns the channel)
  (GOOGLE_REFRESH_TOKEN is used for both when the two above are not set)
    (OAuth scopes: https://www.googleapis.com/auth/blogger
                   https://www.googleapis.com/auth/youtube.upload
                   https://www.googleapis.com/auth/youtube)
  BLOGGER_BLOG_ID   (default: 6071876282678666099)
"""
import glob, json, os, re, sys, urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BLOG_ID = os.environ.get('BLOGGER_BLOG_ID', '6071876282678666099')
# brand settings live in one place: engine/src/brand.js (const BRAND = {...})
BRAND = dict(re.findall(r"(\w+): '([^']*)'", re.search(r'const BRAND = \{(.*?)\};', open(os.path.join(ROOT, 'engine', 'src', 'brand.js'), encoding='utf-8').read()).group(1)))
PH = re.compile(r'\{(BLOG_URL|MAIN_URL|SHORT_URL|TIKTOK_URL|MAIN_EMBED_URL|CHAPTERS|PLAYLIST_URL)\}')
# each series has its own playlist on the channel (made by the owner; found by exact title)
SERIES_PLAYLIST = {'bunko': 'ドット語り 文庫', 'kiroku': 'ドット語り 記録'}
WORK_DIR = None  # set in __main__; build/chapters.txt (engine/tools/chapters.js) fills {CHAPTERS}


def load_state(work):
    p = os.path.join(work, 'published.json')
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}


def save_state(work, state):
    json.dump(state, open(os.path.join(work, 'published.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def yt_id(url):
    return url.rstrip('/').rsplit('/', 1)[-1].split('?')[0]


def links(state):
    L = {'BLOG_URL': state.get('blog_url'), 'MAIN_URL': state.get('youtube_main'), 'SHORT_URL': state.get('youtube_short'),
         'TIKTOK_URL': state.get('tiktok_url') or 'https://www.tiktok.com/' + BRAND['tiktok']}
    if L['MAIN_URL']: L['MAIN_EMBED_URL'] = 'https://www.youtube.com/embed/' + yt_id(L['MAIN_URL'])
    if state.get('playlist_id'): L['PLAYLIST_URL'] = 'https://www.youtube.com/playlist?list=' + state['playlist_id']
    cp = os.path.join(WORK_DIR or '', 'build', 'chapters.txt')
    if WORK_DIR and os.path.exists(cp): L['CHAPTERS'] = open(cp, encoding='utf-8').read().strip()
    return {k: v for k, v in L.items() if v}


def fill(text, L):
    """replace placeholders; drop <!-- links --> blocks / lines whose placeholders are not known yet"""
    known = lambda chunk: all(m in L for m in PH.findall(chunk))
    text = re.sub(r'<!-- links -->\n?(.*?)<!-- /links -->\n?', lambda m: m.group(1) if known(m.group(1)) else '', text, flags=re.S)
    text = '\n'.join(l for l in text.split('\n') if known(l))
    return PH.sub(lambda m: L[m.group(1)], text)


def env(name):
    """read a credential, tolerating stray quotes / spaces / line breaks from copy-paste"""
    v = os.environ.get(name, '')
    v = v.strip().strip('"').strip("'").strip()
    return ''.join(v.split())


def describe(name, v, prefix=None, suffix=None):
    raw = os.environ.get(name, '')
    notes = []
    if raw != v: notes.append('貼り付け時の空白/引用符/改行を除去')
    if prefix and not v.startswith(prefix): notes.append(f'「{prefix}」で始まっていない')
    if suffix and not v.endswith(suffix): notes.append(f'「{suffix}」で終わっていない')
    shown = (v[:6] + '…' + v[-4:]) if len(v) > 12 else '(短すぎ)'
    return f'  {name}: 長さ{len(v)} {shown} ' + ('⚠ ' + ' / '.join(notes) if notes else 'OK')


def token(service):
    name = 'GOOGLE_REFRESH_TOKEN_' + service.upper()
    if not env(name): name = 'GOOGLE_REFRESH_TOKEN'
    cid, sec, rt = env('GOOGLE_CLIENT_ID'), env('GOOGLE_CLIENT_SECRET'), env(name)
    data = urllib.parse.urlencode({'client_id': cid, 'client_secret': sec, 'refresh_token': rt, 'grant_type': 'refresh_token'}).encode()
    try:
        with urllib.request.urlopen('https://oauth2.googleapis.com/token', data) as r:
            return json.load(r)['access_token']
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors='replace')
        print(f'[{service}] トークン取得に失敗: HTTP {e.code} {body}', file=sys.stderr)
        print(describe('GOOGLE_CLIENT_ID', cid, suffix='.apps.googleusercontent.com'), file=sys.stderr)
        print(describe('GOOGLE_CLIENT_SECRET', sec, prefix='GOCSPX-'), file=sys.stderr)
        print(describe(name, rt, prefix='1//'), file=sys.stderr)
        if 'invalid_client' in body:
            print('  → IDとシークレットの組み合わせが合っていません（別クライアントの値、または無効化されたシークレット）。', file=sys.stderr)
        elif 'invalid_grant' in body:
            print('  → トークンが無効です（期限切れ・取り消し・別クライアントで発行）。Playgroundで取り直してください。', file=sys.stderr)
        sys.exit(1)


def call(method, url, tok, body=None, headers=None, raw=None):
    h = {'Authorization': 'Bearer ' + tok}
    if headers: h.update(headers)
    data = raw
    if body is not None:
        data = json.dumps(body).encode(); h['Content-Type'] = 'application/json; charset=UTF-8'
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    with urllib.request.urlopen(req) as r:
        txt = r.read()
        return (json.loads(txt) if txt else {}), r.headers


def whoami(_):
    ch, _ = call('GET', 'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', token('youtube'))
    print('YouTube:', [i['snippet']['title'] for i in ch.get('items', [])])
    bl, _ = call('GET', f'https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}', token('blogger'))
    print('Blogger:', bl.get('name'), bl.get('url'))


def css_ascii(css):
    """Blogger re-escapes symbols such as ▶ into &#9654; inside <style> when it renders a post,
    so every non-ASCII character in embedded CSS is written as a CSS escape (\\25b6 ) instead."""
    return re.sub(r'[^\x00-\x7f]', lambda m: '\\%x ' % ord(m.group()), css)


def theme_inline(content):
    """wrap a post/page body in <div class="dt-wrap"> and append blog/inline.css + the DotGothic16 font.
    The Blogger API cannot change the blog theme, so only the body is styled (the header, menu and
    home page stay with the theme, so post pages and the home page look the same).
    The CSS goes at the end so that list snippets / search descriptions start with the real text."""
    p = os.path.join(ROOT, 'blog', 'inline.css')
    if not os.path.exists(p): return content
    css = css_ascii(open(p, encoding='utf-8').read().strip())
    return ('<div class="dt-wrap">\n' + content.strip() + '\n</div>\n'
            "<link href='https://fonts.googleapis.com/css2?family=DotGothic16&amp;display=swap' rel='stylesheet'/>\n"
            '<style>' + css + '</style>\n')


SHORT_DELAY_H = 0  # 2026-11-09: main and Short go out together at 18:00 (the related-video link is set right after publishing, outside this script)


def publish_at(work, kind='main'):
    """publish.json "publish_at" (e.g. "2026-11-09T19:00:00+09:00") if it is still in the future, else None.
    The Short goes out SHORT_DELAY_H hours after the main video (or at "short_publish_at"), so the owner can set
    its related video to the main video in YouTube Studio before the Short is public."""
    import datetime
    pj = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))
    v = pj.get('publish_at')
    if not v: return None
    if kind == 'short':
        if pj.get('short_publish_at'): v = pj['short_publish_at']
        else: v = (datetime.datetime.fromisoformat(v) + datetime.timedelta(hours=SHORT_DELAY_H)).isoformat()
    d = datetime.datetime.fromisoformat(v)
    return d if d > datetime.datetime.now(datetime.timezone.utc) else None


def blog(work, tok):
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))['blog']
    state = load_state(work)
    content = theme_inline(fill(re.sub(r'<!--\s*(labels|title):.*?-->\n?', '', open(os.path.join(ROOT, pub['content_file']), encoding='utf-8').read()), links(state)))
    body = {'kind': 'blogger#post', 'title': pub['title'], 'content': content, 'labels': pub['labels']}
    base = f'https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts'
    if not state.get('blog_post_id'):
        # Blogger makes the URL from the title at first publish, so publish under an ASCII "slug" title first
        when = publish_at(work)
        first = dict(body, title=pub.get('slug') or pub['title'])
        res, _ = call('POST', base + '/?isDraft=true', tok, first)
        q = '?publishDate=' + urllib.parse.quote(when.isoformat()) if when else ''
        res, _ = call('POST', f"{base}/{res['id']}/publish{q}", tok)
        state['blog_post_id'] = res['id']
        if when: print('blog scheduled:', when.isoformat())
    res, _ = call('PUT', f"{base}/{state['blog_post_id']}", tok, body)
    state['blog_post_id'], state['blog_url'] = res['id'], res['url']
    save_state(work, state)
    print('blog:', res['url'])


def pages(tok):
    """overwrite Blogger static pages from blog/pages/*.html (header comments: page_id, title)"""
    import glob, re
    for path in sorted(glob.glob(os.path.join(ROOT, 'blog', 'pages', '*.html'))):
        src = open(path, encoding='utf-8').read()
        meta = dict(re.findall(r'<!--\s*(page_id|title):\s*(.*?)\s*-->', src))
        content = theme_inline(re.sub(r'<!--\s*(page_id|title):.*?-->\n?', '', src))
        res, _ = call('PATCH', f"https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/pages/{meta['page_id']}", tok,
                      {'title': meta['title'], 'content': content})
        print('page:', res['title'], res['url'])


def youtube(work, tok):
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))['youtube']
    state = load_state(work)
    for v in pub:
        key = 'youtube_' + v['kind']
        if state.get(key):
            print('skip (already uploaded):', v['kind'], state[key]); continue
        path = os.path.join(work, v['video'])
        meta = {'snippet': {'title': v['title'], 'description': fill(v['description'], links(state)), 'tags': v['tags'], 'categoryId': '1', 'defaultLanguage': 'ja', 'defaultAudioLanguage': 'ja'},
                'status': {'privacyStatus': 'public', 'selfDeclaredMadeForKids': False, 'embeddable': True}}
        when = publish_at(work, v['kind'])
        if when:  # scheduled: upload as private, YouTube makes it public at publishAt
            import datetime
            meta['status'].update(privacyStatus='private', publishAt=when.astimezone(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'))
        size = os.path.getsize(path)
        _, hd = call('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', tok, meta,
                     {'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(size)})
        res, _ = call('PUT', hd['Location'], tok, raw=open(path, 'rb').read(), headers={'Content-Type': 'video/mp4'})
        state[key] = 'https://youtu.be/' + res['id']
        save_state(work, state)
        print('youtube', v['kind'], state[key], 'privacy:', res.get('status', {}).get('privacyStatus'), res.get('status', {}).get('publishAt') or '')


def tiktok_txt(work, pub, L):
    tk = pub.get('tiktok')
    if not tk: return None
    txt = fill(tk['caption'], L) + '\n\n' + ' '.join('#' + h for h in tk['hashtags']) + '\n'
    p = os.path.join(work, 'tiktok.txt')
    open(p, 'w', encoding='utf-8').write(txt)
    return p


def series_playlist(work, tok):
    """id of this work's series playlist (「ドット語り 文庫」/「ドット語り 記録」), or None if the owner has not made it yet"""
    series = json.load(open(os.path.join(work, 'lines.json'), encoding='utf-8'))['work']['series']
    title, pt = SERIES_PLAYLIST[series], ''
    while True:
        r, _ = call('GET', 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50' + (f'&pageToken={pt}' if pt else ''), tok)
        for p in r.get('items', []):
            if p['snippet']['title'].strip() == title: return p['id']
        pt = r.get('nextPageToken')
        if not pt: return None


def playlist(work, tok=None):
    """add the main video and the Short to the series playlist (skips ones already in it); remember the playlist id"""
    tok = tok or token('youtube'); state = load_state(work); pid = series_playlist(work, tok)
    if not pid: print('playlist: シリーズの再生リストがまだありません（' + '／'.join(SERIES_PLAYLIST.values()) + '）。作られたら publish.py <work> playlist を実行'); return None
    have, pt = set(), ''
    while True:
        r, _ = call('GET', f'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId={pid}' + (f'&pageToken={pt}' if pt else ''), tok)
        have |= {i['contentDetails']['videoId'] for i in r.get('items', [])}; pt = r.get('nextPageToken')
        if not pt: break
    for k in ('youtube_main', 'youtube_short'):
        if not state.get(k): continue
        vid = yt_id(state[k])
        if vid in have: print('playlist: already in', k, vid); continue
        call('POST', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', tok, {'snippet': {'playlistId': pid, 'resourceId': {'kind': 'youtube#video', 'videoId': vid}}})
        print('playlist: added', k, vid)
    if state.get('playlist_id') != pid: state['playlist_id'] = pid; save_state(work, state)
    return pid


def link(work):
    """after blog + youtube: fill every placeholder and update both YouTube descriptions and the blog post"""
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))
    state = load_state(work)
    if not state.get('playlist_id'):  # the series playlist link goes into the description once the playlist exists
        pid = series_playlist(work, token('youtube'))
        if pid: state['playlist_id'] = pid; save_state(work, state)
    L = links(state)
    miss = [k for k in ('BLOG_URL', 'MAIN_URL', 'SHORT_URL') if k not in L]
    if miss: sys.exit('まだURLがそろっていません: ' + ', '.join(miss) + '（blog → youtube の順に先に実行してください）')
    tok = token('youtube')
    for v in pub['youtube']:
        vid = yt_id(state['youtube_' + v['kind']])
        sn = {'title': v['title'], 'description': fill(v['description'], L), 'tags': v['tags'], 'categoryId': '1', 'defaultLanguage': 'ja', 'defaultAudioLanguage': 'ja'}
        res, _ = call('PUT', 'https://www.googleapis.com/youtube/v3/videos?part=snippet', tok, {'id': vid, 'snippet': sn})
        print('youtube', v['kind'], 'description updated:', res['id'])
    blog(work, token('blogger'))
    p = tiktok_txt(work, pub, L)
    if p: print('tiktok:', p)


def retire(work):
    """set already-published items to private (YouTube) / draft (Blogger) and move them to state['retired']"""
    state = load_state(work); old = {k: state.pop(k) for k in ('blog_post_id', 'blog_url', 'youtube_main', 'youtube_short') if k in state}
    if not old: print('nothing to retire'); return
    if 'blog_post_id' in old:
        call('POST', f"https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/{old['blog_post_id']}/revert", token('blogger'))
        print('blog → draft:', old.get('blog_url'))
    tok = None
    for k in ('youtube_main', 'youtube_short'):
        if k in old:
            tok = tok or token('youtube')
            res, _ = call('PUT', 'https://www.googleapis.com/youtube/v3/videos?part=status', tok,
                          {'id': yt_id(old[k]), 'status': {'privacyStatus': 'private', 'selfDeclaredMadeForKids': False, 'embeddable': True}})
            print(k, '→', res['status']['privacyStatus'] + ':', old[k])
    state.setdefault('retired', []).append(old)
    save_state(work, state)


def thumb(work, tok):
    """set <work>/build/thumb.png (engine/tools/thumb.js) as the thumbnail of the uploaded videos"""
    state, path = load_state(work), os.path.join(work, 'build', 'thumb.png')
    if not os.path.exists(path): sys.exit('サムネ画像がありません: node engine/tools/thumb.js ' + os.path.relpath(work, ROOT))
    imgs = {'youtube_main': open(path, 'rb').read()}
    tall = path.replace('.png', '_tall.png')  # the Short gets the vertical thumbnail (the 16:9 one is cut in the middle)
    imgs['youtube_short'] = open(tall, 'rb').read() if os.path.exists(tall) else imgs['youtube_main']
    for k in ('youtube_main', 'youtube_short'):
        if not state.get(k): continue
        img = imgs[k]
        try:
            call('POST', 'https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=' + yt_id(state[k]), tok, raw=img, headers={'Content-Type': 'image/png'})
            print('thumbnail set:', k, state[k])
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors='replace')
            print(f'thumbnail failed: {k} HTTP {e.code} {body[:300]}', file=sys.stderr)
            if e.code == 403: print('  → チャンネルでカスタムサムネイルが有効になっていない可能性があります（電話番号による確認が必要）。', file=sys.stderr)


def audit(tok=None):
    """list every upload on the channel that is scheduled or public but not recorded as current in works/*/published.json
    (e.g. an upload that finished on YouTube while this script was killed before saving its id)"""
    import glob
    tok = tok or token('youtube')
    ch, _ = call('GET', 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true', tok)
    up = ch['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    ids, pt = [], ''
    while True:
        r, _ = call('GET', f'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId={up}' + (f'&pageToken={pt}' if pt else ''), tok)
        ids += [i['contentDetails']['videoId'] for i in r['items']]; pt = r.get('nextPageToken')
        if not pt: break
    current = set()
    for f in glob.glob(os.path.join(ROOT, 'works', '*', 'published.json')):
        st = json.load(open(f, encoding='utf-8'))
        current |= {yt_id(st[k]) for k in ('youtube_main', 'youtube_short') if st.get(k)}
    bad = []
    for i in range(0, len(ids), 50):
        r, _ = call('GET', 'https://www.googleapis.com/youtube/v3/videos?part=status,snippet&id=' + ','.join(ids[i:i + 50]), tok)
        for v in r['items']:
            stt = v['status']
            if v['id'] not in current and (stt['privacyStatus'] == 'public' or stt.get('publishAt')):
                bad.append(v); print('WARN 記録にない公開/予約動画:', v['id'], stt['privacyStatus'], stt.get('publishAt') or '', v['snippet']['title'], file=sys.stderr)
    print('audit: 記録にない公開・予約動画', len(bad), '本')
    return bad


def blogsync():
    """after the blog address changes (Blogger settings): read every post's new URL from the API,
    save it in each work's published.json, then refresh all YouTube descriptions, blog posts, TikTok texts and pages"""
    global WORK_DIR
    tok = token('blogger')
    for st_path in sorted(glob.glob(os.path.join(ROOT, 'works', '*', 'published.json'))):
        work = os.path.dirname(st_path); state = load_state(work)
        if not state.get('blog_post_id'): continue
        res, _ = call('GET', f"https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/{state['blog_post_id']}?view=ADMIN", tok)
        if res.get('url') and res['url'] != state.get('blog_url'):
            print('blog url:', state.get('blog_url'), '->', res['url']); state['blog_url'] = res['url']; save_state(work, state)
        WORK_DIR = work; link(work)
    pages(tok)

if __name__ == '__main__':
    work, what = sys.argv[1], sys.argv[2]
    if work != '-': WORK_DIR = os.path.abspath(work)
    {'whoami': lambda: whoami(None), 'blog': lambda: blog(os.path.abspath(work), token('blogger')),
     'youtube': lambda: youtube(os.path.abspath(work), token('youtube')), 'pages': lambda: pages(token('blogger')),
     'link': lambda: link(os.path.abspath(work)), 'retire': lambda: retire(os.path.abspath(work)),
     'thumb': lambda: thumb(os.path.abspath(work), token('youtube')),
     'all': lambda: (youtube(os.path.abspath(work), token('youtube')), thumb(os.path.abspath(work), token('youtube')), playlist(os.path.abspath(work)),
                     blog(os.path.abspath(work), token('blogger')), link(os.path.abspath(work)), audit()),
     'playlist': lambda: playlist(os.path.abspath(work)),
     'audit': lambda: audit(), 'blogsync': lambda: blogsync()}[what]()
