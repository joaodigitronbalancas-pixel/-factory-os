from sqlalchemy import Column, Integer, String, Numeric, DateTime, Date, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.database import Base

class OrdemProducao(Base):
    __tablename__ = "ordens_producao"
    id = Column(Integer, primary_key=True, index=True)
    numero_op = Column(String(30), unique=True, nullable=False)
    produto_id = Column(Integer, ForeignKey("produtos.id"), nullable=True)
    quantidade = Column(Numeric(12, 2), default=1)
    status = Column(String(50), default="ABERTA")
    setor_atual = Column(String(50), default="SEPARACAO")
    prioridade = Column(String(20), default="MEDIA")
    observacao = Column(Text, nullable=True)
    usuario_abertura = Column(String(100), nullable=True)
    data_abertura = Column(DateTime, server_default=func.now())
    data_previsao = Column(Date, nullable=True)
    data_inicio = Column(DateTime, nullable=True)
    data_fim = Column(DateTime, nullable=True)