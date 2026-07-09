from app.services.gemini_service import model

def analyze_skin_image(
    image_path: str
):
    from PIL import Image
    image = Image.open(image_path)

    prompt = """
    You are MediCare AI.

    Analyze this skin image carefully.

    You must return a JSON object with the following fields:
    {
        "condition": "string specifying the possible condition",
        "confidence": float value representing the confidence score between 0.0 and 100.0,
        "severity": "Low" | "Medium" | "High",
        "recommendation": "detailed recommendations and when to consult a dermatologist"
    }

    Keep medically safe. Only return valid JSON.
    """

    response = model.generate_content(
        [prompt, image],
        generation_config={"response_mime_type": "application/json"}
    )

    return response.text