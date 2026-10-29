const storyWords = s => s.split(/\s+/).map(w => w.replace(/[.,!?]/g, '')).filter(Boolean);
function storyList() {
  show(`${gameBar('story')}<p class="tip">Pasirink pasakėlę · Pick a story</p>
    <div class="tiles">${STORIES.map((s, i) => `<button class="tile" data-s="${i}" ${say(s.title, s.en)}><span class="ico emo">${s.ico}</span><span class="lt">${s.title}</span><span class="en">${s.en}</span></button>`).join('')}</div>`);
  screen.querySelectorAll('[data-s]').forEach(b => b.onclick = () => storyPage(+b.dataset.s, 0));
}
function storyPage(si, pi) {
  const S = STORIES[si];
  if (pi >= S.pages.length) return storyQuestion(si);
  const [art, text, enT] = S.pages[pi];
  show(`${bar(S.title, 'story', say(S.title, S.en))}${progBar(pi, S.pages.length + 1)}
    <div class="move storypage"><span class="pic emo scene">${art}</span>
      <p class="sentence">${text.split(/\s+/).map(w => `<button class="word" data-w="${esc(w.replace(/[.,!?]/g, ''))}">${esc(w)}</button>`).join(' ')}</p>
      <span class="en">${enT}</span><button class="say" id="sayS" aria-label="Skaityk">🔊</button></div>
    <div class="row">${pi > 0 ? '<button class="btn alt" id="prev" aria-label="Atgal">←</button>' : ''}<button class="btn" id="next" aria-label="Pirmyn">➡️ Toliau</button></div>
    <p class="tip">Tap any word to hear it.</p>`);
  sayAfter(text); $('#sayS').onclick = () => speak(text);
  screen.querySelectorAll('.word').forEach(b => b.onclick = () => speak(b.dataset.w));
  if ($('#prev')) $('#prev').onclick = () => storyPage(si, pi - 1);
  $('#next').onclick = () => storyPage(si, pi + 1);
}
function storyQuestion(si) {
  const S = STORIES[si]; let lock = false;
  show(`${bar(S.title, 'story', say(S.title, S.en))}${progBar(S.pages.length, S.pages.length + 1)}
    <div class="prompt"><button class="say" id="sayQ" aria-label="Klausyk">🔊</button><div class="q"><small>${S.q[1]}</small>${S.q[0]}</div></div>
    <div class="opts">${S.opts.map((o, i) => `<button class="opt" data-i="${i}">${pic1(o[0])}</button>`).join('')}</div>`);
  sayAfter(S.q[0]); $('#sayQ').onclick = () => speak(S.q[0]);
  screen.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    if (lock) return; const i = +b.dataset.i;
    if (i === S.ans) { lock = true; b.classList.add('ok'); speak(S.opts[i][1], pick(PRAISE)[0]); addStars(2); later(() => finish(2, () => storyPage(si, 0), 'story'), 1600); }
    else { shake(b); speak(S.opts[i][1], TRY[0]); }
  });
}
