from sqlalchemy import Column,Integer,String,DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Historico(Base):

    __tablename__ = "historico"

    id = Column(Integer, primary_key=True)

    modulo = Column(String)

    acao = Column(String)

    usuario = Column(String)

    data = Column(
        DateTime,
        server_default=func.now()
    )