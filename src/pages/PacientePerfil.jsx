import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarPacientes } from "../services/pacientesService";
import Card from "../components/Card";

function PacientePerfil() {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);

    useEffect(() => {
        async function carregar() {
            const data = await listarPacientes();
            const p = data.find(p => p.id === id);
            setPaciente(p || {});
        }
        carregar();
    }, [id]);

    if (!paciente) return <p>Carregando...</p>;

    // fallback seguro para endereço
    const endereco = paciente.endereco || {};

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">{paciente.nome || "Sem nome"}</h1>

            <Card>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p><b>Telefone:</b> {paciente.telefone || "-"}</p>
                        <p><b>Email:</b> {paciente.email || "-"}</p>
                        <p><b>Data de Nascimento:</b> {paciente.dataNascimento || "-"}</p>
                        <p><b>CPF:</b> {paciente.cpf || "-"}</p>
                    </div>
                    <div>
                        <p><b>Profissão:</b> {paciente.profissao || "-"}</p>
                        <p><b>Status:</b> {paciente.status || "-"}</p>
                        
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">Endereço</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <p><b>CEP:</b> {endereco.cep || "-"}</p>
                    <p><b>Rua:</b> {endereco.rua || "-"}</p>
                    <p><b>Número:</b> {endereco.numero || "-"}</p>
                    <p><b>Bairro:</b> {endereco.bairro || "-"}</p>
                    <p><b>Cidade:</b> {endereco.cidade || "-"}</p>
                    <p><b>Estado:</b> {endereco.estado || "-"}</p>
                    <p><b>Complemento:</b> {endereco.complemento || "-"}</p>
                </div>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">Status do Paciente</h2>
                <p><b>Valor da Sessão:</b> {paciente.valorSessao || "-"}</p>
                <p><b>Status:</b> {paciente.status || "-"}</p>
            </Card>

            <Card>
                <h2 className="font-semibold mb-2">Observações</h2>
                <p className="text-sm text-gray-600">
                    {paciente.observacoes || "Sem observações"}
                </p>
            </Card>
                <h2>Espaço para adcionar novas observações</h2>
            <Card>

            </Card>
        </div>
    );
}

export default PacientePerfil;