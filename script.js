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










//

 
        // Monthly Revenue Chart Script
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const revenueSources = ['youtube', 'instagram', 'collaborations', 'other'];
        const sourceLabels = {
            youtube: 'Youtube',
            instagram: 'Instagram',
            collaborations: 'Collaborations',
            other: 'Other'
        };
        const sourceColors = {
            youtube: '#6d28d9',
            instagram: '#ec4899',
            collaborations: '#60a5fa',
            other: '#fbbf24'
        };
        const sourceColorEnds = {
            youtube: '#7c3aed',
            instagram: '#f43f5e',
            collaborations: '#3b82f6',
            other: '#f59e0b'
        };
        const monthlyData = new Array(12).fill(0);
        const monthlySourceData = Array.from({ length: 12 }, () => ({
            youtube: 0,
            instagram: 0,
            collaborations: 0,
            other: 0
        }));
        let selectedMonth = -1;
        let chart;
        let sourceChart;
        let sourceGrandTotal = 0;
        const sourceCenterTextPlugin = {
            id: 'sourceCenterText',
            afterDraw(chart) {
                if (chart.canvas.id !== 'sourcePieChart') return;

                const { ctx, chartArea } = chart;
                const x = (chartArea.left + chartArea.right) / 2;
                const y = (chartArea.top + chartArea.bottom) / 2;

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#020617';
                ctx.font = '700 22px Poppins, sans-serif';
                ctx.fillText(`$${sourceGrandTotal.toLocaleString()}`, x, y - 8);
                ctx.fillStyle = '#64748b';
                ctx.font = '500 13px Poppins, sans-serif';
                ctx.fillText('Total', x, y + 18);
                ctx.restore();
            }
        };

        // Initialize when page loads
        window.addEventListener('load', function() {
            initChart();
            setupEventListeners();
        });

        function initChart() {
            const ctx = document.getElementById('revenueChart');
            if (ctx) {
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Revenue',
                            data: monthlyData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            const sourceCtx = document.getElementById('sourcePieChart');
            if (sourceCtx) {
                const sourcePieContext = sourceCtx.getContext('2d');
                const sourceGradients = revenueSources.map(source => {
                    const gradient = sourcePieContext.createLinearGradient(0, 0, 180, 180);
                    gradient.addColorStop(0, sourceColors[source]);
                    gradient.addColorStop(1, sourceColorEnds[source]);
                    return gradient;
                });

                sourceChart = new Chart(sourceCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Youtube', 'Instagram', 'Collaborations', 'Other'],
                        datasets: [{
                            data: [0, 0, 0, 0],
                            backgroundColor: sourceGradients,
                            hoverBackgroundColor: revenueSources.map(source => sourceColors[source]),
                            borderWidth: 0,
                            hoverOffset: 10,
                            spacing: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '58%',
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 900,
                            easing: 'easeOutQuart'
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const value = context.raw || 0;
                                        const total = context.dataset.data.reduce((sum, item) => sum + item, 0);
                                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                        return `${context.label}: $${value} (${percentage}%)`;
                                    }
                                }
                            }
                        }
                    },
                    plugins: [sourceCenterTextPlugin]
                });
            }
        }

        function setupEventListeners() {
            // Enter Revenue button
            const enterRevenueBtn = document.getElementById('enterRevenueBtn');
            if (enterRevenueBtn) {
                enterRevenueBtn.addEventListener('click', openMonthsModal);
            }
            
            // Close modal when clicking outside
            const modal = document.getElementById('modal');
            if (modal) {
                modal.addEventListener('click', function(event) {
                    if (event.target === this) {
                        closeModal();
                    }
                });
            }
            
            document.querySelectorAll('.source-input').forEach(input => {
                input.addEventListener('input', updateRevenueTotal);
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        saveRevenue();
                    }
                });
            });

            updateSourceChart();
        }

        function openMonthsModal() {
            const monthsList = document.getElementById('monthsList');
            if (monthsList) {
                monthsList.innerHTML = '';
                
                months.forEach((month, index) => {
                    const btn = document.createElement('button');
                    btn.className = 'month-btn';
                    btn.textContent = month;
                    btn.onclick = () => selectMonth(index);
                    monthsList.appendChild(btn);
                });
            }
            
            const monthsView = document.getElementById('monthsView');
            const revenueView = document.getElementById('revenueView');
            const modal = document.getElementById('modal');
            
            if (monthsView) monthsView.style.display = 'block';
            if (revenueView) revenueView.style.display = 'none';
            if (modal) modal.classList.add('active');
        }

        function selectMonth(monthIndex) {
            selectedMonth = monthIndex;
            const monthName = months[monthIndex];
            const modalMonth = document.getElementById('modalMonth');
            
            if (modalMonth) modalMonth.textContent = monthName;
            revenueSources.forEach(source => {
                const input = document.getElementById(`${source}Revenue`);
                if (input) input.value = monthlySourceData[monthIndex][source] || '';
            });
            updateRevenueTotal();
            
            // Show previous months
            let previousHTML = '';
            if (monthIndex > 0) {
                previousHTML += '<h4>Previous Months:</h4>';
                for (let i = 0; i < monthIndex; i++) {
                    if (monthlyData[i] > 0) {
                        previousHTML += `<div class="month-item"><span>${months[i]}</span><strong>$${monthlyData[i]}</strong></div>`;
                    }
                }
            }
            const previousMonths = document.getElementById('previousMonths');
            if (previousMonths) previousMonths.innerHTML = previousHTML;
            
            const monthsView = document.getElementById('monthsView');
            const revenueView = document.getElementById('revenueView');
            
            if (monthsView) monthsView.style.display = 'none';
            if (revenueView) revenueView.style.display = 'block';
            const youtubeInput = document.getElementById('youtubeRevenue');
            if (youtubeInput) youtubeInput.focus();
        }

        function backToMonths() {
            const monthsView = document.getElementById('monthsView');
            const revenueView = document.getElementById('revenueView');
            
            if (monthsView) monthsView.style.display = 'block';
            if (revenueView) revenueView.style.display = 'none';
            selectedMonth = -1;
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            const monthsView = document.getElementById('monthsView');
            const revenueView = document.getElementById('revenueView');
            
            if (modal) modal.classList.remove('active');
            if (monthsView) monthsView.style.display = 'block';
            if (revenueView) revenueView.style.display = 'none';
            selectedMonth = -1;
        }

        function updateRevenueTotal() {
            const total = revenueSources.reduce((sum, source) => {
                const input = document.getElementById(`${source}Revenue`);
                return sum + (Number(input?.value) || 0);
            }, 0);
            const revenueTotal = document.getElementById('revenueTotal');
            if (revenueTotal) revenueTotal.textContent = `$${total}`;
            return total;
        }

        function updateSourceChart() {
            const totals = revenueSources.reduce((summary, source) => {
                summary[source] = monthlySourceData.reduce((sum, month) => sum + month[source], 0);
                return summary;
            }, {});
            const sourceValues = revenueSources.map(source => totals[source]);
            const grandTotal = sourceValues.reduce((sum, value) => sum + value, 0);
            const sourcePercentages = document.getElementById('sourcePercentages');

            sourceGrandTotal = grandTotal;
            if (sourcePercentages) {
                sourcePercentages.innerHTML = revenueSources.map(source => {
                    const percentage = grandTotal > 0 ? ((totals[source] / grandTotal) * 100).toFixed(1) : '0.0';
                    return `
                        <div class="source-percent-row">
                            <span class="source-dot" style="background-color: ${sourceColors[source]}"></span>
                            <div>
                                <span>${sourceLabels[source]}</span>
                                <strong>$${totals[source].toLocaleString()} (${percentage}%)</strong>
                            </div>
                        </div>
                    `;
                }).join('');
            }
            if (sourceChart) {
                sourceChart.data.datasets[0].data = grandTotal > 0 ? sourceValues : [1, 1, 1, 1];
                sourceChart.update();
            }
        }

        function updateTotalRevenueCard(monthIndex) {
            const totalRevenueValue = document.getElementById('totalRevenueValue');
            const revenueChange = document.getElementById('revenueChange');
            const currentRevenue = monthlyData[monthIndex] || 0;
            const previousRevenue = monthIndex > 0 ? monthlyData[monthIndex - 1] || 0 : 0;
            const currentMonthName = months[monthIndex] || 'Current month';
            const previousMonthName = monthIndex > 0 ? months[monthIndex - 1] : 'previous month';

            if (totalRevenueValue) {
                totalRevenueValue.textContent = `$${currentRevenue.toLocaleString()}`;
            }

            if (!revenueChange) return;

            revenueChange.classList.remove('profit', 'loss', 'neutral');

            if (previousRevenue === 0) {
                revenueChange.textContent = `${currentMonthName} vs ${previousMonthName}: 0%`;
                revenueChange.classList.add('neutral');
                return;
            }

            const changePercentage = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
            const roundedChange = Math.abs(changePercentage).toFixed(1);

            if (changePercentage > 0) {
                revenueChange.textContent = `${currentMonthName} vs ${previousMonthName}: +${roundedChange}% profit`;
                revenueChange.classList.add('profit');
            } else if (changePercentage < 0) {
                revenueChange.textContent = `${currentMonthName} vs ${previousMonthName}: -${roundedChange}% loss`;
                revenueChange.classList.add('loss');
            } else {
                revenueChange.textContent = `${currentMonthName} vs ${previousMonthName}: 0%`;
                revenueChange.classList.add('neutral');
            }
        }

        function saveRevenue() {
            if (selectedMonth < 0) return;

            revenueSources.forEach(source => {
                const input = document.getElementById(`${source}Revenue`);
                monthlySourceData[selectedMonth][source] = Number(input?.value) || 0;
            });
            monthlyData[selectedMonth] = updateRevenueTotal();
            if (chart) {
                chart.update();
            }
            updateSourceChart();
            updateTotalRevenueCard(selectedMonth);
            closeModal();
        }



        // API connection//

async function sendMessage(){

    let input = document.getElementById("userInput").value;

    let response = await fetch(
        "http://127.0.0.1:5000/chat",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message: input
            })
        }
    );

    let data = await response.json();

    document.getElementById("chatBox").innerHTML +=
    `
    <p>You: ${input}</p>
    <p>AI: ${data.reply || data.error}</p>
    `;
}