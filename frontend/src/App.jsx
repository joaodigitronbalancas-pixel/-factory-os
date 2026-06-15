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

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <div
        style={{
          display: "flex",
          height: "100vh"
        }}
      >

        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#f4f6f9"
          }}
        >

          <Header />

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/clientes"
              element={<Clientes />}
            />

            <Route
              path="/produtos"
              element={<Produtos />}
            />

            <Route
              path="/ordens"
              element={<OrdensProducao />}
            />

            <Route
              path="/estoque"
              element={<Estoque />}
            />

            <Route 
            path="/fornecedores" 
            element={<Fornecedores />} 
            />
            
            <Route 
            path="/pedidos" 
            element={<Pedidos />} 
            />
            
            <Route 
            path="/producao" 
            element={<Producao />} 
            />
            
            <Route 
            path="/qualidade" 
            element={<Qualidade />} 
            />
            
            <Route 
            path="/expedicao" 
            element={<Expedicao />} 
            />
            
            <Route 
            path="/rastreabilidade" 
            element={<Rastreabilidade />} 
            />
            
            <Route 
            path="/assistencia" 
            element={<Assistencia />} 
            />
            
            <Route 
            path="/auditoria" 
            element={<Auditoria />} 
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;