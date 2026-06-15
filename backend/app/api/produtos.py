from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.produto import Produto
from app.schemas.produto import ProdutoCreate

router = APIRouter(
    prefix="/produtos",
    tags=["Produtos"]
)


@router.post("/")
def criar_produto(dados: ProdutoCreate):

    db: Session = SessionLocal()

    produto = Produto(**dados.model_dump())

    db.add(produto)

    db.commit()

    db.refresh(produto)

    return produto


@router.get("/")
def listar_produtos():

    db: Session = SessionLocal()

    return db.query(Produto).all()