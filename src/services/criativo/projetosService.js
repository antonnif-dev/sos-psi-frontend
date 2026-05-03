import api from "../api";

export async function listarProjetos() {
    const res = await api.get("/projetos");
    return res.data;
}

export async function criarProjeto(data) {
    const res = await api.post("/projetos", data);
    return res.data;
}

export async function editarProjeto(id, data) {
    const res = await api.put(`/projetos/${id}`, data);
    return res.data;
}

export async function deletarProjeto(id) {
    const res = await api.delete(`/projetos/${id}`);
    return res.data;
}