import { useEffect, useState } from "react";
import api from "../services/api";

export default function Qualidade() {
  const [inspecoes, setInspecoes] = useState([]);
  const [ops, setOps] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ op_id: "", resultado: "APROVADO", observacao: "", inspetor: "" });

  useEffect(() => { carregar(); carregarOPs(); }, []);

  async function carregar() {
    try { const res = await api.get("/qualidade"); setInspecoes(res.data); } catch (e) { setInspecoes([]); }
  }
  async function carregarOPs() {
    try { const res = await api.get("/op"); setOps(res.data); } catch (e) { console.error(e); }
  }
  async function salvar() {
    try {
      await api.post("/qualidade", form);
      setMostrarForm(false);
      setForm({ op_id: "", resultado: "APROVADO", observacao: "", inspetor: "" });
      carregar();
    } catch (e) { alert("Erro ao salvar inspeção"); }
  }

  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };
  const aprovadas = inspecoes.filter(i => i.resultado === "APROVADO").length;
  const reprovadas = inspecoes.filter(i => i.resultado === "REPROVADO").length;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>✅ Qualidade</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Nova Inspeção"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Inspeções", valor: inspecoes.length, cor: "#3b82f6" },
          { label: "Aprovadas", valor: aprovadas, cor: "#22c55e" },
          { label: "Reprovadas", valor: reprovadas, cor: "#ef4444" },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Nova Inspeção</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Ordem de Produção</label>
              <select value={form.op_id} onChange={e => setForm({ ...form, op_id: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="">Selecione...</option>
                {ops.map(op => <option key={op.id} value={op.id}>{op.numero_op}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Inspetor</label>
              <input value={form.inspetor} onChange={e => setForm({ ...form, inspetor: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Resultado</label>
              <select value={form.resultado} onChange={e => setForm({ ...form, resultado: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                <option value="APROVADO">Aprovado</option>
                <option value="REPROVADO">Reprovado</option>
                <option value="CONDICIONAL">Condicional</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Observação</label>
              <input value={form.observacao} onChange={e => setForm({ ...form, observacao: e.target.value })}
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
            <tr>{["ID", "OP", "Inspetor", "Resultado", "Observação", "Data"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {inspecoes.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                  Nenhuma inspeção registrada
                </td>
              </tr>
            ) : inspecoes.map(i => (
              <tr key={i.id}>
                <td style={td}>{i.id}</td>
                <td style={td}>{i.op_id}</td>
                <td style={td}>{i.inspetor || "—"}</td>
                <td style={td}>
                  <span style={{
                    background: i.resultado === "APROVADO" ? "#dcfce7" : i.resultado === "REPROVADO" ? "#fee2e2" : "#fef3c7",
                    color: i.resultado === "APROVADO" ? "#16a34a" : i.resultado === "REPROVADO" ? "#dc2626" : "#d97706",
                    padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold"
                  }}>
                    {i.resultado}
                  </span>
                </td>
                <td style={td}>{i.observacao || "—"}</td>
                <td style={td}>{i.criado_em ? new Date(i.criado_em).toLocaleDateString("pt-BR") : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}