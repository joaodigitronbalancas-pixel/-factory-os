import { useEffect, useState } from "react";
import api from "../services/api";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ numero_pedido: "", cliente_id: "", valor_total: "", data_entrega: "", observacao: "" });

  useEffect(() => { carregar(); carregarClientes(); }, []);

  async function carregar() {
    try { const res = await api.get("/pedidos"); setPedidos(res.data); } catch (e) { console.error(e); }
  }
  async function carregarClientes() {
    try { const res = await api.get("/clientes"); setClientes(res.data); } catch (e) { console.error(e); }
  }
  async function salvar() {
    try {
      await api.post("/pedidos", form);
      setMostrarForm(false);
      setForm({ numero_pedido: "", cliente_id: "", valor_total: "", data_entrega: "", observacao: "" });
      carregar();
    } catch (e) { alert("Erro ao salvar pedido"); }
  }

  const COR = { ABERTO: "#3b82f6", APROVADO: "#f59e0b", PRODUCAO: "#8b5cf6", EXPEDIDO: "#10b981", CANCELADO: "#ef4444" };
  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🛒 Pedidos</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Novo Pedido"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Novo Pedido</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Número do Pedido</label>
              <input value={form.numero_pedido} onChange={e => setForm({ ...form, numero_pedido: e.target.value })}
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
              <label style={{ fontSize: 13, color: "#64748b" }}>Valor Total (R$)</label>
              <input type="number" value={form.valor_total} onChange={e => setForm({ ...form, valor_total: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Data de Entrega</label>
              <input type="date" value={form.data_entrega} onChange={e => setForm({ ...form, data_entrega: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ fontSize: 13, color: "#64748b" }}>Observação</label>
              <textarea value={form.observacao} onChange={e => setForm({ ...form, observacao: e.target.value })} rows={2}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={salvar} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>
            Salvar
          </button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Pedido", "Cliente", "Valor", "Entrega", "Status"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                  Nenhum pedido cadastrado
                </td>
              </tr>
            ) : pedidos.map(p => (
              <tr key={p.id}>
                <td style={td}><strong>{p.numero_pedido}</strong></td>
                <td style={td}>{p.cliente_id || "—"}</td>
                <td style={td}>R$ {Number(p.valor_total || 0).toFixed(2)}</td>
                <td style={td}>{p.data_entrega ? new Date(p.data_entrega).toLocaleDateString("pt-BR") : "—"}</td>
                <td style={td}>
                  <span style={{ background: COR[p.status] || "#e2e8f0", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {p.status || "ABERTO"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}