import { createContext, useContext, useMemo } from "react";
import { segmentConfig } from "../config/segmentConfig";

// 🔥 função síncrona (NADA de useEffect)
function getSegment() {
    // Exemplo (ajuste conforme seu projeto):
    const hostname = window.location.hostname;

    if (hostname.includes("psicologia")) {
        return segmentConfig.psicologia;
    }

    if (hostname.includes("juridico")) {
        return segmentConfig.juridico;
    }

    return segmentConfig.default;
}

const SegmentContext = createContext(null);

export function SegmentProvider({ children }) {
    const segment = useMemo(() => getSegment(), []);

    return (
        <SegmentContext.Provider value={segment}>
            {children}
        </SegmentContext.Provider>
    );
}

export function useSegment() {
    return useContext(SegmentContext);
}