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
    save_report,
    get_reports,
    delete_report
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

        if not extracted_text or not extracted_text.strip():
            extracted_text = "(No readable text found in the document. Providing a general analysis.)"

        # 3. Analyze text
        analysis = analyze_medical_report(extracted_text)

        # 4. Save to DB (with filename and created_at)
        save_report(
            user["email"],
            cloudinary_url,
            analysis,
            filename=file.filename
        )

        return {
            "success": True,
            "filename": file.filename,
            "analysis": analysis,
            "file_url": cloudinary_url
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "message": str(e) or "Failed to analyze report. Please try again."
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
    reports = get_reports(
        user["email"],
        page,
        limit
    )

    # Serialize MongoDB documents (strip _id ObjectId)
    serialized = []
    for r in reports:
        r.pop("_id", None)
        serialized.append(r)

    return {
        "success": True,
        "data": serialized
    }

@router.delete("/{filename}")
async def remove_report(filename: str, user = Depends(verify_token)):
    success = delete_report(user["email"], filename)
    if success:
        return {"success": True, "message": "Report deleted successfully"}
    return {"success": False, "message": "Failed to delete report"}

