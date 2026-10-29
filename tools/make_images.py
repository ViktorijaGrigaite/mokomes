"""Copy the 3D picture for every emoji used in the app into assets/images/.

The pictures are Microsoft Fluent Emoji 3D (MIT licence), taken from the npm package
@lobehub/fluent-emoji-3d. Run from the project folder:

    npm pack @lobehub/fluent-emoji-3d && tar xzf lobehub-fluent-emoji-3d-*.tgz
    pip install emoji
    python3 tools/make_images.py package/assets
"""
import glob
import json
import os
import shutil
import sys

import emoji

sys.path.insert(0, os.path.dirname(__file__))
from slugs import emoji_slug, unique  # noqa: E402

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(ROOT, 'assets', 'images')


def main(src):
    text = open(os.path.join(ROOT, 'index.html')).read()
    for f in glob.glob(os.path.join(ROOT, 'js', '**', '*.js'), recursive=True):
        text += open(f).read()
    used = sorted({e['emoji'] for e in emoji.emoji_list(text)})
    have = set(os.listdir(src))
    index_path = os.path.join(OUT, 'index.json')
    index = json.load(open(index_path)) if os.path.exists(index_path) else {}
    taken = set(index.values())
    missing = []
    for e in used:
        if e in index and os.path.exists(os.path.join(OUT, index[e])):
            continue
        cps = [f'{ord(c):x}' for c in e]
        cands = ['-'.join(cps), '-'.join(c for c in cps if c != 'fe0f')] + ([cps[0] + '-fe0f'] if len(cps) == 1 else [])
        found = next((c + '.webp' for c in cands if c + '.webp' in have), None)
        if not found:
            missing.append(e)
            continue
        index[e] = unique(emoji_slug(e), taken, '.webp')
        shutil.copy(os.path.join(src, found), os.path.join(OUT, index[e]))
    json.dump(index, open(index_path, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'{len(index)} pictures; no 3D picture for: {" ".join(missing) or "none"}')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'package/assets')
