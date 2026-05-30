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
):

    file_path = (
        f"{UPLOAD_DIR}/{file.filename}"
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    extracted_text = (
        extract_text_from_image(
            file_path
        )
    )

    analysis = (
        analyze_medical_report(
            extracted_text
        )
    )

    save_report(
    user["email"],
    cloudinary_url,
    analysis
)

@router.get("/history")

async def report_history(

    page: int = Query(1),

    limit: int = Query(10),

    user = Depends(
        verify_token
    )
):

    reports = get_reports(
        user["email"],
        page,
        limit
    )

    return {
        "success": True,

        "data": reports
    }

    
async def analyze_report(
    file: UploadFile = File(...),

    user = Depends(
        verify_token
    )
):



    return {
        "success": True,

        "extracted_text":
            extracted_text,

        "file_url": cloudinary_url,

        "analysis":
            analysis,
        
            
    }