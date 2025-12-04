// زر الإرسال
document.getElementById("send-btn").addEventListener("click", sendMessage);

// إرسال عند الضغط Enter
document.getElementById("user-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// مؤشر الكتابة
function showTyping(state) {
    document.getElementById("typing-indicator").classList.toggle("hidden", !state);
}

// إرسال الرسالة
async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage("user", message);
    input.value = "";

    showTyping(true);

    try {
        const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage: message })
        });

        const data = await res.json();
        showTyping(false);

        const reply =
            data.choices?.[0]?.message?.content ||
            "⚠️ حدث خطأ أثناء معالجة الرد.";

        addMessage("bot", reply);

        speak(reply);

    } catch (e) {
        showTyping(false);
        addMessage("bot", "⚠️ خطأ في الاتصال بالخادم!");
    }
}

// إضافة الرسائل للصفحة
function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// ========== الصوت ==========
let micEnabled = false;

// تشغيل/إيقاف المايك
document.getElementById("mic-btn").addEventListener("click", () => {
    micEnabled = !micEnabled;
    document.getElementById("mic-btn").classList.toggle("active", micEnabled);

    if (micEnabled) startListening();
});

// تشغيل التحدث
function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    speechSynthesis.speak(utter);
}

// الاستماع للمايك
function startListening() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.continuous = false;

    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        document.getElementById("user-input").value = text;
        sendMessage();
    };

    recognition.start();
}
