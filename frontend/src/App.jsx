import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import OrdensProducao from "./pages/OrdensProducao";
import Estoque from "./pages/Estoque";
import Fornecedores from "./pages/Fornecedores";
import Pedidos from "./pages/Pedidos";
import Producao from "./pages/Producao";
import Qualidade from "./pages/Qualidade";
import Expedicao from "./pages/Expedicao";
import Rastreabilidade from "./pages/Rastreabilidade";
import Assistencia from "./pages/Assistencia";
import Auditoria from "./pages/Auditoria";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Kanban from "./pages/Kanban";
import Relatorios from "./pages/Relatorios";
import Setores from "./pages/Setores";
import NumerosSerie from "./pages/NumerosSerie";
import OrdemDetalhe from "./pages/OrdemDetalhe";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", background: "#f4f6f9", overflowY: "auto" }}>
        <Header />
        {children}
      </div>
    </div>
  );
}

function RotaProtegida({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
        <Route path="/clientes" element={<RotaProtegida><Clientes /></RotaProtegida>} />
        <Route path="/produtos" element={<RotaProtegida><Produtos /></RotaProtegida>} />
        <Route path="/ordens" element={<RotaProtegida><OrdensProducao /></RotaProtegida>} />
        <Route path="/ordens/:id" element={<RotaProtegida><OrdemDetalhe /></RotaProtegida>} />
        <Route path="/estoque" element={<RotaProtegida><Estoque /></RotaProtegida>} />
        <Route path="/fornecedores" element={<RotaProtegida><Fornecedores /></RotaProtegida>} />
        <Route path="/pedidos" element={<RotaProtegida><Pedidos /></RotaProtegida>} />
        <Route path="/producao" element={<RotaProtegida><Producao /></RotaProtegida>} />
        <Route path="/qualidade" element={<RotaProtegida><Qualidade /></RotaProtegida>} />
        <Route path="/expedicao" element={<RotaProtegida><Expedicao /></RotaProtegida>} />
        <Route path="/rastreabilidade" element={<RotaProtegida><Rastreabilidade /></RotaProtegida>} />
        <Route path="/assistencia" element={<RotaProtegida><Assistencia /></RotaProtegida>} />
        <Route path="/auditoria" element={<RotaProtegida><Auditoria /></RotaProtegida>} />
        <Route path="/usuarios" element={<RotaProtegida><Usuarios /></RotaProtegida>} />
        <Route path="/kanban" element={<RotaProtegida><Kanban /></RotaProtegida>} />
        <Route path="/relatorios" element={<RotaProtegida><Relatorios /></RotaProtegida>} />
        <Route path="/setores" element={<RotaProtegida><Setores /></RotaProtegida>} />
        <Route path="/numeros-serie" element={<RotaProtegida><NumerosSerie /></RotaProtegida>} />
        <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;