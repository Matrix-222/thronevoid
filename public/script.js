// =======================
// المراجع العامة للعناصر
// =======================
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const modeSelect = document.getElementById("mode-select");
const themeToggle = document.getElementById("theme-toggle");
const ttsToggle = document.getElementById("tts-toggle");

// مفاتيح التخزين
const STORAGE_KEY = "tv_chat_history_v2";
const THEME_KEY = "tv_theme";
const TTS_KEY = "tv_tts_enabled";
const MODE_KEY = "tv_mode";

// أوضاع الذكاء الاصطناعي
const MODES = {
  default: { label: "وضع عادي", prefix: "[مساعد عام]" },
  science: { label: "خبير علمي", prefix: "[خبير علمي يشرح بالمصطلحات الدقيقة]" },
  dev: { label: "مبرمج", prefix: "[مبرمج يشرح بالأمثلة البرمجية والكود]" },
  doctor: { label: "طبيب", prefix: "[طبيب يقدم معلومات طبية عامة وليست تشخيصاً شخصياً]" },
  throne: { label: "ThroneVoid Mode", prefix: "[ThroneVoid AI ذكي جداً، يجيب بثقة وعمق]" }
};

// حالة النطق الصوتي
let ttsEnabled = false;

// إعداد التعرف على الصوت
let recognition = null;
let isListening = false;

// =======================
// تحميل المحادثة السابقة
// =======================
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const history = JSON.parse(raw);
    history.forEach((msg) => {
      addMessage(msg.sender, msg.text, false);
    });
  } catch (e) {
    console.warn("Failed to load history", e);
  }
}

function saveMessage(sender, text) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history = raw ? JSON.parse(raw) : [];
    history.push({ sender, text, time: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save history", e);
  }
}

// =======================
// إضافة رسالة للواجهة
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
// التعامل مع الثيم
// =======================
function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(stored);
}

function toggleTheme() {
  const current = document.body.classList.contains("theme-light") ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

// =======================
// نطق صوتي للنص
// =======================
function initTTS() {
  const stored = localStorage.getItem(TTS_KEY);
  ttsEnabled = stored === "true";
  updateTTSToggleText();
}

function updateTTSToggleText() {
  if (!ttsToggle) return;
  if (ttsEnabled) {
    ttsToggle.textContent = "🔊 الصوت: يعمل";
  } else {
    ttsToggle.textContent = "🔈 الصوت: متوقف";
  }
}

function toggleTTS() {
  ttsEnabled = !ttsEnabled;
  localStorage.setItem(TTS_KEY, String(ttsEnabled));
  updateTTSToggleText();
}

function speak(text) {
  if (!ttsEnabled) return;
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}

// =======================
// وضع الذكاء الاصطناعي
// =======================
function initMode() {
  const stored = localStorage.getItem(MODE_KEY);
  if (stored && MODES[stored] && modeSelect) {
    modeSelect.value = stored;
  }
}

function getCurrentMode() {
  if (!modeSelect) return "default";
  const val = modeSelect.value;
  return MODES[val] ? val : "default";
}

// =======================
// إرسال الرسالة
// =======================
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const modeKey = getCurrentMode();
  const mode = MODES[modeKey] || MODES.default;

  // نعرض الرسالة كما كتبها المستخدم
  addMessage("user", message);

  // الرسالة التي تُرسل للـ Worker مع معلومات الوضع
  const fullMessage = `${mode.prefix}\n${message}`;

  userInput.value = "";

  try {
    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: fullMessage })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("API error:", data.error || res.status);
      addMessage("bot", "⚠️ حدث خطأ في الاتصال بالخادم.");
      return;
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "⚠️ لم أستطع توليد رد مناسب الآن.";

    addMessage("bot", reply);
    speak(reply);

  } catch (e) {
    console.error(e);
    addMessage("bot", "⚠️ تعذر الاتصال بالخادم. حاول مرة أخرى.");
  }
}

// =======================
// التعرف على الصوت (مايك)
// =======================
function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;

  recognition = new SR();
  recognition.lang = "ar-SA";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    isListening = true;
    if (micBtn) micBtn.classList.add("listening");
    if (micBtn) micBtn.textContent = "🎤";
  };

  recognition.onend = () => {
    isListening = false;
    if (micBtn) micBtn.classList.remove("listening");
    if (micBtn) micBtn.textContent = "🎙";
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    userInput.value = text;
  };
}

function toggleListening() {
  if (!recognition) {
    alert("متصفحك لا يدعم الإملاء الصوتي.");
    return;
  }
  if (!isListening) {
    recognition.start();
  } else {
    recognition.stop();
  }
}

// =======================
// أحداث الواجهة
// =======================
if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
}

if (userInput) {
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (ttsToggle) {
  ttsToggle.addEventListener("click", toggleTTS);
}

if (micBtn) {
  micBtn.addEventListener("click", toggleListening);
}

if (modeSelect) {
  modeSelect.addEventListener("change", () => {
    const modeKey = getCurrentMode();
    localStorage.setItem(MODE_KEY, modeKey);
  });
}

// =======================
// تهيئة عند التحميل
// =======================
initTheme();
initTTS();
initMode();
loadHistory();
initSpeechRecognition();
