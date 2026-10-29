function liveGame() {
  const deck = shuffle(LIVES).slice(0, 8); let round = 0, earned = 0;
  function next() {
    if (round >= deck.length) return finish(earned, liveGame, 'home');
    const a = deck[round]; let lock = false;
    show(`${gameBar('live')}${progBar(round, deck.length)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Kur gyvena… · Where does it live?</small>${a[1]}</div></div>
      <div class="move"><span class="pic emo">${a[0]}</span></div>
      <div class="words3">${HOMES.map((h, i) => `<button class="wordbtn home3" data-i="${i}"><span class="emo">${h[0]}</span><span>${h[1].replace('!', '')}</span><small>${h[2]}</small></button>`).join('')}</div>`);
    const ask = () => speak(UI2.live[0] + ' ' + a[1] + '?');
    sayAfter(UI2.live[0] + ' ' + a[1] + '?'); $('#sayQ').onclick = ask;
    screen.querySelectorAll('.home3').forEach(b => b.onclick = () => {
      if (lock) return; const i = +b.dataset.i;
      if (i === a[2]) { lock = true; b.classList.add('ok'); const pr = pick(PRAISE); speak(HOMES[i][1], pr[0]); addStars(1); earned++; round++; later(next, 1800); }
      else { shake(b); speak(HOMES[i][1], TRY[0]); }
    });
  }
  next();
}
