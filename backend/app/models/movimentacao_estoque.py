from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.database import Base

class MovimentacaoEstoque(Base):
    __tablename__ = "movimentacoes_estoque"

    id = Column(Integer, primary_key=True)
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    tipo = Column(String(20))
    quantidade = Column(Numeric(12,2))
    observacao = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    data_movimentacao = Column(DateTime, server_default=func.now())