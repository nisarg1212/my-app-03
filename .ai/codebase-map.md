# Questra — Codebase Map

## Directory Structure

```
questra/
├── .ai/                          # AI/LLM context documentation (this folder)
│   ├── README.md
│   ├── project-overview.md
│   ├── codebase-map.md
│   └── decisions-log.md
├── .gitignore
├── main.py                       # FastAPI app entry point + all API routes
├── Procfile                      # Deployment config (Gunicorn + Uvicorn)
├── README.md                     # Project documentation
├── requirements.txt              # Python dependencies
├── test_db.py                    # Database test script
├── questra-complete-context (1).md  # Full project vision/context document
│
├── gamification/                 # XP, levels, achievements engine
│   ├── __init__.py               # Package exports
│   ├── database.py               # SQLAlchemy setup (SQLite at data/questra.db)
│   ├── engine.py                 # Core gamification logic (XP calc, streaks, achievements)
│   ├── models_db.py              # SQLAlchemy ORM models (User, QuestSession tables)
│   └── models.py                 # Pydantic data models (Story, Quiz, Detective, etc.)
│
├── modules/                      # Content generation & game modes
│   ├── __init__.py               # Package exports
│   ├── unified_generator.py      # Main orchestrator: pre-built check → AI generation
│   ├── prebuilt_quests.py        # 1765 lines of hand-crafted quest content (5 topics × 3 levels)
│   ├── story_mode.py             # AI story generation via OpenRouter
│   ├── quiz_mode.py              # AI quiz generation + scoring (5 MCQ, 10 XP each)
│   ├── master_mode.py            # AI master practice generation + scoring (3 MCQ, 20 XP each)
│   └── detective_mode.py         # AI detective case generation + solving (100 XP)
│
├── static/                       # Static assets
│   ├── gamify_logo.png           # Logo image (still old filename — needs rename)
│   ├── css/
│   │   └── style.css             # 1531 lines, retro pixel-art theme
│   └── js/
│       └── app.js                # 796 lines, frontend logic (sessions, UI, TTS)
│
└── templates/
    └── index.html                # Single-page app template (Jinja2)
```

## Key Files in Detail

### `main.py` — Application Entry Point
- Creates FastAPI app instance
- Mounts static files and Jinja2 templates
- Defines all API routes:
  - `GET /` — Serve main page
  - `GET /api/stats` — Get user XP/level/achievements
  - `GET /api/featured-quests` — List pre-built quest topics
  - `POST /api/start-session` — Generate content for a topic (pre-built or AI)
  - `POST /api/complete-story` — Mark story phase complete
  - `POST /api/submit-quiz` — Score quiz answers
  - `POST /api/submit-master` — Score master practice answers
  - `POST /api/solve-case` — Evaluate detective case answer
- Stores active sessions in-memory (`active_sessions` dict)

### `gamification/engine.py` — Gamification Core
- `add_xp(amount)` — Add XP, handle level-ups (100 XP/level)
- `get_stats()` — Return current user progress
- `unlock_achievement(id)` — Grant achievement badge
- `increment_stat(stat_name)` — Track completion counts
- 11 predefined achievements with unlock conditions

### `modules/unified_generator.py` — Content Orchestrator
- Entry point for all content generation
- First checks `prebuilt_quests.py` for topic match
- Falls back to AI generation with 3-model cascade
- Returns structured `LearningSession` with all 4 phases

### `templates/index.html` — Single Page App
- Hero section with featured quests grid + custom topic input
- Session container with sidebar progress tracker
- 4 mode sections: story → quiz → master → detective
- Completion screen with XP summary
- Achievements modal, XP popup, level-up overlay

### `static/js/app.js` — Frontend Logic
- Session lifecycle management (start → progress → complete)
- API communication with backend
- Dynamic UI rendering for each game phase
- Text-to-speech via Web Speech API
- Achievement and level-up animations

### `static/css/style.css` — Styling
- Retro pixel-art theme with Press Start 2P font
- Dark background (#0d0d1a) with gold accents (#ffd700)
- CRT scanline effects, 3D block buttons, pixel borders
- Fully responsive design
