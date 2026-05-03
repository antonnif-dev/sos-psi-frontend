import api from "../api";

export async function listarPrazos() {
    const res = await api.get("/prazos");
    return res.data;
}

export async function criarPrazo(data) {
    const res = await api.post("/prazos", data);
    return res.data;
}

export async function editarPrazo(id, data) {
    const res = await api.put(`/prazos/${id}`, data);
    return res.data;
}

export async function deletarPrazo(id) {
    const res = await api.delete(`/prazos/${id}`);
    return res.data;
}