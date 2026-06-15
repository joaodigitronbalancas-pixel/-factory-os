from fastapi import APIRouter
from fastapi import HTTPException
from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.usuario import Usuario

from app.core.security import verificar_senha
from app.auth.jwt import criar_token


router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)


class LoginRequest(BaseModel):

    email: str

    senha: str


@router.post("/login")
def login(dados: LoginRequest):

    db: Session = SessionLocal()

    usuario = (
        db.query(Usuario)
        .filter(
            Usuario.email == dados.email
        )
        .first()
    )

    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Usuário não encontrado"
        )

    if not verificar_senha(
        dados.senha,
        usuario.senha
    ):

        raise HTTPException(
            status_code=401,
            detail="Senha inválida"
        )

    token = criar_token(
        {
            "sub": usuario.email,
            "perfil": usuario.perfil
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": usuario.nome,
        "perfil": usuario.perfil
    }


@router.get("/teste")
def teste():
    return {
        "status": "ok"
    }