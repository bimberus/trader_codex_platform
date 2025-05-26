from pydantic import BaseSettings, PostgresDsn
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Trader Codex"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "System do handlu algorytmicznego na rynkach kryptowalut"
    
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_DEBUG: bool = False
    
    DATABASE_URL: PostgresDsn
    
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    CORS_ORIGINS: List[str] = ["*"]
    
    FREQTRADE_API_SERVER: str
    FREQTRADE_USERNAME: str
    FREQTRADE_PASSWORD: str
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()