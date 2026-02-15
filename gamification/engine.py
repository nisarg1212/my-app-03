"""Gamification Engine — XP, Levels, Achievements, Combos, Daily Challenges, Leaderboard"""
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session
import random

from .database import SessionLocal, engine
from .models_db import Base, User, LeaderboardEntry, DailyChallenge
from .models import UserProgress

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# ==================== Achievement Definitions ====================

ACHIEVEMENTS = {
    # Original
    "first_story": {"name": "Story Seeker", "desc": "Complete your first story", "icon": "📖", "xp": 25},
    "storyteller": {"name": "Storyteller", "desc": "Complete 10 stories", "icon": "📚", "xp": 100},
    "quiz_novice": {"name": "Quiz Novice", "desc": "Pass your first quiz", "icon": "❓", "xp": 25},
    "quiz_master": {"name": "Quiz Master", "desc": "Get 100% on a quiz", "icon": "🎓", "xp": 75},
    "master_student": {"name": "Master Student", "desc": "Complete master practice", "icon": "🏆", "xp": 50},
    "detective": {"name": "Detective", "desc": "Solve your first case", "icon": "🔍", "xp": 25},
    "sherlock": {"name": "Sherlock", "desc": "Solve 5 cases", "icon": "🕵️", "xp": 100},
    "streak_3": {"name": "On Fire", "desc": "3 day streak", "icon": "🔥", "xp": 50},
    "streak_7": {"name": "Unstoppable", "desc": "7 day streak", "icon": "⚡", "xp": 150},
    "level_5": {"name": "Rising Star", "desc": "Reach level 5", "icon": "⭐", "xp": 100},
    "level_10": {"name": "Champion", "desc": "Reach level 10", "icon": "👑", "xp": 250},
    # NEW — Engagement achievements
    "combo_5": {"name": "Combo Starter", "desc": "Get a 5x combo streak", "icon": "🔗", "xp": 30},
    "combo_10": {"name": "Combo King", "desc": "Get a 10x combo streak", "icon": "💥", "xp": 75},
    "combo_20": {"name": "UNSTOPPABLE", "desc": "Get a 20x combo streak", "icon": "🌟", "xp": 200},
    "perfect_round": {"name": "Perfect Score", "desc": "Get 100% on any round", "icon": "💎", "xp": 50},
    "perfect_3": {"name": "Triple Perfect", "desc": "Get 3 perfect rounds", "icon": "🏅", "xp": 150},
    "speed_demon": {"name": "Speed Demon", "desc": "Complete a quiz in under 30s", "icon": "⏱️", "xp": 75},
    "daily_first": {"name": "Daily Warrior", "desc": "Complete your first daily challenge", "icon": "🌅", "xp": 30},
    "daily_7": {"name": "Weekly Champion", "desc": "Complete 7 daily challenges", "icon": "📅", "xp": 150},
    "xp_500": {"name": "XP Hunter", "desc": "Earn 500 total XP", "icon": "💰", "xp": 50},
    "xp_2000": {"name": "XP Legend", "desc": "Earn 2000 total XP", "icon": "🤑", "xp": 150},
    "first_quest": {"name": "First Quest", "desc": "Complete your first full quest", "icon": "🗡️", "xp": 30},
    "night_owl": {"name": "Night Owl", "desc": "Study after midnight", "icon": "🦉", "xp": 25},
    "early_bird": {"name": "Early Bird", "desc": "Study before 7 AM", "icon": "🐦", "xp": 25},
}

# ==================== Level Calculations ====================

def calculate_level(xp: int) -> int:
    """Calculate level from XP (100 XP per level, scaling)"""
    return (xp // 100) + 1

def xp_for_next_level(current_xp: int) -> int:
    """XP needed for next level"""
    current_level = calculate_level(current_xp)
    return (current_level * 100) - current_xp

def xp_progress_percent(current_xp: int) -> float:
    """Percentage progress to next level"""
    level = calculate_level(current_xp)
    level_start = (level - 1) * 100
    return min(100, ((current_xp - level_start) / 100) * 100)

# ==================== DB Helpers ====================

def get_db_user(db: Session) -> User:
    """Get the primary user or create if not exists"""
    user = db.query(User).first()
    if not user:
        user = User(username="Player", xp=0, level=1, achievements=[])
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

# ==================== Core Stats ====================

def get_stats() -> Dict[str, Any]:
    """Get current user stats with engagement data"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        level = calculate_level(user.xp)
        
        # Check time-based achievements
        hour = datetime.now().hour
        time_achievements = []
        if hour >= 0 and hour < 5:
            time_achievements.append("night_owl")
        if hour >= 5 and hour < 7:
            time_achievements.append("early_bird")
        
        return {
            "xp": user.xp,
            "level": level,
            "xp_next": xp_for_next_level(user.xp),
            "xp_progress_percent": xp_progress_percent(user.xp),
            "streak": user.streak_days,
            "achievements": user.achievements or [],
            "total_achievements": len(ACHIEVEMENTS),
            "stats": {
                "stories": user.stories_completed,
                "quizzes": user.quizzes_passed,
                "masters": user.masters_completed,
                "cases": user.cases_solved
            },
            # Engagement data
            "best_combo": user.best_combo or 0,
            "total_correct": user.total_correct or 0,
            "total_questions": user.total_questions or 0,
            "perfect_rounds": user.perfect_rounds or 0,
            "daily_streak": user.daily_streak or 0,
            "daily_challenge_completed": user.daily_challenge_completed or False,
            # Retention
            "last_session_topic": user.last_session_topic,
            "last_session_mode": user.last_session_mode,
            "last_session_id": user.last_session_id,
        }
    finally:
        db.close()

# ==================== XP & Achievements ====================

def unlock_achievement(achievement_id: str) -> bool:
    """Unlock an achievement directly"""
    if achievement_id not in ACHIEVEMENTS:
        return False
        
    db = SessionLocal()
    try:
        user = get_db_user(db)
        current_achievements = list(user.achievements) if user.achievements else []
        
        if achievement_id not in current_achievements:
            current_achievements.append(achievement_id)
            user.achievements = current_achievements
            # Bonus XP for achievement
            bonus = ACHIEVEMENTS[achievement_id].get("xp", 0)
            if bonus:
                user.xp += bonus
                user.level = calculate_level(user.xp)
            db.commit()
            return True
        return False
    finally:
        db.close()

def increment_stat(stat_name: str) -> None:
    """Increment a specific stat"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        if stat_name in ["stories_completed", "stories"]:
            user.stories_completed += 1
        elif stat_name in ["quizzes_passed", "quizzes"]:
            user.quizzes_passed += 1
        elif stat_name in ["masters_completed", "masters"]:
            user.masters_completed += 1
        elif stat_name in ["cases_solved", "cases"]:
            user.cases_solved += 1
        db.commit()
    finally:
        db.close()

def add_xp(amount: int, reason: str = "") -> dict:
    """Add XP and check for level ups and achievements"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        old_level = calculate_level(user.xp)
        
        user.xp += amount
        new_level = calculate_level(user.xp)
        user.level = new_level
        
        # Check streak
        today = datetime.now().strftime("%Y-%m-%d")
        if user.last_active:
            last = datetime.strptime(user.last_active, "%Y-%m-%d")
            diff = (datetime.now() - last).days
            if diff == 1:
                user.streak_days += 1
            elif diff > 1:
                user.streak_days = 1
        else:
            user.streak_days = 1
        user.last_active = today
        
        # Check achievements
        new_achievements = []
        current_achievements = list(user.achievements) if user.achievements else []
        
        def try_unlock(aid):
            if aid not in current_achievements and aid in ACHIEVEMENTS:
                current_achievements.append(aid)
                new_achievements.append({**ACHIEVEMENTS[aid], "id": aid})
                # Bonus XP for achievement
                bonus = ACHIEVEMENTS[aid].get("xp", 0)
                if bonus:
                    user.xp += bonus
        
        # Streak achievements
        if user.streak_days >= 3: try_unlock("streak_3")
        if user.streak_days >= 7: try_unlock("streak_7")
        
        # Level achievements
        if new_level >= 5: try_unlock("level_5")
        if new_level >= 10: try_unlock("level_10")
        
        # Stat-based achievements
        if user.stories_completed >= 1: try_unlock("first_story")
        if user.stories_completed >= 10: try_unlock("storyteller")
        if user.quizzes_passed >= 1: try_unlock("quiz_novice")
        if user.cases_solved >= 1: try_unlock("detective")
        if user.cases_solved >= 5: try_unlock("sherlock")
        
        # XP milestones
        if user.xp >= 500: try_unlock("xp_500")
        if user.xp >= 2000: try_unlock("xp_2000")
        
        # Combo achievements
        if (user.best_combo or 0) >= 5: try_unlock("combo_5")
        if (user.best_combo or 0) >= 10: try_unlock("combo_10")
        if (user.best_combo or 0) >= 20: try_unlock("combo_20")
        
        # Perfect round achievements
        if (user.perfect_rounds or 0) >= 1: try_unlock("perfect_round")
        if (user.perfect_rounds or 0) >= 3: try_unlock("perfect_3")
        
        # Time-based achievements
        hour = datetime.now().hour
        if hour >= 0 and hour < 5: try_unlock("night_owl")
        if hour >= 5 and hour < 7: try_unlock("early_bird")
        
        user.achievements = current_achievements
        user.level = calculate_level(user.xp)
        db.commit()
        
        leveled_up = new_level > old_level
        
        return {
            "xp_gained": amount,
            "total_xp": user.xp,
            "level": user.level,
            "leveled_up": leveled_up,
            "xp_to_next": xp_for_next_level(user.xp),
            "xp_progress_percent": xp_progress_percent(user.xp),
            "streak": user.streak_days,
            "new_achievements": new_achievements
        }
    finally:
        db.close()

# ==================== Combo & Streak Tracking ====================

def record_combo(combo: int, correct: int, total: int, is_perfect: bool) -> dict:
    """Record combo/streak data from a quiz round"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        
        if combo > (user.best_combo or 0):
            user.best_combo = combo
        
        user.total_correct = (user.total_correct or 0) + correct
        user.total_questions = (user.total_questions or 0) + total
        
        if is_perfect:
            user.perfect_rounds = (user.perfect_rounds or 0) + 1
        
        # Calculate combo bonus XP
        combo_bonus = 0
        if combo >= 3:
            combo_bonus = combo * 5  # 5 XP per combo level
        
        perfect_bonus = 0
        if is_perfect:
            perfect_bonus = 50  # Flat bonus for perfect round
        
        db.commit()
        
        return {
            "combo_bonus": combo_bonus,
            "perfect_bonus": perfect_bonus,
            "best_combo": user.best_combo,
            "total_correct": user.total_correct,
            "accuracy": round((user.total_correct / max(1, user.total_questions)) * 100, 1)
        }
    finally:
        db.close()

def save_session_progress(topic: str, mode: str, session_id: str) -> None:
    """Save session progress for 'continue where you left off'"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        user.last_session_topic = topic
        user.last_session_mode = mode
        user.last_session_id = session_id
        db.commit()
    finally:
        db.close()

# ==================== Daily Challenge System ====================

DAILY_CHALLENGE_TEMPLATES = [
    {"type": "speed", "title": "⚡ Speed Run", "desc": "Complete a quiz in under 60 seconds", "target": 1, "xp": 75},
    {"type": "perfect", "title": "💎 Perfect Score", "desc": "Get 100% on any quiz today", "target": 1, "xp": 100},
    {"type": "streak", "title": "🔥 Streak Master", "desc": "Get a 5x combo streak", "target": 5, "xp": 60},
    {"type": "complete", "title": "🗡️ Quest Warrior", "desc": "Complete a full quest (all 4 modes)", "target": 1, "xp": 80},
    {"type": "multi", "title": "📚 Knowledge Seeker", "desc": "Complete 2 different quests today", "target": 2, "xp": 120},
    {"type": "boss", "title": "👹 Boss Slayer", "desc": "Defeat the boss question correctly", "target": 1, "xp": 100},
]

def get_daily_challenge() -> Dict[str, Any]:
    """Get or create today's daily challenge"""
    db = SessionLocal()
    try:
        today = datetime.now().strftime("%Y-%m-%d")
        challenge = db.query(DailyChallenge).filter(DailyChallenge.date == today).first()
        
        if not challenge:
            # Create today's challenge
            template = random.choice(DAILY_CHALLENGE_TEMPLATES)
            challenge = DailyChallenge(
                date=today,
                challenge_type=template["type"],
                title=template["title"],
                description=template["desc"],
                target=template["target"],
                bonus_xp=template["xp"]
            )
            db.add(challenge)
            db.commit()
            db.refresh(challenge)
        
        user = get_db_user(db)
        completed = user.daily_challenge_date == today and user.daily_challenge_completed
        
        return {
            "date": today,
            "type": challenge.challenge_type,
            "title": challenge.title,
            "description": challenge.description,
            "target": challenge.target,
            "bonus_xp": challenge.bonus_xp,
            "completed": completed,
            "daily_streak": user.daily_streak or 0
        }
    finally:
        db.close()

def complete_daily_challenge() -> Dict[str, Any]:
    """Mark today's daily challenge as complete"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        today = datetime.now().strftime("%Y-%m-%d")
        
        if user.daily_challenge_date == today and user.daily_challenge_completed:
            return {"already_completed": True, "bonus_xp": 0}
        
        # Check if yesterday was completed for streak
        if user.daily_challenge_date:
            yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
            if user.daily_challenge_date == yesterday and user.daily_challenge_completed:
                user.daily_streak = (user.daily_streak or 0) + 1
            elif user.daily_challenge_date != today:
                user.daily_streak = 1
        else:
            user.daily_streak = 1
        
        user.daily_challenge_date = today
        user.daily_challenge_completed = True
        
        # Get challenge bonus
        challenge = db.query(DailyChallenge).filter(DailyChallenge.date == today).first()
        bonus_xp = challenge.bonus_xp if challenge else 50
        
        # Streak multiplier for daily challenges
        streak_bonus = min(user.daily_streak * 10, 100)  # Up to 100 extra XP
        total_bonus = bonus_xp + streak_bonus
        
        user.xp += total_bonus
        user.level = calculate_level(user.xp)
        
        # Check daily achievements
        current_achievements = list(user.achievements) if user.achievements else []
        new_achievements = []
        
        def try_unlock(aid):
            if aid not in current_achievements and aid in ACHIEVEMENTS:
                current_achievements.append(aid)
                new_achievements.append({**ACHIEVEMENTS[aid], "id": aid})
        
        try_unlock("daily_first")
        if (user.daily_streak or 0) >= 7:
            try_unlock("daily_7")
        
        user.achievements = current_achievements
        db.commit()
        
        return {
            "already_completed": False,
            "bonus_xp": total_bonus,
            "daily_streak": user.daily_streak,
            "new_achievements": new_achievements
        }
    finally:
        db.close()

# ==================== Leaderboard ====================

BOT_NAMES = [
    ("PixelMaster", "🎮", 2800), ("NeonNinja", "🥷", 2450), ("CodeWizard", "🧙", 2100),
    ("StarChaser", "⭐", 1850), ("ByteKnight", "🛡️", 1600), ("QuantumFox", "🦊", 1400),
    ("CyberWolf", "🐺", 1200), ("DataDragon", "🐉", 1050), ("LogicLion", "🦁", 900),
    ("NeuralNova", "💫", 750), ("BitBear", "🐻", 600), ("AlgoEagle", "🦅", 480),
    ("TechTiger", "🐯", 350), ("PixelPanda", "🐼", 250), ("CodeCat", "🐱", 150),
]

def seed_leaderboard():
    """Seed leaderboard with bot entries if empty"""
    db = SessionLocal()
    try:
        count = db.query(LeaderboardEntry).filter(LeaderboardEntry.is_bot == True).count()
        if count == 0:
            for name, avatar, xp in BOT_NAMES:
                entry = LeaderboardEntry(
                    username=name,
                    xp=xp,
                    level=calculate_level(xp),
                    achievements_count=random.randint(2, 8),
                    best_combo=random.randint(3, 15),
                    is_bot=True,
                    avatar=avatar
                )
                db.add(entry)
            db.commit()
    finally:
        db.close()

def get_leaderboard(limit: int = 20) -> List[Dict[str, Any]]:
    """Get leaderboard with user included"""
    db = SessionLocal()
    try:
        # Ensure bots exist
        seed_leaderboard()
        
        user = get_db_user(db)
        
        # Get all entries
        entries = db.query(LeaderboardEntry).order_by(LeaderboardEntry.xp.desc()).limit(limit).all()
        
        # Build leaderboard
        board = []
        user_included = False
        
        for entry in entries:
            board.append({
                "username": entry.username,
                "xp": entry.xp,
                "level": entry.level,
                "avatar": entry.avatar or "🎮",
                "achievements": entry.achievements_count or 0,
                "best_combo": entry.best_combo or 0,
                "is_you": False,
                "is_bot": entry.is_bot
            })
        
        # Insert user at correct position
        user_entry = {
            "username": user.username or "Player",
            "xp": user.xp,
            "level": calculate_level(user.xp),
            "avatar": "🧑‍💻",
            "achievements": len(user.achievements) if user.achievements else 0,
            "best_combo": user.best_combo or 0,
            "is_you": True,
            "is_bot": False
        }
        
        # Find insertion point
        inserted = False
        for i, entry in enumerate(board):
            if user.xp >= entry["xp"]:
                board.insert(i, user_entry)
                inserted = True
                break
        
        if not inserted:
            board.append(user_entry)
        
        # Trim to limit and add ranks
        board = board[:limit]
        for i, entry in enumerate(board):
            entry["rank"] = i + 1
        
        # Find user rank even if not in top
        user_rank = next((e["rank"] for e in board if e["is_you"]), len(board) + 1)
        
        return {
            "entries": board,
            "user_rank": user_rank,
            "total_players": len(board)
        }
    finally:
        db.close()

def update_leaderboard_user():
    """Update user's leaderboard entry"""
    db = SessionLocal()
    try:
        user = get_db_user(db)
        # We don't store user in leaderboard table — they're injected dynamically
        # But we update bot XP slightly to create movement
        bots = db.query(LeaderboardEntry).filter(LeaderboardEntry.is_bot == True).all()
        for bot in bots:
            # Small random XP changes to make leaderboard feel alive
            change = random.randint(-5, 15)
            bot.xp = max(50, bot.xp + change)
            bot.level = calculate_level(bot.xp)
        db.commit()
    finally:
        db.close()
