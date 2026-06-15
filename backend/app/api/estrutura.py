from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.estrutura_produto import EstruturaProduto

router = APIRouter(prefix="/estrutura", tags=["BOM"])

@router.post("/")
def criar(dados: dict):
    db: Session = SessionLocal()
    item = EstruturaProduto(**dados)
    db.add(item)
    db.commit()
    return item

@router.get("/{produto_id}")
def listar(produto_id: int):
    db: Session = SessionLocal()
    return db.query(EstruturaProduto).filter(
        EstruturaProduto.produto_pai_id == produto_id
    ).all()