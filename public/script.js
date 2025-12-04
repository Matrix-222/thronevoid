const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "message user-message" : "message bot-message";
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ userMessage: message })
    });

    const text = await response.text();
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      addMessage("bot", "⚠️ رد غير صالح من الخادم.");
      return;
    }

    const reply = data?.choices?.[0]?.message?.content ||
      data?.error ||
      "⚠️ لم يتمكن ThroneVoid AI من الرد الآن.";

    addMessage("bot", reply);

  } catch (e) {
    addMessage("bot", "⚠️ خطأ في الاتصال بالخادم.");
  }
}

sendBtn.onclick = sendMessage;

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
