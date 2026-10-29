function catPicker(mode) {
  const g = GAMES.find(x => x.id === mode);
  show(`${bar(g.lt, 'home', say(g.lt, g.en))}<p class="tip" style="text-align:left" ${sayUI('topic')}>Pasirink temą · Pick a topic</p>
    <div class="tiles">${Object.entries(CATS).map(([k, c]) => `<button class="tile" data-c="${k}" ${say(c.lt, c.en)}><span class="ico">${k === 'spalvos' ? `<span class="swatch" style="width:58px;background:${c.items[0][0]}"></span>` : `<span class="emo">${c.items[0][0]}</span>`}</span><span class="lt">${c.lt}</span><span class="en">${c.en}</span></button>`).join('')}</div>`);
  screen.querySelectorAll('[data-c]').forEach(b => b.onclick = () => ({match: learnView, memory: memoryGame, balloons: balloonGame})[mode](b.dataset.c));
}
