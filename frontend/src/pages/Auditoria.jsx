import { useEffect, useState } from "react";
import api from "../services/api";

export default function Auditoria() {
  const [logs, setLogs] = useState([]);
  const [filtroTabela, setFiltroTabela] = useState("");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { const res = await api.get("/auditoria"); setLogs(res.data); } catch (e) { setLogs([]); }
  }

  const filtrados = logs.filter(l => !filtroTabela || l.tabela === filtroTabela);
  const tabelas = [...new Set(logs.map(l => l.tabela).filter(Boolean))];
  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };
  const COR = { INSERT: "#dcfce7", UPDATE: "#fef3c7", DELETE: "#fee2e2" };
  const COR_TEXT = { INSERT: "#16a34a", UPDATE: "#d97706", DELETE: "#dc2626" };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>📋 Auditoria</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={filtroTabela} onChange={e => setFiltroTabela(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <option value="">Todas as tabelas</option>
          {tabelas.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={carregar} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>
          🔄 Atualizar
        </button>
      </div>
      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Data/Hora", "Usuário", "Tabela", "Operação", "Detalhes"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum registro de auditoria</td></tr>
            ) : filtrados.map((l, i) => (
              <tr key={i}>
                <td style={td}>{l.criado_em ? new Date(l.criado_em).toLocaleString("pt-BR") : "—"}</td>
                <td style={td}>{l.usuario || "sistema"}</td>
                <td style={td}><code>{l.tabela}</code></td>
                <td style={td}>
                  <span style={{ background: COR[l.operacao] || "#e2e8f0", color: COR_TEXT[l.operacao] || "#64748b", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {l.operacao}
                  </span>
                </td>
                <td style={td} title={l.detalhes}>{String(l.detalhes || "").substring(0, 60)}{l.detalhes?.length > 60 ? "..." : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}