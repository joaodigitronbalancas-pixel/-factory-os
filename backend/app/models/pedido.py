from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Pedido(Base):
    __tablename__ = "pedidos"
    id = Column(Integer, primary_key=True, index=True)
    numero_pedido = Column(String(30), unique=True, nullable=False)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=True)
    status = Column(String(50), default="ABERTO")
    valor_total = Column(Numeric(12, 2), default=0)
    data_pedido = Column(DateTime, server_default=func.now())
    data_entrega = Column(Date, nullable=True)
    observacao = Column(Text, nullable=True)