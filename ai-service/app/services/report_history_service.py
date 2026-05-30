from app.database.db import (
    reports_collection
)

from datetime import datetime

def save_report(
    user_id: str,
    file_url: str,
    analysis: str
):

    report = {

        "user_id": user_id,

        "file_url":
            file_url,

        "analysis":
            analysis,
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