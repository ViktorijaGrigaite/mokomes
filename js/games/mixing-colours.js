function mixGame() {
  const colours = [...new Set(MIXES.flat())];
  quizRounds({id: 'mix', total: 6, build: () => {
    const [a, b, c] = pick(MIXES);
    const opts = shuffle([c, ...shuffle(colours.filter(x => x !== c && x !== a && x !== b)).slice(0, 2)]);
    return {top: `<div class="prompt mixer"><span class="pot" style="--p:${COLOR_HEX[a]}" ${say(a, '')}></span><b>+</b><span class="pot" style="--p:${COLOR_HEX[b]}" ${say(b, '')}></span><b>=</b><span class="pot q" id="res">?</span>${sayBtn}</div>`,
      opts, intro: [a, UI3.and[0], b, UI3.mixQ[0]],
      optHTML: o => `<span class="swatch" style="background:${COLOR_HEX[o]}"></span>`, label: o => o, isOk: o => o === c, track: c,
      okSay: o => { const r = $('#res'); if (r) { r.style.setProperty('--p', COLOR_HEX[o]); r.textContent = ''; r.classList.remove('q'); } return [a, UI3.and[0], b, o]; },
      noSay: o => [o], wait: 2600};
  }});
}
