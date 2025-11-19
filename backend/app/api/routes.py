from fastapi import APIRouter
from app.api import auth, bots, trades, freqtrade, websocket

api_router = APIRouter()

# Health check
@api_router.get("/health")
def health_check():
    return {"status": "ok"}

# Include routers
api_router.include_router(auth.router)
api_router.include_router(bots.router)
api_router.include_router(trades.router)
api_router.include_router(freqtrade.router)
api_router.include_router(websocket.router)
