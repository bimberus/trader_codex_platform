#!/usr/bin/env python3
import sys
sys.path.append('/app')

from app.core.security import get_password_hash

# Test with a simple 6-character password
test_password = "test123"

print(f"Testing password: '{test_password}'")
print(f"Length in characters: {len(test_password)}")
print(f"Length in bytes: {len(test_password.encode('utf-8'))}")

try:
    hash_result = get_password_hash(test_password)
    print(f"SUCCESS: Hash created: {hash_result[:30]}...")
except ValueError as e:
    print(f"ERROR: {e}")
except Exception as e:
    print(f"UNEXPECTED ERROR: {type(e).__name__}: {e}")
