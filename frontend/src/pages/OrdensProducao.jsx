import { useEffect, useState } from "react";
import api from "../services/api";

const FLUXO = ["ABERTA","SEPARACAO","ELETRONICA","MONTAGEM","CALIBRACAO","QUALIDADE","EXPEDICAO","FINALIZADA"];
const COR_STATUS = { ABERTA: "#3b82f6", SEPARACAO: "#f59e0b", ELETRONICA: "#8b5cf6", MONTAGEM: "#f97316", CALIBRACAO: "#06b6d4", QUALIDADE: "#84cc16", EXPEDICAO: "#10b981", FINALIZADA: "#6b7280" };

export default function OrdensProducao() {
  const [ops, setOps] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ numero_op: "", produto_id: "", quantidade: "", prioridade: "NORMAL", data_previsao: "", observacao: "" });

  useEffect(() => { carregar(); carregarProdutos(); }, []);

  async function carregar() {
    try {
      const res = await api.get("/op");
      setOps(res.data);
    } catch (e) { console.error(e); }
  }

  async function carregarProdutos() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch (e) { console.error(e); }
  }

  async function salvar() {
    try {
      await api.post("/op", form);
      setMostrarForm(false);
      setForm({ numero_op: "", produto_id: "", quantidade: "", prioridade: "NORMAL", data_previsao: "", observacao: "" });
      carregar();
    } catch (e) { alert("Erro ao criar OP"); }
  }

  async function avancar(id) {
    try {
      await api.post(`/op/${id}/proximo-setor`);
      carregar();
    } catch (e) { alert("Erro ao avançar setor"); }
  }

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🏭 Ordens de Produção</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold"
        }}>
          {mostrarForm ? "Cancelar" : "+ Nova OP"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Nova Ordem de Produção</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Número OP</label>
              <input value={form.numero_op} onChange={e => setForm({...form, numero_op: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Produto</label>
              <select value={form.produto_id} onChange={e => setForm({...form, produto_id: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="">Selecione...</option>
                {produtos.map(p => <option key={p.id} value={p.id}>{p.codigo} — {p.descricao}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Quantidade</label>
              <input type="number" value={form.quantidade} onChange={e => setForm({...form, quantidade: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Prioridade</label>
              <select value={form.prioridade} onChange={e => setForm({...form, prioridade: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="BAIXA">Baixa</option>
                <option value="NORMAL">Normal</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Data Previsão</label>
              <input type="date" value={form.data_previsao} onChange={e => setForm({...form, data_previsao: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={salvar} style={{
            marginTop: 16, background: "#16a34a", color: "#fff", border: "none",
            borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold"
          }}>Criar OP</button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["OP","Produto","Qtd","Prioridade","Status / Fluxo","Ações"].map(h => (
                <th key={h} style={estiloTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ops.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhuma OP cadastrada</td></tr>
            ) : ops.map(op => (
              <tr key={op.id}>
                <td style={estiloTd}><strong>{op.numero_op}</strong></td>
                <td style={estiloTd}>{op.produto_id}</td>
                <td style={estiloTd}>{op.quantidade}</td>
                <td style={estiloTd}>
                  <span style={{ background: op.prioridade === "URGENTE" ? "#fee2e2" : op.prioridade === "ALTA" ? "#fef3c7" : "#f0fdf4", color: op.prioridade === "URGENTE" ? "#dc2626" : op.prioridade === "ALTA" ? "#d97706" : "#16a34a", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {op.prioridade || "NORMAL"}
                  </span>
                </td>
                <td style={estiloTd}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {FLUXO.map(s => (
                      <span key={s} style={{
                        padding: "3px 8px", borderRadius: 4, fontSize: 11,
                        background: op.status === s ? (COR_STATUS[s] || "#3b82f6") : "#e2e8f0",
                        color: op.status === s ? "#fff" : "#64748b",
                        fontWeight: op.status === s ? "bold" : "normal"
                      }}>{s}</span>
                    ))}
                  </div>
                </td>
                <td style={estiloTd}>
                  {op.status !== "FINALIZADA" && (
                    <button onClick={() => avancar(op.id)} style={{
                      background: "#2563eb", color: "#fff", border: "none",
                      borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13
                    }}>▶ Avançar</button>
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