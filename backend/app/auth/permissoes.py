from fastapi import HTTPException

def verificar_perfil(usuario, perfis):
    
    if usuario.perfil not in perfis:
        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )