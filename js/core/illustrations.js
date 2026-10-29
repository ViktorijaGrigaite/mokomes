// Every emoji on screen is swapped for its 3D picture once the set has loaded.
let ART = null, ART_RE = null;
const SKIP = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','OPTION']);
function artText(node) {
  if (!ART_RE || !node.parentNode || SKIP.has(node.parentNode.nodeName)) return;
  const t = node.nodeValue; ART_RE.lastIndex = 0;
  if (!ART_RE.test(t)) return;
  ART_RE.lastIndex = 0;
  const frag = document.createDocumentFragment(); let last = 0, m;
  while ((m = ART_RE.exec(t))) {
    if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
    const img = document.createElement('img');
    img.className = 'e3d'; img.src = ART[m[0]]; img.alt = m[0]; img.draggable = false;
    frag.appendChild(img); last = m.index + m[0].length;
  }
  if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
  node.parentNode.replaceChild(frag, node);
}
function artify(root) {
  if (!ART_RE || !root) return;
  if (root.nodeType === 3) return artText(root);
  if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const list = [];
  while (w.nextNode()) list.push(w.currentNode);
  list.forEach(artText);
}
// assets/images/index.json maps each emoji to a picture file in assets/images/.
const ART_DIR = 'assets/images/';
fetch(ART_DIR + 'index.json').then(r => { if (!r.ok) throw 0; return r.json(); }).then(d => {
  ART = Object.fromEntries(Object.entries(d).map(([k, f]) => [k, f.startsWith('data:') ? f : ART_DIR + f]));
  d = ART;
  const keys = Object.keys(d).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  ART_RE = new RegExp('(?:' + keys.join('|') + ')\\uFE0F?', 'gu');
  // keys may differ from on-screen text only by a trailing variation selector
  const base = {}; for (const k of Object.keys(d)) { base[k] = d[k]; base[k.replace(/\uFE0F/g, '')] = d[k]; base[k + '\uFE0F'] = d[k]; }
  ART = base;
  artify(document.body);
  new MutationObserver(ms => ms.forEach(m => {
    if (m.type === 'characterData') artText(m.target);
    else m.addedNodes.forEach(artify);
  })).observe(document.body, {childList: true, subtree: true, characterData: true});
}).catch(() => {});
