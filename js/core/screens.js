let screenGen = 0;
function show(html) { screenGen++; document.body.classList.remove('is-home'); screen.innerHTML = html; window.scrollTo(0, 0); fitBand(); requestAnimationFrame(fitBand); }
// the blue band ends just below the screen's title, so the first card overlaps its edge
function fitBand() {
  const top = screen.querySelector('.hello, .bar'); if (!top) return;
  let el = top; const nx = top.nextElementSibling;
  if (nx && nx.classList.contains('tip')) el = nx;
  const bottom = el.getBoundingClientRect().bottom + window.scrollY;
  document.body.style.setProperty('--band', Math.round(bottom + (top.classList.contains('hello') ? 52 : 40)) + 'px');
}
window.addEventListener('resize', fitBand);
try { document.fonts && document.fonts.ready.then(fitBand); } catch (e) {}
// run fn later only if the player is still on the same screen
function later(fn, ms) { const g = screenGen; setTimeout(() => { if (g === screenGen) fn(); }, ms); }
function bar(title, backTo, titleSay) {
  return `<div class="bar"><button class="back" data-back="${backTo || 'home'}" ${sayUI('back')}>← Atgal</button><h2 ${titleSay || ''}>${title}</h2></div>`;
}
screen.addEventListener('click', e => {
  const b = e.target.closest('[data-back]'); if (!b) return;
  const t = b.dataset.back;
  if (t === 'home') home(true); else if (t === 'who') whoPlays(); else if (t.startsWith('learn:')) learnView(t.slice(6)); else if (t === 'match') catPicker('match'); else if (t === 'memory') catPicker('memory'); else if (t === 'balloons') catPicker('balloons'); else if (t === 'opp') oppLearn(); else if (t === 'story') storyList(); else if (t === 'sounds') soundsLearn(); else if (t === 'symbols') symbolsLearn();
});
$('#homeBtn').onclick = () => home(true);
$('#who').onclick = () => whoPlays();
