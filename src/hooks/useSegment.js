import { useTenant } from "./useTenant";
import { segmentConfig } from "../config/segmentConfig";

export function useSegment() {
    const tenant = useTenant();

    if (!tenant) {

        return {
            tenant: null,
            labels: {},
            menu: [],
            theme: {}
        };
    }

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.saude;

    const filteredMenu = config.menu.filter((item) => {

        const profissaoOk =
            !item.profissoes ||
            item.profissoes.includes(tenant.profissao);

        return profissaoOk;
    });

    return {
        tenant,
        labels: config.labels,
        menu: filteredMenu,
        theme: config.theme
    };
}