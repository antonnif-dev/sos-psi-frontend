import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarAnamneses,
    criarAnamnese,
    editarAnamnese,
    deletarAnamnese
} from "../../services/beleza/anamneseEsteticaService";

function AnamneseEstetica() {
    const [anamneses, setAnamneses] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [alergias, setAlergias] = useState("");
    const [sensibilidade, setSensibilidade] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarAnamneses();
        setAnamneses(dados);
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
            alergias,
            sensibilidade,
            observacoes
        };

        if (editando) {
            await editarAnamnese(editando, data);
        } else {
            await criarAnamnese(data);
        }

        setCliente("");
        setAlergias("");
        setSensibilidade("");
        setObservacoes("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(a) {
        setCliente(a.cliente);
        setAlergias(a.alergias);
        setSensibilidade(a.sensibilidade);
        setObservacoes(a.observacoes);
        setEditando(a.id);
    }

    async function remover(id) {
        if (!confirm("Excluir anamnese?")) return;
        await deletarAnamnese(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Anamnese Estética
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Registro clínico e cuidados prévios
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
                        placeholder="Alergias"
                        value={alergias}
                        onChange={(e) => setAlergias(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Sensibilidade"
                        value={sensibilidade}
                        onChange={(e) => setSensibilidade(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Observações"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-rose-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {anamneses.map(a => (
                    <div
                        key={a.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{a.cliente}</p>
                        <p>Alergias: {a.alergias}</p>
                        <p>Sensibilidade: {a.sensibilidade}</p>
                        <p>Observações: {a.observacoes}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => iniciarEdicao(a)}
                                className="text-blue-600"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => remover(a.id)}
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

export default AnamneseEstetica;