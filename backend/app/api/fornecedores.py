from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.fornecedor import Fornecedor
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/fornecedores", tags=["Fornecedores"])

class FornecedorCreate(BaseModel):
    razao_social: str
    cnpj: Optional[str] = None
    telefone: Optional[str] = None
    email: Optional[str] = None
    cidade: Optional[str] = None
    uf: Optional[str] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Fornecedor).all()

@router.post("/")
def criar(dados: FornecedorCreate):
    db: Session = SessionLocal()
    fornecedor = Fornecedor(**dados.model_dump())
    db.add(fornecedor)
    db.commit()
    db.refresh(fornecedor)
    return fornecedor