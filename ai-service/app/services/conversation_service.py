from app.database.db import (
    conversations_collection
)

def save_conversation(
    user_id: str,
    user_message: str,
    ai_response: str
):

    conversation = {

        "user_id": user_id,

        "user_message":
            user_message,

        "ai_response":
            ai_response,
    }

    conversations_collection.insert_one(
        conversation
    )

def get_recent_conversations(
    user_id: str
):

    conversations = conversations_collection.find({
            "user_id": user_id
        }).limit(5)

    return list(conversations)

