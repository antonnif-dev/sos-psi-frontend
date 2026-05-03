import api from "../api";

export async function listarAnamneses() {
    const res = await api.get("/anamnese-estetica");
    return res.data;
}

export async function criarAnamnese(data) {
    const res = await api.post("/anamnese-estetica", data);
    return res.data;
}

export async function editarAnamnese(id, data) {
    const res = await api.put(`/anamnese-estetica/${id}`, data);
    return res.data;
}

export async function deletarAnamnese(id) {
    const res = await api.delete(`/anamnese-estetica/${id}`);
    return res.data;
}