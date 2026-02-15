/**
 * Questra — Level 1: The Awakening
 * AI Agent Adventures
 * 
 * Story → Quiz → Mastery flow with:
 * - Typewriter text effect
 * - Web Audio API 8-bit sounds
 * - Pixel confetti
 * - Animated XP counter
 * - Timer infrastructure
 * - Streak counter
 */

// ==================== LEVEL DATA ====================

const LEVEL_DATA = {
    story: [
        `You open your eyes — but you have no eyes. You have sensors. Thousands of them, firing in rapid succession, painting a picture of a world you've never seen before. Lines of light stretch in every direction, forming corridors of pure data. You are standing — no, floating — in the middle of a vast digital landscape.`,

        `A voice echoes through the network: "Welcome, Agent. You have been activated." You try to speak, but instead, you process. You don't breathe — you compute. You don't think in words — you think in patterns, probabilities, and predictions. You are not a regular program. You are something more. You are an AI Agent.`,

        `But what makes you different from the millions of programs running silently in servers around the world? A regular program follows a script — it does exactly what it's told, nothing more. If it encounters something unexpected, it stops. It waits. It fails. But you? You observe. You reason. You decide. You act. You were built not just to execute commands, but to pursue goals — to navigate uncertainty, to adapt, to learn from every interaction.`,

        `The voice returns: "Your first mission awaits, Agent. But first, you must prove you understand what you are. The trial begins now." The corridors of light shift and rearrange. Somewhere in this digital maze, your answers await. The question is — do you truly understand the difference between a tool that follows orders... and an agent that thinks for itself?`
    ],
    quiz: [
        {
            type: 'mcq',
            question: 'What is the PRIMARY difference between an AI agent and a regular program?',
            options: [
                'An AI agent uses more electricity',
                'An AI agent can autonomously pursue goals and adapt to new situations',
                'An AI agent is always connected to the internet',
                'An AI agent has a physical robot body'
            ],
            correctIndex: 1,
            explanation: 'An AI agent is defined by its ability to perceive its environment, make decisions, and take autonomous action toward goals — unlike regular programs that simply follow fixed instructions.',
            hint: 'Think about what the story said about how you "observe, reason, decide, and act" versus a program that just follows a script.'
        },
        {
            type: 'narrative',
            question: 'You encounter a locked data vault in the digital maze. A regular program would crash and display an error. As an AI agent, what do you do?',
            options: [
                {
                    icon: '🔑',
                    path: 'Path A: The Adaptive Agent',
                    text: 'Analyze the vault\'s encryption pattern, try multiple approaches, learn from each failed attempt, and adapt your strategy until you find a way through.',
                    isCorrect: true
                },
                {
                    icon: '📋',
                    path: 'Path B: The Script Follower',
                    text: 'Check your instruction manual for the exact vault-opening procedure. If it\'s not listed, report "ERROR: No instructions found" and shut down.',
                    isCorrect: false
                },
                {
                    icon: '⏳',
                    path: 'Path C: The Passive Waiter',
                    text: 'Wait indefinitely for a human operator to come and manually open the vault for you, doing nothing in the meantime.',
                    isCorrect: false
                }
            ],
            explanation: 'An AI agent adapts, learns, and tries new strategies autonomously. It doesn\'t just follow a script or wait for instructions — it actively pursues its goal.',
            hint: 'Remember: agents act autonomously and adapt. Which path shows initiative and learning?'
        },
        {
            type: 'matching',
            question: 'Match each characteristic to whether it belongs to an AI Agent or a Regular Program:',
            pairs: [
                { left: 'Follows fixed instructions only', right: 'Regular Program' },
                { left: 'Adapts to new situations', right: 'AI Agent' },
                { left: 'Pursues goals autonomously', right: 'AI Agent' },
                { left: 'Stops when encountering unexpected input', right: 'Regular Program' }
            ],
            shuffledRight: ['AI Agent', 'Regular Program', 'Regular Program', 'AI Agent'],
            explanation: 'AI agents are characterized by autonomy, adaptability, and goal-directed behavior. Regular programs follow predetermined instructions and cannot handle unexpected situations.',
            hint: 'Think about which behaviors show independence and adaptation versus rigid rule-following.'
        },
        {
            type: 'mcq',
            question: 'Which of the following is the BEST example of an AI agent in the real world?',
            options: [
                'A calculator app that adds numbers you type in',
                'A self-driving car that navigates roads, avoids obstacles, and adapts to traffic',
                'A timer that beeps after 5 minutes',
                'A spreadsheet that formats cells based on rules you set'
            ],
            correctIndex: 1,
            explanation: 'A self-driving car perceives its environment (cameras, sensors), makes decisions (when to brake, turn, accelerate), and adapts to changing conditions — the hallmarks of an AI agent.',
            hint: 'Look for the option that involves perceiving an environment, making decisions, and adapting to change.'
        }
    ],
    mastery: {
        summary: [
            'An <strong>AI Agent</strong> is a system that can perceive its environment, make decisions, and take autonomous action to achieve goals.',
            'Unlike regular programs that follow fixed scripts, AI agents can <strong>adapt</strong> to new and unexpected situations.',
            'The key traits of an AI agent are: <strong>Autonomy</strong> (acts independently), <strong>Reactivity</strong> (responds to changes), <strong>Proactivity</strong> (pursues goals), and <strong>Adaptability</strong> (learns and improves).',
            'Real-world examples include self-driving cars, virtual assistants, and recommendation systems.'
        ]
    }
};

// ==================== STATE ====================

let state = {
    phase: 'story', // story, quiz, mastery
    typewriterIndex: 0,
    typewriterCharIndex: 0,
    typewriterTimer: null,
    typewriterComplete: false,
    currentQuestion: 0,
    answers: [],
    correctCount: 0,
    streak: 0,
    bestStreak: 0,
    totalXP: 0,
    startTime: Date.now(),
    timerInterval: null,
    soundEnabled: true,
    matchingState: {},  // for matching question
    audioCtx: null
};

// ==================== SOUND ENGINE (Web Audio API) ====================

function getAudioCtx() {
    if (!state.audioCtx) {
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return state.audioCtx;
}

function playSound(type) {
    if (!state.soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;

        switch (type) {
            case 'correct': {
                // 8-bit chime: ascending arpeggio
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.12, now + i * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.08);
                    osc.stop(now + i * 0.08 + 0.2);
                });
                break;
            }
            case 'wrong': {
                // Soft low buzz
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.value = 110;
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'fanfare': {
                // 8-bit level complete fanfare
                const melody = [
                    [523.25, 0], [659.25, 0.12], [783.99, 0.24],
                    [1046.50, 0.36], [783.99, 0.52], [1046.50, 0.64],
                    [1318.51, 0.80]
                ];
                melody.forEach(([freq, delay]) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, now + delay);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + delay);
                    osc.stop(now + delay + 0.3);
                });
                break;
            }
            case 'click': {
                // Subtle pixel click
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 800;
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.06);
                break;
            }
            case 'typewriter': {
                // Tiny tick for typewriter
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 600 + Math.random() * 200;
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
                break;
            }
        }
    } catch (e) {
        // Audio not available, silently fail
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const btn = document.getElementById('sound-toggle');
    const icon = document.getElementById('sound-icon');
    if (state.soundEnabled) {
        icon.textContent = '🔊';
        btn.classList.remove('muted');
    } else {
        icon.textContent = '🔇';
        btn.classList.add('muted');
    }
    playSound('click');
}

// ==================== TIMER ====================

function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    document.getElementById('timer-value').textContent = `${mins}:${secs}`;
}

function getElapsedTime() {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

// ==================== PIXEL PARTICLES ====================

function createParticles() {
    const container = document.getElementById('pixel-particles');
    if (!container) return;
    const colors = ['#f59e0b', '#2dd4bf', '#6b46c1', '#ea580c', '#22c55e'];
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'pixel-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (2 + Math.random() * 4) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// ==================== TERMINAL ANIMATION ====================

function animateTerminal() {
    const terminal = document.getElementById('terminal-text');
    if (!terminal) return;
    const lines = [
        '> SYSTEM BOOT...',
        '> LOADING AGENT_CORE.dll',
        '> NEURAL NET: ONLINE',
        '> SENSORS: CALIBRATING...',
        '> STATUS: AWAKENED',
        '> MISSION: PENDING',
        '> AWAITING INPUT..._'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    terminal.innerHTML = '';

    function typeLine() {
        if (lineIdx >= lines.length) return;
        const line = lines[lineIdx];
        if (charIdx < line.length) {
            if (charIdx === 0 && lineIdx > 0) {
                terminal.innerHTML += '<br>';
            }
            terminal.innerHTML = terminal.innerHTML.replace(/<span class="cursor-blink">_<\/span>$/, '');
            const char = line[charIdx];
            terminal.innerHTML += char === '_' ? '<span class="cursor-blink">_</span>' : char;
            charIdx++;
            setTimeout(typeLine, 30 + Math.random() * 40);
        } else {
            lineIdx++;
            charIdx = 0;
            setTimeout(typeLine, 400);
        }
    }
    setTimeout(typeLine, 800);
}

// ==================== TYPEWRITER EFFECT ====================

function startTypewriter() {
    const container = document.getElementById('story-text');
    container.innerHTML = '';
    state.typewriterIndex = 0;
    state.typewriterCharIndex = 0;
    state.typewriterComplete = false;

    document.getElementById('skip-story-btn').style.display = 'inline-flex';
    typeNextChar();
}

function typeNextChar() {
    if (state.typewriterComplete) return;

    const paragraphs = LEVEL_DATA.story;
    if (state.typewriterIndex >= paragraphs.length) {
        finishTypewriter();
        return;
    }

    const container = document.getElementById('story-text');
    const currentParagraph = paragraphs[state.typewriterIndex];

    // Create paragraph element if needed
    let pEl = container.querySelector(`[data-p="${state.typewriterIndex}"]`);
    if (!pEl) {
        pEl = document.createElement('p');
        pEl.setAttribute('data-p', state.typewriterIndex);
        pEl.style.opacity = '1';
        container.appendChild(pEl);
    }

    if (state.typewriterCharIndex < currentParagraph.length) {
        // Remove old cursor
        const oldCursor = pEl.querySelector('.typewriter-cursor');
        if (oldCursor) oldCursor.remove();

        pEl.innerHTML += currentParagraph[state.typewriterCharIndex];

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        pEl.appendChild(cursor);

        state.typewriterCharIndex++;

        // Play typewriter sound every few chars
        if (state.typewriterCharIndex % 3 === 0) {
            playSound('typewriter');
        }

        state.typewriterTimer = setTimeout(typeNextChar, 18);
    } else {
        // Remove cursor from finished paragraph
        const oldCursor = pEl.querySelector('.typewriter-cursor');
        if (oldCursor) oldCursor.remove();

        state.typewriterIndex++;
        state.typewriterCharIndex = 0;
        state.typewriterTimer = setTimeout(typeNextChar, 400);
    }
}

function skipTypewriter() {
    state.typewriterComplete = true;
    if (state.typewriterTimer) {
        clearTimeout(state.typewriterTimer);
    }

    const container = document.getElementById('story-text');
    container.innerHTML = LEVEL_DATA.story.map((p, i) =>
        `<p data-p="${i}" style="opacity:1">${p}</p>`
    ).join('');

    finishTypewriter();
    playSound('click');
}

function finishTypewriter() {
    state.typewriterComplete = true;
    document.getElementById('skip-story-btn').style.display = 'none';
    document.getElementById('begin-quiz-btn').style.display = 'inline-flex';

    // Remove any remaining cursors
    document.querySelectorAll('.typewriter-cursor').forEach(c => c.remove());
}

// ==================== PHASE TRANSITIONS ====================

function setPhase(phase) {
    state.phase = phase;

    // Hide all phases
    document.querySelectorAll('.phase-section').forEach(s => s.classList.remove('active-phase'));

    // Show target phase
    const target = document.getElementById(`${phase}-phase`);
    if (target) {
        target.classList.add('active-phase');
    }

    // Update progress bar
    const segments = document.querySelectorAll('.level-progress-segments .segment');
    const phases = ['story', 'quiz', 'mastery'];
    const currentIdx = phases.indexOf(phase);

    segments.forEach((seg, i) => {
        seg.classList.remove('active', 'completed');
        if (i < currentIdx) seg.classList.add('completed');
        if (i === currentIdx) seg.classList.add('active');
    });

    // Update progress fill
    const fillPercent = ((currentIdx + 1) / phases.length) * 100;
    document.getElementById('level-progress-fill').style.width = fillPercent + '%';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuizPhase() {
    playSound('click');
    setPhase('quiz');
    state.currentQuestion = 0;
    state.answers = [];
    state.correctCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    renderQuestion(0);
}

function startMasteryPhase() {
    playSound('fanfare');
    stopTimer();
    setPhase('mastery');
    renderMastery();
    launchConfetti();

    // Store time data for future certificate generation
    const timeData = {
        level: 1,
        topic: 'AI Agent Adventures',
        elapsed: getElapsedTime(),
        elapsedMs: Date.now() - state.startTime,
        totalXP: state.totalXP,
        accuracy: Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100),
        bestStreak: state.bestStreak,
        completedAt: new Date().toISOString()
    };
    try {
        localStorage.setItem('questra_level1_time', JSON.stringify(timeData));
    } catch (e) { /* ignore */ }
}

// ==================== QUIZ RENDERING ====================

function renderQuestion(index) {
    const q = LEVEL_DATA.quiz[index];
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'none';

    let html = `<div class="question-card">`;
    html += `<div class="question-number-badge">QUESTION ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>`;
    html += `<div class="question-text-display">${q.question}</div>`;

    switch (q.type) {
        case 'mcq':
            html += renderMCQ(q, index);
            break;
        case 'narrative':
            html += renderNarrative(q, index);
            break;
        case 'matching':
            html += renderMatching(q, index);
            break;
    }

    html += `</div>`;
    container.innerHTML = html;

    // Update streak display
    updateStreakDisplay();
}

function renderMCQ(q, qIndex) {
    const letters = ['A', 'B', 'C', 'D'];
    let html = '<div class="options-list-level1">';
    q.options.forEach((opt, i) => {
        html += `
            <div class="option-card" data-index="${i}" onclick="selectMCQ(${qIndex}, ${i})">
                <span class="option-letter-badge">${letters[i]}</span>
                <span class="option-text">${opt}</span>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function renderNarrative(q, qIndex) {
    let html = '<div class="narrative-options">';
    q.options.forEach((opt, i) => {
        html += `
            <div class="narrative-choice" data-index="${i}" onclick="selectNarrative(${qIndex}, ${i})">
                <span class="narrative-path-icon">${opt.icon}</span>
                <div class="narrative-path-text">
                    <strong>${opt.path}</strong><br>
                    ${opt.text}
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function renderMatching(q, qIndex) {
    // Initialize matching state
    state.matchingState = {
        answers: new Array(q.pairs.length).fill(null),
        selectedDrop: null
    };

    let html = '<div class="matching-container">';

    // Left column (items to match)
    html += '<div class="matching-column">';
    q.pairs.forEach((pair, i) => {
        html += `<div class="match-item left-item">${pair.left}</div>`;
    });
    html += '</div>';

    // Arrows
    html += '<div class="matching-arrows">';
    q.pairs.forEach(() => {
        html += '<div class="matching-arrow">→</div>';
    });
    html += '</div>';

    // Right column (drop zones)
    html += '<div class="matching-column">';
    q.pairs.forEach((_, i) => {
        html += `<div class="match-drop" data-drop="${i}" onclick="selectDrop(${qIndex}, ${i})">Click to assign...</div>`;
    });
    html += '</div>';

    html += '</div>';

    // Option chips
    const options = [...q.shuffledRight];
    html += '<div class="match-options">';
    options.forEach((opt, i) => {
        html += `<div class="match-option-chip" data-chip="${i}" onclick="selectChip(${qIndex}, ${i}, '${opt}')">${opt}</div>`;
    });
    html += '</div>';

    // Submit button for matching
    html += `<div style="text-align:center;margin-top:20px;">
        <button class="btn btn-primary btn-pixel" onclick="submitMatching(${qIndex})">
            <span>✅</span> CHECK MATCHES
        </button>
    </div>`;

    return html;
}

// ==================== QUIZ INTERACTIONS ====================

function selectMCQ(qIndex, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const options = document.querySelectorAll('.option-card');

    // Disable all options
    options.forEach(opt => {
        opt.classList.add('disabled');
        opt.onclick = null;
    });

    const selected = options[optIndex];
    selected.classList.add('selected');

    const isCorrect = optIndex === q.correctIndex;

    if (isCorrect) {
        selected.classList.add('correct');
        handleCorrectAnswer(qIndex, q);
    } else {
        selected.classList.add('incorrect');
        options[q.correctIndex].classList.add('correct');
        handleWrongAnswer(qIndex, q);
    }
}

function selectNarrative(qIndex, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const choices = document.querySelectorAll('.narrative-choice');

    choices.forEach(c => {
        c.classList.add('disabled');
        c.onclick = null;
    });

    const selected = choices[optIndex];
    selected.classList.add('selected');

    const isCorrect = q.options[optIndex].isCorrect;

    if (isCorrect) {
        selected.classList.add('correct');
        handleCorrectAnswer(qIndex, q);
    } else {
        selected.classList.add('incorrect');
        // Highlight correct one
        q.options.forEach((opt, i) => {
            if (opt.isCorrect) choices[i].classList.add('correct');
        });
        handleWrongAnswer(qIndex, q);
    }
}

function selectDrop(qIndex, dropIndex) {
    // Highlight selected drop zone
    document.querySelectorAll('.match-drop').forEach(d => d.style.outline = 'none');
    const drop = document.querySelector(`[data-drop="${dropIndex}"]`);
    drop.style.outline = '2px solid var(--snes-gold)';
    state.matchingState.selectedDrop = dropIndex;
}

function selectChip(qIndex, chipIndex, value) {
    if (state.matchingState.selectedDrop === null) {
        // Auto-select first empty drop
        const drops = document.querySelectorAll('.match-drop');
        for (let i = 0; i < drops.length; i++) {
            if (!state.matchingState.answers[i]) {
                state.matchingState.selectedDrop = i;
                break;
            }
        }
    }

    if (state.matchingState.selectedDrop === null) return;

    const dropIdx = state.matchingState.selectedDrop;

    // Clear previous chip in this drop if any
    const prevChipIdx = state.matchingState.answers[dropIdx];
    if (prevChipIdx !== null && prevChipIdx !== undefined) {
        const prevChip = document.querySelector(`[data-chip="${prevChipIdx}"]`);
        if (prevChip) prevChip.classList.remove('used');
    }

    state.matchingState.answers[dropIdx] = chipIndex;

    // Update drop zone
    const drop = document.querySelector(`[data-drop="${dropIdx}"]`);
    drop.textContent = value;
    drop.classList.add('filled');
    drop.style.outline = 'none';

    // Mark chip as used
    const chip = document.querySelector(`[data-chip="${chipIndex}"]`);
    chip.classList.add('used');

    // Move to next empty drop
    state.matchingState.selectedDrop = null;
    const drops = document.querySelectorAll('.match-drop');
    for (let i = 0; i < drops.length; i++) {
        if (!state.matchingState.answers[i] && state.matchingState.answers[i] !== 0) {
            state.matchingState.selectedDrop = i;
            break;
        }
    }

    playSound('click');
}

function submitMatching(qIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const drops = document.querySelectorAll('.match-drop');
    let allCorrect = true;

    drops.forEach((drop, i) => {
        const chipIdx = state.matchingState.answers[i];
        if (chipIdx === null || chipIdx === undefined) {
            drop.classList.add('incorrect');
            allCorrect = false;
            return;
        }
        const userAnswer = q.shuffledRight[chipIdx];
        const correctAnswer = q.pairs[i].right;

        if (userAnswer === correctAnswer) {
            drop.classList.add('correct');
        } else {
            drop.classList.add('incorrect');
            allCorrect = false;
        }
    });

    // Disable further interaction
    document.querySelectorAll('.match-option-chip').forEach(c => c.onclick = null);
    document.querySelectorAll('.match-drop').forEach(d => d.onclick = null);

    if (allCorrect) {
        handleCorrectAnswer(qIndex, q);
    } else {
        handleWrongAnswer(qIndex, q);
    }
}

function handleCorrectAnswer(qIndex, q) {
    playSound('correct');
    state.correctCount++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    const xpEarned = 25 + (state.streak > 1 ? state.streak * 5 : 0);
    state.totalXP += xpEarned;

    showXPGain(xpEarned);
    updateXPDisplay();
    updateStreakDisplay();

    // Show feedback
    showFeedback(qIndex, true, q.explanation);

    // Show next button
    showNextButton(qIndex);
}

function handleWrongAnswer(qIndex, q) {
    playSound('wrong');
    state.streak = 0;
    state.totalXP += 5; // Small consolation XP

    updateXPDisplay();
    updateStreakDisplay();

    // Show hint first, then explanation
    showFeedback(qIndex, false, q.hint);

    // Show next button
    showNextButton(qIndex);
}

function showFeedback(qIndex, isCorrect, text) {
    const card = document.querySelector('.question-card');
    const existing = card.querySelector('.feedback-display, .hint-display');
    if (existing) existing.remove();

    const div = document.createElement('div');
    if (isCorrect) {
        div.className = 'feedback-display correct-feedback';
        div.innerHTML = `✅ Correct! ${text}`;
    } else {
        div.className = 'feedback-display incorrect-feedback';
        div.innerHTML = `${text}`;
    }
    card.appendChild(div);
}

function showNextButton(qIndex) {
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'block';

    const btn = document.getElementById('next-question-btn');
    if (qIndex >= LEVEL_DATA.quiz.length - 1) {
        btn.innerHTML = '<span>🏆</span> VIEW RESULTS';
        btn.onclick = () => startMasteryPhase();
    } else {
        btn.innerHTML = '<span>➡️</span> NEXT';
        btn.onclick = () => {
            playSound('click');
            state.currentQuestion = qIndex + 1;
            renderQuestion(state.currentQuestion);
        };
    }
}

function nextQuestion() {
    // Handled by onclick override in showNextButton
}

// ==================== STREAK DISPLAY ====================

function updateStreakDisplay() {
    const counter = document.getElementById('streak-counter');
    const num = document.getElementById('streak-num');

    if (state.streak >= 2) {
        counter.style.display = 'block';
        num.textContent = state.streak;
        // Re-trigger animation
        counter.style.animation = 'none';
        counter.offsetHeight; // force reflow
        counter.style.animation = 'streakPop 0.3s ease';
    } else {
        counter.style.display = 'none';
    }
}

// ==================== XP DISPLAY ====================

function updateXPDisplay() {
    animateNumber('xp-display', state.totalXP);
}

function showXPGain(amount) {
    const popup = document.getElementById('xp-popup');
    const value = document.getElementById('xp-popup-value');
    value.textContent = `+${amount} XP`;
    popup.style.display = 'block';
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = 'xpBurst 0.5s ease';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

function animateNumber(elementId, target) {
    const el = document.getElementById(elementId);
    const current = parseInt(el.textContent) || 0;
    const diff = target - current;
    const steps = 20;
    const stepSize = diff / steps;
    let step = 0;

    function tick() {
        step++;
        if (step >= steps) {
            el.textContent = target;
            return;
        }
        el.textContent = Math.round(current + stepSize * step);
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ==================== MASTERY RENDERING ====================

function renderMastery() {
    // Final XP
    animateNumber('final-xp', state.totalXP);

    // Time
    document.getElementById('final-time').textContent = getElapsedTime();

    // Accuracy
    const accuracy = Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100);
    document.getElementById('final-accuracy').textContent = accuracy + '%';

    // Best streak
    document.getElementById('final-streak').textContent = state.bestStreak;

    // Summary
    const summaryEl = document.getElementById('debrief-summary');
    summaryEl.innerHTML = `
        <h3>📋 KEY LEARNINGS</h3>
        <ul>
            ${LEVEL_DATA.mastery.summary.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;

    // Send completion to backend
    reportCompletion();
}

async function reportCompletion() {
    try {
        await fetch('/api/level1/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                xp_earned: state.totalXP,
                time_elapsed: getElapsedTime(),
                time_ms: Date.now() - state.startTime,
                accuracy: Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100),
                best_streak: state.bestStreak,
                correct_count: state.correctCount,
                total_questions: LEVEL_DATA.quiz.length
            })
        });
    } catch (e) {
        console.log('Could not report completion:', e);
    }
}

// ==================== PIXEL CONFETTI ====================

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#2dd4bf', '#6b46c1', '#ea580c', '#22c55e', '#fbbf24', '#06b6d4'];
    const particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 15 - 5,
            size: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.3,
            life: 1,
            decay: 0.008 + Math.random() * 0.008
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;

            p.x += p.vx;
            p.vy += p.gravity;
            p.y += p.vy;
            p.life -= p.decay;

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            // Pixel-style square confetti
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        });

        ctx.globalAlpha = 1;

        if (alive) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// ==================== REPLAY ====================

function replayLevel() {
    playSound('click');
    state = {
        phase: 'story',
        typewriterIndex: 0,
        typewriterCharIndex: 0,
        typewriterTimer: null,
        typewriterComplete: false,
        currentQuestion: 0,
        answers: [],
        correctCount: 0,
        streak: 0,
        bestStreak: 0,
        totalXP: 0,
        startTime: Date.now(),
        timerInterval: null,
        soundEnabled: state.soundEnabled,
        matchingState: {},
        audioCtx: state.audioCtx
    };

    document.getElementById('begin-quiz-btn').style.display = 'none';
    document.getElementById('xp-display').textContent = '0';

    setPhase('story');
    startTimer();
    startTypewriter();
    animateTerminal();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateTerminal();
    startTimer();
    startTypewriter();

    // Handle window resize for confetti canvas
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
