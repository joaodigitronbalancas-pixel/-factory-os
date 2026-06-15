from pydantic import BaseModel


class ClienteCreate(BaseModel):

    razao_social: str

    nome_fantasia: str | None = None

    cnpj: str | None = None

    telefone: str | None = None

    email: str | None = None

    cidade: str | None = None

    uf: str | None = None


class ClienteResponse(ClienteCreate):

    id: int

    class Config:
        from_attributes = True