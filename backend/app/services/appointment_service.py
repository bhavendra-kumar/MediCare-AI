from app.database.db import (
    appointments_collection,
    doctors_collection
)

from datetime import datetime

def get_doctors():

    doctors = doctors_collection.find({}, {"_id": 0})

    return list(doctors)

def book_appointment(data):

    data["created_at"] = (
        datetime.utcnow()
    )

    appointments_collection.insert_one(
        data
    )

    return data

def get_appointments(user_id):

    appointments = appointments_collection.find({
            "user_id": user_id
        })

    return list(appointments)