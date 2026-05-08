import { demoDatabase }
    from "../data/demoDatabase";

export async function listarPacientes() {

    return demoDatabase.pacientes;
}

export async function criarPaciente(data) {

    const novo = {
        id: crypto.randomUUID(),
        ...data
    };

    demoDatabase.pacientes.push(novo);

    return novo;
}

export async function editarPaciente(id, data) {

    demoDatabase.pacientes =
        demoDatabase.pacientes.map((p) =>
            p.id === id
                ? { ...p, ...data }
                : p
        );

    return true;
}

export async function deletarPaciente(id) {

    demoDatabase.pacientes =
        demoDatabase.pacientes.filter(
            (p) => p.id !== id
        );

    return true;
}