from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.usuario import Usuario
from app.core.security import gerar_hash
from pydantic import BaseModel

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    perfil: str = "COMERCIAL"

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Usuario).all()

@router.post("/")
def criar(dados: UsuarioCreate):
    db: Session = SessionLocal()
    usuario = Usuario(
        nome=dados.nome,
        email=dados.email,
        senha=gerar_hash(dados.senha),
        perfil=dados.perfil
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario