document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="user">👤: ${message}</div>`;

  const res = await fetch("/api/index", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  if (data?.choices) {
    const reply = data.choices[0].message.content;
    chatBox.innerHTML += `<div class="bot">🤖: ${reply}</div>`;
  } else {
    chatBox.innerHTML += `<div class="bot error">⚠️ خطأ أثناء الاتصال بالخادم!</div>`;
  }

  input.value = "";
};
