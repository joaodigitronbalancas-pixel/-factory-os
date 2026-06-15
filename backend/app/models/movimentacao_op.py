from sqlalchemy import Column,Integer,String
from app.core.database import Base

class MovimentacaoOP(Base):
    __tablename__ = "movimentacoes_op"

    id = Column(Integer, primary_key=True)

    op_id = Column(Integer)

    setor = Column(String)

    status = Column(String)

    usuario = Column(String)