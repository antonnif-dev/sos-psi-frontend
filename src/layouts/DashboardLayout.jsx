
import { useTenant } from "../hooks/useTenant";
import LayoutPsicologia from "./psicologia/LayoutPsicologia";
import LayoutJuridico from "./juridico/LayoutJuridico";
import LayoutEducacao from "./educacao/LayoutEducacao";
import LayoutBeleza from "./beleza/LayoutBeleza";
import LayoutEstetica from "./estetica/LayoutEstetica";
import LayoutCriativo from "./criativos/LayoutCriativos";
import DashboardLoading from "../components/DashboardLoading";

function DashboardLayout({ children }) {
    const tenant = useTenant();

    if (!tenant || !tenant.segmento) {
        return <DashboardLoading />;
    }

    const layouts = {
        saude: LayoutPsicologia,
        profissionais: LayoutJuridico,
        educacao: LayoutEducacao,
        beleza: LayoutBeleza,
        estetica: LayoutEstetica,
        criativo: LayoutCriativo
    };

    const Layout = layouts[tenant.segmento] || LayoutPsicologia;

    return <Layout>{children}</Layout>;
}

export default DashboardLayout;