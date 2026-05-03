import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarAntesDepois,
    criarAntesDepois,
    editarAntesDepois,
    deletarAntesDepois
} from "../../services/beleza/antesDepoisService";

function AntesDepois() {
    const [registros, setRegistros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [procedimento, setProcedimento] = useState("");
    const [resultado, setResultado] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarAntesDepois();
        setRegistros(dados);
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
            procedimento,
            resultado,
            observacoes
        };

        if (editando) {
            await editarAntesDepois(editando, data);
        } else {
            await criarAntesDepois(data);
        }

        setCliente("");
        setProcedimento("");
        setResultado("");
        setObservacoes("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(r) {
        setCliente(r.cliente);
        setProcedimento(r.procedimento);
        setResultado(r.resultado);
        setObservacoes(r.observacoes);
        setEditando(r.id);
    }

    async function remover(id) {
        if (!confirm("Excluir registro?")) return;
        await deletarAntesDepois(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Antes e Depois
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Registro de resultados e evolução estética
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
                        placeholder="Procedimento"
                        value={procedimento}
                        onChange={(e) => setProcedimento(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Resultado"
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Observações"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-fuchsia-600 text-white rounded-lg px-4 py-2">
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
                        <p className="font-semibold">{r.cliente}</p>
                        <p>Procedimento: {r.procedimento}</p>
                        <p>Resultado: {r.resultado}</p>
                        <p>Observações: {r.observacoes}</p>

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

export default AntesDepois;