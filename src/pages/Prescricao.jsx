import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { listarPacientes } from "../services/pacientesService";
import {
  listarPrescricoesPaciente,
  buscarMedicamentos,
  salvarPrescricao,
  deletarPrescricao
} from "../services/prescricoesService";

export default function Prescricao() {
  const [pacientes, setPacientes] = useState([]);
  const [buscaPaciente, setBuscaPaciente] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [buscaMedicamento, setBuscaMedicamento] = useState("");
  const [medicamentosResultados, setMedicamentosResultados] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const { pacienteId } = useParams();

  useEffect(() => {
    carregarPacientes()
  }, [])

  async function carregarPacientes() {
    const data = await listarPacientes()
    setPacientes(data)
  }

  async function handleBuscarMedicamento(nome) {
    setBuscaMedicamento(nome)
    if (nome.length < 2) {
      setMedicamentosResultados([])
      return
    }
    const data = await buscarMedicamentos(nome)
    setMedicamentosResultados(data)
  }

  async function carregarHistorico(id) {

    console.log("Buscando histórico do paciente:", id)

    const data = await listarPrescricoesPaciente(id)

    console.log("Histórico retornado:", data)

    setHistorico(data)

  }

  useEffect(() => {
    if (!pacienteSelecionado) return
    carregarHistorico(pacienteSelecionado.id)
  }, [pacienteSelecionado]);

  function adicionarMedicamento(m) {
    setMedicamentos([
      ...medicamentos,
      {
        nome: m.nome,
        dosagem: "",
        instrucoes: ""
      }
    ])
    setBuscaMedicamento("")
    setMedicamentosResultados([])
  }

  function atualizarMedicamento(index, campo, valor) {
    const lista = [...medicamentos]
    lista[index][campo] = valor
    setMedicamentos(lista)
  }

  function removerMedicamento(index) {
    const lista = medicamentos.filter((_, i) => i !== index)
    setMedicamentos(lista)
  }

  async function gerarImagem() {
    const el = document.getElementById("prescricao")
    const canvas = await html2canvas(el)
    const link = document.createElement("a")
    link.download = "prescricao.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  async function salvar() {
    console.log("clicou salvar")
    if (!pacienteSelecionado) {
      alert("Selecione um paciente")
      return
    }
    const data = {
      pacienteId: pacienteSelecionado.id,
      medicamentos: medicamentos.map(m => ({
        nome: m.nome,
        dosagem: m.dosagem || "",
        instrucoes: m.instrucoes || ""
      }))
    }
    console.log("dados enviados:", data)

    try {
      await salvarPrescricao(data)
      setMedicamentos([])
      await carregarHistorico(pacienteSelecionado.id)
      alert("Prescrição salva")
    } catch (err) {
      console.error("Erro ao salvar:", err.response?.data || err)
      alert("Erro ao salvar prescrição")
    }
  }

  const pacientesFiltrados = pacientes.filter(p =>
    p.nome?.toLowerCase().includes(buscaPaciente.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Prescrição
      </h1>
      {/* BUSCA PACIENTE */}
      <input
        placeholder="Buscar paciente"
        value={buscaPaciente}
        onChange={(e) => setBuscaPaciente(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <div className="border rounded max-h-40 overflow-y-auto">
        {pacientesFiltrados.map(p => (
          <div
            key={p.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setPacienteSelecionado(p)}
          >
            {p.nome}
          </div>

        ))}
      </div>

      {pacienteSelecionado && (
        <div className="text-sm text-gray-600">
          Paciente selecionado: <b>{pacienteSelecionado.nome}</b>
        </div>
      )}

      {/* BUSCA MEDICAMENTO */}
      <input
        placeholder="Buscar medicamento"
        value={buscaMedicamento}
        onChange={(e) => handleBuscarMedicamento(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <div className="border rounded max-h-40 overflow-y-auto">
        {medicamentosResultados.map(m => (
          <div
            key={m.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => adicionarMedicamento(m)}
          >
            {m.nome}
          </div>
        ))}
      </div>

      {/* RECEITA */}
      <div
        id="prescricao"
        className="border p-6 bg-white"
      >
        <h2 className="text-xl font-bold mb-4">
          Prescrição
        </h2>
        {pacienteSelecionado && (
          <p className="mb-4">
            Paciente: {pacienteSelecionado.nome}
          </p>
        )}
        {medicamentos.map((m, i) => (
          <div key={i} className="mb-3">
            <b>{m.nome}</b>
            <div className="flex gap-2 mt-1">
              <input
                placeholder="Dosagem"
                value={m.dosagem}
                onChange={(e) =>
                  atualizarMedicamento(i, "dosagem", e.target.value)
                }
                className="border px-2 py-1"
              />
              <input
                placeholder="Instruções"
                value={m.instrucoes}
                onChange={(e) =>
                  atualizarMedicamento(i, "instrucoes", e.target.value)
                }
                className="border px-2 py-1"
              />
              <button
                onClick={() => removerMedicamento(i)}
                className="text-red-500"
              >
                remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÕES */}
      <div className="flex gap-3">

        <button
          onClick={salvar}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>

        <button
          onClick={gerarImagem}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Baixar imagem
        </button>

      </div>

      <h2 className="text-lg font-semibold mt-6">
        Histórico de prescrições
      </h2>

      {historico.map((p) => (
        <div
          key={p.id}
          className="border rounded p-4 mt-2"
        >
          <p className="text-sm text-gray-500">
            {p.createdAt && new Date(
              p.createdAt.seconds ? p.createdAt.seconds * 1000 : p.createdAt
            ).toLocaleDateString()}
          </p>
          {p.medicamentos?.map((m, i) => (
            <div key={i}>
              <strong>{m.nome}</strong>
              <p>{m.dosagem}</p>
              <p>{m.instrucoes}</p>
            </div>
          ))}
          <button
            className="text-red-600 mt-2"
            onClick={async () => {

              if (!confirm("Excluir prescrição?")) return;

              await deletarPrescricao(p.id);
              carregarHistorico(pacienteSelecionado.id);
            }}
          >
            Excluir
          </button>
        </div>
      ))}
      {historico.length === 0 && (
        <p className="text-gray-500 mt-2">
          Nenhuma prescrição registrada para este paciente.
        </p>
      )}
    </div>
  )
}