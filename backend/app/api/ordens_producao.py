from fastapi import APIRouter
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core.database import SessionLocal
from app.models.ordem_producao import OrdemProducao
from app.models.estrutura_produto import EstruturaProduto
from app.models.produto import Produto
from app.models.movimentacao_estoque import MovimentacaoEstoque

router = APIRouter(prefix="/op", tags=["Ordens de Produção"])

FLUXO = ["SEPARACAO", "ELETRONICA", "MONTAGEM", "CALIBRACAO", "QUALIDADE", "EXPEDICAO", "FINALIZADA"]

class OrdemProducaoCreate(BaseModel):
    numero_op: str
    produto_id: Optional[int] = None
    quantidade: Optional[float] = 1
    prioridade: Optional[str] = "MEDIA"
    observacao: Optional[str] = None
    data_previsao: Optional[str] = None

@router.get("/")
def listar():
    db: Session = SessionLocal()
    return db.query(OrdemProducao).all()

@router.get("/{id}")
def buscar(id: int):
    db: Session = SessionLocal()
    return db.query(OrdemProducao).filter(OrdemProducao.id == id).first()

@router.post("/")
def criar_op(dados: OrdemProducaoCreate):
    db: Session = SessionLocal()

    # Verifica BOM se produto informado
    if dados.produto_id:
        estrutura = db.query(EstruturaProduto).filter(
            EstruturaProduto.produto_pai_id == dados.produto_id
        ).all()

        if estrutura:
            for item in estrutura:
                componente = db.query(Produto).filter(Produto.id == item.componente_id).first()
                if componente:
                    total = item.quantidade * dados.quantidade
                    if componente.estoque_atual < total:
                        return {"erro": f"Estoque insuficiente: {componente.descricao}"}

            for item in estrutura:
                componente = db.query(Produto).filter(Produto.id == item.componente_id).first()
                if componente:
                    total = item.quantidade * dados.quantidade
                    componente.estoque_atual -= total
                    mov = MovimentacaoEstoque(
                        produto_id=componente.id,
                        tipo="PRODUCAO",
                        quantidade=total,
                        observacao=f"Consumo OP {dados.numero_op}"
                    )
                    db.add(mov)

    op = OrdemProducao(
        numero_op=dados.numero_op,
        produto_id=dados.produto_id,
        quantidade=dados.quantidade,
        prioridade=dados.prioridade,
        observacao=dados.observacao,
        status="ABERTA",
        setor_atual="SEPARACAO"
    )
    db.add(op)
    db.commit()
    db.refresh(op)
    return op

@router.post("/{id}/proximo-setor")
def proximo_setor(id: int):
    db: Session = SessionLocal()
    op = db.query(OrdemProducao).filter(OrdemProducao.id == id).first()
    if not op:
        return {"erro": "OP não encontrada"}

    setor_atual = op.setor_atual or "SEPARACAO"

    try:
        posicao = FLUXO.index(setor_atual)
        if posicao < len(FLUXO) - 1:
            op.setor_atual = FLUXO[posicao + 1]
            op.status = "EM_PRODUCAO" if op.setor_atual != "FINALIZADA" else "FINALIZADA"
        else:
            op.setor_atual = "FINALIZADA"
            op.status = "FINALIZADA"
        db.commit()
        return {"id": op.id, "setor_atual": op.setor_atual, "status": op.status}
    except ValueError:
        op.setor_atual = FLUXO[0]
        db.commit()
        return {"id": op.id, "setor_atual": op.setor_atual, "status": op.status}

@router.delete("/{id}")
def deletar(id: int):
    db: Session = SessionLocal()
    op = db.query(OrdemProducao).filter(OrdemProducao.id == id).first()
    if not op:
        return {"erro": "OP não encontrada"}
    db.delete(op)
    db.commit()
    return {"ok": True}