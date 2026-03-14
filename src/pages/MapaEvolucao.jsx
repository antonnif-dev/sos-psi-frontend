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

  useEffect(() => {
    carregarPacientes();
  }, []);

  async function carregarPacientes() {
    const res = await listarPacientes();
    setPacientes(res);
  }

  async function carregarDados(pacienteId) {
    const prontuarios = await listarProntuarios();

    const filtrado = prontuarios.filter(
      (p) => p.paciente === pacienteId
    );

    const formatado = filtrado.map((p) => ({
      data: new Date(p.dataSessao).toLocaleDateString(),
      humor: Number(p.humor || 0),
      ansiedade: Number(p.ansiedade || 0),
      estresse: Number(p.estresse || 0),
      sono: Number(p.sono || 0)
    }));

    setDados(formatado);
  }

  function selecionarPaciente(e) {
    const id = e.target.value;
    setPacienteSelecionado(id);
    carregarDados(id);
  }

  const ultimo = dados[dados.length - 1] || {};

  const radarData = [
    { area: "Humor", valor: ultimo.humor || 0 },
    { area: "Ansiedade", valor: ultimo.ansiedade || 0 },
    { area: "Estresse", valor: ultimo.estresse || 0 },
    { area: "Sono", valor: ultimo.sono || 0 }
  ];

  const mapaPsicologico = [
    { nome: "Ansiedade", valor: ultimo.ansiedade || 0 },
    { nome: "Humor", valor: ultimo.humor || 0 },
    { nome: "Sono", valor: ultimo.sono || 0 },
    { nome: "Estresse", valor: ultimo.estresse || 0 }
  ];

  const saudeGeral = dados.length
    ? Math.round(
        (
          ultimo.humor +
          (10 - ultimo.ansiedade) +
          (10 - ultimo.estresse) +
          ultimo.sono
        ) /
          4 *
          10
      )
    : 0;

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">
        Mapa de Evolução do Paciente
      </h1>

      {/* seleção de paciente */}
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

      {/* evolução temporal */}
      <div className="bg-white p-4 rounded shadow">

        <h2 className="font-semibold mb-4">
          Evolução Temporal
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={dados}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="data" />

            <YAxis domain={[0, 10]} />

            <Tooltip />

            <Legend />

            <Line dataKey="humor" stroke="#10b981" />
            <Line dataKey="ansiedade" stroke="#ef4444" />
            <Line dataKey="estresse" stroke="#f59e0b" />
            <Line dataKey="sono" stroke="#3b82f6" />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* radar + mapa */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* radar chart */}
        <div className="bg-white p-4 rounded shadow">

          <h2 className="font-semibold mb-4">
            Estado emocional atual
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

        {/* mapa psicológico */}
        <div className="bg-white p-4 rounded shadow">

          <h2 className="font-semibold mb-4">
            Mapa psicológico
          </h2>

          <p className="text-lg mb-4">
            Saúde mental geral: <b>{saudeGeral}%</b>
          </p>

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

    </div>
  );
}