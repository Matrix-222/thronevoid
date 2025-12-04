// =======================
// عناصر الواجهة
// =======================
const chatBox       = document.getElementById("chat-box");
const userInput     = document.getElementById("user-input");
const sendBtn       = document.getElementById("send-btn");
const micBtn        = document.getElementById("mic-btn");
const modeSelect    = document.getElementById("mode-select");
const themeToggle   = document.getElementById("theme-toggle");
const ttsToggle     = document.getElementById("tts-toggle");
const imageInput    = document.getElementById("image-input");
const clearChatBtn  = document.getElementById("clear-chat");
const typingEl      = document.getElementById("typing-indicator");

// =======================
// التخزين
// =======================
const STORAGE_KEY = "tv_chat_history_v2";
const THEME_KEY   = "tv_theme";
const TTS_KEY     = "tv_tts_enabled";
const MODE_KEY    = "tv_mode";

// =======================
// أوضاع الذكاء الاصطناعي
// =======================
const MODES = {
  default: { prefix: "[مساعد عام]" },
  science: { prefix: "[خبير علمي يشرح علميًا]" },
  dev:     { prefix: "[مبرمج يشرح بالكود]" },
  doctor:  { prefix: "[طبيب يقدم معلومات عامة]" },
  throne:  { prefix: "[ThroneVoid AI – ذكاء خارق]" }
};

// =======================
// تحميل وحفظ المحادثة
// =======================
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const history = JSON.parse(raw);
    if (!Array.isArray(history)) return;

    history.forEach(msg => {
      addMessage(msg.sender, msg.text, false);
    });
  } catch (e) {
    console.error("خطأ في تحميل المحادثة:", e);
  }
}

function saveMessage(sender, text) {
  try {
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    history.push({ sender, text });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("خطأ في حفظ المحادثة:", e);
  }
}

// =======================
// عرض رسالة عادية (بدون تايب رايتر)
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
  if (!typingEl) return;
  if (status) {
    typingEl.classList.remove("hidden");
  } else {
    typingEl.classList.add("hidden");
  }
}

// =======================
// تأثير الكتابة (typewriter)
// مع حفظ الرد بعد انتهاء الكتابة
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
        // نحفظ الرسالة بعد ما تكتمل
        saveMessage("bot", text);
        resolve();
      }
    }
    type();
  });
}

// =======================
// إعداد الثيم (داكن / فاتح)
// =======================
function applyTheme(theme) {
  const body = document.body;
  if (!body) return;

  if (theme === "light") {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    themeToggle.textContent = "🌙";
  }
}

let currentTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, currentTheme);
    applyTheme(currentTheme);
  });
}

// =======================
// حفظ واستعادة وضع الـ Mode
// =======================
const savedMode = localStorage.getItem(MODE_KEY);
if (savedMode && MODES[savedMode]) {
  modeSelect.value = savedMode;
}

modeSelect.addEventListener("change", () => {
  localStorage.setItem(MODE_KEY, modeSelect.value);
});

// =======================
// نطق صوتي
// =======================
let ttsEnabled = localStorage.getItem(TTS_KEY) === "true";

if (ttsToggle) {
  ttsToggle.textContent = ttsEnabled ? "🔊 الصوت: يعمل" : "🔈 الصوت: متوقف";

  ttsToggle.addEventListener("click", () => {
    ttsEnabled = !ttsEnabled;
    localStorage.setItem(TTS_KEY, ttsEnabled);
    ttsToggle.textContent = ttsEnabled ? "🔊 الصوت: يعمل" : "🔈 الصوت: متوقف";
  });
}

function speak(text) {
  if (!ttsEnabled) return;
  if (typeof window.speechSynthesis === "undefined") return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  window.speechSynthesis.speak(utter);
}

// =======================
// إرسال الرسالة للنظام
// =======================
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // عرض رسالة المستخدم + حفظها
  addMessage("user", message, true);
  userInput.value = "";

  showTyping(true);

  const mode = MODES[modeSelect.value] || MODES.default;
  const finalMsg = mode.prefix + "\n" + message;

  try {
    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: finalMsg })
    });

    const data = await res.json();
    showTyping(false);

    const reply =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content
        : "⚠️ لم يتمكن ThroneVoid AI من الرد الآن.";

    await typeWriterEffect(reply);
    speak(reply);

  } catch (err) {
    console.error("sendMessage error:", err);
    showTyping(false);
    addMessage("bot", "⚠️ خطأ في الاتصال بالخادم.", true);
  }
}

// =======================
// تحليل صور
// =======================
if (imageInput) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      addMessage("user", "📷 تم رفع صورة… جاري التحليل", true);
      showTyping(true);

      try {
        const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage: "[تحليل صورة Base64]\n" + reader.result
          })
        });

        const data = await res.json();
        showTyping(false);

        const reply =
          data &&
          data.choices &&
          data.choices[0] &&
          data.choices[0].message &&
          data.choices[0].message.content
            ? data.choices[0].message.content
            : "لم أستطع تحليل الصورة.";

        await typeWriterEffect(reply);
        speak(reply);
      } catch (e) {
        console.error("image analyze error:", e);
        showTyping(false);
        addMessage("bot", "حدث خطأ أثناء تحليل الصورة.", true);
      }
    };

    reader.readAsDataURL(file);
  });
}

// =======================
// مسح المحادثة
// =======================
if (clearChatBtn) {
  clearChatBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    chatBox.innerHTML = "";
  });
}

// =======================
// مايك (Speech to Text)
// =======================
let recognition = null;
let isListening = false;

function initMic() {
  try {
    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return;

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
      if (e.results && e.results[0] && e.results[0][0]) {
        userInput.value = e.results[0][0].transcript;
      }
    };
  } catch (e) {
    console.warn("SpeechRecognition غير مدعوم:", e);
  }
}

if (micBtn) {
  micBtn.addEventListener("click", () => {
    if (!recognition) {
      alert("متصفحك لا يدعم الإملاء الصوتي.");
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
}

// =======================
// تشغيل أولي
// =======================
loadHistory();
initMic();

if (sendBtn) {
  sendBtn.onclick = sendMessage;
}

if (userInput) {
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}
