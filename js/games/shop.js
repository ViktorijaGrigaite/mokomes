function shopGame() {
  const foods = CATS.maistas.items; let round = 0, earned = 0; const total = 6; const bag = [];
  function next() {
    if (round >= total) return finish(earned, shopGame, 'home');
    const f = pick(foods), price = 1 + Math.floor(Math.random() * 5); let paid = 0, lock = false;
    show(`${gameBar('shop')}${progBar(round, total)}
      <div class="feed shopfront"><div class="pricetag" ${say(f[1], f[2])}><span class="emo">${f[0]}</span><b>${price} €</b></div>
        <div class="tray" id="tray" aria-live="polite"></div></div>
      <div class="coins">${Array.from({length: 6}, (_, i) => `<button class="coin" data-i="${i}" aria-label="1 euro"><span class="emo">🪙</span><small>1 €</small></button>`).join('')}</div>
      <div class="row"><button class="btn alt" id="undo" ${sayUI2('reset')}>↺ Iš naujo</button><button class="btn" id="pay" ${sayUI2('pay')}>🛒 Mokėti</button></div>
      <p class="tip">Tap a coin for each euro, then press Mokėti (Pay). Basket: <span class="emo">${bag.join('') || '…'}</span></p>`);
    sayAfter(f[1], UI2.costs[0], PRICES[price - 1]);
    const tray = $('#tray');
    screen.querySelectorAll('.coin').forEach(b => b.onclick = () => {
      if (lock || b.disabled) return;
      b.disabled = true; b.style.visibility = 'hidden'; paid++;
      const c = document.createElement('span'); c.className = 'emo pop-in'; c.textContent = '🪙'; tray.appendChild(c);
      speak(NUMS[paid - 1]);
    });
    $('#undo').onclick = () => { if (lock) return; paid = 0; tray.innerHTML = ''; screen.querySelectorAll('.coin').forEach(c => { c.disabled = false; c.style.visibility = ''; }); };
    $('#pay').onclick = () => {
      if (lock) return;
      if (paid === price) { lock = true; bag.push(f[0]); const pr = pick(PRAISE); speak(UI2.here[0], pr[0]); addStars(1); earned++; round++; burst(6); later(next, 1900); }
      else { shake(tray); speak(f[1], UI2.costs[0], PRICES[price - 1]); $('#undo').click(); }
    };
  }
  next();
}
const sayUI2 = k => say(UI2[k][0], UI2[k][1]);
