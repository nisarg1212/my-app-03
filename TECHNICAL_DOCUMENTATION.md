# Questra Technical Documentation

## Overview

**Questra** is an interactive, gamified learning platform built with FastAPI. It transforms educational content into engaging quests with XP rewards, achievements, and multiple learning modes.

---

## Architecture

### Technology Stack

| Layer              | Technology                            |
| ------------------ | ------------------------------------- |
| **Backend**        | FastAPI (Python 3.x)                  |
| **Database**       | SQLite with SQLAlchemy ORM            |
| **Frontend**       | Vanilla JavaScript, HTML5, CSS3       |
| **AI Integration** | OpenRouter API (multi-model fallback) |
| **Server**         | Uvicorn ASGI server                   |

### Project Structure

```
my-app-03/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── Procfile               # Deployment configuration
├── data/                  # SQLite database storage
│   └── questra.db
├── gamification/          # Core gamification engine
│   ├── __init__.py
│   ├── database.py        # SQLAlchemy connection
│   ├── engine.py          # XP, levels, achievements logic
│   ├── models.py          # Pydantic data models
│   └── models_db.py       # SQLAlchemy ORM models
├── modules/               # Learning content generators
│   ├── __init__.py
│   ├── detective_mode.py  # Mystery case generation
│   ├── master_mode.py     # Advanced practice questions
│   ├── prebuilt_quests.py # Pre-built quest content
│   ├── quiz_mode.py       # Quiz generation/scoring
│   ├── story_mode.py      # Story generation
│   └── unified_generator.py # Hybrid content generator
├── static/                # Frontend assets
│   ├── css/
│   │   ├── style.css      # Main styles (40KB)
│   │   ├── level1.css     # Level 1 specific styles (54KB)
│   │   └── level1_intro.css
│   ├── js/
│   │   ├── app.js         # Main frontend logic (28KB)
│   │   ├── level1.js      # Level 1 game logic (90KB)
│   │   └── level1_intro.js # Level 1 intro animations
│   └── images/
└── templates/             # Jinja2 HTML templates
    ├── index.html         # Main dashboard
    ├── level1.html        # Level 1 game page
    └── level1_intro.html  # Level 1 intro cinematic
```

---

## Backend Components

### 1. Main Application ([`main.py`](main.py))

**FastAPI Configuration:**

- Host: `0.0.0.0`
- Port: `8000`
- CORS: Enabled for all origins

**Key Routes:**

| Endpoint                           | Method | Description                 |
| ---------------------------------- | ------ | --------------------------- |
| `/`                                | GET    | Main dashboard              |
| `/api/stats`                       | GET    | User gamification stats     |
| `/api/featured-quests`             | GET    | List pre-built quests       |
| `/level/ai-agents/1`               | GET    | AI Agent Adventures Level 1 |
| `/level/ai-agents/1/intro`         | GET    | Level 1 intro cinematic     |
| `/level/ai-agents/1/trial`         | GET    | Level 1 trial/challenge     |
| `/api/level1/complete`             | POST   | Record Level 1 completion   |
| `/api/session/start`               | POST   | Start new learning session  |
| `/api/session/{id}/complete-story` | POST   | Complete story mode         |
| `/api/session/{id}/submit-quiz`    | POST   | Submit quiz answers         |
| `/api/session/{id}/submit-master`  | POST   | Submit master practice      |
| `/api/session/{id}/solve-case`     | POST   | Solve detective case        |

**Request Models (Pydantic):**

```python
class TopicRequest(BaseModel):
    topic: str
    api_key: Optional[str] = None

class QuizAnswers(BaseModel):
    answers: List[int]

class Level1Completion(BaseModel):
    xp_earned: int = 0
    time_elapsed: str = "00:00"
    accuracy: int = 0
    best_streak: int = 0
    correct_count: int = 0
    total_questions: int = 0
```

### 2. Gamification Engine ([`gamification/engine.py`](gamification/engine.py))

**XP & Leveling System:**

- 100 XP per level
- Level = `(XP // 100) + 1`
- XP to next level = `(current_level * 100) - current_xp`

**Achievement Definitions:**

| ID               | Name           | Description              | Icon |
| ---------------- | -------------- | ------------------------ | ---- |
| `first_story`    | Story Seeker   | Complete first story     | 📖   |
| `storyteller`    | Storyteller    | Complete 10 stories      | 📚   |
| `quiz_novice`    | Quiz Novice    | Pass first quiz          | ❓   |
| `quiz_master`    | Quiz Master    | Get 100% on quiz         | 🎓   |
| `master_student` | Master Student | Complete master practice | 🏆   |
| `detective`      | Detective      | Solve first case         | 🔍   |
| `sherlock`       | Sherlock       | Solve 5 cases            | 🕵️   |
| `streak_3`       | On Fire        | 3 day streak             | 🔥   |
| `streak_7`       | Unstoppable    | 7 day streak             | ⚡   |
| `level_5`        | Rising Star    | Reach level 5            | ⭐   |
| `level_10`       | Champion       | Reach level 10           | 👑   |

**Core Functions:**

- [`get_stats()`](gamification/engine.py:47) - Retrieve user progress
- [`add_xp(amount, reason)`](gamification/engine.py:107) - Add XP with level-up detection
- [`unlock_achievement(achievement_id)`](gamification/engine.py:68) - Unlock achievements
- [`increment_stat(stat_name)`](gamification/engine.py:89) - Update completion counters

### 3. Database Layer ([`gamification/database.py`](gamification/database.py))

**Configuration:**

- Engine: SQLite
- Location: `data/questra.db`
- Session Factory: `SessionLocal` with autocommit=False

**Connection String:**

```python
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_FILE}"
```

### 4. Data Models

**Pydantic Models ([`gamification/models.py`](gamification/models.py)):**

```python
# User Progress
class UserProgress(BaseModel):
    xp: int = 0
    level: int = 1
    streak_days: int = 0
    achievements: List[str] = []
    stories_completed: int = 0
    quizzes_passed: int = 0
    masters_completed: int = 0
    cases_solved: int = 0

# Story Content
class Story(BaseModel):
    topic: str
    title: str
    content: str
    key_facts: List[str]
    xp_reward: int = 15

# Quiz System
class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correct_index: int
    explanation: str

class Quiz(BaseModel):
    topic: str
    questions: List[QuizQuestion]
    difficulty: str = "basic"
    total_xp: int = 50

# Master Practice
class MasterQuestion(BaseModel):
    question: str
    question_type: str
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: str
    xp_reward: int = 20

# Detective Mode
class Clue(BaseModel):
    id: int
    description: str
    is_key_clue: bool = False

class DetectiveCase(BaseModel):
    topic: str
    case_title: str
    scenario: str
    clues: List[Clue]
    question: str
    correct_answer: str
    explanation: str
    xp_reward: int = 100

# Session State
class LearningSession(BaseModel):
    session_id: str
    topic: str
    current_mode: str  # story, quiz, master, detective
    story: Optional[Story] = None
    quiz: Optional[Quiz] = None
    master: Optional[MasterPractice] = None
    detective: Optional[DetectiveCase] = None
    total_xp_earned: int = 0
```

---

## Learning Modules

### 1. Unified Generator ([`modules/unified_generator.py`](modules/unified_generator.py))

**Hybrid Content Generation:**

1. Checks for pre-built quests first (instant, no API)
2. Falls back to AI generation with multi-model support

**AI Models (Fallback Chain):**

```python
MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "google/gemma-3-27b-it:free",
    "meta-llama/llama-3.3-70b-instruct:free",
]
```

**API Configuration:**

- Base URL: `https://openrouter.ai/api/v1`
- Timeout: 60 seconds
- Max Tokens: 3000

**Content Generation Flow:**

```
Topic Input → Check Pre-built → Match Found?
                                    ↓ Yes → Return cached content
                                    ↓ No
                            Try AI Model 1 → Success? → Return
                                    ↓ Failed
                            Try AI Model 2 → Success? → Return
                                    ↓ Failed
                            Try AI Model 3 → Success? → Return
                                    ↓ Failed
                            Return Error Message
```

### 2. Quiz Mode ([`modules/quiz_mode.py`](modules/quiz_mode.py))

**Scoring Logic:**

```python
base_xp = correct_answers * 10
bonus_xp = 20 if percentage >= 80 else 0
total_xp = base_xp + bonus_xp
passed = percentage >= 60
```

### 3. Detective Mode ([`modules/detective_mode.py`](modules/detective_mode.py))

**Answer Matching:**

- Single letter answers (A, B, C, D): Matches against answer prefixes
- Full text answers: Uses substring matching with 5+ character overlap

### 4. Pre-built Quests ([`modules/prebuilt_quests.py`](modules/prebuilt_quests.py))

**Available Quests:**

- Python Programming (3 levels)
- AI Agents (featured)
- Black Holes
- Climate Change
- And more...

**Quest Structure:**

```python
QUEST = {
    1: {  # Level
        "topic": "Subject",
        "story": Story(...),
        "quiz": Quiz(...),
        "master": MasterPractice(...),
        "detective": DetectiveCase(...)
    }
}
```

---

## Frontend Architecture

### Main Application ([`static/js/app.js`](static/js/app.js))

**Session State:**

```javascript
let currentSession = null;
let currentLevel = 1;
let maxLevel = 3;
let selectedQuizAnswers = [];
let selectedMasterAnswers = [];
```

**Key Functions:**

- `startLearning()` - Initiates new learning session
- `loadStats()` - Fetches user stats from API
- `loadFeaturedQuests()` - Loads pre-built quest list
- `completeStory()` - Marks story complete, shows quiz
- `submitQuiz()` - Submits answers, shows master practice
- `submitMaster()` - Submits master answers, shows detective
- `solveCase()` - Submits detective solution

### Level 1 Game ([`static/js/level1.js`](static/js/level1.js))

**Game Features:**

- Lives system (3 hearts)
- Streak multiplier for XP
- Timer tracking
- Progress persistence
- Sound effects

**Game State:**

```javascript
const gameState = {
  lives: 3,
  score: 0,
  streak: 0,
  currentQuestion: 0,
  questions: [],
  timeStarted: null,
};
```

---

## API Endpoints Detail

### Session Flow

```
POST /api/session/start
    ↓ Returns session_id + story
POST /api/session/{id}/complete-story
    ↓ Returns quiz questions
POST /api/session/{id}/submit-quiz
    ↓ Returns results + master questions
POST /api/session/{id}/submit-master
    ↓ Returns results + detective case
POST /api/session/{id}/solve-case
    ↓ Returns final results + total XP
```

### Response Examples

**Start Session:**

```json
{
  "session_id": "abc12345",
  "topic": "Python Programming",
  "ai_generated": true,
  "source": "prebuilt (Level 1)",
  "story": {
    "title": "The Serpent's Code",
    "content": "...",
    "xp_reward": 15
  }
}
```

**Submit Quiz:**

```json
{
    "correct": 4,
    "total": 5,
    "percentage": 80.0,
    "xp_earned": 60,
    "bonus_xp": 20,
    "passed": true,
    "results": [...],
    "next_mode": "master",
    "master": {
        "questions": [...],
        "total_xp": 100
    }
}
```

---

## Database Schema

### User Table

| Column            | Type    | Description             |
| ----------------- | ------- | ----------------------- |
| id                | Integer | Primary key             |
| username          | String  | User display name       |
| xp                | Integer | Total XP earned         |
| level             | Integer | Current level           |
| streak_days       | Integer | Consecutive days active |
| last_active       | String  | Last activity date      |
| achievements      | JSON    | List of achievement IDs |
| stories_completed | Integer | Story counter           |
| quizzes_passed    | Integer | Quiz counter            |
| masters_completed | Integer | Master practice counter |
| cases_solved      | Integer | Detective case counter  |

---

## Configuration

### Environment Variables

```bash
OPENROUTER_API_KEY=your_api_key_here
```

### Dependencies ([`requirements.txt`](requirements.txt))

```
fastapi           # Web framework
uvicorn[standard] # ASGI server
python-dotenv     # Environment management
google-generativeai  # Google AI SDK
python-multipart # Form handling
pydantic          # Data validation
jinja2            # Template engine
sqlalchemy        # ORM
gunicorn          # Production server
openai            # OpenAI/OpenRouter client
httpx             # HTTP client with timeout
```

---

## Deployment

### Procfile

```
web: gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

### Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py

# Server runs at http://localhost:8000
```

---

## Key Features

### 1. Multi-Mode Learning

- **Story Mode**: Narrative-driven content introduction
- **Quiz Mode**: Basic comprehension testing
- **Master Mode**: Advanced application questions
- **Detective Mode**: Mystery-solving with learned concepts

### 2. Gamification

- XP-based progression system
- 11 unlockable achievements
- Daily streak tracking
- Level progression (100 XP/level)

### 3. AI Integration

- Multi-model fallback for reliability
- 60-second timeout handling
- Graceful degradation to pre-built content

### 4. Featured Adventures

- AI Agent Adventures (Level 1: The Awakening)
- Cinematic intro sequences
- Lives system with streak bonuses
- Completion certificates

---

## File Sizes

| File                                                       | Size  | Purpose            |
| ---------------------------------------------------------- | ----- | ------------------ |
| [`static/js/level1.js`](static/js/level1.js)               | 90KB  | Level 1 game logic |
| [`static/css/level1.css`](static/css/level1.css)           | 55KB  | Level 1 styling    |
| [`static/css/style.css`](static/css/style.css)             | 41KB  | Main styles        |
| [`static/js/app.js`](static/js/app.js)                     | 28KB  | Main frontend      |
| [`modules/prebuilt_quests.py`](modules/prebuilt_quests.py) | 105KB | Pre-built content  |

---

## Security Considerations

1. **API Keys**: Stored in localStorage (client) and environment variables (server)
2. **CORS**: Currently open to all origins (`allow_origins=["*"]`)
3. **Session Storage**: In-memory dictionary (not persistent across restarts)
4. **Input Validation**: Pydantic models for all API inputs

---

## Performance Notes

1. **Pre-built Quests**: Instant response, no API calls
2. **AI Generation**: 60s timeout, multi-model fallback
3. **Database**: SQLite with connection pooling
4. **Static Files**: Served directly by FastAPI

---

## Future Enhancements

- Persistent session storage (Redis/database)
- User authentication system
- Leaderboards and social features
- Additional pre-built quests
- Mobile-responsive improvements
- Sound/music toggle persistence
