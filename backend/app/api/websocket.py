"""
WebSocket endpoints for real-time updates
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import List
import json
import asyncio
from app.core.database import get_db
from app.models.bot import TradingBot
from app.models.trade import Trade

router = APIRouter()


class ConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def broadcast(self, message: dict):
        """Broadcast message to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Error broadcasting: {e}")


manager = ConnectionManager()


@router.websocket("/ws/dashboard")
async def websocket_dashboard(websocket: WebSocket):
    """
    WebSocket for dashboard real-time updates
    """
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and send periodic updates
            await asyncio.sleep(5)
            
            # Here you can fetch and send real-time data
            update = {
                "type": "dashboard_update",
                "timestamp": str(asyncio.get_event_loop().time()),
                "data": {
                    "message": "Dashboard update"
                }
            }
            await websocket.send_json(update)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.websocket("/ws/bots")
async def websocket_bots(websocket: WebSocket):
    """
    WebSocket for bot status updates
    """
    await manager.connect(websocket)
    try:
        while True:
            # Send bot updates every 2 seconds
            await asyncio.sleep(2)
            
            update = {
                "type": "bot_update",
                "timestamp": str(asyncio.get_event_loop().time()),
                "data": {
                    "message": "Bot status update"
                }
            }
            await websocket.send_json(update)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.websocket("/ws/trades")
async def websocket_trades(websocket: WebSocket):
    """
    WebSocket for new trade notifications
    """
    await manager.connect(websocket)
    try:
        while True:
            # Wait for incoming messages or send updates
            data = await websocket.receive_text()
            
            # Echo back for now
            await websocket.send_json({
                "type": "trade_update",
                "data": f"Received: {data}"
            })
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
