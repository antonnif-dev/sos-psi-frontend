import { useEffect, useState } from "react";
import { listarConsultas } from "../services/agendaService";
import { listarPacientes } from "../services/pacientesService";
import Card from "../components/Card";

function SessoesRealizadas() {

    const [consultas, setConsultas] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const [buscaPaciente, setBuscaPaciente] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [status, setStatus] = useState("");

    async function carregar() {
        const dados = await listarConsultas();
        const pacientesLista = await listarPacientes();

        setConsultas(dados);
        setPacientes(pacientesLista);
    }

    useEffect(() => {
        carregar();
    }, []);

    function nomePaciente(id) {
        const p = pacientes.find(p => p.id === id);
        return p ? p.nome : "";
    }

    function filtrarConsultas() {

        return consultas
            .filter(c => {

                if (status && c.status !== status)
                    return false;

                const nome = nomePaciente(c.pacienteId).toLowerCase();

                if (!nome.includes(buscaPaciente.toLowerCase()))
                    return false;

                const dataConsulta = new Date(c.data);

                if (dataInicio) {
                    if (dataConsulta < new Date(dataInicio))
                        return false;
                }

                if (dataFim) {
                    const fim = new Date(dataFim);
                    fim.setHours(23, 59, 59);

                    if (dataConsulta > fim)
                        return false;
                }

                return true;

            })
            .sort((a, b) => new Date(b.data) - new Date(a.data));

    }

    const sessoes = filtrarConsultas();

    const realizadas = consultas.filter(c => c.status === "realizada").length;
    const faltas = consultas.filter(c => c.status === "faltou").length;
    const canceladas = consultas.filter(c => c.status === "cancelada").length;

    const coresStatus = {
        realizada: "bg-green-100 text-green-800",
        faltou: "bg-yellow-100 text-yellow-800",
        cancelada: "bg-red-100 text-red-800",
        agendada: "bg-indigo-100 text-indigo-800"
    };

    return (
        <div className="space-y-6">

            <h1 className="text-xl font-semibold">
                Atendimentos
            </h1>

            {/* MÉTRICAS */}
            <div className="grid md:grid-cols-3 gap-4">

                <Card>
                    <p className="text-sm text-gray-500">Sessões realizadas</p>
                    <p className="text-2xl font-bold">{realizadas}</p>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Faltas</p>
                    <p className="text-2xl font-bold">{faltas}</p>
                </Card>

                <Card>
                    <p className="text-sm text-gray-500">Canceladas</p>
                    <p className="text-2xl font-bold">{canceladas}</p>
                </Card>

            </div>

            {/* FILTROS */}

            <Card>

                <div className="grid md:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Buscar paciente"
                        className="border p-2 rounded"
                        value={buscaPaciente}
                        onChange={e => setBuscaPaciente(e.target.value)}
                    />

                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dataInicio}
                        onChange={e => setDataInicio(e.target.value)}
                    />

                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={dataFim}
                        onChange={e => setDataFim(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Todos status</option>
                        <option value="realizada">Realizada</option>
                        <option value="faltou">Faltou</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="agendada">Agendada</option>
                    </select>

                </div>

            </Card>

            {/* TABELA */}

            <Card>

                <table className="w-full text-sm">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-2">Paciente</th>
                            <th className="text-left p-2">Data</th>
                            <th className="text-left p-2">Horário</th>
                            <th className="text-left p-2">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {sessoes.map(s => {

                            const d = new Date(s.data);

                            return (

                                <tr
                                    key={s.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-2">
                                        {nomePaciente(s.pacienteId)}
                                    </td>

                                    <td className="p-2">
                                        {d.toLocaleDateString("pt-BR")}
                                    </td>

                                    <td className="p-2">
                                        {d.toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </td>

                                    <td className="p-2">

                                        <span className={`px-2 py-1 rounded text-xs ${coresStatus[s.status]}`}>

                                            {s.status}

                                        </span>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </Card>

        </div>
    );

}

export default SessoesRealizadas;