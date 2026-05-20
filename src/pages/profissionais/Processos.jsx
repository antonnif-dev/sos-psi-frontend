import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes as listarClientes } from "../../services/pacientesService";
import {
    listarProcessos,
    criarProcesso,
    editarProcesso,
    deletarProcesso
} from "../../services/profissionais/processosService";

function Processos() {
    const [processos, setProcessos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [clienteNome, setClienteNome] = useState("");
    const [clientId, setClientId] = useState("");

    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");

    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);

    // 🔥 MODAL STATE
    const [modalOpen, setModalOpen] = useState(false);
    const [processoSelecionado, setProcessoSelecionado] = useState(null);

    const [editModal, setEditModal] = useState(false);
    
    const [formModal, setFormModal] = useState({
        clientId: "",
        clienteNome: "",
        titulo: "",
        tipo: "",
        status: ""
    });

    function abrirModal(p) {
        setProcessoSelecionado(p);

        setFormModal({
            clientId: p.clientId || "",
            clienteNome: p.cliente || "",
            titulo: p.titulo || "",
            tipo: p.tipo || "",
            status: p.status || ""
        });

        setModalOpen(true);
    }

    async function salvarEdicaoModal() {
        await editarProcesso(processoSelecionado.id, {
            clientId: formModal.clientId,
            titulo: formModal.titulo,
            tipo: formModal.tipo,
            status: formModal.status
        });

        await carregar();

        // atualiza visual do modal sem fechar
        setProcessoSelecionado(prev => ({
            ...prev,
            ...formModal
        }));
    }

    async function carregar() {
        const dados = await listarProcessos();
        setProcessos(dados);
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
        setClienteNome(texto);
        setClientId("");

        if (!texto) {
            setSugestoes([]);
            return;
        }

        const filtrados = clientes.filter(c =>
            c.nome.toLowerCase().includes(texto.toLowerCase())
        );

        setSugestoes(filtrados.slice(0, 5));
    }

    function selecionarCliente(c) {
        setClienteNome(c.nome);
        setClientId(c.id);
        setSugestoes([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            clientId,
            titulo,
            tipo,
            status
        };

        if (editando) {
            await editarProcesso(editando, data);
        } else {
            await criarProcesso(data);
        }

        setClienteNome("");
        setClientId("");
        setTitulo("");
        setTipo("");
        setStatus("");
        setEditando(null);

        carregar();
    }

    function iniciarEdicao(p) {
        setClientId(p.clientId || "");
        setClienteNome(p.cliente || "");

        setTitulo(p.titulo || "");
        setTipo(p.tipo || "");
        setStatus(p.status || "");

        setEditando(p.id);
    }

    async function remover(id) {
        if (!confirm("Excluir processo?")) return;
        await deletarProcesso(id);
        carregar();
    }

    // 🔥 abrir modal
    function abrirModal(p) {
        setProcessoSelecionado(p);
        setModalOpen(true);
    }

    function fecharModal() {
        setProcessoSelecionado(null);
        setModalOpen(false);
    }

    return (
        <div className="space-y-8 relative">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Processos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gestão de processos jurídicos
                </p>
            </div>

            {/* CARD STATS */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Total de processos</p>
                    <p className="text-3xl font-semibold mt-2">
                        {processos.length}
                    </p>
                </div>
            </div>

            {/* FORM */}
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-5 gap-3"
                >
                    <div className="relative">
                        <input
                            placeholder="Cliente"
                            value={clienteNome}
                            onChange={(e) => buscarCliente(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        {sugestoes.length > 0 && (
                            <div className="absolute bg-white border rounded-lg shadow w-full z-10">
                                {sugestoes.map(c => (
                                    <div
                                        key={c.id}
                                        onClick={() => selecionarCliente(c)}
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
                        placeholder="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button className="bg-blue-700 text-white rounded-lg px-4 py-2">
                        {editando ? "Salvar" : "Registrar"}
                    </button>
                </form>
            </Card>

            {/* CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processos.map(p => (
                    <div
                        key={p.id}
                        className="bg-white border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md transition"
                        onClick={() => abrirModal(p)}
                    >
                        <p className="font-semibold">
                            {p.cliente || "Cliente não vinculado"}
                        </p>

                        <p>Título: {p.titulo}</p>
                        <p>Tipo: {p.tipo}</p>
                        <p>Status: {p.status}</p>

                        <div
                            className="flex gap-3 mt-4"
                            onClick={(e) => e.stopPropagation()}
                        >
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

            {/* MODAL */}
            {/* MODAL */}
            {modalOpen && processoSelecionado && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg relative">

                        {/* FECHAR */}
                        <button
                            onClick={fecharModal}
                            className="absolute top-3 right-3 text-gray-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-6">
                            Processo #{processoSelecionado.id}
                        </h2>

                        {/* FORM EDITÁVEL DENTRO DO MODAL */}
                        <div className="space-y-3">

                            {/* CLIENTE (somente leitura ou opcional edição futura) */}
                            <div>
                                <label className="text-xs text-gray-500">Cliente</label>
                                <input
                                    className="border w-full p-2 rounded bg-gray-100"
                                    value={formModal.clienteNome}
                                    disabled
                                />
                            </div>

                            {/* TÍTULO */}
                            <div>
                                <label className="text-xs text-gray-500">Título</label>
                                <input
                                    className="border w-full p-2 rounded"
                                    value={formModal.titulo}
                                    onChange={(e) =>
                                        setFormModal({
                                            ...formModal,
                                            titulo: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* TIPO */}
                            <div>
                                <label className="text-xs text-gray-500">Tipo</label>
                                <input
                                    className="border w-full p-2 rounded"
                                    value={formModal.tipo}
                                    onChange={(e) =>
                                        setFormModal({
                                            ...formModal,
                                            tipo: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="text-xs text-gray-500">Status</label>
                                <input
                                    className="border w-full p-2 rounded"
                                    value={formModal.status}
                                    onChange={(e) =>
                                        setFormModal({
                                            ...formModal,
                                            status: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* ID (somente leitura) */}
                            <div>
                                <label className="text-xs text-gray-500">ID</label>
                                <input
                                    className="border w-full p-2 rounded bg-gray-100"
                                    value={processoSelecionado.id}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* AÇÕES */}
                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={async () => {
                                    await salvarEdicaoModal(); // função que você já criou
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Salvar alterações
                            </button>

                            <button
                                onClick={fecharModal}
                                className="bg-gray-200 px-4 py-2 rounded-lg"
                            >
                                Fechar
                            </button>

                            <button
                                onClick={() => {
                                    remover(processoSelecionado.id);
                                    fecharModal();
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Excluir
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Processos;