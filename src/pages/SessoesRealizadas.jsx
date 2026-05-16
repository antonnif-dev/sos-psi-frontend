import { useEffect, useState } from "react";
import { listarConsultas } from "../services/agendaService";
import { listarPacientes } from "../services/pacientesService";
import Card from "../components/Card";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    doc,
    getDoc
} from "firebase/firestore";

function SessoesRealizadas() {

    const [consultas, setConsultas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");

    const [buscaPaciente, setBuscaPaciente] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [status, setStatus] = useState("");

    const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
    const [modalAvisoAberto, setModalAvisoAberto] = useState(false);
    const [modalMensagemAberto, setModalMensagemAberto] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const tenantsSnapshot = await getDocs(
                    collection(db, "tenants")
                );

                for (const tenantDoc of tenantsSnapshot.docs) {
                    const userRef = doc(
                        db,
                        "tenants",
                        tenantDoc.id,
                        "usuarios",
                        u.uid
                    );

                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const data = userSnap.data();
                        setRole(data.role || "");
                        break;
                    }
                }

                setUser({
                    uid: u.uid,
                    email: u.email
                });

            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();

    }, []);

    async function carregar() {
        if (!user) return;

        const dados = await listarConsultas();
        const pacientesLista = await listarPacientes();

        if (role === "admin") {
            setConsultas(dados);
            setPacientes(pacientesLista);

        } else {
            const pacientesDoPsicologo =
                pacientesLista.filter(
                    p => p.psicologoUid === user.uid
                );

            const idsPacientes =
                pacientesDoPsicologo.map(p => p.id);

            const consultasFiltradas =
                dados.filter(c =>
                    idsPacientes.includes(c.pacienteId)
                );

            setConsultas(consultasFiltradas);
            setPacientes(pacientesDoPsicologo);
        }
    }

    useEffect(() => {
        carregar();
    }, [user, role]);

    function nomePaciente(id) {
        const p = pacientes.find(p => p.id === id);
        return p ? p.nome : "";
    }

    function filtrarConsultas() {

        return consultas
            .filter(c => {

                if (status && c.status !== status)
                    return false;

                const nome = nomePaciente(c.pacienteId).toLowerCase();

                if (!nome.includes(buscaPaciente.toLowerCase()))
                    return false;

                const dataConsulta = new Date(c.data);

                if (dataInicio) {
                    if (dataConsulta < new Date(dataInicio))
                        return false;
                }

                if (dataFim) {
                    const fim = new Date(dataFim);
                    fim.setHours(23, 59, 59);

                    if (dataConsulta > fim)
                        return false;
                }

                return true;

            })
            .sort((a, b) => new Date(b.data) - new Date(a.data));

    }

    const sessoes = filtrarConsultas();

    const realizadas = consultas.filter(c => c.status === "realizada").length;
    const faltas = consultas.filter(c => c.status === "faltou").length;
    const canceladas = consultas.filter(c => c.status === "cancelada").length;

    const coresStatus = {
        realizada: "bg-green-100 text-green-800",
        faltou: "bg-yellow-100 text-yellow-800",
        cancelada: "bg-red-100 text-red-800",
        agendada: "bg-indigo-100 text-indigo-800"
    };

    function abrirModalAviso(sessao) {
        setSessaoSelecionada(sessao);
        setModalAvisoAberto(true);
    }

    function gerarMensagemLembrete(sessao) {
        const nome = nomePaciente(sessao.pacienteId);
        const d = new Date(sessao.data);
        const data = d.toLocaleDateString("pt-BR");
        const hora = d.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        return `Olá ${nome}, passando para lembrar da sua sessão de psicoterapia agendada para ${data} às ${hora}.`;
    }

    function gerarMensagemConfirmacao(sessao) {
        const nome = nomePaciente(sessao.pacienteId);
        const d = new Date(sessao.data);
        const data = d.toLocaleDateString("pt-BR");
        const hora = d.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        return `Olá ${nome}, poderia confirmar sua presença na sessão agendada para ${data} às ${hora}?`;
    }

    function abrirLembrete() {
        const msg = gerarMensagemLembrete(sessaoSelecionada);
        setMensagem(msg);
        setTipoMensagem("lembrete");
        setModalMensagemAberto(true);
    }

    function abrirConfirmacao() {
        const msg = gerarMensagemConfirmacao(sessaoSelecionada);
        setMensagem(msg);
        setTipoMensagem("confirmacao");
        setModalMensagemAberto(true);
    }

    function telefonePaciente(id) {
        const p = pacientes.find(p => p.id === id);
        return p ? p.telefone : "";
    }

    function enviarWhatsapp() {
        const telefone = telefonePaciente(sessaoSelecionada.pacienteId);
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    function enviarWhatsappWeb() {
        const telefone = telefonePaciente(sessaoSelecionada.pacienteId);
        const url = `https://web.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    function enviarSkedit() {
        const telefone = telefonePaciente(sessaoSelecionada.pacienteId);
        const url = `skedit://send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
        window.open(url);
    }

    function copiarMensagem() {
        navigator.clipboard.writeText(mensagem);
        alert("Mensagem copiada!");
    }

    function gerarMensagemRealizada(sessao) {
        const nome = nomePaciente(sessao.pacienteId);
        return `Olá ${nome}, foi um prazer ter você na sessão de hoje. Espero que tenha sido um momento produtivo para você. As portas estão sempre abertas caso deseje continuar seu processo terapêutico.`;
    }

    function gerarMensagemFalta(sessao) {
        const nome = nomePaciente(sessao.pacienteId);
        return `Olá ${nome}, senti sua ausência na sessão que estava agendada. Caso deseje remarcar ou continuar o acompanhamento, fico à disposição para encontrarmos um novo horário.`;
    }

    function gerarMensagemCancelamento(sessao) {
        const nome = nomePaciente(sessao.pacienteId);
        return `Olá ${nome}, lamento que nossa sessão não tenha acontecido desta vez. Caso queira remarcar ou continuar o acompanhamento, fico à disposição para encontrarmos um novo horário.`;
    }

    function abrirMensagemRealizada(sessao) {
        setSessaoSelecionada(sessao);
        const msg = gerarMensagemRealizada(sessao);
        setMensagem(msg);
        setTipoMensagem("realizada");
        setModalMensagemAberto(true);
    }

    function abrirMensagemFalta(sessao) {
        setSessaoSelecionada(sessao);
        const msg = gerarMensagemFalta(sessao);
        setMensagem(msg);
        setTipoMensagem("falta");
        setModalMensagemAberto(true);
    }

    function abrirMensagemCancelada(sessao) {
        setSessaoSelecionada(sessao);
        const msg = gerarMensagemCancelamento(sessao);
        setMensagem(msg);
        setTipoMensagem("cancelada");
        setModalMensagemAberto(true);
    }

    return (
        <div className="space-y-8">
            <h1 className="text-xl font-semibold">
                Atendimentos
            </h1>

            {/* MÉTRICAS */}
            <div className="grid md:grid-cols-3 gap-4">
                <Card>
                    <p className="text-sm text-gray-500">Sessões realizadas</p>
                    <p className="text-2xl font-bold">{realizadas}</p>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Faltas</p>
                    <p className="text-2xl font-bold">{faltas}</p>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Canceladas</p>
                    <p className="text-2xl font-bold">{canceladas}</p>
                </Card>
            </div>

            {/* FILTROS */}
            <Card>
                <div className="grid md:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Buscar paciente"
                        className="border p-2 rounded"
                        value={buscaPaciente}
                        onChange={e => setBuscaPaciente(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dataInicio}
                        onChange={e => setDataInicio(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dataFim}
                        onChange={e => setDataFim(e.target.value)}
                    />
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Todos status</option>
                        <option value="realizada">Realizada</option>
                        <option value="faltou">Faltou</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="agendada">Agendada</option>
                    </select>
                </div>
            </Card>

            {/* TABELA */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-2">Paciente</th>
                                <th className="text-left p-2">Data</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-left p-2">Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {sessoes.map(s => {

                                const d = new Date(s.data);

                                return (

                                    <tr
                                        key={s.id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-2">
                                            {nomePaciente(s.pacienteId)}
                                        </td>

                                        <td className="p-2">
                                            <div>
                                                <div>
                                                    {d.toLocaleDateString("pt-BR")}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {d.toLocaleTimeString("pt-BR", {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-2">
                                            <span className={`px-2 py-1 rounded text-xs ${coresStatus[s.status]}`}>
                                                {s.status}
                                            </span>
                                        </td>

                                        <td className="p-2 flex gap-2">
                                            {s.status === "agendada" && (
                                                <button
                                                    className="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700"
                                                    onClick={() => abrirModalAviso(s)}
                                                >
                                                    Avisar
                                                </button>
                                            )}

                                            {s.status === "realizada" && (
                                                <button
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                                                    onClick={() => abrirMensagemRealizada(s)}
                                                >
                                                    Agradecer
                                                </button>
                                            )}

                                            {s.status === "faltou" && (
                                                <button
                                                    className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700"
                                                    onClick={() => abrirMensagemFalta(s)}
                                                >
                                                    Remarcar
                                                </button>
                                            )}

                                            {s.status === "cancelada" && (
                                                <button
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                                                    onClick={() => abrirMensagemCancelada(s)}
                                                >
                                                    Remarcar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {modalAvisoAberto && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-40"
                    onClick={() => setModalAvisoAberto(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-[400px] space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold">
                            Avisar Paciente
                        </h2>

                        <p className="text-sm text-gray-500">
                            Escolha o tipo de mensagem
                        </p>

                        <div className="flex gap-3">

                            <button
                                className="flex-1 bg-indigo-600 text-white p-2 rounded"
                                onClick={abrirLembrete}
                            >
                                Lembrete
                            </button>

                            <button
                                className="flex-1 bg-green-600 text-white p-2 rounded"
                                onClick={abrirConfirmacao}
                            >
                                Confirmação
                            </button>

                        </div>

                        <button
                            className="text-sm text-gray-500"
                            onClick={() => setModalAvisoAberto(false)}
                        >
                            Fechar
                        </button>

                    </div>

                </div>

            )}

            {modalMensagemAberto && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-40"
                    onClick={() => setModalMensagemAberto(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-[500px] space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold">
                            {tipoMensagem === "lembrete" ? "Lembrete de Sessão" : "Confirmação de Sessão"}
                        </h2>

                        <textarea
                            className="w-full border rounded p-2 h-32"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                className="bg-green-600 text-white p-2 rounded"
                                onClick={enviarWhatsapp}
                            >
                                Whatsapp
                            </button>

                            <button
                                className="bg-green-800 text-white p-2 rounded"
                                onClick={enviarWhatsappWeb}
                            >
                                Whatsapp Web
                            </button>

                            <button
                                className="bg-blue-600 text-white p-2 rounded"
                                onClick={enviarSkedit}
                            >
                                Skedit
                            </button>

                            <button
                                className="bg-gray-600 text-white p-2 rounded"
                                onClick={copiarMensagem}
                            >
                                Copiar
                            </button>
                        </div>

                        <button
                            className="text-sm text-gray-500"
                            onClick={() => setModalMensagemAberto(false)}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SessoesRealizadas;