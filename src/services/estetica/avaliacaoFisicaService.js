import api from "../api";

export async function listarAvaliacoes() {
    const res = await api.get("/avaliacoes");
    return res.data;
}

export async function criarAvaliacao(data) {
    const res = await api.post("/avaliacoes", data);
    return res.data;
}

export async function editarAvaliacao(id, data) {
    const res = await api.put(`/avaliacoes/${id}`, data);
    return res.data;
}

export async function deletarAvaliacao(id) {
    const res = await api.delete(`/avaliacoes/${id}`);
    return res.data;
}