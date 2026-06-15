from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "factoryos2026_super_secret"
ALGORITHM = "HS256"


def criar_token(data: dict):
    payload = data.copy()

    payload["exp"] = datetime.utcnow() + timedelta(hours=8)

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )