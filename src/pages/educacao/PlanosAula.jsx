import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarAlunos } from "../../services/pacientesService";
import {
    listarPlanosAula,
    criarPlanoAula,
    editarPlanoAula,
    deletarPlanoAula
} from "../../services/educacao/planosAulaService";

function PlanosAula() {
    const [planos, setPlanos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarPlanosAula();
        setPlanos(dados);
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
            disciplina,
            conteudo,
            objetivo
        };

        if (editando) {
            await editarPlanoAula(editando, data);
        } else {
            await criarPlanoAula(data);
        }

        setAluno("");
        setDisciplina("");
        setConteudo("");
        setObjetivo("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(p) {
        setAluno(p.aluno);
        setDisciplina(p.disciplina);
        setConteudo(p.conteudo);
        setObjetivo(p.objetivo);
        setEditando(p.id);
    }

    async function remover(id) {
        if (!confirm("Excluir plano de aula?")) return;
        await deletarPlanoAula(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Planos de Aula
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Planejamento pedagógico e organização de conteúdos
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Planos cadastrados</p>
                    <p className="text-3xl font-semibold mt-2">
                        {planos.length}
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
                        placeholder="Disciplina"
                        value={disciplina}
                        onChange={(e) => setDisciplina(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Conteúdo"
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Objetivo"
                        value={objetivo}
                        onChange={(e) => setObjetivo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-indigo-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {planos.map(p => (
                    <div
                        key={p.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{p.aluno}</p>
                        <p>Disciplina: {p.disciplina}</p>
                        <p>Conteúdo: {p.conteudo}</p>
                        <p>Objetivo: {p.objetivo}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => iniciarEdicao(p)}
                                className="text-blue-600"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => remover(p.id)}
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

export default PlanosAula;