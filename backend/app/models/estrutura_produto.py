from sqlalchemy import Column, Integer, Numeric, ForeignKey
from app.core.database import Base

class EstruturaProduto(Base):
    __tablename__ = "estrutura_produto"

    id = Column(Integer, primary_key=True)
    produto_pai_id = Column(Integer, ForeignKey("produtos.id"))
    componente_id = Column(Integer, ForeignKey("produtos.id"))
    quantidade = Column(Numeric(12,4))
