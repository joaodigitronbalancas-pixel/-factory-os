from app.core.database import engine

try:
    conn = engine.connect()
    print("BANCO CONECTADO")
    conn.close()
except Exception as e:
    print(e)