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

    useEffect(() => {
        async function carregarTenant() {
            if (!user) return;
            const tenantsSnapshot = await getDocs(collection(db, "tenants"));
            for (const tenantDoc of tenantsSnapshot.docs) {
                const userRef = doc(db, "tenants", tenantDoc.id, "usuarios", user.uid);
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

    async function salvar() {
        if (!tenantId) return;
        const ref = doc(db, "tenants", tenantId);
        await updateDoc(ref, {
            nome: form.nome,
            email: form.email,
            plano: form.plano,
            status: form.status
        });
        alert("Configurações atualizadas!");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Configurações da Clínica
            </h1>
            <div className="bg-white p-6 rounded shadow w-96 flex flex-col gap-4">
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome da clínica"
                    className="border p-2"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2"
                />
                <button
                    onClick={salvar}
                    className="bg-blue-600 text-white py-2 rounded"
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}