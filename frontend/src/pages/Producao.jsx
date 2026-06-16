import { useEffect, useState } from "react";
import api from "../services/api";

const FLUXO = ["SEPARACAO","ELETRONICA","MONTAGEM","CALIBRACAO","QUALIDADE","EXPEDICAO","FINALIZADA"];
const COR = { SEPARACAO:"#f59e0b",ELETRONICA:"#8b5cf6",MONTAGEM:"#f97316",CALIBRACAO:"#06b6d4",QUALIDADE:"#84cc16",EXPEDICAO:"#10b981",FINALIZADA:"#6b7280",ABERTA:"#3b82f6" };

export default function Producao() {
  const [ops, setOps] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { const res = await api.get("/op"); setOps(res.data); } catch (e) { console.error(e); }
  }

  async function avancar(id) {
    try { await api.post(`/op/${id}/proximo-setor`); carregar(); } catch (e) { alert("Erro ao avançar"); }
  }

  const filtradas = ops.filter(op => {
    if (filtro === "todas") return true;
    if (filtro === "andamento") return op.status === "EM_PRODUCAO";
    if (filtro === "abertas") return op.status === "ABERTA";
    if (filtro === "finalizadas") return op.status === "FINALIZADA";
    return true;
  });

  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>⚙️ Produção</h1>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total OPs", valor: ops.length, cor: "#3b82f6" },
          { label: "Em Produção", valor: ops.filter(o => o.status === "EM_PRODUCAO").length, cor: "#f59e0b" },
          { label: "Finalizadas", valor: ops.filter(o => o.status === "FINALIZADA").length, cor: "#22c55e" },
          { label: "Abertas", valor: ops.filter(o => o.status === "ABERTA").length, cor: "#8b5cf6" },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["todas","Todas"],["abertas","Abertas"],["andamento","Em Produção"],["finalizadas","Finalizadas"]].map(([val, label]) => (
          <button key={val} onClick={() => setFiltro(val)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: filtro === val ? "bold" : "normal", background: filtro === val ? "#1e293b" : "#e2e8f0", color: filtro === val ? "#fff" : "#64748b" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["OP","Qtd","Prioridade","Setor Atual","Status","Fluxo","Ações"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtradas.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhuma OP encontrada</td></tr>
            ) : filtradas.map(op => (
              <tr key={op.id}>
                <td style={td}><strong>{op.numero_op}</strong></td>
                <td style={td}>{op.quantidade}</td>
                <td style={td}>
                  <span style={{ background: op.prioridade === "URGENTE" ? "#fee2e2" : op.prioridade === "ALTA" ? "#fef3c7" : "#f0fdf4", color: op.prioridade === "URGENTE" ? "#dc2626" : op.prioridade === "ALTA" ? "#d97706" : "#16a34a", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {op.prioridade}
                  </span>
                </td>
                <td style={td}>
                  <span style={{ background: COR[op.setor_atual] || "#e2e8f0", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {op.setor_atual}
                  </span>
                </td>
                <td style={td}>{op.status}</td>
                <td style={td}>
                  <div style={{ display: "flex", gap: 3 }}>
                    {FLUXO.map(s => (
                      <div key={s} style={{ width: 8, height: 8, borderRadius: "50%", background: FLUXO.indexOf(s) <= FLUXO.indexOf(op.setor_atual) ? (COR[s] || "#3b82f6") : "#e2e8f0" }} title={s} />
                    ))}
                  </div>
                </td>
                <td style={td}>
                  {op.status !== "FINALIZADA" && (
                    <button onClick={() => avancar(op.id)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>
                      ▶ Avançar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}