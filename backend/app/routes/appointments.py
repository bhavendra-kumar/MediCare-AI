from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.services.appointment_service import (
    get_doctors,
    book_appointment,
    get_appointments,
    delete_appointment
)

from app.utils.auth_middleware import (
    verify_token
)

from app.utils.serializer import (
    serialize_document,
    serialize_list
)

router = APIRouter()

class AppointmentModel(BaseModel):
    doctor: str
    date: str
    time: str

# ------------------------
# GET DOCTORS
# ------------------------
@router.get("/doctors")
async def doctors():
    return {
        "success": True,
        "data": get_doctors()
    }

# ------------------------
# BOOK APPOINTMENT
# ------------------------
@router.post("/book")
async def book(data: AppointmentModel, user = Depends(verify_token)):
    appointment_data = data.dict()
    appointment_data["user_id"] = user.get("email", "demo-user")

    appointment = book_appointment(
        appointment_data
    )

    # Serialize MongoDB document
    serialized = serialize_document(appointment)

    return {
        "success": True,
        "data": serialized,
    }

# ------------------------
# GET APPOINTMENTS
# ------------------------
@router.get("/")
async def appointments(user = Depends(verify_token)):
    user_appointments = get_appointments(user.get("email", "demo-user"))
    
    # Serialize MongoDB list
    serialized = serialize_list(user_appointments)

    return {
        "success": True,
        "data": serialized
    }

# ------------------------
# DELETE APPOINTMENT
# ------------------------
@router.delete("/{appointment_id}")
async def remove_appointment(appointment_id: str, user = Depends(verify_token)):
    success = delete_appointment(user.get("email", "demo-user"), appointment_id)
    if success:
        return {"success": True, "message": "Appointment deleted successfully"}
    return {"success": False, "message": "Failed to delete appointment"}