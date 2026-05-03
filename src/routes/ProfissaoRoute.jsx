import { Navigate } from "react-router-dom";
import { useTenant } from "../hooks/useTenant";

function ProfissaoRoute({ allowedProfissoes = [], children }) {
    const tenant = useTenant();

    console.log("PROFISSAO ROUTE DEBUG");
    console.log("tenant:", tenant);
    console.log("profissao tenant:", tenant?.profissao);
    console.log("profissoes tenant:", tenant?.profissoes);

    if (!tenant) return null;

    // Caso tenant use apenas uma profissão:
    if (tenant.profissao) {
        if (!allowedProfissoes.includes(tenant.profissao)) {
            console.log("Acesso negado pelo ProfissaoRoute.");
            return <Navigate to="/dashboard" replace />;
        }
    }

    // Caso tenant use múltiplas profissões:
    else if (tenant.profissoes) {
        const autorizado = tenant.profissoes.some((profissao) =>
            allowedProfissoes.includes(profissao)
        );

        if (!autorizado) {
            console.log("Acesso negado pelo ProfissaoRoute.");
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
}

export default ProfissaoRoute;