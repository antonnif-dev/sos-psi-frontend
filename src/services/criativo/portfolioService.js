import api from "../api";

export async function listarPortfolio() {
    const res = await api.get("/portfolio");
    return res.data;
}

export async function criarPortfolio(data) {
    const res = await api.post("/portfolio", data);
    return res.data;
}

export async function editarPortfolio(id, data) {
    const res = await api.put(`/portfolio/${id}`, data);
    return res.data;
}

export async function deletarPortfolio(id) {
    const res = await api.delete(`/portfolio/${id}`);
    return res.data;
}