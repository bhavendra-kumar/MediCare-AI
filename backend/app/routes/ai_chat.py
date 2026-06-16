from fastapi import APIRouter

from pydantic import BaseModel

from app.services.gemini_service import (
    analyze_symptoms
)

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str
    language: str = "en"

@router.post("/chat")
async def ai_chat(data: ChatRequest):

    response = analyze_symptoms(
        data.user_id,
        data.message,
        data.language
    )

    return {
        "success": True,
        "response": response
    }