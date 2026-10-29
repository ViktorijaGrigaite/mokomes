function pluralGame() {
  let round = 0, earned = 0; const total = 10;
  function next() {
    if (round >= total) return finish(earned, pluralGame, 'home');
    const it = pick(PLURALS), many = Math.random() < .5, word = many ? it[2] : it[1];
    const sides = shuffle([0, 1]); let lock = false;   // 0 = one, 1 = many
    show(`${gameBar('plural')}${progBar(round, total)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>One or many?</small>${word}</div></div>
      <div class="opts two">${sides.map(s => `<button class="opt" data-s="${s}" aria-label="${s ? 'many' : 'one'}"><span class="grp${s ? ' many' : ''}">${s ? pic1(it[0]).repeat(3) : pic1(it[0])}</span></button>`).join('')}</div>`);
    sayAfter(word); $('#sayQ').onclick = () => speak(word);
    screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (lock) return; const s = +b.dataset.s;
      if (s === (many ? 1 : 0)) { lock = true; track(word, true); b.classList.add('ok'); speak(word, pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, 1600); }
      else { shake(b); speak(s ? it[2] : it[1], TRY[0]); }
    });
  }
  next();
}
