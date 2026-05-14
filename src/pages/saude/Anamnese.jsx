import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { listarPacientes } from "../../services/pacientesService";
import { listarObservacoes, criarObservacao } from "../../services/observacoesService";
import Card from "../../components/Card";
import { auth } from "../../services/firebase";
import { useSegment } from "../../hooks/useSegment";
import { listarUsuarios } from "../../services/usersService";

function Anamnese() {
    const [user, setUser] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState("");
    const [observacoes, setObservacoes] = useState([]);
    const [novaObs, setNovaObs] = useState("");

    const segment = useSegment();
    const labels = segment.labels;
    const tenantId = segment.tenant?.id;

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

    function selecionarPaciente(e) {

        const id = e.target.value;

        setPacienteSelecionadoId(id);

        carregarObservacoes(id);
    }

    if (!user) return <p>Carregando usuário...</p>;

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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Anamnese
                </h1>

                <div className="mt-4">
                    <select
                        value={pacienteSelecionadoId}
                        onChange={selecionarPaciente}
                        className="border p-2 rounded w-full"
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

                {pacienteSelecionadoId && (
                    <Card>
                        <h2 className="font-semibold mb-3">{labels.observacoes} Clínicas</h2>

                        {observacoes.length > 0 ? (
                            <div className="space-y-3">
                                {observacoes.map(obs => (
                                    <div key={obs.id} className="border p-3 rounded bg-gray-50">
                                        <p className="text-xs text-gray-500">{obs.data}</p>
                                        <p className="text-sm">{obs.texto}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma {labels.observacao} registrada.</p>
                        )}

                        <div className="mt-4">
                            <textarea
                                value={novaObs}
                                onChange={(e) => setNovaObs(e.target.value)}
                                className="w-full border rounded p-2 text-sm"
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
            </div>
        </div>
    );
}

export default Anamnese;