import { useEffect, useState } from "react";
import { listarProntuarios, criarProntuario, editarProntuario, deletarProntuario } from "../services/prontuarioService";
import { listarPacientes } from "../services/pacientesService";
import Card from "../components/Card";

function Prontuario() {
    const [prontuarios, setProntuarios] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [editando, setEditando] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarProntuarios();
        setProntuarios(dados);
    }

    async function carregarPacientes() {
        const dados = await listarPacientes();
        setPacientes(dados);
    }

    useEffect(() => {
        carregar();
        carregarPacientes();
    }, []);

    function buscarPaciente(texto) {
        setPaciente(texto);
        if (!texto) {
            setSugestoes([]);
            return;
        }
        const filtrados = pacientes.filter(p =>
            p.nome.toLowerCase().startsWith(texto.toLowerCase())
        );
        setSugestoes(filtrados.slice(0, 5));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            paciente,
            observacoes
        };
        if (editando) {
            await editarProntuario(editando, data);
        } else {
            await criarProntuario(data);
        }
        setPaciente("");
        setObservacoes("");
        setEditando(null);
        carregar();
    }

    function iniciarEdicao(prontuario) {
        setPaciente(prontuario.paciente);
        setObservacoes(prontuario.observacoes);
        setEditando(prontuario.id);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function cancelarEdicao() {
        setPaciente("");
        setObservacoes("");
        setEditando(null);
    }

    async function remover(id) {
        if (!confirm("Excluir prontuário?")) return;
        await deletarProntuario(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800"> Prontuário
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Registre observações e histórico das sessões
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Sessões registradas
                    </p>
                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {prontuarios.length}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Último paciente
                    </p>
                    <p className="text-lg font-medium text-gray-800 mt-2">
                        {prontuarios.length > 0 ? prontuarios[prontuarios.length - 1].paciente : "—"}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Status do prontuário
                    </p>
                    <p className="text-lg font-medium text-green-600 mt-2">
                        Sistema ativo
                    </p>
                </div>
            </div>

            <Card>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {editando ? "Editar sessão" : "Registrar sessão"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Adicione observações clínicas da sessão
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    <div className="relative">
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Paciente"
                            value={paciente}
                            onChange={(e) => buscarPaciente(e.target.value)}
                        />
                        {sugestoes.length > 0 && (
                            <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow w-full mt-1">
                                {sugestoes.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setPaciente(p.nome);
                                            setSugestoes([]);
                                        }}
                                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                    >
                                        {p.nome}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <textarea
                        rows="4"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Observações da sessão"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                    />
                    <div className="flex gap-3">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            {editando ? "Salvar edição" : "Salvar sessão"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                onClick={cancelarEdicao}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>

                </form>
            </Card>

            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Histórico de sessões
                </h2>
                {prontuarios.length === 0 && (
                    <Card>
                        <p className="text-gray-500 text-sm">
                            Nenhum prontuário registrado ainda.
                        </p>
                    </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {prontuarios.map(p => (
                        <div
                            key={p.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-sm text-gray-500 mb-1">
                                Paciente
                            </p>
                            <p className="font-medium text-gray-800 mb-3">
                                {p.paciente}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                Observações
                            </p>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {p.observacoes}
                            </p>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => iniciarEdicao(p)}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => remover(p.id)}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Prontuario;