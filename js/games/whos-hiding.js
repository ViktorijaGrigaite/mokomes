function hideGame() {
  const items = CATS.gyvunai.items, deck = shuffle(items);
  let round = 0, earned = 0; const total = 8;
  function next() {
    if (round >= total) return finish(earned, hideGame, 'home');
    const t = deck[round % deck.length];
    const opts = shuffle([t, ...shuffle(items.filter(i => i !== t)).slice(0, 2)]);
    const left = Math.round(25 + Math.random() * 50), rot = Math.round(Math.random() * 30 - 15);
    show(`${gameBar('hide')}${progBar(round, total)}
      <div class="bushstage"><span class="peek emo" id="peek" style="left:${left}%;--r:${rot}deg">${t[0]}</span><div class="bush" id="bush"></div></div>
      <div class="words3">${opts.map((o, i) => `<button class="wordbtn" data-i="${i}">${o[1]}</button>`).join('')}</div>`);
    if (round > 0) sayAfter(UI.whoHid[0]);
    let lock = false;
    screen.querySelectorAll('.wordbtn').forEach(b => b.onclick = () => {
      if (lock) return;
      const o = opts[b.dataset.i];
      if (o === t) {
        lock = true; track(t[1], true); b.classList.add('ok'); $('#peek').classList.add('out'); $('#bush').classList.add('rustle');
        const pr = pick(PRAISE); speak(t[1], pr[0]); addStars(1); earned++; round++;
        later(next, 2000);
      } else { track(t[1], false); b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); speak(o[1], TRY[0]); }
    });
  }
  next();
}
