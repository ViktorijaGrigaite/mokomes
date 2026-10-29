function dressGame() {
  const clothes = CATS.drabuziai.items; let round = 0, earned = 0; const total = 6;
  function next() {
    if (round >= total) return finish(earned, dressGame, 'home');
    const W = pick(WEATHER);
    const right = shuffle(clothes.filter(c => W.ok.includes(c[1]))).slice(0, 2);
    const wrong = shuffle(clothes.filter(c => !W.ok.includes(c[1]))).slice(0, 2);
    const opts = shuffle([...right, ...wrong]); let got = 0, lock = false;
    show(`${gameBar('dress')}${progBar(round, total)}
      <div class="feed"><div class="bubble" ${say(W.lt, W.en)}>${pic1(W.w)} ${W.lt}</div>
        <div class="dressup"><span class="critter emo">🐻</span><div class="worn" id="worn"></div></div></div>
      <p class="tip" ${say(UI2.dressQ[0], UI2.dressQ[1])}>Ką apsirengti? · What should the bear wear? Pick 2 things.</p>
      <div class="foods">${opts.map((c, i) => `<button class="food emo" data-i="${i}" aria-label="${c[2]}">${c[0]}</button>`).join('')}</div>`);
    sayAfter(W.lt, UI2.dressQ[0]);
    screen.querySelectorAll('.food').forEach(b => b.onclick = () => {
      if (lock || b.disabled) return;
      const c = opts[b.dataset.i];
      if (right.includes(c)) {
        b.disabled = true; b.style.visibility = 'hidden';
        const w = document.createElement('span'); w.className = 'emo pop-in'; w.textContent = c[0]; $('#worn').appendChild(w);
        got++;
        if (got === right.length) { lock = true; const pr = pick(PRAISE); speak(c[1], pr[0]); addStars(1); earned++; round++; later(next, 1900); }
        else speak(c[1]);
      } else { shake(b); speak(c[1], UI.noThanks[0]); }
    });
  }
  next();
}
