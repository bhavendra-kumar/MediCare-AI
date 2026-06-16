from pymongo import MongoClient
import os

from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client["medicare_ai"]

# ------------------------
# COLLECTIONS
# ------------------------

users_collection = db["users"]

reports_collection = db["reports"]

appointments_collection = db["appointments"]

skin_collection = db["skin_analysis"]

conversations_collection = db["conversations"]

notifications_collection = db["notifications"]

health_scores_collection = db["health_scores"]

doctors_collection = db["doctors"]
