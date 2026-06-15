from fastapi import Depends, HTTPException
from app.core.auth import get_current_user

def require_perfil(perfis: list):

    def verifier(user = Depends(get_current_user)):

        if user["perfil"] not in perfis:
            raise HTTPException(status_code=403, detail="Acesso negado")

        return user

    return verifier