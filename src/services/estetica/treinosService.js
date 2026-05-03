import api from "../api";

export async function listarTreinos() {
    const res = await api.get("/treinos");
    return res.data;
}

export async function criarTreino(data) {
    const res = await api.post("/treinos", data);
    return res.data;
}

export async function editarTreino(id, data) {
    const res = await api.put(`/treinos/${id}`, data);
    return res.data;
}

export async function deletarTreino(id) {
    const res = await api.delete(`/treinos/${id}`);
    return res.data;
}