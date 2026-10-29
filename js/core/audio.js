// Sound: every Lithuanian phrase has its own recorded clip. English speech is switched off (enOn = false).
// Items in the queue are Lithuanian phrases, or 'en:...' for an English translation.
let AUDIO = {}, unlocked = false, queue = [], busy = false, token = 0;
const enOn = false; // English is shown on screen but never spoken
const player = new Audio();
player.preload = 'auto';
const hasTTS = 'speechSynthesis' in window;
let enVoice = null;
function pickEn() {
  if (!hasTTS) return;
  const vs = speechSynthesis.getVoices();
  enVoice = vs.find(v => /^en-GB/i.test(v.lang) && v.localService) || vs.find(v => /^en-GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
}
if (hasTTS) { pickEn(); speechSynthesis.onvoiceschanged = pickEn; }

// One MP3 per phrase lives in assets/audio/. index.json maps each Lithuanian phrase to its file name.
// (The published single-file build puts the audio itself into index.json as data: URLs instead.)
const AUDIO_DIR = 'assets/audio/';
const audioSrc = f => f.startsWith('data:') ? f : AUDIO_DIR + f;
fetch(AUDIO_DIR + 'index.json').then(r => { if (!r.ok) throw 0; return r.json(); })
  .then(d => { AUDIO = Object.fromEntries(Object.entries(d).map(([k, f]) => [k, audioSrc(f)])); })
  .catch(() => { $('#voiceNote').hidden = false; });
$('#closeNote').onclick = () => { $('#voiceNote').hidden = true; };

function playNext() {
  const my = ++token;
  const k = queue.shift();
  if (k === undefined) { busy = false; return; }
  busy = true;
  if (k.startsWith('en:')) {
    if (!enOn || !hasTTS) return playNext();
    try {
      const u = new SpeechSynthesisUtterance(k.slice(3));
      if (enVoice) u.voice = enVoice;
      u.lang = enVoice ? enVoice.lang : 'en-GB'; u.rate = 0.95;
      const done = () => { if (my === token) playNext(); };
      u.onend = done; u.onerror = done;
      setTimeout(done, 600 + k.length * 120); // safety net if the browser never reports the end
      speechSynthesis.speak(u);
    } catch (e) { playNext(); }
    return;
  }
  const src = AUDIO[k]; if (!src) return playNext();
  player.muted = false; player.src = src;
  const p = player.play(); if (p && p.catch) p.catch(() => { if (my === token) playNext(); });
}
player.addEventListener('ended', () => playNext());
function hush() { token++; try { player.pause(); } catch (e) {} try { if (hasTTS) speechSynthesis.cancel(); } catch (e) {} }
function speak(...items) { hush(); queue = items.filter(Boolean); playNext(); }      // replace whatever is playing
function sayAfter(...items) { queue.push(...items.filter(Boolean)); if (!busy) playNext(); } // play after current sound
function stopSound() { queue = []; busy = false; hush(); }
const en = t => 'en:' + t;

// Anything with data-say speaks its Lithuanian name, then the English meaning.
document.addEventListener('click', e => {
  const el = e.target.closest('[data-say]'); if (!el) return;
  const [lt, eng] = el.dataset.say.split('|');
  speak(lt, eng ? en(eng) : null);
}, true);

// iPad/iPhone only allow sound after a tap: unlock both voices on the first touch.
document.addEventListener('pointerdown', () => {
  if (unlocked) return; unlocked = true;
  try { if (hasTTS) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) {}
  if (!player.src) { player.muted = true; player.src = AUDIO['Labas!'] || ''; const p = player.play(); if (p && p.then) p.then(() => { if (player.muted) player.pause(); player.muted = false; }).catch(() => { player.muted = false; }); else player.muted = false; }
}, true);
