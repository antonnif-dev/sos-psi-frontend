import api from "../api";

export async function listarPlanosAula() {
    const res = await api.get("/planos-aula");
    return res.data;
}

export async function criarPlanoAula(data) {
    const res = await api.post("/planos-aula", data);
    return res.data;
}

export async function editarPlanoAula(id, data) {
    const res = await api.put(`/planos-aula/${id}`, data);
    return res.data;
}

export async function deletarPlanoAula(id) {
    const res = await api.delete(`/planos-aula/${id}`);
    return res.data;
}