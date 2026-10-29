function oppLearn() {
  show(`${gameBar('opp')}<p class="tip">Paliesk ir klausyk · Tap a pair to hear both words</p>
    <div class="pairs">${OPPOSITES.map((p, i) => `<button class="pair" data-i="${i}"><span>${pic1(p[0][0])}<b>${p[0][1]}</b><small>${p[0][2]}</small></span><i>↔</i><span>${pic1(p[1][0])}<b>${p[1][1]}</b><small>${p[1][2]}</small></span></button>`).join('')}</div>
    <div class="row"><button class="btn" id="play" ${sayUI('play')}>🎯 Žaisti!</button></div>`);
  screen.querySelectorAll('.pair').forEach(b => b.onclick = () => { const p = OPPOSITES[b.dataset.i]; speak(p[0][1], p[1][1]); });
  $('#play').onclick = oppGame;
}
function oppGame() {
  let round = 0, earned = 0; const total = 8;
  function next() {
    if (round >= total) return finish(earned, oppGame, 'home');
    const pi = Math.floor(Math.random() * OPPOSITES.length), d = Math.random() < .5 ? 0 : 1;
    const A = OPPOSITES[pi][d], B = OPPOSITES[pi][1 - d];
    const others = shuffle(OPPOSITES.filter((_, i) => i !== pi)).slice(0, 2).map(p => p[Math.random() < .5 ? 0 : 1]);
    const opts = shuffle([B, ...others]); let lock = false;
    show(`${bar('Priešingybės', 'opp', sayUI2('opp'))}${progBar(round, total)}
      <div class="prompt"><span class="bigpic emo">${A[0]}</span><div class="q"><small>Rask priešingybę · Find the opposite</small>${A[1]}</div><button class="say" id="sayQ" aria-label="Klausyk">🔊</button></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}" aria-label="${o[2]}">${pic1(o[0])}</button>`).join('')}</div>`);
    sayAfter(A[1], UI2.opp[0]); $('#sayQ').onclick = () => speak(A[1], UI2.opp[0]);
    screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (lock) return; const o = opts[b.dataset.i];
      if (o === B) { lock = true; b.classList.add('ok'); speak(A[1], B[1], pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, 2200); }
      else { shake(b); speak(o[1], TRY[0]); }
    });
  }
  next();
}
