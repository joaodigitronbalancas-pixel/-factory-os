import { useEffect, useState } from "react";

function Setores() {

  const [dados, setDados] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/setores")
      .then(res => res.json())
      .then(setDados);

  }, []);

  return (
    <>
      <h1>Setores</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Setores;