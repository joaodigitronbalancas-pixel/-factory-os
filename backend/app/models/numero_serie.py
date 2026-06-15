from sqlalchemy import Column,Integer,String
from app.core.database import Base

class NumeroSerie(Base):
    __tablename__ = "numeros_serie"

    id = Column(Integer, primary_key=True)

    numero = Column(String(50), unique=True)

    produto_id = Column(Integer)

    op_id = Column(Integer)

    status = Column(String(50))