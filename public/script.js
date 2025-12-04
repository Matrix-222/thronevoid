// =======================
// عناصر الواجهة
// =======================
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const modeSelect = document.getElementById("mode-select");
const themeToggle = document.getElementById("theme-toggle");
const ttsToggle = document.getElementById("tts-toggle");
const imageInput = document.getElementById("image-input");
const clearChatBtn = document.getElementById("clear-chat");

// =======================
// التخزين
// =======================
const STORAGE_KEY = "tv_chat_history_v2";
const THEME_KEY = "tv_theme";
const TTS_KEY = "tv_tts_enabled";
const MODE_KEY = "tv_mode";

// =======================
// أوضاع الذكاء الاصطناعي
// =======================
const MODES = {
  default: { prefix: "[مساعد عام]" },
  science: { prefix: "[خبير علمي يشرح علميًا]" },
  dev: { prefix: "[مبرمج يشرح بالكود]" },
  doctor: { prefix: "[طبيب يقدم معلومات عامة]" },
  throne: { prefix: "[ThroneVoid AI – ذكاء خارق]" }
};

// =======================
// تحميل وحفظ المحادثة
// =======================
function loadHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  JSON.parse(raw).forEach(msg => addMessage(msg.sender, msg.text, false));
}

function saveMessage(sender, text) {
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  history.push({ sender, text });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// =======================
// عرض رسالة
// =======================
function addMessage(sender, text, save = true) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "message user-message" : "message bot-message";
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  if (save) saveMessage(sender, text);
}

// =======================
// مؤشر الكتابة
// =======================
function showTyping(status) {
  document.getElementById("typing-indicator").classList.toggle("hidden", !status);
}

// =======================
// تأثير الكتابة (typewriter)
// =======================
function typeWriterEffect(text) {
  return new Promise(resolve => {
    const div = document.createElement("div");
    div.className = "message bot-message typewriter";
    chatBox.appendChild(div);

    let i = 0;
    function type() {
      if (i < text.length) {
        div.textContent += text[i++];
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(type, 18);
      } else {
        div.classList.remove("typewriter");
        resolve();
      }
    }
    type();
  });
}

// =======================
// إرسال الرسالة للنظام
// =======================
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  showTyping(true);

  const mode = MODES[modeSelect.value];
  const finalMsg = `${mode.prefix}\n${message}`;

  try {
    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: finalMsg })
    });

    const data = await res.json();
    showTyping(false);

    const reply = data?.choices?.[0]?.message?.content || "⚠️ لم يتمكن ThroneVoid AI من الرد الآن.";

    await typeWriterEffect(reply);
    speak(reply);

  } catch (err) {
    showTyping(false);
    addMessage("bot", "⚠️ خطأ في الاتصال بالخادم.");
  }
}

// =======================
// تحليل صور
// =======================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    addMessage("user", "📷 تم رفع صورة… جاري التحليل");

    showTyping(true);

    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: `[تحليل صورة Base64]\n${reader.result}`
      })
    });

    const data = await res.json();
    showTyping(false);

    const reply = data?.choices?.[0]?.message?.content || "لم أستطع تحليل الصورة.";
    await typeWriterEffect(reply);
    speak(reply);
  };

  reader.readAsDataURL(file);
});

// =======================
// نطق صوتي
// =======================
let ttsEnabled = localStorage.getItem(TTS_KEY) === "true";

ttsToggle.textContent = ttsEnabled ? "🔊 الصوت: يعمل" : "🔈 الصوت: متوقف";

ttsToggle.addEventListener("click", () => {
  ttsEnabled = !ttsEnabled;
  localStorage.setItem(TTS_KEY, ttsEnabled);
  ttsToggle.textContent = ttsEnabled ? "🔊 الصوت: يعمل" : "🔈 الصوت: متوقف";
});

function speak(text) {
  if (!ttsEnabled) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  speechSynthesis.speak(utter);
}

// =======================
// مسح المحادثة
// =======================
clearChatBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  chatBox.innerHTML = "";
});

// =======================
// مايك (Speech to Text)
// =======================
let recognition = null;
let isListening = false;

function initMic() {
  try {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new Speech();
    recognition.lang = "ar-SA";

    recognition.onstart = () => {
      isListening = true;
      micBtn.classList.add("listening");
    };

    recognition.onend = () => {
      isListening = false;
      micBtn.classList.remove("listening");
    };

    recognition.onresult = (e) => {
      userInput.value = e.results[0][0].transcript;
    };
  } catch {}
}

micBtn.addEventListener("click", () => {
  if (!recognition) return alert("متصفحك لا يدعم الإملاء الصوتي.");
  isListening ? recognition.stop() : recognition.start();
});

// =======================
// تشغيل أولي
// =======================
loadHistory();
initMic();

sendBtn.onclick = sendMessage;

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
