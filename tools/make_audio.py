"""Create an MP3 for every phrase that doesn't have one yet, using the free espeak-ng Lithuanian voice.

Files that already exist are never overwritten, so your own recordings are safe.
Run from the project folder:

    pip install espeakng-loader lameenc
    node tools/collect-phrases.js > tools/phrases.json
    python3 tools/make_audio.py            # add missing clips
    python3 tools/make_audio.py --force    # regenerate every robot clip (keeps files listed in assets/audio/recorded.txt)
"""
import array
import ctypes
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from slugs import phrase_slug, unique  # noqa: E402

ROOT = os.path.join(os.path.dirname(__file__), '..')
AUDIO = os.path.join(ROOT, 'assets', 'audio')
INDEX = os.path.join(AUDIO, 'index.json')
RECORDED = os.path.join(AUDIO, 'recorded.txt')   # one file name per line: clips you recorded yourself


def synth():
    import espeakng_loader as E
    import lameenc
    lib = ctypes.CDLL(E.get_library_path())
    rate = lib.espeak_Initialize(2, 0, E.get_data_path().encode(), 0)
    buf = array.array('h')
    cb_type = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)

    @cb_type
    def cb(wav, n, _events):
        if n > 0:
            buf.extend(wav[:n])
        return 0
    lib.espeak_SetSynthCallback(cb)
    assert lib.espeak_SetVoiceByName(b'lt') == 0, 'Lithuanian voice not found'
    lib.espeak_SetParameter(1, 125, 0)   # speed, words per minute (slow for children)
    lib.espeak_SetParameter(3, 55, 0)    # pitch

    def say(text):
        del buf[:]
        t = text.encode('utf-8') + b'\0'
        lib.espeak_Synth(t, len(t), 0, 0, 0, 1, None, None)
        lib.espeak_Synchronize()
        enc = lameenc.Encoder()
        enc.set_bit_rate(40); enc.set_in_sample_rate(rate); enc.set_channels(1); enc.set_quality(2)
        return enc.encode(buf.tobytes()) + enc.flush()
    say.keep_alive = cb
    return say


def main():
    force = '--force' in sys.argv
    phrases = json.load(open(os.path.join(os.path.dirname(__file__), 'phrases.json')))
    index = json.load(open(INDEX)) if os.path.exists(INDEX) else {}
    recorded = set(open(RECORDED).read().split()) if os.path.exists(RECORDED) else set()
    taken = set(index.values())
    say = None
    made = 0
    for p in phrases:
        if p not in index:
            index[p] = unique(phrase_slug(p), taken, '.mp3')
        path = os.path.join(AUDIO, index[p])
        if os.path.exists(path) and (not force or index[p] in recorded):
            continue
        say = say or synth()
        open(path, 'wb').write(say(p))
        made += 1
    json.dump(index, open(INDEX, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'{len(index)} phrases, {made} clips created')


if __name__ == '__main__':
    main()
