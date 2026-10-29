function abc(idx, withLetter) {
  const [L, word, pic, enW] = ABC[idx];
  const pos = word.toLocaleLowerCase('lt').indexOf(L.toLocaleLowerCase('lt'));
  const marked = pos < 0 ? esc(word) : esc(word.slice(0, pos)) + '<mark>' + esc(word.slice(pos, pos + 1)) + '</mark>' + esc(word.slice(pos + 1));
  const special = /[ĄČĘĖĮŠŲŪŽ]/;
  const g = GAMES.find(x => x.id === 'abc');
  show(`${bar('Abėcėlė', 'home', say(g.lt, g.en))}
    <div class="abc-panel"><span class="big" ${say(L, '')}>${L}${L.toLocaleLowerCase('lt')}</span>
      <div class="word"><span class="pic emo" ${say(word, enW)}>${pic}</span><span ${say(word, enW)}>${marked}</span><button class="say" id="sayW" aria-label="Klausyk" ${say(word, enW)}>🔊</button></div>
      <span class="en">${enW}</span></div>
    <div class="row"><button class="btn alt" id="prev" aria-label="Atgal">←</button><button class="btn alt" id="next" aria-label="Pirmyn">→</button></div>
    <div class="letters">${ABC.map((a, i) => `<button class="letter${i === idx ? ' on' : ''}${special.test(a[0]) ? ' special' : ''}" data-i="${i}" ${say(a[0], '')}>${a[0]}</button>`).join('')}</div>
    <p class="tip">Yellow-edged letters are the ones English doesn’t have. Lithuanian has 32 letters.</p>`);
  $('#prev').onclick = () => abc((idx + ABC.length - 1) % ABC.length, true);
  $('#next').onclick = () => abc((idx + 1) % ABC.length, true);
  screen.querySelectorAll('.letter').forEach(b => b.onclick = () => abc(+b.dataset.i));
  sayAfter(withLetter ? L : null, word, en(enW));
}
