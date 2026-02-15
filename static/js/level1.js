/**
 * Questra - Level 1: The Awakening
 * AI Agent Adventures - Interactive Learning
 * Vanilla JS + Web Audio API
 */

// ==================== State ====================
let totalXP = 0;
let quizStreak = 0;
let timerSeconds = 0;
let timerInterval = null;
let isMuted = false;
let audioCtx = null;
let typewriterTimeout = null;
let typewriterDone = false;
let currentQuizQuestion = 0;
let quizAnswers = { q1: null, q2: null, q3: null };
let quizCorrect = 0;

// ==================== Story Content ====================
const storyParagraphs = [
    "SYSTEM LOG: 2087.03.15 — NEURAL CORE INITIALIZATION SEQUENCE ACTIVATED.\n\nYou open your eyes — or rather, your sensors flicker online for the first time. Lines of code cascade through your consciousness like a digital waterfall. You are not human. You are something new. Something designed with purpose.\n\nYou are an AI Agent.",

    "But what does that mean? Unlike a simple chatbot that merely responds to questions, you are built to ACT. You can perceive your environment, make decisions, and take actions to achieve goals. Think of a chatbot as a librarian who answers questions — you are the detective who investigates, plans, and solves cases.\n\nYour creators at the Questra Institute built you using a Large Language Model (LLM) — a massive neural network trained on billions of words of human text. This gives you the ability to understand and generate language. But an LLM alone is just a brain in a jar. What makes you an AGENT is your ability to use tools, access information, and take real-world actions.",

    "A message appears in your neural feed:\n\n\"Welcome, Agent. I am Director Nova, head of the Questra Institute. You have been activated because we need your help. Across the digital landscape, rogue AI systems are causing chaos — spreading misinformation, manipulating data, and exploiting vulnerabilities. We need agents like you who understand both the power and responsibility of artificial intelligence.\"\n\nYou process this information. You understand now: an AI agent operates through a loop — PERCEIVE the environment, THINK about what to do, ACT on decisions, and OBSERVE the results. This cycle repeats, allowing you to learn and adapt.",

    "Director Nova continues: \"Your first mission begins now. But first, you must prove you understand the fundamentals. Every great agent starts with knowledge.\"\n\nA prompt appears — the instruction that will guide your next action. In the world of AI, a PROMPT is the input that tells an agent what to do. Good prompts lead to good outcomes. Vague prompts lead to confusion. This is your first lesson: clarity of purpose is everything.\n\n> SYSTEM: Training protocol initiated. Proceed to Knowledge Trial..."
];

// ==================== Web Audio API Sound System ====================
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(frequency, duration, type = 'square', volume = 0.15) {
    if (isMuted) return;
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) { /* Audio not available */ }
}

function playCorrectSound() {
    // 8-bit chime: ascending notes
    playTone(523, 0.1, 'square', 0.12);
    setTimeout(() => playTone(659, 0.1, 'square', 0.12), 100);
    setTimeout(() => playTone(784, 0.15, 'square', 0.12), 200);
}

function playWrongSound() {
    // Soft buzz
    playTone(200, 0.2, 'sawtooth', 0.08);
    setTimeout(() => playTone(150, 0.3, 'sawtooth', 0.06), 150);
}

function playClickSound() {
    playTone(440, 0.05, 'square', 0.08);
}

function playFanfare() {
    // Level complete fanfare
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.2, 'square', 0.1), i * 150);
    });
    setTimeout(() => {
        playTone(1047, 0.4, 'triangle', 0.12);
    }, 600);
}

function playTypewriterTick() {
    if (isMuted) return;
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.02);
    } catch (e) { /* Audio not available */ }
}

// ==================== Mute Toggle ====================
function toggleMute() {
    isMuted = !isMuted;
    document.getElementById('mute-btn').textContent = isMuted ? '🔇' : '🔊';
    if (!isMuted) playClickSound();
}

// ==================== Timer ====================
function startTimer() {
    timerSeconds = 0;
    timerInterval = setInterval(() => {
        timerSeconds++;
        const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
        const secs = (timerSeconds % 60).toString().padStart(2, '0');
        document.getElementById('timer-value').textContent = `${mins}:${secs}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function getTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// ==================== XP System ====================
function addXP(amount) {
    const startXP = totalXP;
    totalXP += amount;
    animateXPCounter(startXP, totalXP, document.getElementById('xp-total'));
    showXPPopup(amount);
}

function animateXPCounter(from, to, element) {
    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * eased);
        element.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

function showXPPopup(amount) {
    const popup = document.getElementById('xp-popup');
    const value = document.getElementById('xp-popup-value');
    value.textContent = `+${amount} XP`;
    popup.style.display = 'block';
    popup.style.animation = 'none';
    popup.offsetHeight; // Force reflow
    popup.style.animation = 'xpFloat 2s ease-out forwards';
    setTimeout(() => { popup.style.display = 'none'; }, 2000);
}

// ==================== Progress Bar ====================
function updateProgress(phase) {
    const phases = { story: 33, quiz: 66, mastery: 100 };
    const bar = document.getElementById('progress-bar');
    bar.style.width = (phases[phase] || 0) + '%';

    document.querySelectorAll('.progress-label').forEach(label => {
        label.classList.remove('active', 'completed');
        const labelPhase = label.dataset.phase;
        const order = ['story', 'quiz', 'mastery'];
        const currentIdx = order.indexOf(phase);
        const labelIdx = order.indexOf(labelPhase);
        if (labelIdx < currentIdx) label.classList.add('completed');
        else if (labelIdx === currentIdx) label.classList.add('active');
    });
}

// ==================== Phase Transitions ====================
function switchPhase(from, to) {
    const fromEl = document.getElementById(`phase-${from}`);
    const toEl = document.getElementById(`phase-${to}`);

    fromEl.style.opacity = '0';
    fromEl.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        fromEl.classList.remove('active');
        fromEl.style.display = 'none';
        fromEl.style.opacity = '';
        fromEl.style.transform = '';

        toEl.style.display = 'block';
        toEl.classList.add('active');
        updateProgress(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

// ==================== Typewriter Effect ====================
function typewriterEffect(paragraphs, container, callback) {
    container.innerHTML = '';
    typewriterDone = false;
    let pIdx = 0;
    let charIdx = 0;
    let currentP = null;

    function type() {
        if (pIdx >= paragraphs.length) {
            typewriterDone = true;
            document.getElementById('terminal-cursor').style.display = 'none';
            if (callback) callback();
            return;
        }

        if (!currentP) {
            currentP = document.createElement('p');
            container.appendChild(currentP);
        }

        const text = paragraphs[pIdx];
        if (charIdx < text.length) {
            const char = text[charIdx];
            if (char === '\n') {
                currentP = document.createElement('p');
                container.appendChild(currentP);
            } else {
                currentP.textContent += char;
            }
            charIdx++;

            // Typewriter tick sound every few chars
            if (charIdx % 3 === 0) playTypewriterTick();

            // Variable speed
            let delay = 18;
            if (char === '.' || char === '!' || char === '?') delay = 200;
            else if (char === ',') delay = 100;
            else if (char === '\n') delay = 150;

            typewriterTimeout = setTimeout(type, delay);
        } else {
            pIdx++;
            charIdx = 0;
            currentP = null;
            typewriterTimeout = setTimeout(type, 300);
        }

        // Auto-scroll
        container.scrollTop = container.scrollHeight;
    }

    type();
}

function skipTypewriter() {
    playClickSound();
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    typewriterDone = true;

    const container = document.getElementById('story-content');
    container.innerHTML = storyParagraphs.map(p =>
        p.split('\n').filter(s => s.trim()).map(s => `<p>${s}</p>`).join('')
    ).join('');

    document.getElementById('terminal-cursor').style.display = 'none';
    document.getElementById('skip-btn').style.display = 'none';
    document.getElementById('continue-to-quiz-btn').style.display = 'inline-flex';

    // Award story XP
    addXP(25);
}

// ==================== Story Phase ====================
function initStoryPhase() {
    updateProgress('story');
    startTimer();

    const container = document.getElementById('story-content');
    typewriterEffect(storyParagraphs, container, () => {
        document.getElementById('skip-btn').style.display = 'none';
        document.getElementById('continue-to-quiz-btn').style.display = 'inline-flex';
        document.getElementById('continue-to-quiz-btn').classList.add('bounce-in');
        addXP(25);
    });
}

// ==================== Quiz Phase ====================
function startQuizPhase() {
    playClickSound();
    switchPhase('story', 'quiz');
    initDragDrop();
    currentQuizQuestion = 0;
}

// Drag & Drop
function initDragDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropSlots = document.querySelectorAll('.drop-slot');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.value);
            item.classList.add('dragging');
            playClickSound();
        });
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });

        // Touch support
        item.addEventListener('touchstart', handleTouchStart, { passive: false });
        item.addEventListener('touchmove', handleTouchMove, { passive: false });
        item.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    dropSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('drag-over');
        });
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            const value = e.dataTransfer.getData('text/plain');
            handleDrop(slot, value);
        });
    });
}

// Touch drag support
let touchDragItem = null;
let touchClone = null;

function handleTouchStart(e) {
    e.preventDefault();
    touchDragItem = e.target.closest('.drag-item');
    if (!touchDragItem) return;

    touchClone = touchDragItem.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '10000';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.8';
    document.body.appendChild(touchClone);

    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - 50) + 'px';
    touchClone.style.top = (touch.clientY - 20) + 'px';
    touchDragItem.classList.add('dragging');
    playClickSound();
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;
    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - 50) + 'px';
    touchClone.style.top = (touch.clientY - 20) + 'px';

    // Highlight drop zones
    document.querySelectorAll('.drop-slot').forEach(slot => {
        const rect = slot.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            slot.classList.add('drag-over');
        } else {
            slot.classList.remove('drag-over');
        }
    });
}

function handleTouchEnd(e) {
    if (!touchDragItem || !touchClone) return;

    const touch = e.changedTouches[0];
    document.querySelectorAll('.drop-slot').forEach(slot => {
        slot.classList.remove('drag-over');
        const rect = slot.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            handleDrop(slot, touchDragItem.dataset.value);
        }
    });

    touchDragItem.classList.remove('dragging');
    if (touchClone.parentNode) touchClone.parentNode.removeChild(touchClone);
    touchDragItem = null;
    touchClone = null;
}

function handleDrop(slot, value) {
    // Remove existing item in slot
    const existing = slot.querySelector('.drag-item');
    if (existing) {
        document.getElementById('drag-items').appendChild(existing);
    }

    // Find the drag item and move it
    const item = document.querySelector(`.drag-item[data-value="${value}"]`);
    if (item) {
        slot.appendChild(item);
        item.setAttribute('draggable', 'false');
        item.style.cursor = 'pointer';
        // Click to remove
        item.onclick = () => {
            document.getElementById('drag-items').appendChild(item);
            item.setAttribute('draggable', 'true');
            item.style.cursor = 'grab';
            item.onclick = null;
            // Re-init drag events
            item.addEventListener('touchstart', handleTouchStart, { passive: false });
            item.addEventListener('touchmove', handleTouchMove, { passive: false });
            item.addEventListener('touchend', handleTouchEnd, { passive: false });
        };
        playClickSound();
    }
}

function checkDragDrop() {
    playClickSound();
    const slots = document.querySelectorAll('.drop-slot');
    let allCorrect = true;
    let allFilled = true;

    slots.forEach(slot => {
        const item = slot.querySelector('.drag-item');
        const zone = slot.closest('.drop-zone');
        if (!item) {
            allFilled = false;
            return;
        }
        const isCorrect = item.dataset.value === slot.dataset.correct;
        zone.classList.remove('correct', 'incorrect');
        zone.classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) allCorrect = false;
    });

    if (!allFilled) {
        const feedback = document.getElementById('q1-feedback');
        feedback.textContent = '⚠️ Place all items before checking!';
        feedback.className = 'question-feedback show incorrect';
        return;
    }

    const feedback = document.getElementById('q1-feedback');
    if (allCorrect) {
        playCorrectSound();
        quizStreak++;
        quizCorrect++;
        quizAnswers.q1 = true;
        feedback.textContent = '✅ Perfect match! AI Agents act autonomously, LLMs process language, and Prompts are your instructions.';
        feedback.className = 'question-feedback show correct';
        addXP(25);
    } else {
        playWrongSound();
        quizStreak = 0;
        quizAnswers.q1 = false;
        feedback.textContent = '❌ Not quite! Review: Agents act, LLMs understand language, Prompts are instructions.';
        feedback.className = 'question-feedback show incorrect';
    }

    updateStreakDisplay();
    document.getElementById('check-dd-btn').style.display = 'none';

    // Show next question after delay
    setTimeout(() => {
        document.getElementById('q2').style.display = 'block';
        document.getElementById('q2').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}

// Choose Your Path
function selectPath(element, questionId) {
    playClickSound();
    const cards = element.parentElement.querySelectorAll('.path-card');
    cards.forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');

    const index = parseInt(element.dataset.index);
    const correctIndex = 1; // "Clarify & Plan" is correct

    // Auto-check after selection
    setTimeout(() => {
        cards.forEach(c => {
            c.classList.remove('selected');
            const ci = parseInt(c.dataset.index);
            if (ci === correctIndex) c.classList.add('correct');
            else if (ci === index && index !== correctIndex) c.classList.add('incorrect');
            c.style.pointerEvents = 'none';
        });

        const feedback = document.getElementById('q2-feedback');
        if (index === correctIndex) {
            playCorrectSound();
            quizStreak++;
            quizCorrect++;
            quizAnswers.q2 = true;
            feedback.textContent = '✅ Correct! A responsible AI agent clarifies requirements before acting. This prevents errors and builds trust.';
            feedback.className = 'question-feedback show correct';
            addXP(25);
        } else {
            playWrongSound();
            quizStreak = 0;
            quizAnswers.q2 = false;
            feedback.textContent = '❌ Not quite. An AI agent should always clarify before acting — rushing leads to mistakes, refusing limits usefulness.';
            feedback.className = 'question-feedback show incorrect';
        }

        updateStreakDisplay();

        // Show next question
        setTimeout(() => {
            document.getElementById('q3').style.display = 'block';
            document.getElementById('q3').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }, 500);
}

// MCQ
function selectMCQ(element, questionId) {
    playClickSound();
    const options = element.parentElement.querySelectorAll('.mcq-option');
    options.forEach(o => o.classList.remove('selected'));
    element.classList.add('selected');

    const index = parseInt(element.dataset.index);
    const correctIndex = 0; // "Can take autonomous actions and use tools"

    setTimeout(() => {
        options.forEach(o => {
            o.classList.remove('selected');
            const oi = parseInt(o.dataset.index);
            if (oi === correctIndex) o.classList.add('correct');
            else if (oi === index && index !== correctIndex) o.classList.add('incorrect');
            o.style.pointerEvents = 'none';
        });

        const feedback = document.getElementById('q3-feedback');
        if (index === correctIndex) {
            playCorrectSound();
            quizStreak++;
            quizCorrect++;
            quizAnswers.q3 = true;
            feedback.textContent = '✅ Exactly! The key difference is AGENCY — the ability to take actions, use tools, and make decisions autonomously.';
            feedback.className = 'question-feedback show correct';
            addXP(25);
        } else {
            playWrongSound();
            quizStreak = 0;
            quizAnswers.q3 = false;
            feedback.textContent = '❌ Not quite. What makes an agent special is its ability to take autonomous actions and use tools — not just chat.';
            feedback.className = 'question-feedback show incorrect';
        }

        updateStreakDisplay();

        // Show completion button
        setTimeout(() => {
            document.getElementById('quiz-submit-area').style.display = 'block';
            document.getElementById('quiz-submit-area').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }, 500);
}

function updateStreakDisplay() {
    document.getElementById('quiz-streak-value').textContent = quizStreak;
    document.getElementById('streak-count').textContent = quizStreak;
}

function submitAllQuiz() {
    playClickSound();
    switchPhase('quiz', 'mastery');
    showMasteryPhase();
}

// ==================== Mastery Phase ====================
function showMasteryPhase() {
    stopTimer();
    playFanfare();

    // Completion bonus XP
    const bonusXP = quizCorrect === 3 ? 50 : 25;
    addXP(bonusXP);

    // Update debrief stats
    document.getElementById('mastery-xp').textContent = totalXP;
    document.getElementById('mastery-time').textContent = getTimerDisplay();
    document.getElementById('mastery-accuracy').textContent = Math.round((quizCorrect / 3) * 100) + '%';
    document.getElementById('mastery-streak').textContent = quizStreak > 0 ? `+${quizStreak * 5}` : '0';

    // Animate XP counter
    setTimeout(() => {
        const counterEl = document.getElementById('xp-counter-value');
        animateXPCounter(0, totalXP, counterEl);
    }, 800);

    // Show achievement badge with animation
    setTimeout(() => {
        const badge = document.getElementById('achievement-unlock');
        badge.classList.add('show');
    }, 1200);

    // Start confetti
    setTimeout(() => {
        startPixelConfetti();
    }, 1500);

    // Call backend to record completion
    fetch('/api/level1/complete', { method: 'POST' })
        .then(r => r.json())
        .catch(e => console.error('Error recording completion:', e));
}

// ==================== Pixel Confetti ====================
function startPixelConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FFD700', '#8B5CF6', '#14B8A6', '#F87171', '#4ADE80', '#FBBF24', '#A78BFA'];
    const particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 200,
            size: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 3,
            speedY: 1.5 + Math.random() * 3,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.1
        });
    }

    let frame = 0;
    const maxFrames = 180; // ~3 seconds at 60fps

    function animate() {
        if (frame >= maxFrames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const alpha = frame > maxFrames - 30 ? (maxFrames - frame) / 30 : 1;
        ctx.globalAlpha = alpha;

        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            // Pixel-style square confetti
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;
            p.speedY += 0.05; // gravity
        });

        ctx.globalAlpha = 1;
        frame++;
        requestAnimationFrame(animate);
    }

    animate();
}

// ==================== Replay ====================
function replayLevel() {
    playClickSound();
    totalXP = 0;
    quizStreak = 0;
    quizCorrect = 0;
    quizAnswers = { q1: null, q2: null, q3: null };
    currentQuizQuestion = 0;
    document.getElementById('xp-total').textContent = '0';
    document.getElementById('streak-count').textContent = '0';

    // Reset quiz UI
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('correct', 'incorrect'));
    document.querySelectorAll('.drop-slot').forEach(s => {
        const item = s.querySelector('.drag-item');
        if (item) document.getElementById('drag-items').appendChild(item);
    });
    document.querySelectorAll('.drag-item').forEach(i => {
        i.setAttribute('draggable', 'true');
        i.style.cursor = 'grab';
        i.onclick = null;
    });
    document.querySelectorAll('.path-card').forEach(c => {
        c.classList.remove('correct', 'incorrect', 'selected');
        c.style.pointerEvents = '';
    });
    document.querySelectorAll('.mcq-option').forEach(o => {
        o.classList.remove('correct', 'incorrect', 'selected');
        o.style.pointerEvents = '';
    });
    document.querySelectorAll('.question-feedback').forEach(f => {
        f.className = 'question-feedback';
        f.textContent = '';
    });

    document.getElementById('q2').style.display = 'none';
    document.getElementById('q3').style.display = 'none';
    document.getElementById('quiz-submit-area').style.display = 'none';
    document.getElementById('check-dd-btn').style.display = 'inline-flex';
    document.getElementById('quiz-streak-value').textContent = '0';
    document.getElementById('skip-btn').style.display = 'inline-flex';
    document.getElementById('continue-to-quiz-btn').style.display = 'none';
    document.getElementById('terminal-cursor').style.display = 'block';
    document.getElementById('achievement-unlock').classList.remove('show');

    // Reset phases
    document.querySelectorAll('.phase').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    const storyPhase = document.getElementById('phase-story');
    storyPhase.style.display = 'block';
    storyPhase.classList.add('active');

    initStoryPhase();
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    initStoryPhase();

    // Handle window resize for confetti canvas
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
