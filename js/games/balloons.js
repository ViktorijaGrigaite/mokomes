function balloonGame(cat) {
  const c = CATS[cat], items = c.items, targets = shuffle(items).slice(0, 8);
  let done = 0, earned = 0, target, wave = 0, lock = false;
  show(`${bar('Balionai · ' + c.lt, 'balloons', say(c.lt, c.en))}<div class="prog"><i id="bprog" style="width:0%"></i></div>
    <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Pop the balloon!</small><span id="bword"></span></div></div>
    <div class="sky" id="sky"></div>`);
  const sky = $('#sky');
  $('#sayQ').onclick = () => speak(target[1]);
  function newTarget() {
    if (!sky.isConnected) return;
    if (done >= targets.length) return finish(earned, () => balloonGame(cat), 'balloons');
    target = targets[done];
    $('#bword').textContent = target[1];
    $('#bprog').style.width = Math.round(done / targets.length * 100) + '%';
    sayAfter(target[1]);
    launch();
  }
  function launch() {
    if (!sky.isConnected) return;
    sky.innerHTML = '';
    const w = ++wave, H = sky.clientHeight;
    const opts = shuffle([target, ...shuffle(items.filter(i => i !== target)).slice(0, 3)]);
    let landed = 0;
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'balloon'; b.setAttribute('aria-label', o[2]);
      b.style.left = (3 + i * 24 + Math.random() * 3) + '%';
      const bin = document.createElement('span'); bin.className = 'bin';
      bin.style.setProperty('--b', cat === 'spalvos' ? o[0] : BAL_COLORS[(i + w) % BAL_COLORS.length]);
      bin.innerHTML = cat === 'spalvos' ? '' : `<span class="emo">${o[0]}</span>`;
      b.appendChild(bin);
      if (reduceMotion()) b.style.bottom = (18 + (i % 2) * 22) + '%';
      else {
        b.style.setProperty('--rise', -(H + 200) + 'px');
        b.style.animation = `rise ${(7 + Math.random() * 3).toFixed(1)}s linear ${(i * 0.5).toFixed(1)}s both`;
        b.addEventListener('animationend', e => {
          if (e.target !== b) return;
          if (++landed === opts.length && w === wave && sky.isConnected && !lock) { sayAfter(target[1]); launch(); }
        });
      }
      b.onclick = () => {
        if (lock || w !== wave) return;
        if (o === target) {
          lock = true; b.classList.add('pop');
          const pr = pick(PRAISE); speak(pr[0], target[1]);
          track(target[1], true); addStars(1); earned++; done++;
          later(() => { lock = false; newTarget(); }, 1400);
        } else {
          bin.classList.remove('no'); void bin.offsetWidth; bin.classList.add('no');
          speak(o[1]); track(target[1], false);
        }
      };
      sky.appendChild(b);
    });
  }
  newTarget();
}
