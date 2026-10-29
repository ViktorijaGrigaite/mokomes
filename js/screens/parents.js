function track(word, ok) {
  const p = cur(); if (!p || !word) return;
  p.words = p.words || {}; const w = p.words[word] || [0, 0];
  w[ok ? 0 : 1]++; p.words[word] = w; saveProfiles();
}
let lastActive = Date.now();
document.addEventListener('pointerdown', () => { lastActive = Date.now(); }, true);
setInterval(() => {
  const p = cur(); if (!p || document.hidden || Date.now() - lastActive > 120000) return;
  p.mins = p.mins || {}; const k = dateKey(new Date()); p.mins[k] = (p.mins[k] || 0) + 1;
  const keys = Object.keys(p.mins).sort(); while (keys.length > 60) delete p.mins[keys.shift()];
  saveProfiles();
}, 60000);
function countPlay(id) { const p = cur(); if (!p) return; p.games = p.games || {}; p.games[id] = (p.games[id] || 0) + 1; saveProfiles(); }

function parentPage() {
  const p = cur(); if (!p) return whoPlays();
  const words = Object.entries(p.words || {});
  const known = words.filter(([, [ok, no]]) => ok >= 2 && ok > no).map(([w]) => w).sort((a, b) => a.localeCompare(b, 'lt'));
  const practice = words.filter(([, [ok, no]]) => no > 0 && no >= ok).sort((a, b) => b[1][1] - a[1][1]).slice(0, 12);
  const days = [...Array(7)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 6 + k); return d; });
  const mins = days.map(d => (p.mins || {})[dateKey(d)] || 0); const maxM = Math.max(10, ...mins);
  const total7 = mins.reduce((a, b) => a + b, 0);
  const games = Object.entries(p.games || {}).filter(([id]) => !['stickers','parents'].includes(id)).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const gName = id => (GAMES.find(g => g.id === id) || {}).lt || id;
  const streak = (() => { let s = 0; const d = new Date(); if (!(p.daily || []).includes(dateKey(d))) d.setDate(d.getDate() - 1); while ((p.daily || []).includes(dateKey(d))) { s++; d.setDate(d.getDate() - 1); } return s; })();
  show(`${bar('Tėvams', 'home', sayUI3('parents'))}<p class="tip">For parents: how ${esc(p.name)} is doing. Saved on this device only.</p>
    <div class="pstats">
      <div class="pstat"><b>${p.stars}</b><small>stars</small></div>
      <div class="pstat"><b>${known.length}</b><small>words known</small></div>
      <div class="pstat"><b>${total7}</b><small>minutes this week</small></div>
      <div class="pstat"><b>${streak}</b><small>word-of-the-day streak</small></div>
    </div>
    <section class="pcard"><h3>Minutes played, last 7 days</h3>
      <div class="pbars">${days.map((d, i) => `<div class="pbar"><span class="v">${mins[i] || ''}</span><i style="height:${Math.round(mins[i] / maxM * 100)}%"></i><small>${DOW[d.getDay()]}</small></div>`).join('')}</div></section>
    <section class="pcard"><h3>Words to practise</h3><p class="pnote">Missed at least as often as answered right. Tap to hear.</p>
      <div class="chips">${practice.length ? practice.map(([w, [ok, no]]) => `<button class="chip warn" ${say(w, '')}>${esc(w)} <small>✗${no} ✓${ok}</small></button>`).join('') : '<span class="pnote">Nothing yet. Words appear here after a few games.</span>'}</div></section>
    <section class="pcard"><h3>Words ${esc(p.name)} knows</h3><p class="pnote">Answered right at least twice, and more often right than wrong.</p>
      <div class="chips">${known.length ? known.map(w => `<button class="chip" ${say(w, '')}>${esc(w)}</button>`).join('') : '<span class="pnote">Play a few rounds and the list will start to fill.</span>'}</div></section>
    <section class="pcard"><h3>Favourite games</h3>
      ${games.length ? `<ol class="pgames">${games.map(([id, n]) => `<li><span>${gName(id)}</span><b>${n}×</b></li>`).join('')}</ol>` : '<p class="pnote">No games played yet.</p>'}</section>`);
}
