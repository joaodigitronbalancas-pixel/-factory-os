import { useEffect, useState } from "react";
import api from "../services/api";

export default function Expedicao() {
  const [ops, setOps] = useState([]);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await api.get("/op");
      setOps(res.data.filter(op => op.setor_atual === "EXPEDICAO" || op.status === "FINALIZADA"));
    } catch (e) { console.error(e); }
  }

  async function finalizar(id) {
    try {
      await api.post(`/op/${id}/proximo-setor`);
      carregar();
    } catch (e) { alert("Erro ao finalizar"); }
  }

  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>📤 Expedição</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Aguardando Expedição", valor: ops.filter(o => o.setor_atual === "EXPEDICAO").length, cor: "#f59e0b" },
          { label: "Finalizadas", valor: ops.filter(o => o.status === "FINALIZADA").length, cor: "#22c55e" },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["OP", "Produto", "Qtd", "Prioridade", "Setor", "Status", "Ações"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {ops.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhuma OP em expedição</td></tr>
            ) : ops.map(op => (
              <tr key={op.id}>
                <td style={td}><strong>{op.numero_op}</strong></td>
                <td style={td}>{op.produto_id || "—"}</td>
                <td style={td}>{op.quantidade}</td>
                <td style={td}>{op.prioridade}</td>
                <td style={td}><span style={{ background: "#fef3c7", color: "#d97706", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>{op.setor_atual}</span></td>
                <td style={td}><span style={{ background: op.status === "FINALIZADA" ? "#dcfce7" : "#dbeafe", color: op.status === "FINALIZADA" ? "#16a34a" : "#2563eb", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>{op.status}</span></td>
                <td style={td}>
                  {op.setor_atual === "EXPEDICAO" && (
                    <button onClick={() => finalizar(op.id)} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>
                      ✅ Expedir
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