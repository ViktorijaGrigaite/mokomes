function callGame() {
  show(`${gameBar('call')}<div class="phone ringing"><span class="emo gm">👵</span><b>Močiutė</b><small>Skambina… · Calling…</small>
      <button class="btn" id="answer" ${sayUI3('answer')}>📞 Atsiliepti</button></div>`);
  sayAfter(UI3.calling[0]);
  $('#answer').onclick = () => callTurn(0, []);
}
function callTurn(i, log) {
  if (i >= CALL.length) {
    addStars(2); burst(14);
    show(`${gameBar('call')}<div class="phone"><span class="emo gm">👵</span><b>Močiutė</b><div class="chat">${log.join('')}</div></div>
      <div class="row"><button class="btn" id="again" ${sayUI('again')}>🔁 Dar kartą</button><button class="btn alt" id="goHome" ${sayUI('home')}>🏠 Namo</button></div>`);
    sayAfter(UI.hooray[0]); $('#again').onclick = callGame; $('#goHome').onclick = () => home(true); return;
  }
  const T = CALL[i]; const opts = shuffle([T.ok, ...T.no]); let lock = false;
  log = [...log, `<p class="msg gm-msg" ${say(T.g, T.en)}><span class="emo">👵</span>${T.g}<small>${T.en}</small></p>`];
  show(`${gameBar('call')}<div class="phone"><span class="emo gm small">👵</span><div class="chat" id="chat">${log.join('')}</div></div>
    <p class="tip" ${sayUI3('whatSay')}>Ką pasakysi? · What will you say? Tap to hear, tap again to send.</p>
    <div class="replies">${opts.map((o, k) => `<button class="reply" data-k="${k}">${o[0]}<small>${o[1]}</small></button>`).join('')}</div>`);
  const chat = $('#chat'); chat.scrollTop = chat.scrollHeight;
  sayAfter(T.g);
  let armed = -1;
  screen.querySelectorAll('.reply').forEach(b => b.onclick = () => {
    if (lock) return; const k = +b.dataset.k, o = opts[k];
    if (armed !== k) { armed = k; screen.querySelectorAll('.reply').forEach(x => x.classList.toggle('armed', x === b)); speak(o[0]); return; }
    if (o === T.ok) {
      lock = true; b.classList.add('ok'); addStars(1);
      speak(o[0]); later(() => callTurn(i + 1, [...log, `<p class="msg me-msg">${o[0]}</p>`]), 1500);
    } else { shake(b); armed = -1; speak('Cha cha!', TRY[0]); }
  });
}
