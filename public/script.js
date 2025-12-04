document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage("user", message);
    input.value = "";

    try {
        const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage: message })
        });

        const data = await res.json();

        if (data.error) {
            addMessage("bot", "⚠️ خطأ في الاتصال بالخادم!");
            return;
        }

        const reply =
            data.choices?.[0]?.message?.content ||
            "⚠️ لم يتمكن ThroneVoid AI من الرد!";

        addMessage("bot", reply);

    } catch (e) {
        addMessage("bot", "⚠️ حدث خطأ أثناء الاتصال!");
    }
}

function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
