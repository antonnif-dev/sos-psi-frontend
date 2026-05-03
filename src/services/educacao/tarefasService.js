import api from "../api";

export async function listarTarefas() {
  const res = await api.get("/tarefas");
  return res.data;
}

export async function criarTarefa(data) {
  const res = await api.post("/tarefas", data);
  return res.data;
}

export async function editarTarefa(id, data) {
  const res = await api.put(`/tarefas/${id}`, data);
  return res.data;
}

export async function deletarTarefa(id) {
  const res = await api.delete(`/tarefas/${id}`);
  return res.data;
}