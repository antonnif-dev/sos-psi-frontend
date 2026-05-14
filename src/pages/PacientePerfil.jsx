import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarPacientes } from "../services/pacientesService";
import { listarObservacoes, criarObservacao } from "../services/observacoesService";
import Card from "../components/Card";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSegment } from "../hooks/useSegment";
import { listarUsuarios } from "../services/usersService";
import { alterarPsicologoPaciente } from "../services/pacientesService";

function PacientePerfil() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [observacoes, setObservacoes] = useState([]);
    const [novaObs, setNovaObs] = useState("");
    const [role, setRole] = useState(null);

    const [psicologos, setPsicologos] = useState([]);
    const [psicologoResponsavel, setPsicologoResponsavel] = useState(null);

    const segment = useSegment();
    const labels = segment.labels;
    const tenantId = segment.tenant?.id;
    //const tenantId = tenant?.id;

    // observar autenticação
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

    // carregar paciente quando user estiver definido
    useEffect(() => {

        if (!user || !tenantId) return;

        async function carregarPaciente() {

            try {

                // PACIENTE
                const data = await listarPacientes(tenantId);

                const pacienteEncontrado = data.find(
                    p => p.id === id
                );

                setPaciente(pacienteEncontrado || {});

                // USUÁRIOS
                const usuarios = await listarUsuarios();

                const psicologosTenant = usuarios.filter(
                    u => u.role === "psicologo"
                );

                setPsicologos(psicologosTenant);

                // PSICÓLOGO RESPONSÁVEL
                const psicologoAtual = psicologosTenant.find(
                    psic => psic.uid === pacienteEncontrado?.psicologoId
                );

                setPsicologoResponsavel(psicologoAtual || null);

                // OBSERVAÇÕES
                const obs = await listarObservacoes(
                    tenantId,
                    id
                );

                setObservacoes(obs);

            } catch (err) {

                console.error("ERRO:", err);
            }
        }

        carregarPaciente();

    }, [user, id, tenantId]);

    if (!user) return <p>Carregando usuário...</p>;
    if (!paciente) return <p>Carregando paciente...</p>;

    const endereco = paciente.endereco || {};

    async function salvarObservacao() {
        if (!novaObs.trim() || !tenantId) return;

        await criarObservacao(tenantId, id, novaObs);

        const obs = await listarObservacoes(tenantId, id);
        setObservacoes(obs);

        setNovaObs("");
    }

    async function trocarPsicologo(novoPsicologoId) {
        try {

            await alterarPsicologoPaciente(
                paciente.id,
                novoPsicologoId
            );

            const psicologoNovo = psicologos.find(
                p => p.uid === novoPsicologoId
            );

            setPsicologoResponsavel(psicologoNovo);

            setPaciente(prev => ({
                ...prev,
                psicologoId: novoPsicologoId
            }));

            alert("Psicólogo responsável alterado com sucesso!");

        } catch (err) {
            console.error(err);
            alert("Erro ao alterar psicólogo responsável.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">{paciente.nome || "Sem nome"}</h1>

            <Card>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p><b>Telefone:</b> {paciente.telefone || "-"}</p>
                        <p><b>Email:</b> {paciente.email || "-"}</p>
                        <p><b>Data de Nascimento:</b> {paciente.dataNascimento || "-"}</p>
                        <p><b>CPF:</b> {paciente.cpf || "-"}</p>
                    </div>
                    <div>
                        <p><b>Profissão:</b> {paciente.profissao || "-"}</p>
                        <p><b>Status:</b> {paciente.status || "-"}</p>
                        <p>
                            <b>Psicólogo Responsável:</b>{" "}

                            {user?.role === "admin" ? (

                                <select
                                    value={paciente.psicologoId || ""}
                                    onChange={(e) => trocarPsicologo(e.target.value)}
                                    className="border rounded px-2 py-1"
                                >

                                    <option value="">
                                        Selecione
                                    </option>

                                    {psicologos.map((psic) => (

                                        <option
                                            key={psic.uid}
                                            value={psic.uid}
                                        >
                                            {psic.nome}
                                        </option>

                                    ))}

                                </select>

                            ) : (

                                psicologoResponsavel?.nome || "-"

                            )}
                        </p>
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">Endereço</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <p><b>CEP:</b> {endereco.cep || "-"}</p>
                    <p><b>Rua:</b> {endereco.rua || "-"}</p>
                    <p><b>Número:</b> {endereco.numero || "-"}</p>
                    <p><b>Bairro:</b> {endereco.bairro || "-"}</p>
                    <p><b>Cidade:</b> {endereco.cidade || "-"}</p>
                    <p><b>Estado:</b> {endereco.estado || "-"}</p>
                    <p><b>Complemento:</b> {endereco.complemento || "-"}</p>
                </div>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">Status do Paciente</h2>
                <p><b>Valor da Sessão:</b> {paciente.valorSessao || "-"}</p>
                <p><b>Status:</b> {paciente.status || "-"}</p>
                <p><b>Frequência:</b> {paciente.frequencia || "-"}</p>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">{labels.observacoes} Iniciais</h2>
                <p className="text-sm text-gray-600">
                    {paciente.observacoesIniciais || "Sem observações iniciais"}
                </p>
            </Card>

            <h2>Espaço para adcionar novas observações</h2>
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
        </div>
    );
}

export default PacientePerfil;