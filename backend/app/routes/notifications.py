from fastapi import APIRouter, Depends

from app.utils.auth_middleware import verify_token

router = APIRouter()

@router.get("/")
def get_notifications(user: dict = Depends(verify_token)):
    return {"notifications": []}
