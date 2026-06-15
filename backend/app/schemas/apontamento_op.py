from pydantic import BaseModel


class ApontamentoCreate(BaseModel):

    op_id: int

    usuario_id: int

    setor: str

    status: str

    observacao: str = ""