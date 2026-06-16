const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  console.log("Recebido:", email, senha);

  if (email === "admin@email.com" && senha === "123456") {
    return res.json({
      token: "abc123"
    });
  }

  return res.status(401).json({
    error: "Login inválido"
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});