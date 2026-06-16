import cloudinary.uploader
from app.config.cloudinary_config import *

def upload_file_to_cloudinary(file_path: str, folder: str = "medicare_reports"):
    """
    Uploads a file to Cloudinary with optimization and folder organization.
    """
    try:
        response = cloudinary.uploader.upload(
            file_path,
            folder=folder,
            resource_type="auto",
            transformation=[
                {"quality": "auto", "fetch_format": "auto"}
            ]
        )
        return response["secure_url"]
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None


