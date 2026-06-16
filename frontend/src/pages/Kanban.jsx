import { useEffect, useState } from "react";
import api from "../services/api";

const COLUNAS = ["ABERTA","SEPARACAO","ELETRONICA","MONTAGEM","CALIBRACAO","QUALIDADE","EXPEDICAO","FINALIZADA"];
const COR = { ABERTA:"#3b82f6", SEPARACAO:"#f59e0b", ELETRONICA:"#8b5cf6", MONTAGEM:"#f97316", CALIBRACAO:"#06b6d4", QUALIDADE:"#84cc16", EXPEDICAO:"#10b981", FINALIZADA:"#6b7280" };

export default function Kanban() {
  const [ops, setOps] = useState([]);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await api.get("/op");
      setOps(res.data);
    } catch (e) { console.error(e); }
  }

  async function mover(opId, novoStatus) {
    try {
      await api.post(`/op/${opId}/proximo-setor`);
      carregar();
    } catch (e) { alert("Erro ao mover OP"); }
  }

  const porColuna = (status) => ops.filter(op => op.status === status);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>📌 Kanban de Produção</h1>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16 }}>
        {COLUNAS.map(col => (
          <div key={col} style={{ minWidth: 180, background: "#f1f5f9", borderRadius: 10, padding: 12, flex: "0 0 180px" }}>
            <div style={{ background: COR[col], color: "#fff", borderRadius: 6, padding: "6px 10px", marginBottom: 10, fontWeight: "bold", fontSize: 13, textAlign: "center" }}>
              {col}
              <span style={{ background: "rgba(255,255,255,0.3)", borderRadius: 20, padding: "1px 8px", marginLeft: 6, fontSize: 11 }}>
                {porColuna(col).length}
              </span>
            </div>
            {porColuna(col).length === 0 ? (
              <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, padding: "20px 0" }}>Vazio</div>
            ) : porColuna(col).map(op => (
              <div key={op.id} style={{ background: "#fff", borderRadius: 8, padding: 12, marginBottom: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.1)", borderLeft: `3px solid ${COR[col]}` }}>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: 13 }}>{op.numero_op}</p>
                <p style={{ margin: "4px 0 8px", fontSize: 11, color: "#64748b" }}>Qtd: {op.quantidade}</p>
                {col !== "FINALIZADA" && (
                  <button onClick={() => mover(op.id, col)} style={{ width: "100%", background: COR[col], color: "#fff", border: "none", borderRadius: 5, padding: "5px 0", cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>
                    ▶ Avançar
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}