// Replace this with your actual n8n webhook URL
const WEBHOOK_URL = "https://your-n8n-url-here/webhook/xxxxxx";

const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");

// Add message to chat display
function addMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle send button click
sendButton.addEventListener("click", sendMessage);

// Handle "Enter" key press
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Send message to n8n webhook
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("You", message);
    userInput.value = "";
    addMessage("Coach", "Thinking...");
    
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: message })
        });

        const data = await response.json();

        // Remove the last "Thinking..." message
        chatWindow.removeChild(chatWindow.lastChild);

        addMessage("Coach", data.answer || "Sorry, I couldn't generate a response.");
    } catch (error) {
        chatWindow.removeChild(chatWindow.lastChild);
        addMessage("Coach", "⚠️ Error talking to the server. Try again later.");
        console.error(error);
    }
}
