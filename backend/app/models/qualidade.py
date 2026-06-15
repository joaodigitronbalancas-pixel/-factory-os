from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Qualidade(Base):
    __tablename__ = "qualidade"

    id = Column(Integer, primary_key=True)
    op_id = Column(Integer, ForeignKey("ordens_producao.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    resultado = Column(String(50))  # APROVADO / REPROVADO
    observacao = Column(Text)
    data_inspecao = Column(DateTime, server_default=func.now())
