// ربط الأحداث
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const themeToggle = document.getElementById("theme-toggle");
const micBtn = document.getElementById("mic-btn");

let isSending = false;

// ========== حفظ واسترجاع المحادثة ==========
const STORAGE_KEY = "thronevoid_chat_history";

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const history = JSON.parse(raw);
    history.forEach((msg) => {
      renderMessage(msg.sender, msg.text, false);
    });

    scrollToBottom();
  } catch (e) {
    console.warn("Failed to load history", e);
  }
}

function saveMessage(sender, text) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history = raw ? JSON.parse(raw) : [];
    history.push({ sender, text });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save history", e);
  }
}

// ========== إضافة رسالة للواجهة ==========
function renderMessage(sender, text, speak = true) {
  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  const avatar = document.createElement("span");
  avatar.className =
    sender === "user" ? "avatar user-avatar" : "avatar bot-avatar";
  avatar.textContent = sender === "user" ? "🧑" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // تأثير كتابة للبوت
  if (sender === "bot" && speak) {
    bubble.textContent = "";
    typeText(bubble, text);
  } else {
    bubble.textContent = text;
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatBox.appendChild(row);
  scrollToBottom();

  // حفظ
  saveMessage(sender, text);

  // قراءة صوتية لرد البوت
  if (sender === "bot" && speak) {
    speakText(text);
  }
}

// تأثير كتابة بسيط
function typeText(el, fullText, speed = 18) {
  let i = 0;
  function tick() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(tick, speed);
    }
  }
  tick();
}

// سكرول لأسفل
function scrollToBottom() {
  requestAnimationFrame(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// ========== إرسال الرسالة ==========
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message || isSending) return;

  isSending = true;
  sendBtn.disabled = true;
  showTyping(true);

  renderMessage("user", message);
  userInput.value = "";

  try {
    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: message }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("API error:", data.error || res.status);
      renderMessage("bot", "⚠️ حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.");
    } else {
      const reply =
        data.choices?.[0]?.message?.content ||
        "⚠️ لم أستطع توليد رد مناسب الآن.";
      renderMessage("bot", reply);
    }
  } catch (e) {
    console.error(e);
    renderMessage(
      "bot",
      "⚠️ تعذر الاتصال بالخادم. تأكد من اتصال الإنترنت ثم حاول مجددًا."
    );
  } finally {
    isSending = false;
    sendBtn.disabled = false;
    showTyping(false);
  }
}

// إظهار / إخفاء مؤشر الكتابة
function showTyping(show) {
  if (show) {
    typingIndicator.classList.remove("hidden");
  } else {
    typingIndicator.classList.add("hidden");
  }
}

// ========== تبديل الثيم ==========
function initTheme() {
  const saved = localStorage.getItem("thronevoid_theme");
  if (saved === "light") {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.add("theme-dark");
    themeToggle.textContent = "🌙";
  }
}

function toggleTheme() {
  if (document.body.classList.contains("theme-dark")) {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    themeToggle.textContent = "☀️";
    localStorage.setItem("thronevoid_theme", "light");
  } else {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
    themeToggle.textContent = "🌙";
    localStorage.setItem("thronevoid_theme", "dark");
  }
}

// ========== صوت: إملاء + قراءة ==========
let recognition = null;

function initSpeechRecognition() {
  const SR =
    window.SpeechRecognition || window.webkitSpeechRecognition || null;
  if (!SR) return;

  recognition = new SR();
  recognition.lang = "ar-SA";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    userInput.value = text;
  };

  recognition.onerror = () => {
    console.warn("speech recognition error");
  };
}

function handleMicClick() {
  if (!recognition) {
    alert("متصفحك لا يدعم الإملاء الصوتي.");
    return;
  }
  recognition.start();
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

// ========== أحداث الواجهة ==========
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

themeToggle.addEventListener("click", toggleTheme);
micBtn.addEventListener("click", handleMicClick);

// تحميل المحادثة والثيم والصوت
initTheme();
initSpeechRecognition();
loadHistory();
