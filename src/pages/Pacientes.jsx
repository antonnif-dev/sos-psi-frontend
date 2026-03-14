import { useEffect, useState } from "react";
import {
    listarPacientes,
    criarPaciente,
    editarPaciente,
    deletarPaciente
} from "../services/pacientesService";
import Card from "../components/Card";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");
    const [novoNome, setNovoNome] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [nomeEditado, setNomeEditado] = useState("");

    async function carregarPacientes() {
        const data = await listarPacientes();
        setPacientes(data);
    }

    useEffect(() => {
        carregarPacientes();
    }, []);

    const pacientesFiltrados = pacientes.filter(p =>
        p.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    async function handleCriar() {
        if (!novoNome) return;
        await criarPaciente({
            nome: novoNome
        });
        setNovoNome("");
        carregarPacientes();
    }

    async function handleEditar(id) {
        await editarPaciente(id, {
            nome: nomeEditado
        });
        setEditandoId(null);
        setNomeEditado("");
        carregarPacientes();
    }

    async function handleDeletar(id) {

        if (!confirm("Deseja excluir este paciente?")) return;

        await deletarPaciente(id);

        carregarPacientes();

    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Pacientes
                    </h1>

                    <p className="text-sm text-gray-500">
                        {pacientes.length} paciente(s) cadastrados
                    </p>
                </div>

                

            </div>

            {/* Criar paciente */}

            <Card>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nome do paciente"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                        onClick={handleCriar}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Adicionar
                    </button>
                </div>
            </Card>

            <input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

            {pacientesFiltrados.length === 0 && (
                <Card>
                    <p className="text-gray-500 text-sm">
                        Nenhum paciente encontrado.
                    </p>
                </Card>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {pacientesFiltrados.map(p => (

                    <Card key={p.id}>

                        {editandoId === p.id ? (

                            <div className="space-y-2">

                                <input
                                    value={nomeEditado}
                                    onChange={(e) => setNomeEditado(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <div className="flex gap-2">

                                    <button
                                        onClick={() => handleEditar(p.id)}
                                        className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        salvar
                                    </button>

                                    <button
                                        onClick={() => setEditandoId(null)}
                                        className="text-sm bg-gray-300 px-2 py-1 rounded"
                                    >
                                        cancelar
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <>

                                <p className="text-sm text-gray-500 mb-1">
                                    Paciente
                                </p>

                                <p className="text-lg font-medium text-gray-800">
                                    {p.nome}
                                </p>

                                <div className="flex gap-2 mt-3">

                                    <button
                                        onClick={() => {
                                            setEditandoId(p.id);
                                            setNomeEditado(p.nome);
                                        }}
                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        editar
                                    </button>

                                    <button
                                        onClick={() => handleDeletar(p.id)}
                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        excluir
                                    </button>

                                </div>

                            </>

                        )}

                    </Card>

                ))}

            </div>

        </div>
    );
}

export default Pacientes;