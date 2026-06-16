from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.pedido import Pedido
from pydantic import BaseModel
from typing import Optional
from datetime import date

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])

class PedidoCreate(BaseModel):
    numero_pedido: str
    cliente_id: Optional[int] = None
    valor_total: Optional[float] = 0
    data_entrega: Optional[date] = None
    observacao: Optional[str] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Pedido).all()

@router.post("/")
def criar(dados: PedidoCreate):
    db: Session = SessionLocal()
    pedido = Pedido(**dados.model_dump())
    db.add(pedido)
    db.commit()
    db.refresh(pedido)
    return pedido