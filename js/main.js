/* ===== DIL AI — MAIN CONTROLLER (sab kuch yahan judta hai) ===== */
const inputEl = document.getElementById('input');

function openModal() { document.getElementById('modal').style.display = 'flex'; }

function saveKeyAndStart() {
  const k = document.getElementById('apiKey').value.trim();
  if (!k) { alert('Pehle API key daalo!'); return; }
  saveKey(k);
  document.getElementById('modal').style.display = 'none';
  if (history.length === 0)
    botSay('Namaste! Main Dil hoon — tumhara teacher, writer, coder aur creative partner. Kya seekhna ya banana hai aaj?');
}

async function sendMsg() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  addBubble('user', text);
  const t = showTyping();
  try {
    const reply = await callGemini(text);
    t.remove();
    addBubble('bot', reply);
  } catch (e) {
    t.remove();
    addBubble('bot', '⚠️ Error: ' + e.message + '\n(API key check karo)');
  }
}

/* Events */
document.getElementById('send').addEventListener('click', sendMsg);
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
document.getElementById('settingsBtn').addEventListener('click', openModal);
document.getElementById('saveBtn').addEventListener('click', saveKeyAndStart);

/* Init — purani chat load karo */
loadHistory();
history.forEach(m => addBubble(m.role === 'user' ? 'user' : 'bot', m.parts[0].text));
document.getElementById('apiKey').value = loadKey();
if (!loadKey()) openModal();

/* Intro splash — 1.5 second baad hatega */
setTimeout(() => {
  const s = document.getElementById('splash');
  if (s) { s.style.opacity = '0'; setTimeout(() => s.remove(), 650); }
}, 1500);
                               
