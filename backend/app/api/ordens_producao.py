from app.models.estrutura_produto import EstruturaProduto
from app.models.produto import Produto
from app.models.movimentacao_estoque import MovimentacaoEstoque
from fastapi import APIRouter
from app.schemas.ordem_producao import OrdemProducaoCreate
from app.core.database import SessionLocal
from app.models.ordem_producao import OrdemProducao

router = APIRouter(
    prefix="/op",
    tags=["Ordens de Produção"]
)

@router.post("/")
def criar_op(dados: OrdemProducaoCreate):

    db: Session = SessionLocal()

    estrutura = db.query(EstruturaProduto).filter(
        EstruturaProduto.produto_pai_id == dados.produto_id
    ).all()

    if not estrutura:
        return {"erro": "Produto sem estrutura BOM"}

    # ✅ valida estoque
    for item in estrutura:
        componente = db.query(Produto).filter(
            Produto.id == item.componente_id
        ).first()

        total = item.quantidade * dados.quantidade

        if componente.estoque_atual < total:
            return {
                "erro": f"Estoque insuficiente: {componente.descricao}"
            }

    # ✅ baixa estoque + registra movimentação
    for item in estrutura:
        componente = db.query(Produto).filter(
            Produto.id == item.componente_id
        ).first()

        total = item.quantidade * dados.quantidade
        componente.estoque_atual -= total

        mov = MovimentacaoEstoque(
            produto_id=componente.id,
            tipo="PRODUCAO",
            quantidade=total,
            observacao=f"Consumo OP {dados.numero_op}"
        )
        db.add(mov)

    # ✅ cria OP
    op = OrdemProducao(**dados.model_dump())
    db.add(op)

    db.commit()
    db.refresh(op)

    return op

@router.post("/{id}/proximo-setor")
def proximo_setor(id: int):

    db = SessionLocal()

    op = db.query(
        OrdemProducao
    ).filter(
        OrdemProducao.id == id
    ).first()

    if not op:
        return {"erro": "OP não encontrada"}

    fluxo = [
        "SEPARACAO",
        "ELETRONICA",
        "MONTAGEM",
        "CALIBRACAO",
        "QUALIDADE",
        "EXPEDICAO"
    ]

    try:

        posicao = fluxo.index(
            op.setor_atual
        )

        if posicao < len(fluxo) - 1:

            op.setor_atual = fluxo[
                posicao + 1
            ]

            op.status = "EM_PRODUCAO"

        else:

            op.status = "FINALIZADA"

        db.commit()

        return {
            "id": op.id,
            "setor_atual": op.setor_atual,
            "status": op.status
        }

    except Exception as e:

        return {
            "erro": str(e)
        }