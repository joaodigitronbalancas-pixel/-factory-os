from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.movimentacao_estoque import MovimentacaoEstoque

router = APIRouter(prefix="/estoque", tags=["Estoque"])

@router.post("/")
def movimentar(dados: dict):
    db: Session = SessionLocal()

    mov = MovimentacaoEstoque(**dados)
    db.add(mov)
    db.commit()

    return mov

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(MovimentacaoEstoque).all()
