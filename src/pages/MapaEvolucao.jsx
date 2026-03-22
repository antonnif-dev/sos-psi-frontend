import { useEffect, useState } from "react";
import { listarProntuarios } from "../services/prontuarioService";
import { listarPacientes } from "../services/pacientesService";

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

export default function MapaEvolucao() {

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [dados, setDados] = useState([]);
  const [sintomaSelecionado, setSintomaSelecionado] = useState("humor");

  useEffect(() => {
    carregarPacientes();
  }, []);

  async function carregarPacientes() {
    const res = await listarPacientes();
    setPacientes(res);
  }

  async function carregarDados(pacienteNome) {

    const prontuarios = await listarProntuarios();

    const filtrado = prontuarios
      .filter((p) => p.paciente === pacienteNome)
      .sort((a, b) => new Date(a.dataSessao) - new Date(b.dataSessao));

    const formatado = filtrado.map((p, index) => {

      const humor = Number(p.humor || 0);
      const ansiedade = Number(p.ansiedade || 0);
      const estresse = Number(p.estresse || 0);
      const irritabilidade = Number(p.irritabilidade || 0);
      const tristeza = Number(p.tristeza || 0);

      const sono = Number(p.sono || 0);
      const energia = Number(p.energia || 0);
      const apetite = Number(p.apetite || 0);

      const concentracao = Number(p.concentracao || 0);
      const pensamentosNegativos = Number(p.pensamentosNegativos || 0);
      const ruminacao = Number(p.ruminacao || 0);

      const produtividade = Number(p.produtividade || 0);
      const interacaoSocial = Number(p.interacaoSocial || 0);
      const motivacao = Number(p.motivacao || 0);

      const emocional =
        (humor +
          (10 - ansiedade) +
          (10 - estresse) +
          (10 - irritabilidade) +
          (10 - tristeza)) / 5;

      const fisiologico =
        (sono + energia + apetite) / 3;

      const cognicao =
        (concentracao +
          (10 - pensamentosNegativos) +
          (10 - ruminacao)) / 3;

      const funcionamento =
        (produtividade +
          interacaoSocial +
          motivacao) / 3;

      const saudeGeral =
        (emocional +
          fisiologico +
          cognicao +
          funcionamento) / 4;

      return {
        sessao: index + 1,

        humor,
        ansiedade,
        estresse,
        irritabilidade,
        tristeza,

        sono,
        energia,
        apetite,

        concentracao,
        pensamentosNegativos,
        ruminacao,

        produtividade,
        interacaoSocial,
        motivacao,

        emocional,
        fisiologico,
        cognicao,
        funcionamento,
        saudeGeral,

        observacoes: p.observacoes,
        dataSessao: p.dataSessao
      };
    });

    setDados(formatado);
  }

  function selecionarPaciente(e) {
    const nome = e.target.value;
    setPacienteSelecionado(nome);
    carregarDados(nome);
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
          <option key={p.id} value={p.nome}>
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