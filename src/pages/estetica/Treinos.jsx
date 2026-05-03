import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes } from "../../services/pacientesService";
import {
    listarTreinos,
    criarTreino,
    editarTreino,
    deletarTreino
} from "../../services/estetica/treinosService";

function Treinos() {
    const [treinos, setTreinos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [categoria, setCategoria] = useState("");
    const [exercicios, setExercicios] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarTreinos();
        setTreinos(dados);
    }

    useEffect(() => {
        carregar();
        async function carregarClientes() {
            const dados = await listarPacientes();
            setClientes(dados);
        }
        carregarClientes();
    }, []);

    function buscarCliente(texto) {
        setCliente(texto);

        if (!texto) {
            setSugestoes([]);
            return;
        }

        const filtrados = clientes.filter(c =>
            c.nome.toLowerCase().startsWith(texto.toLowerCase())
        );

        setSugestoes(filtrados.slice(0, 5));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            cliente,
            categoria,
            exercicios,
            frequencia
        };

        if (editando) {
            await editarTreino(editando, data);
        } else {
            await criarTreino(data);
        }

        setCliente("");
        setCategoria("");
        setExercicios("");
        setFrequencia("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(t) {
        setCliente(t.cliente);
        setCategoria(t.categoria);
        setExercicios(t.exercicios);
        setFrequencia(t.frequencia);
        setEditando(t.id);
    }

    async function remover(id) {
        if (!confirm("Excluir treino?")) return;
        await deletarTreino(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Treinos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Planejamento de treinos personalizados
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Treinos ativos</p>
                    <p className="text-3xl font-semibold mt-2">
                        {treinos.length}
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
                            placeholder="Cliente"
                            value={cliente}
                            onChange={(e) => buscarCliente(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        {sugestoes.length > 0 && (
                            <div className="absolute bg-white border rounded-lg shadow w-full z-10">
                                {sugestoes.map(c => (
                                    <div
                                        key={c.id}
                                        onClick={() => {
                                            setCliente(c.nome);
                                            setSugestoes([]);
                                        }}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {c.nome}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="">Categoria</option>
                        <option value="Musculação">Musculação</option>
                        <option value="Pilates">Pilates</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Funcional">Funcional</option>
                    </select>

                    <input
                        placeholder="Exercícios"
                        value={exercicios}
                        onChange={(e) => setExercicios(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Frequência semanal"
                        value={frequencia}
                        onChange={(e) => setFrequencia(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-purple-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {treinos.map(t => (
                    <div
                        key={t.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{t.cliente}</p>
                        <p>Categoria: {t.categoria}</p>
                        <p>Exercícios: {t.exercicios}</p>
                        <p>Frequência: {t.frequencia}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => iniciarEdicao(t)}
                                className="text-blue-600"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => remover(t.id)}
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

export default Treinos;