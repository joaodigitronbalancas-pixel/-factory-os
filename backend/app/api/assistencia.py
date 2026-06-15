from fastapi import APIRouter

router = APIRouter(
    prefix="/assistencia",
    tags=["Assistência"]
)

@router.get("/")
def listar():
    return []