function placesGame() {
  quizRounds({id: 'places', total: 8, build: () => {
    const a = pick(PLACE_ANIMALS), t = pick(PLACES), phrase = `${a[1]} ${t[1]}.`;
    return {top: promptHTML('Where is it?', phrase), opts: shuffle(PLACES), intro: [phrase], optsClass: 'opts',
      optHTML: o => `<span class="scene3 ${o[0]}"><span class="box emo">📦</span><span class="pet emo">${a[0]}</span></span>`,
      label: o => o[2], isOk: o => o === t, track: t[1], okSay: () => [phrase], noSay: o => [`${a[1]} ${o[1]}.`], wait: 2000};
  }});
}
