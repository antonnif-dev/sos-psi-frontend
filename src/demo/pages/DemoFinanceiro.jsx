import { useEffect, useState } from "react";
import Card from "../../components/Card";

function DemoFinanceiro() {
    const [pagamentos, setPagamentos] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [valor, setValor] = useState("");
    const [editando, setEditando] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [sugestoes, setSugestoes] = useState([]);
    const [modalTipo, setModalTipo] = useState(null);

    const [filtroMes, setFiltroMes] = useState("");
    const [filtroAno, setFiltroAno] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    useEffect(() => {

        setPacientes([
            {
                id: "1",
                nome: "Maria Fernanda"
            },
            {
                id: "2",
                nome: "João Pedro"
            },
            {
                id: "3",
                nome: "Ana Clara"
            }
        ]);

        setPagamentos([
            {
                id: "1",
                paciente: "Maria Fernanda",
                valor: 180,
                status: "realizado",
                dataSessao: new Date(),
                pagoEm: new Date()
            },
            {
                id: "2",
                paciente: "João Pedro",
                valor: 200,
                status: "em_aberto",
                dataSessao: new Date()
            },
            {
                id: "3",
                paciente: "Ana Clara",
                valor: 150,
                status: "realizado",
                dataSessao: new Date(),
                pagoEm: new Date()
            }
        ]);

    }, []);

    function aplicarFiltros(lista) {
        let filtrados = [...lista];

        // filtro por mês e ano
        if (filtroMes && filtroAno) {
            filtrados = filtrados.filter(p => {
                const data = new Date(p.pagoEm || p.dataSessao);
                return (
                    data.getMonth() + 1 === Number(filtroMes) &&
                    data.getFullYear() === Number(filtroAno)
                );
            });
        }

        // filtro por período
        if (dataInicial && dataFinal) {
            const inicio = new Date(dataInicial);
            const fim = new Date(dataFinal);

            filtrados = filtrados.filter(p => {
                const data = new Date(p.pagoEm || p.dataSessao);
                return data >= inicio && data <= fim;
            });
        }
        return filtrados;
    }

    async function carregar() {
        const dados = await listarPagamentos();
        setPagamentos(dados);
    }

    function buscarPaciente(texto) {
        setPaciente(texto);
        if (!texto) {
            setSugestoes([]);
            return;
        }
        const filtrados = pacientes.filter(p =>
            p.nome.toLowerCase().startsWith(texto.toLowerCase())
        );
        setSugestoes(filtrados.slice(0, 5));
    }

    function handleSubmit(e) {

        e.preventDefault();

        const novoPagamento = {
            id: Date.now().toString(),
            paciente,
            valor,
            status: "em_aberto",
            dataSessao: new Date()
        };

        if (editando) {

            setPagamentos(prev =>
                prev.map(p =>
                    p.id === editando
                        ? {
                            ...p,
                            paciente,
                            valor
                        }
                        : p
                )
            );

        } else {

            setPagamentos(prev => [
                novoPagamento,
                ...prev
            ]);

        }

        setPaciente("");
        setValor("");
        setEditando(null);

        alert("Pagamento registrado na demonstração!");

    }

    function iniciarEdicao(p) {
        setPaciente(p.paciente);
        setValor(p.valor);
        setEditando(p.id);
    }

    function remover(id) {

        if (!confirm("Excluir pagamento?")) return;

        setPagamentos(prev =>
            prev.filter(p => p.id !== id)
        );

    }

    const total = pagamentos
        .filter(p => p.status === "realizado")
        .reduce((acc, p) => acc + Number(p.valor || 0), 0);

    const pagamentosRealizados = pagamentos.filter(p => p.status === "realizado");
    const pagamentosAbertos = pagamentos.filter(p => (p.status ?? "em_aberto") === "em_aberto");

    let listaModal = [];
    let tituloModal = "";
    let totalModal = 0;

    if (modalTipo === "todos") {
        listaModal = pagamentos;
        tituloModal = "Todos os pagamentos";
    }

    if (modalTipo === "realizados") {
        listaModal = aplicarFiltros(pagamentosRealizados);
        tituloModal = "Pagamentos realizados";
    }

    if (modalTipo === "abertos") {
        listaModal = pagamentosAbertos;
        tituloModal = "Pagamentos em aberto";
    }

    totalModal = listaModal.reduce(
        (acc, p) => acc + Number(p.valor || 0),
        0
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Financeiro
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Controle de pagamentos das sessões
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    onClick={() => setModalTipo("todos")}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
                >
                    <p className="text-sm text-gray-500">
                        Pagamentos registrados
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {pagamentos.length}
                    </p>
                </div>

                <div
                    onClick={() => setModalTipo("realizados")}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
                >
                    <p className="text-sm text-gray-500">
                        Faturamento total
                    </p>

                    <p className="text-3xl font-semibold text-green-600 mt-2">
                        R$ {total}
                    </p>
                </div>

                <div
                    onClick={() => setModalTipo("abertos")}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
                >
                    <p className="text-sm text-gray-500">
                        Pagamentos em aberto
                    </p>

                    <p className="text-3xl font-semibold text-yellow-600 mt-2">
                        {pagamentosAbertos.length}
                    </p>
                </div>
            </div>

            <Card>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {editando ? "Editar pagamento" : "Registrar pagamento"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Adicione um novo pagamento de sessão
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-3 gap-3"
                >
                    <div className="relative">
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Paciente"
                            value={paciente}
                            onChange={(e) => buscarPaciente(e.target.value)}
                        />
                        {sugestoes.length > 0 && (
                            <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow w-full mt-1">
                                {sugestoes.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setPaciente(p.nome);
                                            setSugestoes([]);
                                        }}
                                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                    >
                                        {p.nome}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        {editando ? "Salvar edição" : "Registrar pagamento"}
                    </button>
                </form>
            </Card>

            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Histórico de pagamentos
                </h2>

                {pagamentos.length === 0 && (
                    <Card>
                        <p className="text-gray-500 text-sm">
                            Nenhum pagamento registrado.
                        </p>
                    </Card>
                )}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pagamentos.map(p => (
                        <div
                            key={p.id}
                            className={`rounded-xl p-5 shadow-sm hover:shadow-md transition border ${(p.status ?? "em_aberto") === "realizado"
                                ? "bg-green-50 border-green-200"
                                : "bg-yellow-50 border-yellow-200"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Paciente
                                    </p>

                                    <p className="text-base font-medium text-gray-800">
                                        {p.paciente}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {p.dataSessao
                                            ? new Date(p.dataSessao).toLocaleString("pt-BR")
                                            : "Data não registrada"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Status: {p.status === "realizado" ? "Pago" : "Em aberto"}
                                    </p>
                                </div>

                                {(p.status ?? "em_aberto") === "em_aberto" ? (
                                    <input
                                        type="number"
                                        placeholder="Valor"
                                        className="border rounded px-2 py-1 w-24 text-sm"
                                        defaultValue={p.valor || ""}
                                        onBlur={(e) => {

                                            const novoValor = e.target.value;

                                            setPagamentos(prev =>
                                                prev.map(item =>
                                                    item.id === p.id
                                                        ? {
                                                            ...item,
                                                            valor: novoValor
                                                        }
                                                        : item
                                                )
                                            );

                                            carregar();
                                        }}
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-green-600">
                                        R$ {p.valor}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => iniciarEdicao(p)}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => remover(p.id)}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Excluir
                                </button>
                                {(p.status ?? "em_aberto") === "em_aberto" && (
                                    <button
                                        onClick={() => {

                                            if (!p.valor) {

                                                alert("Adicione o valor antes de confirmar.");

                                                return;

                                            }

                                            setPagamentos(prev =>
                                                prev.map(item =>
                                                    item.id === p.id
                                                        ? {
                                                            ...item,
                                                            status: "realizado",
                                                            pagoEm: new Date()
                                                        }
                                                        : item
                                                )
                                            );

                                            alert("Pagamento confirmado na demonstração!");

                                        }}
                                        className="text-green-700 text-sm font-medium hover:underline"
                                    >
                                        Confirmar pagamento
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalTipo && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                {tituloModal}
                            </h2>

                            <button
                                onClick={() => {
                                    setModalTipo(null);
                                    setFiltroMes("");
                                    setFiltroAno("");
                                    setDataInicial("");
                                    setDataFinal("");
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Fechar
                            </button>
                        </div>

                        {modalTipo === "realizados" && (
                            <div className="mb-4 space-y-3">
                                <div className="flex gap-2">
                                    <select
                                        value={filtroMes}
                                        onChange={(e) => setFiltroMes(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="">Mês</option>
                                        <option value="1">Jan</option>
                                        <option value="2">Fev</option>
                                        <option value="3">Mar</option>
                                        <option value="4">Abr</option>
                                        <option value="5">Mai</option>
                                        <option value="6">Jun</option>
                                        <option value="7">Jul</option>
                                        <option value="8">Ago</option>
                                        <option value="9">Set</option>
                                        <option value="10">Out</option>
                                        <option value="11">Nov</option>
                                        <option value="12">Dez</option>
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Ano"
                                        value={filtroAno}
                                        onChange={(e) => setFiltroAno(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-24"
                                    />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <input
                                        type="date"
                                        value={dataInicial}
                                        onChange={(e) => setDataInicial(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    />

                                    <span className="text-sm text-gray-500">até</span>

                                    <input
                                        type="date"
                                        value={dataFinal}
                                        onChange={(e) => setDataFinal(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {listaModal.map(p => (
                                <div
                                    key={p.id}
                                    className={`border rounded-lg p-3 flex justify-between ${p.status === "realizado"
                                        ? "bg-green-50"
                                        : "bg-yellow-50"
                                        }`}
                                >
                                    <span>{p.paciente}</span>

                                    <span className="font-medium">
                                        R$ {p.valor || 0}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-4 pt-3 text-right font-semibold">
                            Total: R$ {totalModal}
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

export default DemoFinanceiro;