from pydantic import BaseModel


class OrdemProducaoCreate(BaseModel):

    numero_op: str

    produto_id: int

    quantidade: float

    status: str = "ABERTA"