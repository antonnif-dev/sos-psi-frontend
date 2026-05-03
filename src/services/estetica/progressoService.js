import api from "../api";

export async function listarProgresso() {
  const res = await api.get("/progresso");
  return res.data;
}

export async function criarProgresso(data) {
  const res = await api.post("/progresso", data);
  return res.data;
}

export async function editarProgresso(id, data) {
  const res = await api.put(`/progresso/${id}`, data);
  return res.data;
}

export async function deletarProgresso(id) {
  const res = await api.delete(`/progresso/${id}`);
  return res.data;
}