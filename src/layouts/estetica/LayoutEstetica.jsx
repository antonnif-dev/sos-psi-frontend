import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    UserPen,
    Activity
} from "lucide-react";

import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutEstetica({ children }) {
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#f5f7f2] via-[#eef4ed] to-[#ffffff] text-slate-700 relative overflow-hidden">

            {/* MENU SUPERIOR DESKTOP */}
            <header className="hidden md:flex h-24 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm items-center justify-between px-8 lg:px-14">

                {/* MARCA */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                        <Activity size={28} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-emerald-800">
                            {tenant.nome}
                        </h1>
                        <p className="text-sm text-emerald-500">
                            Performance & Bem-estar
                        </p>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex items-center gap-6">
                    {config.menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition"
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <Link
                        to="/meu-perfil"
                        className="text-slate-600 hover:text-emerald-700 transition"
                    >
                        <UserPen size={20} />
                    </Link>

                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className="text-slate-600 hover:text-emerald-700 transition"
                        >
                            <Settings size={20} />
                        </Link>
                    )}
                </nav>

            </header>

            {/* MENU MOBILE */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="fixed top-5 right-5 z-50 bg-white text-emerald-600 p-3 rounded-full shadow-lg border border-emerald-100"
                >
                    {menuAberto ? (
                        <PanelLeftClose size={22} />
                    ) : (
                        <PanelLeftOpen size={22} />
                    )}
                </button>

                <aside
                    className={`
                    fixed top-0 right-0 h-full w-72 bg-white text-slate-700 z-40
                    transition-transform duration-300 shadow-2xl border-l border-emerald-100
                    ${menuAberto ? "translate-x-0" : "translate-x-full"}
                `}
                >
                    <div className="p-8 mt-10 border-b border-emerald-100">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-md">
                            <Activity size={26} />
                        </div>

                        <h2 className="text-xl font-bold text-emerald-800">
                            {tenant.nome}
                        </h2>

                        <p className="text-sm text-emerald-500 mt-1">
                            Saúde corporal integrada
                        </p>
                    </div>

                    <nav className="flex flex-col gap-3 p-6">
                        {config.menu.map((item) => {
                            if (item.roles && !item.roles.includes(roleUsuario)) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="px-5 py-4 rounded-2xl hover:bg-emerald-50 hover:text-emerald-700 transition font-medium"
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <Link
                            to="/meu-perfil"
                            className="px-5 py-4 rounded-2xl hover:bg-emerald-50 flex items-center gap-3"
                        >
                            <UserPen size={18} />
                            Perfil
                        </Link>

                        {roleUsuario === "admin" && (
                            <Link
                                to="/configuracoes"
                                className="px-5 py-4 rounded-2xl hover:bg-emerald-50 flex items-center gap-3"
                            >
                                <Settings size={18} />
                                Configurações
                            </Link>
                        )}
                    </nav>
                </aside>
            </div>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-40">

                {/* CONTEÚDO */}
                <section>
                    {children}
                </section>

            </main>

            {/* RODAPÉ */}
            <footer className="h-24 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-inner flex items-center justify-between px-6 md:px-10">

                {/* SAUDAÇÃO */}
                <div>
                    <h2 className="font-bold text-emerald-800 text-lg">
                        {tenant.nome}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {getSaudacao()}, {tenant.usuario?.nome}
                    </p>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-4">
                    <NotificationBell />
                    <div className="w-px h-6 bg-emerald-200"></div>
                    <LogoutButton />
                </div>

            </footer>

        </div>
    );
}

export default LayoutEstetica;