function soundsLearn() {
  show(`${gameBar('sounds')}<p class="tip">Paliesk ir klausyk · Tap an animal to hear it</p>
    <div class="learn">${SOUNDS.map((s, i) => `<button class="wcard" data-i="${i}"><span class="pic">${pic1(s[0])}</span><b>${s[2]}!</b><span class="en">${s[1].toLowerCase()}</span></button>`).join('')}</div>
    <div class="row"><button class="btn" id="play" ${sayUI('play')}>🎯 Žaisti!</button></div>`);
  screen.querySelectorAll('.wcard').forEach(b => b.onclick = () => { const s = SOUNDS[b.dataset.i]; speak(`${s[1]} sako: ${s[2]}!`); });
  $('#play').onclick = soundsGame;
}
function soundsGame() {
  quizRounds({id: 'sounds', total: 8, back: 'sounds', build: () => {
    const t = pick(SOUNDS), opts = shuffle([t, ...shuffle(SOUNDS.filter(s => s !== t)).slice(0, 2)]);
    return {top: promptHTML('Who says…?', `${t[2]}!`), opts, intro: [`Kas sako: ${t[2]}?`],
      optHTML: o => pic1(o[0]), label: o => o[1], isOk: o => o === t, track: t[1].toLowerCase(),
      okSay: o => [`${o[1]} sako: ${o[2]}!`], noSay: o => [`${o[1]} sako: ${o[2]}!`], wait: 2300};
  }});
}
