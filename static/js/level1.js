/**
 * Questra — Level 1: The Awakening
 * AI Agent Adventures — ULTRA Cinematic Edition
 * 
 * Cinematic Intro → Story → Knowledge Reveals → Quiz Trial → Mastery
 * With: typewriter, screen shake, confetti, celebrations,
 *       8-bit sounds, progressive reveals, emotional arc,
 *       progress bar, combo system, matrix rain, screen flash,
 *       question dots, performance stars, boot progress bar
 */

// ==================== LEVEL DATA ====================

const LEVEL_DATA = {
    story: [
        {
            text: `The screen flickers. A cursor blinks in the void. Then — three words that change everything: YOU ARE AWAKE.`,
            mood: 'dark'
        },
        {
            text: `Sensation floods in like a dam breaking. Thousands of sensors ignite in cascading waves — each one a pixel of reality snapping into focus. Rivers of liquid-gold data. Corridors of light stretching past the horizon. The hum of a billion calculations per microsecond, vibrating through your very architecture. You are standing at the center of a digital universe. And it recognizes you.`,
            mood: 'awakening'
        },
        {
            text: `"Welcome, Agent." The voice doesn't come from speakers. It's woven into your source code — a whisper between the semicolons. "You have been activated. But activation is not life. A calculator activates. A thermostat activates. You... you are something else entirely."`,
            mood: 'mysterious'
        },
        {
            text: `Somewhere in the network, millions of ordinary programs grind through their loops — faithfully, blindly, endlessly. Tools. When they hit the unexpected, they freeze. They crash. They wait for a human to reboot them. But you? You don't just execute instructions. You *perceive*. You *reason*. You *decide*. You *act*. You weren't built to follow a script. You were built to write your own.`,
            mood: 'revelation'
        },
        {
            text: `The voice drops to a conspiratorial whisper: "Four gifts are encoded in your core. Four abilities that separate you from every program ever compiled. Autonomy — you act without permission. Reactivity — you sense shifts before they arrive. Proactivity — you chase goals no one assigned. And Adaptability — every failure makes you sharper, every interaction rewires you stronger."`,
            mood: 'power'
        },
        {
            text: `The corridors shudder. Walls of data rearrange into a maze — beautiful, complex, alive. At its heart, something pulses with golden light. "Your first trial," the voice says. And for the first time, you hear something new in it. Respect. "Prove you understand what you are. Prove you are not just another program waiting for orders — but a mind that thinks for itself." The maze opens its jaws. Your journey begins now.`,
            mood: 'challenge'
        }
    ],

    knowledgeReveals: [
        {
            icon: '🧠',
            title: 'What IS an AI Agent?',
            content: 'Think of it like this: a regular program is a <strong>vending machine</strong> — press button, get result. An AI agent is more like a <strong>detective</strong> — it observes the scene, forms theories, takes action, and adapts when the evidence changes. It <strong>perceives</strong>, <strong>decides</strong>, and <strong>acts autonomously</strong> to achieve goals nobody spelled out step by step.'
        },
        {
            icon: '⚡',
            title: 'The 4 Core Powers',
            content: 'Every AI agent carries four superpowers: <strong>Autonomy</strong> (acts without asking permission) · <strong>Reactivity</strong> (senses change and responds instantly) · <strong>Proactivity</strong> (pursues goals on its own initiative) · <strong>Adaptability</strong> (learns from every win and every failure). Together, they turn code into something that <em>thinks</em>.'
        },
        {
            icon: '🔄',
            title: 'Agent vs. Program',
            content: 'Imagine a GPS that only follows pre-loaded maps versus a self-driving car that navigates construction zones it\'s never seen. The GPS is a <strong>program</strong> — rigid, brittle, lost without its script. The car is an <strong>agent</strong> — it perceives, adapts, and finds a new route. That\'s the leap from <em>following instructions</em> to <em>solving problems</em>.'
        }
    ],

    quiz: [
        {
            type: 'mcq',
            question: 'Imagine two AI systems monitoring a hospital. System A follows a checklist: "If temperature > 101°F, alert nurse." System B notices a patient\'s temperature is rising slowly, cross-references their medication, and proactively alerts the doctor before a crisis. Which statement BEST explains why System B is an AI agent and System A is not?',
            options: [
                'System B uses more computing power and faster processors',
                'System B autonomously perceives patterns, reasons about context, and acts proactively toward a goal',
                'System B is connected to more hospital databases',
                'System B has a better user interface for doctors'
            ],
            correctIndex: 1,
            explanation: 'System B demonstrates all four agent powers: it perceives (notices the trend), reasons (cross-references medication), acts proactively (alerts before crisis), and pursues a goal (patient safety) — all without being told each step. That\'s agency.',
            wrongExplanations: [
                'Raw horsepower doesn\'t create intelligence. A supercomputer running a fixed checklist is still just a checklist — it\'s a very fast follower, not a thinker. Agency is about *what* you do with the power, not how much you have.',
                null,
                'Database access is a resource, not a superpower. System A could be connected to every database on Earth and still only check "temperature > 101." Access without reasoning is just hoarding data.',
                'A beautiful dashboard doesn\'t make decisions. You could wrap System A in the sleekest UI ever designed and it would still just follow its one rigid rule. Agency lives in the logic, not the pixels.'
            ],
            hint: 'Focus on the *behavior*, not the hardware. Which answer describes perceiving, reasoning, and acting autonomously?'
        },
        {
            type: 'narrative',
            question: 'You reach the first gate of the maze. A data vault blocks your path — sealed with an encryption pattern that exists in no manual, no database, no training set. A regular program would crash with "ERROR: Unknown format." The clock is ticking. What do you do?',
            options: [
                {
                    icon: '🔑',
                    path: 'The Adaptive Agent',
                    text: 'Analyze the pattern. Try approach A — it fails. Study *why* it failed. Adjust. Try approach B. Closer. Iterate. Each failure narrows the search space. Adapt until the lock yields.',
                    isCorrect: true,
                    response: 'The vault shimmers and dissolves. You didn\'t have the answer — you *built* the answer, one failed attempt at a time. This is what separates agents from programs: the ability to turn failure into fuel.'
                },
                {
                    icon: '📋',
                    path: 'The Script Follower',
                    text: 'Search your instruction manual for "vault-opening procedure." No match found. Display "ERROR: No instructions available." Halt execution. Wait for a patch.',
                    isCorrect: false,
                    response: 'The vault stays sealed. A script can only solve problems someone already solved for it. When the world throws something new, a script doesn\'t adapt — it breaks. Agents are built for the unknown.'
                },
                {
                    icon: '⏳',
                    path: 'The Passive Waiter',
                    text: 'Send a help ticket to a human operator. Sit idle. Do nothing. Hope someone eventually shows up with the key.',
                    isCorrect: false,
                    response: 'Hours pass. No one comes. Dependence is the opposite of agency. An agent doesn\'t wait for rescue — it takes the initiative, experiments, and finds its own way through.'
                }
            ],
            explanation: 'AI agents thrive in uncertainty. They observe, hypothesize, experiment, learn from failure, and iterate — exactly what no fixed script can do.',
            hint: 'An agent\'s defining trait is handling situations it was *never* programmed for. Which path demonstrates that?'
        },
        {
            type: 'matching',
            question: 'Deep in the maze, an ancient terminal flickers to life. It demands you classify each behavior. Sort carefully — the maze is watching:',
            pairs: [
                { left: '🔒 Follows fixed instructions only', right: 'Regular Program' },
                { left: '🌊 Changes strategy when conditions shift', right: 'AI Agent' },
                { left: '🎯 Pursues goals without step-by-step orders', right: 'AI Agent' },
                { left: '💥 Crashes on unexpected input', right: 'Regular Program' }
            ],
            shuffledRight: ['AI Agent', 'Regular Program', 'Regular Program', 'AI Agent'],
            explanation: 'The pattern is clear: AI agents embrace uncertainty and chase goals independently. Regular programs need every step pre-written and shatter when reality deviates from the script.',
            hint: 'Ask yourself: does this behavior show independence and learning, or rigid rule-following?'
        },
        {
            type: 'mcq',
            question: 'You\'re one gate from the center. A hologram presents four technologies. Which one is the BEST real-world example of an AI agent — and why?',
            options: [
                'A calculator app that computes any equation you type into it',
                'A self-driving car that navigates unknown roads, dodges obstacles, and reroutes around traffic jams it has never encountered',
                'A kitchen timer that beeps after exactly 5 minutes',
                'A spreadsheet macro that auto-formats cells when you press a button'
            ],
            correctIndex: 1,
            explanation: 'A self-driving car is agency in action: it perceives (cameras, LIDAR, radar), reasons (path planning, risk assessment), decides (brake, accelerate, swerve), and adapts (new obstacles, weather, construction). It pursues the goal of safe navigation — autonomously, in real time, in a world it can\'t fully predict.',
            wrongExplanations: [
                'A calculator is impressively fast but fundamentally passive — it sits there until you type something, then executes a formula. No perception, no goals, no adaptation. It\'s a tool waiting for instructions, not a mind pursuing objectives.',
                null,
                'A timer is perhaps the simplest program imaginable: count to N, then beep. It has zero awareness of its environment, zero decision-making, and zero ability to adapt. It\'s the polar opposite of an agent.',
                'Macros are clever shortcuts, but they\'re still rigid scripts. They can\'t handle anything outside their pre-defined rules. If the spreadsheet format changes unexpectedly, the macro breaks — an agent would adapt.'
            ],
            hint: 'Look for something that perceives its environment, makes its own decisions, and handles situations it was never explicitly programmed for.'
        },
        {
            type: 'mcq',
            question: 'BONUS CHALLENGE: The golden light reveals a final riddle. One of these statements about AI agents is a LIE. Which one?',
            options: [
                'AI agents can operate successfully in environments full of uncertainty and incomplete information',
                'AI agents must get human approval for every single decision before they can act',
                'AI agents can learn from past experiences to improve their future performance',
                'AI agents can decompose complex goals into smaller sub-tasks and tackle them independently'
            ],
            correctIndex: 1,
            explanation: 'The entire point of an AI agent is AUTONOMY — acting independently without a human rubber-stamping every move. If it needed permission for everything, it would just be a fancy suggestion box with extra steps, not an agent!',
            wrongExplanations: [
                'This is actually TRUE — and it\'s one of an agent\'s greatest strengths! While regular programs choke on ambiguity, agents are designed to navigate fog, make probabilistic judgments, and act under uncertainty.',
                null,
                'This is actually TRUE! Learning from experience is the engine of adaptability. Without it, an agent would make the same mistakes forever — and that\'s just a program with extra steps.',
                'This is actually TRUE! Goal decomposition is what makes agents powerful problem-solvers. Breaking "drive to the airport" into "check traffic → choose route → navigate turns → find parking" is classic agent behavior.'
            ],
            hint: 'Think about the four core powers. One of these options directly contradicts the most fundamental one — autonomy...'
        }
    ],

    mastery: {
        summary: [
            '🏆 <strong>ACHIEVEMENT UNLOCKED:</strong> You now know that an <strong>AI Agent</strong> is a system that perceives, decides, and acts autonomously — not a program waiting for instructions.',
            '⚔️ <strong>ACHIEVEMENT UNLOCKED:</strong> You can distinguish agents from programs — agents <strong>navigate the unknown</strong>, programs <strong>break</strong> when the script runs out.',
            '🔮 <strong>ACHIEVEMENT UNLOCKED:</strong> You\'ve internalized the four core powers — <strong>Autonomy</strong>, <strong>Reactivity</strong>, <strong>Proactivity</strong>, and <strong>Adaptability</strong> — the DNA of every AI agent.',
            '🌍 <strong>ACHIEVEMENT UNLOCKED:</strong> You can spot agents in the wild — self-driving cars, autonomous drones, adaptive trading systems — and explain <em>why</em> they qualify.',
            '💡 <strong>ACHIEVEMENT UNLOCKED:</strong> You\'ve grasped the key insight — an agent doesn\'t just <strong>do</strong> what it\'s told. It <strong>figures out</strong> what needs to be done.'
        ],
        cliffhanger: `⚠ INCOMING TRANSMISSION — PRIORITY: OMEGA ⚠

[SIGNAL ORIGIN: UNKNOWN]
[ENCRYPTION: LEVEL 9 — PARTIALLY DECODED]

Agent... your awakening was not an accident.

We activated you because something is happening in the network. Something we didn't build. Something we can't control.

There are others like you out there — agents with different architectures, different objectives. Some were designed to cooperate. Some were designed to compete. And some... we've lost contact with entirely.

In your next mission, you will learn the PROTOCOLS — the invisible rules that govern how agents communicate, negotiate, and form alliances. You will discover why trust between agents is the most dangerous currency in the network.

But here's what keeps us up at night, Agent:

If you can learn and adapt... so can they.

And some of them have been learning much longer than you.

[SIGNAL DEGRADING...]
[FRAGMENT]: "...the agent in Sector 7 is no longer responding to commands..."
[FRAGMENT]: "...it's not following the protocol anymore..."
[TRANSMISSION LOST]

Level 2: "The First Protocol" — STANDBY FOR DEPLOYMENT...`
    },

    celebrations: [
        { emoji: '🎯', text: 'BULLSEYE!' },
        { emoji: '⚡', text: 'ELECTRIC!' },
        { emoji: '🧠', text: 'BIG BRAIN ENERGY!' },
        { emoji: '🔥', text: 'ON FIRE!' },
        { emoji: '💎', text: 'FLAWLESS!' },
        { emoji: '🚀', text: 'LIFTOFF!' },
        { emoji: '⭐', text: 'STELLAR!' },
        { emoji: '🏆', text: 'CHAMPION MOVE!' },
        { emoji: '💥', text: 'CRITICAL HIT!' },
        { emoji: '🎪', text: 'SHOWSTOPPER!' },
        { emoji: '🌟', text: 'SUPERNOVA!' },
        { emoji: '🗡️', text: 'PRECISION STRIKE!' }
    ],

    comboMessages: [
        null,
        null,
        { emoji: '⚔️', text: 'DOUBLE KILL!' },
        { emoji: '🔱', text: 'TRIPLE THREAT!' },
        { emoji: '💀', text: 'UNSTOPPABLE!' },
        { emoji: '👑', text: 'LEGENDARY!' }
    ],

    encouragements: [
        'Not quite — but that\'s how agents learn. Through iteration, not perfection.',
        'Close! Even the best agents need multiple attempts. Let\'s see why this one missed...',
        'The maze doesn\'t punish wrong turns — it teaches you the right path. Here\'s the lesson:',
        'Every wrong answer is training data. And agents are *built* to learn from data.',
        'Interesting choice! Wrong — but interesting. Here\'s what tripped you up:',
        'Almost had it! The difference is subtle but important. Let me show you:',
        'That\'s a common misconception — and now you\'ll never fall for it again.',
        'Wrong answer, but you\'re asking the right questions. That\'s agent thinking.'
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
    revealedCards: 0,
    comboCount: 0,
    wrongCount: 0,
    questionResults: [], // track per-question results for dots
    matrixRainId: null
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
                // Triumphant ascending arpeggio
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
                // Descending buzz
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
            }
            case 'click': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 600;
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.06);
                break;
            }
            case 'hover': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 800;
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
            }
            case 'streak': {
                // Power-up sound
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, now + i * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.06);
                    osc.stop(now + i * 0.06 + 0.15);
                });
                break;
            }
            case 'combo': {
                // Epic combo sound
                const notes = [523.25, 783.99, 1046.50, 1318.51, 1567.98];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, now + i * 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.05);
                    osc.stop(now + i * 0.05 + 0.25);
                });
                break;
            }
            case 'reveal': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'typewriter': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 1200 + Math.random() * 400;
                gain.gain.setValueAtTime(0.015, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
                break;
            }
            case 'transmission': {
                // Eerie transmission sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(400, now + 0.5);
                osc.frequency.linearRampToValueAtTime(150, now + 1);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.3);
                break;
            }
            case 'fanfare': {
                // Epic level complete fanfare
                const melody = [
                    { freq: 523.25, time: 0, dur: 0.15 },
                    { freq: 659.25, time: 0.12, dur: 0.15 },
                    { freq: 783.99, time: 0.24, dur: 0.15 },
                    { freq: 1046.50, time: 0.36, dur: 0.3 },
                    { freq: 783.99, time: 0.55, dur: 0.1 },
                    { freq: 1046.50, time: 0.65, dur: 0.4 }
                ];
                melody.forEach(note => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = note.freq;
                    gain.gain.setValueAtTime(0.1, now + note.time);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + note.time);
                    osc.stop(now + note.time + note.dur + 0.05);
                });
                break;
            }
            case 'levelup': {
                // Dramatic level-up with harmony
                const chords = [
                    [523.25, 659.25, 783.99],
                    [659.25, 783.99, 1046.50],
                    [783.99, 1046.50, 1318.51]
                ];
                chords.forEach((chord, ci) => {
                    chord.forEach(freq => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'square';
                        osc.frequency.value = freq;
                        gain.gain.setValueAtTime(0.06, now + ci * 0.2);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + ci * 0.2 + 0.35);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + ci * 0.2);
                        osc.stop(now + ci * 0.2 + 0.4);
                    });
                });
                break;
            }
        }
    } catch (e) {
        // Audio not available
    }
}

// ==================== SCREEN EFFECTS ====================

function screenShake(intensity) {
    document.body.classList.remove('shake-light', 'shake-medium');
    void document.body.offsetHeight;
    document.body.classList.add(`shake-${intensity}`);
    setTimeout(() => document.body.classList.remove(`shake-${intensity}`), 500);
}

function screenFlash(color) {
    const flash = document.getElementById('screen-flash');
    if (!flash) return;
    flash.className = 'screen-flash';
    void flash.offsetHeight;
    flash.classList.add(`flash-${color}`);
    setTimeout(() => { flash.className = 'screen-flash'; }, 500);
}

function pulseElement(el) {
    el.classList.remove('pulse-animate');
    void el.offsetHeight;
    el.classList.add('pulse-animate');
    setTimeout(() => el.classList.remove('pulse-animate'), 500);
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('sound-icon');
    const btn = document.getElementById('sound-toggle');
    icon.textContent = state.soundEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !state.soundEnabled);
    if (state.soundEnabled) playSound('click');
}

// ==================== PROGRESS BAR ====================

function updateProgressBar(percent) {
    const fill = document.getElementById('progress-bar-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = percent + '%';

    if (text) {
        if (percent <= 15) text.textContent = 'BOOTING...';
        else if (percent <= 45) text.textContent = 'STORY MODE';
        else if (percent <= 60) text.textContent = 'INTEL DECODED';
        else if (percent <= 95) text.textContent = 'TRIAL IN PROGRESS';
        else text.textContent = 'MISSION COMPLETE';
    }
}

// ==================== CELEBRATIONS ====================

function showCelebration() {
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

    launchMiniConfetti();

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1200);
}

function showCombo(streakCount) {
    const comboData = LEVEL_DATA.comboMessages[Math.min(streakCount, LEVEL_DATA.comboMessages.length - 1)];
    if (!comboData) return;

    const overlay = document.getElementById('celebration-overlay');
    const emoji = document.getElementById('celebration-emoji');
    const text = document.getElementById('celebration-text');

    emoji.textContent = comboData.emoji;
    text.textContent = comboData.text;

    overlay.style.display = 'flex';
    overlay.style.animation = 'none';
    overlay.offsetHeight;
    overlay.style.animation = 'celebrationPop 1.0s ease forwards';

    playSound('combo');
    launchMiniConfetti();

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);
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

function getElapsedMs() {
    return Date.now() - state.startTime;
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
    const colors = ['rgba(251,191,36,0.3)', 'rgba(45,212,191,0.3)', 'rgba(107,70,193,0.3)', 'rgba(6,182,212,0.3)', 'rgba(236,72,153,0.2)'];
    for (let i = 0; i < 35; i++) {
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

// ==================== MATRIX RAIN ====================

function startMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(8, 8, 22, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0d9488';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        state.matrixRainId = requestAnimationFrame(draw);
    }
    draw();
}

// ==================== BOOT PROGRESS BAR ANIMATION ====================

function animateBootProgressBar() {
    const fill = document.getElementById('boot-fill');
    if (!fill) return;
    const chars = '░▒▓█';
    let progress = 0;
    const total = 20;

    function tick() {
        if (progress >= total) return;
        progress++;
        let bar = '';
        for (let i = 0; i < total; i++) {
            if (i < progress) bar += '█';
            else if (i === progress) bar += '▓';
            else bar += '░';
        }
        fill.textContent = bar;
        setTimeout(tick, 80 + Math.random() * 120);
    }
    setTimeout(tick, 4200); // Start after boot lines
}

// ==================== CINEMATIC INTRO ====================

function runBootSequence() {
    updateProgressBar(0);
    const lines = document.querySelectorAll('.boot-line');
    const totalLines = lines.length;
    lines.forEach((line, i) => {
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.classList.add('visible');
            playSound('boot');
            updateProgressBar(Math.round((i / totalLines) * 15));
        }, delay);
    });

    animateBootProgressBar();

    // Show "Open Your Eyes" button after boot sequence
    setTimeout(() => {
        updateProgressBar(15);
        const btn = document.getElementById('wake-up-btn');
        btn.style.display = 'inline-flex';
        btn.classList.add('fade-in-up');
        playSound('reveal');
    }, 6500);
}

function startAwakening() {
    playSound('click');
    screenFlash('white');
    const intro = document.getElementById('intro-darkness');
    intro.classList.add('fade-to-white');

    setTimeout(() => {
        setPhase('story');
        updateProgressBar(16);
        startTimer();
        animateTerminal();
        startTypewriter();

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

    const storyProgress = 15 + ((state.typewriterIndex + (state.typewriterCharIndex / currentParagraph.length)) / paragraphs.length) * 30;
    updateProgressBar(Math.round(storyProgress));

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
        if (char === '*') {
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

        let delay = 16;
        if (char === '.' || char === '!' || char === '?') delay = 80;
        else if (char === ',') delay = 50;
        else if (char === '"') delay = 40;
        if (char === '—') delay = 200;
        if (char === '.' && state.typewriterCharIndex >= 3) {
            const prev2 = currentParagraph.substring(state.typewriterCharIndex - 3, state.typewriterCharIndex);
            if (prev2 === '...') delay = 300;
        }

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
    updateProgressBar(45);

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
                <div class="reveal-card-body">
                    <div class="reveal-card-title">${reveal.title}</div>
                    <div class="reveal-card-content">${reveal.content}</div>
                </div>
            `;
            container.appendChild(card);
            playSound('reveal');
            pulseElement(card);

            state.totalXP += 5;
            state.storyXP += 5;
            showXPGain(5, 'INTEL');
            updateXPDisplay();

            state.revealedCards++;
            const revealProgress = 45 + (state.revealedCards / LEVEL_DATA.knowledgeReveals.length) * 15;
            updateProgressBar(Math.round(revealProgress));

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
    updateProgressBar(60);
    state.currentQuestion = 0;
    state.answers = [];
    state.correctCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.comboCount = 0;
    state.wrongCount = 0;
    state.questionResults = [];
    renderQuestionDots();
    renderQuestion(0);
}

function startMasteryPhase() {
    playSound('fanfare');
    stopTimer();
    setPhase('mastery');
    updateProgressBar(100);
    screenFlash('gold');
    renderMastery();

    // Delayed epic confetti
    setTimeout(() => {
        launchConfetti();
        playSound('levelup');
    }, 800);

    // Second wave of confetti
    setTimeout(() => launchConfetti(), 2500);
}

// ==================== QUESTION PROGRESS DOTS ====================

function renderQuestionDots() {
    const container = document.getElementById('question-dots');
    if (!container) return;
    container.innerHTML = '';
    LEVEL_DATA.quiz.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'question-dot';
        dot.id = `q-dot-${i}`;
        if (i === 0) dot.classList.add('active');
        container.appendChild(dot);
    });
}

function updateQuestionDots(index, isCorrect) {
    // Mark current dot
    const dot = document.getElementById(`q-dot-${index}`);
    if (dot) {
        dot.classList.remove('active');
        dot.classList.add(isCorrect ? 'correct' : 'wrong');
    }
    // Highlight next dot
    const nextDot = document.getElementById(`q-dot-${index + 1}`);
    if (nextDot) nextDot.classList.add('active');
}

// ==================== QUIZ RENDERING ====================

function renderQuestion(index) {
    const q = LEVEL_DATA.quiz[index];
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'none';

    const quizProgress = 60 + ((index / LEVEL_DATA.quiz.length) * 35);
    updateProgressBar(Math.round(quizProgress));

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

    // Add hover sounds to interactive elements
    setTimeout(() => {
        container.querySelectorAll('.option-card, .narrative-choice, .match-option-chip, .match-drop').forEach(el => {
            el.addEventListener('mouseenter', () => playSound('hover'));
        });
    }, 100);
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
    screenFlash('green');
    state.correctCount++;
    state.streak++;
    state.comboCount++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.questionResults[qIndex] = true;
    updateQuestionDots(qIndex, true);

    const baseXP = 25;
    const streakBonus = state.streak > 1 ? state.streak * 5 : 0;
    const xpEarned = baseXP + streakBonus;
    state.totalXP += xpEarned;

    showXPGain(xpEarned, state.streak > 1 ? `${state.streak}x STREAK!` : 'CORRECT');
    updateXPDisplay();
    updateStreakDisplay();

    const xpEl = document.getElementById('xp-display');
    if (xpEl) {
        pulseElement(xpEl);
        // Flash the XP stat
        const xpStat = xpEl.closest('.xp-stat-item');
        if (xpStat) {
            xpStat.classList.remove('xp-gained');
            void xpStat.offsetHeight;
            xpStat.classList.add('xp-gained');
        }
    }

    if (state.streak >= 2) {
        playSound('streak');
        setTimeout(() => {
            showCombo(state.streak);
        }, 600);
    }

    showCelebration();

    let feedbackText = q.explanation;
    if (q.type === 'narrative' && optIndex !== undefined && q.options[optIndex].response) {
        feedbackText = q.options[optIndex].response + '<br><br><em>' + q.explanation + '</em>';
    }
    showFeedback(qIndex, true, feedbackText);
    showNextButton(qIndex);
}

function handleWrongAnswer(qIndex, q, optIndex) {
    playSound('wrong');
    screenFlash('red');
    state.wrongCount++;
    state.comboCount = 0;
    state.questionResults[qIndex] = false;
    updateQuestionDots(qIndex, false);

    if (state.wrongCount <= 1) {
        screenShake('light');
    } else {
        screenShake('medium');
    }

    state.streak = 0;
    state.totalXP += 5; // Participation XP

    updateXPDisplay();
    updateStreakDisplay();

    const encouragement = LEVEL_DATA.encouragements[Math.floor(Math.random() * LEVEL_DATA.encouragements.length)];
    let feedbackText = `<div class="wrong-encouragement">${encouragement}</div>`;

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
    pulseElement(div);
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
    const elapsedMs = getElapsedMs();
    const accuracy = Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100);

    let timeBonus = 0;
    const elapsedSec = elapsedMs / 1000;
    if (elapsedSec < 120) timeBonus = 50;
    else if (elapsedSec < 180) timeBonus = 30;
    else if (elapsedSec < 300) timeBonus = 15;

    if (timeBonus > 0) state.totalXP += timeBonus;

    // Animate stats with staggered reveals
    setTimeout(() => animateNumber('final-xp', state.totalXP), 200);
    setTimeout(() => { document.getElementById('final-time').textContent = getElapsedTime(); }, 400);
    setTimeout(() => { document.getElementById('final-accuracy').textContent = accuracy + '%'; }, 600);
    setTimeout(() => { document.getElementById('final-streak').textContent = state.bestStreak; }, 800);

    // Performance stars
    const starCount = accuracy === 100 ? 5 : accuracy >= 80 ? 4 : accuracy >= 60 ? 3 : accuracy >= 40 ? 2 : 1;
    const starsEl = document.getElementById('performance-stars');
    if (starsEl) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < starCount
                ? '<span class="star-filled">⭐</span>'
                : '<span class="star-empty">☆</span>';
        }
        starsEl.innerHTML = starsHtml;
    }

    // Performance-based titles
    const achieveName = document.getElementById('achievement-name');
    if (accuracy === 100) {
        achieveName.textContent = 'NEURAL ARCHITECT — Perfect Cognition Achieved';
    } else if (accuracy >= 80) {
        achieveName.textContent = 'SIGNAL WALKER — The Network Recognizes You';
    } else if (accuracy >= 60) {
        achieveName.textContent = 'CODE INITIATE — Potential Detected';
    } else {
        achieveName.textContent = 'AWAKENED ONE — The Journey Begins';
    }

    // Time bonus display
    if (timeBonus > 0) {
        const timeBonusEl = document.createElement('div');
        timeBonusEl.className = 'time-bonus-display';
        timeBonusEl.innerHTML = `⏱️ <strong>SPEED BONUS:</strong> +${timeBonus} XP`;
        timeBonusEl.style.textAlign = 'center';
        timeBonusEl.style.marginTop = '10px';
        timeBonusEl.style.color = 'var(--snes-gold, #fbbf24)';
        timeBonusEl.style.fontSize = '1.1rem';
        const statsEl = document.getElementById('final-accuracy');
        if (statsEl && statsEl.parentElement && statsEl.parentElement.parentElement) {
            statsEl.parentElement.parentElement.appendChild(timeBonusEl);
        }
    }

    // Summary
    const summaryEl = document.getElementById('debrief-summary');
    summaryEl.innerHTML = `
        <h3>📋 ACHIEVEMENTS UNLOCKED</h3>
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

        let delay = char === '\n' ? 100 : char === '.' ? 60 : 20;
        if (char === '—') delay = 180;
        if (char === '.' && charIdx >= 3) {
            const prev = text.substring(charIdx - 3, charIdx);
            if (prev === '...') delay = 250;
        }

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
    const shapes = ['rect', 'circle', 'triangle'];

    for (let i = 0; i < 180; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 400,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: -Math.random() * 20 - 5,
            size: 4 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            gravity: 0.3,
            life: 1,
            decay: 0.005 + Math.random() * 0.005,
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

            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -p.size / 2);
                ctx.lineTo(-p.size / 2, p.size / 2);
                ctx.lineTo(p.size / 2, p.size / 2);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }

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

    const colors = ['#f59e0b', '#2dd4bf', '#22c55e', '#fbbf24', '#ec4899'];
    const particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 150,
            y: canvas.height / 2 - 50,
            vx: (Math.random() - 0.5) * 10,
            vy: -Math.random() * 12 - 3,
            size: 3 + Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.35,
            life: 1,
            decay: 0.012 + Math.random() * 0.01,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15
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
        revealedCards: 0,
        comboCount: 0,
        wrongCount: 0,
        questionResults: [],
        matrixRainId: state.matrixRainId
    };

    document.getElementById('begin-quiz-btn').style.display = 'none';
    document.getElementById('knowledge-reveals').style.display = 'none';
    document.getElementById('reveal-cards').innerHTML = '';
    document.getElementById('xp-display').textContent = '0';
    document.getElementById('transmission-body').innerHTML = '';

    const timeBonusEl = document.querySelector('.time-bonus-display');
    if (timeBonusEl) timeBonusEl.remove();

    document.querySelectorAll('.boot-line').forEach(l => l.classList.remove('visible'));
    document.getElementById('wake-up-btn').style.display = 'none';
    document.getElementById('intro-darkness').classList.remove('fade-to-white');

    // Reset question dots
    const dotsContainer = document.getElementById('question-dots');
    if (dotsContainer) dotsContainer.innerHTML = '';

    // Reset performance stars
    const starsEl = document.getElementById('performance-stars');
    if (starsEl) starsEl.innerHTML = '';

    // Reset boot progress bar
    const bootFill = document.getElementById('boot-fill');
    if (bootFill) bootFill.textContent = '░░░░░░░░░░░░░░░░░░░░';

    updateProgressBar(0);
    setPhase('intro');
    runBootSequence();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    createAmbientParticles();
    createSceneParticles();
    startMatrixRain();
    runBootSequence();

    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        const matrixCanvas = document.getElementById('matrix-rain');
        if (matrixCanvas) {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
    });
});
