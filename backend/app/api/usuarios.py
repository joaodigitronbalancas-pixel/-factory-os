from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.usuario import Usuario
from app.core.security import gerar_hash
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    perfil: Optional[str] = "COMERCIAL"

@router.get("/")
def listar():
    db: Session = SessionLocal()
    usuarios = db.query(Usuario).all()
    return [{"id": u.id, "nome": u.nome, "email": u.email, "perfil": u.perfil, "ativo": u.ativo} for u in usuarios]

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
    return {"id": usuario.id, "nome": usuario.nome, "email": usuario.email, "perfil": usuario.perfil}