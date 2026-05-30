import os
import json

from google.cloud import vision
from google.oauth2 import service_account

credentials_info = json.loads(
    os.getenv("GOOGLE_CREDENTIALS_JSON")
)

credentials = service_account.Credentials.from_service_account_info(
    credentials_info
)

client = vision.ImageAnnotatorClient(
    credentials=credentials
)


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