import axios from "axios";
import { auth } from "../services/firebase";

export async function criarUsuario(data) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuário não autenticado");
    }

    const token = await user.getIdToken();

    const response = await axios.post("/api/users", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}