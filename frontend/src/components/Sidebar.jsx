import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const linkStyle = {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "block",
    padding: "6px 0",
    fontSize: "14px",
  };

  return (
    <div style={{
      width: 220,
      background: "#1E293B",
      color: "#fff",
      height: "100vh",
      padding: 20,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}>
      <h2 style={{ color: "#38bdf8", marginBottom: 4 }}>Factory OS</h2>
      {user?.nome && (
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
          {user.nome} — {user.perfil}
        </p>
      )}
      <hr style={{ borderColor: "#334155", marginBottom: 8 }} />

      <Link to="/" style={linkStyle}>📊 Dashboard</Link>
      <Link to="/clientes" style={linkStyle}>👥 Clientes</Link>
      <Link to="/produtos" style={linkStyle}>📦 Produtos</Link>
      <Link to="/ordens" style={linkStyle}>🏭 Ordens de Produção</Link>
      <Link to="/estoque" style={linkStyle}>🗄️ Estoque</Link>
      <Link to="/fornecedores" style={linkStyle}>🚚 Fornecedores</Link>
      <Link to="/pedidos" style={linkStyle}>🛒 Pedidos</Link>
      <Link to="/producao" style={linkStyle}>⚙️ Produção</Link>
      <Link to="/qualidade" style={linkStyle}>✅ Qualidade</Link>
      <Link to="/expedicao" style={linkStyle}>📤 Expedição</Link>
      <Link to="/rastreabilidade" style={linkStyle}>🔍 Rastreabilidade</Link>
      <Link to="/assistencia" style={linkStyle}>🔧 Assistência</Link>
      <Link to="/auditoria" style={linkStyle}>📋 Auditoria</Link>
      <Link to="/numeros-serie" style={linkStyle}>🔢 Números de Série</Link>
      <Link to="/kanban" style={linkStyle}>📌 Kanban</Link>
      <Link to="/relatorios" style={linkStyle}>📈 Relatórios</Link>
      <Link to="/setores" style={linkStyle}>🏢 Setores</Link>

      {user?.perfil === "ADMIN" && (
        <Link to="/usuarios" style={linkStyle}>👤 Usuários</Link>
      )}

      <hr style={{ borderColor: "#334155", margin: "12px 0" }} />
      <button onClick={sair} style={{
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: 13,
      }}>
        🚪 Sair
      </button>
    </div>
  );
}

export default Sidebar;