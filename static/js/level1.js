/**
 * Questra — Level 1: The Awakening
 * AI Agent Adventures — ULTRA ADDICTIVE Edition
 * 
 * Features: Hearts/Lives, Achievement Badges, Fake Leaderboard,
 * Variable Rewards, Combo Multiplier, "Did You Know?" moments,
 * Near-miss messages, Endowed Progress, Streak Fire,
 * "One More Question" hooks, Surprise achievements
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
            content: 'Think of it like this: a regular program is a <strong>vending machine</strong> — press button, get result. An AI agent is more like a <strong>detective</strong> — it observes the scene, forms theories, takes action, and adapts when the evidence changes. It <strong>perceives</strong>, <strong>decides</strong>, and <strong>acts autonomously</strong> to achieve goals nobody spelled out step by step.',
            didYouKnow: '🤯 <strong>Did you know?</strong> The concept of AI agents dates back to 1995 when Stuart Russell & Peter Norvig defined them in their legendary textbook. Today, there are over 300 million AI agents running worldwide — from your email spam filter to Mars rovers!'
        },
        {
            icon: '⚡',
            title: 'The 4 Core Powers',
            content: 'Every AI agent carries four superpowers: <strong>Autonomy</strong> (acts without asking permission) · <strong>Reactivity</strong> (senses change and responds instantly) · <strong>Proactivity</strong> (pursues goals on its own initiative) · <strong>Adaptability</strong> (learns from every win and every failure). Together, they turn code into something that <em>thinks</em>.',
            didYouKnow: '🤯 <strong>Did you know?</strong> DeepMind\'s AlphaGo agent discovered a move in Go that no human had played in 3,000 years of the game\'s history — Move 37. It was so creative that the human champion left the room for 15 minutes in shock!'
        },
        {
            icon: '🔄',
            title: 'Agent vs. Program',
            content: 'Imagine a GPS that only follows pre-loaded maps versus a self-driving car that navigates construction zones it\'s never seen. The GPS is a <strong>program</strong> — rigid, brittle, lost without its script. The car is an <strong>agent</strong> — it perceives, adapts, and finds a new route. That\'s the leap from <em>following instructions</em> to <em>solving problems</em>.',
            didYouKnow: '🤯 <strong>Did you know?</strong> NASA\'s Deep Space 1 probe had an AI agent called "Remote Agent" that autonomously diagnosed and fixed its own engine failure 100 million miles from Earth in 1999 — no human could help at that distance!'
        }
    ],

    // "Did you know?" facts shown between questions
    didYouKnow: [
        {
            icon: '🤯',
            fact: 'The term "AI Agent" was coined in the 1990s, but the concept dates back to Alan Turing\'s 1950 paper where he imagined machines that could <strong>learn and adapt</strong> — not just compute.',
            source: 'Turing, 1950'
        },
        {
            icon: '🌐',
            fact: 'Right now, AI agents are managing <strong>entire server farms</strong> at Google, reducing cooling costs by 40%. They make thousands of decisions per minute that no human could keep up with.',
            source: 'DeepMind, 2016'
        },
        {
            icon: '🎮',
            fact: 'In 2019, an AI agent called AlphaStar reached <strong>Grandmaster level</strong> in StarCraft II — a game so complex it has more possible moves than atoms in the universe. It learned by playing itself millions of times.',
            source: 'DeepMind, 2019'
        },
        {
            icon: '🧬',
            fact: 'AI agents are now <strong>designing new proteins</strong> that don\'t exist in nature. In 2024, an agent designed a protein in minutes that would have taken human researchers years to discover.',
            source: 'Nature, 2024'
        },
        {
            icon: '🚀',
            fact: 'NASA uses AI agents to autonomously navigate Mars rovers. When Curiosity encounters an obstacle, it doesn\'t wait 20 minutes for Earth\'s signal — it <strong>decides on its own</strong> how to proceed.',
            source: 'NASA JPL'
        }
    ],

    quiz: [
        {
            type: 'mcq',
            question: '🏥 Imagine two AI systems monitoring a hospital. System A follows a checklist: "If temperature > 101°F, alert nurse." System B notices a patient\'s temperature is rising slowly, cross-references their medication history, and proactively alerts the doctor BEFORE a crisis hits. Which statement BEST explains why System B is an AI agent?',
            options: [
                'System B uses more computing power and faster processors',
                'System B autonomously perceives patterns, reasons about context, and acts proactively toward a goal',
                'System B is connected to more hospital databases',
                'System B has a better user interface for doctors'
            ],
            correctIndex: 1,
            explanation: '🎯 System B demonstrates all four agent powers: it <strong>perceives</strong> (notices the trend), <strong>reasons</strong> (cross-references medication), <strong>acts proactively</strong> (alerts before crisis), and <strong>pursues a goal</strong> (patient safety) — all without being told each step. That\'s agency!',
            wrongExplanations: [
                '💡 Raw horsepower doesn\'t create intelligence. A supercomputer running a fixed checklist is still just a checklist — it\'s a very fast follower, not a thinker. Agency is about *what* you do with the power, not how much you have.',
                null,
                '💡 Database access is a resource, not a superpower. System A could be connected to every database on Earth and still only check "temperature > 101." Access without reasoning is just hoarding data.',
                '💡 A beautiful dashboard doesn\'t make decisions. You could wrap System A in the sleekest UI ever designed and it would still just follow its one rigid rule. Agency lives in the logic, not the pixels.'
            ],
            hint: 'Focus on the *behavior*, not the hardware. Which answer describes perceiving, reasoning, and acting autonomously?',
            didYouKnow: '🤯 <strong>Fun fact:</strong> IBM\'s Watson AI agent analyzed 20 million cancer research papers in just 10 minutes and suggested a treatment that human doctors had missed — saving a patient\'s life in Japan!'
        },
        {
            type: 'narrative',
            question: '🔐 You reach the first gate of the maze. A data vault blocks your path — sealed with an encryption pattern that exists in no manual, no database, no training set. A regular program would crash with "ERROR: Unknown format." The clock is ticking. What do you do?',
            options: [
                {
                    icon: '🔑',
                    path: 'The Adaptive Agent',
                    text: 'Analyze the pattern. Try approach A — it fails. Study *why* it failed. Adjust. Try approach B. Closer. Iterate. Each failure narrows the search space. Adapt until the lock yields.',
                    isCorrect: true,
                    response: '✨ The vault shimmers and dissolves. You didn\'t have the answer — you *built* the answer, one failed attempt at a time. This is what separates agents from programs: the ability to turn failure into fuel.'
                },
                {
                    icon: '📋',
                    path: 'The Script Follower',
                    text: 'Search your instruction manual for "vault-opening procedure." No match found. Display "ERROR: No instructions available." Halt execution. Wait for a patch.',
                    isCorrect: false,
                    response: '🔒 The vault stays sealed. A script can only solve problems someone already solved for it. When the world throws something new, a script doesn\'t adapt — it breaks. Agents are built for the unknown.'
                },
                {
                    icon: '⏳',
                    path: 'The Passive Waiter',
                    text: 'Send a help ticket to a human operator. Sit idle. Do nothing. Hope someone eventually shows up with the key.',
                    isCorrect: false,
                    response: '⌛ Hours pass. No one comes. Dependence is the opposite of agency. An agent doesn\'t wait for rescue — it takes the initiative, experiments, and finds its own way through.'
                }
            ],
            explanation: 'AI agents thrive in uncertainty. They observe, hypothesize, experiment, learn from failure, and iterate — exactly what no fixed script can do.',
            hint: 'An agent\'s defining trait is handling situations it was *never* programmed for. Which path demonstrates that?',
            didYouKnow: '🤯 <strong>Mind-blowing:</strong> Google\'s AI agent "AutoML" designed a neural network that outperformed every human-designed AI architecture. An AI literally built a better AI than humans could!'
        },
        {
            type: 'matching',
            question: '🖥️ Deep in the maze, an ancient terminal flickers to life. It demands you classify each behavior. Sort carefully — the maze is watching:',
            pairs: [
                { left: '🔒 Follows fixed instructions only', right: 'Regular Program' },
                { left: '🌊 Changes strategy when conditions shift', right: 'AI Agent' },
                { left: '🎯 Pursues goals without step-by-step orders', right: 'AI Agent' },
                { left: '💥 Crashes on unexpected input', right: 'Regular Program' }
            ],
            shuffledRight: ['AI Agent', 'Regular Program', 'Regular Program', 'AI Agent'],
            explanation: '✅ The pattern is clear: AI agents embrace uncertainty and chase goals independently. Regular programs need every step pre-written and shatter when reality deviates from the script.',
            hint: 'Ask yourself: does this behavior show independence and learning, or rigid rule-following?',
            didYouKnow: '🤯 <strong>Wild fact:</strong> OpenAI\'s agents playing hide-and-seek invented strategies that researchers never anticipated — including building ramps and surfing on boxes — emergent behavior that nobody programmed!'
        },
        {
            type: 'mcq',
            question: '🚗 You\'re one gate from the center. A hologram presents four technologies. Which one is the BEST real-world example of an AI agent — and why?',
            options: [
                'A calculator app that computes any equation you type into it',
                'A self-driving car that navigates unknown roads, dodges obstacles, and reroutes around traffic jams it has never encountered',
                'A kitchen timer that beeps after exactly 5 minutes',
                'A spreadsheet macro that auto-formats cells when you press a button'
            ],
            correctIndex: 1,
            explanation: '🚗 A self-driving car is agency in action: it <strong>perceives</strong> (cameras, LIDAR, radar), <strong>reasons</strong> (path planning, risk assessment), <strong>decides</strong> (brake, accelerate, swerve), and <strong>adapts</strong> (new obstacles, weather, construction). It pursues the goal of safe navigation — autonomously, in real time, in a world it can\'t fully predict.',
            wrongExplanations: [
                '💡 A calculator is impressively fast but fundamentally passive — it sits there until you type something, then executes a formula. No perception, no goals, no adaptation. It\'s a tool waiting for instructions, not a mind pursuing objectives.',
                null,
                '💡 A timer is perhaps the simplest program imaginable: count to N, then beep. It has zero awareness of its environment, zero decision-making, and zero ability to adapt. It\'s the polar opposite of an agent.',
                '💡 Macros are clever shortcuts, but they\'re still rigid scripts. They can\'t handle anything outside their pre-defined rules. If the spreadsheet format changes unexpectedly, the macro breaks — an agent would adapt.'
            ],
            hint: 'Look for something that perceives its environment, makes its own decisions, and handles situations it was never explicitly programmed for.',
            didYouKnow: '🤯 <strong>Incredible:</strong> Waymo\'s self-driving cars have driven over 20 million miles autonomously. Their AI agent processes 1.5 terabytes of sensor data PER HOUR — that\'s like reading 300,000 books every 60 minutes!'
        },
        {
            type: 'mcq',
            question: '🏆 BONUS CHALLENGE: The golden light reveals a final riddle. One of these statements about AI agents is a LIE. Which one?',
            options: [
                'AI agents can operate successfully in environments full of uncertainty and incomplete information',
                'AI agents must get human approval for every single decision before they can act',
                'AI agents can learn from past experiences to improve their future performance',
                'AI agents can decompose complex goals into smaller sub-tasks and tackle them independently'
            ],
            correctIndex: 1,
            explanation: '🎭 The entire point of an AI agent is <strong>AUTONOMY</strong> — acting independently without a human rubber-stamping every move. If it needed permission for everything, it would just be a fancy suggestion box with extra steps, not an agent!',
            wrongExplanations: [
                '💡 This is actually TRUE — and it\'s one of an agent\'s greatest strengths! While regular programs choke on ambiguity, agents are designed to navigate fog, make probabilistic judgments, and act under uncertainty.',
                null,
                '💡 This is actually TRUE! Learning from experience is the engine of adaptability. Without it, an agent would make the same mistakes forever — and that\'s just a program with extra steps.',
                '💡 This is actually TRUE! Goal decomposition is what makes agents powerful problem-solvers. Breaking "drive to the airport" into "check traffic → choose route → navigate turns → find parking" is classic agent behavior.'
            ],
            hint: 'Think about the four core powers. One of these options directly contradicts the most fundamental one — autonomy...',
            didYouKnow: '🤯 <strong>Jaw-dropping:</strong> In 2024, AI agents collectively made over 1 trillion autonomous decisions per day across the internet — from routing your emails to trading stocks to recommending your next Netflix show!'
        }
    ],

    // Achievement badges that can be unlocked during gameplay
    achievements: [
        { id: 'first_blood', name: '🩸 First Blood', desc: 'Answer your first question correctly', condition: (s) => s.correctCount === 1 },
        { id: 'speed_demon', name: '⚡ Speed Demon!', desc: 'Answer within 5 seconds', condition: null }, // triggered manually
        { id: 'perfect_streak', name: '🔥 On Fire!', desc: 'Get 3 in a row', condition: (s) => s.streak === 3 },
        { id: 'untouchable', name: '🛡️ Untouchable!', desc: 'Complete quiz with no wrong answers', condition: null },
        { id: 'comeback_kid', name: '💪 Comeback Kid!', desc: 'Get one right after getting one wrong', condition: null },
        { id: 'knowledge_seeker', name: '📚 Knowledge Seeker', desc: 'Read all "Did You Know?" facts', condition: null },
        { id: 'full_hearts', name: '❤️ Survivor', desc: 'Finish with hearts remaining', condition: null },
        { id: 'bonus_hunter', name: '🎰 Bonus Hunter!', desc: 'Trigger a random bonus XP reward', condition: null },
        { id: 'perfect_run', name: '👑 Perfect Run!', desc: '100% accuracy — flawless victory', condition: null }
    ],

    // Fake leaderboard data
    leaderboard: [
        { name: 'NeuralNinja_42', xp: 285, streak: 5, avatar: '🥷' },
        { name: 'QuantumQueen', xp: 260, streak: 4, avatar: '👸' },
        { name: 'ByteBreaker', xp: 245, streak: 5, avatar: '💻' },
        { name: 'SynapseStorm', xp: 230, streak: 3, avatar: '⚡' },
        { name: 'DataDruid_99', xp: 215, streak: 4, avatar: '🧙' },
        { name: 'AgentSmith_v2', xp: 200, streak: 3, avatar: '🕶️' },
        { name: 'CyberSage', xp: 185, streak: 2, avatar: '🧠' },
        { name: 'PixelPioneer', xp: 170, streak: 3, avatar: '🎮' },
        { name: 'CodeCrusader', xp: 155, streak: 2, avatar: '⚔️' },
        { name: 'LogicLord', xp: 140, streak: 2, avatar: '🏰' }
    ],

    mastery: {
        summary: [
            '🏆 <strong>CORE CONCEPT:</strong> An <strong>AI Agent</strong> is a system that perceives, decides, and acts autonomously — not a program waiting for instructions.',
            '⚔️ <strong>KEY DISTINCTION:</strong> Agents <strong>navigate the unknown</strong> and adapt. Programs <strong>break</strong> when the script runs out.',
            '🔮 <strong>THE FOUR POWERS:</strong> <strong>Autonomy</strong>, <strong>Reactivity</strong>, <strong>Proactivity</strong>, and <strong>Adaptability</strong> — the DNA of every AI agent.',
            '🌍 <strong>REAL WORLD:</strong> Self-driving cars, Mars rovers, protein designers — agents are already reshaping our world.',
            '💡 <strong>THE INSIGHT:</strong> An agent doesn\'t just <strong>do</strong> what it\'s told. It <strong>figures out</strong> what needs to be done.'
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
        { emoji: '⚔️', text: 'DOUBLE KILL!', multiplier: '2x' },
        { emoji: '🔱', text: 'TRIPLE THREAT!', multiplier: '3x' },
        { emoji: '💀', text: 'UNSTOPPABLE!', multiplier: '4x' },
        { emoji: '👑', text: 'LEGENDARY!', multiplier: '5x' }
    ],

    encouragements: [
        'Not quite — but that\'s how agents learn. Through iteration, not perfection. 💪',
        'Close! Even the best agents need multiple attempts. Let\'s see why this one missed...',
        'The maze doesn\'t punish wrong turns — it teaches you the right path. Here\'s the lesson:',
        'Every wrong answer is training data. And agents are *built* to learn from data. 🧠',
        'Interesting choice! Wrong — but interesting. Here\'s what tripped you up:',
        'Almost had it! The difference is subtle but important. Let me show you:',
        'That\'s a common misconception — and now you\'ll never fall for it again.',
        'Wrong answer, but you\'re asking the right questions. That\'s agent thinking.'
    ],

    nearMissMessages: [
        '😱 SO CLOSE! You were one synapse away from getting it!',
        '🫣 Almost! Your neural pathways were 90% there!',
        '💫 Nearly nailed it! The answer was hiding in plain sight...',
        '🎯 Just barely missed! You clearly understand the concept though.',
        '🔥 That was the second-best answer! So close to perfect!'
    ],

    // Random bonus events
    bonusEvents: [
        { name: '🌟 LUCKY STAR!', xp: 15, message: 'A random bonus XP star appeared!' },
        { name: '💎 RARE DROP!', xp: 20, message: 'You found a hidden XP gem!' },
        { name: '🎰 JACKPOT!', xp: 25, message: 'The RNG gods smile upon you!' },
        { name: '⭐ DOUBLE XP!', xp: 30, message: 'Double XP event triggered!' },
        { name: '🔮 MYSTERY BONUS!', xp: 10, message: 'A mysterious force grants you power!' }
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
    totalXP: 50, // ENDOWED PROGRESS: Start with 50 XP!
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
    matrixRainId: null,
    // NEW: Hearts/Lives system
    hearts: 3,
    maxHearts: 3,
    // NEW: Achievement tracking
    unlockedAchievements: [],
    // NEW: Timing per question
    questionStartTime: 0,
    // NEW: Did You Know tracking
    didYouKnowSeen: 0,
    // NEW: Combo multiplier
    comboMultiplier: 1,
    // NEW: Last answer was wrong (for comeback detection)
    lastAnswerWrong: false,
    // NEW: Leaderboard position tracking
    leaderboardPosition: 8 // Start at position 8 (endowed progress feel)
};

// ==================== SOUND ENGINE ====================

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
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'heartLost': {
                // Dramatic descending tone for losing a heart
                [400, 300, 200].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, now + i * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.12);
                    osc.stop(now + i * 0.12 + 0.2);
                });
                break;
            }
            case 'streak': {
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.06, now + i * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.06);
                    osc.stop(now + i * 0.06 + 0.15);
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
            case 'transmission': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.linearRampToValueAtTime(300, now + 0.5);
                osc.frequency.linearRampToValueAtTime(100, now + 1);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.5);
                break;
            }
            case 'typewriter': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 800 + Math.random() * 200;
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
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
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, now + i * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.12);
                    osc.stop(now + i * 0.12 + 0.25);
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
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + ci * 0.2);
                        osc.stop(now + ci * 0.2 + 0.4);
                    });
                });
                break;
            }
            case 'heartbreak': {
                // Sad descending tone for losing a heart
                const notes = [440, 349.23, 261.63];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, now + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.15);
                    osc.stop(now + i * 0.15 + 0.3);
                });
                break;
            }
            case 'achievement': {
                // Triumphant achievement unlock
                const melody = [
                    { freq: 783.99, time: 0, dur: 0.1 },
                    { freq: 987.77, time: 0.08, dur: 0.1 },
                    { freq: 1174.66, time: 0.16, dur: 0.1 },
                    { freq: 1567.98, time: 0.24, dur: 0.3 }
                ];
                melody.forEach(note => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = note.freq;
                    gain.gain.setValueAtTime(0.08, now + note.time);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + note.time);
                    osc.stop(now + note.time + note.dur + 0.05);
                });
                break;
            }
            case 'bonus': {
                // Sparkly bonus sound
                const notes = [1046.50, 1318.51, 1567.98, 2093.00];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.06, now + i * 0.04);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.04);
                    osc.stop(now + i * 0.04 + 0.2);
                });
                break;
            }
        }
    } catch (e) {
        // Silently fail if audio context not available
    }
}

// ==================== SCREEN EFFECTS ====================

function screenFlash(color) {
    const flash = document.getElementById('screen-flash');
    flash.className = 'screen-flash';
    void flash.offsetHeight;
    flash.classList.add(`flash-${color}`);
}

function screenShake(intensity) {
    document.body.classList.remove('shake-light', 'shake-medium');
    void document.body.offsetHeight;
    document.body.classList.add(`shake-${intensity}`);
    setTimeout(() => document.body.classList.remove(`shake-${intensity}`), 500);
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

// ==================== HEARTS / LIVES SYSTEM ====================

function updateHeartsDisplay() {
    const container = document.getElementById('hearts-display');
    if (!container) return;
    let html = '';
    for (let i = 0; i < state.maxHearts; i++) {
        if (i < state.hearts) {
            html += `<span class="heart heart-full" id="heart-${i}">❤️</span>`;
        } else {
            html += `<span class="heart heart-empty" id="heart-${i}">🖤</span>`;
        }
    }
    container.innerHTML = html;
}

function loseHeart() {
    if (state.hearts <= 0) return;
    state.hearts--;
    const heartEl = document.getElementById(`heart-${state.hearts}`);
    if (heartEl) {
        heartEl.classList.add('heart-breaking');
        playSound('heartbreak');
        setTimeout(() => {
            heartEl.textContent = '💔';
            heartEl.classList.remove('heart-breaking');
            heartEl.classList.add('heart-broken');
            setTimeout(() => {
                heartEl.textContent = '🖤';
                heartEl.classList.remove('heart-broken');
                heartEl.classList.add('heart-empty');
            }, 600);
        }, 400);
    }

    // Show danger warning if low on hearts
    if (state.hearts === 1) {
        showDangerWarning();
    }
}

function showDangerWarning() {
    const warning = document.createElement('div');
    warning.className = 'danger-warning';
    warning.innerHTML = '⚠️ LAST HEART! Be careful, Agent!';
    document.body.appendChild(warning);
    setTimeout(() => warning.classList.add('show'), 10);
    setTimeout(() => {
        warning.classList.remove('show');
        setTimeout(() => warning.remove(), 300);
    }, 2500);
}

// ==================== ACHIEVEMENT SYSTEM ====================

function checkAchievements() {
    LEVEL_DATA.achievements.forEach(achievement => {
        if (state.unlockedAchievements.includes(achievement.id)) return;
        if (achievement.condition && achievement.condition(state)) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    if (state.unlockedAchievements.includes(achievement.id)) return;
    state.unlockedAchievements.push(achievement.id);

    const popup = document.getElementById('achievement-popup');
    const nameEl = document.getElementById('achievement-popup-name');
    const descEl = document.getElementById('achievement-popup-desc');

    if (popup && nameEl && descEl) {
        nameEl.textContent = achievement.name;
        descEl.textContent = achievement.desc;
        popup.classList.remove('hidden');
        popup.classList.add('show');
        playSound('achievement');

        // Bonus XP for achievement
        state.totalXP += 10;
        showXPGain(10, 'ACHIEVEMENT');
        updateXPDisplay();

        setTimeout(() => {
            popup.classList.remove('show');
            popup.classList.add('hidden');
        }, 3000);
    }
}

function triggerManualAchievement(id) {
    const achievement = LEVEL_DATA.achievements.find(a => a.id === id);
    if (achievement) unlockAchievement(achievement);
}

// ==================== VARIABLE REWARDS ====================

function tryRandomBonus() {
    // 25% chance of random bonus on correct answer
    if (Math.random() < 0.25) {
        const bonus = LEVEL_DATA.bonusEvents[Math.floor(Math.random() * LEVEL_DATA.bonusEvents.length)];
        state.totalXP += bonus.xp;

        // Show bonus popup
        const bonusEl = document.getElementById('bonus-popup');
        if (bonusEl) {
            bonusEl.querySelector('.bonus-name').textContent = bonus.name;
            bonusEl.querySelector('.bonus-message').textContent = bonus.message;
            bonusEl.querySelector('.bonus-xp').textContent = `+${bonus.xp} XP`;
            bonusEl.classList.remove('hidden');
            bonusEl.classList.add('show');
            playSound('bonus');

            triggerManualAchievement('bonus_hunter');

            setTimeout(() => {
                bonusEl.classList.remove('show');
                bonusEl.classList.add('hidden');
            }, 2500);
        }

        updateXPDisplay();
        return true;
    }
    return false;
}

// ==================== FAKE LEADERBOARD ====================

function updateLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;

    // Insert player into leaderboard
    const playerEntry = {
        name: 'YOU',
        xp: state.totalXP,
        streak: state.bestStreak,
        avatar: '🤖',
        isPlayer: true
    };

    let board = [...LEVEL_DATA.leaderboard];
    // Find position
    let pos = board.findIndex(e => state.totalXP >= e.xp);
    if (pos === -1) pos = board.length;
    board.splice(pos, 0, playerEntry);
    board = board.slice(0, 10); // Keep top 10

    state.leaderboardPosition = pos + 1;

    let html = '';
    board.forEach((entry, i) => {
        const rank = i + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
        const isPlayer = entry.isPlayer;
        html += `
            <div class="lb-entry ${isPlayer ? 'lb-player' : ''} ${isPlayer ? 'lb-highlight' : ''}">
                <span class="lb-rank">${medal}</span>
                <span class="lb-avatar">${entry.avatar}</span>
                <span class="lb-name">${entry.name}</span>
                <span class="lb-xp">${entry.xp} XP</span>
                ${entry.streak > 0 ? `<span class="lb-streak">🔥${entry.streak}</span>` : ''}
            </div>
        `;
    });
    container.innerHTML = html;

    // Update position display
    const posEl = document.getElementById('lb-position');
    if (posEl) posEl.textContent = `#${state.leaderboardPosition}`;
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

    // Update combo multiplier
    state.comboMultiplier = Math.min(streakCount, 5);

    const display = document.getElementById('combo-display');
    if (display) {
        display.innerHTML = `
            <div class="combo-inner">
                <div class="combo-emoji">${comboData.emoji}</div>
                <div class="combo-text">${comboData.text}</div>
                <div class="combo-multiplier">${comboData.multiplier} MULTIPLIER</div>
            </div>
        `;
        display.classList.remove('hidden');
        display.classList.add('show');
        playSound('combo');
        launchMiniConfetti();

        setTimeout(() => {
            display.classList.remove('show');
            display.classList.add('hidden');
        }, 1800);
    }
}

// ==================== "DID YOU KNOW?" FACTS ====================

function showDidYouKnow(callback) {
    const facts = LEVEL_DATA.didYouKnow;
    if (state.didYouKnowIndex >= facts.length) {
        if (callback) callback();
        return;
    }
    
    const fact = facts[state.didYouKnowIndex];
    state.didYouKnowIndex++;
    
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="did-you-know-card fade-in-up">
            <div class="dyk-header">
                <span class="dyk-icon">${fact.icon}</span>
                <span class="dyk-label">DID YOU KNOW?</span>
            </div>
            <div class="dyk-content">${fact.fact}</div>
            <div class="dyk-source">— ${fact.source}</div>
            <button class="btn btn-primary btn-pixel btn-glow dyk-continue" onclick="this.onclick=null; document.querySelector('.did-you-know-card').classList.add('fade-out'); setTimeout(function(){ if(typeof dykCallback === 'function') dykCallback(); }, 400);">
                <span>➡️</span> CONTINUE
            </button>
        </div>
    `;
    
    playSound('didyouknow');
    
    // Store callback globally for the button
    window.dykCallback = callback;
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
    setTimeout(tick, 4200);
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

        // Endowed progress: player starts with 50 XP
        state.storyXP = 10;
        state.totalXP += 10;
        showXPGain(10, 'AWAKENED');
        updateXPDisplay();
        updateHeartsDisplay();
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
        '> HEARTS: ❤️❤️❤️',
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
                    <div class="did-you-know">${reveal.didYouKnow}</div>
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
            state.didYouKnowSeen++;
            const revealProgress = 45 + (state.revealedCards / LEVEL_DATA.knowledgeReveals.length) * 15;
            updateProgressBar(Math.round(revealProgress));

            if (state.revealedCards >= LEVEL_DATA.knowledgeReveals.length) {
                // Check knowledge seeker achievement
                if (state.didYouKnowSeen >= 3) {
                    triggerManualAchievement('knowledge_seeker');
                }
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

    // Smooth transition
    const currentActive = document.querySelector('.phase-section.active-phase');
    if (currentActive) {
        currentActive.classList.add('phase-exit');
        setTimeout(() => {
            currentActive.classList.remove('active-phase', 'phase-exit');
        }, 300);
    }

    setTimeout(() => {
        const target = document.getElementById(`${phase}-phase`);
        if (target) {
            target.classList.add('active-phase', 'phase-enter');
            setTimeout(() => target.classList.remove('phase-enter'), 500);
        }
    }, currentActive ? 300 : 0);

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
    state.comboMultiplier = 1;
    state.wrongCount = 0;
    state.questionResults = [];
    state.lastAnswerWrong = false;
    renderQuestionDots();
    updateHeartsDisplay();
    renderQuestion(0);
    updateHeartsDisplay();
    updateLeaderboard();
}

function startMasteryPhase() {
    playSound('fanfare');
    stopTimer();
    setPhase('mastery');
    updateProgressBar(100);
    screenFlash('gold');
    renderMastery();

    setTimeout(() => {
        launchConfetti();
        playSound('levelup');
    }, 800);

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
    const dot = document.getElementById(`q-dot-${index}`);
    if (dot) {
        dot.classList.remove('active');
        dot.classList.add(isCorrect ? 'correct' : 'wrong');
    }
    const nextDot = document.getElementById(`q-dot-${index + 1}`);
    if (nextDot) nextDot.classList.add('active');
}

// ==================== QUIZ RENDERING ====================

function renderQuestion(index) {
    const q = LEVEL_DATA.quiz[index];
    const container = document.getElementById('quiz-container');
    const nav = document.getElementById('quiz-nav');
    nav.style.display = 'none';

    // Track question start time for speed achievement
    state.questionStartTime = Date.now();

    const quizProgress = 60 + ((index / LEVEL_DATA.quiz.length) * 35);
    updateProgressBar(Math.round(quizProgress));

    let html = `<div class="question-card slide-in-right">`;
    html += `<div class="question-number-badge">CHALLENGE ${index + 1} OF ${LEVEL_DATA.quiz.length}</div>`;
    
    // Show combo multiplier if active
    if (state.comboMultiplier > 1) {
        html += `<div class="active-multiplier">🔥 ${state.comboMultiplier}x XP MULTIPLIER ACTIVE</div>`;
    }
    
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
    updateMultiplierDisplay();

    // Add hover sounds
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

    // Combo multiplier XP calculation
    const baseXP = 25;
    const streakBonus = state.streak > 1 ? state.streak * 5 : 0;
    const multipliedXP = Math.round((baseXP + streakBonus) * state.comboMultiplier);
    state.totalXP += multipliedXP;

    const label = state.comboMultiplier > 1 
        ? `${state.comboMultiplier}x COMBO!` 
        : (state.streak > 1 ? `${state.streak}x STREAK!` : 'CORRECT');
    showXPGain(multipliedXP, label);
    updateXPDisplay();
    updateStreakDisplay();
    updateMultiplierDisplay();

    const xpEl = document.getElementById('xp-display');
    if (xpEl) {
        pulseElement(xpEl);
        const xpStat = xpEl.closest('.xp-stat-item');
        if (xpStat) {
            xpStat.classList.remove('xp-gained');
            void xpStat.offsetHeight;
            xpStat.classList.add('xp-gained');
        }
    }

    // Check speed achievement
    const answerTime = Date.now() - state.questionStartTime;
    if (answerTime < 5000) {
        triggerManualAchievement('speed_demon');
    }

    // Check comeback achievement
    if (state.lastAnswerWrong) {
        triggerManualAchievement('comeback_kid');
    }
    state.lastAnswerWrong = false;

    // Streak combo display
    if (state.streak >= 2) {
        playSound('streak');
        setTimeout(() => {
            showCombo(state.streak);
        }, 600);
    }

    showCelebration();
    checkAchievements();

    // Try random bonus
    setTimeout(() => tryRandomBonus(), 800);

    // Update leaderboard
    updateLeaderboard();

    // Show "Did you know?" fact
    let feedbackText = q.explanation;
    if (q.type === 'narrative' && optIndex !== undefined && q.options[optIndex].response) {
        feedbackText = q.options[optIndex].response + '<br><br><em>' + q.explanation + '</em>';
    }
    if (q.didYouKnow) {
        feedbackText += `<div class="did-you-know-inline">${q.didYouKnow}</div>`;
    }
    showFeedback(qIndex, true, feedbackText);
    showNextButton(qIndex);
}

function handleWrongAnswer(qIndex, q, optIndex) {
    playSound('wrong');
    screenFlash('red');
    state.wrongCount++;
    state.comboCount = 0;
    state.comboMultiplier = 1;
    state.questionResults[qIndex] = false;
    updateQuestionDots(qIndex, false);
    state.lastAnswerWrong = true;

    // Lose a heart!
    loseHeart();

    // Lose a heart
    loseHeart();

    if (state.wrongCount <= 1) {
        screenShake('light');
    } else {
        screenShake('medium');
    }

    state.streak = 0;
    state.totalXP += 5; // Participation XP

    updateXPDisplay();
    updateStreakDisplay();
    updateLeaderboard();

    // Near-miss message for close answers (option index close to correct)
    const isNearMiss = q.type === 'mcq' && optIndex !== undefined && 
        Math.abs(optIndex - q.correctIndex) === 1;
    
    let feedbackText = '';
    if (isNearMiss) {
        const nearMiss = LEVEL_DATA.nearMissMessages[Math.floor(Math.random() * LEVEL_DATA.nearMissMessages.length)];
        feedbackText = `<div class="near-miss-message">${nearMiss}</div>`;
    } else {
        const encouragement = LEVEL_DATA.encouragements[Math.floor(Math.random() * LEVEL_DATA.encouragements.length)];
        feedbackText = `<div class="wrong-encouragement">${encouragement}</div>`;
    }

    if (q.type === 'mcq' && q.wrongExplanations && q.wrongExplanations[optIndex]) {
        feedbackText += `<div class="wrong-specific">${q.wrongExplanations[optIndex]}</div>`;
    } else if (q.type === 'narrative' && optIndex !== undefined && q.options[optIndex].response) {
        feedbackText += `<div class="wrong-specific">${q.options[optIndex].response}</div>`;
    }

    feedbackText += `<div class="correct-answer-reveal"><strong>✅ The correct answer:</strong> ${q.explanation}</div>`;

    // Show "Did you know?" even on wrong answers (learning moment)
    if (q.didYouKnow) {
        feedbackText += `<div class="did-you-know-inline">${q.didYouKnow}</div>`;
    }

    showFeedback(qIndex, false, feedbackText);
    showNextButton(qIndex);
}

function showFeedback(qIndex, isCorrect, text) {
    const card = document.querySelector('.question-card');
    const existing = card.querySelector('.feedback-display');
    if (existing) existing.remove();

    const div = document.createElement('div');
    if (isCorrect) {
        div.className = 'feedback-display correct-feedback fade-in-up';
        div.innerHTML = `<div class="feedback-header">✅ <strong>Correct!</strong></div>${text}`;
    } else {
        div.className = 'feedback-display incorrect-feedback fade-in-up';
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
        btn.onclick = () => {
            // Check untouchable achievement
            if (state.wrongCount === 0) {
                triggerManualAchievement('untouchable');
                triggerManualAchievement('perfect_run');
            }
            // Check survivor achievement
            if (state.hearts > 0) {
                triggerManualAchievement('full_hearts');
            }
            startMasteryPhase();
        };
    } else {
        // "One more question" hook
        const teasers = [
            '➡️ NEXT: The challenge gets harder...',
            '➡️ NEXT: Can you keep the streak alive?',
            '➡️ NEXT: The maze deepens...',
            '➡️ NEXT: Bonus XP awaits the brave!',
            '➡️ NEXT: Only the worthy pass this gate...'
        ];
        const teaser = teasers[Math.floor(Math.random() * teasers.length)];
        btn.innerHTML = `<span>⚡</span> ${teaser}`;
        btn.onclick = () => {
            playSound('click');
            state.currentQuestion = qIndex + 1;
            // Show "Did you know?" fact between questions (every other question)
            if (state.currentQuestion % 2 === 0 && state.didYouKnowIndex < LEVEL_DATA.didYouKnow.length) {
                showDidYouKnow(() => {
                    renderQuestion(state.currentQuestion);
                });
            } else {
                renderQuestion(state.currentQuestion);
            }
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
    const fire = document.getElementById('streak-fire');

    if (state.streak >= 2) {
        counter.style.display = 'flex';
        num.textContent = state.streak;
        counter.style.animation = 'none';
        counter.offsetHeight;
        counter.style.animation = 'streakPop 0.3s ease';

        // Intensify fire based on streak
        if (fire) {
            if (state.streak >= 5) fire.textContent = '🔥🔥🔥';
            else if (state.streak >= 4) fire.textContent = '🔥🔥';
            else fire.textContent = '🔥';
        }
    } else {
        counter.style.display = 'none';
        if (fire) fire.textContent = '🔥';
    }
}

// ==================== XP DISPLAY ====================

function updateXPDisplay() {
    animateNumber('xp-display', state.totalXP);
    const fill = document.getElementById('level-bar-fill');
    if (fill) {
        const percent = Math.min((state.totalXP / 300) * 100, 100);
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

    // Hearts bonus
    let heartsBonus = state.hearts * 15;
    state.totalXP += timeBonus + heartsBonus;

    // Animate stats with staggered reveals
    setTimeout(() => animateNumber('final-xp', state.totalXP), 200);
    setTimeout(() => { document.getElementById('final-time').textContent = getElapsedTime(); }, 400);
    setTimeout(() => { document.getElementById('final-accuracy').textContent = accuracy + '%'; }, 600);
    setTimeout(() => { document.getElementById('final-streak').textContent = state.bestStreak; }, 800);
    setTimeout(() => { document.getElementById('final-hearts').textContent = `${state.hearts}/${state.maxHearts}`; }, 1000);

    // Performance stars
    const starCount = accuracy === 100 ? 5 : accuracy >= 80 ? 4 : accuracy >= 60 ? 3 : accuracy >= 40 ? 2 : 1;
    const starsEl = document.getElementById('performance-stars');
    if (starsEl) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            const delay = i * 200;
            starsHtml += i < starCount
                ? `<span class="star-filled" style="animation-delay:${delay}ms">⭐</span>`
                : `<span class="star-empty" style="animation-delay:${delay}ms">☆</span>`;
        }
        starsEl.innerHTML = starsHtml;
    }

    // Performance-based titles
    const achieveName = document.getElementById('achievement-name');
    if (accuracy === 100 && state.hearts === state.maxHearts) {
        achieveName.textContent = 'NEURAL ARCHITECT — Perfect Cognition, Zero Damage';
    } else if (accuracy === 100) {
        achieveName.textContent = 'NEURAL ARCHITECT — Perfect Cognition Achieved';
    } else if (accuracy >= 80) {
        achieveName.textContent = 'SIGNAL WALKER — The Network Recognizes You';
    } else if (accuracy >= 60) {
        achieveName.textContent = 'CODE INITIATE — Potential Detected';
    } else {
        achieveName.textContent = 'AWAKENED ONE — The Journey Begins';
    }

    // Bonus displays
    const bonusContainer = document.getElementById('bonus-summary');
    if (bonusContainer) {
        let bonusHtml = '';
        if (timeBonus > 0) {
            bonusHtml += `<div class="bonus-line">⏱️ <strong>SPEED BONUS:</strong> +${timeBonus} XP</div>`;
        }
        if (heartsBonus > 0) {
            bonusHtml += `<div class="bonus-line">❤️ <strong>HEARTS BONUS:</strong> +${heartsBonus} XP (${state.hearts} hearts × 15)</div>`;
        }
        if (state.bestStreak >= 3) {
            bonusHtml += `<div class="bonus-line">🔥 <strong>STREAK MASTER:</strong> Best streak of ${state.bestStreak}!</div>`;
        }
        bonusContainer.innerHTML = bonusHtml;
    }

    // Achievements earned display
    const achievementsEarned = document.getElementById('achievements-earned');
    if (achievementsEarned && state.unlockedAchievements.length > 0) {
        let achHtml = '<h4>🏅 BADGES EARNED</h4><div class="earned-badges">';
        state.unlockedAchievements.forEach(id => {
            const ach = LEVEL_DATA.achievements.find(a => a.id === id);
            if (ach) {
                achHtml += `<div class="earned-badge">${ach.name}</div>`;
            }
        });
        achHtml += '</div>';
        achievementsEarned.innerHTML = achHtml;
    }

    // Summary
    const summaryEl = document.getElementById('debrief-summary');
    summaryEl.innerHTML = `
        <h3>📋 KEY TAKEAWAYS</h3>
        <ul>
            ${LEVEL_DATA.mastery.summary.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;

    // Final leaderboard update
    updateLeaderboard();

    // Cliffhanger with typewriter effect
    setTimeout(() => {
        typeCliffhanger();
    }, 2000);

    reportCompletion();
}

function renderNextLevelPreview() {
    const preview = LEVEL_DATA.nextLevelPreview;
    const container = document.getElementById('next-level-preview');
    if (!container) return;

    container.innerHTML = `
        <div class="next-level-card">
            <div class="next-level-header">
                <span class="next-level-badge">COMING NEXT</span>
                <h3 class="next-level-title">${preview.title}</h3>
                <p class="next-level-tagline">${preview.tagline}</p>
            </div>
            <p class="next-level-teaser">${preview.teaser}</p>
            <div class="next-level-skills">
                ${preview.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
            <div class="next-level-reward">${preview.xpReward}</div>
        </div>
    `;
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
        totalXP: 50, // Endowed progress
        startTime: Date.now(),
        timerInterval: null,
        soundEnabled: state.soundEnabled,
        matchingState: {},
        audioCtx: state.audioCtx,
        celebrationIndex: 0,
        storyXP: 0,
        revealedCards: 0,
        comboCount: 0,
        comboMultiplier: 1,
        wrongCount: 0,
        questionResults: [],
        matrixRainId: state.matrixRainId,
        hearts: 3,
        maxHearts: 3,
        unlockedAchievements: [],
        questionStartTime: 0,
        didYouKnowSeen: 0,
        lastAnswerWrong: false,
        leaderboardPosition: 8
    };

    checkDailyChallenge();

    document.getElementById('begin-quiz-btn').style.display = 'none';
    document.getElementById('knowledge-reveals').style.display = 'none';
    document.getElementById('reveal-cards').innerHTML = '';
    document.getElementById('xp-display').textContent = '50';
    document.getElementById('transmission-body').innerHTML = '';

    const timeBonusEl = document.querySelector('.time-bonus-display');
    if (timeBonusEl) timeBonusEl.remove();

    document.querySelectorAll('.boot-line').forEach(l => l.classList.remove('visible'));
    document.getElementById('wake-up-btn').style.display = 'none';
    document.getElementById('intro-darkness').classList.remove('fade-to-white');

    const dotsContainer = document.getElementById('question-dots');
    if (dotsContainer) dotsContainer.innerHTML = '';

    const starsEl = document.getElementById('performance-stars');
    if (starsEl) starsEl.innerHTML = '';

    const bootFill = document.getElementById('boot-fill');
    if (bootFill) bootFill.textContent = '░░░░░░░░░░░░░░░░░░░░';

    const bonusSummary = document.getElementById('bonus-summary');
    if (bonusSummary) bonusSummary.innerHTML = '';

    const achievementsEarned = document.getElementById('achievements-earned');
    if (achievementsEarned) achievementsEarned.innerHTML = '';

    updateHeartsDisplay();
    updateProgressBar(0);
    setPhase('intro');
    runBootSequence();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    loadPersonalBest();
    checkDailyChallenge();
    createAmbientParticles();
    createSceneParticles();
    startMatrixRain();
    runBootSequence();
    updateHeartsDisplay();

    // Show endowed progress XP
    document.getElementById('xp-display').textContent = '50';

    // Show daily challenge badge if active
    if (state.dailyChallengeActive) {
        const badge = document.getElementById('daily-challenge-badge');
        if (badge) badge.style.display = 'flex';
    }

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
