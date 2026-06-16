import { useEffect, useState } from "react";
import api from "../services/api";

export default function Setores() {
  const [setores, setSetores] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nome: "", descricao: "" });

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { const res = await api.get("/setores"); setSetores(res.data); } catch (e) { setSetores([]); }
  }
  async function salvar() {
    try {
      await api.post("/setores", form);
      setMostrarForm(false);
      setForm({ nome: "", descricao: "" });
      carregar();
    } catch (e) { alert("Erro ao salvar setor"); }
  }

  const th = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const td = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🏢 Setores</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Novo Setor"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Novo Setor</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Nome</label>
              <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Descrição</label>
              <input value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={salvar} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>Salvar</button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["ID", "Nome", "Descrição", "Status"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {setores.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum setor cadastrado</td></tr>
            ) : setores.map(s => (
              <tr key={s.id}>
                <td style={td}>{s.id}</td>
                <td style={td}><strong>{s.nome}</strong></td>
                <td style={td}>{s.descricao || "—"}</td>
                <td style={td}>
                  <span style={{ background: s.ativo ? "#dcfce7" : "#fee2e2", color: s.ativo ? "#16a34a" : "#dc2626", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>
                    {s.ativo ? "Ativo" : "Inativo"}
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