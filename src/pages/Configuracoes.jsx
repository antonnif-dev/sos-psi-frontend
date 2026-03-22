import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../services/firebase";

import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

export default function Configuracoes() {

    const { user } = useAuth();

    const [tenantId, setTenantId] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        plano: "",
        status: ""
    });

    const [agenda, setAgenda] = useState({
        sabado: false,
        domingo: false
    });

    const [disponibilidade, setDisponibilidade] = useState({
        segunda: { ativo: true, inicio: "08:00", fim: "18:00" },
        terca: { ativo: true, inicio: "08:00", fim: "18:00" },
        quarta: { ativo: true, inicio: "08:00", fim: "18:00" },
        quinta: { ativo: true, inicio: "08:00", fim: "18:00" },
        sexta: { ativo: true, inicio: "08:00", fim: "18:00" },
        sabado: { ativo: false, inicio: "08:00", fim: "12:00" },
        domingo: { ativo: false, inicio: "08:00", fim: "12:00" }
    });

    useEffect(() => {

        async function carregarTenant() {

            if (!user) return;

            const tenantsSnapshot = await getDocs(collection(db, "tenants"));

            for (const tenantDoc of tenantsSnapshot.docs) {

                const userRef = doc(
                    db,
                    "tenants",
                    tenantDoc.id,
                    "usuarios",
                    user.uid
                );

                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {

                    const data = tenantDoc.data();

                    setTenantId(tenantDoc.id);

                    setForm({
                        nome: data.nome || "",
                        email: data.email || "",
                        plano: data.plano || "",
                        status: data.status || ""
                    });

                    setAgenda({
                        sabado: data.agenda?.sabado || false,
                        domingo: data.agenda?.domingo || false
                    });

                    if (data.disponibilidade) {
                        setDisponibilidade(data.disponibilidade);
                    }

                    break;

                }

            }

        }

        carregarTenant();

    }, [user]);

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    function handleAgenda(e) {

        setAgenda({
            ...agenda,
            [e.target.name]: e.target.checked
        });

    }

    function handleDisponibilidade(dia, campo, valor) {

        setDisponibilidade({
            ...disponibilidade,
            [dia]: {
                ...disponibilidade[dia],
                [campo]: valor
            }
        });

    }

    async function salvar() {

        if (!tenantId) return;

        const ref = doc(db, "tenants", tenantId);

        await updateDoc(ref, {
            nome: form.nome,
            email: form.email,
            plano: form.plano,
            status: form.status,
            agenda,
            disponibilidade
        });

        alert("Configurações atualizadas!");

    }

    const dias = [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo"
    ];

    return (

        <div className="space-y-8">

            <h1 className="text-2xl font-bold">
                Configurações da Clínica
            </h1>

            <div className="bg-white p-6 rounded shadow flex flex-col gap-4 max-w-md">

                <h2 className="font-semibold text-lg">
                    Informações da Clínica
                </h2>

                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome da clínica"
                    className="border p-2 rounded"
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                />

            </div>

            <div className="bg-white p-6 rounded shadow flex flex-col gap-4">

                <h2 className="font-semibold text-lg">
                    Configurações da Agenda
                </h2>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="sabado"
                        checked={agenda.sabado}
                        onChange={handleAgenda}
                    />
                    Atender aos sábados
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="domingo"
                        checked={agenda.domingo}
                        onChange={handleAgenda}
                    />
                    Atender aos domingos
                </label>

            </div>

            <div className="bg-white p-6 rounded shadow flex flex-col gap-4">

                <h2 className="font-semibold text-lg">
                    Disponibilidade semanal
                </h2>

                {dias.map(dia => {

                    const dados = disponibilidade[dia];

                    return (

                        <div
                            key={dia}
                            className="flex items-center gap-3 flex-wrap"
                        >

                            <input
                                type="checkbox"
                                checked={dados.ativo}
                                onChange={(e) => handleDisponibilidade(dia, "ativo", e.target.checked)}
                            />

                            <span className="w-24 capitalize">
                                {dia}
                            </span>

                            <input
                                type="time"
                                value={dados.inicio}
                                disabled={!dados.ativo}
                                onChange={(e) => handleDisponibilidade(dia, "inicio", e.target.value)}
                                className="border p-1 rounded"
                            />

                            <span>até</span>

                            <input
                                type="time"
                                value={dados.fim}
                                disabled={!dados.ativo}
                                onChange={(e) => handleDisponibilidade(dia, "fim", e.target.value)}
                                className="border p-1 rounded"
                            />

                        </div>

                    )

                })}

            </div>

            <button
                onClick={salvar}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Salvar Configurações
            </button>

        </div>

    );

}
