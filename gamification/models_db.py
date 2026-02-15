"""SQLAlchemy Database Models — Enhanced Engagement System"""
from sqlalchemy import Column, Integer, String, Text, Boolean, JSON, Float
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, default="Player")
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak_days = Column(Integer, default=0)
    last_active = Column(String, nullable=True)  # Stored as YYYY-MM-DD
    achievements = Column(JSON, default=list)    # Stored as JSON list of strings
    
    # Stats
    stories_completed = Column(Integer, default=0)
    quizzes_passed = Column(Integer, default=0)
    masters_completed = Column(Integer, default=0)
    cases_solved = Column(Integer, default=0)
    
    # Engagement — Combo & Streak
    best_combo = Column(Integer, default=0)
    total_correct = Column(Integer, default=0)
    total_questions = Column(Integer, default=0)
    perfect_rounds = Column(Integer, default=0)
    
    # Daily challenge
    daily_challenge_date = Column(String, nullable=True)  # YYYY-MM-DD
    daily_challenge_completed = Column(Boolean, default=False)
    daily_streak = Column(Integer, default=0)  # consecutive daily challenges
    
    # Retention
    last_session_topic = Column(String, nullable=True)
    last_session_mode = Column(String, nullable=True)
    last_session_id = Column(String, nullable=True)

class QuestSession(Base):
    """Store active or completed sessions"""
    __tablename__ = "sessions"
    
    id = Column(String, primary_key=True)
    topic = Column(String)
    ai_generated = Column(Boolean, default=False)
    created_at = Column(String)  # Timestamp
    completed = Column(Boolean, default=False)
    xp_earned = Column(Integer, default=0)

class LeaderboardEntry(Base):
    """Global leaderboard"""
    __tablename__ = "leaderboard"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    achievements_count = Column(Integer, default=0)
    best_combo = Column(Integer, default=0)
    is_bot = Column(Boolean, default=False)  # For seeded entries
    avatar = Column(String, default="🎮")

class DailyChallenge(Base):
    """Daily challenge definitions"""
    __tablename__ = "daily_challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, unique=True)  # YYYY-MM-DD
    challenge_type = Column(String)  # "speed", "perfect", "streak", "boss"
    title = Column(String)
    description = Column(String)
    target = Column(Integer, default=1)  # e.g., 3 correct in a row
    bonus_xp = Column(Integer, default=50)
    topic = Column(String, nullable=True)
