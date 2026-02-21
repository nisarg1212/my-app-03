(function () {
    'use strict';

    const textArea = document.getElementById('text-area');
    const terminalBody = document.getElementById('terminal-body');
    const choiceContainer = document.getElementById('choice-container');
    const fadeOverlay = document.getElementById('fade-overlay');

    if (!textArea || !terminalBody || !choiceContainer || !fadeOverlay) {
        return;
    }

    class SystemAudio {
        constructor() {
            this.AudioContextImpl = window.AudioContext || window.webkitAudioContext;
            this.ctx = null;
            this.humOscillator = null;
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

                    this.humOscillator = this.ctx.createOscillator();
                    this.humOscillator.type = 'sine';
                    this.humOscillator.frequency.value = 58;
                    this.humOscillator.connect(this.humGain);
                    this.humGain.connect(this.ctx.destination);
                    this.humOscillator.start();
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
            this.humGain.gain.linearRampToValueAtTime(0.008, now + 1.1);
        }

        fadeHumOut() {
            if (!this.ctx || !this.humGain) {
                return;
            }

            const now = this.ctx.currentTime;
            this.humGain.gain.cancelScheduledValues(now);
            this.humGain.gain.setValueAtTime(this.humGain.gain.value, now);
            this.humGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
        }

        beep(frequency, durationMs, volume, type) {
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
                gain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000));

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + (durationMs / 1000));
            } catch (error) {
                // Ignore audio failures.
            }
        }

        typeTick() {
            this.beep(720 + Math.random() * 140, 28, 0.004, 'square');
        }

        choiceConfirm() {
            this.beep(520, 120, 0.015, 'triangle');
        }

        transitionCue() {
            this.beep(300, 220, 0.02, 'sine');
            setTimeout(() => this.beep(220, 320, 0.015, 'sine'), 85);
        }
    }

    class NarrativeLineSystem {
        constructor(config) {
            this.textArea = config.textArea;
            this.terminalBody = config.terminalBody;
            this.audio = config.audio;
            this.maxVisibleLines = config.maxVisibleLines || 2;
            this.charDelay = config.charDelay || 17;
            this.fastCharDelay = config.fastCharDelay || 4;
            this.defaultHold = config.defaultHold || 1700;

            this.waitResolver = null;
            this.typingResolver = null;
            this.skipCurrentTyping = false;
            this.boostNextDelay = false;
        }

        requestAdvance() {
            if (this.waitResolver) {
                const resolve = this.waitResolver;
                this.waitResolver = null;
                resolve();
                return;
            }

            if (this.typingResolver) {
                this.skipCurrentTyping = true;
                const resolve = this.typingResolver;
                this.typingResolver = null;
                resolve();
                return;
            }

            this.boostNextDelay = true;
        }

        trimLines() {
            while (this.textArea.childElementCount > this.maxVisibleLines) {
                this.textArea.firstElementChild.remove();
            }
        }

        scrollToBottom() {
            this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        }

        clear() {
            this.textArea.innerHTML = '';
            this.scrollToBottom();
        }

        wait(ms, skippable) {
            if (!ms || ms <= 0) {
                return Promise.resolve();
            }

            const effectiveMs = this.boostNextDelay ? Math.min(ms, 220) : ms;
            this.boostNextDelay = false;

            if (!skippable) {
                return new Promise((resolve) => {
                    setTimeout(resolve, effectiveMs);
                });
            }

            return new Promise((resolve) => {
                let completed = false;
                const timeout = setTimeout(() => {
                    if (completed) {
                        return;
                    }

                    completed = true;
                    this.waitResolver = null;
                    resolve();
                }, effectiveMs);

                this.waitResolver = () => {
                    if (completed) {
                        return;
                    }

                    completed = true;
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
                let completed = false;
                const timeout = setTimeout(() => {
                    if (completed) {
                        return;
                    }

                    completed = true;
                    this.typingResolver = null;
                    resolve();
                }, ms);

                this.typingResolver = () => {
                    if (completed) {
                        return;
                    }

                    completed = true;
                    clearTimeout(timeout);
                    resolve();
                };
            });
        }

        async renderLine(text, options) {
            const config = Object.assign({
                className: 'system',
                typed: true,
                hold: this.defaultHold,
                autoAdvance: true
            }, options || {});

            const line = document.createElement('div');
            line.className = `text-line ${config.className}`.trim();
            this.textArea.appendChild(line);
            this.scrollToBottom();

            if (!config.typed) {
                line.textContent = text;
            } else {
                this.skipCurrentTyping = false;

                for (let index = 0; index < text.length; index += 1) {
                    if (this.skipCurrentTyping) {
                        line.textContent = text;
                        break;
                    }

                    const char = text[index];
                    line.textContent += char;

                    if (char !== ' ' && index % 2 === 0) {
                        this.audio.typeTick();
                    }

                    this.scrollToBottom();
                    const delay = this.boostNextDelay ? this.fastCharDelay : this.charDelay;
                    await this.waitChar(delay);
                }
            }

            this.typingResolver = null;
            this.skipCurrentTyping = false;
            this.trimLines();

            if (config.autoAdvance) {
                await this.wait(config.hold, true);
            }

            return line;
        }
    }

    class ChoiceComponent {
        constructor(config) {
            this.container = config.container;
            this.audio = config.audio;
            this.active = false;
        }

        hide() {
            this.active = false;
            this.container.hidden = true;
            this.container.style.display = 'none';
            this.container.innerHTML = '';
        }

        async present(options) {
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

                        this.audio.unlock();
                        this.audio.choiceConfirm();
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

    class SceneController {
        constructor(config) {
            this.narrative = config.narrative;
            this.choices = config.choices;
            this.audio = config.audio;
            this.fadeOverlay = config.fadeOverlay;

            this.state = {
                firstChoice: null,
                evidenceInspected: false,
                reviewedSummary: false
            };
        }

        async openingConnection() {
            await this.narrative.renderLine('Connecting to Investigator Channel...', {
                className: 'system',
                hold: 1550
            });
            await this.narrative.renderLine('Link established.', {
                className: 'system',
                hold: 1450
            });
            await this.narrative.renderLine('AI Assistant online.', {
                className: 'system',
                hold: 1500
            });
            await this.narrative.renderLine('Hello, Detective.', {
                className: 'assistant',
                hold: 1550
            });
            await this.narrative.renderLine("I'm your AI partner.", {
                className: 'assistant',
                hold: 1550
            });
        }

        async introduction() {
            await this.narrative.renderLine("We've received a new case.", {
                className: 'assistant',
                hold: 1650
            });
            await this.narrative.renderLine("Something doesn't add up.", {
                className: 'assistant',
                hold: 1650
            });
            await this.narrative.renderLine('I think you should see this.', {
                className: 'assistant',
                hold: 1650
            });
        }

        async firstInteraction() {
            const choice = await this.choices.present([
                { label: 'View Case File', value: 'case_file' },
                { label: 'Ask: What kind of case?', value: 'ask_case', className: 'alt' }
            ]);

            this.state.firstChoice = choice;

            if (choice === 'case_file') {
                await this.narrative.renderLine('Opening case file preview...', {
                    className: 'status',
                    hold: 1200,
                    typed: false
                });
            }

            if (choice === 'ask_case') {
                await this.narrative.renderLine('What kind of case is this?', {
                    className: 'user',
                    hold: 1200,
                    typed: false
                });
                await this.narrative.renderLine('A prediction anomaly. Impossible on paper.', {
                    className: 'assistant',
                    hold: 1500
                });
            }
        }

        async caseHookReveal() {
            await this.narrative.renderLine('An AI system made a prediction.', {
                className: 'assistant',
                hold: 1700
            });
            await this.narrative.renderLine('Hours later - it came true.', {
                className: 'assistant',
                hold: 1750
            });
            await this.narrative.renderLine('No one knows how.', {
                className: 'assistant emphasis',
                hold: 1700
            });
        }

        async optionalCuriosityMoment() {
            const choice = await this.choices.present([
                { label: 'Inspect Evidence Preview', value: 'inspect' },
                { label: 'Continue', value: 'continue', className: 'alt' }
            ]);

            if (choice !== 'inspect') {
                return;
            }

            this.state.evidenceInspected = true;

            await this.narrative.renderLine('LOG NOTE:', {
                className: 'evidence',
                hold: 1200,
                typed: false
            });
            await this.narrative.renderLine('Prediction issued before data existed.', {
                className: 'evidence',
                hold: 1750
            });
        }

        async personalityMoment() {
            if (this.state.evidenceInspected) {
                await this.narrative.renderLine('Yeah... that bothered me too.', {
                    className: 'assistant',
                    hold: 1500
                });
            } else {
                await this.narrative.renderLine('I did not want to bias your read too early.', {
                    className: 'assistant',
                    hold: 1450
                });
            }

            await this.narrative.renderLine('Ready to investigate?', {
                className: 'assistant',
                hold: 1500
            });
        }

        async finalInteraction() {
            const choice = await this.choices.present([
                { label: 'Start Investigation', value: 'start' },
                { label: 'Review Case Summary', value: 'summary', className: 'alt' }
            ]);

            if (choice === 'summary') {
                this.state.reviewedSummary = true;
                await this.narrative.renderLine('Case #001 Summary:', {
                    className: 'status',
                    hold: 1000,
                    typed: false
                });
                await this.narrative.renderLine('An impossible prediction came true within hours.', {
                    className: 'assistant',
                    hold: 1400
                });
                await this.narrative.renderLine('Objective: trace source, motive, and method.', {
                    className: 'assistant',
                    hold: 1400
                });
            }
        }

        async transitionToTrial() {
            await this.narrative.renderLine('Opening Case #001...', {
                className: 'status',
                hold: 1500,
                typed: false
            });
            await this.narrative.renderLine('Loading Investigation Environment...', {
                className: 'status',
                hold: 1550,
                typed: false
            });

            this.audio.transitionCue();
            this.audio.fadeHumOut();
            this.fadeOverlay.classList.add('active');
            await this.narrative.wait(1500, false);
            window.location.href = '/level/ai-agents/1/trial?v=20260222_case001_2';
        }

        async run() {
            await this.openingConnection();
            await this.introduction();
            await this.firstInteraction();
            await this.caseHookReveal();
            await this.optionalCuriosityMoment();
            await this.personalityMoment();
            await this.finalInteraction();
            await this.transitionToTrial();
        }
    }

    const audio = new SystemAudio();
    const narrative = new NarrativeLineSystem({
        textArea,
        terminalBody,
        audio,
        maxVisibleLines: 2,
        charDelay: 16,
        fastCharDelay: 4,
        defaultHold: 1650
    });

    const choices = new ChoiceComponent({
        container: choiceContainer,
        audio
    });

    const sceneController = new SceneController({
        narrative,
        choices,
        audio,
        fadeOverlay
    });

    function unlockAudioAndAdvance() {
        audio.unlock();
        narrative.requestAdvance();
    }

    document.addEventListener('pointerdown', unlockAudioAndAdvance);
    document.addEventListener('keydown', unlockAudioAndAdvance);

    sceneController.run().catch(() => {
        window.location.href = '/level/ai-agents/1/trial?v=20260222_case001_2';
    });
})();
