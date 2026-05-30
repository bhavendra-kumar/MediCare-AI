from app.database.db import (
    notifications_collection
)

def save_notification(
    user_id: str,
    title: str,
    body: str
):

    data = {

        "user_id": user_id,

        "title": title,

        "body": body,
    }

    notifications_collection.insert_one(
        data
    )