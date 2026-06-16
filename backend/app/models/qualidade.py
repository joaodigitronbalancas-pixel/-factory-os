from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Qualidade(Base):
    __tablename__ = "inspecoes_qualidade"
    id = Column(Integer, primary_key=True, index=True)
    op_id = Column(Integer, ForeignKey("ordens_producao.id"), nullable=True)
    inspetor = Column(String(100))
    resultado = Column(String(50), default="APROVADO")
    observacao = Column(Text, nullable=True)
    criado_em = Column(DateTime, server_default=func.now())