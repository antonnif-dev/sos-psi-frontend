import api from "../api";

export async function listarProcedimentos() {
    const res = await api.get("/procedimentos");
    return res.data;
}

export async function criarProcedimento(data) {
    const res = await api.post("/procedimentos", data);
    return res.data;
}

export async function editarProcedimento(id, data) {
    const res = await api.put(`/procedimentos/${id}`, data);
    return res.data;
}

export async function deletarProcedimento(id) {
    const res = await api.delete(`/procedimentos/${id}`);
    return res.data;
}