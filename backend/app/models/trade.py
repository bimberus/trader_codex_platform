"""
Trade model for transaction history
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    bot_id = Column(Integer, ForeignKey("trading_bots.id"), nullable=False)
    pair = Column(String, nullable=False)
    side = Column(String, nullable=False)  # buy, sell
    order_type = Column(String, nullable=False)  # market, limit, stop_loss
    amount = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
    fee = Column(Float, default=0.0)
    profit = Column(Float, default=0.0)
    profit_percentage = Column(Float, default=0.0)
    is_closed = Column(Boolean, default=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Relationships
    bot = relationship("TradingBot", back_populates="trades")
