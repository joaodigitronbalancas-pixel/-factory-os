from sqlalchemy import Column,Integer,Numeric,ForeignKey
from app.core.database import Base

class BOM(Base):

    __tablename__ = "bom"

    id = Column(Integer, primary_key=True)

    produto_id = Column(
        Integer,
        ForeignKey("produtos.id")
    )

    componente_id = Column(
        Integer,
        ForeignKey("produtos.id")
    )

    quantidade = Column(
        Numeric(12,2)
    )