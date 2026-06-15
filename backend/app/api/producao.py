from fastapi import APIRouter

router = APIRouter(
    prefix="/producao",
    tags=["Produção"]
)

from fastapi import APIRouter

router = APIRouter(
    prefix="/producao",
    tags=["Produção"]
)

@router.post("/{id}/iniciar")
def iniciar(id:int):
    return {"status":"EM PRODUCAO"}

@router.post("/{id}/encerrar")
def encerrar(id:int):
    return {"status":"FINALIZADA"}

