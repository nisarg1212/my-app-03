(function () {
    'use strict';

    function mapDom() {
        return {
            narrativeViewport: document.getElementById('narrative-viewport'),
            narrativeLines: document.getElementById('narrative-lines'),
            choiceContainer: document.getElementById('choice-container'),
            evidenceBoard: document.getElementById('evidence-board'),
            evidenceGrid: document.getElementById('evidence-grid'),
            evidenceFeedback: document.getElementById('evidence-feedback'),
            evidencePrompt: document.getElementById('evidence-prompt'),
            fadeOverlay: document.getElementById('fade-overlay')
        };
    }

    function hasRequiredDom(parts) {
        return Boolean(
            parts.narrativeViewport &&
            parts.narrativeLines &&
            parts.choiceContainer &&
            parts.evidenceBoard &&
            parts.evidenceGrid &&
            parts.evidenceFeedback &&
            parts.evidencePrompt &&
            parts.fadeOverlay
        );
    }

    function bootstrapRuntimeShell() {
        document.body.innerHTML = `
            <div class="bg-grid" aria-hidden="true"></div>
            <div class="crt-overlay" aria-hidden="true"></div>
            <div class="vignette" aria-hidden="true"></div>
            <main class="scene-root" aria-live="polite">
                <header class="scene-header">
                    <a href="/" class="logo-link">QUESTRA</a>
                    <div class="case-chip">Case 001: The Impossible Prediction</div>
                </header>
                <section class="terminal-panel" id="terminal-panel" role="region" aria-label="Investigation terminal">
                    <div class="terminal-titlebar">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                        <span class="title">Investigator Console</span>
                    </div>
                    <div class="narrative-viewport" id="narrative-viewport">
                        <div id="narrative-lines"></div>
                        <div class="cursor-line">
                            <span class="prompt">&gt;</span>
                            <span class="cursor">|</span>
                        </div>
                    </div>
                    <div class="choices" id="choice-container" hidden></div>
                </section>
                <section class="evidence-board" id="evidence-board" hidden aria-label="Evidence board">
                    <div class="evidence-header">
                        <h2>Evidence Board</h2>
                        <p id="evidence-prompt">Something explains the prediction. What should we inspect first?</p>
                    </div>
                    <div class="evidence-grid" id="evidence-grid"></div>
                    <div class="evidence-feedback" id="evidence-feedback">Select an evidence card to inspect.</div>
                </section>
                <p class="accelerate-hint">Tap/click or press any key to advance faster</p>
            </main>
            <div class="fade-overlay" id="fade-overlay" aria-hidden="true"></div>
        `;
    }

    let dom = mapDom();
    if (!hasRequiredDom(dom)) {
        bootstrapRuntimeShell();
        dom = mapDom();
    }

    if (!hasRequiredDom(dom)) {
        return;
    }

    class SoundSystem {
        constructor() {
            this.AudioContextImpl = window.AudioContext || window.webkitAudioContext;
            this.ctx = null;
            this.humOsc = null;
            this.humGain = null;
        }

        unlock() {
            if (!this.AudioContextImpl) {
                return;
            }

            if (!this.ctx) {
                try {
                    this.ctx = new this.AudioContextImpl();
                    this.humGain = this.ctx.createGain();
                    this.humGain.gain.value = 0;

                    this.humOsc = this.ctx.createOscillator();
                    this.humOsc.type = 'sine';
                    this.humOsc.frequency.value = 55;
                    this.humOsc.connect(this.humGain);
                    this.humGain.connect(this.ctx.destination);
                    this.humOsc.start();
                } catch (error) {
                    this.ctx = null;
                    return;
                }
            }

            if (this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }

            this.fadeHumIn();
        }

        fadeHumIn() {
            if (!this.ctx || !this.humGain) {
                return;
            }

            const now = this.ctx.currentTime;
            this.humGain.gain.cancelScheduledValues(now);
            this.humGain.gain.setValueAtTime(this.humGain.gain.value, now);
            this.humGain.gain.linearRampToValueAtTime(0.009, now + 1.0);
        }

        fadeHumOut() {
            if (!this.ctx || !this.humGain) {
                return;
            }

            const now = this.ctx.currentTime;
            this.humGain.gain.cancelScheduledValues(now);
            this.humGain.gain.setValueAtTime(this.humGain.gain.value, now);
            this.humGain.gain.linearRampToValueAtTime(0.0001, now + 1.1);
        }

        tone(frequency, durationMs, volume, type) {
            if (!this.ctx) {
                return;
            }

            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type || 'triangle';
                osc.frequency.value = frequency;

                const now = this.ctx.currentTime;
                gain.gain.setValueAtTime(volume, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + durationMs / 1000);
            } catch (error) {
                // Ignore sound failures.
            }
        }

        typeTick() {
            this.tone(700 + Math.random() * 150, 25, 0.0035, 'square');
        }

        select() {
            this.tone(510, 110, 0.014, 'triangle');
        }

        success() {
            this.tone(410, 150, 0.015, 'triangle');
            setTimeout(() => this.tone(620, 140, 0.012, 'triangle'), 65);
        }

        warning() {
            this.tone(230, 160, 0.015, 'sawtooth');
        }

        transition() {
            this.tone(320, 230, 0.018, 'sine');
            setTimeout(() => this.tone(240, 330, 0.012, 'sine'), 90);
        }
    }

    class NarrativeEngine {
        constructor(config) {
            this.container = config.container;
            this.viewport = config.viewport;
            this.sound = config.sound;
            this.maxVisibleLines = config.maxVisibleLines || 2;
            this.charDelay = config.charDelay || 17;
            this.fastCharDelay = config.fastCharDelay || 4;
            this.defaultHold = config.defaultHold || 1650;

            this.waitResolver = null;
            this.charResolver = null;
            this.skipTyping = false;
            this.boostNext = false;
        }

        requestAdvance() {
            if (this.waitResolver) {
                const resolve = this.waitResolver;
                this.waitResolver = null;
                resolve();
                return;
            }

            if (this.charResolver) {
                this.skipTyping = true;
                const resolve = this.charResolver;
                this.charResolver = null;
                resolve();
                return;
            }

            this.boostNext = true;
        }

        clear() {
            this.container.innerHTML = '';
            this.scrollBottom();
        }

        trim() {
            while (this.container.childElementCount > this.maxVisibleLines) {
                this.container.firstElementChild.remove();
            }
        }

        scrollBottom() {
            this.viewport.scrollTop = this.viewport.scrollHeight;
        }

        wait(ms, skippable) {
            if (!ms || ms <= 0) {
                return Promise.resolve();
            }

            const effectiveMs = this.boostNext ? Math.min(ms, 220) : ms;
            this.boostNext = false;

            if (!skippable) {
                return new Promise((resolve) => setTimeout(resolve, effectiveMs));
            }

            return new Promise((resolve) => {
                let done = false;
                const timeout = setTimeout(() => {
                    if (done) {
                        return;
                    }

                    done = true;
                    this.waitResolver = null;
                    resolve();
                }, effectiveMs);

                this.waitResolver = () => {
                    if (done) {
                        return;
                    }

                    done = true;
                    clearTimeout(timeout);
                    resolve();
                };
            });
        }

        waitChar(ms) {
            if (!ms || ms <= 0) {
                return Promise.resolve();
            }

            return new Promise((resolve) => {
                let done = false;
                const timeout = setTimeout(() => {
                    if (done) {
                        return;
                    }

                    done = true;
                    this.charResolver = null;
                    resolve();
                }, ms);

                this.charResolver = () => {
                    if (done) {
                        return;
                    }

                    done = true;
                    clearTimeout(timeout);
                    resolve();
                };
            });
        }

        async showLine(text, options) {
            const cfg = Object.assign({
                className: 'system',
                typed: true,
                hold: this.defaultHold,
                autoAdvance: true
            }, options || {});

            const line = document.createElement('div');
            line.className = `text-line ${cfg.className}`.trim();
            this.container.appendChild(line);
            this.scrollBottom();

            if (!cfg.typed) {
                line.textContent = text;
            } else {
                this.skipTyping = false;

                for (let i = 0; i < text.length; i += 1) {
                    if (this.skipTyping) {
                        line.textContent = text;
                        break;
                    }

                    const char = text[i];
                    line.textContent += char;

                    if (char !== ' ' && i % 2 === 0) {
                        this.sound.typeTick();
                    }

                    this.scrollBottom();
                    const perChar = this.boostNext ? this.fastCharDelay : this.charDelay;
                    await this.waitChar(perChar);
                }
            }

            this.charResolver = null;
            this.skipTyping = false;
            this.trim();

            if (cfg.autoAdvance) {
                await this.wait(cfg.hold, true);
            }

            return line;
        }

        async showLines(lines, options) {
            const list = Array.isArray(lines) ? lines : [];
            for (const line of list) {
                await this.showLine(line, options);
            }
        }
    }

    class ChoiceComponent {
        constructor(config) {
            this.container = config.container;
            this.sound = config.sound;
            this.active = false;
        }

        hide() {
            this.active = false;
            this.container.hidden = true;
            this.container.style.display = 'none';
            this.container.innerHTML = '';
        }

        present(options) {
            this.container.innerHTML = '';
            this.container.hidden = false;
            this.container.style.display = 'flex';
            this.active = true;

            return new Promise((resolve) => {
                options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = `choice-btn ${option.className || ''}`.trim();
                    button.textContent = option.label;

                    button.addEventListener('click', () => {
                        if (!this.active) {
                            return;
                        }

                        this.sound.unlock();
                        this.sound.select();
                        this.hide();
                        resolve(option.value);
                    });

                    this.container.appendChild(button);

                    if (index === 0) {
                        requestAnimationFrame(() => button.focus());
                    }
                });
            });
        }
    }

    class EvidenceBoard {
        constructor(config) {
            this.board = config.board;
            this.grid = config.grid;
            this.feedback = config.feedback;
            this.prompt = config.prompt;
            this.sound = config.sound;
        }

        show() {
            this.board.hidden = false;
        }

        hide() {
            this.board.hidden = true;
            this.grid.innerHTML = '';
            this.feedback.classList.remove('positive');
            this.feedback.textContent = 'Select an evidence card to inspect.';
        }

        async investigate(data) {
            this.show();
            this.prompt.textContent = data.prompt;
            this.feedback.classList.remove('positive');
            this.feedback.textContent = 'Select an evidence card to inspect.';

            let resolved = false;

            while (!resolved) {
                const selectedId = await this.selectCard(data.cards);
                const selected = data.cards.find((card) => card.id === selectedId);

                if (!selected) {
                    continue;
                }

                if (!selected.correct) {
                    this.sound.warning();
                    this.feedback.classList.remove('positive');
                    this.feedback.textContent = selected.feedback;
                    continue;
                }

                this.sound.success();
                this.feedback.classList.add('positive');
                this.feedback.textContent = selected.feedback;
                resolved = true;
                return selected;
            }

            return null;
        }

        selectCard(cards) {
            this.grid.innerHTML = '';

            return new Promise((resolve) => {
                cards.forEach((card) => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'evidence-card';
                    button.innerHTML = `<h3>${card.title}</h3><p>${card.summary}</p>`;

                    button.addEventListener('click', () => {
                        this.sound.select();
                        this.grid.querySelectorAll('.evidence-card').forEach((item) => item.classList.remove('active'));
                        button.classList.add('active');
                        resolve(card.id);
                    });

                    this.grid.appendChild(button);
                });
            });
        }
    }

    class SceneController {
        constructor(config) {
            this.narrative = config.narrative;
            this.choices = config.choices;
            this.evidenceBoard = config.evidenceBoard;
            this.sound = config.sound;
            this.fadeOverlay = config.fadeOverlay;
            this.state = {
                interpretation: null
            };
        }

        async scene1CaseBriefing() {
            await this.narrative.showLine('CASE 001 LOADED', { className: 'system', hold: 1450, typed: false });
            await this.narrative.showLine('Location: Riverton City Hospital', { className: 'system', hold: 1500, typed: false });
            await this.narrative.showLine('System: MedPredict AI', { className: 'system', hold: 1500, typed: false });

            await this.narrative.showLine('Detective, this one is strange.', { className: 'assistant', hold: 1650 });
            await this.narrative.showLine('MedPredict flagged a medical emergency hours early.', { className: 'assistant', hold: 1800 });
            await this.narrative.showLine('Doctors are confused.', { className: 'assistant', hold: 1500 });
            await this.narrative.showLine('The company says the system worked normally.', { className: 'assistant', hold: 1800 });

            await this.choices.present([
                { label: 'Open Evidence Board', value: 'open' }
            ]);
        }

        async scene2EvidenceBoard() {
            this.narrative.clear();
            await this.narrative.showLine('Something explains the prediction.', { className: 'assistant', hold: 1300 });
            await this.narrative.showLine('What should we inspect first?', { className: 'assistant', hold: 1400 });

            const result = await this.evidenceBoard.investigate({
                prompt: 'Something explains the prediction. What should we inspect first?',
                cards: [
                    {
                        id: 'patient_data',
                        title: 'Evidence A — Patient Data',
                        summary: 'Vitals looked normal at the time.',
                        correct: false,
                        feedback: 'Good check. The vitals are normal, so this alone does not explain the early alert.'
                    },
                    {
                        id: 'prediction_log',
                        title: 'Evidence B — Prediction Log',
                        summary: 'Critical alert generated early.',
                        correct: false,
                        feedback: 'Useful timeline, but it only confirms when the alert fired, not why.'
                    },
                    {
                        id: 'training_dataset',
                        title: 'Evidence C — Training Dataset',
                        summary: 'Recent external data update.',
                        correct: true,
                        feedback: 'Nice catch. This update changes what the model could detect.'
                    }
                ]
            });

            return result;
        }

        async scene3DiscoveryReveal() {
            await this.narrative.showLine('Additional signals found in the update:', { className: 'success', typed: false, hold: 1350 });
            await this.narrative.showLine('- pharmacy purchase trends', { className: 'success', typed: false, hold: 1300 });
            await this.narrative.showLine('- wearable health data', { className: 'success', typed: false, hold: 1300 });
            await this.narrative.showLine('- behavioral signals', { className: 'success', typed: false, hold: 1300 });

            await this.narrative.showLine("So it didn't predict the future.", { className: 'assistant', hold: 1450 });
            await this.narrative.showLine('It detected hidden patterns before humans saw them.', { className: 'assistant', hold: 1750 });
        }

        async scene4DeductionQuestion() {
            let solved = false;

            while (!solved) {
                const answer = await this.choices.present([
                    { label: 'AI predicted future', value: 'future' },
                    { label: 'AI saw hidden signals', value: 'signals', className: 'alt' },
                    { label: 'Random guess', value: 'random' }
                ]);

                if (answer === 'signals') {
                    this.sound.success();
                    await this.narrative.showLine('Exactly. Hidden signals, not magic.', { className: 'success', hold: 1400 });
                    await this.narrative.showLine('You are reading the system like an investigator.', { className: 'assistant', hold: 1500 });
                    solved = true;
                    continue;
                }

                if (answer === 'future') {
                    await this.narrative.showLine('Close, but not quite. No time travel needed.', { className: 'assistant', hold: 1400 });
                }

                if (answer === 'random') {
                    await this.narrative.showLine('Not random. The signals were there, just buried.', { className: 'assistant', hold: 1400 });
                }

                await this.narrative.showLine('Try one more read of the evidence.', { className: 'assistant', hold: 1300 });
            }
        }

        async scene5TwistEvent() {
            this.evidenceBoard.hide();
            await this.narrative.showLine('SYSTEM NOTIFICATION', { className: 'alert', typed: false, hold: 1200 });
            this.sound.warning();
            await this.narrative.showLine('MedPredict AI has been shut down.', { className: 'alert', hold: 1700, typed: false });
            await this.narrative.showLine('Reason: Public safety concern.', { className: 'alert', hold: 1700, typed: false });

            await this.narrative.showLine('That timing is suspicious.', { className: 'assistant', hold: 1450 });
            await this.narrative.showLine('A system proves useful, then gets silenced.', { className: 'assistant', hold: 1650 });
            await this.narrative.showLine('We just found a bigger mystery.', { className: 'assistant', hold: 1550 });
        }

        async scene6ReflectionChoice() {
            const interpretation = await this.choices.present([
                { label: 'AI failed', value: 'failed' },
                { label: 'Humans misunderstood', value: 'misunderstood', className: 'alt' },
                { label: 'Someone wanted shutdown', value: 'sabotage' }
            ]);

            this.state.interpretation = interpretation;

            if (interpretation === 'failed') {
                await this.narrative.showLine('Could be. But failure reports usually show technical faults.', { className: 'assistant', hold: 1550 });
                await this.narrative.showLine("Here, the data trail says it was actually seeing something real.", { className: 'assistant', hold: 1650 });
            }

            if (interpretation === 'misunderstood') {
                await this.narrative.showLine('That fits what we saw.', { className: 'assistant', hold: 1400 });
                await this.narrative.showLine('When systems surface weak signals, humans often dismiss them first.', { className: 'assistant', hold: 1700 });
            }

            if (interpretation === 'sabotage') {
                await this.narrative.showLine('You might be right.', { className: 'assistant', hold: 1300 });
                await this.narrative.showLine('If someone needed silence, shutdown is cleaner than debate.', { className: 'assistant', hold: 1700 });
            }
        }

        async scene7LevelEnding() {
            await this.narrative.showLine('You looked beyond results.', { className: 'assistant', hold: 1450 });
            await this.narrative.showLine('You investigated causes.', { className: 'assistant', hold: 1450 });
            await this.narrative.showLine('Incoming Case #002...', { className: 'system', typed: false, hold: 1500 });
            await this.narrative.showLine('Classification: Restricted', { className: 'system', typed: false, hold: 1500 });

            this.sound.transition();
            this.sound.fadeHumOut();
            this.fadeOverlay.classList.add('active');
            await this.narrative.wait(1800, false);
        }

        async run() {
            await this.scene1CaseBriefing();
            await this.scene2EvidenceBoard();
            await this.scene3DiscoveryReveal();
            await this.scene4DeductionQuestion();
            await this.scene5TwistEvent();
            await this.scene6ReflectionChoice();
            await this.scene7LevelEnding();
        }
    }

    const sound = new SoundSystem();
    const narrative = new NarrativeEngine({
        container: dom.narrativeLines,
        viewport: dom.narrativeViewport,
        sound,
        maxVisibleLines: 2,
        charDelay: 16,
        fastCharDelay: 4,
        defaultHold: 1600
    });

    const choices = new ChoiceComponent({
        container: dom.choiceContainer,
        sound
    });

    const evidenceBoard = new EvidenceBoard({
        board: dom.evidenceBoard,
        grid: dom.evidenceGrid,
        feedback: dom.evidenceFeedback,
        prompt: dom.evidencePrompt,
        sound
    });

    const scenes = new SceneController({
        narrative,
        choices,
        evidenceBoard,
        sound,
        fadeOverlay: dom.fadeOverlay
    });

    function unlockAndAdvance() {
        sound.unlock();
        narrative.requestAdvance();
    }

    document.addEventListener('pointerdown', unlockAndAdvance);
    document.addEventListener('keydown', unlockAndAdvance);

    scenes.run().catch(() => {
        window.location.href = '/';
    });
})();

