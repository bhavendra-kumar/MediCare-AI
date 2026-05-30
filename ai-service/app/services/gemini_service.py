import google.generativeai as genai
import os

from dotenv import load_dotenv

from app.services.conversation_service import (
    get_recent_conversations,
    save_conversation
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analyze_symptoms(
    user_id: str,
    message: str,
    language: str = "en"
):

    # ------------------------
    # FETCH PREVIOUS CHATS
    # ------------------------

    history = get_recent_conversations(
            user_id
        )

    history_text = ""

    for convo in history:

        history_text += f"""
        User:
        {convo['user_message']}

        AI:
        {convo['ai_response']}
        """

    # ------------------------
    # GEMINI PROMPT
    # ------------------------

    prompt = f"""
    You are MediCare AI, a professional healthcare assistant.

    Respond ONLY in: {language}

    Previous Conversations:
    {history_text}

    Current Symptoms:
    {message}

    Give:
    1. Possible condition
    2. Severity level
    3. Recommendations
    4. When to see a doctor

    Keep response simple and medically safe.
    Use simple language for normal users.
    """

    response = model.generate_content(
            prompt
        )

    ai_response = response.text

    # ------------------------
    # SAVE CONVERSATION
    # ------------------------

    save_conversation(
        user_id,
        message,
        ai_response
    )

    return ai_response