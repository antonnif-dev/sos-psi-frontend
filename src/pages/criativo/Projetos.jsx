import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarProjetos,
    criarProjeto,
    editarProjeto,
    deletarProjeto
} from "../../services/criativo/projetosService";

function Projetos() {
    const [projetos, setProjetos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [prazo, setPrazo] = useState("");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    async function carregar() {
        const dados = await listarProjetos();
        setProjetos(dados);
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
            titulo,
            tipo,
            prazo
        };

        if (editando) {
            await editarProjeto(editando, data);
        } else {
            await criarProjeto(data);
        }

        setCliente("");
        setTitulo("");
        setTipo("");
        setPrazo("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(p) {
        setCliente(p.cliente);
        setTitulo(p.titulo);
        setTipo(p.tipo);
        setPrazo(p.prazo);
        setEditando(p.id);
    }

    async function remover(id) {
        if (!confirm("Excluir projeto?")) return;
        await deletarProjeto(id);
        carregar();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Projetos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gestão de ensaios, produções e entregas criativas
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
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="date"
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-violet-600 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projetos.map(p => (
                    <div
                        key={p.id}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <p className="font-semibold">{p.cliente}</p>
                        <p>Título: {p.titulo}</p>
                        <p>Tipo: {p.tipo}</p>
                        <p>Prazo: {p.prazo}</p>

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

export default Projetos;