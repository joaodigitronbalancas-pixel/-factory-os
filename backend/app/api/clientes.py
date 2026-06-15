from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.cliente import Cliente
from app.schemas.cliente import ClienteCreate


router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)


@router.post("/")
def criar_cliente(dados: ClienteCreate):

    db: Session = SessionLocal()

    cliente = Cliente(**dados.model_dump())

    db.add(cliente)

    db.commit()

    db.refresh(cliente)

    return cliente


@router.get("/")
def listar_clientes():

    db: Session = SessionLocal()

    return db.query(Cliente).all()