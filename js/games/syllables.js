function sylGame() {
  const pool = wordPool().filter(it => { const n = sylCount(it[1]); return n >= 1 && n <= 4; });
  const deck = shuffle(pool).slice(0, 8); let round = 0, earned = 0;
  function next() {
    if (round >= deck.length) return finish(earned, sylGame, 'home');
    const t = deck[round], n = sylCount(t[1]); let taps = 0, lock = false;
    show(`${gameBar('syl')}${progBar(round, deck.length)}
      <div class="prompt"><span class="bigpic emo">${t[0]}</span><div class="q"><small>Kiek skiemenų? · How many syllables?</small>${t[1]}</div><button class="say" id="sayQ" aria-label="Klausyk">🔊</button></div>
      <div class="drumwrap"><button class="drum" id="drum" aria-label="Drum"><span class="emo">🥁</span></button><div class="dots" id="dots"></div></div>
      <div class="row"><button class="btn alt" id="reset" ${sayUI2('reset')}>↺ Iš naujo</button><button class="btn" id="check" ${sayUI2('check')}>✅ Tikrinti</button></div>
      <p class="tip">Say the word slowly and tap the drum once for each part: ba·na·nas = 3 taps.</p>`);
    sayAfter(t[1], UI2.syl[0]); $('#sayQ').onclick = () => speak(t[1]);
    const dots = $('#dots'), drum = $('#drum');
    const draw = () => { dots.innerHTML = Array.from({length: taps}, () => '<i></i>').join(''); };
    drum.onclick = () => { if (lock || taps >= 6) return; taps++; draw(); drum.classList.remove('hit'); void drum.offsetWidth; drum.classList.add('hit'); speak(NUMS[taps - 1]); };
    $('#reset').onclick = () => { if (lock) return; taps = 0; draw(); };
    $('#check').onclick = () => {
      if (lock) return;
      if (taps === n) { lock = true; dots.classList.add('ok'); speak(t[1], NUMS[n - 1], pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, 2200); }
      else { shake(dots); speak(t[1], TRY[0]); taps = 0; later(draw, 500); }
    };
  }
  next();
}
