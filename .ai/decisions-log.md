# Questra — Architectural Decisions Log

This file tracks key architectural and project decisions. Add new entries at the top.

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
