import socketio

from app.services.gemini_service import (
    model
)

sio = socketio.AsyncServer(

    async_mode="asgi",

    cors_allowed_origins="*"
)

@ sio.event
async def connect(
    sid,
    environ
):

    print(
        "Client connected:",
        sid
    )

@ sio.event
async def disconnect(sid):

    print(
        "Client disconnected:",
        sid
    )

@ sio.event
async def ai_message(
    sid,
    data
):

    message = data.get("message")

    prompt = f"""
    You are MediCare AI.

    User:
    {message}
    """

    response = model.generate_content(
            prompt
        )

    text = response.text

    # ------------------------
    # STREAM WORDS
    # ------------------------

    words = text.split()

    current_text = ""

    for word in words:

        current_text += word + " "

        await sio.emit(
            "ai_stream",
            {
                "text":
                    current_text
            },
            to=sid
        )