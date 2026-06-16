from fastapi import APIRouter

from pydantic import BaseModel

from app.services.appointment_service import (
    get_doctors,
    book_appointment,
    get_appointments
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

        "data":
            get_doctors()
    }

# ------------------------
# BOOK APPOINTMENT
# ------------------------

@router.post("/book")

async def book(data: AppointmentModel):

    appointment = book_appointment(
        data.dict()
    )

    return {
        "success": True,

        "data": appointment,
    }

# ------------------------
# GET APPOINTMENTS
# ------------------------

@router.get("/")

async def appointments():

    return {
        "success": True,

        "data":
            get_appointments()
    }

    