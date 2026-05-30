from fastapi import (
    APIRouter,
    UploadFile,
    File
)

import os
import shutil

from app.services.skin_analysis_service import (
    analyze_skin_image
)

from app.services.skin_history_service import (
    save_skin_analysis,
    get_skin_history
)

from app.utils.serializer import (
    serialize_list
)

from fastapi import Depends

from app.utils.auth_middleware import (
    verify_token
)

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

@router.post("/analyze")
async def analyze_skin(
    file: UploadFile = File(...),
    user = Depends(verify_token)
):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    analysis = analyze_skin_image(file_path)

    save_skin_analysis(
        user.get("email", "demo-user"),
        file_path,  # Should ideally be a cloudinary URL but following current flow
        analysis
    )

    return {
        "success": True,
        "analysis": analysis,
    }

@router.get("/history")
async def get_history(user=Depends(verify_token)):
    history = get_skin_history(user.get("email", "demo-user"))
    return serialize_list(history)