function rhymeGame() {
  const all = RHYMES.flat();
  quizRounds({id: 'rhyme', total: 8, build: () => {
    const set = pick(RHYMES), [a, b] = shuffle(set);
    const opts = shuffle([b, ...shuffle(all.filter(x => !set.includes(x))).slice(0, 2)]);
    return {top: `<div class="prompt"><span class="bigpic emo">${a[0]}</span><div class="q"><small>What rhymes with…?</small>${a[1]}</div>${sayBtn}</div>`,
      opts, intro: [UI3.rhyme[0], a[1]], optHTML: o => pic1(o[0]), label: o => o[1], isOk: o => o === b, track: a[1],
      okSay: o => [a[1], o[1]], noSay: o => [a[1], o[1]], wait: 2000};
  }});
}
