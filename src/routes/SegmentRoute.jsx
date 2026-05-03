// SegmentRoute.jsx
import { Navigate } from "react-router-dom";
import { useSegment } from "../hooks/useSegment";

function SegmentRoute({ allowedSegments = [], children }) {
    const segment = useSegment();

    console.log("SEGMENT ROUTE DEBUG");
    console.log("segment completo:", segment);
    console.log("tenant:", segment?.tenant);
    console.log("segmento atual:", segment?.tenant?.segmento);
    console.log("allowedSegments:", allowedSegments);

    if (!segment?.tenant) {
        console.log("Tenant ainda não carregado.");
        return null;
    }

    const segmentoAtual = segment.tenant.segmento;

    if (!allowedSegments.includes(segmentoAtual)) {
        console.log("Acesso negado pelo SegmentRoute.");
        return <Navigate to="/dashboard" replace />;
    }

    console.log("SegmentRoute liberado.");
    return children;
}

export default SegmentRoute;