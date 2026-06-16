import { useEffect, useState } from "react";
import api from "../services/api";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [busca, setBusca] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ razao_social: "", cnpj: "", telefone: "", email: "", cidade: "", uf: "" });

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const res = await api.get("/fornecedores");
    setFornecedores(res.data);
  }

  async function salvar() {
    try {
      await api.post("/fornecedores", form);
      setMostrarForm(false);
      setForm({ razao_social: "", cnpj: "", telefone: "", email: "", cidade: "", uf: "" });
      carregar();
    } catch (e) { alert("Erro ao salvar fornecedor"); }
  }

  const filtrados = fornecedores.filter(f =>
    f.razao_social?.toLowerCase().includes(busca.toLowerCase()) || f.cnpj?.includes(busca)
  );

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🚚 Fornecedores</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold"
        }}>
          {mostrarForm ? "Cancelar" : "+ Novo Fornecedor"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Novo Fornecedor</h3>
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

      <input placeholder="Buscar fornecedor..." value={busca} onChange={e => setBusca(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 16, boxSizing: "border-box" }} />

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID","Razão Social","CNPJ","Telefone","Email","Cidade/UF"].map(h => (
                <th key={h} style={estiloTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum fornecedor cadastrado</td></tr>
            ) : filtrados.map(f => (
              <tr key={f.id}>
                <td style={estiloTd}>{f.id}</td>
                <td style={estiloTd}><strong>{f.razao_social}</strong></td>
                <td style={estiloTd}>{f.cnpj || "—"}</td>
                <td style={estiloTd}>{f.telefone || "—"}</td>
                <td style={estiloTd}>{f.email || "—"}</td>
                <td style={estiloTd}>{f.cidade && f.uf ? `${f.cidade}/${f.uf}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}