import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarBriefings,
    criarBriefing,
    editarBriefing,
    deletarBriefing
} from "../../services/criativo/briefingService";

function Briefing() {
    const [briefings, setBriefings] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [referencias, setReferencias] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarBriefings();
        setBriefings(dados);
    }

    useEffect(() => {
        carregar();

        async function carregarClientes() {
            const dados = await listarClientes();
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
            objetivo,
            referencias,
            detalhes
        };

        if (editando) {
            await editarBriefing(editando, data);
        } else {
            await criarBriefing(data);
        }

        setCliente("");
        setObjetivo("");
        setReferencias("");
        setDetalhes("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(b) {
        setCliente(b.cliente);
        setObjetivo(b.objetivo);
        setReferencias(b.referencias);
        setDetalhes(b.detalhes);
        setEditando(b.id);
    }

    async function remover(id) {
        if (!confirm("Excluir briefing?")) return;
        await deletarBriefing(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Briefing
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Planejamento criativo e direcionamento de projetos
                </p>
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

                    <input
                        placeholder="Objetivo"
                        value={objetivo}
                        onChange={(e) => setObjetivo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Referências"
                        value={referencias}
                        onChange={(e) => setReferencias(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Detalhes"
                        value={detalhes}
                        onChange={(e) => setDetalhes(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-cyan-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {briefings.map(b => (
                    <div
                        key={b.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{b.cliente}</p>
                        <p>Objetivo: {b.objetivo}</p>
                        <p>Referências: {b.referencias}</p>
                        <p>Detalhes: {b.detalhes}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => iniciarEdicao(b)}
                                className="text-blue-600"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => remover(b.id)}
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

export default Briefing;