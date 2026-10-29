"""Bundle the project into single files for hosting where only one page is allowed.

    python3 tools/build.py

Writes dist/:
  index.html                  one self-contained page (CSS and JS inlined)
  artifact.html               the same page without <html>/<head> (for publishing as a Claude artifact)
  assets/audio/index.json     every clip embedded as a data: URL
  assets/images/index.json    every picture embedded as a data: URL
For GitHub Pages you don't need this: the project folder works as it is.
"""
import base64
import json
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), '..')
DIST = os.path.join(ROOT, 'dist')
MIME = {'.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.webp': 'image/webp', '.png': 'image/png'}


def embed(folder):
    index = json.load(open(os.path.join(ROOT, folder, 'index.json')))
    out = {}
    for key, name in index.items():
        data = open(os.path.join(ROOT, folder, name), 'rb').read()
        out[key] = f'data:{MIME[os.path.splitext(name)[1].lower()]};base64,' + base64.b64encode(data).decode()
    os.makedirs(os.path.join(DIST, folder), exist_ok=True)
    json.dump(out, open(os.path.join(DIST, folder, 'index.json'), 'w'), ensure_ascii=False)
    return len(out)


def main():
    html = open(os.path.join(ROOT, 'index.html')).read()
    html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">',
                  lambda m: '<style>\n' + open(os.path.join(ROOT, m.group(1))).read() + '</style>', html)
    html = re.sub(r'<script src="(js/[^"]+)"></script>',
                  lambda m: '<script>\n' + open(os.path.join(ROOT, m.group(1))).read() + '</script>', html)
    os.makedirs(DIST, exist_ok=True)
    open(os.path.join(DIST, 'index.html'), 'w').write(html)
    # artifact: title + head links/styles first, then the body content
    head = re.search(r'<head>(.*)</head>', html, re.S).group(1)
    head = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', '', head)
    body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
    open(os.path.join(DIST, 'artifact.html'), 'w').write(head.strip() + '\n' + body.strip() + '\n')
    a, i = embed('assets/audio'), embed('assets/images')
    print(f'dist/ written: {a} clips, {i} pictures')


if __name__ == '__main__':
    main()
