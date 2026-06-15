import { Link } from "react-router-dom";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{
      width: 220,
      background: "#1E293B",
      color: "#fff",
      height: "100vh",
      padding: 20
    }}>

      <h2>Factory OS</h2>

      <hr />

      <p><Link to="/">Dashboard</Link></p>

      {/* PERFIL */}
      <p><Link to="/clientes">Clientes</Link></p>

      <p><Link to="/produtos">Produtos</Link></p>

      <p><Link to="/ordens">Ordens Produção</Link></p>

      <p><Link to="/estoque">Estoque</Link></p>

      <p><Link to="/fornecedores">Fornecedores</Link></p>

      <p><Link to="/pedidos">Pedidos</Link></p>

      <p><Link to="/producao">Produção</Link></p>

      <p><Link to="/qualidade">Qualidade</Link></p>

      <p><Link to="/expedicao">Expedição</Link></p>

      <p><Link to="/rastreabilidade">Rastreabilidade</Link></p>

      <p><Link to="/assistencia">Assistência</Link></p>

      <p><Link to="/auditoria">Auditoria</Link></p>

      <p><Link to="/assistencia">Assistência</Link></p>

      <p><Link to="/rastreabilidade">Rastreabilidade</Link></p>

      {/* CONTROLE DE PERFIL */}
      {user?.perfil === "ADMIN" && (
        <p><Link to="/usuarios">Usuários</Link></p>
      )}

      {user?.perfil === "PRODUCAO" && (
        <p><Link to="/producao">Produção</Link></p>
      )}

    </div>
  );
}

export default Sidebar;
