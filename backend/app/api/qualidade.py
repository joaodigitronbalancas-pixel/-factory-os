from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.qualidade import Qualidade
from app.models.ordem_producao import OrdemProducao
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/qualidade", tags=["Qualidade"])

class InspecaoCreate(BaseModel):
    op_id: Optional[int] = None
    inspetor: Optional[str] = None
    resultado: str = "APROVADO"
    observacao: Optional[str] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Qualidade).all()

@router.post("/")
def inspecionar(dados: InspecaoCreate):
    db: Session = SessionLocal()
    registro = Qualidade(**dados.model_dump())
    db.add(registro)
    if dados.op_id:
        op = db.query(OrdemProducao).filter(
            OrdemProducao.id == dados.op_id
        ).first()
        if op:
            op.status = "BLOQUEADO" if dados.resultado == "REPROVADO" else "QUALIDADE_OK"
    db.commit()
    db.refresh(registro)
    return registro