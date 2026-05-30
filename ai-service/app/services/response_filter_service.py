UNSAFE_PHRASES = {

    "you definitely have":
        "you may have",

    "you certainly have":
        "you may have",

    "this is definitely":
        "this may be",

    "100% sure":
        "possibly",

    "confirmed diagnosis":
        "possible condition",
}

def filter_ai_response(
    response: str
):

    safe_response = response

    for unsafe, safe in UNSAFE_PHRASES.items():

        safe_response = safe_response.replace(
            unsafe,
            safe
        )

    return safe_response