function routineGame() {
  let round = 0, earned = 0; const total = 5;
  function next() {
    if (round >= total) return finish(earned, routineGame, 'home');
    const start = Math.floor(Math.random() * (ROUTINE.length - 3));
    const steps = ROUTINE.slice(start, start + 4); let cards = shuffle(steps);
    if (cards.every((c, i) => c === steps[i])) cards = cards.reverse();
    let pos = 0, lock = false;
    show(`${gameBar('routine')}${progBar(round, total)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>What comes first? Tap in order.</small>Kas būna pirmiau?</div></div>
      <div class="seq">${steps.map((_, i) => `<span class="seqslot${i === 0 ? ' next' : ''}"><i>${i + 1}</i></span>`).join('')}</div>
      <div class="opts four">${cards.map((c, i) => `<button class="opt rcard" data-i="${i}" aria-label="${c[2]}">${pic1(c[0])}<small>${c[1]}</small></button>`).join('')}</div>`);
    sayAfter(UI2.order[0]); $('#sayQ').onclick = () => speak(UI2.order[0]);
    const slots = [...screen.querySelectorAll('.seqslot')];
    screen.querySelectorAll('.rcard').forEach(b => b.onclick = () => {
      if (lock || b.disabled) return; const c = cards[b.dataset.i];
      if (c === steps[pos]) {
        b.disabled = true; b.style.visibility = 'hidden';
        slots[pos].innerHTML = `${pic1(c[0])}<small>${c[1]}</small>`; slots[pos].classList.remove('next'); slots[pos].classList.add('full');
        pos++;
        if (pos < steps.length) { slots[pos].classList.add('next'); speak(c[1]); }
        else { lock = true; speak(c[1], pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, 2200); }
      } else { shake(b); speak(c[1], TRY[0]); }
    });
  }
  next();
}
