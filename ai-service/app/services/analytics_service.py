from app.database.db import (
    reports_collection
)

def generate_analytics(
    user_id: str
):

    pipeline = [

        {
            "$match": {
                "user_id": user_id
            }
        },

        {
            "$group": {

                "_id": None,

                "total_reports": {
                    "$sum": 1
                }
            }
        }
    ]

    result = list(
        reports_collection.aggregate(
            pipeline
        )
    )

    if result:

        return result[0]

    return {
        "total_reports": 0
    }