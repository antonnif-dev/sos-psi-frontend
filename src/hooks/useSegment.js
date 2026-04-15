import { useTenant } from "./useTenant";
import { segmentConfig } from "../config/segmentConfig";

export function useSegment() {
    const tenant = useTenant();

    if (!tenant) return {};

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.psicologia;

    return {
        tenant,
        labels: config.labels,
        menu: config.menu
    };
}