import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarAlunos } from "../../services/pacientesService";
import {
    listarDesempenho,
    criarDesempenho,
    editarDesempenho,
    deletarDesempenho
} from "../../services/educacao/desempenhoService";

function Desempenho() {
    const [registros, setRegistros] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState("");
    const [nota, setNota] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [feedback, setFeedback] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarDesempenho();
        setRegistros(dados);
    }

    useEffect(() => {
        carregar();

        async function carregarAlunos() {
            const dados = await listarAlunos();
            setAlunos(dados);
        }

        carregarAlunos();
    }, []);

    function buscarAluno(texto) {
        setAluno(texto);

        if (!texto) {
            setSugestoes([]);
            return;
        }

        const filtrados = alunos.filter(a =>
            a.nome.toLowerCase().startsWith(texto.toLowerCase())
        );

        setSugestoes(filtrados.slice(0, 5));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            aluno,
            nota,
            frequencia,
            feedback
        };

        if (editando) {
            await editarDesempenho(editando, data);
        } else {
            await criarDesempenho(data);
        }

        setAluno("");
        setNota("");
        setFrequencia("");
        setFeedback("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(r) {
        setAluno(r.aluno);
        setNota(r.nota);
        setFrequencia(r.frequencia);
        setFeedback(r.feedback);
        setEditando(r.id);
    }

    async function remover(id) {
        if (!confirm("Excluir registro?")) return;
        await deletarDesempenho(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Desempenho
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Evolução e acompanhamento pedagógico
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Registros de desempenho
                    </p>
                    <p className="text-3xl font-semibold mt-2">
                        {registros.length}
                    </p>
                </div>
            </div>

            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-5 gap-3"
                >
                    <div className="relative">
                        <input
                            placeholder="Aluno"
                            value={aluno}
                            onChange={(e) => buscarAluno(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        {sugestoes.length > 0 && (
                            <div className="absolute bg-white border rounded-lg shadow w-full z-10">
                                {sugestoes.map(a => (
                                    <div
                                        key={a.id}
                                        onClick={() => {
                                            setAluno(a.nome);
                                            setSugestoes([]);
                                        }}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {a.nome}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        placeholder="Nota"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Frequência"
                        value={frequencia}
                        onChange={(e) => setFrequencia(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-teal-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registros.map(r => (
                    <div
                        key={r.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{r.aluno}</p>
                        <p>Nota: {r.nota}</p>
                        <p>Frequência: {r.frequencia}</p>
                        <p>Feedback: {r.feedback}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => iniciarEdicao(r)}
                                className="text-blue-600"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => remover(r.id)}
                                className="text-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Desempenho;