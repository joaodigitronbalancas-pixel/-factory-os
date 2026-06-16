import { useEffect, useState } from "react";
import api from "../services/api";

export default function Estoque() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const res = await api.get("/produtos");
    setItens(res.data);
  }

  const filtrados = itens.filter(p => {
    const ok = p.descricao?.toLowerCase().includes(busca.toLowerCase?.() || "") || p.codigo?.includes(busca);
    if (filtro === "baixo") return ok && p.estoque_atual <= p.estoque_minimo;
    if (filtro === "ok") return ok && p.estoque_atual > p.estoque_minimo;
    return ok;
  });

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  const total = itens.length;
  const baixo = itens.filter(p => p.estoque_atual <= p.estoque_minimo).length;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>🗄️ Estoque</h1>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total de Itens", valor: total, cor: "#3b82f6" },
          { label: "Estoque Baixo", valor: baixo, cor: "#ef4444" },
          { label: "Estoque OK", valor: total - baixo, cor: "#22c55e" },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input placeholder="Buscar produto..." value={busca} onChange={e => setBusca(e.target.value)}
          style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1" }} />
        <select value={filtro} onChange={e => setFiltro(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <option value="todos">Todos</option>
          <option value="baixo">⚠️ Estoque Baixo</option>
          <option value="ok">✅ Estoque OK</option>
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Código","Descrição","Un","Estoque Atual","Estoque Mínimo","Situação"].map(h => (
                <th key={h} style={estiloTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => {
              const baixo = p.estoque_atual <= p.estoque_minimo;
              return (
                <tr key={p.id}>
                  <td style={estiloTd}><code>{p.codigo}</code></td>
                  <td style={estiloTd}>{p.descricao}</td>
                  <td style={estiloTd}>{p.unidade}</td>
                  <td style={{ ...estiloTd, fontWeight: "bold", color: baixo ? "#dc2626" : "#16a34a" }}>{p.estoque_atual}</td>
                  <td style={estiloTd}>{p.estoque_minimo}</td>
                  <td style={estiloTd}>
                    <span style={{ background: baixo ? "#fee2e2" : "#dcfce7", color: baixo ? "#dc2626" : "#16a34a", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                      {baixo ? "⚠️ Repor" : "✅ OK"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}