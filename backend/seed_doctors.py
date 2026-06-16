import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["medicare_ai"]

doctors = [
    {
        "name": "Dr. Sarah Johnson",
        "specialization": "Cardiologist",
        "experience": "10 Years",
        "rating": 4.8,
    },
    {
        "name": "Dr. Michael Lee",
        "specialization": "Dermatologist",
        "experience": "7 Years",
        "rating": 4.7,
    },
]


# Optional: Clear existing doctors to prevent duplicates if run multiple times
db["doctors"].delete_many({})

db["doctors"].insert_many(doctors)

print("Doctors inserted")
