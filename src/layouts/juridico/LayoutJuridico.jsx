import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutJuridico({ children }) {
    const [menuAberto, setMenuAberto] = useState(true);

    const tenant = useTenant();

    if (!tenant) return null;

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.psicologia;

    const roleUsuario = tenant.usuario?.role;

    const getSaudacao = () => {
        const hora = new Date().getHours();
        if (hora < 12) return "Bom dia";
        if (hora < 18) return "Boa tarde";
        return "Boa noite";
    };

    return (
        <div className="flex h-screen relative">

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-gray-900 text-white transition-all duration-300 overflow-hidden
                    ${menuAberto ? "w-36 md:w-56 p-5" : "w-0 p-0"}
                `}
            >
                <h2 className="text-xl font-bold mt-5 mb-20">
                    {tenant.nome}
                </h2>

                <nav className="flex flex-col gap-4">
                    {config.menu.map((item) => {
                        // controle de role opcional
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }

                        return (
                            <Link key={item.path} to={item.path}>
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* PERFIL */}
                    <Link to="/meu-perfil">
                        <UserPen size={20} />
                    </Link>

                    {/* CONFIG */}
                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className="flex justify-center mt-5"
                        >
                            <Settings size={20} />
                        </Link>
                    )}
                </nav>
            </aside>

            {/* BOTÃO MENU */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute top-1/2 -translate-y-1/2 bg-gray-900 text-white p-1 rounded-r-md shadow transition-all"
                style={{ left: menuAberto ? "clamp(9rem, 20vw, 14rem)" : "0px" }}
            >
                {menuAberto ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>

            {/* CONTEÚDO */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* TOPBAR */}
                <div className="h-20 bg-white border-b shadow-sm grid grid-cols-3 items-center px-6">

                    <div className="font-semibold">
                        {tenant.nome}
                    </div>

                    <div className="text-center font-medium">
                        {getSaudacao()}, {tenant.usuario?.nome}
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <NotificationBell />
                        <div className="w-px h-6 bg-gray-300"></div>
                        <LogoutButton />
                    </div>

                </div>

                {/* MAIN */}
                <main className="flex-1 bg-gray-100 p-8 overflow-y-auto pb-[20vh]">
                    {children}
                </main>

                {/* MURAL */}
                <MuralGlobal tenantNome={tenant.nome} />

            </div>
        </div>
    );
}

export default LayoutJuridico;