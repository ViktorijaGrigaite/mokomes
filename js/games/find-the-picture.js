function learnView(cat) {
  const c = CATS[cat];
  show(`${bar(c.lt, 'match', say(c.lt, c.en))}<p class="tip" style="text-align:left">Paliesk ir klausyk · Tap a card to hear the word</p>
    <div class="learn">${c.items.map((it, i) => `<button class="wcard" data-i="${i}" ${say(it[1], it[2])}><span class="pic">${picHTML(cat, it)}</span><b>${it[1]}</b><span class="en">${it[2]}</span></button>`).join('')}</div>
    <div class="row"><button class="btn" id="play" ${sayUI('play')}>🎯 Žaisti!</button></div>`);
  screen.querySelectorAll('.wcard').forEach(b => b.onclick = () => { b.classList.remove('talk'); void b.offsetWidth; b.classList.add('talk'); });
  $('#play').onclick = () => matchGame(cat);
}

function matchGame(cat) {
  const items = CATS[cat].items;
  const queueQ = shuffle(items).slice(0, 8);
  const missed = new Set();
  let done = 0, earned = 0;
  function next() {
    if (!queueQ.length) return finish(earned, () => matchGame(cat), 'learn:' + cat);
    const t = queueQ[0];
    const opts = shuffle([t, ...shuffle(items.filter(i => i !== t)).slice(0, 2)]);
    const pct = Math.round(done / (done + queueQ.length) * 100);
    show(`${bar(CATS[cat].lt, 'learn:' + cat, say(CATS[cat].lt, CATS[cat].en))}<div class="prog"><i style="width:${pct}%"></i></div>
      <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Kur yra… · Where is…</small>${t[1]}</div></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}" aria-label="${esc(o[2])}">${picHTML(cat, o)}</button>`).join('')}</div>`);
    const ask = ['Kur yra ' + t[1] + '?', en(whereEn(cat, t))];
    $('#sayQ').onclick = () => speak(...ask);
    sayAfter(...ask);
    let locked = false;
    screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      const o = opts[b.dataset.i];
      if (o === t) {
        locked = true; b.classList.add('ok');
        const pr = pick(PRAISE); speak(pr[0], t[1], en(pr[1] + ' ' + t[2]));
        track(t[1], true); queueQ.shift(); done++; earned++; addStars(1);
        later(next, 1600);
      } else {
        b.classList.remove('no'); void b.offsetWidth; b.classList.add('no');
        speak(o[1], en(o[2]), TRY[0], en(TRY[1]));
        track(t[1], false); if (!missed.has(t)) { missed.add(t); queueQ.push(t); }
      }
    });
  }
  next();
}

function finish(earned, again, backTo) {
  burst(14); sayAfter(UI.hooray[0], en(UI.hooray[1]));
  show(`${bar('Valio!', backTo, sayUI('hooray'))}<div class="done-card"><span class="pic emo">🏆</span><h2 ${sayUI('hooray')}>Valio!</h2><p>⭐ +${earned}</p>
    <div class="row"><button class="btn" id="again" ${sayUI('again')}>🔁 Dar kartą</button><button class="btn alt" id="goHome" ${sayUI('home')}>🏠 Namo</button></div></div>`);
  $('#again').onclick = again; $('#goHome').onclick = () => home(true);
}
