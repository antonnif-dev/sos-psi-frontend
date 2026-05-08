import { createContext } from "react";
import { demoUser } from "../demoAuth";

export const DemoAuthContext =
    createContext();

export function DemoAuthProvider({
    children
}) {

    return (
        <DemoAuthContext.Provider
            value={{
                user: demoUser,
                loading: false
            }}
        >
            {children}
        </DemoAuthContext.Provider>
    );
}