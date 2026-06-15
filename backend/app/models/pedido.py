from sqlalchemy import Column,Integer,String
from app.core.database import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True)
    cliente = Column(String)
    status = Column(String)