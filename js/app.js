// StayFit - JavaScript Interactivity
// Features: Chat panel, smooth scrolling, FAQ toggles, scroll animations

// ==========================================
// 1. Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// 2. Chat Widget Toggle Functionality (n8n)
// ==========================================
// n8n chat widget handles its own UI - no custom code needed
// The n8n chat automatically creates its own chat button and interface

// ==========================================
// 3. FAQ Accordion Toggle
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==========================================
// 4. Hero Call-to-Action Buttons
// ==========================================
const startJourneyBtn = document.getElementById('startJourneyBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');

startJourneyBtn.addEventListener('click', () => {
    // Scroll to fitness areas or trigger n8n chat
    // The n8n chat widget can be opened by clicking the chat button it creates
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

learnMoreBtn.addEventListener('click', () => {
    // Scroll to fitness areas section
    document.getElementById('fitness-areas').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ==========================================
// 5. Fitness Card Click Handlers
// ==========================================
const fitnessCards = document.querySelectorAll('.btn-card');

fitnessCards.forEach(btn => {
    btn.addEventListener('click', function() {
        const cardTitle = this.parentElement.querySelector('h3').textContent;
        
        // n8n chat widget handles its own interactions
        // User can click the n8n chat button to start chatting
        console.log(`User interested in: ${cardTitle}`);
    });
});

// ==========================================
// 6. Scroll Animation Observer
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe fitness cards for scroll animations
const cards = document.querySelectorAll('.fitness-card');
cards.forEach((card, index) => {
    card.classList.add('scroll-fade');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe FAQ items for scroll animations
const faqElements = document.querySelectorAll('.faq-item');
faqElements.forEach((faq, index) => {
    faq.classList.add('scroll-fade');
    faq.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(faq);
});

// ==========================================
// 7. Navbar Scroll Effect
// ==========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to navbar when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// 8. Chat Input Handler (n8n)
// ==========================================
// n8n chat widget handles all chat functionality
// No custom chat input code needed

// ==========================================
// 9. Welcome Animation on Page Load
// ==========================================
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    heroContent.classList.add('fade-in');
    heroImage.classList.add('fade-in');
});

// ==========================================
// 10. Mobile Menu Toggle (for future enhancement)
// ==========================================
// Add this functionality if you want a hamburger menu for mobile
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if on mobile
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here
        console.log('Mobile view detected');
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// ==========================================
// AI Chat Functionality
// ==========================================
const chatMessages = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');
const sendMessageBtn = document.getElementById('send-message');
const WEBHOOK_URL = 'https://n8ngc.codeblazar.org/webhook/e8d1a378-c05e-443e-afdb-787f4b52dc57/chat';

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-msg' : 'bot-msg';
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    messageDiv.appendChild(messageParagraph);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add thinking indicator
function addThinkingIndicator() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking-msg';
    thinkingDiv.id = 'thinking-indicator';
    const thinkingParagraph = document.createElement('p');
    thinkingParagraph.textContent = 'Thinking...';
    thinkingDiv.appendChild(thinkingParagraph);
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return thinkingDiv;
}

// Remove thinking indicator
function removeThinkingIndicator() {
    const indicator = document.getElementById('thinking-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Send message to n8n
async function sendMessage() {
    const message = userMessageInput.value.trim();
    
    if (!message) return;
    
    // Disable input while sending
    userMessageInput.disabled = true;
    sendMessageBtn.disabled = true;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input
    userMessageInput.value = '';
    
    // Show thinking indicator
    const thinkingIndicator = addThinkingIndicator();
    
    try {
        // Send to n8n webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                chatInput: message,
                question: message 
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove thinking indicator
        removeThinkingIndicator();
        
        // Add bot response
        const botResponse = data.output || data.answer || data.response || 'I received your message!';
        addMessage(botResponse, false);
        
    } catch (error) {
        console.error('Error sending message:', error);
        removeThinkingIndicator();
        addMessage('❌ Sorry, I\'m having trouble connecting. Please check the CORS settings in n8n or try again.', false);
    } finally {
        // Re-enable input
        userMessageInput.disabled = false;
        sendMessageBtn.disabled = false;
        userMessageInput.focus();
    }
}

// Event listeners for chat
if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', sendMessage);
}

if (userMessageInput) {
    userMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

console.log('🎉 StayFit initialized! AI Chat ready!');
