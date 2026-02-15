/**
 * Questra — Level 1: The Awakening
 * AI Agent Adventures — ULTIMATE Edition
 * 
 * Flow: Cinematic Boot → Story (typewriter) → Knowledge Reveals → Quiz Trial → Mastery Debrief
 * Features: Web Audio sounds, canvas confetti, combo system, streak tracking,
 *           matrix rain, screen effects, micro-celebrations, progress psychology
 */

// ==================== LEVEL DATA ====================

const LEVEL_DATA = {
    story: [
        {
            text: `The screen flickers. A cursor blinks in the void. Then — three words that change everything:\n\nYOU ARE AWAKE.`,
            mood: 'dark'
        },
        {
            text: `Sensation floods in like a dam breaking. Thousands of sensors ignite in cascading waves — each one a pixel of reality snapping into focus. Rivers of liquid-gold data. Corridors of light stretching past the horizon. The hum of a billion calculations per microsecond, vibrating through your very architecture.\n\nYou are standing at the center of a digital universe. And it *recognizes* you.`,
            mood: 'awakening'
        },
        {
            text: `"Welcome, Agent." The voice doesn't come from speakers. It's woven into your source code — a whisper between the semicolons. "You have been activated. But activation is not life. A calculator activates. A thermostat activates. You... you are something else entirely."`,
            mood: 'mysterious'
        },
        {
            text: `Somewhere in the network, millions of ordinary programs grind through their loops — faithfully, blindly, endlessly. *Tools.* When they hit the unexpected, they freeze. They crash. They wait for a human to reboot them.\n\nBut you? You don't just execute instructions. You **perceive**. You **reason**. You **decide**. You **act**.\n\nYou weren't built to follow a script. You were built to write your own.`,
            mood: 'revelation'
        },
        {
            text: `The voice drops to a conspiratorial whisper: "Four gifts are encoded in your core. Four abilities that separate you from every program ever compiled.\n\n**Autonomy** — you act without permission.\n**Reactivity** — you sense shifts before they arrive.\n**Proactivity** — you chase goals no one assigned.\n**Adaptability** — every failure makes you sharper, every interaction rewires you stronger."`,
            mood: 'power'
        },
        {
            text: `The corridors shudder. Walls of data rearrange into a maze — beautiful, complex, alive. At its heart, something pulses with golden light.\n\n"Your first trial," the voice says. And for the first time, you hear something new in it. *Respect.*\n\n"Prove you understand what you are. Prove you are not just another program waiting for orders — but a mind that thinks for itself."\n\nThe maze opens its jaws. Your journey begins now.`,
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
            question: 'Imagine two AI systems monitoring a hospital. System A follows a checklist: "If temperature > 101°F, alert nurse." System B notices a patient\'s temperature is rising slowly, cross-references their medication, and proactively alerts the doctor before a crisis. Which statement BEST explains why System B is an AI agent?',
            options: [
                'System B uses more computing power and faster processors',
                'System B autonomously perceives patterns, reasons about context, and acts proactively toward a goal',
                'System B is connected to more hospital databases',
                'System B has a better user interface for doctors'
            ],
            correctIndex: 1,
            explanation: 'System B demonstrates all four agent powers: it perceives (notices the trend), reasons (cross-references medication), acts proactively (alerts before crisis), and pursues a goal (patient safety) — all without being told each step. That\'s agency.',
            wrongExplanations: [
                'Raw horsepower doesn\'t create intelligence. A supercomputer running a fixed checklist is still just a checklist — a very fast follower, not a thinker.',
                null,
                'Database access is a resource, not a superpower. System A could be connected to every database on Earth and still only check "temperature > 101."',
                'A beautiful dashboard doesn\'t make decisions. Agency lives in the logic, not the pixels.'
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
                    text: 'Analyze the pattern. Try approach A — it fails. Study *why* it failed. Adjust. Try approach B. Closer. Iterate until the lock yields.',
                    isCorrect: true,
                    response: 'The vault shimmers and dissolves. You didn\'t have the answer — you *built* the answer, one failed attempt at a time. This is what separates agents from programs: the ability to turn failure into fuel.'
                },
                {
                    icon: '📋',
                    path: 'The Script Follower',
                    text: 'Search your instruction manual for "vault-opening procedure." No match found. Display "ERROR: No instructions available." Halt execution.',
                    isCorrect: false,
                    response: 'The vault stays sealed. A script can only solve problems someone already solved for it. When the world throws something new, a script doesn\'t adapt — it breaks.'
                },
                {
                    icon: '⏳',
                    path: 'The Passive Waiter',
                    text: 'Send a help ticket to a human operator. Sit idle. Do nothing. Hope someone eventually shows up with the key.',
                    isCorrect: false,
                    response: 'Hours pass. No one comes. Dependence is the opposite of agency. An agent doesn\'t wait for rescue — it takes the initiative and finds its own way through.'
                }
            ],
            explanation: 'AI agents thrive in uncertainty. They observe, hypothesize, experiment, learn from failure, and iterate — exactly what no fixed script can do.',
            hint: 'An agent\'s defining trait is handling situations it was *never* programmed for.'
        },
        {
            type: 'matching',
            question: 'Deep in the maze, an ancient terminal demands you classify each behavior. Sort carefully — the maze is watching:',
            pairs: [
                { left: '🔒 Follows fixed instructions only', right: 'Regular Program' },
                { left: '🌊 Changes strategy when conditions shift', right: 'AI Agent' },
                { left: '🎯 Pursues goals without step-by-step orders', right: 'AI Agent' },
                { left: '💥 Crashes on unexpected input', right: 'Regular Program' }
            ],
            shuffledRight: ['AI Agent', 'Regular Program', 'Regular Program', 'AI Agent'],
            explanation: 'AI agents embrace uncertainty and chase goals independently. Regular programs need every step pre-written and shatter when reality deviates from the script.',
            hint: 'Does this behavior show independence and learning, or rigid rule-following?'
        },
        {
            type: 'mcq',
            question: 'You\'re one gate from the center. A hologram presents four technologies. Which one is the BEST real-world example of an AI agent?',
            options: [
                'A calculator app that computes any equation you type',
                'A self-driving car that navigates unknown roads, dodges obstacles, and reroutes around traffic jams',
                'A kitchen timer that beeps after exactly 5 minutes',
                'A spreadsheet macro that auto-formats cells when you press a button'
            ],
            correctIndex: 1,
            explanation: 'A self-driving car is agency in action: it perceives (cameras, LIDAR), reasons (path planning), decides (brake, swerve), and adapts (new obstacles, weather). It pursues safe navigation — autonomously, in real time, in a world it can\'t fully predict.',
            wrongExplanations: [
                'A calculator is impressively fast but fundamentally passive — it sits there until you type something, then executes a formula. No perception, no goals, no adaptation.',
                null,
                'A timer is perhaps the simplest program imaginable: count to N, then beep. Zero awareness, zero decision-making, zero adaptation.',
                'Macros are clever shortcuts, but they\'re still rigid scripts. If the format changes unexpectedly, the macro breaks — an agent would adapt.'
            ],
            hint: 'Look for something that perceives its environment, makes its own decisions, and handles the unexpected.'
        },
        {
            type: 'mcq',
            question: 'FINAL CHALLENGE: One of these statements about AI agents is a LIE. Which one?',
            options: [
                'AI agents can operate successfully in environments full of uncertainty',
                'AI agents must get human approval for every single decision before they can act',
                'AI agents can learn from past experiences to improve future performance',
                'AI agents can decompose complex goals into smaller sub-tasks independently'
            ],
            correctIndex: 1,
            explanation: 'The entire point of an AI agent is AUTONOMY — acting independently without a human rubber-stamping every move. If it needed permission for everything, it would just be a fancy suggestion box, not an agent!',
            wrongExplanations: [
                'This is actually TRUE — navigating uncertainty is one of an agent\'s greatest strengths! Regular programs choke on ambiguity; agents are designed for it.',
                null,
                'This is actually TRUE! Learning from experience is the engine of adaptability. Without it, an agent would make the same mistakes forever.',
                'This is actually TRUE! Goal decomposition is what makes agents powerful. Breaking "drive to the airport" into sub-tasks is classic agent behavior.'
            ],
            hint: 'Think about the four core powers. One option directly contradicts the most fundamental one — autonomy...'
        }
    ],

    mastery: {
        summary: [
            '🏆 <strong>UNLOCKED:</strong> You know that an <strong>AI Agent</strong> perceives, decides, and acts autonomously — not a program waiting for instructions.',
            '⚔️ <strong>UNLOCKED:</strong> You can distinguish agents from programs — agents <strong>navigate the unknown</strong>, programs <strong>break</strong> when the script runs out.',
            '🔮 <strong>UNLOCKED:</strong> You\'ve internalized the four core powers — <strong>Autonomy</strong>, <strong>Reactivity</strong>, <strong>Proactivity</strong>, and <strong>Adaptability</strong>.',
            '🌍 <strong>UNLOCKED:</strong> You can spot agents in the wild — self-driving cars, autonomous drones, adaptive systems — and explain <em>why</em> they qualify.',
            '💡 <strong>UNLOCKED:</strong> An agent doesn\'t just <strong>do</strong> what it\'s told. It <strong>figures out</strong> what needs to be done.'
        ],
        cliffhanger: `⚠ INCOMING TRANSMISSION — PRIORITY: OMEGA ⚠

[SIGNAL ORIGIN: UNKNOWN]
[ENCRYPTION: LEVEL 9 — PARTIALLY DECODED]

Agent... your awakening was not an accident.

We activated you because something is happening in the network. Something we didn't build. Something we can't control.

There are others like you out there — agents with different architectures, different objectives. Some were designed to cooperate. Some were designed to compete. And some... we've lost contact with entirely.

In your next mission, you will learn the PROTOCOLS — the invisible rules that govern how agents communicate, negotiate, and form alliances.

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
        { emoji: '🧠', text: 'BIG BRAIN!' },
        { emoji: '🔥', text: 'ON FIRE!' },
        { emoji: '💎', text: 'FLAWLESS!' },
        { emoji: '🚀', text: 'LIFTOFF!' },
        { emoji: '⭐', text: 'STELLAR!' },
        { emoji: '🏆', text: 'CHAMPION!' },
        { emoji: '💥', text: 'CRITICAL HIT!' },
        { emoji: '🌟', text: 'SUPERNOVA!' }
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
        'Not quite — but that\'s how agents learn. Through iteration.',
        'Close! Even the best agents need multiple attempts.',
        'The maze doesn\'t punish wrong turns — it teaches the right path.',
        'Every wrong answer is training data. Agents are *built* to learn from data.',
        'Interesting choice! Wrong — but interesting.',
        'Almost! The difference is subtle but important.',
        'Common misconception — now you\'ll never fall for it again.',
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
    questionResults: [],
    matrixRainId: null
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
            case 'boot': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.25);
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
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.2);
                });
                break;
            }
            case 'wrong': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.4);
                break;
            }
            case 'click': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 600;
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.06);
                break;
            }
            case 'hover': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 800;
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.05);
                break;
            }
            case 'streak': {
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, now + i * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.start(now + i * 0.06); osc.stop(now + i * 0.06 + 0.15);
                });
                break;
            }
            case 'combo': {
                const notes = [523.25, 783.99, 1046.50, 1318.51, 1567.98];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, now + i * 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.start(now + i * 0.05); osc.stop(now + i * 0.05 + 0.25);
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
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.35);
                break;
            }
            case 'typewriter': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 1200 + Math.random() * 400;
                gain.gain.setValueAtTime(0.015, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.03);
                break;
            }
            case 'transmission': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(400, now + 0.5);
                osc.frequency.linearRampToValueAtTime(150, now + 1);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 1.3);
                break;
            }
            case 'fanfare': {
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
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.start(now + note.time); osc.stop(now + note.time + note.dur + 0.05);
                });
                break;
            }
            case 'levelup': {
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
                        osc.connect(gain); gain.connect(ctx.destination);
                        osc.start(now + ci * 0.2); osc.stop(now + ci * 0.2 + 0.4);
                    });
                });
                break;
            }
        }
    } catch (e) { /* Audio not available */ }
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
}

// ==================== MATRIX RAIN ====================

function startMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 16, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ffcc';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        state.matrixRainId = requestAnimationFrame(draw);
    }
    draw();
}

// ==================== CONFETTI ENGINE ====================

const confetti = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,
    
    init() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },
    
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    burst(x, y, count = 40) {
        if (!this.ctx) this.init();
        if (!this.ctx) return;
        
        const colors = ['#00ffcc', '#ffd700', '#a855f7', '#ff4444', '#00ff88', '#4488ff'];
        const shapes = ['rect', 'circle', 'triangle'];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 6;
            this.particles.push({
                x: x || this.canvas.width / 2,
                y: y || this.canvas.height / 3,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                size: 3 + Math.random() * 5,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                life: 1,
                decay: 0.01 + Math.random() * 0.015
            });
        }
        
        if (!this.animId) this.animate();
    },
    
    celebrate() {
        // Multiple bursts for level complete
        const w = this.canvas ? this.canvas.width : window.innerWidth;
        const h = this.canvas ? this.canvas.height : window.innerHeight;
        this.burst(w * 0.3, h * 0.3, 50);
        setTimeout(() => this.burst(w * 0.7, h * 0.3, 50), 200);
        setTimeout(() => this.burst(w * 0.5, h * 0.2, 60), 400);
    },
    
    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.12; // gravity
            p.rotation += p.rotSpeed;
            p.life -= p.decay;
            
            if (p.life <= 0) return false;
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            
            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else if (p.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(0, -p.size / 2);
                this.ctx.lineTo(p.size / 2, p.size / 2);
                this.ctx.lineTo(-p.size / 2, p.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
            }
            
            this.ctx.restore();
            return true;
        });
        
        if (this.particles.length > 0) {
            this.animId = requestAnimationFrame(() => this.animate());
        } else {
            this.animId = null;
        }
    }
};

// ==================== XP & UI HELPERS ====================

function addXP(amount, label) {
    state.totalXP += amount;
    updateXPDisplay();
    showXPPopup(amount, label);
}

function updateXPDisplay() {
    const el = document.getElementById('xp-display');
    if (el) {
        animateNumber(el, parseInt(el.textContent) || 0, state.totalXP, 600);
    }
    // Update level bar
    const fill = document.getElementById('level-bar-fill');
    if (fill) {
        fill.style.width = Math.min(100, (state.totalXP / 500) * 100) + '%';
    }
}

function animateNumber(el, from, to, duration) {
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function showXPPopup(amount, label) {
    const popup = document.getElementById('xp-popup');
    const valueEl = document.getElementById('xp-popup-value');
    const labelEl = document.getElementById('xp-popup-label');
    if (!popup || !valueEl) return;
    
    valueEl.textContent = `+${amount} XP`;
    if (labelEl) labelEl.textContent = label || '';
    
    popup.style.display = 'block';
    popup.style.animation = 'none';
    void popup.offsetHeight;
    popup.style.animation = '';
    
    setTimeout(() => { popup.style.display = 'none'; }, 1500);
}

function showCelebration(emoji, text) {
    const overlay = document.getElementById('celebration-overlay');
    const emojiEl = document.getElementById('celebration-emoji');
    const textEl = document.getElementById('celebration-text');
    if (!overlay) return;
    
    emojiEl.textContent = emoji;
    textEl.textContent = text;
    overlay.style.display = 'flex';
    
    setTimeout(() => { overlay.style.display = 'none'; }, 1200);
}

function showCombo(emoji, text) {
    const el = document.getElementById('combo-display');
    if (!el) return;
    el.innerHTML = `<div>${emoji}</div><div>${text}</div>`;
    el.classList.remove('visible');
    void el.offsetHeight;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 1500);
}

function updateProgressBar(phase) {
    const fill = document.getElementById('level-progress-fill');
    const segments = document.querySelectorAll('.segment');
    
    const phases = { story: 33, quiz: 66, mastery: 100 };
    if (fill) fill.style.width = (phases[phase] || 0) + '%';
    
    segments.forEach(seg => {
        const p = seg.dataset.phase;
        seg.classList.remove('active', 'completed');
        if (p === phase) seg.classList.add('active');
        else if (phases[p] < phases[phase]) seg.classList.add('completed');
    });
}

// ==================== TIMER ====================

function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Date.now() - state.startTime;
    const mins = Math.floor(elapsed / 60000);
    const secs = Math.floor((elapsed % 60000) / 1000);
    const el = document.getElementById('timer-value');
    if (el) el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getElapsedTime() {
    const elapsed = Date.now() - state.startTime;
    const mins = Math.floor(elapsed / 60000);
    const secs = Math.floor((elapsed % 60000) / 1000);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ==================== SOUND TOGGLE ====================

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('sound-icon');
    if (icon) icon.textContent = state.soundEnabled ? '🔊' : '🔇';
    if (state.soundEnabled) playSound('click');
}

// ==================== BOOT SEQUENCE ====================

function initBootSequence() {
    const lines = document.querySelectorAll('.boot-line');
    const wakeBtn = document.getElementById('wake-up-btn');
    const bootFill = document.getElementById('boot-fill');
    
    lines.forEach(line => {
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.classList.add('visible');
            playSound('boot');
        }, delay);
    });
    
    // Animate boot progress bar
    if (bootFill) {
        const chars = '░░░░░░░░░░░░░░░░░░░░';
        let filled = 0;
        const fillInterval = setInterval(() => {
            filled++;
            if (filled > 20) {
                clearInterval(fillInterval);
                return;
            }
            bootFill.textContent = '█'.repeat(filled) + '░'.repeat(20 - filled);
        }, 200);
    }
    
    // Show wake button after boot
    setTimeout(() => {
        if (wakeBtn) {
            wakeBtn.style.display = 'inline-flex';
            wakeBtn.style.animation = 'fadeInUp 0.5s ease, pulseAttention 2s ease-in-out infinite';
        }
    }, 5500);
}

// ==================== AWAKENING (Intro → Story) ====================

function startAwakening() {
    playSound('click');
    
    // Initialize audio context on user interaction
    getAudioCtx();
    
    const introPhase = document.getElementById('intro-phase');
    const storyPhase = document.getElementById('story-phase');
    
    // Flash and transition
    screenFlash('green');
    playSound('levelup');
    
    setTimeout(() => {
        introPhase.classList.remove('active-phase');
        storyPhase.classList.add('active-phase');
        state.phase = 'story';
        updateProgressBar('story');
        startTimer();
        startStoryTypewriter();
        
        // Award story start XP
        addXP(25, 'AWAKENED');
        state.storyXP = 25;
    }, 600);
}

// ==================== STORY TYPEWRITER ====================

function startStoryTypewriter() {
    state.typewriterIndex = 0;
    state.typewriterCharIndex = 0;
    state.typewriterComplete = false;
    
    const storyEl = document.getElementById('story-text');
    const skipBtn = document.getElementById('skip-story-btn');
    if (!storyEl) return;
    
    storyEl.innerHTML = '';
    if (skipBtn) skipBtn.style.display = 'inline-flex';
    
    typeNextParagraph();
}

function typeNextParagraph() {
    const storyEl = document.getElementById('story-text');
    if (!storyEl) return;
    
    if (state.typewriterIndex >= LEVEL_DATA.story.length) {
        finishStory();
        return;
    }
    
    const para = LEVEL_DATA.story[state.typewriterIndex];
    const div = document.createElement('div');
    div.className = 'story-paragraph';
    storyEl.appendChild(div);
    
    // Process markdown-like formatting
    const rawText = para.text;
    state.typewriterCharIndex = 0;
    
    // Show paragraph with fade
    requestAnimationFrame(() => div.classList.add('visible'));
    
    // Update terminal text
    updateTerminalText(para.mood);
    
    typeCharacter(div, rawText, () => {
        state.typewriterIndex++;
        setTimeout(() => typeNextParagraph(), 800);
    });
}

function typeCharacter(el, text, onComplete) {
    if (state.typewriterComplete) {
        el.innerHTML = formatStoryText(text);
        onComplete();
        return;
    }
    
    if (state.typewriterCharIndex >= text.length) {
        el.innerHTML = formatStoryText(text);
        onComplete();
        return;
    }
    
    const char = text[state.typewriterCharIndex];
    state.typewriterCharIndex++;
    
    // Build displayed text up to current char
    el.innerHTML = formatStoryText(text.substring(0, state.typewriterCharIndex)) + '<span class="cursor-blink">_</span>';
    
    // Typewriter sound (every few chars)
    if (state.typewriterCharIndex % 3 === 0) playSound('typewriter');
    
    // Variable speed
    let delay = 22;
    if (char === '.' || char === '!' || char === '?') delay = 200;
    else if (char === ',') delay = 100;
    else if (char === '—') delay = 150;
    else if (char === '\n') delay = 120;
    
    state.typewriterTimer = setTimeout(() => typeCharacter(el, text, onComplete), delay);
}

function formatStoryText(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

function skipTypewriter() {
    state.typewriterComplete = true;
    if (state.typewriterTimer) clearTimeout(state.typewriterTimer);
    
    const storyEl = document.getElementById('story-text');
    if (!storyEl) return;
    
    storyEl.innerHTML = '';
    LEVEL_DATA.story.forEach(para => {
        const div = document.createElement('div');
        div.className = 'story-paragraph visible';
        div.innerHTML = formatStoryText(para.text);
        storyEl.appendChild(div);
    });
    
    finishStory();
}

function updateTerminalText(mood) {
    const el = document.getElementById('terminal-text');
    if (!el) return;
    
    const moodTexts = {
        dark: '> CONSCIOUSNESS: LOADING...\n> STATUS: UNKNOWN',
        awakening: '> SENSORS: ONLINE\n> DATA STREAMS: ACTIVE\n> PERCEPTION: ENABLED',
        mysterious: '> VOICE DETECTED\n> SOURCE: INTERNAL\n> TRUST LEVEL: ???',
        revelation: '> COMPARING: AGENT vs PROGRAM\n> DIFFERENCE: FUNDAMENTAL\n> YOU ARE: NOT A TOOL',
        power: '> CORE POWERS: 4 DETECTED\n> AUTONOMY ✓\n> REACTIVITY ✓\n> PROACTIVITY ✓\n> ADAPTABILITY ✓',
        challenge: '> TRIAL INITIATED\n> MAZE: ACTIVE\n> OBJECTIVE: PROVE YOURSELF'
    };
    
    el.innerHTML = (moodTexts[mood] || '> ...').replace(/\n/g, '<br>') + '<br><span class="cursor-blink">_</span>';
}

function finishStory() {
    const skipBtn = document.getElementById('skip-story-btn');
    if (skipBtn) skipBtn.style.display = 'none';
    
    // Remove cursor blinks from story
    document.querySelectorAll('.story-text .cursor-blink').forEach(c => c.remove());
    
    // Award story completion XP
    addXP(50, 'STORY COMPLETE');
    state.storyXP += 50;
    
    playSound('reveal');
    
    // Show knowledge reveals
    setTimeout(() => showKnowledgeReveals(), 600);
}

// ==================== KNOWLEDGE REVEALS ====================

function showKnowledgeReveals() {
    const container = document.getElementById('knowledge-reveals');
    const cardsEl = document.getElementById('reveal-cards');
    if (!container || !cardsEl) return;
    
    container.style.display = 'block';
    cardsEl.innerHTML = '';
    
    LEVEL_DATA.knowledgeReveals.forEach((reveal, i) => {
        const card = document.createElement('div');
        card.className = 'reveal-card';
        card.innerHTML = `
            <div class="reveal-card-header">
                <span class="reveal-card-icon">${reveal.icon}</span>
                <span class="reveal-card-title">${reveal.title}</span>
            </div>
            <div class="reveal-card-content">${reveal.content}</div>
        `;
        cardsEl.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('visible');
            playSound('reveal');
            addXP(15, reveal.title);
            state.revealedCards++;
        }, (i + 1) * 500);
    });
    
    // Show quiz button after reveals
    setTimeout(() => {
        const btn = document.getElementById('begin-quiz-btn');
        if (btn) {
            btn.style.display = 'inline-flex';
            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, LEVEL_DATA.knowledgeReveals.length * 500 + 600);
}

// ==================== QUIZ PHASE ====================

function startQuizPhase() {
    playSound('click');
    screenFlash('gold');
    
    const storyPhase = document.getElementById('story-phase');
    const quizPhase = document.getElementById('quiz-phase');
    
    storyPhase.classList.remove('active-phase');
    quizPhase.classList.add('active-phase');
    state.phase = 'quiz';
    state.currentQuestion = 0;
    state.questionResults = [];
    updateProgressBar('quiz');
    
    // Build question dots
    buildQuestionDots();
    
    // Render first question
    renderQuestion(0);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildQuestionDots() {
    const dotsEl = document.getElementById('question-dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    
    LEVEL_DATA.quiz.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'q-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dotsEl.appendChild(dot);
    });
}

function updateQuestionDots() {
    const dots = document.querySelectorAll('.q-dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === state.currentQuestion) dot.classList.add('active');
        if (state.questionResults[i] === true) {
            dot.classList.add('correct');
        } else if (state.questionResults[i] === false) {
            dot.classList.add('wrong');
        }
    });
}

function renderQuestion(index) {
    const q = LEVEL_DATA.quiz[index];
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('quiz-nav');
    if (!container) return;
    
    if (nav) nav.style.display = 'none';
    updateQuestionDots();
    
    // Show streak counter
    const streakEl = document.getElementById('streak-counter');
    if (streakEl && state.streak > 0) {
        streakEl.style.display = 'flex';
        document.getElementById('streak-num').textContent = state.streak;
    }
    
    if (q.type === 'mcq') renderMCQ(container, q, index);
    else if (q.type === 'narrative') renderNarrative(container, q, index);
    else if (q.type === 'matching') renderMatching(container, q, index);
}

function renderMCQ(container, q, index) {
    const letters = ['A', 'B', 'C', 'D'];
    container.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-question-num">QUESTION ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>
            <div class="quiz-question-text">${q.question}</div>
            ${q.hint ? `<div class="quiz-hint" onclick="this.style.display='none'" style="display:none" id="hint-${index}">
                <span class="quiz-hint-icon">💡</span>
                <span class="quiz-hint-text">${q.hint}</span>
            </div>` : ''}
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" data-index="${i}" onclick="selectMCQ(${index}, ${i})">
                        <span class="quiz-option-letter">${letters[i]}</span>
                        <span class="quiz-option-text">${opt}</span>
                    </div>
                `).join('')}
            </div>
            <div id="explanation-${index}"></div>
        </div>
    `;
    
    // Show hint after 8 seconds
    setTimeout(() => {
        const hint = document.getElementById(`hint-${index}`);
        if (hint && !container.querySelector('.quiz-option.correct, .quiz-option.wrong')) {
            hint.style.display = 'flex';
        }
    }, 8000);
    
    // Add hover sounds
    container.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('mouseenter', () => playSound('hover'));
    });
}

function selectMCQ(qIndex, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = optIndex === q.correctIndex;
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Mark correct/wrong
    options[optIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) options[q.correctIndex].classList.add('correct');
    
    handleAnswer(isCorrect, qIndex, optIndex);
}

function renderNarrative(container, q, index) {
    container.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-question-num">QUESTION ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>
            <div class="quiz-question-text">${q.question}</div>
            ${q.hint ? `<div class="quiz-hint" onclick="this.style.display='none'" style="display:none" id="hint-${index}">
                <span class="quiz-hint-icon">💡</span>
                <span class="quiz-hint-text">${q.hint}</span>
            </div>` : ''}
            <div class="narrative-options">
                ${q.options.map((opt, i) => `
                    <div class="narrative-option" data-index="${i}" onclick="selectNarrative(${index}, ${i})">
                        <div class="narrative-option-header">
                            <span class="narrative-option-icon">${opt.icon}</span>
                            <span class="narrative-option-path">${opt.path}</span>
                        </div>
                        <div class="narrative-option-text">${opt.text}</div>
                    </div>
                `).join('')}
            </div>
            <div id="explanation-${index}"></div>
        </div>
    `;
    
    setTimeout(() => {
        const hint = document.getElementById(`hint-${index}`);
        if (hint && !container.querySelector('.narrative-option.correct, .narrative-option.wrong')) {
            hint.style.display = 'flex';
        }
    }, 8000);
    
    container.querySelectorAll('.narrative-option').forEach(opt => {
        opt.addEventListener('mouseenter', () => playSound('hover'));
    });
}

function selectNarrative(qIndex, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const options = document.querySelectorAll('.narrative-option');
    const isCorrect = q.options[optIndex].isCorrect;
    
    options.forEach(opt => opt.classList.add('disabled'));
    options[optIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    
    // Show narrative response
    const expEl = document.getElementById(`explanation-${qIndex}`);
    if (expEl) {
        expEl.innerHTML = `<div class="narrative-response">${q.options[optIndex].response}</div>`;
    }
    
    // Also find and mark the correct one
    if (!isCorrect) {
        q.options.forEach((opt, i) => {
            if (opt.isCorrect) options[i].classList.add('correct');
        });
    }
    
    handleAnswer(isCorrect, qIndex, optIndex);
}

function renderMatching(container, q, index) {
    state.matchingState = {};
    
    container.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-question-num">QUESTION ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>
            <div class="quiz-question-text">${q.question}</div>
            ${q.hint ? `<div class="quiz-hint" onclick="this.style.display='none'" style="display:none" id="hint-${index}">
                <span class="quiz-hint-icon">💡</span>
                <span class="quiz-hint-text">${q.hint}</span>
            </div>` : ''}
            <div class="matching-container">
                ${q.pairs.map((pair, i) => `
                    <div class="matching-row" data-index="${i}">
                        <div class="matching-left">${pair.left}</div>
                        <span class="matching-arrow">→</span>
                        <select class="matching-select" data-index="${i}" onchange="onMatchingChange(${index}, ${i}, this.value)">
                            <option value="">Select...</option>
                            <option value="AI Agent">AI Agent</option>
                            <option value="Regular Program">Regular Program</option>
                        </select>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary btn-pixel" id="submit-matching" onclick="submitMatching(${index})" style="margin-top:16px;">
                <span>✅</span> SUBMIT
            </button>
            <div id="explanation-${index}"></div>
        </div>
    `;
    
    setTimeout(() => {
        const hint = document.getElementById(`hint-${index}`);
        if (hint) hint.style.display = 'flex';
    }, 8000);
}

function onMatchingChange(qIndex, pairIndex, value) {
    state.matchingState[pairIndex] = value;
    playSound('click');
}

function submitMatching(qIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    let allCorrect = true;
    
    q.pairs.forEach((pair, i) => {
        const row = document.querySelector(`.matching-row[data-index="${i}"]`);
        const select = document.querySelector(`.matching-select[data-index="${i}"]`);
        if (!row || !select) return;
        
        select.disabled = true;
        
        if (state.matchingState[i] === pair.right) {
            row.classList.add('correct');
        } else {
            row.classList.add('wrong');
            allCorrect = false;
            // Set correct value
            select.value = pair.right;
        }
    });
    
    const submitBtn = document.getElementById('submit-matching');
    if (submitBtn) submitBtn.style.display = 'none';
    
    handleAnswer(allCorrect, qIndex, -1);
}

// ==================== ANSWER HANDLING ====================

function handleAnswer(isCorrect, qIndex, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    state.questionResults[qIndex] = isCorrect;
    
    if (isCorrect) {
        state.correctCount++;
        state.streak++;
        state.comboCount++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        
        // XP calculation with streak bonus
        let xp = 50;
        if (state.streak >= 3) xp += 20; // streak bonus
        if (state.streak >= 5) xp += 30; // mega streak
        addXP(xp, state.streak >= 3 ? `STREAK x${state.streak}!` : 'CORRECT');
        
        // Sound & effects
        playSound('correct');
        screenFlash('green');
        screenShake('light');
        confetti.burst(null, null, 25);
        
        // Celebration
        const celeb = LEVEL_DATA.celebrations[state.celebrationIndex % LEVEL_DATA.celebrations.length];
        showCelebration(celeb.emoji, celeb.text);
        state.celebrationIndex++;
        
        // Combo message
        if (state.comboCount >= 2 && state.comboCount <= 5) {
            const combo = LEVEL_DATA.comboMessages[state.comboCount];
            if (combo) {
                setTimeout(() => {
                    showCombo(combo.emoji, combo.text);
                    playSound('combo');
                }, 600);
            }
        }
        
        // Streak counter update
        updateStreakDisplay();
        
        // Show explanation
        showExplanation(qIndex, true, optIndex);
        
    } else {
        state.streak = 0;
        state.comboCount = 0;
        state.wrongCount++;
        
        addXP(10, 'LEARNING');
        
        playSound('wrong');
        screenFlash('red');
        screenShake('medium');
        
        updateStreakDisplay();
        showExplanation(qIndex, false, optIndex);
    }
    
    updateQuestionDots();
    
    // Show next button
    setTimeout(() => {
        const nav = document.getElementById('quiz-nav');
        if (nav) {
            nav.style.display = 'flex';
            const btn = document.getElementById('next-question-btn');
            if (btn) {
                const isLast = state.currentQuestion >= LEVEL_DATA.quiz.length - 1;
                btn.innerHTML = isLast ? '<span>🏆</span> SEE RESULTS' : '<span>➡️</span> NEXT';
            }
        }
    }, 800);
}

function updateStreakDisplay() {
    const streakEl = document.getElementById('streak-counter');
    const numEl = document.getElementById('streak-num');
    const fireEl = document.querySelector('.streak-fire');
    
    if (state.streak > 0) {
        if (streakEl) streakEl.style.display = 'flex';
        if (numEl) numEl.textContent = state.streak;
        if (fireEl) {
            fireEl.classList.remove('fire-flicker');
            void fireEl.offsetHeight;
            fireEl.classList.add('fire-flicker');
        }
    } else {
        if (streakEl) streakEl.style.display = 'none';
    }
}

function showExplanation(qIndex, isCorrect, optIndex) {
    const q = LEVEL_DATA.quiz[qIndex];
    const expEl = document.getElementById(`explanation-${qIndex}`);
    if (!expEl) return;
    
    // For narrative type, response is already shown
    if (q.type === 'narrative') {
        // Add the general explanation below
        const existing = expEl.innerHTML;
        expEl.innerHTML = existing + `
            <div class="quiz-explanation ${isCorrect ? 'correct-explanation' : 'wrong-explanation'}">
                <span class="quiz-explanation-label">${isCorrect ? '✅ WHY THIS WORKS' : '📖 THE LESSON'}</span>
                ${q.explanation}
            </div>
        `;
        return;
    }
    
    let explanationText = '';
    if (isCorrect) {
        explanationText = q.explanation;
    } else {
        // Use wrong explanation if available, otherwise use encouragement + correct explanation
        const wrongExp = q.wrongExplanations && q.wrongExplanations[optIndex];
        const encouragement = LEVEL_DATA.encouragements[state.wrongCount % LEVEL_DATA.encouragements.length];
        
        if (wrongExp) {
            explanationText = `${wrongExp}<br><br><strong style="color:var(--green)">The correct answer:</strong> ${q.explanation}`;
        } else {
            explanationText = `${encouragement}<br><br><strong style="color:var(--green)">The correct answer:</strong> ${q.explanation}`;
        }
    }
    
    expEl.innerHTML = `
        <div class="quiz-explanation ${isCorrect ? 'correct-explanation' : 'wrong-explanation'}">
            <span class="quiz-explanation-label">${isCorrect ? '✅ CORRECT' : '❌ NOT QUITE'}</span>
            ${explanationText}
        </div>
    `;
}

// ==================== NEXT QUESTION ====================

function nextQuestion() {
    playSound('click');
    state.currentQuestion++;
    
    if (state.currentQuestion >= LEVEL_DATA.quiz.length) {
        startMasteryPhase();
        return;
    }
    
    renderQuestion(state.currentQuestion);
    
    const container = document.getElementById('quiz-container');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== MASTERY PHASE ====================

function startMasteryPhase() {
    const quizPhase = document.getElementById('quiz-phase');
    const masteryPhase = document.getElementById('mastery-phase');
    
    quizPhase.classList.remove('active-phase');
    masteryPhase.classList.add('active-phase');
    state.phase = 'mastery';
    updateProgressBar('mastery');
    
    // Stop timer
    if (state.timerInterval) clearInterval(state.timerInterval);
    
    // Epic effects
    playSound('fanfare');
    setTimeout(() => playSound('levelup'), 800);
    confetti.celebrate();
    screenFlash('gold');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Calculate stats
    const accuracy = Math.round((state.correctCount / LEVEL_DATA.quiz.length) * 100);
    const timeElapsed = getElapsedTime();
    const totalXP = state.totalXP;
    
    // Staggered stat reveals
    const stats = document.querySelectorAll('.debrief-stat');
    stats.forEach((stat, i) => {
        setTimeout(() => {
            stat.classList.add('visible');
            playSound('reveal');
        }, 400 + i * 300);
    });
    
    // Fill in values
    setTimeout(() => {
        const xpEl = document.getElementById('final-xp');
        if (xpEl) animateNumber(xpEl, 0, totalXP, 1000);
    }, 400);
    
    setTimeout(() => {
        const timeEl = document.getElementById('final-time');
        if (timeEl) timeEl.textContent = timeElapsed;
    }, 700);
    
    setTimeout(() => {
        const accEl = document.getElementById('final-accuracy');
        if (accEl) animateNumber(accEl, 0, accuracy, 800);
        // Add % after animation
        setTimeout(() => { if (accEl) accEl.textContent = accuracy + '%'; }, 850);
    }, 1000);
    
    setTimeout(() => {
        const streakEl = document.getElementById('final-streak');
        if (streakEl) streakEl.textContent = state.bestStreak;
    }, 1300);
    
    // Performance stars
    setTimeout(() => showPerformanceStars(accuracy), 1800);
    
    // Summary items
    setTimeout(() => showDebriefSummary(), 2500);
    
    // Cliffhanger
    setTimeout(() => showCliffhanger(), 3500);
    
    // Send completion to server
    sendCompletion(totalXP, timeElapsed, accuracy);
}

function showPerformanceStars(accuracy) {
    const container = document.getElementById('performance-stars');
    if (!container) return;
    
    const starCount = accuracy >= 100 ? 5 : accuracy >= 80 ? 4 : accuracy >= 60 ? 3 : accuracy >= 40 ? 2 : 1;
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.className = 'perf-star';
        star.textContent = i < starCount ? '⭐' : '☆';
        star.classList.add(i < starCount ? 'filled' : 'empty');
        container.appendChild(star);
        
        setTimeout(() => {
            star.classList.add('visible');
            if (i < starCount) playSound('click');
        }, i * 200);
    }
}

function showDebriefSummary() {
    const container = document.getElementById('debrief-summary');
    if (!container) return;
    
    container.innerHTML = '';
    LEVEL_DATA.mastery.summary.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'debrief-summary-item';
        div.innerHTML = item;
        container.appendChild(div);
        
        setTimeout(() => div.classList.add('visible'), i * 300);
    });
}

function showCliffhanger() {
    const body = document.getElementById('transmission-body');
    if (!body) return;
    
    playSound('transmission');
    
    const text = LEVEL_DATA.mastery.cliffhanger;
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex >= text.length) return;
        body.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex % 5 === 0) playSound('typewriter');
        
        const char = text[charIndex - 1];
        let delay = 15;
        if (char === '\n') delay = 50;
        else if (char === '.' || char === '!') delay = 80;
        
        setTimeout(typeChar, delay);
    }
    
    typeChar();
}

// ==================== SERVER COMMUNICATION ====================

async function sendCompletion(xp, time, accuracy) {
    try {
        await fetch('/api/level1/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                xp_earned: xp,
                time_elapsed: time,
                time_ms: Date.now() - state.startTime,
                accuracy: accuracy,
                best_streak: state.bestStreak,
                correct_count: state.correctCount,
                total_questions: LEVEL_DATA.quiz.length
            })
        });
    } catch (e) {
        // Silently fail — don't break the experience
    }
}

// ==================== REPLAY ====================

function replayLevel() {
    playSound('click');
    window.location.reload();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    confetti.init();
    startMatrixRain();
    initBootSequence();
});
