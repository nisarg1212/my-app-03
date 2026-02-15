/**
 * Questra - Interactive Learning Frontend
 * Ultra Engagement Edition
 */

// Session state
let currentSession = null;
let currentLevel = 1;
let maxLevel = 3;
let selectedQuizAnswers = [];
let selectedMasterAnswers = [];
let ttsUtterance = null;
let isSpeaking = false;
let previousLevel = 1;

// All achievements (extended)
const ALL_ACHIEVEMENTS = {
    "first_story": { name: "Story Seeker", desc: "Complete your first story", icon: "📖" },
    "storyteller": { name: "Storyteller", desc: "Complete 10 stories", icon: "📚" },
    "quiz_novice": { name: "Quiz Novice", desc: "Pass your first quiz", icon: "❓" },
    "quiz_master": { name: "Quiz Master", desc: "Get 100% on a quiz", icon: "🎓" },
    "master_student": { name: "Master Student", desc: "Complete master practice", icon: "🏆" },
    "detective": { name: "Detective", desc: "Solve your first case", icon: "🔍" },
    "sherlock": { name: "Sherlock", desc: "Solve 5 cases", icon: "🕵️" },
    "streak_3": { name: "On Fire", desc: "3 day streak", icon: "🔥" },
    "streak_7": { name: "Unstoppable", desc: "7 day streak", icon: "⚡" },
    "level_5": { name: "Rising Star", desc: "Reach level 5", icon: "⭐" },
    "level_10": { name: "Champion", desc: "Reach level 10", icon: "👑" },
    "combo_5": { name: "Combo Starter", desc: "Get a 5x combo streak", icon: "🔗" },
    "combo_10": { name: "Combo King", desc: "Get a 10x combo streak", icon: "💥" },
    "combo_20": { name: "UNSTOPPABLE", desc: "Get a 20x combo streak", icon: "🌟" },
    "perfect_round": { name: "Perfect Score", desc: "Get 100% on any round", icon: "💎" },
    "perfect_3": { name: "Triple Perfect", desc: "Get 3 perfect rounds", icon: "🏅" },
    "speed_demon": { name: "Speed Demon", desc: "Complete a quiz in under 30s", icon: "⏱️" },
    "daily_first": { name: "Daily Warrior", desc: "Complete your first daily challenge", icon: "🌅" },
    "daily_7": { name: "Weekly Champion", desc: "Complete 7 daily challenges", icon: "📅" },
    "xp_500": { name: "XP Hunter", desc: "Earn 500 total XP", icon: "💰" },
    "xp_2000": { name: "XP Legend", desc: "Earn 2000 total XP", icon: "🤑" },
    "first_quest": { name: "First Quest", desc: "Complete your first full quest", icon: "🗡️" },
    "night_owl": { name: "Night Owl", desc: "Study after midnight", icon: "🦉" },
    "early_bird": { name: "Early Bird", desc: "Study before 7 AM", icon: "🐦" },
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadFeaturedQuests();
    renderAchievements([]);
    loadApiKey();

    // Enter key to start
    const topicInput = document.getElementById('topic-input');
    if (topicInput) {
        topicInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') startLearning();
        });
    }
});

// ==================== API Key Management ====================

function toggleApiKeySection() {
    const container = document.getElementById('api-key-container');
    const arrow = document.getElementById('api-key-arrow');
    if (container.style.display === 'none') {
        container.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
    } else {
        container.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('api-key-input').value.trim();
    if (apiKey) {
        localStorage.setItem('openrouter_api_key', apiKey);
        const status = document.getElementById('api-key-status');
        status.textContent = '✓ API key saved!';
        status.className = 'api-key-status saved';
        setTimeout(() => { status.textContent = ''; }, 2000);
    }
}

function loadApiKey() {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
        const input = document.getElementById('api-key-input');
        if (input) input.value = savedKey;
    }
}

function getUserApiKey() {
    return localStorage.getItem('openrouter_api_key') || '';
}

function toggleKeyVisibility() {
    const input = document.getElementById('api-key-input');
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Activate a progress step in the sidebar
function activateStep(stepName) {
    const steps = ['story', 'quiz', 'master', 'detective'];
    const currentIdx = steps.indexOf(stepName);

    steps.forEach((step, idx) => {
        const el = document.getElementById(`step-${step}`);
        if (!el) return;
        el.classList.remove('active', 'completed');
        if (idx < currentIdx) {
            el.classList.add('completed');
        } else if (idx === currentIdx) {
            el.classList.add('active');
        }
    });
}

// ==================== API Calls ====================

async function loadFeaturedQuests() {
    try {
        const response = await fetch('/api/featured-quests');
        const data = await response.json();
        renderFeaturedQuests(data.quests || []);
    } catch (error) {
        console.error('Error loading featured quests:', error);
    }
}

function renderFeaturedQuests(quests) {
    const container = document.getElementById('featured-quests');
    if (!container) return;

    container.innerHTML = quests.map(quest => `
        <div class="quest-card" onclick="startFeaturedQuest('${quest.title}')">
            <div class="quest-icon">${quest.icon}</div>
            <div class="quest-title">${quest.title.toUpperCase()}</div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-xp">+${quest.xp_per_level ? quest.xp_per_level[0] : 295} XP</div>
        </div>
    `).join('');
}

function startFeaturedQuest(topic) {
    document.getElementById('topic-input').value = topic;
    startLearning();
}

async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        previousLevel = stats.level || 1;
        updateStatsDisplay(stats);
        renderAchievements(stats.achievements || []);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function updateStatsDisplay(stats) {
    const levelBadge = document.getElementById('level-badge');
    const xpCurrent = document.getElementById('xp-current');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const streakCount = document.getElementById('streak-count');
    const achCount = document.getElementById('achievement-count');

    if (levelBadge) levelBadge.textContent = stats.level || 1;
    if (xpCurrent) xpCurrent.textContent = stats.xp || 0;
    if (xpBarFill) xpBarFill.style.width = `${stats.xp_progress_percent || 0}%`;
    if (streakCount) streakCount.textContent = stats.streak || 0;
    if (achCount) achCount.textContent = `${(stats.achievements || []).length}/${stats.total_achievements || 23}`;

    // Check for level up
    const newLevel = stats.level || 1;
    if (newLevel > previousLevel && previousLevel > 0) {
        if (typeof showLevelUp === 'function') {
            showLevelUp(newLevel);
        }
        previousLevel = newLevel;
    }

    // Check for new achievements
    if (stats.new_achievements && stats.new_achievements.length > 0) {
        stats.new_achievements.forEach(ach => {
            if (window.achievementToaster) {
                window.achievementToaster.show(ach);
            }
        });
    }
}

// ==================== Learning Flow ====================

async function startLearning() {
    const topic = document.getElementById('topic-input').value.trim();
    if (!topic) {
        alert('Please enter a topic!');
        return;
    }

    showLoading('Generating your adventure...');

    try {
        const userApiKey = getUserApiKey();
        const response = await fetch('/api/session/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, api_key: userApiKey || undefined })
        });

        const data = await response.json();

        if (data.error || !response.ok) {
            hideLoading();
            alert(data.message || 'Unable to generate content. Please try a Featured Quest instead!');
            return;
        }

        currentSession = {
            id: data.session_id,
            topic: data.topic,
            aiGenerated: data.ai_generated,
            source: data.source
        };

        // Reset combo tracker
        if (window.comboTracker) window.comboTracker.reset();

        // Show session UI
        document.getElementById('topic-section').style.display = 'none';
        document.getElementById('session-container').style.display = 'flex';
        document.getElementById('sidebar-topic').textContent = data.topic;

        // Display story
        document.getElementById('story-title').textContent = data.story.title;
        document.getElementById('story-content').innerHTML = formatStoryContent(data.story.content);

        activateStep('story');
        updateSidebarLevels(currentLevel);

        hideLoading();
        console.log(`✅ Content loaded (source: ${data.source})`);
    } catch (error) {
        hideLoading();
        alert('Error starting session. Please try a Featured Quest!');
        console.error(error);
    }
}

async function completeStory() {
    if (!currentSession) return;

    stopTTS();
    showLoading('Loading quiz...');

    try {
        const response = await fetch(`/api/session/${currentSession.id}/complete-story`, {
            method: 'POST'
        });

        const data = await response.json();

        showXPPopup(data.xp_earned);

        // Render quiz
        renderQuiz(data.quiz);

        document.getElementById('story-mode').style.display = 'none';
        document.getElementById('quiz-mode').style.display = 'block';
        activateStep('quiz');

        hideLoading();
        loadStats();
    } catch (error) {
        hideLoading();
        alert('Error completing story. Please try again.');
        console.error(error);
    }
}

async function submitQuiz() {
    if (!currentSession) return;

    const questions = document.querySelectorAll('.quiz-question');
    selectedQuizAnswers = [];

    questions.forEach((q, idx) => {
        const selected = q.querySelector('.option-item.selected');
        selectedQuizAnswers.push(selected ? parseInt(selected.dataset.index) : -1);
    });

    showLoading('Checking answers...');

    try {
        const response = await fetch(`/api/session/${currentSession.id}/submit-quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: selectedQuizAnswers })
        });

        const data = await response.json();

        showQuizResults(data);
        showXPPopup(data.xp_earned);

        // Confetti on good results
        if (data.percentage >= 80 && window.confetti) {
            window.confetti.launch(60, 2500);
        }
        if (data.percentage === 100) {
            screenShake('heavy');
        }

        hideLoading();
        loadStats();

        // Auto-continue to master after 2.5 seconds
        setTimeout(() => {
            document.getElementById('quiz-mode').style.display = 'none';
            document.getElementById('master-mode').style.display = 'block';
            document.getElementById('quiz-results').style.display = 'none';
            document.getElementById('submit-quiz-btn').style.display = 'block';
            activateStep('master');
            renderMasterQuestions(data.master);
        }, 2500);

    } catch (error) {
        hideLoading();
        alert('Error submitting quiz. Please try again.');
        console.error(error);
    }
}

async function submitMaster() {
    if (!currentSession) return;

    const questions = document.querySelectorAll('.master-question');
    selectedMasterAnswers = [];

    questions.forEach((q, idx) => {
        const selected = q.querySelector('.option-item.selected');
        if (selected) {
            selectedMasterAnswers.push(selected.dataset.value);
        } else {
            selectedMasterAnswers.push('');
        }
    });

    showLoading('Evaluating your mastery...');

    try {
        const response = await fetch(`/api/session/${currentSession.id}/submit-master`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: selectedMasterAnswers })
        });

        const data = await response.json();

        showMasterResults(data);
        showXPPopup(data.xp_earned);

        if (data.percentage >= 80 && window.confetti) {
            window.confetti.launch(40, 2000);
        }

        hideLoading();
        loadStats();

        setTimeout(() => {
            document.getElementById('master-mode').style.display = 'none';
            document.getElementById('detective-mode').style.display = 'block';
            document.getElementById('master-results').style.display = 'none';
            document.getElementById('submit-master-btn').style.display = 'block';
            activateStep('detective');
            renderDetective(data.detective);
        }, 2500);

    } catch (error) {
        hideLoading();
        alert('Error submitting master practice. Please try again.');
        console.error(error);
    }
}

async function solveCase() {
    if (!currentSession) return;

    const answer = document.getElementById('detective-answer').value.trim();
    if (!answer) {
        alert('Please enter your answer!');
        return;
    }

    showLoading('Checking your solution...');

    try {
        const response = await fetch(`/api/session/${currentSession.id}/solve-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer })
        });

        const data = await response.json();

        showDetectiveResults(data);
        showXPPopup(data.xp_earned);

        // Big celebration on solve
        if (data.solved && window.confetti) {
            window.confetti.launch(100, 3000);
            screenShake('heavy');
        }

        hideLoading();
        loadStats();

        // Show completion after 2.5 seconds
        setTimeout(() => {
            document.getElementById('detective-mode').style.display = 'none';
            document.getElementById('session-complete').style.display = 'block';
            document.getElementById('total-xp-earned').textContent = `+${data.total_session_xp || 0} XP`;
            updateLevelProgress(currentLevel);

            // Quest complete celebration
            if (window.confetti) {
                window.confetti.launch(80, 3000);
            }
        }, 2500);

    } catch (error) {
        hideLoading();
        alert('Error solving case. Please try again.');
        console.error(error);
    }
}

function newAdventure() {
    currentSession = null;
    currentLevel = 1;
    document.getElementById('session-container').style.display = 'none';
    document.getElementById('topic-section').style.display = 'block';
    document.getElementById('topic-input').value = '';

    // Reset all modes
    document.getElementById('story-mode').style.display = 'block';
    document.getElementById('quiz-mode').style.display = 'none';
    document.getElementById('master-mode').style.display = 'none';
    document.getElementById('detective-mode').style.display = 'none';
    document.getElementById('session-complete').style.display = 'none';

    // Reset result displays
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('master-results').style.display = 'none';
    document.getElementById('detective-results').style.display = 'none';
    document.getElementById('detective-answer').value = '';

    // Reset progress steps
    document.querySelectorAll('.progress-step-v').forEach(step => {
        step.classList.remove('active', 'completed');
    });

    // Reset combo
    if (window.comboTracker) window.comboTracker.reset();
}

// ==================== UI Rendering ====================

function formatStoryContent(content) {
    return content.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
}

function renderQuiz(quiz) {
    const container = document.getElementById('quiz-questions');
    container.innerHTML = '';

    quiz.questions.forEach((q, idx) => {
        const questionHtml = `
            <div class="quiz-question" data-index="${idx}">
                <div class="question-number">Question ${idx + 1}</div>
                <div class="question-text">${q.question}</div>
                <div class="options-list">
                    ${q.options.map((opt, optIdx) => `
                        <div class="option-item" data-index="${optIdx}" onclick="selectOption(this, ${idx})">
                            <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML += questionHtml;
    });
}

function renderMasterQuestions(master) {
    const container = document.getElementById('master-questions');
    container.innerHTML = '<p class="mode-info">Answer these advanced questions to prove your mastery!</p>';

    master.questions.forEach((q, idx) => {
        const questionHtml = `
            <div class="master-question" data-index="${idx}">
                <div class="question-number">Advanced Question ${idx + 1}</div>
                <div class="question-text">${q.question}</div>
                <div class="options-list">
                    ${q.options.map((opt, optIdx) => `
                        <div class="option-item" data-value="${opt}" onclick="selectMasterOption(this, ${idx})">
                            <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML += questionHtml;
    });
}

function renderDetective(detective) {
    if (!detective) return;

    document.getElementById('case-title').textContent = detective.case_title;
    document.getElementById('case-scenario').innerHTML = formatStoryContent(detective.scenario);

    const cluesHtml = detective.clues.map(c => `
        <div class="clue-item">
            <span class="clue-icon">🔎</span>
            <span>${c.description}</span>
        </div>
    `).join('');
    document.getElementById('case-clues').innerHTML = cluesHtml;

    const questionText = detective.question.replace(/\n/g, '<br>');
    document.getElementById('case-question').innerHTML = `<strong>❓ ${questionText}</strong>`;
}

function selectOption(element, questionIdx) {
    const question = element.closest('.quiz-question');
    question.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    // Micro-interaction: particle burst on select
    if (typeof particleBurst === 'function') {
        particleBurst(element);
    }

    // Track combo (selection counts as engagement)
    if (window.comboTracker) {
        window.comboTracker.hit();
    }
}

function selectMasterOption(element, questionIdx) {
    const question = element.closest('.master-question');
    question.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    if (typeof particleBurst === 'function') {
        particleBurst(element);
    }
}

function showQuizResults(data) {
    const container = document.getElementById('quiz-results');
    const passed = data.passed ? '✅ Passed!' : '❌ Keep trying!';
    const perfectBadge = data.percentage === 100 ? '<div class="perfect-badge">💎 PERFECT SCORE!</div>' : '';

    container.innerHTML = `
        <div class="result-card ${data.percentage === 100 ? 'result-perfect' : ''}">
            <div class="result-icon">${data.passed ? '🎉' : '📚'}</div>
            <div class="result-title">${passed}</div>
            ${perfectBadge}
            <div class="result-stats">${data.correct}/${data.total} correct (${data.percentage}%)</div>
            <div class="result-xp">+${data.xp_earned} XP</div>
            <p>Moving to Master Practice...</p>
        </div>
    `;
    container.style.display = 'block';
    document.getElementById('submit-quiz-btn').style.display = 'none';
}

function showMasterResults(data) {
    const container = document.getElementById('master-results');
    const mastered = data.mastered ? '🏆 Mastered!' : '📖 Good effort!';

    container.innerHTML = `
        <div class="result-card">
            <div class="result-icon">${data.mastered ? '🏆' : '💪'}</div>
            <div class="result-title">${mastered}</div>
            <div class="result-stats">${data.correct}/${data.total} correct (${data.percentage}%)</div>
            <div class="result-xp">+${data.xp_earned} XP</div>
            <p>Get ready for Detective Mode...</p>
        </div>
    `;
    container.style.display = 'block';
    document.getElementById('submit-master-btn').style.display = 'none';
}

function showDetectiveResults(data) {
    const container = document.getElementById('detective-results');
    const solved = data.solved ? '🎉 Case Solved!' : '🔍 Close, but not quite!';

    container.innerHTML = `
        <div class="result-card">
            <div class="result-icon">${data.solved ? '🕵️' : '🤔'}</div>
            <div class="result-title">${solved}</div>
            <div class="result-stats">Answer: ${data.correct_answer}</div>
            <div class="result-explanation">${data.explanation}</div>
            <div class="result-xp">+${data.xp_earned} XP</div>
        </div>
    `;
    container.style.display = 'block';
    document.getElementById('solve-case-btn').style.display = 'none';
}

function renderAchievements(unlockedList) {
    const container = document.getElementById('achievements-grid');
    if (!container) return;
    
    // unlockedList can be array of strings or objects
    const unlockedIds = unlockedList.map(a => typeof a === 'string' ? a : a.id);

    let html = '';
    for (const [id, achievement] of Object.entries(ALL_ACHIEVEMENTS)) {
        const isUnlocked = unlockedIds.includes(id);
        html += `
            <div class="achievement-item ${isUnlocked ? '' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// ==================== TTS ====================

function toggleTTS() {
    if (isSpeaking) {
        stopTTS();
    } else {
        startTTS();
    }
}

function startTTS() {
    const content = document.getElementById('story-content').innerText;
    if (!content || !('speechSynthesis' in window)) return;

    ttsUtterance = new SpeechSynthesisUtterance(content);
    ttsUtterance.rate = 0.9;
    ttsUtterance.onend = () => {
        isSpeaking = false;
        document.getElementById('tts-btn').innerHTML = '<span>🔊</span> Listen';
    };

    speechSynthesis.speak(ttsUtterance);
    isSpeaking = true;
    document.getElementById('tts-btn').innerHTML = '<span>🔇</span> STOP';
}

function stopTTS() {
    speechSynthesis.cancel();
    isSpeaking = false;
    document.getElementById('tts-btn').innerHTML = '<span>🔊</span> LISTEN';
}

// ==================== Utilities ====================

function showLoading(text = 'Loading...') {
    document.getElementById('loading-text').textContent = text;
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

function showXPPopup(amount) {
    const popup = document.getElementById('xp-popup');
    const value = document.getElementById('xp-popup-value');

    if (!popup || !value) return;

    value.textContent = `+${amount} XP`;
    popup.style.display = 'block';

    // Also show floating XP
    if (typeof showXPFloat === 'function') {
        showXPFloat(amount);
    }

    // Screen shake for big XP
    if (amount >= 50 && typeof screenShake === 'function') {
        screenShake('light');
    }

    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}

// ==================== Achievements Modal ====================

function showAchievements() {
    window.location.href = '/achievements';
}

function closeAchievements(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ==================== Level Progression ====================

function updateSidebarLevels(currentLvl) {
    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`sidebar-lvl-${i}`);
        if (el) {
            el.classList.remove('active', 'completed', 'locked');
            if (i < currentLvl) {
                el.classList.add('completed');
                el.textContent = `✓ ${i}`;
            } else if (i === currentLvl) {
                el.classList.add('active');
                el.textContent = `LVL ${i}`;
            } else {
                el.classList.add('locked');
                el.textContent = `🔒 ${i}`;
            }
        }
    }
}

function updateLevelProgress(completedLevel) {
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById(`lvl-${i}`);
        if (dot) {
            dot.classList.remove('completed', 'unlocked');
            if (i <= completedLevel) {
                dot.classList.add('completed');
            } else if (i === completedLevel + 1) {
                dot.classList.add('unlocked');
            }
        }
    }

    document.getElementById('completed-level').textContent = completedLevel;

    const nextBtn = document.getElementById('next-level-btn');
    const nextNum = document.getElementById('next-level-num');

    if (completedLevel < maxLevel) {
        nextBtn.style.display = 'inline-flex';
        nextNum.textContent = completedLevel + 1;
        document.getElementById('completion-message').textContent = `Level ${completedLevel + 1} is now unlocked!`;
    } else {
        nextBtn.style.display = 'none';
        document.getElementById('completion-message').textContent = "🎉 You've mastered all levels!";
    }
}

async function startNextLevel() {
    if (!currentSession || currentLevel >= maxLevel) return;

    currentLevel++;
    let baseTopic = currentSession.topic.split('(')[0].trim();

    showLoading(`Loading Level ${currentLevel}...`);

    try {
        const response = await fetch('/api/session/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: `${baseTopic} (Level ${currentLevel} - Advanced)` })
        });

        const data = await response.json();

        if (data.error || !response.ok) {
            hideLoading();
            alert(data.message || 'Unable to load next level. Try again!');
            return;
        }

        currentSession = {
            id: data.session_id,
            topic: baseTopic,
            aiGenerated: data.ai_generated,
            source: data.source
        };

        selectedQuizAnswers = [];
        selectedMasterAnswers = [];
        if (window.comboTracker) window.comboTracker.reset();

        const modal = document.getElementById('level-complete-modal');
        if (modal) modal.style.display = 'none';

        document.getElementById('story-title').textContent = data.story.title;
        document.getElementById('story-content').innerHTML = formatStoryContent(data.story.content);

        document.querySelectorAll('.mode-section').forEach(section => {
            section.style.display = 'none';
        });

        const storySection = document.getElementById('story-section') || document.getElementById('story-mode');
        if (storySection) storySection.style.display = 'block';

        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('master-results').style.display = 'none';
        document.getElementById('detective-results').style.display = 'none';

        document.getElementById('submit-quiz-btn').style.display = 'block';
        document.getElementById('submit-master-btn').style.display = 'block';
        document.getElementById('solve-case-btn').style.display = 'block';

        document.getElementById('detective-answer').value = '';

        document.querySelectorAll('.progress-step-v').forEach(step => {
            step.classList.remove('completed', 'active');
        });

        activateStep('story');
        updateSidebarLevels(currentLevel);
        hideLoading();

        console.log(`✅ Started Level ${currentLevel}`);

    } catch (error) {
        hideLoading();
        console.error('Level loading error:', error);
        alert('Error loading next level: ' + error.message);
    }
}
