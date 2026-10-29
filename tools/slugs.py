"""Turn Lithuanian phrases and emoji into safe, readable ASCII file names."""
import re
import unicodedata

LT = str.maketrans({'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i', 'š': 's', 'ų': 'u', 'ū': 'u', 'ž': 'z',
                    'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I', 'Š': 'S', 'Ų': 'U', 'Ū': 'U', 'Ž': 'Z'})
# single letters get a spoken-style name so A and Ą don't collide
LETTER_NAMES = {'Ą': 'a-nosine', 'Č': 'c-su-varnele', 'Ę': 'e-nosine', 'Ė': 'e-su-taskeliu', 'Į': 'i-nosine',
                'Y': 'y-ilgoji', 'Š': 's-su-varnele', 'Ų': 'u-nosine', 'Ū': 'u-ilgoji', 'Ž': 'z-su-varnele'}


def phrase_slug(text):
    if len(text) == 1 and text.isalpha():
        return 'raide-' + LETTER_NAMES.get(text, text.lower())
    s = text.translate(LT).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:60] or 'phrase'


def emoji_slug(ch):
    try:
        import emoji
        name = emoji.demojize(ch, delimiters=('', ''))
    except ImportError:
        name = '-'.join(unicodedata.name(c, '') for c in ch if c not in '️‍')
    s = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return s or '-'.join(f'{ord(c):x}' for c in ch)


def unique(base, taken, ext):
    name, n = f'{base}{ext}', 2
    while name in taken:
        name, n = f'{base}-{n}{ext}', n + 1
    taken.add(name)
    return name
