import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const localUser = JSON.parse(localStorage.getItem("usuario")) || null;
                setUser(localUser);
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);

    return user;
}