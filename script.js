const SERVER_URL = "https://openai-proxy-coral-three.vercel.app/api";

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
    const userText = input.value.trim();
    if (!userText) return;
    addMessage(userText, "user");
    input.value = "";

    const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
});
