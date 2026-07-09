from app.database.db import (
    reports_collection
)

from datetime import datetime

def save_report(
    user_id: str,
    file_url: str,
    analysis: str,
    filename: str = "report"
):

    report = {
        "user_id": user_id,
        "filename": filename,
        "file_url": file_url,
        "analysis": analysis,
        "created_at": datetime.utcnow().isoformat(),
    }

    reports_collection.insert_one(
        report
    )

def get_reports(
    user_id: str,

    page: int = 1,

    limit: int = 10
):

    skip = (
        (page - 1) * limit
    )

    reports = (
        reports_collection
        .find({
            "user_id": user_id
        })

        .sort("created_at", -1)

        .skip(skip)

        .limit(limit)
    )

    return list(reports)

def delete_report(
    user_id: str,
    filename: str
) -> bool:
    result = reports_collection.delete_one({
        "user_id": user_id,
        "filename": filename
    })
    return result.deleted_count > 0