import { db } from "./firebase";
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

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