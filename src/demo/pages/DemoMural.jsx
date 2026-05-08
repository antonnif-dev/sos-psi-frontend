import { useEffect, useState } from "react";

import {
    listarMensagensMock
} from "../services/muralDemoService";

function tempoRelativo(data) {

    const agora = new Date();

    const diff =
        Math.floor(
            (agora - new Date(data)) / 1000 / 60
        );

    if (diff < 1) return "Agora";

    if (diff < 60) {
        return `${diff} min atrás`;
    }

    const horas =
        Math.floor(diff / 60);

    if (horas < 24) {
        return `${horas}h atrás`;
    }

    const dias =
        Math.floor(horas / 24);

    return `${dias}d atrás`;

}

export default function DemoMural() {

    const [mensagens, setMensagens] =
        useState([]);

    useEffect(() => {

        const dados =
            listarMensagensMock();

        setMensagens(dados);

    }, []);

    return (

        <div className="min-h-screen p-6 bg-gray-100">

            <div className="max-w-5xl mx-auto">

                <div className="mb-6">

                    <h1 className="text-2xl font-bold">
                        Mural
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Discussões e compartilhamentos entre clínicas e profissionais.
                    </p>

                </div>

                <div className="space-y-4">

                    {mensagens.map((msg) => (

                        <div
                            key={msg.id}
                            className="
                                bg-white
                                rounded-xl
                                border
                                border-gray-200
                                p-5
                                shadow-sm
                            "
                        >

                            <div className="flex items-center justify-between mb-3">

                                <div>

                                    <h2 className="font-semibold text-gray-800">
                                        {msg.autor}
                                    </h2>

                                    <p className="text-sm text-indigo-600">
                                        {msg.tenantNome}
                                    </p>

                                </div>

                                <span className="text-xs text-gray-400">
                                    {tempoRelativo(msg.createdAt)}
                                </span>

                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                {msg.mensagem}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}