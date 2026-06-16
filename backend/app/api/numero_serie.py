from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.numero_serie import NumeroSerie
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/numero-serie", tags=["Numero Serie"])

class NumeroSerieCreate(BaseModel):
    numero_serie: str
    produto_id: Optional[int] = None
    op_id: Optional[int] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(NumeroSerie).all()

@router.post("/")
def criar(dados: NumeroSerieCreate):
    db: Session = SessionLocal()
    ns = NumeroSerie(**dados.model_dump())
    db.add(ns)
    db.commit()
    db.refresh(ns)
    return ns

@router.get("/{numero}")
def buscar(numero: str):
    db: Session = SessionLocal()
    return db.query(NumeroSerie).filter(NumeroSerie.numero_serie == numero).first()