import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function useTenant() {
    const [tenant, setTenant] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            const uid = user.uid;
            const tenantsSnapshot = await getDocs(collection(db, "tenants"));

            for (const tenantDoc of tenantsSnapshot.docs) {
                const tenantId = tenantDoc.id;

                const userRef = doc(db, "tenants", tenantId, "usuarios", uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setTenant({
                        id: tenantId,
                        ...tenantDoc.data(),
                        usuario: userSnap.data()
                    });
                    break;
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return tenant;
}