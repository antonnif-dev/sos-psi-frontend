import { useTenant } from "./useTenant";
import { segmentConfig } from "../config/segmentConfig";

export function useSegment() {
    const tenant = useTenant();

    if (!tenant) {
        console.log("Tenant não carregada.");

        return {
            tenant: null,
            labels: {},
            menu: [],
            theme: {}
        };
    }

    console.log("Tenant carregada:", tenant);

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.saude;

    console.log("Configuração do segmento:", config);

    const filteredMenu = config.menu.filter((item) => {
        console.log("Analisando item:", item);

        const profissaoOk =
            !item.profissoes ||
            item.profissoes.includes(tenant.profissao);

        console.log("tenant.profissao:", tenant.profissao);
        console.log("item.profissoes:", item.profissoes);
        console.log("profissaoOk:", profissaoOk);

        return profissaoOk;
    });

    console.log("Menu final filtrado:", filteredMenu);

    return {
        tenant,
        labels: config.labels,
        menu: filteredMenu,
        theme: config.theme
    };
}