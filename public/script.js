// ========== زر الإرسال ==========
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// ========== دالة إرسال الرسالة ==========
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

        if (data.error) {
            addMessage("bot", "⚠️ خطأ في الاتصال بالخادم!");
            return;
        }

        const reply =
            data.choices?.[0]?.message?.content ||
            "⚠️ لم يتمكن ThroneVoid AI من معرفة الرد.";

        addMessage("bot", reply);

    } catch (e) {
        showTyping(false);
        addMessage("bot", "⚠️ حدث خطأ أثناء الاتصال بالخادم!");
    }
}

// ========== دالة إضافة الرسالة للصندوق ==========
function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// ========== مؤشر الكتابة ==========
function showTyping(state) {
    const indicator = document.getElementById("typing-indicator");
    indicator.classList[state ? "remove" : "add"]("hidden");
}
