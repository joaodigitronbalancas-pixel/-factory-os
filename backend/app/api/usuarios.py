from fastapi import APIRouter

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

@router.get("/")
def listar_usuarios():
    return [
        {
            "id": 1,
            "nome": "Administrador",
            "email": "admin@factoryos.com"
        }
    ]