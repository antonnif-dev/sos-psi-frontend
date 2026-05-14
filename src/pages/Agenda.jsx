import { useEffect, useState } from "react";
import { listarPacientes } from "../services/pacientesService";
import { listarConsultas, criarConsulta, deletarConsulta, editarConsulta } from "../services/agendaService";
import Card from "../components/Card";
import { db } from "../services/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

function Agenda() {
    const [consultas, setConsultas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const { user } = useAuth();
    const [tenantId, setTenantId] = useState(null);
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

    async function carregar() {

        if (!dias.length) {

            console.warn("⚠️ Nenhum dia encontrado na agenda");

            return;

        }

        const inicio = new Date(dias[0]);

        inicio.setHours(0);
        inicio.setMinutes(0);
        inicio.setSeconds(0);
        inicio.setMilliseconds(0);

        const fim = new Date(
            dias[dias.length - 1]
        );

        fim.setHours(23);
        fim.setMinutes(59);
        fim.setSeconds(59);
        fim.setMilliseconds(999);

        console.log("📆 =============================");
        console.log("📆 BUSCANDO CONSULTAS");
        console.log("📆 =============================");

        console.log("➡️ Início:", inicio);
        console.log("➡️ Fim:", fim);

        try {

            const dados = await listarConsultas({
                startDate: inicio.toISOString(),
                endDate: fim.toISOString()
            });

            console.log(
                "✅ Consultas carregadas:",
                dados.length
            );

            console.log("📦 CONSULTAS RECEBIDAS:");
            console.log(dados);

            dados.forEach(c => {

                const dataNormalizada =
                    normalizarData(c.data);

                console.log("🧩 Consulta recebida:", {
                    id: c.id,
                    dataOriginal: c.data,
                    dataConvertida: dataNormalizada,
                    horario:
                        dataNormalizada
                            ?.getHours()
                            ?.toString()
                            ?.padStart(2, "0")
                        +
                        ":" +
                        dataNormalizada
                            ?.getMinutes()
                            ?.toString()
                            ?.padStart(2, "0"),
                    paciente: c.pacienteNome,
                    psicologo: c.psicologoNome,
                    status: c.status
                });

            });

            setConsultas(dados);

            console.log("🧠 Estado consultas atualizado");

            const pacientesLista =
                await listarPacientes();

            console.log(
                "✅ Pacientes carregados:",
                pacientesLista.length
            );

            setPacientes(pacientesLista);

        } catch (error) {

            console.error(
                "❌ Erro ao carregar agenda:",
                error
            );

        }

    }

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

    useEffect(() => {
        if (!user) return;
        carregar();

        async function carregarConfiguracoes() {
            try {
                const tenantsSnapshot = await getDocs(
                    collection(db, "tenants")
                );

                for (const tenantDoc of tenantsSnapshot.docs) {
                    const userRef = doc(
                        db,
                        "tenants",
                        tenantDoc.id,
                        "usuarios",
                        user.uid
                    );

                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setTenantId(tenantDoc.id);
                        const data = tenantDoc.data();

                        if (data.disponibilidade) {
                            setDisponibilidade(
                                data.disponibilidade
                            );
                        }

                        if (data.agenda) {
                            setConfigAgenda(
                                data.agenda
                            );
                        }

                        break;
                    }
                }

            } catch (error) {
                console.error(
                    "❌ Erro ao carregar configurações:",
                    error
                );
            }
        }
        carregarConfiguracoes();
    }, [user, semanaOffset]);

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

    function consultasNoSlot(data, horario) {
        return consultas.filter(c => {

            const d = normalizarData(c.data);

            if (!d) return false;

            const h =
                d.getHours().toString().padStart(2, "0")
                +
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

    function nomePsicologo(consulta) {

        if (!consulta) return "Não identificado";

        if (
            consulta.psicologoNome
        ) {
            return consulta.psicologoNome;
        }

        if (
            consulta.psicologoId === user?.uid
        ) {
            return user?.name || user?.displayName || "Você";
        }

        return consulta.psicologoId || "Não identificado";

    }

    function abrirNovo(data, horario) {
        setModalNovo({
            data,
            horario
        });
    }

    async function salvarConsulta() {
        if (!pacienteSelecionado) return;
        const [h, m] = modalNovo.horario.split(":");
        const data = new Date(modalNovo.data);
        data.setHours(Number(h));
        data.setMinutes(Number(m));
        data.setSeconds(0);
        data.setMilliseconds(0);
        const horarioExiste = consultaNoSlot(modalNovo.data, modalNovo.horario);
        if (horarioExiste) {
            alert("Já existe uma consulta nesse horário.");
            return;
        }
        await criarConsulta({
            pacienteId: pacienteSelecionado.id,
            pacienteNome: pacienteSelecionado.nome,
            data: data.toISOString(),
            status: "agendada"
        });
        setModalNovo(null);
        setPacienteSelecionado(null);
        setBuscaPaciente("");
        carregar();
    }

    async function cancelarConsulta(id) {

        if (!confirm("Cancelar consulta?")) return;

        await deletarConsulta(id);

        setModalConsulta(null);

        carregar();

    }

    async function finalizarConsulta(id) {
        await editarConsulta(id, {
            status: "realizada"
        });
        setModalConsulta(null);
        carregar();
    }

    async function marcarFalta(id) {
        await editarConsulta(id, {
            status: "faltou"
        });
        setModalConsulta(null);
        carregar();
    }

    const sugestoes = pacientes.filter(p =>
        (p.nome || "").toLowerCase().includes(buscaPaciente.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-2 md:gap-10">
                <div>
                    <p className="flex justify-center text-sm text-gray-500">
                        {periodoSemana()}
                    </p>
                </div>

                <div className="flex justify-center gap-2">
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

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="grid w-full border text-[10px] md:text-xs"
                        style={{
                            gridTemplateColumns: `${window.innerWidth < 768 ? "48px" : "80px"}
                                                    repeat(${dias.length}, minmax(0,1fr))`
                        }}
                    >
                        <div></div>

                        {dias.map((d, i) => (
                            <div key={i} className="border p-2 text-center">
                                <div className="font-medium text-[10px] md:text-base">
                                    {d.toLocaleDateString("pt-BR", { weekday: "short" })}
                                </div>
                                <div className="text-[7px] md:text-xs text-gray-500">
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
                                    const consultasSlot = consultasNoSlot(dia, h) || [];
                                    const disponivel = horarioDisponivel(dia, h);
                                    return (
                                        <div
                                            key={dia.toISOString() + h}
                                            className={`
    border
    h-12 
    p-[1px] md:p-1
    p-1
    text-xs
    flex
    flex-col
    gap-[2px]
    overflow-hidden
    ${!disponivel
                                                    ? "bg-gray-200 cursor-not-allowed"
                                                    : "hover:bg-indigo-50 cursor-pointer"
                                                }
`}
                                            onClick={() => {
                                                if (!disponivel) return;
                                                if (consultasSlot.length === 1) {

                                                    setModalConsulta(
                                                        consultasSlot[0]
                                                    );

                                                } else if (consultasSlot.length === 0) {

                                                    abrirNovo(dia, h);

                                                }
                                            }}
                                        >
                                            {consultasSlot.map(consulta => (
                                                <div
                                                    className={`
    ${coresStatus[consulta.status] || "bg-indigo-100"}
    rounded
    px-1
    py-[2px]
    border-l-4
    flex-1
    overflow-hidden
    min-h-0
    min-w-0
`}
                                                    style={{
                                                        borderLeftColor: consulta.corAgenda || "#6366f1"
                                                    }}
                                                >
                                                    <div className="font-medium truncate leading-none text-[8px] md:text-[10px]">
                                                        {nomePaciente(consulta.pacienteId)}
                                                    </div>

                                                    {consulta.psicologoNome && (
                                                        <div className="text-[7px] md:text-[8px] text-gray-600 truncate leading-none">
                                                            {consulta.psicologoNome}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
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

export default Agenda