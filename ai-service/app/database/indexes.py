from app.database.db import (
    reports_collection,
    appointments_collection,
    skin_collection,
    conversations_collection
)

# ------------------------
# REPORTS
# ------------------------

reports_collection.create_index(
    "user_id"
)

reports_collection.create_index(
    "created_at"
)

# ------------------------
# APPOINTMENTS
# ------------------------

appointments_collection.create_index(
    "user_id"
)

appointments_collection.create_index(
    "created_at"
)

# ------------------------
# SKIN ANALYSIS
# ------------------------

skin_collection.create_index(
    "user_id"
)

# ------------------------
# CONVERSATIONS
# ------------------------

conversations_collection.create_index(
    "user_id"
)