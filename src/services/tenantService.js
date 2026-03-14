import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function buscarTenant(tenantId) {

    const ref = doc(db, "tenants", tenantId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        return snap.data();
    }

    return null;
}