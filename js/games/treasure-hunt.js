let lastHunt = -1;
function huntGame() {
  let i; do { i = Math.floor(Math.random() * TREASURE.length); } while (i === lastHunt);
  lastHunt = i;
  const [pic, cmd, enC] = TREASURE[i];
  show(`${gameBar('hunt')}<div class="move"><span class="pic emo" ${say(cmd, enC)}>${pic}</span><span class="cmd" ${say(cmd, enC)}>${cmd}</span><span class="en">${enC}</span>
      <button class="say" aria-label="Klausyk" ${say(cmd, enC)}>🔊</button></div>
    <div class="row"><button class="btn" id="found" ${sayUI('found')}>🔍 Radau!</button><button class="btn alt" id="skip" ${sayUI('next')}>Kitas →</button></div>
    <p class="tip">Grown-up: help your child look around the room. “Radau!” means “I found it!”</p>`);
  sayAfter(cmd);
  $('#found').onclick = () => { addStars(1); burst(8); const pr = pick(PRAISE); sayAfter(pr[0]); later(huntGame, 2400); };
  $('#skip').onclick = () => later(huntGame, 1000);
}
