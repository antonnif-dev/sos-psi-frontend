import api from "../api";

export async function listarProcessos() {
    const res = await api.get("/processos");
    return res.data;
}

export async function criarProcesso(data) {
    const res = await api.post("/processos", data);
    return res.data;
}

export async function editarProcesso(id, data) {
    const res = await api.put(`/processos/${id}`, data);
    return res.data;
}

export async function deletarProcesso(id) {
    const res = await api.delete(`/processos/${id}`);
    return res.data;
}