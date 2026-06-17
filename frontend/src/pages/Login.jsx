import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
      email,
      senha,
});

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Login inválido");
    }
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a"
    }}>
      <form onSubmit={handleLogin} style={{
        background: "#1e293b",
        padding: 30,
        borderRadius: 10,
        width: 300,
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: 20 }}>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <button style={{
          width: "100%",
          padding: 10,
          background: "#3b82f6",
          color: "#fff",
          border: "none"
        }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
``