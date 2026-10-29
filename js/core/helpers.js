const $ = s => document.querySelector(s);
const screen = $('#screen');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const say = (lt, en) => `data-say="${esc(lt)}|${esc(en)}"`;      // attribute: speak this when tapped
const sayUI = k => say(UI[k][0], UI[k][1]);
function picHTML(cat, it) {
  return cat === 'spalvos' ? `<span class="swatch" style="background:${it[0]}"></span>` : `<span class="emo">${it[0]}</span>`;
}
const whereEn = (cat, it) => `Where is ${CATS[cat].art}${it[2]}?`;
