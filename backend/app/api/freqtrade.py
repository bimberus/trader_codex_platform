"""
Freqtrade integration endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.services.freqtrade import freqtrade_client

router = APIRouter(prefix="/freqtrade", tags=["Freqtrade"])


@router.get("/status")
async def get_freqtrade_status(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get Freqtrade bot status
    """
    result = await freqtrade_client.get_status()
    return result


@router.post("/start")
async def start_freqtrade(
    current_user: User = Depends(get_current_active_user)
):
    """
    Start Freqtrade bot
    """
    result = await freqtrade_client.start_bot()
    return result


@router.post("/stop")
async def stop_freqtrade(
    current_user: User = Depends(get_current_active_user)
):
    """
    Stop Freqtrade bot
    """
    result = await freqtrade_client.stop_bot()
    return result


@router.get("/profit")
async def get_freqtrade_profit(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get Freqtrade profit information
    """
    result = await freqtrade_client.get_profit()
    return result


@router.get("/balance")
async def get_freqtrade_balance(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get Freqtrade wallet balance
    """
    result = await freqtrade_client.get_balance()
    return result


@router.get("/trades")
async def get_freqtrade_trades(
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
):
    """
    Get Freqtrade trade history
    """
    result = await freqtrade_client.get_trades(limit=limit)
    return result


@router.get("/performance")
async def get_freqtrade_performance(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get Freqtrade performance statistics
    """
    result = await freqtrade_client.get_performance()
    return result
