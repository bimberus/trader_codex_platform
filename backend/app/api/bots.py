"""
Trading Bot CRUD endpoints
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.models.bot import TradingBot
from app.schemas import TradingBotCreate, TradingBotUpdate, TradingBotResponse

router = APIRouter(prefix="/bots", tags=["Trading Bots"])


@router.get("/", response_model=List[TradingBotResponse])
def get_bots(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get all trading bots for current user
    """
    bots = db.query(TradingBot).filter(
        TradingBot.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return bots


@router.get("/{bot_id}", response_model=TradingBotResponse)
def get_bot(
    bot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get specific trading bot by ID
    """
    bot = db.query(TradingBot).filter(
        TradingBot.id == bot_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    
    return bot


@router.post("/", response_model=TradingBotResponse, status_code=status.HTTP_201_CREATED)
def create_bot(
    bot_data: TradingBotCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Create a new trading bot
    """
    new_bot = TradingBot(
        user_id=current_user.id,
        name=bot_data.name,
        pair=bot_data.pair,
        strategy_id=bot_data.strategy_id,
        config=bot_data.config,
        status="stopped"
    )
    
    db.add(new_bot)
    db.commit()
    db.refresh(new_bot)
    
    return new_bot


@router.put("/{bot_id}", response_model=TradingBotResponse)
def update_bot(
    bot_id: int,
    bot_data: TradingBotUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update trading bot
    """
    bot = db.query(TradingBot).filter(
        TradingBot.id == bot_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    
    # Update fields
    update_data = bot_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(bot, field, value)
    
    db.commit()
    db.refresh(bot)
    
    return bot


@router.delete("/{bot_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bot(
    bot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Delete trading bot
    """
    bot = db.query(TradingBot).filter(
        TradingBot.id == bot_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    
    db.delete(bot)
    db.commit()
    
    return None


@router.post("/{bot_id}/start", response_model=TradingBotResponse)
def start_bot(
    bot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Start trading bot
    """
    bot = db.query(TradingBot).filter(
        TradingBot.id == bot_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    
    bot.status = "running"
    db.commit()
    db.refresh(bot)
    
    return bot


@router.post("/{bot_id}/stop", response_model=TradingBotResponse)
def stop_bot(
    bot_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Stop trading bot
    """
    bot = db.query(TradingBot).filter(
        TradingBot.id == bot_id,
        TradingBot.user_id == current_user.id
    ).first()
    
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    
    bot.status = "stopped"
    db.commit()
    db.refresh(bot)
    
    return bot
