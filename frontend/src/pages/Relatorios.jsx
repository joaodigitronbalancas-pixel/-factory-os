import { useEffect, useState } from "react";
import api from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Relatorios() {
  const [dados, setDados] = useState({ clientes: 0, produtos: 0, ops: 0, fornecedores: 0 });
  const [ops, setOps] = useState([]);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const [dash, opsRes] = await Promise.all([api.get("/dashboard/resumo"), api.get("/op")]);
      setDados(dash.data);
      setOps(opsRes.data);
    } catch (e) { console.error(e); }
  }

  const statusCount = ["ABERTA", "EM_PRODUCAO", "FINALIZADA", "BLOQUEADO"].map(s => ({
    name: s, valor: ops.filter(o => o.status === s).length
  }));
  const setorCount = ["SEPARACAO","ELETRONICA","MONTAGEM","CALIBRACAO","QUALIDADE","EXPEDICAO"].map(s => ({
    name: s, valor: ops.filter(o => o.setor_atual === s).length
  }));
  const CORES = ["#3b82f6","#22c55e","#f59e0b","#ef4444","#8b5cf6","#06b6d4"];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>📈 Relatórios</h1>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Clientes", valor: dados.clientes, cor: "#3b82f6" },
          { label: "Produtos", valor: dados.produtos, cor: "#22c55e" },
          { label: "OPs Total", valor: dados.ops, cor: "#f59e0b" },
          { label: "Fornecedores", valor: dados.fornecedores || 0, cor: "#8b5cf6" },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", padding: 20, borderRadius: 10, flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${card.cor}` }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: 13 }}>{card.label}</p>
            <h2 style={{ color: card.cor, margin: "4px 0 0" }}>{card.valor}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>OPs por Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusCount}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>OPs por Setor</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={setorCount} dataKey="valor" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {setorCount.map((_, i) => <Cell key={i} fill={CORES[i % CORES.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}