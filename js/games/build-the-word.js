const BUILD = Object.entries(CATS).filter(([k]) => k !== 'spalvos').flatMap(([, c]) => c.items)
  .filter(it => !it[1].includes(' ') && [...it[1]].length <= 5);
function buildGame() {
  const deck = shuffle(BUILD).slice(0, 6); let round = 0, earned = 0;
  function next() {
    if (round >= deck.length) return finish(earned, buildGame, 'home');
    const t = deck[round], letters = [...t[1].toLocaleUpperCase('lt')];
    let tiles = shuffle(letters.map((l, i) => ({l, i})));
    if (letters.length > 1 && tiles.every((x, k) => x.l === letters[k])) tiles = tiles.reverse();
    let pos = 0, lock = false;
    show(`${gameBar('build')}${progBar(round, deck.length)}
      <div class="prompt"><span class="bigpic emo">${t[0]}</span><button class="say" id="sayQ" aria-label="Klausyk">🔊</button></div>
      <div class="slots">${letters.map((_, i) => `<span class="slot${i === 0 ? ' next' : ''}"></span>`).join('')}</div>
      <div class="ltiles">${tiles.map((x, k) => `<button class="lt-tile" data-k="${k}">${x.l}</button>`).join('')}</div>
      <p class="tip">Listen to the word, then tap the letters in the right order.</p>`);
    sayAfter(t[1]);
    $('#sayQ').onclick = () => speak(t[1]);
    const slots = [...screen.querySelectorAll('.slot')];
    screen.querySelectorAll('.lt-tile').forEach(b => b.onclick = () => {
      if (lock || b.classList.contains('gone')) return;
      const x = tiles[b.dataset.k];
      if (x.l === letters[pos]) {
        b.classList.add('gone');
        slots[pos].textContent = x.l; slots[pos].classList.remove('next'); slots[pos].classList.add('full');
        pos++;
        if (pos < letters.length) { slots[pos].classList.add('next'); speak(x.l); }
        else { lock = true; track(t[1], true); const pr = pick(PRAISE); speak(t[1], pr[0]); addStars(1); earned++; round++; later(next, 2000); }
      } else { b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); speak(x.l); }
    });
  }
  next();
}
