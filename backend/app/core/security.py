"""
Security utilities for password hashing and JWT tokens
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    # Explicitly handle long passwords to avoid bcrypt crash
    # bcrypt checks bytes, not characters
    if len(plain_password.encode('utf-8')) > 72:
        return False

    try:
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError:
        return False


def get_password_hash(password: str) -> str:
    """Hash a password"""
    # Explicitly check password BYTE length to prevent bcrypt errors
    # bcrypt checks bytes, not characters - special chars can be multi-byte
    password_bytes = len(password.encode('utf-8'))
    if password_bytes > 72:
        raise ValueError(f"password cannot be longer than 72 bytes (currently {password_bytes} bytes), truncate manually if necessary (e.g. my_password[:72])")
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """Decode and verify a JWT token"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
