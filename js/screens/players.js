function whoPlays(manage = false) {
  if (!profiles.length) return register();
  show(`<div class="hello"><h2 ${sayUI('who')}>Kas žaidžia?</h2><p>Who’s playing? Tap your picture.</p></div>
    <div class="players">${profiles.map(p => { const a = avInfo(p.avatar); return `<div class="player">
        <button class="tile" style="--c:${p.id === currentId ? 'var(--green)' : 'var(--line)'}" data-p="${p.id}" ${a[1] ? say(a[1], a[2]) : sayUI('hello')}>
          <span class="ico emo">${p.avatar}</span><span class="lt">${esc(p.name)}</span><span class="en">⭐ ${p.stars}</span></button>
        ${manage ? `<div class="tools"><button data-edit="${p.id}" ${sayUI('edit')}>✏️ Keisti</button><button class="danger" data-del="${p.id}" ${sayUI('del')}>Ištrinti</button></div>` : ''}
      </div>`; }).join('')}
      <div class="player"><button class="tile add" id="addP" ${sayUI('newp')}><span class="ico emo">➕</span><span class="lt">Naujas žaidėjas</span><span class="en">New player</span></button></div>
    </div>
    <button class="linkbtn" id="manage" ${manage ? sayUI('done') : sayUI('edit')}>${manage ? 'Baigta · Done' : 'Keisti ar ištrinti žaidėjus · Edit or remove players'}</button>`);
  screen.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    currentId = b.dataset.p; saveProfiles(); renderStars(); home(true);
  });
  $('#addP').onclick = () => register();
  $('#manage').onclick = () => whoPlays(!manage);
  screen.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => register(b.dataset.edit));
  screen.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    if (!b.classList.contains('sure')) {
      b.classList.add('sure'); b.textContent = 'Tikrai? · Sure?';
      b.dataset.say = UI.sure.join('|');
      setTimeout(() => speak(UI.sure[0], en(UI.sure[1])), 0);
      return;
    }
    profiles = profiles.filter(p => p.id !== b.dataset.del);
    if (currentId === b.dataset.del) currentId = null;
    saveProfiles(); renderStars(); whoPlays(true);
  });
}

function register(editId) {
  const editing = profiles.find(p => p.id === editId);
  const used = new Set(profiles.filter(p => p !== editing).map(p => p.avatar));
  let avatar = editing ? editing.avatar : ((AVATARS.find(a => !used.has(a[0])) || AVATARS[0])[0]);
  const first = !profiles.length;
  show(`${first ? `<div class="hello"><h2 ${sayUI('hello')}>Labas! 👋</h2><p>Let’s make a player profile. Each child gets their own stars.</p></div>`
                : bar(editing ? 'Keisti žaidėją' : 'Naujas žaidėjas', 'who', editing ? sayUI('edit') : sayUI('newp'))}
    <form class="form" id="regForm" novalidate>
      <div class="preview"><span class="emo" id="pvAv">${avatar}</span><b id="pvName">${editing ? esc(editing.name) : '…'}</b></div>
      <div class="field">
        <label for="regName" ${sayUI('name')}>Vardas <small>Name</small></label>
        <input id="regName" name="regName" maxlength="20" autocomplete="off" autocapitalize="words" value="${editing ? esc(editing.name) : ''}" placeholder="pvz. Ema">
        <p class="err" id="regErr" hidden>Įrašyk vardą · Please type a name</p>
      </div>
      <div class="field">
        <span class="lbl" ${sayUI('pickAv')}>Pasirink gyvūną <small>Pick an animal</small></span>
        <div class="avs" role="group" aria-label="Avatar">${AVATARS.map(a => `<button type="button" class="av" data-av="${a[0]}" aria-pressed="${a[0] === avatar}" aria-label="${a[2]}" ${say(a[1], a[2])}>${a[0]}</button>`).join('')}</div>
      </div>
      <div class="row">
        <button class="btn" type="submit" ${editing ? sayUI('save') : sayUI('start')}>${editing ? '💾 Išsaugoti' : '✅ Pradėti!'}</button>
        ${first ? '' : `<button class="btn alt" type="button" id="regCancel" ${sayUI('cancel')}>Atšaukti</button>`}
      </div>
    </form>`);
  const input = $('#regName');
  input.oninput = () => { $('#pvName').textContent = input.value.trim() || '…'; $('#regErr').hidden = true; };
  screen.querySelectorAll('.av').forEach(b => b.onclick = () => {
    avatar = b.dataset.av;
    screen.querySelectorAll('.av').forEach(x => x.setAttribute('aria-pressed', x === b));
    const pv = $('#pvAv'); pv.textContent = avatar; pv.style.animation = 'none'; void pv.offsetWidth; pv.style.animation = '';
  });
  if ($('#regCancel')) $('#regCancel').onclick = () => whoPlays();
  $('#regForm').onsubmit = e => {
    e.preventDefault();
    const name = input.value.trim().replace(/\s+/g, ' ');
    if (!name) { $('#regErr').hidden = false; input.focus(); speak(UI.name[0], en('Please type a name')); return; }
    if (editing) { editing.name = name; editing.avatar = avatar; }
    else {
      const legacy = first ? store.get('mokausi.stars', 0) : 0; // keep stars earned before profiles existed
      const p = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, avatar, stars: legacy, created: new Date().toISOString() };
      profiles.push(p); currentId = p.id;
      if (first) store.set('mokausi.stars', 0);
    }
    saveProfiles(); renderStars(); burst(8); sayAfter(UI.hooray[0], en(UI.hooray[1]));
    editing ? whoPlays(true) : home(true);
  };
  if (!editing) setTimeout(() => input.focus(), 50);
}
