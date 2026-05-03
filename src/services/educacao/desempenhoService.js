import api from "../api";

export async function listarDesempenho() {
    const res = await api.get("/desempenho");
    return res.data;
}

export async function criarDesempenho(data) {
    const res = await api.post("/desempenho", data);
    return res.data;
}

export async function editarDesempenho(id, data) {
    const res = await api.put(`/desempenho/${id}`, data);
    return res.data;
}

export async function deletarDesempenho(id) {
    const res = await api.delete(`/desempenho/${id}`);
    return res.data;
}