// src/pages/MuralGlobal.jsx

import { useTenant } from "../hooks/useTenant";
import { segmentConfig } from "../config/segmentConfig";
import MuralGlobal from "../components/MuralGlobal";

export default function MuralGlobalPage() {
    const tenant = useTenant();

    if (!tenant) {
        return (
            <div className="p-8">
                Carregando...
            </div>
        );
    }

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.psicologia;

    return (
        <div
            className={`p-2 ${config?.theme?.background || "bg-gray-100"
                }`}
        >
            <div className="">
                {/* 
                <h1 className="text-2xl font-bold mb-6">
                    {config?.labels?.mural || "Mural"}
                </h1>
*/}
                <MuralGlobal
                    tenantNome={tenant.nome}
                    expandidoPadrao={true}
                />
            </div>
        </div>
    );
}