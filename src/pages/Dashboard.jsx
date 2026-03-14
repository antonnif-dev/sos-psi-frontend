import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function load() {
            const res = await api.get("/dashboard");
            setData(res.data);
        }
        load();
    }, []);
    if (!data) {
        return (
            <p className="text-gray-500">
                Carregando...
            </p>
        );
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-2xl font-semibold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Visão geral do sistema
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Pacientes cadastrados
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalPacientes}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Consultas realizadas
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalConsultas}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Sessões registradas
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalProntuarios || 0}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Documentos enviados
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalDocumentos || 0}
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Atividade recente
                    </h2>

                    <p className="text-sm text-gray-500">
                        As informações mais recentes do sistema aparecerão aqui.
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Status do sistema
                    </h2>

                    <p className="text-sm text-gray-600">
                        Todos os módulos estão operando normalmente.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;
