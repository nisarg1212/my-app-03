/**
 * Questra — Interactive Learning Frontend
 * Enhanced with retro sounds, timer tracking, typewriter effects,
 * confetti celebrations, and multi-sensory engagement.
 */

// ==================== Session State ====================
let currentSession = null;
let currentLevel = 1;
let maxLevel = 3;
let selectedQuizAnswers = [];
let selectedMasterAnswers = [];
let ttsUtterance = null;
let isSpeaking = false;
let typewriterInterval = null;

// All achievements
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
    "level_10": { name: "Champion", desc: "Reach level 10", icon: "👑" }
};

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadFeaturedQuests();
    renderAchievements([]);
    loadApiKey();

    // Timer display setup
    QTimer.setDisplay('timer-value');

    // Enter key to start
    document.getElementById('topic-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startLearning();
    });

    // Initialize sound state from localStorage
    const soundPref = localStorage.getItem('questra_sound');
    if (soundPref === 'off') {
        QSounds.toggle();
        updateSoundToggle();
    }
});

// ==================== Sound Toggle ====================
function toggleSound() {
    const isOn = QSounds.toggle();
    localStorage.setItem('questra_sound', isOn ? 'on' : 'off');
    updateSoundToggle();
    if (isOn) QSounds.click();
}

function updateSoundToggle() {
    const el = document.getElementById('sound-toggle');
    if (QSounds.enabled) {
        el.textContent = '🔊 SFX';
        el.classList.remove('muted');
    } else {
        el.textContent = '🔇 SFX';
        el.classList.add('muted');
    }
}

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
    QSounds.click();
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
        document.getElementById('api-key-input').value = savedKey;
    }
}

function getUserApiKey() {
    return localStorage.getItem('openrouter_api_key') || '';
}

function toggleKeyVisibility() {
    const input = document.getElementById('api-key-input');
    input.type = input.type === 'password' ? 'text' : 'password';
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

    // Sort: featured quests first
    const sorted = [...quests].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    container.innerHTML = sorted.map(quest => `
        <div class="quest-card ${quest.featured ? 'featured-quest' : ''}" 
             onclick="startFeaturedQuest('${quest.title}')"
             onmouseenter="QSounds.hover()">
            <div class="quest-icon">${quest.icon}</div>
            <div class="quest-title">${quest.title.toUpperCase()}</div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-xp">+${quest.xp_per_level ? quest.xp_per_level[0] : 295} XP</div>
        </div>
    `).join('');
}

function startFeaturedQuest(topic) {
    document.getElementById('topic-input').value = topic;
    QSounds.click();
    startLearning();
}

async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        updateStatsDisplay(stats);
        renderAchievements(stats.achievements || []);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function updateStatsDisplay(stats) {
    document.getElementById('level-badge').textContent = stats.level || 1;
    document.getElementById('xp-current').textContent = stats.xp || 0;
    document.getElementById('xp-bar-fill').style.width = `${stats.xp_progress_percent || 0}%`;
    document.getElementById('streak-count').textContent = stats.streak || 0;
    document.getElementById('achievement-count').textContent =
        `${(stats.achievements || []).length}/${stats.total_achievements || 11}`;
}

// ==================== Learning Flow ====================
async function startLearning() {
    const topic = document.getElementById('topic-input').value.trim();
    if (!topic) {
        QSounds.error();
        alert('Please enter a topic!');
        return;
    }

    QSounds.click();
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
            QSounds.error();
            alert(data.message || 'Unable to generate content. Please try a Featured Quest instead!');
            return;
        }

        currentSession = {
            id: data.session_id,
            topic: data.topic,
            aiGenerated: data.ai_generated,
            source: data.source
        };

        // Show session UI
        document.getElementById('topic-section').style.display = 'none';
        document.getElementById('session-container').style.display = 'flex';
        document.getElementById('sidebar-topic').textContent = data.topic;

        // Start timer
        document.getElementById('timer-display').style.display = 'flex';
        QTimer.startLevel();
        QTimer.startPhase('story');

        // Display story with typewriter effect
        document.getElementById('story-title').textContent = data.story.title;
        typewriteStory(data.story.content);

        // Activate story step and update level display
        activateStep('story');
        updateSidebarLevels(currentLevel);

        hideLoading();
        QSounds.storyProgress();

        console.log(`✅ Content loaded (source: ${data.source})`);
    } catch (error) {
        hideLoading();
        QSounds.error();
        alert('Error starting session. Please try a Featured Quest!');
        console.error(error);
    }
}

// ==================== Typewriter Effect ====================
function typewriteStory(content) {
    const container = document.getElementById('story-content');
    const paragraphs = content.split('\n').filter(p => p.trim());
    container.innerHTML = '';

    let pIdx = 0;
    let charIdx = 0;
    let currentP = null;

    // Clear any existing interval
    if (typewriterInterval) clearInterval(typewriterInterval);

    // Add skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn btn-secondary btn-sm';
    skipBtn.innerHTML = '<span>⏩</span> SKIP';
    skipBtn.style.marginTop = '12px';
    skipBtn.onclick = () => {
        if (typewriterInterval) clearInterval(typewriterInterval);
        container.innerHTML = formatStoryContent(content);
        skipBtn.remove();
    };

    function typeNext() {
        if (pIdx >= paragraphs.length) {
            clearInterval(typewriterInterval);
            // Remove cursor from last paragraph
            const cursors = container.querySelectorAll('.typewriter-cursor');
            cursors.forEach(c => c.remove());
            return;
        }

        if (charIdx === 0) {
            // Start new paragraph
            currentP = document.createElement('p');
            currentP.className = 'typewriter-text';
            container.appendChild(currentP);
        }

        const text = paragraphs[pIdx];
        if (charIdx < text.length) {
            // Remove old cursor
            const oldCursor = currentP.querySelector('.typewriter-cursor');
            if (oldCursor) oldCursor.remove();

            // Add character
            currentP.innerHTML = text.substring(0, charIdx + 1) + '<span class="typewriter-cursor"></span>';
            charIdx++;

            // Play typing sound every few characters
            if (charIdx % 3 === 0) QSounds.typeKey();
        } else {
            // Move to next paragraph
            const cursor = currentP.querySelector('.typewriter-cursor');
            if (cursor) cursor.remove();
            pIdx++;
            charIdx = 0;
        }
    }

    typewriterInterval = setInterval(typeNext, 18); // Fast but readable

    // Add skip button after story container
    container.parentNode.appendChild(skipBtn);
}

// ==================== Story Phase ====================
async function completeStory() {
    if (!currentSession) return;

    stopTTS();
    if (typewriterInterval) clearInterval(typewriterInterval);

    QSounds.click();
    QTimer.endPhase();

    // Show phase transition
    showPhaseTransition('⚔️ QUIZ TIME!', async () => {
        showLoading('Loading quiz...');

        try {
            const response = await fetch(`/api/session/${currentSession.id}/complete-story`, {
                method: 'POST'
            });

            const data = await response.json();

            showXPPopup(data.xp_earned);
            QSounds.xpEarned();

            // Render quiz with enhanced UI
            renderQuiz(data.quiz);
            QTimer.startPhase('quiz');

            // Switch to quiz mode
            document.getElementById('story-mode').style.display = 'none';
            document.getElementById('quiz-mode').style.display = 'block';
            activateStep('quiz');

            QSounds.quizStart();
            hideLoading();
            loadStats();
        } catch (error) {
            hideLoading();
            QSounds.error();
            alert('Error completing story. Please try again.');
            console.error(error);
        }
    });
}

// ==================== Quiz Phase ====================
async function submitQuiz() {
    if (!currentSession) return;

    const questions = document.querySelectorAll('.quiz-question');
    selectedQuizAnswers = [];

    questions.forEach((q) => {
        const selected = q.querySelector('.option-item.selected');
        selectedQuizAnswers.push(selected ? parseInt(selected.dataset.index) : -1);
    });

    QSounds.click();
    showLoading('Checking answers...');

    try {
        const response = await fetch(`/api/session/${currentSession.id}/submit-quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: selectedQuizAnswers })
        });

        const data = await response.json();

        // Show per-question feedback with animations
        showQuizFeedback(data);
        showXPPopup(data.xp_earned);

        hideLoading();
        loadStats();

        QTimer.endPhase();

        // Auto-continue to master after delay
        setTimeout(() => {
            showPhaseTransition('🏆 MASTER PRACTICE!', () => {
                document.getElementById('quiz-mode').style.display = 'none';
                document.getElementById('master-mode').style.display = 'block';
                document.getElementById('quiz-results').style.display = 'none';
                document.getElementById('submit-quiz-btn').style.display = 'block';
                activateStep('master');
                QTimer.startPhase('master');

                renderMasterQuestions(data.master);
            });
        }, 2500);

    } catch (error) {
        hideLoading();
        QSounds.error();
        alert('Error submitting quiz. Please try again.');
        console.error(error);
    }
}

function showQuizFeedback(data) {
    const questions = document.querySelectorAll('.quiz-question');

    questions.forEach((q, idx) => {
        const options = q.querySelectorAll('.option-item');
        const result = data.results ? data.results[idx] : null;
        const correctIdx = result ? result.correct_index : -1;
        const userAnswer = selectedQuizAnswers[idx];

        options.forEach((opt, optIdx) => {
            if (optIdx === correctIdx) {
                opt.classList.add('correct-answer');
            }
            if (optIdx === userAnswer && userAnswer !== correctIdx) {
                opt.classList.add('wrong-answer');
            }
        });

        // Show XP float on correct
        if (userAnswer === correctIdx) {
            QSounds.correct();
            spawnXPFloat(q, '+10 XP');
        } else {
            QSounds.wrong();
        }
    });

    // Show overall results
    showQuizResults(data);
}

async function submitMaster() {
    if (!currentSession) return;

    const questions = document.querySelectorAll('.master-question');
    selectedMasterAnswers = [];

    questions.forEach((q) => {
        const selected = q.querySelector('.option-item.selected');
        if (selected) {
            selectedMasterAnswers.push(selected.dataset.value);
        } else {
            selectedMasterAnswers.push('');
        }
    });

    QSounds.click();
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
        QSounds.xpEarned();

        hideLoading();
        loadStats();

        QTimer.endPhase();

        setTimeout(() => {
            showPhaseTransition('🔍 DETECTIVE MODE!', () => {
                document.getElementById('master-mode').style.display = 'none';
                document.getElementById('detective-mode').style.display = 'block';
                document.getElementById('master-results').style.display = 'none';
                document.getElementById('submit-master-btn').style.display = 'block';
                activateStep('detective');
                QTimer.startPhase('detective');

                renderDetective(data.detective);
            });
        }, 2500);

    } catch (error) {
        hideLoading();
        QSounds.error();
        alert('Error submitting master practice. Please try again.');
        console.error(error);
    }
}

// ==================== Detective Phase ====================
async function solveCase() {
    if (!currentSession) return;

    const answer = document.getElementById('detective-answer').value.trim();
    if (!answer) {
        QSounds.error();
        alert('Please enter your answer!');
        return;
    }

    QSounds.click();
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

        if (data.solved) {
            QSounds.correct();
        } else {
            QSounds.wrong();
        }

        hideLoading();
        loadStats();

        QTimer.endPhase();

        // Show completion after delay
        setTimeout(() => {
            showLevelComplete(data);
        }, 2500);

    } catch (error) {
        hideLoading();
        QSounds.error();
        alert('Error solving case. Please try again.');
        console.error(error);
    }
}

// ==================== Level Complete / Reward Screen ====================
function showLevelComplete(data) {
    const timerResult = QTimer.stopLevel();
    document.getElementById('timer-display').style.display = 'none';

    // Play level complete fanfare
    QSounds.levelComplete();

    // Fire confetti
    launchConfetti();

    // Switch to completion screen
    document.getElementById('detective-mode').style.display = 'none';

    const completeSection = document.getElementById('session-complete');
    completeSection.style.display = 'block';

    // Build reward screen
    const totalXP = data.total_session_xp || 0;
    const timeStr = timerResult ? timerResult.totalFormatted : '—';

    completeSection.innerHTML = `
        <div class="reward-screen">
            <div class="reward-title">🎮 LEVEL ${currentLevel} COMPLETE! 🎮</div>
            
            <div class="reward-xp-display" id="reward-xp-counter">+${totalXP} XP</div>
            
            <div class="reward-time">
                ⏱️ COMPLETION TIME: ${timeStr}
            </div>

            <div class="reward-stats">
                ${timerResult && timerResult.phases.story ? `
                <div class="reward-stat">
                    <div class="reward-stat-value">📖 ${timerResult.phases.story.formatted}</div>
                    <div class="reward-stat-label">Story</div>
                </div>` : ''}
                ${timerResult && timerResult.phases.quiz ? `
                <div class="reward-stat">
                    <div class="reward-stat-value">❓ ${timerResult.phases.quiz.formatted}</div>
                    <div class="reward-stat-label">Quiz</div>
                </div>` : ''}
                ${timerResult && timerResult.phases.master ? `
                <div class="reward-stat">
                    <div class="reward-stat-value">🏆 ${timerResult.phases.master.formatted}</div>
                    <div class="reward-stat-label">Master</div>
                </div>` : ''}
                ${timerResult && timerResult.phases.detective ? `
                <div class="reward-stat">
                    <div class="reward-stat-value">🔍 ${timerResult.phases.detective.formatted}</div>
                    <div class="reward-stat-label">Detective</div>
                </div>` : ''}
            </div>

            <!-- Level Progress -->
            <div class="level-progress-bar">
                <div class="level-dot completed" id="lvl-1">1</div>
                <div class="level-line"></div>
                <div class="level-dot ${currentLevel >= 2 ? 'completed' : ''}" id="lvl-2">2</div>
                <div class="level-line"></div>
                <div class="level-dot ${currentLevel >= 3 ? 'completed' : ''}" id="lvl-3">3</div>
            </div>

            <p id="completion-message" style="margin: 16px 0; color: var(--text-secondary);">
                ${currentLevel < maxLevel ? `Level ${currentLevel + 1} is now unlocked!` : "🎉 You've mastered all levels!"}
            </p>

            <div class="completion-buttons">
                <button class="btn btn-secondary" onclick="newAdventure()">
                    <span>🏠</span> HOME
                </button>
                ${currentLevel < maxLevel ? `
                <button class="btn btn-primary btn-large" onclick="startNextLevel()">
                    <span>⚔️</span> LEVEL ${currentLevel + 1}
                </button>` : ''}
            </div>
        </div>
    `;

    // Animate XP counter
    animateXPCounter(totalXP);
}

function animateXPCounter(target) {
    const el = document.getElementById('reward-xp-counter');
    if (!el) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = `+${current} XP`;
    }, 30);
}

// ==================== Confetti System ====================
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd700', '#4ade80', '#60a5fa', '#f472b6', '#a855f7', '#22d3d3', '#ff6b6b'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 200,
            w: 4 + Math.random() * 6,
            h: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            life: 1
        });
    }

    QSounds.confetti();

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.rotation += p.rotSpeed;
            p.life -= 0.005;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            // Pixel-style square confetti
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        frame++;
        if (alive && frame < 300) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    requestAnimationFrame(animate);
}

// ==================== Phase Transition ====================
function showPhaseTransition(text, callback) {
    const overlay = document.getElementById('phase-transition');
    const textEl = document.getElementById('phase-transition-text');

    textEl.textContent = text;
    overlay.style.display = 'flex';
    overlay.style.animation = 'none';
    overlay.offsetHeight; // force reflow
    overlay.style.animation = 'phaseTransition 1.2s ease-in-out forwards';

    QSounds.storyProgress();

    setTimeout(() => {
        overlay.style.display = 'none';
        if (callback) callback();
    }, 1200);
}

// ==================== Pixel Explosion ====================
function spawnPixelExplosion(x, y) {
    const container = document.createElement('div');
    container.className = 'pixel-explosion';
    container.style.left = x + 'px';
    container.style.top = y + 'px';

    const colors = ['#ffd700', '#4ade80', '#60a5fa', '#f472b6'];
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-particle';
        const angle = (i / 12) * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        particle.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1000);
}

// ==================== XP Float Animation ====================
function spawnXPFloat(parentEl, text) {
    const float = document.createElement('div');
    float.className = 'xp-float';
    float.textContent = text;
    float.style.left = '50%';
    float.style.top = '0';
    parentEl.style.position = 'relative';
    parentEl.appendChild(float);
    setTimeout(() => float.remove(), 1200);
}

// ==================== Navigation ====================
function newAdventure() {
    currentSession = null;
    currentLevel = 1;
    QSounds.click();

    document.getElementById('session-container').style.display = 'none';
    document.getElementById('topic-section').style.display = 'block';
    document.getElementById('topic-input').value = '';
    document.getElementById('timer-display').style.display = 'none';

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
}

// ==================== UI Rendering ====================
function formatStoryContent(content) {
    return content.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
}

function renderQuiz(quiz) {
    const container = document.getElementById('quiz-questions');
    container.innerHTML = '';

    // Add quiz progress bar
    const progressHtml = `
        <div class="quiz-progress-bar">
            <span class="quiz-progress-label">PROGRESS</span>
            <div class="quiz-progress-track">
                <div class="quiz-progress-fill" id="quiz-progress-fill" style="width: 0%"></div>
            </div>
            <span class="quiz-progress-count" id="quiz-progress-count">0/${quiz.questions.length}</span>
        </div>
    `;
    container.innerHTML = progressHtml;

    quiz.questions.forEach((q, idx) => {
        const questionHtml = `
            <div class="quiz-question quiz-question-animated" data-index="${idx}" style="animation-delay: ${idx * 0.1}s">
                <div class="question-number">Question ${idx + 1}</div>
                <div class="question-text">${q.question}</div>
                <div class="options-list">
                    ${q.options.map((opt, optIdx) => `
                        <div class="option-item" data-index="${optIdx}" 
                             onclick="selectOption(this, ${idx}, ${quiz.questions.length})"
                             onmouseenter="QSounds.hover()">
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
            <div class="master-question quiz-question-animated" data-index="${idx}" style="animation-delay: ${idx * 0.1}s">
                <div class="question-number">Advanced Question ${idx + 1}</div>
                <div class="question-text">${q.question}</div>
                <div class="options-list">
                    ${q.options.map((opt, optIdx) => `
                        <div class="option-item" data-value="${opt}" 
                             onclick="selectMasterOption(this, ${idx})"
                             onmouseenter="QSounds.hover()">
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

function selectOption(element, questionIdx, totalQuestions) {
    const question = element.closest('.quiz-question');
    question.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    QSounds.select();

    // Update quiz progress
    const answered = document.querySelectorAll('.quiz-question .option-item.selected').length;
    const fill = document.getElementById('quiz-progress-fill');
    const count = document.getElementById('quiz-progress-count');
    if (fill) fill.style.width = `${(answered / totalQuestions) * 100}%`;
    if (count) count.textContent = `${answered}/${totalQuestions}`;

    // Pixel explosion on selection
    const rect = element.getBoundingClientRect();
    spawnPixelExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function selectMasterOption(element, questionIdx) {
    const question = element.closest('.master-question');
    question.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    QSounds.select();
}

function showQuizResults(data) {
    const container = document.getElementById('quiz-results');
    const passed = data.passed ? '✅ Passed!' : '❌ Keep trying!';

    if (data.passed) {
        QSounds.correct();
    } else {
        QSounds.wrong();
    }

    container.innerHTML = `
        <div class="result-card">
            <div class="result-icon">${data.passed ? '🎉' : '📚'}</div>
            <div class="result-title">${passed}</div>
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

// ==================== Progress Steps ====================
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

function renderAchievements(unlockedList) {
    const container = document.getElementById('achievements-grid');
    const unlockedIds = unlockedList.map(a => a.id);

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
    const btn = document.getElementById('tts-btn');
    if (btn) btn.innerHTML = '<span>🔊</span> LISTEN';
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

    value.textContent = `+${amount} XP`;
    popup.style.display = 'block';
    QSounds.xpEarned();

    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}

// ==================== Achievements Modal ====================
function showAchievements() {
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.style.display = 'flex';
        QSounds.click();
    }
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

    QSounds.click();
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
            QSounds.error();
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

        // Start timer for new level
        document.getElementById('timer-display').style.display = 'flex';
        QTimer.startLevel();
        QTimer.startPhase('story');

        // Show story for new level with typewriter
        document.getElementById('story-title').textContent = data.story.title;

        // Reset all sections
        document.querySelectorAll('.mode-section').forEach(section => {
            section.style.display = 'none';
        });

        const storySection = document.getElementById('story-section') || document.getElementById('story-mode');
        if (storySection) storySection.style.display = 'block';

        typewriteStory(data.story.content);

        // Reset result displays
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('master-results').style.display = 'none';
        document.getElementById('detective-results').style.display = 'none';

        // Restore submit buttons
        document.getElementById('submit-quiz-btn').style.display = 'block';
        document.getElementById('submit-master-btn').style.display = 'block';
        document.getElementById('solve-case-btn').style.display = 'block';

        document.getElementById('detective-answer').value = '';

        // Reset progress steps
        document.querySelectorAll('.progress-step-v').forEach(step => {
            step.classList.remove('completed', 'active');
        });

        activateStep('story');
        updateSidebarLevels(currentLevel);
        hideLoading();

        QSounds.storyProgress();
        console.log(`✅ Started Level ${currentLevel}`);

    } catch (error) {
        hideLoading();
        QSounds.error();
        console.error('Level loading error:', error);
        alert('Error loading next level: ' + error.message);
    }
}
