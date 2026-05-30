from fastapi import (
    APIRouter,
    Depends
)

from app.utils.auth_middleware import (
    verify_token
)

from app.services.dashboard_service import (
    generate_dashboard
)

router = APIRouter()

@router.get("/health-score")

async def dashboard(
    user = Depends(
        verify_token
    )
):

    data = generate_dashboard(
        user["email"]
    )

    return {
        "success": True,
        "data": data,
    }