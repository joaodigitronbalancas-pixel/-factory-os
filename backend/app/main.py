from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.usuarios import router as usuarios_router
from app.auth.routes import router as auth_router
from app.api.clientes import router as clientes_router
from app.api.produtos import router as produtos_router
from app.api.ordens_producao import router as op_router
from app.api.apontamentos import router as apontamentos_router
from app.api.dashboard import router as dashboard_router
from app.api.setores import router as setores_router
from app.api.numero_serie import router as ns_router
from app.api.estoque import router as estoque_router
from app.api.estrutura import router as estrutura_router
from app.api.fornecedores import router as fornecedores_router
from app.api.assistencia import router as assistencia_router
from app.api.qualidade import router as qualidade_router
from app.api.pedidos import router as pedidos_router

app = FastAPI(title="Factory OS", version="4.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(usuarios_router)
app.include_router(clientes_router)
app.include_router(produtos_router)
app.include_router(op_router)
app.include_router(apontamentos_router)
app.include_router(dashboard_router)
app.include_router(setores_router)
app.include_router(ns_router)
app.include_router(estoque_router)
app.include_router(estrutura_router)
app.include_router(fornecedores_router)
app.include_router(assistencia_router)
app.include_router(qualidade_router)
app.include_router(pedidos_router)

@app.get("/")
def home():
    return {"sistema": "Factory OS", "versao": "4.0.0", "status": "online"}