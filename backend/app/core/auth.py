from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = "123456"  # depois troca por .env
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme)):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = {
            "id": payload.get("sub"),
            "perfil": payload.get("perfil")
        }
        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")