from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.assistencia import Assistencia
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/assistencia", tags=["Assistencia"])

class AssistenciaCreate(BaseModel):
    numero_chamado: str
    cliente_id: Optional[int] = None
    numero_serie: Optional[str] = None
    descricao: Optional[str] = None
    prioridade: Optional[str] = "NORMAL"

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Assistencia).all()

@router.post("/")
def criar(dados: AssistenciaCreate):
    db: Session = SessionLocal()
    chamado = Assistencia(**dados.model_dump())
    db.add(chamado)
    db.commit()
    db.refresh(chamado)
    return chamado

@router.patch("/{id}/fechar")
def fechar(id: int):
    db: Session = SessionLocal()
    chamado = db.query(Assistencia).filter(Assistencia.id == id).first()
    if chamado:
        chamado.status = "FECHADO"
        db.commit()
    return chamado