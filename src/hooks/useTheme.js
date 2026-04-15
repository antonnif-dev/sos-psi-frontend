import { useSegment } from "./useSegment";

export function useTheme() {
    const segment = useSegment();

    return segment?.theme || {};
}