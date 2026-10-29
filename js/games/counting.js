function countGame() {
  let round = 0, earned = 0; const total = 8;
  const g = GAMES.find(x => x.id === 'count');
  function next() {
    if (round >= total) return finish(earned, countGame, 'home');
    const n = 1 + Math.floor(Math.random() * (round < 4 ? 5 : 10));
    const obj = pick(COUNT_OBJ);
    const others = shuffle([...Array(10).keys()].map(i => i + 1).filter(x => x !== n && Math.abs(x - n) <= 3)).slice(0, 2);
    const opts = shuffle([n, ...others]);
    show(`${bar('Skaičiuok!', 'home', say(g.lt, g.en))}<div class="prog"><i style="width:${Math.round(round / total * 100)}%"></i></div>
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk" ${sayUI('howMany')}>🔊</button><div class="q" ${sayUI('howMany')}><small>How many?</small>Kiek?</div></div>
      <div class="objs">${Array.from({length: n}, (_, i) => `<span class="emo" style="animation-delay:${i * 60}ms">${obj}</span>`).join('')}</div>
      <div class="nums">${opts.map(o => `<button class="num" data-n="${o}"><b>${o}</b><span>${NUMS[o - 1]}</span></button>`).join('')}</div>
      <div class="strip">${NUMS.map((w, i) => `<button ${say(w, NUMS_EN[i])}><b>${i + 1}</b>${w}</button>`).join('')}</div>`);
    sayAfter(UI.howMany[0], en(UI.howMany[1]));
    let locked = false;
    screen.querySelectorAll('.num').forEach(b => b.onclick = () => {
      if (locked) return;
      const o = +b.dataset.n;
      if (o === n) {
        locked = true; b.classList.add('ok');
        const pr = pick(PRAISE); speak(NUMS[n - 1], en(NUMS_EN[n - 1]), pr[0], en(pr[1]));
        round++; earned++; addStars(1); later(next, 2200);
      } else {
        b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
        speak(NUMS[o - 1], en(NUMS_EN[o - 1]), TRY[0], en(TRY[1]));
      }
    });
  }
  next();
}
