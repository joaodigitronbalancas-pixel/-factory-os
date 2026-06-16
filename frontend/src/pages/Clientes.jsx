import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({ razao_social: "", cnpj: "", telefone: "", email: "", cidade: "", uf: "" });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  }

  async function salvar() {
    try {
      await api.post("/clientes", form);
      setForm({ razao_social: "", cnpj: "", telefone: "", email: "", cidade: "", uf: "" });
      setMostrarForm(false);
      carregar();
    } catch (e) {
      alert("Erro ao salvar cliente");
    }
  }

  const filtrados = clientes.filter(c =>
    c.razao_social?.toLowerCase().includes(busca.toLowerCase()) ||
    c.cnpj?.includes(busca)
  );

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>👥 Clientes</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold"
        }}>
          {mostrarForm ? "Cancelar" : "+ Novo Cliente"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Novo Cliente</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["razao_social","Razão Social"],["cnpj","CNPJ"],["telefone","Telefone"],["email","Email"],["cidade","Cidade"],["uf","UF"]].map(([campo, label]) => (
              <div key={campo}>
                <label style={{ fontSize: 13, color: "#64748b" }}>{label}</label>
                <input value={form[campo]} onChange={e => setForm({...form, [campo]: e.target.value})}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <button onClick={salvar} style={{
            marginTop: 16, background: "#16a34a", color: "#fff", border: "none",
            borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontWeight: "bold"
          }}>Salvar</button>
        </div>
      )}

      <input placeholder="Buscar por nome ou CNPJ..." value={busca} onChange={e => setBusca(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 16, boxSizing: "border-box" }} />

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID","Razão Social","CNPJ","Telefone","Email","Cidade/UF","Status"].map(h => (
                <th key={h} style={estiloTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Carregando...</td></tr>
            ) : filtrados.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum cliente encontrado</td></tr>
            ) : filtrados.map(c => (
              <tr key={c.id} style={{ background: c.id % 2 === 0 ? "#f8fafc" : "#fff" }}>
                <td style={estiloTd}>{c.id}</td>
                <td style={estiloTd}><strong>{c.razao_social}</strong></td>
                <td style={estiloTd}>{c.cnpj || "—"}</td>
                <td style={estiloTd}>{c.telefone || "—"}</td>
                <td style={estiloTd}>{c.email || "—"}</td>
                <td style={estiloTd}>{c.cidade && c.uf ? `${c.cidade}/${c.uf}` : "—"}</td>
                <td style={estiloTd}>
                  <span style={{ background: c.ativo ? "#dcfce7" : "#fee2e2", color: c.ativo ? "#16a34a" : "#dc2626", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>
                    {c.ativo ? "Ativo" : "Inativo"}
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