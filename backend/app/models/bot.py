"""
Trading bot model
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class TradingBot(Base):
    __tablename__ = "trading_bots"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    pair = Column(String, nullable=False)  # e.g., BTC/USDT
    strategy_id = Column(Integer, ForeignKey("strategies.id"), nullable=True)
    status = Column(String, default="stopped")  # stopped, running, paused, error
    config = Column(JSON, nullable=True)
    balance = Column(Float, default=0.0)
    profit = Column(Float, default=0.0)
    profit_percentage = Column(Float, default=0.0)
    total_trades = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="bots")
    strategy = relationship("Strategy", back_populates="bots")
    trades = relationship("Trade", back_populates="bot", cascade="all, delete-orphan")
