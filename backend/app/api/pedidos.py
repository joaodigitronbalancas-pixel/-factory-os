from fastapi import APIRouter

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)

@router.get("/")
def listar():
    return []

@router.post("/")
def criar():
    return {"ok": True}