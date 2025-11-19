import sys
import os

# Add current directory to path
sys.path.append(os.getcwd())

try:
    from app.core.security import verify_password, get_password_hash
    
    # Create a valid hash
    pw_hash = get_password_hash("password123")
    
    # Try to verify with a very long password
    long_password = "a" * 100
    print(f"Testing verify_password with length {len(long_password)}")
    result = verify_password(long_password, pw_hash)
    print(f"Result: {result}")

except ValueError as e:
    print(f"Caught expected ValueError: {e}")
except Exception as e:
    print(f"Caught unexpected exception: {e}")
