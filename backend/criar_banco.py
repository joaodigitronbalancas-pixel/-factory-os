import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Conecta no postgres padrão para criar o banco
conn = psycopg2.connect(host="localhost", user="postgres", password="123456", dbname="postgres")
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = conn.cursor()
cur.execute("DROP DATABASE IF EXISTS factoryos;")
cur.execute("CREATE DATABASE factoryos;")
conn.close()
print("✅ Banco criado!")

# Conecta no factoryos e cria as tabelas
conn2 = psycopg2.connect(host="localhost", user="postgres", password="123456", dbname="factoryos")
cur2 = conn2.cursor()
cur2.execute(open("../database/factoryos.sql", encoding="utf-8").read())
conn2.commit()
conn2.close()
print("✅ Tabelas criadas!")