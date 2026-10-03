/* ===== DIL AI — API (Gemini se baat karne ka code) ===== */
const MODEL = 'gemini-2.0-flash';

async function callGemini(userMsg) {
  const key = loadKey();
  if (!key) throw new Error('API key nahi hai — settings se daalo');

  history.push({ role: 'user', parts: [{ text: userMsg }] });
  saveHistory();

  const contents = [{ role: 'user', parts: [{ text: SYSTEM }] }].concat(history);

  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent?key=' + key,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const reply = data.candidates[0].content.parts[0].text;
  history.push({ role: 'model', parts: [{ text: reply }] });
  saveHistory();
  return reply;
}
