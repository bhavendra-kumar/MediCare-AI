from fastapi import APIRouter

from pydantic import BaseModel

from app.database.db import (
    users_collection
)

from app.utils.security import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import (
    create_token
)

router = APIRouter()

# ------------------------
# MODELS
# ------------------------

class SignupModel(BaseModel):
    name: str
    email: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

# ------------------------
# SIGNUP
# ------------------------

@router.post("/signup")
async def signup(data: SignupModel):

    existing_user = users_collection.find_one({
        "email": data.email
    })

    if existing_user:

        return {
            "success": False,
            "message": "User already exists"
        }

    hashed_password = hash_password(
        data.password
    )

    user = {
        "name": data.name,
        "email": data.email,
        "password": hashed_password,
    }

    users_collection.insert_one(user)

    token = create_token({
        "email": data.email
    })

    return {
        "success": True,
        "token": token,
        "user": {
            "name": data.name,
            "email": data.email,
        }
    }

# ------------------------
# LOGIN
# ------------------------

@router.post("/login")
async def login(data: LoginModel):

    user = users_collection.find_one({
        "email": data.email
    })

    if not user:

        return {
            "success": False,
            "message": "Invalid credentials"
        }

    valid_password = verify_password(
        data.password,
        user["password"]
    )

    if not valid_password:

        return {
            "success": False,
            "message": "Invalid credentials"
        }

    token = create_token({
        "email": user["email"]
    })

    return {
        "success": True,
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
        }
    }