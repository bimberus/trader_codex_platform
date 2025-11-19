from app.schemas import UserCreate
from pydantic import ValidationError

try:
    # Test valid password
    UserCreate(email="test@example.com", username="test", password="password123")
    print("Valid password test passed")
except ValidationError as e:
    print(f"Valid password test failed: {e}")

try:
    # Test too long password
    long_password = "a" * 51
    UserCreate(email="test@example.com", username="test", password=long_password)
    print("Long password test failed (should have raised ValidationError)")
except ValidationError as e:
    print("Long password test passed (caught ValidationError)")

try:
    # Test too short password
    short_password = "12345"
    UserCreate(email="test@example.com", username="test", password=short_password)
    print("Short password test failed (should have raised ValidationError)")
except ValidationError as e:
    print("Short password test passed (caught ValidationError)")
