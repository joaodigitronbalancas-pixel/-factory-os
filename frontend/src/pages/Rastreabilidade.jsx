import { useEffect, useState } from "react";
import api from "../services/api";

export default function Rastreabilidade() {
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function rastrear() {
    if (!busca.trim()) return;
    setCarregando(true);
    setResultado(null);
    try {
      const res = await api.get(`/numero-serie?q=${busca}`);
      setResultado(res.data);
    } catch (e) {
      setResultado({ erro: "Número de série não encontrado" });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>🔍 Rastreabilidade</h1>
      <div style={{ background: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", maxWidth: 600 }}>
        <h3 style={{ marginTop: 0 }}>Rastrear por Número de Série</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            onKeyDown={e => e.key === "Enter" && rastrear()}
            placeholder="Digite o número de série..."
            style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 14 }}
          />
          <button onClick={rastrear} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
            {carregando ? "..." : "🔍 Rastrear"}
          </button>
        </div>

        {resultado && !resultado.erro && (
          <div style={{ marginTop: 20, border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: "#1e293b", color: "#fff", padding: "10px 16px", fontWeight: "bold" }}>
              Resultado — {resultado.numero_serie}
            </div>
            <div style={{ padding: 16 }}>
              {[
                ["Número de Série", resultado.numero_serie],
                ["Produto ID", resultado.produto_id],
                ["OP ID", resultado.op_id],
                ["Status", resultado.status],
                ["Criado em", resultado.criado_em ? new Date(resultado.criado_em).toLocaleDateString("pt-BR") : "—"],
              ].map(([label, valor]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>{label}</span>
                  <span style={{ fontWeight: "bold", fontSize: 13 }}>{valor || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultado?.erro && (
          <div style={{ marginTop: 16, background: "#fee2e2", color: "#dc2626", padding: 16, borderRadius: 8 }}>
            ❌ {resultado.erro}
          </div>
        )}
      </div>
    </div>
  );
}