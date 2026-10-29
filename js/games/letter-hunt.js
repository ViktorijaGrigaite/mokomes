const SIMILAR = [['A','Ą'],['C','Č'],['E','Ę','Ė'],['I','Į','Y'],['S','Š'],['U','Ų','Ū'],['Z','Ž'],['M','N'],['P','R'],['B','D'],['K','L'],['O','V']];
function lettersGame() {
  let round = 0, earned = 0; const total = 8;
  const all = ABC.map(a => a[0]);
  function next() {
    if (round >= total) return finish(earned, lettersGame, 'home');
    const L = pick(all), fam = SIMILAR.find(f => f.includes(L)) || [];
    const copies = 2 + Math.floor(Math.random() * 2);
    const pool = [...fam.filter(x => x !== L), ...shuffle(all.filter(x => x !== L && !fam.includes(x)))];
    const cells = shuffle([...Array(copies).fill(L), ...pool.slice(0, 9 - copies)]);
    let found = 0, lock = false;
    show(`${gameBar('letters')}${progBar(round, total)}
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Rask raidę · Find the letter</small><span class="biglet">${L}</span></div><span class="found" id="found">${'☆'.repeat(copies)}</span></div>
      <div class="lgrid">${cells.map((c, i) => `<button class="lb" data-i="${i}" style="--c:${BAL_COLORS[i % BAL_COLORS.length]}"><span style="transform:rotate(${Math.round(Math.random() * 30 - 15)}deg)">${c}</span></button>`).join('')}</div>`);
    sayAfter(UI.findLetter[0], L);
    $('#sayQ').onclick = () => speak(UI.findLetter[0], L);
    screen.querySelectorAll('.lb').forEach(b => b.onclick = () => {
      if (lock || b.classList.contains('ok')) return;
      const c = cells[b.dataset.i];
      if (c === L) {
        b.classList.add('ok'); found++;
        $('#found').textContent = '⭐'.repeat(found) + '☆'.repeat(copies - found);
        if (found === copies) {
          lock = true; const pr = pick(PRAISE); speak(L, pr[0]); addStars(1); earned++; round++;
          later(next, 1600);
        } else speak(L);
      } else { b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); speak(c); }
    });
  }
  next();
}
