from fastapi import (
    APIRouter,
    UploadFile,
    File
)
import os
import shutil

from app.services.vision_service import (
    extract_text_from_image
)
from app.services.report_analysis_service import (
    analyze_medical_report
)
from app.services.pdf_service import (
    extract_pdf_text
)
from app.services.cloudinary_service import (
    upload_file_to_cloudinary
)
from app.services.report_history_service import (
    save_report
)
from fastapi import Depends
from app.utils.auth_middleware import (
    verify_token
)
from fastapi import Query




router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

@router.post("/analyze")
async def analyze_report(
    file: UploadFile = File(...),
    user = Depends(verify_token)
):
    # Create temp directory if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 1. Upload to Cloudinary first to get the URL
        cloudinary_url = upload_file_to_cloudinary(file_path)

        # 2. Extract text
        if file.filename.lower().endswith('.pdf'):
            extracted_text = extract_pdf_text(file_path)
        else:
            extracted_text = extract_text_from_image(file_path)

        # 3. Analyze text
        analysis = analyze_medical_report(extracted_text)

        # 4. Save to DB
        save_report(
            user["email"],
            cloudinary_url,
            analysis
        )

        return {
            "success": True,
            "analysis": analysis,
            "file_url": cloudinary_url
        }
    finally:
        # Clean up temp file
        if os.path.exists(file_path):
            os.remove(file_path)

@router.get("/history")
async def report_history(
    page: int = Query(1),
    limit: int = Query(10),
    user = Depends(verify_token)
):
    from app.services.report_history_service import get_reports
    
    reports = get_reports(
        user["email"],
        page,
        limit
    )

    return {
        "success": True,
        "data": reports
    }
