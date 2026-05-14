import api from "./api";

export async function listarUsuarios() {

    try {

        console.log("CHAMANDO GET /api/users");

        const response = await api.get("/api/users");

        console.log("RESPOSTA USERS:", response.data);

        return response.data;

    } catch (err) {

        console.error("ERRO listarUsuarios:", err);

        console.error("STATUS:", err.response?.status);

        console.error("DATA:", err.response?.data);

        throw err;
    }
}