import api from "../api";

export async function listarMovimentacoes(
    processoId
) {

    const response =
        await api.get(
            `/movimentacoes/${processoId}`
        );

    return response.data;
}

export async function listarTodasMovimentacoes() {

    const response =
        await api.get(
            "/movimentacoes"
        );

    return response.data;

}