from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)

    nome = Column(String(100))

    email = Column(String(150), unique=True)

    senha = Column(String(255))

    perfil = Column(
    String(50),
    default="COMERCIAL"
    )

    ativo = Column(Boolean, default=True)

    criado_em = Column(
        DateTime,
        server_default=func.now()
    )