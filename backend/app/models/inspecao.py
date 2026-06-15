from sqlalchemy import Column,Integer,String
from app.core.database import Base

class Inspecao(Base):

    __tablename__ = "inspecoes"

    id = Column(Integer, primary_key=True)

    serial = Column(String)

    resultado = Column(String)

    observacao = Column(String)