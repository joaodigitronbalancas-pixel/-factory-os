from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.setor import Setor
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/setores", tags=["Setores"])

class SetorCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Setor).all()

@router.post("/")
def criar(dados: SetorCreate):
    db: Session = SessionLocal()
    setor = Setor(**dados.model_dump())
    db.add(setor)
    db.commit()
    db.refresh(setor)
    return setor