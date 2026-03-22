import { useEffect, useState } from "react";
import {
    listarPacientes,
    criarPaciente,
    editarPaciente,
    deletarPaciente
} from "../services/pacientesService";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Pacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();

    const [novoPaciente, setNovoPaciente] = useState({
        nome: "",
        telefone: "",
        email: "",
        dataNascimento: "",
        profissao: "",
        cpf: "",
        valorSessao: "",
        status: "ativo",
        observacoes: "",

        endereco: {
            cep: "",
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
        }
    });

    const [editandoId, setEditandoId] = useState(null);
    const [pacienteEditado, setPacienteEditado] = useState({});

    async function carregarPacientes() {
        const data = await listarPacientes();
        setPacientes(data);
    }

    useEffect(() => {
        carregarPacientes();
    }, []);

    const pacientesFiltrados = pacientes.filter(p =>
        p.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    async function handleCriar() {

        if (!novoPaciente.nome) return;

        await criarPaciente(novoPaciente);

        setNovoPaciente({
            nome: "",
            telefone: "",
            email: "",
            dataNascimento: "",
            profissao: "",
            cpf: "",
            valorSessao: "",
            status: "ativo",
            observacoes: "",

            endereco: {
                cep: "",
                rua: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: "",
            }
        });

        carregarPacientes();
    }

    async function handleEditar(id) {

        await editarPaciente(id, pacienteEditado);

        setEditandoId(null);
        setPacienteEditado({});

        carregarPacientes();
    }

    async function handleDeletar(id) {

        if (!confirm("Deseja excluir este paciente?")) return;

        await deletarPaciente(id);

        carregarPacientes();
    }

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Pacientes
                </h1>

                <p className="text-sm text-gray-500">
                    {pacientes.length} paciente(s) cadastrados
                </p>
            </div>

            {/* BUSCA */}

            <input
                type="text"
                placeholder="Buscar paciente..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />

            {/* LISTA */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {pacientesFiltrados.map(p => (

                    <Card
                        key={p.id} onClick={() => {
                            if (editandoId !== p.id) {
                                navigate(`/pacientes/${p.id}`);
                            }
                        }}
                        className={`transition ${editandoId !== p.id ? "cursor-pointer hover:shadow-md" : ""}`}
                    >

                        {editandoId === p.id ? (

                            <div className="space-y-2">

                                <input
                                    placeholder="Nome"
                                    value={pacienteEditado.nome || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, nome: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="Telefone"
                                    value={pacienteEditado.telefone || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, telefone: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="Email"
                                    value={pacienteEditado.email || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, email: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    type="date"
                                    value={pacienteEditado.dataNascimento || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, dataNascimento: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="Profissão"
                                    value={pacienteEditado.profissao || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, profissao: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="CPF"
                                    value={pacienteEditado.cpf || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, cpf: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="Rua"
                                    value={pacienteEditado.endereco?.rua || ""}
                                    onChange={(e) =>
                                        setPacienteEditado({
                                            ...pacienteEditado,
                                            endereco: {
                                                ...pacienteEditado.endereco,
                                                rua: e.target.value
                                            }
                                        })
                                    }
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <input
                                    placeholder="Valor da sessão"
                                    value={pacienteEditado.valorSessao || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, valorSessao: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <select
                                    value={pacienteEditado.status || "ativo"}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, status: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="pausa">Em pausa</option>
                                    <option value="encerrado">Encerrado</option>
                                </select>

                                <textarea
                                    placeholder="Observações"
                                    value={pacienteEditado.observacoes || ""}
                                    onChange={(e) => setPacienteEditado({ ...pacienteEditado, observacoes: e.target.value })}
                                    className="border rounded px-2 py-1 text-sm w-full"
                                />

                                <div className="flex gap-2">

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditar(p.id);
                                        }}
                                        className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        salvar
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditandoId(null);
                                        }}
                                        className="text-sm bg-gray-300 px-2 py-1 rounded"
                                    >
                                        cancelar
                                    </button>

                                </div>

                            </div>
                        ) : (

                            <>

                                <p className="text-lg font-medium text-gray-800">
                                    {p.nome}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {p.telefone}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {p.email}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {p.status}
                                </p>

                                <div className="flex gap-2 mt-3">

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditandoId(p.id);
                                            setPacienteEditado({
                                                ...p,
                                                endereco: p.endereco || {
                                                    cep: "",
                                                    rua: "",
                                                    numero: "",
                                                    complemento: "",
                                                    bairro: "",
                                                    cidade: "",
                                                    estado: ""
                                                }
                                            });
                                        }}
                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        editar
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeletar(p.id);
                                        }}
                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        excluir
                                    </button>

                                </div>

                            </>

                        )}

                    </Card>

                ))}

            </div>

            {/* CRIAR PACIENTE */}

            <h1 className="text-2xl flex justify-center pt-5 font-semibold text-gray-800">
                Criar Paciente
            </h1>

            <Card>
                <div className="grid md:grid-cols-2 gap-3">
                    <input
                        placeholder="Nome"
                        value={novoPaciente.nome}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, nome: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Telefone"
                        value={novoPaciente.telefone}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, telefone: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Email"
                        value={novoPaciente.email}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, email: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        type="date"
                        value={novoPaciente.dataNascimento}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, dataNascimento: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Profissão"
                        value={novoPaciente.profissao}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, profissao: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="CPF"
                        value={novoPaciente.cpf}
                        onChange={(e) => setNovoPaciente({ ...novoPaciente, cpf: e.target.value })}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>

                <div className="mt-3">
                    <h3 className="mb-3">Endereço</h3>
                    <div className="grid md:grid-cols-4 gap-3">
                        <input
                            placeholder="CEP"
                            value={novoPaciente.endereco.cep}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, cep: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Rua"
                            value={novoPaciente.endereco.rua}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, rua: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Número"
                            value={novoPaciente.endereco.numero}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, numero: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Complemento"
                            value={novoPaciente.endereco.complemento}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, complemento: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Bairro"
                            value={novoPaciente.endereco.bairro}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, bairro: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Cidade"
                            value={novoPaciente.endereco.cidade}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, cidade: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Estado"
                            value={novoPaciente.endereco.estado}
                            onChange={(e) =>
                                setNovoPaciente({
                                    ...novoPaciente,
                                    endereco: { ...novoPaciente.endereco, estado: e.target.value }
                                })
                            }
                            className="border rounded px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <input
                    placeholder="Valor da sessão"
                    value={novoPaciente.valorSessao}
                    onChange={(e) => setNovoPaciente({ ...novoPaciente, valorSessao: e.target.value })}
                    className="border rounded px-3 py-2 text-sm mt-3"
                />

                <select
                    value={novoPaciente.status}
                    onChange={(e) => setNovoPaciente({ ...novoPaciente, status: e.target.value })}
                    className="border rounded px-3 py-2 text-sm mt-3"
                >
                    <option value="ativo">Ativo</option>
                    <option value="pausa">Em pausa</option>
                    <option value="encerrado">Encerrado</option>
                </select>

                <textarea
                    placeholder="Observações"
                    value={novoPaciente.observacoes}
                    onChange={(e) => setNovoPaciente({ ...novoPaciente, observacoes: e.target.value })}
                    className="border rounded px-3 py-2 text-sm w-full mt-3"
                />

                <button
                    onClick={handleCriar}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm mt-3"
                >
                    Adicionar paciente
                </button>
            </Card>

        </div>
    );
}

export default Pacientes;