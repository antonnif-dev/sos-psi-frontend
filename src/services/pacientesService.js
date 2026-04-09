import { db } from "./firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";
/*
export async function listarPacientes(tenantId, psicologoUid) {
    const ref = collection(db, "tenants", tenantId, "pacientes");
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
*/

export async function listarPacientes(tenantId) {
    if (!tenantId) {
        console.error("tenantId undefined");
        return [];
    }
    const ref = collection(db, "tenants", tenantId, "pacientes");
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(d => {
        const data = d.data();
        return {
            id: d.id,
            nome: data.nome || "",
            telefone: data.telefone || "",
            email: data.email || "",
            status: data.status || "",
            ...data
        };
    });
}

export async function criarPaciente(tenantId, data) {
    const ref = collection(db, "tenants", tenantId, "pacientes");
    await addDoc(ref, {
        ...data,
        createdAt: serverTimestamp()
    });
}

export async function editarPaciente(tenantId, id, data) {
    const ref = doc(db, "tenants", tenantId, "pacientes", id);
    await updateDoc(ref, data);
}

export async function deletarPaciente(tenantId, id) {
    const ref = doc(db, "tenants", tenantId, "pacientes", id);
    await deleteDoc(ref);
}

export async function criarObservacao(tenantId, pacienteId, texto) {
    const ref = collection(
        db,
        "tenants",
        tenantId,
        "pacientes",
        pacienteId,
        "observacoes"
    );
    await addDoc(ref, {
        texto,
        data: new Date().toLocaleDateString(),
        createdAt: serverTimestamp()
    });
}

export async function listarObservacoes(tenantId, pacienteId) {
    const ref = collection(
        db,
        "tenants",
        tenantId,
        "pacientes",
        pacienteId,
        "observacoes"
    );
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}