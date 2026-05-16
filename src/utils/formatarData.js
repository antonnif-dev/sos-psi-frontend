export function formatarData(data) {

    if (!data) return "—";

    const d = data?.seconds
        ? new Date(data.seconds * 1000)
        : new Date(data);

    return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

}

export function formatarHora(data) {

    if (!data) return "—";

    const d = data?.seconds
        ? new Date(data.seconds * 1000)
        : new Date(data);

    return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}