import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { listarPacientes } from "../../services/pacientesService";
import {
  listarAvaliacoes,
  criarAvaliacao,
  editarAvaliacao,
  deletarAvaliacao
} from "../../services/estetica/avaliacaoFisicaService";

function AvaliacaoFisica() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [gordura, setGordura] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [editando, setEditando] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);

  async function carregar() {
    const dados = await listarAvaliacoes();
    setAvaliacoes(dados);
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
    if (!texto) return setSugestoes([]);
    const filtrados = clientes.filter(c =>
      c.nome.toLowerCase().startsWith(texto.toLowerCase())
    );
    setSugestoes(filtrados.slice(0, 5));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      cliente,
      peso,
      altura,
      gordura,
      objetivo
    };

    if (editando) {
      await editarAvaliacao(editando, data);
    } else {
      await criarAvaliacao(data);
    }

    setCliente("");
    setPeso("");
    setAltura("");
    setGordura("");
    setObjetivo("");
    setEditando(null);

    carregar();
  }

  function iniciarEdicao(a) {
    setCliente(a.cliente);
    setPeso(a.peso);
    setAltura(a.altura);
    setGordura(a.gordura);
    setObjetivo(a.objetivo);
    setEditando(a.id);
  }

  async function remover(id) {
    if (!confirm("Excluir avaliação?")) return;
    await deletarAvaliacao(id);
    carregar();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Avaliação Física
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Controle de avaliações corporais
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total de avaliações</p>
          <p className="text-3xl font-semibold mt-2">
            {avaliacoes.length}
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
            placeholder="Peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="% Gordura"
            value={gordura}
            onChange={(e) => setGordura(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Objetivo"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
            {editando ? "Salvar" : "Registrar"}
          </button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {avaliacoes.map(a => (
          <div
            key={a.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <p className="font-semibold">{a.cliente}</p>
            <p>Peso: {a.peso}kg</p>
            <p>Altura: {a.altura}m</p>
            <p>Gordura: {a.gordura}%</p>
            <p>Objetivo: {a.objetivo}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => iniciarEdicao(a)}
                className="text-blue-600"
              >
                Editar
              </button>

              <button
                onClick={() => remover(a.id)}
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

export default AvaliacaoFisica;