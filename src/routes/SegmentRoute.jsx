import { useSegment } from "../hooks/useSegment";

function SegmentRoute({ allowedSegments, children }) {
    const segment = useSegment();

    if (!segment) return null;

    const segmentoAtual = segment.tenant.segmento;

    if (!allowedSegments.includes(segmentoAtual)) {
        return <div>Acesso não permitido</div>;
    }

    return children;
}

export default SegmentRoute;