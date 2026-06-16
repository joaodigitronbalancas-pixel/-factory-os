import { useEffect, useState } from "react";
import api from "../services/api";

const PERFIS = ["ADMIN","PRODUCAO","QUALIDADE","COMERCIAL","ASSISTENCIA","EXPEDICAO"];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", perfil: "COMERCIAL" });

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try { const res = await api.get("/usuarios"); setUsuarios(res.data); } catch (e) { console.error(e); }
  }

  async function salvar() {
    try {
      await api.post("/usuarios", form);
      setMostrarForm(false);
      setForm({ nome: "", email: "", senha: "", perfil: "COMERCIAL" });
      carregar();
    } catch (e) { alert("Erro ao salvar usuário"); }
  }

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };
  const COR_PERFIL = { ADMIN: "#7c3aed", PRODUCAO: "#f97316", QUALIDADE: "#84cc16", COMERCIAL: "#3b82f6", ASSISTENCIA: "#f59e0b", EXPEDICAO: "#10b981" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>👤 Usuários</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Novo Usuário"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Novo Usuário</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["nome","Nome"],["email","Email"],["senha","Senha"]].map(([campo, label]) => (
              <div key={campo}>
                <label style={{ fontSize: 13, color: "#64748b" }}>{label}</label>
                <input type={campo === "senha" ? "password" : "text"} value={form[campo]} onChange={e => setForm({...form, [campo]: e.target.value})}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 13, color: "#64748b" }}>Perfil</label>
              <select value={form.perfil} onChange={e => setForm({...form, perfil: e.target.value})}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }}>
                {PERFIS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={salvar} style={{ marginTop: 16, background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>Salvar</button>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Nome","Email","Perfil","Status"].map(h => <th key={h} style={estiloTh}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum usuário encontrado</td></tr>
            ) : usuarios.map(u => (
              <tr key={u.id}>
                <td style={estiloTd}><strong>{u.nome}</strong></td>
                <td style={estiloTd}>{u.email}</td>
                <td style={estiloTd}>
                  <span style={{ background: COR_PERFIL[u.perfil] || "#64748b", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>
                    {u.perfil}
                  </span>
                </td>
                <td style={estiloTd}>
                  <span style={{ background: u.ativo ? "#dcfce7" : "#fee2e2", color: u.ativo ? "#16a34a" : "#dc2626", padding: "3px 12px", borderRadius: 20, fontSize: 12 }}>
                    {u.ativo ? "Ativo" : "Inativo"}
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