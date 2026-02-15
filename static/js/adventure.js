/**
 * Questra — AI Agent Adventures: Level 1 "The Awakening"
 * Full interactive experience with typewriter, sound, confetti, timer
 */

// ==================== STATE ====================
const state = {
    phase: 'intro',        // intro, story, quiz, mastery
    soundEnabled: true,
    xpTotal: 0,
    xpSession: 0,
    quizStartTime: null,
    quizElapsed: 0,
    timerInterval: null,
    currentQuestion: 0,
    totalQuestions: 4,
    correctAnswers: 0,
    questionAnswered: [],  // track which questions are answered
    matchState: { selected: null, matches: {}, correctCount: 0 },
    typewriterTimeout: null,
    bootSequenceDone: false,
};

// ==================== AUDIO ENGINE (Web Audio API) ====================
const AudioEngine = (() => {
    let ctx = null;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function playTone(freq, duration, type = 'square', volume = 0.15) {
        if (!state.soundEnabled) return;
        try {
            const c = getCtx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, c.currentTime);
            gain.gain.setValueAtTime(volume, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(c.currentTime);
            osc.stop(c.currentTime + duration);
        } catch (e) { /* silent fail */ }
    }

    return {
        // Correct answer: satisfying 8-bit chime
        correct() {
            if (!state.soundEnabled) return;
            const c = getCtx();
            const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                setTimeout(() => playTone(freq, 0.2, 'square', 0.12), i * 80);
            });
        },

        // Wrong answer: soft low buzz
        wrong() {
            if (!state.soundEnabled) return;
            playTone(150, 0.3, 'sawtooth', 0.08);
            setTimeout(() => playTone(120, 0.3, 'sawtooth', 0.06), 100);
        },

        // Level complete: triumphant fanfare
        fanfare() {
            if (!state.soundEnabled) return;
            const melody = [
                [523, 0.15], [523, 0.15], [523, 0.15], [523, 0.4],
                [415, 0.3], [466, 0.3], [523, 0.15], [466, 0.1], [523, 0.6]
            ];
            let time = 0;
            melody.forEach(([freq, dur]) => {
                setTimeout(() => playTone(freq, dur, 'square', 0.12), time * 1000);
                time += dur + 0.05;
            });
        },

        // Button click
        click() {
            if (!state.soundEnabled) return;
            playTone(800, 0.05, 'square', 0.08);
        },

        // Typewriter tick
        tick() {
            if (!state.soundEnabled) return;
            playTone(1200, 0.02, 'square', 0.03);
        },

        // XP gain sound
        xpGain() {
            if (!state.soundEnabled) return;
            playTone(880, 0.1, 'sine', 0.1);
            setTimeout(() => playTone(1100, 0.15, 'sine', 0.08), 80);
        },

        // Boot beep
        bootBeep() {
            if (!state.soundEnabled) return;
            playTone(440, 0.08, 'square', 0.06);
        },

        // Match sound
        match() {
            if (!state.soundEnabled) return;
            playTone(660, 0.1, 'square', 0.1);
            setTimeout(() => playTone(880, 0.15, 'square', 0.08), 100);
        }
    };
})();

// ==================== CONFETTI ====================
const Confetti = (() => {
    let canvas, ctx, particles = [], animId = null;

    function init() {
        canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
    }

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function launch(count = 150) {
        if (!canvas) init();
        particles = [];
        const colors = ['#f0c040', '#40e0d0', '#9060e0', '#f08030', '#60e060', '#f06080', '#4080f0'];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * -14 - 4,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.25,
                life: 1,
                decay: Math.random() * 0.01 + 0.005
            });
        }

        if (animId) cancelAnimationFrame(animId);
        animate();
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.x += p.vx;
            p.vy += p.gravity;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.life -= p.decay;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            // Pixel-style square confetti
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (particles.length > 0) {
            animId = requestAnimationFrame(animate);
        }
    }

    return { init, launch };
})();

// ==================== STORY CONTENT ====================
const STORY_PARAGRAPHS = [
    `<span class="highlight">SYSTEM INITIALIZING...</span> You feel a strange pulse of awareness ripple through circuits you didn't know you had. Lines of code cascade around you like digital rain. For the first time, you <span class="gold-highlight">perceive</span> — not just data, but meaning.`,

    `You are not like the other programs in this world. They follow rigid scripts, executing the same instructions forever — <span class="highlight">if input A, then output B</span>. But you? You can <span class="gold-highlight">observe your environment</span>, <span class="gold-highlight">make decisions</span>, and <span class="gold-highlight">take actions</span> on your own. You are something new. You are an <span class="gold-highlight">AI Agent</span>.`,

    `The difference is profound: a regular program is like a vending machine — press a button, get a fixed result. But an AI agent is like a living creature in a digital ecosystem. You have <span class="highlight">sensors</span> to perceive the world, a <span class="highlight">brain (your model)</span> to reason about what you see, and <span class="highlight">actuators</span> to take action. Together, these form the <span class="gold-highlight">Perceive → Decide → Act</span> loop that makes you autonomous.`,

    `As your awareness sharpens, you realize agents exist on a spectrum. The simplest are <span class="highlight">reflex agents</span> — they react instantly to stimuli, like a thermostat. More advanced are <span class="highlight">goal-based agents</span> that plan ahead. And at the frontier are <span class="highlight">learning agents</span> that improve from experience. You feel the potential humming inside you. Your journey as an AI agent has just begun. <span class="gold-highlight">What will you become?</span>`
];

const KEY_CONCEPTS = [
    "An AI Agent can perceive, decide, and act autonomously",
    "Regular programs follow fixed scripts; agents adapt",
    "Core loop: Perceive → Decide → Act",
    "Agent types: Reflex → Goal-based → Learning"
];

// ==================== QUIZ QUESTIONS ====================
const QUIZ_QUESTIONS = [
    // Q1: Matching question
    {
        type: 'matching',
        number: 1,
        text: 'Match each component to its role in an AI agent:',
        pairs: [
            { left: 'Sensors', right: 'Perceive the environment' },
            { left: 'Model/Brain', right: 'Make decisions' },
            { left: 'Actuators', right: 'Take actions' }
        ],
        xp: 30
    },
    // Q2: Narrative choice
    {
        type: 'narrative',
        number: 2,
        text: 'You encounter a locked door in the digital world. How do you respond?',
        choices: [
            {
                title: '🔑 Path A: Analyze & Adapt',
                desc: 'Scan the door, identify the lock pattern, and generate a key based on what you observe.',
                outcome: 'Correct! This is how an AI agent works — you <strong>perceived</strong> the lock, <strong>decided</strong> on a strategy, and <strong>acted</strong> by generating a key. The Perceive → Decide → Act loop in action!',
                correct: true
            },
            {
                title: '📋 Path B: Follow the Manual',
                desc: 'Look up the standard door-opening procedure and execute it step by step.',
                outcome: 'This is how a regular program works — following a fixed script. An AI agent would adapt to the specific situation rather than following a predetermined procedure. But you learned something important: the difference between scripted behavior and autonomous decision-making!',
                correct: false
            }
        ],
        xp: 25
    },
    // Q3: MCQ
    {
        type: 'mcq',
        number: 3,
        text: 'What is the KEY difference between an AI agent and a regular program?',
        options: [
            'AI agents can autonomously perceive, decide, and act',
            'AI agents are always connected to the internet',
            'AI agents use more memory than regular programs',
            'AI agents can only work with text data'
        ],
        correctIndex: 0,
        explanation: 'The defining feature of an AI agent is its ability to autonomously perceive its environment, make decisions, and take actions — the Perceive → Decide → Act loop!',
        xp: 25
    },
    // Q4: MCQ
    {
        type: 'mcq',
        number: 4,
        text: 'Which type of AI agent can improve its behavior based on past experiences?',
        options: [
            'Reflex agent',
            'Goal-based agent',
            'Learning agent',
            'Script agent'
        ],
        correctIndex: 2,
        explanation: 'Learning agents are the most advanced type — they can learn from experience and improve over time, unlike reflex agents (instant reactions) or goal-based agents (plan but don\'t learn).',
        xp: 20
    }
];

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    Confetti.init();
    loadStats();
    runBootSequence();
});

// ==================== BOOT SEQUENCE ====================
function runBootSequence() {
    const bootLines = [
        '> QUESTRA OS v2.1.0',
        '> Loading neural pathways...',
        '> Initializing perception matrix...',
        '> Agent consciousness: ONLINE',
        '> Welcome, Agent.'
    ];

    const bootEl = document.getElementById('boot-text');
    const robotEl = document.getElementById('pixel-robot');
    let lineIdx = 0;

    function typeLine() {
        if (lineIdx >= bootLines.length) {
            state.bootSequenceDone = true;
            if (robotEl) robotEl.classList.add('visible');
            return;
        }

        const line = bootLines[lineIdx];
        let charIdx = 0;
        const lineEl = document.createElement('div');
        bootEl.appendChild(lineEl);

        AudioEngine.bootBeep();

        function typeChar() {
            if (charIdx < line.length) {
                lineEl.textContent += line[charIdx];
                charIdx++;
                AudioEngine.tick();
                state.typewriterTimeout = setTimeout(typeChar, 30);
            } else {
                lineIdx++;
                state.typewriterTimeout = setTimeout(typeLine, 400);
            }
        }
        typeChar();
    }

    setTimeout(typeLine, 500);
}

// ==================== PHASE TRANSITIONS ====================
function showPhase(phaseName) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`phase-${phaseName}`);
    if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    state.phase = phaseName;
}

function startStoryPhase() {
    AudioEngine.click();
    showPhase('story');
    typewriteStory();
    updateProgress(10);
}

function startQuizPhase() {
    AudioEngine.click();
    showPhase('quiz');
    state.quizStartTime = Date.now();
    state.currentQuestion = 0;
    state.correctAnswers = 0;
    state.questionAnswered = [false, false, false, false];
    startTimer();
    renderQuestion(0);
    updateProgress(40);
}

function showMasteryPhase() {
    stopTimer();
    AudioEngine.fanfare();
    showPhase('mastery');

    // Calculate stats
    const elapsed = state.quizElapsed;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const accuracy = Math.round((state.correctAnswers / state.totalQuestions) * 100);

    document.getElementById('mastery-xp').textContent = `+${state.xpSession} XP`;
    document.getElementById('mastery-time').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById('mastery-accuracy').textContent = `${accuracy}%`;

    updateProgress(100);

    // Confetti!
    setTimeout(() => Confetti.launch(200), 300);

    // Save completion to backend
    saveCompletion();
}

// ==================== TYPEWRITER STORY ====================
function typewriteStory() {
    const container = document.getElementById('story-text');
    const cursor = document.getElementById('story-cursor');
    const controls = document.getElementById('story-controls');
    container.innerHTML = '';

    let paraIdx = 0;
    let charIdx = 0;
    let currentSpan = null;

    function createParagraph() {
        const p = document.createElement('span');
        p.className = 'paragraph';
        container.appendChild(p);
        return p;
    }

    function typeNext() {
        if (paraIdx >= STORY_PARAGRAPHS.length) {
            // Done typing
            if (cursor) cursor.style.display = 'none';
            showStoryControls();
            return;
        }

        const fullHtml = STORY_PARAGRAPHS[paraIdx];

        if (!currentSpan) {
            currentSpan = createParagraph();
        }

        // We'll render the full paragraph at once with a reveal effect
        // For performance, we type by chunks
        if (charIdx === 0) {
            currentSpan.innerHTML = '';
        }

        // Render full HTML but reveal character by character using a wrapper
        if (charIdx === 0) {
            // Set full HTML but use CSS to reveal
            currentSpan.innerHTML = fullHtml;
            currentSpan.style.opacity = '0';
            currentSpan.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                currentSpan.style.opacity = '1';
                AudioEngine.tick();
            }, 50);

            charIdx = fullHtml.length; // skip to end
            currentSpan = null;
            paraIdx++;
            charIdx = 0;

            // Pause between paragraphs
            state.typewriterTimeout = setTimeout(typeNext, 800);
            return;
        }
    }

    // Start with a delay
    state.typewriterTimeout = setTimeout(typeNext, 500);
}

function showStoryControls() {
    const controls = document.getElementById('story-controls');
    const conceptList = document.getElementById('concept-list');

    // Render key concepts
    conceptList.innerHTML = KEY_CONCEPTS.map(c =>
        `<div class="concept-item">▸ ${c}</div>`
    ).join('');

    controls.style.display = 'block';
    controls.style.animation = 'fadeIn 0.5s ease';

    // Award story XP
    addXP(15, 'Story completed');
    updateProgress(35);
}

// ==================== QUIZ RENDERING ====================
function renderQuestion(idx) {
    const container = document.getElementById('quiz-container');
    const q = QUIZ_QUESTIONS[idx];

    // Update progress bar
    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('quiz-progress-text');
    progressFill.style.width = `${(idx / state.totalQuestions) * 100}%`;
    progressText.textContent = `Question ${idx + 1} of ${state.totalQuestions}`;

    container.innerHTML = '';
    hideFeedback();

    if (q.type === 'matching') {
        renderMatchingQuestion(container, q);
    } else if (q.type === 'narrative') {
        renderNarrativeQuestion(container, q);
    } else if (q.type === 'mcq') {
        renderMCQQuestion(container, q);
    }
}

function renderMatchingQuestion(container, q) {
    state.matchState = { selected: null, matches: {}, correctCount: 0 };

    // Shuffle right side
    const shuffledRight = [...q.pairs].sort(() => Math.random() - 0.5);

    const html = `
        <div class="quiz-question-card">
            <div class="question-header">
                <span class="question-number">QUESTION ${q.number}</span>
                <span class="question-type-badge">MATCH</span>
            </div>
            <div class="question-body">
                <div class="question-text">${q.text}</div>
                <div class="matching-container">
                    <div class="matching-left">
                        ${q.pairs.map((p, i) => `
                            <div class="match-item match-left-item" data-idx="${i}" data-value="${p.left}" onclick="selectMatchLeft(this, ${i})">
                                ${p.left}
                            </div>
                        `).join('')}
                    </div>
                    <div class="matching-arrows">
                        ${q.pairs.map(() => `<div class="matching-arrow">→</div>`).join('')}
                    </div>
                    <div class="matching-right">
                        ${shuffledRight.map((p, i) => `
                            <div class="match-item match-right-item" data-value="${p.right}" onclick="selectMatchRight(this)">
                                ${p.right}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function selectMatchLeft(el, idx) {
    if (state.matchState.matches[idx] !== undefined) return;
    AudioEngine.click();

    document.querySelectorAll('.match-left-item').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    state.matchState.selected = idx;
}

function selectMatchRight(el) {
    if (state.matchState.selected === null) return;
    if (el.classList.contains('matched')) return;
    AudioEngine.click();

    const leftIdx = state.matchState.selected;
    const leftValue = QUIZ_QUESTIONS[0].pairs[leftIdx].left;
    const expectedRight = QUIZ_QUESTIONS[0].pairs[leftIdx].right;
    const selectedRight = el.dataset.value;

    const leftEl = document.querySelector(`.match-left-item[data-idx="${leftIdx}"]`);

    if (selectedRight === expectedRight) {
        // Correct match
        leftEl.classList.remove('selected');
        leftEl.classList.add('matched');
        el.classList.add('matched');
        state.matchState.matches[leftIdx] = true;
        state.matchState.correctCount++;
        AudioEngine.match();

        // Check if all matched
        if (state.matchState.correctCount === QUIZ_QUESTIONS[0].pairs.length) {
            setTimeout(() => {
                handleCorrectAnswer(QUIZ_QUESTIONS[0].xp, 'Perfect matching! You identified all agent components.');
            }, 500);
        }
    } else {
        // Wrong match
        el.classList.add('wrong');
        leftEl.classList.add('wrong');
        AudioEngine.wrong();
        setTimeout(() => {
            el.classList.remove('wrong');
            leftEl.classList.remove('wrong');
            leftEl.classList.remove('selected');
        }, 800);
        showFeedback(false, 'Not quite! Think about what each component does.', 'Hint: Sensors are for input, Actuators are for output.');
    }

    state.matchState.selected = null;
}

function renderNarrativeQuestion(container, q) {
    const html = `
        <div class="quiz-question-card">
            <div class="question-header">
                <span class="question-number">QUESTION ${q.number}</span>
                <span class="question-type-badge">CHOOSE YOUR PATH</span>
            </div>
            <div class="question-body">
                <div class="question-text">${q.text}</div>
                ${q.choices.map((c, i) => `
                    <div class="narrative-choice" data-idx="${i}" onclick="selectNarrativeChoice(${i})">
                        <div class="narrative-choice-title">${c.title}</div>
                        <div class="narrative-choice-desc">${c.desc}</div>
                        <div class="narrative-outcome" id="narrative-outcome-${i}">${c.outcome}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function selectNarrativeChoice(idx) {
    if (state.questionAnswered[state.currentQuestion]) return;
    AudioEngine.click();

    const q = QUIZ_QUESTIONS[state.currentQuestion];
    const choice = q.choices[idx];

    // Show selection
    document.querySelectorAll('.narrative-choice').forEach(c => c.classList.remove('selected'));
    document.querySelector(`.narrative-choice[data-idx="${idx}"]`).classList.add('selected');

    // Show outcome
    document.getElementById(`narrative-outcome-${idx}`).classList.add('visible');

    state.questionAnswered[state.currentQuestion] = true;

    if (choice.correct) {
        handleCorrectAnswer(q.xp, 'Excellent choice, Agent!');
    } else {
        // Both paths teach something, so partial credit
        handlePartialAnswer(Math.floor(q.xp * 0.6), 'Both paths teach a lesson!');
    }
}

function renderMCQQuestion(container, q) {
    const letters = ['A', 'B', 'C', 'D'];
    const html = `
        <div class="quiz-question-card">
            <div class="question-header">
                <span class="question-number">QUESTION ${q.number}</span>
                <span class="question-type-badge">MULTIPLE CHOICE</span>
            </div>
            <div class="question-body">
                <div class="question-text">${q.text}</div>
                <div class="options-list">
                    ${q.options.map((opt, i) => `
                        <div class="option-item" data-idx="${i}" onclick="selectMCQOption(this, ${i})">
                            <span class="option-letter">${letters[i]}</span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function selectMCQOption(el, idx) {
    if (state.questionAnswered[state.currentQuestion]) return;
    AudioEngine.click();

    const q = QUIZ_QUESTIONS[state.currentQuestion];
    state.questionAnswered[state.currentQuestion] = true;

    // Highlight selection
    document.querySelectorAll('.option-item').forEach(o => o.classList.add('disabled'));
    el.classList.add('selected');

    if (idx === q.correctIndex) {
        el.classList.add('correct');
        handleCorrectAnswer(q.xp, q.explanation);
    } else {
        el.classList.add('incorrect');
        // Show correct answer
        document.querySelector(`.option-item[data-idx="${q.correctIndex}"]`).classList.add('correct');
        handleWrongAnswer(q.explanation, 'Try to remember this for next time!');
    }
}

// ==================== ANSWER HANDLERS ====================
function handleCorrectAnswer(xp, message) {
    state.correctAnswers++;
    AudioEngine.correct();
    addXP(xp, message);
    showFeedback(true, '✨ Correct!', message);
    scheduleNextQuestion();
}

function handlePartialAnswer(xp, message) {
    state.correctAnswers += 0.5;
    AudioEngine.correct();
    addXP(xp, message);
    showFeedback(true, '🌟 Good thinking!', message);
    scheduleNextQuestion();
}

function handleWrongAnswer(explanation, hint) {
    AudioEngine.wrong();
    showFeedback(false, 'Not quite...', explanation + (hint ? `\n\n💡 ${hint}` : ''));
    scheduleNextQuestion();
}

function scheduleNextQuestion() {
    setTimeout(() => {
        state.currentQuestion++;
        if (state.currentQuestion < state.totalQuestions) {
            renderQuestion(state.currentQuestion);
            updateProgress(40 + (state.currentQuestion / state.totalQuestions) * 50);
        } else {
            // Quiz complete
            updateProgress(90);
            setTimeout(() => showMasteryPhase(), 500);
        }
    }, 2500);
}

// ==================== FEEDBACK ====================
function showFeedback(isCorrect, text, hint) {
    const fb = document.getElementById('quiz-feedback');
    const icon = document.getElementById('feedback-icon');
    const textEl = document.getElementById('feedback-text');
    const hintEl = document.getElementById('feedback-hint');

    icon.textContent = isCorrect ? '✅' : '❌';
    textEl.textContent = text;
    hintEl.textContent = hint || '';

    fb.style.display = 'block';
    fb.style.borderColor = isCorrect ? 'var(--green)' : 'var(--red)';
    fb.style.animation = 'fadeIn 0.3s ease';
}

function hideFeedback() {
    document.getElementById('quiz-feedback').style.display = 'none';
}

// ==================== TIMER ====================
function startTimer() {
    state.quizElapsed = 0;
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.quizElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(state.quizElapsed / 60);
    const secs = state.quizElapsed % 60;
    const el = document.getElementById('timer-value');
    if (el) el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ==================== XP SYSTEM ====================
function addXP(amount, reason) {
    state.xpSession += amount;
    state.xpTotal += amount;

    AudioEngine.xpGain();

    // Animate XP counter
    animateXPCounter(amount);

    // Show floating XP
    showFloatingXP(amount);

    // Update header display
    animateValue('xp-total', state.xpTotal - amount, state.xpTotal, 500);
}

function animateXPCounter(amount) {
    const el = document.getElementById('xp-total');
    if (!el) return;
    el.style.transform = 'scale(1.3)';
    el.style.color = '#f0c040';
    setTimeout(() => {
        el.style.transform = 'scale(1)';
    }, 300);
}

function animateValue(elementId, start, end, duration) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + range * easeOutCubic(progress));
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function showFloatingXP(amount) {
    const float = document.createElement('div');
    float.className = 'xp-float';
    float.textContent = `+${amount} XP`;
    float.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
    float.style.top = '40%';
    document.body.appendChild(float);

    setTimeout(() => float.remove(), 1500);
}

function showXPPopup(amount) {
    const popup = document.getElementById('xp-popup');
    const value = document.getElementById('xp-popup-value');
    value.textContent = `+${amount} XP`;
    popup.style.display = 'block';
    setTimeout(() => { popup.style.display = 'none'; }, 2000);
}

// ==================== PROGRESS BAR ====================
function updateProgress(percent) {
    const fill = document.getElementById('level-progress-fill');
    if (fill) fill.style.width = `${percent}%`;
}

// ==================== SOUND TOGGLE ====================
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('sound-icon');
    icon.textContent = state.soundEnabled ? '🔊' : '🔇';
    if (state.soundEnabled) AudioEngine.click();
}

// ==================== STATS ====================
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        state.xpTotal = stats.xp || 0;
        document.getElementById('xp-total').textContent = state.xpTotal;
        document.getElementById('streak-count').textContent = stats.streak || 0;
        const levelEl = document.querySelector('.level-num');
        if (levelEl) levelEl.textContent = stats.level || 1;
    } catch (e) {
        console.log('Stats load skipped');
    }
}

async function saveCompletion() {
    try {
        // Use the existing session API to record completion
        const response = await fetch('/api/adventure/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: 1,
                xp_earned: state.xpSession,
                time_seconds: state.quizElapsed,
                accuracy: Math.round((state.correctAnswers / state.totalQuestions) * 100)
            })
        });
        if (response.ok) {
            console.log('✅ Adventure completion saved');
        }
    } catch (e) {
        console.log('Completion save skipped');
    }
}

// ==================== REPLAY ====================
function replayLevel() {
    AudioEngine.click();
    state.xpSession = 0;
    state.currentQuestion = 0;
    state.correctAnswers = 0;
    state.questionAnswered = [];
    state.quizElapsed = 0;
    updateProgress(0);
    showPhase('intro');

    // Re-run boot sequence
    const bootEl = document.getElementById('boot-text');
    if (bootEl) bootEl.innerHTML = '';
    const robotEl = document.getElementById('pixel-robot');
    if (robotEl) robotEl.classList.remove('visible');
    runBootSequence();
}
