import { useEffect, useState } from "react";
import api from "../services/api";

export default function Assistencia() {
  const [chamados, setChamados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ numero_chamado: "", cliente_id: "", numero_serie: "", descricao: "", prioridade: "NORMAL" });

  useEffect(() => { carregar(); carregarClientes(); }, []);

  async function carregar() {
    try { const res = await api.get("/assistencia"); setChamados(res.data); } catch (e) { setChamados([]); }
  }
  async function carregarClientes() {
    try { const res = await api.get("/clientes"); setClientes(res.data); } catch (e) { console.error(e); }
  }
  async function salvar() {
    try {
      await api.post("/assistencia", form);
      setMostrarForm(false);
      setForm({ numero_chamado: "", cliente_id: "", numero_serie: "", descricao: "", prioridade: "NORMAL" });
      carregar();
    } catch (e) { alert("Erro ao abrir chamado"); }
  }

  const COR = { ABERTO: "#3b82f6", EM_ANDAMENTO: "#f59e0b", FECHADO: "#22c55e", CANCELADO: "#ef4444" };
  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };
  const abertos = chamados.filter(c => c.status === "ABERTO").length;
  const andamento = chamados.filter(c => c.status === "EM_ANDAMENTO").length;
  const fechados = chamados.filter(c => c.status === "FECHADO").length;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🔧 Assistência Técnica</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Novo Chamado"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[{ label: "Abertos", valor: abertos, cor: "#3b82f6" }, { label: "Em Andamento", valor: andamento, cor: "#f59e0b" }, { label: "Fechados", valor: fechados, cor: "#22c55e" }].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Novo Chamado</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Número do Chamado</label>
              <input value={form.numero_chamado} onChange={e => setForm({ ...form, numero_chamado: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Cliente</label>
              <select value={form.cliente_id} onChange={e => setForm({ ...form, cliente_id: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="">Selecione...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.razao_social}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Número de Série</label>
              <input value={form.numero_serie} onChange={e => setForm({ ...form, numero_serie: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Prioridade</label>
              <select value={form.prioridade} onChange={e => setForm({ ...form, prioridade: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="BAIXA">Baixa</option>
                <option value="NORMAL">Normal</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ fontSize: 13, color: "#64748b" }}>Descrição do Problema</label>
              <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={3}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={salvar} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>
            Abrir Chamado
          </button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Chamado", "Cliente", "Nº Série", "Prioridade", "Status", "Data"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {chamados.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum chamado registrado</td></tr>
            ) : chamados.map(c => (
              <tr key={c.id}>
                <td style={td}><strong>{c.numero_chamado}</strong></td>
                <td style={td}>{c.cliente_id || "—"}</td>
                <td style={td}><code>{c.numero_serie || "—"}</code></td>
                <td style={td}>
                  <span style={{ background: c.prioridade === "URGENTE" ? "#fee2e2" : c.prioridade === "ALTA" ? "#fef3c7" : "#f0fdf4", color: c.prioridade === "URGENTE" ? "#dc2626" : c.prioridade === "ALTA" ? "#d97706" : "#16a34a", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {c.prioridade}
                  </span>
                </td>
                <td style={td}>
                  <span style={{ background: COR[c.status] || "#e2e8f0", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {c.status}
                  </span>
                </td>
                <td style={td}>{c.criado_em ? new Date(c.criado_em).toLocaleDateString("pt-BR") : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}