/* نفس السكربت السابق بالكامل + الإضافات التالية فقط */

/* === مؤشر الكتابة === */
function showTyping(status) {
  const indicator = document.getElementById("typing-indicator");
  if (!indicator) return;
  indicator.classList.toggle("hidden", !status);
}

/* === تأثير كتابة Typewriter === */
async function typeWriterEffect(text, callback) {
  const div = document.createElement("div");
  div.className = "message bot-message typewriter";
  chatBox.appendChild(div);

  let index = 0;
  function type() {
    if (index < text.length) {
      div.textContent += text[index];
      index++;
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(type, 18);
    } else {
      div.classList.remove("typewriter");
      if (callback) callback();
    }
  }
  type();
}

/* === مسح المحادثة === */
document.getElementById("clear-chat").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  chatBox.innerHTML = "";
});

/* === رفع الصور === */
document.getElementById("image-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result;

    addMessage("user", "🖼️ تم رفع صورة، جاري التحليل…");

    showTyping(true);

    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: `[تحليل صورة Base64]\n${base64}`
      })
    });

    const data = await res.json();

    const reply = data.choices?.[0]?.message?.content || "لم أستطع تحليل الصورة.";
    showTyping(false);

    typeWriterEffect(reply);
    speak(reply);
  };

  reader.readAsDataURL(file);
});

/* === تعديل إرسال النص ليستخدم typewriter === */
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  showTyping(true);

  const modeKey = getCurrentMode();
  const mode = MODES[modeKey];
  const fullMessage = `${mode.prefix}\n${message}`;

  const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage: fullMessage })
  });

  const data = await res.json();
  showTyping(false);

  const reply = data.choices?.[0]?.message?.content || "⚠️ لم أستطع الرد.";
  
  typeWriterEffect(reply);
  speak(reply);
}
