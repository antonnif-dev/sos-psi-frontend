import api from "../api";

export async function listarProcessos() {
    console.log("➡️ GET /processos");
    try {
        const res = await api.get("/processos");
        console.log("✅ resposta listarProcessos:", res.data);
        return res.data;
    } catch (err) {
        console.log("❌ erro listarProcessos:");
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
        console.log("url:", err.config?.url);
        throw err;
    }
}

export async function criarProcesso(data) {
    console.log("➡️ POST /processos payload:", data);

    try {
        const res = await api.post("/processos", data);
        console.log("✅ resposta criarProcesso:", res.data);
        return res.data;
    } catch (err) {
        console.log("❌ erro criarProcesso:");
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
        console.log("url:", err.config?.url);
        console.log("payload:", err.config?.data);
        throw err;
    }
}

export async function editarProcesso(id, data) {
    console.log(`➡️ PUT /processos/${id}`, data);

    try {
        const res = await api.put(`/processos/${id}`, data);
        return res.data;
    } catch (err) {
        console.log("❌ erro editarProcesso:", err.response?.data);
        throw err;
    }
}

export async function deletarProcesso(id) {
    console.log(`➡️ DELETE /processos/${id}`);

    try {
        const res = await api.delete(`/processos/${id}`);
        return res.data;
    } catch (err) {
        console.log("❌ erro deletarProcesso:", err.response?.data);
        throw err;
    }
}

export async function sincronizarProcesso(id) {

    const response = await api.post(
        `/processos/${id}/sincronizar`
    );

    return response.data;
}

export async function listarMovimentacoes(
    processoId
) {

    const response =
        await api.get(
            `/movimentacoes/${processoId}`
        );

    return response.data;
}