/* ===== DIL AI — CHAT UI (bubbles + typing indicator) ===== */
const chatEl = document.getElementById('chat');

function addBubble(who, text) {
  const d = document.createElement('div');
  d.className = 'msg ' + who;
  d.textContent = text;
  chatEl.appendChild(d);
  chatEl.scrollTop = chatEl.scrollHeight;
  return d;
}

function botSay(t) { return addBubble('bot', t); }

function showTyping() {
  return addBubble('bot typing', 'Dil soch raha hai...');
}
