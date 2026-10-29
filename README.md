# Mokausi lietuviškai

Lithuanian learning games for young children (made for a 6-year-old). 36 games with pictures and sound, player profiles, stars, a sticker book and a parent page. It runs in any web browser and needs no server code.

## Run it on your computer

The page loads its sounds and pictures with `fetch`, so open it through a small local web server rather than by double-clicking `index.html`:

```bash
cd mokausi-lietuviskai
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Project structure

```
index.html              page shell: header, styles and scripts in load order
css/
  01-base.css           layout, tokens, tiles, buttons, the first games
  02-games.css          balloons, feeding, hide-and-seek, painting, letters, stickers
  03-theme.css          the blue-band theme (overrides earlier layers)
  04-games-more.css     later games and the parent page
  05-illustrations.css  sizing for the 3D pictures
js/
  data/                 all words and sentences (edit these to change content)
    vocabulary.js       topics (animals, food, body…), alphabet, numbers
    ui-text.js          praise, button labels, avatars
    menu.js             games on the home screen and their sections
    activities.js       content for individual games
    stories.js          the picture stories
  core/                 shared code: helpers, profiles, stars, audio, pictures, screens, game kit
  screens/              players, topic picker, sticker book, parent page
  games/                one file per game
  app.js                maps game ids to functions and starts the app
assets/
  audio/                one MP3 per phrase + index.json (phrase → file)
  images/               3D pictures (WebP) + index.json (emoji → file)
tools/                  scripts to regenerate audio and pictures and to build a single-file version
```

The scripts are plain JavaScript files that share one global scope, loaded in the order listed at the bottom of `index.html`. There is no build step for normal use.

## Change or add words

1. Edit the lists in `js/data/`. Each word is `[picture, Lithuanian, English]`, for example `['🐕','šuo','dog']`.
2. Make sound for new phrases:
   ```bash
   pip install espeakng-loader lameenc
   node tools/collect-phrases.js > tools/phrases.json
   python3 tools/make_audio.py
   ```
3. If you used a new emoji, fetch its 3D picture:
   ```bash
   npm pack @lobehub/fluent-emoji-3d && tar xzf lobehub-fluent-emoji-3d-*.tgz
   pip install emoji
   python3 tools/make_images.py package/assets
   ```

## Use your own voice

The built-in voice is a free robot voice (espeak-ng). To replace a clip with your own recording:

1. Find the phrase in `assets/audio/index.json`, for example `"šuo": "suo.mp3"`.
2. Record yourself saying it and save it over `assets/audio/suo.mp3` (MP3 works everywhere; keep the same name).
3. Add the file name to `assets/audio/recorded.txt` (one per line), so `make_audio.py --force` never overwrites it.

## Put it on GitHub

1. Create a new repository on <https://github.com/new> (it can be private).
2. Upload this folder: with GitHub Desktop, or from a terminal:
   ```bash
   git init
   git add .
   git commit -m "Mokausi lietuviškai"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/mokausi-lietuviskai.git
   git push -u origin main
   ```
3. Optional, to play it on a tablet from anywhere: in the repository go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. After a minute it is live at `https://YOUR-NAME.github.io/mokausi-lietuviskai/`. On an iPad, open it in Safari and choose **Share → Add to Home Screen**. Note that GitHub Pages sites are public even when the repository is private (on free plans).

## Single-file build

`python3 tools/build.py` writes `dist/` with the CSS and JavaScript inlined into one page and all sounds and pictures embedded in two JSON files. This is the version published as the Claude artifact. You don't need it for GitHub Pages.

## Progress data

Profiles, stars and the parent page's statistics are saved in the browser (`localStorage`) on each device. Clearing site data removes them.

## Credits

- 3D pictures: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji), MIT licence (see `assets/images/LICENSE-fluent-emoji.txt`), packaged as `@lobehub/fluent-emoji-3d`.
- Robot voice: [espeak-ng](https://github.com/espeak-ng/espeak-ng) Lithuanian voice.
- Fonts: Outfit and Nunito from Google Fonts.
