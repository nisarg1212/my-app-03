/**
 * Questra — Ultra Engagement System
 * Confetti, Particles, Combos, Streaks, Achievement Toasts,
 * Screen Shake, XP Floats, Daily Challenges
 */

// ==================== CONFETTI ENGINE ====================

class ConfettiEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animating = false;
    }

    init() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'confetti-canvas';
            this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    launch(count = 80, duration = 3000) {
        if (!this.ctx) this.init();
        
        const colors = ['#fbbf24', '#22c55e', '#06b6d4', '#f472b6', '#8b5cf6', '#ef4444', '#f97316'];
        const shapes = ['rect', 'circle', 'triangle'];
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -20 - Math.random() * 100,
                w: 4 + Math.random() * 8,
                h: 4 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                vx: (Math.random() - 0.5) * 6,
                vy: 2 + Math.random() * 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
                decay: 0.003 + Math.random() * 0.005
            });
        }

        if (!this.animating) {
            this.animating = true;
            this.animate();
        }

        setTimeout(() => {
            this.particles.forEach(p => p.decay = 0.02);
        }, duration);
    }

    burst(x, y, count = 30) {
        if (!this.ctx) this.init();
        
        const colors = ['#fbbf24', '#22c55e', '#06b6d4', '#f472b6', '#8b5cf6'];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 6;
            this.particles.push({
                x, y,
                w: 3 + Math.random() * 5,
                h: 3 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: 'circle',
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 15,
                opacity: 1,
                decay: 0.015 + Math.random() * 0.01
            });
        }

        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }

    animate() {
        if (!this.ctx || this.particles.length === 0) {
            this.animating = false;
            if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0) return false;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            } else if (p.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(0, -p.h / 2);
                this.ctx.lineTo(p.w / 2, p.h / 2);
                this.ctx.lineTo(-p.w / 2, p.h / 2);
                this.ctx.closePath();
                this.ctx.fill();
            }

            this.ctx.restore();
            return true;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==================== COMBO TRACKER ====================

class ComboTracker {
    constructor() {
        this.current = 0;
        this.best = 0;
        this.display = null;
    }

    init() {
        // Create combo display if not exists
        if (!document.querySelector('.combo-display')) {
            const div = document.createElement('div');
            div.className = 'combo-display hidden';
            div.innerHTML = `
                <div class="combo-number" id="combo-number">0</div>
                <div class="combo-label">COMBO</div>
                <div class="combo-multiplier" id="combo-multiplier-text">1.0x XP</div>
            `;
            document.body.appendChild(div);
        }
        this.display = document.querySelector('.combo-display');
    }

    hit() {
        this.current++;
        if (this.current > this.best) this.best = this.current;
        this.updateDisplay();
        
        // Screen shake on milestones
        if (this.current === 5) screenShake('light');
        if (this.current === 10) screenShake('medium');
        if (this.current >= 15) screenShake('heavy');
        
        return this.getMultiplier();
    }

    miss() {
        const wasHigh = this.current >= 5;
        this.current = 0;
        this.updateDisplay();
        if (wasHigh) screenShake('light');
    }

    getMultiplier() {
        if (this.current >= 20) return 3.0;
        if (this.current >= 15) return 2.5;
        if (this.current >= 10) return 2.0;
        if (this.current >= 5) return 1.5;
        if (this.current >= 3) return 1.2;
        return 1.0;
    }

    updateDisplay() {
        if (!this.display) this.init();
        
        const numEl = document.getElementById('combo-number');
        const multEl = document.getElementById('combo-multiplier-text');
        
        if (this.current >= 3) {
            this.display.classList.remove('hidden');
            this.display.classList.add('visible');
            if (numEl) numEl.textContent = this.current;
            if (multEl) multEl.textContent = `${this.getMultiplier()}x XP`;
            
            // Fire mode at 10+
            if (this.current >= 10) {
                this.display.classList.add('combo-fire');
            } else {
                this.display.classList.remove('combo-fire');
            }
        } else {
            this.display.classList.remove('visible');
            this.display.classList.add('hidden');
            this.display.classList.remove('combo-fire');
        }
    }

    async save() {
        try {
            await fetch('/api/combo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    combo: this.best,
                    correct: this.current,
                    total: 0,
                    is_perfect: false
                })
            });
        } catch (e) {
            console.error('Combo save error:', e);
        }
    }

    reset() {
        this.current = 0;
        this.best = 0;
        this.updateDisplay();
    }
}

// ==================== ACHIEVEMENT TOAST ====================

class AchievementToaster {
    constructor() {
        this.queue = [];
        this.showing = false;
    }

    show(achievement) {
        this.queue.push(achievement);
        if (!this.showing) this.processQueue();
    }

    processQueue() {
        if (this.queue.length === 0) {
            this.showing = false;
            return;
        }

        this.showing = true;
        const ach = this.queue.shift();

        // Create toast
        let toast = document.querySelector('.achievement-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'achievement-toast';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="achievement-toast-icon">${ach.icon || '🏆'}</div>
            <div class="achievement-toast-info">
                <div class="achievement-toast-label">🔓 ACHIEVEMENT UNLOCKED</div>
                <div class="achievement-toast-name">${ach.name || 'Achievement'}</div>
                <div class="achievement-toast-xp">+${ach.xp || 0} XP</div>
            </div>
        `;

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Launch confetti
        if (window.confetti) {
            window.confetti.launch(40, 2000);
        }

        // Screen shake
        screenShake('medium');

        // Hide after 3.5s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => this.processQueue(), 500);
        }, 3500);
    }
}

// ==================== XP FLOAT ====================

function showXPFloat(amount, x, y) {
    const float = document.createElement('div');
    float.className = 'xp-float';
    float.textContent = `+${amount} XP`;
    float.style.left = (x || window.innerWidth / 2) + 'px';
    float.style.top = (y || window.innerHeight / 2) + 'px';
    document.body.appendChild(float);
    
    setTimeout(() => float.remove(), 1500);
}

// ==================== SCREEN SHAKE ====================

function screenShake(intensity = 'light') {
    document.body.classList.remove('shake-light', 'shake-medium', 'shake-heavy');
    void document.body.offsetWidth; // Force reflow
    document.body.classList.add(`shake-${intensity}`);
    setTimeout(() => {
        document.body.classList.remove(`shake-${intensity}`);
    }, 600);
}

// ==================== PARTICLE BURST ====================

function particleBurst(element, color = '#22c55e') {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const colors = ['#fbbf24', '#22c55e', '#06b6d4', '#f472b6', '#8b5cf6'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${colors[i % colors.length]};
            left: ${cx}px;
            top: ${cy}px;
            pointer-events: none;
            z-index: 9998;
        `;
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animation = 'particleBurst 0.6s ease-out forwards';
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// ==================== CORRECT/INCORRECT FLASH ====================

function flashCorrect(element) {
    element.classList.add('flash-correct');
    setTimeout(() => element.classList.remove('flash-correct'), 500);
}

function flashIncorrect(element) {
    element.classList.add('flash-incorrect');
    setTimeout(() => element.classList.remove('flash-incorrect'), 500);
}

// ==================== DAILY CHALLENGE ====================

async function loadDailyChallenge() {
    try {
        const res = await fetch('/api/daily-challenge');
        const data = await res.json();
        return data;
    } catch (e) {
        console.error('Daily challenge error:', e);
        return null;
    }
}

function renderDailyChallengeBanner(data, container) {
    if (!data || !container) return;
    
    const completed = data.completed;
    const html = `
        <div class="daily-challenge-bar ${completed ? 'completed' : ''}" onclick="${completed ? '' : 'window.location.href=\'/\''}">
            <span class="daily-icon">${completed ? '✅' : '🌟'}</span>
            <div class="daily-info">
                <div class="daily-title">${data.title || 'DAILY CHALLENGE'}</div>
                <div class="daily-desc">${completed ? 'Completed! Come back tomorrow.' : data.description}</div>
            </div>
            <span class="daily-reward">${completed ? 'DONE' : `+${data.bonus_xp} XP`}</span>
            ${data.daily_streak > 1 ? `<span class="daily-streak-badge">🔥 ${data.daily_streak} DAY STREAK</span>` : ''}
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', html);
}

// ==================== CONTINUE PROMPT ====================

function renderContinuePrompt(stats, container) {
    if (!stats || !container) return;
    if (!stats.last_session_topic || !stats.last_session_id) return;
    
    const html = `
        <div class="continue-prompt" onclick="continuePreviousSession('${stats.last_session_topic}')">
            <span class="continue-icon">▶️</span>
            <div class="continue-info">
                <div class="continue-label">CONTINUE WHERE YOU LEFT OFF</div>
                <div class="continue-topic">${stats.last_session_topic}</div>
            </div>
            <span class="continue-arrow">→</span>
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', html);
}

function continuePreviousSession(topic) {
    const topicInput = document.getElementById('topic-input');
    if (topicInput) {
        topicInput.value = topic;
        if (typeof startLearning === 'function') {
            startLearning();
        }
    }
}

// ==================== ENHANCED LEVEL UP ====================

function showLevelUp(newLevel) {
    const overlay = document.getElementById('level-up-overlay');
    const levelNum = document.getElementById('new-level');
    
    if (overlay && levelNum) {
        levelNum.textContent = newLevel;
        overlay.classList.add('active');
        
        // Confetti explosion
        if (window.confetti) {
            window.confetti.launch(120, 4000);
        }
        
        // Screen shake
        screenShake('heavy');
        
        // Auto-hide after 3s
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 3000);
    }
}

// ==================== INITIALIZE ====================

// Global instances
window.confetti = new ConfettiEngine();
window.comboTracker = new ComboTracker();
window.achievementToaster = new AchievementToaster();

// Export functions
window.showXPFloat = showXPFloat;
window.screenShake = screenShake;
window.particleBurst = particleBurst;
window.flashCorrect = flashCorrect;
window.flashIncorrect = flashIncorrect;
window.loadDailyChallenge = loadDailyChallenge;
window.renderDailyChallengeBanner = renderDailyChallengeBanner;
window.renderContinuePrompt = renderContinuePrompt;
window.continuePreviousSession = continuePreviousSession;
window.showLevelUp = showLevelUp;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.confetti.init();
    window.comboTracker.init();
});
