import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarPacientes } from "../services/pacientesService";
import Card from "../components/Card";

function PacientePerfil() {

    const { id } = useParams();

    const [paciente, setPaciente] = useState(null);

    useEffect(() => {

        async function carregar() {

            const data = await listarPacientes(id);
            setPaciente(data);

        }

        carregar();

    }, [id]);

    if (!paciente) return <p>Carregando...</p>;

    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-semibold">
                {paciente.nome}
            </h1>

            <Card>

                <p><b>Telefone:</b> {paciente.telefone}</p>
                <p><b>Email:</b> {paciente.email}</p>
                <p><b>Profissão:</b> {paciente.profissao}</p>
                <p><b>Status:</b> {paciente.status}</p>
                <p><b>Valor da sessão:</b> {paciente.valorSessao}</p>

            </Card>

            <Card>

                <h2 className="font-semibold mb-2">
                    Observações
                </h2>

                <p className="text-sm text-gray-600">
                    {paciente.observacoes || "Sem observações"}
                </p>

            </Card>

        </div>

    );

}

export default PacientePerfil;