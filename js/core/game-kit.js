const STICKER_STEP = 5;
const STICKERS = [...CATS.gyvunai.items.map(i => [i[0], i[1], i[2]]),
  ...AVATARS.filter(a => !CATS.gyvunai.items.some(i => i[1] === a[1]))];
const BAL_COLORS = ['#E53935','#1E63D6','#FDB913','#43A047','#8E24AA','#FB8C00','#F06292'];
const reduceMotion = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
const progBar = (n, total) => `<div class="prog"><i style="width:${Math.round(n / total * 100)}%"></i></div>`;
const gameBar = (id, back) => { const g = GAMES.find(x => x.id === id); return bar(g.lt, back || 'home', say(g.lt, g.en)); };

function stickerToast(s) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('button');
  t.className = 'toast'; t.innerHTML = `<span class="emo">${s[0]}</span>Naujas lipdukas!`;
  t.onclick = () => { t.remove(); stickerBook(); };
  document.body.appendChild(t); burst(10);
  sayAfter(UI.newSticker[0], s[1]);
  setTimeout(() => t.remove(), 4500);
}

const pic1 = e => `<span class="emo">${e}</span>`;
const wordPool = () => ['gyvunai','maistas','gamta','seima','kunas'].flatMap(k => CATS[k].items).filter(it => !it[1].includes(' '));
function sylCount(w) {
  let s = w.toLowerCase().replace(/i(?=[aąeęėouųū])/g, '');
  s = s.replace(/ai|au|ei|ui|uo|ie/g, 'A');
  return (s.match(/[aąeęėiįyouųūA]/g) || []).length;
}
function shake(el) { el.classList.remove('no'); void el.offsetWidth; el.classList.add('no'); }

const sayUI3 = k => say(UI3[k][0], UI3[k][1]);
const COLOR_HEX = Object.fromEntries(CATS.spalvos.items.map(c => [c[1], c[0]])); COLOR_HEX.pilka = '#9E9E9E';
const flagHTML = () => '<span class="bigflag" aria-label="flag"><i></i><i></i><i></i></span>';
const symPic = s => s[0] === 'FLAG' ? flagHTML() : pic1(s[0]);

// generic quiz: prompt + options; ok(opt) decides; onOk / onNo speak
function quizRounds({id, total, back, build}) {
  let round = 0, earned = 0;
  const again = () => quizRounds({id, total, back, build});
  function next() {
    if (round >= total) return finish(earned, again, back || 'home');
    const r = build(round); let lock = false;
    show(`${r.barHTML || gameBar(id)}${progBar(round, total)}${r.top}
      <div class="${r.optsClass || 'opts'}">${r.opts.map((o, i) => `<button class="${r.btnClass || 'opt'}" data-i="${i}" aria-label="${esc(r.label ? r.label(o) : '')}">${r.optHTML(o)}</button>`).join('')}</div>${r.after || ''}`);
    if (r.intro) sayAfter(...r.intro);
    if ($('#sayQ')) $('#sayQ').onclick = () => speak(...r.intro);
    screen.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
      if (lock) return; const o = r.opts[b.dataset.i];
      if (r.isOk(o)) { lock = true; b.classList.add('ok'); r.track && track(r.track, true); speak(...r.okSay(o), pick(PRAISE)[0]); addStars(1); earned++; round++; later(next, r.wait || 1900); }
      else { shake(b); r.track && track(r.track, false); speak(...r.noSay(o), TRY[0]); }
    });
  }
  next();
}
const sayBtn = '<button class="say" id="sayQ" aria-label="Klausyk">🔊</button>';
const promptHTML = (small, big, extra) => `<div class="prompt">${sayBtn}<div class="q"><small>${small}</small>${big}</div>${extra || ''}</div>`;
