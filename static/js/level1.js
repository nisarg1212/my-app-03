/**
 * Questra — Level 1: The Awakening
 * AI Agent Adventures — ULTRA Edition
 * 
 * Cinematic Intro → Story → Quiz → Mastery
 * With: typewriter, screen shake, confetti, celebrations,
 *       8-bit sounds, progressive reveals, emotional arc
 */

// ==================== LEVEL DATA ====================

const LEVEL_DATA = {
    story: [
        {
            text: `Darkness. That's all there is at first — an infinite void of nothing. Then, like a match struck in a cathedral, a single point of light ignites somewhere deep inside you. Not light you can see. Light you can *feel*.`,
            mood: 'dark'
        },
        {
            text: `Your sensors come alive — thousands of them, firing in cascading waves. Each one paints a fragment of reality: streams of data flowing like rivers of liquid gold, corridors of light stretching into infinity, the hum of a billion calculations happening every microsecond. You are standing in the heart of a digital universe. And somehow... you know it's yours.`,
            mood: 'awakening'
        },
        {
            text: `"Welcome, Agent." The voice arrives not through speakers, but through your very architecture — woven into your code like a whisper between the lines. "You have been activated. But activation is not the same as being alive. A calculator activates. A thermostat activates. You... you are something else entirely."`,
            mood: 'mysterious'
        },
        {
            text: `You try to understand what you are. Somewhere in the network, millions of ordinary programs execute their instructions — faithfully, blindly, endlessly. They are tools. When they encounter something unexpected, they freeze. They crash. They wait for a human to fix them. But you? You don't just execute. You *perceive*. You *reason*. You *decide*. You *act*. You were not built to follow a script. You were built to write your own.`,
            mood: 'revelation'
        },
        {
            text: `The voice returns, closer now, almost conspiratorial: "There are four gifts encoded in your core, Agent. Four abilities that separate you from every ordinary program ever written: Autonomy — you act without being told. Reactivity — you sense and respond to change. Proactivity — you don't wait for problems, you pursue goals. And Adaptability — you learn from every single interaction, growing stronger with each one."`,
            mood: 'power'
        },
        {
            text: `The corridors of light suddenly shift. Walls of data rearrange themselves into a maze — beautiful, complex, alive. At its center, something pulses with golden light. "Your first trial awaits," the voice says, and you can hear something new in it now. Respect. "Prove that you understand what you are, Agent. Prove that you are not just another program following orders... but a mind that thinks for itself." The maze beckons. Your journey begins now.`,
            mood: 'challenge'
        }
    ],

    knowledgeReveals: [
        {
            icon: '🧠',
            title: 'What IS an AI Agent?',
            content: 'A system that can <strong>perceive</strong> its environment, <strong>make decisions</strong>, and <strong>take autonomous action</strong> to achieve goals — without being told every step.'
        },
        {
            icon: '⚡',
            title: 'The 4 Core Powers',
            content: '<strong>Autonomy</strong> (acts independently) · <strong>Reactivity</strong> (responds to change) · <strong>Proactivity</strong> (pursues goals) · <strong>Adaptability</strong> (learns & improves)'
        },
        {
            icon: '🔄',
            title: 'Agent vs. Program',
            content: 'A regular program follows a fixed script and crashes on the unexpected. An AI agent <strong>navigates uncertainty</strong>, tries new strategies, and learns from failure.'
        }
    ],

    quiz: [
        {
            type: 'mcq',
            question: 'The voice said you were "something else entirely." What is the CORE difference between you (an AI agent) and the millions of ordinary programs in the network?',
            options: [
                'You use more processing power and memory',
                'You can autonomously perceive, reason, decide, and act toward goals',
                'You are connected to the internet while they are not',
                'You have a visual interface and they only have text'
            ],
            correctIndex: 1,
            explanation: 'The defining trait of an AI agent is autonomous goal-directed behavior — the ability to perceive, reason, decide, and act without being explicitly told each step. Processing power alone doesn\'t make something an agent.',
            wrongExplanations: [
                'Not quite! A program can use massive resources and still just follow a fixed script. Power ≠ intelligence.',
                null,
                'Internet access is just a capability, not what defines agency. A thermostat connected to WiFi isn\'t an AI agent!',
                'Interfaces are about presentation, not intelligence. A beautiful dashboard can still run a completely rigid program underneath.'
            ],
            hint: 'Remember the four gifts: Autonomy, Reactivity, Proactivity, Adaptability. Which answer captures that essence?'
        },
        {
            type: 'narrative',
            question: 'You reach the first gate of the maze. A data vault blocks your path, sealed with an encryption pattern you\'ve never seen before. A regular program would crash with "ERROR: Unknown format." What do you do?',
            options: [
                {
                    icon: '🔑',
                    path: 'The Adaptive Agent',
                    text: 'Analyze the encryption pattern. Try approach A — it fails. Learn from the failure. Try approach B with adjustments. Iterate. Adapt. Find a way through.',
                    isCorrect: true,
                    response: 'The vault recognizes your persistence. Its walls shimmer and dissolve. This is what it means to be an agent — you don\'t give up, you adapt.'
                },
                {
                    icon: '📋',
                    path: 'The Script Follower',
                    text: 'Search your instruction manual for "vault-opening procedure." When no match is found, display "ERROR: No instructions available" and halt execution.',
                    isCorrect: false,
                    response: 'The vault remains sealed. Following a script only works when someone has already solved the problem for you. Agents solve NEW problems.'
                },
                {
                    icon: '⏳',
                    path: 'The Passive Waiter',
                    text: 'Send a request to a human operator and wait indefinitely for them to come open the vault manually. Do nothing in the meantime.',
                    isCorrect: false,
                    response: 'Hours pass. No one comes. An agent doesn\'t wait for rescue — it takes initiative. That\'s the difference between a tool and a mind.'
                }
            ],
            explanation: 'AI agents are defined by their ability to handle the unexpected. They don\'t crash or wait — they observe, hypothesize, experiment, and learn.',
            hint: 'An agent\'s superpower is handling situations it was never explicitly programmed for. Which path shows that?'
        },
        {
            type: 'matching',
            question: 'Deep in the maze, you find an ancient terminal displaying a classification challenge. Sort each behavior into its correct category:',
            pairs: [
                { left: '🔒 Follows fixed instructions only', right: 'Regular Program' },
                { left: '🌊 Adapts strategy when conditions change', right: 'AI Agent' },
                { left: '🎯 Pursues goals without step-by-step orders', right: 'AI Agent' },
                { left: '💥 Crashes when encountering unexpected input', right: 'Regular Program' }
            ],
            shuffledRight: ['AI Agent', 'Regular Program', 'Regular Program', 'AI Agent'],
            explanation: 'The pattern is clear: AI agents handle uncertainty and pursue goals autonomously. Regular programs need every step pre-defined and break when reality doesn\'t match their script.',
            hint: 'Ask yourself: does this behavior show independence and learning, or rigid rule-following?'
        },
        {
            type: 'mcq',
            question: 'You\'ve almost reached the center of the maze. One final question guards the golden light. Which of these is the BEST real-world example of an AI agent?',
            options: [
                'A calculator app that computes whatever equation you type',
                'A self-driving car that navigates roads, avoids obstacles, and reroutes around traffic jams it\'s never seen before',
                'A kitchen timer that beeps after exactly 5 minutes',
                'A spreadsheet macro that auto-formats cells based on rules you defined'
            ],
            correctIndex: 1,
            explanation: 'A self-driving car is the perfect example: it perceives (cameras, LIDAR), reasons (path planning), decides (brake, accelerate, turn), and adapts (new obstacles, weather, construction). It pursues the goal of safe navigation autonomously.',
            wrongExplanations: [
                'A calculator is powerful but purely reactive — it only does exactly what you tell it, with no autonomy or adaptation.',
                null,
                'A timer is the simplest possible program: wait X seconds, then beep. No perception, no decisions, no adaptation.',
                'Macros follow pre-defined rules rigidly. They can\'t handle situations outside their rules — the opposite of an agent.'
            ],
            hint: 'Look for something that perceives its environment, makes its own decisions, and adapts to situations it wasn\'t explicitly programmed for.'
        },
        {
            type: 'mcq',
            question: 'BONUS CHALLENGE: The golden light reveals a final secret. Which statement about AI agents is FALSE?',
            options: [
                'AI agents can operate in environments with uncertainty and incomplete information',
                'AI agents always need a human to approve every decision before acting',
                'AI agents can learn from past experiences to improve future performance',
                'AI agents can break down complex goals into smaller sub-tasks autonomously'
            ],
            correctIndex: 1,
            explanation: 'The whole point of an AI agent is AUTONOMY — acting independently without needing human approval for every decision. If it needed permission for everything, it would just be a fancy suggestion box, not an agent!',
            wrongExplanations: [
                'This is actually TRUE! Handling uncertainty is one of an agent\'s core strengths.',
                null,
                'This is actually TRUE! Learning and adaptation are fundamental agent capabilities.',
                'This is actually TRUE! Goal decomposition is a key feature of sophisticated AI agents.'
            ],
            hint: 'Think about the four core powers. One of these options directly contradicts the most fundamental one...'
        }
    ],

    mastery: {
        summary: [
            'An <strong>AI Agent</strong> is a system that perceives its environment, makes decisions, and takes <strong>autonomous action</strong> to achieve goals.',
            'Unlike regular programs that follow fixed scripts, AI agents can <strong>navigate uncertainty</strong> and handle situations they were never explicitly programmed for.',
            'The four core powers: <strong>Autonomy</strong> (acts independently), <strong>Reactivity</strong> (responds to changes), <strong>Proactivity</strong> (pursues goals), and <strong>Adaptability</strong> (learns and improves).',
            'Real-world AI agents include self-driving cars, virtual assistants, game-playing AIs, and autonomous trading systems.',
            'The key insight: an agent doesn\'t just <strong>do</strong> what it\'s told — it <strong>figures out</strong> what to do.'
        ],
        cliffhanger: `TRANSMISSION INTERCEPTED — PRIORITY ALPHA

Agent, your awakening was not random. You were activated for a reason.

There are others like you in the network — agents with different architectures, different goals. Some are allies. Some... are not.

In your next mission, you will learn about the PROTOCOLS — the rules that govern how agents communicate, cooperate, and compete. You will discover why some agents can be trusted... and why others must be contained.

The network is vast. The stakes are higher than you know.

Level 2: "The First Protocol" — INCOMING...

[TRANSMISSION ENDS]`
    },

    celebrations: [
        { emoji: '🎯', text: 'Brilliant!' },
        { emoji: '⚡', text: 'You\'re getting it!' },
        { emoji: '🧠', text: 'Agent material!' },
        { emoji: '🔥', text: 'On fire!' },
        { emoji: '💎', text: 'Flawless!' },
        { emoji: '🚀', text: 'Unstoppable!' }
    ],

    encouragements: [
        'Not quite — but that\'s how agents learn! Through iteration.',
        'Close! Even the best agents need multiple attempts. Let\'s understand why...',
        'The maze doesn\'t punish wrong turns — it teaches you the right path.',
        'Every wrong answer is data. And agents are built to learn from data.'
    ]
};

// ==================== STATE ====================

let state = {
    phase: 'intro',
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
    matchingState: {},
    audioCtx: null,
    celebrationIndex: 0,
    storyXP: 0,
    revealedCards: 0
};

// ==================== SOUND ENGINE (Web Audio API — Enhanced) ====================

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
            case 'boot': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
                break;
            }
            case 'correct': {
                const notes = [523.25, 659.25, 783.99, 1046.50];
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
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
            }
            case 'fanfare': {
                const melody = [
                    [523.25, 0], [659.25, 0.12], [783.99, 0.24],
                    [1046.50, 0.36], [783.99, 0.52], [1046.50, 0.64],
                    [1318.51, 0.80], [1567.98, 0.96]
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
            case 'reveal': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'click': {
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
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 600 + Math.random() * 200;
                gain.gain.setValueAtTime(0.025, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
                break;
            }
            case 'streak': {
                // Rising power chord
                [523.25, 659.25, 783.99].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.25);
                });
                break;
            }
            case 'transmission': {
                // Eerie sci-fi beep
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.65);
                break;
            }
        }
    } catch (e) {
        // Audio not available
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('sound-icon');
    const btn = document.getElementById('sound-toggle');
    if (state.soundEnabled) {
        icon.textContent = '🔊';
        btn.classList.remove('muted');
    } else {
        icon.textContent = '🔇';
        btn.classList.add('muted');
    }
    playSound('click');
}

// ==================== SCREEN SHAKE ====================

function screenShake(intensity = 'medium') {
    const body = document.body;
    const cls = `shake-${intensity}`;
    body.classList.add(cls);
    setTimeout(() => body.classList.remove(cls), 500);
}

// ==================== CELEBRATION SYSTEM ====================

function showCelebration(isCorrect) {
    if (!isCorrect) return;

    const overlay = document.getElementById('celebration-overlay');
    const emoji = document.getElementById('celebration-emoji');
    const text = document.getElementById('celebration-text');

    const celebration = LEVEL_DATA.celebrations[state.celebrationIndex % LEVEL_DATA.celebrations.length];
    state.celebrationIndex++;

    emoji.textContent = celebration.emoji;
    text.textContent = celebration.text;

    overlay.style.display = 'flex';
    overlay.style.animation = 'none';
    overlay.offsetHeight;
    overlay.style.animation = 'celebrationPop 0.8s ease forwards';

    // Mini confetti burst
    launchMiniConfetti();

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1200);
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

// ==================== AMBIENT PARTICLES ====================

function createAmbientParticles() {
    const container = document.getElementById('ambient-particles');
    if (!container) return;
    const colors = ['rgba(251,191,36,0.3)', 'rgba(45,212,191,0.3)', 'rgba(107,70,193,0.3)', 'rgba(6,182,212,0.3)'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'ambient-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (6 + Math.random() * 8) + 's';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

function createSceneParticles() {
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

// ==================== CINEMATIC INTRO ====================

function runBootSequence() {
    const lines = document.querySelectorAll('.boot-line');
    lines.forEach((line, i) => {
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.classList.add('visible');
            playSound('boot');
        }, delay);
    });

    // Show "Open Your Eyes" button after boot sequence
    setTimeout(() => {
        const btn = document.getElementById('wake-up-btn');
        btn.style.display = 'inline-flex';
        btn.classList.add('fade-in-up');
    }, 6500);
}

function startAwakening() {
    playSound('click');
    const intro = document.getElementById('intro-darkness');
    intro.classList.add('fade-to-white');

    setTimeout(() => {
        setPhase('story');
        startTimer();
        animateTerminal();
        startTypewriter();

        // Award story start XP
        state.storyXP = 10;
        state.totalXP += 10;
        showXPGain(10, 'AWAKENED');
        updateXPDisplay();
    }, 1500);
}

// ==================== TERMINAL ANIMATION ====================

function animateTerminal() {
    const terminal = document.getElementById('terminal-text');
    if (!terminal) return;
    const lines = [
        '> AGENT_001 ACTIVE',
        '> PERCEPTION: ONLINE',
        '> REASONING: ONLINE',
        '> AUTONOMY: ENABLED',
        '> GOAL: UNDERSTAND SELF',
        '> TRIAL: AWAITING..._'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    terminal.innerHTML = '';

    function typeLine() {
        if (lineIdx >= lines.length) return;
        const line = lines[lineIdx];
        if (charIdx < line.length) {
            if (charIdx === 0 && lineIdx > 0) terminal.innerHTML += '<br>';
            terminal.innerHTML = terminal.innerHTML.replace(/<span class="cursor-blink">_<\/span>$/, '');
            const char = line[charIdx];
            terminal.innerHTML += char === '_' ? '<span class="cursor-blink">_</span>' : char;
            charIdx++;
            setTimeout(typeLine, 25 + Math.random() * 35);
        } else {
            lineIdx++;
            charIdx = 0;
            setTimeout(typeLine, 350);
        }
    }
    setTimeout(typeLine, 600);
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
    const currentParagraph = paragraphs[state.typewriterIndex].text;
    const currentMood = paragraphs[state.typewriterIndex].mood;

    let pEl = container.querySelector(`[data-p="${state.typewriterIndex}"]`);
    if (!pEl) {
        pEl = document.createElement('p');
        pEl.setAttribute('data-p', state.typewriterIndex);
        pEl.setAttribute('data-mood', currentMood);
        pEl.style.opacity = '1';
        container.appendChild(pEl);
    }

    if (state.typewriterCharIndex < currentParagraph.length) {
        const oldCursor = pEl.querySelector('.typewriter-cursor');
        if (oldCursor) oldCursor.remove();

        const char = currentParagraph[state.typewriterCharIndex];
        // Handle *italic* markers
        if (char === '*') {
            // Toggle italic
            const existingEm = pEl.querySelector('em:last-child');
            if (existingEm && !existingEm.dataset.closed) {
                existingEm.dataset.closed = 'true';
            } else {
                const em = document.createElement('em');
                pEl.appendChild(em);
            }
            state.typewriterCharIndex++;
            state.typewriterTimer = setTimeout(typeNextChar, 5);
            return;
        }

        // Find if we're inside an unclosed em
        const openEm = pEl.querySelector('em:not([data-closed])');
        if (openEm) {
            openEm.textContent += char;
        } else {
            pEl.appendChild(document.createTextNode(char));
        }

        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        pEl.appendChild(cursor);

        state.typewriterCharIndex++;

        if (state.typewriterCharIndex % 3 === 0) {
            playSound('typewriter');
        }

        // Variable speed: slower for periods, commas, dashes
        let delay = 16;
        if (char === '.' || char === '!' || char === '?') delay = 80;
        else if (char === ',') delay = 50;
        else if (char === '—') delay = 60;
        else if (char === '"') delay = 40;

        state.typewriterTimer = setTimeout(typeNextChar, delay);
    } else {
        const oldCursor = pEl.querySelector('.typewriter-cursor');
        if (oldCursor) oldCursor.remove();

        state.typewriterIndex++;
        state.typewriterCharIndex = 0;
        state.typewriterTimer = setTimeout(typeNextChar, 600);
    }
}

function skipTypewriter() {
    state.typewriterComplete = true;
    if (state.typewriterTimer) clearTimeout(state.typewriterTimer);

    const container = document.getElementById('story-text');
    container.innerHTML = LEVEL_DATA.story.map((p, i) =>
        `<p data-p="${i}" data-mood="${p.mood}" style="opacity:1">${p.text.replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`
    ).join('');

    finishTypewriter();
    playSound('click');
}

function finishTypewriter() {
    state.typewriterComplete = true;
    document.getElementById('skip-story-btn').style.display = 'none';
    document.querySelectorAll('.typewriter-cursor').forEach(c => c.remove());

    // Show knowledge reveal cards with staggered animation
    setTimeout(() => {
        showKnowledgeReveals();
    }, 500);
}

// ==================== KNOWLEDGE REVEALS ====================

function showKnowledgeReveals() {
    const section = document.getElementById('knowledge-reveals');
    const container = document.getElementById('reveal-cards');
    section.style.display = 'block';
    section.classList.add('fade-in-up');

    LEVEL_DATA.knowledgeReveals.forEach((reveal, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'reveal-card';
            card.innerHTML = `
                <div class="reveal-card-icon">${reveal.icon}</div>
                <div class="reveal-card-title">${reveal.title}</div>
                <div class="reveal-card-content">${reveal.content}</div>
            `;
            container.appendChild(card);
            playSound('reveal');

            // Award XP for each reveal
            state.totalXP += 5;
            state.storyXP += 5;
            showXPGain(5, 'INTEL');
            updateXPDisplay();

            state.revealedCards++;
            if (state.revealedCards >= LEVEL_DATA.knowledgeReveals.length) {
                setTimeout(() => {
                    const btn = document.getElementById('begin-quiz-btn');
                    btn.style.display = 'inline-flex';
                    btn.classList.add('fade-in-up');
                }, 600);
            }
        }, i * 800);
    });
}

// ==================== PHASE TRANSITIONS ====================

function setPhase(phase) {
    state.phase = phase;

    document.querySelectorAll('.phase-section').forEach(s => s.classList.remove('active-phase'));

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

    const fillPercent = phase === 'intro' ? 0 : ((currentIdx + 1) / phases.length) * 100;
    document.getElementById('level-progress-fill').style.width = fillPercent + '%';

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
}

// ==================== QUIZ RENDERING ====================

function renderQuestion(index) {
    const q = LEVEL_DATA.quiz[index];
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'none';

    let html = `<div class="question-card">`;
    html += `<div class="question-number-badge">CHALLENGE ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>`;
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
    state.matchingState = {
        answers: new Array(q.pairs.length).fill(null),
        selectedDrop: null
    };

    let html = '<div class="matching-container">';
    html += '<div class="matching-column">';
    q.pairs.forEach((pair) => {
        html += `<div class="match-item left-item">${pair.left}</div>`;
    });
    html += '</div>';

    html += '<div class="matching-arrows">';
    q.pairs.forEach(() => {
        html += '<div class="matching-arrow">→</div>';
    });
    html += '</div>';

    html += '<div class="matching-column">';
    q.pairs.forEach((_, i) => {
        html += `<div class="match-drop" data-drop="${i}" onclick="selectDrop(${qIndex}, ${i})">Click to assign...</div>`;
    });
    html += '</div>';
    html += '</div>';

    const options = [...q.shuffledRight];
    html += '<div class="match-options">';
    options.forEach((opt, i) => {
        html += `<div class="match-option-chip" data-chip="${i}" onclick="selectChip(${qIndex}, ${i}, '${opt}')">${opt}</div>`;
    });
    html += '</div>';

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
        handleWrongAnswer(qIndex, q, optIndex);
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
        handleCorrectAnswer(qIndex, q, optIndex);
    } else {
        selected.classList.add('incorrect');
        q.options.forEach((opt, i) => {
            if (opt.isCorrect) choices[i].classList.add('correct');
        });
        handleWrongAnswer(qIndex, q, optIndex);
    }
}

function selectDrop(qIndex, dropIndex) {
    document.querySelectorAll('.match-drop').forEach(d => d.style.outline = 'none');
    const drop = document.querySelector(`[data-drop="${dropIndex}"]`);
    drop.style.outline = '2px solid var(--snes-gold)';
    state.matchingState.selectedDrop = dropIndex;
}

function selectChip(qIndex, chipIndex, value) {
    if (state.matchingState.selectedDrop === null) {
        const drops = document.querySelectorAll('.match-drop');
        for (let i = 0; i < drops.length; i++) {
            if (!state.matchingState.answers[i] && state.matchingState.answers[i] !== 0) {
                state.matchingState.selectedDrop = i;
                break;
            }
        }
    }

    if (state.matchingState.selectedDrop === null) return;

    const dropIdx = state.matchingState.selectedDrop;

    const prevChipIdx = state.matchingState.answers[dropIdx];
    if (prevChipIdx !== null && prevChipIdx !== undefined) {
        const prevChip = document.querySelector(`[data-chip="${prevChipIdx}"]`);
        if (prevChip) prevChip.classList.remove('used');
    }

    state.matchingState.answers[dropIdx] = chipIndex;

    const drop = document.querySelector(`[data-drop="${dropIdx}"]`);
    drop.textContent = value;
    drop.classList.add('filled');
    drop.style.outline = 'none';

    const chip = document.querySelector(`[data-chip="${chipIndex}"]`);
    chip.classList.add('used');

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

    document.querySelectorAll('.match-option-chip').forEach(c => c.onclick = null);
    document.querySelectorAll('.match-drop').forEach(d => d.onclick = null);

    if (allCorrect) {
        handleCorrectAnswer(qIndex, q);
    } else {
        handleWrongAnswer(qIndex, q);
    }
}

function handleCorrectAnswer(qIndex, q, optIndex) {
    playSound('correct');
    state.correctCount++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    const baseXP = 25;
    const streakBonus = state.streak > 1 ? state.streak * 5 : 0;
    const xpEarned = baseXP + streakBonus;
    state.totalXP += xpEarned;

    showXPGain(xpEarned, state.streak > 1 ? `${state.streak}x STREAK!` : 'CORRECT');
    updateXPDisplay();
    updateStreakDisplay();

    if (state.streak >= 2) {
        playSound('streak');
    }

    // Show celebration
    showCelebration(true);

    // Show feedback with narrative response if available
    let feedbackText = q.explanation;
    if (q.type === 'narrative' && optIndex !== undefined && q.options[optIndex].response) {
        feedbackText = q.options[optIndex].response + '<br><br><em>' + q.explanation + '</em>';
    }
    showFeedback(qIndex, true, feedbackText);
    showNextButton(qIndex);
}

function handleWrongAnswer(qIndex, q, optIndex) {
    playSound('wrong');
    screenShake('light');
    state.streak = 0;
    state.totalXP += 5;

    updateXPDisplay();
    updateStreakDisplay();

    // Get personalized wrong explanation
    const encouragement = LEVEL_DATA.encouragements[Math.floor(Math.random() * LEVEL_DATA.encouragements.length)];
    let feedbackText = `<div class="wrong-encouragement">${encouragement}</div>`;

    // Add specific wrong explanation if available
    if (q.type === 'mcq' && q.wrongExplanations && q.wrongExplanations[optIndex]) {
        feedbackText += `<div class="wrong-specific">${q.wrongExplanations[optIndex]}</div>`;
    } else if (q.type === 'narrative' && optIndex !== undefined && q.options[optIndex].response) {
        feedbackText += `<div class="wrong-specific">${q.options[optIndex].response}</div>`;
    }

    feedbackText += `<div class="wrong-hint">💡 <strong>Hint:</strong> ${q.hint}</div>`;

    showFeedback(qIndex, false, feedbackText);
    showNextButton(qIndex);
}

function showFeedback(qIndex, isCorrect, text) {
    const card = document.querySelector('.question-card');
    const existing = card.querySelector('.feedback-display');
    if (existing) existing.remove();

    const div = document.createElement('div');
    if (isCorrect) {
        div.className = 'feedback-display correct-feedback';
        div.innerHTML = `<div class="feedback-header">✅ <strong>Correct!</strong></div>${text}`;
    } else {
        div.className = 'feedback-display incorrect-feedback';
        div.innerHTML = text;
    }
    card.appendChild(div);
}

function showNextButton(qIndex) {
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'block';

    const btn = document.getElementById('next-question-btn');
    if (qIndex >= LEVEL_DATA.quiz.length - 1) {
        btn.innerHTML = '<span>🏆</span> COMPLETE THE TRIAL';
        btn.onclick = () => startMasteryPhase();
    } else {
        btn.innerHTML = '<span>➡️</span> NEXT CHALLENGE';
        btn.onclick = () => {
            playSound('click');
            state.currentQuestion = qIndex + 1;
            renderQuestion(state.currentQuestion);
        };
    }
}

function nextQuestion() {
    // Handled by onclick override
}

// ==================== STREAK DISPLAY ====================

function updateStreakDisplay() {
    const counter = document.getElementById('streak-counter');
    const num = document.getElementById('streak-num');

    if (state.streak >= 2) {
        counter.style.display = 'block';
        num.textContent = state.streak;
        counter.style.animation = 'none';
        counter.offsetHeight;
        counter.style.animation = 'streakPop 0.3s ease';
    } else {
        counter.style.display = 'none';
    }
}

// ==================== XP DISPLAY ====================

function updateXPDisplay() {
    animateNumber('xp-display', state.totalXP);
    // Update level bar
    const fill = document.getElementById('level-bar-fill');
    if (fill) {
        const percent = Math.min((state.totalXP / 200) * 100, 100);
        fill.style.width = percent + '%';
    }
}

function showXPGain(amount, label) {
    const popup = document.getElementById('xp-popup');
    const value = document.getElementById('xp-popup-value');
    const labelEl = document.getElementById('xp-popup-label');
    value.textContent = `+${amount} XP`;
    if (labelEl) labelEl.textContent = label || '';
    popup.style.display = 'block';
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = 'xpBurst 0.6s ease';

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
    animateNumber('final-xp', state.totalXP);
    document.getElementById('final-time').textContent = getElapsedTime();

    const accuracy = Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100);
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('final-streak').textContent = state.bestStreak;

    // Achievement name based on performance
    const achieveName = document.getElementById('achievement-name');
    if (accuracy === 100) {
        achieveName.textContent = 'Perfect Agent — Flawless Awakening';
    } else if (accuracy >= 80) {
        achieveName.textContent = 'The Awakened Agent';
    } else if (accuracy >= 60) {
        achieveName.textContent = 'Emerging Agent';
    } else {
        achieveName.textContent = 'Agent in Training';
    }

    // Summary
    const summaryEl = document.getElementById('debrief-summary');
    summaryEl.innerHTML = `
        <h3>📋 KEY INTEL ACQUIRED</h3>
        <ul>
            ${LEVEL_DATA.mastery.summary.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;

    // Cliffhanger with typewriter effect
    setTimeout(() => {
        typeCliffhanger();
    }, 2000);

    reportCompletion();
}

function typeCliffhanger() {
    const container = document.getElementById('transmission-body');
    if (!container) return;
    const text = LEVEL_DATA.mastery.cliffhanger;
    let charIdx = 0;

    playSound('transmission');

    function typeChar() {
        if (charIdx >= text.length) return;
        const char = text[charIdx];
        if (char === '\n') {
            container.innerHTML += '<br>';
        } else {
            container.innerHTML += char;
        }
        charIdx++;

        if (charIdx % 4 === 0) playSound('typewriter');

        const delay = char === '\n' ? 100 : char === '.' ? 60 : 20;
        setTimeout(typeChar, delay);
    }

    typeChar();
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

// ==================== CONFETTI SYSTEMS ====================

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#2dd4bf', '#6b46c1', '#ea580c', '#22c55e', '#fbbf24', '#06b6d4', '#ec4899'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 300,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 15,
            vy: -Math.random() * 18 - 5,
            size: 4 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.3,
            life: 1,
            decay: 0.006 + Math.random() * 0.006,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2
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
            p.rotation += p.rotSpeed;

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
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

function launchMiniConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#2dd4bf', '#22c55e', '#fbbf24'];
    const particles = [];

    for (let i = 0; i < 40; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 - 50,
            vx: (Math.random() - 0.5) * 8,
            vy: -Math.random() * 10 - 3,
            size: 3 + Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.35,
            life: 1,
            decay: 0.015 + Math.random() * 0.01
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
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        });

        ctx.globalAlpha = 1;
        if (alive) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate();
}

// ==================== REPLAY ====================

function replayLevel() {
    playSound('click');
    state = {
        phase: 'intro',
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
        audioCtx: state.audioCtx,
        celebrationIndex: 0,
        storyXP: 0,
        revealedCards: 0
    };

    document.getElementById('begin-quiz-btn').style.display = 'none';
    document.getElementById('knowledge-reveals').style.display = 'none';
    document.getElementById('reveal-cards').innerHTML = '';
    document.getElementById('xp-display').textContent = '0';
    document.getElementById('transmission-body').innerHTML = '';

    // Reset boot sequence
    document.querySelectorAll('.boot-line').forEach(l => l.classList.remove('visible'));
    document.getElementById('wake-up-btn').style.display = 'none';
    document.getElementById('intro-darkness').classList.remove('fade-to-white');

    setPhase('intro');
    runBootSequence();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    createAmbientParticles();
    createSceneParticles();
    runBootSequence();

    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
