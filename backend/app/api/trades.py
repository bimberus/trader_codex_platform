"""
Trade history endpoints
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.models.trade import Trade
from app.models.bot import TradingBot
from app.schemas import TradeResponse

router = APIRouter(prefix="/trades", tags=["Trades"])


@router.get("/", response_model=List[TradeResponse])
def get_trades(
    skip: int = 0,
    limit: int = 100,
    bot_id: int = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get trade history for current user
    """
    query = db.query(Trade).join(TradingBot).filter(
        TradingBot.user_id == current_user.id
    )
    
    if bot_id:
        query = query.filter(Trade.bot_id == bot_id)
    
    trades = query.order_by(Trade.timestamp.desc()).offset(skip).limit(limit).all()
    
    return trades


@router.get("/{trade_id}", response_model=TradeResponse)
def get_trade(
    trade_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get specific trade by ID
    """
    trade = db.query(Trade).join(TradingBot).filter(
        Trade.id == trade_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not trade:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trade not found"
        )
    
    return trade
