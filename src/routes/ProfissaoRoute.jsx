import { useTenant } from "../hooks/useTenant";

function ProfissaoRoute({ children, allowedProfissoes }) {
    const tenant = useTenant();

    if (!tenant) return null;

    if (!allowedProfissoes.includes(tenant.profissao)) {
        return <div>Acesso não permitido</div>;
    }

    return children;
}

export default ProfissaoRoute;