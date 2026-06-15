from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.qualidade import Qualidade
from app.models.ordem_producao import OrdemProducao

router = APIRouter(prefix="/qualidade", tags=["Qualidade"])

@router.post("/")
def inspecionar(dados: dict):

    db: Session = SessionLocal()

    registro = Qualidade(**dados)
    db.add(registro)

    op = db.query(OrdemProducao).filter(
        OrdemProducao.id == dados["op_id"]
    ).first()

    # 🔥 lógica industrial
    if dados["resultado"] == "REPROVADO":
        op.status = "BLOQUEADO"
    else:
        op.status = "APROVADO"

    db.commit()

    return registro
@router.post("/rnc")
def criar_rnc(dados: dict):
    db = SessionLocal()
    rnc = RNC(**dados)
    db.add(rnc)
    db.commit()
    return rnc


