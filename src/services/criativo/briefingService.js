import api from "../api";

export async function listarBriefings() {
    const res = await api.get("/briefings");
    return res.data;
}

export async function criarBriefing(data) {
    const res = await api.post("/briefings", data);
    return res.data;
}

export async function editarBriefing(id, data) {
    const res = await api.put(`/briefings/${id}`, data);
    return res.data;
}

export async function deletarBriefing(id) {
    const res = await api.delete(`/briefings/${id}`);
    return res.data;
}