let profiles = store.get('mokausi.profiles', []);
let currentId = store.get('mokausi.current', null);
const cur = () => profiles.find(p => p.id === currentId) || null;
const avInfo = e => AVATARS.find(a => a[0] === e) || [e, '', ''];
function saveProfiles() { store.set('mokausi.profiles', profiles); store.set('mokausi.current', currentId); }
