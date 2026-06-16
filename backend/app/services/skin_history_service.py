from app.database.db import (
    skin_collection
)
from datetime import datetime

def save_skin_analysis(
    user_id: str,
    image_url: str,
    analysis: str
):

    data = {

        "user_id": user_id,

        "image_url":
            image_url,

        "analysis":
            analysis,
    }

    skin_collection.insert_one(
        data
    )

def get_skin_history(user_id: str):
    return list(skin_collection.find({"user_id": user_id}))
    