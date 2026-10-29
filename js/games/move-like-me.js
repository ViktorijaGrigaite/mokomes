let lastMove = -1;
function moveGame() {
  let i; do { i = Math.floor(Math.random() * MOVES.length); } while (i === lastMove);
  lastMove = i;
  const [pic, cmd, enC] = MOVES[i];
  const g = GAMES.find(x => x.id === 'move');
  show(`${bar('Judėk!', 'home', say(g.lt, g.en))}<div class="move"><span class="pic emo" ${say(cmd, enC)}>${pic}</span><span class="cmd" ${say(cmd, enC)}>${cmd}</span><span class="en">${enC}</span>
      <button class="say" id="sayM" aria-label="Klausyk" ${say(cmd, enC)}>🔊</button></div>
    <div class="row"><button class="btn" id="did" ${sayUI('did')}>✅ Padariau!</button><button class="btn alt" id="skip" ${sayUI('next')}>Kitas →</button></div>
    <p class="tip">Grown-up: let your child act out the command. “Padariau!” means “I did it!”</p>`);
  sayAfter(cmd, en(enC));
  $('#did').onclick = () => { addStars(1); burst(6); const pr = pick(PRAISE); sayAfter(pr[0], en(pr[1])); later(moveGame, 2600); };
  $('#skip').onclick = () => later(moveGame, 1200);
}
