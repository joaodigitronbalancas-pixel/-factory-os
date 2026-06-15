
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default api;

// outras funções...

const API_URL = "http://127.0.0.1:8000";

export async function getDashboard() {
  const response = await fetch(
    `${API_URL}/dashboard/resumo`
  );
  return response.json();
}

export async function getClientes() {
  const response = await fetch(
    `${API_URL}/clientes`
  );
  return response.json();
}

export async function getProdutos() {
  const response = await fetch(
    `${API_URL}/produtos`
  );
  return response.json();
}

export async function getOrdens() {
  const response = await fetch(
    `${API_URL}/ordens-producao`
  );
  return response.json();
}

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default api;

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000"
});

