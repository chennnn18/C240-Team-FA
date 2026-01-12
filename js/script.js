// ==========================================
// StayFit - AI Sports Coach Chat Integration
// NOTE: This code is disabled - using n8n chat widget instead
// ==========================================

// The n8n chat widget is now integrated via CDN in index.html
// This custom chat code is no longer needed

/*
// Configuration
const N8N_WEBHOOK_URL = 'https://n8ngc.codeblazar.org/webhook/e8d1a378-c05e-443e-afdb-787f4b52dc57/chat';

// DOM Elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Track the thinking message element for easy removal
let thinkingMessage = null;

// ==========================================
// Function: Add Message to Chat Window
// ==========================================
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    
    messageDiv.appendChild(messageParagraph);
    chatWindow.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    return messageDiv;
}

// ==========================================
// Function: Show Thinking Indicator
// ==========================================
function showThinkingMessage() {
    thinkingMessage = document.createElement('div');
    thinkingMessage.classList.add('chat-message', 'bot-message', 'thinking');
    
    const thinkingParagraph = document.createElement('p');
    thinkingParagraph.textContent = 'Thinking...';
    
    thinkingMessage.appendChild(thinkingParagraph);
    chatWindow.appendChild(thinkingMessage);
    
    // Auto-scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ==========================================
// Function: Remove Thinking Indicator
// ==========================================
function removeThinkingMessage() {
    if (thinkingMessage && thinkingMessage.parentNode) {
        thinkingMessage.parentNode.removeChild(thinkingMessage);
        thinkingMessage = null;
    }
}

// ==========================================
// Function: Show Error Message
// ==========================================
function showErrorMessage(errorText) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('chat-message', 'error-message');
    
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = `❌ Error: ${errorText}`;
    
    errorDiv.appendChild(errorParagraph);
    chatWindow.appendChild(errorDiv);
    
    // Auto-scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ==========================================
// Function: Send Message to n8n Webhook
// ==========================================
async function sendMessageToN8N(question) {
    try {
        // Send POST request to n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        });
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Return the answer from the response
        return data.answer || 'No answer received from the coach.';
        
    } catch (error) {
        console.error('Error communicating with AI coach:', error);
        throw error;
    }
}

// ==========================================
// Function: Handle Send Message
// ==========================================
async function handleSendMessage() {
    // Get user input value and trim whitespace
    const question = userInput.value.trim();
    
    // Validate input
    if (question === '') {
        return; // Don't send empty messages
    }
    
    // Disable input and button while processing
    userInput.disabled = true;
    sendBtn.disabled = true;
    
    // Add user's message to chat window
    addMessageToChat(question, 'user');
    
    // Clear input field
    userInput.value = '';
    
    // Show thinking indicator
    showThinkingMessage();
    
    try {
        // Send message to n8n and get response
        const answer = await sendMessageToN8N(question);
        
        // Remove thinking indicator
        removeThinkingMessage();
        
        // Add AI coach's response to chat window
        addMessageToChat(answer, 'bot');
        
    } catch (error) {
        // Remove thinking indicator
        removeThinkingMessage();
        
        // Show error message
        showErrorMessage('Unable to connect to AI coach. Please check your connection and try again.');
    } finally {
        // Re-enable input and button
        userInput.disabled = false;
        sendBtn.disabled = false;
        
        // Focus back on input field
        userInput.focus();
    }
}

// ==========================================
// Event Listeners
// ==========================================

// Send message when button is clicked
sendBtn.addEventListener('click', handleSendMessage);

// Send message when Enter key is pressed
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});

// Optional: Focus on input field when page loads
window.addEventListener('load', () => {
    userInput.focus();
});

// ==========================================
// Console Log for Debugging
// ==========================================
console.log('✅ AI Sports Coach chat initialized and ready!');
console.log('📝 Remember to replace the webhook URL with your actual n8n webhook URL.');
*/

// n8n chat widget is active - no additional code needed
console.log('✅ StayFit loaded - n8n chat widget active');
