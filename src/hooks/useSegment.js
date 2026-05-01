import { useTenant } from "./useTenant";
import { segmentConfig } from "../config/segmentConfig";

export function useSegment() {
    const tenant = useTenant();

    if (!tenant) return {};

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.psicologia;

    const filteredMenu = config.menu.filter((item) => {
        // Se não tiver profissão definida, exibe normalmente
        if (!item.profissao) return true;
        
        // Se profissão estiver definida, verifica se corresponde
        return item.profissao.includes(tenant.profissao);
        
    });

    return {
        tenant,
        labels: config.labels,
        menu: filteredMenu
    };
}