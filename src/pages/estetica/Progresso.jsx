import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes } from "../../services/pacientesService";
import {
  listarProgresso,
  criarProgresso,
  editarProgresso,
  deletarProgresso
} from "../../services/estetica/progressoService";

function Progresso() {
  const [registros, setRegistros] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [pesoAtual, setPesoAtual] = useState("");
  const [medidas, setMedidas] = useState("");
  const [performance, setPerformance] = useState("");
  const [editando, setEditando] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);

  async function carregar() {
    const dados = await listarProgresso();
    setRegistros(dados);
  }

  useEffect(() => {
    carregar();

    async function carregarClientes() {
      const dados = await listarPacientes();
      setClientes(dados);
    }

    carregarClientes();
  }, []);

  function buscarCliente(texto) {
    setCliente(texto);

    if (!texto) {
      setSugestoes([]);
      return;
    }

    const filtrados = clientes.filter(c =>
      c.nome.toLowerCase().startsWith(texto.toLowerCase())
    );

    setSugestoes(filtrados.slice(0, 5));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      cliente,
      pesoAtual,
      medidas,
      performance
    };

    if (editando) {
      await editarProgresso(editando, data);
    } else {
      await criarProgresso(data);
    }

    setCliente("");
    setPesoAtual("");
    setMedidas("");
    setPerformance("");
    setEditando(null);

    carregar();
  }

  function iniciarEdicao(r) {
    setCliente(r.cliente);
    setPesoAtual(r.pesoAtual);
    setMedidas(r.medidas);
    setPerformance(r.performance);
    setEditando(r.id);
  }

  async function remover(id) {
    if (!confirm("Excluir registro?")) return;
    await deletarProgresso(id);
    carregar();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Progresso
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Acompanhamento da evolução corporal
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Registros de progresso
          </p>
          <p className="text-3xl font-semibold mt-2">
            {registros.length}
          </p>
        </div>
      </div>

      <Card>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-5 gap-3"
        >
          <div className="relative">
            <input
              placeholder="Cliente"
              value={cliente}
              onChange={(e) => buscarCliente(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            {sugestoes.length > 0 && (
              <div className="absolute bg-white border rounded-lg shadow w-full z-10">
                {sugestoes.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCliente(c.nome);
                      setSugestoes([]);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {c.nome}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            placeholder="Peso atual"
            value={pesoAtual}
            onChange={(e) => setPesoAtual(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Medidas"
            value={medidas}
            onChange={(e) => setMedidas(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Performance"
            value={performance}
            onChange={(e) => setPerformance(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button className="bg-green-600 text-white rounded-lg px-4 py-2">
            {editando ? "Salvar" : "Registrar"}
          </button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {registros.map(r => (
          <div
            key={r.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <p className="font-semibold">{r.cliente}</p>
            <p>Peso: {r.pesoAtual}kg</p>
            <p>Medidas: {r.medidas}</p>
            <p>Performance: {r.performance}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => iniciarEdicao(r)}
                className="text-blue-600"
              >
                Editar
              </button>

              <button
                onClick={() => remover(r.id)}
                className="text-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progresso;