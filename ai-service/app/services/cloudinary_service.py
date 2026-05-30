import cloudinary.uploader

from app.config.cloudinary_config import *

def upload_file_to_cloudinary(
    file_path: str
):

    response = cloudinary.uploader.upload(
            file_path,

            resource_type="auto"
        )

    return response["secure_url"]

