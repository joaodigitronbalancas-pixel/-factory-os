from pydantic import BaseModel


class ProdutoCreate(BaseModel):

    codigo: str

    descricao: str

    unidade: str

    estoque_atual: float = 0

    estoque_minimo: float = 0