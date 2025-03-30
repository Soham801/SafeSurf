// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Password Strength Meter Elements
const passwordInput = document.getElementById('password-input');
const togglePassword = document.getElementById('toggle-password');
const strengthIndicator = document.getElementById('strength-indicator');
const strengthText = document.getElementById('strength-text');
const lengthCheck = document.getElementById('length-check');
const uppercaseCheck = document.getElementById('uppercase-check');
const lowercaseCheck = document.getElementById('lowercase-check');
const numberCheck = document.getElementById('number-check');
const specialCheck = document.getElementById('special-check');

// Phishing Checker Elements
const phishingForm = document.getElementById('phishing-form');
const urlInput = document.getElementById('url-input');
const phishingResults = document.getElementById('phishing-results');
const phishingLoader = document.getElementById('phishing-loader');
const riskLevel = document.getElementById('risk-level');
const riskScore = document.getElementById('risk-score');
const riskIndicator = document.getElementById('risk-indicator');
const riskSummary = document.getElementById('risk-summary');
const riskFactors = document.getElementById('risk-factors');

// Cyber Habits Elements
const habitsQuiz = document.getElementById('habits-quiz');
const habitsResults = document.getElementById('habits-results');
const questionCounter = document.getElementById('question-counter');
const quizPercentage = document.getElementById('quiz-percentage');
const quizProgressIndicator = document.getElementById('quiz-progress-indicator');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionBtn = document.getElementById('next-question');
const restartQuizBtn = document.getElementById('restart-quiz');
const habitsScoreValue = document.getElementById('habits-score-value');
const scoreCircle = document.getElementById('score-circle');
const scoreRating = document.getElementById('score-rating');
const recommendationsList = document.getElementById('recommendations-list');

// Cyber Tips Elements
const tipsSlider = document.getElementById('tips-slider');
const prevTipBtn = document.getElementById('prev-tip');
const nextTipBtn = document.getElementById('next-tip');
const tipIndicators = document.getElementById('tip-indicators');

// Theme Toggle Functionality
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.checked = true;
} else {
    body.classList.add('light-theme');
    themeToggle.checked = false;
}

// Password Strength Meter Functionality
togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;
    
    // Check length
    if (password.length >= 8) {
        lengthCheck.classList.add('met');
        strength += 20;
    } else {
        lengthCheck.classList.remove('met');
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
        uppercaseCheck.classList.add('met');
        strength += 20;
    } else {
        uppercaseCheck.classList.remove('met');
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
        lowercaseCheck.classList.add('met');
        strength += 20;
    } else {
        lowercaseCheck.classList.remove('met');
    }
    
    // Check numbers
    if (/[0-9]/.test(password)) {
        numberCheck.classList.add('met');
        strength += 20;
    } else {
        numberCheck.classList.remove('met');
    }
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        specialCheck.classList.add('met');
        strength += 20;
    } else {
        specialCheck.classList.remove('met');
    }
    
    // Update strength indicator
    strengthIndicator.style.width = `${strength}%`;
    
    // Update strength text and color
    if (strength === 0) {
        strengthText.textContent = 'None';
        strengthIndicator.style.backgroundColor = 'var(--secondary-color)';
    } else if (strength <= 40) {
        strengthText.textContent = 'Weak';
        strengthIndicator.style.backgroundColor = 'var(--danger-color)';
    } else if (strength <= 80) {
        strengthText.textContent = 'Medium';
        strengthIndicator.style.backgroundColor = 'var(--warning-color)';
    } else {
        strengthText.textContent = 'Strong';
        strengthIndicator.style.backgroundColor = 'var(--success-color)';
    }
    
    // Add animation effect
    strengthIndicator.classList.remove('animate');
    void strengthIndicator.offsetWidth; // Trigger reflow
    strengthIndicator.classList.add('animate');
});

// Phishing Risk Checker Functionality
phishingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value;
    
    if (!url) return;
    
    // Show loader and hide results
    phishingResults.classList.add('hidden');
    phishingLoader.classList.remove('hidden');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        // This is a simulation - in a real app, you'd call an actual API
        analyzeUrl(url);
        
        // Hide loader and show results
        phishingLoader.classList.add('hidden');
        phishingResults.classList.remove('hidden');
    }, 2000);
});

function analyzeUrl(url) {
    // This is a simplified simulation of URL analysis
    // In a real app, this would be done by a backend service
    
    // Generate a random score for demo purposes
    const score = Math.floor(Math.random() * 100);
    let risk, factors, summary;
    
    // Set risk level based on score
    if (score >= 70) {
        risk = 'Low Risk';
        riskLevel.className = 'badge success';
        riskIndicator.style.backgroundColor = 'var(--success-color)';
        riskIndicator.style.width = `${score}%`;
        summary = 'This URL appears to be safe';
        factors = [
            'Domain has been registered for a long time',
            'SSL certificate is valid',
            'No suspicious redirects detected',
            'Not found in phishing databases'
        ];
    } else if (score >= 40) {
        risk = 'Medium Risk';
        riskLevel.className = 'badge warning';
        riskIndicator.style.backgroundColor = 'var(--warning-color)';
        riskIndicator.style.width = `${score}%`;
        summary = 'This URL has some suspicious elements';
        factors = [
            'Domain was registered recently',
            'Similar to known legitimate sites',
            'Contains unusual URL parameters',
            'Uses URL shortening service'
        ];
    } else {
        risk = 'High Risk';
        riskLevel.className = 'badge danger';
        riskIndicator.style.backgroundColor = 'var(--danger-color)';
        riskIndicator.style.width = `${score}%`;
        summary = 'Warning: Potential phishing site detected';
        factors = [
            'Domain mimics a well-known brand',
            'Uses suspicious TLD',
            'Contains misleading characters',
            'Missing or invalid SSL certificate',
            'Recently registered domain'
        ];
    }
    
    // Update the UI
    riskLevel.textContent = risk;
    riskScore.textContent = `${score}%`;
    riskSummary.textContent = summary;
    
    // Clear and populate risk factors
    riskFactors.innerHTML = '';
    factors.forEach(factor => {
        const li = document.createElement('li');
        li.textContent = factor;
        riskFactors.appendChild(li);
    });
}

// Cyber Habits Quiz Functionality
const quizQuestions = [
    {
        question: 'How often do you update your passwords?',
        options: [
            { text: 'Every 1-3 months', score: 10 },
            { text: 'Every 4-6 months', score: 7 },
            { text: 'Once a year', score: 4 },
            { text: 'Rarely or never', score: 0 }
        ]
    },
    {
        question: 'Do you use two-factor authentication (2FA)?',
        options: [
            { text: 'Yes, for all accounts that offer it', score: 10 },
            { text: 'Only for important accounts', score: 7 },
            { text: 'Only when required', score: 3 },
            { text: 'No, I don\'t use 2FA', score: 0 }
        ]
    },
    {
        question: 'How do you manage your passwords?',
        options: [
            { text: 'Password manager with unique passwords', score: 10 },
            { text: 'Different passwords for important accounts', score: 6 },
            { text: 'Few passwords with variations', score: 3 },
            { text: 'Same password for most accounts', score: 0 }
        ]
    },
    {
        question: 'How do you handle suspicious emails?',
        options: [
            { text: 'Delete without opening and report', score: 10 },
            { text: 'Open but don\'t click links', score: 5 },
            { text: 'Check links by hovering', score: 3 },
            { text: 'Click links to see what happens', score: 0 }
        ]
    },
    {
        question: 'How do you connect to public Wi-Fi?',
        options: [
            { text: 'Use a VPN always', score: 10 },
            { text: 'Only for non-sensitive browsing', score: 6 },
            { text: 'Use it but avoid logging into accounts', score: 3 },
            { text: 'Use it without any precautions', score: 0 }
        ]
    }
];

let currentQuestion = 0;
let selectedOption = null;
let userAnswers = [];

// Initialize the quiz
function initQuiz() {
    currentQuestion = 0;
    selectedOption = null;
    userAnswers = [];
    updateQuizUI();
}

// Update the quiz UI based on current question
function updateQuizUI() {
    // Update progress indicators
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;
    quizPercentage.textContent = `${Math.round(progressPercentage)}%`;
    quizProgressIndicator.style.width = `${progressPercentage}%`;
    
    // Update question text
    questionText.textContent = quizQuestions[currentQuestion].question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    quizQuestions[currentQuestion].options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.dataset.index = index;
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz-option';
        radio.id = `option-${index}`;
        radio.value = index;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option.text;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
        
        // Add click event to the option div
        optionDiv.addEventListener('click', () => {
            // Clear previous selection
            document.querySelectorAll('.option-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Mark as selected
            optionDiv.classList.add('selected');
            selectedOption = index;
            
            // Enable next button
            nextQuestionBtn.disabled = false;
        });
    });
    
    // Disable next button until an option is selected
    nextQuestionBtn.disabled = true;
}

// Handle next question button click
nextQuestionBtn.addEventListener('click', () => {
    if (selectedOption === null) return;
    
    // Save the answer
    userAnswers.push({
        question: currentQuestion,
        option: selectedOption,
        score: quizQuestions[currentQuestion].options[selectedOption].score
    });
    
    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        selectedOption = null;
        updateQuizUI();
    } else {
        showQuizResults();
    }
});

// Calculate and show quiz results
function showQuizResults() {
    // Hide quiz and show results
    habitsQuiz.classList.add('hidden');
    habitsResults.classList.remove('hidden');
    
    // Calculate total score
    let totalScore = 0;
    const maxPossibleScore = quizQuestions.length * 10; // 10 points per question
    
    userAnswers.forEach(answer => {
        totalScore += answer.score;
    });
    
    // Calculate percentage
    const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Update UI
    habitsScoreValue.textContent = `${scorePercentage}%`;
    scoreCircle.setAttribute('stroke-dasharray', `${scorePercentage}, 100`);
    
    // Set rating and color based on score
    let rating, recommendations;
    
    if (scorePercentage >= 80) {
        rating = 'Excellent';
        scoreCircle.style.stroke = 'var(--success-color)';
        recommendations = [
            'Continue your excellent security practices',
            'Stay updated on the latest security threats',
            'Consider helping others improve their cyber habits'
        ];
    } else if (scorePercentage >= 60) {
        rating = 'Good';
        scoreCircle.style.stroke = 'var(--info-color)';
        recommendations = [
            'Consider using a password manager if you don\'t already',
            'Enable 2FA on all your important accounts',
            'Regularly update your software and devices'
        ];
    } else if (scorePercentage >= 40) {
        rating = 'Fair';
        scoreCircle.style.stroke = 'var(--warning-color)';
        recommendations = [
            'Update your passwords regularly and make them stronger',
            'Start using two-factor authentication',
            'Be more cautious with suspicious emails and links',
            'Consider using a VPN for public Wi-Fi'
        ];
    } else {
        rating = 'Needs Improvement';
        scoreCircle.style.stroke = 'var(--danger-color)';
        recommendations = [
            'Use unique passwords for each account',
            'Enable two-factor authentication immediately',
            'Never click on suspicious links or attachments',
            'Use a VPN when connecting to public Wi-Fi',
            'Keep your software and devices updated'
        ];
    }
    
    scoreRating.textContent = rating;
    
    // Populate recommendations
    recommendationsList.innerHTML = '';
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
}

// Restart quiz button
restartQuizBtn.addEventListener('click', () => {
    habitsResults.classList.add('hidden');
    habitsQuiz.classList.remove('hidden');
    initQuiz();
});

// Cyber Hygiene Tips Carousel
const tips = [
    {
        icon: '🔐',
        title: 'Use Strong, Unique Passwords',
        description: 'Create complex passwords with a mix of letters, numbers, and symbols. Never reuse passwords across different accounts.'
    },
    {
        icon: '🔒',
        title: 'Enable Two-Factor Authentication',
        description: 'Add an extra layer of security by requiring a second form of verification beyond just your password.'
    },
    {
        icon: '🔄',
        title: 'Keep Software Updated',
        description: 'Regularly update your operating system, applications, and antivirus software to patch security vulnerabilities.'
    },
    {
        icon: '📎',
        title: 'Be Cautious with Email Attachments',
        description: 'Never open attachments from unknown senders, and be wary of unexpected attachments even from known contacts.'
    },
    {
        icon: '🌐',
        title: 'Use a VPN on Public Wi-Fi',
        description: 'Protect your data when using public networks by encrypting your connection with a Virtual Private Network.'
    },
    {
        icon: '💾',
        title: 'Backup Your Data Regularly',
        description: 'Maintain regular backups of important files to protect against ransomware and data loss incidents.'
    },
    {
        icon: '👥',
        title: 'Be Careful What You Share Online',
        description: 'Limit personal information shared on social media and adjust privacy settings to control who sees your content.'
    },
    {
        icon: '🔍',
        title: 'Verify Website Security',
        description: 'Look for HTTPS and the padlock icon before entering sensitive information on websites.'
    }
];

let currentTip = 0;

// Initialize tips carousel
function initTipsCarousel() {
    // Populate the slider with tips
    tipsSlider.innerHTML = '';
    tips.forEach(tip => {
        const tipDiv = document.createElement('div');
        tipDiv.className = 'tip-item';
        
        tipDiv.innerHTML = `
            <div class="tip-icon">${tip.icon}</div>
            <h3 class="tip-title">${tip.title}</h3>
            <p>${tip.description}</p>
        `;
        
        tipsSlider.appendChild(tipDiv);
    });
    
    // Create indicators
    tipIndicators.innerHTML = '';
    tips.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            goToTip(index);
        });
        
        tipIndicators.appendChild(indicator);
    });
    
    // Set initial position
    updateTipPosition();
}

// Update the carousel position
function updateTipPosition() {
    tipsSlider.style.transform = `translateX(-${currentTip * 100}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        if (index === currentTip) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Go to a specific tip
function goToTip(index) {
    currentTip = index;
    updateTipPosition();
}

// Next tip button
nextTipBtn.addEventListener('click', () => {
    currentTip = (currentTip + 1) % tips.length;
    updateTipPosition();
});

// Previous tip button
prevTipBtn.addEventListener('click', () => {
    currentTip = (currentTip - 1 + tips.length) % tips.length;
    updateTipPosition();
});

// Auto-rotate tips every 8 seconds
setInterval(() => {
    currentTip = (currentTip + 1) % tips.length;
    updateTipPosition();
}, 8000);

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initTipsCarousel();
});