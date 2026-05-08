import api from "./api";

export async function listarConsultas(
    filtros = {}
) {

    console.log("📅 Buscando consultas");

    console.log("🔍 Filtros:", filtros);

    const params = new URLSearchParams();

    if (filtros.startDate) {
        params.append(
            "startDate",
            filtros.startDate
        );
    }

    if (filtros.endDate) {
        params.append(
            "endDate",
            filtros.endDate
        );
    }

    const query = params.toString();

    console.log("🌐 Query:", query);

    const res = await api.get(
        `/agenda?${query}`
    );

    return res.data;

}

export async function criarConsulta(data) {
    const res = await api.post("/agenda", data);
    return res.data;
}

export async function editarConsulta(id, data) {
    const res = await api.put(`/agenda/${id}`, data);
    return res.data;
}

export async function deletarConsulta(id) {
    const res = await api.delete(`/agenda/${id}`);
    return res.data;
}

export async function listarSessoesRealizadas() {
    const res = await api.get("/agenda/realizadas");
    return res.data;
}