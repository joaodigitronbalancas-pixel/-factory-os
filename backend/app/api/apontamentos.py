from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.apontamento_op import ApontamentoOP
from app.models.ordem_producao import OrdemProducao

from app.schemas.apontamento_op import ApontamentoCreate

router = APIRouter(
    prefix="/apontamentos",
    tags=["Rastreabilidade"]
)


@router.post("/")
def criar_apontamento(
    dados: ApontamentoCreate
):

    db: Session = SessionLocal()

    apontamento = ApontamentoOP(
        **dados.model_dump()
    )

    db.add(apontamento)

    op = db.query(
        OrdemProducao
    ).filter(
        OrdemProducao.id == dados.op_id
    ).first()

    if op:

        op.status = (
            f"{dados.setor}_{dados.status}"
        )

    db.commit()

    db.refresh(apontamento)

    return apontamento


@router.get("/")
def listar_apontamentos():

    db: Session = SessionLocal()

    return db.query(
        ApontamentoOP
    ).all()

@router.post("/")
def criar_apontamento(dados: ApontamentoCreate):

    db: Session = SessionLocal()

    op = db.query(OrdemProducao).filter(
        OrdemProducao.id == dados.op_id
    ).first()

    if not op:
        return {"erro": "OP não encontrada"}

    # 🔥 BLOQUEIO INDUSTRIAL
    if not pode_apontar(op.status, dados.setor):
        return {
            "erro": f"Fluxo inválido. OP está em {op.status}"
        }

    apontamento = ApontamentoOP(**dados.model_dump())
    db.add(apontamento)

    # 🔥 Atualiza status
    op.status = f"{dados.setor}_{dados.status}"

    db.commit()

    return apontamento