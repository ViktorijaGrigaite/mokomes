// Lists every Lithuanian phrase the app can say, by reading the data files.
// Usage: node tools/collect-phrases.js > tools/phrases.json
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const files = ['vocabulary', 'ui-text', 'menu', 'activities', 'stories'].map(f => path.join(root, 'js/data', f + '.js'));
const code = files.map(f => fs.readFileSync(f, 'utf8')).join('\n');
const d = new Function(code + `;return {CATS, ABC, NUMS, MOVES, PRAISE, TRY, GAMES, AVATARS, UI, UI2, UI3, GROUPS, TREASURE,
  WEATHER, HOMES, LIVES, PRICES, OPPOSITES, PLURALS, ROUTINE, STORIES, SOUNDS, CALL, POLITE, FEELINGS, SYMBOLS,
  SEASONS, SEASON_ITEMS, PLACES, PLACE_ANIMALS, TRANSPORT_BINS, TRANSPORT, RHYMES, MIXES};`)();

const P = new Set();
const add = (...xs) => xs.forEach(x => x && P.add(x));
const words = s => s.split(/\s+/).map(w => w.replace(/[.,!?]/g, '')).filter(Boolean);

// fixed app phrases
add('Mokausi lietuviškai', 'Žvaigždutės', 'Cha cha!', d.TRY[0], ...d.PRAISE.map(p => p[0]), ...d.NUMS);
[d.UI, d.UI2, d.UI3].forEach(ui => Object.values(ui).forEach(u => add(u[0])));
d.GAMES.forEach(g => add(g.lt)); d.GROUPS.forEach(g => add(g[1])); d.AVATARS.forEach(a => add(a[1]));
// topics: each word plus "Kur yra …?"
Object.values(d.CATS).forEach(c => { add(c.lt); c.items.forEach(it => add(it[1], `Kur yra ${it[1]}?`)); });
d.ABC.forEach(a => add(a[0], a[1]));
d.MOVES.forEach(m => add(m[1])); d.TREASURE.forEach(t => add(t[1]));
// third set of games
d.WEATHER.forEach(w => add(w.lt)); d.HOMES.forEach(h => add(h[1]));
d.LIVES.forEach(l => add(l[1], `${d.UI2.live[0]} ${l[1]}?`));
add(...d.PRICES); d.OPPOSITES.flat().forEach(x => add(x[1]));
d.PLURALS.forEach(p => add(p[1], p[2])); d.ROUTINE.forEach(r => add(r[1]));
d.STORIES.forEach(s => { add(s.title, s.q[0]); s.opts.forEach(o => add(o[1])); s.pages.forEach(pg => add(pg[1], ...words(pg[1]))); });
// fourth set of games
d.SOUNDS.forEach(x => add(`${x[1]} sako: ${x[2]}!`, `Kas sako: ${x[2]}?`));
d.CALL.forEach(c => add(c.g, c.ok[0], ...c.no.map(n => n[0])));
d.POLITE.forEach(x => add(x[1], x[3])); d.FEELINGS.forEach(f => add(f[1]));
d.SYMBOLS.forEach(x => add(x[1], x[3], `${d.UI3.whereIs[0]} ${x[1]}?`));
d.SEASONS.forEach(x => add(x[1])); d.SEASON_ITEMS.forEach(x => add(x[1]));
d.PLACE_ANIMALS.forEach(a => d.PLACES.forEach(pl => add(`${a[1]} ${pl[1]}.`)));
d.TRANSPORT_BINS.forEach(x => add(x[1])); d.TRANSPORT.forEach(x => add(x[1], `${d.UI3.travel[0]} ${x[1]}?`));
d.RHYMES.flat().forEach(x => add(x[1])); d.MIXES.flat().forEach(x => add(x));

console.log(JSON.stringify([...P].sort((a, b) => a.localeCompare(b, 'lt')), null, 1));
