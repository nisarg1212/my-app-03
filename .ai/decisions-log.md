# Questra — Architectural Decisions Log

This file tracks key architectural and project decisions. Add new entries at the top.

---

## 2026-02-15 — Level 1: AI Agent Adventures + Retro Pixel Theme + Sound + Timer

### Context
Building the first real topic/path — "AI Agent Adventures" Level 1 — as a polished, game-like learning experience. The goal is to create an addictive, Duolingo-beating experience with retro pixel art aesthetics.

### Changes Made
- **New Quest Content:** Added `AI_AGENT_ADVENTURES_QUEST` to `prebuilt_quests.py` with full Level 1 content (story about ARIA the AI Agent, 5 quiz questions, 3 master questions, detective case)
- **Sound System:** Created `static/js/sounds.js` — Web Audio API chiptune sound engine with correct/wrong/click/typewriter/levelComplete/confetti sounds
- **Timer System:** Created `static/js/timer.js` — Phase-level timer tracking with localStorage persistence for future certificates
- **Enhanced CSS:** Added typewriter cursor, story panels, quiz progress bar, correct/wrong animations, confetti canvas, reward screen, pixel explosions, phase transitions, hover micro-interactions
- **Updated app.js:** Integrated sounds throughout all interactions, typewriter story effect, quiz progress tracking, confetti on level complete, animated XP counter, phase transition overlays
- **Updated index.html:** Added timer display, sound toggle, confetti canvas, phase transition overlay, script includes for sounds.js and timer.js

### Design Decisions
1. **Web Audio API over audio files** — Programmatic chiptune sounds are lightweight, customizable, and don't require loading external assets
2. **Typewriter effect** — Creates narrative immersion; includes skip button for returning users
3. **Phase transitions** — Full-screen overlays between story→quiz→master→detective create game-like flow
4. **Timer tracking** — Stored in localStorage for future certificate generation; displayed subtly in header
5. **Confetti system** — Canvas-based pixel confetti on level complete for maximum celebration

---

## 2026-02-14 — Rebrand from "Gamify AI" to "Questra" + Initial Analysis

### Context
The project was originally built as "Gamify AI" — a gamified learning platform with a retro pixel-art aesthetic. The decision was made to rebrand to "Questra" (Quest + era) to better align with the product vision of quest-based, narrative-driven learning.

### Changes Made
- Updated all user-facing branding: HTML title, meta tags, logo text, headings
- Updated all code comments and docstrings referencing "Gamify"
- Updated database filename from `gamify.db` → `questra.db`
- Updated README.md with new branding
- Created `.ai/` context folder for AI/LLM agent onboarding

### What Was NOT Changed (Intentionally)
- **Logo file** (`static/gamify_logo.png`) — still uses old filename; needs new logo design
- **Visual theme** — retro pixel-art aesthetic remains; brand guide calls for purple/cyan/modern
- **Architecture** — no structural changes; this was a branding-only pass
- **Frontend framework** — still vanilla JS; vision calls for React + TailwindCSS
- **Database** — still SQLite; vision calls for PostgreSQL + MongoDB

### Key Findings from Codebase Analysis
1. The app is a working prototype with a complete 4-phase learning flow
2. 5 pre-built quest topics work without any AI/API dependency
3. AI content generation uses OpenRouter with multi-model fallback
4. Sessions are stored in-memory only — lost on server restart
5. No user authentication — single anonymous user per browser
6. The gamification system (XP, levels, achievements) is functional and persisted in SQLite
7. The full vision document (`questra-complete-context (1).md`) describes a significantly more ambitious product than what's currently built

### Recommended Next Steps
1. Design and implement new Questra logo
2. Align visual theme with brand guide (purple/cyan, modern typography)
3. Add user authentication
4. Move to persistent session storage
5. Evaluate migration path to React frontend
