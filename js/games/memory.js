function memoryGame(cat) {
  const c = CATS[cat];
  const pairs = shuffle(c.items).slice(0, 6);
  const cards = shuffle([...pairs, ...pairs].map((it, k) => ({it, k})));
  let open = [], matched = 0, locked = false;
  show(`${bar('Atmintis · ' + c.lt, 'memory', say(c.lt, c.en))}<p class="tip" style="text-align:left" ${sayUI('pairs')}>Rask poras · Find the matching pairs</p>
    <div class="mgrid">${cards.map((_, i) => `<button class="mcard" data-i="${i}" aria-label="Kortelė ${i + 1}">?</button>`).join('')}</div>`);
  const els = [...screen.querySelectorAll('.mcard')];
  const face = (el, card) => { el.innerHTML = `<span class="pic">${picHTML(cat, card.it)}</span><small>${card.it[1]}</small>`; };
  const hide = el => { el.classList.remove('open'); el.textContent = '?'; };
  els.forEach((el, i) => el.onclick = () => {
    if (el.classList.contains('done')) return speak(cards[i].it[1], en(cards[i].it[2]));
    if (locked || el.classList.contains('open')) return;
    el.classList.add('open', 'flip'); setTimeout(() => el.classList.remove('flip'), 260);
    face(el, cards[i]); speak(cards[i].it[1], en(cards[i].it[2])); open.push(i);
    if (open.length < 2) return;
    const [a, b] = open; open = [];
    if (cards[a].it === cards[b].it) {
      setTimeout(() => {
        els[a].classList.add('done'); els[b].classList.add('done'); matched++; addStars(1);
        if (matched === pairs.length) { addStars(2); later(() => finish(pairs.length + 2, () => memoryGame(cat), 'memory'), 900); }
        else { const pr = pick(PRAISE); sayAfter(pr[0], en(pr[1])); }
      }, 500);
    } else {
      locked = true;
      setTimeout(() => { hide(els[a]); hide(els[b]); locked = false; }, 1500);
    }
  });
}
