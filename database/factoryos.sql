CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(20),
    telefone VARCHAR(30),
    email VARCHAR(150),
    cidade VARCHAR(100),
    uf VARCHAR(2),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    unidade VARCHAR(10) NOT NULL,
    estoque_atual NUMERIC(12,2) DEFAULT 0,
    estoque_minimo NUMERIC(12,2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ordens_producao (
    id SERIAL PRIMARY KEY,
    numero_op VARCHAR(30) UNIQUE NOT NULL,
    produto_id INTEGER REFERENCES produtos(id),
    quantidade NUMERIC(12,2),
    status VARCHAR(50),
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apontamentos_op (
    id SERIAL PRIMARY KEY,
    op_id INTEGER REFERENCES ordens_producao(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    setor VARCHAR(50),
    status VARCHAR(50),
    observacao TEXT,
    data_apontamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


