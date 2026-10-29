function stickerBook() {
  const p = cur(); if (!p) return whoPlays();
  const got = Math.min(STICKERS.length, Math.floor(p.stars / STICKER_STEP));
  const toNext = got >= STICKERS.length ? 0 : STICKER_STEP - (p.stars % STICKER_STEP);
  show(`${bar('Lipdukų albumas', 'home', sayUI('stickers'))}
    <p class="tip" style="text-align:left">${got} of ${STICKERS.length} stickers · ${toNext ? `next one in ${toNext} ⭐` : 'all collected!'} Every ${STICKER_STEP} stars unlocks a new sticker.</p>
    <div class="album">${STICKERS.map((s, i) => i < got
      ? `<button class="stk" ${say(s[1], s[2])}><span class="emo">${s[0]}</span><small>${s[1]}</small></button>`
      : `<div class="stk locked"><span class="q">?</span><small>⭐ ${(i + 1) * STICKER_STEP}</small></div>`).join('')}</div>`);
  screen.querySelectorAll('button.stk').forEach(b => b.onclick = () => { b.classList.remove('talk'); void b.offsetWidth; b.classList.add('talk'); });
}
