from sqlalchemy import Column, Integer, String

from app.core.database import Base


class Setor(Base):

    __tablename__ = "setores"

    id = Column(Integer, primary_key=True)

    nome = Column(String(100))

    ordem = Column(Integer)