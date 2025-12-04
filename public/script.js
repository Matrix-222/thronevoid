const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
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
    const res = await fetch("https://floral-moon-7d08.i3lawi01.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: message }),
    });

    const data = await res.json();

    const reply = data?.choices?.[0]?.message?.content || 
                  "⚠️ لم يتمكن ThroneVoid AI من الرد الآن.";

    addMessage("bot", reply);
  } catch (err) {
    addMessage("bot", "⚠️ خطأ في الاتصال.");
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
