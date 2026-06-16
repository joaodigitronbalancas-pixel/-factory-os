import { useEffect, useState } from "react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ codigo: "", descricao: "", unidade: "UN", estoque_atual: 0, estoque_minimo: 0, preco_custo: 0, preco_venda: 0 });

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  }

  async function salvar() {
    try {
      await api.post("/produtos", form);
      setMostrarForm(false);
      setForm({ codigo: "", descricao: "", unidade: "UN", estoque_atual: 0, estoque_minimo: 0, preco_custo: 0, preco_venda: 0 });
      carregar();
    } catch (e) {
      alert("Erro ao salvar produto");
    }
  }

  const filtrados = produtos.filter(p =>
    p.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(busca.toLowerCase())
  );

  const estiloTh = { background: "#1e293b", color: "#fff", padding: "10px 12px", textAlign: "left" };
  const estiloTd = { padding: "10px 12px", borderBottom: "1px solid #e2e8f0" };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>📦 Produtos</h1>
        <button onClick={() => setMostrarForm(!mostrarForm)} style={{
          background: "#2563eb", color: "#fff", border: "none",
          borderRadius: 6, padding: "10px 20px", cursor: "pointer", fontWeight: "bold"
        }}>
          {mostrarForm ? "Cancelar" : "+ Novo Produto"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Novo Produto</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["codigo","Código"],["descricao","Descrição"],["unidade","Unidade"],["estoque_atual","Estoque Atual"],["estoque_minimo","Estoque Mínimo"],["preco_custo","Preço Custo"],["preco_venda","Preço Venda"]].map(([campo, label]) => (
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

      <input placeholder="Buscar por código ou descrição..." value={busca} onChange={e => setBusca(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 16, boxSizing: "border-box" }} />

      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Código","Descrição","Un","Estoque Atual","Estoque Mín.","Preço Custo","Preço Venda","Status"].map(h => (
                <th key={h} style={estiloTh}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Nenhum produto encontrado</td></tr>
            ) : filtrados.map(p => (
              <tr key={p.id} style={{ background: p.id % 2 === 0 ? "#f8fafc" : "#fff" }}>
                <td style={estiloTd}><code>{p.codigo}</code></td>
                <td style={estiloTd}><strong>{p.descricao}</strong></td>
                <td style={estiloTd}>{p.unidade}</td>
                <td style={{ ...estiloTd, color: p.estoque_atual <= p.estoque_minimo ? "#dc2626" : "#16a34a", fontWeight: "bold" }}>
                  {p.estoque_atual}
                </td>
                <td style={estiloTd}>{p.estoque_minimo}</td>
                <td style={estiloTd}>R$ {Number(p.preco_custo || 0).toFixed(2)}</td>
                <td style={estiloTd}>R$ {Number(p.preco_venda || 0).toFixed(2)}</td>
                <td style={estiloTd}>
                  <span style={{ background: p.estoque_atual <= p.estoque_minimo ? "#fee2e2" : "#dcfce7", color: p.estoque_atual <= p.estoque_minimo ? "#dc2626" : "#16a34a", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>
                    {p.estoque_atual <= p.estoque_minimo ? "⚠️ Baixo" : "✅ OK"}
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