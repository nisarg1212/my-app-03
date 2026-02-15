/**
 * Questra — Timer Tracking System
 * Tracks time spent on each phase and total level completion time.
 * Stores data for future certificate generation.
 */

const QTimer = (() => {
    let startTime = null;
    let phaseStartTime = null;
    let currentPhase = null;
    let phaseTimes = {};
    let timerInterval = null;
    let displayEl = null;
    let paused = false;
    let pausedAt = null;
    let totalPausedMs = 0;

    /** Start the overall level timer */
    function startLevel() {
        startTime = Date.now();
        phaseTimes = {};
        totalPausedMs = 0;
        paused = false;
        _startDisplay();
    }

    /** Start timing a specific phase */
    function startPhase(phaseName) {
        if (currentPhase) {
            endPhase();
        }
        currentPhase = phaseName;
        phaseStartTime = Date.now();
    }

    /** End the current phase and record its time */
    function endPhase() {
        if (currentPhase && phaseStartTime) {
            const elapsed = Date.now() - phaseStartTime;
            phaseTimes[currentPhase] = (phaseTimes[currentPhase] || 0) + elapsed;
        }
        currentPhase = null;
        phaseStartTime = null;
    }

    /** Stop the level timer and return results */
    function stopLevel() {
        endPhase();
        _stopDisplay();
        if (!startTime) return null;

        const totalMs = Date.now() - startTime - totalPausedMs;
        const result = {
            totalMs,
            totalFormatted: formatTime(totalMs),
            phases: {}
        };

        for (const [phase, ms] of Object.entries(phaseTimes)) {
            result.phases[phase] = {
                ms,
                formatted: formatTime(ms)
            };
        }

        // Store in localStorage for certificate generation
        _storeCompletion(result);

        return result;
    }

    /** Format milliseconds to MM:SS or HH:MM:SS */
    function formatTime(ms) {
        const totalSec = Math.floor(ms / 1000);
        const hours = Math.floor(totalSec / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }

    /** Get current elapsed time */
    function getElapsed() {
        if (!startTime) return 0;
        const pauseOffset = paused ? (Date.now() - pausedAt) : 0;
        return Date.now() - startTime - totalPausedMs - pauseOffset;
    }

    /** Pause the timer */
    function pause() {
        if (!paused && startTime) {
            paused = true;
            pausedAt = Date.now();
        }
    }

    /** Resume the timer */
    function resume() {
        if (paused && pausedAt) {
            totalPausedMs += Date.now() - pausedAt;
            paused = false;
            pausedAt = null;
        }
    }

    /** Set the DOM element to display the timer */
    function setDisplay(elementId) {
        displayEl = document.getElementById(elementId);
    }

    /** Start the display update interval */
    function _startDisplay() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (displayEl && !paused) {
                displayEl.textContent = formatTime(getElapsed());
            }
        }, 1000);
    }

    /** Stop the display update interval */
    function _stopDisplay() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    /** Store completion data in localStorage */
    function _storeCompletion(result) {
        try {
            const completions = JSON.parse(localStorage.getItem('questra_completions') || '[]');
            completions.push({
                timestamp: new Date().toISOString(),
                ...result
            });
            // Keep last 50 completions
            if (completions.length > 50) completions.splice(0, completions.length - 50);
            localStorage.setItem('questra_completions', JSON.stringify(completions));
        } catch (e) {
            console.warn('Could not store completion data:', e);
        }
    }

    /** Get stored completions */
    function getCompletions() {
        try {
            return JSON.parse(localStorage.getItem('questra_completions') || '[]');
        } catch (e) {
            return [];
        }
    }

    return {
        startLevel,
        startPhase,
        endPhase,
        stopLevel,
        formatTime,
        getElapsed,
        pause,
        resume,
        setDisplay,
        getCompletions
    };
})();
