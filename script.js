document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const toggleIcon = menuToggle.querySelector('i');

    if (menuToggle && navbar && toggleIcon) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');

            if (navbar.classList.contains('active')) {
                toggleIcon.className = 'fa-solid fa-xmark';
            } else {
                toggleIcon.className = 'fa-solid fa-bars';
            }
        });
    }
});

//calendar//
flatpickr("#daterange", {
    mode: "range",
    format: "Y-m-d",




});


/* ========================================================================== 
   FLOATING AI CHATBOT FUNCTIONALITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const floatingButton = document.getElementById('floatingButton');
    const assistantButton = document.getElementById('assistant');
    const aiChatbot = document.getElementById('aiChatbot');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const submitBtn = document.getElementById('submitBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    // Predefined AI responses for demo
    const aiResponses = [
        "That's a great question! I can help you with your creator business strategy.",
        "Based on your metrics, I recommend focusing on engagement with your audience.",
        "I've analyzed your data and found some key insights for your brand deals.",
        "Your revenue has been growing steadily. Keep up the great work!",
        "Would you like me to provide a detailed analytics report?",
        "I can help you optimize your content strategy based on recent trends.",
        "Your audience is growing at a healthy rate. Let's maintain this momentum!",
        "I suggest scheduling content based on when your audience is most active."
    ];

    // Toggle chatbot visibility
    function toggleChatbot() {
        aiChatbot.classList.toggle('active');
        
        // Auto-focus input when chatbot opens
        if (aiChatbot.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
            scrollToBottom();
        }
    }

    // Close chatbot
    function closeChatbot() {
        aiChatbot.classList.remove('active');
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTyping() {
        typingIndicator.style.display = 'none';
    }

    // Get random AI response
    function getAIResponse(userMessage) {
        // Check for specific keywords and provide relevant responses
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('revenue') || lowerMessage.includes('earnings')) {
            return "Your revenue streams look diverse! Brand deals, sponsorships, and affiliate marketing are all performing well. Would you like me to analyze any specific revenue source?";
        } else if (lowerMessage.includes('audience') || lowerMessage.includes('followers') || lowerMessage.includes('growth')) {
            return "Your audience growth is impressive! Engagement rates are above industry average. I recommend maintaining consistent posting schedules to keep momentum.";
        } else if (lowerMessage.includes('content') || lowerMessage.includes('post')) {
            return "Based on your analytics, video content gets the most engagement. I suggest posting 3-4 times per week during peak hours (6 PM - 9 PM).";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('need')) {
            return "I'm here to help! I can analyze your analytics, provide insights, suggest content strategies, and help with business planning. What would you like to focus on?";
        } else if (lowerMessage.includes('brand') || lowerMessage.includes('deal')) {
            return "Your brand deals are performing exceptionally well! With your current audience size and engagement, you're in a great position to negotiate better rates.";
        } else if (lowerMessage.includes('engagement') || lowerMessage.includes('interaction')) {
            return "Your engagement rate is outstanding at 8.5%, which is above the 3-5% industry standard. Keep creating authentic content to maintain this momentum!";
        }
        
        // Return random response if no specific keyword found
        return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }

    // Send message
    function sendMessage() {
        const messageText = chatInput.value.trim();
        
        if (messageText === '') return;

        // Add user message
        addMessage(messageText, true);
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        // Simulate AI thinking time
        setTimeout(() => {
            hideTyping();
            const aiResponse = getAIResponse(messageText);
            addMessage(aiResponse, false);
        }, 800 + Math.random() * 600);
    }

    // Event listeners
    floatingButton.addEventListener('click', toggleChatbot);
    assistantButton.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', closeChatbot);
    chatSendBtn.addEventListener('click', sendMessage);
    submitBtn.addEventListener('click', () => {
        addMessage('✓ Form submitted successfully! We\'ll be in touch soon.', false);
        setTimeout(() => {
            chatInput.value = '';
        }, 300);
    });

    // Allow sending message with Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!aiChatbot.contains(e.target) && 
            !floatingButton.contains(e.target) && 
            !assistantButton.contains(e.target) &&
            aiChatbot.classList.contains('active')) {
            // Don't close, let user decide
        }
    });
});


