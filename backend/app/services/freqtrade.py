"""
Freqtrade API Client
"""
import httpx
from typing import Optional, Dict, Any
from app.core.config import settings


class FreqtradeClient:
    """
    Client for communicating with Freqtrade REST API
    """
    
    def __init__(self, base_url: str = None, username: str = None, password: str = None):
        self.base_url = base_url or settings.FREQTRADE_API_SERVER
        self.username = username or settings.FREQTRADE_USERNAME
        self.password = password or settings.FREQTRADE_PASSWORD
        self.client = httpx.AsyncClient(base_url=self.base_url, timeout=30.0)
    
    async def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Make HTTP request to Freqtrade API"""
        headers = kwargs.get("headers", {})
        headers["Authorization"] = f"Basic {self.username}:{self.password}"
        kwargs["headers"] = headers
        
        try:
            response = await self.client.request(method, endpoint, **kwargs)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Freqtrade API error: {e}")
            return {"error": str(e)}
    
    async def get_status(self) -> Dict[str, Any]:
        """Get bot status"""
        return await self._request("GET", "/api/v1/status")
    
    async def start_bot(self) -> Dict[str, Any]:
        """Start the bot"""
        return await self._request("POST", "/api/v1/start")
    
    async def stop_bot(self) -> Dict[str, Any]:
        """Stop the bot"""
        return await self._request("POST", "/api/v1/stop")
    
    async def get_profit(self) -> Dict[str, Any]:
        """Get profit information"""
        return await self._request("GET", "/api/v1/profit")
    
    async def get_balance(self) -> Dict[str, Any]:
        """Get wallet balance"""
        return await self._request("GET", "/api/v1/balance")
    
    async def get_trades(self, limit: int = 100) -> Dict[str, Any]:
        """Get trade history"""
        return await self._request("GET", f"/api/v1/trades?limit={limit}")
    
    async def get_open_trades(self) -> Dict[str, Any]:
        """Get open trades"""
        return await self._request("GET", "/api/v1/status")
    
    async def get_performance(self) -> Dict[str, Any]:
        """Get performance statistics"""
        return await self._request("GET", "/api/v1/performance")
    
    async def forcebuy(self, pair: str, price: Optional[float] = None) -> Dict[str, Any]:
        """Force buy a pair"""
        data = {"pair": pair}
        if price:
            data["price"] = price
        return await self._request("POST", "/api/v1/forcebuy", json=data)
    
    async def forcesell(self, tradeid: int) -> Dict[str, Any]:
        """Force sell a trade"""
        data = {"tradeid": tradeid}
        return await self._request("POST", "/api/v1/forcesell", json=data)
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()


# Global client instance
freqtrade_client = FreqtradeClient()
