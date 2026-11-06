"""Generate the dialogue voices for the 蜘蛛の糸 ADV.

Voices: HTS voice "mei" (Nagoya Institute of Technology, CC BY 3.0) for the spider,
        "nitech_jp_atr503_m001" (NIT, Modified BSD) for Buddha / Kandata.
Timbre is varied by (a) pitch shift / speed in HTS Engine, (b) the all-pass
constant ALPHA written into a copy of the voice header (formant warp), and
(c) light DSP post-processing (EQ, drive, reverb).
Segment boundaries (end of each pause) are measured exactly by synthesising
label prefixes: HTS state durations are predicted per label, so the prefix
length equals the boundary time in the full utterance.
"""
import json, os, subprocess, sys, base64
import numpy as np
import pyopenjtalk
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import reading  # yomi fixes (reading_fix.json) + Open JTalk vs Sudachi check
from pyopenjtalk.htsengine import HTSEngine

HERE = os.path.dirname(os.path.abspath(__file__))
VOICES = os.path.join(HERE, 'htsvoice')
SR_OUT = 24000

def voice_copy(src, alpha, name, out):
    data = open(os.path.join(VOICES, src), 'rb').read()
    a = b'ALPHA=0.55'
    assert data.count(a) == 1
    new = ('ALPHA=%.2f' % alpha).encode()
    assert len(new) == len(a)
    p = os.path.join(out, name)
    open(p, 'wb').write(data.replace(a, new))
    return p

# ドット語り voice cast: name -> (voice file, alpha (formant warp), half_tone, speed)
FIX = reading.load_fix()

SPEAKERS = {
    'narrator': ('nitech_jp_atr503_m001.htsvoice', 0.55, 2.0, 0.95),    # 記録の神 (青空文庫シリーズの語り部): やさしいおじいさん, 約142Hz
    'lamp':     ('nitech_jp_atr503_m001.htsvoice', 0.50, -2.0, 0.93),   # 灯の神 (Wikipediaシリーズの語り部)
    'spider':   ('mei_happy.htsvoice', 0.53, 3.0, 1.02),
    'buddha':   ('nitech_jp_atr503_m001.htsvoice', 0.58, -4.5, 0.80),
    'buddha_sad': ('nitech_jp_atr503_m001.htsvoice', 0.58, -5.0, 0.76),
    'kandata':  ('nitech_jp_atr503_m001.htsvoice', 0.53, 1.5, 1.22),
}

PUNCT = '、。！？…'


def split_segments(text):
    """Split display text into segments ending at punctuation runs (one per pau)."""
    segs, cur, i = [], '', 0
    while i < len(text):
        cur += text[i]
        if text[i] in PUNCT:
            while i + 1 < len(text) and text[i + 1] in PUNCT:
                i += 1
                cur += text[i]
            segs.append(cur)
            cur = ''
        i += 1
    if cur:
        segs.append(cur)
    return segs


def biquad(x, b, a):
    y = np.zeros_like(x)
    x1 = x2 = y1 = y2 = 0.0
    b0, b1, b2 = b
    a1, a2 = a
    for n in range(len(x)):
        xn = x[n]
        yn = b0 * xn + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1, y2, y1 = x1, xn, y1, yn
        y[n] = yn
    return y


def peaking(sr, f0, gain_db, q):
    A = 10 ** (gain_db / 40)
    w = 2 * np.pi * f0 / sr
    al = np.sin(w) / (2 * q)
    b = [1 + al * A, -2 * np.cos(w), 1 - al * A]
    a = [1 + al / A, -2 * np.cos(w), 1 - al / A]
    return [v / a[0] for v in b], [a[1] / a[0], a[2] / a[0]]


def fir_lowpass(x, sr, fc):
    n = 63
    t = np.arange(n) - (n - 1) / 2
    h = np.sinc(2 * fc / sr * t) * np.hamming(n)
    h /= h.sum()
    return np.convolve(x, h, mode='same')


def reverb(x, sr, t60=1.6, mix=0.18, seed=1):
    rng = np.random.default_rng(seed)
    n = int(sr * t60)
    env = np.exp(-6.9 * np.arange(n) / n)
    ir = rng.standard_normal(n) * env
    ir = fir_lowpass(ir, sr, 3500)
    ir[: int(0.012 * sr)] = 0
    ir /= np.sqrt((ir ** 2).sum())
    wet = np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir, len(x) + n))[: len(x) + n]
    out = np.concatenate([x, np.zeros(n)])
    return out * (1 - mix) + wet * mix * 1.0


FX = {}  # speaker -> preset for voices added by a work's lines.json


def fx_preset(kind, x, sr):
    if kind == 'rough':  # gravelly, close
        rng = np.random.default_rng(11); n = len(x); xs = np.arange(0, n + 480, 480)
        x = x * np.interp(np.arange(n), xs, rng.uniform(0.85, 1.0, len(xs)))
        g = 2.6; x = np.tanh(x * g / max(1e-6, np.abs(x).max())) / np.tanh(g)
        b, a = peaking(sr, 1400, 3.0, 1.0); x = biquad(x, b, a)
    elif kind == 'cold':  # quiet, dark, a little room
        b, a = peaking(sr, 150, 3.0, 0.8); x = biquad(x, b, a)
        b, a = peaking(sr, 4500, -5.0, 0.7); x = biquad(x, b, a)
        x = reverb(x, sr, 0.9, 0.16, seed=5)
    elif kind == 'stern':  # hard, echoing (preacher / judge)
        b, a = peaking(sr, 2500, 3.0, 1.0); x = biquad(x, b, a)
        x = reverb(x, sr, 1.6, 0.24, seed=9)
    elif kind == 'radio':  # old recording / police radio
        b, a = peaking(sr, 200, -9.0, 0.7); x = biquad(x, b, a)
        b, a = peaking(sr, 1800, 6.0, 1.2); x = biquad(x, b, a)
        b, a = peaking(sr, 5000, -9.0, 0.7); x = biquad(x, b, a)
        x = np.tanh(x * 2.0) / np.tanh(2.0)
    else:  # plain
        b, a = peaking(sr, 3000, 1.5, 1.0); x = biquad(x, b, a)
    return np.concatenate([x, np.zeros(int(0.2 * sr))])


def post(spk, x, sr):
    x = x / 32768.0
    if spk in FX:
        return fx_preset(FX[spk], x, sr)
    if spk == 'narrator':
        b, a = peaking(sr, 250, 3.0, 0.8)
        x = biquad(x, b, a)
        b, a = peaking(sr, 3000, 2.0, 1.0)
        x = biquad(x, b, a)
        d = int(0.11 * sr)  # faint echo, like a voice from a scroll
        x = np.concatenate([x, np.zeros(d + int(0.3 * sr))])
        x[d:] += x[:-d] * 0.16
    elif spk == 'lamp':
        b, a = peaking(sr, 120, 4.0, 0.8)
        x = biquad(x, b, a)
        b, a = peaking(sr, 5000, -6.0, 0.7)
        x = biquad(x, b, a)
        x = reverb(x, sr, 1.2, 0.2, seed=3)
    elif spk == 'spider':
        b, a = peaking(sr, 3200, 3.5, 0.9)
        x = biquad(x, b, a)
        x = np.concatenate([x, np.zeros(int(0.25 * sr))])
    elif spk.startswith('buddha'):
        b, a = peaking(sr, 180, 4.0, 0.8)
        x = biquad(x, b, a)
        b, a = peaking(sr, 4500, -4.0, 0.7)
        x = biquad(x, b, a)
        x = reverb(x, sr, 1.8, 0.22)
    elif spk == 'kandata':
        # rough voice: drive + slight jitter AM + presence boost
        rng = np.random.default_rng(7)
        n = len(x)
        xs = np.arange(0, n + 480, 480)
        jit = np.interp(np.arange(n), xs, rng.uniform(0.82, 1.0, len(xs)))
        x = x * jit
        g = 3.2
        x = np.tanh(x * g / max(1e-6, np.abs(x).max())) / np.tanh(g)
        b, a = peaking(sr, 1400, 4.0, 1.0)
        x = biquad(x, b, a)
        b, a = peaking(sr, 120, -3.0, 0.8)
        x = biquad(x, b, a)
        x = np.concatenate([x, np.zeros(int(0.2 * sr))])
    x = x / max(1e-6, np.abs(x).max()) * 0.89
    return x


def synth(engine, labels, half, speed):
    engine.set_speed(speed)
    engine.add_half_tone(half)
    return engine.synthesize(labels)


def main():
    work = os.path.abspath(sys.argv[1])
    cfg = json.load(open(os.path.join(work, 'lines.json'), encoding='utf-8'))
    OUT = os.path.join(work, 'build', 'voice')
    os.makedirs(OUT, exist_ok=True)
    EXTRA_PAUSE = {k: {int(i): v for i, v in d.items()} for k, d in cfg.get('extra_pause', {}).items()}
    meta = {}
    engines = {}
    # per-work cast: "speakers": {"gein": {"voice": "nitech_jp_atr503_m001.htsvoice", "alpha": 0.52, "half": -3, "speed": 0.92, "fx": "rough"}}
    for name, v in cfg.get('speakers', {}).items():
        SPEAKERS[name] = (v.get('voice', 'nitech_jp_atr503_m001.htsvoice'), v.get('alpha', 0.55), v.get('half', 0.0), v.get('speed', 1.0))
        FX[name] = v.get('fx', 'plain')
    used = sorted(set(l['speaker'] for l in cfg['lines']))
    for spk in used:
        src, alpha, half, speed = SPEAKERS[spk]
        p = voice_copy(src, alpha, spk + '.htsvoice', OUT)
        engines[spk] = HTSEngine(p.encode())
    for ln in cfg['lines']:
        lid, spk, text = ln['id'], ln['speaker'], ln['text']
        say = reading.apply_fix(ln.get('say', text), FIX)
        for surf, pron, read in reading.check_text(ln.get('say', text), FIX):
            print(f'WARN reading {lid}: 「{surf}」 Open JTalk={pron} / 辞書={read}  (engine/voice/reading_fix.json)', file=sys.stderr)
        src, alpha, half, speed = SPEAKERS[spk]
        eng = engines[spk]
        sr = eng.get_sampling_frequency()
        labels = pyopenjtalk.extract_fullcontext(say)
        full = synth(eng, labels, half, speed)
        phon = [l.split('-')[1].split('+')[0] for l in labels]
        bounds = []  # end of each pau
        for i, p in enumerate(phon):
            if p == 'pau':
                pre0 = synth(eng, labels[: i], half, speed)
                pre = synth(eng, labels[: i + 1], half, speed)
                bounds.append((len(pre0) / sr, len(pre) / sr))
        segs = split_segments(text)
        if len(split_segments(say)) != len(segs):
            print('WARN display/say segment count differs', lid, file=sys.stderr)
        # final segment ends at end of speech (before trailing sil)
        tail = synth(eng, labels[:-1], half, speed)
        speech_end = len(tail) / sr
        lead = synth(eng, labels[:1], half, speed)
        speech_start = len(lead) / sr
        if len(bounds) != len(segs) - 1:
            print('WARN segment mismatch', lid, len(bounds), segs, file=sys.stderr)
        for pi, extra in EXTRA_PAUSE.get(lid, {}).items():
            a, b = bounds[pi]
            mid = int((a + b) / 2 * sr)
            full = np.concatenate([full[:mid], np.zeros(int(extra * sr)), full[mid:]])
            bounds = [(u, v + extra) if j == pi else ((u + extra, v + extra) if j > pi else (u, v)) for j, (u, v) in enumerate(bounds)]
            speech_end += extra
        y = post(spk, full, sr)
        wav = os.path.join(OUT, lid + '.wav')
        import wave
        yi = (np.clip(y, -1, 1) * 32767).astype('<i2')
        with wave.open(wav, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(yi.tobytes())
        mp3 = os.path.join(OUT, lid + '.mp3')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-ar', str(SR_OUT), '-ac', '1',
                        '-codec:a', 'libmp3lame', '-b:a', '48k', mp3], check=True)
        dur = len(y) / sr
        meta[lid] = dict(speaker=spk.replace('_sad', ''), text=text, segs=segs,
                         start=round(speech_start, 3), bounds=[[round(a, 3), round(b, 3)] for a, b in bounds],
                         end=round(speech_end, 3), dur=round(dur, 3))
        print(lid, spk, 'dur=%.2f' % dur, 'speech %.2f-%.2f' % (speech_start, speech_end), bounds, segs)
    json.dump(meta, open(os.path.join(OUT, 'meta.json'), 'w'), ensure_ascii=False, indent=1)
    import base64
    for k in meta:
        meta[k]['b64'] = base64.b64encode(open(os.path.join(OUT, k + '.mp3'), 'rb').read()).decode()
    open(os.path.join(work, 'build', 'voices.js'), 'w', encoding='utf-8').write('const VOICE_DATA=' + json.dumps(meta, ensure_ascii=False) + ';\n')


if __name__ == '__main__':
    main()
