/**
 * Questra — Level 1 Page 1: Narrative Hook
 * 50-second cinematic intro with branching choices
 */

(function () {
    'use strict';

    // ==================== AUDIO ====================
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    let ambientOsc = null;
    let ambientGain = null;

    function initAudio() {
        if (audioCtx) return;
        try {
            audioCtx = new AudioCtx();
            // Ambient hum — low drone
            ambientOsc = audioCtx.createOscillator();
            ambientGain = audioCtx.createGain();
            ambientOsc.type = 'sine';
            ambientOsc.frequency.value = 55; // low A
            ambientGain.gain.value = 0;
            ambientOsc.connect(ambientGain);
            ambientGain.connect(audioCtx.destination);
            ambientOsc.start();
            // Fade in ambient
            ambientGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2);
        } catch (e) { /* audio not supported */ }
    }

    function playTypeTick() {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.value = 800 + Math.random() * 400;
            gain.gain.value = 0.015;
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch (e) {}
    }

    function playGlitchSound() {
        if (!audioCtx) return;
        try {
            const bufferSize = audioCtx.sampleRate * 0.15;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.08;
            }
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.start();
        } catch (e) {}
    }

    // ==================== DOM ====================
    const textArea = document.getElementById('text-area');
    const cursorLine = document.getElementById('cursor-line');
    const choiceContainer = document.getElementById('choice-container');
    const fadeOverlay = document.getElementById('fade-overlay');

    // ==================== STATE ====================
    let sawLogs = false;
    let codename = generateCodename();

    function generateCodename() {
        const prefixes = ['ORION', 'VEGA', 'NOVA', 'LYRA', 'ATLAS', 'ECHO', 'PULSE', 'CIPHER'];
        const num = Math.floor(Math.random() * 9) + 1;
        return prefixes[Math.floor(Math.random() * prefixes.length)] + '-' + num;
    }

    // ==================== TEXT ENGINE ====================

    function addLine(text, cls) {
        const div = document.createElement('div');
        div.className = 'text-line' + (cls ? ' ' + cls : '');
        div.textContent = text;
        textArea.appendChild(div);
        scrollToBottom();
        return div;
    }

    function scrollToBottom() {
        const body = document.getElementById('terminal-body');
        body.scrollTop = body.scrollHeight;
    }

    function typeText(text, cls, speed) {
        return new Promise((resolve) => {
            const div = document.createElement('div');
            div.className = 'text-line' + (cls ? ' ' + cls : '');
            textArea.appendChild(div);
            scrollToBottom();

            let i = 0;
            const spd = speed || 35;
            function tick() {
                if (i < text.length) {
                    div.textContent += text[i];
                    if (text[i] !== ' ') playTypeTick();
                    i++;
                    scrollToBottom();
                    setTimeout(tick, spd);
                } else {
                    resolve(div);
                }
            }
            tick();
        });
    }

    function wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function clearLines() {
        textArea.innerHTML = '';
    }

    function showChoices(options) {
        return new Promise((resolve) => {
            choiceContainer.innerHTML = '';
            choiceContainer.style.display = 'flex';
            options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn' + (opt.cls ? ' ' + opt.cls : '');
                btn.textContent = opt.label;
                btn.addEventListener('click', () => {
                    initAudio();
                    choiceContainer.style.display = 'none';
                    resolve(opt.value);
                });
                choiceContainer.appendChild(btn);
            });
        });
    }

    function glitchLine(el, duration) {
        el.classList.add('glitch');
        playGlitchSound();
        return wait(duration || 600).then(() => {
            el.classList.remove('glitch');
        });
    }

    function wipeLine(el) {
        el.classList.add('wipe');
        playGlitchSound();
        return wait(1200).then(() => {
            el.remove();
        });
    }

    // ==================== NARRATIVE SEQUENCE ====================

    async function runNarrative() {
        // === 1. OPENING SEQUENCE (~10s) ===
        // Screen flicker is handled by CSS animation on .narrative-container
        await wait(1800); // let flicker finish

        initAudio(); // try to init on first interaction fallback

        // Cursor blinks alone for a moment
        await wait(1000);

        // Typing lines
        await typeText('YOU ARE AWAKE.', 'emphasis', 55);
        await wait(2000);

        await typeText('Data streams initialize.', 'system', 30);
        await wait(1500);

        await typeText('You are online.', 'system', 30);
        await wait(2000);

        // === 2. GUIDE INTRODUCTION (Auto) ===
        clearLines();
        await wait(600);

        await typeText('Connection established.', 'system', 28);
        await wait(1200);

        const guideLine1 = await typeText('Hello, Agent ' + codename + '.', 'guide', 32);
        await wait(2000);

        await typeText('I am your system guide.', 'guide', 30);
        await wait(1800);

        await typeText('You have been selected for a trial.', 'guide', 30);
        await wait(2000);

        await typeText('Do not be alarmed. Everything is under control.', 'guide', 28);
        await wait(2200);

        // === 3. FIRST PAUSE — Player Choice ===
        const choice1 = await showChoices([
            { label: 'Begin Trial', value: 'begin' },
            { label: 'Inspect System Logs', value: 'logs', cls: 'cyan' }
        ]);

        clearLines();
        await wait(400);

        // === 4. HIDDEN LOG EVENT (only if logs inspected) ===
        if (choice1 === 'logs') {
            sawLogs = true;

            addLine('[ACCESSING SYSTEM LOGS...]', 'system');
            await wait(800);

            addLine('Log 001: System initialized — nominal.', 'system');
            await wait(600);
            addLine('Log 002: Agent profile loaded.', 'system');
            await wait(600);
            addLine('Log 003: Trial parameters set.', 'system');
            await wait(800);

            // The hidden message
            const warningLine = addLine('SYSTEM NOTICE: DO NOT TRUST THE—', 'warning');
            playGlitchSound();
            await wait(1400);

            // Wipe it
            await wipeLine(warningLine);
            await wait(600);

            clearLines();
            await wait(300);
        }

        // === 5. GUIDE GLITCH (Auto) ===
        const glitchGuide = await typeText('Resuming session...', 'guide', 30);
        await wait(800);

        // Subtle glitch on guide text
        await glitchLine(glitchGuide, 500);
        await wait(400);

        // Remove the glitched line and replace
        glitchGuide.remove();
        const apologyLine = await typeText('Apologies... minor system delay.', 'guide', 28);
        await wait(2000);

        await typeText('Everything is functioning normally.', 'guide', 28);
        await wait(1800);

        // === 6. SECOND PAUSE — Small Agency ===
        const secondLabel = sawLogs ? 'Ask about the message' : 'Ask the Guide';
        const choice2 = await showChoices([
            { label: 'Proceed to Trial', value: 'proceed' },
            { label: secondLabel, value: 'ask', cls: 'cyan' }
        ]);

        clearLines();
        await wait(400);

        if (choice2 === 'ask') {
            if (sawLogs) {
                await typeText('What message?', 'guide', 30);
                await wait(1500);
                await typeText('I detect no anomalies in the logs.', 'guide', 28);
                await wait(1800);
                await typeText('Perhaps a rendering artifact.', 'guide', 28);
                await wait(1500);
                await typeText('Nothing to concern yourself with, Agent.', 'guide', 28);
            } else {
                await typeText('Questions are good, Agent ' + codename + '.', 'guide', 28);
                await wait(1500);
                await typeText('But answers come through the trial.', 'guide', 28);
                await wait(1500);
                await typeText('Trust the process.', 'guide', 28);
            }
            await wait(2000);
            clearLines();
            await wait(400);
        }

        // === 7. CLIFFHANGER ENDING (Auto) ===
        await typeText('Your curiosity is... noted.', 'guide', 30);
        await wait(1800);

        await typeText('A useful trait for what comes next.', 'guide', 28);
        await wait(2000);

        clearLines();
        await wait(600);

        await typeText('TRIAL SEQUENCE INITIATING...', 'emphasis', 45);
        await wait(2000);

        await typeText('Prepare yourself, Agent ' + codename + '.', 'guide', 30);
        await wait(2500);

        // Fade to black
        fadeOverlay.classList.add('active');
        // Fade out ambient
        if (ambientGain && audioCtx) {
            ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
        }
        await wait(2500);

        // Redirect to the main Level 1 experience
        window.location.href = '/level/ai-agents/1';
    }

    // ==================== START ====================

    // Start on first user interaction (needed for audio policy)
    let started = false;

    function startOnInteraction() {
        if (started) return;
        started = true;
        initAudio();
        runNarrative();
    }

    // Auto-start after a brief delay, but also listen for click to init audio
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    // Start the narrative immediately (CSS flicker handles the opening feel)
    setTimeout(() => {
        if (!started) {
            started = true;
            runNarrative();
        }
    }, 200);

})();
