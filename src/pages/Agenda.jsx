import { useEffect, useState } from "react";
import { listarPacientes } from "../services/pacientesService";
import {
   listarConsultas,
   criarConsulta,
   editarConsulta,
   deletarConsulta
} from "../services/agendaService";
import Card from "../components/Card";

function Agenda() {
   const [consultas, setConsultas] = useState([]);
   const [pacienteId, setPacienteId] = useState("");
   const [data, setData] = useState("");
   const [editandoId, setEditandoId] = useState(null);
   const [pacienteEditado, setPacienteEditado] = useState("");
   const [dataEditada, setDataEditada] = useState("");
   const [pacientes, setPacientes] = useState([]);
   const [buscaPaciente, setBuscaPaciente] = useState("");
   const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

   const sugestoes = pacientes.filter(p =>
      p.nome.toLowerCase().startsWith(buscaPaciente.toLowerCase())
   );

   async function carregar() {
      const dados = await listarConsultas();
      setConsultas(dados);
   }

   useEffect(() => {
      carregar();
      async function carregarPacientes() {
         const lista = await listarPacientes();
         setPacientes(lista);
      }
      carregarPacientes();
   }, []);

   async function handleSubmit(e) {
      e.preventDefault();
      if (!pacienteId || !data) return;
      await criarConsulta({
         pacienteId,
         data
      });

      setPacienteId("");
      setData("");
      carregar();
   }

   async function salvarEdicao(id) {
      await editarConsulta(id, {
         pacienteId: pacienteEditado,
         data: dataEditada
      });

      setEditandoId(null);
      carregar();
   }

   async function excluirConsulta(id) {
      if (!confirm("Deseja cancelar esta consulta?")) return;
      await deletarConsulta(id);
      carregar();
   }

   return (
      <div className="space-y-6">
         <h1 className="text-2xl font-semibold text-gray-800">
            Agenda
         </h1>
         <Card>
            <form
               onSubmit={handleSubmit}
               className="flex flex-col md:flex-row gap-3"
            >
               <div className="relative flex-1">

                  <input
                     className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     placeholder="Buscar paciente"
                     value={buscaPaciente}
                     onChange={(e) => {
                        setBuscaPaciente(e.target.value);
                        setMostrarSugestoes(true);
                     }}
                  />

                  {mostrarSugestoes && buscaPaciente && (

                     <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow mt-1 max-h-40 overflow-y-auto">

                        {sugestoes.map(p => (

                           <div
                              key={p.id}
                              onClick={() => {
                                 setPacienteId(p.id);
                                 setBuscaPaciente(p.nome);
                                 setMostrarSugestoes(false);
                              }}
                              className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer"
                           >
                              {p.nome}
                           </div>

                        ))}

                     </div>

                  )}

               </div>
               <input
                  type="datetime-local"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
               />
               <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
               >
                  Agendar
               </button>
            </form>
         </Card>

         <div className="grid gap-4 md:grid-cols-2">
            {consultas.map(c => (
               <Card key={c.id}>
                  {editandoId === c.id ? (
                     <div className="space-y-2">
                        <input
                           className="border rounded px-2 py-1 w-full"
                           value={pacienteEditado}
                           onChange={(e) => setPacienteEditado(e.target.value)}
                        />
                        <input
                           type="datetime-local"
                           className="border rounded px-2 py-1 w-full"
                           value={dataEditada}
                           onChange={(e) => setDataEditada(e.target.value)}
                        />

                        <div className="flex gap-2">
                           <button
                              onClick={() => salvarEdicao(c.id)}
                              className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                           >
                              salvar
                           </button>

                           <button
                              onClick={() => setEditandoId(null)}
                              className="text-xs bg-gray-300 px-2 py-1 rounded"
                           >
                              cancelar
                           </button>
                        </div>
                     </div>
                  ) : (
                     <>
                        <p className="text-sm text-gray-500 mb-1">
                           Paciente
                        </p>
                        <p className="text-base font-medium text-gray-800">
                           {c.pacienteId}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                           Data
                        </p>
                        <p className="text-sm text-gray-700">
                           {new Date(c.data).toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-3">
                           <button
                              onClick={() => {
                                 setEditandoId(c.id);
                                 setPacienteEditado(c.pacienteId);
                                 setDataEditada(c.data);
                              }}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                           >
                              editar
                           </button>
                           <button
                              onClick={() => excluirConsulta(c.id)}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                           >
                              cancelar
                           </button>
                        </div>
                     </>
                  )}
               </Card>
            ))}
         </div>
      </div>
   );
}

export default Agenda;