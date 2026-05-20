import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { listarPacientes } from "../services/pacientesService";
import { listarObservacoes, criarObservacao } from "../services/observacoesService";
import Card from "../components/Card";
import { auth } from "../services/firebase";
import { useSegment } from "../hooks/useSegment";
import { listarUsuarios } from "../services/usersService";
import { useTenant } from "../hooks/useTenant";
import { listarProcessos } from "../services/profissionais/processosService";

function Anamnese() {
    const [user, setUser] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState("");

    const [observacoes, setObservacoes] = useState([]);
    const [novaObs, setNovaObs] = useState("");
    const [observacoesProcesso, setObservacoesProcesso] = useState([]);
    const [novaObsProcesso, setNovaObsProcesso] = useState("");

    const [processos, setProcessos] = useState([]);
    const [processoSelecionadoId, setProcessoSelecionadoId] = useState("");
    const [processo, setProcesso] = useState(null);

    const segment = useSegment();
    const labels = segment.labels;
    const tenantId = segment.tenant?.id;
    const tenant = useTenant();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (!u) {

                setUser(null);
                return;
            }

            try {
                const usuarios = await listarUsuarios();

                const usuarioAtual = usuarios.find(
                    usuario => usuario.uid === u.uid
                );

                setUser({
                    uid: u.uid,
                    email: u.email,
                    role: usuarioAtual?.role || ""
                });

            } catch (err) {

                console.error("ERRO AO CARREGAR USER:", err);
            }
        });

        return () => unsubscribe();

    }, []);

    useEffect(() => {
        if (!user || !tenantId) return;

        async function carregarPaciente() {
            try {
                const data = await listarPacientes(tenantId);
                setPacientes(data);

                const usuarios = await listarUsuarios();

            } catch (err) {
                console.error("ERRO:", err);
            }
        }

        carregarPaciente();
    }, [user, tenantId]);

    useEffect(() => {
        if (!user || !tenantId) return;

        async function carregarDados() {
            try {
                if (tenant?.segmento === "saude") {
                    const data = await listarPacientes(tenantId);
                    setPacientes(data);
                }

                if (tenant?.segmento === "profissionais") {
                    const data = await listarProcessos(tenantId);
                    setProcessos(data);
                }

            } catch (err) {
                console.error("ERRO:", err);
            }
        }

        carregarDados();
    }, [user, tenantId, tenant?.segmento]);

    async function carregarObservacoes(pacienteId) {

        if (!pacienteId || !tenantId) return;

        try {

            const pacienteEncontrado = pacientes.find(
                p => p.id === pacienteId
            );

            setPaciente(pacienteEncontrado || null);

            const obs = await listarObservacoes(
                tenantId,
                pacienteId
            );

            setObservacoes(obs);

        } catch (err) {

            console.error("ERRO AO CARREGAR OBSERVAÇÕES:", err);
        }
    }

    async function carregarObservacoesProcesso(processoId) {
        if (!processoId || !tenantId) return;

        const obs = await listarObservacoes(tenantId, processoId);
        setObservacoesProcesso(obs);
    }

    function selecionarPaciente(e) {

        const id = e.target.value;

        setPacienteSelecionadoId(id);

        carregarObservacoes(id);
    }

    if (!user) return <p>Carregando usuário...</p>;

    function selecionarProcesso(e) {
        const id = e.target.value;

        setProcessoSelecionadoId(id);

        carregarObservacoesProcesso(id);
    }

    async function carregarObservacoesProcesso(processoId) {
        if (!processoId || !tenantId) return;

        try {
            const processoEncontrado = processos.find(
                p => p.id === processoId
            );

            setProcesso(processoEncontrado || null);

            const obs = await listarObservacoes(
                tenantId,
                processoId
            );

            setObservacoes(obs);

        } catch (err) {
            console.error("ERRO AO CARREGAR OBSERVAÇÕES:", err);
        }
    }

    async function salvarObservacao() {
        if (!novaObs.trim() || !tenantId) return;

        await criarObservacao(
            tenantId,
            pacienteSelecionadoId,
            novaObs
        );

        const obs = await listarObservacoes(
            tenantId,
            pacienteSelecionadoId
        );
        setObservacoes(obs);

        setNovaObs("");
    }

    async function salvarObservacaoProcesso() {
        if (!novaObsProcesso.trim() || !tenantId || !processoSelecionadoId) return;

        await criarObservacao(
            tenantId,
            processoSelecionadoId,
            novaObsProcesso
        );

        const obs = await listarObservacoes(
            tenantId,
            processoSelecionadoId
        );

        setObservacoesProcesso(obs);
        setNovaObsProcesso("");
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-800">
                        {labels.anamneses}
                    </h1>

                    <p className="text-slate-500">
                        Registre observações, evolução clínica e informações relevantes do paciente.
                    </p>
                </div>

                {tenant?.segmento === "saude" && (
                    <div className="mt-4">
                        <select
                            value={pacienteSelecionadoId}
                            onChange={selecionarPaciente}
                            className="
    w-full
    rounded-2xl
    border
    border-slate-200
    bg-white
    px-4
    py-3
    text-slate-700
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
"
                        >
                            <option value="">
                                Selecionar paciente
                            </option>

                            {pacientes.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {tenant?.segmento === "profissionais" && (
                    <div className="mt-4">
                        <select
                            value={processoSelecionadoId}
                            onChange={selecionarProcesso}
                            className="
    w-full
    rounded-2xl
    border
    border-slate-200
    bg-white
    px-4
    py-3
    text-slate-700
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
"
                        >
                            <option value="">
                                Selecionar processo
                            </option>

                            {processos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.titulo || p.numeroProcesso}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {pacienteSelecionadoId && (
                    <Card className="rounded-3xl border border-slate-200 shadow-md">
                        <h2 className="font-semibold mb-3">{labels.observacoes} Clínicas</h2>

                        {observacoes.length > 0 ? (
                            <div className="space-y-3">
                                {observacoes.map(obs => (
                                    <div
                                        key={obs.id}
                                        className="
        relative
        border-l-4
        border-indigo-500
        bg-slate-50
        rounded-2xl
        px-4
        py-4
        shadow-sm
    "
                                    >
                                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                                            {obs.data}
                                        </p>
                                        <p className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                                            {obs.texto}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma {labels.observacao} registrada.</p>
                        )}

                        <div className="pt-6 mt-6">
                            <textarea
                                value={novaObs}
                                onChange={(e) => setNovaObs(e.target.value)}
                                className="
    w-full
    min-h-[140px]
    rounded-2xl
    border
    border-slate-200
    bg-slate-50
    p-4
    text-sm
    shadow-inner
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
"
                                placeholder="Adicionar nova observação..."
                            />

                            <button
                                onClick={salvarObservacao}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            >
                                Salvar {labels.observacao}
                            </button>
                        </div>
                    </Card>
                )}

                {processoSelecionadoId && (
                    <Card className="rounded-3xl border border-slate-200 shadow-md">
                        <h2 className="font-semibold mb-3">{labels.observacoes} do Processo</h2>

                        {observacoesProcesso.length > 0 ? (
                            <div className="space-y-3">
                                {observacoesProcesso.map(obs => (
                                    <div
                                        key={obs.id}
                                        className="relative border-l-4 border-indigo-500 bg-slate-50 rounded-2xl px-4 py-4 shadow-sm"
                                    >
                                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                                            {obs.data}
                                        </p>
                                        <p className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                                            {obs.texto}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Nenhuma {labels.observacao} registrada.
                            </p>
                        )}

                        <div className="pt-6 mt-6">
                            <textarea
                                value={novaObsProcesso}
                                onChange={(e) => setNovaObsProcesso(e.target.value)}
                                className="w-full min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Adicionar nova observação..."
                            />

                            <button
                                onClick={salvarObservacaoProcesso}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            >
                                Salvar {labels.observacao}
                            </button>
                        </div>
                    </Card>
                )}
                
            </div>
        </div>
    );
}

export default Anamnese;