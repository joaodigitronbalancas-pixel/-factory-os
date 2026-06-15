from fastapi import APIRouter
from sqlalchemy import func

from app.core.database import SessionLocal

from app.models.cliente import Cliente
from app.models.produto import Produto
from app.models.ordem_producao import OrdemProducao

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/resumo")
def resumo():

    db = SessionLocal()

    return {

        "clientes":
        db.query(
            func.count(Cliente.id)
        ).scalar(),

        "produtos":
        db.query(
            func.count(Produto.id)
        ).scalar(),

        "ops":
        db.query(
            func.count(
                OrdemProducao.id
            )
        ).scalar()
    }

@router.get("/estoque-baixo")
def estoque_baixo():

    db = SessionLocal()

    produtos = db.query(
        Produto
    ).filter(
        Produto.estoque_atual <=
        Produto.estoque_minimo
    ).all()

    return produtos

@router.get("/executivo")
def dashboard_executivo():
    return {
        "clientes": 0,
        "produtos": 0,
        "ops": 0,
        "fornecedores": 0,
        "chamados": 0
    }

@router.get("/producao")
def dashboard_producao():
    return {
        "abertas": 0,
        "producao": 0,
        "qualidade": 0,
        "finalizadas": 0
    }

@router.get("/comercial")
def dashboard_comercial():
    return {
        "clientes": 0,
        "pedidos": 0,
        "faturamento": 0
    }

@router.get("/assistencia")
def dashboard_assistencia():
    return {
        "abertos": 0,
        "andamento": 0,
        "fechados": 0
    }

@router.get("/industrial")
def industrial():
    db = SessionLocal()

    abertas = db.query(OrdemProducao).filter(
        OrdemProducao.status == "ABERTA"
    ).count()

    andamento = db.query(OrdemProducao).filter(
        OrdemProducao.status.like("%INICIADO%")
    ).count()

    finalizadas = db.query(OrdemProducao).filter(
        OrdemProducao.status.like("%FINALIZADO%")
    ).count()

    return {
        "ops_abertas": abertas,
        "ops_andamento": andamento,
        "ops_finalizadas": finalizadas
    }




