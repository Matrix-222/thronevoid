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
            body: JSON.st
