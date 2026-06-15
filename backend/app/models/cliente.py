from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Cliente(Base):

    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)

    razao_social = Column(String(255))

    nome_fantasia = Column(String(255))

    cnpj = Column(String(20))

    telefone = Column(String(30))

    email = Column(String(150))

    cidade = Column(String(100))

    uf = Column(String(2))

    ativo = Column(Boolean, default=True)

    criado_em = Column(
        DateTime,
        server_default=func.now()
    )