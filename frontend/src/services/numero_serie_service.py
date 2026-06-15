def gerar_series(op_id, produto_id, quantidade):

    prefixo = "DT"  # Digi-Tron
    series = []

    for i in range(quantidade):
        numero = f"{prefixo}-{op_id}-{i+1:05d}"
        series.append({
            "produto_id": produto_id,
            "op_id": op_id,
            "numero_serie": numero,
            "status": "PRODUZIDO"
        })

    return series
