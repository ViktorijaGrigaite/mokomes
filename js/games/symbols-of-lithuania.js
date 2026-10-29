function symbolsLearn() {
  show(`${gameBar('symbols')}<p class="tip">Paliesk ir klausyk · Tap a card to hear about it</p>
    <div class="learn wide">${SYMBOLS.map((s, i) => `<button class="wcard" data-i="${i}"><span class="pic">${symPic(s)}</span><b>${s[1]}</b><span class="en">${s[3]}</span></button>`).join('')}</div>
    <div class="row"><button class="btn" id="play" ${sayUI('play')}>🎯 Žaisti!</button></div>`);
  screen.querySelectorAll('.wcard').forEach(b => b.onclick = () => speak(SYMBOLS[b.dataset.i][3]));
  $('#play').onclick = symbolsGame;
}
function symbolsGame() {
  quizRounds({id: 'symbols', total: 8, back: 'symbols', build: () => {
    const t = pick(SYMBOLS), opts = shuffle([t, ...shuffle(SYMBOLS.filter(s => s !== t)).slice(0, 2)]);
    return {top: promptHTML('Kur yra… · Where is…', t[1]), opts, intro: [UI3.whereIs[0] + ' ' + t[1] + '?'],
      optHTML: o => symPic(o), label: o => o[2], isOk: o => o === t, track: t[1], okSay: o => [o[3]], noSay: o => [o[1]], wait: 2600};
  }});
}
