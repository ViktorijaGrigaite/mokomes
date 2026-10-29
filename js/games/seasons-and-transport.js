function sortGame(id, items, bins, ask, wordQ) {
  quizRounds({id, total: 8, build: () => {
    const t = pick(items);
    return {top: `${promptHTML(ask[1], wordQ ? t[1] : ask[0])}<div class="move"><span class="pic emo">${t[0]}</span><b class="cmd">${wordQ ? '' : t[1]}</b></div>`,
      opts: bins.map((b, i) => [...b, i]), intro: wordQ ? [ask[0] + ' ' + t[1] + '?'] : [t[1], ask[0]],
      optsClass: bins.length === 4 ? 'words4' : 'words3', btnClass: 'wordbtn home3',
      optHTML: o => `<span class="emo">${o[0]}</span><span>${o[1].replace('!', '')}</span><small>${o[2]}</small>`, label: o => o[2],
      isOk: o => o[3] === t[2], track: t[1], okSay: o => [o[1]], noSay: o => [o[1]]};
  }});
}
const seasonsGame = () => sortGame('seasons', SEASON_ITEMS, SEASONS, UI3.when, false);
const transportGame = () => sortGame('transport', TRANSPORT, TRANSPORT_BINS, UI3.travel, true);
