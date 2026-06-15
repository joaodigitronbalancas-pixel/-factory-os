from sqlalchemy import Column,Integer,String
from app.core.database import Base

class Fornecedor(Base):
    __tablename__ = "fornecedores"

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    cnpj = Column(String)
    telefone = Column(String)
    email = Column(String)