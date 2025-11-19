"""
Pydantic schemas for API request/response models
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict, Field


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=50)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., max_length=50)


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# Trading Bot Schemas
class TradingBotBase(BaseModel):
    name: str
    pair: str
    strategy_id: Optional[int] = None
    config: Optional[dict] = None


class TradingBotCreate(TradingBotBase):
    pass


class TradingBotUpdate(BaseModel):
    name: Optional[str] = None
    pair: Optional[str] = None
    strategy_id: Optional[int] = None
    config: Optional[dict] = None
    status: Optional[str] = None


class TradingBotResponse(TradingBotBase):
    id: int
    user_id: int
    status: str
    balance: float
    profit: float
    profit_percentage: float
    total_trades: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


# Trade Schemas
class TradeBase(BaseModel):
    pair: str
    side: str
    order_type: str
    amount: float
    price: float
    total: float
    fee: Optional[float] = 0.0


class TradeCreate(TradeBase):
    bot_id: int


class TradeResponse(TradeBase):
    id: int
    bot_id: int
    profit: float
    profit_percentage: float
    is_closed: bool
    timestamp: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Strategy Schemas
class StrategyBase(BaseModel):
    name: str
    description: Optional[str] = None
    strategy_type: str
    parameters: Optional[dict] = None
    config: Optional[dict] = None


class StrategyCreate(StrategyBase):
    pass


class StrategyUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    strategy_type: Optional[str] = None
    parameters: Optional[dict] = None
    config: Optional[dict] = None
    is_active: Optional[bool] = None


class StrategyResponse(StrategyBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)
