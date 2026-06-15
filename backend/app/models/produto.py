from sqlalchemy import Column, Integer, String, Boolean, Numeric, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Produto(Base):

    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)

    codigo = Column(String(50), unique=True)

    descricao = Column(String(255))

    unidade = Column(String(10))

    estoque_atual = Column(Numeric(12, 2), default=0)

    estoque_minimo = Column(Numeric(12, 2), default=0)

    ativo = Column(Boolean, default=True)

    criado_em = Column(
        DateTime,
        server_default=func.now()
    )