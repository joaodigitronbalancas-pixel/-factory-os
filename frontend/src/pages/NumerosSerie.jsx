import { useEffect, useState } from "react";
import api from "../services/api";

export default function NumerosSerie() {
  const [series, setSeries] = useState([]);
  const [ops, setOps] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ numero_serie: "", produto_id: "", op_id: "" });
  const [busca, setBusca] = useState("");

  useEffect(() => { carregar(); carregarOPs(); carregarProdutos(); }, []);

  async function carregar() {
    try { const res = await api.get("/numero-serie"); setSeries(res.data); } catch (e) { setSeries([]); }
  }
  async function carregarOPs() {
    try { const res = await api.get("/op"); setOps(res.data); } catch (e) { console.error(e); }
  }
  async function carregarProdutos() {
    try { const res = await api.get("/produtos"); setProdutos(res.data); } catch (e) { console.error(e); }
  }
  async function salvar() {
    try {
      await api.post("/numero-serie", form);
      setMostrarForm(false);
      setForm({ numero_serie: "", produto_id: "", op_id: "" });
      carregar();
    } catch (e) { alert("Erro ao cadastrar número de série"); }
  }

  const filtrados = series.filter(s => s.numero_serie?.toLowerCase().includes(busca.toLowerCase()));
  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };
  const COR = { PRODUCAO: "#3b82f6", EXPEDICAO: "#f59e0b", ENTREGUE: "#22c55e", ASSISTENCIA: "#ef4444" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🔢 Números de Série</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Novo Número de Série"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Novo Número de Série</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Número de Série</label>
              <input value={form.numero_serie} onChange={e => setForm({ ...form, numero_serie: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Produto</label>
              <select value={form.produto_id} onChange={e => setForm({ ...form, produto_id: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="">Selecione...</option>
                {produtos.map(p => <option key={p.id} value={p.id}>{p.codigo} — {p.descricao}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Ordem de Produção</label>
              <select value={form.op_id} onChange={e => setForm({ ...form, op_id: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="">Selecione...</option>
                {ops.map(op => <option key={op.id} value={op.id}>{op.numero_op}</option>)}
              </select>
            </div>
          </div>
          <button onClick={salvar} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>Salvar</button>
        </div>
      )}

      <input placeholder="Buscar número de série..." value={busca} onChange={e => setBusca(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 16, boxSizing: "border-box" }} />

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Número de Série", "Produto", "OP", "Status", "Criado em"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum número de série cadastrado</td></tr>
            ) : filtrados.map(s => (
              <tr key={s.id}>
                <td style={td}><code style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>{s.numero_serie}</code></td>
                <td style={td}>{s.produto_id || "—"}</td>
                <td style={td}>{s.op_id || "—"}</td>
                <td style={td}>
                  <span style={{ background: COR[s.status] || "#e2e8f0", color: COR[s.status] ? "#fff" : "#64748b", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {s.status}
                  </span>
                </td>
                <td style={td}>{s.criado_em ? new Date(s.criado_em).toLocaleDateString("pt-BR") : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}