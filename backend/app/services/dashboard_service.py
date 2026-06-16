from app.database.db import (
    reports_collection,
    skin_collection,
    appointments_collection
)

def generate_dashboard(
    user_id: str
):

    reports = list(
        reports_collection.find({
            "user_id": user_id
        })
    )

    skin = list(
        skin_collection.find({
            "user_id": user_id
        })
    )

    appointments = list(
        appointments_collection.find({
            "user_id": user_id
        })
    )

    # ------------------------
    # HEALTH SCORE
    # ------------------------

    health_score = 100

    for report in reports:

        analysis = report.get(
            "analysis",
            ""
        ).lower()

        if "high cholesterol" in analysis:
            health_score -= 10

        if "diabetes" in analysis:
            health_score -= 15

    for skin_item in skin:

        analysis = skin_item.get(
            "analysis",
            ""
        ).lower()

        if "severe" in analysis:
            health_score -= 5

    # ------------------------
    # TIMELINE
    # ------------------------

    timeline = []

    for report in reports:

        timeline.append({

            "type": "report",

            "title":
                "Medical report analyzed",

            "date":
                str(
                    report["created_at"]
                )
        })

    for item in skin:

        timeline.append({

            "type":
                "skin",

            "title":
                "Skin analysis completed",

            "date":
                str(
                    item["created_at"]
                )
        })

    for appointment in appointments:

        timeline.append({

            "type":
                "appointment",

            "title":
                f"Appointment with {appointment['doctor']}",

            "date":
                str(
                    appointment["created_at"]
                )
        })

    timeline = sorted(
        timeline,

        key=lambda x: x["date"],

        reverse=True
    )

    return {

        "health_score":
            max(health_score, 0),

        "reports_count":
            len(reports),

        "appointments_count":
            len(appointments),

        "skin_analysis_count":
            len(skin),

        "timeline":
            timeline[:10],
    }