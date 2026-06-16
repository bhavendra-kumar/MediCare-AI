from app.database.db import (
    health_scores_collection
)

def save_health_score(
    user_id: str,
    score: int,
    risk_level: str
):

    data = {

        "user_id": user_id,

        "health_score":
            score,

        "risk_level":
            risk_level,
    }

    health_scores_collection.insert_one(
        data
    )

def generate_health_insights():
    return {
        "score": 85,
        "status": "Good",
        "recommendations": [
            "Maintain a balanced diet",
            "Regular exercise for 30 mins",
            "Drink plenty of water"
        ]
    }
