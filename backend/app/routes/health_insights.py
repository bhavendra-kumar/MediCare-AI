from fastapi import APIRouter, Depends

from app.services.health_insights_service import (
    generate_health_insights
)
from app.utils.auth_middleware import verify_token

router = APIRouter()

@router.get("/")
async def health_insights(user: dict = Depends(verify_token)):
    data = generate_health_insights()
    return {
        "success": True,
        "data": data,
    }