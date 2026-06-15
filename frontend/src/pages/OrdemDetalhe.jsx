import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function OrdemDetalhe() {
  const { id } = useParams();

  const [op, setOp] = useState({});
  const [apontamentos, setApontamentos] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const opRes = await api.get("/op");
    const apRes = await api.get("/apontamentos");

    setOp(opRes.data.find(o => o.id == id));
    setApontamentos(apRes.data.filter(a => a.op_id == id));
  };

  return (
    <div>
      <h1>OP {op.numero_op}</h1>

      <h2>Status: {op.status}</h2>

      <h3>Histórico</h3>

      {apontamentos.map(a => (
        <div key={a.id}>
          {a.setor} - {a.status}
        </div>
      ))}
    </div>
  );
}
