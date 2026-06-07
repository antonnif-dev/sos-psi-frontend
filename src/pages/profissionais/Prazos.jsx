import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../hooks/useAuth";

import { listarPacientes as listarClientes } from "../../services/pacientesService";

import {
    listarPrazos,
    criarPrazo,
    editarPrazo,
    deletarPrazo
} from "../../services/profissionais/prazosService";
import Calendar from "react-calendar";
import { listarTodasMovimentacoes } from "../../services/profissionais/movimentacoesService";

function Prazos() {
    const [prazos, setPrazos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [tribunal, setTribunal] = useState("");
    const [numeroProcesso, setNumeroProcesso] = useState("");
    const [linkTribunal, setLinkTribunal] = useState("");
    const [status, setStatus] = useState("Pendente");
    const [editando, setEditando] = useState(null);
    const [sugestoes, setSugestoes] = useState([]);
    const { user } = useAuth();
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    const movimentacoesDoDia =
        movimentacoes.filter(mov => {

            const dataMov =
                new Date(
                    mov.dataMovimentacao
                );

            return (
                dataMov.toDateString() ===
                dataSelecionada.toDateString()
            );

        });

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

    useEffect(() => {

        async function carregar() {

            try {

                const dados =
                    await listarTodasMovimentacoes();

                setMovimentacoes(
                    dados
                );

            } catch (error) {

                console.error(error);

            }

        }

        carregar();

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
            prioridade,
            tribunal,
            numeroProcesso,
            linkTribunal,
            status,
            psicologoId: user?.uid || null,
            psicologoNome:
                user?.name
                ||
                user?.displayName
                ||
                "Profissional",

            tipo: "prazo"
        };

        if (editando) {

            await editarPrazo(editando, data);

        } else {

            await criarPrazo(data);
        }

        limparFormulario();
        carregar();
    }

    function limparFormulario() {
        setCliente("");
        setDescricao("");
        setDataLimite("");
        setPrioridade("");
        setTribunal("");
        setNumeroProcesso("");
        setLinkTribunal("");
        setStatus("Pendente");
        setEditando(null);
    }

    function iniciarEdicao(p) {

        setCliente(p.cliente || "");

        setDescricao(p.descricao || "");

        setDataLimite(p.dataLimite || "");

        setPrioridade(p.prioridade || "");

        setTribunal(p.tribunal || "");

        setNumeroProcesso(p.numeroProcesso || "");

        setLinkTribunal(p.linkTribunal || "");

        setStatus(p.status || "Pendente");

        setEditando(p.id);
    }

    async function remover(id) {

        if (!confirm("Excluir prazo?")) return;

        await deletarPrazo(id);

        carregar();
    }

    const prazosOrdenados = [...prazos].sort(
        (a, b) =>
            new Date(a.dataLimite || 0) -
            new Date(b.dataLimite || 0)
    );

    return (

        <div className="space-y-8">

            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Prazos
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Controle jurídico de obrigações e vencimentos
                </p>
            </div>

            <div className="md:px-20">
                <Calendar
                    onChange={setDataSelecionada}                    
                    value={dataSelecionada}
                    tileContent={({ date }) => {

                        const possuiMovimentacao =
                            movimentacoes.some(mov => {

                                const dataMov =
                                    new Date(
                                        mov.dataMovimentacao
                                    );

                                return (
                                    dataMov.toDateString() ===
                                    date.toDateString()
                                );

                            });

                        return possuiMovimentacao ? (
                            <div className="flex justify-center mt-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                        ) : null;

                    }}
                />
                <div className="mt-4">

                    {movimentacoesDoDia.length === 0 ? (

                        <div className="text-sm text-gray-500">
                            Nenhuma movimentação nesta data.
                        </div>

                    ) : (

                        movimentacoesDoDia.map(mov => (

                            <div
                                key={mov.id}
                                className="
                    border
                    rounded-xl
                    p-4
                    mb-2
                    hover:bg-gray-50
                    transition
                "
                            >

                                <div className="flex justify-between">

                                    <div>

                                        <div className="font-medium">
                                            {mov.descricao}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            Código: {mov.codigo}
                                        </div>

                                    </div>

                                    <div className="text-sm text-indigo-600">

                                        {new Date(
                                            mov.dataMovimentacao
                                        ).toLocaleTimeString(
                                            "pt-BR",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>
            </div>

            <Card>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-4 gap-3"
                >

                    <div className="relative">

                        <input
                            placeholder="Cliente"
                            value={cliente}
                            onChange={(e) =>
                                buscarCliente(e.target.value)
                            }
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        {sugestoes.length > 0 && (

                            <div className="absolute bg-white border rounded-lg shadow w-full z-20">

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
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="date"
                        value={dataLimite}
                        onChange={(e) =>
                            setDataLimite(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        value={prioridade}
                        onChange={(e) =>
                            setPrioridade(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="">
                            Prioridade
                        </option>

                        <option value="Baixa">
                            Baixa
                        </option>

                        <option value="Média">
                            Média
                        </option>

                        <option value="Alta">
                            Alta
                        </option>
                    </select>

                    <input
                        placeholder="Tribunal"
                        value={tribunal}
                        onChange={(e) =>
                            setTribunal(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Número Processo"
                        value={numeroProcesso}
                        onChange={(e) =>
                            setNumeroProcesso(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Link Tribunal"
                        value={linkTribunal}
                        onChange={(e) =>
                            setLinkTribunal(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="Pendente">
                            Pendente
                        </option>

                        <option value="Concluído">
                            Concluído
                        </option>

                        <option value="Atrasado">
                            Atrasado
                        </option>
                    </select>

                    <button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-4 py-2"
                    >
                        {editando ? "Salvar" : "Registrar"}
                    </button>

                </form>

            </Card>

            {/* Prazos dos processos
            <h2>Prazos</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {prazosOrdenados.map(p => (

                    <div
                        key={p.id}
                        className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <h2 className="font-semibold text-lg text-gray-800">
                                    {p.cliente}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {p.numeroProcesso}
                                </p>

                            </div>

                            <span
                                className={
                                    p.prioridade === "Alta"
                                        ? "text-red-600 font-semibold"
                                        : p.prioridade === "Média"
                                            ? "text-yellow-600 font-semibold"
                                            : "text-green-600 font-semibold"
                                }
                            >
                                {p.prioridade}
                            </span>

                        </div>

                        <div className="mt-4 space-y-2 text-sm text-gray-700">

                            <p>
                                <span className="font-medium">
                                    Tribunal:
                                </span>{" "}
                                {p.tribunal}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Descrição:
                                </span>{" "}
                                {p.descricao}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Prazo:
                                </span>{" "}
                                {p.dataLimite}
                            </p>

                            <p>
                                <span className="font-medium">
                                    Status:
                                </span>{" "}

                                <span
                                    className={
                                        p.status === "Atrasado"
                                            ? "text-red-600 font-semibold"
                                            : p.status === "Concluído"
                                                ? "text-green-600 font-semibold"
                                                : "text-yellow-600 font-semibold"
                                    }
                                >
                                    {p.status}
                                </span>
                            </p>

                        </div>

                        {p.linkTribunal && (

                            <a
                                href={p.linkTribunal}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-4 text-blue-600 hover:underline text-sm"
                            >
                                Abrir no Tribunal
                            </a>

                        )}

                        <div className="flex gap-4 mt-5">

                            <button
                                onClick={() =>
                                    iniciarEdicao(p)
                                }
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() =>
                                    remover(p.id)
                                }
                                className="text-red-600 hover:text-red-800"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                ))}

            </div>
*/}
        </div>
    );
}

export default Prazos;