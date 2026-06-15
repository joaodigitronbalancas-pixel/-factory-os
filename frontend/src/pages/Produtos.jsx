import { useEffect, useState } from "react";
import { getProdutos } from "../services/api";

function Produtos() {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getProdutos().then(setProdutos);
  }, []);

  return (
    <>
      <h1>Produtos</h1>

      <table width="100%" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Produtos;