/* ===== DIL AI — MEMORY (localStorage helpers) ===== */
let history = [];

function loadKey()   { return localStorage.getItem('gemini_key') || ''; }
function saveKey(k)  { localStorage.setItem('gemini_key', k); }

function loadHistory() {
  const s = localStorage.getItem('chat_history');
  if (s) {
    history = JSON.parse(s).map(m =>
      typeof m.parts === 'string'
        ? { role: m.role, parts: [{ text: m.parts }] }   // purane format ko naye mein badlo
        : m);
  }
}
function saveHistory() {
  localStorage.setItem('chat_history', JSON.stringify(history));
}
