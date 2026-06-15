from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.core.database import Base


class OrdemProducao(Base):

    __tablename__ = "ordens_producao"

    id = Column(Integer, primary_key=True)

    numero_op = Column(
        String(30),
        unique=True
    )

    produto_id = Column(
        Integer,
        ForeignKey("produtos.id")
    )

    quantidade = Column(
        Numeric(12, 2)
    )

    # ABERTA
    # EM_PRODUCAO
    # QUALIDADE
    # EXPEDICAO
    # FINALIZADA
    status = Column(
        String(50),
        default="ABERTA"
    )

    # setor atual da OP
    setor_atual = Column(
    String(50),
    default="SEPARACAO"
)

    # BAIXA / MEDIA / ALTA / URGENTE
    prioridade = Column(
        String(20),
        default="MEDIA"
    )

    observacao = Column(
        String(500)
    )

    usuario_abertura = Column(
        String(100)
    )

    data_abertura = Column(
        DateTime,
        server_default=func.now()
    )

    data_inicio = Column(
        DateTime,
        nullable=True
    )

    data_fim = Column(
        DateTime,
        nullable=True
    )