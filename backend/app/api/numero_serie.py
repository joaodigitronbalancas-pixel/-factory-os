from fastapi import APIRouter
from sqlalchemy import text
from app.core.database import engine

router = APIRouter(
    prefix="/numero-serie",
    tags=["Numero Serie"]
)

@router.get("")
def listar():

    with engine.connect() as conn:

        dados = conn.execute(
            text("""
                SELECT *
                FROM numeros_serie
                ORDER BY id DESC
            """)
        )

        return [
            dict(row._mapping)
            for row in dados
        ]