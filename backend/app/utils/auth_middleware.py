from fastapi import (
    Header,
    HTTPException
)

from jose import jwt

import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")

ALGORITHM = "HS256"

def verify_token(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )

    try:

        token = authorization.replace(
            "Bearer ",
            ""
        )

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )