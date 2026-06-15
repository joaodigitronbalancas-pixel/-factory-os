import { useEffect, useState } from "react";
import { getClientes } from "../services/api";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes().then(setClientes);
  }, []);

  return (
    <>
      <h1>Clientes</h1>

      <table width="100%" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Clientes;