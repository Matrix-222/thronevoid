const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function addMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add(sender);
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage("user", "🧑‍💻: " + message);
    userInput.value = "";

    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (data.error) {
            addMessage("bot", "❌ خطأ: " + data.error);
        } else {
            addMessage("bot", "🤖: " + data.choices[0].message.content);
        }

    } catch (err) {
        addMessage("bot", "⚠️ حدث خطأ أثناء الاتصال بالخادم!");
    }
}
