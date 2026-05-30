import pytesseract
from PIL import Image
from pdf2image import convert_from_bytes
from google.cloud import vision
import io

client = vision.ImageAnnotatorClient()

def extract_text_google(file_bytes):
    image = vision.Image(content=file_bytes)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    if texts:
        return texts[0].description
    return ""

def extract_text_from_image(image: Image.Image):
    return pytesseract.image_to_string(image)

def extract_text_from_pdf(file_bytes):
    pages = convert_from_bytes(file_bytes)
    text = ""
    for page in pages:
        text += pytesseract.image_to_string(page) + "\n"
    return text