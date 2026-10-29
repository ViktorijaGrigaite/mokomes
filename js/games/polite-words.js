function politeGame() {
  const words = POLITE.map(p => p[3]);
  quizRounds({id: 'polite', total: 8, build: () => {
    const t = pick(POLITE), opts = shuffle([t[3], ...shuffle(words.filter(w => w !== t[3])).slice(0, 2)]);
    return {top: `<div class="move"><span class="pic emo">${t[0]}</span><span class="cmd" ${say(t[1], t[2])}>${t[1]}</span><span class="en">${t[2]}</span>${sayBtn}</div>`,
      opts, intro: [t[1], UI3.whatSay[0]], optsClass: 'replies', btnClass: 'reply',
      optHTML: o => `${o}<small>${POLITE_EN[o]}</small>`, label: o => POLITE_EN[o], isOk: o => o === t[3], track: t[3],
      okSay: o => [o], noSay: o => [o], wait: 1800};
  }});
}
