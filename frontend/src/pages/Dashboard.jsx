import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [dados, setDados] = useState({
    ops_abertas: 0,
    em_producao: 0,
    ops_finalizadas: 0
  });

  const [grafico, setGrafico] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await api.get("/dashboard/industrial");

      setDados(res.data);

      setGrafico([
        {
          name: "Abertas",
          valor: res.data.ops_abertas || 0
        },
        {
          name: "Produção",
          valor: res.data.em_producao || 0
        },
        {
          name: "Finalizadas",
          valor: res.data.ops_finalizadas || 0
        }
      ]);
    } catch (erro) {
      console.error("Erro ao carregar dashboard:", erro);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Industrial</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>OPs Abertas</h3>
          <h2>{dados.ops_abertas}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>Em Produção</h3>
          <h2>{dados.em_producao}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>Finalizadas</h3>
          <h2>{dados.ops_finalizadas}</h2>
        </div>
      </div>

      <div
          style={{
            width: "800px",
            height: "400px",
            background: "#fff",
            border: "1px solid #ccc"
         }}
>
           <BarChart
           width={700}
           height={300}
          data={grafico} 
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
          dataKey="valor"
          fill="#1976d2"
       />
      </BarChart>
     </div>
    </div>
  );
}