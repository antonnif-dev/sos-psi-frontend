import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutCriativos({ children }) {
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
        <div className="flex h-screen bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1f2937] text-white overflow-hidden relative">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-40">                    

                    {/* CONTEÚDO */}
                    <section>
                        {children}
                    </section>

                </main>

                {/* MENU INFERIOR */}
                <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
                    <div className="max-w-7xl mx-auto bg-black/60 backdrop-blur-2xl border border-cyan-400/10 rounded-[2rem] shadow-2xl px-6 py-4">

                        <div className="flex justify-around items-center flex-wrap gap-4">

                            {config.menu.map((item) => {
                                if (item.roles && !item.roles.includes(roleUsuario)) {
                                    return null;
                                }

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="group flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-300 transition"
                                    >
                                        <span className="text-sm md:text-base font-semibold tracking-wide uppercase group-hover:scale-105 transition">
                                            {item.label}
                                        </span>
                                        <div className="w-8 h-[2px] bg-transparent group-hover:bg-cyan-300 transition"></div>
                                    </Link>
                                );
                            })}

                            {/* PERFIL */}
                            <Link
                                to="/meu-perfil"
                                className="group flex flex-col items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition"
                            >
                                <UserPen size={20} />
                                <span className="text-xs uppercase font-semibold">
                                    Perfil
                                </span>
                            </Link>

                            {/* CONFIG */}
                            {roleUsuario === "admin" && (
                                <Link
                                    to="/configuracoes"
                                    className="group flex flex-col items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition"
                                >
                                    <Settings size={20} />
                                    <span className="text-xs uppercase font-semibold">
                                        Config
                                    </span>
                                </Link>
                            )}

                        </div>

                    </div>
                </nav>

            </div>

            {/* PAINEL LATERAL DIREITO DESKTOP */}
            <aside className="hidden md:flex w-80 bg-black/40 backdrop-blur-xl border-l border-cyan-400/10 flex-col justify-between shadow-2xl">

                {/* TOPO */}
                <div className="p-8 border-b border-cyan-400/10">

                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl mb-6">
                        🎬
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">
                        {tenant.nome}
                    </h2>

                    <p className="text-gray-400 leading-relaxed">
                        Estúdio criativo, fotografia e produção visual.
                    </p>

                </div>

                {/* SAUDAÇÃO */}
                <div className="p-8 flex-1 flex flex-col justify-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300 mb-4">
                        Dashboard criativo
                    </p>

                    <h3 className="text-3xl font-bold mb-4 leading-tight">
                        {getSaudacao()},<br />
                        {tenant.usuario?.nome}
                    </h3>

                    <p className="text-gray-400">
                        Crie, organize e entregue experiências visuais memoráveis.
                    </p>
                </div>

                {/* AÇÕES */}
                <div className="p-8 border-t border-cyan-400/10 flex items-center justify-between">
                    <NotificationBell />
                    <LogoutButton />
                </div>

            </aside>

            {/* MOBILE MENU TOGGLE */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="fixed top-5 right-5 z-50 bg-black/70 backdrop-blur-lg text-cyan-300 p-3 rounded-full shadow-lg border border-cyan-400/20"
                >
                    {menuAberto ? (
                        <PanelLeftClose size={22} />
                    ) : (
                        <PanelLeftOpen size={22} />
                    )}
                </button>

                {/* PAINEL MOBILE */}
                <aside
                    className={`
                    fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-2xl text-white z-40
                    transition-transform duration-300 border-l border-cyan-400/10 shadow-2xl
                    ${menuAberto ? "translate-x-0" : "translate-x-full"}
                `}
                >
                    <div className="p-8 mt-10 border-b border-cyan-400/10">

                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600 flex items-center justify-center text-3xl mb-4">
                            🎬
                        </div>

                        <h2 className="text-2xl font-bold">
                            {tenant.nome}
                        </h2>

                        <p className="text-gray-400 mt-2">
                            Produção criativa visual
                        </p>

                    </div>

                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4">
                            {getSaudacao()}, {tenant.usuario?.nome}
                        </h3>
                    </div>

                    <div className="p-8 border-t border-cyan-400/10 flex items-center justify-between">
                        <NotificationBell />
                        <LogoutButton />
                    </div>

                </aside>
            </div>

        </div>
    );

}

export default LayoutCriativos;