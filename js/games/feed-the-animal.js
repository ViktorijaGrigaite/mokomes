function feedGame() {
  const foods = CATS.maistas.items;
  const animals = [['🐻','meška','bear'],['🐰','kiškis','hare'],['🐷','kiaulė','pig'],['🐶','šuniukas','puppy']];
  let round = 0, earned = 0; const total = 8;
  function next() {
    if (round >= total) return finish(earned, feedGame, 'home');
    const a = pick(animals), want = pick(foods);
    const opts = shuffle([want, ...shuffle(foods.filter(f => f !== want)).slice(0, 3)]);
    show(`${gameBar('feed')}${progBar(round, total)}
      <div class="feed"><div class="bubble" ${say(want[1], want[2])}><span class="emo">🔊</span> ${want[1]}</div>
        <button class="critter emo" id="critter" ${say(a[1], a[2])} aria-label="${a[2]}">${a[0]}</button></div>
      <div class="foods">${opts.map((f, i) => `<button class="food emo" data-i="${i}" aria-label="${f[2]}">${f[0]}</button>`).join('')}</div>
      <p class="tip">Drag the food to the animal, or just tap it.</p>`);
    sayAfter(want[1]);
    const critter = $('#critter'); let lock = false;
    function give(el, f) {
      if (lock) return;
      const cur = el.style.transform; el.style.transition = 'none'; el.style.transform = 'none';
      const q = el.getBoundingClientRect(); el.style.transform = cur; void el.offsetWidth;
      const r = critter.getBoundingClientRect();
      const dx = r.left + r.width / 2 - (q.left + q.width / 2), dy = r.top + r.height / 2 - (q.top + q.height / 2);
      el.style.transition = 'transform .35s ease-in';
      el.style.transform = `translate(${dx}px,${dy}px) scale(.35)`;
      if (f === want) {
        lock = true;
        setTimeout(() => { el.style.visibility = 'hidden'; critter.classList.add('yum'); }, 350);
        track(want[1], true); speak(f[1], UI.thanks[0]); addStars(1); earned++; round++;
        later(next, 2000);
      } else {
        lock = true;
        setTimeout(() => { critter.classList.remove('nope'); void critter.offsetWidth; critter.classList.add('nope'); el.style.transform = ''; }, 380);
        setTimeout(() => { lock = false; }, 800);
        track(want[1], false); speak(f[1], UI.noThanks[0]);
      }
    }
    screen.querySelectorAll('.food').forEach(el => {
      const f = opts[el.dataset.i]; let sx = 0, sy = 0, drag = false, moved = false;
      el.onpointerdown = e => { if (lock) return; drag = true; moved = false; sx = e.clientX; sy = e.clientY; el.style.transition = 'none'; try { el.setPointerCapture(e.pointerId); } catch (_) {} el.classList.add('held'); };
      el.onpointermove = e => { if (!drag) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 10) moved = true; if (moved) el.style.transform = `translate(${dx}px,${dy}px) scale(1.15)`; };
      el.onpointerup = e => {
        if (!drag) return; drag = false; el.classList.remove('held');
        const r = critter.getBoundingClientRect();
        const over = e.clientX > r.left - 40 && e.clientX < r.right + 40 && e.clientY > r.top - 40 && e.clientY < r.bottom + 40;
        if (!moved || over) give(el, f); else { el.style.transition = 'transform .25s'; el.style.transform = ''; }
      };
      el.onpointercancel = () => { drag = false; el.classList.remove('held'); el.style.transform = ''; };
    });
  }
  next();
}
