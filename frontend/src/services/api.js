import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export async function getDashboard() {
  const res = await api.get("/dashboard/industrial");
  return res.data;
}

export async function getClientes() {
  const res = await api.get("/clientes");
  return res.data;
}

export async function getProdutos() {
  const res = await api.get("/produtos");
  return res.data;
}

export async function getOrdens() {
  const res = await api.get("/ordens-producao");
  return res.data;
}