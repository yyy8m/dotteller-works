"""Publish a DOT TELLER work to Blogger and YouTube (standard library only).

usage:
  python3 engine/tools/publish.py works/001-kumo-no-ito blog       # Blogger に記事を投稿
  python3 engine/tools/publish.py works/001-kumo-no-ito youtube    # YouTube に本編/ショートをアップロード
  python3 engine/tools/publish.py - whoami                         # 認証確認（チャンネル名とブログ名を表示）

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
import json, os, sys, urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BLOG_ID = os.environ.get('BLOGGER_BLOG_ID', '6071876282678666099')


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
    content = open(os.path.join(ROOT, pub['content_file']), encoding='utf-8').read()
    state_p = os.path.join(work, 'published.json')
    state = json.load(open(state_p)) if os.path.exists(state_p) else {}
    body = {'kind': 'blogger#post', 'title': pub['title'], 'content': content, 'labels': pub['labels']}
    if state.get('blog_post_id'):
        res, _ = call('PUT', f"https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/{state['blog_post_id']}", tok, body)
    else:
        res, _ = call('POST', f'https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/', tok, body)
    state['blog_post_id'], state['blog_url'] = res['id'], res['url']
    json.dump(state, open(state_p, 'w'), ensure_ascii=False, indent=1)
    print('blog:', res['url'])


def youtube(work, tok):
    pub = json.load(open(os.path.join(work, 'publish.json'), encoding='utf-8'))['youtube']
    state_p = os.path.join(work, 'published.json')
    state = json.load(open(state_p)) if os.path.exists(state_p) else {}
    for v in pub:
        key = 'youtube_' + v['kind']
        if state.get(key):
            print('skip (already uploaded):', v['kind'], state[key]); continue
        path = os.path.join(work, v['video'])
        meta = {'snippet': {'title': v['title'], 'description': v['description'], 'tags': v['tags'], 'categoryId': '1', 'defaultLanguage': 'ja', 'defaultAudioLanguage': 'ja'},
                'status': {'privacyStatus': 'public', 'selfDeclaredMadeForKids': False, 'embeddable': True}}
        size = os.path.getsize(path)
        _, hd = call('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', tok, meta,
                     {'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(size)})
        res, _ = call('PUT', hd['Location'], tok, raw=open(path, 'rb').read(), headers={'Content-Type': 'video/mp4'})
        state[key] = 'https://youtu.be/' + res['id']
        json.dump(state, open(state_p, 'w'), ensure_ascii=False, indent=1)
        print('youtube', v['kind'], state[key], 'privacy:', res.get('status', {}).get('privacyStatus'))


if __name__ == '__main__':
    work, what = sys.argv[1], sys.argv[2]
    {'whoami': lambda: whoami(None), 'blog': lambda: blog(os.path.abspath(work), token('blogger')),
     'youtube': lambda: youtube(os.path.abspath(work), token('youtube'))}[what]()
