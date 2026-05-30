import google.generativeai as genai

from PIL import Image

def analyze_skin_image(
    image_path: str
):

    image = Image.open(image_path)

    prompt = """
    You are MediCare AI.

    Analyze this skin image carefully.

    Give:
    1. Possible condition
    2. Severity
    3. Recommendations
    4. When to consult dermatologist

    Keep medically safe.
    """

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    response = model.generate_content([
        prompt,
        image
    ])

    return response.text