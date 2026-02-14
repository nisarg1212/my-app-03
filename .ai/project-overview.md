# Questra — Project Overview

## What is Questra?

Questra (Quest + era) is an interactive gamified learning platform that transforms any topic into an engaging quest using a 4-phase learning loop:

**Story → Quiz → Master Practice → Detective Challenge → Level Progression**

- **Tagline:** "Your quest. Live now."
- **Domain:** questra.live
- **Status:** Pre-MVP / Working Prototype
- **Origin:** Rebranded from "Gamify AI" on 2026-02-14

## Vision

The full vision (documented in `questra-complete-context (1).md` at repo root) describes Questra as a platform where learners progress through narrative-driven quests with mystery/detective themes. The long-term plan includes:

- B2C freemium model ($9.99/mo premium)
- B2B licensing for schools ($2-5/student/year) and corporations ($50-100/employee/year)
- Topics spanning AI, cybersecurity, finance, Python, data science, history, languages, and more
- Brand identity: Deep purple (#6B46C1), Electric cyan (#06B6D4), Dark charcoal (#1F2937)

## Current Implementation

### Tech Stack (Actual)

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.10+, FastAPI, Pydantic |
| Database | SQLite via SQLAlchemy |
| AI Content | OpenRouter API (Gemini 2.0 Flash, Gemma 3, Llama 3.3 — multi-model fallback) |
| Frontend | Vanilla JS, CSS3 (retro pixel aesthetic — not yet aligned with brand guide) |
| Templating | Jinja2 |
| Deployment | Gunicorn + Uvicorn workers (Render/Railway) |

### Tech Stack (Vision — from context doc)

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + TailwindCSS + Framer Motion |
| Backend | Node.js/Express OR Python/Django |
| Database | PostgreSQL + MongoDB |
| Hosting | Vercel/Netlify + AWS/GCP |
| Payment | Stripe |

### Architecture Pattern

- Monolithic single-page app with FastAPI backend serving Jinja2 templates
- Hybrid content: Pre-built quests (instant, no API) + AI-generated custom topics
- In-memory session storage (not persistent across restarts)
- SQLite persistence for user stats/XP/achievements only
- Multi-model AI fallback (tries 3 models sequentially)
- All content generated in a single API call at session start

### Learning Flow

1. **Story Mode** — 300-400 word narrative with 5 key facts (3-5 min)
2. **Quiz Mode** — 5 multiple-choice questions, 80%+ to proceed (2-3 min)
3. **Master Practice** — 3 advanced MCQ questions (2-3 min)
4. **Detective Mode** — Applied problem-solving case with clues (5-7 min)
5. **Level Progression** — 3 levels per topic, sequential unlocking

### Pre-built Quest Topics

5 topics × 3 levels = 15 complete modules (no AI needed):
- Python Programming
- Black Holes
- Dinosaurs
- DNA/Genetics
- AI/Machine Learning

### Gamification System

- XP: 100 XP per level
- Streaks: Daily login tracking
- 11 achievements (First Quest, Quiz Master, Perfect Score, etc.)
- Level-up celebrations with overlay animations

## Key Gaps (Current vs. Vision)

1. **No user authentication** — single anonymous user per browser
2. **No persistent sessions** — in-memory only, lost on restart
3. **No payment/freemium gate** — all content is free
4. **Retro pixel theme** — doesn't match the brand guide (purple/cyan/modern)
5. **No React frontend** — vanilla JS single-page app
6. **SQLite** — not production-ready for multi-user
7. **No audio narration** — TTS via browser Web Speech API only
