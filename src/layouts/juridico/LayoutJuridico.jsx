import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    UserPen,
    BriefcaseBusiness
} from "lucide-react";

import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";
import { useSegment } from "../../hooks/useSegment";

function LayoutJuridico({ children }) {
    const [menuAberto, setMenuAberto] = useState(true);
    const tenant = useTenant();
    const {
        labels,
        menu,
        theme
    } = useSegment();

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
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 relative overflow-hidden">

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-slate-950/95 backdrop-blur-md border-r border-amber-500/10
                    transition-all duration-300 overflow-hidden shadow-2xl
                    ${menuAberto ? "w-48 md:w-72 p-6" : "w-0 p-0"}
                `}
            >
                {/* MARCA */}
                <div className="flex flex-col items-center gap-4 mt-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg text-slate-900">
                        <BriefcaseBusiness size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-white leading-tight">
                        {tenant.nome}
                    </h2>
                    <p className="text-sm text-amber-300">
                        Gestão Jurídica & Consultiva
                    </p>
                </div>

                {/* MENU */}
                <nav className="flex flex-col gap-3">
                    {menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex flex-col md:flex-row gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-amber-500/10 hover:text-amber-300 transition font-medium"
                            >
                                {Icon && (
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* PERFIL */}
                    <Link
                        to="/meu-perfil"
                        className="px-4 py-3 rounded-xl text-slate-300 hover:bg-amber-500/10 hover:text-amber-300 transition flex items-center gap-3"
                    >
                        <UserPen size={18} />
                        Perfil
                    </Link>
                </nav>
            </aside>

            {/* BOTÃO MENU */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/5 lg:-translate-x-1/5 bg-slate-950 text-amber-300 p-2 rounded-r-xl shadow-lg border border-slate-700 transition-all z-50"
                style={{
                    left: menuAberto ? "clamp(10rem, 22vw, 18rem)" : "0px"
                }}
            >
                {menuAberto ? (
                    <PanelLeftClose size={18} />
                ) : (
                    <PanelLeftOpen size={18} />
                )}
            </button>

            {/* CONTEÚDO */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* TOPBAR */}
                <header className="h-auto p-2 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-8 flex items-center justify-between">

                    {/* EMPRESA */}
                    <div>
                        <h1 className="font-bold text-slate-800 text-xl">
                            {tenant.nome}
                        </h1>
                        <p className="text-sm text-slate-500 flex flex-wrap">
                            Advocacia, contabilidade e consultoria estratégica
                        </p>
                    </div>

                    {/* SAUDAÇÃO */}
                    <div className="hidden md:block text-center">
                        <p className="font-medium text-slate-700">
                            {getSaudacao()}, {tenant.usuario?.nome}
                        </p>
                        <p className="text-sm text-slate-500">
                            Excelência, estratégia e confiança
                        </p>
                    </div>

                    {/* AÇÕES */}
                    <div className="flex items-center gap-4">
                        {/* CONFIG */}
                        {roleUsuario === "admin" && (
                            <Link
                                to="/configuracoes"
                                className="px-4 py-3 rounded-xl text-slate-300 hover:bg-amber-500/10 hover:text-amber-300 transition flex items-center gap-3"
                            >
                                <Settings size={18} />
                                Configurações
                            </Link>
                        )}
                        <NotificationBell />
                        <div className="w-px h-6 bg-slate-300"></div>
                        <LogoutButton />
                    </div>

                </header>

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8 pb-[20vh] bg-gradient-to-b from-slate-100 to-slate-200">
                    {children}
                </main>

            </div>
        </div>
    );
}

export default LayoutJuridico;