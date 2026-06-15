from sqlalchemy import Column,Integer,String
from app.core.database import Base

class Rastreabilidade(Base):

    __tablename__ = "rastreabilidade"

    id = Column(Integer, primary_key=True)

    serial = Column(String)

    op = Column(String)

    setor = Column(String)

    status = Column(String)