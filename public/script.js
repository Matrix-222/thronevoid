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
            "⚠️ لم يتمك
