from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.sql import func

from app.core.database import Base


class ApontamentoOP(Base):

    __tablename__ = "apontamentos_op"

    id = Column(Integer, primary_key=True)

    op_id = Column(
        Integer,
        ForeignKey("ordens_producao.id")
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id")
    )

    setor = Column(String(50))

    status = Column(String(50))

    observacao = Column(Text)

    data_apontamento = Column(
        DateTime,
        server_default=func.now()
    )

    ORDEM_SETOR = [
    "SEPARACAO",
    "MONTAGEM",
    "ELETRONICA",
    "CALIBRACAO",
    "TESTE",
    "EMBALAGEM",
    "EXPEDICAO"
]

def pode_apontar(op_status, setor):
    if op_status == "ABERTA" and setor == "SEPARACAO":
        return True

    if "_" in op_status:
        atual = op_status.split("_")[0]

        try:
            idx = ORDEM_SETOR.index(atual)
            proximo = ORDEM_SETOR[idx + 1]
            return setor == proximo
        except:
            return False

    return False