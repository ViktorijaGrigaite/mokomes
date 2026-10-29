function firstGame() {
  let round = 0, earned = 0; const total = 8; const pool = wordPool();
  const first = w => w[0].toLocaleUpperCase('lt');
  function next() {
    if (round >= total) return finish(earned, firstGame, 'home');
    const t = pick(pool), L = first(t[1]);
    const others = shuffle(pool.filter(p => first(p[1]) !== L)).filter((p, i, a) => a.findIndex(q => first(q[1]) === first(p[1])) === i).slice(0, 2);
    const opts = shuffle([t, ...others]); let lock = false;
    show(`${gameBar('first')}${progBar(round, total)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>What starts with the letter…</small><span class="biglet">${L}</span></div></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}" aria-label="${o[2]}">${pic1(o[0])}</button>`).join('')}</div>`);
    sayAfter(UI2.first[0], L); $('#sayQ').onclick = () => speak(UI2.first[0], L);
    screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (lock) return; const o = opts[b.dataset.i];
      if (o === t) { lock = true; track(t[1], true); b.classList.add('ok'); b.insertAdjacentHTML('beforeend', `<small class="cap">${o[1]}</small>`); speak(o[1], pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, 1900); }
      else { shake(b); speak(o[1], TRY[0]); }
    });
  }
  next();
}
