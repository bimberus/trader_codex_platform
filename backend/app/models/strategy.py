"""
Strategy model for trading strategies
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Strategy(Base):
    __tablename__ = "strategies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    strategy_type = Column(String, nullable=False)  # e.g., SMA, EMA, RSI, Custom
    parameters = Column(JSON, nullable=True)  # Strategy parameters
    config = Column(JSON, nullable=True)  # Full configuration
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="strategies")
    bots = relationship("TradingBot", back_populates="strategy")
