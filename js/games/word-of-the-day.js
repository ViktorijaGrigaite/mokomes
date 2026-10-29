const ALLW = Object.entries(CATS).flatMap(([k, c]) => c.items.map(it => [k, it]));
const dateKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayNum = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
const wordFor = d => ALLW[(dayNum(d) * 37) % ALLW.length];
const DOW = ['Sk','Pr','An','Tr','Kt','Pn','Št'];
function dailyGame() {
  const p = cur(); p.daily = p.daily || [];
  const now = new Date(), today = dateKey(now), [cat, it] = wordFor(now);
  const learned = p.daily.includes(today);
  let streak = 0; const d = new Date(now);
  if (!learned) d.setDate(d.getDate() - 1);
  while (p.daily.includes(dateKey(d))) { streak++; d.setDate(d.getDate() - 1); }
  const days = [...Array(7)].map((_, k) => { const x = new Date(now); x.setDate(now.getDate() - 6 + k); return x; });
  show(`${gameBar('daily')}
    <div class="move"><span class="pic ${cat === 'spalvos' ? '' : 'emo'}" ${say(it[1], it[2])}>${picHTML(cat, it)}</span><span class="cmd" ${say(it[1], it[2])}>${it[1]}</span><span class="en">${it[2]}</span>
      <button class="say" aria-label="Klausyk" ${say(it[1], it[2])}>🔊</button></div>
    <div class="row">${learned ? '<span class="streak">✅ <small>Done for today. Come back tomorrow!</small></span>' : `<button class="btn" id="learn" ${sayUI('learned')}>✅ Išmokau!</button>`}</div>
    <div class="streak">🔥 ${streak} <small>${streak === 1 ? 'day' : 'days'} in a row</small></div>
    <div class="days">${days.map(x => { const k = dateKey(x), [c2, i2] = wordFor(x), got = p.daily.includes(k);
      return `<button class="day${got ? ' got' : ''}${k === today ? ' today' : ''}" ${got ? say(i2[1], i2[2]) : ''} aria-label="${k}"><span>${DOW[x.getDay()]}</span><span class="d ${c2 === 'spalvos' ? '' : 'emo'}">${got ? picHTML(c2, i2) : '<i class="dot"></i>'}</span></button>`; }).join('')}</div>
    <p class="tip">A new word every day. Learn it 7 days in a row for 5 bonus stars.</p>`);
  sayAfter(it[1]);
  if (!learned) $('#learn').onclick = () => {
    p.daily.push(today); p.daily = p.daily.slice(-90); saveProfiles();
    addStars(1);
    if ((streak + 1) % 7 === 0) { addStars(5); burst(18); sayAfter(UI.hooray[0]); } else { const pr = pick(PRAISE); sayAfter(pr[0]); }
    later(dailyGame, 1200);
  };
}
