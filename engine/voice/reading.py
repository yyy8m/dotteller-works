"""Reading (yomi) check for the narration.

Open JTalk sometimes picks the wrong reading for a kanji word (e.g. 殺人鬼 → サツジン・オニ).
This compares, word by word, the reading Open JTalk will speak with the reading from a second
analyzer (Sudachi, core dictionary) and reports every kanji word where the two disagree.
Confirmed fixes go into engine/voice/reading_fix.json and are applied automatically by gen_voice.py.

usage:
  python3 engine/voice/reading.py works/k001-ed-gein          # report suspicious readings
  python3 engine/voice/reading.py works/k001-ed-gein --all    # list the reading of every kanji word
reading_fix.json:
  {"fix": {"殺人鬼": "サツジンキ"},      # surface → katakana (replaced in the spoken text)
   "ok":  ["灯の神"]}                    # words whose Open JTalk reading is right although Sudachi differs
"""
import json, os, re, sys
import pyopenjtalk

HERE = os.path.dirname(os.path.abspath(__file__))
FIX_PATH = os.path.join(HERE, 'reading_fix.json')
KANJI = re.compile(r'[一-鿿々〆ヶ]')
_tok = None


def load_fix():
    if not os.path.exists(FIX_PATH): return {'fix': {}, 'ok': []}
    d = json.load(open(FIX_PATH, encoding='utf-8'))
    return {'fix': d.get('fix', {}), 'ok': d.get('ok', [])}


def apply_fix(text, fix=None):
    """replace registered words by their katakana reading (longest first)"""
    fix = (fix or load_fix())['fix']
    for k in sorted(fix, key=len, reverse=True): text = text.replace(k, fix[k])
    return text


def _sudachi():
    global _tok
    if _tok is None:
        from sudachipy import dictionary, tokenizer
        _tok = (dictionary.Dictionary(dict='core').tokenizer(), tokenizer.Tokenizer.SplitMode.C)
    return _tok


def _norm(kana):
    """compare pronunciations loosely: katakana, long vowels and ei/ou merged"""
    k = re.sub(r'[’\'、。！？…・\s]', '', kana)
    k = ''.join(chr(ord(ch) + 0x60) if 'ぁ' <= ch <= 'ゖ' else ch for ch in k)
    vowel = {}
    for row, v in [('アカサタナハマヤラワガザダバパァャ', 'ア'), ('イキシチニヒミリギジヂビピィ', 'イ'), ('ウクスツヌフムユルグズヅブプゥュッ', 'ウ'),
                   ('エケセテネヘメレゲゼデベペェ', 'エ'), ('オコソトノホモヨロヲゴゾドボポォョ', 'オ')]:
        for ch in row: vowel[ch] = v
    out = []
    for ch in k:
        prev = out[-1] if out else ''
        pv = vowel.get(prev[-1], '') if prev else ''
        if ch == 'ー' and pv: ch = pv
        if (ch == 'イ' and pv == 'エ') or (ch == 'ウ' and pv == 'オ'): ch = pv
        out.append(ch)
    s = ''.join(out)
    for a, b in ['ヅズ', 'ヂジ']: s = s.replace(a, b)
    return s


UNVOICE = dict(zip('ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ', 'カキクケコサシスセソタチツテトハヒフヘホハヒフヘホ'))
NUM = re.compile(r'^[〇一二三四五六七八九十百千万億何]+$')


def same(pron, read):
    """equal, allowing the sound changes of connected speech: rendaku (コヤ→ゴヤ), sokuon (イチ→イッ, ジュウ→ジュッ)"""
    a, b = _norm(pron), _norm(read)
    if a == b: return True
    if a and b and UNVOICE.get(a[0], a[0]) == UNVOICE.get(b[0], b[0]) and a[1:] == b[1:]: return True
    if a.endswith('ッ') and len(a) <= len(b) and b.startswith(a[:-1]): return True
    return False


def spans(text):
    """align Open JTalk words and Sudachi tokens; yield (surface, openjtalk_pron, sudachi_reading) for kanji spans"""
    oj = [(w['string'], w['pron']) for w in pyopenjtalk.run_frontend(text)]
    tk, mode = _sudachi()
    su = [(t.surface(), t.reading_form()) for t in tk.tokenize(text, mode)]
    i = j = 0; a = b = 0  # positions in characters
    cur = ['', '', '']
    while i < len(oj) or j < len(su):
        if a <= b and i < len(oj):
            s, p = oj[i]; cur[0] += s; cur[1] += p; a += len(s); i += 1
        elif j < len(su):
            s, r = su[j]; cur[2] += r; b += len(s); j += 1
        else:
            s, p = oj[i]; cur[0] += s; cur[1] += p; a += len(s); i += 1
        if a == b:
            if KANJI.search(cur[0]): yield cur[0], cur[1], cur[2]
            cur = ['', '', '']


def check_text(text, fx=None):
    fx = fx or load_fix()
    spoken = apply_fix(text, fx)
    bad = []
    for surf, pron, read in spans(spoken):
        if NUM.match(surf): continue  # numbers: the counter that follows decides the reading (十四年 = ジュウヨネン)
        if any(surf in o and o in spoken for o in fx['ok']): continue
        if not same(pron, read): bad.append((surf, pron.replace('’', ''), read))
    return bad


def check_work(work, show_all=False):
    cfg = json.load(open(os.path.join(work, 'lines.json'), encoding='utf-8'))
    fx = load_fix(); n = 0
    for ln in cfg['lines']:
        say = ln.get('say', ln['text'])
        if show_all:
            print(ln['id'], ' '.join(f'{s}={p.replace("’", "")}' for s, p, _ in spans(apply_fix(say, fx))))
            continue
        for surf, pron, read in check_text(say, fx):
            n += 1; print(f'  {ln["id"]}: 「{surf}」 Open JTalk={pron}  辞書={read}')
    if not show_all: print(f'読みの食い違い: {n} か所' + ('（engine/voice/reading_fix.json の fix に正しい読みを、問題なければ ok に追加）' if n else ''))
    return n


if __name__ == '__main__':
    check_work(os.path.abspath(sys.argv[1]), '--all' in sys.argv)
