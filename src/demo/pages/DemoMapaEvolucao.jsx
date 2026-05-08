import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    BarChart,
    Bar,
    Legend
} from "recharts";

export default function DemoMapaEvolucao() {

    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState("");
    const [dados, setDados] = useState([]);
    const [sintomaSelecionado, setSintomaSelecionado] = useState("humor");

    const pacientesMock = [
        {
            id: "1",
            nome: "Mariana Souza"
        },
        {
            id: "2",
            nome: "Carlos Henrique"
        },
        {
            id: "3",
            nome: "Fernanda Lima"
        }
    ];

    const evolucaoMock = {

        "1": [

            {
                sessao: 1,
                humor: 3,
                ansiedade: 9,
                estresse: 8,
                irritabilidade: 7,
                tristeza: 8,

                sono: 4,
                energia: 3,
                apetite: 5,

                concentracao: 3,
                pensamentosNegativos: 9,
                ruminacao: 8,

                produtividade: 2,
                interacaoSocial: 3,
                motivacao: 2,

                emocional: 2.8,
                fisiologico: 4,
                cognicao: 2.5,
                funcionamento: 2.3,
                saudeGeral: 2.9,

                observacoes:
                    "Paciente apresentou forte ansiedade e dificuldade para dormir.",

                dataSessao: "2026-01-05"
            },

            {
                sessao: 2,
                humor: 4,
                ansiedade: 8,
                estresse: 7,
                irritabilidade: 6,
                tristeza: 7,

                sono: 5,
                energia: 4,
                apetite: 5,

                concentracao: 4,
                pensamentosNegativos: 8,
                ruminacao: 7,

                produtividade: 3,
                interacaoSocial: 4,
                motivacao: 3,

                emocional: 3.5,
                fisiologico: 4.6,
                cognicao: 3.2,
                funcionamento: 3.3,
                saudeGeral: 3.6,

                observacoes:
                    "Pequena melhora emocional e maior participação nas sessões.",

                dataSessao: "2026-01-12"
            },

            {
                sessao: 3,
                humor: 6,
                ansiedade: 6,
                estresse: 5,
                irritabilidade: 4,
                tristeza: 5,

                sono: 7,
                energia: 6,
                apetite: 7,

                concentracao: 6,
                pensamentosNegativos: 5,
                ruminacao: 4,

                produtividade: 6,
                interacaoSocial: 6,
                motivacao: 6,

                emocional: 5.8,
                fisiologico: 6.6,
                cognicao: 5.6,
                funcionamento: 6,
                saudeGeral: 6,

                observacoes:
                    "Paciente apresentou melhora significativa na rotina.",

                dataSessao: "2026-01-19"
            },

            {
                sessao: 4,
                humor: 8,
                ansiedade: 3,
                estresse: 3,
                irritabilidade: 2,
                tristeza: 2,

                sono: 8,
                energia: 8,
                apetite: 8,

                concentracao: 8,
                pensamentosNegativos: 2,
                ruminacao: 2,

                produtividade: 8,
                interacaoSocial: 8,
                motivacao: 9,

                emocional: 8,
                fisiologico: 8,
                cognicao: 8,
                funcionamento: 8.3,
                saudeGeral: 8.1,

                observacoes:
                    "Paciente estabilizado emocionalmente e com ótima evolução.",

                dataSessao: "2026-01-26"
            }

        ],

        "2": [

            {
                sessao: 1,
                humor: 5,
                ansiedade: 7,
                estresse: 6,
                irritabilidade: 6,
                tristeza: 5,

                sono: 6,
                energia: 5,
                apetite: 6,

                concentracao: 5,
                pensamentosNegativos: 6,
                ruminacao: 5,

                produtividade: 5,
                interacaoSocial: 5,
                motivacao: 5,

                emocional: 4.8,
                fisiologico: 5.6,
                cognicao: 4.8,
                funcionamento: 5,
                saudeGeral: 5,

                observacoes:
                    "Quadro moderado de ansiedade social.",

                dataSessao: "2026-02-03"
            },

            {
                sessao: 2,
                humor: 5,
                ansiedade: 7,
                estresse: 6,
                irritabilidade: 5,
                tristeza: 5,

                sono: 6,
                energia: 5,
                apetite: 6,

                concentracao: 5,
                pensamentosNegativos: 5,
                ruminacao: 5,

                produtividade: 5,
                interacaoSocial: 6,
                motivacao: 5,

                emocional: 5,
                fisiologico: 5.6,
                cognicao: 5,
                funcionamento: 5.3,
                saudeGeral: 5.2,

                observacoes:
                    "Paciente começou exposição gradual em ambientes sociais.",

                dataSessao: "2026-02-10"
            },

            {
                sessao: 3,
                humor: 6,
                ansiedade: 6,
                estresse: 5,
                irritabilidade: 5,
                tristeza: 4,

                sono: 7,
                energia: 6,
                apetite: 6,

                concentracao: 6,
                pensamentosNegativos: 5,
                ruminacao: 4,

                produtividade: 6,
                interacaoSocial: 6,
                motivacao: 6,

                emocional: 5.8,
                fisiologico: 6.3,
                cognicao: 5.6,
                funcionamento: 6,
                saudeGeral: 5.9,

                observacoes:
                    "Melhora gradual da autoconfiança e redução da ansiedade.",

                dataSessao: "2026-02-17"
            },

            {
                sessao: 4,
                humor: 7,
                ansiedade: 5,
                estresse: 4,
                irritabilidade: 4,
                tristeza: 3,

                sono: 7,
                energia: 7,
                apetite: 7,

                concentracao: 7,
                pensamentosNegativos: 4,
                ruminacao: 3,

                produtividade: 7,
                interacaoSocial: 7,
                motivacao: 7,

                emocional: 6.8,
                fisiologico: 7,
                cognicao: 6.6,
                funcionamento: 7,
                saudeGeral: 6.8,

                observacoes:
                    "Paciente mais comunicativo e funcional no cotidiano.",

                dataSessao: "2026-02-24"
            }

        ],

        "3": [

            {
                sessao: 1,
                humor: 7,
                ansiedade: 4,
                estresse: 5,
                irritabilidade: 3,
                tristeza: 4,

                sono: 8,
                energia: 8,
                apetite: 7,

                concentracao: 7,
                pensamentosNegativos: 3,
                ruminacao: 3,

                produtividade: 8,
                interacaoSocial: 8,
                motivacao: 8,

                emocional: 7,
                fisiologico: 7.6,
                cognicao: 7,
                funcionamento: 8,
                saudeGeral: 7.4,

                observacoes:
                    "Paciente iniciou tratamento em bom estado funcional.",

                dataSessao: "2026-03-01"
            },

            {
                sessao: 2,
                humor: 4,
                ansiedade: 8,
                estresse: 8,
                irritabilidade: 7,
                tristeza: 7,

                sono: 4,
                energia: 4,
                apetite: 5,

                concentracao: 4,
                pensamentosNegativos: 8,
                ruminacao: 8,

                produtividade: 4,
                interacaoSocial: 3,
                motivacao: 3,

                emocional: 3,
                fisiologico: 4.3,
                cognicao: 2.6,
                funcionamento: 3.3,
                saudeGeral: 3.3,

                observacoes:
                    "Paciente relatou crise familiar intensa na semana.",

                dataSessao: "2026-03-08"
            },

            {
                sessao: 3,
                humor: 5,
                ansiedade: 7,
                estresse: 6,
                irritabilidade: 5,
                tristeza: 5,

                sono: 6,
                energia: 5,
                apetite: 6,

                concentracao: 5,
                pensamentosNegativos: 6,
                ruminacao: 6,

                produtividade: 5,
                interacaoSocial: 5,
                motivacao: 5,

                emocional: 4.8,
                fisiologico: 5.6,
                cognicao: 4.3,
                funcionamento: 5,
                saudeGeral: 4.9,

                observacoes:
                    "Quadro estabilizando após período crítico.",

                dataSessao: "2026-03-15"
            },

            {
                sessao: 4,
                humor: 6,
                ansiedade: 5,
                estresse: 5,
                irritabilidade: 4,
                tristeza: 4,

                sono: 7,
                energia: 6,
                apetite: 7,

                concentracao: 6,
                pensamentosNegativos: 5,
                ruminacao: 4,

                produtividade: 6,
                interacaoSocial: 6,
                motivacao: 6,

                emocional: 5.6,
                fisiologico: 6.6,
                cognicao: 5.6,
                funcionamento: 6,
                saudeGeral: 5.9,

                observacoes:
                    "Paciente retomando gradualmente a estabilidade emocional.",

                dataSessao: "2026-03-22"
            }

        ]

    };

    useEffect(() => {
        setPacientes(pacientesMock);
    }, []);

    function carregarDados(pacienteId) {

        const dadosMock =
            evolucaoMock[pacienteId] || [];

        setDados(dadosMock);

    }

    function selecionarPaciente(e) {
        const id = e.target.value;
        setPacienteSelecionado(id);
        carregarDados(id);
    }

    const ultimo = dados[dados.length - 1] || {};

    const radarData = [
        { area: "Emocional", valor: ultimo.emocional || 0 },
        { area: "Fisiológico", valor: ultimo.fisiologico || 0 },
        { area: "Cognição", valor: ultimo.cognicao || 0 },
        { area: "Funcionamento", valor: ultimo.funcionamento || 0 }
    ];

    const mapaPsicologico = [
        { nome: "Emocional", valor: ultimo.emocional || 0 },
        { nome: "Fisiológico", valor: ultimo.fisiologico || 0 },
        { nome: "Cognição", valor: ultimo.cognicao || 0 },
        { nome: "Funcionamento", valor: ultimo.funcionamento || 0 }
    ];

    const saudeGeral = ultimo.saudeGeral
        ? Math.round(ultimo.saudeGeral * 10)
        : 0;

    console.log(pacientes);

    return (
        <div className="p-6 space-y-10">

            <h1 className="text-2xl font-bold">
                Mapa de Evolução do Paciente
            </h1>

            {/* selecionar paciente */}
            <select
                value={pacienteSelecionado}
                onChange={selecionarPaciente}
                className="border p-2 rounded"
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

            {/* saúde mental geral */}
            <div className="bg-white p-6 rounded shadow text-center">

                <h2 className="text-lg font-semibold mb-2">
                    Índice Geral de Saúde Mental
                </h2>

                <p className="text-4xl font-bold">
                    {saudeGeral}%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    baseado nas últimas sessões registradas
                </p>

            </div>

            {/* evolução dimensões */}
            <div className="bg-white p-4 rounded shadow">

                <h2 className="font-semibold mb-4">
                    Evolução das Dimensões Psicológicas
                </h2>

                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={dados}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="sessao" />

                        <YAxis domain={[0, 10]} />

                        <Tooltip />

                        <Legend />

                        <Line type="monotone" dataKey="emocional" stroke="#ef4444" dot />
                        <Line type="monotone" dataKey="fisiologico" stroke="#3b82f6" dot />
                        <Line type="monotone" dataKey="cognicao" stroke="#10b981" dot />
                        <Line type="monotone" dataKey="funcionamento" stroke="#f59e0b" dot />

                    </LineChart>
                </ResponsiveContainer>

            </div>

            {/* radar + mapa */}
            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white p-4 rounded shadow">

                    <h2 className="font-semibold mb-4">
                        Estado psicológico atual
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>

                            <PolarGrid />

                            <PolarAngleAxis dataKey="area" />

                            <Radar
                                dataKey="valor"
                                stroke="#6366f1"
                                fill="#6366f1"
                                fillOpacity={0.6}
                            />

                        </RadarChart>
                    </ResponsiveContainer>

                </div>

                <div className="bg-white p-4 rounded shadow">

                    <h2 className="font-semibold mb-4">
                        Mapa psicológico
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mapaPsicologico}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="nome" />

                            <YAxis domain={[0, 10]} />

                            <Tooltip />

                            <Bar dataKey="valor" fill="#4f46e5" />

                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </div>

            {/* evolução por sintoma */}
            <div className="bg-white p-4 rounded shadow">

                <h2 className="font-semibold mb-4">
                    Evolução por sintoma
                </h2>

                <select
                    value={sintomaSelecionado}
                    onChange={(e) => setSintomaSelecionado(e.target.value)}
                    className="border p-2 rounded mb-4"
                >

                    <option value="humor">Humor</option>
                    <option value="ansiedade">Ansiedade</option>
                    <option value="estresse">Estresse</option>
                    <option value="irritabilidade">Irritabilidade</option>
                    <option value="tristeza">Tristeza</option>

                    <option value="sono">Sono</option>
                    <option value="energia">Energia</option>
                    <option value="apetite">Apetite</option>

                    <option value="concentracao">Concentração</option>
                    <option value="pensamentosNegativos">Pensamentos negativos</option>
                    <option value="ruminacao">Ruminação</option>

                    <option value="produtividade">Produtividade</option>
                    <option value="interacaoSocial">Interação social</option>
                    <option value="motivacao">Motivação</option>

                </select>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dados}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="sessao" />

                        <YAxis domain={[0, 10]} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey={sintomaSelecionado}
                            stroke="#6366f1"
                            dot
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>

            <div className="bg-white p-4 rounded shadow">

                <h2 className="font-semibold mb-4">
                    Histórico de Sessões
                </h2>

                <div className="space-y-4">

                    {dados.map((sessao) => (

                        <div
                            key={sessao.sessao}
                            className="border-l-4 border-indigo-500 pl-4"
                        >

                            <p className="font-semibold">
                                Sessão {sessao.sessao}
                            </p>

                            <p className="text-sm text-gray-500">
                                Humor: {sessao.humor} |
                                Ansiedade: {sessao.ansiedade} |
                                Estresse: {sessao.estresse}
                            </p>

                            <p className="mt-2 text-gray-700">
                                {sessao.observacoes || "Sem observações"}
                            </p>

                            <p className="text-xs text-gray-400 mb-2">
                                {sessao.dataSessao
                                    ? new Date(sessao.dataSessao).toLocaleDateString("pt-BR")
                                    : "Sem data"}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}