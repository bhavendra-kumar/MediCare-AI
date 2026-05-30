import pytesseract

from PIL import Image

def extract_text_from_image(
    image_path: str
):

    image = Image.open(image_path)

    extracted_text = pytesseract.image_to_string(
        image
    )

    return extracted_text