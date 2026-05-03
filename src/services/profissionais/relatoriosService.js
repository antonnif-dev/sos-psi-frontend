import api from "../api";

export async function listarRelatorios() {
    const res = await api.get("/relatorios");
    return res.data;
}

export async function criarRelatorio(data) {
    const res = await api.post("/relatorios", data);
    return res.data;
}

export async function editarRelatorio(id, data) {
    const res = await api.put(`/relatorios/${id}`, data);
    return res.data;
}

export async function deletarRelatorio(id) {
    const res = await api.delete(`/relatorios/${id}`);
    return res.data;
}