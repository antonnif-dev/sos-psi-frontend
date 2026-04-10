import { createContext, useState, useContext } from "react";

export const TenantContext = createContext();

export function TenantProvider({ children }) {
    const [tenant, setTenant] = useState(null);

    return (
        <TenantContext.Provider
            value={{
                tenant,
                tenantId: tenant?.id,
                setTenant
            }}
        >
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    return useContext(TenantContext);
}