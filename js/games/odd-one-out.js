function oddGame() {
  const cats = ['gyvunai','maistas','kunas','drabuziai','seima']; let round = 0, earned = 0; const total = 8;
  function next() {
    if (round >= total) return finish(earned, oddGame, 'home');
    const [base, other] = shuffle(cats);
    const odd = pick(CATS[other].items);
    const opts = shuffle([...shuffle(CATS[base].items).slice(0, 3), odd]); let lock = false;
    show(`${gameBar('odd')}${progBar(round, total)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Which one doesn't belong?</small>Kas nesiderina?</div></div>
      <div class="opts four">${opts.map((o, i) => `<button class="opt" data-i="${i}" aria-label="${o[2]}">${pic1(o[0])}</button>`).join('')}</div>`);
    if (round > 0) sayAfter(UI2.odd[0]); $('#sayQ').onclick = () => speak(UI2.odd[0]);
    screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (lock) return; const o = opts[b.dataset.i];
      if (o === odd) { lock = true; b.classList.add('ok'); const pr = pick(PRAISE); speak(o[1], pr[0]); addStars(1); earned++; round++; later(next, 1700); }
      else { shake(b); speak(o[1], TRY[0]); }
    });
  }
  next();
}
