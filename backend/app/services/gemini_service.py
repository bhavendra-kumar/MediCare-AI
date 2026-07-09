import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.services.conversation_service import get_recent_conversations, save_conversation
from app.services.response_filter_service import filter_ai_response
from app.services.safety_service import classify_risk, get_doctor_recommendation, detect_emergency, get_medical_disclaimer
from app.utils.prompts import SYSTEM_PROMPT

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"), transport="rest")
model = genai.GenerativeModel("gemini-3-flash-preview")

def analyze_symptoms(user_id: str, message: str, language: str = "en"):
    # 1. EMERGENCY CHECK
    if detect_emergency(message, language):
        return get_doctor_recommendation("emergency", language)

    # 2. FETCH HISTORY
    history = get_recent_conversations(user_id)
    history_text = "\n".join([f"User: {c['user_message']}\nAI: {c['ai_response']}" for c in history])

    # 3. CONSTRUCT SYSTEM PROMPT
    full_prompt = SYSTEM_PROMPT.format(language=language, user_id=user_id) + f"\n\nContext:\n{history_text}\n\nUser: {message}"

    try:
        # 4. GENERATE CONTENT
        response = model.generate_content(full_prompt)
        ai_response = response.text
        
        # 5. POST-PROCESSING
        ai_response = filter_ai_response(ai_response)
        
        # 6. RISK CLASSIFICATION & RECOMMENDATION
        risk_level = classify_risk(message, language)
        doctor_note = get_doctor_recommendation(risk_level, language)
        disclaimer = get_medical_disclaimer(language)

        final_response = f"{ai_response}\n\n{doctor_note}\n\n{disclaimer}".strip()
        
        # 7. SAVE TO DB
        save_conversation(user_id, message, final_response)
        
        return final_response
    except Exception as e:
        print(f"Gemini Error: {e}")
        return "I'm having trouble connecting to my medical database. Please try again or consult a doctor if symptoms are severe."


    ai_response += f"\n\n{doctor_note}"

    # ------------------------
    # SAVE CONVERSATION
    # ------------------------

    save_conversation(
        user_id,
        message,
        ai_response
    )

    return ai_response
