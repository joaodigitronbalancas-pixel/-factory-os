import { useEffect, useState } from "react";

function NumerosSerie() {

  const [dados, setDados] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/numero-serie")
      .then(res => res.json())
      .then(setDados);

  }, []);

  return (
    <>
      <h1>Números de Série</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Série</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.numero_serie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default NumerosSerie;