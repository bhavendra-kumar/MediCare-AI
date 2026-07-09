import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"Using API Key: {api_key}")

genai.configure(api_key=api_key, transport="rest")
model = genai.GenerativeModel("gemini-3-flash-preview")

try:
    print("Testing generate_content...")
    response = model.generate_content("Hello, this is a test.")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error calling generate_content: {e}")
