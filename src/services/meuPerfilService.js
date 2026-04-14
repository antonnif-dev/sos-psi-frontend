import axios from "axios";

export async function criarUsuario(data) {
    const response = await axios.post("/api/users", data);
    return response.data;
}