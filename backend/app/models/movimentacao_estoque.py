from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.database import Base

class MovimentacaoEstoque(Base):
    __tablename__ = "movimentacoes_estoque"
    id = Column(Integer, primary_key=True, index=True)
    produto_id = Column(Integer, ForeignKey("produtos.id"), nullable=True)
    tipo = Column(String(50))
    quantidade = Column(Numeric(12, 2), default=0)
    observacao = Column(Text, nullable=True)
    criado_em = Column(DateTime, server_default=func.now())