import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    UserPen,
    Sparkles
} from "lucide-react";

import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";
import { useSegment } from "../../hooks/useSegment";

function LayoutBeleza({ children }) {
    const [menuAberto, setMenuAberto] = useState(false);

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
        <div className="flex h-screen bg-gradient-to-br from-[#fff8fc] via-[#fdeef7] to-[#fdf2f8] text-rose-900 overflow-hidden relative">

            {/* SIDEBAR ESQUERDA */}
            <aside
                className={`
                hidden md:flex md:relative top-0 left-0 h-full z-50
                bg-white/90 backdrop-blur-2xl border-r border-pink-100 shadow-2xl
                transition-all duration-300 flex-col
                ${menuAberto ? "md:w-80" : "md:w-24"}
            `}
            >

                {/* HEADER */}
                <div className="p-6 md:p-8 border-b border-pink-100">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500 flex items-center justify-center text-white shadow-xl mb-5">
                        <Sparkles size={30} />
                    </div>

                    {menuAberto && (
                        <>
                            <h2 className="text-2xl font-bold text-rose-700">
                                {tenant.nome}
                            </h2>
                        </>
                    )}

                </div>

                {/* SAUDAÇÃO */}
                <div className="p-6 md:p-8 border-b border-pink-100">

                    {menuAberto ? (
                        <>
                            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-fuchsia-500 mb-3">
                                Beleza, autoestima e sofisticação
                            </p>

                            <h3 className="text-2xl font-bold text-rose-800 leading-tight mb-3">
                                {getSaudacao()}, {tenant.usuario?.nome}
                            </h3>
                        </>
                    ) : (
                        <div className="flex justify-center text-fuchsia-500">
                            <Sparkles size={26} />
                        </div>
                    )}

                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 md:p-6 flex flex-col gap-3 overflow-y-auto">

                    {menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                rounded-2xl transition-all font-medium
                                hover:bg-pink-50 hover:text-rose-700
                                ${menuAberto
                                        ? "px-5 py-4"
                                        : "flex justify-center items-center py-4"}
                            `}
                            >
                                {menuAberto ? item.label : "•"}
                            </Link>
                        );
                    })}

                    {/* PERFIL */}
                    <Link
                        to="/meu-perfil"
                        className={`
                        rounded-2xl transition-all hover:bg-fuchsia-50 hover:text-fuchsia-700
                        ${menuAberto
                                ? "px-5 py-4 flex items-center gap-3"
                                : "flex justify-center py-4"}
                    `}
                    >
                        <UserPen size={18} />
                        {menuAberto && "Perfil"}
                    </Link>

                    {/* CONFIG */}
                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className={`
                            rounded-2xl transition-all hover:bg-fuchsia-50 hover:text-fuchsia-700
                            ${menuAberto
                                    ? "px-5 py-4 flex items-center gap-3"
                                    : "flex justify-center py-4"}
                        `}
                        >
                            <Settings size={18} />
                            {menuAberto && "Configurações"}
                        </Link>
                    )}

                </nav>

                {/* RODAPÉ */}
                <div className="p-6 border-t border-pink-100 flex items-center justify-between">
                    <NotificationBell />
                    <LogoutButton />
                </div>

            </aside>

            {/* MENU MOBILE */}
            <div className="md:hidden fixed top-8 left-3 z-[70]">
                <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="bg-white text-rose-500 p-3 rounded-full shadow-lg border border-pink-100"
                >
                    <PanelLeftOpen size={22} />
                </button>

                {menuAberto && (
                    <div className="absolute top-16 left-0 w-64 bg-white rounded-3xl shadow-2xl border border-pink-100 p-4 flex flex-col gap-2">

                        {menu.map((item) => {
                            if (item.roles && !item.roles.includes(roleUsuario)) return null;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMenuAberto(false)}
                                    className="px-4 py-3 rounded-2xl hover:bg-pink-50 hover:text-rose-700 transition-all"
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <Link
                            to="/meu-perfil"
                            onClick={() => setMenuAberto(false)}
                            className="px-4 py-3 rounded-2xl hover:bg-fuchsia-50"
                        >
                            Perfil
                        </Link>

                        {roleUsuario === "admin" && (
                            <Link
                                to="/configuracoes"
                                onClick={() => setMenuAberto(false)}
                                className="px-4 py-3 rounded-2xl hover:bg-fuchsia-50"
                            >
                                Configurações
                            </Link>
                        )}

                        <div className="border-t border-pink-100 pt-3 mt-2 flex items-center justify-between">
                            <NotificationBell dropdownPosition="bottom-left" />
                            <LogoutButton />
                        </div>

                    </div>
                )}
            </div>

            {/* BOTÃO DESKTOP */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="hidden md:flex absolute top-1/2 left-[calc(theme(space.24))] -translate-y-1/2 z-40 bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white p-2 rounded-r-xl shadow-lg"
            >
                {menuAberto ? (
                    <PanelLeftClose size={18} />
                ) : (
                    <PanelLeftOpen size={18} />
                )}
            </button>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* TOPO */}
                <header className="h-32 pl-24 md:pl-12 bg-white/70 backdrop-blur-xl border-b border-pink-100 shadow-sm flex items-center justify-between px-6 md:px-12">

                    <div>
                        {/* MOBILE */}
                        <div className="md:hidden">
                            <p className="uppercase tracking-[0.25em] text-[10px] text-fuchsia-500 font-semibold mb-1">
                                Beleza, autoestima e sofisticação
                            </p>

                            <h3 className="text-lg font-bold text-rose-800 leading-tight">
                                {getSaudacao()}, {tenant.usuario?.nome}
                            </h3>
                        </div>

                        {/* DESKTOP */}
                        <div className="hidden md:block">
                            <p className="uppercase tracking-[0.25em] text-xs text-fuchsia-500 font-semibold">
                                Beleza • Estilo • Autoestima
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:block text-right">
                        <p className="text-sm text-rose-400">
                            Esteticistas, designers, salões e experiências premium
                        </p>
                    </div>

                </header>

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-28">

                    {/* CONTEÚDO */}
                    <section>
                        {children}
                    </section>

                </main>

            </div>

        </div>
    );
}

export default LayoutBeleza;