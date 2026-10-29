function feelGame() {
  quizRounds({id: 'feel', total: 8, build: () => {
    const t = pick(FEELINGS), opts = shuffle([t, ...shuffle(FEELINGS.filter(f => f !== t)).slice(0, 2)]);
    return {top: `<div class="prompt"><span class="bigpic emo">${t[0]}</span><div class="q"><small>How does he feel?</small>Kaip jis jaučiasi?</div>${sayBtn}</div>`,
      opts, intro: [UI3.feel[0]], optsClass: 'words3', btnClass: 'wordbtn',
      optHTML: o => `${o[1]}<small class="sub">${o[2]}</small>`, label: o => o[2], isOk: o => o === t, track: t[1],
      okSay: o => [o[1]], noSay: o => [o[1]]};
  }});
}
