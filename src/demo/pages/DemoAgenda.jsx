import { useEffect, useState } from "react";
import Card from "../../components/Card";

function DemoAgenda() {
    const [consultas, setConsultas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [disponibilidade, setDisponibilidade] = useState({});
    const [configAgenda, setConfigAgenda] = useState({
        sabado: false,
        domingo: false
    });
    const [semanaOffset, setSemanaOffset] = useState(0);
    const [modalConsulta, setModalConsulta] = useState(null);
    const [modalNovo, setModalNovo] = useState(null);
    const [buscaPaciente, setBuscaPaciente] = useState("");
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

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

        setConsultas([
            {
                id: "1",
                pacienteId: "1",
                data: new Date().toISOString(),
                status: "agendada",
                psicologoNome: "Psicólogo Demo",
                corAgenda: "#6366f1"
            }
        ]);

        setDisponibilidade({
            segunda: {
                ativo: true,
                inicio: "08:00",
                fim: "18:00"
            },
            terca: {
                ativo: true,
                inicio: "08:00",
                fim: "18:00"
            },
            quarta: {
                ativo: true,
                inicio: "08:00",
                fim: "18:00"
            },
            quinta: {
                ativo: true,
                inicio: "08:00",
                fim: "18:00"
            },
            sexta: {
                ativo: true,
                inicio: "08:00",
                fim: "18:00"
            }
        });

    }, []);

    const horarios = [
        "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00"
    ];

    const coresStatus = {
        agendada: "bg-indigo-100",
        realizada: "bg-green-100",
        cancelada: "bg-red-100",
        faltou: "bg-yellow-100"
    };
    const [diaMobileIndex, setDiaMobileIndex] = useState(0);

    function normalizarData(data) {

        if (!data) return null;

        // se já for string
        if (typeof data === "string") {
            return new Date(data);
        }

        // se for timestamp do firestore
        if (data.seconds) {
            return new Date(data.seconds * 1000);
        }

        // fallback
        return new Date(data);
    }

    function inicioSemana(data) {
        const d = new Date(data);
        const dia = d.getDay();
        const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    function diasSemana() {
        const base = inicioSemana(new Date());
        base.setDate(base.getDate() + semanaOffset * 7);
        const dias = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            const diaSemana = d.getDay();
            if (diaSemana === 6 && !configAgenda.sabado) continue;
            if (diaSemana === 0 && !configAgenda.domingo) continue;
            dias.push(d);
        }
        return dias;
    }

    const dias = diasSemana();

    function periodoSemana() {
        const inicio = inicioSemana(new Date());
        inicio.setDate(inicio.getDate() + semanaOffset * 7);
        const fim = new Date(inicio);
        fim.setDate(inicio.getDate() + 6);
        const opcoes = { day: "2-digit", month: "short" };
        const inicioFormatado = inicio.toLocaleDateString("pt-BR", opcoes);
        const fimFormatado = fim.toLocaleDateString("pt-BR", opcoes);
        const ano = fim.getFullYear();
        return `${inicioFormatado} – ${fimFormatado} ${ano}`;
    }

    function horarioDisponivel(data, horario) {
        if (!disponibilidade) return true;
        const dias = [
            "domingo",
            "segunda",
            "terca",
            "quarta",
            "quinta",
            "sexta",
            "sabado"
        ];
        const diaNome = dias[data.getDay()];
        const config = disponibilidade[diaNome];
        if (!config || !config.ativo) return false;
        const inicio = config.inicio;
        const fim = config.fim;
        return horario >= inicio && horario <= fim;
    }

    function consultaNoSlot(data, horario) {
        return consultas.find(c => {
            const d = normalizarData(c.data);
            if (!d) return false;
            const h =
                d.getHours().toString().padStart(2, "0") +
                ":" +
                d.getMinutes().toString().padStart(2, "0");

            return (
                d.toDateString() === data.toDateString()
                &&
                h === horario
            );
        });
    }

    function nomePaciente(id) {
        const p = pacientes.find(p => p.id === id || p.pacienteId === id);
        return p?.nome || "";
    }

    function nomePsicologo() {
        return "Psicólogo Demo";
    }

    function abrirNovo(data, horario) {
        setModalNovo({
            data,
            horario
        });
    }

    function salvarConsulta() {

        alert("Consulta criada na demonstração!");

        setModalNovo(null);

    }

    function cancelarConsulta() {

        alert("Consulta cancelada na demonstração!");

        setModalConsulta(null);

    }

    function finalizarConsulta() {

        alert("Sessão finalizada na demonstração!");

        setModalConsulta(null);

    }

    function marcarFalta() {

        alert("Falta registrada na demonstração!");

        setModalConsulta(null);

    }

    const sugestoes = pacientes.filter(p =>
        (p.nome || "").toLowerCase().includes(buscaPaciente.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold">
                        Agenda
                    </h1>
                    <p className="text-sm text-gray-500">
                        {periodoSemana()}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setSemanaOffset(semanaOffset - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ◀
                    </button>
                    <button
                        onClick={() => setSemanaOffset(0)}
                        className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                        Hoje
                    </button>
                    <button
                        onClick={() => setSemanaOffset(semanaOffset + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ▶
                    </button>
                </div>
            </div>

            <div className="md:hidden">

                <div className="flex justify-between items-center mb-3">

                    <button
                        onClick={() => setDiaMobileIndex(Math.max(diaMobileIndex - 1, 0))}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        ◀
                    </button>

                    <div className="text-center">
                        <div className="font-medium">
                            {dias[diaMobileIndex]?.toLocaleDateString("pt-BR", { weekday: "long" })}
                        </div>
                        <div className="text-xs text-gray-500">
                            {dias[diaMobileIndex]?.toLocaleDateString()}
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            setDiaMobileIndex(
                                Math.min(diaMobileIndex + 1, dias.length - 1)
                            )
                        }
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        ▶
                    </button>

                </div>

                <div className="space-y-2">
                    {horarios.map(h => {
                        const dia = dias[diaMobileIndex];
                        const consulta = consultaNoSlot(dia, h);
                        const disponivel = horarioDisponivel(dia, h);

                        return (
                            <div
                                key={h}
                                className={`flex justify-between items-center p-3 border rounded
                    ${!disponivel ? "bg-gray-100" : "hover:bg-indigo-50"}`}
                                onClick={() => {
                                    if (!disponivel) return;
                                    if (consulta) {
                                        setModalConsulta(consulta);
                                    } else {
                                        abrirNovo(dia, h);
                                    }
                                }}
                            >
                                <span className="text-sm text-gray-600">
                                    {h}
                                </span>
                                <span className="text-sm">
                                    {consulta
                                        ? nomePaciente(consulta.pacienteId)
                                        : disponivel
                                            ? "Disponível"
                                            : "Indisponível"}

                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto hidden md:block">
                    <div className="grid min-w-[600px] border"
                        style={{
                            gridTemplateColumns: `80px repeat(${dias.length},1fr)`
                        }}
                    >
                        <div></div>

                        {dias.map((d, i) => (
                            <div key={i} className="border p-2 text-center">
                                <div className="font-medium text-sm md:text-base">
                                    {d.toLocaleDateString("pt-BR", { weekday: "short" })}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {d.toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {horarios.map(h => (
                            <div key={h} className="contents">
                                <div className="border p-2 text-xs text-gray-500">
                                    {h}
                                </div>
                                {dias.map((dia, i) => {
                                    const consulta = consultaNoSlot(dia, h);
                                    const disponivel = horarioDisponivel(dia, h);
                                    return (
                                        <div
                                            key={dia.toISOString() + h}
                                            className={`border h-16 p-1 text-xs ${!disponivel ?
                                                "bg-gray-100 cursor-not-allowed" : "hover:bg-indigo-50 cursor-pointer"} `}
                                            onClick={() => {
                                                if (!disponivel) return;
                                                if (consulta) {
                                                    setModalConsulta(consulta);
                                                } else {
                                                    abrirNovo(dia, h);
                                                }
                                            }}
                                        >
                                            {consulta && (
                                                <div
                                                    className={`
        ${coresStatus[consulta.status] || "bg-indigo-100"}
        rounded
        p-2
        border-l-4
    `}
                                                    style={{
                                                        borderLeftColor: consulta.corAgenda || "#6366f1"
                                                    }}
                                                >
                                                    <div className="font-medium truncate">
                                                        {nomePaciente(consulta.pacienteId)}
                                                    </div>

                                                    {consulta.psicologoNome && (
                                                        <div className="text-[10px] text-gray-600 truncate">
                                                            {consulta.psicologoNome}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            {/*modal criar agenda*/}
            {modalNovo && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-lg font-semibold">
                            Nova consulta
                        </h2>
                        <div className="text-sm text-gray-500">
                            {modalNovo.data.toLocaleDateString()} às {modalNovo.horario}
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar paciente..."
                            value={buscaPaciente}
                            onChange={e => setBuscaPaciente(e.target.value)}
                            className="w-full border p-2 rounded"
                        />

                        <div className="max-h-40 overflow-y-auto border rounded">
                            {sugestoes.map(p => (
                                <div
                                    key={p.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setPacienteSelecionado(p)
                                        setBuscaPaciente(p.nome)
                                    }}
                                >
                                    {p.nome}
                                </div>
                            ))}
                        </div>

                        {pacienteSelecionado && (
                            <div className="text-sm text-green-600">
                                Paciente: {pacienteSelecionado.nome}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalNovo(null)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={salvarConsulta}
                                className="px-3 py-1 bg-indigo-600 text-white rounded"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*modal criar agenda*/}
            {modalConsulta && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-lg font-semibold">
                            Consulta
                        </h2>
                        <div className="text-sm text-gray-600">
                            {new Date(modalConsulta.data).toLocaleString()}
                        </div>
                        <div className="space-y-3 text-sm">

                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-500">
                                    Paciente
                                </div>

                                <div className="font-medium">
                                    {nomePaciente(modalConsulta.pacienteId)}
                                </div>
                            </div>

                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-500">
                                    Psicólogo responsável
                                </div>

                                <div className="font-medium">
                                    {nomePsicologo(modalConsulta)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-500">
                                        Status
                                    </div>

                                    <div className="font-medium capitalize">
                                        {modalConsulta.status}
                                    </div>
                                </div>

                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-500">
                                        Horário
                                    </div>

                                    <div className="font-medium">
                                        {new Date(modalConsulta.data)
                                            .toLocaleTimeString(
                                                "pt-BR",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }
                                            )}
                                    </div>
                                </div>

                            </div>

                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-500">
                                    Criado em
                                </div>

                                <div className="font-medium">
                                    {
                                        modalConsulta.createdAt
                                            ? new Date(
                                                modalConsulta.createdAt
                                            ).toLocaleString("pt-BR")
                                            : "Não disponível"
                                    }
                                </div>
                            </div>

                            {
                                modalConsulta.updatedAt && (
                                    <div className="border rounded-lg p-3 bg-gray-50">
                                        <div className="text-xs text-gray-500">
                                            Última atualização
                                        </div>

                                        <div className="font-medium">
                                            {
                                                new Date(
                                                    modalConsulta.updatedAt
                                                ).toLocaleString("pt-BR")
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-500">
                                    ID da sessão
                                </div>

                                <div className="font-mono text-xs break-all">
                                    {modalConsulta.id}
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-2 justify-end flex-wrap">
                            <button
                                onClick={() => setModalConsulta(null)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                Fechar
                            </button>

                            <button
                                onClick={() => finalizarConsulta(modalConsulta.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Finalizar sessão
                            </button>

                            <button
                                onClick={() => marcarFalta(modalConsulta.id)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Paciente faltou
                            </button>

                            <button
                                onClick={() => {
                                    setModalConsulta(null);
                                    abrirNovo(
                                        new Date(modalConsulta.data),
                                        new Date(modalConsulta.data)
                                            .toTimeString()
                                            .slice(0, 5)
                                    );
                                }}
                                className="px-3 py-1 bg-indigo-500 text-white rounded"
                            >
                                Reagendar
                            </button>

                            <button
                                onClick={() => cancelarConsulta(modalConsulta.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DemoAgenda