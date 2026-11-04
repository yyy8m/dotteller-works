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
import json, os, re, sys, urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BLOG_ID = os.environ.get('BLOGGER_BLOG_ID', '6071876282678666099')
# brand settings live in one place: engine/src/brand.js (const BRAND = {...})
BRAND = dict(re.findall(r"(\w+): '([^']*)'", re.search(r'const BRAND = \{(.*?)\};', open(os.path.join(ROOT, 'engine', 'src', 'brand.js'), encoding='utf-8').read()).group(1)))
PH = re.compile(r'\{(BLOG_URL|MAIN_URL|SHORT_URL|TIKTOK_URL|MAIN_EMBED_URL)\}')


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


def blog(work, tok):
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))['blog']
    state = load_state(work)
    content = fill(re.sub(r'<!--\s*(labels|title):.*?-->\n?', '', open(os.path.join(ROOT, pub['content_file']), encoding='utf-8').read()), links(state))
    body = {'kind': 'blogger#post', 'title': pub['title'], 'content': content, 'labels': pub['labels']}
    if state.get('blog_post_id'):
        res, _ = call('PUT', f"https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/{state['blog_post_id']}", tok, body)
    else:
        res, _ = call('POST', f'https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/', tok, body)
    state['blog_post_id'], state['blog_url'] = res['id'], res['url']
    save_state(work, state)
    print('blog:', res['url'])


def pages(tok):
    """overwrite Blogger static pages from blog/pages/*.html (header comments: page_id, title)"""
    import glob, re
    for path in sorted(glob.glob(os.path.join(ROOT, 'blog', 'pages', '*.html'))):
        src = open(path, encoding='utf-8').read()
        meta = dict(re.findall(r'<!--\s*(page_id|title):\s*(.*?)\s*-->', src))
        content = re.sub(r'<!--\s*(page_id|title):.*?-->\n?', '', src).strip()
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
        size = os.path.getsize(path)
        _, hd = call('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', tok, meta,
                     {'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(size)})
        res, _ = call('PUT', hd['Location'], tok, raw=open(path, 'rb').read(), headers={'Content-Type': 'video/mp4'})
        state[key] = 'https://youtu.be/' + res['id']
        save_state(work, state)
        print('youtube', v['kind'], state[key], 'privacy:', res.get('status', {}).get('privacyStatus'))


def tiktok_txt(work, pub, L):
    tk = pub.get('tiktok')
    if not tk: return None
    txt = fill(tk['caption'], L) + '\n\n' + ' '.join('#' + h for h in tk['hashtags']) + '\n'
    p = os.path.join(work, 'tiktok.txt')
    open(p, 'w', encoding='utf-8').write(txt)
    return p


def link(work):
    """after blog + youtube: fill every placeholder and update both YouTube descriptions and the blog post"""
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))
    state = load_state(work); L = links(state)
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


if __name__ == '__main__':
    work, what = sys.argv[1], sys.argv[2]
    {'whoami': lambda: whoami(None), 'blog': lambda: blog(os.path.abspath(work), token('blogger')),
     'youtube': lambda: youtube(os.path.abspath(work), token('youtube')), 'pages': lambda: pages(token('blogger')),
     'link': lambda: link(os.path.abspath(work)), 'retire': lambda: retire(os.path.abspath(work))}[what]()
