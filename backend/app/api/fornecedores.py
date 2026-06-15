from fastapi import APIRouter

router = APIRouter(
    prefix="/fornecedores",
    tags=["Fornecedores"]
)

@router.get("/")
def listar():
    return []

@router.post("/")
def criar():
    return {"ok": True}