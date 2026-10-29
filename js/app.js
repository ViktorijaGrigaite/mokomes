const START = {
  match: () => catPicker('match'), memory: () => catPicker('memory'), balloons: () => catPicker('balloons'),
  feed: feedGame, hide: hideGame, paint: () => paintGame('namas'),
  abc: () => abc(0), letters: lettersGame, build: buildGame, count: countGame,
  move: moveGame, hunt: huntGame, daily: dailyGame, stickers: stickerBook,
  body: () => learnView('kunas'), dress: dressGame, live: liveGame, shop: shopGame, odd: oddGame, opp: oppLearn,
  plural: pluralGame, routine: routineGame, first: firstGame, syl: sylGame, story: storyList,
  sounds: soundsLearn, call: callGame, polite: politeGame, feel: feelGame, mix: mixGame, rhyme: rhymeGame, read: readGame,
  egg: () => paintGame('margutis'), symbols: symbolsLearn, seasons: seasonsGame, places: placesGame, transport: transportGame, parents: parentPage
};

function home(quiet) {
  const me = cur(); if (!me) return whoPlays();
  const got = Math.min(STICKERS.length, Math.floor(me.stars / STICKER_STEP));
  const toNext = got >= STICKERS.length ? 0 : STICKER_STEP - (me.stars % STICKER_STEP);
  const tile = g => `<button class="tile" style="--c:${g.c}" data-g="${g.id}" ${say(g.lt, g.en)}><span class="ico emo">${g.ico}</span><span class="lt">${g.lt}</span><span class="en">${g.sub}</span></button>`;
  show(`<div class="hello"><h2 ${sayUI('hello')}>Labas!</h2><p ${sayUI('whatPlay')}>Ką šiandien žaisime? · What shall we play today?</p>
      <button class="hero-av emo" ${avInfo(me.avatar)[1] ? say(avInfo(me.avatar)[1], avInfo(me.avatar)[2]) : sayUI('hello')} aria-label="${esc(me.name)}">${me.avatar}</button></div>
    <button class="album-banner" data-g="stickers" ${sayUI('stickers')}><span class="ico emo">📒</span>
      <span class="txt"><b>Lipdukų albumas · ${got}/${STICKERS.length}</b><span class="prog" style="display:block"><i style="width:${toNext ? Math.round((STICKER_STEP - toNext) / STICKER_STEP * 100) : 100}%"></i></span>
      <small>${toNext ? `Next sticker in ${toNext} ⭐` : 'All stickers collected!'}</small></span>
      <span class="last emo">${STICKERS.slice(Math.max(0, got - 4), got).map(s => s[0]).join('')}</span></button>
    ${GROUPS.map(gr => `<section class="group"><h3 ${say(gr[1], gr[2])}>${gr[1]} <small>${gr[2]}</small></h3>
      <div class="tiles">${GAMES.filter(g => g.grp === gr[0]).map(tile).join('')}</div></section>`).join('')}
    <p class="tip">Every button says its name in Lithuanian when you tap it.</p>
    <button class="parentlink" data-g="parents">Tėvams · For parents: progress and words to practise</button>`);
  document.body.classList.add('is-home');
  screen.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { countPlay(b.dataset.g); START[b.dataset.g](); });
  if (quiet !== true && unlocked && !busy) speak(UI.hello[0]);
}

renderStars();
home(true);
