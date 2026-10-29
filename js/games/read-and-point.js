function readGame() {
  const pool = BUILD;
  quizRounds({id: 'read', total: 8, build: (rd) => {
    const t = pick(pool), opts = shuffle([t, ...shuffle(pool.filter(x => x !== t && x[1][0] !== t[1][0])).slice(0, 2)]);
    return {top: `<div class="prompt"><div class="q"><small>Perskaityk ir parodyk · Read and point</small><span class="readword">${t[1].toLocaleUpperCase('lt')}</span></div></div>`,
      opts, intro: rd === 0 ? [UI3.read[0]] : null, optHTML: o => pic1(o[0]), label: o => o[2], isOk: o => o === t, track: t[1],
      okSay: o => [o[1]], noSay: o => [o[1]]};
  }});
}
