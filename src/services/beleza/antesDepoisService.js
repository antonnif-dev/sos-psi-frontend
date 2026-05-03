import api from "../api";

export async function listarAntesDepois() {
    const res = await api.get("/antes-depois");
    return res.data;
}

export async function criarAntesDepois(data) {
    const res = await api.post("/antes-depois", data);
    return res.data;
}

export async function editarAntesDepois(id, data) {
    const res = await api.put(`/antes-depois/${id}`, data);
    return res.data;
}

export async function deletarAntesDepois(id) {
    const res = await api.delete(`/antes-depois/${id}`);
    return res.data;
}