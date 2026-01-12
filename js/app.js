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
// 2. Chat Widget Toggle Functionality
// ==========================================
const chatWidget = document.getElementById('chatWidget');
const chatBubbleBtn = document.getElementById('chatBubbleBtn');
const openChatBtn = document.getElementById('openChatBtn');
const closeChatBtn = document.getElementById('closeChatBtn');

// Open chat widget
function openChat() {
    chatWidget.classList.add('active');
    chatBubbleBtn.style.display = 'none';
}

// Close chat widget
function closeChat() {
    chatWidget.classList.remove('active');
    chatBubbleBtn.style.display = 'flex';
}

// Event listeners for chat
chatBubbleBtn.addEventListener('click', openChat);
openChatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openChat();
});
closeChatBtn.addEventListener('click', closeChat);

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
    // Open chat when starting journey
    openChat();
    
    // Optional: Add a welcome message
    const chatBody = document.getElementById('chatBody');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'chat-message bot-message fade-in';
    welcomeMessage.innerHTML = '<p>Awesome! Let\'s start your fitness journey. What are your fitness goals? 💪</p>';
    chatBody.appendChild(welcomeMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
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
        
        // Open chat with context
        openChat();
        
        // Add contextual message
        const chatBody = document.getElementById('chatBody');
        const contextMessage = document.createElement('div');
        contextMessage.className = 'chat-message bot-message fade-in';
        contextMessage.innerHTML = `<p>Great choice! I can help you with ${cardTitle}. What would you like to know? 🎯</p>`;
        chatBody.appendChild(contextMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
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
// 8. Chat Input Handler (Placeholder)
// ==========================================
// Note: Actual chat functionality will be handled by n8n chatbot
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

// This is a placeholder - remove or modify when integrating n8n
chatSendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        console.log('Message to send to n8n:', message);
        // Your n8n integration will handle this
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSendBtn.click();
    }
});

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
// Helper Functions
// ==========================================

// Function to add user message to chat (for n8n integration)
function addUserMessage(message) {
    const chatBody = document.getElementById('chatBody');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message fade-in';
    userMessage.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(userMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to add bot message to chat (for n8n integration)
function addBotMessage(message) {
    const chatBody = document.getElementById('chatBody');
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot-message fade-in';
    botMessage.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Export functions for n8n integration
window.StayFit = {
    openChat,
    closeChat,
    addUserMessage,
    addBotMessage
};

console.log('🎉 StayFit initialized! Ready to help users start their fitness journey.');
