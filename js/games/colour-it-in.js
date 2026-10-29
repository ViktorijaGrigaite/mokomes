const DRAWINGS = {
  namas: {ico:'🏠', svg:`<rect class="pp" x="4" y="4" width="292" height="232" rx="16"/><circle class="pp" cx="248" cy="52" r="26"/>
    <path class="pp" d="M4 196 H296 V220 Q296 236 280 236 H20 Q4 236 4 220 Z"/><rect class="pp" x="186" y="54" width="24" height="52"/>
    <polygon class="pp" points="58,112 150,38 242,112"/><rect class="pp" x="76" y="110" width="148" height="88"/>
    <rect class="pp" x="134" y="138" width="34" height="60" rx="4"/><rect class="pp" x="90" y="128" width="32" height="30"/><rect class="pp" x="180" y="128" width="32" height="30"/>`},
  žuvis: {ico:'🐟', svg:`<rect class="pp" x="4" y="4" width="292" height="232" rx="16"/><polygon class="pp" points="30,236 42,190 34,160 46,128 58,160 50,190 62,236"/>
    <circle class="pp" cx="58" cy="62" r="10"/><circle class="pp" cx="76" cy="36" r="6"/>
    <polygon class="pp" points="214,122 272,78 262,122 272,166"/><polygon class="pp" points="118,78 150,40 176,76"/>
    <ellipse class="pp" cx="142" cy="122" rx="82" ry="52"/><path class="pp" d="M150 72 Q172 122 150 172 L172 170 Q192 122 172 74 Z"/>
    <circle class="pp" cx="96" cy="110" r="12"/><circle cx="93" cy="108" r="5" style="fill:#17352A"/>
    <path d="M64 130 Q72 136 80 130" style="fill:none;stroke:#17352A;stroke-width:4;stroke-linecap:round"/>`},
  gėlė: {ico:'🌸', svg:`<rect class="pp" x="4" y="4" width="292" height="232" rx="16"/><circle class="pp" cx="252" cy="50" r="22"/>
    <rect class="pp" x="145" y="108" width="10" height="96"/>
    <ellipse class="pp" cx="122" cy="160" rx="26" ry="12" transform="rotate(-25 122 160)"/><ellipse class="pp" cx="178" cy="150" rx="26" ry="12" transform="rotate(25 178 150)"/>
    <circle class="pp" cx="184" cy="88" r="24"/><circle class="pp" cx="167" cy="117" r="24"/><circle class="pp" cx="133" cy="117" r="24"/>
    <circle class="pp" cx="116" cy="88" r="24"/><circle class="pp" cx="133" cy="59" r="24"/><circle class="pp" cx="167" cy="59" r="24"/>
    <circle class="pp" cx="150" cy="88" r="22"/><polygon class="pp" points="106,202 194,202 182,236 118,236"/><rect class="pp" x="98" y="192" width="104" height="16" rx="4"/>`}
};
function paintGame(which) {
  const cols = CATS.spalvos.items; let sel = cols[0];
  let target = pick(cols.slice(1));
  show(`${gameBar('paint')}
    <div class="dtabs">${Object.entries(DRAWINGS).map(([k, d]) => `<button class="dtab" data-d="${k}" aria-pressed="${k === which}" ${say(k, '')}>${d.ico}</button>`).join('')}</div>
    <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>Rask spalvą · Find the colour</small><span id="tword">${target[1]}</span></div></div>
    <div class="palette">${cols.map((c, i) => `<button class="pal" data-i="${i}" style="background:${c[0]}" aria-label="${c[2]}" aria-pressed="${i === 0}"></button>`).join('')}</div>
    <div class="paintbox"><svg viewBox="0 0 300 240" role="img" aria-label="${which}">${DRAWINGS[which].svg}</svg></div>
    <p class="tip">Tap a colour, then tap parts of the picture to paint them.</p>`);
  sayAfter(UI.findColor[0], target[1]);
  $('#sayQ').onclick = () => speak(UI.findColor[0], target[1]);
  screen.querySelectorAll('.dtab').forEach(b => b.onclick = () => paintGame(b.dataset.d));
  screen.querySelectorAll('.pal').forEach(b => b.onclick = () => {
    sel = cols[b.dataset.i];
    screen.querySelectorAll('.pal').forEach(x => x.setAttribute('aria-pressed', x === b));
    if (sel === target) {
      b.classList.remove('ok'); void b.offsetWidth; b.classList.add('ok');
      const pr = pick(PRAISE); speak(sel[1], pr[0]); addStars(1);
      target = pick(cols.filter(c => c !== target)); $('#tword').textContent = target[1];
      sayAfter(UI.findColor[0], target[1]);
    } else speak(sel[1]);
  });
  screen.querySelectorAll('.pp').forEach(p => p.addEventListener('click', () => { p.style.fill = sel[0]; speak(sel[1]); }));
}
