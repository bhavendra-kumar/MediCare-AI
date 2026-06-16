import os
import json

from google.cloud import vision
from google.oauth2 import service_account

# Load credentials from file specified in GOOGLE_APPLICATION_CREDENTIALS
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "google-credentials.json")

if os.path.exists(credentials_path):
    credentials = service_account.Credentials.from_service_account_file(credentials_path)
    client = vision.ImageAnnotatorClient(credentials=credentials)
else:
    # Fallback to env var if file doesn't exist
    credentials_info = os.getenv("GOOGLE_CREDENTIALS_JSON")
    if credentials_info:
        credentials_info = json.loads(credentials_info)
        credentials = service_account.Credentials.from_service_account_info(credentials_info)
        client = vision.ImageAnnotatorClient(credentials=credentials)
    else:
        print("Warning: Google Cloud Vision credentials not found.")
        client = None

def extract_text_from_image(
    image_path: str
):

    with open(image_path, "rb") as image_file:

        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(
        image=image
    )

    texts = response.text_annotations

    if texts:
        return texts[0].description

    return ""