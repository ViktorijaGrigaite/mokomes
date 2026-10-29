function renderStars() {
  const p = cur();
  $('#starN').textContent = p ? p.stars : 0;
  $('#who').hidden = !p;
  if (p) { $('#whoAv').textContent = p.avatar; $('#whoName').textContent = p.name; }
}
function addStars(n) {
  const p = cur(); if (!p) return;
  const before = Math.floor(p.stars / STICKER_STEP);
  p.stars += n; saveProfiles(); renderStars();
  const after = Math.floor(p.stars / STICKER_STEP);
  if (after > before && before < STICKERS.length) { const st = STICKERS[Math.min(after, STICKERS.length) - 1]; setTimeout(() => stickerToast(st), 900); }
  const s = $('#stars'); s.classList.remove('bump'); void s.offsetWidth; s.classList.add('bump');
}
function burst(n = 10) {
  const b = document.createElement('div'); b.className = 'burst';
  const x = window.innerWidth / 2, y = window.innerHeight / 2;
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.textContent = pick(['⭐','🌟','✨','🎉']);
    const a = Math.random() * Math.PI * 2, r = 120 + Math.random() * 160;
    e.style.left = x + 'px'; e.style.top = y + 'px';
    e.style.setProperty('--dx', Math.cos(a) * r + 'px'); e.style.setProperty('--dy', Math.sin(a) * r + 'px');
    b.appendChild(e);
  }
  document.body.appendChild(b); setTimeout(() => b.remove(), 1200);
}
