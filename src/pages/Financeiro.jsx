import { useEffect, useState } from "react";
import { listarPagamentos, criarPagamento, editarPagamento, deletarPagamento } from "../services/financeiroService";
import Card from "../components/Card";
import { listarPacientes } from "../services/pacientesService";

function Financeiro() {
   const [pagamentos, setPagamentos] = useState([]);
   const [paciente, setPaciente] = useState("");
   const [valor, setValor] = useState("");
   const [editando, setEditando] = useState(null);
   const [pacientes, setPacientes] = useState([]);
   const [sugestoes, setSugestoes] = useState([]);

   async function carregar() {
      const dados = await listarPagamentos();
      setPagamentos(dados);
   }

   function buscarPaciente(texto) {
      setPaciente(texto);
      if (!texto) {
         setSugestoes([]);
         return;
      }
      const filtrados = pacientes.filter(p =>
         p.nome.toLowerCase().startsWith(texto.toLowerCase())
      );
      setSugestoes(filtrados.slice(0, 5));
   }

   useEffect(() => {
      carregar();
      async function carregarPacientes() {
         const dados = await listarPacientes();
         setPacientes(dados);
      }
      carregarPacientes();
   }, []);

   async function handleSubmit(e) {
      e.preventDefault();
      const data = {
         paciente,
         valor
      };
      if (editando) {
         await editarPagamento(editando, data);
      } else {
         await criarPagamento(data);
      }
      setPaciente("");
      setValor("");
      setEditando(null);
      carregar();
   }

   function iniciarEdicao(p) {
      setPaciente(p.paciente);
      setValor(p.valor);
      setEditando(p.id);
   }

   async function remover(id) {
      if (!confirm("Excluir pagamento?")) return;
      await deletarPagamento(id);
      carregar();
   }

   const total = pagamentos.reduce((acc, p) => acc + Number(p.valor || 0), 0);

   return (
      <div className="space-y-8">
         <div>
            <h1 className="text-2xl font-semibold text-gray-800">
               Financeiro
            </h1>
            <p className="text-sm text-gray-500 mt-1">
               Controle de pagamentos das sessões
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
               <p className="text-sm text-gray-500">
                  Pagamentos registrados
               </p>
               <p className="text-3xl font-semibold text-gray-800 mt-2">
                  {pagamentos.length}
               </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
               <p className="text-sm text-gray-500">
                  Faturamento total
               </p>
               <p className="text-3xl font-semibold text-green-600 mt-2">
                  R$ {total}
               </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
               <p className="text-sm text-gray-500">
                  Último pagamento
               </p>
               <p className="text-lg font-medium text-gray-800 mt-2">
                  {pagamentos.length > 0 ? pagamentos[pagamentos.length - 1].paciente : "—"}
               </p>
            </div>
         </div>

         <Card>
            <div className="mb-4">
               <h2 className="text-lg font-semibold text-gray-800">
                  {editando ? "Editar pagamento" : "Registrar pagamento"}
               </h2>
               <p className="text-sm text-gray-500">
                  Adicione um novo pagamento de sessão
               </p>
            </div>

            <form
               onSubmit={handleSubmit}
               className="grid md:grid-cols-3 gap-3"
            >
               <div className="relative">
                  <input
                     className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                     placeholder="Paciente"
                     value={paciente}
                     onChange={(e) => buscarPaciente(e.target.value)}
                  />
                  {sugestoes.length > 0 && (
                     <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow w-full mt-1">
                        {sugestoes.map(p => (
                           <div
                              key={p.id}
                              onClick={() => {
                                 setPaciente(p.nome);
                                 setSugestoes([]);
                              }}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                           >
                              {p.nome}
                           </div>
                        ))}
                     </div>
                  )}
               </div>

               <input
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
               />
               <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
               >
                  {editando ? "Salvar edição" : "Registrar pagamento"}
               </button>
            </form>
         </Card>

         <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
               Histórico de pagamentos
            </h2>

            {pagamentos.length === 0 && (
               <Card>
                  <p className="text-gray-500 text-sm">
                     Nenhum pagamento registrado.
                  </p>
               </Card>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               {pagamentos.map(p => (
                  <div
                     key={p.id}
                     className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                  >
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm text-gray-500">
                              Paciente
                           </p>

                           <p className="text-base font-medium text-gray-800">
                              {p.paciente}
                           </p>
                        </div>

                        <p className="text-lg font-semibold text-green-600">
                           R$ {p.valor}
                        </p>
                     </div>

                     <div className="flex gap-3 mt-4">
                        <button
                           onClick={() => iniciarEdicao(p)}
                           className="text-blue-600 text-sm hover:underline"
                        >
                           Editar
                        </button>
                        <button
                           onClick={() => remover(p.id)}
                           className="text-red-600 text-sm hover:underline"
                        >
                           Excluir
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Financeiro;