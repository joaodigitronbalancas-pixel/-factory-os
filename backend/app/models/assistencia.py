from sqlalchemy import Column,Integer,String
from app.core.database import Base

class Assistencia(Base):

    __tablename__ = "assistencias"

    id = Column(Integer, primary_key=True)

    numero_serie = Column(String)

    cliente = Column(String)

    defeito = Column(String)

    status = Column(String)