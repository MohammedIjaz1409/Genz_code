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
    const aiChatbot = document.querySelector('.chatbot-header').parentElement;
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

    // Format basic Markdown and escapes HTML
    function formatMessageText(text) {
        let html = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
        // Bold: **text** -> <strong>text</strong>
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic: *text* -> <em>text</em>
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Code: `code` -> <code>$1</code>
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // Newlines: \n -> <br>
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isUser) {
            contentDiv.textContent = text;
        } else {
            contentDiv.innerHTML = formatMessageText(text);
        }
        
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

        // Trigger send button flyOut animation
        chatSendBtn.classList.add('clicked');
        setTimeout(() => {
            chatSendBtn.classList.remove('clicked');
        }, 600);

        // Add user message
        addMessage(messageText, true);
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        // Gather live business data from dashboard state safely
        let businessData = null;
        try {
            if (typeof monthlyData !== 'undefined' && typeof monthlySourceData !== 'undefined' && typeof months !== 'undefined') {
                businessData = {
                    totalRevenue: document.getElementById('totalRevenueValue')?.textContent || '$0',
                    monthlyTrend: months.map((m, i) => `${m}: $${monthlyData[i] || 0}`).join(', '),
                    sources: {
                        youtube: monthlySourceData.reduce((sum, m) => sum + (m.youtube || 0), 0),
                        instagram: monthlySourceData.reduce((sum, m) => sum + (m.instagram || 0), 0),
                        collaborations: monthlySourceData.reduce((sum, m) => sum + (m.collaborations || 0), 0),
                        other: monthlySourceData.reduce((sum, m) => sum + (m.other || 0), 0)
                    }
                };
            }
        } catch (e) {
            console.error('Error gathering dashboard data:', e);
        }

        // Determine correct backend API URL dynamically
        const backendUrl = window.location.protocol.startsWith('http') 
            ? '/api/chat' 
            : 'http://127.0.0.1:5000/api/chat';

        // Fetch response from Flask backend
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: messageText,
                businessData: businessData
            })
        })
        .then(response => response.json().then(data => ({ status: response.status, data })))
        .then(({ status, data }) => {
            hideTyping();
            if (status === 200 && data.response) {
                addMessage(data.response, false);
            } else {
                const errMsg = data.message || data.error || 'Something went wrong. Please check your backend logs.';
                addMessage(`❌ Error: ${errMsg}`, false);
            }
        })
        .catch(error => {
            hideTyping();
            console.error('Fetch error:', error);
            addMessage('❌ Error: Could not connect to the AI assistant backend. Please ensure the Flask server is running on port 5000.', false);
        });
    }

    // Event listeners
    floatingButton.addEventListener('click', toggleChatbot);
    assistantButton.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', closeChatbot);
    chatSendBtn.addEventListener('click', sendMessage);
    submitBtn.addEventListener('click', () => {
        if (submitBtn.classList.contains('success')) return;

        // Trigger success animation
        submitBtn.classList.add('success');
        submitBtn.disabled = true;
        
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Submitted!';
        
        addMessage('✓ Form submitted successfully! We\'ll be in touch soon.', false);
        
        setTimeout(() => {
            chatInput.value = '';
        }, 300);

        // Reset button state after 2 seconds
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }, 2000);
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
            other: 0,
            brandDeals: 0
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

            // Toggle Brand Deals Input in Enter Revenue Modal
            const toggleBrandDealsInputBtn = document.getElementById('toggleBrandDealsInputBtn');
            const brandDealsInputContainer = document.getElementById('brandDealsInputContainer');
            if (toggleBrandDealsInputBtn && brandDealsInputContainer) {
                toggleBrandDealsInputBtn.addEventListener('click', () => {
                    const isHidden = brandDealsInputContainer.style.display === 'none';
                    if (isHidden) {
                        brandDealsInputContainer.style.display = 'block';
                        toggleBrandDealsInputBtn.innerHTML = '<i class="fa-solid fa-minus"></i> Hide Brand Deals count';
                        const brandDealsCountInput = document.getElementById('brandDealsCount');
                        if (brandDealsCountInput) brandDealsCountInput.focus();
                    } else {
                        brandDealsInputContainer.style.display = 'none';
                        toggleBrandDealsInputBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Brand Deals count';
                    }
                });
            }

            // Remove Brand Deals button
            const removeBrandDealsBtn = document.getElementById('removeBrandDealsBtn');
            if (removeBrandDealsBtn) {
                removeBrandDealsBtn.addEventListener('click', () => {
                    const brandDealsCountInput = document.getElementById('brandDealsCount');
                    if (brandDealsCountInput) brandDealsCountInput.value = '';
                    // Immediately persist the cleared value so it stays gone
                    if (selectedMonth >= 0) {
                        monthlySourceData[selectedMonth].brandDeals = 0;
                        updateBrandDealsCard(selectedMonth);
                    }
                    // Hide the container and reset toggle button
                    const brandDealsContainer = document.getElementById('brandDealsInputContainer');
                    const toggleBtn = document.getElementById('toggleBrandDealsInputBtn');
                    if (brandDealsContainer) brandDealsContainer.style.display = 'none';
                    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Brand Deals count';
                });
            }

            updateSourceChart();
        }

        function openMonthsModal() {
            const monthsList = document.getElementById('monthsList');
            if (monthsList) {
                monthsList.innerHTML = '';
                
                months.forEach((month, index) => {
                    const hasData = monthlyData[index] > 0;

                    // Wrapper row
                    const row = document.createElement('div');
                    row.className = 'month-row';

                    // Month select button
                    const btn = document.createElement('button');
                    btn.className = `month-btn${hasData ? ' has-data' : ''}`;
                    btn.textContent = month;
                    btn.title = hasData ? `${month} — click to edit revenue` : `${month} — no data yet`;
                    btn.onclick = () => selectMonth(index);

                    // Delete button (only visible if month has data)
                    const delBtn = document.createElement('button');
                    delBtn.className = `month-delete-btn${hasData ? ' visible' : ''}`;
                    delBtn.title = `Clear all data for ${month}`;
                    delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                    delBtn.onclick = (e) => {
                        e.stopPropagation();
                        clearMonthData(index);
                    };

                    row.appendChild(btn);
                    row.appendChild(delBtn);
                    monthsList.appendChild(row);
                });
            }
            
            const monthsView = document.getElementById('monthsView');
            const revenueView = document.getElementById('revenueView');
            const modal = document.getElementById('modal');
            
            if (monthsView) monthsView.style.display = 'block';
            if (revenueView) revenueView.style.display = 'none';
            if (modal) modal.classList.add('active');
        }

        function clearMonthData(monthIndex) {
            // Reset only revenue sources (YouTube, Instagram, Collaborations, Other)
            // Brand Deals count is NOT cleared by this button
            revenueSources.forEach(source => {
                monthlySourceData[monthIndex][source] = 0;
            });
            monthlyData[monthIndex] = 0;

            // Update chart
            if (chart) chart.update();
            updateSourceChart();
            updateTotalRevenueCard(monthIndex);

            // Refresh the months list so delete buttons update visibility
            openMonthsModal();
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
            
            // Populate brand deals count input
            const brandDealsInput = document.getElementById('brandDealsCount');
            if (brandDealsInput) {
                brandDealsInput.value = monthlySourceData[monthIndex].brandDeals || '';
            }
            
            // Show or hide brand deals container based on whether a value exists
            const brandDealsContainer = document.getElementById('brandDealsInputContainer');
            const toggleBrandDealsBtn = document.getElementById('toggleBrandDealsInputBtn');
            const hasExistingDeals = monthlySourceData[monthIndex].brandDeals > 0;
            if (brandDealsContainer) {
                brandDealsContainer.style.display = hasExistingDeals ? 'block' : 'none';
            }
            if (toggleBrandDealsBtn) {
                toggleBrandDealsBtn.innerHTML = hasExistingDeals
                    ? '<i class="fa-solid fa-minus"></i> Hide Brand Deals count'
                    : '<i class="fa-solid fa-plus"></i> Add Brand Deals count';
            }
            
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

        function updateBrandDealsCard(monthIndex) {
            const brandDealsValue = document.getElementById('brandDealsValue');
            const brandDealsChange = document.getElementById('brandDealsChange');
            if (!brandDealsValue) return;

            const currentDeals = monthlySourceData[monthIndex]?.brandDeals || 0;
            brandDealsValue.textContent = currentDeals;

            if (!brandDealsChange) return;

            const previousDeals = monthIndex > 0 ? (monthlySourceData[monthIndex - 1]?.brandDeals || 0) : 0;
            const currentMonthName = months[monthIndex] || 'Current';
            const previousMonthName = monthIndex > 0 ? months[monthIndex - 1] : 'prev';

            brandDealsChange.classList.remove('profit', 'loss', 'neutral');

            const diff = currentDeals - previousDeals;
            if (diff > 0) {
                brandDealsChange.textContent = `${currentMonthName} vs ${previousMonthName}: +${diff} deals`;
                brandDealsChange.classList.add('profit');
            } else if (diff < 0) {
                brandDealsChange.textContent = `${currentMonthName} vs ${previousMonthName}: -${Math.abs(diff)} deals`;
                brandDealsChange.classList.add('loss');
            } else {
                brandDealsChange.textContent = `${currentMonthName} vs ${previousMonthName}: no change`;
                brandDealsChange.classList.add('neutral');
            }
        }

        function saveRevenue() {
            if (selectedMonth < 0) return;

            revenueSources.forEach(source => {
                const input = document.getElementById(`${source}Revenue`);
                monthlySourceData[selectedMonth][source] = Number(input?.value) || 0;
            });

            // Save brand deals count
            const brandDealsInput = document.getElementById('brandDealsCount');
            if (brandDealsInput) {
                monthlySourceData[selectedMonth].brandDeals = Number(brandDealsInput.value) || 0;
            }

            monthlyData[selectedMonth] = updateRevenueTotal();
            if (chart) {
                chart.update();
            }
            updateSourceChart();
            updateTotalRevenueCard(selectedMonth);
            updateBrandDealsCard(selectedMonth);
            closeModal();
        }

/* ==========================================================================
   TASKS & REMINDERS FUNCTIONALITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskDialog = document.getElementById('taskDialog');
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskListWrapper = document.querySelector('.task-list-wrapper');
    const taskCountBadge = document.getElementById('taskCount');
    
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newContBtn = document.querySelector('.newcont'); // Header "+ New Task & Remainders" button
    const closeTaskDialogBtn = document.getElementById('closeTaskDialogBtn');
    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
    const showMoreTasksBtn = document.getElementById('showMoreTasksBtn');
    
    const taskDueDateInput = document.getElementById('taskDueDate');

    // State
    let tasks = [];
    let isTasksExpanded = false;

    // Default mock tasks
    const defaultTasks = [
        {
            id: 1,
            title: "Edit YouTube Video Draft",
            notes: "Review final cut, add B-roll, background music and color grading.",
            dueDate: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 1); // Tomorrow
                return d.toISOString().split('T')[0];
            })()
        },
        {
            id: 2,
            title: "Instagram Collaboration Reels",
            notes: "Schedule brand partnership video with Sponsor X and tag their profile.",
            dueDate: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 3);
                return d.toISOString().split('T')[0];
            })()
        },
        {
            id: 3,
            title: "Monthly Revenue Reconciliation",
            notes: "Verify sponsorships and AdSense payouts are matching dashboard reports.",
            dueDate: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 5);
                return d.toISOString().split('T')[0];
            })()
        },
        {
            id: 4,
            title: "Script Next 3 YouTube Shorts",
            notes: "Focus on strong hooks (first 3s) and write clear Call to Actions.",
            dueDate: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 7);
                return d.toISOString().split('T')[0];
            })()
        },
        {
            id: 5,
            title: "Sponsor Pitch Emails",
            notes: "Send media kit and summer campaigns proposal to target fashion brands.",
            dueDate: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 10);
                return d.toISOString().split('T')[0];
            })()
        }
    ];

    // Load tasks from localStorage or use defaults
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                tasks = JSON.parse(storedTasks);
            } catch (e) {
                console.error("Failed to parse stored tasks:", e);
                tasks = [...defaultTasks];
            }
        } else {
            tasks = [...defaultTasks];
            saveTasksToStorage();
        }
        renderTasks();
    }

    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initialize Flatpickr for completion date
    if (typeof flatpickr !== 'undefined' && taskDueDateInput) {
        flatpickr(taskDueDateInput, {
            dateFormat: "Y-m-d",
            minDate: "today",
            defaultDate: "today",
            disableMobile: "true"
        });
    }

    // Helper to format due dates nicely
    function getDueDateBadge(dateStr) {
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const dueDate = new Date(dateStr);
        dueDate.setHours(0,0,0,0);
        
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { text: `Overdue (${Math.abs(diffDays)}d ago)`, class: 'overdue' };
        } else if (diffDays === 0) {
            return { text: 'Today', class: 'urgent' };
        } else if (diffDays === 1) {
            return { text: 'Tomorrow', class: 'urgent' };
        } else if (diffDays <= 3) {
            return { text: `In ${diffDays} days`, class: 'urgent' };
        } else {
            const options = { month: 'short', day: 'numeric' };
            return { text: dueDate.toLocaleDateString('en-US', options), class: '' };
        }
    }

    // Render list items dynamically
    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = '';
        
        // Update Count badge
        if (taskCountBadge) {
            taskCountBadge.textContent = `${tasks.length} ${tasks.length === 1 ? 'Task' : 'Tasks'}`;
        }

        if (tasks.length === 0) {
            taskList.innerHTML = `<li style="display: flex; justify-content: center; padding: 30px; color: #64748b; font-size: 13px; font-style: italic; border: 1.5px dashed #cbd5e1; border-radius: 8px;">No current tasks or reminders</li>`;
            if (showMoreTasksBtn) showMoreTasksBtn.style.display = 'none';
            if (taskListWrapper) taskListWrapper.style.maxHeight = 'none';
            return;
        }
        // Create tasks HTML
        tasks.forEach((task, index) => {
            const badgeInfo = getDueDateBadge(task.dueDate);
            const li = document.createElement('li');
            li.className = `task-item${task.completed ? ' completed-task' : ''}`;
            li.style.animationDelay = `${index * 0.05}s`;
            
            li.innerHTML = `
                <div class="task-complete-btn ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <span class="task-number">${index + 1}</span>
                    <i class="fa-solid fa-check check-icon"></i>
                </div>
                <div class="task-content">
                    <h4 class="task-item-title">${escapeHTML(task.title)}</h4>
                    <p class="task-item-notes">${escapeHTML(task.notes || 'No description.')}</p>
                </div>
                <div class="task-due-date">
                    <span class="due-badge ${badgeInfo.class}">
                        <i class="fa-regular fa-clock"></i> ${badgeInfo.text}
                    </span>
                </div>
                <button class="task-delete-btn" data-id="${task.id}" aria-label="Delete task">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            taskList.appendChild(li);
        });

        // Handle Expansion Heights and Show More Visibility
        updateListLayout(false); // Update without animation state changes
    }

    // Helper to escape HTML to prevent XSS
    function escapeHTML(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Handle height transition updates
    function updateListLayout(isToggle = false) {
        if (!taskList || !taskListWrapper || !showMoreTasksBtn) return;

        const tasksCard = document.querySelector('.tasks');
        const items = taskList.querySelectorAll('.task-item');
        
        // Gaps and paddings
        const listGap = 8;
        const cardPadding = 40; // 20px top + 20px bottom
        const headerHeight = document.querySelector('.tasks-header')?.offsetHeight || 30;
        const footerHeight = document.querySelector('.tasks-footer')?.offsetHeight || 50;

        // Height for 3 items
        let collapsedListHeight = 0;
        for (let i = 0; i < Math.min(3, items.length); i++) {
            if (items[i]) {
                collapsedListHeight += items[i].offsetHeight + (i < 2 ? listGap : 0);
            }
        }
        // Total collapsed card content height
        const collapsedCardHeight = headerHeight + footerHeight + collapsedListHeight + cardPadding + 15;

        // Height for all items
        let fullListHeight = 0;
        items.forEach((item, i) => {
            fullListHeight += item.offsetHeight + (i < items.length - 1 ? listGap : 0);
        });
        // Total expanded card content height
        const fullCardHeight = headerHeight + footerHeight + fullListHeight + cardPadding + 15;

        if (tasks.length > 3) {
            showMoreTasksBtn.style.display = 'flex';
            
            if (isTasksExpanded) {
                if (isToggle && tasksCard) {
                    // Clicked "See More" - 2 stage transition:
                    // Stage 1: Shrink from current card height to collapsed card height ("as small as possible")
                    tasksCard.classList.remove('expanded');
                    tasksCard.style.height = `${collapsedCardHeight}px`;
                    taskListWrapper.style.maxHeight = `${collapsedListHeight}px`;
                    
                    // Stage 2: After shrink transition completes, extend to full height
                    setTimeout(() => {
                        tasksCard.style.height = `${fullCardHeight}px`;
                        taskListWrapper.style.maxHeight = `${fullListHeight + 10}px`;
                    }, 350);

                    // Stage 3: After extend transition completes, set to auto
                    setTimeout(() => {
                        tasksCard.classList.add('expanded');
                        tasksCard.style.height = '';
                    }, 750);
                } else {
                    // Normal render or resize (no animation)
                    if (tasksCard) {
                        tasksCard.classList.add('expanded');
                        tasksCard.style.height = '';
                    }
                    taskListWrapper.style.maxHeight = 'none';
                }
                showMoreTasksBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up" style="margin-left: 6px;"></i>';
            } else {
                if (isToggle && tasksCard) {
                    // Clicked "Show Less" - collapse card to target row height
                    tasksCard.classList.remove('expanded');
                    // Set to current height explicitly first
                    tasksCard.style.height = `${fullCardHeight}px`;
                    taskListWrapper.style.maxHeight = `${fullListHeight + 10}px`;
                    
                    // Force reflow
                    tasksCard.offsetHeight;
                    
                    // Transition to row height
                    const rowHeight = window.innerWidth > 1024 ? 300 : (window.innerWidth > 788 ? 260 : 240);
                    tasksCard.style.height = `${rowHeight}px`;
                    taskListWrapper.style.maxHeight = `${collapsedListHeight}px`;
                    
                    // Clear inline style after transition
                    setTimeout(() => {
                        tasksCard.style.height = '';
                    }, 350);
                } else {
                    // Normal render or resize (no animation)
                    if (tasksCard) {
                        tasksCard.classList.remove('expanded');
                        tasksCard.style.height = ''; // uses CSS fixed height
                    }
                    taskListWrapper.style.maxHeight = `${collapsedListHeight}px`;
                }
                showMoreTasksBtn.innerHTML = 'Show More <i class="fa-solid fa-chevron-down" style="margin-left: 6px;"></i>';
            }
        } else {
            showMoreTasksBtn.style.display = 'none';
            taskListWrapper.style.maxHeight = 'none';
            if (tasksCard) {
                tasksCard.classList.remove('expanded');
                tasksCard.style.height = '';
            }
        }
    }

    // Modal Interaction
    function openModal() {
        if (taskDialog) {
            // Reset form values
            taskForm.reset();
            // Reset flatpickr date input to today
            if (taskDueDateInput._flatpickr) {
                taskDueDateInput._flatpickr.setDate(new Date());
            }
            taskDialog.showModal();
        }
    }

    // Handle form close cleanly
    function closeModal() {
        if (taskDialog) {
            taskDialog.close();
        }
    }

    // Toggle completion status
    function toggleTaskComplete(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasksToStorage();
        renderTasks();
    }

    // Delete task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToStorage();
        renderTasks();
    }

    // Event Listeners
    if (taskList) {
        taskList.addEventListener('click', (e) => {
            const completeBtn = e.target.closest('.task-complete-btn');
            if (completeBtn) {
                const id = parseInt(completeBtn.dataset.id);
                toggleTaskComplete(id);
                return;
            }

            const deleteBtn = e.target.closest('.task-delete-btn');
            if (deleteBtn) {
                const id = parseInt(deleteBtn.dataset.id);
                deleteTask(id);
                return;
            }
        });
    }

    if (addTaskBtn) addTaskBtn.addEventListener('click', openModal);
    if (newContBtn) newContBtn.addEventListener('click', openModal);
    if (closeTaskDialogBtn) closeTaskDialogBtn.addEventListener('click', closeModal);
    if (cancelTaskBtn) cancelTaskBtn.addEventListener('click', closeModal);

    // Show More Toggle click event
    if (showMoreTasksBtn) {
        showMoreTasksBtn.addEventListener('click', () => {
            isTasksExpanded = !isTasksExpanded;
            updateListLayout(true);
        });
    }

    // Form Submission handler
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('taskTitle').value.trim();
            const notes = document.getElementById('taskNotes').value.trim();
            const dueDate = document.getElementById('taskDueDate').value;

            if (!title || !dueDate) return;

            const newTask = {
                id: Date.now(),
                title: title,
                notes: notes,
                completed: false,
                dueDate: dueDate
            };

            tasks.push(newTask);
            
            // Sort tasks by due date (soonest first)
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

            saveTasksToStorage();
            renderTasks();
            closeModal();
        });
    }

    // Recalculate heights on window resize to ensure responsiveness matches offsets
    window.addEventListener('resize', () => {
        updateListLayout(false);
    });

    // Run initialization
    loadTasks();
});


/* ==========================================================================
   AI BUSINESS RECOMMENDATION ENGINE
   ========================================================================== */

(function () {
    // --- DOM refs ---
    const getRecsBtn     = document.getElementById('getRecsBtn');
    const recDrawer      = document.getElementById('recDrawer');
    const recDrawerBody  = document.getElementById('recDrawerBody');
    const recDrawerClose = document.getElementById('recDrawerClose');
    const recOverlay     = document.getElementById('recDrawerOverlay');

    if (!getRecsBtn || !recDrawer || !recDrawerBody) return;

    // --- Helpers ---

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function showDrawerSkeleton() {
        recDrawerBody.innerHTML = `
            <div class="rec-skeleton">
                <div class="rec-skeleton-card"></div>
                <div class="rec-skeleton-card"></div>
                <div class="rec-skeleton-card"></div>
            </div>`;
    }

    function showDrawerError(msg) {
        recDrawerBody.innerHTML = `
            <div class="rec-error">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${esc(msg)}</span>
            </div>`;
        openDrawer();
    }

    function priorityClass(p) {
        const map = { High: 'high', Medium: 'medium', Low: 'low' };
        return map[p] || 'medium';
    }

    function openDrawer() {
        recDrawer.classList.add('active');
        recOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        recDrawer.classList.remove('active');
        recOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderRecommendationsInDrawer(recs) {
        if (!recs || !recs.length) {
            recDrawerBody.innerHTML = '<div class="rec-drawer-placeholder"><i class="fa-solid fa-robot"></i><p>No recommendations returned. Try adding more profile details.</p></div>';
            openDrawer();
            return;
        }

        const listEl = document.createElement('div');
        listEl.className = 'rec-cards-list';

        recs.forEach((rec, i) => {
            const actionsHTML = (rec.actions || [])
                .map(a => `<div class="rec-action-item">${esc(a)}</div>`)
                .join('');

            const card = document.createElement('div');
            card.className = 'rec-card';
            card.style.animationDelay = `${i * 0.08}s`;
            card.innerHTML = `
                <div class="rec-card-top">
                    <div class="rec-card-title">${esc(rec.title)}</div>
                    <span class="rec-priority ${priorityClass(rec.priority)}">${esc(rec.priority)}</span>
                </div>
                <span class="rec-category">${esc(rec.category)}</span>
                <p class="rec-reason">${esc(rec.reason)}</p>
                <p class="rec-impact"><i class="fa-solid fa-bolt" style="color:#822cfb; font-size:10px; margin-right:3px;"></i>${esc(rec.impact)}</p>
                <div class="rec-actions">${actionsHTML}</div>
            `;
            listEl.appendChild(card);
        });

        recDrawerBody.innerHTML = '';
        recDrawerBody.appendChild(listEl);
        openDrawer();
    }

    function getCreatorProfile() {
        return {
            niche:         document.getElementById('recNiche')?.value.trim()       || '',
            followers:     document.getElementById('recFollowers')?.value.trim()   || '',
            engagement:    document.getElementById('recEngagement')?.value.trim()  || '',
            avgViews:      document.getElementById('recAvgViews')?.value.trim()    || '',
            audience:      document.getElementById('recAudience')?.value.trim()    || '',
            contentType:   document.getElementById('recContentType')?.value.trim() || '',
            previousDeals: document.getElementById('recPrevDeals')?.value.trim()   || 'None'
        };
    }

    function updateAnalyticsCards(profile) {
        const audienceVal = document.getElementById('audienceGrowthValue');
        const audienceChange = document.getElementById('audienceGrowthChange');
        const engagementVal = document.getElementById('engagementRateValue');
        const engagementChange = document.getElementById('engagementRateChange');

        if (profile.engagement) {
            const eng = profile.engagement.replace('%', '');
            engagementVal.textContent = `${eng}%`;
            engagementChange.textContent = 'From AI profile data';
            engagementChange.className = 'revenue-change profit';
        }

        if (profile.followers) {
            const num = parseInt(profile.followers.replace(/,/g, ''));
            if (!isNaN(num)) {
                audienceVal.textContent = num >= 1000000
                    ? `${(num / 1000000).toFixed(1)}M`
                    : num >= 1000
                        ? `${(num / 1000).toFixed(1)}K`
                        : num.toLocaleString();
                audienceChange.textContent = 'From AI profile data';
                audienceChange.className = 'revenue-change profit';
            }
        }

        if (profile.audience) {
            audienceChange.textContent = `Age: ${profile.audience}`;
        }
    }

    function getDashboardData() {
        try {
            const totalRev = typeof monthlyData !== 'undefined'
                ? monthlyData.reduce((s, v) => s + v, 0)
                : 0;
            const sources = typeof monthlySourceData !== 'undefined'
                ? monthlySourceData.reduce((acc, m) => {
                    acc.youtube        += m.youtube        || 0;
                    acc.instagram      += m.instagram      || 0;
                    acc.collaborations += m.collaborations || 0;
                    acc.other          += m.other          || 0;
                    acc.brandDeals     += m.brandDeals     || 0;
                    return acc;
                  }, { youtube: 0, instagram: 0, collaborations: 0, other: 0, brandDeals: 0 })
                : {};

            return {
                totalRevenue:          `$${totalRev.toLocaleString()}`,
                youtubeRevenue:        `$${(sources.youtube || 0).toLocaleString()}`,
                instagramRevenue:      `$${(sources.instagram || 0).toLocaleString()}`,
                collaborationRevenue:  `$${(sources.collaborations || 0).toLocaleString()}`,
                brandDeals:            sources.brandDeals || 0
            };
        } catch (e) {
            return {};
        }
    }

    async function fetchRecommendations() {
        const profile = getCreatorProfile();

        if (!profile.niche) {
            recDrawerBody.innerHTML = `
                <div class="rec-error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Please enter at least your <strong>Niche / Category</strong> before generating recommendations.</span>
                </div>`;
            openDrawer();
            return;
        }

        updateAnalyticsCards(profile);
        getRecsBtn.disabled = true;
        getRecsBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analysing...';
        showDrawerSkeleton();
        openDrawer();

        try {
            const res = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    creatorProfile: profile,
                    dashboardData:  getDashboardData()
                })
            });

            const json = await res.json();

            if (!res.ok || json.error) {
                showDrawerError(json.message || json.error || 'Unknown error from server.');
                return;
            }

            renderRecommendationsInDrawer(json.recommendations);

        } catch (err) {
            showDrawerError('Could not reach the server. Make sure the Flask app is running on port 5000.');
        } finally {
            getRecsBtn.disabled = false;
            getRecsBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Get Recommendations';
        }
    }

    // Wire up
    getRecsBtn.addEventListener('click', fetchRecommendations);
    if (recDrawerClose) recDrawerClose.addEventListener('click', closeDrawer);
    if (recOverlay) recOverlay.addEventListener('click', closeDrawer);
})();

/* ==========================================================================
   CONTENT MANAGER (Upcoming & Top Performing)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contentDialog = document.getElementById('contentDialog');
    const contentForm = document.getElementById('contentForm');
    const contentName = document.getElementById('contentName');
    const contentImage = document.getElementById('contentImage');
    const contentImageFile = document.getElementById('contentImageFile');
    const contentDate = document.getElementById('contentDate');
    const contentViews = document.getElementById('contentViews');
    const contentDateGroup = document.getElementById('contentDateGroup');
    const contentViewsGroup = document.getElementById('contentViewsGroup');
    const contentPreviewImg = document.getElementById('contentPreviewImg');
    const contentPreviewPlaceholder = document.getElementById('contentPreviewPlaceholder');
    const contentDialogTitle = document.getElementById('contentDialogTitle');
    const closeContentDialogBtn = document.getElementById('closeContentDialogBtn');
    const cancelContentBtn = document.getElementById('cancelContentBtn');
    const submitContentBtn = document.getElementById('submitContentBtn');

    let currentSection = '';

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        const opts = { month: 'short', day: 'numeric', year: 'numeric' };
        return d.toLocaleDateString('en-US', opts);
    }

    function loadContent() {
        ['upcoming', 'top'].forEach(section => {
            const list = document.getElementById(`${section}List`);
            if (!list) return;
            const items = JSON.parse(localStorage.getItem(`content_${section}`) || '[]');
            if (section === 'top') {
                items.sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0));
            }
            if (items.length === 0) {
                list.innerHTML = `<div class="content-empty">No content added yet</div>`;
                return;
            }
            list.innerHTML = items.map((item, i) => `
                <div class="content-item">
                    <span class="content-rank">${section === 'top' ? `${i + 1}.` : ''}</span>
                    <img src="${esc(item.image || '')}" alt="${esc(item.name)}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><rect fill=%22%23e2e8f0%22 width=%2240%22 height=%2240%22/><text x=%2220%22 y=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22 font-size=%2210%22>No img</text></svg>'">
                    <div class="content-item-info">
                        <span class="content-item-name">${esc(item.name)}</span>
                        <span class="content-item-date">${section === 'top' ? `${Number(item.views || 0).toLocaleString()} views` : (item.date ? formatDate(item.date) : '')}</span>
                    </div>
                    <button class="content-item-delete" data-section="${section}" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `).join('');
        });
    }

    function saveContent(section, items) {
        localStorage.setItem(`content_${section}`, JSON.stringify(items));
        loadContent();
    }

    // Handle file upload → convert to data URL
    contentImageFile.addEventListener('change', () => {
        const file = contentImageFile.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            contentImage.value = dataUrl;
            contentPreviewImg.src = dataUrl;
            contentPreviewImg.style.display = 'block';
            contentPreviewPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    // URL preview
    contentImage.addEventListener('input', () => {
        const url = contentImage.value.trim();
        if (url) {
            contentPreviewImg.src = url;
            contentPreviewImg.style.display = 'block';
            contentPreviewPlaceholder.style.display = 'none';
        } else {
            contentPreviewImg.style.display = 'none';
            contentPreviewPlaceholder.style.display = 'inline';
        }
    });

    // Open dialog with today's date
    document.querySelectorAll('.add-content-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSection = btn.dataset.section;
            contentDialogTitle.textContent = currentSection === 'upcoming' ? 'Add Upcoming Content' : 'Add Top Performing Content';

            if (currentSection === 'upcoming') {
                contentDateGroup.style.display = '';
                contentViewsGroup.style.display = 'none';
                contentDate.required = true;
                contentViews.required = false;
            } else {
                contentDateGroup.style.display = 'none';
                contentViewsGroup.style.display = '';
                contentDate.required = false;
                contentViews.required = true;
            }

            contentForm.reset();
            contentDate.value = new Date().toISOString().split('T')[0];
            contentPreviewImg.style.display = 'none';
            contentPreviewPlaceholder.style.display = 'inline';
            contentDialog.showModal();
        });
    });

    function closeContentDialog() { contentDialog.close(); }
    if (closeContentDialogBtn) closeContentDialogBtn.addEventListener('click', closeContentDialog);
    if (cancelContentBtn) cancelContentBtn.addEventListener('click', closeContentDialog);

    submitContentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = contentName.value.trim();
        const image = contentImage.value.trim();
        const date = contentDate.value;
        const views = contentViews.value;
        if (!name) return;
        if (currentSection === 'upcoming' && !date) return;
        if (currentSection === 'top' && !views) return;

        const items = JSON.parse(localStorage.getItem(`content_${currentSection}`) || '[]');
        items.push({ name, image, date, views });
        saveContent(currentSection, items);
        closeContentDialog();
    });

    // Delete
    document.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.content-item-delete');
        if (!delBtn) return;
        const section = delBtn.dataset.section;
        const index = parseInt(delBtn.dataset.index);
        const items = JSON.parse(localStorage.getItem(`content_${section}`) || '[]');
        items.splice(index, 1);
        saveContent(section, items);
    });

    loadContent();
});