import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarPrazos,
    criarPrazo,
    editarPrazo,
    deletarPrazo
} from "../../services/profissionais/prazosService";

function Prazos() {
    const [prazos, setPrazos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarPrazos();
        setPrazos(dados);
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
            descricao,
            dataLimite,
            prioridade
        };

        if (editando) {
            await editarPrazo(editando, data);
        } else {
            await criarPrazo(data);
        }

        setCliente("");
        setDescricao("");
        setDataLimite("");
        setPrioridade("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(p) {
        setCliente(p.cliente);
        setDescricao(p.descricao);
        setDataLimite(p.dataLimite);
        setPrioridade(p.prioridade);
        setEditando(p.id);
    }

    async function remover(id) {
        if (!confirm("Excluir prazo?")) return;
        await deletarPrazo(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Prazos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Controle de obrigações, entregas e vencimentos
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
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="date"
                        value={dataLimite}
                        onChange={(e) => setDataLimite(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="">Prioridade</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                    </select>

                    <button className="bg-yellow-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prazos.map(p => (
                    <div
                        key={p.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{p.cliente}</p>
                        <p>Descrição: {p.descricao}</p>
                        <p>Prazo: {p.dataLimite}</p>
                        <p>Prioridade: {p.prioridade}</p>

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

export default Prazos;