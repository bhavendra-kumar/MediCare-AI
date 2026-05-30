from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai_chat import router as ai_router
from app.routes.auth import router as auth_router
from app.routes.reports import router as reports_router
from app.routes.skin import router as skin_router
from app.routes.appointments import router as appointments_router
from app.routes.dashboard import router as dashboard_router
from app.routes.notifications import router as notifications_router
from app.routes.health_insights import router as health_router

import socketio
from app.socket_server import sio

import app.database.indexes

fastapi_app = FastAPI()

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_app.include_router(ai_router, prefix="/ai", tags=["AI"])
fastapi_app.include_router(auth_router, prefix="/auth", tags=["Auth"])
fastapi_app.include_router(reports_router, prefix="/reports", tags=["Reports"])
fastapi_app.include_router(skin_router, prefix="/skin", tags=["Skin"])
fastapi_app.include_router(appointments_router, prefix="/appointments", tags=["Appointments"])
fastapi_app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
fastapi_app.include_router(notifications_router, prefix="/notifications", tags=["Notifications"])
fastapi_app.include_router(health_router, prefix="/health-insights", tags=["Health Insights"])

@fastapi_app.get("/")
def home():
    return {
        "message": "MediCare AI Backend Running"
    }
    
app = socketio.ASGIApp(
    sio,
    fastapi_app
)    