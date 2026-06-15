from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.setor import Setor

router = APIRouter(prefix="/setores", tags=["Setores"])

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(Setor).all()
