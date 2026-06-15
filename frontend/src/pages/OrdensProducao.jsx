import { useEffect, useState } from "react";
import api from "../services/api";

function OrdensProducao() {

  const fluxo = [
    "SEPARACAO",
    "ELETRONICA",
    "MONTAGEM",
    "CALIBRACAO",
    "QUALIDADE",
    "EXPEDICAO",
    "FINALIZADA"
  ];

  const [ops, setOps] = useState([]);

  useEffect(() => {
    carregarOrdens();
  }, []);

  const carregarOrdens = async () => {
    try {
      const response = await api.get("/op");
      setOps(response.data);
    } catch (error) {
      console.error("Erro ao carregar OPs:", error);
    }
  };

  const avancarSetor = async (id) => {
    try {
      await api.post(`/op/${id}/proximo-setor`);
      carregarOrdens();
    } catch (error) {
      console.error("Erro ao avançar setor:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ordens de Produção</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>OP</th>
            <th>Status</th>
            <th>Setor Atual</th>
            <th>Fluxo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {ops.map((op) => (
            <tr key={op.id}>
              <td>{op.id}</td>

              <td>{op.numero_op}</td>

              <td>{op.status}</td>

              <td>{op.setor_atual}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap"
                  }}
                >
                  {fluxo.map((setor) => (
                    <span
                      key={setor}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "5px",
                        background:
                          setor === op.setor_atual
                            ? "#28a745"
                            : "#dcdcdc",
                        color:
                          setor === op.setor_atual
                            ? "#fff"
                            : "#000",
                        fontSize: "12px"
                      }}
                    >
                      {setor}
                    </span>
                  ))}
                </div>
              </td>

              <td>
                <button
                  onClick={() => avancarSetor(op.id)}
                >
                  Avançar Setor
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default OrdensProducao;