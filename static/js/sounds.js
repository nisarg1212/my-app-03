/**
 * Questra — Retro Chiptune Sound System
 * Uses Web Audio API to generate 8-bit style sounds programmatically.
 * No external audio files needed!
 */

const QSounds = (() => {
    let ctx = null;
    let enabled = true;
    let volume = 0.3;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        return ctx;
    }

    /** Create a gain node with specified volume */
    function createGain(audioCtx, vol = volume) {
        const gain = audioCtx.createGain();
        gain.gain.value = vol;
        gain.connect(audioCtx.destination);
        return gain;
    }

    /** Play a single tone */
    function playTone(freq, duration, type = 'square', vol = volume, detune = 0) {
        if (!enabled) return;
        const audioCtx = getCtx();
        const osc = audioCtx.createOscillator();
        const gain = createGain(audioCtx, vol);

        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune;
        osc.connect(gain);

        // Fade out to avoid clicks
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    }

    /** Play a sequence of notes */
    function playSequence(notes, baseDelay = 0.12) {
        if (!enabled) return;
        notes.forEach((note, i) => {
            setTimeout(() => {
                playTone(note.freq, note.dur || 0.15, note.type || 'square', note.vol || volume);
            }, i * baseDelay * 1000);
        });
    }

    // ==================== Sound Effects ====================

    /** Correct answer — happy ascending ding */
    function correct() {
        playSequence([
            { freq: 523.25, dur: 0.08 },  // C5
            { freq: 659.25, dur: 0.08 },  // E5
            { freq: 783.99, dur: 0.15 },  // G5
        ], 0.08);
    }

    /** Wrong answer — descending buzz */
    function wrong() {
        playSequence([
            { freq: 311.13, dur: 0.12, type: 'sawtooth', vol: 0.2 },
            { freq: 233.08, dur: 0.2, type: 'sawtooth', vol: 0.15 },
        ], 0.12);
    }

    /** Button click — short blip */
    function click() {
        playTone(880, 0.05, 'square', 0.15);
    }

    /** Typewriter key — tiny tick */
    function typeKey() {
        playTone(1200 + Math.random() * 400, 0.02, 'square', 0.06);
    }

    /** Story progression — gentle chime */
    function storyProgress() {
        playSequence([
            { freq: 440, dur: 0.1, type: 'triangle', vol: 0.2 },
            { freq: 554.37, dur: 0.1, type: 'triangle', vol: 0.2 },
            { freq: 659.25, dur: 0.15, type: 'triangle', vol: 0.25 },
        ], 0.1);
    }

    /** XP earned — coin collect sound */
    function xpEarned() {
        playSequence([
            { freq: 987.77, dur: 0.06 },  // B5
            { freq: 1318.51, dur: 0.12 }, // E6
        ], 0.06);
    }

    /** Level complete — triumphant fanfare */
    function levelComplete() {
        playSequence([
            { freq: 523.25, dur: 0.12 },  // C5
            { freq: 523.25, dur: 0.12 },  // C5
            { freq: 523.25, dur: 0.12 },  // C5
            { freq: 523.25, dur: 0.3 },   // C5 (held)
            { freq: 415.30, dur: 0.12 },  // Ab4
            { freq: 466.16, dur: 0.12 },  // Bb4
            { freq: 523.25, dur: 0.12 },  // C5
            { freq: 466.16, dur: 0.08 },  // Bb4
            { freq: 523.25, dur: 0.4 },   // C5 (held)
        ], 0.15);
    }

    /** Quiz start — alert jingle */
    function quizStart() {
        playSequence([
            { freq: 659.25, dur: 0.1, type: 'triangle' },
            { freq: 783.99, dur: 0.1, type: 'triangle' },
            { freq: 987.77, dur: 0.2, type: 'triangle' },
        ], 0.1);
    }

    /** Select option — soft boop */
    function select() {
        playTone(660, 0.04, 'triangle', 0.12);
    }

    /** Hover — very subtle */
    function hover() {
        playTone(1100, 0.02, 'sine', 0.05);
    }

    /** Confetti / celebration burst */
    function confetti() {
        const notes = [523, 659, 784, 1047, 1319, 1568];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                playTone(freq, 0.15, 'square', 0.12 + Math.random() * 0.08);
            }, i * 60 + Math.random() * 30);
        });
    }

    /** Error / warning */
    function error() {
        playTone(200, 0.3, 'sawtooth', 0.15);
    }

    /** Toggle sound on/off */
    function toggle() {
        enabled = !enabled;
        return enabled;
    }

    /** Set volume (0-1) */
    function setVolume(v) {
        volume = Math.max(0, Math.min(1, v));
    }

    return {
        correct,
        wrong,
        click,
        typeKey,
        storyProgress,
        xpEarned,
        levelComplete,
        quizStart,
        select,
        hover,
        confetti,
        error,
        toggle,
        setVolume,
        get enabled() { return enabled; }
    };
})();
